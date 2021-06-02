import { Animation } from './animation'

class AnimationSystem {
    animations: Array<Animation>
    hasStarted: boolean = false

    constructor() {
        this.animations = []
    }

    add(animation: Animation): void {
        this.animations.push(animation)
        if (this.hasStarted && animation.options.autostart) animation.start()
    }

    init(): void {
        this.hasStarted = true
        for (let animation of this.animations) {
            if (animation.options.autostart) animation.start()
        }
    }

    tick(): void {
        for (let animation of this.animations) {
            animation.update()

        }
    }
}

const AS: AnimationSystem = new AnimationSystem()

export { AS }