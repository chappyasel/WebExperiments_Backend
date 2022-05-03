import React from 'react'
import Form from 'react-bootstrap/Form'
import { Input } from '../util/interface'
import { expectedValue, numberToString } from '../util/util'

export interface Props {
  onChange: (input: Input) => void,
  input: Input
}

export default function InputForm({ onChange, input }: Props) {
  return (
    <Form>
      <div style={{ display: 'flex', gap: '5px' }}>
        {input.myDice.map((numDice, index) => (
          <Form.Group key={index} style={{ width: '100px', marginBottom: '20px' }}>
            <Form.Label>{numberToString(index)}</Form.Label>
            <Form.Control
              type='number'
              value={numDice}
              onChange={e => {
                const myDice = input.myDice
                myDice[index] = parseInt(e.target.value, 10)
                onChange({ ...input, myDice })
              }}
            />
          </Form.Group>
        ))}
      </div>
      <Form.Group className='mb-3'>
        <Form.Label>Dice left (EV {expectedValue(input.totalDice)})</Form.Label>
        <Form.Control
          type='number'
          style={{ width: '200px', marginBottom: '20px' }}
          value={input.totalDice}
          onChange={e => onChange({ ...input, totalDice: parseInt(e.target.value, 10) })}
        />
      </Form.Group>
      <Form.Check
        type='checkbox'
        label='Ones are wild'
        checked={input.countOnes}
        onChange={e => onChange({ ...input, countOnes: e.target.checked })}
      />
    </Form>
  )
}
