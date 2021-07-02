import { Event, EventType } from './event'

type Callback = (this: Window, ev: any) => any

// TODO: move the keyboardEvents in its own file
class EventSystem {
    private windowEvents: Array<Event>
    private customEvents: Array<Event>
    private mouseEvents: Array<Event>
    private keyboardEvents: Array<Event>
    private currentKeyEvents: Array<KeyboardEvent>

    constructor() {
        this.windowEvents = []
        this.customEvents = []
        this.mouseEvents = []
        this.keyboardEvents = []
        this.currentKeyEvents = []
    }

    // Need the window variable to be defined
    public init(): void {
        window.addEventListener('keydown', e => {
            if (!this.currentKeyEvents.find(event => event.code === e.code)) this.currentKeyEvents.push(e)
            this.keyboardEvents
                .filter(e => e.type === EventType.KeyboardPressed)
                .forEach(event => { if (e.code === event.name) event.callback(e) })
        })
        window.addEventListener('keyup', e => {
            if (!this.currentKeyEvents.length) return
            this.currentKeyEvents = this.currentKeyEvents.filter(event => event.code !== e.code)
        })
        this.bindEvents()
    }

    public addEvent(e: Event): void {
        switch (e.type) {
            case EventType.KeyboardDown:
                this.keyboardEvents.push(e)
                break
            case EventType.KeyboardPressed:
                this.keyboardEvents.push(e)
                break
            case EventType.Mouse:
                this.mouseEvents.push(e)
                window.addEventListener(e.name, windowEvent => e.callback(windowEvent))
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

    public getCustomEvent(name: string): Event | undefined {
        return this.customEvents.find(e => e.name === name)
    }

    private bindEvents(): void {
        // TODO: check if event exist on window
        this.windowEvents.forEach(event => window.addEventListener(event.name as any, event.callback as Callback))
    }

    public tick(): void {
        if (!this.currentKeyEvents.length) return
        this.keyboardEvents
            .filter(e => e.type === EventType.KeyboardDown)
            .forEach(keyEvent => {
                this.currentKeyEvents.forEach(e => { if (e.code === keyEvent.name) keyEvent.callback(e) })
            })
    }
}
export { EventSystem }
export default EventSystem

