// Dorian&Co © 2021

interface EnvInterface {
    width: number
    height: number
    update: () => void
    render: (CanvasRenderingContext2D) => void
}

class Env {
    width: number
    height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    update(): void { }

    render(ctx: CanvasRenderingContext2D): void { }

}

export { Env as GameEnvironement }
