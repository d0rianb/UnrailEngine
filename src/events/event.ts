import { EventSystem } from './eventSystem'

enum EventType {
    KeyboardPressed, KeyboardDown, Mouse, Window, Custom, All
}

type KeyboardEventCallback = (e: KeyboardEvent) => any
type MouseCallback = (e: MouseEvent) => any

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

    static emit(name: string, params?: any): void {
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

    static onKeyDown(name: string, callback: KeyboardEventCallback): void {
        ES.addEvent(new Event(name, callback, EventType.KeyboardDown))
    }

    static onKeyPressed(name: string, callback: KeyboardEventCallback): void {
        ES.addEvent(new Event(name, callback, EventType.KeyboardPressed))
    }

    static onClick(callback: MouseCallback): void {
        Event.onMouseClick(callback)
    }

    static onMouseClick(callback: MouseCallback): void {
        ES.addEvent(new Event('click', callback, EventType.Mouse))
    }

    static onMouseMove(callback: MouseCallback): void {
        ES.addEvent(new Event('mousemove', callback, EventType.Mouse))
    }
}

const ES: EventSystem = new EventSystem()

export default Event
export { Event, EventType, ES }