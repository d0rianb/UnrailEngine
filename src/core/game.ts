import { Env } from './env'
import { ES } from '../events/event'
import { stats, showStats } from '../core/stats'
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
        stats.begin()
        ES.tick()
        this.gameLoop(time)
        stats.end()
        window.requestAnimationFrame(time => this.update(time))
    }

    start(): void {
        if (!this.gameLoop) {
            throw new Error('No game loop')
        }

        window.addEventListener('DOMContentLoaded', () => {
            Interface.init(this)
            showStats()
            this.update(0)
        })
    }
}

export { Game }
