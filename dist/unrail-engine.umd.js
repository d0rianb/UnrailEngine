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
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2["unrail-engine"] = {}));
})(this, function(exports2) {
  "use strict";
  const version = "0.3.7";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  class Random {
    static random() {
      return Math.random();
    }
    static randint(a, b) {
      return Math.floor(a + Math.random() * (b - a));
    }
    static choice(array) {
      return array[~~(Random.random() * array.length)];
    }
    static bool() {
      return Random.random() > 0.5;
    }
    static sign() {
      return Random.choice([-1, 1]);
    }
    static percent(percentage) {
      return Random.random() < percentage / 100;
    }
  }
  var main = Random;
  class Vector2 {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    add(vec) {
      return new Vector2(this.x + vec.x, this.y + vec.y);
    }
    clone() {
      return new Vector2(this.x, this.y);
    }
    dist(vec) {
      return Math.sqrt((this.x - vec.x) ** 2 + (this.y - vec.y) ** 2);
    }
  }
  const Point = Vector2;
  const V_NULL = new Vector2(0, 0);
  const V_UNIT = new Vector2(1, 1);
  function clamp(min, x, max) {
    return Math.max(min, Math.min(x, max));
  }
  function inRange(x, min, max) {
    return clamp(min, x, max) === x;
  }
  class EventSystem {
    constructor() {
      this.windowEvents = [];
      this.keyboardDownEvents = [];
      this.keyboardPressedEvents = [];
      this.customEvents = [];
      this.currentKeyEvents = [];
    }
    init() {
      window.addEventListener("keydown", (e) => {
        if (!this.currentKeyEvents.find((event) => event.code === e.code)) {
          this.currentKeyEvents.push(e);
        }
        this.keyboardPressedEvents.forEach((event) => {
          if (e.code === event.name) {
            event.callback(e);
          }
        });
      });
      window.addEventListener("keyup", (e) => {
        if (!this.currentKeyEvents.length)
          return;
        this.currentKeyEvents = this.currentKeyEvents.filter((event) => event.code !== e.code);
      });
    }
    addEvent(e) {
      switch (e.type) {
        case EventType.KeyboardDown:
          this.keyboardDownEvents.push(e);
          break;
        case EventType.KeyboardPressed:
          this.keyboardPressedEvents.push(e);
          break;
        case EventType.Mouse:
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
      this.keyboardDownEvents.forEach((keyEvent) => {
        this.currentKeyEvents.forEach((e) => {
          if (e.code === keyEvent.name) {
            keyEvent.callback(e);
          }
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
  })(EventType || (EventType = {}));
  class Event {
    constructor(name, callback, type = 4) {
      this.name = name;
      this.callback = callback;
      this.type = type;
      this.listeners = [this.callback];
    }
    static emit(name, params) {
      const event = ES.getCustomEvent(name);
      if (event) {
        event.listeners.forEach((callback) => callback(params));
      }
    }
    static on(name, callback) {
      const existingEvent = ES.getCustomEvent(name);
      if (existingEvent) {
        existingEvent.listeners.push(callback);
      } else {
        const event = new Event(name, callback, 4);
        ES.addEvent(event);
      }
    }
    static onKeyDown(name, callback) {
      ES.addEvent(new Event(name, callback, 1));
    }
    static onKeyPressed(name, callback) {
      ES.addEvent(new Event(name, callback, 0));
    }
    static onMouseClick(callback) {
      ES.addEvent(new Event("click", callback, 2));
    }
  }
  const ES = new EventSystem();
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
  function getWindowDimensions() {
    return {width: window.innerWidth, height: window.innerHeight};
  }
  function createCanvas(w, h, ratio, preventRightClick) {
    const pixelRatio = ratio || window.devicePixelRatio || 1;
    const canvas2 = document.createElement("canvas");
    canvas2.width = w * pixelRatio;
    canvas2.height = h * pixelRatio;
    canvas2.style.width = w + "px";
    canvas2.style.height = h + "px";
    if (pixelRatio != 1) {
      canvas2.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }
    if (!!preventRightClick) {
      canvas2.oncontextmenu = (e) => e.preventDefault();
    }
    return canvas2;
  }
  function insertCanvas(canvas2, el) {
    window.onload = () => {
      let element = document.querySelector(el);
      if (!element)
        element = document.createElement(el);
      element.appendChild(canvas2);
      document.querySelector("body").appendChild(element);
    };
  }
  function isWorker() {
    return self.document == void 0 && self.window == void 0;
  }
  const defaultStyleObject = {
    strokeStyle: "black",
    lineWidth: 2,
    lineJoin: "round",
    fillStyle: "transparent",
    globalAlpha: 1,
    globalCompositeOperation: "add"
  };
  const TWOPI = 2 * Math.PI;
  let precision = isWorker() ? 4 : 2 * (window.devicePixelRatio || 1);
  function round(num) {
    return ~~(num * precision) / precision;
  }
  let ctx;
  class Renderer {
    static create(width, height) {
      const canvas2 = createCanvas(width, height);
      insertCanvas(canvas2, "main");
      Renderer.setContext(canvas2.getContext("2d"));
      return canvas2;
    }
    static setContext(context) {
      ctx = context;
    }
    static getContext() {
      return ctx;
    }
    static style(obj) {
      if (!ctx)
        throw new Error("Context has not been initialize. Please use Renderer.setContext");
      const styleObject = __spreadValues(__spreadValues({}, defaultStyleObject), obj);
      for (let prop in styleObject) {
        if (ctx[prop] !== styleObject[prop]) {
          ctx[prop] = styleObject[prop];
        }
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
      ctx.moveTo(round(x1), round(y1));
      ctx.lineTo(round(x2), round(y2));
      ctx.stroke();
    }
    static rect(x, y, width, height, obj, noStyle) {
      if (!noStyle)
        Renderer.style(obj);
      const [r_x, r_y, r_w, r_h] = [round(x), round(y), round(width), round(height)];
      ctx.fillRect(r_x, r_y, r_w, r_h);
      ctx.strokeRect(r_x, r_y, r_w, r_h);
    }
    static poly(points, obj) {
      if (!points.length)
        return;
      Renderer.style(obj);
      ctx.beginPath();
      ctx.moveTo(round(points[0].x), round(points[0].y));
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(round(points[i].x), round(points[i].y));
      }
      ctx.stroke();
    }
    static circle(x, y, radius, obj) {
      Renderer.style(obj);
      ctx.beginPath();
      ctx.arc(round(x), round(y), radius, 0, TWOPI);
      ctx.stroke();
    }
    static point(x, y, obj) {
      Renderer.circle(x, y, 5, obj);
    }
    static rectSprite(x, y, width, height, texture) {
      Renderer.style({});
      ctx.save();
      ctx.translate(round(x + width / 2), round(y + height / 2));
      ctx.scale(texture.scale.x, texture.scale.y);
      ctx.rotate(texture.rotation);
      ctx.drawImage(texture.image, round(width * texture.offset.x - width / 2), round(height * texture.offset.y - height / 2), round(width), round(height));
      ctx.restore();
    }
    static circleSprite(x, y, radius, texture) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(round(x), round(y), radius, 0, TWOPI);
      ctx.clip();
      Renderer.rectSprite(x - radius, y - radius, 2 * radius, 2 * radius, texture);
      ctx.restore();
    }
    static tint(color, x, y, width, height) {
      Renderer.rect(x, y, width, height, {
        fillStyle: color,
        globalCompositeOperation: "multiply",
        globalAlpha: 0.25
      });
    }
    static beginFrame() {
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
    return new Worker("data:application/javascript;base64,dmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTsKdmFyIF9fZ2V0T3duUHJvcFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOwp2YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTsKdmFyIF9fcHJvcElzRW51bSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7CnZhciBfX2RlZk5vcm1hbFByb3AgPSAob2JqLCBrZXksIHZhbHVlKSA9PiBrZXkgaW4gb2JqID8gX19kZWZQcm9wKG9iaiwga2V5LCB7ZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWV9KSA6IG9ialtrZXldID0gdmFsdWU7CnZhciBfX3NwcmVhZFZhbHVlcyA9IChhLCBiKSA9PiB7CiAgZm9yICh2YXIgcHJvcCBpbiBiIHx8IChiID0ge30pKQogICAgaWYgKF9faGFzT3duUHJvcC5jYWxsKGIsIHByb3ApKQogICAgICBfX2RlZk5vcm1hbFByb3AoYSwgcHJvcCwgYltwcm9wXSk7CiAgaWYgKF9fZ2V0T3duUHJvcFN5bWJvbHMpCiAgICBmb3IgKHZhciBwcm9wIG9mIF9fZ2V0T3duUHJvcFN5bWJvbHMoYikpIHsKICAgICAgaWYgKF9fcHJvcElzRW51bS5jYWxsKGIsIHByb3ApKQogICAgICAgIF9fZGVmTm9ybWFsUHJvcChhLCBwcm9wLCBiW3Byb3BdKTsKICAgIH0KICByZXR1cm4gYTsKfTsKZnVuY3Rpb24gY3JlYXRlQ2FudmFzKHcsIGgsIHJhdGlvLCBwcmV2ZW50UmlnaHRDbGljaykgewogIGNvbnN0IHBpeGVsUmF0aW8gPSByYXRpbyB8fCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxOwogIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImNhbnZhcyIpOwogIGNhbnZhcy53aWR0aCA9IHcgKiBwaXhlbFJhdGlvOwogIGNhbnZhcy5oZWlnaHQgPSBoICogcGl4ZWxSYXRpbzsKICBjYW52YXMuc3R5bGUud2lkdGggPSB3ICsgInB4IjsKICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaCArICJweCI7CiAgaWYgKHBpeGVsUmF0aW8gIT0gMSkgewogICAgY2FudmFzLmdldENvbnRleHQoIjJkIikuc2V0VHJhbnNmb3JtKHBpeGVsUmF0aW8sIDAsIDAsIHBpeGVsUmF0aW8sIDAsIDApOwogIH0KICBpZiAoISFwcmV2ZW50UmlnaHRDbGljaykgewogICAgY2FudmFzLm9uY29udGV4dG1lbnUgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpOwogIH0KICByZXR1cm4gY2FudmFzOwp9CmZ1bmN0aW9uIGluc2VydENhbnZhcyhjYW52YXMsIGVsKSB7CiAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHsKICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7CiAgICBpZiAoIWVsZW1lbnQpCiAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTsKICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTsKICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChlbGVtZW50KTsKICB9Owp9CmZ1bmN0aW9uIGlzV29ya2VyKCkgewogIHJldHVybiBzZWxmLmRvY3VtZW50ID09IHZvaWQgMCAmJiBzZWxmLndpbmRvdyA9PSB2b2lkIDA7Cn0KY29uc3QgZGVmYXVsdFN0eWxlT2JqZWN0ID0gewogIHN0cm9rZVN0eWxlOiAiYmxhY2siLAogIGxpbmVXaWR0aDogMiwKICBsaW5lSm9pbjogInJvdW5kIiwKICBmaWxsU3R5bGU6ICJ0cmFuc3BhcmVudCIsCiAgZ2xvYmFsQWxwaGE6IDEsCiAgZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiAiYWRkIgp9Owpjb25zdCBUV09QSSA9IDIgKiBNYXRoLlBJOwpsZXQgcHJlY2lzaW9uID0gaXNXb3JrZXIoKSA/IDQgOiAyICogKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpOwpmdW5jdGlvbiByb3VuZChudW0pIHsKICByZXR1cm4gfn4obnVtICogcHJlY2lzaW9uKSAvIHByZWNpc2lvbjsKfQpsZXQgY3R4OwpjbGFzcyBSZW5kZXJlciB7CiAgc3RhdGljIGNyZWF0ZSh3aWR0aCwgaGVpZ2h0KSB7CiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7CiAgICBpbnNlcnRDYW52YXMoY2FudmFzLCAibWFpbiIpOwogICAgUmVuZGVyZXIuc2V0Q29udGV4dChjYW52YXMuZ2V0Q29udGV4dCgiMmQiKSk7CiAgICByZXR1cm4gY2FudmFzOwogIH0KICBzdGF0aWMgc2V0Q29udGV4dChjb250ZXh0KSB7CiAgICBjdHggPSBjb250ZXh0OwogIH0KICBzdGF0aWMgZ2V0Q29udGV4dCgpIHsKICAgIHJldHVybiBjdHg7CiAgfQogIHN0YXRpYyBzdHlsZShvYmopIHsKICAgIGlmICghY3R4KQogICAgICB0aHJvdyBuZXcgRXJyb3IoIkNvbnRleHQgaGFzIG5vdCBiZWVuIGluaXRpYWxpemUuIFBsZWFzZSB1c2UgUmVuZGVyZXIuc2V0Q29udGV4dCIpOwogICAgY29uc3Qgc3R5bGVPYmplY3QgPSBfX3NwcmVhZFZhbHVlcyhfX3NwcmVhZFZhbHVlcyh7fSwgZGVmYXVsdFN0eWxlT2JqZWN0KSwgb2JqKTsKICAgIGZvciAobGV0IHByb3AgaW4gc3R5bGVPYmplY3QpIHsKICAgICAgaWYgKGN0eFtwcm9wXSAhPT0gc3R5bGVPYmplY3RbcHJvcF0pIHsKICAgICAgICBjdHhbcHJvcF0gPSBzdHlsZU9iamVjdFtwcm9wXTsKICAgICAgfQogICAgfQogIH0KICBzdGF0aWMgY2xlYXIoY29sb3IpIHsKICAgIGlmIChjb2xvcikgewogICAgICBSZW5kZXJlci5zdHlsZSh7ZmlsbFN0eWxlOiBjb2xvcn0pOwogICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpOwogICAgfSBlbHNlIHsKICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7CiAgICB9CiAgfQogIHN0YXRpYyBsaW5lKHgxLCB5MSwgeDIsIHkyLCBvYmopIHsKICAgIFJlbmRlcmVyLnN0eWxlKG9iaik7CiAgICBjdHguYmVnaW5QYXRoKCk7CiAgICBjdHgubW92ZVRvKHJvdW5kKHgxKSwgcm91bmQoeTEpKTsKICAgIGN0eC5saW5lVG8ocm91bmQoeDIpLCByb3VuZCh5MikpOwogICAgY3R4LnN0cm9rZSgpOwogIH0KICBzdGF0aWMgcmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBvYmosIG5vU3R5bGUpIHsKICAgIGlmICghbm9TdHlsZSkKICAgICAgUmVuZGVyZXIuc3R5bGUob2JqKTsKICAgIGNvbnN0IFtyX3gsIHJfeSwgcl93LCByX2hdID0gW3JvdW5kKHgpLCByb3VuZCh5KSwgcm91bmQod2lkdGgpLCByb3VuZChoZWlnaHQpXTsKICAgIGN0eC5maWxsUmVjdChyX3gsIHJfeSwgcl93LCByX2gpOwogICAgY3R4LnN0cm9rZVJlY3Qocl94LCByX3ksIHJfdywgcl9oKTsKICB9CiAgc3RhdGljIHBvbHkocG9pbnRzLCBvYmopIHsKICAgIGlmICghcG9pbnRzLmxlbmd0aCkKICAgICAgcmV0dXJuOwogICAgUmVuZGVyZXIuc3R5bGUob2JqKTsKICAgIGN0eC5iZWdpblBhdGgoKTsKICAgIGN0eC5tb3ZlVG8ocm91bmQocG9pbnRzWzBdLngpLCByb3VuZChwb2ludHNbMF0ueSkpOwogICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHsKICAgICAgY3R4LmxpbmVUbyhyb3VuZChwb2ludHNbaV0ueCksIHJvdW5kKHBvaW50c1tpXS55KSk7CiAgICB9CiAgICBjdHguc3Ryb2tlKCk7CiAgfQogIHN0YXRpYyBjaXJjbGUoeCwgeSwgcmFkaXVzLCBvYmopIHsKICAgIFJlbmRlcmVyLnN0eWxlKG9iaik7CiAgICBjdHguYmVnaW5QYXRoKCk7CiAgICBjdHguYXJjKHJvdW5kKHgpLCByb3VuZCh5KSwgcmFkaXVzLCAwLCBUV09QSSk7CiAgICBjdHguc3Ryb2tlKCk7CiAgfQogIHN0YXRpYyBwb2ludCh4LCB5LCBvYmopIHsKICAgIFJlbmRlcmVyLmNpcmNsZSh4LCB5LCA1LCBvYmopOwogIH0KICBzdGF0aWMgcmVjdFNwcml0ZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCB0ZXh0dXJlKSB7CiAgICBSZW5kZXJlci5zdHlsZSh7fSk7CiAgICBjdHguc2F2ZSgpOwogICAgY3R4LnRyYW5zbGF0ZShyb3VuZCh4ICsgd2lkdGggLyAyKSwgcm91bmQoeSArIGhlaWdodCAvIDIpKTsKICAgIGN0eC5zY2FsZSh0ZXh0dXJlLnNjYWxlLngsIHRleHR1cmUuc2NhbGUueSk7CiAgICBjdHgucm90YXRlKHRleHR1cmUucm90YXRpb24pOwogICAgY3R4LmRyYXdJbWFnZSh0ZXh0dXJlLmltYWdlLCByb3VuZCh3aWR0aCAqIHRleHR1cmUub2Zmc2V0LnggLSB3aWR0aCAvIDIpLCByb3VuZChoZWlnaHQgKiB0ZXh0dXJlLm9mZnNldC55IC0gaGVpZ2h0IC8gMiksIHJvdW5kKHdpZHRoKSwgcm91bmQoaGVpZ2h0KSk7CiAgICBjdHgucmVzdG9yZSgpOwogIH0KICBzdGF0aWMgY2lyY2xlU3ByaXRlKHgsIHksIHJhZGl1cywgdGV4dHVyZSkgewogICAgY3R4LnNhdmUoKTsKICAgIGN0eC5iZWdpblBhdGgoKTsKICAgIGN0eC5hcmMocm91bmQoeCksIHJvdW5kKHkpLCByYWRpdXMsIDAsIFRXT1BJKTsKICAgIGN0eC5jbGlwKCk7CiAgICBSZW5kZXJlci5yZWN0U3ByaXRlKHggLSByYWRpdXMsIHkgLSByYWRpdXMsIDIgKiByYWRpdXMsIDIgKiByYWRpdXMsIHRleHR1cmUpOwogICAgY3R4LnJlc3RvcmUoKTsKICB9CiAgc3RhdGljIHRpbnQoY29sb3IsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHsKICAgIFJlbmRlcmVyLnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgewogICAgICBmaWxsU3R5bGU6IGNvbG9yLAogICAgICBnbG9iYWxDb21wb3NpdGVPcGVyYXRpb246ICJtdWx0aXBseSIsCiAgICAgIGdsb2JhbEFscGhhOiAwLjI1CiAgICB9KTsKICB9CiAgc3RhdGljIGJlZ2luRnJhbWUoKSB7CiAgfQogIHN0YXRpYyBlbmRGcmFtZSgpIHsKICB9Cn0KY2xhc3MgVGhyZWFkV29ya2VyIHsKICBzZW5kTWVzc2FnZVRvTWFpblRocmVhZCh0aXRsZSwgYXJncykgewogICAgc2VsZi5wb3N0TWVzc2FnZSh7dGl0bGUsIGRhdGE6IGFyZ3N9KTsKICB9CiAgbG9nKC4uLmFyZ3MpIHsKICAgIHRoaXMuc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoImxvZyIsIC4uLmFyZ3MpOwogIH0KfQpjbGFzcyBSZW5kZXJlcldvcmtlciBleHRlbmRzIFRocmVhZFdvcmtlciB7CiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgdGhpcy5jYW52YXNSZXNvbHV0aW9uID0gMTsKICAgIHRoaXMub2Zmc2NyZWVuQ2FudmFzID0gbnVsbDsKICAgIHRoaXMuY3R4ID0gbnVsbDsKICAgIHRoaXMudGV4dHVyZUFsaWFzID0gbmV3IE1hcCgpOwogICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgKHtkYXRhfSkgPT4gdGhpcy5vbk1lc3NhZ2UoZGF0YS50aXRsZSwgZGF0YS5jb250ZW50KSk7CiAgfQogIG9uTWVzc2FnZSh0aXRsZSwgY29udGVudCkgewogICAgc3dpdGNoICh0aXRsZSkgewogICAgICBjYXNlICJpbml0Q2FudmFzIjoKICAgICAgICB0aGlzLm9mZnNjcmVlbkNhbnZhcyA9IGNvbnRlbnQuY2FudmFzOwogICAgICAgIHRoaXMuY3R4ID0gdGhpcy5vZmZzY3JlZW5DYW52YXMuZ2V0Q29udGV4dCgiMmQiKTsKICAgICAgICBSZW5kZXJlci5zZXRDb250ZXh0KHRoaXMuY3R4KTsKICAgICAgICB0aGlzLnNldFNpemUoY29udGVudC5kcHIsIGNvbnRlbnQud2lkdGgsIGNvbnRlbnQuaGVpZ2h0KTsKICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9NYWluVGhyZWFkKCJpbml0aWFsaXplZCIpOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJyZW5kZXIiOgogICAgICAgIGZvciAobGV0IHJlbmRlckNhbGwgb2YgY29udGVudC5yZW5kZXJTdGFjaykgewogICAgICAgICAgdGhpcy5oYW5kbGVEcmF3UmVxdWVzdChyZW5kZXJDYWxsLm1ldGhvZE5hbWUsIHJlbmRlckNhbGwuYXJncyk7CiAgICAgICAgfQogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJuZXdUZXh0dXJlIjoKICAgICAgICB0aGlzLnRleHR1cmVBbGlhc1tjb250ZW50LmlkXSA9IGNvbnRlbnQudGV4dHVyZTsKICAgICAgICBicmVhazsKICAgIH0KICB9CiAgc2V0U2l6ZShkcHIsIHdpZHRoLCBoZWlnaHQpIHsKICAgIGNvbnN0IHBpeGVsUmF0aW8gPSAoZHByIHx8IDEpICogdGhpcy5jYW52YXNSZXNvbHV0aW9uOwogICAgdGhpcy5vZmZzY3JlZW5DYW52YXMud2lkdGggPSB3aWR0aCAqIHBpeGVsUmF0aW87CiAgICB0aGlzLm9mZnNjcmVlbkNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiBwaXhlbFJhdGlvOwogICAgInNldFRyYW5zZm9ybSIgaW4gdGhpcy5jdHggPyB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0ocGl4ZWxSYXRpbywgMCwgMCwgcGl4ZWxSYXRpbywgMCwgMCkgOiBudWxsOwogIH0KICBnZXRUZXh0dXJlKHRleHR1cmVJZCkgewogICAgcmV0dXJuIHRoaXMudGV4dHVyZUFsaWFzW3RleHR1cmVJZF07CiAgfQogIGhhbmRsZURyYXdSZXF1ZXN0KG1ldGhvZCwgYXJncykgewogICAgc3dpdGNoIChtZXRob2QpIHsKICAgICAgY2FzZSAic3R5bGUiOgogICAgICAgIFJlbmRlcmVyLnN0eWxlKGFyZ3MgPT0gbnVsbCA/IHZvaWQgMCA6IGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAiY2xlYXIiOgogICAgICAgIFJlbmRlcmVyLmNsZWFyKGFyZ3MgPT0gbnVsbCA/IHZvaWQgMCA6IGFyZ3MuY29sb3IpOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJsaW5lIjoKICAgICAgICBSZW5kZXJlci5saW5lKGFyZ3MueDEsIGFyZ3MueTEsIGFyZ3MueDIsIGFyZ3MueTIsIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicmVjdCI6CiAgICAgICAgUmVuZGVyZXIucmVjdChhcmdzLngsIGFyZ3MueSwgYXJncy53aWR0aCwgYXJncy5oZWlnaHQsIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicG9seSI6CiAgICAgICAgUmVuZGVyZXIucG9seShhcmdzLnBvaW50cywgYXJncy5vYmopOwogICAgICAgIGJyZWFrOwogICAgICBjYXNlICJjaXJjbGUiOgogICAgICAgIFJlbmRlcmVyLmNpcmNsZShhcmdzLngsIGFyZ3MueSwgYXJncy5yYWRpdXMsIGFyZ3Mub2JqKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAicG9pbnQiOgogICAgICAgIFJlbmRlcmVyLnBvaW50KGFyZ3MueCwgYXJncy55LCBhcmdzLm9iaik7CiAgICAgICAgYnJlYWs7CiAgICAgIGNhc2UgInJlY3RTcHJpdGUiOgogICAgICAgIFJlbmRlcmVyLnJlY3RTcHJpdGUoYXJncy54LCBhcmdzLnksIGFyZ3Mud2lkdGgsIGFyZ3MuaGVpZ2h0LCB0aGlzLmdldFRleHR1cmUoYXJncy50ZXh0dXJlSWQpKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAiY2lyY2xlU3ByaXRlIjoKICAgICAgICBSZW5kZXJlci5jaXJjbGVTcHJpdGUoYXJncy54LCBhcmdzLnksIGFyZ3MucmFkaXVzLCB0aGlzLmdldFRleHR1cmUoYXJncy50ZXh0dXJlSWQpKTsKICAgICAgICBicmVhazsKICAgICAgY2FzZSAidGludCI6CiAgICAgICAgUmVuZGVyZXIudGludChhcmdzLmNvbG9yLCBhcmdzLngsIGFyZ3MueSwgYXJncy53aWR0aCwgYXJncy5oZWlnaHQpOwogICAgICAgIGJyZWFrOwogICAgfQogIH0KfQpuZXcgUmVuZGVyZXJXb3JrZXIoKTsK", {type: "module"});
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
    static get offscreenCanvas() {
      return offscreenCanvas;
    }
    static get workerIsInitialized() {
      return workerIsInitialized;
    }
    static get renderStack() {
      return renderStack;
    }
    static create(width, height) {
      canvas = createCanvas(width, height, 1);
      OffscreenRenderer.initRenderWorker(canvas, width, height);
      insertCanvas(canvas, "main");
      return canvas;
    }
    static initRenderWorker(canvas2, width, height) {
      if (Game.rendererType !== "offscreen") {
        Game.setRendererType("offscreen");
      }
      let {clientWidth, clientHeight} = canvas2;
      worker = new WorkerWrapper();
      console.log(worker);
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
            break;
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
    static rect(x, y, width, height, obj, noStyle) {
      this.addRenderCall("rect", {x, y, width, height, obj, noStyle});
    }
    static poly(points, obj) {
      this.addRenderCall("poly", {points, obj});
    }
    static circle(x, y, radius, obj) {
      this.addRenderCall("circle", {x, y, radius, obj});
    }
    static point(x, y, obj) {
      this.addRenderCall("point", {x, y, obj});
    }
    static rectSprite(x, y, width, height, texture) {
      var _a;
      if (textureAlias.has(texture.id)) {
        this.addRenderCall("rectSprite", {x, y, width, height, textureId: texture.id});
      } else {
        (_a = texture.convertToBitmap()) == null ? void 0 : _a.then((adaptedTexture) => {
          textureAlias.set(texture.id, adaptedTexture);
          this.sendMessageToWorker("newTexture", {id: texture.id, texture: adaptedTexture});
        });
      }
    }
    static async circleSprite(x, y, radius, texture) {
      var _a;
      if (textureAlias.has(texture.id)) {
        this.addRenderCall("circleSprite", {x, y, radius, textureId: texture.id});
      } else {
        (_a = texture.convertToBitmap()) == null ? void 0 : _a.then((adaptedTexture) => {
          textureAlias.set(texture.id, adaptedTexture);
          this.sendMessageToWorker("newTexture", {id: texture.id, texture: adaptedTexture});
        });
      }
    }
    static tint(color, x, y, width, height) {
      this.addRenderCall("circle", {color, x, y, width, height});
    }
    static beginFrame() {
      renderStack = [];
      this.addRenderCall("clear");
    }
    static endFrame() {
      if (!workerIsInitialized)
        return;
      this.sendMessageToWorker("render", {renderStack});
      renderStack = [];
    }
  }
  let textureId = 0;
  class Texture {
    constructor(source, options) {
      if (!source)
        throw new Error("A source path to the resource must be provided");
      this.id = textureId++;
      this.image = new Image();
      this.image.src = source;
      this.size = new Vector2(this.image.width, this.image.height);
      this.options = options || {};
      this.rotation = this.options.rotation || 0;
      this.offset = this.options.offset || V_NULL;
      this.scale = this.options.scale || V_UNIT;
    }
    async convertToBitmap() {
      if (!this.image.width || !this.image.height)
        return;
      const image = await createImageBitmap(this.image);
      return __spreadProps(__spreadValues({}, this), {image});
    }
  }
  let items = [];
  let updateInterval = 4;
  const itemPositions = ["top-left", "top-right", "bottom-left", "bottom-right", "custom"];
  class Interface {
    static addItem(callback, position, options) {
      Interface.internalAddItem(callback, position, options);
    }
    static addButton(callback, position, options, onClick) {
      Interface.internalAddItem(callback, position, options, onClick);
    }
    static internalAddItem(callback, position, options, onClick) {
      const item = {callback, position, options, onClick};
      items.push(item);
      const index = items.length;
      window.addEventListener("load", () => Interface.addToDom(item, index));
    }
    static init() {
      const container = document.createElement("div");
      container.classList.add("ue-interface", "ue-container");
      for (let pos of itemPositions) {
        const positionedContainer = document.createElement("div");
        positionedContainer.classList.add(pos);
        container.appendChild(positionedContainer);
      }
      document.body.appendChild(container);
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
  }
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
        throw new Error("No window context");
    }
    start() {
      let then = performance.now();
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
      this.showStatsPanel = true;
      this.gameLoop = null;
      this.fps = fps;
    }
    static setRendererType(type) {
      rendererType = type;
    }
    static get rendererType() {
      return rendererType;
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
      this.animationFrame = new AnimationFrame((time) => this.update(time), this.fps);
    }
    setMainLoop(func) {
      this.gameLoop = func;
      this.makeAnimationFrame();
    }
    setFPS(fps) {
      this.fps = fps;
      this.makeAnimationFrame();
    }
    update(time) {
      var _a, _b;
      (_a = this.stats) == null ? void 0 : _a.begin();
      ES.tick();
      if (this.gameLoop)
        this.gameLoop(time);
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
      window.addEventListener("DOMContentLoaded", () => {
        var _a;
        if (this.name) {
          document.title = this.name;
        }
        ES.init();
        Interface.init();
        if (this.showStatsPanel) {
          this.stats = showStats();
        }
        (_a = this.animationFrame) == null ? void 0 : _a.start();
      });
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
    constructor(x, y) {
      this.x = x;
      this.y = y;
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
    constructor(x, y) {
      super(x, y);
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
      this.id = id;
      this.pos = pos.clone();
      this.angle = angle && angle != "random" ? angle % 2 * Math.PI : Math.PI / 2 + Math.random() * 2 * Math.PI;
      this.velocity = new Vector2(Math.random() * speed * Math.cos(this.angle), Math.random() * speed * Math.sin(this.angle));
      this.color = color || "red";
      this.opacity = clamp(100, Math.random() * 255, 255);
      this.radius = 2;
    }
    update() {
      this.velocity.y += GRAVITY;
      this.pos = this.pos.add(this.velocity);
      this.opacity--;
    }
    render() {
      switch (Game.rendererType) {
        case "normal":
          Renderer.circle(this.pos.x, this.pos.y, this.radius, {fillStyle: this.color, lineWidth: 1, globalAlpha: this.opacity / 255});
          break;
        case "offscreen":
          OffscreenRenderer.circle(this.pos.x, this.pos.y, this.radius, {fillStyle: this.color, lineWidth: 1, globalAlpha: this.opacity / 255});
          break;
      }
    }
  }
  class ParticuleGenerator {
    constructor(nbParticles, pos, lifeDuration, onDestroy) {
      this.pos = pos;
      this.lifeDuration = lifeDuration;
      this.particles = [];
      this.UUID = main.randint(1, 100) * 100;
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
  var CellType;
  (function(CellType2) {
    CellType2[CellType2["Turret"] = 0] = "Turret";
    CellType2[CellType2["Road"] = 1] = "Road";
    CellType2[CellType2["Ground"] = 2] = "Ground";
    CellType2[CellType2["Empty"] = 3] = "Empty";
  })(CellType || (CellType = {}));
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
        cell.neighboor.top = cell.y >= 1 ? this.cells.filter((othercell) => othercell.x <= cell.x && othercell.x + othercell.width > cell.x && othercell.y === cell.y - cell.height)[0] : null;
        cell.neighboor.bottom = cell.y <= this.rows - 1 ? this.cells.filter((othercell) => othercell.x <= cell.x && othercell.x + othercell.width > cell.x && othercell.y === cell.y + cell.height)[0] : null;
        cell.neighboor.left = cell.x >= 1 ? this.cells.filter((othercell) => othercell.y <= cell.y && othercell.y + othercell.height > cell.y && othercell.x === cell.x - cell.width)[0] : null;
        cell.neighboor.right = cell.x <= this.cols - 1 ? this.cells.filter((othercell) => othercell.y <= cell.y && othercell.y + othercell.height > cell.y && othercell.x === cell.x + cell.width)[0] : null;
      });
    }
  }
  class Cell {
    constructor(x, y, width = 1, height = 1) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.highlight = false;
      this.type = 2;
      this.neighboor = {};
    }
    toggleHighlight() {
      this.highlight = !this.highlight;
    }
  }
  const Config = {};
  const VERSION = version;
  exports2.Cell = Cell;
  exports2.Config = Config;
  exports2.Cooldown = Cooldown;
  exports2.Event = Event;
  exports2.Game = Game;
  exports2.GameEnvironement = Env;
  exports2.GameObject = GameObject;
  exports2.Grid = Grid;
  exports2.Interface = Interface;
  exports2.OffscreenRenderer = OffscreenRenderer;
  exports2.Particle = Particle;
  exports2.ParticuleGenerator = ParticuleGenerator;
  exports2.PlayerObject = PlayerObject;
  exports2.Point = Point;
  exports2.Random = main;
  exports2.Renderer = Renderer;
  exports2.Texture = Texture;
  exports2.VERSION = VERSION;
  exports2.V_NULL = V_NULL;
  exports2.V_UNIT = V_UNIT;
  exports2.Vector2 = Vector2;
  exports2.clamp = clamp;
  exports2.createCanvas = createCanvas;
  exports2.getWindowDimensions = getWindowDimensions;
  exports2.inRange = inRange;
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2[Symbol.toStringTag] = "Module";
});
