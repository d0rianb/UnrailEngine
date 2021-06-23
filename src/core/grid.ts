interface NeihboorObject {
    top?: Cell
    right?: Cell
    bottom?: Cell
    left?: Cell
}

// TODO : rename this class AbstractGrid
// TODO: add properties scope
class Grid {
    public rows: number
    public cols: number
    public cells: Array<Cell>
    public focusCell: Cell

    constructor(cols: number, rows: number) {
        this.rows = rows
        this.cols = cols
        this.cells = []
        this.focusCell = null
        this.createCells()
        this.defineNeighboors()
    }

    private createCells() {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                this.cells.push(new Cell(col, row))
            }
        }
    }

    private updateCell(newCell: Cell) {
        if (!this.cells.includes(newCell)) return
        if (newCell.width !== 1 || newCell.height !== 1) {
            if (newCell.width > 1) {
                let range: number = newCell.width - 1
                let removeCell: Array<Cell> = this.cells.filter(cell => cell.y === newCell.y && cell.x > newCell.x && cell.x <= newCell.x + range)
                this.cells = this.cells.filter(cell => !removeCell.includes(cell))
            }
            if (newCell.height > 1) {
                let range: number = newCell.height - 1
                let removeCell: Array<Cell> = this.cells.filter(cell => cell.x === newCell.x && cell.y > newCell.y && cell.y <= newCell.y + range)
                this.cells = this.cells.filter(cell => !removeCell.includes(cell))
            }
        }
        this.defineNeighboors()
        this.cells[this.cells.indexOf(newCell)] = newCell
    }

    private defineNeighboors(): void {
        this.cells.forEach(cell => {
            cell.neighboors.top = cell.y >= 1 ? this.cells.filter(othercell => othercell.x <= cell.x && othercell.x + othercell.width > cell.x && othercell.y === cell.y - cell.height)[0] : null
            cell.neighboors.bottom = cell.y <= this.rows - 1 ? this.cells.filter(othercell => othercell.x <= cell.x && othercell.x + othercell.width > cell.x && othercell.y === cell.y + cell.height)[0] : null
            cell.neighboors.left = cell.x >= 1 ? this.cells.filter(othercell => othercell.y <= cell.y && othercell.y + othercell.height > cell.y && othercell.x === cell.x - cell.width)[0] : null
            cell.neighboors.right = cell.x <= this.cols - 1 ? this.cells.filter(othercell => othercell.y <= cell.y && othercell.y + othercell.height > cell.y && othercell.x === cell.x + cell.width)[0] : null
        })
    }

    public get(x, y): Cell {
        return this.cells[x * this.cols + y]
    }

    public clear(): void {
        this.cells.forEach(cell => cell.state = null)
    }

}

class Cell {
    public x: number
    public y: number
    public width: number
    public height: number
    public state: any // can be use for any purpose
    public neighboors: NeihboorObject

    constructor(x: number, y: number, width = 1, height = 1) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.state = null
        this.neighboors = {}
    }
}

export { Grid, Cell }
