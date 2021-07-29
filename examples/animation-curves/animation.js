var t = Object.defineProperty, e = Object.defineProperties, s = Object.getOwnPropertyDescriptors, i = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, a = Object.prototype.propertyIsEnumerable, l = (e2, s2, i2) => s2 in e2 ? t(e2, s2, { enumerable: true, configurable: true, writable: true, value: i2 }) : e2[s2] = i2, o = (t2, e2) => {
  for (var s2 in e2 || (e2 = {}))
    n.call(e2, s2) && l(t2, s2, e2[s2]);
  if (i)
    for (var s2 of i(e2))
      a.call(e2, s2) && l(t2, s2, e2[s2]);
  return t2;
}, c = (t2, i2) => e(t2, s(i2));
class h {
  constructor(t2, e2) {
    this.x = t2, this.y = e2;
  }
  clone() {
    return new h(this.x, this.y);
  }
  add(t2) {
    return new h(this.x + t2.x, this.y + t2.y);
  }
  multiply(t2) {
    return new h(this.x * t2, this.y * t2);
  }
  dot(t2) {
    return this.x * t2.x + this.y * t2.y;
  }
  dist(t2) {
    return Math.sqrt((this.x - t2.x) ** 2 + (this.y - t2.y) ** 2);
  }
}
const m = new h(0, 0);
function y(t2, e2, s2) {
  return t2 > s2 ? y(s2, e2, t2) : Math.max(t2, Math.min(e2, s2));
}
function Z() {
  return { width: window.innerWidth, height: window.innerHeight };
}
function x(t2) {
  return { width: t2.clientWidth || t2.width, height: t2.clientHeight || t2.height };
}
function G(t2, e2, s2, i2) {
  t2.width = e2 * (i2 || window.devicePixelRatio || 1), t2.height = s2 * (i2 || window.devicePixelRatio || 1), t2.style.width = e2 + "px", t2.style.height = s2 + "px";
}
function f(t2, e2, s2, i2) {
  const n2 = document.createElement("canvas");
  return g(n2, t2, e2, s2), i2 && (n2.oncontextmenu = (t3) => t3.preventDefault()), n2;
}
function g(t2, e2, s2, i2) {
  const n2 = i2 || window.devicePixelRatio || 1;
  G(t2, e2 || x(t2).width, s2 || x(t2).height, n2), n2 != 1 && t2.getContext("2d").setTransform(n2, 0, 0, n2, 0, 0);
}
function w(t2, e2) {
  window.addEventListener("DOMContentLoaded", () => {
    var s2;
    const i2 = (s2 = document.querySelector(e2)) != null ? s2 : document.createElement(e2);
    i2.appendChild(t2), document.querySelector("body").appendChild(i2);
  });
}
function C() {
  return self.document == null && self.window == null;
}
function v() {
  return performance.now() || Date.now();
}
function X(t2) {
  return window && t2 in window;
}
var S, R;
(R = S || (S = {}))[R.KeyboardPressed = 0] = "KeyboardPressed", R[R.KeyboardDown = 1] = "KeyboardDown", R[R.Mouse = 2] = "Mouse", R[R.Window = 3] = "Window", R[R.Custom = 4] = "Custom", R[R.All = 5] = "All";
const K = new class {
  constructor() {
    this.windowEvents = [], this.customEvents = [], this.mouseEvents = [], this.keyboardEvents = [], this.currentKeyEvents = [];
  }
  init() {
    window.addEventListener("keydown", (t2) => {
      this.currentKeyEvents.find((e2) => e2.code === t2.code) || this.currentKeyEvents.push(t2), this.keyboardEvents.filter((t3) => t3.type === S.KeyboardPressed).forEach((e2) => {
        t2.code === e2.name && e2.callback(t2);
      });
    }), window.addEventListener("keyup", (t2) => {
      this.currentKeyEvents.length && (this.currentKeyEvents = this.currentKeyEvents.filter((e2) => e2.code !== t2.code));
    }), this.bindEvents();
  }
  addEvent(t2) {
    switch (t2.type) {
      case S.KeyboardDown:
      case S.KeyboardPressed:
        this.keyboardEvents.push(t2);
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
    this.currentKeyEvents.length && this.keyboardEvents.filter((t2) => t2.type === S.KeyboardDown).forEach((t2) => {
      this.currentKeyEvents.forEach((e2) => {
        e2.code === t2.name && t2.callback(e2);
      });
    });
  }
}();
const V = new class {
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
var Y, I = ((Y = function() {
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
  var n2 = (performance || Date).now(), a2 = n2, l2 = 0, o2 = t2(new Y.Panel("FPS", "#0ff", "#002")), c2 = t2(new Y.Panel("MS", "#0f0", "#020"));
  if (self.performance && self.performance.memory)
    var d2 = t2(new Y.Panel("MB", "#f08", "#201"));
  return e2(0), { REVISION: 16, dom: i2, addPanel: t2, showPanel: e2, begin: function() {
    n2 = (performance || Date).now();
  }, end: function() {
    l2++;
    var t3 = (performance || Date).now();
    if (c2.update(t3 - n2, 200), t3 > a2 + 1e3 && (o2.update(1e3 * l2 / (t3 - a2), 100), a2 = t3, l2 = 0, d2)) {
      var e3 = performance.memory;
      d2.update(e3.usedJSHeapSize / 1048576, e3.jsHeapSizeLimit / 1048576);
    }
    return t3;
  }, update: function() {
    n2 = this.end();
  }, domElement: i2, setMode: e2 };
}).Panel = function(t2, e2, s2) {
  var i2 = 1 / 0, n2 = 0, a2 = Math.round, l2 = a2(window.devicePixelRatio || 1), o2 = 80 * l2, c2 = 48 * l2, d2 = 3 * l2, r2 = 2 * l2, h2 = 3 * l2, u2 = 15 * l2, m2 = 74 * l2, p2 = 30 * l2, y2 = document.createElement("canvas");
  y2.width = o2, y2.height = c2, y2.style.cssText = "width:80px;height:48px";
  var b2 = y2.getContext("2d");
  return b2.font = "bold " + 9 * l2 + "px Helvetica,Arial,sans-serif", b2.textBaseline = "top", b2.fillStyle = s2, b2.fillRect(0, 0, o2, c2), b2.fillStyle = e2, b2.fillText(t2, d2, r2), b2.fillRect(h2, u2, m2, p2), b2.fillStyle = s2, b2.globalAlpha = 0.9, b2.fillRect(h2, u2, m2, p2), { dom: y2, update: function(c3, Z2) {
    i2 = Math.min(i2, c3), n2 = Math.max(n2, c3), b2.fillStyle = s2, b2.globalAlpha = 1, b2.fillRect(0, 0, o2, u2), b2.fillStyle = e2, b2.fillText(a2(c3) + " " + t2 + " (" + a2(i2) + "-" + a2(n2) + ")", d2, r2), b2.drawImage(y2, h2 + l2, u2, m2 - l2, p2, h2, u2, m2 - l2, p2), b2.fillRect(h2 + m2 - l2, u2, l2, p2), b2.fillStyle = s2, b2.globalAlpha = 0.9, b2.fillRect(h2 + m2 - l2, u2, l2, a2((1 - c3 / Z2) * p2));
  } };
}, Y);
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
class N extends Error {
  constructor(t2, e2) {
    super(e2 ? `[${e2.capitalize()}] - ${t2}` : t2), this.name = "EngineFailure";
  }
}
class Q extends N {
  constructor(t2) {
    super(t2, "renderer");
  }
}
const M = { strokeStyle: "black", lineWidth: 2, lineJoin: "round", lineCap: "round", fillStyle: "transparent", globalAlpha: 1, globalCompositeOperation: "add" }, U = { font: "Roboto", size: 16, color: "black", textAlign: "left", textBaseline: "alphabetic" }, F = 2 * Math.PI;
let E, z, J, T, j, P = C() ? 4 : 2 * (window.devicePixelRatio || 1), O = m;
function B(t2) {
  return ~~(t2 * P) / P;
}
class D {
  static create(t2, e2) {
    let [s2, i2] = [Z().width, Z().height];
    const n2 = f(t2 || s2, e2 || i2);
    return w(n2, "main"), D.setContext(n2.getContext("2d")), n2;
  }
  static createFromCanvas(t2) {
    let e2 = document.querySelector(t2);
    if (!(e2 && e2 instanceof HTMLCanvasElement))
      throw new Q("The selected element is not a canvas");
    return g(e2), D.setContext(e2.getContext("2d")), e2;
  }
  static setContext(t2) {
    E = t2;
  }
  static getContext() {
    return E;
  }
  static setOffset(t2, e2) {
    O = new h(t2, e2);
  }
  static getOffset() {
    return O;
  }
  static style(t2) {
    if (!E)
      throw new Q("Context has not been initialize. Please use Renderer.setContext");
    const e2 = o(o({}, M), t2);
    if (e2 !== z) {
      for (let t3 in e2)
        E[t3] !== e2[t3] && (E[t3] = e2[t3]);
      z = e2;
    }
  }
  static textStyle(t2) {
    if (E) {
      let e2 = o(o({}, U), t2);
      E.font = `${e2.size}px ${e2.font}`, delete e2.size, delete e2.font, D.style(o({ fillStyle: e2.color }, e2));
    }
  }
  static clear(t2) {
    t2 ? (D.style({ fillStyle: t2 }), E.fillRect(0, 0, E.canvas.width, E.canvas.height)) : E.clearRect(0, 0, E.canvas.width, E.canvas.height);
  }
  static line(t2, e2, s2, i2, n2) {
    D.style(n2), E.beginPath(), E.moveTo(B(O.x + t2), B(O.y + e2)), E.lineTo(B(O.x + s2), B(O.y + i2)), E.stroke();
  }
  static rect(t2, e2, s2, i2, n2) {
    D.style(n2);
    const [a2, l2, o2, c2] = [B(t2 + O.x), B(e2 + O.y), B(s2), B(i2)];
    E.fillRect(a2, l2, o2, c2), E.strokeRect(a2, l2, o2, c2);
  }
  static rectFromCenter(t2, e2, s2, i2, n2) {
    return D.rect(t2 - s2 / 2, e2 - i2 / 2, s2, i2, n2);
  }
  static rectFromPoints(t2, e2, s2, i2, n2) {
    return D.rect(t2, e2, s2 - t2, i2 - e2, n2);
  }
  static poly(t2, e2) {
    if (t2.length) {
      D.style(e2), E.beginPath(), E.moveTo(B(t2[0].x + O.x), B(t2[0].y + O.y));
      for (let e3 = 1; e3 < t2.length; e3++)
        E.lineTo(B(t2[e3].x + O.x), B(t2[e3].y + O.y));
      E.stroke();
    }
  }
  static circle(t2, e2, s2, i2) {
    D.style(i2), E.beginPath(), E.arc(B(t2 + O.x), B(e2 + O.y), s2, 0, F), E.fill(), E.stroke();
  }
  static circleFromRect(t2, e2, s2, i2, n2) {
    return D.circle(t2 + s2 / 2, e2 + i2 / 2, Math.min(s2, i2) / 2, n2);
  }
  static point(t2, e2, s2) {
    D.circle(t2, e2, 5, s2);
  }
  static rectSprite(t2, e2, s2, i2, n2) {
    n2.isLoaded && (D.style({}), E.save(), E.translate(B(t2 + s2 / 2 + O.x), B(e2 + i2 / 2 + O.y)), E.scale(n2.scale.x, n2.scale.y), E.rotate(n2.rotation), E.drawImage(n2.image, B(s2 * n2.offset.x - s2 / 2), B(i2 * n2.offset.y - i2 / 2), B(s2), B(i2)), E.restore());
  }
  static circleSprite(t2, e2, s2, i2) {
    i2.isLoaded && (E.save(), E.beginPath(), E.arc(B(t2 + O.x), B(e2 + O.y), s2, 0, F), E.clip(), D.rectSprite(t2 - s2, e2 - s2, 2 * s2, 2 * s2, i2), E.restore());
  }
  static text(t2, e2, s2, i2) {
    D.textStyle(i2), E.fillText(t2, e2, s2);
  }
  static centeredText(t2, e2, s2, i2) {
    D.text(t2, e2, s2, c(o({}, i2), { textAlign: "center", textBaseline: "middle" }));
  }
  static tint(t2, e2, s2, i2, n2) {
    D.rect(e2, s2, i2, n2, { fillStyle: t2, globalCompositeOperation: "multiply", globalAlpha: 0.25 });
  }
  static beginFrame(t2) {
    D.clear(t2);
  }
  static endFrame() {
  }
}
class A {
  constructor(t2, e2) {
    this.title = t2, this.content = e2;
  }
}
class q {
  constructor(t2, e2) {
    this.methodName = t2, this.args = e2;
  }
}
function $() {
  return new Worker("data:application/javascript;base64,dmFyIGU9T2JqZWN0LmRlZmluZVByb3BlcnR5LHQ9T2JqZWN0LmRlZmluZVByb3BlcnRpZXMsaT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyxzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMscj1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LG49T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxhPSh0LGkscyk9PmkgaW4gdD9lKHQsaSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6c30pOnRbaV09cyxjPShlLHQpPT57Zm9yKHZhciBpIGluIHR8fCh0PXt9KSlyLmNhbGwodCxpKSYmYShlLGksdFtpXSk7aWYocylmb3IodmFyIGkgb2Ygcyh0KSluLmNhbGwodCxpKSYmYShlLGksdFtpXSk7cmV0dXJuIGV9LG89KGUscyk9PnQoZSxpKHMpKTtmdW5jdGlvbiBsKCl7cmV0dXJue3dpZHRoOndpbmRvdy5pbm5lcldpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9fWZ1bmN0aW9uIGgoZSl7cmV0dXJue3dpZHRoOmUuY2xpZW50V2lkdGh8fGUud2lkdGgsaGVpZ2h0OmUuY2xpZW50SGVpZ2h0fHxlLmhlaWdodH19ZnVuY3Rpb24gZChlLHQsaSxzKXtjb25zdCByPXN8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxOyFmdW5jdGlvbihlLHQsaSxzKXtlLndpZHRoPXQqKHN8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKSxlLmhlaWdodD1pKihzfHx3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSksZS5zdHlsZS53aWR0aD10KyJweCIsZS5zdHlsZS5oZWlnaHQ9aSsicHgifShlLHR8fGgoZSkud2lkdGgsaXx8aChlKS5oZWlnaHQsciksMSE9ciYmZS5nZXRDb250ZXh0KCIyZCIpLnNldFRyYW5zZm9ybShyLDAsMCxyLDAsMCl9Y2xhc3MgeHtjb25zdHJ1Y3RvcihlLHQpe3RoaXMueD1lLHRoaXMueT10fWNsb25lKCl7cmV0dXJuIG5ldyB4KHRoaXMueCx0aGlzLnkpfWFkZChlKXtyZXR1cm4gbmV3IHgodGhpcy54K2UueCx0aGlzLnkrZS55KX1tdWx0aXBseShlKXtyZXR1cm4gbmV3IHgodGhpcy54KmUsdGhpcy55KmUpfWRvdChlKXtyZXR1cm4gdGhpcy54KmUueCt0aGlzLnkqZS55fWRpc3QoZSl7cmV0dXJuIE1hdGguc3FydCgodGhpcy54LWUueCkqKjIrKHRoaXMueS1lLnkpKioyKX19Y29uc3QgdT1uZXcgeCgwLDApO1N0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK3RoaXMuc2xpY2UoMSl9O2NsYXNzIHkgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihlLHQpe3N1cGVyKHQ/YFske3QuY2FwaXRhbGl6ZSgpfV0gLSAke2V9YDplKSx0aGlzLm5hbWU9IkVuZ2luZUZhaWx1cmUifX1jbGFzcyBmIGV4dGVuZHMgeXtjb25zdHJ1Y3RvcihlKXtzdXBlcihlLCJyZW5kZXJlciIpfX1jb25zdCBnPXtzdHJva2VTdHlsZToiYmxhY2siLGxpbmVXaWR0aDoyLGxpbmVKb2luOiJyb3VuZCIsbGluZUNhcDoicm91bmQiLGZpbGxTdHlsZToidHJhbnNwYXJlbnQiLGdsb2JhbEFscGhhOjEsZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiJhZGQifSxwPXtmb250OiJSb2JvdG8iLHNpemU6MTYsY29sb3I6ImJsYWNrIix0ZXh0QWxpZ246ImxlZnQiLHRleHRCYXNlbGluZToiYWxwaGFiZXRpYyJ9LHc9MipNYXRoLlBJO2xldCBiLG0sdj1udWxsPT1zZWxmLmRvY3VtZW50JiZudWxsPT1zZWxmLndpbmRvdz80OjIqKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKSxDPXU7ZnVuY3Rpb24gayhlKXtyZXR1cm5+fihlKnYpL3Z9Y2xhc3MgVHtzdGF0aWMgY3JlYXRlKGUsdCl7bGV0W2ksc109W2woKS53aWR0aCxsKCkuaGVpZ2h0XTtjb25zdCByPWZ1bmN0aW9uKGUsdCxpLHMpe2NvbnN0IHI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiY2FudmFzIik7cmV0dXJuIGQocixlLHQsaSkscyYmKHIub25jb250ZXh0bWVudT1lPT5lLnByZXZlbnREZWZhdWx0KCkpLHJ9KGV8fGksdHx8cyk7cmV0dXJuIGZ1bmN0aW9uKGUsdCl7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIkRPTUNvbnRlbnRMb2FkZWQiLCgoKT0+e3ZhciBpO2NvbnN0IHM9bnVsbCE9KGk9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KSk/aTpkb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpO3MuYXBwZW5kQ2hpbGQoZSksZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiYm9keSIpLmFwcGVuZENoaWxkKHMpfSkpfShyLCJtYWluIiksVC5zZXRDb250ZXh0KHIuZ2V0Q29udGV4dCgiMmQiKSkscn1zdGF0aWMgY3JlYXRlRnJvbUNhbnZhcyhlKXtsZXQgdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUpO2lmKCEodCYmdCBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSl0aHJvdyBuZXcgZigiVGhlIHNlbGVjdGVkIGVsZW1lbnQgaXMgbm90IGEgY2FudmFzIik7cmV0dXJuIGQodCksVC5zZXRDb250ZXh0KHQuZ2V0Q29udGV4dCgiMmQiKSksdH1zdGF0aWMgc2V0Q29udGV4dChlKXtiPWV9c3RhdGljIGdldENvbnRleHQoKXtyZXR1cm4gYn1zdGF0aWMgc2V0T2Zmc2V0KGUsdCl7Qz1uZXcgeChlLHQpfXN0YXRpYyBnZXRPZmZzZXQoKXtyZXR1cm4gQ31zdGF0aWMgc3R5bGUoZSl7aWYoIWIpdGhyb3cgbmV3IGYoIkNvbnRleHQgaGFzIG5vdCBiZWVuIGluaXRpYWxpemUuIFBsZWFzZSB1c2UgUmVuZGVyZXIuc2V0Q29udGV4dCIpO2NvbnN0IHQ9YyhjKHt9LGcpLGUpO2lmKHQhPT1tKXtmb3IobGV0IGUgaW4gdCliW2VdIT09dFtlXSYmKGJbZV09dFtlXSk7bT10fX1zdGF0aWMgdGV4dFN0eWxlKGUpe2lmKGIpe2xldCB0PWMoYyh7fSxwKSxlKTtiLmZvbnQ9YCR7dC5zaXplfXB4ICR7dC5mb250fWAsZGVsZXRlIHQuc2l6ZSxkZWxldGUgdC5mb250LFQuc3R5bGUoYyh7ZmlsbFN0eWxlOnQuY29sb3J9LHQpKX19c3RhdGljIGNsZWFyKGUpe2U/KFQuc3R5bGUoe2ZpbGxTdHlsZTplfSksYi5maWxsUmVjdCgwLDAsYi5jYW52YXMud2lkdGgsYi5jYW52YXMuaGVpZ2h0KSk6Yi5jbGVhclJlY3QoMCwwLGIuY2FudmFzLndpZHRoLGIuY2FudmFzLmhlaWdodCl9c3RhdGljIGxpbmUoZSx0LGkscyxyKXtULnN0eWxlKHIpLGIuYmVnaW5QYXRoKCksYi5tb3ZlVG8oayhDLngrZSksayhDLnkrdCkpLGIubGluZVRvKGsoQy54K2kpLGsoQy55K3MpKSxiLnN0cm9rZSgpfXN0YXRpYyByZWN0KGUsdCxpLHMscil7VC5zdHlsZShyKTtjb25zdFtuLGEsYyxvXT1bayhlK0MueCksayh0K0MueSksayhpKSxrKHMpXTtiLmZpbGxSZWN0KG4sYSxjLG8pLGIuc3Ryb2tlUmVjdChuLGEsYyxvKX1zdGF0aWMgcmVjdEZyb21DZW50ZXIoZSx0LGkscyxyKXtyZXR1cm4gVC5yZWN0KGUtaS8yLHQtcy8yLGkscyxyKX1zdGF0aWMgcmVjdEZyb21Qb2ludHMoZSx0LGkscyxyKXtyZXR1cm4gVC5yZWN0KGUsdCxpLWUscy10LHIpfXN0YXRpYyBwb2x5KGUsdCl7aWYoZS5sZW5ndGgpe1Quc3R5bGUodCksYi5iZWdpblBhdGgoKSxiLm1vdmVUbyhrKGVbMF0ueCtDLngpLGsoZVswXS55K0MueSkpO2ZvcihsZXQgdD0xO3Q8ZS5sZW5ndGg7dCsrKWIubGluZVRvKGsoZVt0XS54K0MueCksayhlW3RdLnkrQy55KSk7Yi5zdHJva2UoKX19c3RhdGljIGNpcmNsZShlLHQsaSxzKXtULnN0eWxlKHMpLGIuYmVnaW5QYXRoKCksYi5hcmMoayhlK0MueCksayh0K0MueSksaSwwLHcpLGIuZmlsbCgpLGIuc3Ryb2tlKCl9c3RhdGljIGNpcmNsZUZyb21SZWN0KGUsdCxpLHMscil7cmV0dXJuIFQuY2lyY2xlKGUraS8yLHQrcy8yLE1hdGgubWluKGkscykvMixyKX1zdGF0aWMgcG9pbnQoZSx0LGkpe1QuY2lyY2xlKGUsdCw1LGkpfXN0YXRpYyByZWN0U3ByaXRlKGUsdCxpLHMscil7ci5pc0xvYWRlZCYmKFQuc3R5bGUoe30pLGIuc2F2ZSgpLGIudHJhbnNsYXRlKGsoZStpLzIrQy54KSxrKHQrcy8yK0MueSkpLGIuc2NhbGUoci5zY2FsZS54LHIuc2NhbGUueSksYi5yb3RhdGUoci5yb3RhdGlvbiksYi5kcmF3SW1hZ2Uoci5pbWFnZSxrKGkqci5vZmZzZXQueC1pLzIpLGsocypyLm9mZnNldC55LXMvMiksayhpKSxrKHMpKSxiLnJlc3RvcmUoKSl9c3RhdGljIGNpcmNsZVNwcml0ZShlLHQsaSxzKXtzLmlzTG9hZGVkJiYoYi5zYXZlKCksYi5iZWdpblBhdGgoKSxiLmFyYyhrKGUrQy54KSxrKHQrQy55KSxpLDAsdyksYi5jbGlwKCksVC5yZWN0U3ByaXRlKGUtaSx0LWksMippLDIqaSxzKSxiLnJlc3RvcmUoKSl9c3RhdGljIHRleHQoZSx0LGkscyl7VC50ZXh0U3R5bGUocyksYi5maWxsVGV4dChlLHQsaSl9c3RhdGljIGNlbnRlcmVkVGV4dChlLHQsaSxzKXtULnRleHQoZSx0LGksbyhjKHt9LHMpLHt0ZXh0QWxpZ246ImNlbnRlciIsdGV4dEJhc2VsaW5lOiJtaWRkbGUifSkpfXN0YXRpYyB0aW50KGUsdCxpLHMscil7VC5yZWN0KHQsaSxzLHIse2ZpbGxTdHlsZTplLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoibXVsdGlwbHkiLGdsb2JhbEFscGhhOi4yNX0pfXN0YXRpYyBiZWdpbkZyYW1lKGUpe1QuY2xlYXIoZSl9c3RhdGljIGVuZEZyYW1lKCl7fX1uZXcgY2xhc3MgZXh0ZW5kcyBjbGFzc3tzZW5kTWVzc2FnZVRvTWFpblRocmVhZChlLHQpe3NlbGYucG9zdE1lc3NhZ2Uoe3RpdGxlOmUsZGF0YTp0fSl9bG9nKC4uLmUpe3RoaXMuc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoImxvZyIsLi4uZSl9fXtjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5jYW52YXNSZXNvbHV0aW9uPTEsdGhpcy5vZmZzY3JlZW5DYW52YXM9bnVsbCx0aGlzLmN0eD1udWxsLHRoaXMudGV4dHVyZUFsaWFzPW5ldyBNYXAsc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwoKHtkYXRhOmV9KT0+dGhpcy5vbk1lc3NhZ2UoZS50aXRsZSxlLmNvbnRlbnQpKSl9b25NZXNzYWdlKGUsdCl7c3dpdGNoKGUpe2Nhc2UiaW5pdENhbnZhcyI6dGhpcy5vZmZzY3JlZW5DYW52YXM9dC5jYW52YXMsdGhpcy5jdHg9dGhpcy5vZmZzY3JlZW5DYW52YXMuZ2V0Q29udGV4dCgiMmQiKSxULnNldENvbnRleHQodGhpcy5jdHgpLHRoaXMuc2V0U2l6ZSh0LmRwcix0LndpZHRoLHQuaGVpZ2h0KSx0aGlzLnNlbmRNZXNzYWdlVG9NYWluVGhyZWFkKCJpbml0aWFsaXplZCIpO2JyZWFrO2Nhc2UicmVuZGVyIjpmb3IobGV0IGUgb2YgdC5yZW5kZXJTdGFjayl0aGlzLmhhbmRsZURyYXdSZXF1ZXN0KGUubWV0aG9kTmFtZSxlLmFyZ3MpO2JyZWFrO2Nhc2UibmV3VGV4dHVyZSI6dGhpcy50ZXh0dXJlQWxpYXMuc2V0KHQuaWQsdC50ZXh0dXJlKX19c2V0U2l6ZShlLHQsaSl7Y29uc3Qgcz0oZXx8MSkqdGhpcy5jYW52YXNSZXNvbHV0aW9uO3RoaXMub2Zmc2NyZWVuQ2FudmFzLndpZHRoPXQqcyx0aGlzLm9mZnNjcmVlbkNhbnZhcy5oZWlnaHQ9aSpzLCJzZXRUcmFuc2Zvcm0iaW4gdGhpcy5jdHgmJnRoaXMuY3R4LnNldFRyYW5zZm9ybShzLDAsMCxzLDAsMCl9Z2V0VGV4dHVyZShlKXtjb25zdCB0PXRoaXMudGV4dHVyZUFsaWFzLmdldChlLnRleHR1cmVJZCkse3NjYWxlOmkscm90YXRpb246cyxvZmZzZXQ6cn09ZTtyZXR1cm4gbyhjKHt9LHQpLHtzY2FsZTppLHJvdGF0aW9uOnMsb2Zmc2V0OnJ9KX1oYW5kbGVEcmF3UmVxdWVzdChlLHQpe3N3aXRjaChlKXtjYXNlInN0eWxlIjpULnN0eWxlKG51bGw9PXQ/dm9pZCAwOnQub2JqKTticmVhaztjYXNlImNsZWFyIjpULmNsZWFyKG51bGw9PXQ/dm9pZCAwOnQuY29sb3IpO2JyZWFrO2Nhc2UibGluZSI6VC5saW5lKHQueDEsdC55MSx0LngyLHQueTIsdC5vYmopO2JyZWFrO2Nhc2UicmVjdCI6VC5yZWN0KHQueCx0LnksdC53aWR0aCx0LmhlaWdodCx0Lm9iaik7YnJlYWs7Y2FzZSJyZWN0RnJvbUNlbnRlciI6VC5yZWN0RnJvbUNlbnRlcih0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdC5vYmopO2JyZWFrO2Nhc2UicmVjdEZyb21Qb2ludHMiOlQucmVjdEZyb21Qb2ludHModC54MSx0LnkxLHQueDIsdC55Mix0Lm9iaik7YnJlYWs7Y2FzZSJwb2x5IjpULnBvbHkodC5wb2ludHMsdC5vYmopO2JyZWFrO2Nhc2UiY2lyY2xlIjpULmNpcmNsZSh0LngsdC55LHQucmFkaXVzLHQub2JqKTticmVhaztjYXNlImNpcmNsZUZyb21SZWN0IjpULmNpcmNsZUZyb21SZWN0KHQueCx0LnksdC53aWR0aCx0LmhlaWdodCx0Lm9iaik7YnJlYWs7Y2FzZSJwb2ludCI6VC5wb2ludCh0LngsdC55LHQub2JqKTticmVhaztjYXNlInJlY3RTcHJpdGUiOlQucmVjdFNwcml0ZSh0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdGhpcy5nZXRUZXh0dXJlKHQpKTticmVhaztjYXNlImNpcmNsZVNwcml0ZSI6VC5jaXJjbGVTcHJpdGUodC54LHQueSx0LnJhZGl1cyx0aGlzLmdldFRleHR1cmUodCkpO2JyZWFrO2Nhc2UidGV4dCI6VC50ZXh0KHQudGV4dCx0LngsdC55LG51bGw9PXQ/dm9pZCAwOnQuc3R5bGUpO2JyZWFrO2Nhc2UiY2VudGVyZWRUZXh0IjpULmNlbnRlcmVkVGV4dCh0LnRleHQsdC54LHQueSxudWxsPT10P3ZvaWQgMDp0LnN0eWxlKTticmVhaztjYXNlInRpbnQiOlQudGludCh0LmNvbG9yLHQueCx0LnksdC53aWR0aCx0LmhlaWdodCl9fX07Cg==", { type: "module" });
}
let _ = false, tt = [];
const et = new Map();
class st {
  static get worker() {
    return T;
  }
  static get workerIsInitialized() {
    return _;
  }
  static get offscreenCanvas() {
    return J;
  }
  static get renderStack() {
    return tt;
  }
  static create(t2, e2) {
    let [s2, i2] = [Z().width, Z().height];
    return j = f(t2 || s2, e2 || i2, 1), st.initRenderWorker(j, t2 || s2, e2 || i2), w(j, "main"), j;
  }
  static createFromCanvas(t2) {
    if (j = document.querySelector(t2), !(j && j instanceof HTMLCanvasElement))
      throw new Q("The selected element is not a canvas");
    return g(j, j.clientWidth, j.clientHeight, 1), st.initRenderWorker(j, j.width, j.height), j;
  }
  static initRenderWorker(t2, e2, s2) {
    mt.renderer instanceof st || mt.setRendererType("offscreen");
    let { clientWidth: i2, clientHeight: n2 } = t2;
    T = new $(), J = t2.transferControlToOffscreen(), this.sendMessageToWorker("initCanvas", { width: e2 || i2, height: s2 || n2, canvas: J, dpr: window.devicePixelRatio || 1 }, [J]), T.onmessage = ({ data: { title: t3, data: e3 } }) => {
      switch (t3) {
        case "log":
          console.log("message from the renderer worker : ", e3);
          break;
        case "initialized":
          _ = true, this.endFrame();
          break;
        default:
          console.log(t3);
      }
    };
  }
  static addRenderCall(t2, e2) {
    tt.push(new q(t2, e2 || {}));
  }
  static sendMessageToWorker(t2, e2, s2) {
    return T.postMessage(new A(t2, e2), s2 || []);
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
      if (et.has(t2.id)) {
        const { scale: i3, rotation: n2, offset: a2 } = t2;
        this.addRenderCall(e2, c(o({}, s2), { textureId: t2.id, scale: i3, rotation: n2, offset: a2 }));
      } else
        (i2 = t2.convertToBitmap()) == null || i2.then((e3) => {
          et.set(t2.id, e3), this.sendMessageToWorker("newTexture", { id: t2.id, texture: e3 });
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
    tt = [], this.clear(t2);
  }
  static endFrame() {
    _ && (this.sendMessageToWorker("render", { renderStack: tt }), tt = []);
  }
}
const it = X("OffscreenCanvas") ? st : D;
let lt = [], ot = 4;
const ct = ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
class dt {
  static addItem(t2, e2, s2) {
    dt.internalAddItem(t2, e2, s2);
  }
  static addButton(t2, e2, s2, i2) {
    dt.internalAddItem(t2, s2, i2, e2);
  }
  static internalAddItem(t2, e2, s2, i2) {
    const n2 = { callback: typeof t2 == "string" ? () => t2 : t2, position: e2, options: s2, onClick: i2 };
    lt.push(n2);
    const a2 = lt.length;
    window.addEventListener("load", () => dt.addToDom(n2, a2));
  }
  static init() {
    dt.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    z-index: 10;\n    image-rendering: pixelated;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n    /* Make the click event pass through */\n    pointer-events: none;\n}\n\n.ue-container>div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container>.top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container>.top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container>.bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container>.bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n    pointer-events: all;\n}');
    const t2 = document.createElement("div");
    t2.classList.add("ue-interface", "ue-container");
    for (let e2 of ct) {
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
    const n2 = t2.callback(), a2 = document.createElement("span");
    a2.classList.add("ue-interface-items"), a2.id = `item-${e2}`, a2.innerText = n2, Object.entries(t2.options || {}).forEach(([t3, e3]) => a2.style[t3] = e3), t2.position ? (s2 = document.querySelector(`.ue-container > .${t2.position}`)) == null || s2.appendChild(a2) : (i2 = document.querySelector(".ue-container > .custom")) == null || i2.appendChild(a2), t2.onClick && (a2.addEventListener("click", (e3) => t2.onClick(e3)), a2.classList.add("ue-interface-button"));
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
    ot = t2;
  }
  static get updateInterval() {
    return ot;
  }
}
function rt() {
  const t2 = new I(), e2 = document.createElement("div");
  return e2.classList.toggle("stats"), t2.showPanel(0), e2.appendChild(t2.dom), document.body.appendChild(e2), dt.statsShift(48), t2;
}
class ht {
  constructor(t2, e2 = 60) {
    if (this.requestId = 0, this.animate = t2, this.fps = e2, !window)
      throw new N("No window context", "core");
  }
  start() {
    let t2 = v();
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
let ut = "normal";
class mt {
  constructor(t2, e2, s2 = 60) {
    this.fps = 60, this.name = t2, this.env = e2, this.tick = 0, this.stats = null, this.showStatsPanel = true, this.gameLoop = this.env ? () => e2.update() : null, this.fps = s2, this.makeAnimationFrame();
  }
  static setRendererType(t2) {
    ut = t2;
  }
  static get renderer() {
    return ut === "normal" ? D : it;
  }
  toggleStats(t2) {
    this.showStatsPanel = t2 !== void 0 ? t2 : !this.showStatsPanel, this.showStatsPanel ? this.stats = rt() : (this.stats = null, document.querySelector(".stats") && document.querySelector(".stats").remove());
  }
  makeAnimationFrame() {
    this.update && (this.animationFrame = new ht((t2) => this.update(t2), this.fps));
  }
  setMainLoop(t2) {
    this.gameLoop = t2, this.makeAnimationFrame();
  }
  setFPS(t2) {
    this.fps = t2, this.makeAnimationFrame();
  }
  update(t2) {
    var e2, s2;
    (e2 = this.stats) == null || e2.begin(), K.tick(), V.tick(t2), this.gameLoop && this.gameLoop(t2), this.tick % dt.updateInterval == 0 && dt.update(), (s2 = this.stats) == null || s2.end(), this.tick++;
  }
  start() {
    if (!this.gameLoop)
      throw new Error("No game loop");
    if (!this.animationFrame)
      throw new Error("AnimationFrame");
    /complete|interactive|loaded/.test(document.readyState) ? this.internalStart() : window.addEventListener("DOMContentLoaded", () => this.internalStart());
  }
  internalStart() {
    this.name && (document.title = this.name), K.init(), V.init(), dt.init(), this.showStatsPanel && (this.stats = rt()), this.animationFrame.start();
  }
}
const wt = { linear: (t2) => t2, smoothStep: (t2) => (3 - 2 * t2) * t2 ** 2, smootherStep: (t2) => (6 * t2 * t2 - 15 * t2 + 10) * t2 ** 3, easeIn: (t2) => t2 ** 2, easeOut: (t2) => 1 - (1 - t2) ** 2, easeInOut: (t2) => t2 < 0.5 ? 2 * t2 * t2 : 1 - Math.pow(-2 * t2 + 2, 2) / 2, easeInBack: (t2) => 2.70158 * t2 ** 3 - 1.70158 * t2 ** 2, easeOutBack: (t2) => 1 + 1.70158 * Math.pow(t2 - 1, 3) + 2.70158 * Math.pow(t2 - 1, 2), easeInOutBack: (t2) => t2 < 0.5 ? Math.pow(2 * t2, 2) * (7.189819 * t2 - 2.5949095) / 2 : (Math.pow(2 * t2 - 2, 2) * (3.5949095 * (2 * t2 - 2) + 2.5949095) + 2) / 2 }, Wt = { autostart: false, loop: false };
class Ct {
  constructor(t2, e2, s2, i2 = wt.linear, n2 = {}) {
    if (this.hasStarted = false, this.isPaused = false, this.isEnded = false, this.isReversed = false, this.lastT = 0, this.from = t2, this.to = e2, this.duration = s2, i2 instanceof Function)
      this.easing = i2;
    else {
      if (typeof i2 != "string" || !(i2 in wt))
        throw new N("Unknow easing parameter", "animation");
      this.easing = wt[i2];
    }
    this.options = o(o({}, Wt), n2), this.value = this.from, this.speed = (this.to - this.from) / this.duration, V.add(this);
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
let linear_x = new Ct(0, dimension, 2e3, wt.linear, { autostart: true, loop: true });
let linear_y = new Ct(dimension, 0, 2e3, "linear", { autostart: true, loop: true });
let easeIn_y = new Ct(dimension, 0, 2e3, "easeIn", { autostart: true, loop: true });
let easeOut_y = new Ct(dimension, 0, 2e3, wt.easeOut, { autostart: true, loop: true });
let easeInOut_y = new Ct(dimension, 0, 2e3, wt.easeInOutBack, { autostart: true, loop: true });
let speed = new Ct(0, width - 2 * offset, 2500, wt.easeInOut, { autostart: true, loop: true });
let speed2 = new Ct(0, width - 2 * offset, 2500, wt.linear, { autostart: true, loop: true });
let speed3 = new Ct(0, width - 2 * offset, 2500, wt.easeIn, { autostart: true, loop: true });
function draw(ts) {
  D.clear();
  D.text("Linear", offset, offset + dimension + 20, { size: 16 });
  D.rect(offset, offset, dimension, dimension, { lineWidth: 0.5 });
  D.circle(offset + linear_x.value, offset + linear_y.value, 0.5);
  D.rect(dimension + 2 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  D.circle(dimension + 2 * offset + linear_x.value, offset + easeIn_y.value, 1);
  D.rect(2 * dimension + 3 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  D.circle(2 * dimension + 3 * offset + linear_x.value, offset + easeOut_y.value, 1);
  D.rect(3 * dimension + 4 * offset, offset, dimension, dimension, { lineWidth: 0.5 });
  D.circle(3 * dimension + 4 * offset + linear_x.value, offset + easeInOut_y.value, 1);
  D.circle(offset + speed.value, height / 2, 10);
  D.circle(offset + speed2.value, height / 2 + 25, 10);
  D.circle(offset + speed3.value, height / 2 + 50, 10);
}
let pause = false;
dt.addButton(() => pause ? "||" : ">", (e) => {
  pause = !pause;
  linear_x.toggle();
  linear_y.toggle();
});
dt.addButton(() => "Reset", (e) => {
  linear_x.reset();
  linear_y.reset();
});
const game = new mt("Animation Test");
D.create();
game.setMainLoop(draw);
game.toggleStats();
game.setFPS(60);
game.start();
