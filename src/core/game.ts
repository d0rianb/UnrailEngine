import { Env } from './env'
import { ES } from '@/events/event'
import { AS } from '@/animation/animationSystem'
import { showStats, Stats } from './stats'
import { Interface, OffscreenRenderer, Renderer } from '@/render'
import { AnimationFrame } from './animationFrame'

type RendererType = 'normal' | 'offscreen'

// Static property
let rendererType: RendererType = 'normal'

class Game {
    private name?: string
    private env?: Env
    private tick: number
    private gameLoop: Function | null
    private stats: Stats
    private showStatsPanel: boolean
    private animationFrame?: AnimationFrame
    private fps: number = 60

    constructor(name?: string, env?: Env, fps: number = 60) {
        this.name = name
        this.env = env
        this.tick = 0
        this.stats = null
        this.showStatsPanel = true
        this.gameLoop = this.env ? () => env.update() : null
        this.fps = fps
    }

    public static setRendererType(type: RendererType) {
        rendererType = type
    }

    public static get renderer(): typeof Renderer | typeof OffscreenRenderer {
        return rendererType === 'normal' ? Renderer : OffscreenRenderer
    }

    public toggleStats(show?: boolean): void {
        if (show !== undefined) {
            this.showStatsPanel = show
        } else {
            this.showStatsPanel = !this.showStatsPanel
        }
        if (this.showStatsPanel) {
            this.stats = showStats()
        } else {
            this.stats = null
            if (document.querySelector('.stats')) document.querySelector('.stats')!.remove()
        }
    }

    private makeAnimationFrame(): void {
        this.animationFrame = new AnimationFrame(deltaTime => this.update(deltaTime), this.fps)
    }

    public setMainLoop(func: Function): void {
        this.gameLoop = func
        this.makeAnimationFrame()
    }

    public setFPS(fps: number) {
        this.fps = fps
        this.makeAnimationFrame()
    }

    private update(deltaTime: number): void {
        this.stats?.begin()
        ES.tick()
        AS.tick(deltaTime)
        if (this.gameLoop) this.gameLoop(deltaTime)
        if (this.tick % Interface.updateInterval === 0) Interface.update()
        this.stats?.end()
        this.tick++
    }

    public start(): void {
        if (!this.gameLoop) throw new Error('No game loop')
        if (!this.animationFrame) throw new Error('AnimationFrame')

        window.addEventListener('DOMContentLoaded', () => {
            if (this.name) document.title = this.name
            ES.init() // Event System
            AS.init() // Animation System
            Interface.init()
            if (this.showStatsPanel) this.stats = showStats()
            this.animationFrame?.start()
        })
    }
}

export { Game }
