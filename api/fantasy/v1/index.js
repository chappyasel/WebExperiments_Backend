const express = require('express')
const fetch = require('node-fetch')
const statMap = require('./statMap')
const fantasy = express.Router()

const BASE_URL = 'https://fantasy.espn.com/apis/v3/games/ffl'

fantasy.get('/projections', async (req, res, next) => {
    try {
        const leagueID = req.params.league_id || 1084973
        const espn = 
            await fetch(BASE_URL + `/seasons/2019/segments/0/leagues/` +
                        `${leagueID}?view=mScoreboard&view=mStatus`)
            .then(r => r.json())

        var playerIDs = []

        function processMatchupTeam(t) {
            return {
                team: espn.teams[t.id],
                roster: t.rosterForCurrentScoringPeriod.entries.map(p => {
                    playerIDs.push(p.playerId)
                    return {
                        name: p.playerPoolEntry.player.fullName,
                        jersey: p.playerPoolEntry.player.jersey,
                        proTeamID: p.playerPoolEntry.player.proTeamId,
                        id: p.playerId,
                        slot: p.lineupSlotId,
                        isInjured: p.playerPoolEntry.player.injured,
                        injuryStatus: p.playerPoolEntry.player.injuryStatus,
                        points: p.playerPoolEntry.appliedStatTotal,
                        stats: {
                            projected: processPlayerStats(p.playerPoolEntry.player.stats[0]),
                            actual: processPlayerStats(p.playerPoolEntry.player.stats[1])
                        }
                    }
                })
            }
        }

        function processPlayerStats(s) {
            if (!s) return null
            return {
                points: s.appliedTotal,
                stats: s.stats,
                variance: s.variance,
                pointsPerStat: s.appliedStats
            }
        }

        const mP = espn.status.currentMatchupPeriod
        const games = espn.schedule
            .filter(g => g.matchupPeriodId === mP)
            .map(g => {
                return {
                    home: processMatchupTeam(g.home),
                    away: processMatchupTeam(g.away),
                    id: g.id
                }
            })

        function processPlayerProjections(ps) {
            if (!ps) return null
            const p = ps.pop()
            return {
                id: p.PLAYERID,
                timestamp: p.DATA_TIMESTAMP,
                points: p.SCORE_PROJECTION,
                low: p.LOW_SCORE,
                high: p.HIGH_SCORE,
                outside: p.OUTSIDE_PROJECTION,
                simulation: p.SIMULATION_PROJECTION,
                distribution: p.SCORE_DISTRIBUTION,
                distributionName: p.DISTRIBUTION_NAME,
                previous: ps.map(p => {
                    return {
                        timestamp: p.DATA_TIMESTAMP,
                        points: p.SCORE_PROJECTION,
                        low: p.LOW_SCORE,
                        high: p.HIGH_SCORE,
                        outside: p.OUTSIDE_PROJECTION,
                        simulation: p.SIMULATION_PROJECTION
                    }
                })
            }
        }

        const calls = playerIDs.map(id => 
            fetch(`https://watsonfantasyfootball.espn.com/espnpartner/dallas/` +
                  `projections/projections_${id}_ESPNFantasyFootball_2019.json`)
            .then(r => {
                if (r.status !== 200) return null
                return r.json()
            })
            .then(ps => processPlayerProjections(ps)))
        const projs = await Promise.all(calls)

        const proGames = await getProGames()

        res.json({ 
            games: games, 
            proGames: proGames,
            projections: projs.filter(p => p != null),
            statMap: statMap
        })
    } 
    catch (err) { next(err) }
})

async function getProGames() {
    const res =
            await fetch(`https://site.api.espn.com/apis/fantasy/v2/games/ffl/` +
                        `games?useMap=true&dates=20190905-20190910&pbpOnly=true`)
            .then(r => r.json())
            .then(r => r.events)
    
    return res.map(g => {
        return {
            date: g.date,
            summary: g.summary,
            percentComplete: g.percentComplete,
            broadcast: g.broadcast,
            competitors: g.competitors.map(c => {
                return {
                    id: c.id,
                    abbrev: c.abbreviation,
                    name: c.name,
                    record: c.record,
                    score: c.score,
                    isHome: c.homeAway === "home"
                }
            })
        }
    })
}

module.exports = fantasy