import { Vector2 as Vector2$1, Point as Point$1 } from '@/core/math';
export { default as Random } from '@dorianb/random-js';

declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(vec: Vector2): Vector2;
    clone(): Vector2;
    dist(vec: Vector2): number;
}
declare type Point = Vector2;
declare const Point: typeof Vector2;
declare const V_NULL: Vector2;
declare const V_UNIT: Vector2;
declare function clamp(min: number, x: number, max: number): number;
declare function inRange(x: number, min: number, max: number): boolean;

interface EnvInterface {
    width: number;
    height: number;
    update: (deltaTime?: number, ...args: any[]) => void;
    render: (...args: any[]) => void;
}
declare class Env implements EnvInterface {
    width: number;
    height: number;
    constructor(width: number, height: number);
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
    static get rendererType(): RendererType;
    toggleStats(show?: boolean): void;
    private makeAnimationFrame;
    setMainLoop(func: Function): void;
    setFPS(fps: number): void;
    update(time: number): void;
    start(): void;
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
    constructor(x: number, y: number);
    collide(obj: GameObject): boolean;
    update(...args: any[]): void;
    render(...args: any[]): void;
}
declare class PlayerObject extends GameObject {
    constructor(x: number, y: number);
    update(...args: any[]): void;
    render(...args: any[]): void;
}

interface SizeObject {
    width?: number;
    height?: number;
}
declare function getWindowDimensions(): SizeObject;
declare function createCanvas(w: number, h: number, ratio?: number, preventRightClick?: boolean): HTMLCanvasElement;

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
declare enum CellType {
    Turret = 0,
    Road = 1,
    Ground = 2,
    Empty = 3
}
declare class Grid {
    rows: number;
    cols: number;
    cells: Array<Cell>;
    focusCell: Cell;
    constructor(cols: number, rows: number);
    createCells(): void;
    updateCell(newCell: Cell): void;
    defineNeighboors(): void;
}
declare class Cell {
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

declare enum EventType {
    KeyboardPressed = 0,
    KeyboardDown = 1,
    Mouse = 2,
    Window = 3,
    Custom = 4,
    All = 5
}
declare type KeyboardEventCallback = (e: KeyboardEvent) => any;
declare type MouseCallback = (e: MouseEvent) => any;
declare class Event {
    name: string;
    callback: Function;
    listeners: Array<Function>;
    type: EventType;
    constructor(name: string, callback: Function, type?: EventType);
    static emit(name: string, params?: any): void;
    static on(name: string, callback: Function): void;
    static onKeyDown(name: string, callback: KeyboardEventCallback): void;
    static onKeyPressed(name: string, callback: KeyboardEventCallback): void;
    static onMouseClick(callback: MouseCallback): void;
    static onMouseMove(callback: MouseCallback): void;
}

declare class Cooldown {
    delay: number;
    callback: () => any | void;
    constructor(delay: number, callback: () => any | void);
}

interface TextureOptions {
    rotation?: number;
    offset?: Vector2$1;
    scale?: Vector2$1;
}
declare class Texture {
    id: number;
    image: HTMLImageElement;
    rotation: number;
    offset: Vector2$1;
    size: Vector2$1;
    scale: Vector2$1;
    options: TextureOptions;
    constructor(source: string, options?: TextureOptions);
    convertToBitmap(): Promise<Texture> | null;
}

declare type CanvasRenderContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
interface StyleObject {
    strokeStyle?: string;
    lineWidth?: number;
    lineJoin?: CanvasLineJoin;
    fillStyle?: string;
    globalAlpha?: number;
    globalCompositeOperation?: string;
}
declare class Renderer {
    static create(width?: number, height?: number): HTMLCanvasElement;
    static setContext(context: CanvasRenderContext): void;
    static getContext(): CanvasRenderContext;
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
    static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void;
    static circleSprite(x: number, y: number, radius: number, texture: Texture): void;
    static tint(color: string, x: number, y: number, width: number, height: number): void;
    static beginFrame(): void;
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
    static create(width: number, height: number): HTMLCanvasElement;
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
    static rectSprite(x: number, y: number, width: number, height: number, texture: Texture): void;
    static circleSprite(x: number, y: number, radius: number, texture: Texture): Promise<void>;
    static tint(color: string, x: number, y: number, width: number, height: number): void;
    static beginFrame(): void;
    static endFrame(): void;
}

interface InterfaceItem {
    callback(game?: Game): string;
    position?: ItemPosition;
    options?: CSSOptions;
    onClick?: InterfaceClickCallback;
}
declare type CSSOptions = Object;
declare type InterfaceTextFunction = () => string;
declare type InterfaceClickCallback = (e: MouseEvent) => any;
declare const itemPositions: readonly ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
declare type ItemPosition = typeof itemPositions[number];
declare class Interface {
    static addItem(callback: InterfaceTextFunction, position?: ItemPosition, options?: CSSOptions): void;
    static addButton(callback: InterfaceTextFunction, position?: ItemPosition, options?: CSSOptions, onClick?: InterfaceClickCallback): void;
    private static internalAddItem;
    static init(): void;
    static addStyle(style: string): void;
    static addToDom(item: InterfaceItem, index: number): void;
    static update(): void;
    static statsShift(height: number): void;
    static setUpdateInterval(rate: number): void;
    static get updateInterval(): number;
}

declare const Config: {};

declare const VERSION: string;

export { Cell, Config, Cooldown, Event, Game, Env as GameEnvironement, GameObject, Grid, Interface, OffscreenRenderer, Particle, ParticuleGenerator, PlayerObject, Point, Renderer, Texture, VERSION, V_NULL, V_UNIT, Vector2, clamp, createCanvas, getWindowDimensions, inRange };
