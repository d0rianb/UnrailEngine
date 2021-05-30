export function blink(el: string, className: string, interval: number = 300): void {
    document.querySelector(el)?.classList.toggle(className)
    setTimeout(() => document.querySelector(el)?.classList.toggle(className), interval)
}

export function isWorker(): boolean {
    // return self instanceof DedicatedWorkerGlobalScope
    return self.document == undefined && self.window == undefined
}


export function hashObject(obj: object): string {
    let str: string = ''
    for (const key in obj) {
        str += `#${key}:${obj[key]}`
    }
    return str
}