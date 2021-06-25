var t = Object.defineProperty, e = Object.defineProperties, s = Object.getOwnPropertyDescriptors, i = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable, a = (e2, s2, i2) => s2 in e2 ? t(e2, s2, { enumerable: true, configurable: true, writable: true, value: i2 }) : e2[s2] = i2, o = (t2, e2) => {
  for (var s2 in e2 || (e2 = {}))
    n.call(e2, s2) && a(t2, s2, e2[s2]);
  if (i)
    for (var s2 of i(e2))
      l.call(e2, s2) && a(t2, s2, e2[s2]);
  return t2;
}, c = (t2, i2) => e(t2, s(i2));
function b(t2, e2, s2) {
  return Math.max(t2, Math.min(e2, s2));
}
function Z() {
  return { width: window.innerWidth, height: window.innerHeight };
}
function x(t2) {
  return { width: t2.clientWidth || t2.width, height: t2.clientHeight || t2.height };
}
function f(t2, e2, s2, i2) {
  t2.width = e2 * (i2 || window.devicePixelRatio || 1), t2.height = s2 * (i2 || window.devicePixelRatio || 1), t2.style.width = e2 + "px", t2.style.height = s2 + "px";
}
function G(t2, e2, s2, i2) {
  const n2 = document.createElement("canvas");
  return w(n2, t2, e2, s2), i2 && (n2.oncontextmenu = (t3) => t3.preventDefault()), n2;
}
function w(t2, e2, s2, i2) {
  const n2 = i2 || window.devicePixelRatio || 1;
  f(t2, e2 || x(t2).width, s2 || x(t2).height, n2), n2 != 1 && t2.getContext("2d").setTransform(n2, 0, 0, n2, 0, 0);
}
function g(t2, e2) {
  window.addEventListener("DOMContentLoaded", () => {
    var s2;
    const i2 = (s2 = document.querySelector(e2)) != null ? s2 : document.createElement(e2);
    i2.appendChild(t2), document.querySelector("body").appendChild(i2);
  });
}
function W() {
  return self.document == null && self.window == null;
}
function R() {
  return performance.now() || Date.now();
}
function v(t2) {
  return window && t2 in window;
}
var C, X;
(X = C || (C = {}))[X.KeyboardPressed = 0] = "KeyboardPressed", X[X.KeyboardDown = 1] = "KeyboardDown", X[X.Mouse = 2] = "Mouse", X[X.Window = 3] = "Window", X[X.Custom = 4] = "Custom", X[X.All = 5] = "All";
const K = new class {
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
      case C.KeyboardDown:
        this.keyboardDownEvents.push(t2);
        break;
      case C.KeyboardPressed:
        this.keyboardPressedEvents.push(t2);
        break;
      case C.Mouse:
        this.mouseEvents.push(t2), window.addEventListener(t2.name, (e2) => t2.callback(e2));
        break;
      case C.Window:
        this.windowEvents.push(t2), this.bindEvents();
        break;
      case C.Custom:
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
const N = new class {
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
var I, H = ((I = function() {
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
  var n2 = (performance || Date).now(), l2 = n2, a2 = 0, o2 = t2(new I.Panel("FPS", "#0ff", "#002")), c2 = t2(new I.Panel("MS", "#0f0", "#020"));
  if (self.performance && self.performance.memory)
    var d2 = t2(new I.Panel("MB", "#f08", "#201"));
  return e2(0), { REVISION: 16, dom: i2, addPanel: t2, showPanel: e2, begin: function() {
    n2 = (performance || Date).now();
  }, end: function() {
    a2++;
    var t3 = (performance || Date).now();
    if (c2.update(t3 - n2, 200), t3 > l2 + 1e3 && (o2.update(1e3 * a2 / (t3 - l2), 100), l2 = t3, a2 = 0, d2)) {
      var e3 = performance.memory;
      d2.update(e3.usedJSHeapSize / 1048576, e3.jsHeapSizeLimit / 1048576);
    }
    return t3;
  }, update: function() {
    n2 = this.end();
  }, domElement: i2, setMode: e2 };
}).Panel = function(t2, e2, s2) {
  var i2 = 1 / 0, n2 = 0, l2 = Math.round, a2 = l2(window.devicePixelRatio || 1), o2 = 80 * a2, c2 = 48 * a2, d2 = 3 * a2, r2 = 2 * a2, h2 = 3 * a2, u2 = 15 * a2, m2 = 74 * a2, p2 = 30 * a2, b2 = document.createElement("canvas");
  b2.width = o2, b2.height = c2, b2.style.cssText = "width:80px;height:48px";
  var y2 = b2.getContext("2d");
  return y2.font = "bold " + 9 * a2 + "px Helvetica,Arial,sans-serif", y2.textBaseline = "top", y2.fillStyle = s2, y2.fillRect(0, 0, o2, c2), y2.fillStyle = e2, y2.fillText(t2, d2, r2), y2.fillRect(h2, u2, m2, p2), y2.fillStyle = s2, y2.globalAlpha = 0.9, y2.fillRect(h2, u2, m2, p2), { dom: b2, update: function(c3, Z2) {
    i2 = Math.min(i2, c3), n2 = Math.max(n2, c3), y2.fillStyle = s2, y2.globalAlpha = 1, y2.fillRect(0, 0, o2, u2), y2.fillStyle = e2, y2.fillText(l2(c3) + " " + t2 + " (" + l2(i2) + "-" + l2(n2) + ")", d2, r2), y2.drawImage(b2, h2 + a2, u2, m2 - a2, p2, h2, u2, m2 - a2, p2), y2.fillRect(h2 + m2 - a2, u2, a2, p2), y2.fillStyle = s2, y2.globalAlpha = 0.9, y2.fillRect(h2 + m2 - a2, u2, a2, l2((1 - c3 / Z2) * p2));
  } };
}, I);
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
class V extends Error {
  constructor(t2, e2) {
    super(e2 ? `[${e2.capitalize()}] - ${t2}` : t2), this.name = "EngineFailure";
  }
}
class J extends V {
  constructor(t2) {
    super(t2, "renderer");
  }
}
const U = { strokeStyle: "black", lineWidth: 2, lineJoin: "round", lineCap: "round", fillStyle: "transparent", globalAlpha: 1, globalCompositeOperation: "add" }, j = { font: "Roboto", size: 16, color: "black" }, F = 2 * Math.PI;
let E, z, Q, M, T, P = W() ? 4 : 2 * (window.devicePixelRatio || 1);
function B(t2) {
  return ~~(t2 * P) / P;
}
class O {
  static create(t2, e2) {
    let [s2, i2] = [Z().width, Z().height];
    const n2 = G(t2 || s2, e2 || i2);
    return g(n2, "main"), O.setContext(n2.getContext("2d")), n2;
  }
  static createFromCanvas(t2) {
    let e2 = document.querySelector(t2);
    if (!(e2 && e2 instanceof HTMLCanvasElement))
      throw new J("The selected element is not a canvas");
    return w(e2), O.setContext(e2.getContext("2d")), e2;
  }
  static setContext(t2) {
    E = t2;
  }
  static getContext() {
    return E;
  }
  static style(t2) {
    if (!E)
      throw new J("Context has not been initialize. Please use Renderer.setContext");
    const e2 = o(o({}, U), t2);
    if (e2 !== z) {
      for (let t3 in e2)
        E[t3] !== e2[t3] && (E[t3] = e2[t3]);
      z = e2;
    }
  }
  static clear(t2) {
    t2 ? (O.style({ fillStyle: t2 }), E.fillRect(0, 0, E.canvas.width, E.canvas.height)) : E.clearRect(0, 0, E.canvas.width, E.canvas.height);
  }
  static line(t2, e2, s2, i2, n2) {
    O.style(n2), E.beginPath(), E.moveTo(B(t2), B(e2)), E.lineTo(B(s2), B(i2)), E.stroke();
  }
  static rect(t2, e2, s2, i2, n2) {
    O.style(n2);
    const [l2, a2, o2, c2] = [B(t2), B(e2), B(s2), B(i2)];
    E.fillRect(l2, a2, o2, c2), E.strokeRect(l2, a2, o2, c2);
  }
  static rectFromCenter(t2, e2, s2, i2, n2) {
    return O.rect(t2 - s2 / 2, e2 - i2 / 2, s2, i2, n2);
  }
  static rectFromPoints(t2, e2, s2, i2, n2) {
    return O.rect(t2, e2, s2 - t2, i2 - e2, n2);
  }
  static poly(t2, e2) {
    if (t2.length) {
      O.style(e2), E.beginPath(), E.moveTo(B(t2[0].x), B(t2[0].y));
      for (let e3 = 1; e3 < t2.length; e3++)
        E.lineTo(B(t2[e3].x), B(t2[e3].y));
      E.stroke();
    }
  }
  static circle(t2, e2, s2, i2) {
    O.style(i2), E.beginPath(), E.arc(B(t2), B(e2), s2, 0, F), E.fill(), E.stroke();
  }
  static circleFromRect(t2, e2, s2, i2, n2) {
    return O.circle(t2 + s2 / 2, e2 + i2 / 2, Math.min(s2, i2) / 2, n2);
  }
  static point(t2, e2, s2) {
    O.circle(t2, e2, 5, s2);
  }
  static rectSprite(t2, e2, s2, i2, n2) {
    O.style({}), E.save(), E.translate(B(t2 + s2 / 2), B(e2 + i2 / 2)), E.scale(n2.scale.x, n2.scale.y), E.rotate(n2.rotation), E.drawImage(n2.image, B(s2 * n2.offset.x - s2 / 2), B(i2 * n2.offset.y - i2 / 2), B(s2), B(i2)), E.restore();
  }
  static circleSprite(t2, e2, s2, i2) {
    E.save(), E.beginPath(), E.arc(B(t2), B(e2), s2, 0, F), E.clip(), O.rectSprite(t2 - s2, e2 - s2, 2 * s2, 2 * s2, i2), E.restore();
  }
  static text(t2, e2, s2, i2) {
    if (E) {
      let t3 = o(o({}, j), i2);
      E.font = `${t3.size}px ${t3.font}`, O.style({ fillStyle: t3.color });
    }
    E.fillText(t2, e2, s2);
  }
  static tint(t2, e2, s2, i2, n2) {
    O.rect(e2, s2, i2, n2, { fillStyle: t2, globalCompositeOperation: "multiply", globalAlpha: 0.25 });
  }
  static beginFrame(t2) {
    O.clear(t2);
  }
  static endFrame() {
  }
}
class D {
  constructor(t2, e2) {
    this.title = t2, this.content = e2;
  }
}
class A {
  constructor(t2, e2) {
    this.methodName = t2, this.args = e2;
  }
}
function q() {
  return new Worker("data:application/javascript;base64,dmFyIGU9T2JqZWN0LmRlZmluZVByb3BlcnR5LHQ9T2JqZWN0LmRlZmluZVByb3BlcnRpZXMsaT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyxyPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsbj1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHM9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxhPSh0LGkscik9PmkgaW4gdD9lKHQsaSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6cn0pOnRbaV09cixvPShlLHQpPT57Zm9yKHZhciBpIGluIHR8fCh0PXt9KSluLmNhbGwodCxpKSYmYShlLGksdFtpXSk7aWYocilmb3IodmFyIGkgb2Ygcih0KSlzLmNhbGwodCxpKSYmYShlLGksdFtpXSk7cmV0dXJuIGV9O2Z1bmN0aW9uIGMoKXtyZXR1cm57d2lkdGg6d2luZG93LmlubmVyV2lkdGgsaGVpZ2h0OndpbmRvdy5pbm5lckhlaWdodH19ZnVuY3Rpb24gbChlKXtyZXR1cm57d2lkdGg6ZS5jbGllbnRXaWR0aHx8ZS53aWR0aCxoZWlnaHQ6ZS5jbGllbnRIZWlnaHR8fGUuaGVpZ2h0fX1mdW5jdGlvbiBoKGUsdCxpLHIpe2NvbnN0IG49cnx8d2luZG93LmRldmljZVBpeGVsUmF0aW98fDE7IWZ1bmN0aW9uKGUsdCxpLHIpe2Uud2lkdGg9dCoocnx8d2luZG93LmRldmljZVBpeGVsUmF0aW98fDEpLGUuaGVpZ2h0PWkqKHJ8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKSxlLnN0eWxlLndpZHRoPXQrInB4IixlLnN0eWxlLmhlaWdodD1pKyJweCJ9KGUsdHx8bChlKS53aWR0aCxpfHxsKGUpLmhlaWdodCxuKSwxIT1uJiZlLmdldENvbnRleHQoIjJkIikuc2V0VHJhbnNmb3JtKG4sMCwwLG4sMCwwKX1TdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0aGlzLnNsaWNlKDEpfTtjbGFzcyBkIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoZSx0KXtzdXBlcih0P2BbJHt0LmNhcGl0YWxpemUoKX1dIC0gJHtlfWA6ZSksdGhpcy5uYW1lPSJFbmdpbmVGYWlsdXJlIn19Y2xhc3MgdSBleHRlbmRzIGR7Y29uc3RydWN0b3IoZSl7c3VwZXIoZSwicmVuZGVyZXIiKX19Y29uc3QgZj17c3Ryb2tlU3R5bGU6ImJsYWNrIixsaW5lV2lkdGg6MixsaW5lSm9pbjoicm91bmQiLGxpbmVDYXA6InJvdW5kIixmaWxsU3R5bGU6InRyYW5zcGFyZW50IixnbG9iYWxBbHBoYToxLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoiYWRkIn0seD17Zm9udDoiUm9ib3RvIixzaXplOjE2LGNvbG9yOiJibGFjayJ9LHA9MipNYXRoLlBJO2xldCBnLHksYj1udWxsPT1zZWxmLmRvY3VtZW50JiZudWxsPT1zZWxmLndpbmRvdz80OjIqKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKTtmdW5jdGlvbiB3KGUpe3JldHVybn5+KGUqYikvYn1jbGFzcyBte3N0YXRpYyBjcmVhdGUoZSx0KXtsZXRbaSxyXT1bYygpLndpZHRoLGMoKS5oZWlnaHRdO2NvbnN0IG49ZnVuY3Rpb24oZSx0LGkscil7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJjYW52YXMiKTtyZXR1cm4gaChuLGUsdCxpKSxyJiYobi5vbmNvbnRleHRtZW51PWU9PmUucHJldmVudERlZmF1bHQoKSksbn0oZXx8aSx0fHxyKTtyZXR1cm4gZnVuY3Rpb24oZSx0KXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsKCgpPT57dmFyIGk7Y29uc3Qgcj1udWxsIT0oaT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpKT9pOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodCk7ci5hcHBlbmRDaGlsZChlKSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJib2R5IikuYXBwZW5kQ2hpbGQocil9KSl9KG4sIm1haW4iKSxtLnNldENvbnRleHQobi5nZXRDb250ZXh0KCIyZCIpKSxufXN0YXRpYyBjcmVhdGVGcm9tQ2FudmFzKGUpe2xldCB0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk7aWYoISh0JiZ0IGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpKXRocm93IG5ldyB1KCJUaGUgc2VsZWN0ZWQgZWxlbWVudCBpcyBub3QgYSBjYW52YXMiKTtyZXR1cm4gaCh0KSxtLnNldENvbnRleHQodC5nZXRDb250ZXh0KCIyZCIpKSx0fXN0YXRpYyBzZXRDb250ZXh0KGUpe2c9ZX1zdGF0aWMgZ2V0Q29udGV4dCgpe3JldHVybiBnfXN0YXRpYyBzdHlsZShlKXtpZighZyl0aHJvdyBuZXcgdSgiQ29udGV4dCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZS4gUGxlYXNlIHVzZSBSZW5kZXJlci5zZXRDb250ZXh0Iik7Y29uc3QgdD1vKG8oe30sZiksZSk7aWYodCE9PXkpe2ZvcihsZXQgZSBpbiB0KWdbZV0hPT10W2VdJiYoZ1tlXT10W2VdKTt5PXR9fXN0YXRpYyBjbGVhcihlKXtlPyhtLnN0eWxlKHtmaWxsU3R5bGU6ZX0pLGcuZmlsbFJlY3QoMCwwLGcuY2FudmFzLndpZHRoLGcuY2FudmFzLmhlaWdodCkpOmcuY2xlYXJSZWN0KDAsMCxnLmNhbnZhcy53aWR0aCxnLmNhbnZhcy5oZWlnaHQpfXN0YXRpYyBsaW5lKGUsdCxpLHIsbil7bS5zdHlsZShuKSxnLmJlZ2luUGF0aCgpLGcubW92ZVRvKHcoZSksdyh0KSksZy5saW5lVG8odyhpKSx3KHIpKSxnLnN0cm9rZSgpfXN0YXRpYyByZWN0KGUsdCxpLHIsbil7bS5zdHlsZShuKTtjb25zdFtzLGEsbyxjXT1bdyhlKSx3KHQpLHcoaSksdyhyKV07Zy5maWxsUmVjdChzLGEsbyxjKSxnLnN0cm9rZVJlY3QocyxhLG8sYyl9c3RhdGljIHJlY3RGcm9tQ2VudGVyKGUsdCxpLHIsbil7cmV0dXJuIG0ucmVjdChlLWkvMix0LXIvMixpLHIsbil9c3RhdGljIHJlY3RGcm9tUG9pbnRzKGUsdCxpLHIsbil7cmV0dXJuIG0ucmVjdChlLHQsaS1lLHItdCxuKX1zdGF0aWMgcG9seShlLHQpe2lmKGUubGVuZ3RoKXttLnN0eWxlKHQpLGcuYmVnaW5QYXRoKCksZy5tb3ZlVG8odyhlWzBdLngpLHcoZVswXS55KSk7Zm9yKGxldCB0PTE7dDxlLmxlbmd0aDt0KyspZy5saW5lVG8odyhlW3RdLngpLHcoZVt0XS55KSk7Zy5zdHJva2UoKX19c3RhdGljIGNpcmNsZShlLHQsaSxyKXttLnN0eWxlKHIpLGcuYmVnaW5QYXRoKCksZy5hcmModyhlKSx3KHQpLGksMCxwKSxnLmZpbGwoKSxnLnN0cm9rZSgpfXN0YXRpYyBjaXJjbGVGcm9tUmVjdChlLHQsaSxyLG4pe3JldHVybiBtLmNpcmNsZShlK2kvMix0K3IvMixNYXRoLm1pbihpLHIpLzIsbil9c3RhdGljIHBvaW50KGUsdCxpKXttLmNpcmNsZShlLHQsNSxpKX1zdGF0aWMgcmVjdFNwcml0ZShlLHQsaSxyLG4pe20uc3R5bGUoe30pLGcuc2F2ZSgpLGcudHJhbnNsYXRlKHcoZStpLzIpLHcodCtyLzIpKSxnLnNjYWxlKG4uc2NhbGUueCxuLnNjYWxlLnkpLGcucm90YXRlKG4ucm90YXRpb24pLGcuZHJhd0ltYWdlKG4uaW1hZ2UsdyhpKm4ub2Zmc2V0LngtaS8yKSx3KHIqbi5vZmZzZXQueS1yLzIpLHcoaSksdyhyKSksZy5yZXN0b3JlKCl9c3RhdGljIGNpcmNsZVNwcml0ZShlLHQsaSxyKXtnLnNhdmUoKSxnLmJlZ2luUGF0aCgpLGcuYXJjKHcoZSksdyh0KSxpLDAscCksZy5jbGlwKCksbS5yZWN0U3ByaXRlKGUtaSx0LWksMippLDIqaSxyKSxnLnJlc3RvcmUoKX1zdGF0aWMgdGV4dChlLHQsaSxyKXtpZihnKXtsZXQgZT1vKG8oe30seCkscik7Zy5mb250PWAke2Uuc2l6ZX1weCAke2UuZm9udH1gLG0uc3R5bGUoe2ZpbGxTdHlsZTplLmNvbG9yfSl9Zy5maWxsVGV4dChlLHQsaSl9c3RhdGljIHRpbnQoZSx0LGkscixuKXttLnJlY3QodCxpLHIsbix7ZmlsbFN0eWxlOmUsZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiJtdWx0aXBseSIsZ2xvYmFsQWxwaGE6LjI1fSl9c3RhdGljIGJlZ2luRnJhbWUoZSl7bS5jbGVhcihlKX1zdGF0aWMgZW5kRnJhbWUoKXt9fW5ldyBjbGFzcyBleHRlbmRzIGNsYXNze3NlbmRNZXNzYWdlVG9NYWluVGhyZWFkKGUsdCl7c2VsZi5wb3N0TWVzc2FnZSh7dGl0bGU6ZSxkYXRhOnR9KX1sb2coLi4uZSl7dGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgibG9nIiwuLi5lKX19e2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLmNhbnZhc1Jlc29sdXRpb249MSx0aGlzLm9mZnNjcmVlbkNhbnZhcz1udWxsLHRoaXMuY3R4PW51bGwsdGhpcy50ZXh0dXJlQWxpYXM9bmV3IE1hcCxzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCgoe2RhdGE6ZX0pPT50aGlzLm9uTWVzc2FnZShlLnRpdGxlLGUuY29udGVudCkpKX1vbk1lc3NhZ2UoZSx0KXtzd2l0Y2goZSl7Y2FzZSJpbml0Q2FudmFzIjp0aGlzLm9mZnNjcmVlbkNhbnZhcz10LmNhbnZhcyx0aGlzLmN0eD10aGlzLm9mZnNjcmVlbkNhbnZhcy5nZXRDb250ZXh0KCIyZCIpLG0uc2V0Q29udGV4dCh0aGlzLmN0eCksdGhpcy5zZXRTaXplKHQuZHByLHQud2lkdGgsdC5oZWlnaHQpLHRoaXMuc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoImluaXRpYWxpemVkIik7YnJlYWs7Y2FzZSJyZW5kZXIiOmZvcihsZXQgZSBvZiB0LnJlbmRlclN0YWNrKXRoaXMuaGFuZGxlRHJhd1JlcXVlc3QoZS5tZXRob2ROYW1lLGUuYXJncyk7YnJlYWs7Y2FzZSJuZXdUZXh0dXJlIjp0aGlzLnRleHR1cmVBbGlhcy5zZXQodC5pZCx0LnRleHR1cmUpfX1zZXRTaXplKGUsdCxpKXtjb25zdCByPShlfHwxKSp0aGlzLmNhbnZhc1Jlc29sdXRpb247dGhpcy5vZmZzY3JlZW5DYW52YXMud2lkdGg9dCpyLHRoaXMub2Zmc2NyZWVuQ2FudmFzLmhlaWdodD1pKnIsInNldFRyYW5zZm9ybSJpbiB0aGlzLmN0eCYmdGhpcy5jdHguc2V0VHJhbnNmb3JtKHIsMCwwLHIsMCwwKX1nZXRUZXh0dXJlKGUpe2NvbnN0IHI9dGhpcy50ZXh0dXJlQWxpYXMuZ2V0KGUudGV4dHVyZUlkKSx7c2NhbGU6bixyb3RhdGlvbjpzLG9mZnNldDphfT1lO3JldHVybiBjPW8oe30sciksdChjLGkoe3NjYWxlOm4scm90YXRpb246cyxvZmZzZXQ6YX0pKTt2YXIgY31oYW5kbGVEcmF3UmVxdWVzdChlLHQpe3N3aXRjaChlKXtjYXNlInN0eWxlIjptLnN0eWxlKG51bGw9PXQ/dm9pZCAwOnQub2JqKTticmVhaztjYXNlImNsZWFyIjptLmNsZWFyKG51bGw9PXQ/dm9pZCAwOnQuY29sb3IpO2JyZWFrO2Nhc2UibGluZSI6bS5saW5lKHQueDEsdC55MSx0LngyLHQueTIsdC5vYmopO2JyZWFrO2Nhc2UicmVjdCI6bS5yZWN0KHQueCx0LnksdC53aWR0aCx0LmhlaWdodCx0Lm9iaik7YnJlYWs7Y2FzZSJyZWN0RnJvbUNlbnRlciI6bS5yZWN0RnJvbUNlbnRlcih0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdC5vYmopO2JyZWFrO2Nhc2UicmVjdEZyb21Qb2ludHMiOm0ucmVjdEZyb21Qb2ludHModC54MSx0LnkxLHQueDIsdC55Mix0Lm9iaik7YnJlYWs7Y2FzZSJwb2x5IjptLnBvbHkodC5wb2ludHMsdC5vYmopO2JyZWFrO2Nhc2UiY2lyY2xlIjptLmNpcmNsZSh0LngsdC55LHQucmFkaXVzLHQub2JqKTticmVhaztjYXNlImNpcmNsZUZyb21SZWN0IjptLmNpcmNsZUZyb21SZWN0KHQueCx0LnksdC53aWR0aCx0LmhlaWdodCx0Lm9iaik7YnJlYWs7Y2FzZSJwb2ludCI6bS5wb2ludCh0LngsdC55LHQub2JqKTticmVhaztjYXNlInJlY3RTcHJpdGUiOm0ucmVjdFNwcml0ZSh0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdGhpcy5nZXRUZXh0dXJlKHQpKTticmVhaztjYXNlImNpcmNsZVNwcml0ZSI6bS5jaXJjbGVTcHJpdGUodC54LHQueSx0LnJhZGl1cyx0aGlzLmdldFRleHR1cmUodCkpO2JyZWFrO2Nhc2UidGV4dCI6bS50ZXh0KHQudGV4dCx0LngsdC55LHQuZm9udCk7YnJlYWs7Y2FzZSJ0aW50IjptLnRpbnQodC5jb2xvcix0LngsdC55LHQud2lkdGgsdC5oZWlnaHQpfX19Owo=", { type: "module" });
}
let $ = false, _ = [];
const tt = new Map();
class et {
  static get worker() {
    return M;
  }
  static get workerIsInitialized() {
    return $;
  }
  static get offscreenCanvas() {
    return Q;
  }
  static get renderStack() {
    return _;
  }
  static create(t2, e2) {
    let [s2, i2] = [Z().width, Z().height];
    return T = G(t2 || s2, e2 || i2, 1), et.initRenderWorker(T, t2 || s2, e2 || i2), g(T, "main"), T;
  }
  static createFromCanvas(t2) {
    if (T = document.querySelector(t2), !(T && T instanceof HTMLCanvasElement))
      throw new J("The selected element is not a canvas");
    return w(T, T.clientWidth, T.clientHeight, 1), et.initRenderWorker(T, T.width, T.height), T;
  }
  static initRenderWorker(t2, e2, s2) {
    ut.renderer instanceof et || ut.setRendererType("offscreen");
    let { clientWidth: i2, clientHeight: n2 } = t2;
    M = new q(), Q = t2.transferControlToOffscreen(), this.sendMessageToWorker("initCanvas", { width: e2 || i2, height: s2 || n2, canvas: Q, dpr: window.devicePixelRatio || 1 }, [Q]), M.onmessage = ({ data: { title: t3, data: e3 } }) => {
      switch (t3) {
        case "log":
          console.log("message from the renderer worker : ", e3);
          break;
        case "initialized":
          $ = true;
      }
    };
  }
  static addRenderCall(t2, e2) {
    _.push(new A(t2, e2 || {}));
  }
  static sendMessageToWorker(t2, e2, s2) {
    return M.postMessage(new D(t2, e2), s2 || []);
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
    if (tt.has(t2.id)) {
      const { scale: i3, rotation: n2, offset: l2 } = t2;
      this.addRenderCall(e2, c(o({}, s2), { textureId: t2.id, scale: i3, rotation: n2, offset: l2 }));
    } else
      (i2 = t2.convertToBitmap()) == null || i2.then((e3) => {
        tt.set(t2.id, e3), this.sendMessageToWorker("newTexture", { id: t2.id, texture: e3 });
      });
  }
  static rectSprite(t2, e2, s2, i2, n2) {
    this.handleTexture(n2, "rectSprite", { x: t2, y: e2, width: s2, height: i2 });
  }
  static async circleSprite(t2, e2, s2, i2) {
    this.handleTexture(i2, "circleSprite", { x: t2, y: e2, radius: s2 });
  }
  static text(t2, e2, s2, i2) {
    this.addRenderCall("text", { text: t2, x: e2, y: s2, font: i2 });
  }
  static tint(t2, e2, s2, i2, n2) {
    this.addRenderCall("circle", { color: t2, x: e2, y: s2, width: i2, height: n2 });
  }
  static beginFrame(t2) {
    _ = [], this.clear(t2);
  }
  static endFrame() {
    $ && (this.sendMessageToWorker("render", { renderStack: _ }), _ = []);
  }
}
const st = v("OffscreenCanvas") ? et : O;
let lt = [], at = 4;
const ot = ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
class ct {
  static addItem(t2, e2, s2) {
    ct.internalAddItem(t2, e2, s2);
  }
  static addButton(t2, e2, s2, i2) {
    ct.internalAddItem(t2, s2, i2, e2);
  }
  static internalAddItem(t2, e2, s2, i2) {
    const n2 = { callback: t2, position: e2, options: s2, onClick: i2 };
    lt.push(n2);
    const l2 = lt.length;
    window.addEventListener("load", () => ct.addToDom(n2, l2));
  }
  static init() {
    ct.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    z-index: 10;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n    /* Make the click event pass through */\n    pointer-events: none;\n}\n\n.ue-container>div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container>.top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container>.top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container>.bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container>.bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n}');
    const t2 = document.createElement("div");
    t2.classList.add("ue-interface", "ue-container");
    for (let e2 of ot) {
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
    lt.forEach((t2, e2) => {
      const s2 = t2.callback(), i2 = document.querySelector(`.ue-interface #item-${e2 + 1}`);
      i2 && i2.innerText !== s2 && (i2.innerText = s2);
    });
  }
  static statsShift(t2) {
    const e2 = document.querySelector(".top-left");
    e2 && (e2.style.top = `${t2}px`);
  }
  static setUpdateInterval(t2) {
    at = t2;
  }
  static get updateInterval() {
    return at;
  }
}
function dt() {
  const t2 = new H(), e2 = document.createElement("div");
  return e2.classList.toggle("stats"), t2.showPanel(0), e2.appendChild(t2.dom), document.body.appendChild(e2), ct.statsShift(48), t2;
}
class rt {
  constructor(t2, e2 = 60) {
    if (this.requestId = 0, this.animate = t2, this.fps = e2, !window)
      throw new V("No window context", "core");
  }
  start() {
    let t2 = R();
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
let ht = "normal";
class ut {
  constructor(t2, e2, s2 = 60) {
    this.fps = 60, this.name = t2, this.env = e2, this.tick = 0, this.stats = null, this.showStatsPanel = true, this.gameLoop = this.env ? () => e2.update() : null, this.fps = s2;
  }
  static setRendererType(t2) {
    ht = t2;
  }
  static get renderer() {
    return ht === "normal" ? O : st;
  }
  toggleStats(t2) {
    this.showStatsPanel = t2 !== void 0 ? t2 : !this.showStatsPanel, this.showStatsPanel ? this.stats = dt() : (this.stats = null, document.querySelector(".stats") && document.querySelector(".stats").remove());
  }
  makeAnimationFrame() {
    this.animationFrame = new rt((t2) => this.update(t2), this.fps);
  }
  setMainLoop(t2) {
    this.gameLoop = t2, this.makeAnimationFrame();
  }
  setFPS(t2) {
    this.fps = t2, this.makeAnimationFrame();
  }
  update(t2) {
    var e2, s2;
    (e2 = this.stats) == null || e2.begin(), K.tick(), N.tick(t2), this.gameLoop && this.gameLoop(t2), this.tick % ct.updateInterval == 0 && ct.update(), (s2 = this.stats) == null || s2.end(), this.tick++;
  }
  start() {
    if (!this.gameLoop)
      throw new Error("No game loop");
    if (!this.animationFrame)
      throw new Error("AnimationFrame");
    window.addEventListener("DOMContentLoaded", () => {
      var t2;
      this.name && (document.title = this.name), K.init(), N.init(), ct.init(), this.showStatsPanel && (this.stats = dt()), (t2 = this.animationFrame) == null || t2.start();
    });
  }
}
const wt = { linear: (t2) => t2, smoothStep: (t2) => (3 - 2 * t2) * t2 ** 2, smootherStep: (t2) => (6 * t2 * t2 - 15 * t2 + 10) * t2 ** 3, easeIn: (t2) => t2 ** 2, easeOut: (t2) => 1 - (1 - t2) ** 2, easeInOut: (t2) => t2 < 0.5 ? 2 * t2 * t2 : 1 - Math.pow(-2 * t2 + 2, 2) / 2, easeInBack: (t2) => 2.70158 * t2 ** 3 - 1.70158 * t2 ** 2, easeOutBack: (t2) => 1 + 1.70158 * Math.pow(t2 - 1, 3) + 2.70158 * Math.pow(t2 - 1, 2), easeInOutBack: (t2) => t2 < 0.5 ? Math.pow(2 * t2, 2) * (7.189819 * t2 - 2.5949095) / 2 : (Math.pow(2 * t2 - 2, 2) * (3.5949095 * (2 * t2 - 2) + 2.5949095) + 2) / 2 }, gt = { autostart: false, loop: false };
class Lt {
  constructor(t2, e2, s2, i2 = wt.linear, n2 = {}) {
    if (this.hasStarted = false, this.isPaused = false, this.isEnded = false, this.isReversed = false, this.lastT = 0, this.from = t2, this.to = e2, this.duration = s2, i2 instanceof Function)
      this.easing = i2;
    else {
      if (typeof i2 != "string" || !(i2 in wt))
        throw new V("Unknow easing parameter", "animation");
      this.easing = wt[i2];
    }
    this.options = o(o({}, gt), n2), this.value = this.from, this.speed = (this.to - this.from) / this.duration, N.add(this);
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
    let e2 = b(0, this.lastT + t2 * this.speed / Math.abs(this.to - this.from), 1);
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
let linear_x = new Lt(0, dimension, 2e3, wt.linear, { autostart: true, loop: true });
let linear_y = new Lt(dimension, 0, 2e3, "linear", { autostart: true, loop: true });
let easeIn_y = new Lt(dimension, 0, 2e3, "easeIn", { autostart: true, loop: true });
let easeOut_y = new Lt(dimension, 0, 2e3, wt.easeOut, { autostart: true, loop: true });
let easeInOut_y = new Lt(dimension, 0, 2e3, wt.easeInOutBack, { autostart: true, loop: true });
let speed = new Lt(0, width - 2 * offset, 2500, wt.easeInOut, { autostart: true, loop: true });
let speed2 = new Lt(0, width - 2 * offset, 2500, wt.linear, { autostart: true, loop: true });
let speed3 = new Lt(0, width - 2 * offset, 2500, wt.easeIn, { autostart: true, loop: true });
function draw(ts) {
  O.clear();
  O.text("Linear", offset, offset + dimension + 20, { size: 16 });
  O.rect(offset, offset, dimension, dimension, { lineWidth: 0.5 });
  O.circle(offset + linear_x.value, offset + linear_y.value, 0.5);
  O.rect(dimension + 2 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  O.circle(dimension + 2 * offset + linear_x.value, offset + easeIn_y.value, 1);
  O.rect(2 * dimension + 3 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  O.circle(2 * dimension + 3 * offset + linear_x.value, offset + easeOut_y.value, 1);
  O.rect(3 * dimension + 4 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  O.circle(3 * dimension + 4 * offset + linear_x.value, offset + easeInOut_y.value, 1);
  O.circle(offset + speed.value, height / 2, 10);
  O.circle(offset + speed2.value, height / 2 + 25, 10);
  O.circle(offset + speed3.value, height / 2 + 50, 10);
}
let pause = false;
ct.addButton(() => pause ? "||" : ">", (e) => {
  pause = !pause;
  linear_x.toggle();
  linear_y.toggle();
});
ct.addButton(() => "Reset", (e) => {
  linear_x.reset();
  linear_y.reset();
});
const game = new ut("Animation Test");
O.create();
game.setMainLoop(draw);
game.toggleStats();
game.setFPS(60);
game.start();
