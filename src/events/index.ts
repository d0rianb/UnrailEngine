function handleKeyDown(e: KeyboardEvent): void {
    switch (e.code) {
        case 'Space':
            this.spawnEnemy()
            e.preventDefault()
            break
        case 'Enter':
            this.saveMap('test2.map')
            e.preventDefault()
            break
        case 'Backspace':
            this.setPath(new Path([]))
            e.preventDefault()
            break
    }
}

function handleMouseClick(e: MouseEvent): void {
    if (e.target !== this.canvas) return
    const cell: Cell = this.detectCell(e)
    if (e.shiftKey && this.path) {
        this.path.addPoint(new Point(e.clientX, e.clientY))
        this.defineCellsType()
        return
    }
    if (cell && (cell.type === CellType.Empty || cell.type === CellType.Ground)) {
        const turret = new Turret(this.turrets.length, cell, this)
        if (turret.build()) {
            cell.type = CellType.Turret
        }
    }
    if (cell && cell.type == CellType.Turret) {
        this.grid.focusCell = cell
    } else {
        this.grid.focusCell = null
    }
}
