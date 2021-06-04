interface SizeObject {
    width?: number
    height?: number
}

function getWindowDimensions(): SizeObject {
    return { width: window.innerWidth, height: window.innerHeight }
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
    let w: number = width || canvas.width
    let h: number = height || canvas.height
    canvas.width = w * pixelRatio
    canvas.height = h * pixelRatio
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    if (pixelRatio != 1) {
        canvas.getContext('2d')!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

}

function insertCanvas(canvas: HTMLCanvasElement, el: string): void {
    window.addEventListener('DOMContentLoaded', () => {
        let element = document.querySelector(el)
        if (!element) element = document.createElement(el)
        element.appendChild(canvas)
        document.querySelector('body')!.appendChild(element)
    })
}

export { getWindowDimensions, createCanvas, adaptCanvasToDevicePixelRatio, insertCanvas }
