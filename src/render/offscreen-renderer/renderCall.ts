export class RenderCall {
    public methodName: string
    public args: object

    constructor(name: string, args: object) {
        this.methodName = name
        this.args = args
    }
}