import React from 'react'
import Form from 'react-bootstrap/Form'

export interface Input {
  myDice: [number, number, number, number, number, number],
  totalDice: number,
  countOnes: boolean,
}

export interface InputProps {
  onChange: (input: Input) => void,
  input: Input
}

export default function InputForm({ onChange, input }: InputProps): JSX.Element {
  return (
    <Form>
      <div style={{ display: 'flex', gap: '5px' }}>
        {input.myDice.map((numDice: number, index: number) => (
          <Form.Group key={index} style={{ width: '100px', marginBottom: '20px' }}>
            <Form.Label>{numberToString(index)}</Form.Label>
            <Form.Control
              type="number"
              value={numDice}
              onChange={e => {
                const myDice = input.myDice
                myDice[index] = parseInt(e.target.value)
                onChange({ ...input, myDice })
              }}
            />
          </Form.Group>
        ))}
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Dice left (EV {expectedValue(input.totalDice)})</Form.Label>
        <Form.Control
          type="number"
          style={{ width: '200px', marginBottom: '20px' }}
          value={input.totalDice}
          onChange={e => onChange({ ...input, totalDice: parseInt(e.target.value) })}
        />
      </Form.Group>
      <Form.Check
        type="checkbox"
        label="Ones are wild"
        checked={input.countOnes}
        onChange={e => onChange({ ...input, countOnes: e.target.checked })}
      />
    </Form>
  )
}

function expectedValue(total: number): string {
  const val = (total / 3).toFixed(0)
  switch (total % 3) {
    case 1:
      return `over ${val}`
    case 2:
      return `under ${val}`
    default:
      return `${val}`
  }
}

function numberToString(num: number): string {
  switch (num) {
    case 0:
      return 'Ones'
    case 1:
      return 'Twos'
    case 2:
      return 'Threes'
    case 3:
      return 'Fours'
    case 4:
      return 'Fives'
    case 5:
      return 'Sixes'
    default:
      return 'Unknown'
  }
}
