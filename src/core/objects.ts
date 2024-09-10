interface GameObjectInterface {
    x?: number
    y?: number
    update: (...args: any[]) => void
    render: (...args: any[]) => void
    [propName: string]: any
}


class GameObject implements GameObjectInterface {
    public x: number
    public y: number
    public width?: number
    public height?: number

    constructor(x: number, y: number, width?: number, height?: number) {
        this.x = x
        this.y = y
        this.width = width || 100
        this.height = height || width || 100
    }

    public contains(x: number, y: number): boolean {
        return this.x <= x && this.x + this.width >= x
            && this.y <= y && this.y + this.height >= y
    }

    public collide(obj: GameObject): boolean { // AABB algorithm
        if (!obj.width || !obj.height || !this.width || !this.height) return false // Should throw an error ?
        return this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.height + this.y > obj.y
    }

    public update(...args: any[]) { }

    public render(...args: any[]) { }
}

class PlayerObject extends GameObject {
    constructor(x: number, y: number, width?: number, height?: number) {
        super(x, y, width, height)
    }

    public update(...args: any[]) { }

    public render(...args: any[]) { }
}

export { GameObject, PlayerObject }
