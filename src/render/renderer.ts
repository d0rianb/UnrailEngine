import { Box, adaptCanvasToDevicePixelRatio, createCanvas, getWindowDimensions, insertCanvas } from '@/core/geometry'
import { Point, Vector2, V_NULL } from '@/core/math'
import { Texture } from './texture'
import { isWorker } from '@/helpers/utils'
import { RendererError } from '@/helpers/errors'
import { AnimatedSprite } from '@/animation/animatedSprite'

type CanvasRenderContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

interface StyleObject {
    color?: string,
    strokeStyle?: string
    lineWidth?: number
    lineJoin?: CanvasLineJoin
    lineCap?: CanvasLineCap
    fillStyle?: string
    globalAlpha?: number
    globalCompositeOperation?: string
}

interface TextStyleObject {
    font?: string
    size?: number
    color?: string
    textAlign?: 'end' | 'left' | 'right' | 'center',
    textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
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
    color: 'black',
    textAlign: 'left',
    textBaseline: 'alphabetic'
}

const TWOPI = 2 * Math.PI
let precision: number = isWorker() ? 4 : 2 * (window.devicePixelRatio || 1)
let offset: Vector2 = V_NULL

// Move to math file ?
function round(num: number): number {
    return ~~(num * precision) / precision
}

let ctx: CanvasRenderContext
let lastStyleObject: StyleObject

class Renderer {

    // Create a canvas and insert it to <main>
    public static create(width?: number, height?: number): HTMLCanvasElement {
        let [windowWidth, windowHeight] = [getWindowDimensions().width, getWindowDimensions().height]
        const canvas: HTMLCanvasElement = createCanvas(width || windowWidth, height || windowHeight)
        insertCanvas(canvas, 'main')
        Renderer.setContext(canvas.getContext('2d')!)
        return canvas
    }

    public static createFromCanvas(selector: string): HTMLCanvasElement {
        let canvas = document.querySelector(selector)
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw new RendererError('The selected element is not a canvas')
        adaptCanvasToDevicePixelRatio(canvas)
        Renderer.setContext(canvas.getContext('2d')!)
        return canvas
    }

    public static setContext(context: CanvasRenderContext): void {
        ctx = context
    }

    public static getContext(): CanvasRenderContext {
        return ctx
    }

    // TODO: implement Camera
    public static setOffset(x: number, y: number): void {
        offset = new Vector2(x, y)
    }

    public static getOffset(): Vector2 {
        return offset
    }

    public static style(obj?: StyleObject): void {
        if (!ctx) throw new RendererError('Context has not been initialize. Please use Renderer.setContext')
        const styleObject = { ...defaultStyleObject, ...obj }
        if (styleObject === lastStyleObject) return
        if ('color' in styleObject) {
            styleObject['fillStyle'] = styleObject['color']
            styleObject['strokeStyle'] = styleObject['color']
            delete styleObject['color']
        }
        for (let prop in styleObject) {
            if (ctx[prop] !== styleObject[prop]) {
                ctx[prop] = styleObject[prop]
            }
        }
        lastStyleObject = styleObject
    }

    private static textStyle(obj?: TextStyleObject): void {
        if (!!ctx) {
            let styleObject = { ...defaultTextStyleObject, ...obj }
            ctx.font = `${styleObject.size}px ${styleObject.font}`
            delete styleObject.size
            delete styleObject.font
            Renderer.style({ fillStyle: styleObject.color, ...styleObject })
        }
    }

    public static clear(color?: string): void {
        if (color) {
            Renderer.style({ fillStyle: color })
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        } else {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        }
    }

    public static line(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void {
        Renderer.style(obj)
        ctx.beginPath()
        ctx.moveTo(round(offset.x + x1), round(offset.y + y1))
        ctx.lineTo(round(offset.x + x2), round(offset.y + y2))
        ctx.stroke()
    }

    /* Draw a rect from its top-left corner */
    public static rect(x: number, y: number, width: number, height: number, obj?: StyleObject): void {
        Renderer.style(obj)
        const [r_x, r_y, r_w, r_h] = [round(x + offset.x), round(y + offset.y), round(width), round(height)]
        ctx.fillRect(r_x, r_y, r_w, r_h)
        ctx.strokeRect(r_x, r_y, r_w, r_h)
    }

    /* Draw a rect from its center */
    public static rectFromCenter(x: number, y: number, width: number, height: number, obj?: StyleObject): void {
        return Renderer.rect(x - width / 2, y - height / 2, width, height, obj)
    }

    /* Draw a rect from its top-left corner to its bottom-right corner */
    public static rectFromPoints(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void {
        return Renderer.rect(x1, y1, x2 - x1, y2 - y1, obj)
    }


    public static poly(points: Array<Point>, obj?: StyleObject): void {
        if (!points.length) return
        Renderer.style(obj)
        ctx.beginPath()
        ctx.moveTo(round(points[0].x + offset.x), round(points[0].y + offset.y))
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(round(points[i].x + offset.x), round(points[i].y + offset.y))
        }
        ctx.stroke()
    }

    public static circle(x: number, y: number, radius: number, obj?: StyleObject): void {
        Renderer.style(obj)
        ctx.beginPath()
        ctx.arc(round(x + offset.x), round(y + offset.y), radius, 0, TWOPI)
        ctx.fill()
        ctx.stroke()
    }

    /* Draw the circle included in the rect */
    public static circleFromRect(x: number, y: number, width: number, height: number, obj: StyleObject): void {
        return Renderer.circle(x + width / 2, y + height / 2, Math.min(width, height) / 2, obj)
    }

    public static point(x: number, y: number, obj?: StyleObject): void {
        Renderer.circle(x, y, 5, obj)
    }

    public static rectSprite(x: number, y: number, width: number, height: number, texture: Texture | AnimatedSprite): void {
        if (!texture.isLoaded) return
        Renderer.style({})
        ctx.save()
        ctx.translate(round(x + width / 2 + offset.x), round(y + height / 2 + offset.y))
        ctx.scale(texture.scale.x, texture.scale.y)
        ctx.rotate(texture.rotation)
        let sourceBox: Box = new Box(0, 0, texture.size.width, texture.size.height)
        if (texture instanceof AnimatedSprite) {
            sourceBox = texture.spriteBox()
        }
        ctx.drawImage(
            texture.image,
            sourceBox.x,
            sourceBox.y,
            sourceBox.width,
            sourceBox.height,
            round(width * texture.offset.x - width / 2),
            round(height * texture.offset.y - height / 2),
            round(width),
            round(height)
        )
        ctx.restore()
    }

    public static circleSprite(x: number, y: number, radius: number, texture: Texture): void {
        if (!texture.isLoaded) return
        ctx.save()
        ctx.beginPath()
        ctx.arc(round(x + offset.x), round(y + offset.y), radius, 0, TWOPI)
        ctx.clip()
        Renderer.rectSprite(x - radius, y - radius, 2 * radius, 2 * radius, texture)
        ctx.restore()
    }

    public static text(text: string, x: number, y: number, style?: TextStyleObject): void {
        Renderer.textStyle(style)
        ctx.fillText(text, x, y)
    }

    public static centeredText(text: string, x: number, y: number, style?: TextStyleObject): void {
        Renderer.text(text, x, y, { ...style, textAlign: 'center', textBaseline: 'middle' })
    }

    public static tint(color: string, x: number, y: number, width: number, height: number): void {
        Renderer.rect(x, y, width, height, {
            fillStyle: color,
            globalCompositeOperation: 'multiply',
            globalAlpha: .25
        })
    }

    // For the compatibility with OffscreenRenderer
    public static beginFrame(color?: string): void {
        Renderer.clear(color)
    }

    // For the compatibility with OffscreenRenderer
    public static endFrame(): void { }
}

export { Renderer, StyleObject, TextStyleObject }
