import { Env } from './env'
import { ES } from '../events/event'
import { showStats, Stats } from '../core/stats'
import { Interface } from '../render'
import { AnimationFrame } from './animationFrame'

type RendererType = 'normal' | 'offscreen'
let rendererType = 'normal'

class Game {
    private name: string
    private env?: Env
    private tick: number
    private gameLoop: Function
    private stats: Stats
    private showStatsPanel: boolean
    private animationFrame: AnimationFrame
    private fps: number = 60

    constructor(name?: string, env?: Env, fps: number = 60) {
        this.name = name
        this.env = env
        this.tick = 0
        this.stats = null
        this.showStatsPanel = true
        this.gameLoop = null
        this.fps = fps
    }

    static setRendererType(type: RendererType) {
        rendererType = type
    }

    static get rendererType(): RendererType {
        return rendererType as RendererType
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

    private makeAnimationFrame(): void {
        this.animationFrame = new AnimationFrame(time => this.update(time), this.fps)
    }

    setMainLoop(func: Function): void {
        this.gameLoop = func
        this.makeAnimationFrame()
    }

    setFPS(fps: number) {
        this.fps = fps
        this.makeAnimationFrame()
    }

    update(time: number): void {
        this.stats?.begin()
        ES.tick()
        if (this.gameLoop) this.gameLoop(time)
        if (this.tick % Interface.updateInterval === 0) Interface.update()
        this.stats?.end()
        this.tick++
    }

    start(): void {
        if (!this.gameLoop) throw new Error('No game loop')
        if (!this.animationFrame) throw new Error('AnimationFrame')

        window.addEventListener('DOMContentLoaded', () => {
            if (this.name) { document.title = this.name }
            ES.init() // Event System
            Interface.init()
            if (this.showStatsPanel) {
                this.stats = showStats()
            }
            this.animationFrame.start()
        })
    }
}

export { Game }
