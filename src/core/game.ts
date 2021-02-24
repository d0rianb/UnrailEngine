import { Env } from './env'
import { ES } from '../events/event'

class Game {
    env: Env
    gameLoop: FrameRequestCallback

    constructor(env: Env) {
        this.env = env
    }

    setMainLoop(func: Function): void {
        this.gameLoop = func as FrameRequestCallback
    }

    update(time: number): void {
        ES.tick()
        this.gameLoop(time)
        window.requestAnimationFrame(time => this.update(time))
    }

    start(): void {
        if (!this.gameLoop) {
            throw new Error('No game loop')
        }

        window.addEventListener('DOMContentLoaded', () => {
            console.log(document);
            this.update(0)
        })
    }
}

export { Game }
