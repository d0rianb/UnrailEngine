var t = Object.defineProperty, s = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, a = Object.prototype.propertyIsEnumerable, l = (e2, i2, s2) => i2 in e2 ? t(e2, i2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e2[i2] = s2, o = (t2, e2) => {
  for (var i2 in e2 || (e2 = {}))
    n.call(e2, i2) && l(t2, i2, e2[i2]);
  if (s)
    for (var i2 of s(e2))
      a.call(e2, i2) && l(t2, i2, e2[i2]);
  return t2;
};
function p(t2, e2, i2) {
  return Math.max(t2, Math.min(e2, i2));
}
function y() {
  return { width: window.innerWidth, height: window.innerHeight };
}
function x(t2) {
  return { width: t2.clientWidth || t2.width, height: t2.clientHeight || t2.height };
}
function Z(t2, e2, i2, s2) {
  const n2 = document.createElement("canvas");
  return f(n2, t2, e2, i2), s2 && (n2.oncontextmenu = (t3) => t3.preventDefault()), n2;
}
function f(t2, e2, i2, s2) {
  const n2 = s2 || window.devicePixelRatio || 1;
  let a2 = e2 || x(t2).width, l2 = i2 || x(t2).height;
  t2.width = a2 * n2, t2.height = l2 * n2, t2.style.width = a2 + "px", t2.style.height = l2 + "px", n2 != 1 && t2.getContext("2d").setTransform(n2, 0, 0, n2, 0, 0);
}
function g(t2, e2) {
  window.addEventListener("DOMContentLoaded", () => {
    var i2;
    const s2 = (i2 = document.querySelector(e2)) != null ? i2 : document.createElement(e2);
    s2.appendChild(t2), document.querySelector("body").appendChild(s2);
  });
}
function w() {
  return self.document == null && self.window == null;
}
function R() {
  return performance.now() || Date.now();
}
var S, v;
(v = S || (S = {}))[v.KeyboardPressed = 0] = "KeyboardPressed", v[v.KeyboardDown = 1] = "KeyboardDown", v[v.Mouse = 2] = "Mouse", v[v.Window = 3] = "Window", v[v.Custom = 4] = "Custom", v[v.All = 5] = "All";
const X = new class {
  constructor() {
    this.windowEvents = [], this.customEvents = [], this.mouseEvents = [], this.keyboardDownEvents = [], this.keyboardPressedEvents = [], this.currentKeyEvents = [];
  }
  init() {
    window.addEventListener("keydown", (t2) => {
      this.currentKeyEvents.find((e2) => e2.code === t2.code) || this.currentKeyEvents.push(t2), this.keyboardPressedEvents.forEach((e2) => {
        t2.code === e2.name && e2.callback(t2);
      });
    }), window.addEventListener("keyup", (t2) => {
      this.currentKeyEvents.length && (this.currentKeyEvents = this.currentKeyEvents.filter((e2) => e2.code !== t2.code));
    }), this.bindEvents();
  }
  addEvent(t2) {
    switch (t2.type) {
      case S.KeyboardDown:
        this.keyboardDownEvents.push(t2);
        break;
      case S.KeyboardPressed:
        this.keyboardPressedEvents.push(t2);
        break;
      case S.Mouse:
        this.mouseEvents.push(t2), window.addEventListener(t2.name, (e2) => t2.callback(e2));
        break;
      case S.Window:
        this.windowEvents.push(t2), this.bindEvents();
        break;
      case S.Custom:
        this.customEvents.push(t2);
    }
  }
  getCustomEvent(t2) {
    return this.customEvents.find((e2) => e2.name === t2);
  }
  bindEvents() {
    this.windowEvents.forEach((t2) => window.addEventListener(t2.name, t2.callback));
  }
  tick() {
    this.currentKeyEvents.length && this.keyboardDownEvents.forEach((t2) => {
      this.currentKeyEvents.forEach((e2) => {
        e2.code === t2.name && t2.callback(e2);
      });
    });
  }
}();
const Y = new class {
  constructor() {
    this.hasStarted = false, this.animations = [];
  }
  add(t2) {
    this.animations.push(t2), this.hasStarted && t2.options.autostart && t2.start();
  }
  init() {
    this.hasStarted = true;
    for (let t2 of this.animations)
      t2.options.autostart && t2.start();
  }
  tick(t2) {
    for (let e2 of this.animations)
      e2.update(t2);
  }
}();
var k, H = ((k = function() {
  function t2(t3) {
    return s2.appendChild(t3.dom), t3;
  }
  function e2(t3) {
    for (var e3 = 0; e3 < s2.children.length; e3++)
      s2.children[e3].style.display = e3 === t3 ? "block" : "none";
    i2 = t3;
  }
  var i2 = 0, s2 = document.createElement("div");
  s2.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", s2.addEventListener("click", function(t3) {
    t3.preventDefault(), e2(++i2 % s2.children.length);
  }, false);
  var n2 = (performance || Date).now(), a2 = n2, l2 = 0, o2 = t2(new k.Panel("FPS", "#0ff", "#002")), c2 = t2(new k.Panel("MS", "#0f0", "#020"));
  if (self.performance && self.performance.memory)
    var r2 = t2(new k.Panel("MB", "#f08", "#201"));
  return e2(0), { REVISION: 16, dom: s2, addPanel: t2, showPanel: e2, begin: function() {
    n2 = (performance || Date).now();
  }, end: function() {
    l2++;
    var t3 = (performance || Date).now();
    if (c2.update(t3 - n2, 200), t3 > a2 + 1e3 && (o2.update(1e3 * l2 / (t3 - a2), 100), a2 = t3, l2 = 0, r2)) {
      var e3 = performance.memory;
      r2.update(e3.usedJSHeapSize / 1048576, e3.jsHeapSizeLimit / 1048576);
    }
    return t3;
  }, update: function() {
    n2 = this.end();
  }, domElement: s2, setMode: e2 };
}).Panel = function(t2, e2, i2) {
  var s2 = 1 / 0, n2 = 0, a2 = Math.round, l2 = a2(window.devicePixelRatio || 1), o2 = 80 * l2, c2 = 48 * l2, r2 = 3 * l2, d2 = 2 * l2, h2 = 3 * l2, u2 = 15 * l2, m2 = 74 * l2, p2 = 30 * l2, b2 = document.createElement("canvas");
  b2.width = o2, b2.height = c2, b2.style.cssText = "width:80px;height:48px";
  var y2 = b2.getContext("2d");
  return y2.font = "bold " + 9 * l2 + "px Helvetica,Arial,sans-serif", y2.textBaseline = "top", y2.fillStyle = i2, y2.fillRect(0, 0, o2, c2), y2.fillStyle = e2, y2.fillText(t2, r2, d2), y2.fillRect(h2, u2, m2, p2), y2.fillStyle = i2, y2.globalAlpha = 0.9, y2.fillRect(h2, u2, m2, p2), { dom: b2, update: function(c3, x2) {
    s2 = Math.min(s2, c3), n2 = Math.max(n2, c3), y2.fillStyle = i2, y2.globalAlpha = 1, y2.fillRect(0, 0, o2, u2), y2.fillStyle = e2, y2.fillText(a2(c3) + " " + t2 + " (" + a2(s2) + "-" + a2(n2) + ")", r2, d2), y2.drawImage(b2, h2 + l2, u2, m2 - l2, p2, h2, u2, m2 - l2, p2), y2.fillRect(h2 + m2 - l2, u2, l2, p2), y2.fillStyle = i2, y2.globalAlpha = 0.9, y2.fillRect(h2 + m2 - l2, u2, l2, a2((1 - c3 / x2) * p2));
  } };
}, k);
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
class I extends Error {
  constructor(t2, e2) {
    super(e2 ? `[${e2.capitalize()}] - ${t2}` : t2), this.name = "EngineFailure";
  }
}
class V extends I {
  constructor(t2) {
    super(t2, "renderer");
  }
}
const N = { strokeStyle: "black", lineWidth: 2, lineJoin: "round", lineCap: "round", fillStyle: "transparent", globalAlpha: 1, globalCompositeOperation: "add" }, J = { font: "Roboto", size: 16, color: "black" }, E = 2 * Math.PI;
let F, U, Q = w() ? 4 : 2 * (window.devicePixelRatio || 1);
function j(t2) {
  return ~~(t2 * Q) / Q;
}
class B {
  static create(t2, e2) {
    let [i2, s2] = [y().width, y().height];
    const n2 = Z(t2 || i2, e2 || s2);
    return g(n2, "main"), B.setContext(n2.getContext("2d")), n2;
  }
  static createFromCanvas(t2) {
    let e2 = document.querySelector(t2);
    if (!(e2 && e2 instanceof HTMLCanvasElement))
      throw new V("The selected element is not a canvas");
    return f(e2), B.setContext(e2.getContext("2d")), e2;
  }
  static setContext(t2) {
    F = t2;
  }
  static getContext() {
    return F;
  }
  static style(t2) {
    if (!F)
      throw new V("Context has not been initialize. Please use Renderer.setContext");
    const e2 = o(o({}, N), t2);
    if (e2 !== U) {
      for (let t3 in e2)
        F[t3] !== e2[t3] && (F[t3] = e2[t3]);
      U = e2;
    }
  }
  static clear(t2) {
    t2 ? (B.style({ fillStyle: t2 }), F.fillRect(0, 0, F.canvas.width, F.canvas.height)) : F.clearRect(0, 0, F.canvas.width, F.canvas.height);
  }
  static line(t2, e2, i2, s2, n2) {
    B.style(n2), F.beginPath(), F.moveTo(j(t2), j(e2)), F.lineTo(j(i2), j(s2)), F.stroke();
  }
  static rect(t2, e2, i2, s2, n2) {
    B.style(n2);
    const [a2, l2, o2, c2] = [j(t2), j(e2), j(i2), j(s2)];
    F.fillRect(a2, l2, o2, c2), F.strokeRect(a2, l2, o2, c2);
  }
  static rectFromCenter(t2, e2, i2, s2, n2) {
    return B.rect(t2 - i2 / 2, e2 - s2 / 2, i2, s2, n2);
  }
  static rectFromPoints(t2, e2, i2, s2, n2) {
    return B.rect(t2, e2, i2 - t2, s2 - e2, n2);
  }
  static poly(t2, e2) {
    if (t2.length) {
      B.style(e2), F.beginPath(), F.moveTo(j(t2[0].x), j(t2[0].y));
      for (let e3 = 1; e3 < t2.length; e3++)
        F.lineTo(j(t2[e3].x), j(t2[e3].y));
      F.stroke();
    }
  }
  static circle(t2, e2, i2, s2) {
    B.style(s2), F.beginPath(), F.arc(j(t2), j(e2), i2, 0, E), F.fill(), F.stroke();
  }
  static circleFromRect(t2, e2, i2, s2, n2) {
    return B.circle(t2 + i2 / 2, e2 + s2 / 2, Math.min(i2, s2) / 2, n2);
  }
  static point(t2, e2, i2) {
    B.circle(t2, e2, 5, i2);
  }
  static rectSprite(t2, e2, i2, s2, n2) {
    B.style({}), F.save(), F.translate(j(t2 + i2 / 2), j(e2 + s2 / 2)), F.scale(n2.scale.x, n2.scale.y), F.rotate(n2.rotation), F.drawImage(n2.image, j(i2 * n2.offset.x - i2 / 2), j(s2 * n2.offset.y - s2 / 2), j(i2), j(s2)), F.restore();
  }
  static circleSprite(t2, e2, i2, s2) {
    F.save(), F.beginPath(), F.arc(j(t2), j(e2), i2, 0, E), F.clip(), B.rectSprite(t2 - i2, e2 - i2, 2 * i2, 2 * i2, s2), F.restore();
  }
  static text(t2, e2, i2, s2) {
    if (F) {
      let t3 = o(o({}, J), s2);
      F.font = `${t3.size}px ${t3.font}`, B.style({ fillStyle: t3.color });
    }
    F.fillText(t2, e2, i2);
  }
  static tint(t2, e2, i2, s2, n2) {
    B.rect(e2, i2, s2, n2, { fillStyle: t2, globalCompositeOperation: "multiply", globalAlpha: 0.25 });
  }
  static beginFrame(t2) {
    B.clear(t2);
  }
  static endFrame() {
  }
}
let st = [], nt = 4;
const at = ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
class lt {
  static addItem(t2, e2, i2) {
    lt.internalAddItem(t2, e2, i2);
  }
  static addButton(t2, e2, i2, s2) {
    lt.internalAddItem(t2, i2, s2, e2);
  }
  static internalAddItem(t2, e2, i2, s2) {
    const n2 = { callback: t2, position: e2, options: i2, onClick: s2 };
    st.push(n2);
    const a2 = st.length;
    window.addEventListener("load", () => lt.addToDom(n2, a2));
  }
  static init() {
    lt.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    z-index: 10;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n    /* Make the click event pass through */\n    pointer-events: none;\n}\n\n.ue-container>div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container>.top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container>.top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container>.bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container>.bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n}');
    const t2 = document.createElement("div");
    t2.classList.add("ue-interface", "ue-container");
    for (let e2 of at) {
      const i2 = document.createElement("div");
      i2.classList.add(e2), t2.appendChild(i2);
    }
    document.body.appendChild(t2);
  }
  static addStyle(t2) {
    const e2 = document.createElement("style");
    e2.textContent = t2, document.head.append(e2);
  }
  static addToDom(t2, e2) {
    var i2, s2;
    const n2 = t2.callback(), a2 = document.createElement("span");
    a2.classList.add("ue-interface-items"), a2.id = `item-${e2}`, a2.innerText = n2, Object.entries(t2.options || {}).forEach(([t3, e3]) => a2.style[t3] = e3), t2.position ? (i2 = document.querySelector(`.ue-container > .${t2.position}`)) == null || i2.appendChild(a2) : (s2 = document.querySelector(".ue-container > .custom")) == null || s2.appendChild(a2), t2.onClick && (a2.addEventListener("click", (e3) => t2.onClick(e3)), a2.classList.add("ue-interface-button"));
  }
  static update() {
    st.forEach((t2, e2) => {
      const i2 = t2.callback(), s2 = document.querySelector(`.ue-interface #item-${e2 + 1}`);
      s2 && s2.innerText !== i2 && (s2.innerText = i2);
    });
  }
  static statsShift(t2) {
    const e2 = document.querySelector(".top-left");
    e2 && (e2.style.top = `${t2}px`);
  }
  static setUpdateInterval(t2) {
    nt = t2;
  }
  static get updateInterval() {
    return nt;
  }
}
function ot() {
  const t2 = new H(), e2 = document.createElement("div");
  return e2.classList.toggle("stats"), t2.showPanel(0), e2.appendChild(t2.dom), document.body.appendChild(e2), lt.statsShift(48), t2;
}
class ct {
  constructor(t2, e2 = 60) {
    if (this.requestId = 0, this.animate = t2, this.fps = e2, !window)
      throw new I("No window context", "core");
  }
  start() {
    let t2 = R();
    const e2 = 1e3 / this.fps, i2 = (s2) => {
      this.requestId = window.requestAnimationFrame(i2);
      const n2 = s2 - t2;
      n2 >= e2 - 0.1 && (t2 = s2 - n2 % e2, this.animate(n2));
    };
    this.requestId = window.requestAnimationFrame(i2);
  }
  stop() {
    window.cancelAnimationFrame(this.requestId);
  }
}
let rt = "normal";
class dt {
  constructor(t2, e2, i2 = 60) {
    this.fps = 60, this.name = t2, this.env = e2, this.tick = 0, this.stats = null, this.showStatsPanel = true, this.gameLoop = this.env ? () => e2.update() : null, this.fps = i2;
  }
  static setRendererType(t2) {
    rt = t2;
  }
  static get rendererType() {
    return rt;
  }
  toggleStats(t2) {
    this.showStatsPanel = t2 !== void 0 ? t2 : !this.showStatsPanel, this.showStatsPanel ? this.stats = ot() : (this.stats = null, document.querySelector(".stats") && document.querySelector(".stats").remove());
  }
  makeAnimationFrame() {
    this.animationFrame = new ct((t2) => this.update(t2), this.fps);
  }
  setMainLoop(t2) {
    this.gameLoop = t2, this.makeAnimationFrame();
  }
  setFPS(t2) {
    this.fps = t2, this.makeAnimationFrame();
  }
  update(t2) {
    var e2, i2;
    (e2 = this.stats) == null || e2.begin(), X.tick(), Y.tick(t2), this.gameLoop && this.gameLoop(t2), this.tick % lt.updateInterval == 0 && lt.update(), (i2 = this.stats) == null || i2.end(), this.tick++;
  }
  start() {
    if (!this.gameLoop)
      throw new Error("No game loop");
    if (!this.animationFrame)
      throw new Error("AnimationFrame");
    window.addEventListener("DOMContentLoaded", () => {
      var t2;
      this.name && (document.title = this.name), X.init(), Y.init(), lt.init(), this.showStatsPanel && (this.stats = ot()), (t2 = this.animationFrame) == null || t2.start();
    });
  }
}
const ft = { linear: (t2) => t2, smoothStep: (t2) => (3 - 2 * t2) * t2 ** 2, smootherStep: (t2) => (6 * t2 * t2 - 15 * t2 + 10) * t2 ** 3, easeIn: (t2) => t2 ** 2, easeOut: (t2) => 1 - (1 - t2) ** 2, easeInOut: (t2) => t2 < 0.5 ? 2 * t2 * t2 : 1 - Math.pow(-2 * t2 + 2, 2) / 2, easeInBack: (t2) => 2.70158 * t2 ** 3 - 1.70158 * t2 ** 2, easeOutBack: (t2) => 1 + 1.70158 * Math.pow(t2 - 1, 3) + 2.70158 * Math.pow(t2 - 1, 2), easeInOutBack: (t2) => t2 < 0.5 ? Math.pow(2 * t2, 2) * (7.189819 * t2 - 2.5949095) / 2 : (Math.pow(2 * t2 - 2, 2) * (3.5949095 * (2 * t2 - 2) + 2.5949095) + 2) / 2 }, gt = { autostart: false, loop: false };
class Gt {
  constructor(t2, e2, i2, s2 = ft.linear, n2 = {}) {
    if (this.hasStarted = false, this.isPaused = false, this.isEnded = false, this.isReversed = false, this.lastT = 0, this.from = t2, this.to = e2, this.duration = i2, s2 instanceof Function)
      this.easing = s2;
    else {
      if (typeof s2 != "string" || !(s2 in ft))
        throw new I("Unknow easing parameter", "animation");
      this.easing = ft[s2];
    }
    this.options = o(o({}, gt), n2), this.value = this.from, this.speed = (this.to - this.from) / this.duration, Y.add(this);
  }
  start() {
    this.isEnded = false, this.hasStarted = true;
  }
  reset() {
    this.lastT = 0, this.isPaused = false;
  }
  toggle(t2) {
    t2 !== void 0 && (t2 ? this.pause() : this.resume()), this.isPaused ? this.resume() : this.pause();
  }
  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
  }
  update(t2) {
    if (!this.hasStarted || this.isPaused)
      return;
    let e2 = p(0, this.lastT + t2 * this.speed / Math.abs(this.to - this.from), 1);
    if (e2 >= 1 || e2 <= 0) {
      if (!this.options.loop)
        return void (this.isEnded = true);
      this.speed *= -1, this.isReversed = !this.isReversed;
    }
    this.lastT = e2, this.value = this.from + (this.to - this.from) * this.easing(e2);
  }
  get isRunning() {
    return !(this.isEnded || this.isPaused);
  }
}

const { width, height } = y();
const NB_TEST = 4;
const offset = 25;
const dimension = (width - 2 * NB_TEST * offset) / NB_TEST;
let linear_x = new Gt(0, dimension, 2e3, ft.linear, { autostart: true, loop: true });
let linear_y = new Gt(dimension, 0, 2e3, "linear", { autostart: true, loop: true });
let easeIn_y = new Gt(dimension, 0, 2e3, "easeIn", { autostart: true, loop: true });
let easeOut_y = new Gt(dimension, 0, 2e3, ft.easeOut, { autostart: true, loop: true });
let easeInOut_y = new Gt(dimension, 0, 2e3, ft.easeInOutBack, { autostart: true, loop: true });
let speed = new Gt(0, width - 2 * offset, 2500, ft.easeInOut, { autostart: true, loop: true });
let speed2 = new Gt(0, width - 2 * offset, 2500, ft.linear, { autostart: true, loop: true });
let speed3 = new Gt(0, width - 2 * offset, 2500, ft.easeIn, { autostart: true, loop: true });
function draw(ts) {
  B.clear();
  B.text("Linear", offset, offset + dimension + 20, { size: 16 });
  B.rect(offset, offset, dimension, dimension, { lineWidth: 0.5 });
  B.circle(offset + linear_x.value, offset + linear_y.value, 0.5);
  B.rect(dimension + 2 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  B.circle(dimension + 2 * offset + linear_x.value, offset + easeIn_y.value, 1);
  B.rect(2 * dimension + 3 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  B.circle(2 * dimension + 3 * offset + linear_x.value, offset + easeOut_y.value, 1);
  B.rect(3 * dimension + 4 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  B.circle(3 * dimension + 4 * offset + linear_x.value, offset + easeInOut_y.value, 1);
  B.circle(offset + speed.value, height / 2, 10);
  B.circle(offset + speed2.value, height / 2 + 25, 10);
  B.circle(offset + speed3.value, height / 2 + 50, 10);
}
let pause = false;
lt.addButton(() => pause ? "||" : ">", (e) => {
  pause = !pause;
  linear_x.toggle();
  linear_y.toggle();
});
lt.addButton(() => "Reset", (e) => {
  linear_x.reset();
  linear_y.reset();
});
const game = new dt("Animation Test");
B.create();
game.setMainLoop(draw);
game.toggleStats();
game.setFPS(60);
game.start();
