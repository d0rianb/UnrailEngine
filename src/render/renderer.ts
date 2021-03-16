import { createCanvas } from '..'
import { insertCanvas } from '../core/geometry'
import { Point } from '../core/math'
import { Texture } from './texture'

interface StyleObject {
    strokeStyle?: string,
    lineWidth?: number,
    lineJoin?: CanvasLineJoin,
    fillStyle?: string,
    globalAlpha?: number
    globalCompositeOperation?: string
}

const defaultStyleObject: StyleObject = {
    strokeStyle: 'black',
    lineWidth: 2,
    lineJoin: 'round',
    fillStyle: 'transparent',
    globalAlpha: 1,
    globalCompositeOperation: 'add'
}

// TODO: refactor
let precision: number = 4
try {
    precision = 2 * (window.devicePixelRatio || 1)
} catch (e) { }

// Move to math file ?
function round(num: number): number {
    return ~~(num * precision) / precision
}

let ctx: CanvasRenderingContext2D = null


class Renderer {

    // Create a canvas and insert it to <main>
    static create(width: number, height: number): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = createCanvas(width, height)
        insertCanvas(canvas, 'main')
        Renderer.setContext(canvas.getContext('2d'))
        return canvas
    }

    static setContext(context: CanvasRenderingContext2D): void {
        ctx = context
    }

    static style(obj?: StyleObject): void {
        if (!ctx) throw new Error('Context has not been initialize. Please use Renderer.setContext')
        const styleObject = { ...defaultStyleObject, ...obj }
        for (let prop in styleObject) {
            if (ctx[prop] !== styleObject[prop]) {
                ctx[prop] = styleObject[prop]
            }
        }
    }

    static clear(color?: string): void {
        if (color) {
            Renderer.style({ fillStyle: color })
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        } else {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        }
    }

    static line(point1: Point, point2: Point, obj?: StyleObject): void {
        Renderer.style(obj)
        ctx.beginPath()
        ctx.moveTo(round(point1.x), round(point1.y))
        ctx.lineTo(round(point2.x), round(point2.y))
        ctx.stroke()
    }

    static rect(x: number, y: number, width: number, height: number, obj?: StyleObject, noStyle?: boolean): void {
        if (!noStyle) Renderer.style(obj)
        const [r_x, r_y, r_w, r_h] = [round(x), round(y), round(width), round(height)]
        ctx.fillRect(r_x, r_y, r_w, r_h)
        ctx.strokeRect(r_x, r_y, r_w, r_h)
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
        ctx.arc(round(x), round(y), radius, 0, 2 * Math.PI)
        ctx.stroke()
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
        ctx.arc(round(x), round(y), radius, 0, 2 * Math.PI)
        ctx.clip()
        Renderer.rectSprite(x - radius, y - radius, 2 * radius, 2 * radius, texture)
        ctx.restore()
    }

    static tint(color: string, x: number, y: number, width: number, height: number): void {
        Renderer.rect(x, y, width, height, {
            fillStyle: color,
            globalCompositeOperation: 'multiply',
            globalAlpha: .25
        })
    }
}

export { Renderer, StyleObject }
