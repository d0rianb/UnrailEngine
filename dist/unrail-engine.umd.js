var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(t,e,s)=>e in t?__defProp(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,__spreadValues=(t,e)=>{for(var s in e||(e={}))__hasOwnProp.call(e,s)&&__defNormalProp(t,s,e[s]);if(__getOwnPropSymbols)for(var s of __getOwnPropSymbols(e))__propIsEnum.call(e,s)&&__defNormalProp(t,s,e[s]);return t},__spreadProps=(t,e)=>__defProps(t,__getOwnPropDescs(e));!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["unrail-engine"]={})}(this,(function(t){"use strict";"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;class e{static random(){return Math.random()}static randint(t,e){return Math.floor(t+Math.random()*(e-t))}static choice(t){return t[~~(e.random()*t.length)]}static bool(){return e.random()>.5}static sign(){return e.choice([-1,1])}static percent(t){return e.random()<t/100}}var s=e;class i{constructor(t,e){this.x=t,this.y=e}clone(){return new i(this.x,this.y)}add(t){return new i(this.x+t.x,this.y+t.y)}multiply(t){return new i(this.x*t,this.y*t)}dot(t){return this.x*t.x+this.y*t.y}dist(t){return Math.sqrt((this.x-t.x)**2+(this.y-t.y)**2)}}const n=i,l=new i(0,0),a=new i(1,1);function o(t,e,s){return t>s?o(s,e,t):Math.max(t,Math.min(e,s))}function d(t,e,s){return o(e,t,s)===t}class c{constructor(t,e,s,i){this.x=t,this.y=e,this.width=s,this.height=i}}function h(){return{width:window.innerWidth,height:window.innerHeight}}function r(t){return{width:t.clientWidth||t.width,height:t.clientHeight||t.height}}function m(t,e,s,i){t.width=e*(i||window.devicePixelRatio||1),t.height=s*(i||window.devicePixelRatio||1),t.style.width=e+"px",t.style.height=s+"px"}function p(t,e,s,i){const n=document.createElement("canvas");return u(n,t,e,s),i&&(n.oncontextmenu=t=>t.preventDefault()),n}function u(t,e,s,i){const n=i||window.devicePixelRatio||1;m(t,e||r(t).width,s||r(t).height,n),1!=n&&t.getContext("2d").setTransform(n,0,0,n,0,0)}function b(t,e){window.addEventListener("DOMContentLoaded",(()=>{var s;const i=null!=(s=document.querySelector(e))?s:document.createElement(e);i.appendChild(t),document.querySelector("body").appendChild(i)}))}function y(){return null==self.document&&null==self.window}function G(){return performance.now()||Date.now()}function Z(t){return window&&t in window}function x(){return/complete|interactive|loaded/.test(document.readyState)}var L,f;(f=L||(L={}))[f.KeyboardPressed=0]="KeyboardPressed",f[f.KeyboardDown=1]="KeyboardDown",f[f.Mouse=2]="Mouse",f[f.Window=3]="Window",f[f.Custom=4]="Custom",f[f.All=5]="All";class W{constructor(t,e,s=4){this.name=t,this.callback=e,this.type=s,this.listeners=[this.callback]}static emit(t,e){t instanceof Array?t.forEach((t=>this.emitEvent(t,e))):this.emitEvent(t,e)}static emitEvent(t,e){const s=X.getCustomEvent(t);s&&s.listeners.forEach((t=>t(e)))}static on(t,e){t instanceof Array?t.forEach((t=>this.onEvent(t,e))):this.onEvent(t,e)}static onEvent(t,e){const s=X.getCustomEvent(t);if(s)s.listeners.push(e);else{const s=new W(t,e,4);X.addEvent(s)}}static onKeyDown(t,e){t instanceof Array?t.forEach((t=>X.addEvent(new W(t,e,1)))):X.addEvent(new W(t,e,1))}static onKeyPressed(t,e){t instanceof Array?t.forEach((t=>X.addEvent(new W(t,e,0)))):X.addEvent(new W(t,e,0))}static onAnyKeyReleased(t){X.addEvent(new W("keyup",t,3))}static onClick(t){W.onMouseClick(t)}static onMouseClick(t){X.addEvent(new W("click",t,2))}static onMouseMove(t){X.addEvent(new W("mousemove",t,2))}}const X=new class{constructor(){this.windowEvents=[],this.customEvents=[],this.mouseEvents=[],this.keyboardEvents=[],this.currentKeyEvents=[]}init(){window.addEventListener("keydown",(t=>{this.currentKeyEvents.find((e=>e.code===t.code))||this.currentKeyEvents.push(t),this.keyboardEvents.filter((t=>t.type===L.KeyboardPressed)).forEach((e=>{t.code===e.name&&e.callback(t)}))})),window.addEventListener("keyup",(t=>{this.currentKeyEvents.length&&(this.currentKeyEvents=this.currentKeyEvents.filter((e=>e.code!==t.code)))})),this.bindEvents()}addEvent(t){switch(t.type){case L.KeyboardDown:case L.KeyboardPressed:this.keyboardEvents.push(t);break;case L.Mouse:this.mouseEvents.push(t),window.addEventListener(t.name,(e=>t.callback(e)));break;case L.Window:this.windowEvents.push(t),this.bindEvents();break;case L.Custom:this.customEvents.push(t)}}getCustomEvent(t){return this.customEvents.find((e=>e.name===t))}bindEvents(){this.windowEvents.forEach((t=>window.addEventListener(t.name,t.callback)))}tick(){this.currentKeyEvents.length&&this.keyboardEvents.filter((t=>t.type===L.KeyboardDown)).forEach((t=>{this.currentKeyEvents.forEach((e=>{e.code===t.name&&t.callback(e)}))}))}};const S=new class{constructor(){this.hasStarted=!1,this.animations=[]}add(t){this.animations.push(t),this.hasStarted&&t.options.autostart&&t.start()}init(){this.hasStarted=!0;for(let t of this.animations)t.options.autostart&&t.start()}tick(t){for(let e of this.animations)e.update(t)}};var R,g={exports:{}};g.exports=((R=function(){function t(t){return i.appendChild(t.dom),t}function e(t){for(var e=0;e<i.children.length;e++)i.children[e].style.display=e===t?"block":"none";s=t}var s=0,i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",i.addEventListener("click",(function(t){t.preventDefault(),e(++s%i.children.length)}),!1);var n=(performance||Date).now(),l=n,a=0,o=t(new R.Panel("FPS","#0ff","#002")),d=t(new R.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new R.Panel("MB","#f08","#201"));return e(0),{REVISION:16,dom:i,addPanel:t,showPanel:e,begin:function(){n=(performance||Date).now()},end:function(){a++;var t=(performance||Date).now();if(d.update(t-n,200),t>l+1e3&&(o.update(1e3*a/(t-l),100),l=t,a=0,c)){var e=performance.memory;c.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){n=this.end()},domElement:i,setMode:e}}).Panel=function(t,e,s){var i=1/0,n=0,l=Math.round,a=l(window.devicePixelRatio||1),o=80*a,d=48*a,c=3*a,h=2*a,r=3*a,m=15*a,p=74*a,u=30*a,b=document.createElement("canvas");b.width=o,b.height=d,b.style.cssText="width:80px;height:48px";var y=b.getContext("2d");return y.font="bold "+9*a+"px Helvetica,Arial,sans-serif",y.textBaseline="top",y.fillStyle=s,y.fillRect(0,0,o,d),y.fillStyle=e,y.fillText(t,c,h),y.fillRect(r,m,p,u),y.fillStyle=s,y.globalAlpha=.9,y.fillRect(r,m,p,u),{dom:b,update:function(d,G){i=Math.min(i,d),n=Math.max(n,d),y.fillStyle=s,y.globalAlpha=1,y.fillRect(0,0,o,m),y.fillStyle=e,y.fillText(l(d)+" "+t+" ("+l(i)+"-"+l(n)+")",c,h),y.drawImage(b,r+a,m,p-a,u,r,m,p-a,u),y.fillRect(r+p-a,m,a,u),y.fillStyle=s,y.globalAlpha=.9,y.fillRect(r+p-a,m,a,l((1-d/G)*u))}}},R);var w=g.exports;let v=0;class V{constructor(t,e){if(this.isLoaded=!1,!t)throw new Error("A source path to the resource must be provided");this.id=v++,this.image=new Image,this.image.src=t,this.image.onload=()=>{this.isLoaded=!0,this.onLoad()},this.size={width:this.image.width,height:this.image.height},this.rotation=(null==e?void 0:e.rotation)||0,this.offset=(null==e?void 0:e.offset)||l,this.scale=(null==e?void 0:e.scale)||a}async convertToBitmap(){if(!this.image.width||!this.image.height)return;const t=await createImageBitmap(this.image);return __spreadProps(__spreadValues({},this),{image:t})}onLoad(){}}let C=[],K=4;const Y=["top-left","top-right","bottom-left","bottom-right","custom"];class k{static addItem(t,e,s){k.internalAddItem(t,e,s)}static addButton(t,e,s,i){k.internalAddItem(t,s,i,e)}static internalAddItem(t,e,s,i){const n={callback:"string"==typeof t?()=>t:t,position:e,options:s,onClick:i};C.push(n);const l=C.length;x()?k.addToDom(n,l):window.addEventListener("load",(()=>k.addToDom(n,l)))}static init(){k.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    z-index: 10;\n    image-rendering: pixelated;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n    /* Make the click event pass through */\n    pointer-events: none;\n}\n\n.ue-container>div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container>.top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container>.top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container>.bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container>.bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n    pointer-events: all;\n}');const t=document.createElement("div");t.classList.add("ue-interface","ue-container");for(let e of Y){const s=document.createElement("div");s.classList.add(e),t.appendChild(s)}document.body.appendChild(t)}static addStyle(t){const e=document.createElement("style");e.textContent=t,document.head.append(e)}static addToDom(t,e){var s,i;const n=t.callback(),l=document.createElement("span");l.classList.add("ue-interface-items"),l.id=`item-${e}`,l.innerText=n,Object.entries(t.options||{}).forEach((([t,e])=>l.style[t]=e)),t.position?null==(s=document.querySelector(`.ue-container > .${t.position}`))||s.appendChild(l):null==(i=document.querySelector(".ue-container > .custom"))||i.appendChild(l),t.onClick&&(l.addEventListener("click",(e=>t.onClick(e))),l.classList.add("ue-interface-button"))}static update(){C.forEach(((t,e)=>{const s=t.callback(),i=document.querySelector(`.ue-interface #item-${e+1}`);i&&i.innerText!==s&&(i.innerText=s)}))}static statsShift(t){const e=document.querySelector(".top-left");e&&(e.style.top=`${t}px`)}static setUpdateInterval(t){K=t}static get updateInterval(){return K}static getItems(){return C}}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};class H extends Error{constructor(t,e){super(e?`[${e.capitalize()}] - ${t}`:t),this.name="EngineFailure"}}class I extends H{constructor(t){super(t,"renderer")}}const F={interval:200,loop:!1};class z extends V{constructor(t,e,s,i){if(super(t.spriteSheetPath),this.intervalId=-1,this.isAnimated=!1,this.lastRunTimeStamp=0,this.spriteSheet=t,e[0]<1||e[1]<1||s[0]<1||s[1]<1||e[0]>t.cols||e[1]>t.rows||s[0]>t.cols||s[1]>t.rows)throw new H("Invalid tuples : the stylesheet coordinate starts at (1, 1)");this.from=e,this.to=s;let n=__spreadValues(__spreadValues({},F),i);this.interval=n.interval,this.loop=n.loop,this.spriteWidth=this.size.width/t.cols,this.spriteHeight=this.size.height/t.rows,this.coordX=this.from[0],this.coordY=this.from[1]}run(){let t=G();t-this.lastRunTimeStamp>this.interval&&(this.step(),this.lastRunTimeStamp=t)}animate(){this.isAnimated||(this.intervalId=window.setInterval((()=>this.step()),this.interval),this.isAnimated=!0)}pause(){this.isAnimated&&(window.clearInterval(this.intervalId),this.isAnimated=!1)}reset(){this.coordX=this.from[0],this.coordY=this.from[1]}stop(){this.pause(),this.reset()}setInterval(t){this.interval=t,this.isAnimated&&(window.clearInterval(this.intervalId),this.animate())}step(){this.coordX!==this.to[0]||this.coordY!==this.to[1]?this.coordY<this.to[1]?this.coordX<this.spriteSheet.cols?this.coordX++:(this.coordY++,this.coordX=this.from[0]):this.coordX<this.to[0]&&this.coordX++:this.loop&&(this.coordX=this.from[0],this.coordY=this.from[1])}spriteBox(){return new c((this.coordX-1)*this.spriteWidth,(this.coordY-1)*this.spriteHeight,this.spriteWidth,this.spriteHeight)}}const M={strokeStyle:"black",lineWidth:2,lineJoin:"round",lineCap:"round",fillStyle:"transparent",globalAlpha:1,globalCompositeOperation:"add"},N={font:"Roboto",size:16,color:"black",textAlign:"left",textBaseline:"alphabetic"},U=2*Math.PI;let J,T,P,E,Q,j=y()?4:2*(window.devicePixelRatio||1),B=l;function D(t){return~~(t*j)/j}class O{static create(t,e){let[s,i]=[h().width,h().height];const n=p(t||s,e||i);return b(n,"main"),O.setContext(n.getContext("2d")),n}static createFromCanvas(t){let e=document.querySelector(t);if(!(e&&e instanceof HTMLCanvasElement))throw new I("The selected element is not a canvas");return u(e),O.setContext(e.getContext("2d")),e}static setContext(t){J=t}static getContext(){return J}static setOffset(t,e){B=new i(t,e)}static getOffset(){return B}static style(t){if(!J)throw new I("Context has not been initialize. Please use Renderer.setContext");const e=__spreadValues(__spreadValues({},M),t);if(e!==T){for(let t in e)J[t]!==e[t]&&(J[t]=e[t]);T=e}}static textStyle(t){if(J){let e=__spreadValues(__spreadValues({},N),t);J.font=`${e.size}px ${e.font}`,delete e.size,delete e.font,O.style(__spreadValues({fillStyle:e.color},e))}}static clear(t){t?(O.style({fillStyle:t}),J.fillRect(0,0,J.canvas.width,J.canvas.height)):J.clearRect(0,0,J.canvas.width,J.canvas.height)}static line(t,e,s,i,n){O.style(n),J.beginPath(),J.moveTo(D(B.x+t),D(B.y+e)),J.lineTo(D(B.x+s),D(B.y+i)),J.stroke()}static rect(t,e,s,i,n){O.style(n);const[l,a,o,d]=[D(t+B.x),D(e+B.y),D(s),D(i)];J.fillRect(l,a,o,d),J.strokeRect(l,a,o,d)}static rectFromCenter(t,e,s,i,n){return O.rect(t-s/2,e-i/2,s,i,n)}static rectFromPoints(t,e,s,i,n){return O.rect(t,e,s-t,i-e,n)}static poly(t,e){if(t.length){O.style(e),J.beginPath(),J.moveTo(D(t[0].x+B.x),D(t[0].y+B.y));for(let e=1;e<t.length;e++)J.lineTo(D(t[e].x+B.x),D(t[e].y+B.y));J.stroke()}}static circle(t,e,s,i){O.style(i),J.beginPath(),J.arc(D(t+B.x),D(e+B.y),s,0,U),J.fill(),J.stroke()}static circleFromRect(t,e,s,i,n){return O.circle(t+s/2,e+i/2,Math.min(s,i)/2,n)}static point(t,e,s){O.circle(t,e,5,s)}static rectSprite(t,e,s,i,n){if(!n.isLoaded)return;O.style({}),J.save(),J.translate(D(t+s/2+B.x),D(e+i/2+B.y)),J.scale(n.scale.x,n.scale.y),J.rotate(n.rotation);let l=new c(0,0,n.size.width,n.size.height);n instanceof z&&(l=n.spriteBox()),J.drawImage(n.image,l.x,l.y,l.width,l.height,D(s*n.offset.x-s/2),D(i*n.offset.y-i/2),D(s),D(i)),J.restore()}static circleSprite(t,e,s,i){i.isLoaded&&(J.save(),J.beginPath(),J.arc(D(t+B.x),D(e+B.y),s,0,U),J.clip(),O.rectSprite(t-s,e-s,2*s,2*s,i),J.restore())}static text(t,e,s,i){O.textStyle(i),J.fillText(t,e,s)}static centeredText(t,e,s,i){O.text(t,e,s,__spreadProps(__spreadValues({},i),{textAlign:"center",textBaseline:"middle"}))}static tint(t,e,s,i,n){O.rect(e,s,i,n,{fillStyle:t,globalCompositeOperation:"multiply",globalAlpha:.25})}static beginFrame(t){O.clear(t)}static endFrame(){}}class A{constructor(t,e){this.title=t,this.content=e}}class _{constructor(t,e){this.methodName=t,this.args=e}}function q(){return new Worker("data:application/javascript;base64,dmFyIHQ9T2JqZWN0LmRlZmluZVByb3BlcnR5LGU9T2JqZWN0LmRlZmluZVByb3BlcnRpZXMsaT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyxzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMscj1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LG89T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxuPShlLGkscyk9PmkgaW4gZT90KGUsaSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6c30pOmVbaV09cyxhPSh0LGUpPT57Zm9yKHZhciBpIGluIGV8fChlPXt9KSlyLmNhbGwoZSxpKSYmbih0LGksZVtpXSk7aWYocylmb3IodmFyIGkgb2YgcyhlKSlvLmNhbGwoZSxpKSYmbih0LGksZVtpXSk7cmV0dXJuIHR9LGM9KHQscyk9PmUodCxpKHMpKTtjbGFzcyBoe2NvbnN0cnVjdG9yKHQsZSxpLHMpe3RoaXMueD10LHRoaXMueT1lLHRoaXMud2lkdGg9aSx0aGlzLmhlaWdodD1zfX1mdW5jdGlvbiBsKCl7cmV0dXJue3dpZHRoOndpbmRvdy5pbm5lcldpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9fWZ1bmN0aW9uIGQodCl7cmV0dXJue3dpZHRoOnQuY2xpZW50V2lkdGh8fHQud2lkdGgsaGVpZ2h0OnQuY2xpZW50SGVpZ2h0fHx0LmhlaWdodH19ZnVuY3Rpb24gdSh0LGUsaSxzKXtjb25zdCByPXN8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxOyFmdW5jdGlvbih0LGUsaSxzKXt0LndpZHRoPWUqKHN8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKSx0LmhlaWdodD1pKihzfHx3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSksdC5zdHlsZS53aWR0aD1lKyJweCIsdC5zdHlsZS5oZWlnaHQ9aSsicHgifSh0LGV8fGQodCkud2lkdGgsaXx8ZCh0KS5oZWlnaHQsciksMSE9ciYmdC5nZXRDb250ZXh0KCIyZCIpLnNldFRyYW5zZm9ybShyLDAsMCxyLDAsMCl9Y2xhc3MgeHtjb25zdHJ1Y3Rvcih0LGUpe3RoaXMueD10LHRoaXMueT1lfWNsb25lKCl7cmV0dXJuIG5ldyB4KHRoaXMueCx0aGlzLnkpfWFkZCh0KXtyZXR1cm4gbmV3IHgodGhpcy54K3QueCx0aGlzLnkrdC55KX1tdWx0aXBseSh0KXtyZXR1cm4gbmV3IHgodGhpcy54KnQsdGhpcy55KnQpfWRvdCh0KXtyZXR1cm4gdGhpcy54KnQueCt0aGlzLnkqdC55fWRpc3QodCl7cmV0dXJuIE1hdGguc3FydCgodGhpcy54LXQueCkqKjIrKHRoaXMueS10LnkpKioyKX19Y29uc3QgcD1uZXcgeCgwLDApLGY9bmV3IHgoMSwxKTtTdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0aGlzLnNsaWNlKDEpfTtjbGFzcyBtIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IodCxlKXtzdXBlcihlP2BbJHtlLmNhcGl0YWxpemUoKX1dIC0gJHt0fWA6dCksdGhpcy5uYW1lPSJFbmdpbmVGYWlsdXJlIn19Y2xhc3MgdyBleHRlbmRzIG17Y29uc3RydWN0b3IodCl7c3VwZXIodCwicmVuZGVyZXIiKX19bGV0IGc9MDtjb25zdCB5PXtpbnRlcnZhbDoyMDAsbG9vcDohMX07Y29uc3Qgdj17c3Ryb2tlU3R5bGU6ImJsYWNrIixsaW5lV2lkdGg6MixsaW5lSm9pbjoicm91bmQiLGxpbmVDYXA6InJvdW5kIixmaWxsU3R5bGU6InRyYW5zcGFyZW50IixnbG9iYWxBbHBoYToxLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoiYWRkIn0sYj17Zm9udDoiUm9ib3RvIixzaXplOjE2LGNvbG9yOiJibGFjayIsdGV4dEFsaWduOiJsZWZ0Iix0ZXh0QmFzZWxpbmU6ImFscGhhYmV0aWMifSxDPTIqTWF0aC5QSTtsZXQgUyxULGs9bnVsbD09c2VsZi5kb2N1bWVudCYmbnVsbD09c2VsZi53aW5kb3c/NDoyKih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSksUj1wO2Z1bmN0aW9uIFAodCl7cmV0dXJufn4odCprKS9rfWNsYXNzIGp7c3RhdGljIGNyZWF0ZSh0LGUpe2xldFtpLHNdPVtsKCkud2lkdGgsbCgpLmhlaWdodF07Y29uc3Qgcj1mdW5jdGlvbih0LGUsaSxzKXtjb25zdCByPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImNhbnZhcyIpO3JldHVybiB1KHIsdCxlLGkpLHMmJihyLm9uY29udGV4dG1lbnU9dD0+dC5wcmV2ZW50RGVmYXVsdCgpKSxyfSh0fHxpLGV8fHMpO3JldHVybiBmdW5jdGlvbih0LGUpe3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJET01Db250ZW50TG9hZGVkIiwoKCk9Pnt2YXIgaTtjb25zdCBzPW51bGwhPShpPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSkpP2k6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlKTtzLmFwcGVuZENoaWxkKHQpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChzKX0pKX0ociwibWFpbiIpLGouc2V0Q29udGV4dChyLmdldENvbnRleHQoIjJkIikpLHJ9c3RhdGljIGNyZWF0ZUZyb21DYW52YXModCl7bGV0IGU9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTtpZighKGUmJmUgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpdGhyb3cgbmV3IHcoIlRoZSBzZWxlY3RlZCBlbGVtZW50IGlzIG5vdCBhIGNhbnZhcyIpO3JldHVybiB1KGUpLGouc2V0Q29udGV4dChlLmdldENvbnRleHQoIjJkIikpLGV9c3RhdGljIHNldENvbnRleHQodCl7Uz10fXN0YXRpYyBnZXRDb250ZXh0KCl7cmV0dXJuIFN9c3RhdGljIHNldE9mZnNldCh0LGUpe1I9bmV3IHgodCxlKX1zdGF0aWMgZ2V0T2Zmc2V0KCl7cmV0dXJuIFJ9c3RhdGljIHN0eWxlKHQpe2lmKCFTKXRocm93IG5ldyB3KCJDb250ZXh0IGhhcyBub3QgYmVlbiBpbml0aWFsaXplLiBQbGVhc2UgdXNlIFJlbmRlcmVyLnNldENvbnRleHQiKTtjb25zdCBlPWEoYSh7fSx2KSx0KTtpZihlIT09VCl7Zm9yKGxldCB0IGluIGUpU1t0XSE9PWVbdF0mJihTW3RdPWVbdF0pO1Q9ZX19c3RhdGljIHRleHRTdHlsZSh0KXtpZihTKXtsZXQgZT1hKGEoe30sYiksdCk7Uy5mb250PWAke2Uuc2l6ZX1weCAke2UuZm9udH1gLGRlbGV0ZSBlLnNpemUsZGVsZXRlIGUuZm9udCxqLnN0eWxlKGEoe2ZpbGxTdHlsZTplLmNvbG9yfSxlKSl9fXN0YXRpYyBjbGVhcih0KXt0PyhqLnN0eWxlKHtmaWxsU3R5bGU6dH0pLFMuZmlsbFJlY3QoMCwwLFMuY2FudmFzLndpZHRoLFMuY2FudmFzLmhlaWdodCkpOlMuY2xlYXJSZWN0KDAsMCxTLmNhbnZhcy53aWR0aCxTLmNhbnZhcy5oZWlnaHQpfXN0YXRpYyBsaW5lKHQsZSxpLHMscil7ai5zdHlsZShyKSxTLmJlZ2luUGF0aCgpLFMubW92ZVRvKFAoUi54K3QpLFAoUi55K2UpKSxTLmxpbmVUbyhQKFIueCtpKSxQKFIueStzKSksUy5zdHJva2UoKX1zdGF0aWMgcmVjdCh0LGUsaSxzLHIpe2ouc3R5bGUocik7Y29uc3RbbyxuLGEsY109W1AodCtSLngpLFAoZStSLnkpLFAoaSksUChzKV07Uy5maWxsUmVjdChvLG4sYSxjKSxTLnN0cm9rZVJlY3QobyxuLGEsYyl9c3RhdGljIHJlY3RGcm9tQ2VudGVyKHQsZSxpLHMscil7cmV0dXJuIGoucmVjdCh0LWkvMixlLXMvMixpLHMscil9c3RhdGljIHJlY3RGcm9tUG9pbnRzKHQsZSxpLHMscil7cmV0dXJuIGoucmVjdCh0LGUsaS10LHMtZSxyKX1zdGF0aWMgcG9seSh0LGUpe2lmKHQubGVuZ3RoKXtqLnN0eWxlKGUpLFMuYmVnaW5QYXRoKCksUy5tb3ZlVG8oUCh0WzBdLngrUi54KSxQKHRbMF0ueStSLnkpKTtmb3IobGV0IGU9MTtlPHQubGVuZ3RoO2UrKylTLmxpbmVUbyhQKHRbZV0ueCtSLngpLFAodFtlXS55K1IueSkpO1Muc3Ryb2tlKCl9fXN0YXRpYyBjaXJjbGUodCxlLGkscyl7ai5zdHlsZShzKSxTLmJlZ2luUGF0aCgpLFMuYXJjKFAodCtSLngpLFAoZStSLnkpLGksMCxDKSxTLmZpbGwoKSxTLnN0cm9rZSgpfXN0YXRpYyBjaXJjbGVGcm9tUmVjdCh0LGUsaSxzLHIpe3JldHVybiBqLmNpcmNsZSh0K2kvMixlK3MvMixNYXRoLm1pbihpLHMpLzIscil9c3RhdGljIHBvaW50KHQsZSxpKXtqLmNpcmNsZSh0LGUsNSxpKX1zdGF0aWMgcmVjdFNwcml0ZSh0LGUsaSxzLHIpe2lmKCFyLmlzTG9hZGVkKXJldHVybjtqLnN0eWxlKHt9KSxTLnNhdmUoKSxTLnRyYW5zbGF0ZShQKHQraS8yK1IueCksUChlK3MvMitSLnkpKSxTLnNjYWxlKHIuc2NhbGUueCxyLnNjYWxlLnkpLFMucm90YXRlKHIucm90YXRpb24pO2xldCBvPW5ldyBoKDAsMCxyLnNpemUud2lkdGgsci5zaXplLmhlaWdodCk7ciBpbnN0YW5jZW9mIGNsYXNzIGV4dGVuZHMgY2xhc3N7Y29uc3RydWN0b3IodCxlKXtpZih0aGlzLmlzTG9hZGVkPSExLCF0KXRocm93IG5ldyBFcnJvcigiQSBzb3VyY2UgcGF0aCB0byB0aGUgcmVzb3VyY2UgbXVzdCBiZSBwcm92aWRlZCIpO3RoaXMuaWQ9ZysrLHRoaXMuaW1hZ2U9bmV3IEltYWdlLHRoaXMuaW1hZ2Uuc3JjPXQsdGhpcy5pbWFnZS5vbmxvYWQ9KCk9Pnt0aGlzLmlzTG9hZGVkPSEwLHRoaXMub25Mb2FkKCl9LHRoaXMuc2l6ZT17d2lkdGg6dGhpcy5pbWFnZS53aWR0aCxoZWlnaHQ6dGhpcy5pbWFnZS5oZWlnaHR9LHRoaXMucm90YXRpb249KG51bGw9PWU/dm9pZCAwOmUucm90YXRpb24pfHwwLHRoaXMub2Zmc2V0PShudWxsPT1lP3ZvaWQgMDplLm9mZnNldCl8fHAsdGhpcy5zY2FsZT0obnVsbD09ZT92b2lkIDA6ZS5zY2FsZSl8fGZ9YXN5bmMgY29udmVydFRvQml0bWFwKCl7aWYoIXRoaXMuaW1hZ2Uud2lkdGh8fCF0aGlzLmltYWdlLmhlaWdodClyZXR1cm47Y29uc3QgdD1hd2FpdCBjcmVhdGVJbWFnZUJpdG1hcCh0aGlzLmltYWdlKTtyZXR1cm4gYyhhKHt9LHRoaXMpLHtpbWFnZTp0fSl9b25Mb2FkKCl7fX17Y29uc3RydWN0b3IodCxlLGkscyl7aWYoc3VwZXIodC5zcHJpdGVTaGVldFBhdGgpLHRoaXMuaW50ZXJ2YWxJZD0tMSx0aGlzLmlzQW5pbWF0ZWQ9ITEsdGhpcy5sYXN0UnVuVGltZVN0YW1wPTAsdGhpcy5zcHJpdGVTaGVldD10LGVbMF08MXx8ZVsxXTwxfHxpWzBdPDF8fGlbMV08MXx8ZVswXT50LmNvbHN8fGVbMV0+dC5yb3dzfHxpWzBdPnQuY29sc3x8aVsxXT50LnJvd3MpdGhyb3cgbmV3IG0oIkludmFsaWQgdHVwbGVzIDogdGhlIHN0eWxlc2hlZXQgY29vcmRpbmF0ZSBzdGFydHMgYXQgKDEsIDEpIik7dGhpcy5mcm9tPWUsdGhpcy50bz1pO2xldCByPWEoYSh7fSx5KSxzKTt0aGlzLmludGVydmFsPXIuaW50ZXJ2YWwsdGhpcy5sb29wPXIubG9vcCx0aGlzLnNwcml0ZVdpZHRoPXRoaXMuc2l6ZS53aWR0aC90LmNvbHMsdGhpcy5zcHJpdGVIZWlnaHQ9dGhpcy5zaXplLmhlaWdodC90LnJvd3MsdGhpcy5jb29yZFg9dGhpcy5mcm9tWzBdLHRoaXMuY29vcmRZPXRoaXMuZnJvbVsxXX1ydW4oKXtsZXQgdD1wZXJmb3JtYW5jZS5ub3coKXx8RGF0ZS5ub3coKTt0LXRoaXMubGFzdFJ1blRpbWVTdGFtcD50aGlzLmludGVydmFsJiYodGhpcy5zdGVwKCksdGhpcy5sYXN0UnVuVGltZVN0YW1wPXQpfWFuaW1hdGUoKXt0aGlzLmlzQW5pbWF0ZWR8fCh0aGlzLmludGVydmFsSWQ9d2luZG93LnNldEludGVydmFsKCgoKT0+dGhpcy5zdGVwKCkpLHRoaXMuaW50ZXJ2YWwpLHRoaXMuaXNBbmltYXRlZD0hMCl9cGF1c2UoKXt0aGlzLmlzQW5pbWF0ZWQmJih3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpLHRoaXMuaXNBbmltYXRlZD0hMSl9cmVzZXQoKXt0aGlzLmNvb3JkWD10aGlzLmZyb21bMF0sdGhpcy5jb29yZFk9dGhpcy5mcm9tWzFdfXN0b3AoKXt0aGlzLnBhdXNlKCksdGhpcy5yZXNldCgpfXNldEludGVydmFsKHQpe3RoaXMuaW50ZXJ2YWw9dCx0aGlzLmlzQW5pbWF0ZWQmJih3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpLHRoaXMuYW5pbWF0ZSgpKX1zdGVwKCl7dGhpcy5jb29yZFghPT10aGlzLnRvWzBdfHx0aGlzLmNvb3JkWSE9PXRoaXMudG9bMV0/dGhpcy5jb29yZFk8dGhpcy50b1sxXT90aGlzLmNvb3JkWDx0aGlzLnNwcml0ZVNoZWV0LmNvbHM/dGhpcy5jb29yZFgrKzoodGhpcy5jb29yZFkrKyx0aGlzLmNvb3JkWD10aGlzLmZyb21bMF0pOnRoaXMuY29vcmRYPHRoaXMudG9bMF0mJnRoaXMuY29vcmRYKys6dGhpcy5sb29wJiYodGhpcy5jb29yZFg9dGhpcy5mcm9tWzBdLHRoaXMuY29vcmRZPXRoaXMuZnJvbVsxXSl9c3ByaXRlQm94KCl7cmV0dXJuIG5ldyBoKCh0aGlzLmNvb3JkWC0xKSp0aGlzLnNwcml0ZVdpZHRoLCh0aGlzLmNvb3JkWS0xKSp0aGlzLnNwcml0ZUhlaWdodCx0aGlzLnNwcml0ZVdpZHRoLHRoaXMuc3ByaXRlSGVpZ2h0KX19JiYobz1yLnNwcml0ZUJveCgpKSxTLmRyYXdJbWFnZShyLmltYWdlLG8ueCxvLnksby53aWR0aCxvLmhlaWdodCxQKGkqci5vZmZzZXQueC1pLzIpLFAocypyLm9mZnNldC55LXMvMiksUChpKSxQKHMpKSxTLnJlc3RvcmUoKX1zdGF0aWMgY2lyY2xlU3ByaXRlKHQsZSxpLHMpe3MuaXNMb2FkZWQmJihTLnNhdmUoKSxTLmJlZ2luUGF0aCgpLFMuYXJjKFAodCtSLngpLFAoZStSLnkpLGksMCxDKSxTLmNsaXAoKSxqLnJlY3RTcHJpdGUodC1pLGUtaSwyKmksMippLHMpLFMucmVzdG9yZSgpKX1zdGF0aWMgdGV4dCh0LGUsaSxzKXtqLnRleHRTdHlsZShzKSxTLmZpbGxUZXh0KHQsZSxpKX1zdGF0aWMgY2VudGVyZWRUZXh0KHQsZSxpLHMpe2oudGV4dCh0LGUsaSxjKGEoe30scykse3RleHRBbGlnbjoiY2VudGVyIix0ZXh0QmFzZWxpbmU6Im1pZGRsZSJ9KSl9c3RhdGljIHRpbnQodCxlLGkscyxyKXtqLnJlY3QoZSxpLHMscix7ZmlsbFN0eWxlOnQsZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiJtdWx0aXBseSIsZ2xvYmFsQWxwaGE6LjI1fSl9c3RhdGljIGJlZ2luRnJhbWUodCl7ai5jbGVhcih0KX1zdGF0aWMgZW5kRnJhbWUoKXt9fW5ldyBjbGFzcyBleHRlbmRzIGNsYXNze3NlbmRNZXNzYWdlVG9NYWluVGhyZWFkKHQsZSl7c2VsZi5wb3N0TWVzc2FnZSh7dGl0bGU6dCxkYXRhOmV9KX1sb2coLi4udCl7dGhpcy5zZW5kTWVzc2FnZVRvTWFpblRocmVhZCgibG9nIiwuLi50KX19e2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLmNhbnZhc1Jlc29sdXRpb249MSx0aGlzLm9mZnNjcmVlbkNhbnZhcz1udWxsLHRoaXMuY3R4PW51bGwsdGhpcy50ZXh0dXJlQWxpYXM9bmV3IE1hcCxzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCgoe2RhdGE6dH0pPT50aGlzLm9uTWVzc2FnZSh0LnRpdGxlLHQuY29udGVudCkpKX1vbk1lc3NhZ2UodCxlKXtzd2l0Y2godCl7Y2FzZSJpbml0Q2FudmFzIjp0aGlzLm9mZnNjcmVlbkNhbnZhcz1lLmNhbnZhcyx0aGlzLmN0eD10aGlzLm9mZnNjcmVlbkNhbnZhcy5nZXRDb250ZXh0KCIyZCIpLGouc2V0Q29udGV4dCh0aGlzLmN0eCksdGhpcy5zZXRTaXplKGUuZHByLGUud2lkdGgsZS5oZWlnaHQpLHRoaXMuc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoImluaXRpYWxpemVkIik7YnJlYWs7Y2FzZSJyZW5kZXIiOmZvcihsZXQgdCBvZiBlLnJlbmRlclN0YWNrKXRoaXMuaGFuZGxlRHJhd1JlcXVlc3QodC5tZXRob2ROYW1lLHQuYXJncyk7YnJlYWs7Y2FzZSJuZXdUZXh0dXJlIjp0aGlzLnRleHR1cmVBbGlhcy5zZXQoZS5pZCxlLnRleHR1cmUpfX1zZXRTaXplKHQsZSxpKXtjb25zdCBzPSh0fHwxKSp0aGlzLmNhbnZhc1Jlc29sdXRpb247dGhpcy5vZmZzY3JlZW5DYW52YXMud2lkdGg9ZSpzLHRoaXMub2Zmc2NyZWVuQ2FudmFzLmhlaWdodD1pKnMsInNldFRyYW5zZm9ybSJpbiB0aGlzLmN0eCYmdGhpcy5jdHguc2V0VHJhbnNmb3JtKHMsMCwwLHMsMCwwKX1nZXRUZXh0dXJlKHQpe2NvbnN0IGU9dGhpcy50ZXh0dXJlQWxpYXMuZ2V0KHQudGV4dHVyZUlkKSx7c2NhbGU6aSxyb3RhdGlvbjpzLG9mZnNldDpyfT10O3JldHVybiBjKGEoe30sZSkse3NjYWxlOmkscm90YXRpb246cyxvZmZzZXQ6cn0pfWhhbmRsZURyYXdSZXF1ZXN0KHQsZSl7c3dpdGNoKHQpe2Nhc2Uic3R5bGUiOmouc3R5bGUobnVsbD09ZT92b2lkIDA6ZS5vYmopO2JyZWFrO2Nhc2UiY2xlYXIiOmouY2xlYXIobnVsbD09ZT92b2lkIDA6ZS5jb2xvcik7YnJlYWs7Y2FzZSJsaW5lIjpqLmxpbmUoZS54MSxlLnkxLGUueDIsZS55MixlLm9iaik7YnJlYWs7Y2FzZSJyZWN0IjpqLnJlY3QoZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0LGUub2JqKTticmVhaztjYXNlInJlY3RGcm9tQ2VudGVyIjpqLnJlY3RGcm9tQ2VudGVyKGUueCxlLnksZS53aWR0aCxlLmhlaWdodCxlLm9iaik7YnJlYWs7Y2FzZSJyZWN0RnJvbVBvaW50cyI6ai5yZWN0RnJvbVBvaW50cyhlLngxLGUueTEsZS54MixlLnkyLGUub2JqKTticmVhaztjYXNlInBvbHkiOmoucG9seShlLnBvaW50cyxlLm9iaik7YnJlYWs7Y2FzZSJjaXJjbGUiOmouY2lyY2xlKGUueCxlLnksZS5yYWRpdXMsZS5vYmopO2JyZWFrO2Nhc2UiY2lyY2xlRnJvbVJlY3QiOmouY2lyY2xlRnJvbVJlY3QoZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0LGUub2JqKTticmVhaztjYXNlInBvaW50IjpqLnBvaW50KGUueCxlLnksZS5vYmopO2JyZWFrO2Nhc2UicmVjdFNwcml0ZSI6ai5yZWN0U3ByaXRlKGUueCxlLnksZS53aWR0aCxlLmhlaWdodCx0aGlzLmdldFRleHR1cmUoZSkpO2JyZWFrO2Nhc2UiY2lyY2xlU3ByaXRlIjpqLmNpcmNsZVNwcml0ZShlLngsZS55LGUucmFkaXVzLHRoaXMuZ2V0VGV4dHVyZShlKSk7YnJlYWs7Y2FzZSJ0ZXh0IjpqLnRleHQoZS50ZXh0LGUueCxlLnksbnVsbD09ZT92b2lkIDA6ZS5zdHlsZSk7YnJlYWs7Y2FzZSJjZW50ZXJlZFRleHQiOmouY2VudGVyZWRUZXh0KGUudGV4dCxlLngsZS55LG51bGw9PWU/dm9pZCAwOmUuc3R5bGUpO2JyZWFrO2Nhc2UidGludCI6ai50aW50KGUuY29sb3IsZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0KX19fTsK",{type:"module"})}let $=!1,tt=[];const et=new Map;class st{static get worker(){return E}static get workerIsInitialized(){return $}static get offscreenCanvas(){return P}static get renderStack(){return tt}static create(t,e){let[s,i]=[h().width,h().height];return Q=p(t||s,e||i,1),st.initRenderWorker(Q,t||s,e||i),b(Q,"main"),Q}static createFromCanvas(t){if(Q=document.querySelector(t),!(Q&&Q instanceof HTMLCanvasElement))throw new I("The selected element is not a canvas");return u(Q,Q.clientWidth,Q.clientHeight,1),st.initRenderWorker(Q,Q.width,Q.height),Q}static initRenderWorker(t,e,s){ot.renderer instanceof st||ot.setRendererType("offscreen");let{clientWidth:i,clientHeight:n}=t;E=new q,P=t.transferControlToOffscreen(),this.sendMessageToWorker("initCanvas",{width:e||i,height:s||n,canvas:P,dpr:window.devicePixelRatio||1},[P]),E.onmessage=({data:{title:t,data:e}})=>{switch(t){case"log":console.log("message from the renderer worker : ",e);break;case"initialized":$=!0,this.endFrame();break;default:console.log(t)}}}static addRenderCall(t,e){tt.push(new _(t,e||{}))}static sendMessageToWorker(t,e,s){return E.postMessage(new A(t,e),s||[])}static style(t){this.addRenderCall("style",{obj:t})}static clear(t){this.addRenderCall("clear",{color:t})}static line(t,e,s,i,n){this.addRenderCall("line",{x1:t,y1:e,x2:s,y2:i,obj:n})}static rect(t,e,s,i,n){this.addRenderCall("rect",{x:t,y:e,width:s,height:i,obj:n})}static rectFromCenter(t,e,s,i,n){this.addRenderCall("rectFromCenter",{x:t,y:e,width:s,height:i,obj:n})}static rectFromPoints(t,e,s,i,n){this.addRenderCall("rectFromPoints",{x1:t,y1:e,x2:s,y2:i,obj:n})}static poly(t,e){this.addRenderCall("poly",{points:t,obj:e})}static circle(t,e,s,i){this.addRenderCall("circle",{x:t,y:e,radius:s,obj:i})}static circleFromRect(t,e,s,i,n){this.addRenderCall("circleFromRect",{x:t,y:e,width:s,height:i,obj:n})}static point(t,e,s){this.addRenderCall("point",{x:t,y:e,obj:s})}static handleTexture(t,e,s){var i;if(t.isLoaded)if(et.has(t.id)){const{scale:i,rotation:n,offset:l}=t;this.addRenderCall(e,__spreadProps(__spreadValues({},s),{textureId:t.id,scale:i,rotation:n,offset:l}))}else null==(i=t.convertToBitmap())||i.then((e=>{et.set(t.id,e),this.sendMessageToWorker("newTexture",{id:t.id,texture:e})}))}static rectSprite(t,e,s,i,n){this.handleTexture(n,"rectSprite",{x:t,y:e,width:s,height:i})}static async circleSprite(t,e,s,i){this.handleTexture(i,"circleSprite",{x:t,y:e,radius:s})}static text(t,e,s,i){this.addRenderCall("text",{text:t,x:e,y:s,style:i})}static centeredText(t,e,s,i){this.addRenderCall("centeredText",{text:t,x:e,y:s,style:i})}static tint(t,e,s,i,n){this.addRenderCall("circle",{color:t,x:e,y:s,width:i,height:n})}static beginFrame(t){tt=[],this.clear(t)}static endFrame(){$&&(this.sendMessageToWorker("render",{renderStack:tt}),tt=[])}}const it=Z("OffscreenCanvas")?st:O;function nt(){const t=new w,e=document.createElement("div");return e.classList.toggle("stats"),t.showPanel(0),e.appendChild(t.dom),document.body.appendChild(e),k.statsShift(48),t}class lt{constructor(t,e=60){if(this.requestId=0,this.animate=t,this.fps=e,!window)throw new H("No window context","core")}start(){let t=G();const e=1e3/this.fps,s=i=>{this.requestId=window.requestAnimationFrame(s);const n=i-t;n>=e-.1&&(t=i-n%e,this.animate(n))};this.requestId=window.requestAnimationFrame(s)}stop(){window.cancelAnimationFrame(this.requestId)}}let at="normal";class ot{constructor(t,e,s=60){this.fps=60,this.name=t,this.env=e,this.tick=0,this.stats=null,this.showStatsPanel=!0,this.gameLoop=this.env?()=>e.update():null,this.fps=s,this.makeAnimationFrame()}static setRendererType(t){at=t}static get renderer(){return"normal"===at?O:it}toggleStats(t){this.showStatsPanel=void 0!==t?t:!this.showStatsPanel,this.showStatsPanel?this.stats=nt():(this.stats=null,document.querySelector(".stats")&&document.querySelector(".stats").remove())}makeAnimationFrame(){this.update&&(this.animationFrame=new lt((t=>this.update(t)),this.fps))}setMainLoop(t){this.gameLoop=t,this.makeAnimationFrame()}setFPS(t){this.fps=t,this.makeAnimationFrame()}update(t){var e,s;null==(e=this.stats)||e.begin(),X.tick(),S.tick(t),this.gameLoop&&this.gameLoop(t),this.tick%k.updateInterval==0&&k.update(),null==(s=this.stats)||s.end(),this.tick++}start(){if(!this.gameLoop)throw new Error("No game loop");if(!this.animationFrame)throw new Error("AnimationFrame");x()?this.internalStart():window.addEventListener("DOMContentLoaded",(()=>this.internalStart()))}internalStart(){this.name&&(document.title=this.name),X.init(),S.init(),k.init(),this.showStatsPanel&&(this.stats=nt()),this.animationFrame.start()}}class dt{constructor(t,e,s,i){this.x=t,this.y=e,this.width=s||100,this.height=i||s||100}collide(t){return!!(t.width&&t.height&&this.width&&this.height)&&(this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.height+this.y>t.y)}update(...t){}render(...t){}}class ct{constructor(t,e){this.delay=t,this.callback=e,window.setTimeout(this.callback,this.delay)}}class ht extends dt{constructor(t,e,s=5,n,l){super(e.x,e.y),this.radius=2,this.id=t,this.pos=e.clone(),this.angle=n&&"random"!=n?n%2*Math.PI:Math.PI/2+2*Math.random()*Math.PI,this.velocity=new i(Math.random()*s*Math.cos(this.angle),Math.random()*s*Math.sin(this.angle)),this.color=l||"transparent",this.opacity=o(100,255*Math.random(),255)}update(){this.velocity.y+=.01,this.pos=this.pos.add(this.velocity),this.opacity-=2}render(){ot.renderer.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255})}}class rt{constructor(t,e,s=1,i=1){this.x=t,this.y=e,this.width=s,this.height=i,this.state=null,this.neighboors={}}}const mt={linear:t=>t,smoothStep:t=>(3-2*t)*t**2,smootherStep:t=>(6*t*t-15*t+10)*t**3,easeIn:t=>t**2,easeOut:t=>1-(1-t)**2,easeInOut:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,easeInBack:t=>2.70158*t**3-1.70158*t**2,easeOutBack:t=>1+1.70158*Math.pow(t-1,3)+2.70158*Math.pow(t-1,2),easeInOutBack:t=>t<.5?Math.pow(2*t,2)*(7.189819*t-2.5949095)/2:(Math.pow(2*t-2,2)*(3.5949095*(2*t-2)+2.5949095)+2)/2},pt={autostart:!1,loop:!1};const ut=1,bt=!1;class yt extends Audio{constructor(t,e={}){super(t),this.volume=e.volume||ut,this.loop=e.loop||bt,this.controls=!1}}t.AnimatedSprite=z,t.Animation=class{constructor(t,e,s,i=mt.linear,n={}){if(this.hasStarted=!1,this.isPaused=!1,this.isEnded=!1,this.isReversed=!1,this.lastT=0,this.from=t,this.to=e,this.duration=s,i instanceof Function)this.easing=i;else{if("string"!=typeof i||!(i in mt))throw new H("Unknow easing parameter","animation");this.easing=mt[i]}this.options=__spreadValues(__spreadValues({},pt),n),this.value=this.from,this.speed=(this.to-this.from)/this.duration,S.add(this)}start(){this.isEnded=!1,this.hasStarted=!0}reset(){this.lastT=0,this.isPaused=!1}toggle(t){void 0!==t&&(t?this.pause():this.resume()),this.isPaused?this.resume():this.pause()}pause(){this.isPaused=!0}resume(){this.isPaused=!1}update(t){if(!this.hasStarted||this.isPaused)return;let e=o(0,this.lastT+t*this.speed/Math.abs(this.to-this.from),1);if(e>=1||e<=0){if(!this.options.loop)return void(this.isEnded=!0);this.speed*=-1,this.isReversed=!this.isReversed}this.lastT=e,this.value=this.from+(this.to-this.from)*this.easing(e)}get isRunning(){return this.hasStarted&&!(this.isEnded||this.isPaused)}},t.ApiIsSupported=Z,t.Box=c,t.Cell=rt,t.Config={},t.Cooldown=ct,t.Easing=mt,t.Event=W,t.Game=ot,t.GameEnvironement=class{constructor(t,e){this.width=t,this.height=e}update(){}render(){}},t.GameObject=dt,t.Grid=class{constructor(t,e){this.rows=e,this.cols=t,this.cells=[],this.focusCell=null,this.createCells(),this.defineNeighboors()}createCells(){for(let t=0;t<this.cols;t++)for(let e=0;e<this.rows;e++)this.cells.push(new rt(t,e))}updateCell(t){if(this.cells.includes(t)){if(1!==t.width||1!==t.height){if(t.width>1){let e=t.width-1,s=this.cells.filter((s=>s.y===t.y&&s.x>t.x&&s.x<=t.x+e));this.cells=this.cells.filter((t=>!s.includes(t)))}if(t.height>1){let e=t.height-1,s=this.cells.filter((s=>s.x===t.x&&s.y>t.y&&s.y<=t.y+e));this.cells=this.cells.filter((t=>!s.includes(t)))}}this.defineNeighboors(),this.cells[this.cells.indexOf(t)]=t}}defineNeighboors(){this.cells.forEach((t=>{t.neighboors.top=t.y>=1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y-t.height))[0]:null,t.neighboors.bottom=t.y<=this.rows-1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y+t.height))[0]:null,t.neighboors.left=t.x>=1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x-t.width))[0]:null,t.neighboors.right=t.x<=this.cols-1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x+t.width))[0]:null}))}get(t,e){return this.cells[t*this.cols+e]}clear(){this.cells.forEach((t=>t.state=null))}},t.Interface=k,t.OffscreenRenderer=it,t.Particle=ht,t.ParticuleGenerator=class{constructor(t,e,i,n){this.pos=e,this.lifeDuration=i,this.particles=[],this.UUID=100*s.randint(1,100);for(let s=0;s<t;s++){let t=new ht(this.UUID+s,this.pos);this.particles.push(t)}new ct(this.lifeDuration,(()=>{this.destroy(),n&&n()}))}addParticles(t){return t.concat(this.particles)}removeParticles(t){const e=this.particles.length;return t.filter((t=>!d(t.id,this.UUID,this.UUID+e)))}destroy(){}},t.PlayerObject=class extends dt{constructor(t,e,s,i){super(t,e,s,i)}update(...t){}render(...t){}},t.Point=n,t.Random=s,t.Renderer=O,t.Sound=yt,t.SpriteSheet=class{constructor(t,e,s){this.spriteSheetPath=t,this.cols=e,this.rows=s}},t.Texture=V,t.VERSION="0.5.0",t.V_NULL=l,t.V_UNIT=a,t.Vector2=i,t.adaptCanvasToDevicePixelRatio=u,t.blink=function(t,e,s=300){var i;null==(i=document.querySelector(t))||i.classList.toggle(e),setTimeout((()=>{var s;return null==(s=document.querySelector(t))?void 0:s.classList.toggle(e)}),s)},t.clamp=o,t.createCanvas=p,t.getCanvasDimensions=r,t.getWindowDimensions=h,t.hashObject=function(t){let e="";for(const s in t)e+=`#${s}:${t[s]}`;return e},t.inRange=d,t.insertCanvas=b,t.isWorker=y,t.now=G,t.setCanvasDimensions=m,t.windowIsLoaded=x,Object.defineProperty(t,"__esModule",{value:!0}),t[Symbol.toStringTag]="Module"}));
