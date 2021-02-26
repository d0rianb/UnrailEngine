import { Env } from './env'
import { ES } from '../events/event'

import { Interface } from '../render/interface'

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
            Interface.init(this)
            this.update(0)
        })
    }
}

export { Game }
