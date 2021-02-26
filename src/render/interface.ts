import { Game } from '../core/game'

interface InterfaceItem {
    callback(game: Game): string
    options: any
}


let pendindItems: Array<InterfaceItem> = []

class Interface {

    static items: Array<InterfaceItem>

    static init(game: Game): void {
        this.items = []
    }

    // TODO: properly define options as CSS properties
    static addItem(callback: Function, options?: any): void {
        pendindItems.push(<InterfaceItem>{ callback, options })
    }
}

export { Interface }
