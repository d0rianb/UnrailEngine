import { Env } from './env'

class Game {
    env: Env
    mainLoop: FrameRequestCallback

    constructor(env: Env) {
        this.env = env
    }

    setMainLoop(func: Function): void {
        this.mainLoop = func as FrameRequestCallback
    }

    loop(time: number): void {
        this.mainLoop(time)
        window.requestAnimationFrame(time => this.loop(time))
    }

    start(): void {
        if (!this.mainLoop) {
            throw new Error('No mainloop for the game')
        }
        this.loop(0)
    }
}

export { Game }
