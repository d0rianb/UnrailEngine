import { Box } from '@/core/geometry'
import { EngineFailure } from '@/helpers/errors'
import { now } from '@/helpers/utils'
import { Texture } from '@/render/texture'

type Tuple = [number, number]

class SpriteSheet {
    spriteSheetPath: string
    cols: number
    rows: number

    constructor(spriteSheetPath: string, cols: number, rows: number) {
        this.spriteSheetPath = spriteSheetPath
        this.cols = cols
        this.rows = rows
    }
}

interface AnimatedSpriteOptions {
    interval?: number,
    loop?: boolean
}

const defaultOptions: AnimatedSpriteOptions = {
    interval: 200,
    loop: false
}
class AnimatedSprite extends Texture {
    spriteSheet: SpriteSheet
    from: Tuple
    to: Tuple
    loop: boolean
    interval: number
    intervalId: number = -1
    spriteWidth: number
    spriteHeight: number
    coordX: number
    coordY: number
    isAnimated: boolean = false
    lastRunTimeStamp: number = 0

    constructor(spriteSheet: SpriteSheet, from: Tuple, to: Tuple, options?: AnimatedSpriteOptions) {
        super(spriteSheet.spriteSheetPath)
        this.spriteSheet = spriteSheet
        if (from[0] < 1 || from[1] < 1
            || to[0] < 1 || to[1] < 1
            || from[0] > spriteSheet.cols || from[1] > spriteSheet.rows
            || to[0] > spriteSheet.cols || to[1] > spriteSheet.rows
        ) throw new EngineFailure('Invalid tuples : the spritesheet coordinate starts at (1, 1)')
        // TODO: more check on the coordinates
        this.from = from
        this.to = to
        let opt = { ...defaultOptions, ...options }
        this.interval = opt.interval
        this.loop = opt.loop
        this.spriteWidth = this.size.width / spriteSheet.cols
        this.spriteHeight = this.size.height / spriteSheet.rows
        this.coordX = this.from[0]
        this.coordY = this.from[1]
    }

    public run() {
        let nowTimeStamp: number = now()
        if (nowTimeStamp - this.lastRunTimeStamp > this.interval) {
            this.step()
            this.lastRunTimeStamp = nowTimeStamp
        }
    }


    public animate() {
        if (this.isAnimated) return
        this.intervalId = window.setInterval(() => this.step(), this.interval)
        this.isAnimated = true
    }

    public pause(): void {
        if (this.isAnimated) {
            window.clearInterval(this.intervalId)
            this.isAnimated = false
        }
    }

    public reset(): void {
        this.coordX = this.from[0]
        this.coordY = this.from[1]

    }

    public stop(): void {
        this.pause()
        this.reset()
    }

    public setInterval(interval: number): void {
        this.interval = interval
        if (this.isAnimated) {
            window.clearInterval(this.intervalId)
            this.animate()
        }
    }

    private step(): void {
        if (this.coordX === this.to[0] && this.coordY === this.to[1]) {
            if (this.loop) {
                this.coordX = this.from[0]
                this.coordY = this.from[1]
            }
            return
        }
        if (this.coordY < this.to[1]) {
            if (this.coordX < this.spriteSheet.cols) this.coordX++
            else {
                this.coordY++
                this.coordX = this.from[0]
            }
        } else {
            if (this.coordX < this.to[0]) this.coordX++
        }
    }

    public spriteBox(): Box {
        return new Box((this.coordX - 1) * this.spriteWidth, (this.coordY - 1) * this.spriteHeight, this.spriteWidth, this.spriteHeight)
    }
}

export {
    Tuple,
    SpriteSheet,
    AnimatedSprite
}
