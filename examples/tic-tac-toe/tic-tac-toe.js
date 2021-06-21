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
function W(t2) {
  return window && t2 in window;
}
var S, v;
(v = S || (S = {}))[v.KeyboardPressed = 0] = "KeyboardPressed", v[v.KeyboardDown = 1] = "KeyboardDown", v[v.Mouse = 2] = "Mouse", v[v.Window = 3] = "Window", v[v.Custom = 4] = "Custom", v[v.All = 5] = "All";
class C {
  constructor(t2, e2, i2 = 4) {
    this.name = t2, this.callback = e2, this.type = i2, this.listeners = [this.callback];
  }
  static emit(t2, e2) {
    const i2 = X.getCustomEvent(t2);
    i2 && i2.listeners.forEach((t3) => t3(e2));
  }
  static on(t2, e2) {
    const i2 = X.getCustomEvent(t2);
    if (i2)
      i2.listeners.push(e2);
    else {
      const i3 = new C(t2, e2, 4);
      X.addEvent(i3);
    }
  }
  static onKeyDown(t2, e2) {
    X.addEvent(new C(t2, e2, 1));
  }
  static onKeyPressed(t2, e2) {
    X.addEvent(new C(t2, e2, 0));
  }
  static onClick(t2) {
    C.onMouseClick(t2);
  }
  static onMouseClick(t2) {
    X.addEvent(new C("click", t2, 2));
  }
  static onMouseMove(t2) {
    X.addEvent(new C("mousemove", t2, 2));
  }
}
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
let F, U, z, T, M, Q = w() ? 4 : 2 * (window.devicePixelRatio || 1);
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
class P {
  constructor(t2, e2) {
    this.title = t2, this.content = e2;
  }
}
class D {
  constructor(t2, e2) {
    this.methodName = t2, this.args = e2;
  }
}
function O() {
  return new Worker("data:application/javascript;base64,dmFyIGU9T2JqZWN0LmRlZmluZVByb3BlcnR5LHQ9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxpPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkscj1PYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLG49KHQsaSxyKT0+aSBpbiB0P2UodCxpLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpyfSk6dFtpXT1yLHM9KGUscyk9Pntmb3IodmFyIGEgaW4gc3x8KHM9e30pKWkuY2FsbChzLGEpJiZuKGUsYSxzW2FdKTtpZih0KWZvcih2YXIgYSBvZiB0KHMpKXIuY2FsbChzLGEpJiZuKGUsYSxzW2FdKTtyZXR1cm4gZX07ZnVuY3Rpb24gYSgpe3JldHVybnt3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fX1mdW5jdGlvbiBjKGUpe3JldHVybnt3aWR0aDplLmNsaWVudFdpZHRofHxlLndpZHRoLGhlaWdodDplLmNsaWVudEhlaWdodHx8ZS5oZWlnaHR9fWZ1bmN0aW9uIG8oZSx0LGkscil7Y29uc3Qgbj1yfHx3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MTtsZXQgcz10fHxjKGUpLndpZHRoLGE9aXx8YyhlKS5oZWlnaHQ7ZS53aWR0aD1zKm4sZS5oZWlnaHQ9YSpuLGUuc3R5bGUud2lkdGg9cysicHgiLGUuc3R5bGUuaGVpZ2h0PWErInB4IiwxIT1uJiZlLmdldENvbnRleHQoIjJkIikuc2V0VHJhbnNmb3JtKG4sMCwwLG4sMCwwKX1TdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0aGlzLnNsaWNlKDEpfTtjbGFzcyBsIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoZSx0KXtzdXBlcih0P2BbJHt0LmNhcGl0YWxpemUoKX1dIC0gJHtlfWA6ZSksdGhpcy5uYW1lPSJFbmdpbmVGYWlsdXJlIn19Y2xhc3MgaCBleHRlbmRzIGx7Y29uc3RydWN0b3IoZSl7c3VwZXIoZSwicmVuZGVyZXIiKX19Y29uc3QgZD17c3Ryb2tlU3R5bGU6ImJsYWNrIixsaW5lV2lkdGg6MixsaW5lSm9pbjoicm91bmQiLGxpbmVDYXA6InJvdW5kIixmaWxsU3R5bGU6InRyYW5zcGFyZW50IixnbG9iYWxBbHBoYToxLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoiYWRkIn0sdT17Zm9udDoiUm9ib3RvIixzaXplOjE2LGNvbG9yOiJibGFjayJ9LGY9MipNYXRoLlBJO2xldCB4LGcscD1udWxsPT1zZWxmLmRvY3VtZW50JiZudWxsPT1zZWxmLndpbmRvdz80OjIqKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKTtmdW5jdGlvbiB5KGUpe3JldHVybn5+KGUqcCkvcH1jbGFzcyBie3N0YXRpYyBjcmVhdGUoZSx0KXtsZXRbaSxyXT1bYSgpLndpZHRoLGEoKS5oZWlnaHRdO2NvbnN0IG49ZnVuY3Rpb24oZSx0LGkscil7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJjYW52YXMiKTtyZXR1cm4gbyhuLGUsdCxpKSxyJiYobi5vbmNvbnRleHRtZW51PWU9PmUucHJldmVudERlZmF1bHQoKSksbn0oZXx8aSx0fHxyKTtyZXR1cm4gZnVuY3Rpb24oZSx0KXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsKCgpPT57dmFyIGk7Y29uc3Qgcj1udWxsIT0oaT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpKT9pOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodCk7ci5hcHBlbmRDaGlsZChlKSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJib2R5IikuYXBwZW5kQ2hpbGQocil9KSl9KG4sIm1haW4iKSxiLnNldENvbnRleHQobi5nZXRDb250ZXh0KCIyZCIpKSxufXN0YXRpYyBjcmVhdGVGcm9tQ2FudmFzKGUpe2xldCB0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk7aWYoISh0JiZ0IGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpKXRocm93IG5ldyBoKCJUaGUgc2VsZWN0ZWQgZWxlbWVudCBpcyBub3QgYSBjYW52YXMiKTtyZXR1cm4gbyh0KSxiLnNldENvbnRleHQodC5nZXRDb250ZXh0KCIyZCIpKSx0fXN0YXRpYyBzZXRDb250ZXh0KGUpe3g9ZX1zdGF0aWMgZ2V0Q29udGV4dCgpe3JldHVybiB4fXN0YXRpYyBzdHlsZShlKXtpZigheCl0aHJvdyBuZXcgaCgiQ29udGV4dCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZS4gUGxlYXNlIHVzZSBSZW5kZXJlci5zZXRDb250ZXh0Iik7Y29uc3QgdD1zKHMoe30sZCksZSk7aWYodCE9PWcpe2ZvcihsZXQgZSBpbiB0KXhbZV0hPT10W2VdJiYoeFtlXT10W2VdKTtnPXR9fXN0YXRpYyBjbGVhcihlKXtlPyhiLnN0eWxlKHtmaWxsU3R5bGU6ZX0pLHguZmlsbFJlY3QoMCwwLHguY2FudmFzLndpZHRoLHguY2FudmFzLmhlaWdodCkpOnguY2xlYXJSZWN0KDAsMCx4LmNhbnZhcy53aWR0aCx4LmNhbnZhcy5oZWlnaHQpfXN0YXRpYyBsaW5lKGUsdCxpLHIsbil7Yi5zdHlsZShuKSx4LmJlZ2luUGF0aCgpLHgubW92ZVRvKHkoZSkseSh0KSkseC5saW5lVG8oeShpKSx5KHIpKSx4LnN0cm9rZSgpfXN0YXRpYyByZWN0KGUsdCxpLHIsbil7Yi5zdHlsZShuKTtjb25zdFtzLGEsYyxvXT1beShlKSx5KHQpLHkoaSkseShyKV07eC5maWxsUmVjdChzLGEsYyxvKSx4LnN0cm9rZVJlY3QocyxhLGMsbyl9c3RhdGljIHJlY3RGcm9tQ2VudGVyKGUsdCxpLHIsbil7cmV0dXJuIGIucmVjdChlLWkvMix0LXIvMixpLHIsbil9c3RhdGljIHJlY3RGcm9tUG9pbnRzKGUsdCxpLHIsbil7cmV0dXJuIGIucmVjdChlLHQsaS1lLHItdCxuKX1zdGF0aWMgcG9seShlLHQpe2lmKGUubGVuZ3RoKXtiLnN0eWxlKHQpLHguYmVnaW5QYXRoKCkseC5tb3ZlVG8oeShlWzBdLngpLHkoZVswXS55KSk7Zm9yKGxldCB0PTE7dDxlLmxlbmd0aDt0KyspeC5saW5lVG8oeShlW3RdLngpLHkoZVt0XS55KSk7eC5zdHJva2UoKX19c3RhdGljIGNpcmNsZShlLHQsaSxyKXtiLnN0eWxlKHIpLHguYmVnaW5QYXRoKCkseC5hcmMoeShlKSx5KHQpLGksMCxmKSx4LmZpbGwoKSx4LnN0cm9rZSgpfXN0YXRpYyBjaXJjbGVGcm9tUmVjdChlLHQsaSxyLG4pe3JldHVybiBiLmNpcmNsZShlK2kvMix0K3IvMixNYXRoLm1pbihpLHIpLzIsbil9c3RhdGljIHBvaW50KGUsdCxpKXtiLmNpcmNsZShlLHQsNSxpKX1zdGF0aWMgcmVjdFNwcml0ZShlLHQsaSxyLG4pe2Iuc3R5bGUoe30pLHguc2F2ZSgpLHgudHJhbnNsYXRlKHkoZStpLzIpLHkodCtyLzIpKSx4LnNjYWxlKG4uc2NhbGUueCxuLnNjYWxlLnkpLHgucm90YXRlKG4ucm90YXRpb24pLHguZHJhd0ltYWdlKG4uaW1hZ2UseShpKm4ub2Zmc2V0LngtaS8yKSx5KHIqbi5vZmZzZXQueS1yLzIpLHkoaSkseShyKSkseC5yZXN0b3JlKCl9c3RhdGljIGNpcmNsZVNwcml0ZShlLHQsaSxyKXt4LnNhdmUoKSx4LmJlZ2luUGF0aCgpLHguYXJjKHkoZSkseSh0KSxpLDAsZikseC5jbGlwKCksYi5yZWN0U3ByaXRlKGUtaSx0LWksMippLDIqaSxyKSx4LnJlc3RvcmUoKX1zdGF0aWMgdGV4dChlLHQsaSxyKXtpZih4KXtsZXQgZT1zKHMoe30sdSkscik7eC5mb250PWAke2Uuc2l6ZX1weCAke2UuZm9udH1gLGIuc3R5bGUoe2ZpbGxTdHlsZTplLmNvbG9yfSl9eC5maWxsVGV4dChlLHQsaSl9c3RhdGljIHRpbnQoZSx0LGkscixuKXtiLnJlY3QodCxpLHIsbix7ZmlsbFN0eWxlOmUsZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiJtdWx0aXBseSIsZ2xvYmFsQWxwaGE6LjI1fSl9c3RhdGljIGJlZ2luRnJhbWUoZSl7Yi5jbGVhcihlKX1zdGF0aWMgZW5kRnJhbWUoKXt9fW5ldyBjbGFzcyBleHRlbmRzIGNsYXNze3NlbmRNZXNzYWdlVG9NYWluVGhyZWFkKGUsdCl7c2VsZi5wb3N0TWVzc2FnZSh7dGl0bGU6ZSxkYXRhOnR9KX1sb2coLi4uZSl7dGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgibG9nIiwuLi5lKX19e2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLmNhbnZhc1Jlc29sdXRpb249MSx0aGlzLm9mZnNjcmVlbkNhbnZhcz1udWxsLHRoaXMuY3R4PW51bGwsdGhpcy50ZXh0dXJlQWxpYXM9bmV3IE1hcCxzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCgoe2RhdGE6ZX0pPT50aGlzLm9uTWVzc2FnZShlLnRpdGxlLGUuY29udGVudCkpKX1vbk1lc3NhZ2UoZSx0KXtzd2l0Y2goZSl7Y2FzZSJpbml0Q2FudmFzIjp0aGlzLm9mZnNjcmVlbkNhbnZhcz10LmNhbnZhcyx0aGlzLmN0eD10aGlzLm9mZnNjcmVlbkNhbnZhcy5nZXRDb250ZXh0KCIyZCIpLGIuc2V0Q29udGV4dCh0aGlzLmN0eCksdGhpcy5zZXRTaXplKHQuZHByLHQud2lkdGgsdC5oZWlnaHQpLHRoaXMuc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoImluaXRpYWxpemVkIik7YnJlYWs7Y2FzZSJyZW5kZXIiOmZvcihsZXQgZSBvZiB0LnJlbmRlclN0YWNrKXRoaXMuaGFuZGxlRHJhd1JlcXVlc3QoZS5tZXRob2ROYW1lLGUuYXJncyk7YnJlYWs7Y2FzZSJuZXdUZXh0dXJlIjp0aGlzLnRleHR1cmVBbGlhc1t0LmlkXT10LnRleHR1cmV9fXNldFNpemUoZSx0LGkpe2NvbnN0IHI9KGV8fDEpKnRoaXMuY2FudmFzUmVzb2x1dGlvbjt0aGlzLm9mZnNjcmVlbkNhbnZhcy53aWR0aD10KnIsdGhpcy5vZmZzY3JlZW5DYW52YXMuaGVpZ2h0PWkqciwic2V0VHJhbnNmb3JtImluIHRoaXMuY3R4JiZ0aGlzLmN0eC5zZXRUcmFuc2Zvcm0ociwwLDAsciwwLDApfWdldFRleHR1cmUoZSl7cmV0dXJuIHRoaXMudGV4dHVyZUFsaWFzW2VdfWhhbmRsZURyYXdSZXF1ZXN0KGUsdCl7c3dpdGNoKGUpe2Nhc2Uic3R5bGUiOmIuc3R5bGUobnVsbD09dD92b2lkIDA6dC5vYmopO2JyZWFrO2Nhc2UiY2xlYXIiOmIuY2xlYXIobnVsbD09dD92b2lkIDA6dC5jb2xvcik7YnJlYWs7Y2FzZSJsaW5lIjpiLmxpbmUodC54MSx0LnkxLHQueDIsdC55Mix0Lm9iaik7YnJlYWs7Y2FzZSJyZWN0IjpiLnJlY3QodC54LHQueSx0LndpZHRoLHQuaGVpZ2h0LHQub2JqKTticmVhaztjYXNlInJlY3RGcm9tQ2VudGVyIjpiLnJlY3RGcm9tQ2VudGVyKHQueCx0LnksdC53aWR0aCx0LmhlaWdodCx0Lm9iaik7YnJlYWs7Y2FzZSJyZWN0RnJvbVBvaW50cyI6Yi5yZWN0RnJvbVBvaW50cyh0LngxLHQueTEsdC54Mix0LnkyLHQub2JqKTticmVhaztjYXNlInBvbHkiOmIucG9seSh0LnBvaW50cyx0Lm9iaik7YnJlYWs7Y2FzZSJjaXJjbGUiOmIuY2lyY2xlKHQueCx0LnksdC5yYWRpdXMsdC5vYmopO2JyZWFrO2Nhc2UiY2lyY2xlRnJvbVJlY3QiOmIuY2lyY2xlRnJvbVJlY3QodC54LHQueSx0LndpZHRoLHQuaGVpZ2h0LHQub2JqKTticmVhaztjYXNlInBvaW50IjpiLnBvaW50KHQueCx0LnksdC5vYmopO2JyZWFrO2Nhc2UicmVjdFNwcml0ZSI6Yi5yZWN0U3ByaXRlKHQueCx0LnksdC53aWR0aCx0LmhlaWdodCx0aGlzLmdldFRleHR1cmUodC50ZXh0dXJlSWQpKTticmVhaztjYXNlImNpcmNsZVNwcml0ZSI6Yi5jaXJjbGVTcHJpdGUodC54LHQueSx0LnJhZGl1cyx0aGlzLmdldFRleHR1cmUodC50ZXh0dXJlSWQpKTticmVhaztjYXNlInRleHQiOmIudGV4dCh0LnRleHQsdC54LHQueSx0LmZvbnQpO2JyZWFrO2Nhc2UidGludCI6Yi50aW50KHQuY29sb3IsdC54LHQueSx0LndpZHRoLHQuaGVpZ2h0KX19fTsK", { type: "module" });
}
let A = false, q = [];
const $ = new Map();
class _ {
  static get worker() {
    return T;
  }
  static get workerIsInitialized() {
    return A;
  }
  static get offscreenCanvas() {
    return z;
  }
  static get renderStack() {
    return q;
  }
  static create(t2, e2) {
    let [i2, s2] = [y().width, y().height];
    return M = Z(t2 || i2, e2 || s2, 1), _.initRenderWorker(M, t2 || i2, e2 || s2), g(M, "main"), M;
  }
  static createFromCanvas(t2) {
    if (M = document.querySelector(t2), !(M && M instanceof HTMLCanvasElement))
      throw new V("The selected element is not a canvas");
    return f(M, M.clientWidth, M.clientHeight, 1), _.initRenderWorker(M, M.width, M.height), M;
  }
  static initRenderWorker(t2, e2, i2) {
    dt.rendererType !== "offscreen" && dt.setRendererType("offscreen");
    let { clientWidth: s2, clientHeight: n2 } = t2;
    T = new O(), z = t2.transferControlToOffscreen(), this.sendMessageToWorker("initCanvas", { width: e2 || s2, height: i2 || n2, canvas: z, dpr: window.devicePixelRatio || 1 }, [z]), T.onmessage = ({ data: { title: t3, data: e3 } }) => {
      switch (t3) {
        case "log":
          console.log("message from the renderer worker : ", e3);
          break;
        case "initialized":
          A = true;
      }
    };
  }
  static addRenderCall(t2, e2) {
    q.push(new D(t2, e2 || {}));
  }
  static sendMessageToWorker(t2, e2, i2) {
    return T.postMessage(new P(t2, e2), i2 || []);
  }
  static style(t2) {
    this.addRenderCall("style", { obj: t2 });
  }
  static clear(t2) {
    this.addRenderCall("clear", { color: t2 });
  }
  static line(t2, e2, i2, s2, n2) {
    this.addRenderCall("line", { x1: t2, y1: e2, x2: i2, y2: s2, obj: n2 });
  }
  static rect(t2, e2, i2, s2, n2) {
    this.addRenderCall("rect", { x: t2, y: e2, width: i2, height: s2, obj: n2 });
  }
  static rectFromCenter(t2, e2, i2, s2, n2) {
    this.addRenderCall("rectFromCenter", { x: t2, y: e2, width: i2, height: s2, obj: n2 });
  }
  static rectFromPoints(t2, e2, i2, s2, n2) {
    this.addRenderCall("rectFromPoints", { x1: t2, y1: e2, x2: i2, y2: s2, obj: n2 });
  }
  static poly(t2, e2) {
    this.addRenderCall("poly", { points: t2, obj: e2 });
  }
  static circle(t2, e2, i2, s2) {
    this.addRenderCall("circle", { x: t2, y: e2, radius: i2, obj: s2 });
  }
  static circleFromRect(t2, e2, i2, s2, n2) {
    this.addRenderCall("circleFromRect", { x: t2, y: e2, width: i2, height: s2, obj: n2 });
  }
  static point(t2, e2, i2) {
    this.addRenderCall("point", { x: t2, y: e2, obj: i2 });
  }
  static rectSprite(t2, e2, i2, s2, n2) {
    var a2;
    $.has(n2.id) ? this.addRenderCall("rectSprite", { x: t2, y: e2, width: i2, height: s2, textureId: n2.id }) : (a2 = n2.convertToBitmap()) == null || a2.then((t3) => {
      $.set(n2.id, t3), this.sendMessageToWorker("newTexture", { id: n2.id, texture: t3 });
    });
  }
  static async circleSprite(t2, e2, i2, s2) {
    var n2;
    $.has(s2.id) ? this.addRenderCall("circleSprite", { x: t2, y: e2, radius: i2, textureId: s2.id }) : (n2 = s2.convertToBitmap()) == null || n2.then((t3) => {
      $.set(s2.id, t3), this.sendMessageToWorker("newTexture", { id: s2.id, texture: t3 });
    });
  }
  static text(t2, e2, i2, s2) {
    this.addRenderCall("text", { text: t2, x: e2, y: i2, font: s2 });
  }
  static tint(t2, e2, i2, s2, n2) {
    this.addRenderCall("circle", { color: t2, x: e2, y: i2, width: s2, height: n2 });
  }
  static beginFrame(t2) {
    q = [], this.clear(t2);
  }
  static endFrame() {
    A && (this.sendMessageToWorker("render", { renderStack: q }), q = []);
  }
}
const tt = W("OffscreenCanvas") ? _ : B;
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
class xt {
  constructor(t2, e2) {
    this.rows = e2, this.cols = t2, this.cells = [], this.focusCell = null, this.createCells(), this.defineNeighboors();
  }
  createCells() {
    for (let t2 = 0; t2 < this.cols; t2++)
      for (let e2 = 0; e2 < this.rows; e2++)
        this.cells.push(new Zt(t2, e2));
  }
  updateCell(t2) {
    if (this.cells.includes(t2)) {
      if (t2.width !== 1 || t2.height !== 1) {
        if (t2.width > 1) {
          let e2 = t2.width - 1, i2 = this.cells.filter((i3) => i3.y === t2.y && i3.x > t2.x && i3.x <= t2.x + e2);
          this.cells = this.cells.filter((t3) => !i2.includes(t3));
        }
        if (t2.height > 1) {
          let e2 = t2.height - 1, i2 = this.cells.filter((i3) => i3.x === t2.x && i3.y > t2.y && i3.y <= t2.y + e2);
          this.cells = this.cells.filter((t3) => !i2.includes(t3));
        }
      }
      this.defineNeighboors(), this.cells[this.cells.indexOf(t2)] = t2;
    }
  }
  defineNeighboors() {
    this.cells.forEach((t2) => {
      t2.neighboor.top = t2.y >= 1 ? this.cells.filter((e2) => e2.x <= t2.x && e2.x + e2.width > t2.x && e2.y === t2.y - t2.height)[0] : null, t2.neighboor.bottom = t2.y <= this.rows - 1 ? this.cells.filter((e2) => e2.x <= t2.x && e2.x + e2.width > t2.x && e2.y === t2.y + t2.height)[0] : null, t2.neighboor.left = t2.x >= 1 ? this.cells.filter((e2) => e2.y <= t2.y && e2.y + e2.height > t2.y && e2.x === t2.x - t2.width)[0] : null, t2.neighboor.right = t2.x <= this.cols - 1 ? this.cells.filter((e2) => e2.y <= t2.y && e2.y + e2.height > t2.y && e2.x === t2.x + t2.width)[0] : null;
    });
  }
  get(t2, e2) {
    return this.cells[t2 * this.cols + e2];
  }
  clear() {
    this.cells.forEach((t2) => t2.state = null);
  }
}
class Zt {
  constructor(t2, e2, i2 = 1, s2 = 1) {
    this.x = t2, this.y = e2, this.width = i2, this.height = s2, this.state = null, this.neighboor = {};
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

const cellWidth = 400 / 3;
const grid = new xt(3, 3);
const game = new dt("Tic Tac Toe");
let line = null;
let lineAnimation = new Gt(0, 1, 1e3, "smoothStep");
function cross(x, y) {
  const padding = cellWidth / 4;
  const rect = {
    x: x + padding,
    y: y + padding,
    x2: x + cellWidth - padding,
    y2: y + cellWidth - padding
  };
  tt.line(rect.x, rect.y, rect.x2, rect.y2);
  tt.line(rect.x2, rect.y, rect.x, rect.y2);
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
  tt.beginFrame();
  for (let cell of grid.cells) {
    tt.rect(cell.x * cellWidth, cell.y * cellWidth, cell.width * cellWidth, cell.height * cellWidth);
    cell.state && cell.state == "circle" && tt.circle(cell.x * cellWidth + cellWidth / 2, cell.y * cellWidth + cellWidth / 2, cell.width * cellWidth / 3);
    cell.state && cell.state == "cross" && cross(cell.x * cellWidth, cell.y * cellWidth);
  }
  if (line)
    tt.line(line.x, line.y, line.x + (line.x2 - line.x) * lineAnimation.value, line.y + (line.y2 - line.y) * lineAnimation.value, { strokeStyle: "red", lineWidth: 6 });
  tt.endFrame();
}
function reset() {
  line = null;
  grid.clear();
  lineAnimation.reset();
}
C.onClick(({ x, y }) => {
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
    window.setTimeout(reset, 1e3);
  } else {
    if (!grid.cells.find((cell2) => !cell2.state)) {
      window.setTimeout(reset, 1e3);
    }
  }
});
tt.create(400, 400);
game.setMainLoop(update);
game.toggleStats();
game.start();