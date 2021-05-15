type AnimationFunction = (number) => any

class AnimationFrame {
    requestId: number
    fps: number
    animate: AnimationFunction

    constructor(animate: AnimationFunction, fps: number = 60) {
        this.requestId = 0
        this.animate = animate
        this.fps = fps
        if (!window) throw new Error('No window context')
    }

    start() {
        let then: number = performance.now()
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