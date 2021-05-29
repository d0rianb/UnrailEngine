import { Texture } from '..'
import { Game } from '@/core/game'
import { createCanvas, insertCanvas } from '@/core/geometry'
import { Point } from '@/core/math'
import { StyleObject } from '../renderer'
import { WorkerMessage } from './workerMessage'
import { RenderCall } from './renderCall'
import RendererWorker from './rendererWorker?worker&inline'

type RenderStack = Array<RenderCall>

let offscreenCanvas: OffscreenCanvas
let worker: any | typeof RendererWorker
let canvas: HTMLCanvasElement
let workerIsInitialized = false
let renderStack: RenderStack = []

const textureAlias: Map<number, Texture> = new Map()


class OffscreenRenderer {

    static get worker() { return worker }

    static get workerIsInitialized() { return workerIsInitialized }

    static get offscreenCanvas() { return offscreenCanvas }

    static get renderStack() { return renderStack }

    // Create a canvas and insert it to <main>
    static create(width: number, height: number): HTMLCanvasElement {
        canvas = createCanvas(width, height, 1)
        OffscreenRenderer.initRenderWorker(canvas, width, height)
        insertCanvas(canvas, 'main')
        return canvas
    }

    static initRenderWorker(canvas: HTMLCanvasElement, width: number, height: number): void {
        if (Game.rendererType !== 'offscreen') {
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
                    break
            }
        }
    }

    static addRenderCall(name: string, args?: object) {
        renderStack.push(new RenderCall(name, args || {}))
    }

    static sendMessageToWorker(title: string, data?: any, transfer?: Transferable[]): void {
        return worker!.postMessage(new WorkerMessage(title, data), transfer || [])
    }

    static style(obj?: StyleObject): void { this.addRenderCall('style', { obj }) }

    static clear(color?: string): void { this.addRenderCall('clear', { color }) }

    static line(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void { this.addRenderCall('line', { x1, y1, x2, y2, obj }) }

    static rect(x: number, y: number, width: number, height: number, obj?: StyleObject, noStyle?: boolean): void { this.addRenderCall('rect', { x, y, width, height, obj, noStyle }) }

    static poly(points: Array<Point>, obj?: StyleObject): void { this.addRenderCall('poly', { points, obj }) }

    static circle(x: number, y: number, radius: number, obj?: StyleObject): void { this.addRenderCall('circle', { x, y, radius, obj }) }

    static point(x: number, y: number, obj?: StyleObject): void { this.addRenderCall('point', { x, y, obj }) }

    // <img> object is not serializable
    static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void {
        if (textureAlias.has(texture.id)) {
            this.addRenderCall('rectSprite', { x, y, width, height, textureId: texture.id })
        } else {
            texture.convertToBitmap()?.then(adaptedTexture => {
                textureAlias.set(texture.id, adaptedTexture)
                this.sendMessageToWorker('newTexture', { id: texture.id, texture: adaptedTexture })
            })
        }
    }

    static async circleSprite(x: number, y: number, radius: number, texture: Texture): Promise<void> {
        if (textureAlias.has(texture.id)) {
            this.addRenderCall('circleSprite', { x, y, radius, textureId: texture.id })
        } else {
            texture.convertToBitmap()?.then(adaptedTexture => {
                textureAlias.set(texture.id, adaptedTexture)
                this.sendMessageToWorker('newTexture', { id: texture.id, texture: adaptedTexture })
            })
        }
    }

    static tint(color: string, x: number, y: number, width: number, height: number): void { this.addRenderCall('circle', { color, x, y, width, height }) }

    static beginFrame(): void {
        renderStack = []
        this.addRenderCall('clear')
    }

    static endFrame(): void {
        if (!workerIsInitialized) return
        this.sendMessageToWorker('render', { renderStack })
        renderStack = []
    }
}


export { OffscreenRenderer }