import { AS } from './animationSystem'
import { clamp } from '@/index'
import { Easing, EasingFunction, EasingFunctionName } from './easing'
import { EngineFailure } from '@/helpers/errors'

interface AnimationOptions {
    autostart?: boolean
    loop?: boolean
}

const defaultOptions: AnimationOptions = {
    autostart: false,
    loop: false
}

class Animation {
    public from: number
    public to: number
    public duration: number
    public easing: EasingFunction
    public options: AnimationOptions
    public value: number
    public hasStarted: boolean = false
    private isPaused: boolean = false
    private isEnded: boolean = false
    private isReversed: boolean = false
    private speed: number
    private lastT: number = 0

    constructor(from: number, to: number, duration: number, easing: EasingFunction | EasingFunctionName = Easing.linear, options: AnimationOptions = {}) {
        this.from = from
        this.to = to
        this.duration = duration
        if (easing instanceof Function) { this.easing = easing }
        else if (typeof easing === 'string' && easing in Easing) this.easing = Easing[easing]
        else throw new EngineFailure('Unknow easing parameter', 'animation')
        this.options = { ...defaultOptions, ...options }
        this.value = this.from
        this.speed = (this.to - this.from) / this.duration
        AS.add(this)
    }

    public start(): void {
        this.isEnded = false
        this.hasStarted = true
    }

    public reset(): void {
        this.lastT = 0
        this.isPaused = false
        this.hasStarted = false
        this.isEnded = false
    }

    public toggle(pause?: boolean): void {
        if (pause !== undefined) {
            if (pause) this.pause()
            else this.resume()
        }
        if (this.isPaused) this.resume()
        else this.pause()
    }

    public pause(): void {
        this.isPaused = true
    }

    public resume(): void {
        this.isPaused = false
    }

    public update(deltaTime: number): void {
        if (!this.hasStarted || this.isPaused) return
        // t in  range [0, 1]
        let t = clamp(0, this.lastT + deltaTime * this.speed / Math.abs(this.to - this.from), 1)
        if (t >= 1 || t <= 0) {
            if (!this.options.loop) {
                this.isEnded = true
                return
            }
            // Reverse the animation
            this.speed *= -1
            this.isReversed = !this.isReversed
        }
        this.lastT = t
        this.value = this.from + (this.to - this.from) * this.easing(t)
    }

    public get isRunning(): boolean {
        return this.hasStarted && !(this.isEnded || this.isPaused)
    }
}

export {
    Animation,
    AnimationOptions,
    Easing
}