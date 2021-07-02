import { Game } from '../core/game'
import * as CSSstyle from '@style/main.css'

interface InterfaceItem {
    callback: InterfaceTextFunction
    position?: ItemPosition
    options?: CSSOptions
    onClick?: InterfaceClickCallback
}

let items: Array<InterfaceItem> = []
let updateInterval: number = 4 // Each 4 frames

// Types needed for the Interface Class
type CSSOptions = Object
type InterfaceTextFunction = () => string
type InterfaceClickCallback = (e: MouseEvent) => any

const itemPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'custom'] as const
type ItemPosition = typeof itemPositions[number] // Type itemPositions

class Interface {

    public static addItem(callback: InterfaceTextFunction | string, position?: ItemPosition, options?: CSSOptions): void {
        Interface.internalAddItem(callback, position, options)
    }

    public static addButton(callback: InterfaceTextFunction | string, onClick?: InterfaceClickCallback, position?: ItemPosition, options?: CSSOptions): void {
        Interface.internalAddItem(callback, position, options, onClick)
    }

    private static internalAddItem(callback: InterfaceTextFunction | string, position?: ItemPosition, options?: CSSOptions, onClick?: InterfaceClickCallback): void {
        let textFunction: InterfaceTextFunction = (typeof callback === 'string') ? () => callback : callback
        const item: InterfaceItem = { callback: textFunction, position, options, onClick } as InterfaceItem
        items.push(item)
        const index: number = items.length
        window.addEventListener('load', () => Interface.addToDom(item, index))
    }

    public static init(): void {
        Interface.addStyle(CSSstyle.default)
        const container: HTMLDivElement = document.createElement('div')
        container.classList.add('ue-interface', 'ue-container')
        for (let pos of itemPositions) {
            const positionedContainer: HTMLDivElement = document.createElement('div')
            positionedContainer.classList.add(pos)
            container.appendChild(positionedContainer)
        }
        document.body.appendChild(container)
    }

    private static addStyle(style: string): void {
        const styleElement: HTMLStyleElement = document.createElement('style')
        styleElement.textContent = style
        document.head.append(styleElement)
    }

    private static addToDom(item: InterfaceItem, index: number): void {
        const value: string = item.callback()
        const element: HTMLSpanElement = document.createElement('span')
        element.classList.add('ue-interface-items')
        element.id = `item-${index}`
        element.innerText = value
        Object.entries(item.options || {}).forEach(([key, value]) => element.style[key] = value)
        if (item.position) document.querySelector(`.ue-container > .${item.position}`)?.appendChild(element)
        else document.querySelector(`.ue-container > .custom`)?.appendChild(element)
        if (!!item.onClick) {
            element.addEventListener('click', e => item.onClick!(e))
            element.classList.add('ue-interface-button')
        }
    }

    public static update(): void {
        items.forEach((item, i) => {
            const value: string = item.callback()
            const element: HTMLSpanElement | null = document.querySelector(`.ue-interface #item-${i + 1}`)
            if (element && element.innerText !== value) {
                element.innerText = value
            }
        })
    }

    // height is a css property
    public static statsShift(height: number): void {
        const TLContainer: HTMLElement | null = document.querySelector('.top-left')
        if (TLContainer) {
            TLContainer.style.top = `${height}px`
        }
    }

    public static setUpdateInterval(rate: number): void {
        updateInterval = rate
    }

    public static get updateInterval(): number {
        return updateInterval
    }

}

export { Interface }
