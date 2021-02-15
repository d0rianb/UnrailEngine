interface SizeObject {
    width?: number
    height?: number
}

function getWindowDimensions(): SizeObject {
    return { width: window.innerWidth, height: window.innerHeight }
}

function createCanvas(w: number, h: number, preventRightClick?: boolean): HTMLCanvasElement {
    const ratio: number = window.devicePixelRatio || 1
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = w * ratio
    canvas.height = h * ratio
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
    if (!!preventRightClick) {
        canvas.oncontextmenu = e => e.preventDefault()
    }
    return canvas
}

export { getWindowDimensions, createCanvas }
