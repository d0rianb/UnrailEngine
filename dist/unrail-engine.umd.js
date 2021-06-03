var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(t,e,s)=>e in t?__defProp(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,__spreadValues=(t,e)=>{for(var s in e||(e={}))__hasOwnProp.call(e,s)&&__defNormalProp(t,s,e[s]);if(__getOwnPropSymbols)for(var s of __getOwnPropSymbols(e))__propIsEnum.call(e,s)&&__defNormalProp(t,s,e[s]);return t},__spreadProps=(t,e)=>__defProps(t,__getOwnPropDescs(e));!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["unrail-engine"]={})}(this,(function(t){"use strict";"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;class e{static random(){return Math.random()}static randint(t,e){return Math.floor(t+Math.random()*(e-t))}static choice(t){return t[~~(e.random()*t.length)]}static bool(){return e.random()>.5}static sign(){return e.choice([-1,1])}static percent(t){return e.random()<t/100}}var s=e;class i{constructor(t,e){this.x=t,this.y=e}add(t){return new i(this.x+t.x,this.y+t.y)}clone(){return new i(this.x,this.y)}dist(t){return Math.sqrt((this.x-t.x)**2+(this.y-t.y)**2)}}const n=i,a=new i(0,0),o=new i(1,1);function l(t,e,s){return Math.max(t,Math.min(e,s))}function r(t,e,s){return l(e,t,s)===t}var c,d;(d=c||(c={}))[d.KeyboardPressed=0]="KeyboardPressed",d[d.KeyboardDown=1]="KeyboardDown",d[d.Mouse=2]="Mouse",d[d.Window=3]="Window",d[d.Custom=4]="Custom",d[d.All=5]="All";class h{constructor(t,e,s=4){this.name=t,this.callback=e,this.type=s,this.listeners=[this.callback]}static emit(t,e){const s=u.getCustomEvent(t);s&&s.listeners.forEach((t=>t(e)))}static on(t,e){const s=u.getCustomEvent(t);if(s)s.listeners.push(e);else{const s=new h(t,e,4);u.addEvent(s)}}static onKeyDown(t,e){u.addEvent(new h(t,e,1))}static onKeyPressed(t,e){u.addEvent(new h(t,e,0))}static onMouseClick(t){u.addEvent(new h("click",t,2))}static onMouseMove(t){u.addEvent(new h("mousemove",t,2))}}const u=new class{constructor(){this.windowEvents=[],this.customEvents=[],this.mouseEvents=[],this.keyboardDownEvents=[],this.keyboardPressedEvents=[],this.currentKeyEvents=[]}init(){window.addEventListener("keydown",(t=>{this.currentKeyEvents.find((e=>e.code===t.code))||this.currentKeyEvents.push(t),this.keyboardPressedEvents.forEach((e=>{t.code===e.name&&e.callback(t)}))})),window.addEventListener("keyup",(t=>{this.currentKeyEvents.length&&(this.currentKeyEvents=this.currentKeyEvents.filter((e=>e.code!==t.code)))})),this.bindEvents()}addEvent(t){switch(t.type){case c.KeyboardDown:this.keyboardDownEvents.push(t);break;case c.KeyboardPressed:this.keyboardPressedEvents.push(t);break;case c.Mouse:this.mouseEvents.push(t),window.addEventListener(t.name,(e=>t.callback(e)));break;case c.Window:this.windowEvents.push(t),this.bindEvents();break;case c.Custom:this.customEvents.push(t)}}getCustomEvent(t){return this.customEvents.find((e=>e.name===t))}bindEvents(){this.windowEvents.forEach((t=>window.addEventListener(t.name,t.callback)))}tick(){this.currentKeyEvents.length&&this.keyboardDownEvents.forEach((t=>{this.currentKeyEvents.forEach((e=>{e.code===t.name&&t.callback(e)}))}))}};const p=new class{constructor(){this.hasStarted=!1,this.animations=[]}add(t){this.animations.push(t),this.hasStarted&&t.options.autostart&&t.start()}init(){this.hasStarted=!0;for(let t of this.animations)t.options.autostart&&t.start()}tick(t){for(let e of this.animations)e.update(t)}};var m,y={exports:{}};y.exports=((m=function(){function t(t){return i.appendChild(t.dom),t}function e(t){for(var e=0;e<i.children.length;e++)i.children[e].style.display=e===t?"block":"none";s=t}var s=0,i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",i.addEventListener("click",(function(t){t.preventDefault(),e(++s%i.children.length)}),!1);var n=(performance||Date).now(),a=n,o=0,l=t(new m.Panel("FPS","#0ff","#002")),r=t(new m.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new m.Panel("MB","#f08","#201"));return e(0),{REVISION:16,dom:i,addPanel:t,showPanel:e,begin:function(){n=(performance||Date).now()},end:function(){o++;var t=(performance||Date).now();if(r.update(t-n,200),t>a+1e3&&(l.update(1e3*o/(t-a),100),a=t,o=0,c)){var e=performance.memory;c.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){n=this.end()},domElement:i,setMode:e}}).Panel=function(t,e,s){var i=1/0,n=0,a=Math.round,o=a(window.devicePixelRatio||1),l=80*o,r=48*o,c=3*o,d=2*o,h=3*o,u=15*o,p=74*o,m=30*o,y=document.createElement("canvas");y.width=l,y.height=r,y.style.cssText="width:80px;height:48px";var b=y.getContext("2d");return b.font="bold "+9*o+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=s,b.fillRect(0,0,l,r),b.fillStyle=e,b.fillText(t,c,d),b.fillRect(h,u,p,m),b.fillStyle=s,b.globalAlpha=.9,b.fillRect(h,u,p,m),{dom:y,update:function(r,Z){i=Math.min(i,r),n=Math.max(n,r),b.fillStyle=s,b.globalAlpha=1,b.fillRect(0,0,l,u),b.fillStyle=e,b.fillText(a(r)+" "+t+" ("+a(i)+"-"+a(n)+")",c,d),b.drawImage(y,h+o,u,p-o,m,h,u,p-o,m),b.fillRect(h+p-o,u,o,m),b.fillStyle=s,b.globalAlpha=.9,b.fillRect(h+p-o,u,o,a((1-r/Z)*m))}}},m);var b=y.exports;function Z(){return{width:window.innerWidth,height:window.innerHeight}}function f(t,e,s,i){const n=s||window.devicePixelRatio||1,a=document.createElement("canvas");return a.width=t*n,a.height=e*n,a.style.width=t+"px",a.style.height=e+"px",1!=n&&a.getContext("2d").setTransform(n,0,0,n,0,0),i&&(a.oncontextmenu=t=>t.preventDefault()),a}function g(t,e){window.addEventListener("DOMContentLoaded",(()=>{let s=document.querySelector(e);s||(s=document.createElement(e)),s.appendChild(t),document.querySelector("body").appendChild(s)}))}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};class x extends Error{constructor(t,e){super(e?`[${e.capitalize()}] - ${t}`:t),this.name="EngineFailure"}}class G extends x{constructor(t){super(t,"renderer")}}const w={strokeStyle:"black",lineWidth:2,lineJoin:"round",fillStyle:"transparent",globalAlpha:1,globalCompositeOperation:"add"},R=2*Math.PI;let C,L,W,v,S,k=null==self.document&&null==self.window?4:2*(window.devicePixelRatio||1);function X(t){return~~(t*k)/k}class V{static create(t,e){let[s,i]=[Z().width,Z().height];const n=f(t||s,e||i);return g(n,"main"),V.setContext(n.getContext("2d")),n}static setContext(t){C=t}static getContext(){return C}static style(t){if(!C)throw new G("Context has not been initialize. Please use Renderer.setContext");const e=__spreadValues(__spreadValues({},w),t);if(e!==L){for(let t in e)C[t]!==e[t]&&(C[t]=e[t]);L=e}}static clear(t){t?(V.style({fillStyle:t}),C.fillRect(0,0,C.canvas.width,C.canvas.height)):C.clearRect(0,0,C.canvas.width,C.canvas.height)}static line(t,e,s,i,n){V.style(n),C.beginPath(),C.moveTo(X(t),X(e)),C.lineTo(X(s),X(i)),C.stroke()}static rect(t,e,s,i,n){V.style(n);const[a,o,l,r]=[X(t),X(e),X(s),X(i)];C.fillRect(a,o,l,r),C.strokeRect(a,o,l,r)}static rectFromCenter(t,e,s,i,n){return V.rect(t-s/2,e-i/2,s,i,n)}static rectFromPoints(t,e,s,i,n){return V.rect(t,e,s-t,i-e,n)}static poly(t,e){if(t.length){V.style(e),C.beginPath(),C.moveTo(X(t[0].x),X(t[0].y));for(let e=1;e<t.length;e++)C.lineTo(X(t[e].x),X(t[e].y));C.stroke()}}static circle(t,e,s,i){V.style(i),C.beginPath(),C.arc(X(t),X(e),s,0,R),C.stroke()}static circleFromRect(t,e,s,i,n){return V.circle(t+s/2,e+i/2,Math.min(s,i)/2,n)}static point(t,e,s){V.circle(t,e,5,s)}static rectSprite(t,e,s,i,n){V.style({}),C.save(),C.translate(X(t+s/2),X(e+i/2)),C.scale(n.scale.x,n.scale.y),C.rotate(n.rotation),C.drawImage(n.image,X(s*n.offset.x-s/2),X(i*n.offset.y-i/2),X(s),X(i)),C.restore()}static circleSprite(t,e,s,i){C.save(),C.beginPath(),C.arc(X(t),X(e),s,0,R),C.clip(),V.rectSprite(t-s,e-s,2*s,2*s,i),C.restore()}static tint(t,e,s,i,n){V.rect(e,s,i,n,{fillStyle:t,globalCompositeOperation:"multiply",globalAlpha:.25})}static beginFrame(){}static endFrame(){}}class K{constructor(t,e){this.title=t,this.content=e}}class H{constructor(t,e){this.methodName=t,this.args=e}}function Y(){return new Worker("data:application/javascript;base64,dmFyIGU9T2JqZWN0LmRlZmluZVByb3BlcnR5LHQ9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxyPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksaT1PYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLHM9KHQscixpKT0+ciBpbiB0P2UodCxyLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTppfSk6dFtyXT1pLGE9KGUsYSk9Pntmb3IodmFyIG4gaW4gYXx8KGE9e30pKXIuY2FsbChhLG4pJiZzKGUsbixhW25dKTtpZih0KWZvcih2YXIgbiBvZiB0KGEpKWkuY2FsbChhLG4pJiZzKGUsbixhW25dKTtyZXR1cm4gZX07ZnVuY3Rpb24gbigpe3JldHVybnt3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fX1TdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0aGlzLnNsaWNlKDEpfTtjbGFzcyBjIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoZSx0KXtzdXBlcih0P2BbJHt0LmNhcGl0YWxpemUoKX1dIC0gJHtlfWA6ZSksdGhpcy5uYW1lPSJFbmdpbmVGYWlsdXJlIn19Y2xhc3MgbyBleHRlbmRzIGN7Y29uc3RydWN0b3IoZSl7c3VwZXIoZSwicmVuZGVyZXIiKX19Y29uc3QgbD17c3Ryb2tlU3R5bGU6ImJsYWNrIixsaW5lV2lkdGg6MixsaW5lSm9pbjoicm91bmQiLGZpbGxTdHlsZToidHJhbnNwYXJlbnQiLGdsb2JhbEFscGhhOjEsZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiJhZGQifSxoPTIqTWF0aC5QSTtsZXQgZCx1LHA9bnVsbD09c2VsZi5kb2N1bWVudCYmbnVsbD09c2VsZi53aW5kb3c/NDoyKih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSk7ZnVuY3Rpb24gZyhlKXtyZXR1cm5+fihlKnApL3B9Y2xhc3MgeHtzdGF0aWMgY3JlYXRlKGUsdCl7bGV0W3IsaV09W24oKS53aWR0aCxuKCkuaGVpZ2h0XTtjb25zdCBzPWZ1bmN0aW9uKGUsdCxyLGkpe2NvbnN0IHM9cnx8d2luZG93LmRldmljZVBpeGVsUmF0aW98fDEsYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJjYW52YXMiKTtyZXR1cm4gYS53aWR0aD1lKnMsYS5oZWlnaHQ9dCpzLGEuc3R5bGUud2lkdGg9ZSsicHgiLGEuc3R5bGUuaGVpZ2h0PXQrInB4IiwxIT1zJiZhLmdldENvbnRleHQoIjJkIikuc2V0VHJhbnNmb3JtKHMsMCwwLHMsMCwwKSxpJiYoYS5vbmNvbnRleHRtZW51PWU9PmUucHJldmVudERlZmF1bHQoKSksYX0oZXx8cix0fHxpKTtyZXR1cm4gZnVuY3Rpb24oZSx0KXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsKCgpPT57bGV0IHI9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTtyfHwocj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpKSxyLmFwcGVuZENoaWxkKGUpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChyKX0pKX0ocywibWFpbiIpLHguc2V0Q29udGV4dChzLmdldENvbnRleHQoIjJkIikpLHN9c3RhdGljIHNldENvbnRleHQoZSl7ZD1lfXN0YXRpYyBnZXRDb250ZXh0KCl7cmV0dXJuIGR9c3RhdGljIHN0eWxlKGUpe2lmKCFkKXRocm93IG5ldyBvKCJDb250ZXh0IGhhcyBub3QgYmVlbiBpbml0aWFsaXplLiBQbGVhc2UgdXNlIFJlbmRlcmVyLnNldENvbnRleHQiKTtjb25zdCB0PWEoYSh7fSxsKSxlKTtpZih0IT09dSl7Zm9yKGxldCBlIGluIHQpZFtlXSE9PXRbZV0mJihkW2VdPXRbZV0pO3U9dH19c3RhdGljIGNsZWFyKGUpe2U/KHguc3R5bGUoe2ZpbGxTdHlsZTplfSksZC5maWxsUmVjdCgwLDAsZC5jYW52YXMud2lkdGgsZC5jYW52YXMuaGVpZ2h0KSk6ZC5jbGVhclJlY3QoMCwwLGQuY2FudmFzLndpZHRoLGQuY2FudmFzLmhlaWdodCl9c3RhdGljIGxpbmUoZSx0LHIsaSxzKXt4LnN0eWxlKHMpLGQuYmVnaW5QYXRoKCksZC5tb3ZlVG8oZyhlKSxnKHQpKSxkLmxpbmVUbyhnKHIpLGcoaSkpLGQuc3Ryb2tlKCl9c3RhdGljIHJlY3QoZSx0LHIsaSxzKXt4LnN0eWxlKHMpO2NvbnN0W2EsbixjLG9dPVtnKGUpLGcodCksZyhyKSxnKGkpXTtkLmZpbGxSZWN0KGEsbixjLG8pLGQuc3Ryb2tlUmVjdChhLG4sYyxvKX1zdGF0aWMgcmVjdEZyb21DZW50ZXIoZSx0LHIsaSxzKXtyZXR1cm4geC5yZWN0KGUtci8yLHQtaS8yLHIsaSxzKX1zdGF0aWMgcmVjdEZyb21Qb2ludHMoZSx0LHIsaSxzKXtyZXR1cm4geC5yZWN0KGUsdCxyLWUsaS10LHMpfXN0YXRpYyBwb2x5KGUsdCl7aWYoZS5sZW5ndGgpe3guc3R5bGUodCksZC5iZWdpblBhdGgoKSxkLm1vdmVUbyhnKGVbMF0ueCksZyhlWzBdLnkpKTtmb3IobGV0IHQ9MTt0PGUubGVuZ3RoO3QrKylkLmxpbmVUbyhnKGVbdF0ueCksZyhlW3RdLnkpKTtkLnN0cm9rZSgpfX1zdGF0aWMgY2lyY2xlKGUsdCxyLGkpe3guc3R5bGUoaSksZC5iZWdpblBhdGgoKSxkLmFyYyhnKGUpLGcodCksciwwLGgpLGQuc3Ryb2tlKCl9c3RhdGljIGNpcmNsZUZyb21SZWN0KGUsdCxyLGkscyl7cmV0dXJuIHguY2lyY2xlKGUrci8yLHQraS8yLE1hdGgubWluKHIsaSkvMixzKX1zdGF0aWMgcG9pbnQoZSx0LHIpe3guY2lyY2xlKGUsdCw1LHIpfXN0YXRpYyByZWN0U3ByaXRlKGUsdCxyLGkscyl7eC5zdHlsZSh7fSksZC5zYXZlKCksZC50cmFuc2xhdGUoZyhlK3IvMiksZyh0K2kvMikpLGQuc2NhbGUocy5zY2FsZS54LHMuc2NhbGUueSksZC5yb3RhdGUocy5yb3RhdGlvbiksZC5kcmF3SW1hZ2Uocy5pbWFnZSxnKHIqcy5vZmZzZXQueC1yLzIpLGcoaSpzLm9mZnNldC55LWkvMiksZyhyKSxnKGkpKSxkLnJlc3RvcmUoKX1zdGF0aWMgY2lyY2xlU3ByaXRlKGUsdCxyLGkpe2Quc2F2ZSgpLGQuYmVnaW5QYXRoKCksZC5hcmMoZyhlKSxnKHQpLHIsMCxoKSxkLmNsaXAoKSx4LnJlY3RTcHJpdGUoZS1yLHQtciwyKnIsMipyLGkpLGQucmVzdG9yZSgpfXN0YXRpYyB0aW50KGUsdCxyLGkscyl7eC5yZWN0KHQscixpLHMse2ZpbGxTdHlsZTplLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoibXVsdGlwbHkiLGdsb2JhbEFscGhhOi4yNX0pfXN0YXRpYyBiZWdpbkZyYW1lKCl7fXN0YXRpYyBlbmRGcmFtZSgpe319bmV3IGNsYXNzIGV4dGVuZHMgY2xhc3N7c2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoZSx0KXtzZWxmLnBvc3RNZXNzYWdlKHt0aXRsZTplLGRhdGE6dH0pfWxvZyguLi5lKXt0aGlzLnNlbmRNZXNzYWdlVG9NYWluVGhyZWFkKCJsb2ciLC4uLmUpfX17Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuY2FudmFzUmVzb2x1dGlvbj0xLHRoaXMub2Zmc2NyZWVuQ2FudmFzPW51bGwsdGhpcy5jdHg9bnVsbCx0aGlzLnRleHR1cmVBbGlhcz1uZXcgTWFwLHNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKCh7ZGF0YTplfSk9PnRoaXMub25NZXNzYWdlKGUudGl0bGUsZS5jb250ZW50KSkpfW9uTWVzc2FnZShlLHQpe3N3aXRjaChlKXtjYXNlImluaXRDYW52YXMiOnRoaXMub2Zmc2NyZWVuQ2FudmFzPXQuY2FudmFzLHRoaXMuY3R4PXRoaXMub2Zmc2NyZWVuQ2FudmFzLmdldENvbnRleHQoIjJkIikseC5zZXRDb250ZXh0KHRoaXMuY3R4KSx0aGlzLnNldFNpemUodC5kcHIsdC53aWR0aCx0LmhlaWdodCksdGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgiaW5pdGlhbGl6ZWQiKTticmVhaztjYXNlInJlbmRlciI6Zm9yKGxldCBlIG9mIHQucmVuZGVyU3RhY2spdGhpcy5oYW5kbGVEcmF3UmVxdWVzdChlLm1ldGhvZE5hbWUsZS5hcmdzKTticmVhaztjYXNlIm5ld1RleHR1cmUiOnRoaXMudGV4dHVyZUFsaWFzW3QuaWRdPXQudGV4dHVyZX19c2V0U2l6ZShlLHQscil7Y29uc3QgaT0oZXx8MSkqdGhpcy5jYW52YXNSZXNvbHV0aW9uO3RoaXMub2Zmc2NyZWVuQ2FudmFzLndpZHRoPXQqaSx0aGlzLm9mZnNjcmVlbkNhbnZhcy5oZWlnaHQ9cippLCJzZXRUcmFuc2Zvcm0iaW4gdGhpcy5jdHgmJnRoaXMuY3R4LnNldFRyYW5zZm9ybShpLDAsMCxpLDAsMCl9Z2V0VGV4dHVyZShlKXtyZXR1cm4gdGhpcy50ZXh0dXJlQWxpYXNbZV19aGFuZGxlRHJhd1JlcXVlc3QoZSx0KXtzd2l0Y2goZSl7Y2FzZSJzdHlsZSI6eC5zdHlsZShudWxsPT10P3ZvaWQgMDp0Lm9iaik7YnJlYWs7Y2FzZSJjbGVhciI6eC5jbGVhcihudWxsPT10P3ZvaWQgMDp0LmNvbG9yKTticmVhaztjYXNlImxpbmUiOngubGluZSh0LngxLHQueTEsdC54Mix0LnkyLHQub2JqKTticmVhaztjYXNlInJlY3QiOngucmVjdCh0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdC5vYmopO2JyZWFrO2Nhc2UicmVjdEZyb21DZW50ZXIiOngucmVjdEZyb21DZW50ZXIodC54LHQueSx0LndpZHRoLHQuaGVpZ2h0LHQub2JqKTticmVhaztjYXNlInJlY3RGcm9tUG9pbnRzIjp4LnJlY3RGcm9tUG9pbnRzKHQueDEsdC55MSx0LngyLHQueTIsdC5vYmopO2JyZWFrO2Nhc2UicG9seSI6eC5wb2x5KHQucG9pbnRzLHQub2JqKTticmVhaztjYXNlImNpcmNsZSI6eC5jaXJjbGUodC54LHQueSx0LnJhZGl1cyx0Lm9iaik7YnJlYWs7Y2FzZSJjaXJjbGVGcm9tUmVjdCI6eC5jaXJjbGVGcm9tUmVjdCh0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdC5vYmopO2JyZWFrO2Nhc2UicG9pbnQiOngucG9pbnQodC54LHQueSx0Lm9iaik7YnJlYWs7Y2FzZSJyZWN0U3ByaXRlIjp4LnJlY3RTcHJpdGUodC54LHQueSx0LndpZHRoLHQuaGVpZ2h0LHRoaXMuZ2V0VGV4dHVyZSh0LnRleHR1cmVJZCkpO2JyZWFrO2Nhc2UiY2lyY2xlU3ByaXRlIjp4LmNpcmNsZVNwcml0ZSh0LngsdC55LHQucmFkaXVzLHRoaXMuZ2V0VGV4dHVyZSh0LnRleHR1cmVJZCkpO2JyZWFrO2Nhc2UidGludCI6eC50aW50KHQuY29sb3IsdC54LHQueSx0LndpZHRoLHQuaGVpZ2h0KX19fTsK",{type:"module"})}let I=!1,N=[];const E=new Map;class M{static get worker(){return v}static get workerIsInitialized(){return I}static get offscreenCanvas(){return W}static get renderStack(){return N}static create(t,e){return S=f(t,e,1),M.initRenderWorker(S,t,e),g(S,"main"),S}static initRenderWorker(t,e,s){"offscreen"!==B.rendererType&&B.setRendererType("offscreen");let{clientWidth:i,clientHeight:n}=t;v=new Y,W=t.transferControlToOffscreen(),this.sendMessageToWorker("initCanvas",{width:e||i,height:s||n,canvas:W,dpr:window.devicePixelRatio||1},[W]),v.onmessage=({data:{title:t,data:e}})=>{switch(t){case"log":console.log("message from the renderer worker : ",e);break;case"initialized":I=!0}}}static addRenderCall(t,e){N.push(new H(t,e||{}))}static sendMessageToWorker(t,e,s){return v.postMessage(new K(t,e),s||[])}static style(t){this.addRenderCall("style",{obj:t})}static clear(t){this.addRenderCall("clear",{color:t})}static line(t,e,s,i,n){this.addRenderCall("line",{x1:t,y1:e,x2:s,y2:i,obj:n})}static rect(t,e,s,i,n){this.addRenderCall("rect",{x:t,y:e,width:s,height:i,obj:n})}static rectFromCenter(t,e,s,i,n){this.addRenderCall("rectFromCenter",{x:t,y:e,width:s,height:i,obj:n})}static rectFromPoints(t,e,s,i,n){this.addRenderCall("rectFromPoints",{x1:t,y1:e,x2:s,y2:i,obj:n})}static poly(t,e){this.addRenderCall("poly",{points:t,obj:e})}static circle(t,e,s,i){this.addRenderCall("circle",{x:t,y:e,radius:s,obj:i})}static circleFromRect(t,e,s,i,n){this.addRenderCall("circleFromRect",{x:t,y:e,width:s,height:i,obj:n})}static point(t,e,s){this.addRenderCall("point",{x:t,y:e,obj:s})}static rectSprite(t,e,s,i,n){var a;E.has(n.id)?this.addRenderCall("rectSprite",{x:t,y:e,width:s,height:i,textureId:n.id}):null==(a=n.convertToBitmap())||a.then((t=>{E.set(n.id,t),this.sendMessageToWorker("newTexture",{id:n.id,texture:t})}))}static async circleSprite(t,e,s,i){var n;E.has(i.id)?this.addRenderCall("circleSprite",{x:t,y:e,radius:s,textureId:i.id}):null==(n=i.convertToBitmap())||n.then((t=>{E.set(i.id,t),this.sendMessageToWorker("newTexture",{id:i.id,texture:t})}))}static tint(t,e,s,i,n){this.addRenderCall("circle",{color:t,x:e,y:s,width:i,height:n})}static beginFrame(){N=[],this.addRenderCall("clear")}static endFrame(){I&&(this.sendMessageToWorker("render",{renderStack:N}),N=[])}}let F=0;let T=[],U=4;const P=["top-left","top-right","bottom-left","bottom-right","custom"];class Q{static addItem(t,e,s){Q.internalAddItem(t,e,s)}static addButton(t,e,s,i){Q.internalAddItem(t,s,i,e)}static internalAddItem(t,e,s,i){const n={callback:t,position:e,options:s,onClick:i};T.push(n);const a=T.length;window.addEventListener("load",(()=>Q.addToDom(n,a)))}static init(){Q.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    z-index: 2;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n}\n\n.ue-container > div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container > .top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container > .top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container > .bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container > .bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n}');const t=document.createElement("div");t.classList.add("ue-interface","ue-container");for(let e of P){const s=document.createElement("div");s.classList.add(e),t.appendChild(s)}document.body.appendChild(t)}static addStyle(t){document.createElement("style").textContent=t,document.head.append(t)}static addToDom(t,e){var s,i;const n=t.callback(),a=document.createElement("span");a.classList.add("ue-interface-items"),a.id=`item-${e}`,a.innerText=n,Object.entries(t.options||{}).forEach((([t,e])=>a.style[t]=e)),t.position?null==(s=document.querySelector(`.ue-container > .${t.position}`))||s.appendChild(a):null==(i=document.querySelector(".ue-container > .custom"))||i.appendChild(a),t.onClick&&(a.addEventListener("click",(e=>t.onClick(e))),a.classList.add("ue-interface-button"))}static update(){T.forEach(((t,e)=>{const s=t.callback(),i=document.querySelector(`.ue-interface #item-${e+1}`);i&&i.innerText!==s&&(i.innerText=s)}))}static statsShift(t){const e=document.querySelector(".top-left");e&&(e.style.top=`${t}px`)}static setUpdateInterval(t){U=t}static get updateInterval(){return U}}function z(){const t=new b,e=document.createElement("div");return e.classList.toggle("stats"),t.showPanel(0),e.appendChild(t.dom),document.body.appendChild(e),Q.statsShift(48),t}class J{constructor(t,e=60){if(this.requestId=0,this.animate=t,this.fps=e,!window)throw new Error("No window context")}start(){let t=performance.now();const e=1e3/this.fps,s=i=>{this.requestId=window.requestAnimationFrame(s);const n=i-t;n>=e-.1&&(t=i-n%e,this.animate(n))};this.requestId=window.requestAnimationFrame(s)}stop(){window.cancelAnimationFrame(this.requestId)}}let j="normal";class B{constructor(t,e,s=60){this.fps=60,this.name=t,this.env=e,this.tick=0,this.stats=null,this.showStatsPanel=!0,this.gameLoop=null,this.fps=s}static setRendererType(t){j=t}static get rendererType(){return j}toggleStats(t){this.showStatsPanel=void 0!==t?t:!this.showStatsPanel,this.showStatsPanel?this.stats=z():(this.stats=null,document.querySelector(".stats")&&document.querySelector(".stats").remove())}makeAnimationFrame(){this.animationFrame=new J((t=>this.update(t)),this.fps)}setMainLoop(t){this.gameLoop=t,this.makeAnimationFrame()}setFPS(t){this.fps=t,this.makeAnimationFrame()}update(t){var e,s;null==(e=this.stats)||e.begin(),u.tick(),p.tick(t),this.gameLoop&&this.gameLoop(t),this.tick%Q.updateInterval==0&&Q.update(),null==(s=this.stats)||s.end(),this.tick++}start(){if(!this.gameLoop)throw new Error("No game loop");if(!this.animationFrame)throw new Error("AnimationFrame");window.addEventListener("DOMContentLoaded",(()=>{var t;this.name&&(document.title=this.name),u.init(),p.init(),Q.init(),this.showStatsPanel&&(this.stats=z()),null==(t=this.animationFrame)||t.start()}))}}class O{constructor(t,e){this.x=t,this.y=e}collide(t){return!!(t.width&&t.height&&this.width&&this.height)&&(this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.height+this.y>t.y)}update(...t){}render(...t){}}class _{constructor(t,e){this.delay=t,this.callback=e,window.setTimeout(this.callback,this.delay)}}class D extends O{constructor(t,e,s=5,n,a){super(e.x,e.y),this.id=t,this.pos=e.clone(),this.angle=n&&"random"!=n?n%2*Math.PI:Math.PI/2+2*Math.random()*Math.PI,this.velocity=new i(Math.random()*s*Math.cos(this.angle),Math.random()*s*Math.sin(this.angle)),this.color=a||"red",this.opacity=l(100,255*Math.random(),255),this.radius=2}update(){this.velocity.y+=.01,this.pos=this.pos.add(this.velocity),this.opacity-=2}render(){switch(B.rendererType){case"normal":V.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255});break;case"offscreen":M.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255})}}}var A,q;(q=A||(A={}))[q.Turret=0]="Turret",q[q.Road=1]="Road",q[q.Ground=2]="Ground",q[q.Empty=3]="Empty";class ${constructor(t,e,s=1,i=1){this.x=t,this.y=e,this.width=s,this.height=i,this.highlight=!1,this.type=2,this.neighboor={}}toggleHighlight(){this.highlight=!this.highlight}}const tt={linear:t=>t,easeIn:t=>t**2,easeOut:t=>1-(1-t)**2,easeInOut:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,easeInBack:t=>2.70158*t**3-1.70158*t**2,easeOutBack:t=>1+1.70158*Math.pow(t-1,3)+2.70158*Math.pow(t-1,2),easeInOutBack:t=>t<.5?Math.pow(2*t,2)*(7.189819*t-2.5949095)/2:(Math.pow(2*t-2,2)*(3.5949095*(2*t-2)+2.5949095)+2)/2},et={autostart:!1,loop:!1};t.Animation=class{constructor(t,e,s,i=tt.linear,n={}){this.hasStarted=!1,this.isPaused=!1,this.isEnded=!1,this.isReversed=!1,this.from=t,this.to=e,this.duration=s,this.easing=i,this.options=__spreadValues(__spreadValues({},et),n),this.value=this.from,this.speed=(this.to-this.from)/this.duration,this.isReversed=!1,this.lastT=0,p.add(this)}start(){this.isEnded=!1,this.hasStarted=!0}reset(){this.lastT=0,this.isPaused=!1}toggle(t){void 0!==t&&(t?this.pause():this.resume()),this.isPaused?this.resume():this.pause()}pause(){this.isPaused=!0}resume(){this.isPaused=!1}update(t){if(!this.hasStarted||this.isPaused)return;let e=l(0,this.lastT+t*this.speed/Math.abs(this.to-this.from),1);if(e>=1||e<=0){if(!this.options.loop)return this.isEnded=!0,void(this.lastT=1);this.speed*=-1,this.isReversed=!this.isReversed}this.lastT=e,this.value=this.from+(this.to-this.from)*this.easing(e)}},t.Cell=$,t.Config={},t.Cooldown=_,t.Easing=tt,t.Event=h,t.Game=B,t.GameEnvironement=class{constructor(t,e){this.width=t,this.height=e}update(){}render(){}},t.GameObject=O,t.Grid=class{constructor(t,e){this.rows=e,this.cols=t,this.cells=[],this.focusCell=null,this.createCells(),this.defineNeighboors()}createCells(){for(let t=0;t<this.cols;t++)for(let e=0;e<this.rows;e++)this.cells.push(new $(t,e))}updateCell(t){if(this.cells.includes(t)){if(1!==t.width||1!==t.height){if(t.width>1){let e=t.width-1,s=this.cells.filter((s=>s.y===t.y&&s.x>t.x&&s.x<=t.x+e));this.cells=this.cells.filter((t=>!s.includes(t)))}if(t.height>1){let e=t.height-1,s=this.cells.filter((s=>s.x===t.x&&s.y>t.y&&s.y<=t.y+e));this.cells=this.cells.filter((t=>!s.includes(t)))}}this.defineNeighboors(),this.cells[this.cells.indexOf(t)]=t}}defineNeighboors(){this.cells.forEach((t=>{t.neighboor.top=t.y>=1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y-t.height))[0]:null,t.neighboor.bottom=t.y<=this.rows-1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y+t.height))[0]:null,t.neighboor.left=t.x>=1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x-t.width))[0]:null,t.neighboor.right=t.x<=this.cols-1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x+t.width))[0]:null}))}},t.Interface=Q,t.OffscreenRenderer=M,t.Particle=D,t.ParticuleGenerator=class{constructor(t,e,i,n){this.pos=e,this.lifeDuration=i,this.particles=[],this.UUID=100*s.randint(1,100);for(let s=0;s<t;s++){let t=new D(this.UUID+s,this.pos);this.particles.push(t)}new _(this.lifeDuration,(()=>{this.destroy(),n&&n()}))}addParticles(t){return t.concat(this.particles)}removeParticles(t){const e=this.particles.length;return t.filter((t=>!r(t.id,this.UUID,this.UUID+e)))}destroy(){}},t.PlayerObject=class extends O{constructor(t,e){super(t,e)}update(...t){}render(...t){}},t.Point=n,t.Random=s,t.Renderer=V,t.Texture=class{constructor(t,e){if(!t)throw new Error("A source path to the resource must be provided");this.id=F++,this.image=new Image,this.image.src=t,this.size=new i(this.image.width,this.image.height),this.options=e||{},this.rotation=this.options.rotation||0,this.offset=this.options.offset||a,this.scale=this.options.scale||o}async convertToBitmap(){if(!this.image.width||!this.image.height)return;const t=await createImageBitmap(this.image);return __spreadProps(__spreadValues({},this),{image:t})}},t.VERSION="0.4.3",t.V_NULL=a,t.V_UNIT=o,t.Vector2=i,t.clamp=l,t.createCanvas=f,t.getWindowDimensions=Z,t.inRange=r,Object.defineProperty(t,"__esModule",{value:!0}),t[Symbol.toStringTag]="Module"}));
