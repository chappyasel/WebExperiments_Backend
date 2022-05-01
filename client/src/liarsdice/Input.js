import React from 'react'
import Form from 'react-bootstrap/Form'

export default function Input({ onChange, input }) {
  return (
    <Form>
      <div style={{ display: 'flex', gap: '5px' }}>
        {input.myDice.map((numDice, index) => (
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
        <Form.Label>Dice left (EV {ev(input.totalDice)})</Form.Label>
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

const ev = tot => {
  const val = (tot / 3).toFixed(0)
  switch (tot % 3) {
    case 0:
      return `${val}`
    case 1:
      return `over ${val}`
    case 2:
      return `under ${val}`
  }
}

const numberToString = number => {
  switch (number) {
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
  }
}
