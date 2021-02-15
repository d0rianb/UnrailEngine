import { Point, Vector2, V_UNIT, V_NULL } from '../core/math'

interface TextureOptions {
    rotation?: number, // radians
    offset?: Vector2,
    scale?: Vector2
}

class Texture {
    image: HTMLImageElement
    rotation: number
    offset: Vector2
    size: Vector2
    scale: Vector2
    options: TextureOptions

    constructor(source: string, options?: TextureOptions) {
        this.image = new Image()
        this.image.src = source
        this.size = new Vector2(this.image.width, this.image.height)
        this.options = options || {}
        this.rotation = this.options.rotation || 0
        this.offset = this.options.offset || V_NULL // relative to the size
        this.scale = this.options.scale || V_UNIT
    }
}

class Sprite extends Texture {
    constructor(source: string, options?: TextureOptions) {
        super(source, options)
    }
}

export { Sprite, Texture }
