interface SizeObject {
    width?: number
    height?: number
}

function getWindowDimensions(): SizeObject {
    return { width: window.innerWidth, height: window.innerHeight }
}

function getCanvasDimensions(canvas: HTMLCanvasElement): SizeObject {
    return { width: canvas.clientWidth || canvas.width, height: canvas.clientHeight || canvas.height }
}

function createCanvas(w: number, h: number, ratio?: number, preventRightClick?: boolean): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    adaptCanvasToDevicePixelRatio(canvas, w, h, ratio)
    if (!!preventRightClick) {
        canvas.oncontextmenu = e => e.preventDefault()
    }
    return canvas
}

function adaptCanvasToDevicePixelRatio(canvas: HTMLCanvasElement, width?: number, height?: number, ratio?: number): void {
    const pixelRatio: number = ratio || window.devicePixelRatio || 1
    let w: number = width || getCanvasDimensions(canvas).width
    let h: number = height || getCanvasDimensions(canvas).height
    canvas.width = w * pixelRatio
    canvas.height = h * pixelRatio
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    if (pixelRatio != 1) { // The context must be clear for transfering an OffscreenCanvas
        canvas.getContext('2d')!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

}

function insertCanvas(canvas: HTMLCanvasElement, el: string): void {
    window.addEventListener('DOMContentLoaded', () => {
        const element = document.querySelector(el) ?? document.createElement(el)
        element.appendChild(canvas)
        document.querySelector('body')!.appendChild(element)
    })
}

export { getWindowDimensions, getCanvasDimensions, createCanvas, adaptCanvasToDevicePixelRatio, insertCanvas }
