import { Texture } from '..'
import { Point } from '../../core/math'
import { Renderer, StyleObject } from '../renderer'
import { WorkerMessage } from './workerMessage'

const WORKER_PATH: string = './src/render/offscreen/renderer-worker.ts'

let offscreenCanvas: OffscreenCanvas = null
let worker: Worker = null

function sendMessageToWorker(title: string, data: any, transfer?: Transferable[]) {
    worker.postMessage(new WorkerMessage(title, data), transfer || [])
}

function sendRenderRequest(methodName: string, args: any) {
    sendMessageToWorker('render', { method: methodName, args })
}

class OffscreenRenderer extends Renderer {
    static transferTo(canvas: HTMLCanvasElement, width?: number, height?: number): void {
        offscreenCanvas = canvas.transferControlToOffscreen()
        this.initWorker(width, height)
    }

    static initWorker(width?: number, height?: number): void {
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

    static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void { sendRenderRequest('rectSprite', { x, y, width, height, texture }) }

    static circleSprite(x: number, y: number, radius: number, texture: Texture): void { sendRenderRequest('circleSprite', { x, y, radius, texture }) }

    static tint(color: string, x: number, y: number, width: number, height: number): void { sendRenderRequest('circle', { color, x, y, width, height }) }
}


export { OffscreenRenderer }

