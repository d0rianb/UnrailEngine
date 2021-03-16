import { Env } from './env'
import { ES } from '../events/event'
import { showStats, Stats } from '../core/stats'
import { Interface } from '../render/interface'

type RendererType = 'normal' | 'offscreen'
let rendererType = 'normal'

class Game {
    private env?: Env
    private gameLoop: FrameRequestCallback
    private stats: Stats

    constructor(env?: Env) {
        this.env = env
        this.stats = null
    }

    static setRendererType(type: RendererType) {
        rendererType = type
    }

    static get rendererType() {
        return rendererType
    }

    setMainLoop(func: Function): void {
        this.gameLoop = func as FrameRequestCallback
    }

    update(time: number): void {
        this.stats.begin()
        ES.tick()
        this.gameLoop(time)
        this.stats.end()
        window.requestAnimationFrame(time => this.update(time))
    }

    start(): void {
        if (!this.gameLoop) {
            throw new Error('No game loop')
        }

        window.addEventListener('DOMContentLoaded', () => {
            ES.init() // Event System
            Interface.init(this)
            this.stats = showStats()
            this.update(0)
        })
    }
}

export { Game }
