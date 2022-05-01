import React, { useState } from 'react'
const LD = require('../../../api/liarsdice/v1/liarsdice')

export default function LiarsDice() {
  function handleClick() {
    return LD.play({
      myDice: [1, 2, 3, 4, 5, 6],
      totalDice: 20,
      countOnes: true
    })
  }

  return (
    <div> { handleClick }</div>
  )
}
