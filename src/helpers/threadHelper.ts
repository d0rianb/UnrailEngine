export class ThreadWorker {
    sendMessageToMainThread(title: string, args?: any) {
        self.postMessage({ title, data: args })
    }

    log(...args: any[]) {
        this.sendMessageToMainThread('log', ...args)
    }
}