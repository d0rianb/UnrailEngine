import { EngineFailure } from '@/helpers/errors'
import { now } from '@/helpers/utils'

type AnimationFunction = (time: number) => any

class AnimationFrame {
    private requestId: number
    public fps: number
    private animate: AnimationFunction

    constructor(animate: AnimationFunction, fps: number = 60) {
        this.requestId = 0
        this.animate = animate
        this.fps = fps
        if (!window) throw new EngineFailure('No window context', 'core')
    }

    start() {
        let then: number = now()
        const interval: number = 1000 / this.fps
        const tolerance: number = 0.1

        const animateLoop = time => {
            this.requestId = window.requestAnimationFrame(animateLoop)
            const delta = time - then

            if (delta >= interval - tolerance) {
                then = time - (delta % interval)
                this.animate(delta)
            }
        }
        this.requestId = window.requestAnimationFrame(animateLoop)
    }

    stop() {
        window.cancelAnimationFrame(this.requestId)
    }

}

export { AnimationFrame, AnimationFunction }