import { Event, EventType } from './event'

type Callback = (this: Window, ev: any) => any

// TODO: move the keyboardEvents in its own file
class EventSystem {
    windowEvents: Array<Event>
    keyboardDownEvents: Array<Event>
    customEvents: Array<Event>
    keyboardPressedEvents: Array<Event>
    currentKeyEvents: Array<KeyboardEvent>

    constructor() {
        this.windowEvents = []
        this.keyboardDownEvents = []
        this.keyboardPressedEvents = []
        this.customEvents = []

        this.currentKeyEvents = []
    }

    // Need the window variable to be defined
    init(): void {
        window.addEventListener('keydown', e => {
            if (!this.currentKeyEvents.find(event => event.code === e.code)) {
                this.currentKeyEvents.push(e)
            }
            this.keyboardPressedEvents.forEach(event => {
                if (e.code === event.name) {
                    event.callback(e)
                }
            })
        })
        window.addEventListener('keyup', e => {
            if (!this.currentKeyEvents.length) return
            this.currentKeyEvents = this.currentKeyEvents.filter(event => event.code !== e.code)
        })
    }

    addEvent(e: Event): void {
        switch (e.type) {
            case EventType.KeyboardDown:
                this.keyboardDownEvents.push(e)
                break
            case EventType.KeyboardPressed:
                this.keyboardPressedEvents.push(e)
                break
            case EventType.Mouse:
                break
            case EventType.Window:
                this.windowEvents.push(e)
                this.bindEvents()
                break
            case EventType.Custom:
                this.customEvents.push(e)
                break
        }
    }

    getCustomEvent(name: string): Event | undefined {
        return this.customEvents.find(e => e.name === name)
    }

    bindEvents(): void {
        // TODO: check if event exist on window
        this.windowEvents.forEach(event => window.addEventListener(event.name as any, event.callback as Callback))
    }

    tick(): void {
        if (!this.currentKeyEvents.length) return
        this.keyboardDownEvents.forEach(keyEvent => {
            this.currentKeyEvents.forEach(e => {
                if (e.code === keyEvent.name) {
                    keyEvent.callback(e)
                }
            })
        })
    }
}
export { EventSystem }
export default EventSystem

