export class WorkerMessage {
    public title: string
    public content: any

    constructor(title: string, content: object) {
        this.title = title
        this.content = content
    }
}