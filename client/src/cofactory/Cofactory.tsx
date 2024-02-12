import { set } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
const glitch = require('glitch-canvas')

const debug = false

const MatrixAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [colorMode, setColorMode] = useState<'color' | 'grayscale'>('color')
  const [displayMode, setDisplayMode] = useState<'logo' | 'text'>('logo')
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
  const text = 'COFACTORY: THE FUTURE OF VALUE CREATION IN AN AI-BASED ECONOMY.'
  const textPadding = 3
  const textMaxColumns = 80
  const textNumColumns = Math.min(textMaxColumns, text.length, columns - textPadding * 2)
  const textNumRows = Math.ceil(text.length / textNumColumns)
  const textStartColumn = Math.floor((columns - textNumColumns) / 2)
  const textStartRow = Math.floor((rows - textNumRows) / 2)

  const handleClick = () => {
    setColorMode(colorMode === 'color' ? 'grayscale' : 'color')
    setDisplayMode(displayMode === 'logo' ? 'text' : 'logo')
  }

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
    }

    updateCanvasDimensions()

    let animationFrameId: number

    const matrix: number[][] = []
    for (let c = 0; c < columns; c++) {
      matrix[c] = []
      for (let r = 0; r < rows; r++) {
        matrix[c][r] = 0
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * gridSize
          const y = r * gridSize

          if (displayMode === 'text') {
            ctx.globalAlpha = 1
            if (
              r >= textStartRow &&
              r < textStartRow + textNumRows &&
              c >= textStartColumn &&
              c < textStartColumn + textNumColumns
            ) {
              ctx.fillStyle = 'white'
              ctx.font = font
              const letter = text[(r - textStartRow) * textNumColumns + (c - textStartColumn)] || ''
              ctx.fillText(letter, x, y)
              continue
            }
          } else {
            ctx.globalAlpha = 1
            const logoStartColumn = Math.floor((columns - 9) / 2)
            const logoStartRow = Math.floor((rows - 9) / 2)
            if (
              r >= logoStartRow &&
              r < logoStartRow + 9 &&
              c >= logoStartColumn &&
              c < logoStartColumn + 9
            ) {
              if ((r - logoStartRow) % 3 !== 0 || (c - logoStartColumn) % 3 !== 0) continue
              const letterR = (r - logoStartRow) / 3
              const letterC = (c - logoStartColumn) / 3
              ctx.fillStyle = colors[letterR][letterC]
              ctx.font = 'bold ' + gridSize * 2 + 'px Cofactory'
              const letter = letters[letterR][letterC]
              ctx.fillText(letter, x + gridSpacing, y + gridSpacing * 2 + gridSize)
              continue
            }
          }

          if (colorMode === 'color') {
            ctx.fillStyle = colors[c % 3][r % 3]
          } else {
            ctx.fillStyle = grayscale[c % 3][r % 3]
          }
          ctx.font = font
          ctx.globalAlpha = matrix[c][r]
          ctx.fillText(letters[r % 3][c % 3], x, y)
        }
      }

      // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      // glitch({ seed: Math.random() * 100 })
      //   .fromImageData(imageData)
      //   .toImageData()
      //   .then(function (updatedImageData: any) {
      //     const canvas = canvasRef.current
      //     if (!canvas) return
      //     const ctx = canvas.getContext('2d')
      //     if (!ctx) return
      //     ctx.putImageData(updatedImageData, 0, 0)
      //   })

      // function rgbSplit(imageData: any, options: any) {
      //   // destructure the offset values from options, default to 0
      //   const { rOffset = 0, gOffset = 0, bOffset = 0 } = options
      //   // clone the pixel array from original imageData
      //   const originalArray = imageData.data
      //   const newArray = new Uint8ClampedArray(originalArray)
      //   // loop through every pixel and assign values to the offseted position
      //   for (let i = 0; i < originalArray.length; i += 4) {
      //     newArray[i + 0 + rOffset * 4] = originalArray[i + 0] // 🔴
      //     newArray[i + 1 + gOffset * 4] = originalArray[i + 1] // 🟢
      //     newArray[i + 2 + bOffset * 4] = originalArray[i + 2] // 🔵
      //   }
      //   // return a new ImageData object
      //   return new ImageData(newArray, imageData.width, imageData.height)
      // }
      // const updatedImageData = rgbSplit(imageData, {
      //   rOffset: 0,
      //   gOffset: -0,
      //   bOffset: 0,
      // })
      // ctx.putImageData(updatedImageData, 0, 0)

      updateMatrix()
      animationFrameId = requestAnimationFrame(draw)
    }

    const updateMatrix = () => {
      for (let c = 0; c < columns; c++) {
        for (let r = rows - 1; r >= 0; r--) {
          if (r === 0) {
            if (Math.random() > 0.98) {
              matrix[c][r] = 1
            } else {
              matrix[c][r] = 0
            }
          } else {
            if (matrix[c][r - 1] > 0.99) {
              matrix[c][r] = 1
            } else {
              matrix[c][r] = matrix[c][r] - 0.012
            }
          }
        }
      }
    }

    // setInterval(draw, 1000 / 5)
    // draw()

    var creal = -0.8
    var cimag = 0.156
    var frame = 0

    var pallette: string[] = [] //an array that stores the RGB combinations

    function julia() {
      for (var y = 0; y < 300; y++) {
        for (var x = 0; x < 300; x++) {
          var cx = -1 + x / 50
          var cy = -1 + y / 50
          var i = 0

          do {
            var xt = cx * cx - cy * cy + creal
            cy = 2 * cx * cy + cimag
            cx = xt
            i++
          } while (cx * cx + cy * cy < 4 && i < 25)

          //i=i.toString(16); - commented out since not needed in this version
          // ctx!.beginPath()
          //ctx!.rect(x * 14, y * 14, 10, 10)
          ctx!.font = font
          ctx!.fillStyle = pallette[i]
          ctx!.fillText('C', x * 14, y * 14)
        }
      }
      frame++
      creal = -0.8 + 0.6 * Math.sin(frame / (3.14 * 20))
      cimag = 0.156 + 0.4 * Math.cos(frame / (3.14 * 40))
    }

    for (
      let x = 0;
      x < 9;
      x++ // this loop populates the color pallette array
    ) {
      let color = (31 * x).toString(16) // convert the number to hex
      if (color.length == 1) color = '0' + color // add a zero in front if only one hex digit
      pallette[x] = '#' + color + color + 'ff' // colors 0-8: the Red and Green components change, Blue=FF
      pallette[x + 8] = '#00ff' + color // colors 8-16: the Blue component changes, Red and Green=FF
      pallette[17 + x] = '#' + color + '0000' // colors 17-25: the Red component changes, Green and Blue=0
    }

    let a = setInterval(julia, 100)

    // window.addEventListener('resize', updateCanvasDimensions)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', updateCanvasDimensions)
    }
  }) //, [colorMode, rows, columns])

  return (
    <>
      <GlobalStyle />
      <canvas ref={canvasRef} onClick={handleClick} />
      <p className="title">What happens after the cost of software becomes zero?</p>
      <p className="subtitle">Work with us and find out</p>
      {debug && (
        <p className="debug">
          {colorMode}
          <br />
          R: {rows}, C: {columns}
          <br />
          Text R: {textNumRows}, C: {textNumColumns}
          <br />
          Text Start R: {textStartRow}, C: {textStartColumn}
        </p>
      )}
    </>
  )
}

export default MatrixAnimation

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
  .debug {
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    color: white;
    padding: 12px;
    font-size: 15px;
    font-family: monospace;
    user-select: none;
  }
  .title {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: black;
    color: white;
    padding: 12px;
    font-size: 15px;
    font-family: 'Cofactory';
    user-select: none;
    text-align: center;
  }
  .subtitle {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: black;
    color: white;
    padding: 12px;
    font-size: 15px;
    font-family: 'Cofactory';
    user-select: none;
    text-align: center;
  }
  @font-face {
    font-family: 'Cofactory';
    src: url('./Cofactory.ttf');
  }
`
