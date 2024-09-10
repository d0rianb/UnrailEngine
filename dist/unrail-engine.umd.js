var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
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
(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2["unrail-engine"] = global2["unrail-engine"] || {}));
})(this, function(exports2) {
  "use strict";
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
  const Point = Vector2;
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
    return {width: window.innerWidth, height: window.innerHeight};
  }
  function getCanvasDimensions(canvas2) {
    return {width: canvas2.clientWidth || canvas2.width, height: canvas2.clientHeight || canvas2.height};
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
  function blink(el, className, interval = 300) {
    var _a;
    (_a = document.querySelector(el)) == null ? void 0 : _a.classList.toggle(className);
    setTimeout(() => {
      var _a2;
      return (_a2 = document.querySelector(el)) == null ? void 0 : _a2.classList.toggle(className);
    }, interval);
  }
  function isWorker() {
    return self.document == void 0 && self.window == void 0;
  }
  function hashObject(obj) {
    let str = "";
    for (const key in obj) {
      str += `#${key}:${obj[key]}`;
    }
    return str;
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
  var stats_min = {exports: {}};
  (function(module2, exports3) {
    (function(f, e) {
      module2.exports = e();
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
        return {REVISION: 16, dom: c, addPanel: e, showPanel: u, begin: function() {
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
        }, domElement: c, setMode: u};
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
        return {dom: q, update: function(h2, w) {
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
        }};
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
      this.size = {width: this.image.width, height: this.image.height};
      this.rotation = (options == null ? void 0 : options.rotation) || 0;
      this.offset = (options == null ? void 0 : options.offset) || V_NULL;
      this.scale = (options == null ? void 0 : options.scale) || V_UNIT;
    }
    async convertToBitmap() {
      if (!this.image.width || !this.image.height)
        return;
      const image = await createImageBitmap(this.image);
      return __spreadProps(__spreadValues({}, this), {image});
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
      const item = {callback: textFunction, position, options, onClick};
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
  class SpriteSheet {
    constructor(spriteSheetPath, cols, rows) {
      this.spriteSheetPath = spriteSheetPath;
      this.cols = cols;
      this.rows = rows;
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
        Renderer.style(__spreadValues({fillStyle: styleObject.color}, styleObject));
      }
    }
    static clear(color) {
      if (color) {
        Renderer.style({fillStyle: color});
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
    static roundedRect(x, y, width, height, radius, obj) {
      Renderer.style(obj);
      const [r_x, r_y, r_w, r_h] = [round(x + offset.x), round(y + offset.y), round(width), round(height)];
      const r_radius = round(radius);
      ctx.beginPath();
      ctx.roundRect(r_x, r_y, r_w, r_h, [r_radius]);
      ctx.fill();
      ctx.stroke();
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
      Renderer.text(text, x, y, __spreadProps(__spreadValues({}, style), {textAlign: "center", textBaseline: "middle"}));
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
    return new Worker("data:application/javascript;base64,dmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTsKdmFyIF9fZGVmUHJvcHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllczsKdmFyIF9fZ2V0T3duUHJvcERlc2NzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7CnZhciBfX2dldE93blByb3BTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczsKdmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7CnZhciBfX3Byb3BJc0VudW0gPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlOwp2YXIgX19kZWZOb3JtYWxQcm9wID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ga2V5IGluIG9iaiA/IF9fZGVmUHJvcChvYmosIGtleSwge2VudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlfSkgOiBvYmpba2V5XSA9IHZhbHVlOwp2YXIgX19zcHJlYWRWYWx1ZXMgPSAoYSwgYikgPT4gewogIGZvciAodmFyIHByb3AgaW4gYiB8fCAoYiA9IHt9KSkKICAgIGlmIChfX2hhc093blByb3AuY2FsbChiLCBwcm9wKSkKICAgICAgX19kZWZOb3JtYWxQcm9wKGEsIHByb3AsIGJbcHJvcF0pOwogIGlmIChfX2dldE93blByb3BTeW1ib2xzKQogICAgZm9yICh2YXIgcHJvcCBvZiBfX2dldE93blByb3BTeW1ib2xzKGIpKSB7CiAgICAgIGlmIChfX3Byb3BJc0VudW0uY2FsbChiLCBwcm9wKSkKICAgICAgICBfX2RlZk5vcm1hbFByb3AoYSwgcHJvcCwgYltwcm9wXSk7CiAgICB9CiAgcmV0dXJuIGE7Cn07CnZhciBfX3NwcmVhZFByb3BzID0gKGEsIGIpID0+IF9fZGVmUHJvcHMoYSwgX19nZXRPd25Qcm9wRGVzY3MoYikpOwpjbGFzcyBCb3ggewogIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHsKICAgIHRoaXMueCA9IHg7CiAgICB0aGlzLnkgPSB5OwogICAgdGhpcy53aWR0aCA9IHdpZHRoOwogICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7CiAgfQp9CmZ1bmN0aW9uIGdldFdpbmRvd0RpbWVuc2lvbnMoKSB7CiAgcmV0dXJuIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fTsKfQpmdW5jdGlvbiBnZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcykgewogIHJldHVybiB7d2lkdGg6IGNhbnZhcy5jbGllbnRXaWR0aCB8fCBjYW52YXMud2lkdGgsIGhlaWdodDogY2FudmFzLmNsaWVudEhlaWdodCB8fCBjYW52YXMuaGVpZ2h0fTsKfQpmdW5jdGlvbiBzZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcywgd2lkdGgsIGhlaWdodCwgcGl4ZWxSYXRpbykgewogIGNhbnZhcy53aWR0aCA9IHdpZHRoICogKHBpeGVsUmF0aW8gfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7CiAgY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIChwaXhlbFJhdGlvIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpOwogIGNhbnZhcy5zdHlsZS53aWR0aCA9IHdpZHRoICsgInB4IjsKICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgInB4IjsKfQpmdW5jdGlvbiBjcmVhdGVDYW52YXModywgaCwgcmF0aW8sIHByZXZlbnRSaWdodENsaWNrKSB7CiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiY2FudmFzIik7CiAgYWRhcHRDYW52YXNUb0RldmljZVBpeGVsUmF0aW8oY2FudmFzLCB3LCBoLCByYXRpbyk7CiAgaWYgKCEhcHJldmVudFJpZ2h0Q2xpY2spIHsKICAgIGNhbnZhcy5vbmNvbnRleHRtZW51ID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTsKICB9CiAgcmV0dXJuIGNhbnZhczsKfQpmdW5jdGlvbiBhZGFwdENhbnZhc1RvRGV2aWNlUGl4ZWxSYXRpbyhjYW52YXMsIHdpZHRoLCBoZWlnaHQsIHJhdGlvKSB7CiAgY29uc3QgcGl4ZWxSYXRpbyA9IHJhdGlvIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7CiAgbGV0IHcgPSB3aWR0aCB8fCBnZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcykud2lkdGg7CiAgbGV0IGggPSBoZWlnaHQgfHwgZ2V0Q2FudmFzRGltZW5zaW9ucyhjYW52YXMpLmhlaWdodDsKICBzZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcywgdywgaCwgcGl4ZWxSYXRpbyk7CiAgaWYgKHBpeGVsUmF0aW8gIT0gMSkgewogICAgY2FudmFzLmdldENvbnRleHQoIjJkIikuc2V0VHJhbnNmb3JtKHBpeGVsUmF0aW8sIDAsIDAsIHBpeGVsUmF0aW8sIDAsIDApOwogIH0KfQpmdW5jdGlvbiBpbnNlcnRDYW52YXMoY2FudmFzLCBlbCkgewogIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJET01Db250ZW50TG9hZGVkIiwgKCkgPT4gewogICAgdmFyIF9hOwogICAgY29uc3QgZWxlbWVudCA9IChfYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpKSAhPSBudWxsID8gX2EgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTsKICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTsKICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChlbGVtZW50KTsKICB9KTsKfQpjbGFzcyBWZWN0b3IyIHsKICBjb25zdHJ1Y3Rvcih4LCB5KSB7CiAgICB0aGlzLnggPSB4OwogICAgdGhpcy55ID0geTsKICB9CiAgY2xvbmUoKSB7CiAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54LCB0aGlzLnkpOwogIH0KICBhZGQodmVjKSB7CiAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54ICsgdmVjLngsIHRoaXMueSArIHZlYy55KTsKICB9CiAgbXVsdGlwbHkoc2NhbGFyKSB7CiAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54ICogc2NhbGFyLCB0aGlzLnkgKiBzY2FsYXIpOwogIH0KICBkb3QodmVjKSB7CiAgICByZXR1cm4gdGhpcy54ICogdmVjLnggKyB0aGlzLnkgKiB2ZWMueTsKICB9CiAgZGlzdCh2ZWMpIHsKICAgIHJldHVybiBNYXRoLnNxcnQoKHRoaXMueCAtIHZlYy54KSAqKiAyICsgKHRoaXMueSAtIHZlYy55KSAqKiAyKTsKICB9Cn0KY29uc3QgVl9OVUxMID0gbmV3IFZlY3RvcjIoMCwgMCk7CmNvbnN0IFZfVU5JVCA9IG5ldyBWZWN0b3IyKDEsIDEpOwpmdW5jdGlvbiBpc1dvcmtlcigpIHsKICByZXR1cm4gc2VsZi5kb2N1bWVudCA9PSB2b2lkIDAgJiYgc2VsZi53aW5kb3cgPT0gdm9pZCAwOwp9CmZ1bmN0aW9uIG5vdygpIHsKICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgfHwgRGF0ZS5ub3coKTsKfQpTdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemUgPSBmdW5jdGlvbigpIHsKICByZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMuc2xpY2UoMSk7Cn07CmNsYXNzIEVuZ2luZUZhaWx1cmUgZXh0ZW5kcyBFcnJvciB7CiAgY29uc3RydWN0b3IobXNnLCBzb3VyY2UpIHsKICAgIGNvbnN0IG1lc3NhZ2UgPSBzb3VyY2UgPyBgWyR7c291cmNlLmNhcGl0YWxpemUoKX1dIC0gJHttc2d9YCA6IG1zZzsKICAgIHN1cGVyKG1lc3NhZ2UpOwogICAgdGhpcy5uYW1lID0gIkVuZ2luZUZhaWx1cmUiOwogIH0KfQpjbGFzcyBSZW5kZXJlckVycm9yIGV4dGVuZHMgRW5naW5lRmFpbHVyZSB7CiAgY29uc3RydWN0b3IobXNnKSB7CiAgICBzdXBlcihtc2csICJyZW5kZXJlciIpOwogIH0KfQpsZXQgdGV4dHVyZUlkID0gMDsKY2xhc3MgVGV4dHVyZSB7CiAgY29uc3RydWN0b3Ioc291cmNlLCBvcHRpb25zKSB7CiAgICB0aGlzLmlzTG9hZGVkID0gZmFsc2U7CiAgICBpZiAoIXNvdXJjZSkKICAgICAgdGhyb3cgbmV3IEVycm9yKCJBIHNvdXJjZSBwYXRoIHRvIHRoZSByZXNvdXJjZSBtdXN0IGJlIHByb3ZpZGVkIik7CiAgICB0aGlzLmlkID0gdGV4dHVyZUlkKys7CiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7CiAgICB0aGlzLmltYWdlLnNyYyA9IHNvdXJjZTsKICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4gewogICAgICB0aGlzLmlzTG9hZGVkID0gdHJ1ZTsKICAgICAgdGhpcy5vbkxvYWQoKTsKICAgIH07CiAgICB0aGlzLnNpemUgPSB7d2lkdGg6IHRoaXMuaW1hZ2Uud2lkdGgsIGhlaWdodDogdGhpcy5pbWFnZS5oZWlnaHR9OwogICAgdGhpcy5yb3RhdGlvbiA9IChvcHRpb25zID09IG51bGwgPyB2b2lkIDAgOiBvcHRpb25zLnJvdGF0aW9uKSB8fCAwOwogICAgdGhpcy5vZmZzZXQgPSAob3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5vZmZzZXQpIHx8IFZfTlVMTDsKICAgIHRoaXMuc2NhbGUgPSAob3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5zY2FsZSkgfHwgVl9VTklUOwogIH0KICBhc3luYyBjb252ZXJ0VG9CaXRtYXAoKSB7CiAgICBpZiAoIXRoaXMuaW1hZ2Uud2lkdGggfHwgIXRoaXMuaW1hZ2UuaGVpZ2h0KQogICAgICByZXR1cm47CiAgICBjb25zdCBpbWFnZSA9IGF3YWl0IGNyZWF0ZUltYWdlQml0bWFwKHRoaXMuaW1hZ2UpOwogICAgcmV0dXJuIF9fc3ByZWFkUHJvcHMoX19zcHJlYWRWYWx1ZXMoe30sIHRoaXMpLCB7aW1hZ2V9KTsKICB9CiAgb25Mb2FkKCkgewogIH0KfQpjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHsKICBpbnRlcnZhbDogMjAwLAogIGxvb3A6IGZhbHNlCn07CmNsYXNzIEFuaW1hdGVkU3ByaXRlIGV4dGVuZHMgVGV4dHVyZSB7CiAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQsIGZyb20sIHRvLCBvcHRpb25zKSB7CiAgICBzdXBlcihzcHJpdGVTaGVldC5zcHJpdGVTaGVldFBhdGgpOwogICAgdGhpcy5pbnRlcnZhbElkID0gLTE7CiAgICB0aGlzLmlzQW5pbWF0ZWQgPSBmYWxzZTsKICAgIHRoaXMubGFzdFJ1blRpbWVTdGFtcCA9IDA7CiAgICB0aGlzLnNwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7CiAgICBpZiAoZnJvbVswXSA8IDEgfHwgZnJvbVsxXSA8IDEgfHwgdG9bMF0gPCAxIHx8IHRvWzFdIDwgMSB8fCBmcm9tWzBdID4gc3ByaXRlU2hlZXQuY29scyB8fCBmcm9tWzFdID4gc3ByaXRlU2hlZXQucm93cyB8fCB0b1swXSA+IHNwcml0ZVNoZWV0LmNvbHMgfHwgdG9bMV0gPiBzcHJpdGVTaGVldC5yb3dzKQogICAgICB0aHJvdyBuZXcgRW5naW5lRmFpbHVyZSgiSW52YWxpZCB0dXBsZXMgOiB0aGUgc3ByaXRlc2hlZXQgY29vcmRpbmF0ZSBzdGFydHMgYXQgKDEsIDEpIik7CiAgICB0aGlzLmZyb20gPSBmcm9tOwogICAgdGhpcy50byA9IHRvOwogICAgbGV0IG9wdCA9IF9fc3ByZWFkVmFsdWVzKF9fc3ByZWFkVmFsdWVzKHt9LCBkZWZhdWx0T3B0aW9ucyksIG9wdGlvbnMpOwogICAgdGhpcy5pbnRlcnZhbCA9IG9wdC5pbnRlcnZhbDsKICAgIHRoaXMubG9vcCA9IG9wdC5sb29wOwogICAgdGhpcy5zcHJpdGVXaWR0aCA9IHRoaXMuc2l6ZS53aWR0aCAvIHNwcml0ZVNoZWV0LmNvbHM7CiAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHRoaXMuc2l6ZS5oZWlnaHQgLyBzcHJpdGVTaGVldC5yb3dzOwogICAgdGhpcy5jb29yZFggPSB0aGlzLmZyb21bMF07CiAgICB0aGlzLmNvb3JkWSA9IHRoaXMuZnJvbVsxXTsKICB9CiAgcnVuKCkgewogICAgbGV0IG5vd1RpbWVTdGFtcCA9IG5vdygpOwogICAgaWYgKG5vd1RpbWVTdGFtcCAtIHRoaXMubGFzdFJ1blRpbWVTdGFtcCA+IHRoaXMuaW50ZXJ2YWwpIHsKICAgICAgdGhpcy5zdGVwKCk7CiAgICAgIHRoaXMubGFzdFJ1blRpbWVTdGFtcCA9IG5vd1RpbWVTdGFtcDsKICAgIH0KICB9CiAgYW5pbWF0ZSgpIHsKICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpCiAgICAgIHJldHVybjsKICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnN0ZXAoKSwgdGhpcy5pbnRlcnZhbCk7CiAgICB0aGlzLmlzQW5pbWF0ZWQgPSB0cnVlOwogIH0KICBwYXVzZSgpIHsKICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHsKICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTsKICAgICAgdGhpcy5pc0FuaW1hdGVkID0gZmFsc2U7CiAgICB9CiAgfQogIHJlc2V0KCkgewogICAgdGhpcy5jb29yZFggPSB0aGlzLmZyb21bMF07CiAgICB0aGlzLmNvb3JkWSA9IHRoaXMuZnJvbVsxXTsKICB9CiAgc3RvcCgpIHsKICAgIHRoaXMucGF1c2UoKTsKICAgIHRoaXMucmVzZXQoKTsKICB9CiAgc2V0SW50ZXJ2YWwoaW50ZXJ2YWwpIHsKICAgIHRoaXMuaW50ZXJ2YWwgPSBpbnRlcnZhbDsKICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHsKICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTsKICAgICAgdGhpcy5hbmltYXRlKCk7CiAgICB9CiAgfQogIHN0ZXAoKSB7CiAgICBpZiAodGhpcy5jb29yZFggPT09IHRoaXMudG9bMF0gJiYgdGhpcy5jb29yZFkgPT09IHRoaXMudG9bMV0pIHsKICAgICAgaWYgKHRoaXMubG9vcCkgewogICAgICAgIHRoaXMuY29vcmRYID0gdGhpcy5mcm9tWzBdOwogICAgICAgIHRoaXMuY29vcmRZID0gdGhpcy5mcm9tWzFdOwogICAgICB9CiAgICAgIHJldHVybjsKICAgIH0KICAgIGlmICh0aGlzLmNvb3JkWSA8IHRoaXMudG9bMV0pIHsKICAgICAgaWYgKHRoaXMuY29vcmRYIDwgdGhpcy5zcHJpdGVTaGVldC5jb2xzKQogICAgICAgIHRoaXMuY29vcmRYKys7CiAgICAgIGVsc2UgewogICAgICAgIHRoaXMuY29vcmRZKys7CiAgICAgICAgdGhpcy5jb29yZFggPSB0aGlzLmZyb21bMF07CiAgICAgIH0KICAgIH0gZWxzZSB7CiAgICAgIGlmICh0aGlzLmNvb3JkWCA8IHRoaXMudG9bMF0pCiAgICAgICAgdGhpcy5jb29yZFgrKzsKICAgIH0KICB9CiAgc3ByaXRlQm94KCkgewogICAgcmV0dXJuIG5ldyBCb3goKHRoaXMuY29vcmRYIC0gMSkgKiB0aGlzLnNwcml0ZVdpZHRoLCAodGhpcy5jb29yZFkgLSAxKSAqIHRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCk7CiAgfQp9CmNvbnN0IGRlZmF1bHRTdHlsZU9iamVjdCA9IHsKICBzdHJva2VTdHlsZTogImJsYWNrIiwKICBsaW5lV2lkdGg6IDIsCiAgbGluZUpvaW46ICJyb3VuZCIsCiAgbGluZUNhcDogInJvdW5kIiwKICBmaWxsU3R5bGU6ICJ0cmFuc3BhcmVudCIsCiAgZ2xvYmFsQWxwaGE6IDEsCiAgZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiAiYWRkIgp9Owpjb25zdCBkZWZhdWx0VGV4dFN0eWxlT2JqZWN0ID0gewogIGZvbnQ6ICJSb2JvdG8iLAogIHNpemU6IDE2LAogIGNvbG9yOiAiYmxhY2siLAogIHRleHRBbGlnbjogImxlZnQiLAogIHRleHRCYXNlbGluZTogImFscGhhYmV0aWMiCn07CmNvbnN0IFRXT1BJID0gMiAqIE1hdGguUEk7CmxldCBwcmVjaXNpb24gPSBpc1dvcmtlcigpID8gNCA6IDIgKiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7CmxldCBvZmZzZXQgPSBWX05VTEw7CmZ1bmN0aW9uIHJvdW5kKG51bSkgewogIHJldHVybiB+fihudW0gKiBwcmVjaXNpb24pIC8gcHJlY2lzaW9uOwp9CmxldCBjdHg7CmxldCBsYXN0U3R5bGVPYmplY3Q7CmNsYXNzIFJlbmRlcmVyIHsKICBzdGF0aWMgY3JlYXRlKHdpZHRoLCBoZWlnaHQpIHsKICAgIGxldCBbd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodF0gPSBbZ2V0V2luZG93RGltZW5zaW9ucygpLndpZHRoLCBnZXRXaW5kb3dEaW1lbnNpb25zKCkuaGVpZ2h0XTsKICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyh3aWR0aCB8fCB3aW5kb3dXaWR0aCwgaGVpZ2h0IHx8IHdpbmRvd0hlaWdodCk7CiAgICBpbnNlcnRDYW52YXMoY2FudmFzLCAibWFpbiIpOwogICAgUmVuZGVyZXIuc2V0Q29udGV4dChjYW52YXMuZ2V0Q29udGV4dCgiMmQiKSk7CiAgICByZXR1cm4gY2FudmFzOwogIH0KICBzdGF0aWMgY3JlYXRlRnJvbUNhbnZhcyhzZWxlY3RvcikgewogICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpOwogICAgaWYgKCFjYW52YXMgfHwgIShjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpCiAgICAgIHRocm93IG5ldyBSZW5kZXJlckVycm9yKCJUaGUgc2VsZWN0ZWQgZWxlbWVudCBpcyBub3QgYSBjYW52YXMiKTsKICAgIGFkYXB0Q2FudmFzVG9EZXZpY2VQaXhlbFJhdGlvKGNhbnZhcyk7CiAgICBSZW5kZXJlci5zZXRDb250ZXh0KGNhbnZhcy5nZXRDb250ZXh0KCIyZCIpKTsKICAgIHJldHVybiBjYW52YXM7CiAgfQogIHN0YXRpYyBzZXRDb250ZXh0KGNvbnRleHQpIHsKICAgIGN0eCA9IGNvbnRleHQ7CiAgfQogIHN0YXRpYyBnZXRDb250ZXh0KCkgewogICAgcmV0dXJuIGN0eDsKICB9CiAgc3RhdGljIHNldE9mZnNldCh4LCB5KSB7CiAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMih4LCB5KTsKICB9CiAgc3RhdGljIGdldE9mZnNldCgpIHsKICAgIHJldHVybiBvZmZzZXQ7CiAgfQogIHN0YXRpYyBzdHlsZShvYmopIHsKICAgIGlmICghY3R4KQogICAgICB0aHJvdyBuZXcgUmVuZGVyZXJFcnJvcigiQ29udGV4dCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZS4gUGxlYXNlIHVzZSBSZW5kZXJlci5zZXRDb250ZXh0Iik7CiAgICBjb25zdCBzdHlsZU9iamVjdCA9IF9fc3ByZWFkVmFsdWVzKF9fc3ByZWFkVmFsdWVzKHt9LCBkZWZhdWx0U3R5bGVPYmplY3QpLCBvYmopOwogICAgaWYgKHN0eWxlT2JqZWN0ID09PSBsYXN0U3R5bGVPYmplY3QpCiAgICAgIHJldHVybjsKICAgIGlmICgiY29sb3IiIGluIHN0eWxlT2JqZWN0KSB7CiAgICAgIHN0eWxlT2JqZWN0WyJmaWxsU3R5bGUiXSA9IHN0eWxlT2JqZWN0WyJjb2xvciJdOwogICAgICBzdHlsZU9iamVjdFsic3Ryb2tlU3R5bGUiXSA9IHN0eWxlT2JqZWN0WyJjb2xvciJdOwogICAgICBkZWxldGUgc3R5bGVPYmplY3RbImNvbG9yIl07CiAgICB9CiAgICBmb3IgKGxldCBwcm9wIGluIHN0eWxlT2JqZWN0KSB7CiAgICAgIGlmIChjdHhbcHJvcF0gIT09IHN0eWxlT2JqZWN0W3Byb3BdKSB7CiAgICAgICAgY3R4W3Byb3BdID0gc3R5bGVPYmplY3RbcHJvcF07CiAgICAgIH0KICAgIH0KICAgIGxhc3RTdHlsZU9iamVjdCA9IHN0eWxlT2JqZWN0OwogIH0KICBzdGF0aWMgdGV4dFN0eWxlKG9iaikgewogICAgaWYgKCEhY3R4KSB7CiAgICAgIGxldCBzdHlsZU9iamVjdCA9IF9fc3ByZWFkVmFsdWVzKF9fc3ByZWFkVmFsdWVzKHt9LCBkZWZhdWx0VGV4dFN0eWxlT2JqZWN0KSwgb2JqKTsKICAgICAgY3R4LmZvbnQgPSBgJHtzdHlsZU9iamVjdC5zaXplfXB4ICR7c3R5bGVPYmplY3QuZm9udH1gOwogICAgICBkZWxldGUgc3R5bGVPYmplY3Quc2l6ZTsKICAgICAgZGVsZXRlIHN0eWxlT2JqZWN0LmZvbnQ7CiAgICAgIFJlbmRlcmVyLnN0eWxlKF9fc3ByZWFkVmFsdWVzKHtmaWxsU3R5bGU6IHN0eWxlT2JqZWN0LmNvbG9yfSwgc3R5bGVPYmplY3QpKTsKICAgIH0KICB9CiAgc3RhdGljIGNsZWFyKGNvbG9yKSB7CiAgICBpZiAoY29sb3IpIHsKICAgICAgUmVuZGVyZXIuc3R5bGUoe2ZpbGxTdHlsZTogY29sb3J9KTsKICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTsKICAgIH0gZWxzZSB7CiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpOwogICAgfQogIH0KICBzdGF0aWMgbGluZSh4MSwgeTEsIHgyLCB5Miwgb2JqKSB7CiAgICBSZW5kZXJlci5zdHlsZShvYmopOwogICAgY3R4LmJlZ2luUGF0aCgpOwogICAgY3R4Lm1vdmVUbyhyb3VuZChvZmZzZXQueCArIHgxKSwgcm91bmQob2Zmc2V0LnkgKyB5MSkpOwogICAgY3R4LmxpbmVUbyhyb3VuZChvZmZzZXQueCArIHgyKSwgcm91bmQob2Zmc2V0LnkgKyB5MikpOwogICAgY3R4LnN0cm9rZSgpOwogIH0KICBzdGF0aWMgcmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBvYmopIHsKICAgIFJlbmRlcmVyLnN0eWxlKG9iaik7CiAgICBjb25zdCBbcl94LCByX3ksIHJfdywgcl9oXSA9IFtyb3VuZCh4ICsgb2Zmc2V0LngpLCByb3VuZCh5ICsgb2Zmc2V0LnkpLCByb3VuZCh3aWR0aCksIHJvdW5kKGhlaWdodCldOwogICAgY3R4LmZpbGxSZWN0KHJfeCwgcl95LCByX3csIHJfaCk7CiAgICBjdHguc3Ryb2tlUmVjdChyX3gsIHJfeSwgcl93LCByX2gpOwogIH0KICBzdGF0aWMgcmVjdEZyb21DZW50ZXIoeCwgeSwgd2lkdGgsIGhlaWdodCwgb2JqKSB7CiAgICByZXR1cm4gUmVuZGVyZXIucmVjdChyb3VuZCh4IC0gd2lkdGggLyAyKSwgcm91bmQoeSAtIGhlaWdodCAvIDIpLCByb3VuZCh3aWR0aCksIHJvdW5kKGhlaWdodCksIG9iaik7CiAgfQogIHN0YXRpYyByZWN0RnJvbVBvaW50cyh4MSwgeTEsIHgyLCB5Miwgb2JqKSB7CiAgICByZXR1cm4gUmVuZGVyZXIucmVjdChyb3VuZCh4MSksIHJvdW5kKHkxKSwgcm91bmQoeDIgLSB4MSksIHJvdW5kKHkyIC0geTEpLCBvYmopOwogIH0KICBzdGF0aWMgcm91bmRlZFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzLCBvYmopIHsKICAgIFJlbmRlcmVyLnN0eWxlKG9iaik7CiAgICBjb25zdCBbcl94LCByX3ksIHJfdywgcl9oXSA9IFtyb3VuZCh4ICsgb2Zmc2V0LngpLCByb3VuZCh5ICsgb2Zmc2V0LnkpLCByb3VuZCh3aWR0aCksIHJvdW5kKGhlaWdodCldOwogICAgY29uc3Qgcl9yYWRpdXMgPSByb3VuZChyYWRpdXMpOwogICAgY3R4LmJlZ2luUGF0aCgpOwogICAgY3R4LnJvdW5kUmVjdChyX3gsIHJfeSwgcl93LCByX2gsIFtyX3JhZGl1c10pOwogICAgY3R4LmZpbGwoKTsKICAgIGN0eC5zdHJva2UoKTsKICB9CiAgc3RhdGljIHBvbHkocG9pbnRzLCBvYmopIHsKICAgIGlmICghcG9pbnRzLmxlbmd0aCkKICAgICAgcmV0dXJuOwogICAgUmVuZGVyZXIuc3R5bGUob2JqKTsKICAgIGN0eC5iZWdpblBhdGgoKTsKICAgIGN0eC5tb3ZlVG8ocm91bmQocG9pbnRzWzBdLnggKyBvZmZzZXQueCksIHJvdW5kKHBvaW50c1swXS55ICsgb2Zmc2V0LnkpKTsKICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7CiAgICAgIGN0eC5saW5lVG8ocm91bmQocG9pbnRzW2ldLnggKyBvZmZzZXQueCksIHJvdW5kKHBvaW50c1tpXS55ICsgb2Zmc2V0LnkpKTsKICAgIH0KICAgIGN0eC5maWxsKCk7CiAgICBjdHguc3Ryb2tlKCk7CiAgfQogIHN0YXRpYyBjaXJjbGUoeCwgeSwgcmFkaXVzLCBvYmopIHsKICAgIFJlbmRlcmVyLnN0eWxlKG9iaik7CiAgICBjdHguYmVnaW5QYXRoKCk7CiAgICBjdHguYXJjKHJvdW5kKHggKyBvZmZzZXQueCksIHJvdW5kKHkgKyBvZmZzZXQueSksIHJhZGl1cywgMCwgVFdPUEkpOwogICAgY3R4LmZpbGwoKTsKICAgIGN0eC5zdHJva2UoKTsKICB9CiAgc3RhdGljIGNpcmNsZUZyb21SZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQsIG9iaikgewogICAgcmV0dXJuIFJlbmRlcmVyLmNpcmNsZShyb3VuZCh4ICsgd2lkdGggLyAyKSwgcm91bmQoeSArIGhlaWdodCAvIDIpLCByb3VuZChNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIpLCBvYmopOwogIH0KICBzdGF0aWMgcG9pbnQoeCwgeSwgb2JqKSB7CiAgICBSZW5kZXJlci5jaXJjbGUocm91bmQoeCksIHJvdW5kKHkpLCA1LCBvYmopOwogIH0KICBzdGF0aWMgcmVjdFNwcml0ZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCB0ZXh0dXJlKSB7CiAgICBpZiAoIXRleHR1cmUuaXNMb2FkZWQpCiAgICAgIHJldHVybjsKICAgIFJlbmRlcmVyLnN0eWxlKHt9KTsKICAgIGN0eC5zYXZlKCk7CiAgICBjdHgudHJhbnNsYXRlKHJvdW5kKHggKyB3aWR0aCAvIDIgKyBvZmZzZXQueCksIHJvdW5kKHkgKyBoZWlnaHQgLyAyICsgb2Zmc2V0LnkpKTsKICAgIGN0eC5zY2FsZSh0ZXh0dXJlLnNjYWxlLngsIHRleHR1cmUuc2NhbGUueSk7CiAgICBjdHgucm90YXRlKHRleHR1cmUucm90YXRpb24pOwogICAgbGV0IHNvdXJjZUJveCA9IG5ldyBCb3goMCwgMCwgdGV4dHVyZS5zaXplLndpZHRoLCB0ZXh0dXJlLnNpemUuaGVpZ2h0KTsKICAgIGlmICh0ZXh0dXJlIGluc3RhbmNlb2YgQW5pbWF0ZWRTcHJpdGUpIHsKICAgICAgc291cmNlQm94ID0gdGV4dHVyZS5zcHJpdGVCb3goKTsKICAgIH0KICAgIGN0eC5kcmF3SW1hZ2UodGV4dHVyZS5pbWFnZSwgc291cmNlQm94LngsIHNvdXJjZUJveC55LCBzb3VyY2VCb3gud2lkdGgsIHNvdXJjZUJveC5oZWlnaHQsIHJvdW5kKHdpZHRoICogdGV4dHVyZS5vZmZzZXQueCAtIHdpZHRoIC8gMiksIHJvdW5kKGhlaWdodCAqIHRleHR1cmUub2Zmc2V0LnkgLSBoZWlnaHQgLyAyKSwgcm91bmQod2lkdGgpLCByb3VuZChoZWlnaHQpKTsKICAgIGN0eC5yZXN0b3JlKCk7CiAgfQogIHN0YXRpYyBjaXJjbGVTcHJpdGUoeCwgeSwgcmFkaXVzLCB0ZXh0dXJlKSB7CiAgICBpZiAoIXRleHR1cmUuaXNMb2FkZWQpCiAgICAgIHJldHVybjsKICAgIGN0eC5zYXZlKCk7CiAgICBjdHguYmVnaW5QYXRoKCk7CiAgICBjdHguYXJjKHJvdW5kKHggKyBvZmZzZXQueCksIHJvdW5kKHkgKyBvZmZzZXQueSksIHJhZGl1cywgMCwgVFdPUEkpOwogICAgY3R4LmNsaXAoKTsKICAgIFJlbmRlcmVyLnJlY3RTcHJpdGUoeCAtIHJhZGl1cywgeSAtIHJhZGl1cywgMiAqIHJhZGl1cywgMiAqIHJhZGl1cywgdGV4dHVyZSk7CiAgICBjdHgucmVzdG9yZSgpOwogIH0KICBzdGF0aWMgdGV4dCh0ZXh0LCB4LCB5LCBzdHlsZSkgewogICAgUmVuZGVyZXIudGV4dFN0eWxlKHN0eWxlKTsKICAgIGN0eC5maWxsVGV4dCh0ZXh0LCB4LCB5KTsKICB9CiAgc3RhdGljIGNlbnRlcmVkVGV4dCh0ZXh0LCB4LCB5LCBzdHlsZSkgewogICAgUmVuZGVyZXIudGV4dCh0ZXh0LCB4LCB5LCBfX3NwcmVhZFByb3BzKF9fc3ByZWFkVmFsdWVzKHt9LCBzdHlsZSksIHt0ZXh0QWxpZ246ICJjZW50ZXIiLCB0ZXh0QmFzZWxpbmU6ICJtaWRkbGUifSkpOwogIH0KICBzdGF0aWMgdGludChjb2xvciwgeCwgeSwgd2lkdGgsIGhlaWdodCkgewogICAgUmVuZGVyZXIucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCB7CiAgICAgIGZpbGxTdHlsZTogY29sb3IsCiAgICAgIGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjogIm11bHRpcGx5IiwKICAgICAgZ2xvYmFsQWxwaGE6IDAuMjUKICAgIH0pOwogIH0KICBzdGF0aWMgYmVnaW5GcmFtZShjb2xvcikgewogICAgUmVuZGVyZXIuY2xlYXIoY29sb3IpOwogIH0KICBzdGF0aWMgZW5kRnJhbWUoKSB7CiAgfQp9CmNsYXNzIFRocmVhZFdvcmtlciB7CiAgc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQodGl0bGUsIGFyZ3MpIHsKICAgIHNlbGYucG9zdE1lc3NhZ2Uoe3RpdGxlLCBkYXRhOiBhcmdzfSk7CiAgfQogIGxvZyguLi5hcmdzKSB7CiAgICB0aGlzLnNlbmRNZXNzYWdlVG9NYWluVGhyZWFkKCJsb2ciLCAuLi5hcmdzKTsKICB9Cn0KY2xhc3MgUmVuZGVyZXJXb3JrZXIgZXh0ZW5kcyBUaHJlYWRXb3JrZXIgewogIGNvbnN0cnVjdG9yKCkgewogICAgc3VwZXIoKTsKICAgIHRoaXMuY2FudmFzUmVzb2x1dGlvbiA9IDE7CiAgICB0aGlzLm9mZnNjcmVlbkNhbnZhcyA9IG51bGw7CiAgICB0aGlzLmN0eCA9IG51bGw7CiAgICB0aGlzLnRleHR1cmVBbGlhcyA9IG5ldyBNYXAoKTsKICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsICh7ZGF0YX0pID0+IHRoaXMub25NZXNzYWdlKGRhdGEudGl0bGUsIGRhdGEuY29udGVudCkpOwogIH0KICBvbk1lc3NhZ2UodGl0bGUsIGNvbnRlbnQpIHsKICAgIHN3aXRjaCAodGl0bGUpIHsKICAgICAgY2FzZSAiaW5pdENhbnZhcyI6CiAgICAgICAgdGhpcy5vZmZzY3JlZW5DYW52YXMgPSBjb250ZW50LmNhbnZhczsKICAgICAgICB0aGlzLmN0eCA9IHRoaXMub2Zmc2NyZWVuQ2FudmFzLmdldENvbnRleHQoIjJkIik7CiAgICAgICAgUmVuZGVyZXIuc2V0Q29udGV4dCh0aGlzLmN0eCk7CiAgICAgICAgdGhpcy5zZXRTaXplKGNvbnRlbnQuZHByLCBjb250ZW50LndpZHRoLCBjb250ZW50LmhlaWdodCk7CiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgiaW5pdGlhbGl6ZWQiKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicmVuZGVyIjoKICAgICAgICBmb3IgKGxldCByZW5kZXJDYWxsIG9mIGNvbnRlbnQucmVuZGVyU3RhY2spIHsKICAgICAgICAgIHRoaXMuaGFuZGxlRHJhd1JlcXVlc3QocmVuZGVyQ2FsbC5tZXRob2ROYW1lLCByZW5kZXJDYWxsLmFyZ3MpOwogICAgICAgIH0KICAgICAgICBicmVhazsKICAgICAgY2FzZSAibmV3VGV4dHVyZSI6CiAgICAgICAgdGhpcy50ZXh0dXJlQWxpYXMuc2V0KGNvbnRlbnQuaWQsIGNvbnRlbnQudGV4dHVyZSk7CiAgICAgICAgYnJlYWs7CiAgICB9CiAgfQogIHNldFNpemUoZHByLCB3aWR0aCwgaGVpZ2h0KSB7CiAgICBjb25zdCBwaXhlbFJhdGlvID0gKGRwciB8fCAxKSAqIHRoaXMuY2FudmFzUmVzb2x1dGlvbjsKICAgIHRoaXMub2Zmc2NyZWVuQ2FudmFzLndpZHRoID0gd2lkdGggKiBwaXhlbFJhdGlvOwogICAgdGhpcy5vZmZzY3JlZW5DYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogcGl4ZWxSYXRpbzsKICAgICJzZXRUcmFuc2Zvcm0iIGluIHRoaXMuY3R4ID8gdGhpcy5jdHguc2V0VHJhbnNmb3JtKHBpeGVsUmF0aW8sIDAsIDAsIHBpeGVsUmF0aW8sIDAsIDApIDogbnVsbDsKICB9CiAgZ2V0VGV4dHVyZShhcmdzKSB7CiAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlQWxpYXMuZ2V0KGFyZ3MudGV4dHVyZUlkKTsKICAgIGNvbnN0IHtzY2FsZSwgcm90YXRpb24sIG9mZnNldDogb2Zmc2V0Mn0gPSBhcmdzOwogICAgcmV0dXJuIF9fc3ByZWFkUHJvcHMoX19zcHJlYWRWYWx1ZXMoe30sIHRleHR1cmUpLCB7c2NhbGUsIHJvdGF0aW9uLCBvZmZzZXQ6IG9mZnNldDJ9KTsKICB9CiAgaGFuZGxlRHJhd1JlcXVlc3QobWV0aG9kLCBhcmdzKSB7CiAgICBzd2l0Y2ggKG1ldGhvZCkgewogICAgICBjYXNlICJzdHlsZSI6CiAgICAgICAgUmVuZGVyZXIuc3R5bGUoYXJncyA9PSBudWxsID8gdm9pZCAwIDogYXJncy5vYmopOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJjbGVhciI6CiAgICAgICAgUmVuZGVyZXIuY2xlYXIoYXJncyA9PSBudWxsID8gdm9pZCAwIDogYXJncy5jb2xvcik7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgImxpbmUiOgogICAgICAgIFJlbmRlcmVyLmxpbmUoYXJncy54MSwgYXJncy55MSwgYXJncy54MiwgYXJncy55MiwgYXJncy5vYmopOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJyZWN0IjoKICAgICAgICBSZW5kZXJlci5yZWN0KGFyZ3MueCwgYXJncy55LCBhcmdzLndpZHRoLCBhcmdzLmhlaWdodCwgYXJncy5vYmopOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJyZWN0RnJvbUNlbnRlciI6CiAgICAgICAgUmVuZGVyZXIucmVjdEZyb21DZW50ZXIoYXJncy54LCBhcmdzLnksIGFyZ3Mud2lkdGgsIGFyZ3MuaGVpZ2h0LCBhcmdzLm9iaik7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgInJlY3RGcm9tUG9pbnRzIjoKICAgICAgICBSZW5kZXJlci5yZWN0RnJvbVBvaW50cyhhcmdzLngxLCBhcmdzLnkxLCBhcmdzLngyLCBhcmdzLnkyLCBhcmdzLm9iaik7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgInJvdW5kZWRSZWN0IjoKICAgICAgICBSZW5kZXJlci5yb3VuZGVkUmVjdChhcmdzLngxLCBhcmdzLnkxLCBhcmdzLndpZHRoLCBhcmdzLmhlaWdodCwgYXJncy5yYWRpdXMsIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicG9seSI6CiAgICAgICAgUmVuZGVyZXIucG9seShhcmdzLnBvaW50cywgYXJncy5vYmopOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJjaXJjbGUiOgogICAgICAgIFJlbmRlcmVyLmNpcmNsZShhcmdzLngsIGFyZ3MueSwgYXJncy5yYWRpdXMsIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAiY2lyY2xlRnJvbVJlY3QiOgogICAgICAgIFJlbmRlcmVyLmNpcmNsZUZyb21SZWN0KGFyZ3MueCwgYXJncy55LCBhcmdzLndpZHRoLCBhcmdzLmhlaWdodCwgYXJncy5vYmopOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJwb2ludCI6CiAgICAgICAgUmVuZGVyZXIucG9pbnQoYXJncy54LCBhcmdzLnksIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicmVjdFNwcml0ZSI6CiAgICAgICAgUmVuZGVyZXIucmVjdFNwcml0ZShhcmdzLngsIGFyZ3MueSwgYXJncy53aWR0aCwgYXJncy5oZWlnaHQsIHRoaXMuZ2V0VGV4dHVyZShhcmdzKSk7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgImNpcmNsZVNwcml0ZSI6CiAgICAgICAgUmVuZGVyZXIuY2lyY2xlU3ByaXRlKGFyZ3MueCwgYXJncy55LCBhcmdzLnJhZGl1cywgdGhpcy5nZXRUZXh0dXJlKGFyZ3MpKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAidGV4dCI6CiAgICAgICAgUmVuZGVyZXIudGV4dChhcmdzLnRleHQsIGFyZ3MueCwgYXJncy55LCBhcmdzID09IG51bGwgPyB2b2lkIDAgOiBhcmdzLnN0eWxlKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAiY2VudGVyZWRUZXh0IjoKICAgICAgICBSZW5kZXJlci5jZW50ZXJlZFRleHQoYXJncy50ZXh0LCBhcmdzLngsIGFyZ3MueSwgYXJncyA9PSBudWxsID8gdm9pZCAwIDogYXJncy5zdHlsZSk7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgInRpbnQiOgogICAgICAgIFJlbmRlcmVyLnRpbnQoYXJncy5jb2xvciwgYXJncy54LCBhcmdzLnksIGFyZ3Mud2lkdGgsIGFyZ3MuaGVpZ2h0KTsKICAgICAgICBicmVhazsKICAgIH0KICB9Cn0KbmV3IFJlbmRlcmVyV29ya2VyKCk7Cg==", {type: "module"});
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
      let {clientWidth, clientHeight} = canvas2;
      worker = new WorkerWrapper();
      offscreenCanvas = canvas2.transferControlToOffscreen();
      this.sendMessageToWorker("initCanvas", {
        width: width || clientWidth,
        height: height || clientHeight,
        canvas: offscreenCanvas,
        dpr: window.devicePixelRatio || 1
      }, [offscreenCanvas]);
      worker.onmessage = ({data: {title, data}}) => {
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
      this.addRenderCall("style", {obj});
    }
    static clear(color) {
      this.addRenderCall("clear", {color});
    }
    static line(x1, y1, x2, y2, obj) {
      this.addRenderCall("line", {x1, y1, x2, y2, obj});
    }
    static rect(x, y, width, height, obj) {
      this.addRenderCall("rect", {x, y, width, height, obj});
    }
    static rectFromCenter(x, y, width, height, obj) {
      this.addRenderCall("rectFromCenter", {x, y, width, height, obj});
    }
    static rectFromPoints(x1, y1, x2, y2, obj) {
      this.addRenderCall("rectFromPoints", {x1, y1, x2, y2, obj});
    }
    static roundedRect(x, y, width, height, radius, obj) {
      this.addRenderCall("roundedRect", {x, y, width, height, radius, obj});
    }
    static poly(points, obj) {
      this.addRenderCall("poly", {points, obj});
    }
    static circle(x, y, radius, obj) {
      this.addRenderCall("circle", {x, y, radius, obj});
    }
    static circleFromRect(x, y, width, height, obj) {
      this.addRenderCall("circleFromRect", {x, y, width, height, obj});
    }
    static point(x, y, obj) {
      this.addRenderCall("point", {x, y, obj});
    }
    static handleTexture(texture, drawCall, args) {
      var _a;
      if (!texture.isLoaded)
        return;
      if (textureAlias.has(texture.id)) {
        const {scale, rotation, offset: offset2} = texture;
        this.addRenderCall(drawCall, __spreadProps(__spreadValues({}, args), {textureId: texture.id, scale, rotation, offset: offset2}));
      } else {
        (_a = texture.convertToBitmap()) == null ? void 0 : _a.then((adaptedTexture) => {
          textureAlias.set(texture.id, adaptedTexture);
          this.sendMessageToWorker("newTexture", {id: texture.id, texture: adaptedTexture});
        });
      }
    }
    static rectSprite(x, y, width, height, texture) {
      this.handleTexture(texture, "rectSprite", {x, y, width, height});
    }
    static async circleSprite(x, y, radius, texture) {
      this.handleTexture(texture, "circleSprite", {x, y, radius});
    }
    static text(text, x, y, style) {
      this.addRenderCall("text", {text, x, y, style});
    }
    static centeredText(text, x, y, style) {
      this.addRenderCall("centeredText", {text, x, y, style});
    }
    static tint(color, x, y, width, height) {
      this.addRenderCall("circle", {color, x, y, width, height});
    }
    static beginFrame(color) {
      renderStack = [];
      this.clear(color);
    }
    static endFrame() {
      if (!workerIsInitialized)
        return;
      this.sendMessageToWorker("render", {renderStack});
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
  class Env {
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
      Game.renderer.circle(this.pos.x, this.pos.y, this.radius, {fillStyle: this.color, lineWidth: 1, globalAlpha: this.opacity / 255});
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
  class Grid {
    constructor(cols, rows) {
      this.rows = rows;
      this.cols = cols;
      this.cells = [];
      this.focusCell = null;
      this.createCells();
      this.defineNeighboors();
    }
    createCells() {
      for (let col = 0; col < this.cols; col++) {
        for (let row = 0; row < this.rows; row++) {
          this.cells.push(new Cell(col, row));
        }
      }
    }
    updateCell(newCell) {
      if (!this.cells.includes(newCell))
        return;
      if (newCell.width !== 1 || newCell.height !== 1) {
        if (newCell.width > 1) {
          let range = newCell.width - 1;
          let removeCell = this.cells.filter((cell) => cell.y === newCell.y && cell.x > newCell.x && cell.x <= newCell.x + range);
          this.cells = this.cells.filter((cell) => !removeCell.includes(cell));
        }
        if (newCell.height > 1) {
          let range = newCell.height - 1;
          let removeCell = this.cells.filter((cell) => cell.x === newCell.x && cell.y > newCell.y && cell.y <= newCell.y + range);
          this.cells = this.cells.filter((cell) => !removeCell.includes(cell));
        }
      }
      this.defineNeighboors();
      this.cells[this.cells.indexOf(newCell)] = newCell;
    }
    defineNeighboors() {
      this.cells.forEach((cell) => {
        cell.neighboors.top = cell.y >= 1 ? this.cells.filter((othercell) => othercell.x <= cell.x && othercell.x + othercell.width > cell.x && othercell.y === cell.y - cell.height)[0] : null;
        cell.neighboors.bottom = cell.y <= this.rows - 1 ? this.cells.filter((othercell) => othercell.x <= cell.x && othercell.x + othercell.width > cell.x && othercell.y === cell.y + cell.height)[0] : null;
        cell.neighboors.left = cell.x >= 1 ? this.cells.filter((othercell) => othercell.y <= cell.y && othercell.y + othercell.height > cell.y && othercell.x === cell.x - cell.width)[0] : null;
        cell.neighboors.right = cell.x <= this.cols - 1 ? this.cells.filter((othercell) => othercell.y <= cell.y && othercell.y + othercell.height > cell.y && othercell.x === cell.x + cell.width)[0] : null;
      });
    }
    get(x, y) {
      return this.cells[x * this.cols + y];
    }
    clear() {
      this.cells.forEach((cell) => cell.state = null);
    }
  }
  class Cell {
    constructor(x, y, width = 1, height = 1) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.state = null;
      this.neighboors = {};
    }
  }
  const Config = {};
  const Easing = {
    linear: (t) => t,
    smoothStep: (t) => (3 - 2 * t) * t ** 2,
    smootherStep: (t) => (6 * t * t - 15 * t + 10) * t ** 3,
    easeIn: (t) => t ** 2,
    easeOut: (t) => 1 - (1 - t) ** 2,
    easeInOut: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeInBack: (t) => 2.70158 * t ** 3 - 1.70158 * t ** 2,
    easeOutBack: (t) => 1 + 1.70158 * Math.pow(t - 1, 3) + 2.70158 * Math.pow(t - 1, 2),
    easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((2.5949095 + 1) * 2 * t - 2.5949095) / 2 : (Math.pow(2 * t - 2, 2) * ((2.5949095 + 1) * (t * 2 - 2) + 2.5949095) + 2) / 2
  };
  const defaultOptions = {
    autostart: false,
    loop: false
  };
  class Animation {
    constructor(from, to, duration, easing = Easing.linear, options = {}) {
      this.hasStarted = false;
      this.isPaused = false;
      this.isEnded = false;
      this.isReversed = false;
      this.lastT = 0;
      this.from = from;
      this.to = to;
      this.duration = duration;
      if (easing instanceof Function) {
        this.easing = easing;
      } else if (typeof easing === "string" && easing in Easing)
        this.easing = Easing[easing];
      else
        throw new EngineFailure("Unknow easing parameter", "animation");
      this.options = __spreadValues(__spreadValues({}, defaultOptions), options);
      this.value = this.from;
      this.speed = Math.abs(this.to - this.from) / this.duration;
      AS.add(this);
    }
    start() {
      this.isEnded = false;
      this.hasStarted = true;
    }
    reset() {
      this.lastT = 0;
      this.isPaused = false;
      this.hasStarted = false;
      this.isEnded = false;
    }
    toggle(pause) {
      if (pause !== void 0) {
        if (pause)
          this.pause();
        else
          this.resume();
      }
      if (this.isPaused)
        this.resume();
      else
        this.pause();
    }
    pause() {
      this.isPaused = true;
    }
    resume() {
      this.isPaused = false;
    }
    update(deltaTime) {
      if (!this.hasStarted || this.isPaused || this.isEnded)
        return;
      let t = clamp(0, this.lastT + deltaTime * this.speed / Math.abs(this.to - this.from), 1);
      if (t >= 1 || t <= 0) {
        if (!this.options.loop) {
          this.isEnded = true;
          this.onFinish();
          return;
        }
        this.speed *= -1;
        this.isReversed = !this.isReversed;
      }
      this.lastT = t;
      this.value = this.from + (this.to - this.from) * this.easing(t);
    }
    get isRunning() {
      return this.hasStarted && !(this.isEnded || this.isPaused);
    }
    onFinish() {
    }
  }
  const defaultAudioOptions = {
    volume: 1,
    loop: false,
    autoplay: false
  };
  class Sound extends Audio {
    constructor(src, options = {}) {
      super(src);
      this.volume = options.volume || defaultAudioOptions.volume;
      this.loop = options.loop || defaultAudioOptions.loop;
      this.controls = false;
    }
  }
  const VERSION = version;
  console.log("Unrail Engine v" + version.toString());
  exports2.AnimatedSprite = AnimatedSprite;
  exports2.Animation = Animation;
  exports2.ApiIsSupported = ApiIsSupported;
  exports2.Box = Box;
  exports2.Cell = Cell;
  exports2.Config = Config;
  exports2.Cooldown = Cooldown;
  exports2.Easing = Easing;
  exports2.Event = Event;
  exports2.Game = Game;
  exports2.GameEnvironement = Env;
  exports2.GameObject = GameObject;
  exports2.Grid = Grid;
  exports2.Interface = Interface;
  exports2.OffscreenRenderer = OffscreenRendererWrapper;
  exports2.Particle = Particle;
  exports2.ParticuleGenerator = ParticuleGenerator;
  exports2.PlayerObject = PlayerObject;
  exports2.Point = Point;
  exports2.Random = main_min;
  exports2.Renderer = Renderer;
  exports2.Sound = Sound;
  exports2.SpriteSheet = SpriteSheet;
  exports2.Texture = Texture;
  exports2.VERSION = VERSION;
  exports2.V_NULL = V_NULL;
  exports2.V_UNIT = V_UNIT;
  exports2.Vector2 = Vector2;
  exports2.adaptCanvasToDevicePixelRatio = adaptCanvasToDevicePixelRatio;
  exports2.blink = blink;
  exports2.clamp = clamp;
  exports2.createCanvas = createCanvas;
  exports2.getCanvasDimensions = getCanvasDimensions;
  exports2.getWindowDimensions = getWindowDimensions;
  exports2.hashObject = hashObject;
  exports2.inRange = inRange;
  exports2.insertCanvas = insertCanvas;
  exports2.isWorker = isWorker;
  exports2.now = now;
  exports2.setCanvasDimensions = setCanvasDimensions;
  exports2.windowIsLoaded = windowIsLoaded;
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2[Symbol.toStringTag] = "Module";
});
