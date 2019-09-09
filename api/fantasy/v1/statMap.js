const express = require('express')

// From: https://fantasy.espn.com/football/league/settings?leagueId=1084973&view=scoring
//     In: sources -> script -> __KONA_SERIALIZATION_DATA__ -> statsMap
//     Note: derived
//
// Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})
//
// const x = Object.fromEntries(Object.entries(statsMap).map(([k, v]) =>
//     [k, {
//         id: v.id,
//         abbrev: v.alternateDisplayAbbrev || v.displayAbbrev || v.abbrev,
//         apiIdentifier: v.apiIdentifier,
//         description: v.description
//     }]
// ))
// res.json(x)

module.exports = {
    "0": {
        "id": 0,
        "abbrev": "PA",
        "apiIdentifier": "passing.passingAttempts",
        "description": "Each Pass Attempted"
    },
    "1": {
        "id": 1,
        "abbrev": "PC",
        "apiIdentifier": "passing.completions",
        "description": "Each Pass Completed"
    },
    "2": {
        "id": 2,
        "abbrev": "INC",
        "description": "Each Incomplete Pass"
    },
    "3": {
        "id": 3,
        "abbrev": "YDS",
        "apiIdentifier": "passing.passingYards",
        "description": "Passing Yards"
    },
    "4": {
        "id": 4,
        "abbrev": "PASS TD",
        "apiIdentifier": "passing.passingTouchdowns",
        "description": "TD Pass"
    },
    "5": {
        "id": 5,
        "abbrev": "PY5",
        "description": "Every 5 passing yards"
    },
    "6": {
        "id": 6,
        "abbrev": "PY10",
        "description": "Every 10 passing yards"
    },
    "7": {
        "id": 7,
        "abbrev": "PY20",
        "description": "Every 20 passing yards "
    },
    "8": {
        "id": 8,
        "abbrev": "PY25",
        "description": "Every 25 passing yards "
    },
    "9": {
        "id": 9,
        "abbrev": "PY50",
        "description": "Every 50 passing yards"
    },
    "10": {
        "id": 10,
        "abbrev": "PY100",
        "description": "Every 100 passing yards"
    },
    "11": {
        "id": 11,
        "abbrev": "PC5",
        "description": "Every 5 pass completions"
    },
    "12": {
        "id": 12,
        "abbrev": "PC10",
        "description": "Every 10 pass completions"
    },
    "13": {
        "id": 13,
        "abbrev": "IP5",
        "description": "Every 5 pass incompletions"
    },
    "14": {
        "id": 14,
        "abbrev": "IP10",
        "description": "Every 10 pass incompletions"
    },
    "15": {
        "id": 15,
        "abbrev": "PTD40",
        "description": "40+ yard TD pass bonus"
    },
    "16": {
        "id": 16,
        "abbrev": "PTD50",
        "apiIdentifier": "scoring.passingTouchdownsOf50PlusYds",
        "description": "50+ yard TD pass bonus"
    },
    "17": {
        "id": 17,
        "abbrev": "P300",
        "description": "300-399 yard passing game"
    },
    "18": {
        "id": 18,
        "abbrev": "P400",
        "description": "400+ yard passing game"
    },
    "19": {
        "id": 19,
        "abbrev": "2PC",
        "apiIdentifier": "passing.twoPtPass",
        "description": "2pt Passing Conversion"
    },
    "20": {
        "id": 20,
        "abbrev": "INT",
        "apiIdentifier": "passing.interceptions",
        "description": "Interceptions Thrown"
    },
    "21": {
        "id": 21,
        "abbrev": "CPCT",
        "apiIdentifier": "passing.completionPct",
        "description": "Passing Completion Pct"
    },
    "22": {
        "id": 22,
        "abbrev": "PYPG",
        "apiIdentifier": "passing.passingYardsPerGame",
        "description": "Passing Yards Per Game"
    },
    "23": {
        "id": 23,
        "abbrev": "RA",
        "apiIdentifier": "rushing.rushingAttempts",
        "description": "Rushing Attempts"
    },
    "24": {
        "id": 24,
        "abbrev": "YDS",
        "apiIdentifier": "rushing.rushingYards",
        "description": "Rushing Yards"
    },
    "25": {
        "id": 25,
        "abbrev": "RUSH TD",
        "apiIdentifier": "rushing.rushingTouchdowns",
        "description": "TD Rush"
    },
    "26": {
        "id": 26,
        "abbrev": "2PR",
        "apiIdentifier": "rushing.twoPtRush",
        "description": "2pt Rushing Conversion"
    },
    "27": {
        "id": 27,
        "abbrev": "RY5",
        "description": "Every 5 rushing yards"
    },
    "28": {
        "id": 28,
        "abbrev": "RY10",
        "description": "Every 10 rushing yards"
    },
    "29": {
        "id": 29,
        "abbrev": "RY20",
        "description": "Every 20 rushing yards"
    },
    "30": {
        "id": 30,
        "abbrev": "RY25",
        "description": "Every 25 rushing yards "
    },
    "31": {
        "id": 31,
        "abbrev": "RY50",
        "description": "Every 50 rushing yards"
    },
    "32": {
        "id": 32,
        "abbrev": "R100",
        "description": "Every 100 rushing yards"
    },
    "33": {
        "id": 33,
        "abbrev": "RA5",
        "description": "Every 5 rush attempts"
    },
    "34": {
        "id": 34,
        "abbrev": "RA10",
        "description": "Every 10 rush attempts"
    },
    "35": {
        "id": 35,
        "abbrev": "RTD40",
        "description": "40+ yard TD rush bonus"
    },
    "36": {
        "id": 36,
        "abbrev": "RTD50",
        "apiIdentifier": "scoring.rushingTouchdownsOf50PlusYds",
        "description": "50+ yard TD rush bonus"
    },
    "37": {
        "id": 37,
        "abbrev": "RY100",
        "description": "100-199 yard rushing game"
    },
    "38": {
        "id": 38,
        "abbrev": "RY200",
        "description": "200+ yard rushing game"
    },
    "39": {
        "id": 39,
        "abbrev": "RYPA",
        "apiIdentifier": "rushing.yardsPerRushAttempt",
        "description": "Rushing Yards Per Attempt"
    },
    "40": {
        "id": 40,
        "abbrev": "RYPG",
        "apiIdentifier": "rushing.rushingYardsPerGame",
        "description": "Rushing Yards Per Game"
    },
    "41": {
        "id": 41,
        "abbrev": "REC",
        "apiIdentifier": "receiving.receptions",
        "description": "Receptions"
    },
    "42": {
        "id": 42,
        "abbrev": "YDS",
        "apiIdentifier": "receiving.receivingYards",
        "description": "Receiving Yards"
    },
    "43": {
        "id": 43,
        "abbrev": "REC TD",
        "apiIdentifier": "receiving.receivingTouchdowns",
        "description": "TD Reception"
    },
    "44": {
        "id": 44,
        "abbrev": "2PRE",
        "apiIdentifier": "receiving.twoPtReception",
        "description": "2pt Receiving Conversion"
    },
    "45": {
        "id": 45,
        "abbrev": "RETD40",
        "description": "40+ yard TD rec bonus"
    },
    "46": {
        "id": 46,
        "abbrev": "RETD50",
        "apiIdentifier": "scoring.receivingTouchdownsOf50PlusYds",
        "description": "50+ yard TD rec bonus"
    },
    "47": {
        "id": 47,
        "abbrev": "REY5",
        "description": "Every 5 receiving yards"
    },
    "48": {
        "id": 48,
        "abbrev": "REY10",
        "description": "Every 10 receiving yards"
    },
    "49": {
        "id": 49,
        "abbrev": "REY20",
        "description": "Every 20 receiving yards"
    },
    "50": {
        "id": 50,
        "abbrev": "REY25",
        "description": "Every 25 receiving yards"
    },
    "51": {
        "id": 51,
        "abbrev": "REY50",
        "description": "Every 50 receiving yards"
    },
    "52": {
        "id": 52,
        "abbrev": "RE100",
        "description": "Every 100 receiving yards"
    },
    "53": {
        "id": 53,
        "abbrev": "REC",
        "apiIdentifier": "receiving.receptions",
        "description": "Each reception"
    },
    "54": {
        "id": 54,
        "abbrev": "REC5",
        "description": "Every 5 receptions"
    },
    "55": {
        "id": 55,
        "abbrev": "REC10",
        "description": "Every 10 receptions"
    },
    "56": {
        "id": 56,
        "abbrev": "REY100",
        "description": "100-199 yard receiving game"
    },
    "57": {
        "id": 57,
        "abbrev": "REY200",
        "description": "200+ yard receiving game"
    },
    "58": {
        "id": 58,
        "abbrev": "RET",
        "apiIdentifier": "receiving.receivingTargets",
        "description": "Receiving Target"
    },
    "59": {
        "id": 59,
        "abbrev": "YAC",
        "apiIdentifier": "receiving.receivingYardsAfterCatch",
        "description": "Receiving Yards After Catch"
    },
    "60": {
        "id": 60,
        "abbrev": "YPC",
        "apiIdentifier": "receiving.yardsPerReception",
        "description": "Receiving Yards Per Catch"
    },
    "61": {
        "id": 61,
        "abbrev": "REYPG",
        "apiIdentifier": "receiving.receivingYardsPerGame",
        "description": "Receiving Yards Per Game"
    },
    "62": {
        "id": 62,
        "abbrev": "PTL",
        "apiIdentifier": "scoring.totalTwoPointConvs",
        "description": "Total 2pt Conversions"
    },
    "63": {
        "id": 63,
        "abbrev": "FTD",
        "apiIdentifier": "general.fumblesTouchdowns",
        "description": "Fumble Recovered for TD"
    },
    "64": {
        "id": 64,
        "abbrev": "SK",
        "apiIdentifier": "passing.sacks",
        "description": "Sacked"
    },
    "65": {
        "id": 65,
        "abbrev": "PFUM",
        "apiIdentifier": "passing.passingFumbles",
        "description": "Passing Fumbles"
    },
    "66": {
        "id": 66,
        "abbrev": "RFUM",
        "apiIdentifier": "rushing.rushingFumbles",
        "description": "Rushing Fumbles"
    },
    "67": {
        "id": 67,
        "abbrev": "REFUM",
        "apiIdentifier": "receiving.receivingFumbles",
        "description": "Receiving Fumbles"
    },
    "68": {
        "id": 68,
        "abbrev": "FUM",
        "apiIdentifier": "general.fumbles",
        "description": "Total Fumbles"
    },
    "69": {
        "id": 69,
        "abbrev": "PFUML",
        "apiIdentifier": "passing.passingFumblesLost",
        "description": "Passing Fumbles Lost"
    },
    "70": {
        "id": 70,
        "abbrev": "RFUML",
        "apiIdentifier": "rushing.rushingFumblesLost",
        "description": "Rushing Fumbles Lost"
    },
    "71": {
        "id": 71,
        "abbrev": "REFUML",
        "apiIdentifier": "receiving.receivingFumblesLost",
        "description": "Receiving Fumbles Lost"
    },
    "72": {
        "id": 72,
        "abbrev": "FUML",
        "apiIdentifier": "general.fumblesLost",
        "description": "Total Fumbles Lost"
    },
    "73": {
        "id": 73,
        "abbrev": "TT",
        "description": "Total Turnovers"
    },
    "74": {
        "id": 74,
        "abbrev": "FG50",
        "apiIdentifier": "kicking.fieldGoalsMade50",
        "description": "FG Made (50+ yards)"
    },
    "75": {
        "id": 75,
        "abbrev": "FGA50",
        "apiIdentifier": "kicking.fieldGoalAttempts50",
        "description": "FG Attempted (50+ yards)"
    },
    "76": {
        "id": 76,
        "abbrev": "FGM50",
        "apiIdentifier": "TODO",
        "description": "FG Missed (50+ yards)"
    },
    "77": {
        "id": 77,
        "abbrev": "FG40",
        "apiIdentifier": "kicking.fieldGoalsMade40_49",
        "description": "FG Made (40-49 yards)"
    },
    "78": {
        "id": 78,
        "abbrev": "FGA40",
        "apiIdentifier": "kicking.fieldGoalAttempts40_49",
        "description": "FG Attempted (40-49 yards)"
    },
    "79": {
        "id": 79,
        "abbrev": "FGM40",
        "description": "FG Missed (40-49 yards)"
    },
    "80": {
        "id": 80,
        "abbrev": "FG0",
        "description": "FG Made (0-39 yards)"
    },
    "81": {
        "id": 81,
        "abbrev": "FGA0",
        "description": "FG Attempted (0-39 yards)"
    },
    "82": {
        "id": 82,
        "abbrev": "FGM0",
        "description": "FG Missed (0-39 yards)"
    },
    "83": {
        "id": 83,
        "abbrev": "FG",
        "apiIdentifier": "kicking.fieldGoalsMade",
        "description": "Total FG Made"
    },
    "84": {
        "id": 84,
        "abbrev": "FGA",
        "apiIdentifier": "kicking.fieldGoalAttempts",
        "description": "Total FG Attempted"
    },
    "85": {
        "id": 85,
        "abbrev": "FGM",
        "description": "Total FG Missed"
    },
    "86": {
        "id": 86,
        "abbrev": "PAT",
        "apiIdentifier": "kicking.extraPointsMade",
        "description": "Each PAT Made"
    },
    "87": {
        "id": 87,
        "abbrev": "PATA",
        "apiIdentifier": "kicking.extraPointAttempts",
        "description": "Each PAT Attempted"
    },
    "88": {
        "id": 88,
        "abbrev": "PATM",
        "description": "Each PAT Missed"
    },
    "89": {
        "id": 89,
        "abbrev": "PA0",
        "description": "0 points allowed"
    },
    "90": {
        "id": 90,
        "abbrev": "PA1",
        "description": "1-6 points allowed"
    },
    "91": {
        "id": 91,
        "abbrev": "PA7",
        "description": "7-13 points allowed"
    },
    "92": {
        "id": 92,
        "abbrev": "PA14",
        "description": "14-17 points allowed"
    },
    "93": {
        "id": 93,
        "abbrev": "BLKKRTD",
        "description": "Blocked Punt or FG return for TD"
    },
    "94": {
        "id": 94,
        "abbrev": "DEFRETTD",
        "description": "Fumble or INT Return for TD"
    },
    "95": {
        "id": 95,
        "abbrev": "INT",
        "apiIdentifier": "defensiveInterceptions.interceptions",
        "description": "Each Interception"
    },
    "96": {
        "id": 96,
        "abbrev": "FR",
        "apiIdentifier": "general.fumblesRecovered",
        "description": "Each Fumble Recovered"
    },
    "97": {
        "id": 97,
        "abbrev": "BLKK",
        "description": "Blocked Punt, PAT or FG"
    },
    "98": {
        "id": 98,
        "abbrev": "SF",
        "apiIdentifier": "defensive.safeties",
        "description": "Each Safety"
    },
    "99": {
        "id": 99,
        "abbrev": "SK",
        "apiIdentifier": "defensive.sacks",
        "description": "Each Sack"
    },
    "100": {
        "id": 100,
        "abbrev": "HALFSK",
        "apiIdentifier": "defensive.sacksAssisted",
        "description": "1/2 Sack"
    },
    "101": {
        "id": 101,
        "abbrev": "RET TD",
        "apiIdentifier": "kicking.kickoffReturnTouchdowns",
        "description": "Kickoff Return TD"
    },
    "102": {
        "id": 102,
        "abbrev": "RET TD",
        "apiIdentifier": "returning.puntReturnTouchdowns",
        "description": "Punt Return TD"
    },
    "103": {
        "id": 103,
        "abbrev": "RET TD",
        "apiIdentifier": "defensiveInterceptions.interceptionTouchdowns",
        "description": "Interception Return TD"
    },
    "104": {
        "id": 104,
        "abbrev": "RET TD",
        "apiIdentifier": "general.fumblesTouchdowns",
        "description": "Fumble Return TD"
    },
    "105": {
        "id": 105,
        "abbrev": "TOT TD",
        "apiIdentifier": "scoring.returnTouchdowns",
        "description": "Total Return TD"
    },
    "106": {
        "id": 106,
        "abbrev": "FF",
        "apiIdentifier": "general.fumblesForced",
        "description": "Each Fumble Forced"
    },
    "107": {
        "id": 107,
        "abbrev": "TKA",
        "apiIdentifier": "defensive.assistTackles",
        "description": "Assisted Tackles"
    },
    "108": {
        "id": 108,
        "abbrev": "TKS",
        "apiIdentifier": "defensive.soloTackles",
        "description": "Solo Tackles"
    },
    "109": {
        "id": 109,
        "abbrev": "TK",
        "apiIdentifier": "defensive.totalTackles",
        "description": "Total Tackles"
    },
    "110": {
        "id": 110,
        "abbrev": "TK3",
        "description": "Every 3 Total Tackles"
    },
    "111": {
        "id": 111,
        "abbrev": "TK5",
        "description": "Every 5 Total Tackles"
    },
    "112": {
        "id": 112,
        "abbrev": "ST",
        "apiIdentifier": "defensive.stuffs",
        "description": "Stuffs"
    },
    "113": {
        "id": 113,
        "abbrev": "PD",
        "apiIdentifier": "defensive.passesDefended",
        "description": "Passes Defensed"
    },
    "114": {
        "id": 114,
        "abbrev": "KR",
        "apiIdentifier": "kicking.kickoffReturnYards",
        "description": "Kickoff Return Yards"
    },
    "115": {
        "id": 115,
        "abbrev": "PR",
        "apiIdentifier": "punting.puntReturnYards",
        "description": "Punt Return Yards"
    },
    "116": {
        "id": 116,
        "abbrev": "KR10",
        "description": "Every 10 kickoff return yards"
    },
    "117": {
        "id": 117,
        "abbrev": "KR25",
        "description": "Every 25 kickoff return yards"
    },
    "118": {
        "id": 118,
        "abbrev": "PR10",
        "description": "Every 10 punt return yards"
    },
    "119": {
        "id": 119,
        "abbrev": "PR25",
        "description": "Every 25 punt return yards"
    },
    "120": {
        "id": 120,
        "abbrev": "PA",
        "description": "Points Allowed"
    },
    "121": {
        "id": 121,
        "abbrev": "PA18",
        "description": "18-21 points allowed"
    },
    "122": {
        "id": 122,
        "abbrev": "PA22",
        "description": "22-27 points allowed"
    },
    "123": {
        "id": 123,
        "abbrev": "PA28",
        "description": "28-34 points allowed"
    },
    "124": {
        "id": 124,
        "abbrev": "PA35",
        "description": "35-45 points allowed"
    },
    "125": {
        "id": 125,
        "abbrev": "PA46",
        "description": "46+ points allowed"
    },
    "126": {
        "id": 126,
        "abbrev": "PAPG",
        "description": "Points Allowed Per Game"
    },
    "127": {
        "id": 127,
        "abbrev": "YA",
        "description": "Yards Allowed"
    },
    "128": {
        "id": 128,
        "abbrev": "YA100",
        "description": "Less than 100 total yards allowed"
    },
    "129": {
        "id": 129,
        "abbrev": "YA199",
        "description": "100-199 total yards allowed"
    },
    "130": {
        "id": 130,
        "abbrev": "YA299",
        "description": "200-299 total yards allowed"
    },
    "131": {
        "id": 131,
        "abbrev": "YA349",
        "description": "300-349 total yards allowed"
    },
    "132": {
        "id": 132,
        "abbrev": "YA399",
        "description": "350-399 total yards allowed"
    },
    "133": {
        "id": 133,
        "abbrev": "YA449",
        "description": "400-449 total yards allowed"
    },
    "134": {
        "id": 134,
        "abbrev": "YA499",
        "description": "450-499 total yards allowed"
    },
    "135": {
        "id": 135,
        "abbrev": "YA549",
        "description": "500-549 total yards allowed"
    },
    "136": {
        "id": 136,
        "abbrev": "YA550",
        "description": "550+ total yards allowed"
    },
    "137": {
        "id": 137,
        "abbrev": "YAPG",
        "description": "Yards Allowed Per Game"
    },
    "138": {
        "id": 138,
        "abbrev": "PT",
        "apiIdentifier": "punting.punts",
        "description": "Net Punts"
    },
    "139": {
        "id": 139,
        "abbrev": "PTY",
        "apiIdentifier": "punting.puntYards",
        "description": "Punt Yards"
    },
    "140": {
        "id": 140,
        "abbrev": "PT10",
        "apiIdentifier": "punting.puntsInside10",
        "description": "Punts Inside the 10"
    },
    "141": {
        "id": 141,
        "abbrev": "PT20",
        "apiIdentifier": "punting.puntsInside20",
        "description": "Punts Inside the 20"
    },
    "142": {
        "id": 142,
        "abbrev": "PTB",
        "apiIdentifier": "punting.puntsBlocked",
        "description": "Blocked Punts"
    },
    "143": {
        "id": 143,
        "abbrev": "PTR",
        "apiIdentifier": "punting.puntReturns",
        "description": "Punts Returned"
    },
    "144": {
        "id": 144,
        "abbrev": "PTRY",
        "apiIdentifier": "punting.puntReturnYards",
        "description": "Punt Return Yards"
    },
    "145": {
        "id": 145,
        "abbrev": "PTTB",
        "apiIdentifier": "punting.touchbacks",
        "description": "Touchbacks"
    },
    "146": {
        "id": 146,
        "abbrev": "PTFC",
        "apiIdentifier": "punting.fairCatches",
        "description": "Fair Catches"
    },
    "147": {
        "id": 147,
        "abbrev": "PTAVG",
        "apiIdentifier": "punting.grossAvgPuntYards",
        "description": "Punt Average"
    },
    "148": {
        "id": 148,
        "abbrev": "PTA44",
        "description": "Punt Average 44.0+"
    },
    "149": {
        "id": 149,
        "abbrev": "PTA42",
        "description": "Punt Average 42.0-43.9"
    },
    "150": {
        "id": 150,
        "abbrev": "PTA40",
        "description": "Punt Average 40.0-41.9"
    },
    "151": {
        "id": 151,
        "abbrev": "PTA38",
        "description": "Punt Average 38.0-39.9"
    },
    "152": {
        "id": 152,
        "abbrev": "PTA36",
        "description": "Punt Average 36.0-37.9"
    },
    "153": {
        "id": 153,
        "abbrev": "PTA34",
        "description": "Punt Average 34.0-35.9"
    },
    "154": {
        "id": 154,
        "abbrev": "PTA33",
        "description": "Punt Average 33.9 or less"
    },
    "155": {
        "id": 155,
        "abbrev": "TW",
        "description": "Team Win"
    },
    "156": {
        "id": 156,
        "abbrev": "TL",
        "description": "Team Loss"
    },
    "157": {
        "id": 157,
        "abbrev": "TIE",
        "description": "Team Tie"
    },
    "158": {
        "id": 158,
        "abbrev": "PTS",
        "apiIdentifier": "scoring.totalPoints",
        "description": "Points Scored"
    },
    "159": {
        "id": 159,
        "abbrev": "PPG",
        "apiIdentifier": "scoring.totalPointsPerGame",
        "description": "Points Scored Per Game"
    },
    "160": {
        "id": 160,
        "abbrev": "PT MRGN",
        "description": "Margin of Victory"
    },
    "161": {
        "id": 161,
        "abbrev": "WM25",
        "description": "25+ point Win Margin"
    },
    "162": {
        "id": 162,
        "abbrev": "WM20",
        "description": "20-24 point Win Margin"
    },
    "163": {
        "id": 163,
        "abbrev": "WM15",
        "description": "15-19 point Win Margin"
    },
    "164": {
        "id": 164,
        "abbrev": "WM10",
        "description": "10-14 point Win Margin"
    },
    "165": {
        "id": 165,
        "abbrev": "WM5",
        "description": "5-9 point Win Margin"
    },
    "166": {
        "id": 166,
        "abbrev": "WM1",
        "description": "1-4 point Win Margin"
    },
    "167": {
        "id": 167,
        "abbrev": "LM1",
        "description": "1-4 point Loss Margin"
    },
    "168": {
        "id": 168,
        "abbrev": "LM5",
        "description": "5-9 point Loss Margin"
    },
    "169": {
        "id": 169,
        "abbrev": "LM10",
        "description": "10-14 point Loss Margin"
    },
    "170": {
        "id": 170,
        "abbrev": "LM15",
        "description": "15-19 point Loss Margin"
    },
    "171": {
        "id": 171,
        "abbrev": "LM20",
        "description": "20-24 point Loss Margin"
    },
    "172": {
        "id": 172,
        "abbrev": "LM25",
        "description": "25+ point Loss Margin"
    },
    "173": {
        "id": 173,
        "abbrev": "MGNPG",
        "description": "Margin of Victory Per Game"
    },
    "174": {
        "id": 174,
        "abbrev": "WINPCT",
        "description": "Winning Pct"
    },
    "175": {
        "id": 175,
        "abbrev": "PTD0",
        "apiIdentifier": "scoring.passingTouchdownsOf0to9Yds",
        "description": "0-9 yd TD pass bonus"
    },
    "176": {
        "id": 176,
        "abbrev": "PTD10",
        "apiIdentifier": "scoring.passingTouchdownsOf10to19Yds",
        "description": "10-19 yd TD pass bonus"
    },
    "177": {
        "id": 177,
        "abbrev": "PTD20",
        "apiIdentifier": "scoring.passingTouchdownsOf20to29Yds",
        "description": "20-29 yd TD pass bonus"
    },
    "178": {
        "id": 178,
        "abbrev": "PTD30",
        "apiIdentifier": "scoring.passingTouchdownsOf30to39Yds",
        "description": "30-39 yd TD pass bonus"
    },
    "179": {
        "id": 179,
        "abbrev": "RTD0",
        "apiIdentifier": "scoring.rushingTouchdownsOf0to9Yds",
        "description": "0-9 yd TD rush bonus"
    },
    "180": {
        "id": 180,
        "abbrev": "RTD10",
        "apiIdentifier": "scoring.rushingTouchdownsOf10to19Yds",
        "description": "10-19 yd TD rush bonus"
    },
    "181": {
        "id": 181,
        "abbrev": "RTD20",
        "apiIdentifier": "scoring.rushingTouchdownsOf20to29Yds",
        "description": "20-29 yd TD rush bonus"
    },
    "182": {
        "id": 182,
        "abbrev": "RTD30",
        "apiIdentifier": "scoring.rushingTouchdownsOf30to39Yds",
        "description": "30-39 yd TD rush bonus"
    },
    "183": {
        "id": 183,
        "abbrev": "RETD0",
        "apiIdentifier": "scoring.receivingTouchdownsOf0to9Yds",
        "description": "0-9 yd TD rec bonus"
    },
    "184": {
        "id": 184,
        "abbrev": "RETD10",
        "apiIdentifier": "scoring.receivingTouchdownsOf10to19Yds",
        "description": "10-19 yd TD rec bonus"
    },
    "185": {
        "id": 185,
        "abbrev": "RETD20",
        "apiIdentifier": "scoring.receivingTouchdownsOf20to29Yds",
        "description": "20-29 yd TD rec bonus"
    },
    "186": {
        "id": 186,
        "abbrev": "RETD30",
        "apiIdentifier": "scoring.receivingTouchdownsOf30to39Yds",
        "description": "30-39 yd TD rec bonus"
    },
    "187": {
        "id": 187,
        "abbrev": "DPTSA",
        "apiIdentifier": "TODO",
        "description": "D/ST Points Allowed"
    },
    "188": {
        "id": 188,
        "abbrev": "DPA0",
        "apiIdentifier": "TODO",
        "description": "D/ST 0 points allowed"
    },
    "189": {
        "id": 189,
        "abbrev": "DPA1",
        "apiIdentifier": "TODO",
        "description": "D/ST 1-6 points allowed"
    },
    "190": {
        "id": 190,
        "abbrev": "DPA7",
        "apiIdentifier": "TODO",
        "description": "D/ST 7-13 points allowed"
    },
    "191": {
        "id": 191,
        "abbrev": "DPA14",
        "apiIdentifier": "TODO",
        "description": "D/ST 14-17 points allowed"
    },
    "192": {
        "id": 192,
        "abbrev": "DPA18",
        "apiIdentifier": "TODO",
        "description": "D/ST 18-21 points allowed"
    },
    "193": {
        "id": 193,
        "abbrev": "DPA22",
        "apiIdentifier": "TODO",
        "description": "D/ST 22-27 points allowed"
    },
    "194": {
        "id": 194,
        "abbrev": "DPA28",
        "apiIdentifier": "TODO",
        "description": "D/ST 28-34 points allowed"
    },
    "195": {
        "id": 195,
        "abbrev": "DPA35",
        "apiIdentifier": "TODO",
        "description": "D/ST 35-45 points allowed"
    },
    "196": {
        "id": 196,
        "abbrev": "DPA46",
        "apiIdentifier": "TODO",
        "description": "D/ST 46+ points allowed"
    },
    "197": {
        "id": 197,
        "abbrev": "DPAPG",
        "apiIdentifier": "TODO",
        "description": "D/ST Points Allowed Per Game"
    },
    "198": {
        "id": 198,
        "abbrev": "FG50",
        "apiIdentifier": "TODO",
        "description": "FG Made (50-59 yards)"
    },
    "199": {
        "id": 199,
        "abbrev": "FGA50",
        "apiIdentifier": "TODO",
        "description": "FG Attempted (50-59 yards)"
    },
    "200": {
        "id": 200,
        "abbrev": "FGM50",
        "apiIdentifier": "TODO",
        "description": "FG Missed (50-59 yards)"
    },
    "201": {
        "id": 201,
        "abbrev": "FG60",
        "apiIdentifier": "TODO",
        "description": "FG Made (60+ yards)"
    },
    "202": {
        "id": 202,
        "abbrev": "FGA60",
        "apiIdentifier": "TODO",
        "description": "FG Attempted (60+ yards)"
    },
    "203": {
        "id": 203,
        "abbrev": "FGM60",
        "apiIdentifier": "TODO",
        "description": "FG Missed (60+ yards)"
    },
    "204": {
        "id": 204,
        "abbrev": "O2PTRET",
        "apiIdentifier": "TODO",
        "description": "Offensive 2pt Return"
    },
    "205": {
        "id": 205,
        "abbrev": "D2PTRET",
        "apiIdentifier": "TODO",
        "description": "Defensive 2pt Return"
    },
    "206": {
        "id": 206,
        "abbrev": "2PTRET",
        "apiIdentifier": "TODO",
        "description": "2pt Return"
    },
    "207": {
        "id": 207,
        "abbrev": "O1PSF",
        "apiIdentifier": "TODO",
        "description": "Offensive 1pt Safety"
    },
    "208": {
        "id": 208,
        "abbrev": "D1PSF",
        "apiIdentifier": "TODO",
        "description": "Defensive 1pt Safety"
    },
    "209": {
        "id": 209,
        "abbrev": "1PSF",
        "apiIdentifier": "TODO",
        "description": "1pt Safety"
    },
    "210": {
        "id": 210,
        "abbrev": "GP",
        "apiIdentifier": "general.gamesPlayed",
        "description": "Games Played"
    },
    "10000": {
        "id": 10000,
        "abbrev": "MISCTD",
        "description": "TD Misc"
    }
}