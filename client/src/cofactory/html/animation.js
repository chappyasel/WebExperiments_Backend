document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  let rows = 0
  let columns = 0
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
  let offset = 0

  const RULE = 30
  const KERNEL = new Array(8).fill(0).map((_, i) => (RULE >> i) & 1)

  function updateCanvasDimensions() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    rows = Math.ceil(canvas.height / gridSize) + 1
    columns = Math.ceil(canvas.width / gridSize) + 1
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const x = c * gridSize
        const y = r * gridSize

        ctx.font = font
        if (matrix[r][c] === 1) {
          ctx.fillStyle = colors[(r + offset) % 3][c % 3]
          ctx.globalAlpha = 0.5
        } else {
          ctx.fillStyle = grayscale[r % 3][c % 3]
          ctx.globalAlpha = 1
        }
        ctx.fillText(letters[(r + offset) % 3][c % 3], x, y)
      }
    }

    updateMatrix()
  }

  function updateMatrix() {
    const currentRow = matrix[rows - 1]
    const nextRow = []

    for (let c = 0; c < columns; c++) {
      const left = currentRow[(c - 1 + columns) % columns] || 0
      const center = currentRow[c]
      const right = currentRow[(c + 1) % columns] || 0
      nextRow[c] = KERNEL[left * 4 + center * 2 + right]
    }

    for (let r = 0; r < rows - 1; r++) {
      matrix[r] = matrix[r + 1]
    }
    matrix[rows - 1] = nextRow
  }

  function initializeMatrix() {
    const matrix = []
    for (let r = 0; r < rows; r++) {
      matrix[r] = []
      for (let c = 0; c < columns; c++) {
        matrix[r][c] = 0
      }
    }
    if (rows !== 0 && columns !== 0) matrix[rows - 1][Math.floor(columns / 2)] = 1
    return matrix
  }

  updateCanvasDimensions()
  let matrix = initializeMatrix()
  window.addEventListener('resize', () => {
    updateCanvasDimensions()
    matrix = initializeMatrix()
  })

  setInterval(draw, 1000 / 10)
  draw()
})
