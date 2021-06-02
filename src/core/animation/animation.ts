import { EngineFailure } from '@/helpers/errors'
import { AS } from './animationSystem'
import { now } from '@/helpers/utils'

interface AnimationOptions {
    autostart?: boolean
    loop?: boolean
}

const defaultOptions: AnimationOptions = {
    autostart: false,
    loop: false
}

type EasingFunction = (t: number) => number

const Easing = {
    linear: t => t,
    easeIn: t => t ** 2,
    easeOut: t => 1 - (1 - t) ** 2,
    easeInOut: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeInOutBack: t => t < 0.5 ? (Math.pow(2 * t, 2) * ((2.5949095 + 1) * 2 * t - 2.5949095)) / 2 : (Math.pow(2 * t - 2, 2) * ((2.5949095 + 1) * (t * 2 - 2) + 2.5949095) + 2) / 2
}

class Animation {
    from: number
    to: number
    duration: number
    easing: EasingFunction
    options: AnimationOptions
    value: number
    startTimeStamp: number
    hasStarted: boolean = false
    isEnded: boolean = false
    isReversed: boolean = false

    constructor(from: number, to: number, duration: number, easing: EasingFunction = Easing.linear, options: AnimationOptions = {}) {
        this.from = from
        this.to = to
        this.duration = duration
        this.easing = easing
        this.options = { ...defaultOptions, ...options }
        this.value = this.from
        AS.add(this)
    }

    start(): void {
        this.isEnded = false
        this.hasStarted = true
        this.startTimeStamp = now()
    }


    update(): void {
        if (!this.hasStarted) return
        if (!this.startTimeStamp) throw new EngineFailure('You must call start() before update()', 'animation')
        let t: number = (now() - this.startTimeStamp) / this.duration // t in  range [0, 1]
        if (t >= 1) {
            this.isEnded = true
            if (this.options.loop) {
                this.isReversed = !this.isReversed
                this.start()
            }
            return
        }
        this.value = this.from + (this.to - this.from) * this.easing(this.isReversed ? 1 - t : t)
    }
}

export {
    Animation,
    AnimationOptions,
    Easing
}