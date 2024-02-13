const NUM_ROWS = 80
const NUM_COLS = 80

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  let gridScale = 1
  let gridSize = 40 * gridScale
  let gridSpacing = 12 * gridScale
  let font = 'bold ' + (gridSize - gridSpacing) + 'px Cofactory'
  let offsetX = 0
  let offsetY = 0

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

  function viewportResized() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const initialGridSize = 40
    const initialGridSpacing = 12
    const scaleX = canvas.width / ((NUM_COLS - 1) * initialGridSize)
    const scaleY = canvas.height / ((NUM_ROWS - 1) * initialGridSize)
    gridScale = Math.max(scaleX, scaleY)

    gridSize = initialGridSize * gridScale
    gridSpacing = initialGridSpacing * gridScale
    font = 'bold ' + (gridSize - gridSpacing) + 'px Cofactory'

    offsetX = (canvas.width - gridSize * NUM_COLS) / 2
    offsetY = canvas.height - gridSize * NUM_ROWS
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let r = 0; r < NUM_ROWS; r++) {
      for (let c = 0; c < NUM_COLS; c++) {
        const x = c * gridSize + offsetX
        const y = r * gridSize + offsetY

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
    const currentRow = matrix[NUM_ROWS - 1]
    const nextRow = []

    for (let c = 0; c < NUM_COLS; c++) {
      const left = currentRow[(c - 1 + NUM_COLS) % NUM_COLS] || 0
      const center = currentRow[c]
      const right = currentRow[(c + 1) % NUM_COLS] || 0
      nextRow[c] = KERNEL[left * 4 + center * 2 + right]
    }

    for (let r = 0; r < NUM_ROWS - 1; r++) {
      matrix[r] = matrix[r + 1]
    }
    matrix[NUM_ROWS - 1] = nextRow
  }

  function countNumNeighbors(row, col) {
    let numNeighbors = 0
    for (let rOffset = -1; rOffset <= 1; rOffset++) {
      for (let cOffset = -1; cOffset <= 1; cOffset++) {
        if (rOffset === 0 && cOffset === 0) return
        const r = (row + rOffset + NUM_ROWS) % NUM_ROWS
        const c = (col + cOffset + NUM_COLS) % NUM_COLS
        numNeighbors += matrix[r][c]
      }
    }
    return numNeighbors
  }

  function initializeMatrix() {
    const matrix = []
    for (let r = 0; r < NUM_ROWS; r++) {
      matrix[r] = []
      for (let c = 0; c < NUM_COLS; c++) {
        matrix[r][c] = 0
      }
    }
    if (NUM_ROWS !== 0 && NUM_COLS !== 0) matrix[NUM_ROWS - 1][Math.floor(NUM_COLS / 2)] = 1
    return matrix
  }

  viewportResized()
  let matrix = initializeMatrix()
  window.addEventListener('resize', () => {
    viewportResized()
  })

  setInterval(draw, 1000 / 10)
})
