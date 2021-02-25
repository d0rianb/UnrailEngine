export class Point {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    // TODO: Implements operations

    public clone(): Point {
        return new Point(this.x, this.y)
    }

    public dist(point: Point): number {
        return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2)
    }
}

export class Vector2 {
    public x: number
    public y: number

    // TODO: Implements operations

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export const V_NULL = new Vector2(0, 0)
export const V_UNIT = new Vector2(1, 1)


export function clamp(min: number, x: number, max: number): number {
    return Math.max(min, Math.min(x, max))
}

export function sign(x: number): number {
    return x < 0 ? -1 : 1
}