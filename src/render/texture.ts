import { Vector2, V_UNIT, V_NULL } from '@/core/math'
import { isWorker } from '@/helpers/utils'

class TextureOptions {
    public rotation?: number // radians
    public offset?: Vector2
    public scale?: Vector2

    public static from(texture: Texture): TextureOptions {
        return {
            rotation: texture?.rotation,
            offset: texture?.offset,
            scale: texture?.scale,
        } as TextureOptions
    }
}

let textureId: number = 0

class Texture {
    public id: number
    public image: HTMLImageElement | ImageBitmap
    public rotation: number
    public offset: Vector2
    public size: Vector2
    public scale: Vector2

    constructor(source: string, options?: TextureOptions) {
        if (!source) throw new Error('A source path to the resource must be provided')
        this.id = textureId++
        this.image = new Image()
        this.image.src = source
        this.size = new Vector2(this.image.width, this.image.height)
        this.rotation = options?.rotation || 0
        this.offset = options?.offset || V_NULL // relative to the size
        this.scale = options?.scale || V_UNIT
    }

    // Create Bitmap image for worker 
    public async convertToBitmap(): Promise<Texture> | null {
        if (!this.image.width || !this.image.height) return
        const image: ImageBitmap = await createImageBitmap(this.image)
        return { ...this, image } as Texture
    }
}


class Sprite extends Texture {
    constructor(source: string, options?: TextureOptions) {
        super(source, options)
    }
}

export { Sprite, Texture, TextureOptions }
