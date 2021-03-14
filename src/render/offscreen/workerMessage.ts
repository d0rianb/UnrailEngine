export class WorkerMessage {
    title: string
    content: any

    constructor(title: string, content: any) {
        this.title = title
        this.content = content
    }
}