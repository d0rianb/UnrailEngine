import { AS } from './animationSystem'
import { clamp } from '@/index'
import { EasingFunction, Easing } from './easing'

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
    private hasStarted: boolean = false
    private isPaused: boolean = false
    private isEnded: boolean = false
    private isReversed: boolean = false
    private speed: number
    private lastT: number

    constructor(from: number, to: number, duration: number, easing: EasingFunction = Easing.linear, options: AnimationOptions = {}) {
        this.from = from
        this.to = to
        this.duration = duration
        this.easing = easing
        this.options = { ...defaultOptions, ...options }
        this.value = this.from
        this.speed = (this.to - this.from) / this.duration
        this.isReversed = false // (this.to - this.from) > 0
        this.lastT = 0
        AS.add(this)
    }

    start(): void {
        this.isEnded = false
        this.hasStarted = true
    }

    reset(): void {
        this.lastT = 0
        this.isPaused = false
    }

    toggle(pause?: boolean): void {
        if (pause !== undefined) {
            if (pause) this.pause()
            else this.resume()
        }
        if (this.isPaused) this.resume()
        else this.pause()
    }

    pause(): void {
        this.isPaused = true
    }

    resume(): void {
        this.isPaused = false
    }

    update(deltaTime: number): void {
        if (!this.hasStarted || this.isPaused) return
        // t in  range [0, 1]
        let t = clamp(0, this.lastT + deltaTime * this.speed / Math.abs(this.to - this.from), 1)
        if (t >= 1 || t <= 0) {
            if (!this.options.loop) {
                this.isEnded = true
                this.lastT = 1
                return
            }
            // Reverse the animation
            this.speed *= -1
            this.isReversed = !this.isReversed
        }
        this.lastT = t
        this.value = this.from + (this.to - this.from) * this.easing(t)
    }
}

export {
    Animation,
    AnimationOptions,
    Easing
}