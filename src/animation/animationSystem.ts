import { Animation } from './animation'

class AnimationSystem {
    private animations: Array<Animation>
    private hasStarted: boolean = false

    constructor() {
        this.animations = []
    }

    public add(animation: Animation): void {
        this.animations.push(animation)
        if (this.hasStarted && animation.options.autostart) animation.start()
    }

    public init(): void {
        this.hasStarted = true
        for (let animation of this.animations) {
            if (animation.options.autostart) animation.start()
        }
    }

    public tick(deltaTime: number): void {
        for (let animation of this.animations) {
            animation.update(deltaTime)
        }
    }
}

const AS: AnimationSystem = new AnimationSystem()

export { AS }