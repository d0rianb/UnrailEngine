import { EventSystem } from './eventSystem'

enum EventType {
    Keyboard, Mouse, Window, Custom
}

class Event {
    name: string
    callback: Function // TODO: properly define callback type
    listeners: Array<Function>
    type: EventType

    constructor(name: string, callback: Function, type: EventType = EventType.Custom) {
        this.name = name
        this.callback = callback
        this.type = type
        this.listeners = [this.callback]
    }

    static emit(name: string, ...params: any): void {
        const event: Event = ES.getCustomEvent(name)
        if (event) {
            event.listeners.forEach(callback => callback(params))
        }
    }

    static on(name: string, callback: Function): void {
        const existingEvent: Event = ES.getCustomEvent(name)
        if (existingEvent) {
            existingEvent.listeners.push(callback)
        } else {
            const event: Event = new Event(name, callback, EventType.Custom)
            ES.addEvent(event)
        }
    }

    static onKeyPressed(name: string, callback: Function): void {
        ES.addEvent(new Event(name, callback, EventType.Keyboard))
    }

    static onMouseClick(callback: Function) {
        ES.addEvent(new Event('click', callback, EventType.Mouse))
    }
}

const ES: EventSystem = new EventSystem()

export default Event
export { Event, EventType, ES }