export class WorkerMessage {
    title: string
    content: any

    constructor(title: string, content: object) {
        this.title = title
        this.content = content
    }
}