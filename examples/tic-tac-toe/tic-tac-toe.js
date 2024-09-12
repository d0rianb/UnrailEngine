const version = "0.5.2";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
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
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2[EventType2["KeyboardPressed"] = 0] = "KeyboardPressed";
  EventType2[EventType2["KeyboardDown"] = 1] = "KeyboardDown";
  EventType2[EventType2["Mouse"] = 2] = "Mouse";
  EventType2[EventType2["Window"] = 3] = "Window";
  EventType2[EventType2["Custom"] = 4] = "Custom";
  EventType2[EventType2["All"] = 5] = "All";
  return EventType2;
})(EventType || {});
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
    return { ...this, image };
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
    let opt = { ...defaultOptions$1, ...options };
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
    const styleObject = { ...defaultStyleObject, ...obj };
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
      let styleObject = { ...defaultTextStyleObject, ...obj };
      ctx.font = `${styleObject.size}px ${styleObject.font}`;
      delete styleObject.size;
      delete styleObject.font;
      Renderer.style({ fillStyle: styleObject.color, ...styleObject });
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
    Renderer.text(text, x, y, { ...style, textAlign: "center", textBaseline: "middle" });
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
const encodedJs = "KGZ1bmN0aW9uKCkgewogICJ1c2Ugc3RyaWN0IjsKICBjbGFzcyBCb3ggewogICAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkgewogICAgICB0aGlzLnggPSB4OwogICAgICB0aGlzLnkgPSB5OwogICAgICB0aGlzLndpZHRoID0gd2lkdGg7CiAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0OwogICAgfQogIH0KICBmdW5jdGlvbiBnZXRXaW5kb3dEaW1lbnNpb25zKCkgewogICAgcmV0dXJuIHsgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB9OwogIH0KICBmdW5jdGlvbiBnZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcykgewogICAgcmV0dXJuIHsgd2lkdGg6IGNhbnZhcy5jbGllbnRXaWR0aCB8fCBjYW52YXMud2lkdGgsIGhlaWdodDogY2FudmFzLmNsaWVudEhlaWdodCB8fCBjYW52YXMuaGVpZ2h0IH07CiAgfQogIGZ1bmN0aW9uIHNldENhbnZhc0RpbWVuc2lvbnMoY2FudmFzLCB3aWR0aCwgaGVpZ2h0LCBwaXhlbFJhdGlvKSB7CiAgICBjYW52YXMud2lkdGggPSB3aWR0aCAqIChwaXhlbFJhdGlvIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpOwogICAgY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIChwaXhlbFJhdGlvIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpOwogICAgY2FudmFzLnN0eWxlLndpZHRoID0gd2lkdGggKyAicHgiOwogICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICJweCI7CiAgfQogIGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyh3LCBoLCByYXRpbywgcHJldmVudFJpZ2h0Q2xpY2spIHsKICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImNhbnZhcyIpOwogICAgYWRhcHRDYW52YXNUb0RldmljZVBpeGVsUmF0aW8oY2FudmFzLCB3LCBoLCByYXRpbyk7CiAgICBpZiAoISFwcmV2ZW50UmlnaHRDbGljaykgewogICAgICBjYW52YXMub25jb250ZXh0bWVudSA9IChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCk7CiAgICB9CiAgICByZXR1cm4gY2FudmFzOwogIH0KICBmdW5jdGlvbiBhZGFwdENhbnZhc1RvRGV2aWNlUGl4ZWxSYXRpbyhjYW52YXMsIHdpZHRoLCBoZWlnaHQsIHJhdGlvKSB7CiAgICBjb25zdCBwaXhlbFJhdGlvID0gcmF0aW8gfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTsKICAgIGxldCB3ID0gd2lkdGggfHwgZ2V0Q2FudmFzRGltZW5zaW9ucyhjYW52YXMpLndpZHRoOwogICAgbGV0IGggPSBoZWlnaHQgfHwgZ2V0Q2FudmFzRGltZW5zaW9ucyhjYW52YXMpLmhlaWdodDsKICAgIHNldENhbnZhc0RpbWVuc2lvbnMoY2FudmFzLCB3LCBoLCBwaXhlbFJhdGlvKTsKICAgIGlmIChwaXhlbFJhdGlvICE9IDEpIHsKICAgICAgY2FudmFzLmdldENvbnRleHQoIjJkIikuc2V0VHJhbnNmb3JtKHBpeGVsUmF0aW8sIDAsIDAsIHBpeGVsUmF0aW8sIDAsIDApOwogICAgfQogIH0KICBmdW5jdGlvbiBpbnNlcnRDYW52YXMoY2FudmFzLCBlbCkgewogICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIkRPTUNvbnRlbnRMb2FkZWQiLCAoKSA9PiB7CiAgICAgIHZhciBfYTsKICAgICAgY29uc3QgZWxlbWVudCA9IChfYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpKSAhPSBudWxsID8gX2EgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTsKICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpOwogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJib2R5IikuYXBwZW5kQ2hpbGQoZWxlbWVudCk7CiAgICB9KTsKICB9CiAgY2xhc3MgVmVjdG9yMiB7CiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7CiAgICAgIHRoaXMueCA9IHg7CiAgICAgIHRoaXMueSA9IHk7CiAgICB9CiAgICBjbG9uZSgpIHsKICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMueCwgdGhpcy55KTsKICAgIH0KICAgIGFkZCh2ZWMpIHsKICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMueCArIHZlYy54LCB0aGlzLnkgKyB2ZWMueSk7CiAgICB9CiAgICBtdWx0aXBseShzY2FsYXIpIHsKICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMueCAqIHNjYWxhciwgdGhpcy55ICogc2NhbGFyKTsKICAgIH0KICAgIGRvdCh2ZWMpIHsKICAgICAgcmV0dXJuIHRoaXMueCAqIHZlYy54ICsgdGhpcy55ICogdmVjLnk7CiAgICB9CiAgICBkaXN0KHZlYykgewogICAgICByZXR1cm4gTWF0aC5zcXJ0KCh0aGlzLnggLSB2ZWMueCkgKiogMiArICh0aGlzLnkgLSB2ZWMueSkgKiogMik7CiAgICB9CiAgfQogIGNvbnN0IFZfTlVMTCA9IG5ldyBWZWN0b3IyKDAsIDApOwogIGNvbnN0IFZfVU5JVCA9IG5ldyBWZWN0b3IyKDEsIDEpOwogIGZ1bmN0aW9uIGlzV29ya2VyKCkgewogICAgcmV0dXJuIHNlbGYuZG9jdW1lbnQgPT0gdm9pZCAwICYmIHNlbGYud2luZG93ID09IHZvaWQgMDsKICB9CiAgZnVuY3Rpb24gbm93KCkgewogICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpIHx8IERhdGUubm93KCk7CiAgfQogIFN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKCkgewogICAgcmV0dXJuIHRoaXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnNsaWNlKDEpOwogIH07CiAgY2xhc3MgRW5naW5lRmFpbHVyZSBleHRlbmRzIEVycm9yIHsKICAgIGNvbnN0cnVjdG9yKG1zZywgc291cmNlKSB7CiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzb3VyY2UgPyBgWyR7c291cmNlLmNhcGl0YWxpemUoKX1dIC0gJHttc2d9YCA6IG1zZzsKICAgICAgc3VwZXIobWVzc2FnZSk7CiAgICAgIHRoaXMubmFtZSA9ICJFbmdpbmVGYWlsdXJlIjsKICAgIH0KICB9CiAgY2xhc3MgUmVuZGVyZXJFcnJvciBleHRlbmRzIEVuZ2luZUZhaWx1cmUgewogICAgY29uc3RydWN0b3IobXNnKSB7CiAgICAgIHN1cGVyKG1zZywgInJlbmRlcmVyIik7CiAgICB9CiAgfQogIGxldCB0ZXh0dXJlSWQgPSAwOwogIGNsYXNzIFRleHR1cmUgewogICAgY29uc3RydWN0b3Ioc291cmNlLCBvcHRpb25zKSB7CiAgICAgIHRoaXMuaXNMb2FkZWQgPSBmYWxzZTsKICAgICAgaWYgKCFzb3VyY2UpCiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJBIHNvdXJjZSBwYXRoIHRvIHRoZSByZXNvdXJjZSBtdXN0IGJlIHByb3ZpZGVkIik7CiAgICAgIHRoaXMuaWQgPSB0ZXh0dXJlSWQrKzsKICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpOwogICAgICB0aGlzLmltYWdlLnNyYyA9IHNvdXJjZTsKICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7CiAgICAgICAgdGhpcy5pc0xvYWRlZCA9IHRydWU7CiAgICAgICAgdGhpcy5vbkxvYWQoKTsKICAgICAgfTsKICAgICAgdGhpcy5zaXplID0geyB3aWR0aDogdGhpcy5pbWFnZS53aWR0aCwgaGVpZ2h0OiB0aGlzLmltYWdlLmhlaWdodCB9OwogICAgICB0aGlzLnJvdGF0aW9uID0gKG9wdGlvbnMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdGlvbnMucm90YXRpb24pIHx8IDA7CiAgICAgIHRoaXMub2Zmc2V0ID0gKG9wdGlvbnMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdGlvbnMub2Zmc2V0KSB8fCBWX05VTEw7CiAgICAgIHRoaXMuc2NhbGUgPSAob3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5zY2FsZSkgfHwgVl9VTklUOwogICAgfQogICAgYXN5bmMgY29udmVydFRvQml0bWFwKCkgewogICAgICBpZiAoIXRoaXMuaW1hZ2Uud2lkdGggfHwgIXRoaXMuaW1hZ2UuaGVpZ2h0KQogICAgICAgIHJldHVybjsKICAgICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBjcmVhdGVJbWFnZUJpdG1hcCh0aGlzLmltYWdlKTsKICAgICAgcmV0dXJuIHsgLi4udGhpcywgaW1hZ2UgfTsKICAgIH0KICAgIG9uTG9hZCgpIHsKICAgIH0KICB9CiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7CiAgICBpbnRlcnZhbDogMjAwLAogICAgbG9vcDogZmFsc2UKICB9OwogIGNsYXNzIEFuaW1hdGVkU3ByaXRlIGV4dGVuZHMgVGV4dHVyZSB7CiAgICBjb25zdHJ1Y3RvcihzcHJpdGVTaGVldCwgZnJvbSwgdG8sIG9wdGlvbnMpIHsKICAgICAgc3VwZXIoc3ByaXRlU2hlZXQuc3ByaXRlU2hlZXRQYXRoKTsKICAgICAgdGhpcy5pbnRlcnZhbElkID0gLTE7CiAgICAgIHRoaXMuaXNBbmltYXRlZCA9IGZhbHNlOwogICAgICB0aGlzLmxhc3RSdW5UaW1lU3RhbXAgPSAwOwogICAgICB0aGlzLnNwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7CiAgICAgIGlmIChmcm9tWzBdIDwgMSB8fCBmcm9tWzFdIDwgMSB8fCB0b1swXSA8IDEgfHwgdG9bMV0gPCAxIHx8IGZyb21bMF0gPiBzcHJpdGVTaGVldC5jb2xzIHx8IGZyb21bMV0gPiBzcHJpdGVTaGVldC5yb3dzIHx8IHRvWzBdID4gc3ByaXRlU2hlZXQuY29scyB8fCB0b1sxXSA+IHNwcml0ZVNoZWV0LnJvd3MpCiAgICAgICAgdGhyb3cgbmV3IEVuZ2luZUZhaWx1cmUoIkludmFsaWQgdHVwbGVzIDogdGhlIHNwcml0ZXNoZWV0IGNvb3JkaW5hdGUgc3RhcnRzIGF0ICgxLCAxKSIpOwogICAgICB0aGlzLmZyb20gPSBmcm9tOwogICAgICB0aGlzLnRvID0gdG87CiAgICAgIGxldCBvcHQgPSB7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH07CiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBvcHQuaW50ZXJ2YWw7CiAgICAgIHRoaXMubG9vcCA9IG9wdC5sb29wOwogICAgICB0aGlzLnNwcml0ZVdpZHRoID0gdGhpcy5zaXplLndpZHRoIC8gc3ByaXRlU2hlZXQuY29sczsKICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSB0aGlzLnNpemUuaGVpZ2h0IC8gc3ByaXRlU2hlZXQucm93czsKICAgICAgdGhpcy5jb29yZFggPSB0aGlzLmZyb21bMF07CiAgICAgIHRoaXMuY29vcmRZID0gdGhpcy5mcm9tWzFdOwogICAgfQogICAgcnVuKCkgewogICAgICBsZXQgbm93VGltZVN0YW1wID0gbm93KCk7CiAgICAgIGlmIChub3dUaW1lU3RhbXAgLSB0aGlzLmxhc3RSdW5UaW1lU3RhbXAgPiB0aGlzLmludGVydmFsKSB7CiAgICAgICAgdGhpcy5zdGVwKCk7CiAgICAgICAgdGhpcy5sYXN0UnVuVGltZVN0YW1wID0gbm93VGltZVN0YW1wOwogICAgICB9CiAgICB9CiAgICBhbmltYXRlKCkgewogICAgICBpZiAodGhpcy5pc0FuaW1hdGVkKQogICAgICAgIHJldHVybjsKICAgICAgdGhpcy5pbnRlcnZhbElkID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHRoaXMuc3RlcCgpLCB0aGlzLmludGVydmFsKTsKICAgICAgdGhpcy5pc0FuaW1hdGVkID0gdHJ1ZTsKICAgIH0KICAgIHBhdXNlKCkgewogICAgICBpZiAodGhpcy5pc0FuaW1hdGVkKSB7CiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTsKICAgICAgICB0aGlzLmlzQW5pbWF0ZWQgPSBmYWxzZTsKICAgICAgfQogICAgfQogICAgcmVzZXQoKSB7CiAgICAgIHRoaXMuY29vcmRYID0gdGhpcy5mcm9tWzBdOwogICAgICB0aGlzLmNvb3JkWSA9IHRoaXMuZnJvbVsxXTsKICAgIH0KICAgIHN0b3AoKSB7CiAgICAgIHRoaXMucGF1c2UoKTsKICAgICAgdGhpcy5yZXNldCgpOwogICAgfQogICAgc2V0SW50ZXJ2YWwoaW50ZXJ2YWwpIHsKICAgICAgdGhpcy5pbnRlcnZhbCA9IGludGVydmFsOwogICAgICBpZiAodGhpcy5pc0FuaW1hdGVkKSB7CiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTsKICAgICAgICB0aGlzLmFuaW1hdGUoKTsKICAgICAgfQogICAgfQogICAgc3RlcCgpIHsKICAgICAgaWYgKHRoaXMuY29vcmRYID09PSB0aGlzLnRvWzBdICYmIHRoaXMuY29vcmRZID09PSB0aGlzLnRvWzFdKSB7CiAgICAgICAgaWYgKHRoaXMubG9vcCkgewogICAgICAgICAgdGhpcy5jb29yZFggPSB0aGlzLmZyb21bMF07CiAgICAgICAgICB0aGlzLmNvb3JkWSA9IHRoaXMuZnJvbVsxXTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGlmICh0aGlzLmNvb3JkWSA8IHRoaXMudG9bMV0pIHsKICAgICAgICBpZiAodGhpcy5jb29yZFggPCB0aGlzLnNwcml0ZVNoZWV0LmNvbHMpCiAgICAgICAgICB0aGlzLmNvb3JkWCsrOwogICAgICAgIGVsc2UgewogICAgICAgICAgdGhpcy5jb29yZFkrKzsKICAgICAgICAgIHRoaXMuY29vcmRYID0gdGhpcy5mcm9tWzBdOwogICAgICAgIH0KICAgICAgfSBlbHNlIHsKICAgICAgICBpZiAodGhpcy5jb29yZFggPCB0aGlzLnRvWzBdKQogICAgICAgICAgdGhpcy5jb29yZFgrKzsKICAgICAgfQogICAgfQogICAgc3ByaXRlQm94KCkgewogICAgICByZXR1cm4gbmV3IEJveCgodGhpcy5jb29yZFggLSAxKSAqIHRoaXMuc3ByaXRlV2lkdGgsICh0aGlzLmNvb3JkWSAtIDEpICogdGhpcy5zcHJpdGVIZWlnaHQsIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0KTsKICAgIH0KICB9CiAgY29uc3QgZGVmYXVsdFN0eWxlT2JqZWN0ID0gewogICAgc3Ryb2tlU3R5bGU6ICJibGFjayIsCiAgICBsaW5lV2lkdGg6IDIsCiAgICBsaW5lSm9pbjogInJvdW5kIiwKICAgIGxpbmVDYXA6ICJyb3VuZCIsCiAgICBmaWxsU3R5bGU6ICJ0cmFuc3BhcmVudCIsCiAgICBnbG9iYWxBbHBoYTogMSwKICAgIGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjogImFkZCIKICB9OwogIGNvbnN0IGRlZmF1bHRUZXh0U3R5bGVPYmplY3QgPSB7CiAgICBmb250OiAiUm9ib3RvIiwKICAgIHNpemU6IDE2LAogICAgY29sb3I6ICJibGFjayIsCiAgICB0ZXh0QWxpZ246ICJsZWZ0IiwKICAgIHRleHRCYXNlbGluZTogImFscGhhYmV0aWMiCiAgfTsKICBjb25zdCBUV09QSSA9IDIgKiBNYXRoLlBJOwogIGxldCBwcmVjaXNpb24gPSBpc1dvcmtlcigpID8gNCA6IDIgKiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7CiAgbGV0IG9mZnNldCA9IFZfTlVMTDsKICBmdW5jdGlvbiByb3VuZChudW0pIHsKICAgIHJldHVybiB+fihudW0gKiBwcmVjaXNpb24pIC8gcHJlY2lzaW9uOwogIH0KICBsZXQgY3R4OwogIGxldCBsYXN0U3R5bGVPYmplY3Q7CiAgY2xhc3MgUmVuZGVyZXIgewogICAgc3RhdGljIGNyZWF0ZSh3aWR0aCwgaGVpZ2h0KSB7CiAgICAgIGxldCBbd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodF0gPSBbZ2V0V2luZG93RGltZW5zaW9ucygpLndpZHRoLCBnZXRXaW5kb3dEaW1lbnNpb25zKCkuaGVpZ2h0XTsKICAgICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKHdpZHRoIHx8IHdpbmRvd1dpZHRoLCBoZWlnaHQgfHwgd2luZG93SGVpZ2h0KTsKICAgICAgaW5zZXJ0Q2FudmFzKGNhbnZhcywgIm1haW4iKTsKICAgICAgUmVuZGVyZXIuc2V0Q29udGV4dChjYW52YXMuZ2V0Q29udGV4dCgiMmQiKSk7CiAgICAgIHJldHVybiBjYW52YXM7CiAgICB9CiAgICBzdGF0aWMgY3JlYXRlRnJvbUNhbnZhcyhzZWxlY3RvcikgewogICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7CiAgICAgIGlmICghY2FudmFzIHx8ICEoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpKQogICAgICAgIHRocm93IG5ldyBSZW5kZXJlckVycm9yKCJUaGUgc2VsZWN0ZWQgZWxlbWVudCBpcyBub3QgYSBjYW52YXMiKTsKICAgICAgYWRhcHRDYW52YXNUb0RldmljZVBpeGVsUmF0aW8oY2FudmFzKTsKICAgICAgUmVuZGVyZXIuc2V0Q29udGV4dChjYW52YXMuZ2V0Q29udGV4dCgiMmQiKSk7CiAgICAgIHJldHVybiBjYW52YXM7CiAgICB9CiAgICBzdGF0aWMgc2V0Q29udGV4dChjb250ZXh0KSB7CiAgICAgIGN0eCA9IGNvbnRleHQ7CiAgICB9CiAgICBzdGF0aWMgZ2V0Q29udGV4dCgpIHsKICAgICAgcmV0dXJuIGN0eDsKICAgIH0KICAgIHN0YXRpYyBzZXRPZmZzZXQoeCwgeSkgewogICAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMih4LCB5KTsKICAgIH0KICAgIHN0YXRpYyBnZXRPZmZzZXQoKSB7CiAgICAgIHJldHVybiBvZmZzZXQ7CiAgICB9CiAgICBzdGF0aWMgc3R5bGUob2JqKSB7CiAgICAgIGlmICghY3R4KQogICAgICAgIHRocm93IG5ldyBSZW5kZXJlckVycm9yKCJDb250ZXh0IGhhcyBub3QgYmVlbiBpbml0aWFsaXplLiBQbGVhc2UgdXNlIFJlbmRlcmVyLnNldENvbnRleHQiKTsKICAgICAgY29uc3Qgc3R5bGVPYmplY3QgPSB7IC4uLmRlZmF1bHRTdHlsZU9iamVjdCwgLi4ub2JqIH07CiAgICAgIGlmIChzdHlsZU9iamVjdCA9PT0gbGFzdFN0eWxlT2JqZWN0KQogICAgICAgIHJldHVybjsKICAgICAgaWYgKCJjb2xvciIgaW4gc3R5bGVPYmplY3QpIHsKICAgICAgICBzdHlsZU9iamVjdFsiZmlsbFN0eWxlIl0gPSBzdHlsZU9iamVjdFsiY29sb3IiXTsKICAgICAgICBzdHlsZU9iamVjdFsic3Ryb2tlU3R5bGUiXSA9IHN0eWxlT2JqZWN0WyJjb2xvciJdOwogICAgICAgIGRlbGV0ZSBzdHlsZU9iamVjdFsiY29sb3IiXTsKICAgICAgfQogICAgICBmb3IgKGxldCBwcm9wIGluIHN0eWxlT2JqZWN0KSB7CiAgICAgICAgaWYgKGN0eFtwcm9wXSAhPT0gc3R5bGVPYmplY3RbcHJvcF0pIHsKICAgICAgICAgIGN0eFtwcm9wXSA9IHN0eWxlT2JqZWN0W3Byb3BdOwogICAgICAgIH0KICAgICAgfQogICAgICBsYXN0U3R5bGVPYmplY3QgPSBzdHlsZU9iamVjdDsKICAgIH0KICAgIHN0YXRpYyB0ZXh0U3R5bGUob2JqKSB7CiAgICAgIGlmICghIWN0eCkgewogICAgICAgIGxldCBzdHlsZU9iamVjdCA9IHsgLi4uZGVmYXVsdFRleHRTdHlsZU9iamVjdCwgLi4ub2JqIH07CiAgICAgICAgY3R4LmZvbnQgPSBgJHtzdHlsZU9iamVjdC5zaXplfXB4ICR7c3R5bGVPYmplY3QuZm9udH1gOwogICAgICAgIGRlbGV0ZSBzdHlsZU9iamVjdC5zaXplOwogICAgICAgIGRlbGV0ZSBzdHlsZU9iamVjdC5mb250OwogICAgICAgIFJlbmRlcmVyLnN0eWxlKHsgZmlsbFN0eWxlOiBzdHlsZU9iamVjdC5jb2xvciwgLi4uc3R5bGVPYmplY3QgfSk7CiAgICAgIH0KICAgIH0KICAgIHN0YXRpYyBjbGVhcihjb2xvcikgewogICAgICBpZiAoY29sb3IpIHsKICAgICAgICBSZW5kZXJlci5zdHlsZSh7IGZpbGxTdHlsZTogY29sb3IgfSk7CiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTsKICAgICAgfSBlbHNlIHsKICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTsKICAgICAgfQogICAgfQogICAgc3RhdGljIGxpbmUoeDEsIHkxLCB4MiwgeTIsIG9iaikgewogICAgICBSZW5kZXJlci5zdHlsZShvYmopOwogICAgICBjdHguYmVnaW5QYXRoKCk7CiAgICAgIGN0eC5tb3ZlVG8ocm91bmQob2Zmc2V0LnggKyB4MSksIHJvdW5kKG9mZnNldC55ICsgeTEpKTsKICAgICAgY3R4LmxpbmVUbyhyb3VuZChvZmZzZXQueCArIHgyKSwgcm91bmQob2Zmc2V0LnkgKyB5MikpOwogICAgICBjdHguc3Ryb2tlKCk7CiAgICB9CiAgICBzdGF0aWMgcmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBvYmopIHsKICAgICAgUmVuZGVyZXIuc3R5bGUob2JqKTsKICAgICAgY29uc3QgW3JfeCwgcl95LCByX3csIHJfaF0gPSBbcm91bmQoeCArIG9mZnNldC54KSwgcm91bmQoeSArIG9mZnNldC55KSwgcm91bmQod2lkdGgpLCByb3VuZChoZWlnaHQpXTsKICAgICAgY3R4LmZpbGxSZWN0KHJfeCwgcl95LCByX3csIHJfaCk7CiAgICAgIGN0eC5zdHJva2VSZWN0KHJfeCwgcl95LCByX3csIHJfaCk7CiAgICB9CiAgICBzdGF0aWMgcmVjdEZyb21DZW50ZXIoeCwgeSwgd2lkdGgsIGhlaWdodCwgb2JqKSB7CiAgICAgIHJldHVybiBSZW5kZXJlci5yZWN0KHJvdW5kKHggLSB3aWR0aCAvIDIpLCByb3VuZCh5IC0gaGVpZ2h0IC8gMiksIHJvdW5kKHdpZHRoKSwgcm91bmQoaGVpZ2h0KSwgb2JqKTsKICAgIH0KICAgIHN0YXRpYyByZWN0RnJvbVBvaW50cyh4MSwgeTEsIHgyLCB5Miwgb2JqKSB7CiAgICAgIHJldHVybiBSZW5kZXJlci5yZWN0KHJvdW5kKHgxKSwgcm91bmQoeTEpLCByb3VuZCh4MiAtIHgxKSwgcm91bmQoeTIgLSB5MSksIG9iaik7CiAgICB9CiAgICBzdGF0aWMgcm91bmRlZFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzLCBvYmopIHsKICAgICAgUmVuZGVyZXIuc3R5bGUob2JqKTsKICAgICAgY29uc3QgW3JfeCwgcl95LCByX3csIHJfaF0gPSBbcm91bmQoeCArIG9mZnNldC54KSwgcm91bmQoeSArIG9mZnNldC55KSwgcm91bmQod2lkdGgpLCByb3VuZChoZWlnaHQpXTsKICAgICAgY29uc3Qgcl9yYWRpdXMgPSByb3VuZChyYWRpdXMpOwogICAgICBjdHguYmVnaW5QYXRoKCk7CiAgICAgIGN0eC5yb3VuZFJlY3Qocl94LCByX3ksIHJfdywgcl9oLCBbcl9yYWRpdXNdKTsKICAgICAgY3R4LmZpbGwoKTsKICAgICAgY3R4LnN0cm9rZSgpOwogICAgfQogICAgc3RhdGljIHBvbHkocG9pbnRzLCBvYmopIHsKICAgICAgaWYgKCFwb2ludHMubGVuZ3RoKQogICAgICAgIHJldHVybjsKICAgICAgUmVuZGVyZXIuc3R5bGUob2JqKTsKICAgICAgY3R4LmJlZ2luUGF0aCgpOwogICAgICBjdHgubW92ZVRvKHJvdW5kKHBvaW50c1swXS54ICsgb2Zmc2V0LngpLCByb3VuZChwb2ludHNbMF0ueSArIG9mZnNldC55KSk7CiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7CiAgICAgICAgY3R4LmxpbmVUbyhyb3VuZChwb2ludHNbaV0ueCArIG9mZnNldC54KSwgcm91bmQocG9pbnRzW2ldLnkgKyBvZmZzZXQueSkpOwogICAgICB9CiAgICAgIGN0eC5maWxsKCk7CiAgICAgIGN0eC5zdHJva2UoKTsKICAgIH0KICAgIHN0YXRpYyBjaXJjbGUoeCwgeSwgcmFkaXVzLCBvYmopIHsKICAgICAgUmVuZGVyZXIuc3R5bGUob2JqKTsKICAgICAgY3R4LmJlZ2luUGF0aCgpOwogICAgICBjdHguYXJjKHJvdW5kKHggKyBvZmZzZXQueCksIHJvdW5kKHkgKyBvZmZzZXQueSksIHJhZGl1cywgMCwgVFdPUEkpOwogICAgICBjdHguZmlsbCgpOwogICAgICBjdHguc3Ryb2tlKCk7CiAgICB9CiAgICBzdGF0aWMgY2lyY2xlRnJvbVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgb2JqKSB7CiAgICAgIHJldHVybiBSZW5kZXJlci5jaXJjbGUocm91bmQoeCArIHdpZHRoIC8gMiksIHJvdW5kKHkgKyBoZWlnaHQgLyAyKSwgcm91bmQoTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyKSwgb2JqKTsKICAgIH0KICAgIHN0YXRpYyBwb2ludCh4LCB5LCBvYmopIHsKICAgICAgUmVuZGVyZXIuY2lyY2xlKHJvdW5kKHgpLCByb3VuZCh5KSwgNSwgb2JqKTsKICAgIH0KICAgIHN0YXRpYyByZWN0U3ByaXRlKHgsIHksIHdpZHRoLCBoZWlnaHQsIHRleHR1cmUpIHsKICAgICAgaWYgKCF0ZXh0dXJlLmlzTG9hZGVkKQogICAgICAgIHJldHVybjsKICAgICAgUmVuZGVyZXIuc3R5bGUoe30pOwogICAgICBjdHguc2F2ZSgpOwogICAgICBjdHgudHJhbnNsYXRlKHJvdW5kKHggKyB3aWR0aCAvIDIgKyBvZmZzZXQueCksIHJvdW5kKHkgKyBoZWlnaHQgLyAyICsgb2Zmc2V0LnkpKTsKICAgICAgY3R4LnNjYWxlKHRleHR1cmUuc2NhbGUueCwgdGV4dHVyZS5zY2FsZS55KTsKICAgICAgY3R4LnJvdGF0ZSh0ZXh0dXJlLnJvdGF0aW9uKTsKICAgICAgbGV0IHNvdXJjZUJveCA9IG5ldyBCb3goMCwgMCwgdGV4dHVyZS5zaXplLndpZHRoLCB0ZXh0dXJlLnNpemUuaGVpZ2h0KTsKICAgICAgaWYgKHRleHR1cmUgaW5zdGFuY2VvZiBBbmltYXRlZFNwcml0ZSkgewogICAgICAgIHNvdXJjZUJveCA9IHRleHR1cmUuc3ByaXRlQm94KCk7CiAgICAgIH0KICAgICAgY3R4LmRyYXdJbWFnZSgKICAgICAgICB0ZXh0dXJlLmltYWdlLAogICAgICAgIHNvdXJjZUJveC54LAogICAgICAgIHNvdXJjZUJveC55LAogICAgICAgIHNvdXJjZUJveC53aWR0aCwKICAgICAgICBzb3VyY2VCb3guaGVpZ2h0LAogICAgICAgIHJvdW5kKHdpZHRoICogdGV4dHVyZS5vZmZzZXQueCAtIHdpZHRoIC8gMiksCiAgICAgICAgcm91bmQoaGVpZ2h0ICogdGV4dHVyZS5vZmZzZXQueSAtIGhlaWdodCAvIDIpLAogICAgICAgIHJvdW5kKHdpZHRoKSwKICAgICAgICByb3VuZChoZWlnaHQpCiAgICAgICk7CiAgICAgIGN0eC5yZXN0b3JlKCk7CiAgICB9CiAgICBzdGF0aWMgY2lyY2xlU3ByaXRlKHgsIHksIHJhZGl1cywgdGV4dHVyZSkgewogICAgICBpZiAoIXRleHR1cmUuaXNMb2FkZWQpCiAgICAgICAgcmV0dXJuOwogICAgICBjdHguc2F2ZSgpOwogICAgICBjdHguYmVnaW5QYXRoKCk7CiAgICAgIGN0eC5hcmMocm91bmQoeCArIG9mZnNldC54KSwgcm91bmQoeSArIG9mZnNldC55KSwgcmFkaXVzLCAwLCBUV09QSSk7CiAgICAgIGN0eC5jbGlwKCk7CiAgICAgIFJlbmRlcmVyLnJlY3RTcHJpdGUoeCAtIHJhZGl1cywgeSAtIHJhZGl1cywgMiAqIHJhZGl1cywgMiAqIHJhZGl1cywgdGV4dHVyZSk7CiAgICAgIGN0eC5yZXN0b3JlKCk7CiAgICB9CiAgICBzdGF0aWMgdGV4dCh0ZXh0LCB4LCB5LCBzdHlsZSkgewogICAgICBSZW5kZXJlci50ZXh0U3R5bGUoc3R5bGUpOwogICAgICBjdHguZmlsbFRleHQodGV4dCwgeCwgeSk7CiAgICB9CiAgICBzdGF0aWMgY2VudGVyZWRUZXh0KHRleHQsIHgsIHksIHN0eWxlKSB7CiAgICAgIFJlbmRlcmVyLnRleHQodGV4dCwgeCwgeSwgeyAuLi5zdHlsZSwgdGV4dEFsaWduOiAiY2VudGVyIiwgdGV4dEJhc2VsaW5lOiAibWlkZGxlIiB9KTsKICAgIH0KICAgIHN0YXRpYyB0aW50KGNvbG9yLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7CiAgICAgIFJlbmRlcmVyLnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgewogICAgICAgIGZpbGxTdHlsZTogY29sb3IsCiAgICAgICAgZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiAibXVsdGlwbHkiLAogICAgICAgIGdsb2JhbEFscGhhOiAwLjI1CiAgICAgIH0pOwogICAgfQogICAgc3RhdGljIGJlZ2luRnJhbWUoY29sb3IpIHsKICAgICAgUmVuZGVyZXIuY2xlYXIoY29sb3IpOwogICAgfQogICAgc3RhdGljIGVuZEZyYW1lKCkgewogICAgfQogIH0KICBjbGFzcyBUaHJlYWRXb3JrZXIgewogICAgc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQodGl0bGUsIGFyZ3MpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IHRpdGxlLCBkYXRhOiBhcmdzIH0pOwogICAgfQogICAgbG9nKC4uLmFyZ3MpIHsKICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgibG9nIiwgLi4uYXJncyk7CiAgICB9CiAgfQogIGNsYXNzIFJlbmRlcmVyV29ya2VyIGV4dGVuZHMgVGhyZWFkV29ya2VyIHsKICAgIGNvbnN0cnVjdG9yKCkgewogICAgICBzdXBlcigpOwogICAgICB0aGlzLmNhbnZhc1Jlc29sdXRpb24gPSAxOwogICAgICB0aGlzLm9mZnNjcmVlbkNhbnZhcyA9IG51bGw7CiAgICAgIHRoaXMuY3R4ID0gbnVsbDsKICAgICAgdGhpcy50ZXh0dXJlQWxpYXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpOwogICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCAoeyBkYXRhIH0pID0+IHRoaXMub25NZXNzYWdlKGRhdGEudGl0bGUsIGRhdGEuY29udGVudCkpOwogICAgfQogICAgb25NZXNzYWdlKHRpdGxlLCBjb250ZW50KSB7CiAgICAgIHN3aXRjaCAodGl0bGUpIHsKICAgICAgICBjYXNlICJpbml0Q2FudmFzIjoKICAgICAgICAgIHRoaXMub2Zmc2NyZWVuQ2FudmFzID0gY29udGVudC5jYW52YXM7CiAgICAgICAgICB0aGlzLmN0eCA9IHRoaXMub2Zmc2NyZWVuQ2FudmFzLmdldENvbnRleHQoIjJkIik7CiAgICAgICAgICBSZW5kZXJlci5zZXRDb250ZXh0KHRoaXMuY3R4KTsKICAgICAgICAgIHRoaXMuc2V0U2l6ZShjb250ZW50LmRwciwgY29udGVudC53aWR0aCwgY29udGVudC5oZWlnaHQpOwogICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgiaW5pdGlhbGl6ZWQiKTsKICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgInJlbmRlciI6CiAgICAgICAgICBmb3IgKGxldCByZW5kZXJDYWxsIG9mIGNvbnRlbnQucmVuZGVyU3RhY2spIHsKICAgICAgICAgICAgdGhpcy5oYW5kbGVEcmF3UmVxdWVzdChyZW5kZXJDYWxsLm1ldGhvZE5hbWUsIHJlbmRlckNhbGwuYXJncyk7CiAgICAgICAgICB9CiAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICJuZXdUZXh0dXJlIjoKICAgICAgICAgIHRoaXMudGV4dHVyZUFsaWFzLnNldChjb250ZW50LmlkLCBjb250ZW50LnRleHR1cmUpOwogICAgICAgICAgYnJlYWs7CiAgICAgIH0KICAgIH0KICAgIHNldFNpemUoZHByLCB3aWR0aCwgaGVpZ2h0KSB7CiAgICAgIGNvbnN0IHBpeGVsUmF0aW8gPSAoZHByIHx8IDEpICogdGhpcy5jYW52YXNSZXNvbHV0aW9uOwogICAgICB0aGlzLm9mZnNjcmVlbkNhbnZhcy53aWR0aCA9IHdpZHRoICogcGl4ZWxSYXRpbzsKICAgICAgdGhpcy5vZmZzY3JlZW5DYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogcGl4ZWxSYXRpbzsKICAgICAgInNldFRyYW5zZm9ybSIgaW4gdGhpcy5jdHggPyB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0ocGl4ZWxSYXRpbywgMCwgMCwgcGl4ZWxSYXRpbywgMCwgMCkgOiBudWxsOwogICAgfQogICAgZ2V0VGV4dHVyZShhcmdzKSB7CiAgICAgIGNvbnN0IHRleHR1cmUgPSB0aGlzLnRleHR1cmVBbGlhcy5nZXQoYXJncy50ZXh0dXJlSWQpOwogICAgICBjb25zdCB7IHNjYWxlLCByb3RhdGlvbiwgb2Zmc2V0OiBvZmZzZXQyIH0gPSBhcmdzOwogICAgICByZXR1cm4geyAuLi50ZXh0dXJlLCBzY2FsZSwgcm90YXRpb24sIG9mZnNldDogb2Zmc2V0MiB9OwogICAgfQogICAgaGFuZGxlRHJhd1JlcXVlc3QobWV0aG9kLCBhcmdzKSB7CiAgICAgIHN3aXRjaCAobWV0aG9kKSB7CiAgICAgICAgY2FzZSAic3R5bGUiOgogICAgICAgICAgUmVuZGVyZXIuc3R5bGUoYXJncyA9PSBudWxsID8gdm9pZCAwIDogYXJncy5vYmopOwogICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAiY2xlYXIiOgogICAgICAgICAgUmVuZGVyZXIuY2xlYXIoYXJncyA9PSBudWxsID8gdm9pZCAwIDogYXJncy5jb2xvcik7CiAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICJsaW5lIjoKICAgICAgICAgIFJlbmRlcmVyLmxpbmUoYXJncy54MSwgYXJncy55MSwgYXJncy54MiwgYXJncy55MiwgYXJncy5vYmopOwogICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAicmVjdCI6CiAgICAgICAgICBSZW5kZXJlci5yZWN0KGFyZ3MueCwgYXJncy55LCBhcmdzLndpZHRoLCBhcmdzLmhlaWdodCwgYXJncy5vYmopOwogICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAicmVjdEZyb21DZW50ZXIiOgogICAgICAgICAgUmVuZGVyZXIucmVjdEZyb21DZW50ZXIoYXJncy54LCBhcmdzLnksIGFyZ3Mud2lkdGgsIGFyZ3MuaGVpZ2h0LCBhcmdzLm9iaik7CiAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICJyZWN0RnJvbVBvaW50cyI6CiAgICAgICAgICBSZW5kZXJlci5yZWN0RnJvbVBvaW50cyhhcmdzLngxLCBhcmdzLnkxLCBhcmdzLngyLCBhcmdzLnkyLCBhcmdzLm9iaik7CiAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICJyb3VuZGVkUmVjdCI6CiAgICAgICAgICBSZW5kZXJlci5yb3VuZGVkUmVjdChhcmdzLngxLCBhcmdzLnkxLCBhcmdzLndpZHRoLCBhcmdzLmhlaWdodCwgYXJncy5yYWRpdXMsIGFyZ3Mub2JqKTsKICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgInBvbHkiOgogICAgICAgICAgUmVuZGVyZXIucG9seShhcmdzLnBvaW50cywgYXJncy5vYmopOwogICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAiY2lyY2xlIjoKICAgICAgICAgIFJlbmRlcmVyLmNpcmNsZShhcmdzLngsIGFyZ3MueSwgYXJncy5yYWRpdXMsIGFyZ3Mub2JqKTsKICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgImNpcmNsZUZyb21SZWN0IjoKICAgICAgICAgIFJlbmRlcmVyLmNpcmNsZUZyb21SZWN0KGFyZ3MueCwgYXJncy55LCBhcmdzLndpZHRoLCBhcmdzLmhlaWdodCwgYXJncy5vYmopOwogICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAicG9pbnQiOgogICAgICAgICAgUmVuZGVyZXIucG9pbnQoYXJncy54LCBhcmdzLnksIGFyZ3Mub2JqKTsKICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgInJlY3RTcHJpdGUiOgogICAgICAgICAgUmVuZGVyZXIucmVjdFNwcml0ZShhcmdzLngsIGFyZ3MueSwgYXJncy53aWR0aCwgYXJncy5oZWlnaHQsIHRoaXMuZ2V0VGV4dHVyZShhcmdzKSk7CiAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICJjaXJjbGVTcHJpdGUiOgogICAgICAgICAgUmVuZGVyZXIuY2lyY2xlU3ByaXRlKGFyZ3MueCwgYXJncy55LCBhcmdzLnJhZGl1cywgdGhpcy5nZXRUZXh0dXJlKGFyZ3MpKTsKICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgInRleHQiOgogICAgICAgICAgUmVuZGVyZXIudGV4dChhcmdzLnRleHQsIGFyZ3MueCwgYXJncy55LCBhcmdzID09IG51bGwgPyB2b2lkIDAgOiBhcmdzLnN0eWxlKTsKICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgImNlbnRlcmVkVGV4dCI6CiAgICAgICAgICBSZW5kZXJlci5jZW50ZXJlZFRleHQoYXJncy50ZXh0LCBhcmdzLngsIGFyZ3MueSwgYXJncyA9PSBudWxsID8gdm9pZCAwIDogYXJncy5zdHlsZSk7CiAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICJ0aW50IjoKICAgICAgICAgIFJlbmRlcmVyLnRpbnQoYXJncy5jb2xvciwgYXJncy54LCBhcmdzLnksIGFyZ3Mud2lkdGgsIGFyZ3MuaGVpZ2h0KTsKICAgICAgICAgIGJyZWFrOwogICAgICB9CiAgICB9CiAgfQogIG5ldyBSZW5kZXJlcldvcmtlcigpOwp9KSgpOwo=";
const blob = typeof window !== "undefined" && window.Blob && new Blob([atob(encodedJs)], { type: "text/javascript;charset=utf-8" });
function WorkerWrapper() {
  const objURL = blob && (window.URL || window.webkitURL).createObjectURL(blob);
  try {
    return objURL ? new Worker(objURL, {}) : new Worker("data:application/javascript;base64," + encodedJs, { type: "module" });
  } finally {
    objURL && (window.URL || window.webkitURL).revokeObjectURL(objURL);
  }
}
let offscreenCanvas;
let worker;
let canvas;
let workerIsInitialized = false;
let renderStack = [];
const textureAlias = /* @__PURE__ */ new Map();
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
  static roundedRect(x, y, width, height, radius, obj) {
    this.addRenderCall("roundedRect", { x, y, width, height, radius, obj });
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
      this.addRenderCall(drawCall, { ...args, textureId: texture.id, scale, rotation, offset: offset2 });
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
    this.options = { ...defaultOptions, ...options };
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
console.log("Unrail Engine v" + version.toString());

const cellWidth = 400 / 3;
const grid = new Grid(3, 3);
const game = new Game("Tic Tac Toe");
let line = null;
let lineAnimation = new Animation(0, 1, 1e3, "smoothStep");
function cross(x, y) {
  const padding = cellWidth / 4;
  const rect = {
    x: x + padding,
    y: y + padding,
    x2: x + cellWidth - padding,
    y2: y + cellWidth - padding
  };
  OffscreenRendererWrapper.line(rect.x, rect.y, rect.x2, rect.y2);
  OffscreenRendererWrapper.line(rect.x2, rect.y, rect.x, rect.y2);
}
function checkWins() {
  for (let i = 0; i <= 2; i++) {
    if (grid.get(0, i).state && grid.get(0, i).state === grid.get(1, i).state && grid.get(1, i).state === grid.get(2, i).state) {
      return { row: i };
    }
  }
  for (let j = 0; j <= 2; j++) {
    if (grid.get(j, 0).state && grid.get(j, 0).state === grid.get(j, 1).state && grid.get(j, 1).state === grid.get(j, 2).state) {
      return { column: j };
    }
  }
  if (grid.get(0, 0).state && grid.get(0, 0).state == grid.get(1, 1).state && grid.get(2, 2).state == grid.get(1, 1).state) {
    return { diagonal: 1 };
  }
  if (grid.get(0, 2).state && grid.get(0, 2).state == grid.get(1, 1).state && grid.get(2, 0).state == grid.get(1, 1).state) {
    return { diagonal: -1 };
  }
  return false;
}
function update() {
  render();
}
function render() {
  OffscreenRendererWrapper.beginFrame();
  for (let cell of grid.cells) {
    OffscreenRendererWrapper.rect(cell.x * cellWidth, cell.y * cellWidth, cell.width * cellWidth, cell.height * cellWidth);
    cell.state && cell.state == "circle" && OffscreenRendererWrapper.circle(cell.x * cellWidth + cellWidth / 2, cell.y * cellWidth + cellWidth / 2, cell.width * cellWidth / 3);
    cell.state && cell.state == "cross" && cross(cell.x * cellWidth, cell.y * cellWidth);
  }
  if (line)
    OffscreenRendererWrapper.line(line.x, line.y, line.x + (line.x2 - line.x) * lineAnimation.value, line.y + (line.y2 - line.y) * lineAnimation.value, { strokeStyle: "red", lineWidth: 6 });
  OffscreenRendererWrapper.endFrame();
}
function reset() {
  line = null;
  grid.clear();
  lineAnimation.reset();
}
Event.onClick(({ x, y }) => {
  const [X, Y] = [Math.floor(x / cellWidth), Math.floor(y / cellWidth)];
  if (X > 2 && Y > 2)
    return;
  const cell = grid.get(X, Y);
  if (!cell || cell && cell.state)
    return;
  const filledCells = grid.cells.filter((cell2) => cell2.state).length;
  if (filledCells % 2 == 0)
    cell.state = "cross";
  else if (filledCells % 2 == 1)
    cell.state = "circle";
  let win = checkWins();
  if (win) {
    if (!lineAnimation.hasStarted)
      lineAnimation.start();
    if ("column" in win)
      line = { x: (win.column + 1 / 2) * cellWidth, y: cellWidth / 3, x2: (win.column + 1 / 2) * cellWidth, y2: 2 * cellWidth + 2 * cellWidth / 3 };
    else if ("row" in win)
      line = { x: cellWidth / 3, y: (win.row + 1 / 2) * cellWidth, x2: 2 * cellWidth + 2 * cellWidth / 3, y2: (win.row + 1 / 2) * cellWidth };
    else if ("diagonal" in win && win.diagonal == 1)
      line = { x: cellWidth / 3, y: cellWidth / 3, x2: 2 * cellWidth + 2 / 3 * cellWidth, y2: 2 * cellWidth + 2 / 3 * cellWidth };
    else if ("diagonal" in win && win.diagonal == -1)
      line = { x: 2 * cellWidth + 2 * cellWidth / 3, y: cellWidth / 3, x2: cellWidth / 3, y2: 2 * cellWidth + 2 / 3 * cellWidth };
    window.setTimeout(() => reset(), 1e3);
  } else {
    if (!grid.cells.find((cell2) => !cell2.state)) {
      window.setTimeout(() => reset(), 1e3);
    }
  }
});
OffscreenRendererWrapper.create(400, 400);
game.setMainLoop(update);
game.toggleStats();
game.start();
