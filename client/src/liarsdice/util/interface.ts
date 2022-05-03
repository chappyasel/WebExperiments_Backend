export interface Input {
  myDice: [number, number, number, number, number, number]
  totalDice: number
  countOnes: boolean
}

export interface Target {
  diceNumber: number
  alreadyHave: number
  scenarios: [any]
}

export const DEFAULT_INPUT: Input = {
  myDice: [2, 0, 1, 0, 0, 2],
  totalDice: 20,
  countOnes: true,
}

export async function play(input: Input) {
  return await fetch('api/liarsdice/v1/play', {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .catch(err => alert(`error: ${err}`))
}
