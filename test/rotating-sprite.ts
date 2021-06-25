import { Game, getCanvasDimensions, OffscreenRenderer as Renderer, Texture } from '../src'

const texture = new Texture('../resources/assets/InvaderA2.png')

function update() {
    texture.rotation += .02
    render()
}

function render() {
    Renderer.beginFrame()
    Renderer.rectSprite(width / 2 - texture.image.width / 2, height / 2 - texture.image.height / 2, texture.image.width, texture.image.height, texture)
    Renderer.endFrame()
}


const canvas = Renderer.create()
const { width, height } = getCanvasDimensions(canvas)
const game = new Game('Rotating Sprite')
game.setMainLoop(update)
game.start()