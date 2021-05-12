type AnimationFunction = (number) => any

class AnimationFrame {
    requestId: number
    fps: number
    animate: AnimationFunction

    constructor(animate: AnimationFunction, fps: number = 60) {
        this.requestId = 0
        this.animate = animate
        this.fps = fps
    }

    start() {
        let then = performance.now()
        const interval = 1000 / this.fps
        const tolerance = 0.1

        const animateLoop = time => {
            this.requestId = requestAnimationFrame(animateLoop)
            const delta = time - then

            if (delta >= interval - tolerance) {
                then = time - (delta % interval)
                this.animate(delta)
            }
        }
        this.requestId = requestAnimationFrame(animateLoop)
    }

    stop() {
        cancelAnimationFrame(this.requestId)
    }

}

export { AnimationFrame, AnimationFunction }