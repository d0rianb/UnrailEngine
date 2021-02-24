// Dorian&Co © 2021
// Example SpaceInvader game to test game engine

import {
    getWindowDimensions,
    createCanvas,
    Game,
    GameObject,
    PlayerObject,
    GameEnvironement
} from '../src'
import { clamp } from '../src/core/math'
import { Renderer, Interface } from '../src/render'
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
    }

    isDead() {
        this.alive = false
    }

    update() {
        if (this.health <= 0) return this.isDead()
        this.y += 5
    }

    render(ctx) {
        Renderer.rect(ctx, this.x, this.y, 100, 50)
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

    render(ctx) {
        Renderer.rect(ctx, this.x, this.y, 30, 30)
    }
}

class Shot extends GameObject {
    constructor(x, y) {
        super(x, y)
    }

    update() {
        this.y -= 5
    }

    render(ctx) {
        Renderer.rect(ctx, this.x, this.y, 2, 5)
    }
}


// env.ts
class Env extends GameEnvironement {
    enemies: Array<Enemy>
    shots: Array<Shot>
    player: Player
    ctx: CanvasRenderingContext2D
    score: number

    constructor(width, height) {
        super(width, height)
        this.player = new Player(width / 2, height - 30)
        const canvas = createCanvas(width, height)
        this.ctx = canvas.getContext('2d')
        this.shots = []
        this.enemies = []
        this.score = 0
        this.bindEvents()

        // Temporary
        const main = document.createElement('main')
        main.setAttribute('id', 'app')
        main.appendChild(canvas)
        document.querySelector('body').appendChild(main)
    }

    bindEvents() {
        const speed = 3
        Event.onKeyDown('ArrowLeft', e => this.player.move(-5 * speed, 0))
        Event.onKeyDown('ArrowRight', e => this.player.move(5 * speed, 0))
        Event.onKeyPressed('Space', e => this.player.shoot())
        Event.on('kill', () => this.score++)
        Event.on('new-shot', ({ x, y }) => { this.shots.push(new Shot(x, y)) })
    }

    update() {
        this.player.update()
        this.shots.forEach(shot => shot.update())
        this.enemies.forEach(enemy => enemy.update())
        this.render()
    }

    render() {
        Renderer.clear(this.ctx)
        this.player.render(this.ctx)
        this.shots.forEach(shot => shot.render(this.ctx))
        this.enemies.forEach(enemy => enemy.render(this.ctx))
    }
}

// Interface.ts
Interface.addItem(game => `Score : ${game.env.score}`, { position: 'absolute', top: '0', left: '0' })
Interface.addItem(game => `Health : ${game.env.player.health}`, { position: 'absolute', top: '18px', left: '0' })


// main.ts
const { width, height } = getWindowDimensions()
const env = new Env(width, height)
const game = new Game(env)

// const keyBinds = Config.load('keybinds.json')

game.setMainLoop(() => env.update())
game.start()
