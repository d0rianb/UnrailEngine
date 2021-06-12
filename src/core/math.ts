import Random from '@dorianb/random-js'

export { Random }

export class Vector2 {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y)
    }

    public add(vec: Vector2): Vector2 {
        return new Vector2(this.x + vec.x, this.y + vec.y)
    }

    public multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    public dot(vec: Vector2): number {
        return this.x * vec.x + this.y * vec.y
    }

    public dist(vec: Vector2): number {
        return Math.sqrt((this.x - vec.x) ** 2 + (this.y - vec.y) ** 2)
    }
}

export type Point = Vector2
export const Point = Vector2

export const V_NULL = new Vector2(0, 0)
export const V_UNIT = new Vector2(1, 1)

export function clamp(min: number, x: number, max: number): number {
    return Math.max(min, Math.min(x, max))
}

export function inRange(x: number, min: number, max: number): boolean {
    return clamp(min, x, max) === x
}
