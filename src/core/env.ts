// Dorian&Co © 2021

interface EnvInterface {
    width?: number
    height?: number
    update: (deltaTime?: number, ...args: any[]) => void
    render: (...args: any[]) => void
}

class Env implements EnvInterface {
    public width: number
    public height: number

    constructor(width?: number, height?: number) {
        this.width = width
        this.height = height
    }

    public update(): void {}

    public render(): void {}
}
function test() {}

export { Env }
