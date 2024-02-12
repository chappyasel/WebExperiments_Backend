import React, { useEffect, useRef, useState } from 'react'
import { createGlobalStyle } from 'styled-components'

import logo from './logo.png'

const RULE = 30
const ruleKernel = new Array(8).fill(0).map((_, i) => (RULE >> i) & 1)

const Animation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rows, setRows] = useState<number>(0)
  const [columns, setColumns] = useState<number>(0)
  const gridScale = 0.5
  const gridSize = 40 * gridScale
  const gridSpacing = 12 * gridScale
  const font = 'bold ' + (gridSize - gridSpacing) + 'px Cofactory'
  const letters = [
    ['C', 'O', 'F'],
    ['A', 'C', 'T'],
    ['O', 'R', 'Y'],
  ]
  const colors = [
    ['#ff0000', '#ff00ff', '#8000ff'],
    ['#ff8000', '#ffffff', '#0000ff'],
    ['#ffff00', '#00ff00', '#00ffff'],
  ]
  const grayscale = [
    ['#202020', '#303030', '#303030'],
    ['#202020', '#363636', '#202020'],
    ['#303030', '#202020', '#303030'],
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setRows(Math.ceil(canvas.height / gridSize) + 1)
      setColumns(Math.ceil(canvas.width / gridSize) + 1)
      console.log('rows:', rows, 'columns:', columns)
    }

    updateCanvasDimensions()

    const matrix: number[][] = []
    for (let r = 0; r < rows; r++) {
      matrix[r] = []
      for (let c = 0; c < columns; c++) {
        matrix[r][c] = 0
      }
    }
    // make bottom center cell alive
    if (rows !== 0 && columns !== 0) matrix[rows - 1][Math.floor(columns / 2)] = 1

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const x = c * gridSize
          const y = r * gridSize

          ctx.globalAlpha = matrix[r][c] * 0.5
          if (matrix[r][c] === 1) {
            ctx.fillStyle = colors[r % 3][c % 3]
          } else {
            ctx.fillStyle = grayscale[r % 3][c % 3]
          }
          ctx.font = font
          ctx.fillText(letters[r % 3][c % 3], x, y)
        }
      }

      updateMatrix()
    }

    const updateMatrix = () => {
      const currentRow = matrix[rows - 1]

      const nextRow: number[] = []
      // calculate the next row according to the rule kernel with wrap around
      for (let c = 0; c < columns; c++) {
        const left = currentRow[(c - 1 + columns) % columns] || 0
        const center = currentRow[c]
        const right = currentRow[(c + 1) % columns] || 0
        nextRow[c] = ruleKernel[left * 4 + center * 2 + right]
      }

      // move the matrix up
      for (let r = 0; r < rows - 1; r++) {
        matrix[r] = matrix[r + 1]
      }
      // set the new row
      matrix[rows - 1] = nextRow

      // all 1s for testing
      // for (let r = 0; r < rows; r++) {
      //   for (let c = 0; c < columns; c++) {
      //     matrix[r][c] = 1
      //   }
      // }
    }

    const interval = setInterval(draw, 1000 / 10)
    window.addEventListener('resize', updateCanvasDimensions)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', updateCanvasDimensions)
    }
  }, [rows, columns])

  return (
    <>
      <GlobalStyle />
      <div id="content">
        <p className="title">What happens after AI drives the cost of software to zero?</p>
        <a href="mailto:hello@cofactory.ai" className="subtitle">
          Work with us and find out
        </a>
        <img src={logo} alt="Cofactory logo" />
      </div>
      <div id="footer">
        <p>Neo • Madrona • AI Grant • Stanford • GenAI Collective</p>
      </div>
      <canvas ref={canvasRef} />
    </>
  )
}

export default Animation

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background: black;
  }
  canvas {
    display:block;
  }
  // center green text with white border
  #content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #content img {
    display: block;
    margin: 0 auto;
    width: 100px;
  }
  #footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background: black;
    color: white;
    padding: 12px;
    font-size: 15px;
    font-family: 'Cofactory';
    user-select: none;
  }
  .title {
    background: black;
    color: white;
    padding: 12px;
    font-size: 15px;
    font-family: 'Cofactory';
    user-select: none;
    text-align: center;
    border: 3px solid white;
    margin-bottom: 32px;
  }
  // center vertical red text with red border
  .subtitle {
    background: black;
    color: red;
    padding: 12px;
    font-size: 15px;
    font-family: 'Cofactory';
    user-select: none;
    text-align: center;
    border: 3px solid red;
  }
  @font-face {
    font-family: 'Cofactory';
    src: url('./Cofactory.ttf');
  }
`
