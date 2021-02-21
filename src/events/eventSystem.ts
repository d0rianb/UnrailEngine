import { Event, EventType } from './event'

type Callback = (this: Window, ev: any) => any

class EventSystem {
    windowEvents: Array<Event>
    keyboardEvents: Array<Event>
    customEvents: Array<Event>
    currentKeyEvents: Array<KeyboardEvent>

    constructor() {
        this.windowEvents = []
        this.keyboardEvents = []
        this.customEvents = []

        this.currentKeyEvents = []

        window.addEventListener('keydown', e => {
            if (!this.currentKeyEvents.find(event => event.code === e.code)) {
                this.currentKeyEvents.push(e)
            }
        })
        window.addEventListener('keyup', e => {
            if (!this.currentKeyEvents.length) return
            this.currentKeyEvents = this.currentKeyEvents.filter(event => event.code !== e.code)
        })
    }

    addEvent(e: Event): void {
        switch (e.type) {
            case EventType.Keyboard:
                this.keyboardEvents.push(e)
            case EventType.Mouse:
                break
            case EventType.Window:
                this.windowEvents.push(e)
                this.bindEvents()
            case EventType.Custom:
                this.customEvents.push(e)
        }
    }

    getCustomEvent(name: string): Event {
        return this.customEvents.find(e => e.name === name)
    }

    bindEvents(): void {
        // TODO: check if event exist on window
        this.windowEvents.forEach(event => window.addEventListener(event.name as any, event.callback as Callback))
    }

    tick(): void {
        if (this.currentKeyEvents.length) {
            this.keyboardEvents.forEach(keyEvent => {
                this.currentKeyEvents.forEach(e => {
                    if (e.code === keyEvent.name) {
                        keyEvent.callback(e)
                    }
                })
            })
        }
    }
}
export { EventSystem }
export default EventSystem

