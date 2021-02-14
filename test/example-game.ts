// Dorian&Co © 2021
// Example SpaceInvader game to test game engine

import { getWindowDimensions } from 'js-game-engine'
import { Renderer, Interface } from 'js-game-engine/render'
import { Event } from 'js-game-engine/event'
import { Config } from 'js-game-engine/config'

// enemy.ts
class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y)
        this.health = 100
        this.alive = true
    }

    isDead() {
        this.alive = false
    }

    update() {
        if (this.health <= 0) return isDead()
        this.y += 5
    }

    render(ctx) {
        Renderer.rect(ctx, this.x, this.y, 100, 50)
    }
}


// player.ts
class Player extends PlayerObject {
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
        this.x += dx
        this.y += dy
    }

    shoot() {
        Event.emit('new-shot', { x: this.x, y: this.y })
    }

    update() {
        if (this.health <= 0) return isDead()
    }

    render(ctx) {
        Renderer.circle(ctx, this.x, this.y, 30)
    }
}


// env.ts
class Env extends GameEnvironement {
    enemies: Array<Enemies>
    shots: Array<Shots>
    player: Player

    constructor(width, height) {
        super(width, height)
        this.player = new Player(width / 2, height)
        this.ctx = createCanvas(width, height).getContext('2d')
        this.shots = []
        this.enemies = []
        this.score = 0
        this.bindEvents()
    }

    bindEvents() {
        Event.onKeyPressed('ArrowL', e => this.player.move(-5, 0))
        Event.onKeyPressed('ArrowR', e => this.player.move(5, 0))
        Event.on('kill', () => this.score++)
        Event.on('new-shot', ({ x, y }) => this.shots.push(new Shot(x, y)))
    }

    update() {
        Renderer.clear()
        this.player.update()
        this.shoots.forEach(shot => shot.update())
        this.enemies.forEach(enemy => enemy.update())
        this.render()
    }

    render() {
        this.player.render(this.ctx)
        this.shoots.forEach(shot => shot.render(this.ctx))
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

const keyBinds = Config.load('keybinds.json')

game.setMainLoop(env.update)
game.start()
