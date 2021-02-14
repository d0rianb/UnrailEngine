import { Point } from './path'
import { Texture } from './texture'

interface StyleObject {
    strokeStyle?: string,
    lineWidth?: number,
    lineJoin?: CanvasLineJoin,
    fillStyle?: string,
    globalAlpha?: number
    globalCompositeOperation?: string
}

interface RendererInterface {
    renderArea?: any
}

const defaultStyleObject: StyleObject = {
    strokeStyle: 'black',
    lineWidth: 4,
    lineJoin: 'round',
    fillStyle: 'transparent',
    globalAlpha: 1,
    globalCompositeOperation: 'add'
}

// Move to math file ?
const precision: number = 2 * (window.devicePixelRatio || 1)

function round(num: number): number {
    return ~~(num * precision) / precision
}

class Renderer implements RendererInterface {

    static style(ctx: CanvasRenderingContext2D, obj?: StyleObject): void {
        const styleObject = { ...defaultStyleObject, ...obj }
        for (let prop in styleObject) {
            if (ctx[prop] !== styleObject[prop]) {
                ctx[prop] = styleObject[prop]
            }
        }
    }

    static clear(ctx: CanvasRenderingContext2D, color?: string): void {
        if (color) {
            this.style(ctx, { fillStyle: color })
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        } else {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        }
    }

    static line(ctx: CanvasRenderingContext2D, point1: Point, point2: Point, obj?: StyleObject): void {
        Renderer.style(ctx, obj)
        ctx.beginPath()
        ctx.moveTo(round(point1.x), round(point1.y))
        ctx.lineTo(round(point2.x), round(point2.y))
        ctx.stroke()
    }

    static rect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, obj?: StyleObject, noStyle?: boolean): void {
        if (!noStyle) Renderer.style(ctx, obj)
        const [r_x, r_y, r_w, r_h] = [round(x), round(y), round(width), round(height)]
        ctx.fillRect(r_x, r_y, r_w, r_h)
        ctx.strokeRect(r_x, r_y, r_w, r_h)
    }

    static poly(ctx: CanvasRenderingContext2D, points: Array<Point>, obj?: StyleObject): void {
        if (!points.length) return
        Renderer.style(ctx, obj)
        ctx.beginPath()
        ctx.moveTo(round(points[0].x), round(points[0].y))
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(round(points[i].x), round(points[i].y))
        }
        ctx.stroke()
    }

    static circle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, obj?: StyleObject): void {
        Renderer.style(ctx, obj)
        ctx.beginPath()
        ctx.arc(round(x), round(y), radius, 0, 2 * Math.PI)
        ctx.stroke()
    }

    static point(ctx: CanvasRenderingContext2D, x: number, y: number, obj?: StyleObject): void {
        Renderer.circle(ctx, x, y, 5, obj)
    }

    static rectSprite(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, texture: Texture): void {
        Renderer.style(ctx, {})
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

    static circleSprite(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, texture: Texture): void {
        ctx.save()
        ctx.beginPath()
        ctx.arc(round(x), round(y), radius, 0, 2 * Math.PI)
        ctx.clip()
        this.rectSprite(ctx, x - radius, y - radius, 2 * radius, 2 * radius, texture)
        ctx.restore()
    }

    static tint(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, width: number, height: number): void {
        this.rect(ctx, x, y, width, height, {
            fillStyle: color,
            globalCompositeOperation: 'multiply',
            globalAlpha: .25
        })
    }
}

export { Renderer }
