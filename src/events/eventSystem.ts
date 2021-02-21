import { Event, EventType } from './event'

type Callback = (this: Window, ev: any) => any

class EventSystem {
    windowEvents: Array<Event>
    keyboardEvents: Array<Event>
    customEvents: Array<Event>

    constructor() {
        this.windowEvents = []
        this.keyboardEvents = []
        this.customEvents = []
        window.addEventListener('keydown', e => {
            this.keyboardEvents.forEach(keyEvent => {
                if (e.code === keyEvent.name) {
                    keyEvent.callback(e)
                }
            })
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
}
export { EventSystem }
export default EventSystem

