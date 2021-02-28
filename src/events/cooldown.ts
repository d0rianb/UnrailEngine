class Cooldown {
    delay: number // ms
    callback: () => any | void // TODO : add params support

    constructor(delay: number, callback: () => any | void) {
        this.delay = delay
        this.callback = callback
        window.setTimeout(this.callback, this.delay)
    }
}

export { Cooldown }