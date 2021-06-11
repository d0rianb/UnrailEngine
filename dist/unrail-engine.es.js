var t=Object.defineProperty,e=Object.defineProperties,i=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,l=(e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s,o=(t,e)=>{for(var i in e||(e={}))n.call(e,i)&&l(t,i,e[i]);if(s)for(var i of s(e))a.call(e,i)&&l(t,i,e[i]);return t};"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;class c{static random(){return Math.random()}static randint(t,e){return Math.floor(t+Math.random()*(e-t))}static choice(t){return t[~~(c.random()*t.length)]}static bool(){return c.random()>.5}static sign(){return c.choice([-1,1])}static percent(t){return c.random()<t/100}}var d=c;class r{constructor(t,e){this.x=t,this.y=e}add(t){return new r(this.x+t.x,this.y+t.y)}clone(){return new r(this.x,this.y)}dist(t){return Math.sqrt((this.x-t.x)**2+(this.y-t.y)**2)}}const h=r,u=new r(0,0),p=new r(1,1);function m(t,e,i){return Math.max(t,Math.min(e,i))}function y(t,e,i){return m(e,t,i)===t}var b,Z;(Z=b||(b={}))[Z.KeyboardPressed=0]="KeyboardPressed",Z[Z.KeyboardDown=1]="KeyboardDown",Z[Z.Mouse=2]="Mouse",Z[Z.Window=3]="Window",Z[Z.Custom=4]="Custom",Z[Z.All=5]="All";class x{constructor(t,e,i=4){this.name=t,this.callback=e,this.type=i,this.listeners=[this.callback]}static emit(t,e){const i=G.getCustomEvent(t);i&&i.listeners.forEach((t=>t(e)))}static on(t,e){const i=G.getCustomEvent(t);if(i)i.listeners.push(e);else{const i=new x(t,e,4);G.addEvent(i)}}static onKeyDown(t,e){G.addEvent(new x(t,e,1))}static onKeyPressed(t,e){G.addEvent(new x(t,e,0))}static onMouseClick(t){G.addEvent(new x("click",t,2))}static onMouseMove(t){G.addEvent(new x("mousemove",t,2))}}const G=new class{constructor(){this.windowEvents=[],this.customEvents=[],this.mouseEvents=[],this.keyboardDownEvents=[],this.keyboardPressedEvents=[],this.currentKeyEvents=[]}init(){window.addEventListener("keydown",(t=>{this.currentKeyEvents.find((e=>e.code===t.code))||this.currentKeyEvents.push(t),this.keyboardPressedEvents.forEach((e=>{t.code===e.name&&e.callback(t)}))})),window.addEventListener("keyup",(t=>{this.currentKeyEvents.length&&(this.currentKeyEvents=this.currentKeyEvents.filter((e=>e.code!==t.code)))})),this.bindEvents()}addEvent(t){switch(t.type){case b.KeyboardDown:this.keyboardDownEvents.push(t);break;case b.KeyboardPressed:this.keyboardPressedEvents.push(t);break;case b.Mouse:this.mouseEvents.push(t),window.addEventListener(t.name,(e=>t.callback(e)));break;case b.Window:this.windowEvents.push(t),this.bindEvents();break;case b.Custom:this.customEvents.push(t)}}getCustomEvent(t){return this.customEvents.find((e=>e.name===t))}bindEvents(){this.windowEvents.forEach((t=>window.addEventListener(t.name,t.callback)))}tick(){this.currentKeyEvents.length&&this.keyboardDownEvents.forEach((t=>{this.currentKeyEvents.forEach((e=>{e.code===t.name&&t.callback(e)}))}))}};const g=new class{constructor(){this.hasStarted=!1,this.animations=[]}add(t){this.animations.push(t),this.hasStarted&&t.options.autostart&&t.start()}init(){this.hasStarted=!0;for(let t of this.animations)t.options.autostart&&t.start()}tick(t){for(let e of this.animations)e.update(t)}};var f,R={exports:{}},w=R.exports=((f=function(){function t(t){return s.appendChild(t.dom),t}function e(t){for(var e=0;e<s.children.length;e++)s.children[e].style.display=e===t?"block":"none";i=t}var i=0,s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",s.addEventListener("click",(function(t){t.preventDefault(),e(++i%s.children.length)}),!1);var n=(performance||Date).now(),a=n,l=0,o=t(new f.Panel("FPS","#0ff","#002")),c=t(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=t(new f.Panel("MB","#f08","#201"));return e(0),{REVISION:16,dom:s,addPanel:t,showPanel:e,begin:function(){n=(performance||Date).now()},end:function(){l++;var t=(performance||Date).now();if(c.update(t-n,200),t>a+1e3&&(o.update(1e3*l/(t-a),100),a=t,l=0,d)){var e=performance.memory;d.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){n=this.end()},domElement:s,setMode:e}}).Panel=function(t,e,i){var s=1/0,n=0,a=Math.round,l=a(window.devicePixelRatio||1),o=80*l,c=48*l,d=3*l,r=2*l,h=3*l,u=15*l,p=74*l,m=30*l,y=document.createElement("canvas");y.width=o,y.height=c,y.style.cssText="width:80px;height:48px";var b=y.getContext("2d");return b.font="bold "+9*l+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=i,b.fillRect(0,0,o,c),b.fillStyle=e,b.fillText(t,d,r),b.fillRect(h,u,p,m),b.fillStyle=i,b.globalAlpha=.9,b.fillRect(h,u,p,m),{dom:y,update:function(c,Z){s=Math.min(s,c),n=Math.max(n,c),b.fillStyle=i,b.globalAlpha=1,b.fillRect(0,0,o,u),b.fillStyle=e,b.fillText(a(c)+" "+t+" ("+a(s)+"-"+a(n)+")",d,r),b.drawImage(y,h+l,u,p-l,m,h,u,p-l,m),b.fillRect(h+p-l,u,l,m),b.fillStyle=i,b.globalAlpha=.9,b.fillRect(h+p-l,u,l,a((1-c/Z)*m))}}},f);function v(){return{width:window.innerWidth,height:window.innerHeight}}function W(t,e,i,s){const n=document.createElement("canvas");return L(n,t,e,i),s&&(n.oncontextmenu=t=>t.preventDefault()),n}function L(t,e,i,s){const n=s||window.devicePixelRatio||1;let a=e||t.width,l=i||t.height;t.width=a*n,t.height=l*n,t.style.width=a+"px",t.style.height=l+"px",1!=n&&t.getContext("2d").setTransform(n,0,0,n,0,0)}function C(t,e){window.addEventListener("DOMContentLoaded",(()=>{let i=document.querySelector(e);i||(i=document.createElement(e)),i.appendChild(t),document.querySelector("body").appendChild(i)}))}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};class S extends Error{constructor(t,e){super(e?`[${e.capitalize()}] - ${t}`:t),this.name="EngineFailure"}}class X extends S{constructor(t){super(t,"renderer")}}const k={strokeStyle:"black",lineWidth:2,lineJoin:"round",fillStyle:"transparent",globalAlpha:1,globalCompositeOperation:"add"},H={font:"Roboto",size:16,color:"black"},K=2*Math.PI;let V,Y,I,N,F,U=null==self.document&&null==self.window?4:2*(window.devicePixelRatio||1);function E(t){return~~(t*U)/U}class M{static create(t,e){let[i,s]=[v().width,v().height];const n=W(t||i,e||s);return C(n,"main"),M.setContext(n.getContext("2d")),n}static createFromCanvas(t){let e=document.querySelector(t);if(!(e&&e instanceof HTMLCanvasElement))throw new X("The selected element is not a canvas");return L(e),M.setContext(e.getContext("2d")),e}static setContext(t){V=t}static getContext(){return V}static style(t){if(!V)throw new X("Context has not been initialize. Please use Renderer.setContext");const e=o(o({},k),t);if(e!==Y){for(let t in e)V[t]!==e[t]&&(V[t]=e[t]);Y=e}}static clear(t){t?(M.style({fillStyle:t}),V.fillRect(0,0,V.canvas.width,V.canvas.height)):V.clearRect(0,0,V.canvas.width,V.canvas.height)}static line(t,e,i,s,n){M.style(n),V.beginPath(),V.moveTo(E(t),E(e)),V.lineTo(E(i),E(s)),V.stroke()}static rect(t,e,i,s,n){M.style(n);const[a,l,o,c]=[E(t),E(e),E(i),E(s)];V.fillRect(a,l,o,c),V.strokeRect(a,l,o,c)}static rectFromCenter(t,e,i,s,n){return M.rect(t-i/2,e-s/2,i,s,n)}static rectFromPoints(t,e,i,s,n){return M.rect(t,e,i-t,s-e,n)}static poly(t,e){if(t.length){M.style(e),V.beginPath(),V.moveTo(E(t[0].x),E(t[0].y));for(let e=1;e<t.length;e++)V.lineTo(E(t[e].x),E(t[e].y));V.stroke()}}static circle(t,e,i,s){M.style(s),V.beginPath(),V.arc(E(t),E(e),i,0,K),V.fill(),V.stroke()}static circleFromRect(t,e,i,s,n){return M.circle(t+i/2,e+s/2,Math.min(i,s)/2,n)}static point(t,e,i){M.circle(t,e,5,i)}static rectSprite(t,e,i,s,n){M.style({}),V.save(),V.translate(E(t+i/2),E(e+s/2)),V.scale(n.scale.x,n.scale.y),V.rotate(n.rotation),V.drawImage(n.image,E(i*n.offset.x-i/2),E(s*n.offset.y-s/2),E(i),E(s)),V.restore()}static circleSprite(t,e,i,s){V.save(),V.beginPath(),V.arc(E(t),E(e),i,0,K),V.clip(),M.rectSprite(t-i,e-i,2*i,2*i,s),V.restore()}static text(t,e,i,s){if(V){let t=o(o({},H),s);V.font=`${t.size}px ${t.font}`,M.style({fillStyle:t.color})}V.fillText(t,e,i)}static tint(t,e,i,s,n){M.rect(e,i,s,n,{fillStyle:t,globalCompositeOperation:"multiply",globalAlpha:.25})}static beginFrame(t){M.clear(t)}static endFrame(){}}class z{constructor(t,e){this.title=t,this.content=e}}class T{constructor(t,e){this.methodName=t,this.args=e}}function j(){return new Worker("data:application/javascript;base64,dmFyIGU9T2JqZWN0LmRlZmluZVByb3BlcnR5LHQ9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxpPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkscj1PYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLHM9KHQsaSxyKT0+aSBpbiB0P2UodCxpLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpyfSk6dFtpXT1yLGE9KGUsYSk9Pntmb3IodmFyIG4gaW4gYXx8KGE9e30pKWkuY2FsbChhLG4pJiZzKGUsbixhW25dKTtpZih0KWZvcih2YXIgbiBvZiB0KGEpKXIuY2FsbChhLG4pJiZzKGUsbixhW25dKTtyZXR1cm4gZX07ZnVuY3Rpb24gbigpe3JldHVybnt3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fX1mdW5jdGlvbiBvKGUsdCxpLHIpe2NvbnN0IHM9cnx8d2luZG93LmRldmljZVBpeGVsUmF0aW98fDE7bGV0IGE9dHx8ZS53aWR0aCxuPWl8fGUuaGVpZ2h0O2Uud2lkdGg9YSpzLGUuaGVpZ2h0PW4qcyxlLnN0eWxlLndpZHRoPWErInB4IixlLnN0eWxlLmhlaWdodD1uKyJweCIsMSE9cyYmZS5nZXRDb250ZXh0KCIyZCIpLnNldFRyYW5zZm9ybShzLDAsMCxzLDAsMCl9U3RyaW5nLnByb3RvdHlwZS5jYXBpdGFsaXplPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrdGhpcy5zbGljZSgxKX07Y2xhc3MgYyBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKGUsdCl7c3VwZXIodD9gWyR7dC5jYXBpdGFsaXplKCl9XSAtICR7ZX1gOmUpLHRoaXMubmFtZT0iRW5naW5lRmFpbHVyZSJ9fWNsYXNzIGwgZXh0ZW5kcyBje2NvbnN0cnVjdG9yKGUpe3N1cGVyKGUsInJlbmRlcmVyIil9fWNvbnN0IGg9e3N0cm9rZVN0eWxlOiJibGFjayIsbGluZVdpZHRoOjIsbGluZUpvaW46InJvdW5kIixmaWxsU3R5bGU6InRyYW5zcGFyZW50IixnbG9iYWxBbHBoYToxLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoiYWRkIn0sZD17Zm9udDoiUm9ib3RvIixzaXplOjE2LGNvbG9yOiJibGFjayJ9LHU9MipNYXRoLlBJO2xldCB4LGYscD1udWxsPT1zZWxmLmRvY3VtZW50JiZudWxsPT1zZWxmLndpbmRvdz80OjIqKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKTtmdW5jdGlvbiBnKGUpe3JldHVybn5+KGUqcCkvcH1jbGFzcyB5e3N0YXRpYyBjcmVhdGUoZSx0KXtsZXRbaSxyXT1bbigpLndpZHRoLG4oKS5oZWlnaHRdO2NvbnN0IHM9ZnVuY3Rpb24oZSx0LGkscil7Y29uc3Qgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJjYW52YXMiKTtyZXR1cm4gbyhzLGUsdCxpKSxyJiYocy5vbmNvbnRleHRtZW51PWU9PmUucHJldmVudERlZmF1bHQoKSksc30oZXx8aSx0fHxyKTtyZXR1cm4gZnVuY3Rpb24oZSx0KXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigiRE9NQ29udGVudExvYWRlZCIsKCgpPT57bGV0IGk9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTtpfHwoaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpKSxpLmFwcGVuZENoaWxkKGUpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChpKX0pKX0ocywibWFpbiIpLHkuc2V0Q29udGV4dChzLmdldENvbnRleHQoIjJkIikpLHN9c3RhdGljIGNyZWF0ZUZyb21DYW52YXMoZSl7bGV0IHQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlKTtpZighKHQmJnQgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpdGhyb3cgbmV3IGwoIlRoZSBzZWxlY3RlZCBlbGVtZW50IGlzIG5vdCBhIGNhbnZhcyIpO3JldHVybiBvKHQpLHkuc2V0Q29udGV4dCh0LmdldENvbnRleHQoIjJkIikpLHR9c3RhdGljIHNldENvbnRleHQoZSl7eD1lfXN0YXRpYyBnZXRDb250ZXh0KCl7cmV0dXJuIHh9c3RhdGljIHN0eWxlKGUpe2lmKCF4KXRocm93IG5ldyBsKCJDb250ZXh0IGhhcyBub3QgYmVlbiBpbml0aWFsaXplLiBQbGVhc2UgdXNlIFJlbmRlcmVyLnNldENvbnRleHQiKTtjb25zdCB0PWEoYSh7fSxoKSxlKTtpZih0IT09Zil7Zm9yKGxldCBlIGluIHQpeFtlXSE9PXRbZV0mJih4W2VdPXRbZV0pO2Y9dH19c3RhdGljIGNsZWFyKGUpe2U/KHkuc3R5bGUoe2ZpbGxTdHlsZTplfSkseC5maWxsUmVjdCgwLDAseC5jYW52YXMud2lkdGgseC5jYW52YXMuaGVpZ2h0KSk6eC5jbGVhclJlY3QoMCwwLHguY2FudmFzLndpZHRoLHguY2FudmFzLmhlaWdodCl9c3RhdGljIGxpbmUoZSx0LGkscixzKXt5LnN0eWxlKHMpLHguYmVnaW5QYXRoKCkseC5tb3ZlVG8oZyhlKSxnKHQpKSx4LmxpbmVUbyhnKGkpLGcocikpLHguc3Ryb2tlKCl9c3RhdGljIHJlY3QoZSx0LGkscixzKXt5LnN0eWxlKHMpO2NvbnN0W2EsbixvLGNdPVtnKGUpLGcodCksZyhpKSxnKHIpXTt4LmZpbGxSZWN0KGEsbixvLGMpLHguc3Ryb2tlUmVjdChhLG4sbyxjKX1zdGF0aWMgcmVjdEZyb21DZW50ZXIoZSx0LGkscixzKXtyZXR1cm4geS5yZWN0KGUtaS8yLHQtci8yLGkscixzKX1zdGF0aWMgcmVjdEZyb21Qb2ludHMoZSx0LGkscixzKXtyZXR1cm4geS5yZWN0KGUsdCxpLWUsci10LHMpfXN0YXRpYyBwb2x5KGUsdCl7aWYoZS5sZW5ndGgpe3kuc3R5bGUodCkseC5iZWdpblBhdGgoKSx4Lm1vdmVUbyhnKGVbMF0ueCksZyhlWzBdLnkpKTtmb3IobGV0IHQ9MTt0PGUubGVuZ3RoO3QrKyl4LmxpbmVUbyhnKGVbdF0ueCksZyhlW3RdLnkpKTt4LnN0cm9rZSgpfX1zdGF0aWMgY2lyY2xlKGUsdCxpLHIpe3kuc3R5bGUocikseC5iZWdpblBhdGgoKSx4LmFyYyhnKGUpLGcodCksaSwwLHUpLHguZmlsbCgpLHguc3Ryb2tlKCl9c3RhdGljIGNpcmNsZUZyb21SZWN0KGUsdCxpLHIscyl7cmV0dXJuIHkuY2lyY2xlKGUraS8yLHQrci8yLE1hdGgubWluKGkscikvMixzKX1zdGF0aWMgcG9pbnQoZSx0LGkpe3kuY2lyY2xlKGUsdCw1LGkpfXN0YXRpYyByZWN0U3ByaXRlKGUsdCxpLHIscyl7eS5zdHlsZSh7fSkseC5zYXZlKCkseC50cmFuc2xhdGUoZyhlK2kvMiksZyh0K3IvMikpLHguc2NhbGUocy5zY2FsZS54LHMuc2NhbGUueSkseC5yb3RhdGUocy5yb3RhdGlvbikseC5kcmF3SW1hZ2Uocy5pbWFnZSxnKGkqcy5vZmZzZXQueC1pLzIpLGcocipzLm9mZnNldC55LXIvMiksZyhpKSxnKHIpKSx4LnJlc3RvcmUoKX1zdGF0aWMgY2lyY2xlU3ByaXRlKGUsdCxpLHIpe3guc2F2ZSgpLHguYmVnaW5QYXRoKCkseC5hcmMoZyhlKSxnKHQpLGksMCx1KSx4LmNsaXAoKSx5LnJlY3RTcHJpdGUoZS1pLHQtaSwyKmksMippLHIpLHgucmVzdG9yZSgpfXN0YXRpYyB0ZXh0KGUsdCxpLHIpe2lmKHgpe2xldCBlPWEoYSh7fSxkKSxyKTt4LmZvbnQ9YCR7ZS5zaXplfXB4ICR7ZS5mb250fWAseS5zdHlsZSh7ZmlsbFN0eWxlOmUuY29sb3J9KX14LmZpbGxUZXh0KGUsdCxpKX1zdGF0aWMgdGludChlLHQsaSxyLHMpe3kucmVjdCh0LGkscixzLHtmaWxsU3R5bGU6ZSxnbG9iYWxDb21wb3NpdGVPcGVyYXRpb246Im11bHRpcGx5IixnbG9iYWxBbHBoYTouMjV9KX1zdGF0aWMgYmVnaW5GcmFtZShlKXt5LmNsZWFyKGUpfXN0YXRpYyBlbmRGcmFtZSgpe319bmV3IGNsYXNzIGV4dGVuZHMgY2xhc3N7c2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoZSx0KXtzZWxmLnBvc3RNZXNzYWdlKHt0aXRsZTplLGRhdGE6dH0pfWxvZyguLi5lKXt0aGlzLnNlbmRNZXNzYWdlVG9NYWluVGhyZWFkKCJsb2ciLC4uLmUpfX17Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuY2FudmFzUmVzb2x1dGlvbj0xLHRoaXMub2Zmc2NyZWVuQ2FudmFzPW51bGwsdGhpcy5jdHg9bnVsbCx0aGlzLnRleHR1cmVBbGlhcz1uZXcgTWFwLHNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKCh7ZGF0YTplfSk9PnRoaXMub25NZXNzYWdlKGUudGl0bGUsZS5jb250ZW50KSkpfW9uTWVzc2FnZShlLHQpe3N3aXRjaChlKXtjYXNlImluaXRDYW52YXMiOnRoaXMub2Zmc2NyZWVuQ2FudmFzPXQuY2FudmFzLHRoaXMuY3R4PXRoaXMub2Zmc2NyZWVuQ2FudmFzLmdldENvbnRleHQoIjJkIikseS5zZXRDb250ZXh0KHRoaXMuY3R4KSx0aGlzLnNldFNpemUodC5kcHIsdC53aWR0aCx0LmhlaWdodCksdGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgiaW5pdGlhbGl6ZWQiKTticmVhaztjYXNlInJlbmRlciI6Zm9yKGxldCBlIG9mIHQucmVuZGVyU3RhY2spdGhpcy5oYW5kbGVEcmF3UmVxdWVzdChlLm1ldGhvZE5hbWUsZS5hcmdzKTticmVhaztjYXNlIm5ld1RleHR1cmUiOnRoaXMudGV4dHVyZUFsaWFzW3QuaWRdPXQudGV4dHVyZX19c2V0U2l6ZShlLHQsaSl7Y29uc3Qgcj0oZXx8MSkqdGhpcy5jYW52YXNSZXNvbHV0aW9uO3RoaXMub2Zmc2NyZWVuQ2FudmFzLndpZHRoPXQqcix0aGlzLm9mZnNjcmVlbkNhbnZhcy5oZWlnaHQ9aSpyLCJzZXRUcmFuc2Zvcm0iaW4gdGhpcy5jdHgmJnRoaXMuY3R4LnNldFRyYW5zZm9ybShyLDAsMCxyLDAsMCl9Z2V0VGV4dHVyZShlKXtyZXR1cm4gdGhpcy50ZXh0dXJlQWxpYXNbZV19aGFuZGxlRHJhd1JlcXVlc3QoZSx0KXtzd2l0Y2goZSl7Y2FzZSJzdHlsZSI6eS5zdHlsZShudWxsPT10P3ZvaWQgMDp0Lm9iaik7YnJlYWs7Y2FzZSJjbGVhciI6eS5jbGVhcihudWxsPT10P3ZvaWQgMDp0LmNvbG9yKTticmVhaztjYXNlImxpbmUiOnkubGluZSh0LngxLHQueTEsdC54Mix0LnkyLHQub2JqKTticmVhaztjYXNlInJlY3QiOnkucmVjdCh0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdC5vYmopO2JyZWFrO2Nhc2UicmVjdEZyb21DZW50ZXIiOnkucmVjdEZyb21DZW50ZXIodC54LHQueSx0LndpZHRoLHQuaGVpZ2h0LHQub2JqKTticmVhaztjYXNlInJlY3RGcm9tUG9pbnRzIjp5LnJlY3RGcm9tUG9pbnRzKHQueDEsdC55MSx0LngyLHQueTIsdC5vYmopO2JyZWFrO2Nhc2UicG9seSI6eS5wb2x5KHQucG9pbnRzLHQub2JqKTticmVhaztjYXNlImNpcmNsZSI6eS5jaXJjbGUodC54LHQueSx0LnJhZGl1cyx0Lm9iaik7YnJlYWs7Y2FzZSJjaXJjbGVGcm9tUmVjdCI6eS5jaXJjbGVGcm9tUmVjdCh0LngsdC55LHQud2lkdGgsdC5oZWlnaHQsdC5vYmopO2JyZWFrO2Nhc2UicG9pbnQiOnkucG9pbnQodC54LHQueSx0Lm9iaik7YnJlYWs7Y2FzZSJyZWN0U3ByaXRlIjp5LnJlY3RTcHJpdGUodC54LHQueSx0LndpZHRoLHQuaGVpZ2h0LHRoaXMuZ2V0VGV4dHVyZSh0LnRleHR1cmVJZCkpO2JyZWFrO2Nhc2UiY2lyY2xlU3ByaXRlIjp5LmNpcmNsZVNwcml0ZSh0LngsdC55LHQucmFkaXVzLHRoaXMuZ2V0VGV4dHVyZSh0LnRleHR1cmVJZCkpO2JyZWFrO2Nhc2UidGV4dCI6eS50ZXh0KHQudGV4dCx0LngsdC55LHQuZm9udCk7YnJlYWs7Y2FzZSJ0aW50Ijp5LnRpbnQodC5jb2xvcix0LngsdC55LHQud2lkdGgsdC5oZWlnaHQpfX19Owo=",{type:"module"})}let Q=!1,J=[];const P=new Map;class B{static get worker(){return N}static get workerIsInitialized(){return Q}static get offscreenCanvas(){return I}static get renderStack(){return J}static create(t,e){let[i,s]=[v().width,v().height];return F=W(t||i,e||s,1),B.initRenderWorker(F,t||i,e||s),C(F,"main"),F}static createFromCanvas(t){if(F=document.querySelector(t),!(F&&F instanceof HTMLCanvasElement))throw new X("The selected element is not a canvas");return L(F,F.width,F.height,1),B.initRenderWorker(F,F.width,F.height),F}static initRenderWorker(t,e,i){"offscreen"!==st.rendererType&&st.setRendererType("offscreen");let{clientWidth:s,clientHeight:n}=t;N=new j,I=t.transferControlToOffscreen(),this.sendMessageToWorker("initCanvas",{width:e||s,height:i||n,canvas:I,dpr:window.devicePixelRatio||1},[I]),N.onmessage=({data:{title:t,data:e}})=>{switch(t){case"log":console.log("message from the renderer worker : ",e);break;case"initialized":Q=!0}}}static addRenderCall(t,e){J.push(new T(t,e||{}))}static sendMessageToWorker(t,e,i){return N.postMessage(new z(t,e),i||[])}static style(t){this.addRenderCall("style",{obj:t})}static clear(t){this.addRenderCall("clear",{color:t})}static line(t,e,i,s,n){this.addRenderCall("line",{x1:t,y1:e,x2:i,y2:s,obj:n})}static rect(t,e,i,s,n){this.addRenderCall("rect",{x:t,y:e,width:i,height:s,obj:n})}static rectFromCenter(t,e,i,s,n){this.addRenderCall("rectFromCenter",{x:t,y:e,width:i,height:s,obj:n})}static rectFromPoints(t,e,i,s,n){this.addRenderCall("rectFromPoints",{x1:t,y1:e,x2:i,y2:s,obj:n})}static poly(t,e){this.addRenderCall("poly",{points:t,obj:e})}static circle(t,e,i,s){this.addRenderCall("circle",{x:t,y:e,radius:i,obj:s})}static circleFromRect(t,e,i,s,n){this.addRenderCall("circleFromRect",{x:t,y:e,width:i,height:s,obj:n})}static point(t,e,i){this.addRenderCall("point",{x:t,y:e,obj:i})}static rectSprite(t,e,i,s,n){var a;P.has(n.id)?this.addRenderCall("rectSprite",{x:t,y:e,width:i,height:s,textureId:n.id}):null==(a=n.convertToBitmap())||a.then((t=>{P.set(n.id,t),this.sendMessageToWorker("newTexture",{id:n.id,texture:t})}))}static async circleSprite(t,e,i,s){var n;P.has(s.id)?this.addRenderCall("circleSprite",{x:t,y:e,radius:i,textureId:s.id}):null==(n=s.convertToBitmap())||n.then((t=>{P.set(s.id,t),this.sendMessageToWorker("newTexture",{id:s.id,texture:t})}))}static text(t,e,i,s){this.addRenderCall("text",{text:t,x:e,y:i,font:s})}static tint(t,e,i,s,n){this.addRenderCall("circle",{color:t,x:e,y:i,width:s,height:n})}static beginFrame(t){J=[],this.clear(t)}static endFrame(){Q&&(this.sendMessageToWorker("render",{renderStack:J}),J=[])}}let O=0;class D{constructor(t,e){if(!t)throw new Error("A source path to the resource must be provided");this.id=O++,this.image=new Image,this.image.src=t,this.size=new r(this.image.width,this.image.height),this.options=e||{},this.rotation=this.options.rotation||0,this.offset=this.options.offset||u,this.scale=this.options.scale||p}async convertToBitmap(){if(!this.image.width||!this.image.height)return;const t=await createImageBitmap(this.image);return s=o({},this),e(s,i({image:t}));var s}}let A=[],q=4;const $=["top-left","top-right","bottom-left","bottom-right","custom"];class _{static addItem(t,e,i){_.internalAddItem(t,e,i)}static addButton(t,e,i,s){_.internalAddItem(t,i,s,e)}static internalAddItem(t,e,i,s){const n={callback:t,position:e,options:i,onClick:s};A.push(n);const a=A.length;window.addEventListener("load",(()=>_.addToDom(n,a)))}static init(){_.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    z-index: 2;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n    /* Make the click event pass through */\n    pointer-events: none;\n}\n\n.ue-container>div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container>.top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container>.top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container>.bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container>.bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n}');const t=document.createElement("div");t.classList.add("ue-interface","ue-container");for(let e of $){const i=document.createElement("div");i.classList.add(e),t.appendChild(i)}document.body.appendChild(t)}static addStyle(t){const e=document.createElement("style");e.textContent=t,document.head.append(e)}static addToDom(t,e){var i,s;const n=t.callback(),a=document.createElement("span");a.classList.add("ue-interface-items"),a.id=`item-${e}`,a.innerText=n,Object.entries(t.options||{}).forEach((([t,e])=>a.style[t]=e)),t.position?null==(i=document.querySelector(`.ue-container > .${t.position}`))||i.appendChild(a):null==(s=document.querySelector(".ue-container > .custom"))||s.appendChild(a),t.onClick&&(a.addEventListener("click",(e=>t.onClick(e))),a.classList.add("ue-interface-button"))}static update(){A.forEach(((t,e)=>{const i=t.callback(),s=document.querySelector(`.ue-interface #item-${e+1}`);s&&s.innerText!==i&&(s.innerText=i)}))}static statsShift(t){const e=document.querySelector(".top-left");e&&(e.style.top=`${t}px`)}static setUpdateInterval(t){q=t}static get updateInterval(){return q}}function tt(){const t=new w,e=document.createElement("div");return e.classList.toggle("stats"),t.showPanel(0),e.appendChild(t.dom),document.body.appendChild(e),_.statsShift(48),t}class et{constructor(t,e=60){if(this.requestId=0,this.animate=t,this.fps=e,!window)throw new Error("No window context")}start(){let t=performance.now();const e=1e3/this.fps,i=s=>{this.requestId=window.requestAnimationFrame(i);const n=s-t;n>=e-.1&&(t=s-n%e,this.animate(n))};this.requestId=window.requestAnimationFrame(i)}stop(){window.cancelAnimationFrame(this.requestId)}}let it="normal";class st{constructor(t,e,i=60){this.fps=60,this.name=t,this.env=e,this.tick=0,this.stats=null,this.showStatsPanel=!0,this.gameLoop=null,this.fps=i}static setRendererType(t){it=t}static get rendererType(){return it}toggleStats(t){this.showStatsPanel=void 0!==t?t:!this.showStatsPanel,this.showStatsPanel?this.stats=tt():(this.stats=null,document.querySelector(".stats")&&document.querySelector(".stats").remove())}makeAnimationFrame(){this.animationFrame=new et((t=>this.update(t)),this.fps)}setMainLoop(t){this.gameLoop=t,this.makeAnimationFrame()}setFPS(t){this.fps=t,this.makeAnimationFrame()}update(t){var e,i;null==(e=this.stats)||e.begin(),G.tick(),g.tick(t),this.gameLoop&&this.gameLoop(t),this.tick%_.updateInterval==0&&_.update(),null==(i=this.stats)||i.end(),this.tick++}start(){if(!this.gameLoop)throw new Error("No game loop");if(!this.animationFrame)throw new Error("AnimationFrame");window.addEventListener("DOMContentLoaded",(()=>{var t;this.name&&(document.title=this.name),G.init(),g.init(),_.init(),this.showStatsPanel&&(this.stats=tt()),null==(t=this.animationFrame)||t.start()}))}}class nt{constructor(t,e){this.width=t,this.height=e}update(){}render(){}}class at{constructor(t,e){this.x=t,this.y=e}collide(t){return!!(t.width&&t.height&&this.width&&this.height)&&(this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.height+this.y>t.y)}update(...t){}render(...t){}}class lt extends at{constructor(t,e){super(t,e)}update(...t){}render(...t){}}class ot{constructor(t,e){this.delay=t,this.callback=e,window.setTimeout(this.callback,this.delay)}}class ct extends at{constructor(t,e,i=5,s,n){super(e.x,e.y),this.id=t,this.pos=e.clone(),this.angle=s&&"random"!=s?s%2*Math.PI:Math.PI/2+2*Math.random()*Math.PI,this.velocity=new r(Math.random()*i*Math.cos(this.angle),Math.random()*i*Math.sin(this.angle)),this.color=n||"transparent",this.opacity=m(100,255*Math.random(),255),this.radius=2}update(){this.velocity.y+=.01,this.pos=this.pos.add(this.velocity),this.opacity-=2}render(){switch(st.rendererType){case"normal":M.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255});break;case"offscreen":B.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255})}}}class dt{constructor(t,e,i,s){this.pos=e,this.lifeDuration=i,this.particles=[],this.UUID=100*d.randint(1,100);for(let n=0;n<t;n++){let t=new ct(this.UUID+n,this.pos);this.particles.push(t)}new ot(this.lifeDuration,(()=>{this.destroy(),s&&s()}))}addParticles(t){return t.concat(this.particles)}removeParticles(t){const e=this.particles.length;return t.filter((t=>!y(t.id,this.UUID,this.UUID+e)))}destroy(){}}var rt,ht;(ht=rt||(rt={}))[ht.Turret=0]="Turret",ht[ht.Road=1]="Road",ht[ht.Ground=2]="Ground",ht[ht.Empty=3]="Empty";class ut{constructor(t,e){this.rows=e,this.cols=t,this.cells=[],this.focusCell=null,this.createCells(),this.defineNeighboors()}createCells(){for(let t=0;t<this.cols;t++)for(let e=0;e<this.rows;e++)this.cells.push(new pt(t,e))}updateCell(t){if(this.cells.includes(t)){if(1!==t.width||1!==t.height){if(t.width>1){let e=t.width-1,i=this.cells.filter((i=>i.y===t.y&&i.x>t.x&&i.x<=t.x+e));this.cells=this.cells.filter((t=>!i.includes(t)))}if(t.height>1){let e=t.height-1,i=this.cells.filter((i=>i.x===t.x&&i.y>t.y&&i.y<=t.y+e));this.cells=this.cells.filter((t=>!i.includes(t)))}}this.defineNeighboors(),this.cells[this.cells.indexOf(t)]=t}}defineNeighboors(){this.cells.forEach((t=>{t.neighboor.top=t.y>=1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y-t.height))[0]:null,t.neighboor.bottom=t.y<=this.rows-1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y+t.height))[0]:null,t.neighboor.left=t.x>=1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x-t.width))[0]:null,t.neighboor.right=t.x<=this.cols-1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x+t.width))[0]:null}))}}class pt{constructor(t,e,i=1,s=1){this.x=t,this.y=e,this.width=i,this.height=s,this.highlight=!1,this.type=2,this.neighboor={}}toggleHighlight(){this.highlight=!this.highlight}}const mt={linear:t=>t,easeIn:t=>t**2,easeOut:t=>1-(1-t)**2,easeInOut:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,easeInBack:t=>2.70158*t**3-1.70158*t**2,easeOutBack:t=>1+1.70158*Math.pow(t-1,3)+2.70158*Math.pow(t-1,2),easeInOutBack:t=>t<.5?Math.pow(2*t,2)*(7.189819*t-2.5949095)/2:(Math.pow(2*t-2,2)*(3.5949095*(2*t-2)+2.5949095)+2)/2},yt={autostart:!1,loop:!1};class bt{constructor(t,e,i,s=mt.linear,n={}){this.hasStarted=!1,this.isPaused=!1,this.isEnded=!1,this.isReversed=!1,this.from=t,this.to=e,this.duration=i,this.easing=s,this.options=o(o({},yt),n),this.value=this.from,this.speed=(this.to-this.from)/this.duration,this.isReversed=!1,this.lastT=0,g.add(this)}start(){this.isEnded=!1,this.hasStarted=!0}reset(){this.lastT=0,this.isPaused=!1}toggle(t){void 0!==t&&(t?this.pause():this.resume()),this.isPaused?this.resume():this.pause()}pause(){this.isPaused=!0}resume(){this.isPaused=!1}update(t){if(!this.hasStarted||this.isPaused)return;let e=m(0,this.lastT+t*this.speed/Math.abs(this.to-this.from),1);if(e>=1||e<=0){if(!this.options.loop)return this.isEnded=!0,void(this.lastT=1);this.speed*=-1,this.isReversed=!this.isReversed}this.lastT=e,this.value=this.from+(this.to-this.from)*this.easing(e)}}const Zt={},xt="0.4.3";export{bt as Animation,pt as Cell,Zt as Config,ot as Cooldown,mt as Easing,x as Event,st as Game,nt as GameEnvironement,at as GameObject,ut as Grid,_ as Interface,B as OffscreenRenderer,ct as Particle,dt as ParticuleGenerator,lt as PlayerObject,h as Point,d as Random,M as Renderer,D as Texture,xt as VERSION,u as V_NULL,p as V_UNIT,r as Vector2,m as clamp,W as createCanvas,v as getWindowDimensions,y as inRange};
