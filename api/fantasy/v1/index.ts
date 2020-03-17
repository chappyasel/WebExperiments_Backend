const express = require('express')
const fetch = require('node-fetch')
const statMap = require('./statMap')
const fantasy = express.Router()

const BASE_URL = 'https://fantasy.espn.com/apis/v3/games/ffl'

fantasy.get('/projections', async (req: any, res: any, next: any) => {
  try {
    const leagueID = req.params.league_id || 1084973
    const espn = await fetch(
      BASE_URL +
        `/seasons/2019/segments/0/leagues/` +
        `${leagueID}?view=mScoreboard&view=mStatus`
    ).then((r: any) => r.json())

    var playerIDs: any = []

    const mP = espn.status.currentMatchupPeriod
    const games = espn.schedule
      .filter((g: any) => g.matchupPeriodId === mP)
      .map((g: any) => {
        return {
          home: processMatchupTeam(g.home, espn, playerIDs),
          away: processMatchupTeam(g.away, espn, playerIDs),
          id: g.id,
        }
      })

    const calls = playerIDs.map((id: any) =>
      fetch(
        `https://watsonfantasyfootball.espn.com/espnpartner/dallas/` +
          `projections/projections_${id}_ESPNFantasyFootball_2019.json`
      )
        .then((r: any) => {
          if (r.status !== 200) return null
          return r.json()
        })
        .then((ps: any) => processPlayerProjections(ps))
    )
    const projs = await Promise.all(calls)

    const projDict: any = projs
      .filter(p => p)
      .reduce(function(obj: any, item: any) {
        obj[item.id] = item
        return obj
      }, {})

    const gamesWithProjs = games.map((g: any) => {
      g.home.roster.map((p: any) => {
        p.projections = projDict[p.id]
        return p
      })
      g.away.roster.map((p: any) => {
        p.projections = projDict[p.id]
        return p
      })
      return g
    })

    const proGames = await getProGames()

    res.json({
      games: gamesWithProjs,
      proGames: proGames,
      statMap: statMap,
    })
  } catch (err) {
    next(err)
  }
})

async function getProGames() {
  const res = await fetch(
    `https://site.api.espn.com/apis/fantasy/v2/games/ffl/` +
      `games?useMap=true&dates=20190905-20190910&pbpOnly=true`
  )
    .then((r: any) => r.json())
    .then((r: any) => r.events)

  return res.map((g: any) => {
    return {
      date: g.date,
      summary: g.summary,
      percentComplete: g.percentComplete,
      broadcast: g.broadcast,
      competitors: g.competitors.map((c: any) => {
        return {
          id: c.id,
          abbrev: c.abbreviation,
          name: c.name,
          record: c.record,
          score: c.score,
          isHome: c.homeAway === 'home',
        }
      }),
    }
  })
}

function processMatchupTeam(t: any, espn: any, playerIDs: any) {
  return {
    team: espn.teams[t.id],
    roster: t.rosterForCurrentScoringPeriod.entries.map((p: any) => {
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
          actual: processPlayerStats(p.playerPoolEntry.player.stats[1]),
        },
      }
    }),
  }
}

function processPlayerStats(s: any) {
  if (!s) return null
  return {
    points: s.appliedTotal,
    stats: s.stats,
    variance: s.variance,
    pointsPerStat: s.appliedStats,
  }
}

function processPlayerProjections(ps: any) {
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
    previous: ps.map((p: any) => {
      return {
        timestamp: p.DATA_TIMESTAMP,
        points: p.SCORE_PROJECTION,
        low: p.LOW_SCORE,
        high: p.HIGH_SCORE,
        outside: p.OUTSIDE_PROJECTION,
        simulation: p.SIMULATION_PROJECTION,
      }
    }),
  }
}

export = fantasy
