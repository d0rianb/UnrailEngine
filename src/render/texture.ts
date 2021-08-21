import { Vector2, V_UNIT, V_NULL } from '@/core/math'
import { isWorker } from '@/helpers/utils'
import { SizeObject } from '@/core/geometry'

interface TextureOptions {
    rotation?: number, // radians
    offset?: Vector2,
    scale?: Vector2
}

let textureId: number = 0

class Texture {
    public id: number
    public image: HTMLImageElement | ImageBitmap
    public rotation: number
    public offset: Vector2
    public size: SizeObject
    public scale: Vector2
    public isLoaded: boolean = false

    constructor(source: string, options?: TextureOptions) {
        if (!source) throw new Error('A source path to the resource must be provided')
        this.id = textureId++
        this.image = new Image()
        this.image.src = source
        this.image.onload = () => {
            this.isLoaded = true
            this.onLoad()
        }
        this.size = { width: this.image.width, height: this.image.height }
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

    public onLoad(): void { }
}


export { Texture }
