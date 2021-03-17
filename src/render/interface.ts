import { ModuleGraph } from 'vite'
import { Game } from '../core/game'

interface InterfaceItem {
    callback(game?: Game): string
    options: any
}

let items: Array<InterfaceItem> = []
let container: HTMLDivElement


class Interface {

    // TODO: properly define options as CSS properties
    static addItem(callback: Function, options?: any): void {
        const item: InterfaceItem = { callback, options } as InterfaceItem
        items.push(item)
        const index: number = items.length
        window.addEventListener('load', () => Interface.addToDom(item, index))
    }

    static init(): void {
        container = document.createElement('div')
        container.classList.add('ue-interface')
        document.body.appendChild(container)
    }

    static addToDom(item: InterfaceItem, index: number): void {
        const value: string = item.callback()
        const element: HTMLSpanElement = document.createElement('span')
        element.classList.add('ue-interface-items')
        element.id = `item-${index}`
        element.innerText = value
        container.appendChild(element)
    }

    static update(): void {
        items.forEach((item, i) => {
            const value: string = item.callback()
            const element: HTMLSpanElement = document.querySelector(`.ue-interface > #item-${i + 1}`)
            if (element && element.innerText !== value) {
                element.innerText = value
            }
        })
    }

    // TODO : handle CSS properties

}

export { Interface }
