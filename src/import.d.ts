declare module "*.json" {
    const value: any
    export default value
}

declare module "*.json5" {
    const value: any
    export default value
}

declare module "*.png" {
    const value: any
    export default value
}

// web worker
declare module '*?worker' {
    const workerConstructor: {
        new(): Worker
    }
    export default workerConstructor
}

declare module '*?worker&inline' {
    const workerConstructor: {
        new(): Worker
    }
    export default workerConstructor
}
