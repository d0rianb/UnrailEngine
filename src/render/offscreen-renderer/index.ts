import { Texture } from '..'
import { Game } from '@/core/game'
import { createCanvas, insertCanvas } from '@/core/geometry'
import { Point } from '@/core/math'
import { StyleObject } from '../renderer'
import { WorkerMessage } from './workerMessage'
import { RenderCall } from './renderCall'

// ISSUE : relative path not resolved when execute from node_modules
const WORKER_PATH: string = './src/render/offscreen-renderer/renderer-worker.ts'

let offscreenCanvas: OffscreenCanvas = null
let worker: Worker = null
let canvas: HTMLCanvasElement = null
let ctx: CanvasRenderingContext2D = null
let workerIsInitialized = false
let renderStack: Array<RenderCall> = []

const textureAlias: Map<number, Texture> = new Map()


class OffscreenRenderer {

    // Create a canvas and insert it to <main>
    static create(width: number, height: number): HTMLCanvasElement {
        canvas = createCanvas(width, height, 1)
        OffscreenRenderer.initRenderWorker(canvas, width, height)
        insertCanvas(canvas, 'main')
        return canvas
    }

    static get worker() {
        return worker
    }

    static initRenderWorker(canvas, width: number, height: number): void {
        if (Game.rendererType !== 'offscreen') {
            Game.setRendererType('offscreen')
        }

        let { clientWidth, clientHeight } = canvas

        worker = new Worker(WORKER_PATH, { type: 'module' })
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
                case 'workerIsInitialized':
                    workerIsInitialized = true
                    break
            }
        }
    }

    static addRenderCall(name: string, args: object) {
        renderStack.push(new RenderCall(name, args))
    }

    static sendMessageToWorker(title: string, data?: any, transfer?: Transferable[]): void {
        return worker.postMessage(new WorkerMessage(title, data), transfer || [])
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
        if (texture.id in textureAlias) {
            this.addRenderCall('rectSprite', { x, y, width, height, textureId: texture.id })
        } else {
            texture.convertToBitmap().then(adaptedTexture => {
                textureAlias[texture.id] = adaptedTexture
                this.sendMessageToWorker('newTexture', { id: texture.id, texture: adaptedTexture })
            })
        }
    }

    static async circleSprite(x: number, y: number, radius: number, texture: Texture): Promise<void> {
        if (texture.id in textureAlias) {
            this.addRenderCall('circleSprite', { x, y, radius, textureId: texture.id })
        } else {
            const adaptedTexture: Texture = await texture.convertToBitmap()
            textureAlias[texture.id] = adaptedTexture
            this.sendMessageToWorker('newTexture', { id: texture.id, texture: adaptedTexture })
        }
    }

    static tint(color: string, x: number, y: number, width: number, height: number): void { this.addRenderCall('circle', { color, x, y, width, height }) }

    static endFrame(): void {
        if (!workerIsInitialized) return
        this.sendMessageToWorker('render', { renderStack })
        renderStack = []
    }
}


export { OffscreenRenderer }

