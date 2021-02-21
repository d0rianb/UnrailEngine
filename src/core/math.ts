class Point {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    // TODO: Implements operations

    dist(point: Point): number {
        return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2)
    }
}

class Vector2 {
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

export { Point, Vector2 }
