import { Texture } from '..'
import { Game } from '@/core/game'
import { adaptCanvasToDevicePixelRatio, createCanvas, getWindowDimensions, insertCanvas } from '@/core/geometry'
import { Point } from '@/core/math'
import { Renderer, StyleObject, TextStyleObject } from '../renderer'
import { WorkerMessage } from './workerMessage'
import { RenderCall } from './renderCall'
import { RendererError } from '@/helpers/errors'
import { ApiIsSupported } from '@/helpers/utils'

import RendererWorker from './rendererWorker?worker&inline'
import { AnimatedSprite } from '@/animation'

type RenderStack = Array<RenderCall>

let offscreenCanvas: OffscreenCanvas
let worker: any | typeof RendererWorker
let canvas: HTMLCanvasElement
let workerIsInitialized = false
let renderStack: RenderStack = []

const textureAlias: Map<number, Texture> = new Map()

class OffscreenRenderer {

    public static get worker() { return worker }

    public static get workerIsInitialized() { return workerIsInitialized }

    public static get offscreenCanvas() { return offscreenCanvas }

    public static get renderStack() { return renderStack }

    // Create a canvas and insert it to <main>
    public static create(width?: number, height?: number): HTMLCanvasElement {
        let [windowWidth, windowHeight] = [getWindowDimensions().width, getWindowDimensions().height]
        canvas = createCanvas(width || windowWidth, height || windowHeight, 1)
        OffscreenRenderer.initRenderWorker(canvas, width || windowWidth, height || windowHeight)
        insertCanvas(canvas, 'main')
        return canvas
    }

    public static createFromCanvas(selector: string): HTMLCanvasElement {
        canvas = document.querySelector(selector)
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw new RendererError('The selected element is not a canvas')
        adaptCanvasToDevicePixelRatio(canvas, canvas.clientWidth, canvas.clientHeight, 1)
        OffscreenRenderer.initRenderWorker(canvas, canvas.width, canvas.height)
        return canvas
    }

    public static initRenderWorker(canvas: HTMLCanvasElement, width: number, height: number): void {
        if (!(Game.renderer instanceof OffscreenRenderer)) {
            Game.setRendererType('offscreen')
        }
        let { clientWidth, clientHeight } = canvas
        worker = new RendererWorker()
        offscreenCanvas = canvas.transferControlToOffscreen()
        this.sendMessageToWorker('initCanvas', {
            width: width || clientWidth,
            height: height || clientHeight,
            canvas: offscreenCanvas,
            dpr: window.devicePixelRatio || 1
        }, [offscreenCanvas])

        worker.onmessage = ({ data: { title, data } }) => {
            switch (title) {
                case 'log':
                    console.log('message from the renderer worker : ', data)
                    break
                case 'initialized':
                    workerIsInitialized = true
                    this.endFrame()
                    break
                default:
                    console.log(title)
            }
        }
    }

    public static addRenderCall(name: string, args?: object) {
        renderStack.push(new RenderCall(name, args || {}))
    }

    public static sendMessageToWorker(title: string, data?: any, transfer?: Transferable[]): void {
        return worker!.postMessage(new WorkerMessage(title, data), transfer || [])
    }

    public static style(obj?: StyleObject): void { this.addRenderCall('style', { obj }) }

    public static clear(color?: string): void { this.addRenderCall('clear', { color }) }

    public static line(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void { this.addRenderCall('line', { x1, y1, x2, y2, obj }) }

    public static rect(x: number, y: number, width: number, height: number, obj?: StyleObject): void { this.addRenderCall('rect', { x, y, width, height, obj }) }

    public static rectFromCenter(x: number, y: number, width: number, height: number, obj?: StyleObject): void { this.addRenderCall('rectFromCenter', { x, y, width, height, obj }) }

    public static rectFromPoints(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void { this.addRenderCall('rectFromPoints', { x1, y1, x2, y2, obj }) }

    public static poly(points: Array<Point>, obj?: StyleObject): void { this.addRenderCall('poly', { points, obj }) }

    public static circle(x: number, y: number, radius: number, obj?: StyleObject): void { this.addRenderCall('circle', { x, y, radius, obj }) }

    public static circleFromRect(x: number, y: number, width: number, height: number, obj: StyleObject): void { this.addRenderCall('circleFromRect', { x, y, width, height, obj }) }

    public static point(x: number, y: number, obj?: StyleObject): void { this.addRenderCall('point', { x, y, obj }) }

    // texture is only tranfered once to the worker
    // TODO: adapt to AnimatedSprite
    private static handleTexture(texture: Texture, drawCall: string, args: object): void {
        if (!texture.isLoaded) return
        if (textureAlias.has(texture.id)) {
            const { scale, rotation, offset } = texture
            this.addRenderCall(drawCall, { ...args, textureId: texture.id, scale, rotation, offset })
        } else {
            texture.convertToBitmap()?.then(adaptedTexture => {
                textureAlias.set(texture.id, adaptedTexture)
                this.sendMessageToWorker('newTexture', { id: texture.id, texture: adaptedTexture })
            })
        }
    }

    public static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void { this.handleTexture(texture, 'rectSprite', { x, y, width, height }) }

    public static async circleSprite(x: number, y: number, radius: number, texture: Texture): Promise<void> { this.handleTexture(texture, 'circleSprite', { x, y, radius }) }

    public static text(text: string, x: number, y: number, style?: TextStyleObject): void { this.addRenderCall('text', { text, x, y, style }) }

    public static centeredText(text: string, x: number, y: number, style?: TextStyleObject): void { this.addRenderCall('centeredText', { text, x, y, style }) }

    public static tint(color: string, x: number, y: number, width: number, height: number): void { this.addRenderCall('circle', { color, x, y, width, height }) }

    public static beginFrame(color?: string): void {
        renderStack = []
        this.clear(color)
    }

    public static endFrame(): void {
        if (!workerIsInitialized) return
        this.sendMessageToWorker('render', { renderStack })
        renderStack = []
    }
}

const OffscreenRendererWrapper: typeof OffscreenRenderer | typeof Renderer = ApiIsSupported('OffscreenCanvas') ? OffscreenRenderer : Renderer

export { OffscreenRendererWrapper as OffscreenRenderer }