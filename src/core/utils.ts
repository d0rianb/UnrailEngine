export function blink(el: string, className: string, interval: number = 300): void {
    document.querySelector(el).classList.toggle(className)
    setTimeout(() => document.querySelector(el).classList.toggle(className), interval)
}

export function isWorker(): boolean {
    return self.document !== undefined
}