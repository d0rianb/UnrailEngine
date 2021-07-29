import { Renderer as Renderer$1, OffscreenRenderer as OffscreenRenderer$1 } from '@/render';
import { Vector2 as Vector2$1, Point as Point$1 } from '@/core/math';
export { default as Random } from '@dorianb/random-js';

declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    clone(): Vector2;
    add(vec: Vector2): Vector2;
    multiply(scalar: number): Vector2;
    dot(vec: Vector2): number;
    dist(vec: Vector2): number;
}
declare type Point = Vector2;
declare const Point: typeof Vector2;
declare const V_NULL: Vector2;
declare const V_UNIT: Vector2;
declare function clamp(min: number, x: number, max: number): number;
declare function inRange(x: number, min: number, max: number): boolean;

interface SizeObject {
    width?: number;
    height?: number;
}
declare function getWindowDimensions(): SizeObject;
declare function getCanvasDimensions(canvas: HTMLCanvasElement): SizeObject;
declare function setCanvasDimensions(canvas: HTMLCanvasElement, width: number, height: number, pixelRatio?: number): void;
declare function createCanvas(w: number, h: number, ratio?: number, preventRightClick?: boolean): HTMLCanvasElement;
declare function adaptCanvasToDevicePixelRatio(canvas: HTMLCanvasElement, width?: number, height?: number, ratio?: number): void;
declare function insertCanvas(canvas: HTMLCanvasElement, el: string): void;

declare function blink(el: string, className: string, interval?: number): void;
declare function isWorker(): boolean;
declare function hashObject(obj: object): string;
declare function now(): number;
declare function ApiIsSupported(APIname: string): boolean;

interface EnvInterface {
    width?: number;
    height?: number;
    update: (deltaTime?: number, ...args: any[]) => void;
    render: (...args: any[]) => void;
}
declare class Env implements EnvInterface {
    width: number;
    height: number;
    constructor(width?: number, height?: number);
    update(): void;
    render(): void;
}

declare type RendererType = 'normal' | 'offscreen';
declare class Game {
    private name?;
    private env?;
    private tick;
    private gameLoop;
    private stats;
    private showStatsPanel;
    private animationFrame?;
    private fps;
    constructor(name?: string, env?: Env, fps?: number);
    static setRendererType(type: RendererType): void;
    static get renderer(): typeof Renderer$1 | typeof OffscreenRenderer$1;
    toggleStats(show?: boolean): void;
    private makeAnimationFrame;
    setMainLoop(func: Function): void;
    setFPS(fps: number): void;
    private update;
    start(): void;
    private internalStart;
}

interface GameObjectInterface {
    x?: number;
    y?: number;
    update: (...args: any[]) => void;
    render: (...args: any[]) => void;
    [propName: string]: any;
}
declare class GameObject implements GameObjectInterface {
    x: number;
    y: number;
    width?: number;
    height?: number;
    constructor(x: number, y: number, width?: number, height?: number);
    collide(obj: GameObject): boolean;
    update(...args: any[]): void;
    render(...args: any[]): void;
}
declare class PlayerObject extends GameObject {
    constructor(x: number, y: number, width?: number, height?: number);
    update(...args: any[]): void;
    render(...args: any[]): void;
}

declare type ParticleAngle = number | 'random';
declare type Callback = () => void;
declare class Particle extends GameObject {
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
declare class ParticuleGenerator {
    pos: Vector2;
    lifeDuration: number;
    particles: Array<Particle>;
    private UUID;
    constructor(nbParticles: number, pos: Vector2, lifeDuration: number, onDestroy?: Callback);
    addParticles(array: Array<Particle>): Array<Particle>;
    removeParticles(array: Array<Particle>): Array<Particle>;
    destroy(): void;
}

interface NeihboorObject {
    top?: Cell;
    right?: Cell;
    bottom?: Cell;
    left?: Cell;
}
declare class Grid {
    rows: number;
    cols: number;
    cells: Array<Cell>;
    focusCell: Cell;
    constructor(cols: number, rows: number);
    private createCells;
    private updateCell;
    private defineNeighboors;
    get(x: any, y: any): Cell;
    clear(): void;
}
declare class Cell {
    x: number;
    y: number;
    width: number;
    height: number;
    state: any;
    neighboors: NeihboorObject;
    constructor(x: number, y: number, width?: number, height?: number);
}

declare type EasingFunction = (t: number) => number;
declare const Easing: {
    linear: (t: any) => any;
    smoothStep: (t: any) => number;
    smootherStep: (t: any) => number;
    easeIn: (t: any) => number;
    easeOut: (t: any) => number;
    easeInOut: (t: any) => number;
    easeInBack: (t: any) => number;
    easeOutBack: (t: any) => number;
    easeInOutBack: (t: any) => number;
};
declare const easingName: Array<string>;
declare type EasingFunctionName = typeof easingName[number];

interface AnimationOptions {
    autostart?: boolean;
    loop?: boolean;
}
declare class Animation {
    from: number;
    to: number;
    duration: number;
    easing: EasingFunction;
    options: AnimationOptions;
    value: number;
    hasStarted: boolean;
    private isPaused;
    private isEnded;
    private isReversed;
    private speed;
    private lastT;
    constructor(from: number, to: number, duration: number, easing?: EasingFunction | EasingFunctionName, options?: AnimationOptions);
    start(): void;
    reset(): void;
    toggle(pause?: boolean): void;
    pause(): void;
    resume(): void;
    update(deltaTime: number): void;
    get isRunning(): boolean;
}

declare enum EventType {
    KeyboardPressed = 0,
    KeyboardDown = 1,
    Mouse = 2,
    Window = 3,
    Custom = 4,
    All = 5
}
declare type NoArgsCallback = () => any;
declare type KeyboardEventCallback = (e: KeyboardEvent) => any;
declare type MouseCallback = (e: MouseEvent) => any;
declare class Event {
    name: string;
    callback: Function;
    listeners: Array<Function>;
    type: EventType;
    constructor(name: string, callback: Function, type?: EventType);
    static emit(name: string | Array<string>, params?: any): void;
    private static emitEvent;
    static on(name: string | Array<string>, callback: Function): void;
    private static onEvent;
    static onKeyDown(name: string | Array<string>, callback: KeyboardEventCallback): void;
    static onKeyPressed(name: string | Array<string>, callback: KeyboardEventCallback): void;
    static onAnyKeyReleased(callback: NoArgsCallback): void;
    static onClick(callback: MouseCallback): void;
    static onMouseClick(callback: MouseCallback): void;
    static onMouseMove(callback: MouseCallback): void;
}

declare type CooldownCallback = () => any;
declare class Cooldown {
    private delay;
    private callback;
    constructor(delay: number, callback: CooldownCallback);
}

interface TextureOptions {
    rotation?: number;
    offset?: Vector2$1;
    scale?: Vector2$1;
}
declare class Texture {
    id: number;
    image: HTMLImageElement | ImageBitmap;
    rotation: number;
    offset: Vector2$1;
    size: Vector2$1;
    scale: Vector2$1;
    isLoaded: boolean;
    constructor(source: string, options?: TextureOptions);
    convertToBitmap(): Promise<Texture> | null;
}

declare type CanvasRenderContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
interface StyleObject {
    strokeStyle?: string;
    lineWidth?: number;
    lineJoin?: CanvasLineJoin;
    lineCap?: CanvasLineCap;
    fillStyle?: string;
    globalAlpha?: number;
    globalCompositeOperation?: string;
}
interface TextStyleObject {
    font?: string;
    size?: number;
    color?: string;
    textAlign?: 'end' | 'left' | 'right' | 'center';
    textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
}
declare class Renderer {
    static create(width?: number, height?: number): HTMLCanvasElement;
    static createFromCanvas(selector: string): HTMLCanvasElement;
    static setContext(context: CanvasRenderContext): void;
    static getContext(): CanvasRenderContext;
    static setOffset(x: number, y: number): void;
    static getOffset(): Vector2$1;
    static style(obj?: StyleObject): void;
    private static textStyle;
    static clear(color?: string): void;
    static line(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void;
    static rect(x: number, y: number, width: number, height: number, obj?: StyleObject): void;
    static rectFromCenter(x: number, y: number, width: number, height: number, obj?: StyleObject): void;
    static rectFromPoints(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void;
    static poly(points: Array<Point$1>, obj?: StyleObject): void;
    static circle(x: number, y: number, radius: number, obj?: StyleObject): void;
    static circleFromRect(x: number, y: number, width: number, height: number, obj: StyleObject): void;
    static point(x: number, y: number, obj?: StyleObject): void;
    static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void;
    static circleSprite(x: number, y: number, radius: number, texture: Texture): void;
    static text(text: string, x: number, y: number, style?: TextStyleObject): void;
    static centeredText(text: string, x: number, y: number, style?: TextStyleObject): void;
    static tint(color: string, x: number, y: number, width: number, height: number): void;
    static beginFrame(color?: string): void;
    static endFrame(): void;
}

declare class RenderCall {
    methodName: string;
    args: object;
    constructor(name: string, args: object);
}

declare type RenderStack = Array<RenderCall>;
declare class OffscreenRenderer {
    static get worker(): any;
    static get workerIsInitialized(): boolean;
    static get offscreenCanvas(): OffscreenCanvas;
    static get renderStack(): RenderStack;
    static create(width?: number, height?: number): HTMLCanvasElement;
    static createFromCanvas(selector: string): HTMLCanvasElement;
    static initRenderWorker(canvas: HTMLCanvasElement, width: number, height: number): void;
    static addRenderCall(name: string, args?: object): void;
    static sendMessageToWorker(title: string, data?: any, transfer?: Transferable[]): void;
    static style(obj?: StyleObject): void;
    static clear(color?: string): void;
    static line(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void;
    static rect(x: number, y: number, width: number, height: number, obj?: StyleObject): void;
    static rectFromCenter(x: number, y: number, width: number, height: number, obj?: StyleObject): void;
    static rectFromPoints(x1: number, y1: number, x2: number, y2: number, obj?: StyleObject): void;
    static poly(points: Array<Point$1>, obj?: StyleObject): void;
    static circle(x: number, y: number, radius: number, obj?: StyleObject): void;
    static circleFromRect(x: number, y: number, width: number, height: number, obj: StyleObject): void;
    static point(x: number, y: number, obj?: StyleObject): void;
    private static handleTexture;
    static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void;
    static circleSprite(x: number, y: number, radius: number, texture: Texture): Promise<void>;
    static text(text: string, x: number, y: number, style?: TextStyleObject): void;
    static centeredText(text: string, x: number, y: number, style?: TextStyleObject): void;
    static tint(color: string, x: number, y: number, width: number, height: number): void;
    static beginFrame(color?: string): void;
    static endFrame(): void;
}
declare const OffscreenRendererWrapper: typeof OffscreenRenderer | typeof Renderer;

declare type CSSOptions = Object;
declare type InterfaceTextFunction = () => string;
declare type InterfaceClickCallback = (e: MouseEvent) => any;
declare const itemPositions: readonly ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
declare type ItemPosition = typeof itemPositions[number];
declare class Interface {
    static addItem(callback: InterfaceTextFunction | string, position?: ItemPosition, options?: CSSOptions): void;
    static addButton(callback: InterfaceTextFunction | string, onClick?: InterfaceClickCallback, position?: ItemPosition, options?: CSSOptions): void;
    private static internalAddItem;
    static init(): void;
    private static addStyle;
    private static addToDom;
    static update(): void;
    static statsShift(height: number): void;
    static setUpdateInterval(rate: number): void;
    static get updateInterval(): number;
}

declare const Config: {};

interface SoundOptions {
    volume?: number;
    loop?: boolean;
    autoplay?: boolean;
}
declare class Sound extends Audio {
    constructor(src: string, options?: SoundOptions);
}

declare const VERSION: string;

export { Animation, AnimationOptions, ApiIsSupported, Cell, Config, Cooldown, Easing, Event, Game, Env as GameEnvironement, GameObject, Grid, Interface, OffscreenRendererWrapper as OffscreenRenderer, Particle, ParticuleGenerator, PlayerObject, Point, Renderer, Sound, Texture, VERSION, V_NULL, V_UNIT, Vector2, adaptCanvasToDevicePixelRatio, blink, clamp, createCanvas, getCanvasDimensions, getWindowDimensions, hashObject, inRange, insertCanvas, isWorker, now, setCanvasDimensions };
