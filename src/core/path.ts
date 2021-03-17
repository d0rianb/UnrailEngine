import PathBuilder from 'svg-path-builder'

import { Point, Vector2, V_UNIT } from './math'
import { Renderer } from '../render/renderer'

// [[x, y], [x, y], ...]
interface JSONPath {
    points: Array<Array<number>>
}

class Path {
    public entry: Point
    public points: Array<Point>
    public end: Point
    private svg: any
    public length: number

    constructor(points: Array<Point>) {
        this.entry = points[0] || null
        this.end = points[points.length - 1]
        this.points = points
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.svg.setAttribute('d', this.toSVGPath())
        this.length = this.svg.getTotalLength()
    }

    static fromJSON(json: JSONPath, scaleFactor: Vector2 = V_UNIT) {
        const points: Array<Point> = json.points.map(tuple => new Point(tuple[0] * scaleFactor.x, tuple[1] * scaleFactor.y))
        return new Path(points)
    }

    addPoint(point: Point): void {
        if (!this.entry) this.entry = point
        this.points.push(point)
        this.end = this.points[this.points.length - 1]
        this.recalculate()
    }

    pointAt(percent) {
        return this.svg.getPointAtLength(this.length * percent / 100)
    }

    recalculate(): void {
        this.end = this.points[this.points.length - 1]
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.svg.setAttribute('d', this.toSVGPath())
        this.length = this.svg.getTotalLength()
    }

    toSVGPath(): string {
        const builder: PathBuilder = new PathBuilder()
        if (this.points.length) {
            const path = builder.moveTo(this.entry.x, this.entry.y)
            for (let i = 1; i < this.points.length; i++) {
                path.lineTo(this.points[i].x, this.points[i].y) // smoothTo ?
            }
            const stringPath: string = path.toString()
            return stringPath
        } else {
            return 'M 0 0'
        }
    }

    render(): void {
        Renderer.poly(this.points, { lineWidth: 1, fillStyle: 'grey', globalAlpha: .25 })
    }
}

export { Path }
