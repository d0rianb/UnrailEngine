import { Renderer } from '../renderer'

let offscreenCanvas = null
let ctx = null
// TODO : option to set resolution
let canvasResolution = 2 // higher is better but cost much

self.addEventListener('message', ({ data }) => {
    let content = data.content
    switch (data.title) {
        case 'initCanvas':
            if (content.canvas) {
                offscreenCanvas = content.canvas
                ctx = offscreenCanvas.getContext('2d')
                Renderer.setContext(ctx)

                if (content.width && content.height) setSize(content.dpr, content.width, content.height)
            }
            break
        case 'render':
            handleDrawRequest(content.method, content.args)
            break
    }
})

function setSize(dpr, width, height) {
    const pixelRatio = (dpr || 1) * canvasResolution
    offscreenCanvas.width = width * pixelRatio
    offscreenCanvas.height = height * pixelRatio
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
}

function handleDrawRequest(method, args) {
    switch (method) {
        case 'style':
            Renderer.style(args.obj)
            break
        case 'clear':
            Renderer.clear(args?.color)
            break
        case 'line':
            Renderer.line(args.point1, args.point2, args.obj)
            break
        case 'rect':
            Renderer.rect(args.x, args.y, args.width, args.height, args.obj)
            break
        case 'poly':
            Renderer.poly(args.points, args.obj)
            break
        case 'circle':
            Renderer.circle(args.x, args.y, args.radius, args.obj)
            break
        case 'point':
            Renderer.point(args.x, args.y, args.obj)
            break
        case 'rectSprite':
            Renderer.rectSprite(args.x, args.y, args.width, args.height, args.texture)
            break
        case 'circleSprite':
            Renderer.circleSprite(args.x, args.y, args.radius, args.texture)
            break
        case 'tint':
            Renderer.tint(args.color, args.x, args.y, args.width, args.height)
            break
    }
}