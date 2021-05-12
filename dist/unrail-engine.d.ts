declare module "src/core/math" {
    import Random from '@dorianb/random-js';
    export { Random };
    export class Vector2 {
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(vec: Vector2): Vector2;
        clone(): Vector2;
        dist(vec: Vector2): number;
    }
    export type Point = Vector2;
    export const Point: typeof Vector2;
    export const V_NULL: Vector2;
    export const V_UNIT: Vector2;
    export function clamp(min: number, x: number, max: number): number;
    export function inRange(x: number, min: number, max: number): boolean;
}
declare module "src/core/env" {
    interface EnvInterface {
        width: number;
        height: number;
        update: (deltaTime?: number, ...args: any[]) => void;
        render: (...args: any[]) => void;
    }
    class Env implements EnvInterface {
        width: number;
        height: number;
        constructor(width: number, height: number);
        update(): void;
        render(): void;
    }
    export { Env };
}
declare module "src/events/eventSystem" {
    import { Event } from "src/events/event";
    class EventSystem {
        windowEvents: Array<Event>;
        keyboardDownEvents: Array<Event>;
        customEvents: Array<Event>;
        keyboardPressedEvents: Array<Event>;
        currentKeyEvents: Array<KeyboardEvent>;
        constructor();
        init(): void;
        addEvent(e: Event): void;
        getCustomEvent(name: string): Event;
        bindEvents(): void;
        tick(): void;
    }
    export { EventSystem };
    export default EventSystem;
}
declare module "src/events/event" {
    import { EventSystem } from "src/events/eventSystem";
    enum EventType {
        KeyboardPressed = 0,
        KeyboardDown = 1,
        Mouse = 2,
        Window = 3,
        Custom = 4
    }
    class Event {
        name: string;
        callback: Function;
        listeners: Array<Function>;
        type: EventType;
        constructor(name: string, callback: Function, type?: EventType);
        static emit(name: string, params?: any): void;
        static on(name: string, callback: Function): void;
        static onKeyDown(name: string, callback: Function): void;
        static onKeyPressed(name: string, callback: Function): void;
        static onMouseClick(callback: Function): void;
    }
    const ES: EventSystem;
    export default Event;
    export { Event, EventType, ES };
}
declare module "src/core/geometry" {
    interface SizeObject {
        width?: number;
        height?: number;
    }
    function getWindowDimensions(): SizeObject;
    function createCanvas(w: number, h: number, ratio?: number, preventRightClick?: boolean): HTMLCanvasElement;
    function insertCanvas(canvas: HTMLCanvasElement, el: string): void;
    export { getWindowDimensions, createCanvas, insertCanvas };
}
declare module "src/core/utils" {
    export function blink(el: string, className: string, interval?: number): void;
    export function isWorker(): boolean;
}
declare module "src/render/texture" {
    import { Vector2 } from "src/core/math";
    interface TextureOptions {
        rotation?: number;
        offset?: Vector2;
        scale?: Vector2;
    }
    class Texture {
        id: number;
        image: HTMLImageElement;
        rotation: number;
        offset: Vector2;
        size: Vector2;
        scale: Vector2;
        options: TextureOptions;
        constructor(source: string, options?: TextureOptions);
        convertToBitmap(): Promise<Texture> | null;
    }
    class Sprite extends Texture {
        constructor(source: string, options?: TextureOptions);
    }
    export { Sprite, Texture };
}
declare module "src/render/renderer" {
    import { Point } from "src/core/math";
    import { Texture } from "src/render/texture";
    type CanvasRenderContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    interface StyleObject {
        strokeStyle?: string;
        lineWidth?: number;
        lineJoin?: CanvasLineJoin;
        fillStyle?: string;
        globalAlpha?: number;
        globalCompositeOperation?: string;
    }
    class Renderer {
        static create(width: number, height: number): HTMLCanvasElement;
        static setContext(context: CanvasRenderContext): void;
        static getContext(): CanvasRenderContext;
        static style(obj?: StyleObject): void;
        static clear(color?: string): void;
        static line(point1: Point, point2: Point, obj?: StyleObject): void;
        static rect(x: number, y: number, width: number, height: number, obj?: StyleObject, noStyle?: boolean): void;
        static poly(points: Array<Point>, obj?: StyleObject): void;
        static circle(x: number, y: number, radius: number, obj?: StyleObject): void;
        static point(x: number, y: number, obj?: StyleObject): void;
        static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void;
        static circleSprite(x: number, y: number, radius: number, texture: Texture): void;
        static tint(color: string, x: number, y: number, width: number, height: number): void;
    }
    export { Renderer, StyleObject };
}
declare module "src/render/offscreen-renderer/workerMessage" {
    export class WorkerMessage {
        title: string;
        content: any;
        constructor(title: string, content: any);
    }
}
declare module "src/render/offscreen-renderer/renderCall" {
    export class RenderCall {
        methodName: string;
        args: object;
        constructor(name: any, args: any);
    }
}
declare module "src/render/offscreen-renderer/index" {
    import { Texture } from "src/render/index";
    import { Point } from "src/core/math";
    import { StyleObject } from "src/render/renderer";
    class OffscreenRenderer {
        static create(width: number, height: number): HTMLCanvasElement;
        static initRenderWorker(canvas: any, width: number, height: number): void;
        static addRenderCall(name: string, args: object): void;
        static sendMessageToWorker(title: string, data?: any, transfer?: Transferable[]): void;
        static style(obj?: StyleObject): void;
        static clear(color?: string): void;
        static line(point1: Point, point2: Point, obj?: StyleObject): void;
        static rect(x: number, y: number, width: number, height: number, obj?: StyleObject, noStyle?: boolean): void;
        static poly(points: Array<Point>, obj?: StyleObject): void;
        static circle(x: number, y: number, radius: number, obj?: StyleObject): void;
        static point(x: number, y: number, obj?: StyleObject): void;
        static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void;
        static circleSprite(x: number, y: number, radius: number, texture: Texture): Promise<void>;
        static tint(color: string, x: number, y: number, width: number, height: number): void;
        static endFrame(): void;
    }
    export { OffscreenRenderer };
}
declare module "src/render/interface" {
    import { Game } from "src/core/game";
    interface InterfaceItem {
        callback(game?: Game): string;
        position?: ItemPosition;
        options?: CSSOptions;
        onClick?: InterfaceClickCallback;
    }
    type CSSOptions = Object;
    type InterfaceTextFunction = () => string;
    type InterfaceClickCallback = (e: MouseEvent) => any;
    const itemPositions: readonly ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
    type ItemPosition = typeof itemPositions[number];
    class Interface {
        static addItem(callback: InterfaceTextFunction, position?: ItemPosition, options?: CSSOptions): void;
        static addButton(callback: InterfaceTextFunction, position?: ItemPosition, options?: CSSOptions, onClick?: InterfaceClickCallback): void;
        private static internalAddItem;
        static init(): void;
        static addToDom(item: InterfaceItem, index: number): void;
        static update(): void;
        static statsShift(height: number): void;
        static setUpdateInterval(rate: number): void;
        static get updateInterval(): number;
    }
    export { Interface };
}
declare module "src/render/index" {
    export { Renderer } from "src/render/renderer";
    export { OffscreenRenderer } from "src/render/offscreen-renderer/index";
    export { Texture } from "src/render/texture";
    export { Interface } from "src/render/interface";
}
declare module "src/core/stats" {
    import Stats from 'stats.js';
    function showStats(): Stats;
    export { showStats, Stats };
}
declare module "src/core/animationFrame" {
    type AnimationFunction = (number: any) => any;
    class AnimationFrame {
        requestId: number;
        fps: number;
        animate: AnimationFunction;
        constructor(animate: AnimationFunction, fps?: number);
        start(): void;
        stop(): void;
    }
    export { AnimationFrame, AnimationFunction };
}
declare module "src/core/game" {
    import { Env } from "src/core/env";
    type RendererType = 'normal' | 'offscreen';
    class Game {
        private name;
        private env?;
        private tick;
        private gameLoop;
        private stats;
        private showStatsPanel;
        private animationFrame;
        private fps;
        constructor(name?: string, env?: Env, fps?: number);
        static setRendererType(type: RendererType): void;
        static get rendererType(): RendererType;
        toggleStats(show?: boolean): void;
        private makeAnimationFrame;
        setMainLoop(func: Function): void;
        setFPS(fps: number): void;
        update(time: number): void;
        start(): void;
    }
    export { Game };
}
declare module "src/core/objects" {
    interface GameObjectInterface {
        x?: number;
        y?: number;
        update: (...args: any[]) => void;
        render: (ctx: CanvasRenderingContext2D, ...args: any[]) => void;
        [propName: string]: any;
    }
    class GameObject implements GameObjectInterface {
        x: number;
        y: number;
        width?: number;
        height?: number;
        constructor(x: number, y: number);
        collide(obj: GameObject): boolean;
        update(...args: any[]): void;
        render(ctx: CanvasRenderingContext2D, ...args: any[]): void;
    }
    class PlayerObject extends GameObject {
        constructor(x: number, y: number);
        update(...args: any[]): void;
        render(ctx: CanvasRenderingContext2D, ...args: any[]): void;
    }
    export { GameObject, PlayerObject };
}
declare module "src/events/cooldown" {
    class Cooldown {
        delay: number;
        callback: () => any | void;
        constructor(delay: number, callback: () => any | void);
    }
    export { Cooldown };
}
declare module "src/events/index" {
    export { Event } from "src/events/event";
    export { Cooldown } from "src/events/cooldown";
}
declare module "src/core/particles" {
    import { GameObject } from "src/core/objects";
    import { Vector2 } from "src/core/math";
    type ParticleAngle = number | 'random';
    type Callback = () => void;
    class Particle extends GameObject {
        id: number;
        pos: Vector2;
        velocity: Vector2;
        color: string;
        angle: ParticleAngle;
        radius: number;
        opacity: number;
        constructor(id: number, pos: Vector2, speed?: number, angle?: ParticleAngle, color?: string);
        update(): void;
        render(): void;
    }
    class ParticuleGenerator {
        pos: Vector2;
        lifeDuration: number;
        particles: Array<Particle>;
        private UUID;
        constructor(nbParticles: number, pos: Vector2, lifeDuration: number, onDestroy?: Callback);
        addParticles(array: Array<Particle>): Array<Particle>;
        removeParticles(array: Array<Particle>): Array<Particle>;
        destroy(): void;
    }
    export { Particle, ParticuleGenerator };
}
declare module "src/core/grid" {
    interface NeihboorObject {
        top?: Cell;
        right?: Cell;
        bottom?: Cell;
        left?: Cell;
    }
    enum CellType {
        Turret = 0,
        Road = 1,
        Ground = 2,
        Empty = 3
    }
    class Grid {
        rows: number;
        cols: number;
        cells: Array<Cell>;
        focusCell: Cell;
        constructor(cols: number, rows: number);
        createCells(): void;
        updateCell(newCell: Cell): void;
        defineNeighboors(): void;
    }
    class Cell {
        x: number;
        y: number;
        width: number;
        height: number;
        highlight: boolean;
        type: CellType;
        neighboor: NeihboorObject;
        constructor(x: number, y: number, width?: number, height?: number);
        toggleHighlight(): void;
    }
    export { Grid, Cell, CellType };
}
declare module "src/config/index" {
    const Config: {};
    export { Config };
}
declare module "src/index" {
    export * from "src/core/math";
    export { Game } from "src/core/game";
    export { Env as GameEnvironement } from "src/core/env";
    export { GameObject, PlayerObject } from "src/core/objects";
    export { getWindowDimensions, createCanvas } from "src/core/geometry";
    export { Particle, ParticuleGenerator } from "src/core/particles";
    export { Grid, Cell } from "src/core/grid";
    export * from "src/events/index";
    export * from "src/render/index";
    export * from "src/config/index";
    export const VERSION: string;
}
declare module "src/core/path" {
    import { Point, Vector2 } from "src/core/math";
    interface JSONPath {
        points: Array<Array<number>>;
    }
    class Path {
        entry: Point;
        points: Array<Point>;
        end: Point;
        private svg;
        length: number;
        constructor(points: Array<Point>);
        static fromJSON(json: JSONPath, scaleFactor?: Vector2): Path;
        addPoint(point: Point): void;
        pointAt(percent: any): any;
        recalculate(): void;
        toSVGPath(): string;
        render(): void;
    }
    export { Path };
}
declare module "src/helpers/threadHelper" {
    export class ThreadWorker {
        sendMessageToMainThread(title: string, args?: any): void;
        log(...args: any[]): void;
    }
}
declare module "src/render/offscreen-renderer/renderer-worker" { }
