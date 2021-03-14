import Random from '@dorianb/random-js'

import { GameObject } from './objects'
import { Vector2, clamp, inRange } from './math'
import { Cooldown } from '../events'
import { Renderer } from '../render'

// TODO : improve  (temporary)
let renderer: Renderer = Renderer // Can be change to offscreen renderer

const GRAVITY: number = .01 // N

type ParticleAngle = number | 'random'
type Callback = () => void


class Particle extends GameObject {
    public id: number
    public pos: Vector2
    public velocity: Vector2
    public color: string
    public angle: ParticleAngle
    public radius: number
    public opacity: number

    constructor(id: number, pos: Vector2, speed: number = 5, angle?: ParticleAngle, color?: string) {
        super(pos.x, pos.y)
        this.id = id
        this.pos = pos.clone()
        this.angle = (angle && angle != 'random') ? (angle % 2 * Math.PI) : (Math.PI / 2 + Math.random() * 2 * Math.PI)
        this.velocity = new Vector2(Math.random() * speed * Math.cos(this.angle), Math.random() * speed * Math.sin(this.angle))
        this.color = color || 'red'
        this.opacity = clamp(100, Math.random() * 255, 255)
        this.radius = 2
    }

    update(): void {
        this.velocity.y += GRAVITY
        this.pos = this.pos.add(this.velocity)
        this.opacity--
    }

    render(): void {
        renderer.circle(this.pos.x, this.pos.y, this.radius, { fillStyle: this.color, lineWidth: 1, globalAlpha: this.opacity / 255 })
    }
}

// TODO : add particle options (color, size, etc)
class ParticuleGenerator {
    public pos: Vector2
    public lifeDuration: number
    public particles: Array<Particle>
    private UUID: number

    constructor(nbParticles: number, pos: Vector2, lifeDuration: number, onDestroy?: Callback) {
        this.pos = pos
        this.lifeDuration = lifeDuration
        this.particles = []
        this.UUID = Random.randint(1, 100) * 100 // TODO : move UUID generation to math.ts
        for (let i = 0; i < nbParticles; i++) {
            let particles: Particle = new Particle(this.UUID + i, this.pos)
            this.particles.push(particles)

        }
        let cd: Cooldown = new Cooldown(this.lifeDuration, () => {
            this.destroy()
            onDestroy()
        })
    }

    setRenderer(r: Renderer): void {
        renderer = r
    }

    addParticles(array: Array<Particle>): Array<Particle> {
        return array.concat(this.particles)
    }

    removeParticles(array: Array<Particle>): Array<Particle> {
        const nbParticles: number = this.particles.length
        return array.filter(el => !inRange(el.id, this.UUID, this.UUID + nbParticles))
    }

    destroy(): void {
        // this.particles = []
    }
}


export { Particle, ParticuleGenerator }