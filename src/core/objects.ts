interface GameObjectInterface {
    x?: number
    y?: number
    update: (...args: any[]) => void
    render: (ctx: CanvasRenderingContext2D, ...args: any[]) => void
    [propName: string]: any
}


class GameObject implements GameObjectInterface {
    x: number
    y: number
    width?: number
    height?: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    collide(obj: GameObject): boolean { // AABB algorithm
        if (!obj.width || !obj.height || !this.width || !this.height) return false // Should throw an error ?
        return this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.height + this.y > obj.y
    }

    update(...args: any[]) { }

    render(ctx: CanvasRenderingContext2D, ...args: any[]) { }
}

class PlayerObject extends GameObject {
    constructor(x: number, y: number) {
        super(x, y)
    }

    update(...args: any[]) { }

    render(ctx: CanvasRenderingContext2D, ...args: any[]) { }
}

export { GameObject, PlayerObject }
