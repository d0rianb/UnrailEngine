export class ThreadWorker {
    protected sendMessageToMainThread(title: string, args?: any) {
        self.postMessage({ title, data: args })
    }

    protected log(...args: any[]) {
        this.sendMessageToMainThread('log', ...args)
    }
}