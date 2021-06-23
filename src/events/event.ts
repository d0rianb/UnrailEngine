import { EventSystem } from './eventSystem'

enum EventType { KeyboardPressed, KeyboardDown, Mouse, Window, Custom, All }

type KeyboardEventCallback = (e: KeyboardEvent) => any
type MouseCallback = (e: MouseEvent) => any

class Event {
    public name: string
    public callback: Function // TODO: properly define callback type
    public listeners: Array<Function>
    public type: EventType

    constructor(name: string, callback: Function, type: EventType = EventType.Custom) {
        this.name = name
        this.callback = callback
        this.type = type
        this.listeners = [this.callback]
    }

    public static emit(name: string, params?: any): void {
        const event: Event = ES.getCustomEvent(name)
        if (event) {
            event.listeners.forEach(callback => callback(params))
        }
    }

    public static on(name: string, callback: Function): void {
        const existingEvent: Event = ES.getCustomEvent(name)
        if (existingEvent) {
            existingEvent.listeners.push(callback)
        } else {
            const event: Event = new Event(name, callback, EventType.Custom)
            ES.addEvent(event)
        }
    }

    public static onKeyDown(name: string, callback: KeyboardEventCallback): void {
        ES.addEvent(new Event(name, callback, EventType.KeyboardDown))
    }

    public static onKeyPressed(name: string, callback: KeyboardEventCallback): void {
        ES.addEvent(new Event(name, callback, EventType.KeyboardPressed))
    }

    public static onClick(callback: MouseCallback): void {
        Event.onMouseClick(callback)
    }

    public static onMouseClick(callback: MouseCallback): void {
        ES.addEvent(new Event('click', callback, EventType.Mouse))
    }

    public static onMouseMove(callback: MouseCallback): void {
        ES.addEvent(new Event('mousemove', callback, EventType.Mouse))
    }
}

const ES: EventSystem = new EventSystem()

export default Event
export { Event, EventType, ES }