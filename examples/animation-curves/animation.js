var t = Object.defineProperty, e = Object.defineProperties, s = Object.getOwnPropertyDescriptors, i = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable, a = (e2, s2, i2) => s2 in e2 ? t(e2, s2, { enumerable: true, configurable: true, writable: true, value: i2 }) : e2[s2] = i2, o = (t2, e2) => {
  for (var s2 in e2 || (e2 = {}))
    n.call(e2, s2) && a(t2, s2, e2[s2]);
  if (i)
    for (var s2 of i(e2))
      l.call(e2, s2) && a(t2, s2, e2[s2]);
  return t2;
}, d = (t2, i2) => e(t2, s(i2));
class r {
  constructor(t2, e2) {
    this.x = t2, this.y = e2;
  }
  clone() {
    return new r(this.x, this.y);
  }
  add(t2) {
    return new r(this.x + t2.x, this.y + t2.y);
  }
  multiply(t2) {
    return new r(this.x * t2, this.y * t2);
  }
  dot(t2) {
    return this.x * t2.x + this.y * t2.y;
  }
  dist(t2) {
    return Math.sqrt((this.x - t2.x) ** 2 + (this.y - t2.y) ** 2);
  }
}
const u = new r(0, 0), p = new r(1, 1);
function y(t2, e2, s2) {
  return t2 > s2 ? y(s2, e2, t2) : Math.max(t2, Math.min(e2, s2));
}
class G {
  constructor(t2, e2, s2, i2) {
    this.x = t2, this.y = e2, this.width = s2, this.height = i2;
  }
}
function Z() {
  return { width: window.innerWidth, height: window.innerHeight };
}
function x(t2) {
  return { width: t2.clientWidth || t2.width, height: t2.clientHeight || t2.height };
}
function L(t2, e2, s2, i2) {
  t2.width = e2 * (i2 || window.devicePixelRatio || 1), t2.height = s2 * (i2 || window.devicePixelRatio || 1), t2.style.width = e2 + "px", t2.style.height = s2 + "px";
}
function W(t2, e2, s2, i2) {
  const n2 = document.createElement("canvas");
  return f(n2, t2, e2, s2), i2 && (n2.oncontextmenu = (t3) => t3.preventDefault()), n2;
}
function f(t2, e2, s2, i2) {
  const n2 = i2 || window.devicePixelRatio || 1;
  L(t2, e2 || x(t2).width, s2 || x(t2).height, n2), n2 != 1 && t2.getContext("2d").setTransform(n2, 0, 0, n2, 0, 0);
}
function X(t2, e2) {
  window.addEventListener("DOMContentLoaded", () => {
    var s2;
    const i2 = (s2 = document.querySelector(e2)) != null ? s2 : document.createElement(e2);
    i2.appendChild(t2), document.querySelector("body").appendChild(i2);
  });
}
function S() {
  return self.document == null && self.window == null;
}
function g() {
  return performance.now() || Date.now();
}
function v(t2) {
  return window && t2 in window;
}
function C() {
  return /complete|interactive|loaded/.test(document.readyState);
}
var V, K;
(K = V || (V = {}))[K.KeyboardPressed = 0] = "KeyboardPressed", K[K.KeyboardDown = 1] = "KeyboardDown", K[K.Mouse = 2] = "Mouse", K[K.Window = 3] = "Window", K[K.Custom = 4] = "Custom", K[K.All = 5] = "All";
const k = new class {
  constructor() {
    this.windowEvents = [], this.customEvents = [], this.mouseEvents = [], this.keyboardEvents = [], this.currentKeyEvents = [];
  }
  init() {
    window.addEventListener("keydown", (t2) => {
      this.currentKeyEvents.find((e2) => e2.code === t2.code) || this.currentKeyEvents.push(t2), this.keyboardEvents.filter((t3) => t3.type === V.KeyboardPressed).forEach((e2) => {
        t2.code === e2.name && e2.callback(t2);
      });
    }), window.addEventListener("keyup", (t2) => {
      this.currentKeyEvents.length && (this.currentKeyEvents = this.currentKeyEvents.filter((e2) => e2.code !== t2.code));
    }), this.bindEvents();
  }
  addEvent(t2) {
    switch (t2.type) {
      case V.KeyboardDown:
      case V.KeyboardPressed:
        this.keyboardEvents.push(t2);
        break;
      case V.Mouse:
        this.mouseEvents.push(t2), window.addEventListener(t2.name, (e2) => t2.callback(e2));
        break;
      case V.Window:
        this.windowEvents.push(t2), this.bindEvents();
        break;
      case V.Custom:
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
    this.currentKeyEvents.length && this.keyboardEvents.filter((t2) => t2.type === V.KeyboardDown).forEach((t2) => {
      this.currentKeyEvents.forEach((e2) => {
        e2.code === t2.name && t2.callback(e2);
      });
    });
  }
}();
const H = new class {
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
var F, z = ((F = function() {
  function t2(t3) {
    return i2.appendChild(t3.dom), t3;
  }
  function e2(t3) {
    for (var e3 = 0; e3 < i2.children.length; e3++)
      i2.children[e3].style.display = e3 === t3 ? "block" : "none";
    s2 = t3;
  }
  var s2 = 0, i2 = document.createElement("div");
  i2.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", i2.addEventListener("click", function(t3) {
    t3.preventDefault(), e2(++s2 % i2.children.length);
  }, false);
  var n2 = (performance || Date).now(), l2 = n2, a2 = 0, o2 = t2(new F.Panel("FPS", "#0ff", "#002")), d2 = t2(new F.Panel("MS", "#0f0", "#020"));
  if (self.performance && self.performance.memory)
    var c2 = t2(new F.Panel("MB", "#f08", "#201"));
  return e2(0), { REVISION: 16, dom: i2, addPanel: t2, showPanel: e2, begin: function() {
    n2 = (performance || Date).now();
  }, end: function() {
    a2++;
    var t3 = (performance || Date).now();
    if (d2.update(t3 - n2, 200), t3 > l2 + 1e3 && (o2.update(1e3 * a2 / (t3 - l2), 100), l2 = t3, a2 = 0, c2)) {
      var e3 = performance.memory;
      c2.update(e3.usedJSHeapSize / 1048576, e3.jsHeapSizeLimit / 1048576);
    }
    return t3;
  }, update: function() {
    n2 = this.end();
  }, domElement: i2, setMode: e2 };
}).Panel = function(t2, e2, s2) {
  var i2 = 1 / 0, n2 = 0, l2 = Math.round, a2 = l2(window.devicePixelRatio || 1), o2 = 80 * a2, d2 = 48 * a2, c2 = 3 * a2, h2 = 2 * a2, r2 = 3 * a2, m2 = 15 * a2, u2 = 74 * a2, p2 = 30 * a2, y2 = document.createElement("canvas");
  y2.width = o2, y2.height = d2, y2.style.cssText = "width:80px;height:48px";
  var b2 = y2.getContext("2d");
  return b2.font = "bold " + 9 * a2 + "px Helvetica,Arial,sans-serif", b2.textBaseline = "top", b2.fillStyle = s2, b2.fillRect(0, 0, o2, d2), b2.fillStyle = e2, b2.fillText(t2, c2, h2), b2.fillRect(r2, m2, u2, p2), b2.fillStyle = s2, b2.globalAlpha = 0.9, b2.fillRect(r2, m2, u2, p2), { dom: y2, update: function(d3, G2) {
    i2 = Math.min(i2, d3), n2 = Math.max(n2, d3), b2.fillStyle = s2, b2.globalAlpha = 1, b2.fillRect(0, 0, o2, m2), b2.fillStyle = e2, b2.fillText(l2(d3) + " " + t2 + " (" + l2(i2) + "-" + l2(n2) + ")", c2, h2), b2.drawImage(y2, r2 + a2, m2, u2 - a2, p2, r2, m2, u2 - a2, p2), b2.fillRect(r2 + u2 - a2, m2, a2, p2), b2.fillStyle = s2, b2.globalAlpha = 0.9, b2.fillRect(r2 + u2 - a2, m2, a2, l2((1 - d3 / G2) * p2));
  } };
}, F);
let M = 0;
class N {
  constructor(t2, e2) {
    if (this.isLoaded = false, !t2)
      throw new Error("A source path to the resource must be provided");
    this.id = M++, this.image = new Image(), this.image.src = t2, this.image.onload = () => {
      this.isLoaded = true, this.onLoad();
    }, this.size = { width: this.image.width, height: this.image.height }, this.rotation = (e2 == null ? void 0 : e2.rotation) || 0, this.offset = (e2 == null ? void 0 : e2.offset) || u, this.scale = (e2 == null ? void 0 : e2.scale) || p;
  }
  async convertToBitmap() {
    if (!this.image.width || !this.image.height)
      return;
    const t2 = await createImageBitmap(this.image);
    return d(o({}, this), { image: t2 });
  }
  onLoad() {
  }
}
let U = [], J = 4;
const T = ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
class Q {
  static addItem(t2, e2, s2) {
    Q.internalAddItem(t2, e2, s2);
  }
  static addButton(t2, e2, s2, i2) {
    Q.internalAddItem(t2, s2, i2, e2);
  }
  static internalAddItem(t2, e2, s2, i2) {
    const n2 = { callback: typeof t2 == "string" ? () => t2 : t2, position: e2, options: s2, onClick: i2 };
    U.push(n2);
    const l2 = U.length;
    C() ? Q.addToDom(n2, l2) : window.addEventListener("load", () => Q.addToDom(n2, l2));
  }
  static init() {
    Q.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    z-index: 10;\n    image-rendering: pixelated;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n    /* Make the click event pass through */\n    pointer-events: none;\n}\n\n.ue-container>div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container>.top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container>.top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container>.bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container>.bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n    pointer-events: all;\n}');
    const t2 = document.createElement("div");
    t2.classList.add("ue-interface", "ue-container");
    for (let e2 of T) {
      const s2 = document.createElement("div");
      s2.classList.add(e2), t2.appendChild(s2);
    }
    document.body.appendChild(t2);
  }
  static addStyle(t2) {
    const e2 = document.createElement("style");
    e2.textContent = t2, document.head.append(e2);
  }
  static addToDom(t2, e2) {
    var s2, i2;
    const n2 = t2.callback(), l2 = document.createElement("span");
    l2.classList.add("ue-interface-items"), l2.id = `item-${e2}`, l2.innerText = n2, Object.entries(t2.options || {}).forEach(([t3, e3]) => l2.style[t3] = e3), t2.position ? (s2 = document.querySelector(`.ue-container > .${t2.position}`)) == null || s2.appendChild(l2) : (i2 = document.querySelector(".ue-container > .custom")) == null || i2.appendChild(l2), t2.onClick && (l2.addEventListener("click", (e3) => t2.onClick(e3)), l2.classList.add("ue-interface-button"));
  }
  static update() {
    U.forEach((t2, e2) => {
      const s2 = t2.callback(), i2 = document.querySelector(`.ue-interface #item-${e2 + 1}`);
      i2 && i2.innerText !== s2 && (i2.innerText = s2);
    });
  }
  static statsShift(t2) {
    const e2 = document.querySelector(".top-left");
    e2 && (e2.style.top = `${t2}px`);
  }
  static setUpdateInterval(t2) {
    J = t2;
  }
  static get updateInterval() {
    return J;
  }
  static getItems() {
    return U;
  }
}
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
class E extends Error {
  constructor(t2, e2) {
    super(e2 ? `[${e2.capitalize()}] - ${t2}` : t2), this.name = "EngineFailure";
  }
}
class j extends E {
  constructor(t2) {
    super(t2, "renderer");
  }
}
const B = { interval: 200, loop: false };
class D extends N {
  constructor(t2, e2, s2, i2) {
    if (super(t2.spriteSheetPath), this.intervalId = -1, this.isAnimated = false, this.lastRunTimeStamp = 0, this.spriteSheet = t2, e2[0] < 1 || e2[1] < 1 || s2[0] < 1 || s2[1] < 1 || e2[0] > t2.cols || e2[1] > t2.rows || s2[0] > t2.cols || s2[1] > t2.rows)
      throw new E("Invalid tuples : the stylesheet coordinate starts at (1, 1)");
    this.from = e2, this.to = s2;
    let n2 = o(o({}, B), i2);
    this.interval = n2.interval, this.loop = n2.loop, this.spriteWidth = this.size.width / t2.cols, this.spriteHeight = this.size.height / t2.rows, this.coordX = this.from[0], this.coordY = this.from[1];
  }
  run() {
    let t2 = g();
    t2 - this.lastRunTimeStamp > this.interval && (this.step(), this.lastRunTimeStamp = t2);
  }
  animate() {
    this.isAnimated || (this.intervalId = window.setInterval(() => this.step(), this.interval), this.isAnimated = true);
  }
  pause() {
    this.isAnimated && (window.clearInterval(this.intervalId), this.isAnimated = false);
  }
  reset() {
    this.coordX = this.from[0], this.coordY = this.from[1];
  }
  stop() {
    this.pause(), this.reset();
  }
  setInterval(t2) {
    this.interval = t2, this.isAnimated && (window.clearInterval(this.intervalId), this.animate());
  }
  step() {
    this.coordX !== this.to[0] || this.coordY !== this.to[1] ? this.coordY < this.to[1] ? this.coordX < this.spriteSheet.cols ? this.coordX++ : (this.coordY++, this.coordX = this.from[0]) : this.coordX < this.to[0] && this.coordX++ : this.loop && (this.coordX = this.from[0], this.coordY = this.from[1]);
  }
  spriteBox() {
    return new G((this.coordX - 1) * this.spriteWidth, (this.coordY - 1) * this.spriteHeight, this.spriteWidth, this.spriteHeight);
  }
}
const A = { strokeStyle: "black", lineWidth: 2, lineJoin: "round", lineCap: "round", fillStyle: "transparent", globalAlpha: 1, globalCompositeOperation: "add" }, O = { font: "Roboto", size: 16, color: "black", textAlign: "left", textBaseline: "alphabetic" }, q = 2 * Math.PI;
let $, _, tt, et, st, it = S() ? 4 : 2 * (window.devicePixelRatio || 1), nt = u;
function lt(t2) {
  return ~~(t2 * it) / it;
}
class at {
  static create(t2, e2) {
    let [s2, i2] = [Z().width, Z().height];
    const n2 = W(t2 || s2, e2 || i2);
    return X(n2, "main"), at.setContext(n2.getContext("2d")), n2;
  }
  static createFromCanvas(t2) {
    let e2 = document.querySelector(t2);
    if (!(e2 && e2 instanceof HTMLCanvasElement))
      throw new j("The selected element is not a canvas");
    return f(e2), at.setContext(e2.getContext("2d")), e2;
  }
  static setContext(t2) {
    $ = t2;
  }
  static getContext() {
    return $;
  }
  static setOffset(t2, e2) {
    nt = new r(t2, e2);
  }
  static getOffset() {
    return nt;
  }
  static style(t2) {
    if (!$)
      throw new j("Context has not been initialize. Please use Renderer.setContext");
    const e2 = o(o({}, A), t2);
    if (e2 !== _) {
      for (let t3 in e2)
        $[t3] !== e2[t3] && ($[t3] = e2[t3]);
      _ = e2;
    }
  }
  static textStyle(t2) {
    if ($) {
      let e2 = o(o({}, O), t2);
      $.font = `${e2.size}px ${e2.font}`, delete e2.size, delete e2.font, at.style(o({ fillStyle: e2.color }, e2));
    }
  }
  static clear(t2) {
    t2 ? (at.style({ fillStyle: t2 }), $.fillRect(0, 0, $.canvas.width, $.canvas.height)) : $.clearRect(0, 0, $.canvas.width, $.canvas.height);
  }
  static line(t2, e2, s2, i2, n2) {
    at.style(n2), $.beginPath(), $.moveTo(lt(nt.x + t2), lt(nt.y + e2)), $.lineTo(lt(nt.x + s2), lt(nt.y + i2)), $.stroke();
  }
  static rect(t2, e2, s2, i2, n2) {
    at.style(n2);
    const [l2, a2, o2, d2] = [lt(t2 + nt.x), lt(e2 + nt.y), lt(s2), lt(i2)];
    $.fillRect(l2, a2, o2, d2), $.strokeRect(l2, a2, o2, d2);
  }
  static rectFromCenter(t2, e2, s2, i2, n2) {
    return at.rect(t2 - s2 / 2, e2 - i2 / 2, s2, i2, n2);
  }
  static rectFromPoints(t2, e2, s2, i2, n2) {
    return at.rect(t2, e2, s2 - t2, i2 - e2, n2);
  }
  static poly(t2, e2) {
    if (t2.length) {
      at.style(e2), $.beginPath(), $.moveTo(lt(t2[0].x + nt.x), lt(t2[0].y + nt.y));
      for (let e3 = 1; e3 < t2.length; e3++)
        $.lineTo(lt(t2[e3].x + nt.x), lt(t2[e3].y + nt.y));
      $.stroke();
    }
  }
  static circle(t2, e2, s2, i2) {
    at.style(i2), $.beginPath(), $.arc(lt(t2 + nt.x), lt(e2 + nt.y), s2, 0, q), $.fill(), $.stroke();
  }
  static circleFromRect(t2, e2, s2, i2, n2) {
    return at.circle(t2 + s2 / 2, e2 + i2 / 2, Math.min(s2, i2) / 2, n2);
  }
  static point(t2, e2, s2) {
    at.circle(t2, e2, 5, s2);
  }
  static rectSprite(t2, e2, s2, i2, n2) {
    if (!n2.isLoaded)
      return;
    at.style({}), $.save(), $.translate(lt(t2 + s2 / 2 + nt.x), lt(e2 + i2 / 2 + nt.y)), $.scale(n2.scale.x, n2.scale.y), $.rotate(n2.rotation);
    let l2 = new G(0, 0, n2.size.width, n2.size.height);
    n2 instanceof D && (l2 = n2.spriteBox()), $.drawImage(n2.image, l2.x, l2.y, l2.width, l2.height, lt(s2 * n2.offset.x - s2 / 2), lt(i2 * n2.offset.y - i2 / 2), lt(s2), lt(i2)), $.restore();
  }
  static circleSprite(t2, e2, s2, i2) {
    i2.isLoaded && ($.save(), $.beginPath(), $.arc(lt(t2 + nt.x), lt(e2 + nt.y), s2, 0, q), $.clip(), at.rectSprite(t2 - s2, e2 - s2, 2 * s2, 2 * s2, i2), $.restore());
  }
  static text(t2, e2, s2, i2) {
    at.textStyle(i2), $.fillText(t2, e2, s2);
  }
  static centeredText(t2, e2, s2, i2) {
    at.text(t2, e2, s2, d(o({}, i2), { textAlign: "center", textBaseline: "middle" }));
  }
  static tint(t2, e2, s2, i2, n2) {
    at.rect(e2, s2, i2, n2, { fillStyle: t2, globalCompositeOperation: "multiply", globalAlpha: 0.25 });
  }
  static beginFrame(t2) {
    at.clear(t2);
  }
  static endFrame() {
  }
}
class ot {
  constructor(t2, e2) {
    this.title = t2, this.content = e2;
  }
}
class dt {
  constructor(t2, e2) {
    this.methodName = t2, this.args = e2;
  }
}
function ct() {
  return new Worker("data:application/javascript;base64,dmFyIHQ9T2JqZWN0LmRlZmluZVByb3BlcnR5LGU9T2JqZWN0LmRlZmluZVByb3BlcnRpZXMsaT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyxzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMscj1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LG89T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxuPShlLGkscyk9PmkgaW4gZT90KGUsaSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6c30pOmVbaV09cyxhPSh0LGUpPT57Zm9yKHZhciBpIGluIGV8fChlPXt9KSlyLmNhbGwoZSxpKSYmbih0LGksZVtpXSk7aWYocylmb3IodmFyIGkgb2YgcyhlKSlvLmNhbGwoZSxpKSYmbih0LGksZVtpXSk7cmV0dXJuIHR9LGM9KHQscyk9PmUodCxpKHMpKTtjbGFzcyBoe2NvbnN0cnVjdG9yKHQsZSxpLHMpe3RoaXMueD10LHRoaXMueT1lLHRoaXMud2lkdGg9aSx0aGlzLmhlaWdodD1zfX1mdW5jdGlvbiBsKCl7cmV0dXJue3dpZHRoOndpbmRvdy5pbm5lcldpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9fWZ1bmN0aW9uIGQodCl7cmV0dXJue3dpZHRoOnQuY2xpZW50V2lkdGh8fHQud2lkdGgsaGVpZ2h0OnQuY2xpZW50SGVpZ2h0fHx0LmhlaWdodH19ZnVuY3Rpb24gdSh0LGUsaSxzKXtjb25zdCByPXN8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxOyFmdW5jdGlvbih0LGUsaSxzKXt0LndpZHRoPWUqKHN8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKSx0LmhlaWdodD1pKihzfHx3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSksdC5zdHlsZS53aWR0aD1lKyJweCIsdC5zdHlsZS5oZWlnaHQ9aSsicHgifSh0LGV8fGQodCkud2lkdGgsaXx8ZCh0KS5oZWlnaHQsciksMSE9ciYmdC5nZXRDb250ZXh0KCIyZCIpLnNldFRyYW5zZm9ybShyLDAsMCxyLDAsMCl9Y2xhc3MgeHtjb25zdHJ1Y3Rvcih0LGUpe3RoaXMueD10LHRoaXMueT1lfWNsb25lKCl7cmV0dXJuIG5ldyB4KHRoaXMueCx0aGlzLnkpfWFkZCh0KXtyZXR1cm4gbmV3IHgodGhpcy54K3QueCx0aGlzLnkrdC55KX1tdWx0aXBseSh0KXtyZXR1cm4gbmV3IHgodGhpcy54KnQsdGhpcy55KnQpfWRvdCh0KXtyZXR1cm4gdGhpcy54KnQueCt0aGlzLnkqdC55fWRpc3QodCl7cmV0dXJuIE1hdGguc3FydCgodGhpcy54LXQueCkqKjIrKHRoaXMueS10LnkpKioyKX19Y29uc3QgcD1uZXcgeCgwLDApLGY9bmV3IHgoMSwxKTtTdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0aGlzLnNsaWNlKDEpfTtjbGFzcyBtIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IodCxlKXtzdXBlcihlP2BbJHtlLmNhcGl0YWxpemUoKX1dIC0gJHt0fWA6dCksdGhpcy5uYW1lPSJFbmdpbmVGYWlsdXJlIn19Y2xhc3MgdyBleHRlbmRzIG17Y29uc3RydWN0b3IodCl7c3VwZXIodCwicmVuZGVyZXIiKX19bGV0IGc9MDtjb25zdCB5PXtpbnRlcnZhbDoyMDAsbG9vcDohMX07Y29uc3Qgdj17c3Ryb2tlU3R5bGU6ImJsYWNrIixsaW5lV2lkdGg6MixsaW5lSm9pbjoicm91bmQiLGxpbmVDYXA6InJvdW5kIixmaWxsU3R5bGU6InRyYW5zcGFyZW50IixnbG9iYWxBbHBoYToxLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoiYWRkIn0sYj17Zm9udDoiUm9ib3RvIixzaXplOjE2LGNvbG9yOiJibGFjayIsdGV4dEFsaWduOiJsZWZ0Iix0ZXh0QmFzZWxpbmU6ImFscGhhYmV0aWMifSxDPTIqTWF0aC5QSTtsZXQgUyxULGs9bnVsbD09c2VsZi5kb2N1bWVudCYmbnVsbD09c2VsZi53aW5kb3c/NDoyKih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSksUj1wO2Z1bmN0aW9uIFAodCl7cmV0dXJufn4odCprKS9rfWNsYXNzIGp7c3RhdGljIGNyZWF0ZSh0LGUpe2xldFtpLHNdPVtsKCkud2lkdGgsbCgpLmhlaWdodF07Y29uc3Qgcj1mdW5jdGlvbih0LGUsaSxzKXtjb25zdCByPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImNhbnZhcyIpO3JldHVybiB1KHIsdCxlLGkpLHMmJihyLm9uY29udGV4dG1lbnU9dD0+dC5wcmV2ZW50RGVmYXVsdCgpKSxyfSh0fHxpLGV8fHMpO3JldHVybiBmdW5jdGlvbih0LGUpe3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJET01Db250ZW50TG9hZGVkIiwoKCk9Pnt2YXIgaTtjb25zdCBzPW51bGwhPShpPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSkpP2k6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlKTtzLmFwcGVuZENoaWxkKHQpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChzKX0pKX0ociwibWFpbiIpLGouc2V0Q29udGV4dChyLmdldENvbnRleHQoIjJkIikpLHJ9c3RhdGljIGNyZWF0ZUZyb21DYW52YXModCl7bGV0IGU9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTtpZighKGUmJmUgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpdGhyb3cgbmV3IHcoIlRoZSBzZWxlY3RlZCBlbGVtZW50IGlzIG5vdCBhIGNhbnZhcyIpO3JldHVybiB1KGUpLGouc2V0Q29udGV4dChlLmdldENvbnRleHQoIjJkIikpLGV9c3RhdGljIHNldENvbnRleHQodCl7Uz10fXN0YXRpYyBnZXRDb250ZXh0KCl7cmV0dXJuIFN9c3RhdGljIHNldE9mZnNldCh0LGUpe1I9bmV3IHgodCxlKX1zdGF0aWMgZ2V0T2Zmc2V0KCl7cmV0dXJuIFJ9c3RhdGljIHN0eWxlKHQpe2lmKCFTKXRocm93IG5ldyB3KCJDb250ZXh0IGhhcyBub3QgYmVlbiBpbml0aWFsaXplLiBQbGVhc2UgdXNlIFJlbmRlcmVyLnNldENvbnRleHQiKTtjb25zdCBlPWEoYSh7fSx2KSx0KTtpZihlIT09VCl7Zm9yKGxldCB0IGluIGUpU1t0XSE9PWVbdF0mJihTW3RdPWVbdF0pO1Q9ZX19c3RhdGljIHRleHRTdHlsZSh0KXtpZihTKXtsZXQgZT1hKGEoe30sYiksdCk7Uy5mb250PWAke2Uuc2l6ZX1weCAke2UuZm9udH1gLGRlbGV0ZSBlLnNpemUsZGVsZXRlIGUuZm9udCxqLnN0eWxlKGEoe2ZpbGxTdHlsZTplLmNvbG9yfSxlKSl9fXN0YXRpYyBjbGVhcih0KXt0PyhqLnN0eWxlKHtmaWxsU3R5bGU6dH0pLFMuZmlsbFJlY3QoMCwwLFMuY2FudmFzLndpZHRoLFMuY2FudmFzLmhlaWdodCkpOlMuY2xlYXJSZWN0KDAsMCxTLmNhbnZhcy53aWR0aCxTLmNhbnZhcy5oZWlnaHQpfXN0YXRpYyBsaW5lKHQsZSxpLHMscil7ai5zdHlsZShyKSxTLmJlZ2luUGF0aCgpLFMubW92ZVRvKFAoUi54K3QpLFAoUi55K2UpKSxTLmxpbmVUbyhQKFIueCtpKSxQKFIueStzKSksUy5zdHJva2UoKX1zdGF0aWMgcmVjdCh0LGUsaSxzLHIpe2ouc3R5bGUocik7Y29uc3RbbyxuLGEsY109W1AodCtSLngpLFAoZStSLnkpLFAoaSksUChzKV07Uy5maWxsUmVjdChvLG4sYSxjKSxTLnN0cm9rZVJlY3QobyxuLGEsYyl9c3RhdGljIHJlY3RGcm9tQ2VudGVyKHQsZSxpLHMscil7cmV0dXJuIGoucmVjdCh0LWkvMixlLXMvMixpLHMscil9c3RhdGljIHJlY3RGcm9tUG9pbnRzKHQsZSxpLHMscil7cmV0dXJuIGoucmVjdCh0LGUsaS10LHMtZSxyKX1zdGF0aWMgcG9seSh0LGUpe2lmKHQubGVuZ3RoKXtqLnN0eWxlKGUpLFMuYmVnaW5QYXRoKCksUy5tb3ZlVG8oUCh0WzBdLngrUi54KSxQKHRbMF0ueStSLnkpKTtmb3IobGV0IGU9MTtlPHQubGVuZ3RoO2UrKylTLmxpbmVUbyhQKHRbZV0ueCtSLngpLFAodFtlXS55K1IueSkpO1Muc3Ryb2tlKCl9fXN0YXRpYyBjaXJjbGUodCxlLGkscyl7ai5zdHlsZShzKSxTLmJlZ2luUGF0aCgpLFMuYXJjKFAodCtSLngpLFAoZStSLnkpLGksMCxDKSxTLmZpbGwoKSxTLnN0cm9rZSgpfXN0YXRpYyBjaXJjbGVGcm9tUmVjdCh0LGUsaSxzLHIpe3JldHVybiBqLmNpcmNsZSh0K2kvMixlK3MvMixNYXRoLm1pbihpLHMpLzIscil9c3RhdGljIHBvaW50KHQsZSxpKXtqLmNpcmNsZSh0LGUsNSxpKX1zdGF0aWMgcmVjdFNwcml0ZSh0LGUsaSxzLHIpe2lmKCFyLmlzTG9hZGVkKXJldHVybjtqLnN0eWxlKHt9KSxTLnNhdmUoKSxTLnRyYW5zbGF0ZShQKHQraS8yK1IueCksUChlK3MvMitSLnkpKSxTLnNjYWxlKHIuc2NhbGUueCxyLnNjYWxlLnkpLFMucm90YXRlKHIucm90YXRpb24pO2xldCBvPW5ldyBoKDAsMCxyLnNpemUud2lkdGgsci5zaXplLmhlaWdodCk7ciBpbnN0YW5jZW9mIGNsYXNzIGV4dGVuZHMgY2xhc3N7Y29uc3RydWN0b3IodCxlKXtpZih0aGlzLmlzTG9hZGVkPSExLCF0KXRocm93IG5ldyBFcnJvcigiQSBzb3VyY2UgcGF0aCB0byB0aGUgcmVzb3VyY2UgbXVzdCBiZSBwcm92aWRlZCIpO3RoaXMuaWQ9ZysrLHRoaXMuaW1hZ2U9bmV3IEltYWdlLHRoaXMuaW1hZ2Uuc3JjPXQsdGhpcy5pbWFnZS5vbmxvYWQ9KCk9Pnt0aGlzLmlzTG9hZGVkPSEwLHRoaXMub25Mb2FkKCl9LHRoaXMuc2l6ZT17d2lkdGg6dGhpcy5pbWFnZS53aWR0aCxoZWlnaHQ6dGhpcy5pbWFnZS5oZWlnaHR9LHRoaXMucm90YXRpb249KG51bGw9PWU/dm9pZCAwOmUucm90YXRpb24pfHwwLHRoaXMub2Zmc2V0PShudWxsPT1lP3ZvaWQgMDplLm9mZnNldCl8fHAsdGhpcy5zY2FsZT0obnVsbD09ZT92b2lkIDA6ZS5zY2FsZSl8fGZ9YXN5bmMgY29udmVydFRvQml0bWFwKCl7aWYoIXRoaXMuaW1hZ2Uud2lkdGh8fCF0aGlzLmltYWdlLmhlaWdodClyZXR1cm47Y29uc3QgdD1hd2FpdCBjcmVhdGVJbWFnZUJpdG1hcCh0aGlzLmltYWdlKTtyZXR1cm4gYyhhKHt9LHRoaXMpLHtpbWFnZTp0fSl9b25Mb2FkKCl7fX17Y29uc3RydWN0b3IodCxlLGkscyl7aWYoc3VwZXIodC5zcHJpdGVTaGVldFBhdGgpLHRoaXMuaW50ZXJ2YWxJZD0tMSx0aGlzLmlzQW5pbWF0ZWQ9ITEsdGhpcy5sYXN0UnVuVGltZVN0YW1wPTAsdGhpcy5zcHJpdGVTaGVldD10LGVbMF08MXx8ZVsxXTwxfHxpWzBdPDF8fGlbMV08MXx8ZVswXT50LmNvbHN8fGVbMV0+dC5yb3dzfHxpWzBdPnQuY29sc3x8aVsxXT50LnJvd3MpdGhyb3cgbmV3IG0oIkludmFsaWQgdHVwbGVzIDogdGhlIHN0eWxlc2hlZXQgY29vcmRpbmF0ZSBzdGFydHMgYXQgKDEsIDEpIik7dGhpcy5mcm9tPWUsdGhpcy50bz1pO2xldCByPWEoYSh7fSx5KSxzKTt0aGlzLmludGVydmFsPXIuaW50ZXJ2YWwsdGhpcy5sb29wPXIubG9vcCx0aGlzLnNwcml0ZVdpZHRoPXRoaXMuc2l6ZS53aWR0aC90LmNvbHMsdGhpcy5zcHJpdGVIZWlnaHQ9dGhpcy5zaXplLmhlaWdodC90LnJvd3MsdGhpcy5jb29yZFg9dGhpcy5mcm9tWzBdLHRoaXMuY29vcmRZPXRoaXMuZnJvbVsxXX1ydW4oKXtsZXQgdD1wZXJmb3JtYW5jZS5ub3coKXx8RGF0ZS5ub3coKTt0LXRoaXMubGFzdFJ1blRpbWVTdGFtcD50aGlzLmludGVydmFsJiYodGhpcy5zdGVwKCksdGhpcy5sYXN0UnVuVGltZVN0YW1wPXQpfWFuaW1hdGUoKXt0aGlzLmlzQW5pbWF0ZWR8fCh0aGlzLmludGVydmFsSWQ9d2luZG93LnNldEludGVydmFsKCgoKT0+dGhpcy5zdGVwKCkpLHRoaXMuaW50ZXJ2YWwpLHRoaXMuaXNBbmltYXRlZD0hMCl9cGF1c2UoKXt0aGlzLmlzQW5pbWF0ZWQmJih3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpLHRoaXMuaXNBbmltYXRlZD0hMSl9cmVzZXQoKXt0aGlzLmNvb3JkWD10aGlzLmZyb21bMF0sdGhpcy5jb29yZFk9dGhpcy5mcm9tWzFdfXN0b3AoKXt0aGlzLnBhdXNlKCksdGhpcy5yZXNldCgpfXNldEludGVydmFsKHQpe3RoaXMuaW50ZXJ2YWw9dCx0aGlzLmlzQW5pbWF0ZWQmJih3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpLHRoaXMuYW5pbWF0ZSgpKX1zdGVwKCl7dGhpcy5jb29yZFghPT10aGlzLnRvWzBdfHx0aGlzLmNvb3JkWSE9PXRoaXMudG9bMV0/dGhpcy5jb29yZFk8dGhpcy50b1sxXT90aGlzLmNvb3JkWDx0aGlzLnNwcml0ZVNoZWV0LmNvbHM/dGhpcy5jb29yZFgrKzoodGhpcy5jb29yZFkrKyx0aGlzLmNvb3JkWD10aGlzLmZyb21bMF0pOnRoaXMuY29vcmRYPHRoaXMudG9bMF0mJnRoaXMuY29vcmRYKys6dGhpcy5sb29wJiYodGhpcy5jb29yZFg9dGhpcy5mcm9tWzBdLHRoaXMuY29vcmRZPXRoaXMuZnJvbVsxXSl9c3ByaXRlQm94KCl7cmV0dXJuIG5ldyBoKCh0aGlzLmNvb3JkWC0xKSp0aGlzLnNwcml0ZVdpZHRoLCh0aGlzLmNvb3JkWS0xKSp0aGlzLnNwcml0ZUhlaWdodCx0aGlzLnNwcml0ZVdpZHRoLHRoaXMuc3ByaXRlSGVpZ2h0KX19JiYobz1yLnNwcml0ZUJveCgpKSxTLmRyYXdJbWFnZShyLmltYWdlLG8ueCxvLnksby53aWR0aCxvLmhlaWdodCxQKGkqci5vZmZzZXQueC1pLzIpLFAocypyLm9mZnNldC55LXMvMiksUChpKSxQKHMpKSxTLnJlc3RvcmUoKX1zdGF0aWMgY2lyY2xlU3ByaXRlKHQsZSxpLHMpe3MuaXNMb2FkZWQmJihTLnNhdmUoKSxTLmJlZ2luUGF0aCgpLFMuYXJjKFAodCtSLngpLFAoZStSLnkpLGksMCxDKSxTLmNsaXAoKSxqLnJlY3RTcHJpdGUodC1pLGUtaSwyKmksMippLHMpLFMucmVzdG9yZSgpKX1zdGF0aWMgdGV4dCh0LGUsaSxzKXtqLnRleHRTdHlsZShzKSxTLmZpbGxUZXh0KHQsZSxpKX1zdGF0aWMgY2VudGVyZWRUZXh0KHQsZSxpLHMpe2oudGV4dCh0LGUsaSxjKGEoe30scykse3RleHRBbGlnbjoiY2VudGVyIix0ZXh0QmFzZWxpbmU6Im1pZGRsZSJ9KSl9c3RhdGljIHRpbnQodCxlLGkscyxyKXtqLnJlY3QoZSxpLHMscix7ZmlsbFN0eWxlOnQsZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiJtdWx0aXBseSIsZ2xvYmFsQWxwaGE6LjI1fSl9c3RhdGljIGJlZ2luRnJhbWUodCl7ai5jbGVhcih0KX1zdGF0aWMgZW5kRnJhbWUoKXt9fW5ldyBjbGFzcyBleHRlbmRzIGNsYXNze3NlbmRNZXNzYWdlVG9NYWluVGhyZWFkKHQsZSl7c2VsZi5wb3N0TWVzc2FnZSh7dGl0bGU6dCxkYXRhOmV9KX1sb2coLi4udCl7dGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgibG9nIiwuLi50KX19e2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLmNhbnZhc1Jlc29sdXRpb249MSx0aGlzLm9mZnNjcmVlbkNhbnZhcz1udWxsLHRoaXMuY3R4PW51bGwsdGhpcy50ZXh0dXJlQWxpYXM9bmV3IE1hcCxzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCgoe2RhdGE6dH0pPT50aGlzLm9uTWVzc2FnZSh0LnRpdGxlLHQuY29udGVudCkpKX1vbk1lc3NhZ2UodCxlKXtzd2l0Y2godCl7Y2FzZSJpbml0Q2FudmFzIjp0aGlzLm9mZnNjcmVlbkNhbnZhcz1lLmNhbnZhcyx0aGlzLmN0eD10aGlzLm9mZnNjcmVlbkNhbnZhcy5nZXRDb250ZXh0KCIyZCIpLGouc2V0Q29udGV4dCh0aGlzLmN0eCksdGhpcy5zZXRTaXplKGUuZHByLGUud2lkdGgsZS5oZWlnaHQpLHRoaXMuc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoImluaXRpYWxpemVkIik7YnJlYWs7Y2FzZSJyZW5kZXIiOmZvcihsZXQgdCBvZiBlLnJlbmRlclN0YWNrKXRoaXMuaGFuZGxlRHJhd1JlcXVlc3QodC5tZXRob2ROYW1lLHQuYXJncyk7YnJlYWs7Y2FzZSJuZXdUZXh0dXJlIjp0aGlzLnRleHR1cmVBbGlhcy5zZXQoZS5pZCxlLnRleHR1cmUpfX1zZXRTaXplKHQsZSxpKXtjb25zdCBzPSh0fHwxKSp0aGlzLmNhbnZhc1Jlc29sdXRpb247dGhpcy5vZmZzY3JlZW5DYW52YXMud2lkdGg9ZSpzLHRoaXMub2Zmc2NyZWVuQ2FudmFzLmhlaWdodD1pKnMsInNldFRyYW5zZm9ybSJpbiB0aGlzLmN0eCYmdGhpcy5jdHguc2V0VHJhbnNmb3JtKHMsMCwwLHMsMCwwKX1nZXRUZXh0dXJlKHQpe2NvbnN0IGU9dGhpcy50ZXh0dXJlQWxpYXMuZ2V0KHQudGV4dHVyZUlkKSx7c2NhbGU6aSxyb3RhdGlvbjpzLG9mZnNldDpyfT10O3JldHVybiBjKGEoe30sZSkse3NjYWxlOmkscm90YXRpb246cyxvZmZzZXQ6cn0pfWhhbmRsZURyYXdSZXF1ZXN0KHQsZSl7c3dpdGNoKHQpe2Nhc2Uic3R5bGUiOmouc3R5bGUobnVsbD09ZT92b2lkIDA6ZS5vYmopO2JyZWFrO2Nhc2UiY2xlYXIiOmouY2xlYXIobnVsbD09ZT92b2lkIDA6ZS5jb2xvcik7YnJlYWs7Y2FzZSJsaW5lIjpqLmxpbmUoZS54MSxlLnkxLGUueDIsZS55MixlLm9iaik7YnJlYWs7Y2FzZSJyZWN0IjpqLnJlY3QoZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0LGUub2JqKTticmVhaztjYXNlInJlY3RGcm9tQ2VudGVyIjpqLnJlY3RGcm9tQ2VudGVyKGUueCxlLnksZS53aWR0aCxlLmhlaWdodCxlLm9iaik7YnJlYWs7Y2FzZSJyZWN0RnJvbVBvaW50cyI6ai5yZWN0RnJvbVBvaW50cyhlLngxLGUueTEsZS54MixlLnkyLGUub2JqKTticmVhaztjYXNlInBvbHkiOmoucG9seShlLnBvaW50cyxlLm9iaik7YnJlYWs7Y2FzZSJjaXJjbGUiOmouY2lyY2xlKGUueCxlLnksZS5yYWRpdXMsZS5vYmopO2JyZWFrO2Nhc2UiY2lyY2xlRnJvbVJlY3QiOmouY2lyY2xlRnJvbVJlY3QoZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0LGUub2JqKTticmVhaztjYXNlInBvaW50IjpqLnBvaW50KGUueCxlLnksZS5vYmopO2JyZWFrO2Nhc2UicmVjdFNwcml0ZSI6ai5yZWN0U3ByaXRlKGUueCxlLnksZS53aWR0aCxlLmhlaWdodCx0aGlzLmdldFRleHR1cmUoZSkpO2JyZWFrO2Nhc2UiY2lyY2xlU3ByaXRlIjpqLmNpcmNsZVNwcml0ZShlLngsZS55LGUucmFkaXVzLHRoaXMuZ2V0VGV4dHVyZShlKSk7YnJlYWs7Y2FzZSJ0ZXh0IjpqLnRleHQoZS50ZXh0LGUueCxlLnksbnVsbD09ZT92b2lkIDA6ZS5zdHlsZSk7YnJlYWs7Y2FzZSJjZW50ZXJlZFRleHQiOmouY2VudGVyZWRUZXh0KGUudGV4dCxlLngsZS55LG51bGw9PWU/dm9pZCAwOmUuc3R5bGUpO2JyZWFrO2Nhc2UidGludCI6ai50aW50KGUuY29sb3IsZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0KX19fTsK", { type: "module" });
}
let ht = false, rt = [];
const mt = new Map();
class ut {
  static get worker() {
    return et;
  }
  static get workerIsInitialized() {
    return ht;
  }
  static get offscreenCanvas() {
    return tt;
  }
  static get renderStack() {
    return rt;
  }
  static create(t2, e2) {
    let [s2, i2] = [Z().width, Z().height];
    return st = W(t2 || s2, e2 || i2, 1), ut.initRenderWorker(st, t2 || s2, e2 || i2), X(st, "main"), st;
  }
  static createFromCanvas(t2) {
    if (st = document.querySelector(t2), !(st && st instanceof HTMLCanvasElement))
      throw new j("The selected element is not a canvas");
    return f(st, st.clientWidth, st.clientHeight, 1), ut.initRenderWorker(st, st.width, st.height), st;
  }
  static initRenderWorker(t2, e2, s2) {
    Zt.renderer instanceof ut || Zt.setRendererType("offscreen");
    let { clientWidth: i2, clientHeight: n2 } = t2;
    et = new ct(), tt = t2.transferControlToOffscreen(), this.sendMessageToWorker("initCanvas", { width: e2 || i2, height: s2 || n2, canvas: tt, dpr: window.devicePixelRatio || 1 }, [tt]), et.onmessage = ({ data: { title: t3, data: e3 } }) => {
      switch (t3) {
        case "log":
          console.log("message from the renderer worker : ", e3);
          break;
        case "initialized":
          ht = true, this.endFrame();
          break;
        default:
          console.log(t3);
      }
    };
  }
  static addRenderCall(t2, e2) {
    rt.push(new dt(t2, e2 || {}));
  }
  static sendMessageToWorker(t2, e2, s2) {
    return et.postMessage(new ot(t2, e2), s2 || []);
  }
  static style(t2) {
    this.addRenderCall("style", { obj: t2 });
  }
  static clear(t2) {
    this.addRenderCall("clear", { color: t2 });
  }
  static line(t2, e2, s2, i2, n2) {
    this.addRenderCall("line", { x1: t2, y1: e2, x2: s2, y2: i2, obj: n2 });
  }
  static rect(t2, e2, s2, i2, n2) {
    this.addRenderCall("rect", { x: t2, y: e2, width: s2, height: i2, obj: n2 });
  }
  static rectFromCenter(t2, e2, s2, i2, n2) {
    this.addRenderCall("rectFromCenter", { x: t2, y: e2, width: s2, height: i2, obj: n2 });
  }
  static rectFromPoints(t2, e2, s2, i2, n2) {
    this.addRenderCall("rectFromPoints", { x1: t2, y1: e2, x2: s2, y2: i2, obj: n2 });
  }
  static poly(t2, e2) {
    this.addRenderCall("poly", { points: t2, obj: e2 });
  }
  static circle(t2, e2, s2, i2) {
    this.addRenderCall("circle", { x: t2, y: e2, radius: s2, obj: i2 });
  }
  static circleFromRect(t2, e2, s2, i2, n2) {
    this.addRenderCall("circleFromRect", { x: t2, y: e2, width: s2, height: i2, obj: n2 });
  }
  static point(t2, e2, s2) {
    this.addRenderCall("point", { x: t2, y: e2, obj: s2 });
  }
  static handleTexture(t2, e2, s2) {
    var i2;
    if (t2.isLoaded)
      if (mt.has(t2.id)) {
        const { scale: i3, rotation: n2, offset: l2 } = t2;
        this.addRenderCall(e2, d(o({}, s2), { textureId: t2.id, scale: i3, rotation: n2, offset: l2 }));
      } else
        (i2 = t2.convertToBitmap()) == null || i2.then((e3) => {
          mt.set(t2.id, e3), this.sendMessageToWorker("newTexture", { id: t2.id, texture: e3 });
        });
  }
  static rectSprite(t2, e2, s2, i2, n2) {
    this.handleTexture(n2, "rectSprite", { x: t2, y: e2, width: s2, height: i2 });
  }
  static async circleSprite(t2, e2, s2, i2) {
    this.handleTexture(i2, "circleSprite", { x: t2, y: e2, radius: s2 });
  }
  static text(t2, e2, s2, i2) {
    this.addRenderCall("text", { text: t2, x: e2, y: s2, style: i2 });
  }
  static centeredText(t2, e2, s2, i2) {
    this.addRenderCall("centeredText", { text: t2, x: e2, y: s2, style: i2 });
  }
  static tint(t2, e2, s2, i2, n2) {
    this.addRenderCall("circle", { color: t2, x: e2, y: s2, width: i2, height: n2 });
  }
  static beginFrame(t2) {
    rt = [], this.clear(t2);
  }
  static endFrame() {
    ht && (this.sendMessageToWorker("render", { renderStack: rt }), rt = []);
  }
}
const pt = v("OffscreenCanvas") ? ut : at;
function yt() {
  const t2 = new z(), e2 = document.createElement("div");
  return e2.classList.toggle("stats"), t2.showPanel(0), e2.appendChild(t2.dom), document.body.appendChild(e2), Q.statsShift(48), t2;
}
class bt {
  constructor(t2, e2 = 60) {
    if (this.requestId = 0, this.animate = t2, this.fps = e2, !window)
      throw new E("No window context", "core");
  }
  start() {
    let t2 = g();
    const e2 = 1e3 / this.fps, s2 = (i2) => {
      this.requestId = window.requestAnimationFrame(s2);
      const n2 = i2 - t2;
      n2 >= e2 - 0.1 && (t2 = i2 - n2 % e2, this.animate(n2));
    };
    this.requestId = window.requestAnimationFrame(s2);
  }
  stop() {
    window.cancelAnimationFrame(this.requestId);
  }
}
let Gt = "normal";
class Zt {
  constructor(t2, e2, s2 = 60) {
    this.fps = 60, this.name = t2, this.env = e2, this.tick = 0, this.stats = null, this.showStatsPanel = true, this.gameLoop = this.env ? () => e2.update() : null, this.fps = s2, this.makeAnimationFrame();
  }
  static setRendererType(t2) {
    Gt = t2;
  }
  static get renderer() {
    return Gt === "normal" ? at : pt;
  }
  toggleStats(t2) {
    this.showStatsPanel = t2 !== void 0 ? t2 : !this.showStatsPanel, this.showStatsPanel ? this.stats = yt() : (this.stats = null, document.querySelector(".stats") && document.querySelector(".stats").remove());
  }
  makeAnimationFrame() {
    this.update && (this.animationFrame = new bt((t2) => this.update(t2), this.fps));
  }
  setMainLoop(t2) {
    this.gameLoop = t2, this.makeAnimationFrame();
  }
  setFPS(t2) {
    this.fps = t2, this.makeAnimationFrame();
  }
  update(t2) {
    var e2, s2;
    (e2 = this.stats) == null || e2.begin(), k.tick(), H.tick(t2), this.gameLoop && this.gameLoop(t2), this.tick % Q.updateInterval == 0 && Q.update(), (s2 = this.stats) == null || s2.end(), this.tick++;
  }
  start() {
    if (!this.gameLoop)
      throw new Error("No game loop");
    if (!this.animationFrame)
      throw new Error("AnimationFrame");
    C() ? this.internalStart() : window.addEventListener("DOMContentLoaded", () => this.internalStart());
  }
  internalStart() {
    this.name && (document.title = this.name), k.init(), H.init(), Q.init(), this.showStatsPanel && (this.stats = yt()), this.animationFrame.start();
  }
}
const vt = { linear: (t2) => t2, smoothStep: (t2) => (3 - 2 * t2) * t2 ** 2, smootherStep: (t2) => (6 * t2 * t2 - 15 * t2 + 10) * t2 ** 3, easeIn: (t2) => t2 ** 2, easeOut: (t2) => 1 - (1 - t2) ** 2, easeInOut: (t2) => t2 < 0.5 ? 2 * t2 * t2 : 1 - Math.pow(-2 * t2 + 2, 2) / 2, easeInBack: (t2) => 2.70158 * t2 ** 3 - 1.70158 * t2 ** 2, easeOutBack: (t2) => 1 + 1.70158 * Math.pow(t2 - 1, 3) + 2.70158 * Math.pow(t2 - 1, 2), easeInOutBack: (t2) => t2 < 0.5 ? Math.pow(2 * t2, 2) * (7.189819 * t2 - 2.5949095) / 2 : (Math.pow(2 * t2 - 2, 2) * (3.5949095 * (2 * t2 - 2) + 2.5949095) + 2) / 2 }, Ct = { autostart: false, loop: false };
class Vt {
  constructor(t2, e2, s2, i2 = vt.linear, n2 = {}) {
    if (this.hasStarted = false, this.isPaused = false, this.isEnded = false, this.isReversed = false, this.lastT = 0, this.from = t2, this.to = e2, this.duration = s2, i2 instanceof Function)
      this.easing = i2;
    else {
      if (typeof i2 != "string" || !(i2 in vt))
        throw new E("Unknow easing parameter", "animation");
      this.easing = vt[i2];
    }
    this.options = o(o({}, Ct), n2), this.value = this.from, this.speed = (this.to - this.from) / this.duration, H.add(this);
  }
  start() {
    this.isEnded = false, this.hasStarted = true;
  }
  reset() {
    this.lastT = 0, this.isPaused = false, this.hasStarted = false, this.isEnded = false;
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
    let e2 = y(0, this.lastT + t2 * this.speed / Math.abs(this.to - this.from), 1);
    if (e2 >= 1 || e2 <= 0) {
      if (!this.options.loop)
        return void (this.isEnded = true);
      this.speed *= -1, this.isReversed = !this.isReversed;
    }
    this.lastT = e2, this.value = this.from + (this.to - this.from) * this.easing(e2);
  }
  get isRunning() {
    return this.hasStarted && !(this.isEnded || this.isPaused);
  }
}

const { width, height } = Z();
const NB_TEST = 4;
const offset = 25;
const dimension = (width - 2 * NB_TEST * offset) / NB_TEST;
let linear_x = new Vt(0, dimension, 2e3, vt.linear, { autostart: true, loop: true });
let linear_y = new Vt(dimension, 0, 2e3, "linear", { autostart: true, loop: true });
let easeIn_y = new Vt(dimension, 0, 2e3, "easeIn", { autostart: true, loop: true });
let easeOut_y = new Vt(dimension, 0, 2e3, vt.easeOut, { autostart: true, loop: true });
let easeInOut_y = new Vt(dimension, 0, 2e3, vt.easeInOutBack, { autostart: true, loop: true });
let speed = new Vt(0, width - 2 * offset, 2500, vt.easeInOut, { autostart: true, loop: true });
let speed2 = new Vt(0, width - 2 * offset, 2500, vt.linear, { autostart: true, loop: true });
let speed3 = new Vt(0, width - 2 * offset, 2500, vt.easeIn, { autostart: true, loop: true });
function draw(ts) {
  at.clear();
  at.text("Linear", offset, offset + dimension + 20, { size: 16 });
  at.rect(offset, offset, dimension, dimension, { lineWidth: 0.5 });
  at.circle(offset + linear_x.value, offset + linear_y.value, 0.5);
  at.rect(dimension + 2 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  at.circle(dimension + 2 * offset + linear_x.value, offset + easeIn_y.value, 1);
  at.rect(2 * dimension + 3 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  at.circle(2 * dimension + 3 * offset + linear_x.value, offset + easeOut_y.value, 1);
  at.rect(3 * dimension + 4 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  at.circle(3 * dimension + 4 * offset + linear_x.value, offset + easeInOut_y.value, 1);
  at.circle(offset + speed.value, height / 2, 10);
  at.circle(offset + speed2.value, height / 2 + 25, 10);
  at.circle(offset + speed3.value, height / 2 + 50, 10);
}
let pause = false;
Q.addButton(() => pause ? "||" : ">", (e) => {
  pause = !pause;
  linear_x.toggle();
  linear_y.toggle();
});
Q.addButton(() => "Reset", (e) => {
  linear_x.reset();
  linear_y.reset();
});
const game = new Zt("Animation Test");
at.create();
game.setMainLoop(draw);
game.toggleStats();
game.setFPS(60);
game.start();
