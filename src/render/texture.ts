import { Vector2, V_UNIT, V_NULL } from '@/core/math'
import { isWorker } from '@/helpers/utils'

interface TextureOptions {
    rotation?: number, // radians
    offset?: Vector2,
    scale?: Vector2
}

let textureId: number = 0

class Texture {
    id: number
    image: HTMLImageElement
    rotation: number
    offset: Vector2
    size: Vector2
    scale: Vector2
    options: TextureOptions

    constructor(source: string, options?: TextureOptions) {
        if (!source) throw new Error('A source path to the resource must be provided')
        this.id = textureId++
        this.image = new Image()
        this.image.src = source
        this.size = new Vector2(this.image.width, this.image.height)
        this.options = options || {}
        this.rotation = this.options.rotation || 0
        this.offset = this.options.offset || V_NULL // relative to the size
        this.scale = this.options.scale || V_UNIT
    }

    // Create Bitmap image for worker 
    async convertToBitmap(): Promise<Texture> | null {
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

export { Sprite, Texture }
