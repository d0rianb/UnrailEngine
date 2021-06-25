import { Renderer } from '../renderer'
import { ThreadWorker } from '../../helpers/threadHelper'
import { Texture } from '../texture'

type TextureArguments = {
    textureId: number,
    rotation: number,
    scale: number,
    offset: number
}

class RendererWorker extends ThreadWorker {
    private readonly canvasResolution: number
    private offscreenCanvas: OffscreenCanvas | null
    private ctx: OffscreenRenderingContext | null
    private textureAlias: Map<number, Texture>

    constructor() {
        super()
        this.canvasResolution = 1
        this.offscreenCanvas = null
        this.ctx = null
        this.textureAlias = new Map()
        self.addEventListener('message', ({ data }) => this.onMessage(data.title, data.content))
    }

    public onMessage(title: string, content: any) {
        switch (title) {
            case 'initCanvas':
                this.offscreenCanvas = content.canvas
                this.ctx = this.offscreenCanvas.getContext('2d')
                Renderer.setContext(this.ctx)
                this.setSize(content.dpr, content.width, content.height)
                this.sendMessageToMainThread('initialized')
                break
            case 'render':
                for (let renderCall of content.renderStack) {
                    this.handleDrawRequest(renderCall.methodName, renderCall.args)
                }
                break
            case 'newTexture':
                this.textureAlias.set(content.id, content.texture)
                break
        }
    }

    private setSize(dpr, width, height) {
        const pixelRatio: number = (dpr || 1) * this.canvasResolution
        this.offscreenCanvas.width = width * pixelRatio
        this.offscreenCanvas.height = height * pixelRatio
        'setTransform' in this.ctx ? this.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0) : null
    }

    // TODO : define the type
    private getTexture(args: TextureArguments): Texture {
        const texture: Texture = this.textureAlias.get(args.textureId)
        const { scale, rotation, offset } = args
        return { ...texture, scale, rotation, offset } as unknown as Texture
    }

    private handleDrawRequest(method: string, args: any) {
        switch (method) {
            case 'style':
                Renderer.style(args?.obj)
                break
            case 'clear':
                Renderer.clear(args?.color)
                break
            case 'line':
                Renderer.line(args.x1, args.y1, args.x2, args.y2, args.obj)
                break
            case 'rect':
                Renderer.rect(args.x, args.y, args.width, args.height, args.obj)
                break
            case 'rectFromCenter':
                Renderer.rectFromCenter(args.x, args.y, args.width, args.height, args.obj)
                break
            case 'rectFromPoints':
                Renderer.rectFromPoints(args.x1, args.y1, args.x2, args.y2, args.obj)
                break
            case 'poly':
                Renderer.poly(args.points, args.obj)
                break
            case 'circle':
                Renderer.circle(args.x, args.y, args.radius, args.obj)
                break
            case 'circleFromRect':
                Renderer.circleFromRect(args.x, args.y, args.width, args.height, args.obj)
                break
            case 'point':
                Renderer.point(args.x, args.y, args.obj)
                break
            case 'rectSprite':
                Renderer.rectSprite(args.x, args.y, args.width, args.height, this.getTexture(args as TextureArguments))
                break
            case 'circleSprite':
                Renderer.circleSprite(args.x, args.y, args.radius, this.getTexture(args as TextureArguments))
                break
            case 'text':
                Renderer.text(args.text, args.x, args.y, args?.style)
                break
            case 'centeredText':
                Renderer.centeredText(args.text, args.x, args.y, args?.style)
                break
            case 'tint':
                Renderer.tint(args.color, args.x, args.y, args.width, args.height)
                break
        }
    }
}
const worker: RendererWorker = new RendererWorker()