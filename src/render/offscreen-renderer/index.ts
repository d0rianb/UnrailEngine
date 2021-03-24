import { Texture } from '..'
import { Game } from '../../core/game'
import { createCanvas, insertCanvas } from '../../core/geometry'
import { Point } from '../../core/math'
import { Renderer, StyleObject } from '../renderer'
import { WorkerMessage } from './workerMessage'

const WORKER_PATH: string = './src/render/offscreen-renderer/renderer-worker.ts'

let offscreenCanvas: OffscreenCanvas = null
let worker: Worker = null
let canvas: HTMLCanvasElement = null

const textureAlias: Map<number, Texture> = new Map()

function sendMessageToWorker(title: string, data: any, transfer?: Transferable[]) {
    worker.postMessage(new WorkerMessage(title, data), transfer || [])
    return
}

function sendRenderRequest(methodName: string, args: any) {
    sendMessageToWorker('render', { method: methodName, args })
}

class OffscreenRenderer {

    // Create a canvas and insert it to <main>
    static create(width: number, height: number): HTMLCanvasElement {
        canvas = createCanvas(width, height, 1)
        OffscreenRenderer.transferTo(canvas, width, height)
        insertCanvas(canvas, 'main')
        return canvas
    }

    static transferTo(canvas: HTMLCanvasElement, width?: number, height?: number): void {
        offscreenCanvas = canvas.transferControlToOffscreen()
        let { clientWidth, clientHeight } = canvas

        if (Game.rendererType !== 'offscreen') {
            Game.setRendererType('offscreen')
        }

        OffscreenRenderer.initRenderWorker(width || clientWidth, height || clientHeight)
    }

    static initRenderWorker(width: number, height: number): void {
        worker = new Worker(WORKER_PATH, { type: 'module' })
        sendMessageToWorker('initCanvas', {
            canvas: offscreenCanvas,
            width,
            height,
            dpr: window.devicePixelRatio || 1
        }, [offscreenCanvas])

        worker.onmessage = e => {
            console.log('message from the worker : ', e.data)
        }
    }

    static style(obj?: StyleObject): void { sendRenderRequest('style', obj) }

    static clear(color?: string): void { sendRenderRequest('clear', color) }

    static line(point1: Point, point2: Point, obj?: StyleObject): void { sendRenderRequest('line', { point1, point2, obj }) }

    static rect(x: number, y: number, width: number, height: number, obj?: StyleObject, noStyle?: boolean): void { sendRenderRequest('rect', { x, y, width, height, obj, noStyle }) }

    static poly(points: Array<Point>, obj?: StyleObject): void { sendRenderRequest('poly', { points, obj }) }

    static circle(x: number, y: number, radius: number, obj?: StyleObject): void { sendRenderRequest('circle', { x, y, radius, obj }) }

    static point(x: number, y: number, obj?: StyleObject): void { sendRenderRequest('point', { x, y, obj }) }

    // <img> object is not serializable
    static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void {
        if (texture.id in textureAlias) {
            sendRenderRequest('rectSprite', { x, y, width, height, texture: textureAlias[texture.id] })
        } else {
            texture.convertToBitmap().then(adaptedTexture => textureAlias[texture.id] = adaptedTexture)
        }
    }

    static async circleSprite(x: number, y: number, radius: number, texture: Texture): Promise<void> {
        if (texture.id in textureAlias) {
            sendRenderRequest('circleSprite', { x, y, radius, texture: textureAlias[texture.id] })
        } else {
            const adaptedTexture: Texture = await texture.convertToBitmap()
            textureAlias[texture.id] = adaptedTexture
            sendRenderRequest('circleSprite', { x, y, radius, texture: adaptedTexture })
        }
    }

    static tint(color: string, x: number, y: number, width: number, height: number): void { sendRenderRequest('circle', { color, x, y, width, height }) }
}


export { OffscreenRenderer }

