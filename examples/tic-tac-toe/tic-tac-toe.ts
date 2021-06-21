import { Game, OffscreenRenderer as Renderer, Event, Grid, Animation } from '../../src'

const cellWidth = 400 / 3
const grid = new Grid(3, 3)
const game = new Game('Tic Tac Toe')
let line = null
let lineAnimation = new Animation(0, 1, 1000, 'smoothStep')

function cross(x, y) {
    const padding = cellWidth / 4
    const rect = {
        x: x + padding,
        y: y + padding,
        x2: x + cellWidth - padding,
        y2: y + cellWidth - padding
    }
    Renderer.line(rect.x, rect.y, rect.x2, rect.y2)
    Renderer.line(rect.x2, rect.y, rect.x, rect.y2)
}

function checkWins() {
    // Check the rows
    for (let i = 0; i <= 2; i++) {
        if (
            grid.get(0, i).state
            && grid.get(0, i).state === grid.get(1, i).state
            && grid.get(1, i).state === grid.get(2, i).state
        ) {
            return { row: i }
        }
    }
    // Check the columns
    for (let j = 0; j <= 2; j++) {
        if (
            grid.get(j, 0).state
            && grid.get(j, 0).state === grid.get(j, 1).state
            && grid.get(j, 1).state === grid.get(j, 2).state
        ) {
            return { column: j }
        }
    }
    // Check the diagonal & anti-diagonal
    if (
        grid.get(0, 0).state
        && grid.get(0, 0).state == grid.get(1, 1).state
        && grid.get(2, 2).state == grid.get(1, 1).state
    ) {
        return { diagonal: 1 }
    }
    if (
        grid.get(0, 2).state
        && grid.get(0, 2).state == grid.get(1, 1).state
        && grid.get(2, 0).state == grid.get(1, 1).state
    ) {
        return { diagonal: -1 }
    }
    return false
}

function update() {
    render()
}

function render() {
    Renderer.beginFrame()
    for (let cell of grid.cells) {
        Renderer.rect(cell.x * cellWidth, cell.y * cellWidth, cell.width * cellWidth, cell.height * cellWidth)
        cell.state && cell.state == 'circle' && Renderer.circle(cell.x * cellWidth + cellWidth / 2, cell.y * cellWidth + cellWidth / 2, cell.width * cellWidth / 3)
        cell.state && cell.state == 'cross' && cross(cell.x * cellWidth, cell.y * cellWidth)
    }
    if (line) Renderer.line(line.x, line.y, line.x + (line.x2 - line.x) * lineAnimation.value, line.y + (line.y2 - line.y) * lineAnimation.value, { strokeStyle: 'red', lineWidth: 6 })
    Renderer.endFrame()
}

function reset() {
    line = null
    grid.clear()
    lineAnimation.reset()
}

Event.onClick(({ x, y }) => {
    const [X, Y] = [Math.floor(x / cellWidth), Math.floor(y / cellWidth)]
    if (X > 2 && Y > 2) return
    const cell = grid.get(X, Y)
    if (!cell || (cell && cell.state)) return
    const filledCells = grid.cells.filter(cell => cell.state).length
    if (filledCells % 2 == 0) cell.state = 'cross'
    else if (filledCells % 2 == 1) cell.state = 'circle'
    let win = checkWins()
    if (win) {
        if (!lineAnimation.hasStarted) lineAnimation.start()
        if ('column' in win) line = { x: (win.column + 1 / 2) * cellWidth, y: cellWidth / 3, x2: (win.column + 1 / 2) * cellWidth, y2: 2 * cellWidth + 2 * cellWidth / 3 }
        else if ('row' in win) line = { x: cellWidth / 3, y: (win.row + 1 / 2) * cellWidth, x2: 2 * cellWidth + 2 * cellWidth / 3, y2: (win.row + 1 / 2) * cellWidth }
        else if ('diagonal' in win && win.diagonal == 1) line = { x: cellWidth / 3, y: cellWidth / 3, x2: 2 * cellWidth + 2 / 3 * cellWidth, y2: 2 * cellWidth + 2 / 3 * cellWidth }
        else if ('diagonal' in win && win.diagonal == -1) line = { x: 2 * cellWidth + 2 * cellWidth / 3, y: cellWidth / 3, x2: cellWidth / 3, y2: 2 * cellWidth + 2 / 3 * cellWidth }
        window.setTimeout(reset, 1000)
    } else {
        if (!grid.cells.find(cell => !cell.state)) {
            window.setTimeout(reset, 1000)
        }
    }
})

Renderer.create(400, 400)
game.setMainLoop(update)
game.toggleStats()
game.start()