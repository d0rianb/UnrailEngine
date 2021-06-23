type CooldownCallback = () => any

class Cooldown {
    private delay: number // ms
    private callback: CooldownCallback // TODO : add params support

    constructor(delay: number, callback: CooldownCallback) {
        this.delay = delay
        this.callback = callback
        window.setTimeout(this.callback, this.delay)
    }
}

export { Cooldown }