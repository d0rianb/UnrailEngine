export class RenderCall {
    public methodName: string
    public args: object

    constructor(name, args) {
        this.methodName = name
        this.args = args
    }
}