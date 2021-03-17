import { Env } from './env'
import { ES } from '../events/event'
import { showStats, Stats } from '../core/stats'
import { Interface } from '../render/interface'

type RendererType = 'normal' | 'offscreen'
let rendererType = 'normal'

class Game {
    private name: string
    private env?: Env
    private gameLoop: FrameRequestCallback
    private stats: Stats
    private showStatsPanel: boolean

    constructor(name?: string, env?: Env) {
        this.name = name
        this.env = env
        this.stats = null
        this.showStatsPanel = true
    }

    static setRendererType(type: RendererType) {
        rendererType = type
    }

    static get rendererType() {
        return rendererType
    }

    toggleStats(show?: boolean): void {
        if (show !== undefined) {
            this.showStatsPanel = show
        } else {
            this.showStatsPanel = !this.showStatsPanel
        }
        if (this.showStatsPanel) {
            this.stats = showStats()
        } else {
            this.stats = null
            if (document.querySelector('.stats')) document.querySelector('.stats').remove()
        }
    }

    setMainLoop(func: Function): void {
        this.gameLoop = func as FrameRequestCallback
    }

    update(time: number): void {
        this.stats?.begin()
        ES.tick()
        this.gameLoop(time)
        Interface.update()
        this.stats?.end()
        window.requestAnimationFrame(time => this.update(time))
    }

    start(): void {
        if (!this.gameLoop) {
            throw new Error('No game loop')
        }

        window.addEventListener('DOMContentLoaded', () => {
            if (this.name) { document.title = this.name }
            ES.init() // Event System
            Interface.init()
            if (this.showStatsPanel) {
                this.stats = showStats()
            }
            this.update(0)
        })
    }
}

export { Game }
