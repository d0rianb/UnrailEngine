import './stringExtension'

export class EngineFailure extends Error {
    constructor(msg?: string, source?: string) {
        const message = source ? `[${source.capitalize()}] - ${msg}` : msg
        super(message)
        this.name = 'EngineFailure'
    }
}

export class RendererError extends EngineFailure {
    constructor(msg?: string) {
        super(msg, 'renderer')
    }
}