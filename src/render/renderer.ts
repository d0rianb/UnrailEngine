import { adaptCanvasToDevicePixelRatio, createCanvas, getWindowDimensions, insertCanvas } from '@/core/geometry'
import { Point } from '@/core/math'
import { Texture } from './texture'
import { isWorker } from '@/helpers/utils'
import { RendererError } from '@/helpers/errors'

type CanvasRenderContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

interface StyleObject {
    strokeStyle?: string,
    lineWidth?: number,
    lineJoin?: CanvasLineJoin,
    lineCap?: CanvasLineCap,
    fillStyle?: string,
    globalAlpha?: number
    globalCompositeOperation?: string
}

interface TextStyleObject {
    font?: string,
    size?: number,
    color?: string,
    align?: 'end' | 'left' | 'right' | 'center'
}

const defaultStyleObject: StyleObject = {
    strokeStyle: 'black',
    lineWidth: 2,
    lineJoin: 'round',
    lineCap: 'round',
    fillStyle: 'transparent',
    globalAlpha: 1,
    globalCompositeOperation: 'add'
}

const defaultTextStyleObject: TextStyleObject = {
    font: 'Roboto',
    size: 16, // in px
    color: 'black'
}

const TWOPI = 2 * Math.PI
let precision: number = isWorker() ? 4 : 2 * (window.devicePixelRatio || 1)

// Move to math file ?
function round(num: number): number {
    return ~~(num * precision) / precision
}

let ctx: CanvasRenderContext
let lastStyleObject: StyleObject

class Renderer {

    // Create a canvas and insert it to <main>
    static create(width?: number, height?: number): HTMLCanvasElement {
        let [windowWidth, windowHeight] = [getWindowDimensions().width, getWindowDimensions().height]
        const canvas: HTMLCanvasElement = createCanvas(width || windowWidth, height || windowHeight)
        insertCanvas(canvas, 'main')
        Renderer.setContext(canvas.getContext('2d')!)
        return canvas
    }

    static createFromCanvas(selector: string): HTMLCanvasElement {
        let canvas = document.querySelector(selector)
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw new RendererError('The selected element is not a canvas')
        adaptCanvasToDevicePixelRatio(canvas)
        Renderer.setContext(canvas.getContext('2d')!)
        return canvas
    }

    static setContext(context: CanvasRenderContext): void {
        ctx = context
    }

    static getContext(): CanvasRenderContext {
        return ctx
    }

    static style(obj?: StyleObject): void {
        if (!ctx) throw new RendererError('Context has not been initialize. Please use Renderer.setContext')
        const styleObject = { ...defaultStyleObject, ...obj }
        if (styleObject === lastStyleObject) return
        for (let prop in styleObject) {
            if (ctx[prop] !== styleObject[prop]) {
                ctx[prop] = styleObject[prop]
            }
        }
        lastStyleObject = styleObject
    }

    static clear(color?: string): void {
        if (color) {
            Renderer.style({ fillStyle: color })
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        } else {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        }
    }

    static line(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void {
        Renderer.style(obj)
        ctx.beginPath()
        ctx.moveTo(round(x1), round(y1))
        ctx.lineTo(round(x2), round(y2))
        ctx.stroke()
    }

    /* Draw a rect from its top-left corner */
    static rect(x: number, y: number, width: number, height: number, obj?: StyleObject): void {
        Renderer.style(obj)
        const [r_x, r_y, r_w, r_h] = [round(x), round(y), round(width), round(height)]
        ctx.fillRect(r_x, r_y, r_w, r_h)
        ctx.strokeRect(r_x, r_y, r_w, r_h)
    }

    /* Draw a rect from its center */
    static rectFromCenter(x: number, y: number, width: number, height: number, obj?: StyleObject): void {
        return Renderer.rect(x - width / 2, y - height / 2, width, height, obj)
    }

    /* Draw a rect from its top-left corner to its bottom-right corner */
    static rectFromPoints(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void {
        return Renderer.rect(x1, y1, x2 - x1, y2 - y1, obj)
    }


    static poly(points: Array<Point>, obj?: StyleObject): void {
        if (!points.length) return
        Renderer.style(obj)
        ctx.beginPath()
        ctx.moveTo(round(points[0].x), round(points[0].y))
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(round(points[i].x), round(points[i].y))
        }
        ctx.stroke()
    }

    static circle(x: number, y: number, radius: number, obj?: StyleObject): void {
        Renderer.style(obj)
        ctx.beginPath()
        ctx.arc(round(x), round(y), radius, 0, TWOPI)
        ctx.fill()
        ctx.stroke()
    }

    /* Draw the circle included in the rect */
    static circleFromRect(x: number, y: number, width: number, height: number, obj: StyleObject): void {
        return Renderer.circle(x + width / 2, y + height / 2, Math.min(width, height) / 2, obj)
    }

    static point(x: number, y: number, obj?: StyleObject): void {
        Renderer.circle(x, y, 5, obj)
    }

    static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void {
        Renderer.style({})
        ctx.save()
        ctx.translate(round(x + width / 2), round(y + height / 2))
        ctx.scale(texture.scale.x, texture.scale.y)
        ctx.rotate(texture.rotation)
        ctx.drawImage(
            texture.image,
            round(width * texture.offset.x - width / 2),
            round(height * texture.offset.y - height / 2),
            round(width),
            round(height)
        )
        ctx.restore()
    }

    static circleSprite(x: number, y: number, radius: number, texture: Texture): void {
        ctx.save()
        ctx.beginPath()
        ctx.arc(round(x), round(y), radius, 0, TWOPI)
        ctx.clip()
        Renderer.rectSprite(x - radius, y - radius, 2 * radius, 2 * radius, texture)
        ctx.restore()
    }

    static text(text: string, x: number, y: number, style?: TextStyleObject): void {
        if (!!ctx) {
            let styleObject = { ...defaultTextStyleObject, ...style }
            ctx.font = `${styleObject.size}px ${styleObject.font}`
            Renderer.style({ fillStyle: styleObject.color })
        }
        ctx.fillText(text, x, y)
    }

    static tint(color: string, x: number, y: number, width: number, height: number): void {
        Renderer.rect(x, y, width, height, {
            fillStyle: color,
            globalCompositeOperation: 'multiply',
            globalAlpha: .25
        })
    }

    // For the compatibility with OffscreenRenderer
    static beginFrame(color?: string): void {
        Renderer.clear(color)
    }

    // For the compatibility with OffscreenRenderer
    static endFrame(): void { }
}

export { Renderer, StyleObject }
