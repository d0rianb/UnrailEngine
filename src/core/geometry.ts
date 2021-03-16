interface SizeObject {
    width?: number
    height?: number
}

function getWindowDimensions(): SizeObject {
    return { width: window.innerWidth, height: window.innerHeight }
}

function createCanvas(w: number, h: number, ratio?: number, preventRightClick?: boolean): HTMLCanvasElement {
    const pixelRatio: number = ratio || window.devicePixelRatio || 1
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    if (pixelRatio != 1) {
        canvas.width = w * pixelRatio
        canvas.height = h * pixelRatio
        canvas.style.width = w + 'px'
        canvas.style.height = h + 'px'
        canvas.getContext('2d').setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }
    if (!!preventRightClick) {
        canvas.oncontextmenu = e => e.preventDefault()
    }
    return canvas
}

function insertCanvas(canvas: HTMLCanvasElement, el: string): void {
    window.onload = () => {
        let element = document.querySelector(el)
        if (!element) element = document.createElement(el)
        element.appendChild(canvas)
        document.querySelector('body').appendChild(element)
    }
}

export { getWindowDimensions, createCanvas, insertCanvas }
