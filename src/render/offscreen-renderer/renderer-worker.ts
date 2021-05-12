import { Renderer } from '../renderer'
import { ThreadWorker } from '../../helpers/threadHelper'

class RendererWorker extends ThreadWorker {
    private canvasResolution: number
    private offscreenCanvas: OffscreenCanvas
    private ctx: OffscreenRenderingContext

    constructor() {
        super()
        this.canvasResolution = 1
        this.offscreenCanvas = null
        this.ctx = null
    }

    onMessage(title: string, content: any) {
        switch (title) {
            case 'initCanvas':
                this.offscreenCanvas = content.canvas
                this.ctx = this.offscreenCanvas.getContext('2d')
                Renderer.setContext(this.ctx)
                this.setSize(content.dpr, content.width, content.height)
                this.sendMessageToMainThread('workerIsInitialized')
                break
            case 'render':
                for (let renderCall of content.renderStack) {
                    this.handleDrawRequest(renderCall.methodName, renderCall.args)
                }
                break
        }
    }

    setSize(dpr, width, height) {
        const pixelRatio: number = (dpr || 1) * this.canvasResolution
        this.offscreenCanvas.width = width * pixelRatio
        this.offscreenCanvas.height = height * pixelRatio
        'setTransform' in this.ctx ? this.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0) : null
    }

    handleDrawRequest(method: string, args: any) {
        switch (method) {
            case 'style':
                Renderer.style(args?.obj)
                break
            case 'clear':
                Renderer.clear(args?.color)
                break
            case 'line':
                Renderer.line(args.point1, args.point2, args.obj)
                break
            case 'rect':
                Renderer.rect(args.x, args.y, args.width, args.height, args.obj)
                break
            case 'poly':
                Renderer.poly(args.points, args.obj)
                break
            case 'circle':
                Renderer.circle(args.x, args.y, args.radius, args.obj)
                break
            case 'point':
                Renderer.point(args.x, args.y, args.obj)
                break
            case 'rectSprite':
                Renderer.rectSprite(args.x, args.y, args.width, args.height, args.texture)
                break
            case 'circleSprite':
                Renderer.circleSprite(args.x, args.y, args.radius, args.texture)
                break
            case 'tint':
                Renderer.tint(args.color, args.x, args.y, args.width, args.height)
                break
        }
    }
}

const renderer: RendererWorker = new RendererWorker()

self.addEventListener('message', ({ data }) => renderer.onMessage(data.title, data.content))