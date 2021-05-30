var t=Object.defineProperty,e=Object.defineProperties,i=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,a=(e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s,o=(t,e)=>{for(var i in e||(e={}))n.call(e,i)&&a(t,i,e[i]);if(s)for(var i of s(e))l.call(e,i)&&a(t,i,e[i]);return t};"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;class c{static random(){return Math.random()}static randint(t,e){return Math.floor(t+Math.random()*(e-t))}static choice(t){return t[~~(c.random()*t.length)]}static bool(){return c.random()>.5}static sign(){return c.choice([-1,1])}static percent(t){return c.random()<t/100}}var r=c;class d{constructor(t,e){this.x=t,this.y=e}add(t){return new d(this.x+t.x,this.y+t.y)}clone(){return new d(this.x,this.y)}dist(t){return Math.sqrt((this.x-t.x)**2+(this.y-t.y)**2)}}const h=d,u=new d(0,0),m=new d(1,1);function p(t,e,i){return Math.max(t,Math.min(e,i))}function y(t,e,i){return p(e,t,i)===t}var b,Z;(Z=b||(b={}))[Z.KeyboardPressed=0]="KeyboardPressed",Z[Z.KeyboardDown=1]="KeyboardDown",Z[Z.Mouse=2]="Mouse",Z[Z.Window=3]="Window",Z[Z.Custom=4]="Custom",Z[Z.All=5]="All";class x{constructor(t,e,i=4){this.name=t,this.callback=e,this.type=i,this.listeners=[this.callback]}static emit(t,e){const i=g.getCustomEvent(t);i&&i.listeners.forEach((t=>t(e)))}static on(t,e){const i=g.getCustomEvent(t);if(i)i.listeners.push(e);else{const i=new x(t,e,4);g.addEvent(i)}}static onKeyDown(t,e){g.addEvent(new x(t,e,1))}static onKeyPressed(t,e){g.addEvent(new x(t,e,0))}static onMouseClick(t){g.addEvent(new x("click",t,2))}static onMouseMove(t){g.addEvent(new x("mousemove",t,2))}}const g=new class{constructor(){this.windowEvents=[],this.customEvents=[],this.mouseEvents=[],this.keyboardDownEvents=[],this.keyboardPressedEvents=[],this.currentKeyEvents=[]}init(){window.addEventListener("keydown",(t=>{this.currentKeyEvents.find((e=>e.code===t.code))||this.currentKeyEvents.push(t),this.keyboardPressedEvents.forEach((e=>{t.code===e.name&&e.callback(t)}))})),window.addEventListener("keyup",(t=>{this.currentKeyEvents.length&&(this.currentKeyEvents=this.currentKeyEvents.filter((e=>e.code!==t.code)))})),this.bindEvents()}addEvent(t){switch(t.type){case b.KeyboardDown:this.keyboardDownEvents.push(t);break;case b.KeyboardPressed:this.keyboardPressedEvents.push(t);break;case b.Mouse:this.mouseEvents.push(t),window.addEventListener(t.name,(e=>t.callback(e)));break;case b.Window:this.windowEvents.push(t),this.bindEvents();break;case b.Custom:this.customEvents.push(t)}}getCustomEvent(t){return this.customEvents.find((e=>e.name===t))}bindEvents(){this.windowEvents.forEach((t=>window.addEventListener(t.name,t.callback)))}tick(){this.currentKeyEvents.length&&this.keyboardDownEvents.forEach((t=>{this.currentKeyEvents.forEach((e=>{e.code===t.name&&t.callback(e)}))}))}};var G,f={exports:{}},w=f.exports=((G=function(){function t(t){return s.appendChild(t.dom),t}function e(t){for(var e=0;e<s.children.length;e++)s.children[e].style.display=e===t?"block":"none";i=t}var i=0,s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",s.addEventListener("click",(function(t){t.preventDefault(),e(++i%s.children.length)}),!1);var n=(performance||Date).now(),l=n,a=0,o=t(new G.Panel("FPS","#0ff","#002")),c=t(new G.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var r=t(new G.Panel("MB","#f08","#201"));return e(0),{REVISION:16,dom:s,addPanel:t,showPanel:e,begin:function(){n=(performance||Date).now()},end:function(){a++;var t=(performance||Date).now();if(c.update(t-n,200),t>l+1e3&&(o.update(1e3*a/(t-l),100),l=t,a=0,r)){var e=performance.memory;r.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){n=this.end()},domElement:s,setMode:e}}).Panel=function(t,e,i){var s=1/0,n=0,l=Math.round,a=l(window.devicePixelRatio||1),o=80*a,c=48*a,r=3*a,d=2*a,h=3*a,u=15*a,m=74*a,p=30*a,y=document.createElement("canvas");y.width=o,y.height=c,y.style.cssText="width:80px;height:48px";var b=y.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=i,b.fillRect(0,0,o,c),b.fillStyle=e,b.fillText(t,r,d),b.fillRect(h,u,m,p),b.fillStyle=i,b.globalAlpha=.9,b.fillRect(h,u,m,p),{dom:y,update:function(c,Z){s=Math.min(s,c),n=Math.max(n,c),b.fillStyle=i,b.globalAlpha=1,b.fillRect(0,0,o,u),b.fillStyle=e,b.fillText(l(c)+" "+t+" ("+l(s)+"-"+l(n)+")",r,d),b.drawImage(y,h+a,u,m-a,p,h,u,m-a,p),b.fillRect(h+m-a,u,a,p),b.fillStyle=i,b.globalAlpha=.9,b.fillRect(h+m-a,u,a,l((1-c/Z)*p))}}},G);function R(){return{width:window.innerWidth,height:window.innerHeight}}function C(t,e,i,s){const n=i||window.devicePixelRatio||1,l=document.createElement("canvas");return l.width=t*n,l.height=e*n,l.style.width=t+"px",l.style.height=e+"px",1!=n&&l.getContext("2d").setTransform(n,0,0,n,0,0),s&&(l.oncontextmenu=t=>t.preventDefault()),l}function L(t,e){window.addEventListener("DOMContentLoaded",(()=>{let i=document.querySelector(e);i||(i=document.createElement(e)),i.appendChild(t),document.querySelector("body").appendChild(i)}))}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};class W extends Error{constructor(t,e){super(e?`[${e.capitalize()}] - ${t}`:t),this.name="EngineFailure"}}class v extends W{constructor(t){super(t,"renderer")}}const X={strokeStyle:"black",lineWidth:2,lineJoin:"round",fillStyle:"transparent",globalAlpha:1,globalCompositeOperation:"add"},S=2*Math.PI;let k,K,V,H,Y,I=null==self.document&&null==self.window?4:2*(window.devicePixelRatio||1);function N(t){return~~(t*I)/I}class E{static create(t,e){let[i,s]=[R().width,R().height];const n=C(t||i,e||s);return L(n,"main"),E.setContext(n.getContext("2d")),n}static setContext(t){k=t}static getContext(){return k}static style(t){if(!k)throw new v("Context has not been initialize. Please use Renderer.setContext");const e=o(o({},X),t);if(e!==K){for(let t in e)k[t]!==e[t]&&(k[t]=e[t]);K=e}}static clear(t){t?(E.style({fillStyle:t}),k.fillRect(0,0,k.canvas.width,k.canvas.height)):k.clearRect(0,0,k.canvas.width,k.canvas.height)}static line(t,e,i,s,n){E.style(n),k.beginPath(),k.moveTo(N(t),N(e)),k.lineTo(N(i),N(s)),k.stroke()}static rect(t,e,i,s,n){E.style(n);const[l,a,o,c]=[N(t),N(e),N(i),N(s)];k.fillRect(l,a,o,c),k.strokeRect(l,a,o,c)}static rectFromCenter(t,e,i,s,n){return E.rect(t-i/2,e-s/2,i,s,n)}static rectFromPoints(t,e,i,s,n){return E.rect(t,e,i-t,s-e,n)}static poly(t,e){if(t.length){E.style(e),k.beginPath(),k.moveTo(N(t[0].x),N(t[0].y));for(let e=1;e<t.length;e++)k.lineTo(N(t[e].x),N(t[e].y));k.stroke()}}static circle(t,e,i,s){E.style(s),k.beginPath(),k.arc(N(t),N(e),i,0,S),k.stroke()}static circleFromRect(t,e,i,s,n){return E.circle(t+i/2,e+s/2,Math.min(i,s)/2,n)}static point(t,e,i){E.circle(t,e,5,i)}static rectSprite(t,e,i,s,n){E.style({}),k.save(),k.translate(N(t+i/2),N(e+s/2)),k.scale(n.scale.x,n.scale.y),k.rotate(n.rotation),k.drawImage(n.image,N(i*n.offset.x-i/2),N(s*n.offset.y-s/2),N(i),N(s)),k.restore()}static circleSprite(t,e,i,s){k.save(),k.beginPath(),k.arc(N(t),N(e),i,0,S),k.clip(),E.rectSprite(t-i,e-i,2*i,2*i,s),k.restore()}static tint(t,e,i,s,n){E.rect(e,i,s,n,{fillStyle:t,globalCompositeOperation:"multiply",globalAlpha:.25})}static beginFrame(){}static endFrame(){}}class F{constructor(t,e){this.title=t,this.content=e}}class M{constructor(t,e){this.methodName=t,this.args=e}}function U(){return new Worker("data:application/javascript;base64,dmFyIGU9T2JqZWN0LmRlZmluZVByb3BlcnR5LHQ9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxyPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksaT1PYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLHM9KHQscixpKT0+ciBpbiB0P2UodCxyLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTppfSk6dFtyXT1pLGE9KGUsYSk9Pntmb3IodmFyIG4gaW4gYXx8KGE9e30pKXIuY2FsbChhLG4pJiZzKGUsbixhW25dKTtpZih0KWZvcih2YXIgbiBvZiB0KGEpKWkuY2FsbChhLG4pJiZzKGUsbixhW25dKTtyZXR1cm4gZX07ZnVuY3Rpb24gbigpe3JldHVybnt3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fX1TdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0aGlzLnNsaWNlKDEpfTtjbGFzcyBjIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoZSx0KXtzdXBlcih0P2BbJHt0LmNhcGl0YWxpemUoKX1dIC0gJHtlfWA6ZSksdGhpcy5uYW1lPSJFbmdpbmVGYWlsdXJlIn19Y2xhc3MgbyBleHRlbmRzIGN7Y29uc3RydWN0b3IoZSl7c3VwZXIoZSwicmVuZGVyZXIiKX19Y29uc3QgbD17c3Ryb2tlU3R5bGU6ImJsYWNrIixsaW5lV2lkdGg6MixsaW5lSm9pbjoicm91bmQiLGZpbGxTdHlsZToidHJhbnNwYXJlbnQiLGdsb2JhbEFscGhhOjEsZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiJhZGQifSxoPTIqTWF0aC5QSTtsZXQgZCx1LHA9bnVsbD09c2VsZi5kb2N1bWVudCYmbnVsbD09c2VsZi53aW5kb3c/NDoyKih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSk7ZnVuY3Rpb24gZyhlKXtyZXR1cm5+fihlKnApL3B9Y2xhc3MgeHtzdGF0aWMgY3JlYXRlKGUsdCl7bGV0W3IsaV09W24oKS53aWR0aCxuKCkuaGVpZ2h0XTtjb25zdCBzPWZ1bmN0aW9uKGUsdCxyLGkpe2NvbnN0IHM9cnx8d2luZG93LmRldmljZVBpeGVsUmF0aW98fDEsYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJjYW52YXMiKTtyZXR1cm4gYS53aWR0aD1lKnMsYS5oZWlnaHQ9dCpzLGEuc3R5bGUud2lkdGg9ZSsicHgiLGEuc3R5bGUuaGVpZ2h0PXQrInB4IiwxIT1zJiZhLmdldENvbnRleHQoIjJkIikuc2V0VHJhbnNmb3JtKHMsMCwwLHMsMCwwKSxpJiYoYS5vbmNvbnRleHRtZW51PWU9PmUucHJldmVudERlZmF1bHQoKSksYX0oZXx8cix0fHxpKTtyZXR1cm4gZnVuY3Rpb24oZSx0KXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsKCgpPT57bGV0IHI9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTtyfHwocj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpKSxyLmFwcGVuZENoaWxkKGUpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChyKX0pKX0ocywibWFpbiIpLHguc2V0Q29udGV4dChzLmdldENvbnRleHQoIjJkIikpLHN9c3RhdGljIHNldENvbnRleHQoZSl7ZD1lfXN0YXRpYyBnZXRDb250ZXh0KCl7cmV0dXJuIGR9c3RhdGljIHN0eWxlKGUpe2lmKCFkKXRocm93IG5ldyBvKCJDb250ZXh0IGhhcyBub3QgYmVlbiBpbml0aWFsaXplLiBQbGVhc2UgdXNlIFJlbmRlcmVyLnNldENvbnRleHQiKTtjb25zdCB0PWEoYSh7fSxsKSxlKTtpZih0IT09dSl7Zm9yKGxldCBlIGluIHQpZFtlXSE9PXRbZV0mJihkW2VdPXRbZV0pO3U9dH19c3RhdGljIGNsZWFyKGUpe2U/KHguc3R5bGUoe2ZpbGxTdHlsZTplfSksZC5maWxsUmVjdCgwLDAsZC5jYW52YXMud2lkdGgsZC5jYW52YXMuaGVpZ2h0KSk6ZC5jbGVhclJlY3QoMCwwLGQuY2FudmFzLndpZHRoLGQuY2FudmFzLmhlaWdodCl9c3RhdGljIGxpbmUoZSx0LHIsaSxzKXt4LnN0eWxlKHMpLGQuYmVnaW5QYXRoKCksZC5tb3ZlVG8oZyhlKSxnKHQpKSxkLmxpbmVUbyhnKHIpLGcoaSkpLGQuc3Ryb2tlKCl9c3RhdGljIHJlY3QoZSx0LHIsaSxzKXt4LnN0eWxlKHMpO2NvbnN0W2EsbixjLG9dPVtnKGUpLGcodCksZyhyKSxnKGkpXTtkLmZpbGxSZWN0KGEsbixjLG8pLGQuc3Ryb2tlUmVjdChhLG4sYyxvKX1zdGF0aWMgcmVjdEZyb21DZW50ZXIoZSx0LHIsaSxzKXtyZXR1cm4geC5yZWN0KGUtci8yLHQtaS8yLHIsaSxzKX1zdGF0aWMgcmVjdEZyb21Qb2ludHMoZSx0LHIsaSxzKXtyZXR1cm4geC5yZWN0KGUsdCxyLWUsaS10LHMpfXN0YXRpYyBwb2x5KGUsdCl7aWYoZS5sZW5ndGgpe3guc3R5bGUodCksZC5iZWdpblBhdGgoKSxkLm1vdmVUbyhnKGVbMF0ueCksZyhlWzBdLnkpKTtmb3IobGV0IHQ9MTt0PGUubGVuZ3RoO3QrKylkLmxpbmVUbyhnKGVbdF0ueCksZyhlW3RdLnkpKTtkLnN0cm9rZSgpfX1zdGF0aWMgY2lyY2xlKGUsdCxyLGkpe3guc3R5bGUoaSksZC5iZWdpblBhdGgoKSxkLmFyYyhnKGUpLGcodCksciwwLGgpLGQuc3Ryb2tlKCl9c3RhdGljIGNpcmNsZUZyb21SZWN0KGUsdCxyLGkscyl7cmV0dXJuIHguY2lyY2xlKGUrci8yLHQraS8yLE1hdGgubWluKHIsaSkvMixzKX1zdGF0aWMgcG9pbnQoZSx0LHIpe3guY2lyY2xlKGUsdCw1LHIpfXN0YXRpYyByZWN0U3ByaXRlKGUsdCxyLGkscyl7eC5zdHlsZSh7fSksZC5zYXZlKCksZC50cmFuc2xhdGUoZyhlK3IvMiksZyh0K2kvMikpLGQuc2NhbGUocy5zY2FsZS54LHMuc2NhbGUueSksZC5yb3RhdGUocy5yb3RhdGlvbiksZC5kcmF3SW1hZ2Uocy5pbWFnZSxnKHIqcy5vZmZzZXQueC1yLzIpLGcoaSpzLm9mZnNldC55LWkvMiksZyhyKSxnKGkpKSxkLnJlc3RvcmUoKX1zdGF0aWMgY2lyY2xlU3ByaXRlKGUsdCxyLGkpe2Quc2F2ZSgpLGQuYmVnaW5QYXRoKCksZC5hcmMoZyhlKSxnKHQpLHIsMCxoKSxkLmNsaXAoKSx4LnJlY3RTcHJpdGUoZS1yLHQtciwyKnIsMipyLGkpLGQucmVzdG9yZSgpfXN0YXRpYyB0aW50KGUsdCxyLGkscyl7eC5yZWN0KHQscixpLHMse2ZpbGxTdHlsZTplLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoibXVsdGlwbHkiLGdsb2JhbEFscGhhOi4yNX0pfXN0YXRpYyBiZWdpbkZyYW1lKCl7fXN0YXRpYyBlbmRGcmFtZSgpe319bmV3IGNsYXNzIGV4dGVuZHMgY2xhc3N7c2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoZSx0KXtzZWxmLnBvc3RNZXNzYWdlKHt0aXRsZTplLGRhdGE6dH0pfWxvZyguLi5lKXt0aGlzLnNlbmRNZXNzYWdlVG9NYWluVGhyZWFkKCJsb2ciLC4uLmUpfX17Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuY2FudmFzUmVzb2x1dGlvbj0xLHRoaXMub2Zmc2NyZWVuQ2FudmFzPW51bGwsdGhpcy5jdHg9bnVsbCx0aGlzLnRleHR1cmVBbGlhcz1uZXcgTWFwLHNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKCh7ZGF0YTplfSk9PnRoaXMub25NZXNzYWdlKGUudGl0bGUsZS5jb250ZW50KSkpfW9uTWVzc2FnZShlLHQpe3N3aXRjaChlKXtjYXNlImluaXRDYW52YXMiOnRoaXMub2Zmc2NyZWVuQ2FudmFzPXQuY2FudmFzLHRoaXMuY3R4PXRoaXMub2Zmc2NyZWVuQ2FudmFzLmdldENvbnRleHQoIjJkIikseC5zZXRDb250ZXh0KHRoaXMuY3R4KSx0aGlzLnNldFNpemUodC5kcHIsdC53aWR0aCx0LmhlaWdodCksdGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgiaW5pdGlhbGl6ZWQiKTticmVhaztjYXNlInJlbmRlciI6Zm9yKGxldCBlIG9mIHQucmVuZGVyU3RhY2spdGhpcy5oYW5kbGVEcmF3UmVxdWVzdChlLm1ldGhvZE5hbWUsZS5hcmdzKTticmVhaztjYXNlIm5ld1RleHR1cmUiOnRoaXMudGV4dHVyZUFsaWFzW3QuaWRdPXQudGV4dHVyZX19c2V0U2l6ZShlLHQscil7Y29uc3QgaT0oZXx8MSkqdGhpcy5jYW52YXNSZXNvbHV0aW9uO3RoaXMub2Zmc2NyZWVuQ2FudmFzLndpZHRoPXQqaSx0aGlzLm9mZnNjcmVlbkNhbnZhcy5oZWlnaHQ9cippLCJzZXRUcmFuc2Zvcm0iaW4gdGhpcy5jdHgmJnRoaXMuY3R4LnNldFRyYW5zZm9ybShpLDAsMCxpLDAsMCl9Z2V0VGV4dHVyZShlKXtyZXR1cm4gdGhpcy50ZXh0dXJlQWxpYXNbZV19aGFuZGxlRHJhd1JlcXVlc3QoZSx0KXtzd2l0Y2goZSl7Y2FzZSJzdHlsZSI6eC5zdHlsZShudWxsPT10P3ZvaWQgMDp0Lm9iaik7YnJlYWs7Y2FzZSJjbGVhciI6eC5jbGVhcihudWxsPT10P3ZvaWQgMDp0LmNvbG9yKTticmVhaztjYXNlImxpbmUiOngubGluZSh0LngxLHQueTEsdC54Mix0LnkyLHQub2JqKTticmVhaztjYXNlInJlY3QiOngucmVjdCh0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdC5vYmopO2JyZWFrO2Nhc2UicmVjdEZyb21DZW50ZXIiOngucmVjdEZyb21DZW50ZXIodC54LHQueSx0LndpZHRoLHQuaGVpZ2h0LHQub2JqKTticmVhaztjYXNlInJlY3RGcm9tUG9pbnRzIjp4LnJlY3RGcm9tUG9pbnRzKHQueDEsdC55MSx0LngyLHQueTIsdC5vYmopO2JyZWFrO2Nhc2UicG9seSI6eC5wb2x5KHQucG9pbnRzLHQub2JqKTticmVhaztjYXNlImNpcmNsZSI6eC5jaXJjbGUodC54LHQueSx0LnJhZGl1cyx0Lm9iaik7YnJlYWs7Y2FzZSJjaXJjbGVGcm9tUmVjdCI6eC5jaXJjbGVGcm9tUmVjdCh0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdC5vYmopO2JyZWFrO2Nhc2UicG9pbnQiOngucG9pbnQodC54LHQueSx0Lm9iaik7YnJlYWs7Y2FzZSJyZWN0U3ByaXRlIjp4LnJlY3RTcHJpdGUodC54LHQueSx0LndpZHRoLHQuaGVpZ2h0LHRoaXMuZ2V0VGV4dHVyZSh0LnRleHR1cmVJZCkpO2JyZWFrO2Nhc2UiY2lyY2xlU3ByaXRlIjp4LmNpcmNsZVNwcml0ZSh0LngsdC55LHQucmFkaXVzLHRoaXMuZ2V0VGV4dHVyZSh0LnRleHR1cmVJZCkpO2JyZWFrO2Nhc2UidGludCI6eC50aW50KHQuY29sb3IsdC54LHQueSx0LndpZHRoLHQuaGVpZ2h0KX19fTsK",{type:"module"})}let Q=!1,z=[];const T=new Map;class J{static get worker(){return H}static get workerIsInitialized(){return Q}static get offscreenCanvas(){return V}static get renderStack(){return z}static create(t,e){return Y=C(t,e,1),J.initRenderWorker(Y,t,e),L(Y,"main"),Y}static initRenderWorker(t,e,i){"offscreen"!==tt.rendererType&&tt.setRendererType("offscreen");let{clientWidth:s,clientHeight:n}=t;H=new U,V=t.transferControlToOffscreen(),this.sendMessageToWorker("initCanvas",{width:e||s,height:i||n,canvas:V,dpr:window.devicePixelRatio||1},[V]),H.onmessage=({data:{title:t,data:e}})=>{switch(t){case"log":console.log("message from the renderer worker : ",e);break;case"initialized":Q=!0}}}static addRenderCall(t,e){z.push(new M(t,e||{}))}static sendMessageToWorker(t,e,i){return H.postMessage(new F(t,e),i||[])}static style(t){this.addRenderCall("style",{obj:t})}static clear(t){this.addRenderCall("clear",{color:t})}static line(t,e,i,s,n){this.addRenderCall("line",{x1:t,y1:e,x2:i,y2:s,obj:n})}static rect(t,e,i,s,n){this.addRenderCall("rect",{x:t,y:e,width:i,height:s,obj:n})}static rectFromCenter(t,e,i,s,n){this.addRenderCall("rectFromCenter",{x:t,y:e,width:i,height:s,obj:n})}static rectFromPoints(t,e,i,s,n){this.addRenderCall("rectFromPoints",{x1:t,y1:e,x2:i,y2:s,obj:n})}static poly(t,e){this.addRenderCall("poly",{points:t,obj:e})}static circle(t,e,i,s){this.addRenderCall("circle",{x:t,y:e,radius:i,obj:s})}static circleFromRect(t,e,i,s,n){this.addRenderCall("circleFromRect",{x:t,y:e,width:i,height:s,obj:n})}static point(t,e,i){this.addRenderCall("point",{x:t,y:e,obj:i})}static rectSprite(t,e,i,s,n){var l;T.has(n.id)?this.addRenderCall("rectSprite",{x:t,y:e,width:i,height:s,textureId:n.id}):null==(l=n.convertToBitmap())||l.then((t=>{T.set(n.id,t),this.sendMessageToWorker("newTexture",{id:n.id,texture:t})}))}static async circleSprite(t,e,i,s){var n;T.has(s.id)?this.addRenderCall("circleSprite",{x:t,y:e,radius:i,textureId:s.id}):null==(n=s.convertToBitmap())||n.then((t=>{T.set(s.id,t),this.sendMessageToWorker("newTexture",{id:s.id,texture:t})}))}static tint(t,e,i,s,n){this.addRenderCall("circle",{color:t,x:e,y:i,width:s,height:n})}static beginFrame(){z=[],this.addRenderCall("clear")}static endFrame(){Q&&(this.sendMessageToWorker("render",{renderStack:z}),z=[])}}let j=0;class P{constructor(t,e){if(!t)throw new Error("A source path to the resource must be provided");this.id=j++,this.image=new Image,this.image.src=t,this.size=new d(this.image.width,this.image.height),this.options=e||{},this.rotation=this.options.rotation||0,this.offset=this.options.offset||u,this.scale=this.options.scale||m}async convertToBitmap(){if(!this.image.width||!this.image.height)return;const t=await createImageBitmap(this.image);return s=o({},this),e(s,i({image:t}));var s}}let B=[],D=4;const O=["top-left","top-right","bottom-left","bottom-right","custom"];class A{static addItem(t,e,i){A.internalAddItem(t,e,i)}static addButton(t,e,i,s){A.internalAddItem(t,e,i,s)}static internalAddItem(t,e,i,s){const n={callback:t,position:e,options:i,onClick:s};B.push(n);const l=B.length;window.addEventListener("load",(()=>A.addToDom(n,l)))}static init(){A.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    z-index: 2;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n}\n\n.ue-container > div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container > .top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container > .top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container > .bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container > .bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n}');const t=document.createElement("div");t.classList.add("ue-interface","ue-container");for(let e of O){const i=document.createElement("div");i.classList.add(e),t.appendChild(i)}document.body.appendChild(t)}static addStyle(t){document.createElement("style").textContent=t,document.head.append(t)}static addToDom(t,e){var i,s;const n=t.callback(),l=document.createElement("span");l.classList.add("ue-interface-items"),l.id=`item-${e}`,l.innerText=n,Object.entries(t.options||{}).forEach((([t,e])=>l.style[t]=e)),t.position?null==(i=document.querySelector(`.ue-container > .${t.position}`))||i.appendChild(l):null==(s=document.querySelector(".ue-container > .custom"))||s.appendChild(l),t.onClick&&(l.addEventListener("click",(e=>t.onClick(e))),l.classList.add("ue-interface-button"))}static update(){B.forEach(((t,e)=>{const i=t.callback(),s=document.querySelector(`.ue-interface #item-${e+1}`);s&&s.innerText!==i&&(s.innerText=i)}))}static statsShift(t){const e=document.querySelector(".top-left");e&&(e.style.top=`${t}px`)}static setUpdateInterval(t){D=t}static get updateInterval(){return D}}function q(){const t=new w,e=document.createElement("div");return e.classList.toggle("stats"),t.showPanel(0),e.appendChild(t.dom),document.body.appendChild(e),A.statsShift(48),t}class ${constructor(t,e=60){if(this.requestId=0,this.animate=t,this.fps=e,!window)throw new Error("No window context")}start(){let t=performance.now();const e=1e3/this.fps,i=s=>{this.requestId=window.requestAnimationFrame(i);const n=s-t;n>=e-.1&&(t=s-n%e,this.animate(n))};this.requestId=window.requestAnimationFrame(i)}stop(){window.cancelAnimationFrame(this.requestId)}}let _="normal";class tt{constructor(t,e,i=60){this.fps=60,this.name=t,this.env=e,this.tick=0,this.stats=null,this.showStatsPanel=!0,this.gameLoop=null,this.fps=i}static setRendererType(t){_=t}static get rendererType(){return _}toggleStats(t){this.showStatsPanel=void 0!==t?t:!this.showStatsPanel,this.showStatsPanel?this.stats=q():(this.stats=null,document.querySelector(".stats")&&document.querySelector(".stats").remove())}makeAnimationFrame(){this.animationFrame=new $((t=>this.update(t)),this.fps)}setMainLoop(t){this.gameLoop=t,this.makeAnimationFrame()}setFPS(t){this.fps=t,this.makeAnimationFrame()}update(t){var e,i;null==(e=this.stats)||e.begin(),g.tick(),this.gameLoop&&this.gameLoop(t),this.tick%A.updateInterval==0&&A.update(),null==(i=this.stats)||i.end(),this.tick++}start(){if(!this.gameLoop)throw new Error("No game loop");if(!this.animationFrame)throw new Error("AnimationFrame");window.addEventListener("DOMContentLoaded",(()=>{var t;this.name&&(document.title=this.name),g.init(),A.init(),this.showStatsPanel&&(this.stats=q()),null==(t=this.animationFrame)||t.start()}))}}class et{constructor(t,e){this.width=t,this.height=e}update(){}render(){}}class it{constructor(t,e){this.x=t,this.y=e}collide(t){return!!(t.width&&t.height&&this.width&&this.height)&&(this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.height+this.y>t.y)}update(...t){}render(...t){}}class st extends it{constructor(t,e){super(t,e)}update(...t){}render(...t){}}class nt{constructor(t,e){this.delay=t,this.callback=e,window.setTimeout(this.callback,this.delay)}}class lt extends it{constructor(t,e,i=5,s,n){super(e.x,e.y),this.id=t,this.pos=e.clone(),this.angle=s&&"random"!=s?s%2*Math.PI:Math.PI/2+2*Math.random()*Math.PI,this.velocity=new d(Math.random()*i*Math.cos(this.angle),Math.random()*i*Math.sin(this.angle)),this.color=n||"red",this.opacity=p(100,255*Math.random(),255),this.radius=2}update(){this.velocity.y+=.01,this.pos=this.pos.add(this.velocity),this.opacity-=2}render(){switch(tt.rendererType){case"normal":E.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255});break;case"offscreen":J.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255})}}}class at{constructor(t,e,i,s){this.pos=e,this.lifeDuration=i,this.particles=[],this.UUID=100*r.randint(1,100);for(let n=0;n<t;n++){let t=new lt(this.UUID+n,this.pos);this.particles.push(t)}new nt(this.lifeDuration,(()=>{this.destroy(),s&&s()}))}addParticles(t){return t.concat(this.particles)}removeParticles(t){const e=this.particles.length;return t.filter((t=>!y(t.id,this.UUID,this.UUID+e)))}destroy(){}}var ot,ct;(ct=ot||(ot={}))[ct.Turret=0]="Turret",ct[ct.Road=1]="Road",ct[ct.Ground=2]="Ground",ct[ct.Empty=3]="Empty";class rt{constructor(t,e){this.rows=e,this.cols=t,this.cells=[],this.focusCell=null,this.createCells(),this.defineNeighboors()}createCells(){for(let t=0;t<this.cols;t++)for(let e=0;e<this.rows;e++)this.cells.push(new dt(t,e))}updateCell(t){if(this.cells.includes(t)){if(1!==t.width||1!==t.height){if(t.width>1){let e=t.width-1,i=this.cells.filter((i=>i.y===t.y&&i.x>t.x&&i.x<=t.x+e));this.cells=this.cells.filter((t=>!i.includes(t)))}if(t.height>1){let e=t.height-1,i=this.cells.filter((i=>i.x===t.x&&i.y>t.y&&i.y<=t.y+e));this.cells=this.cells.filter((t=>!i.includes(t)))}}this.defineNeighboors(),this.cells[this.cells.indexOf(t)]=t}}defineNeighboors(){this.cells.forEach((t=>{t.neighboor.top=t.y>=1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y-t.height))[0]:null,t.neighboor.bottom=t.y<=this.rows-1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y+t.height))[0]:null,t.neighboor.left=t.x>=1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x-t.width))[0]:null,t.neighboor.right=t.x<=this.cols-1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x+t.width))[0]:null}))}}class dt{constructor(t,e,i=1,s=1){this.x=t,this.y=e,this.width=i,this.height=s,this.highlight=!1,this.type=2,this.neighboor={}}toggleHighlight(){this.highlight=!this.highlight}}const ht={},ut="0.3.9";export{dt as Cell,ht as Config,nt as Cooldown,x as Event,tt as Game,et as GameEnvironement,it as GameObject,rt as Grid,A as Interface,J as OffscreenRenderer,lt as Particle,at as ParticuleGenerator,st as PlayerObject,h as Point,r as Random,E as Renderer,P as Texture,ut as VERSION,u as V_NULL,m as V_UNIT,d as Vector2,p as clamp,C as createCanvas,R as getWindowDimensions,y as inRange};
