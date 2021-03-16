// Dorian&Co © 2021
// Example SpaceInvader game to test game engine

import {
    getWindowDimensions,
    createCanvas,
    Game,
    GameObject,
    PlayerObject,
    GameEnvironement,
    ParticuleGenerator,
    Particle
} from '../src'
import { clamp, Vector2 } from '../src/core/math'
import { OffscreenRenderer as Renderer, Interface, OffscreenRenderer } from '../src/render'
import { Event } from '../src/events'
import { Config } from '../src/config'

// enemy.ts
class Enemy extends GameObject {
    health: number
    alive: boolean

    constructor(x, y) {
        super(x, y)
        this.health = 100
        this.alive = true
        this.width = 80
        this.height = 10
    }

    isDead() {
        this.alive = false
    }

    update() {
        if (this.health <= 0) return this.isDead()
        this.y += .25
    }

    render() {
        Renderer.rect(this.x, this.y, this.width, this.height)
    }
}

// player.ts
class Player extends PlayerObject {
    health: number
    alive: boolean

    constructor(x, y) {
        super(x, y)
        this.health = 100
        this.alive = true
    }

    isDead() {
        this.alive = false
        Event.emit('kill')
    }

    move(dx, dy) {
        this.x = clamp(0, this.x + dx, window.innerWidth)
        this.y += dy
    }

    shoot() {
        Event.emit('new-shot', { x: this.x + 15, y: this.y })
    }

    update() {
        if (this.health <= 0) return this.isDead()
    }

    render() {
        Renderer.rect(this.x, this.y, 30, 30)
    }
}

class Shot extends GameObject {
    speed: number

    constructor(x, y) {
        super(x, y)
        this.width = 2
        this.height = 5
        this.speed = 6
    }

    update(enemies: Array<Enemy>) {
        enemies.forEach(enemy => {
            if (enemy.collide(this as GameObject)) {
                enemy.health -= 5
                Event.emit('hit', { shot: this, enemy })
            }
        })
        this.y -= this.speed
    }

    render() {
        Renderer.rect(this.x, this.y, this.width, this.height, { lineWidth: 4, strokeStyle: 'red' })
    }
}


// env.ts
class Env extends GameEnvironement {
    enemies: Array<Enemy>
    shots: Array<Shot>
    particles: Array<Particle>
    player: Player
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    score: number

    constructor(width, height) {
        super(width, height)
        this.player = new Player(width / 2, height - 30)
        this.canvas = createCanvas(width, height, 1)
        // this.ctx = this.canvas.getContext('2d')
        this.shots = []
        this.enemies = []
        this.particles = []
        this.score = 0
        this.bindEvents()

        for (let i = 0; i < 5; i++) {
            this.enemies.push(new Enemy(150 * i, 10))
        }

        // Temporary
        const main = document.createElement('main')
        main.setAttribute('id', 'app')
        main.appendChild(this.canvas)
        document.querySelector('body').appendChild(main)
        Renderer.transferTo(this.canvas, width, height)
    }

    bindEvents() {
        const speed = 3
        Event.onKeyDown('ArrowLeft', e => this.player.move(-5 * speed, 0))
        Event.onKeyDown('ArrowRight', e => this.player.move(5 * speed, 0))
        Event.onKeyPressed('Space', e => this.player.shoot())
        Event.on('kill', () => this.score++)
        Event.on('new-shot', ({ x, y }) => { this.shots.push(new Shot(x, y)) })
        Event.on('hit', ({ shot, enemy }) => this.hit(shot, enemy))
    }

    hit(shot: Shot, enemy: Enemy) {
        enemy.health -= 20
        this.shots = this.shots.filter(s => s !== shot)
        const PG: ParticuleGenerator = new ParticuleGenerator(25, new Vector2(shot.x, shot.y), 600, () => {
            this.particles = PG.removeParticles(this.particles)
        })
        this.particles = PG.addParticles(this.particles)

    }

    update() {
        this.player.update()
        this.shots.forEach(shot => shot.update(this.enemies))
        this.enemies.forEach(enemy => enemy.update())
        this.particles.forEach(particle => particle.update())
        this.render()
    }

    render() {
        Renderer.clear()
        this.player.render()
        this.shots.forEach(shot => shot.render())
        this.enemies.forEach(enemy => enemy.render())
        this.particles.forEach(particle => particle.render())
    }
}

// Interface.ts
Interface.addItem(game => `Score : ${game.env.score}`, { position: 'absolute', top: '0', left: '0' })
Interface.addItem(game => `Health : ${game.env.player.health}`, { position: 'absolute', top: '18px', left: '0' })


// main.ts
const { width, height } = getWindowDimensions()
const env = new Env(width, height)
const game = new Game('Space Invader', env)

// const keyBinds = Config.load('keybinds.json')

game.setMainLoop(() => env.update())
game.start()
