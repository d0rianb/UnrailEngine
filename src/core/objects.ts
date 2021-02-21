interface GameObjectInterface {
    x?: number
    y?: number
    update: () => void
    render: (CanvasRenderingContext2D) => void
}


class GameObject implements GameObjectInterface {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    update() { }
    render(ctx: CanvasRenderingContext2D) { }
}

class PlayerObject extends GameObject {
    constructor(x: number, y: number) {
        super(x, y)
    }

    update() { }
    render(ctx: CanvasRenderingContext2D) { }
}

export { GameObject, PlayerObject }
