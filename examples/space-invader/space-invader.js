var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const version = "0.5.2";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
class Random {
  static random() {
    return Math.random();
  }
  static randint(t, a) {
    return Math.floor(t + Math.random() * (a - t));
  }
  static choice(t) {
    return t[~~(Random.random() * t.length)];
  }
  static bool() {
    return Random.random() > 0.5;
  }
  static sign() {
    return Random.choice([-1, 1]);
  }
  static percent(t) {
    return Random.random() < t / 100;
  }
}
var main_min = Random;
class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  clone() {
    return new Vector2(this.x, this.y);
  }
  add(vec) {
    return new Vector2(this.x + vec.x, this.y + vec.y);
  }
  multiply(scalar) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }
  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }
  dist(vec) {
    return Math.sqrt((this.x - vec.x) ** 2 + (this.y - vec.y) ** 2);
  }
}
const V_NULL = new Vector2(0, 0);
const V_UNIT = new Vector2(1, 1);
function clamp(min, x, max) {
  if (min > max)
    return clamp(max, x, min);
  return Math.max(min, Math.min(x, max));
}
function inRange(x, min, max) {
  return clamp(min, x, max) === x;
}
class Box {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
function getWindowDimensions() {
  return { width: window.innerWidth, height: window.innerHeight };
}
function getCanvasDimensions(canvas2) {
  return { width: canvas2.clientWidth || canvas2.width, height: canvas2.clientHeight || canvas2.height };
}
function setCanvasDimensions(canvas2, width, height, pixelRatio) {
  canvas2.width = width * (pixelRatio || window.devicePixelRatio || 1);
  canvas2.height = height * (pixelRatio || window.devicePixelRatio || 1);
  canvas2.style.width = width + "px";
  canvas2.style.height = height + "px";
}
function createCanvas(w, h, ratio, preventRightClick) {
  const canvas2 = document.createElement("canvas");
  adaptCanvasToDevicePixelRatio(canvas2, w, h, ratio);
  if (!!preventRightClick) {
    canvas2.oncontextmenu = (e) => e.preventDefault();
  }
  return canvas2;
}
function adaptCanvasToDevicePixelRatio(canvas2, width, height, ratio) {
  const pixelRatio = ratio || window.devicePixelRatio || 1;
  let w = width || getCanvasDimensions(canvas2).width;
  let h = height || getCanvasDimensions(canvas2).height;
  setCanvasDimensions(canvas2, w, h, pixelRatio);
  if (pixelRatio != 1) {
    canvas2.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }
}
function insertCanvas(canvas2, el) {
  window.addEventListener("DOMContentLoaded", () => {
    var _a;
    const element = (_a = document.querySelector(el)) != null ? _a : document.createElement(el);
    element.appendChild(canvas2);
    document.querySelector("body").appendChild(element);
  });
}
function isWorker() {
  return self.document == void 0 && self.window == void 0;
}
function now() {
  return performance.now() || Date.now();
}
function ApiIsSupported(APIname) {
  return window && APIname in window;
}
function windowIsLoaded() {
  return /complete|interactive|loaded/.test(document.readyState) && window.unrailEngineLoaded;
}
class EventSystem {
  constructor() {
    this.windowEvents = [];
    this.customEvents = [];
    this.mouseEvents = [];
    this.keyboardEvents = [];
    this.currentKeyEvents = [];
  }
  init() {
    window.addEventListener("keydown", (e) => {
      if (!this.currentKeyEvents.find((event) => event.code === e.code))
        this.currentKeyEvents.push(e);
      this.keyboardEvents.filter((e2) => e2.type === EventType.KeyboardPressed).forEach((event) => {
        if (e.code === event.name)
          event.callback(e);
      });
    });
    window.addEventListener("keyup", (e) => {
      if (!this.currentKeyEvents.length)
        return;
      this.currentKeyEvents = this.currentKeyEvents.filter((event) => event.code !== e.code);
    });
    this.bindEvents();
  }
  addEvent(e) {
    switch (e.type) {
      case EventType.KeyboardDown:
        this.keyboardEvents.push(e);
        break;
      case EventType.KeyboardPressed:
        this.keyboardEvents.push(e);
        break;
      case EventType.Mouse:
        this.mouseEvents.push(e);
        window.addEventListener(e.name, (windowEvent) => e.callback(windowEvent));
        break;
      case EventType.Window:
        this.windowEvents.push(e);
        this.bindEvents();
        break;
      case EventType.Custom:
        this.customEvents.push(e);
        break;
    }
  }
  getCustomEvent(name) {
    return this.customEvents.find((e) => e.name === name);
  }
  bindEvents() {
    this.windowEvents.forEach((event) => window.addEventListener(event.name, event.callback));
  }
  tick() {
    if (!this.currentKeyEvents.length)
      return;
    this.keyboardEvents.filter((e) => e.type === EventType.KeyboardDown).forEach((keyEvent) => {
      this.currentKeyEvents.forEach((e) => {
        if (e.code === keyEvent.name)
          keyEvent.callback(e);
      });
    });
  }
}
var EventType;
(function(EventType2) {
  EventType2[EventType2["KeyboardPressed"] = 0] = "KeyboardPressed";
  EventType2[EventType2["KeyboardDown"] = 1] = "KeyboardDown";
  EventType2[EventType2["Mouse"] = 2] = "Mouse";
  EventType2[EventType2["Window"] = 3] = "Window";
  EventType2[EventType2["Custom"] = 4] = "Custom";
  EventType2[EventType2["All"] = 5] = "All";
})(EventType || (EventType = {}));
class Event {
  constructor(name, callback, type = 4) {
    this.name = name;
    this.callback = callback;
    this.type = type;
    this.listeners = [this.callback];
  }
  static emit(name, params) {
    if (name instanceof Array) {
      name.forEach((n) => this.emitEvent(n, params));
    } else {
      this.emitEvent(name, params);
    }
  }
  static emitEvent(name, params) {
    const event = ES.getCustomEvent(name);
    if (event) {
      event.listeners.forEach((callback) => callback(params));
    }
  }
  static on(name, callback) {
    if (name instanceof Array) {
      name.forEach((n) => this.onEvent(n, callback));
    } else {
      this.onEvent(name, callback);
    }
  }
  static onEvent(name, callback) {
    const existingEvent = ES.getCustomEvent(name);
    if (existingEvent) {
      existingEvent.listeners.push(callback);
    } else {
      const event = new Event(name, callback, 4);
      ES.addEvent(event);
    }
  }
  static onKeyDown(name, callback) {
    if (name instanceof Array) {
      name.forEach((n) => ES.addEvent(new Event(n, callback, 1)));
    } else {
      ES.addEvent(new Event(name, callback, 1));
    }
  }
  static onKeyPressed(name, callback) {
    if (name instanceof Array) {
      name.forEach((n) => ES.addEvent(new Event(n, callback, 0)));
    } else {
      ES.addEvent(new Event(name, callback, 0));
    }
  }
  static onAnyKeyReleased(callback) {
    ES.addEvent(new Event("keyup", callback, 3));
  }
  static onClick(callback) {
    Event.onMouseClick(callback);
  }
  static onMouseClick(callback) {
    ES.addEvent(new Event("click", callback, 2));
  }
  static onMouseMove(callback) {
    ES.addEvent(new Event("mousemove", callback, 2));
  }
}
const ES = new EventSystem();
class AnimationSystem {
  constructor() {
    this.hasStarted = false;
    this.animations = [];
  }
  add(animation) {
    this.animations.push(animation);
    if (this.hasStarted && animation.options.autostart)
      animation.start();
  }
  init() {
    this.hasStarted = true;
    for (let animation of this.animations) {
      if (animation.options.autostart)
        animation.start();
    }
  }
  tick(deltaTime) {
    for (let animation of this.animations) {
      animation.update(deltaTime);
    }
  }
}
const AS = new AnimationSystem();
var stats_min = { exports: {} };
(function(module, exports) {
  (function(f, e) {
    module.exports = e();
  })(commonjsGlobal, function() {
    var f = function() {
      function e(a2) {
        c.appendChild(a2.dom);
        return a2;
      }
      function u(a2) {
        for (var d = 0; d < c.children.length; d++)
          c.children[d].style.display = d === a2 ? "block" : "none";
        l = a2;
      }
      var l = 0, c = document.createElement("div");
      c.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
      c.addEventListener("click", function(a2) {
        a2.preventDefault();
        u(++l % c.children.length);
      }, false);
      var k = (performance || Date).now(), g = k, a = 0, r = e(new f.Panel("FPS", "#0ff", "#002")), h = e(new f.Panel("MS", "#0f0", "#020"));
      if (self.performance && self.performance.memory)
        var t = e(new f.Panel("MB", "#f08", "#201"));
      u(0);
      return { REVISION: 16, dom: c, addPanel: e, showPanel: u, begin: function() {
        k = (performance || Date).now();
      }, end: function() {
        a++;
        var c2 = (performance || Date).now();
        h.update(c2 - k, 200);
        if (c2 > g + 1e3 && (r.update(1e3 * a / (c2 - g), 100), g = c2, a = 0, t)) {
          var d = performance.memory;
          t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576);
        }
        return c2;
      }, update: function() {
        k = this.end();
      }, domElement: c, setMode: u };
    };
    f.Panel = function(e, f2, l) {
      var c = Infinity, k = 0, g = Math.round, a = g(window.devicePixelRatio || 1), r = 80 * a, h = 48 * a, t = 3 * a, v = 2 * a, d = 3 * a, m = 15 * a, n = 74 * a, p = 30 * a, q = document.createElement("canvas");
      q.width = r;
      q.height = h;
      q.style.cssText = "width:80px;height:48px";
      var b = q.getContext("2d");
      b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";
      b.textBaseline = "top";
      b.fillStyle = l;
      b.fillRect(0, 0, r, h);
      b.fillStyle = f2;
      b.fillText(e, t, v);
      b.fillRect(d, m, n, p);
      b.fillStyle = l;
      b.globalAlpha = 0.9;
      b.fillRect(d, m, n, p);
      return { dom: q, update: function(h2, w) {
        c = Math.min(c, h2);
        k = Math.max(k, h2);
        b.fillStyle = l;
        b.globalAlpha = 1;
        b.fillRect(0, 0, r, m);
        b.fillStyle = f2;
        b.fillText(g(h2) + " " + e + " (" + g(c) + "-" + g(k) + ")", t, v);
        b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
        b.fillRect(d + n - a, m, a, p);
        b.fillStyle = l;
        b.globalAlpha = 0.9;
        b.fillRect(d + n - a, m, a, g((1 - h2 / w) * p));
      } };
    };
    return f;
  });
})(stats_min);
var Stats = stats_min.exports;
let textureId = 0;
class Texture {
  constructor(source, options) {
    this.isLoaded = false;
    if (!source)
      throw new Error("A source path to the resource must be provided");
    this.id = textureId++;
    this.image = new Image();
    this.image.src = source;
    this.image.onload = () => {
      this.isLoaded = true;
      this.onLoad();
    };
    this.size = { width: this.image.width, height: this.image.height };
    this.rotation = (options == null ? void 0 : options.rotation) || 0;
    this.offset = (options == null ? void 0 : options.offset) || V_NULL;
    this.scale = (options == null ? void 0 : options.scale) || V_UNIT;
  }
  async convertToBitmap() {
    if (!this.image.width || !this.image.height)
      return;
    const image = await createImageBitmap(this.image);
    return __spreadProps(__spreadValues({}, this), { image });
  }
  onLoad() {
  }
}
var main = '*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    z-index: 10;\n    image-rendering: pixelated;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n    /* Make the click event pass through */\n    pointer-events: none;\n}\n\n.ue-container>div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container>.top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container>.top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container>.bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container>.bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n    pointer-events: all;\n}';
let items = [];
let updateInterval = 4;
const itemPositions = ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
class Interface {
  static addItem(callback, position, options) {
    Interface.internalAddItem(callback, position, options);
  }
  static addButton(callback, onClick, position, options) {
    Interface.internalAddItem(callback, position, options, onClick);
  }
  static internalAddItem(callback, position, options, onClick) {
    let textFunction = typeof callback === "string" ? () => callback : callback;
    const item = { callback: textFunction, position, options, onClick };
    items.push(item);
    const index = items.length;
    if (windowIsLoaded()) {
      Interface.addToDom(item, index);
    } else
      Event.on("EngineLoaded", () => Interface.addToDom(item, index));
  }
  static init() {
    Interface.addStyle(main);
    const container = document.createElement("div");
    container.classList.add("ue-interface", "ue-container");
    for (let pos of itemPositions) {
      const positionedContainer = document.createElement("div");
      positionedContainer.classList.add(pos);
      container.appendChild(positionedContainer);
    }
    document.body.appendChild(container);
  }
  static addStyle(style) {
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    document.head.append(styleElement);
  }
  static addToDom(item, index) {
    var _a, _b;
    const value = item.callback();
    const element = document.createElement("span");
    element.classList.add("ue-interface-items");
    element.id = `item-${index}`;
    element.innerText = value;
    Object.entries(item.options || {}).forEach(([key, value2]) => element.style[key] = value2);
    if (item.position)
      (_a = document.querySelector(`.ue-container > .${item.position}`)) == null ? void 0 : _a.appendChild(element);
    else
      (_b = document.querySelector(`.ue-container > .custom`)) == null ? void 0 : _b.appendChild(element);
    if (!!item.onClick) {
      element.addEventListener("click", (e) => item.onClick(e));
      element.classList.add("ue-interface-button");
    }
  }
  static update() {
    items.forEach((item, i) => {
      const value = item.callback();
      const element = document.querySelector(`.ue-interface #item-${i + 1}`);
      if (element && element.innerText !== value) {
        element.innerText = value;
      }
    });
  }
  static statsShift(height) {
    const TLContainer = document.querySelector(".top-left");
    if (TLContainer) {
      TLContainer.style.top = `${height}px`;
    }
  }
  static setUpdateInterval(rate) {
    updateInterval = rate;
  }
  static get updateInterval() {
    return updateInterval;
  }
  static getItems() {
    return items;
  }
}
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
class EngineFailure extends Error {
  constructor(msg, source) {
    const message = source ? `[${source.capitalize()}] - ${msg}` : msg;
    super(message);
    this.name = "EngineFailure";
  }
}
class RendererError extends EngineFailure {
  constructor(msg) {
    super(msg, "renderer");
  }
}
const defaultOptions$1 = {
  interval: 200,
  loop: false
};
class AnimatedSprite extends Texture {
  constructor(spriteSheet, from, to, options) {
    super(spriteSheet.spriteSheetPath);
    this.intervalId = -1;
    this.isAnimated = false;
    this.lastRunTimeStamp = 0;
    this.spriteSheet = spriteSheet;
    if (from[0] < 1 || from[1] < 1 || to[0] < 1 || to[1] < 1 || from[0] > spriteSheet.cols || from[1] > spriteSheet.rows || to[0] > spriteSheet.cols || to[1] > spriteSheet.rows)
      throw new EngineFailure("Invalid tuples : the spritesheet coordinate starts at (1, 1)");
    this.from = from;
    this.to = to;
    let opt = __spreadValues(__spreadValues({}, defaultOptions$1), options);
    this.interval = opt.interval;
    this.loop = opt.loop;
    this.spriteWidth = this.size.width / spriteSheet.cols;
    this.spriteHeight = this.size.height / spriteSheet.rows;
    this.coordX = this.from[0];
    this.coordY = this.from[1];
  }
  run() {
    let nowTimeStamp = now();
    if (nowTimeStamp - this.lastRunTimeStamp > this.interval) {
      this.step();
      this.lastRunTimeStamp = nowTimeStamp;
    }
  }
  animate() {
    if (this.isAnimated)
      return;
    this.intervalId = window.setInterval(() => this.step(), this.interval);
    this.isAnimated = true;
  }
  pause() {
    if (this.isAnimated) {
      window.clearInterval(this.intervalId);
      this.isAnimated = false;
    }
  }
  reset() {
    this.coordX = this.from[0];
    this.coordY = this.from[1];
  }
  stop() {
    this.pause();
    this.reset();
  }
  setInterval(interval) {
    this.interval = interval;
    if (this.isAnimated) {
      window.clearInterval(this.intervalId);
      this.animate();
    }
  }
  step() {
    if (this.coordX === this.to[0] && this.coordY === this.to[1]) {
      if (this.loop) {
        this.coordX = this.from[0];
        this.coordY = this.from[1];
      }
      return;
    }
    if (this.coordY < this.to[1]) {
      if (this.coordX < this.spriteSheet.cols)
        this.coordX++;
      else {
        this.coordY++;
        this.coordX = this.from[0];
      }
    } else {
      if (this.coordX < this.to[0])
        this.coordX++;
    }
  }
  spriteBox() {
    return new Box((this.coordX - 1) * this.spriteWidth, (this.coordY - 1) * this.spriteHeight, this.spriteWidth, this.spriteHeight);
  }
}
const defaultStyleObject = {
  strokeStyle: "black",
  lineWidth: 2,
  lineJoin: "round",
  lineCap: "round",
  fillStyle: "transparent",
  globalAlpha: 1,
  globalCompositeOperation: "add"
};
const defaultTextStyleObject = {
  font: "Roboto",
  size: 16,
  color: "black",
  textAlign: "left",
  textBaseline: "alphabetic"
};
const TWOPI = 2 * Math.PI;
let precision = isWorker() ? 4 : 2 * (window.devicePixelRatio || 1);
let offset = V_NULL;
function round(num) {
  return ~~(num * precision) / precision;
}
let ctx;
let lastStyleObject;
class Renderer {
  static create(width, height) {
    let [windowWidth, windowHeight] = [getWindowDimensions().width, getWindowDimensions().height];
    const canvas2 = createCanvas(width || windowWidth, height || windowHeight);
    insertCanvas(canvas2, "main");
    Renderer.setContext(canvas2.getContext("2d"));
    return canvas2;
  }
  static createFromCanvas(selector) {
    let canvas2 = document.querySelector(selector);
    if (!canvas2 || !(canvas2 instanceof HTMLCanvasElement))
      throw new RendererError("The selected element is not a canvas");
    adaptCanvasToDevicePixelRatio(canvas2);
    Renderer.setContext(canvas2.getContext("2d"));
    return canvas2;
  }
  static setContext(context) {
    ctx = context;
  }
  static getContext() {
    return ctx;
  }
  static setOffset(x, y) {
    offset = new Vector2(x, y);
  }
  static getOffset() {
    return offset;
  }
  static style(obj) {
    if (!ctx)
      throw new RendererError("Context has not been initialize. Please use Renderer.setContext");
    const styleObject = __spreadValues(__spreadValues({}, defaultStyleObject), obj);
    if (styleObject === lastStyleObject)
      return;
    if ("color" in styleObject) {
      styleObject["fillStyle"] = styleObject["color"];
      styleObject["strokeStyle"] = styleObject["color"];
      delete styleObject["color"];
    }
    for (let prop in styleObject) {
      if (ctx[prop] !== styleObject[prop]) {
        ctx[prop] = styleObject[prop];
      }
    }
    lastStyleObject = styleObject;
  }
  static textStyle(obj) {
    if (!!ctx) {
      let styleObject = __spreadValues(__spreadValues({}, defaultTextStyleObject), obj);
      ctx.font = `${styleObject.size}px ${styleObject.font}`;
      delete styleObject.size;
      delete styleObject.font;
      Renderer.style(__spreadValues({ fillStyle: styleObject.color }, styleObject));
    }
  }
  static clear(color) {
    if (color) {
      Renderer.style({ fillStyle: color });
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    } else {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }
  static line(x1, y1, x2, y2, obj) {
    Renderer.style(obj);
    ctx.beginPath();
    ctx.moveTo(round(offset.x + x1), round(offset.y + y1));
    ctx.lineTo(round(offset.x + x2), round(offset.y + y2));
    ctx.stroke();
  }
  static rect(x, y, width, height, obj) {
    Renderer.style(obj);
    const [r_x, r_y, r_w, r_h] = [round(x + offset.x), round(y + offset.y), round(width), round(height)];
    ctx.fillRect(r_x, r_y, r_w, r_h);
    ctx.strokeRect(r_x, r_y, r_w, r_h);
  }
  static rectFromCenter(x, y, width, height, obj) {
    return Renderer.rect(round(x - width / 2), round(y - height / 2), round(width), round(height), obj);
  }
  static rectFromPoints(x1, y1, x2, y2, obj) {
    return Renderer.rect(round(x1), round(y1), round(x2 - x1), round(y2 - y1), obj);
  }
  static poly(points, obj) {
    if (!points.length)
      return;
    Renderer.style(obj);
    ctx.beginPath();
    ctx.moveTo(round(points[0].x + offset.x), round(points[0].y + offset.y));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(round(points[i].x + offset.x), round(points[i].y + offset.y));
    }
    ctx.fill();
    ctx.stroke();
  }
  static circle(x, y, radius, obj) {
    Renderer.style(obj);
    ctx.beginPath();
    ctx.arc(round(x + offset.x), round(y + offset.y), radius, 0, TWOPI);
    ctx.fill();
    ctx.stroke();
  }
  static circleFromRect(x, y, width, height, obj) {
    return Renderer.circle(round(x + width / 2), round(y + height / 2), round(Math.min(width, height) / 2), obj);
  }
  static point(x, y, obj) {
    Renderer.circle(round(x), round(y), 5, obj);
  }
  static rectSprite(x, y, width, height, texture) {
    if (!texture.isLoaded)
      return;
    Renderer.style({});
    ctx.save();
    ctx.translate(round(x + width / 2 + offset.x), round(y + height / 2 + offset.y));
    ctx.scale(texture.scale.x, texture.scale.y);
    ctx.rotate(texture.rotation);
    let sourceBox = new Box(0, 0, texture.size.width, texture.size.height);
    if (texture instanceof AnimatedSprite) {
      sourceBox = texture.spriteBox();
    }
    ctx.drawImage(texture.image, sourceBox.x, sourceBox.y, sourceBox.width, sourceBox.height, round(width * texture.offset.x - width / 2), round(height * texture.offset.y - height / 2), round(width), round(height));
    ctx.restore();
  }
  static circleSprite(x, y, radius, texture) {
    if (!texture.isLoaded)
      return;
    ctx.save();
    ctx.beginPath();
    ctx.arc(round(x + offset.x), round(y + offset.y), radius, 0, TWOPI);
    ctx.clip();
    Renderer.rectSprite(x - radius, y - radius, 2 * radius, 2 * radius, texture);
    ctx.restore();
  }
  static text(text, x, y, style) {
    Renderer.textStyle(style);
    ctx.fillText(text, x, y);
  }
  static centeredText(text, x, y, style) {
    Renderer.text(text, x, y, __spreadProps(__spreadValues({}, style), { textAlign: "center", textBaseline: "middle" }));
  }
  static tint(color, x, y, width, height) {
    Renderer.rect(x, y, width, height, {
      fillStyle: color,
      globalCompositeOperation: "multiply",
      globalAlpha: 0.25
    });
  }
  static beginFrame(color) {
    Renderer.clear(color);
  }
  static endFrame() {
  }
}
class WorkerMessage {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}
class RenderCall {
  constructor(name, args) {
    this.methodName = name;
    this.args = args;
  }
}
function WorkerWrapper() {
  return new Worker("data:application/javascript;base64,dmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTsKdmFyIF9fZGVmUHJvcHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllczsKdmFyIF9fZ2V0T3duUHJvcERlc2NzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7CnZhciBfX2dldE93blByb3BTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczsKdmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7CnZhciBfX3Byb3BJc0VudW0gPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlOwp2YXIgX19kZWZOb3JtYWxQcm9wID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ga2V5IGluIG9iaiA/IF9fZGVmUHJvcChvYmosIGtleSwge2VudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlfSkgOiBvYmpba2V5XSA9IHZhbHVlOwp2YXIgX19zcHJlYWRWYWx1ZXMgPSAoYSwgYikgPT4gewogIGZvciAodmFyIHByb3AgaW4gYiB8fCAoYiA9IHt9KSkKICAgIGlmIChfX2hhc093blByb3AuY2FsbChiLCBwcm9wKSkKICAgICAgX19kZWZOb3JtYWxQcm9wKGEsIHByb3AsIGJbcHJvcF0pOwogIGlmIChfX2dldE93blByb3BTeW1ib2xzKQogICAgZm9yICh2YXIgcHJvcCBvZiBfX2dldE93blByb3BTeW1ib2xzKGIpKSB7CiAgICAgIGlmIChfX3Byb3BJc0VudW0uY2FsbChiLCBwcm9wKSkKICAgICAgICBfX2RlZk5vcm1hbFByb3AoYSwgcHJvcCwgYltwcm9wXSk7CiAgICB9CiAgcmV0dXJuIGE7Cn07CnZhciBfX3NwcmVhZFByb3BzID0gKGEsIGIpID0+IF9fZGVmUHJvcHMoYSwgX19nZXRPd25Qcm9wRGVzY3MoYikpOwpjbGFzcyBCb3ggewogIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHsKICAgIHRoaXMueCA9IHg7CiAgICB0aGlzLnkgPSB5OwogICAgdGhpcy53aWR0aCA9IHdpZHRoOwogICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7CiAgfQp9CmZ1bmN0aW9uIGdldFdpbmRvd0RpbWVuc2lvbnMoKSB7CiAgcmV0dXJuIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fTsKfQpmdW5jdGlvbiBnZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcykgewogIHJldHVybiB7d2lkdGg6IGNhbnZhcy5jbGllbnRXaWR0aCB8fCBjYW52YXMud2lkdGgsIGhlaWdodDogY2FudmFzLmNsaWVudEhlaWdodCB8fCBjYW52YXMuaGVpZ2h0fTsKfQpmdW5jdGlvbiBzZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcywgd2lkdGgsIGhlaWdodCwgcGl4ZWxSYXRpbykgewogIGNhbnZhcy53aWR0aCA9IHdpZHRoICogKHBpeGVsUmF0aW8gfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7CiAgY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIChwaXhlbFJhdGlvIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpOwogIGNhbnZhcy5zdHlsZS53aWR0aCA9IHdpZHRoICsgInB4IjsKICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgInB4IjsKfQpmdW5jdGlvbiBjcmVhdGVDYW52YXModywgaCwgcmF0aW8sIHByZXZlbnRSaWdodENsaWNrKSB7CiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiY2FudmFzIik7CiAgYWRhcHRDYW52YXNUb0RldmljZVBpeGVsUmF0aW8oY2FudmFzLCB3LCBoLCByYXRpbyk7CiAgaWYgKCEhcHJldmVudFJpZ2h0Q2xpY2spIHsKICAgIGNhbnZhcy5vbmNvbnRleHRtZW51ID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTsKICB9CiAgcmV0dXJuIGNhbnZhczsKfQpmdW5jdGlvbiBhZGFwdENhbnZhc1RvRGV2aWNlUGl4ZWxSYXRpbyhjYW52YXMsIHdpZHRoLCBoZWlnaHQsIHJhdGlvKSB7CiAgY29uc3QgcGl4ZWxSYXRpbyA9IHJhdGlvIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7CiAgbGV0IHcgPSB3aWR0aCB8fCBnZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcykud2lkdGg7CiAgbGV0IGggPSBoZWlnaHQgfHwgZ2V0Q2FudmFzRGltZW5zaW9ucyhjYW52YXMpLmhlaWdodDsKICBzZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcywgdywgaCwgcGl4ZWxSYXRpbyk7CiAgaWYgKHBpeGVsUmF0aW8gIT0gMSkgewogICAgY2FudmFzLmdldENvbnRleHQoIjJkIikuc2V0VHJhbnNmb3JtKHBpeGVsUmF0aW8sIDAsIDAsIHBpeGVsUmF0aW8sIDAsIDApOwogIH0KfQpmdW5jdGlvbiBpbnNlcnRDYW52YXMoY2FudmFzLCBlbCkgewogIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJET01Db250ZW50TG9hZGVkIiwgKCkgPT4gewogICAgdmFyIF9hOwogICAgY29uc3QgZWxlbWVudCA9IChfYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpKSAhPSBudWxsID8gX2EgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTsKICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTsKICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChlbGVtZW50KTsKICB9KTsKfQpjbGFzcyBWZWN0b3IyIHsKICBjb25zdHJ1Y3Rvcih4LCB5KSB7CiAgICB0aGlzLnggPSB4OwogICAgdGhpcy55ID0geTsKICB9CiAgY2xvbmUoKSB7CiAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54LCB0aGlzLnkpOwogIH0KICBhZGQodmVjKSB7CiAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54ICsgdmVjLngsIHRoaXMueSArIHZlYy55KTsKICB9CiAgbXVsdGlwbHkoc2NhbGFyKSB7CiAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54ICogc2NhbGFyLCB0aGlzLnkgKiBzY2FsYXIpOwogIH0KICBkb3QodmVjKSB7CiAgICByZXR1cm4gdGhpcy54ICogdmVjLnggKyB0aGlzLnkgKiB2ZWMueTsKICB9CiAgZGlzdCh2ZWMpIHsKICAgIHJldHVybiBNYXRoLnNxcnQoKHRoaXMueCAtIHZlYy54KSAqKiAyICsgKHRoaXMueSAtIHZlYy55KSAqKiAyKTsKICB9Cn0KY29uc3QgVl9OVUxMID0gbmV3IFZlY3RvcjIoMCwgMCk7CmNvbnN0IFZfVU5JVCA9IG5ldyBWZWN0b3IyKDEsIDEpOwpmdW5jdGlvbiBpc1dvcmtlcigpIHsKICByZXR1cm4gc2VsZi5kb2N1bWVudCA9PSB2b2lkIDAgJiYgc2VsZi53aW5kb3cgPT0gdm9pZCAwOwp9CmZ1bmN0aW9uIG5vdygpIHsKICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgfHwgRGF0ZS5ub3coKTsKfQpTdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemUgPSBmdW5jdGlvbigpIHsKICByZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMuc2xpY2UoMSk7Cn07CmNsYXNzIEVuZ2luZUZhaWx1cmUgZXh0ZW5kcyBFcnJvciB7CiAgY29uc3RydWN0b3IobXNnLCBzb3VyY2UpIHsKICAgIGNvbnN0IG1lc3NhZ2UgPSBzb3VyY2UgPyBgWyR7c291cmNlLmNhcGl0YWxpemUoKX1dIC0gJHttc2d9YCA6IG1zZzsKICAgIHN1cGVyKG1lc3NhZ2UpOwogICAgdGhpcy5uYW1lID0gIkVuZ2luZUZhaWx1cmUiOwogIH0KfQpjbGFzcyBSZW5kZXJlckVycm9yIGV4dGVuZHMgRW5naW5lRmFpbHVyZSB7CiAgY29uc3RydWN0b3IobXNnKSB7CiAgICBzdXBlcihtc2csICJyZW5kZXJlciIpOwogIH0KfQpsZXQgdGV4dHVyZUlkID0gMDsKY2xhc3MgVGV4dHVyZSB7CiAgY29uc3RydWN0b3Ioc291cmNlLCBvcHRpb25zKSB7CiAgICB0aGlzLmlzTG9hZGVkID0gZmFsc2U7CiAgICBpZiAoIXNvdXJjZSkKICAgICAgdGhyb3cgbmV3IEVycm9yKCJBIHNvdXJjZSBwYXRoIHRvIHRoZSByZXNvdXJjZSBtdXN0IGJlIHByb3ZpZGVkIik7CiAgICB0aGlzLmlkID0gdGV4dHVyZUlkKys7CiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7CiAgICB0aGlzLmltYWdlLnNyYyA9IHNvdXJjZTsKICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4gewogICAgICB0aGlzLmlzTG9hZGVkID0gdHJ1ZTsKICAgICAgdGhpcy5vbkxvYWQoKTsKICAgIH07CiAgICB0aGlzLnNpemUgPSB7d2lkdGg6IHRoaXMuaW1hZ2Uud2lkdGgsIGhlaWdodDogdGhpcy5pbWFnZS5oZWlnaHR9OwogICAgdGhpcy5yb3RhdGlvbiA9IChvcHRpb25zID09IG51bGwgPyB2b2lkIDAgOiBvcHRpb25zLnJvdGF0aW9uKSB8fCAwOwogICAgdGhpcy5vZmZzZXQgPSAob3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5vZmZzZXQpIHx8IFZfTlVMTDsKICAgIHRoaXMuc2NhbGUgPSAob3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5zY2FsZSkgfHwgVl9VTklUOwogIH0KICBhc3luYyBjb252ZXJ0VG9CaXRtYXAoKSB7CiAgICBpZiAoIXRoaXMuaW1hZ2Uud2lkdGggfHwgIXRoaXMuaW1hZ2UuaGVpZ2h0KQogICAgICByZXR1cm47CiAgICBjb25zdCBpbWFnZSA9IGF3YWl0IGNyZWF0ZUltYWdlQml0bWFwKHRoaXMuaW1hZ2UpOwogICAgcmV0dXJuIF9fc3ByZWFkUHJvcHMoX19zcHJlYWRWYWx1ZXMoe30sIHRoaXMpLCB7aW1hZ2V9KTsKICB9CiAgb25Mb2FkKCkgewogIH0KfQpjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHsKICBpbnRlcnZhbDogMjAwLAogIGxvb3A6IGZhbHNlCn07CmNsYXNzIEFuaW1hdGVkU3ByaXRlIGV4dGVuZHMgVGV4dHVyZSB7CiAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQsIGZyb20sIHRvLCBvcHRpb25zKSB7CiAgICBzdXBlcihzcHJpdGVTaGVldC5zcHJpdGVTaGVldFBhdGgpOwogICAgdGhpcy5pbnRlcnZhbElkID0gLTE7CiAgICB0aGlzLmlzQW5pbWF0ZWQgPSBmYWxzZTsKICAgIHRoaXMubGFzdFJ1blRpbWVTdGFtcCA9IDA7CiAgICB0aGlzLnNwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7CiAgICBpZiAoZnJvbVswXSA8IDEgfHwgZnJvbVsxXSA8IDEgfHwgdG9bMF0gPCAxIHx8IHRvWzFdIDwgMSB8fCBmcm9tWzBdID4gc3ByaXRlU2hlZXQuY29scyB8fCBmcm9tWzFdID4gc3ByaXRlU2hlZXQucm93cyB8fCB0b1swXSA+IHNwcml0ZVNoZWV0LmNvbHMgfHwgdG9bMV0gPiBzcHJpdGVTaGVldC5yb3dzKQogICAgICB0aHJvdyBuZXcgRW5naW5lRmFpbHVyZSgiSW52YWxpZCB0dXBsZXMgOiB0aGUgc3ByaXRlc2hlZXQgY29vcmRpbmF0ZSBzdGFydHMgYXQgKDEsIDEpIik7CiAgICB0aGlzLmZyb20gPSBmcm9tOwogICAgdGhpcy50byA9IHRvOwogICAgbGV0IG9wdCA9IF9fc3ByZWFkVmFsdWVzKF9fc3ByZWFkVmFsdWVzKHt9LCBkZWZhdWx0T3B0aW9ucyksIG9wdGlvbnMpOwogICAgdGhpcy5pbnRlcnZhbCA9IG9wdC5pbnRlcnZhbDsKICAgIHRoaXMubG9vcCA9IG9wdC5sb29wOwogICAgdGhpcy5zcHJpdGVXaWR0aCA9IHRoaXMuc2l6ZS53aWR0aCAvIHNwcml0ZVNoZWV0LmNvbHM7CiAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHRoaXMuc2l6ZS5oZWlnaHQgLyBzcHJpdGVTaGVldC5yb3dzOwogICAgdGhpcy5jb29yZFggPSB0aGlzLmZyb21bMF07CiAgICB0aGlzLmNvb3JkWSA9IHRoaXMuZnJvbVsxXTsKICB9CiAgcnVuKCkgewogICAgbGV0IG5vd1RpbWVTdGFtcCA9IG5vdygpOwogICAgaWYgKG5vd1RpbWVTdGFtcCAtIHRoaXMubGFzdFJ1blRpbWVTdGFtcCA+IHRoaXMuaW50ZXJ2YWwpIHsKICAgICAgdGhpcy5zdGVwKCk7CiAgICAgIHRoaXMubGFzdFJ1blRpbWVTdGFtcCA9IG5vd1RpbWVTdGFtcDsKICAgIH0KICB9CiAgYW5pbWF0ZSgpIHsKICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpCiAgICAgIHJldHVybjsKICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnN0ZXAoKSwgdGhpcy5pbnRlcnZhbCk7CiAgICB0aGlzLmlzQW5pbWF0ZWQgPSB0cnVlOwogIH0KICBwYXVzZSgpIHsKICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHsKICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTsKICAgICAgdGhpcy5pc0FuaW1hdGVkID0gZmFsc2U7CiAgICB9CiAgfQogIHJlc2V0KCkgewogICAgdGhpcy5jb29yZFggPSB0aGlzLmZyb21bMF07CiAgICB0aGlzLmNvb3JkWSA9IHRoaXMuZnJvbVsxXTsKICB9CiAgc3RvcCgpIHsKICAgIHRoaXMucGF1c2UoKTsKICAgIHRoaXMucmVzZXQoKTsKICB9CiAgc2V0SW50ZXJ2YWwoaW50ZXJ2YWwpIHsKICAgIHRoaXMuaW50ZXJ2YWwgPSBpbnRlcnZhbDsKICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHsKICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTsKICAgICAgdGhpcy5hbmltYXRlKCk7CiAgICB9CiAgfQogIHN0ZXAoKSB7CiAgICBpZiAodGhpcy5jb29yZFggPT09IHRoaXMudG9bMF0gJiYgdGhpcy5jb29yZFkgPT09IHRoaXMudG9bMV0pIHsKICAgICAgaWYgKHRoaXMubG9vcCkgewogICAgICAgIHRoaXMuY29vcmRYID0gdGhpcy5mcm9tWzBdOwogICAgICAgIHRoaXMuY29vcmRZID0gdGhpcy5mcm9tWzFdOwogICAgICB9CiAgICAgIHJldHVybjsKICAgIH0KICAgIGlmICh0aGlzLmNvb3JkWSA8IHRoaXMudG9bMV0pIHsKICAgICAgaWYgKHRoaXMuY29vcmRYIDwgdGhpcy5zcHJpdGVTaGVldC5jb2xzKQogICAgICAgIHRoaXMuY29vcmRYKys7CiAgICAgIGVsc2UgewogICAgICAgIHRoaXMuY29vcmRZKys7CiAgICAgICAgdGhpcy5jb29yZFggPSB0aGlzLmZyb21bMF07CiAgICAgIH0KICAgIH0gZWxzZSB7CiAgICAgIGlmICh0aGlzLmNvb3JkWCA8IHRoaXMudG9bMF0pCiAgICAgICAgdGhpcy5jb29yZFgrKzsKICAgIH0KICB9CiAgc3ByaXRlQm94KCkgewogICAgcmV0dXJuIG5ldyBCb3goKHRoaXMuY29vcmRYIC0gMSkgKiB0aGlzLnNwcml0ZVdpZHRoLCAodGhpcy5jb29yZFkgLSAxKSAqIHRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCk7CiAgfQp9CmNvbnN0IGRlZmF1bHRTdHlsZU9iamVjdCA9IHsKICBzdHJva2VTdHlsZTogImJsYWNrIiwKICBsaW5lV2lkdGg6IDIsCiAgbGluZUpvaW46ICJyb3VuZCIsCiAgbGluZUNhcDogInJvdW5kIiwKICBmaWxsU3R5bGU6ICJ0cmFuc3BhcmVudCIsCiAgZ2xvYmFsQWxwaGE6IDEsCiAgZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiAiYWRkIgp9Owpjb25zdCBkZWZhdWx0VGV4dFN0eWxlT2JqZWN0ID0gewogIGZvbnQ6ICJSb2JvdG8iLAogIHNpemU6IDE2LAogIGNvbG9yOiAiYmxhY2siLAogIHRleHRBbGlnbjogImxlZnQiLAogIHRleHRCYXNlbGluZTogImFscGhhYmV0aWMiCn07CmNvbnN0IFRXT1BJID0gMiAqIE1hdGguUEk7CmxldCBwcmVjaXNpb24gPSBpc1dvcmtlcigpID8gNCA6IDIgKiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7CmxldCBvZmZzZXQgPSBWX05VTEw7CmZ1bmN0aW9uIHJvdW5kKG51bSkgewogIHJldHVybiB+fihudW0gKiBwcmVjaXNpb24pIC8gcHJlY2lzaW9uOwp9CmxldCBjdHg7CmxldCBsYXN0U3R5bGVPYmplY3Q7CmNsYXNzIFJlbmRlcmVyIHsKICBzdGF0aWMgY3JlYXRlKHdpZHRoLCBoZWlnaHQpIHsKICAgIGxldCBbd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodF0gPSBbZ2V0V2luZG93RGltZW5zaW9ucygpLndpZHRoLCBnZXRXaW5kb3dEaW1lbnNpb25zKCkuaGVpZ2h0XTsKICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyh3aWR0aCB8fCB3aW5kb3dXaWR0aCwgaGVpZ2h0IHx8IHdpbmRvd0hlaWdodCk7CiAgICBpbnNlcnRDYW52YXMoY2FudmFzLCAibWFpbiIpOwogICAgUmVuZGVyZXIuc2V0Q29udGV4dChjYW52YXMuZ2V0Q29udGV4dCgiMmQiKSk7CiAgICByZXR1cm4gY2FudmFzOwogIH0KICBzdGF0aWMgY3JlYXRlRnJvbUNhbnZhcyhzZWxlY3RvcikgewogICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpOwogICAgaWYgKCFjYW52YXMgfHwgIShjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpCiAgICAgIHRocm93IG5ldyBSZW5kZXJlckVycm9yKCJUaGUgc2VsZWN0ZWQgZWxlbWVudCBpcyBub3QgYSBjYW52YXMiKTsKICAgIGFkYXB0Q2FudmFzVG9EZXZpY2VQaXhlbFJhdGlvKGNhbnZhcyk7CiAgICBSZW5kZXJlci5zZXRDb250ZXh0KGNhbnZhcy5nZXRDb250ZXh0KCIyZCIpKTsKICAgIHJldHVybiBjYW52YXM7CiAgfQogIHN0YXRpYyBzZXRDb250ZXh0KGNvbnRleHQpIHsKICAgIGN0eCA9IGNvbnRleHQ7CiAgfQogIHN0YXRpYyBnZXRDb250ZXh0KCkgewogICAgcmV0dXJuIGN0eDsKICB9CiAgc3RhdGljIHNldE9mZnNldCh4LCB5KSB7CiAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMih4LCB5KTsKICB9CiAgc3RhdGljIGdldE9mZnNldCgpIHsKICAgIHJldHVybiBvZmZzZXQ7CiAgfQogIHN0YXRpYyBzdHlsZShvYmopIHsKICAgIGlmICghY3R4KQogICAgICB0aHJvdyBuZXcgUmVuZGVyZXJFcnJvcigiQ29udGV4dCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZS4gUGxlYXNlIHVzZSBSZW5kZXJlci5zZXRDb250ZXh0Iik7CiAgICBjb25zdCBzdHlsZU9iamVjdCA9IF9fc3ByZWFkVmFsdWVzKF9fc3ByZWFkVmFsdWVzKHt9LCBkZWZhdWx0U3R5bGVPYmplY3QpLCBvYmopOwogICAgaWYgKHN0eWxlT2JqZWN0ID09PSBsYXN0U3R5bGVPYmplY3QpCiAgICAgIHJldHVybjsKICAgIGlmICgiY29sb3IiIGluIHN0eWxlT2JqZWN0KSB7CiAgICAgIHN0eWxlT2JqZWN0WyJmaWxsU3R5bGUiXSA9IHN0eWxlT2JqZWN0WyJjb2xvciJdOwogICAgICBzdHlsZU9iamVjdFsic3Ryb2tlU3R5bGUiXSA9IHN0eWxlT2JqZWN0WyJjb2xvciJdOwogICAgICBkZWxldGUgc3R5bGVPYmplY3RbImNvbG9yIl07CiAgICB9CiAgICBmb3IgKGxldCBwcm9wIGluIHN0eWxlT2JqZWN0KSB7CiAgICAgIGlmIChjdHhbcHJvcF0gIT09IHN0eWxlT2JqZWN0W3Byb3BdKSB7CiAgICAgICAgY3R4W3Byb3BdID0gc3R5bGVPYmplY3RbcHJvcF07CiAgICAgIH0KICAgIH0KICAgIGxhc3RTdHlsZU9iamVjdCA9IHN0eWxlT2JqZWN0OwogIH0KICBzdGF0aWMgdGV4dFN0eWxlKG9iaikgewogICAgaWYgKCEhY3R4KSB7CiAgICAgIGxldCBzdHlsZU9iamVjdCA9IF9fc3ByZWFkVmFsdWVzKF9fc3ByZWFkVmFsdWVzKHt9LCBkZWZhdWx0VGV4dFN0eWxlT2JqZWN0KSwgb2JqKTsKICAgICAgY3R4LmZvbnQgPSBgJHtzdHlsZU9iamVjdC5zaXplfXB4ICR7c3R5bGVPYmplY3QuZm9udH1gOwogICAgICBkZWxldGUgc3R5bGVPYmplY3Quc2l6ZTsKICAgICAgZGVsZXRlIHN0eWxlT2JqZWN0LmZvbnQ7CiAgICAgIFJlbmRlcmVyLnN0eWxlKF9fc3ByZWFkVmFsdWVzKHtmaWxsU3R5bGU6IHN0eWxlT2JqZWN0LmNvbG9yfSwgc3R5bGVPYmplY3QpKTsKICAgIH0KICB9CiAgc3RhdGljIGNsZWFyKGNvbG9yKSB7CiAgICBpZiAoY29sb3IpIHsKICAgICAgUmVuZGVyZXIuc3R5bGUoe2ZpbGxTdHlsZTogY29sb3J9KTsKICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTsKICAgIH0gZWxzZSB7CiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpOwogICAgfQogIH0KICBzdGF0aWMgbGluZSh4MSwgeTEsIHgyLCB5Miwgb2JqKSB7CiAgICBSZW5kZXJlci5zdHlsZShvYmopOwogICAgY3R4LmJlZ2luUGF0aCgpOwogICAgY3R4Lm1vdmVUbyhyb3VuZChvZmZzZXQueCArIHgxKSwgcm91bmQob2Zmc2V0LnkgKyB5MSkpOwogICAgY3R4LmxpbmVUbyhyb3VuZChvZmZzZXQueCArIHgyKSwgcm91bmQob2Zmc2V0LnkgKyB5MikpOwogICAgY3R4LnN0cm9rZSgpOwogIH0KICBzdGF0aWMgcmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBvYmopIHsKICAgIFJlbmRlcmVyLnN0eWxlKG9iaik7CiAgICBjb25zdCBbcl94LCByX3ksIHJfdywgcl9oXSA9IFtyb3VuZCh4ICsgb2Zmc2V0LngpLCByb3VuZCh5ICsgb2Zmc2V0LnkpLCByb3VuZCh3aWR0aCksIHJvdW5kKGhlaWdodCldOwogICAgY3R4LmZpbGxSZWN0KHJfeCwgcl95LCByX3csIHJfaCk7CiAgICBjdHguc3Ryb2tlUmVjdChyX3gsIHJfeSwgcl93LCByX2gpOwogIH0KICBzdGF0aWMgcmVjdEZyb21DZW50ZXIoeCwgeSwgd2lkdGgsIGhlaWdodCwgb2JqKSB7CiAgICByZXR1cm4gUmVuZGVyZXIucmVjdChyb3VuZCh4IC0gd2lkdGggLyAyKSwgcm91bmQoeSAtIGhlaWdodCAvIDIpLCByb3VuZCh3aWR0aCksIHJvdW5kKGhlaWdodCksIG9iaik7CiAgfQogIHN0YXRpYyByZWN0RnJvbVBvaW50cyh4MSwgeTEsIHgyLCB5Miwgb2JqKSB7CiAgICByZXR1cm4gUmVuZGVyZXIucmVjdChyb3VuZCh4MSksIHJvdW5kKHkxKSwgcm91bmQoeDIgLSB4MSksIHJvdW5kKHkyIC0geTEpLCBvYmopOwogIH0KICBzdGF0aWMgcG9seShwb2ludHMsIG9iaikgewogICAgaWYgKCFwb2ludHMubGVuZ3RoKQogICAgICByZXR1cm47CiAgICBSZW5kZXJlci5zdHlsZShvYmopOwogICAgY3R4LmJlZ2luUGF0aCgpOwogICAgY3R4Lm1vdmVUbyhyb3VuZChwb2ludHNbMF0ueCArIG9mZnNldC54KSwgcm91bmQocG9pbnRzWzBdLnkgKyBvZmZzZXQueSkpOwogICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHsKICAgICAgY3R4LmxpbmVUbyhyb3VuZChwb2ludHNbaV0ueCArIG9mZnNldC54KSwgcm91bmQocG9pbnRzW2ldLnkgKyBvZmZzZXQueSkpOwogICAgfQogICAgY3R4LmZpbGwoKTsKICAgIGN0eC5zdHJva2UoKTsKICB9CiAgc3RhdGljIGNpcmNsZSh4LCB5LCByYWRpdXMsIG9iaikgewogICAgUmVuZGVyZXIuc3R5bGUob2JqKTsKICAgIGN0eC5iZWdpblBhdGgoKTsKICAgIGN0eC5hcmMocm91bmQoeCArIG9mZnNldC54KSwgcm91bmQoeSArIG9mZnNldC55KSwgcmFkaXVzLCAwLCBUV09QSSk7CiAgICBjdHguZmlsbCgpOwogICAgY3R4LnN0cm9rZSgpOwogIH0KICBzdGF0aWMgY2lyY2xlRnJvbVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgb2JqKSB7CiAgICByZXR1cm4gUmVuZGVyZXIuY2lyY2xlKHJvdW5kKHggKyB3aWR0aCAvIDIpLCByb3VuZCh5ICsgaGVpZ2h0IC8gMiksIHJvdW5kKE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMiksIG9iaik7CiAgfQogIHN0YXRpYyBwb2ludCh4LCB5LCBvYmopIHsKICAgIFJlbmRlcmVyLmNpcmNsZShyb3VuZCh4KSwgcm91bmQoeSksIDUsIG9iaik7CiAgfQogIHN0YXRpYyByZWN0U3ByaXRlKHgsIHksIHdpZHRoLCBoZWlnaHQsIHRleHR1cmUpIHsKICAgIGlmICghdGV4dHVyZS5pc0xvYWRlZCkKICAgICAgcmV0dXJuOwogICAgUmVuZGVyZXIuc3R5bGUoe30pOwogICAgY3R4LnNhdmUoKTsKICAgIGN0eC50cmFuc2xhdGUocm91bmQoeCArIHdpZHRoIC8gMiArIG9mZnNldC54KSwgcm91bmQoeSArIGhlaWdodCAvIDIgKyBvZmZzZXQueSkpOwogICAgY3R4LnNjYWxlKHRleHR1cmUuc2NhbGUueCwgdGV4dHVyZS5zY2FsZS55KTsKICAgIGN0eC5yb3RhdGUodGV4dHVyZS5yb3RhdGlvbik7CiAgICBsZXQgc291cmNlQm94ID0gbmV3IEJveCgwLCAwLCB0ZXh0dXJlLnNpemUud2lkdGgsIHRleHR1cmUuc2l6ZS5oZWlnaHQpOwogICAgaWYgKHRleHR1cmUgaW5zdGFuY2VvZiBBbmltYXRlZFNwcml0ZSkgewogICAgICBzb3VyY2VCb3ggPSB0ZXh0dXJlLnNwcml0ZUJveCgpOwogICAgfQogICAgY3R4LmRyYXdJbWFnZSh0ZXh0dXJlLmltYWdlLCBzb3VyY2VCb3gueCwgc291cmNlQm94LnksIHNvdXJjZUJveC53aWR0aCwgc291cmNlQm94LmhlaWdodCwgcm91bmQod2lkdGggKiB0ZXh0dXJlLm9mZnNldC54IC0gd2lkdGggLyAyKSwgcm91bmQoaGVpZ2h0ICogdGV4dHVyZS5vZmZzZXQueSAtIGhlaWdodCAvIDIpLCByb3VuZCh3aWR0aCksIHJvdW5kKGhlaWdodCkpOwogICAgY3R4LnJlc3RvcmUoKTsKICB9CiAgc3RhdGljIGNpcmNsZVNwcml0ZSh4LCB5LCByYWRpdXMsIHRleHR1cmUpIHsKICAgIGlmICghdGV4dHVyZS5pc0xvYWRlZCkKICAgICAgcmV0dXJuOwogICAgY3R4LnNhdmUoKTsKICAgIGN0eC5iZWdpblBhdGgoKTsKICAgIGN0eC5hcmMocm91bmQoeCArIG9mZnNldC54KSwgcm91bmQoeSArIG9mZnNldC55KSwgcmFkaXVzLCAwLCBUV09QSSk7CiAgICBjdHguY2xpcCgpOwogICAgUmVuZGVyZXIucmVjdFNwcml0ZSh4IC0gcmFkaXVzLCB5IC0gcmFkaXVzLCAyICogcmFkaXVzLCAyICogcmFkaXVzLCB0ZXh0dXJlKTsKICAgIGN0eC5yZXN0b3JlKCk7CiAgfQogIHN0YXRpYyB0ZXh0KHRleHQsIHgsIHksIHN0eWxlKSB7CiAgICBSZW5kZXJlci50ZXh0U3R5bGUoc3R5bGUpOwogICAgY3R4LmZpbGxUZXh0KHRleHQsIHgsIHkpOwogIH0KICBzdGF0aWMgY2VudGVyZWRUZXh0KHRleHQsIHgsIHksIHN0eWxlKSB7CiAgICBSZW5kZXJlci50ZXh0KHRleHQsIHgsIHksIF9fc3ByZWFkUHJvcHMoX19zcHJlYWRWYWx1ZXMoe30sIHN0eWxlKSwge3RleHRBbGlnbjogImNlbnRlciIsIHRleHRCYXNlbGluZTogIm1pZGRsZSJ9KSk7CiAgfQogIHN0YXRpYyB0aW50KGNvbG9yLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7CiAgICBSZW5kZXJlci5yZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQsIHsKICAgICAgZmlsbFN0eWxlOiBjb2xvciwKICAgICAgZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiAibXVsdGlwbHkiLAogICAgICBnbG9iYWxBbHBoYTogMC4yNQogICAgfSk7CiAgfQogIHN0YXRpYyBiZWdpbkZyYW1lKGNvbG9yKSB7CiAgICBSZW5kZXJlci5jbGVhcihjb2xvcik7CiAgfQogIHN0YXRpYyBlbmRGcmFtZSgpIHsKICB9Cn0KY2xhc3MgVGhyZWFkV29ya2VyIHsKICBzZW5kTWVzc2FnZVRvTWFpblRocmVhZCh0aXRsZSwgYXJncykgewogICAgc2VsZi5wb3N0TWVzc2FnZSh7dGl0bGUsIGRhdGE6IGFyZ3N9KTsKICB9CiAgbG9nKC4uLmFyZ3MpIHsKICAgIHRoaXMuc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoImxvZyIsIC4uLmFyZ3MpOwogIH0KfQpjbGFzcyBSZW5kZXJlcldvcmtlciBleHRlbmRzIFRocmVhZFdvcmtlciB7CiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgdGhpcy5jYW52YXNSZXNvbHV0aW9uID0gMTsKICAgIHRoaXMub2Zmc2NyZWVuQ2FudmFzID0gbnVsbDsKICAgIHRoaXMuY3R4ID0gbnVsbDsKICAgIHRoaXMudGV4dHVyZUFsaWFzID0gbmV3IE1hcCgpOwogICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgKHtkYXRhfSkgPT4gdGhpcy5vbk1lc3NhZ2UoZGF0YS50aXRsZSwgZGF0YS5jb250ZW50KSk7CiAgfQogIG9uTWVzc2FnZSh0aXRsZSwgY29udGVudCkgewogICAgc3dpdGNoICh0aXRsZSkgewogICAgICBjYXNlICJpbml0Q2FudmFzIjoKICAgICAgICB0aGlzLm9mZnNjcmVlbkNhbnZhcyA9IGNvbnRlbnQuY2FudmFzOwogICAgICAgIHRoaXMuY3R4ID0gdGhpcy5vZmZzY3JlZW5DYW52YXMuZ2V0Q29udGV4dCgiMmQiKTsKICAgICAgICBSZW5kZXJlci5zZXRDb250ZXh0KHRoaXMuY3R4KTsKICAgICAgICB0aGlzLnNldFNpemUoY29udGVudC5kcHIsIGNvbnRlbnQud2lkdGgsIGNvbnRlbnQuaGVpZ2h0KTsKICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9NYWluVGhyZWFkKCJpbml0aWFsaXplZCIpOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJyZW5kZXIiOgogICAgICAgIGZvciAobGV0IHJlbmRlckNhbGwgb2YgY29udGVudC5yZW5kZXJTdGFjaykgewogICAgICAgICAgdGhpcy5oYW5kbGVEcmF3UmVxdWVzdChyZW5kZXJDYWxsLm1ldGhvZE5hbWUsIHJlbmRlckNhbGwuYXJncyk7CiAgICAgICAgfQogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJuZXdUZXh0dXJlIjoKICAgICAgICB0aGlzLnRleHR1cmVBbGlhcy5zZXQoY29udGVudC5pZCwgY29udGVudC50ZXh0dXJlKTsKICAgICAgICBicmVhazsKICAgIH0KICB9CiAgc2V0U2l6ZShkcHIsIHdpZHRoLCBoZWlnaHQpIHsKICAgIGNvbnN0IHBpeGVsUmF0aW8gPSAoZHByIHx8IDEpICogdGhpcy5jYW52YXNSZXNvbHV0aW9uOwogICAgdGhpcy5vZmZzY3JlZW5DYW52YXMud2lkdGggPSB3aWR0aCAqIHBpeGVsUmF0aW87CiAgICB0aGlzLm9mZnNjcmVlbkNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiBwaXhlbFJhdGlvOwogICAgInNldFRyYW5zZm9ybSIgaW4gdGhpcy5jdHggPyB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0ocGl4ZWxSYXRpbywgMCwgMCwgcGl4ZWxSYXRpbywgMCwgMCkgOiBudWxsOwogIH0KICBnZXRUZXh0dXJlKGFyZ3MpIHsKICAgIGNvbnN0IHRleHR1cmUgPSB0aGlzLnRleHR1cmVBbGlhcy5nZXQoYXJncy50ZXh0dXJlSWQpOwogICAgY29uc3Qge3NjYWxlLCByb3RhdGlvbiwgb2Zmc2V0OiBvZmZzZXQyfSA9IGFyZ3M7CiAgICByZXR1cm4gX19zcHJlYWRQcm9wcyhfX3NwcmVhZFZhbHVlcyh7fSwgdGV4dHVyZSksIHtzY2FsZSwgcm90YXRpb24sIG9mZnNldDogb2Zmc2V0Mn0pOwogIH0KICBoYW5kbGVEcmF3UmVxdWVzdChtZXRob2QsIGFyZ3MpIHsKICAgIHN3aXRjaCAobWV0aG9kKSB7CiAgICAgIGNhc2UgInN0eWxlIjoKICAgICAgICBSZW5kZXJlci5zdHlsZShhcmdzID09IG51bGwgPyB2b2lkIDAgOiBhcmdzLm9iaik7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgImNsZWFyIjoKICAgICAgICBSZW5kZXJlci5jbGVhcihhcmdzID09IG51bGwgPyB2b2lkIDAgOiBhcmdzLmNvbG9yKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAibGluZSI6CiAgICAgICAgUmVuZGVyZXIubGluZShhcmdzLngxLCBhcmdzLnkxLCBhcmdzLngyLCBhcmdzLnkyLCBhcmdzLm9iaik7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgInJlY3QiOgogICAgICAgIFJlbmRlcmVyLnJlY3QoYXJncy54LCBhcmdzLnksIGFyZ3Mud2lkdGgsIGFyZ3MuaGVpZ2h0LCBhcmdzLm9iaik7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgInJlY3RGcm9tQ2VudGVyIjoKICAgICAgICBSZW5kZXJlci5yZWN0RnJvbUNlbnRlcihhcmdzLngsIGFyZ3MueSwgYXJncy53aWR0aCwgYXJncy5oZWlnaHQsIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicmVjdEZyb21Qb2ludHMiOgogICAgICAgIFJlbmRlcmVyLnJlY3RGcm9tUG9pbnRzKGFyZ3MueDEsIGFyZ3MueTEsIGFyZ3MueDIsIGFyZ3MueTIsIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicG9seSI6CiAgICAgICAgUmVuZGVyZXIucG9seShhcmdzLnBvaW50cywgYXJncy5vYmopOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJjaXJjbGUiOgogICAgICAgIFJlbmRlcmVyLmNpcmNsZShhcmdzLngsIGFyZ3MueSwgYXJncy5yYWRpdXMsIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAiY2lyY2xlRnJvbVJlY3QiOgogICAgICAgIFJlbmRlcmVyLmNpcmNsZUZyb21SZWN0KGFyZ3MueCwgYXJncy55LCBhcmdzLndpZHRoLCBhcmdzLmhlaWdodCwgYXJncy5vYmopOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJwb2ludCI6CiAgICAgICAgUmVuZGVyZXIucG9pbnQoYXJncy54LCBhcmdzLnksIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicmVjdFNwcml0ZSI6CiAgICAgICAgUmVuZGVyZXIucmVjdFNwcml0ZShhcmdzLngsIGFyZ3MueSwgYXJncy53aWR0aCwgYXJncy5oZWlnaHQsIHRoaXMuZ2V0VGV4dHVyZShhcmdzKSk7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgImNpcmNsZVNwcml0ZSI6CiAgICAgICAgUmVuZGVyZXIuY2lyY2xlU3ByaXRlKGFyZ3MueCwgYXJncy55LCBhcmdzLnJhZGl1cywgdGhpcy5nZXRUZXh0dXJlKGFyZ3MpKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAidGV4dCI6CiAgICAgICAgUmVuZGVyZXIudGV4dChhcmdzLnRleHQsIGFyZ3MueCwgYXJncy55LCBhcmdzID09IG51bGwgPyB2b2lkIDAgOiBhcmdzLnN0eWxlKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAiY2VudGVyZWRUZXh0IjoKICAgICAgICBSZW5kZXJlci5jZW50ZXJlZFRleHQoYXJncy50ZXh0LCBhcmdzLngsIGFyZ3MueSwgYXJncyA9PSBudWxsID8gdm9pZCAwIDogYXJncy5zdHlsZSk7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgInRpbnQiOgogICAgICAgIFJlbmRlcmVyLnRpbnQoYXJncy5jb2xvciwgYXJncy54LCBhcmdzLnksIGFyZ3Mud2lkdGgsIGFyZ3MuaGVpZ2h0KTsKICAgICAgICBicmVhazsKICAgIH0KICB9Cn0KbmV3IFJlbmRlcmVyV29ya2VyKCk7Cg==", { type: "module" });
}
let offscreenCanvas;
let worker;
let canvas;
let workerIsInitialized = false;
let renderStack = [];
const textureAlias = new Map();
class OffscreenRenderer {
  static get worker() {
    return worker;
  }
  static get workerIsInitialized() {
    return workerIsInitialized;
  }
  static get offscreenCanvas() {
    return offscreenCanvas;
  }
  static get renderStack() {
    return renderStack;
  }
  static create(width, height) {
    let [windowWidth, windowHeight] = [getWindowDimensions().width, getWindowDimensions().height];
    canvas = createCanvas(width || windowWidth, height || windowHeight, 1);
    OffscreenRenderer.initRenderWorker(canvas, width || windowWidth, height || windowHeight);
    insertCanvas(canvas, "main");
    return canvas;
  }
  static createFromCanvas(selector) {
    canvas = document.querySelector(selector);
    if (!canvas || !(canvas instanceof HTMLCanvasElement))
      throw new RendererError("The selected element is not a canvas");
    adaptCanvasToDevicePixelRatio(canvas, canvas.clientWidth, canvas.clientHeight, 1);
    OffscreenRenderer.initRenderWorker(canvas, canvas.width, canvas.height);
    return canvas;
  }
  static initRenderWorker(canvas2, width, height) {
    if (!(Game.renderer instanceof OffscreenRenderer)) {
      Game.setRendererType("offscreen");
    }
    let { clientWidth, clientHeight } = canvas2;
    worker = new WorkerWrapper();
    offscreenCanvas = canvas2.transferControlToOffscreen();
    this.sendMessageToWorker("initCanvas", {
      width: width || clientWidth,
      height: height || clientHeight,
      canvas: offscreenCanvas,
      dpr: window.devicePixelRatio || 1
    }, [offscreenCanvas]);
    worker.onmessage = ({ data: { title, data } }) => {
      switch (title) {
        case "log":
          console.log("message from the renderer worker : ", data);
          break;
        case "initialized":
          workerIsInitialized = true;
          this.endFrame();
          break;
        default:
          console.log(title);
      }
    };
  }
  static addRenderCall(name, args) {
    renderStack.push(new RenderCall(name, args || {}));
  }
  static sendMessageToWorker(title, data, transfer) {
    return worker.postMessage(new WorkerMessage(title, data), transfer || []);
  }
  static style(obj) {
    this.addRenderCall("style", { obj });
  }
  static clear(color) {
    this.addRenderCall("clear", { color });
  }
  static line(x1, y1, x2, y2, obj) {
    this.addRenderCall("line", { x1, y1, x2, y2, obj });
  }
  static rect(x, y, width, height, obj) {
    this.addRenderCall("rect", { x, y, width, height, obj });
  }
  static rectFromCenter(x, y, width, height, obj) {
    this.addRenderCall("rectFromCenter", { x, y, width, height, obj });
  }
  static rectFromPoints(x1, y1, x2, y2, obj) {
    this.addRenderCall("rectFromPoints", { x1, y1, x2, y2, obj });
  }
  static poly(points, obj) {
    this.addRenderCall("poly", { points, obj });
  }
  static circle(x, y, radius, obj) {
    this.addRenderCall("circle", { x, y, radius, obj });
  }
  static circleFromRect(x, y, width, height, obj) {
    this.addRenderCall("circleFromRect", { x, y, width, height, obj });
  }
  static point(x, y, obj) {
    this.addRenderCall("point", { x, y, obj });
  }
  static handleTexture(texture, drawCall, args) {
    var _a;
    if (!texture.isLoaded)
      return;
    if (textureAlias.has(texture.id)) {
      const { scale, rotation, offset: offset2 } = texture;
      this.addRenderCall(drawCall, __spreadProps(__spreadValues({}, args), { textureId: texture.id, scale, rotation, offset: offset2 }));
    } else {
      (_a = texture.convertToBitmap()) == null ? void 0 : _a.then((adaptedTexture) => {
        textureAlias.set(texture.id, adaptedTexture);
        this.sendMessageToWorker("newTexture", { id: texture.id, texture: adaptedTexture });
      });
    }
  }
  static rectSprite(x, y, width, height, texture) {
    this.handleTexture(texture, "rectSprite", { x, y, width, height });
  }
  static async circleSprite(x, y, radius, texture) {
    this.handleTexture(texture, "circleSprite", { x, y, radius });
  }
  static text(text, x, y, style) {
    this.addRenderCall("text", { text, x, y, style });
  }
  static centeredText(text, x, y, style) {
    this.addRenderCall("centeredText", { text, x, y, style });
  }
  static tint(color, x, y, width, height) {
    this.addRenderCall("circle", { color, x, y, width, height });
  }
  static beginFrame(color) {
    renderStack = [];
    this.clear(color);
  }
  static endFrame() {
    if (!workerIsInitialized)
      return;
    this.sendMessageToWorker("render", { renderStack });
    renderStack = [];
  }
}
const OffscreenRendererWrapper = ApiIsSupported("OffscreenCanvas") ? OffscreenRenderer : Renderer;
function showStats() {
  const stats = new Stats();
  const el = document.createElement("div");
  el.classList.toggle("stats");
  stats.showPanel(0);
  el.appendChild(stats.dom);
  document.body.appendChild(el);
  Interface.statsShift(48);
  return stats;
}
class AnimationFrame {
  constructor(animate, fps = 60) {
    this.requestId = 0;
    this.animate = animate;
    this.fps = fps;
    if (!window)
      throw new EngineFailure("No window context", "core");
  }
  start() {
    let then = now();
    const interval = 1e3 / this.fps;
    const tolerance = 0.1;
    const animateLoop = (time) => {
      this.requestId = window.requestAnimationFrame(animateLoop);
      const delta = time - then;
      if (delta >= interval - tolerance) {
        then = time - delta % interval;
        this.animate(delta);
      }
    };
    this.requestId = window.requestAnimationFrame(animateLoop);
  }
  stop() {
    window.cancelAnimationFrame(this.requestId);
  }
}
let rendererType = "normal";
class Game {
  constructor(name, env, fps = 60) {
    this.fps = 60;
    this.name = name;
    this.env = env;
    this.tick = 0;
    this.stats = null;
    this.showStatsPanel = false;
    this.gameLoop = this.env ? () => env.update() : null;
    this.fps = fps;
    this.makeAnimationFrame();
  }
  static setRendererType(type) {
    rendererType = type;
  }
  static get renderer() {
    return rendererType === "normal" ? Renderer : OffscreenRendererWrapper;
  }
  toggleStats(show) {
    if (show !== void 0) {
      this.showStatsPanel = show;
    } else {
      this.showStatsPanel = !this.showStatsPanel;
    }
    if (this.showStatsPanel) {
      this.stats = showStats();
    } else {
      this.stats = null;
      if (document.querySelector(".stats"))
        document.querySelector(".stats").remove();
    }
  }
  makeAnimationFrame() {
    if (!this.update)
      return;
    this.animationFrame = new AnimationFrame((deltaTime) => this.update(deltaTime), this.fps);
  }
  setMainLoop(func) {
    this.gameLoop = func;
    this.makeAnimationFrame();
  }
  setFPS(fps) {
    this.fps = fps;
    this.makeAnimationFrame();
  }
  update(deltaTime) {
    var _a, _b;
    (_a = this.stats) == null ? void 0 : _a.begin();
    ES.tick();
    AS.tick(deltaTime);
    if (this.gameLoop)
      this.gameLoop(deltaTime);
    if (this.tick % Interface.updateInterval === 0)
      Interface.update();
    (_b = this.stats) == null ? void 0 : _b.end();
    this.tick++;
  }
  start() {
    if (!this.gameLoop)
      throw new Error("No game loop");
    if (!this.animationFrame)
      throw new Error("AnimationFrame");
    if (windowIsLoaded())
      this.internalStart();
    else
      window.addEventListener("DOMContentLoaded", () => this.internalStart());
  }
  internalStart() {
    if (this.name)
      document.title = this.name;
    ES.init();
    AS.init();
    Interface.init();
    if (this.showStatsPanel)
      this.stats = showStats();
    this.animationFrame.start();
    window.unrailEngineLoaded = true;
    Event.emit("EngineLoaded");
  }
}
class Env$1 {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  update() {
  }
  render() {
  }
}
class GameObject {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width || 100;
    this.height = height || width || 100;
  }
  contains(x, y) {
    return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
  }
  collide(obj) {
    if (!obj.width || !obj.height || !this.width || !this.height)
      return false;
    return this.x < obj.x + obj.width && this.x + this.width > obj.x && this.y < obj.y + obj.height && this.height + this.y > obj.y;
  }
  update(...args) {
  }
  render(...args) {
  }
}
class PlayerObject extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
  update(...args) {
  }
  render(...args) {
  }
}
class Cooldown {
  constructor(delay, callback) {
    this.delay = delay;
    this.callback = callback;
    window.setTimeout(this.callback, this.delay);
  }
}
const GRAVITY = 0.01;
class Particle extends GameObject {
  constructor(id, pos, speed = 5, angle, color) {
    super(pos.x, pos.y);
    this.radius = 2;
    this.id = id;
    this.pos = pos.clone();
    this.angle = angle && angle != "random" ? angle % 2 * Math.PI : Math.PI / 2 + Math.random() * 2 * Math.PI;
    this.velocity = new Vector2(Math.random() * speed * Math.cos(this.angle), Math.random() * speed * Math.sin(this.angle));
    this.color = color || "transparent";
    this.opacity = clamp(100, Math.random() * 255, 255);
  }
  update() {
    this.velocity.y += GRAVITY;
    this.pos = this.pos.add(this.velocity);
    this.opacity -= 2;
  }
  render() {
    Game.renderer.circle(this.pos.x, this.pos.y, this.radius, { fillStyle: this.color, lineWidth: 1, globalAlpha: this.opacity / 255 });
  }
}
class ParticuleGenerator {
  constructor(nbParticles, pos, lifeDuration, onDestroy) {
    this.pos = pos;
    this.lifeDuration = lifeDuration;
    this.particles = [];
    this.UUID = main_min.randint(1, 100) * 100;
    for (let i = 0; i < nbParticles; i++) {
      let particles = new Particle(this.UUID + i, this.pos);
      this.particles.push(particles);
    }
    new Cooldown(this.lifeDuration, () => {
      this.destroy();
      if (onDestroy)
        onDestroy();
    });
  }
  addParticles(array) {
    return array.concat(this.particles);
  }
  removeParticles(array) {
    const nbParticles = this.particles.length;
    return array.filter((el) => !inRange(el.id, this.UUID, this.UUID + nbParticles));
  }
  destroy() {
  }
}
console.log("Unrail Engine v" + version.toString());

let paused = false;
class Enemy extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.health = 100;
    this.alive = true;
    this.width = 80;
    this.height = 50;
    this.texture = new Texture("resources/assets/InvaderA2.png");
  }
  isDead() {
    if (!this.alive)
      return;
    this.alive = false;
    Event.emit("enemy-kill", this);
  }
  update() {
    if (this.health <= 0) {
      this.isDead();
      return;
    }
    this.y += 0.25;
  }
  render() {
    if (!this.alive)
      return;
    OffscreenRendererWrapper.rectSprite(this.x, this.y, this.width, this.height, this.texture);
  }
}
class Player extends PlayerObject {
  constructor(x, y) {
    super(x, y);
    this.health = 100;
    this.alive = true;
    this.texture = new Texture("resources/assets/space-invader-player.png");
  }
  isDead() {
    this.alive = false;
  }
  move(dx, dy) {
    this.x = clamp(0, this.x + dx, window.innerWidth);
    this.y += dy;
  }
  shoot() {
    Event.emit("new-shot", { x: this.x + 30, y: this.y });
  }
  update() {
    if (this.health <= 0)
      return this.isDead();
  }
  render() {
    OffscreenRendererWrapper.rectSprite(this.x, this.y, 60, 30, this.texture);
  }
}
class Shot extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.width = 2;
    this.height = 5;
    this.speed = 6;
  }
  update(enemies) {
    enemies.forEach((enemy) => {
      if (enemy.collide(this)) {
        enemy.health -= 5;
        Event.emit("hit", { shot: this, enemy });
      }
    });
    this.y -= this.speed;
  }
  render() {
    OffscreenRendererWrapper.rect(this.x, this.y, this.width, this.height, { lineWidth: 4, strokeStyle: "red" });
  }
}
class Env extends Env$1 {
  constructor(width2, height2) {
    super(width2, height2);
    this.player = new Player(width2 / 2, height2 - 30);
    this.shots = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.bindEvents();
    this.generateEnemies();
    window.setInterval(() => this.generateEnemies(), 3e3);
  }
  generateEnemies() {
    for (let i = 0; i < 5; i++) {
      this.enemies.push(new Enemy(150 * i, -50));
    }
  }
  bindEvents() {
    const speed = 3;
    Event.onKeyDown("ArrowLeft", (e) => this.player.move(-5 * speed, 0));
    Event.onKeyDown("ArrowRight", (e) => this.player.move(5 * speed, 0));
    Event.onKeyPressed("Space", (e) => this.player.shoot());
    Event.on("enemy-kill", (enemy) => {
      this.score += 5;
      this.enemies = this.enemies.filter((e) => e !== enemy);
    });
    Event.on("new-shot", ({ x, y }) => {
      this.shots.push(new Shot(x, y));
    });
    Event.on("hit", ({ shot, enemy }) => this.hit(shot, enemy));
  }
  hit(shot, enemy) {
    enemy.health -= 20;
    this.shots = this.shots.filter((s) => s !== shot);
    const PG = new ParticuleGenerator(50, new Vector2(shot.x, shot.y), 700, () => {
      this.particles = PG.removeParticles(this.particles);
    });
    this.particles = PG.addParticles(this.particles);
  }
  update() {
    if (paused)
      return;
    this.player.update();
    this.shots = this.shots.filter((shot) => shot.y > 0);
    this.shots.forEach((shot) => shot.update(this.enemies));
    this.enemies.forEach((enemy) => enemy.update());
    this.particles.forEach((particle) => particle.update());
    this.render();
  }
  render() {
    OffscreenRendererWrapper.clear();
    this.player.render();
    this.shots.forEach((shot) => shot.render());
    this.enemies.forEach((enemy) => enemy.render());
    this.particles.forEach((particle) => particle.render());
    OffscreenRendererWrapper.endFrame();
  }
}
const { width, height } = getWindowDimensions();
OffscreenRendererWrapper.create();
const env = new Env(width, height);
const game = new Game("Space Invader", env);
Interface.addItem(() => `Score : ${env.score}`, "top-left");
Interface.addItem(() => `Health : ${env.player.health}`, "top-right");
Interface.addButton(() => paused ? "||" : ">", (e) => paused = !paused);
game.setMainLoop(() => env.update());
game.setFPS(60);
game.start();
