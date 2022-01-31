var t=Object.defineProperty,e=Object.defineProperties,s=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,a=(e,s,i)=>s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[s]=i,o=(t,e)=>{for(var s in e||(e={}))n.call(e,s)&&a(t,s,e[s]);if(i)for(var s of i(e))l.call(e,s)&&a(t,s,e[s]);return t},d=(t,i)=>e(t,s(i));"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;class c{static random(){return Math.random()}static randint(t,e){return Math.floor(t+Math.random()*(e-t))}static choice(t){return t[~~(c.random()*t.length)]}static bool(){return c.random()>.5}static sign(){return c.choice([-1,1])}static percent(t){return c.random()<t/100}}var h=c;class r{constructor(t,e){this.x=t,this.y=e}clone(){return new r(this.x,this.y)}add(t){return new r(this.x+t.x,this.y+t.y)}multiply(t){return new r(this.x*t,this.y*t)}dot(t){return this.x*t.x+this.y*t.y}dist(t){return Math.sqrt((this.x-t.x)**2+(this.y-t.y)**2)}}const m=r,u=new r(0,0),p=new r(1,1);function y(t,e,s){return t>s?y(s,e,t):Math.max(t,Math.min(e,s))}function b(t,e,s){return y(e,t,s)===t}class G{constructor(t,e,s,i){this.x=t,this.y=e,this.width=s,this.height=i}}function Z(){return{width:window.innerWidth,height:window.innerHeight}}function x(t){return{width:t.clientWidth||t.width,height:t.clientHeight||t.height}}function W(t,e,s,i){t.width=e*(i||window.devicePixelRatio||1),t.height=s*(i||window.devicePixelRatio||1),t.style.width=e+"px",t.style.height=s+"px"}function f(t,e,s,i){const n=document.createElement("canvas");return L(n,t,e,s),i&&(n.oncontextmenu=t=>t.preventDefault()),n}function L(t,e,s,i){const n=i||window.devicePixelRatio||1;W(t,e||x(t).width,s||x(t).height,n),1!=n&&t.getContext("2d").setTransform(n,0,0,n,0,0)}function g(t,e){window.addEventListener("DOMContentLoaded",(()=>{var s;const i=null!=(s=document.querySelector(e))?s:document.createElement(e);i.appendChild(t),document.querySelector("body").appendChild(i)}))}function R(t,e,s=300){var i;null==(i=document.querySelector(t))||i.classList.toggle(e),setTimeout((()=>{var s;return null==(s=document.querySelector(t))?void 0:s.classList.toggle(e)}),s)}function X(){return null==self.document&&null==self.window}function S(t){let e="";for(const s in t)e+=`#${s}:${t[s]}`;return e}function w(){return performance.now()||Date.now()}function v(t){return window&&t in window}function C(){return/complete|interactive|loaded/.test(document.readyState)&&window.unrailEngineLoaded}var V,K;(K=V||(V={}))[K.KeyboardPressed=0]="KeyboardPressed",K[K.KeyboardDown=1]="KeyboardDown",K[K.Mouse=2]="Mouse",K[K.Window=3]="Window",K[K.Custom=4]="Custom",K[K.All=5]="All";class H{constructor(t,e,s=4){this.name=t,this.callback=e,this.type=s,this.listeners=[this.callback]}static emit(t,e){t instanceof Array?t.forEach((t=>this.emitEvent(t,e))):this.emitEvent(t,e)}static emitEvent(t,e){const s=k.getCustomEvent(t);s&&s.listeners.forEach((t=>t(e)))}static on(t,e){t instanceof Array?t.forEach((t=>this.onEvent(t,e))):this.onEvent(t,e)}static onEvent(t,e){const s=k.getCustomEvent(t);if(s)s.listeners.push(e);else{const s=new H(t,e,4);k.addEvent(s)}}static onKeyDown(t,e){t instanceof Array?t.forEach((t=>k.addEvent(new H(t,e,1)))):k.addEvent(new H(t,e,1))}static onKeyPressed(t,e){t instanceof Array?t.forEach((t=>k.addEvent(new H(t,e,0)))):k.addEvent(new H(t,e,0))}static onAnyKeyReleased(t){k.addEvent(new H("keyup",t,3))}static onClick(t){H.onMouseClick(t)}static onMouseClick(t){k.addEvent(new H("click",t,2))}static onMouseMove(t){k.addEvent(new H("mousemove",t,2))}}const k=new class{constructor(){this.windowEvents=[],this.customEvents=[],this.mouseEvents=[],this.keyboardEvents=[],this.currentKeyEvents=[]}init(){window.addEventListener("keydown",(t=>{this.currentKeyEvents.find((e=>e.code===t.code))||this.currentKeyEvents.push(t),this.keyboardEvents.filter((t=>t.type===V.KeyboardPressed)).forEach((e=>{t.code===e.name&&e.callback(t)}))})),window.addEventListener("keyup",(t=>{this.currentKeyEvents.length&&(this.currentKeyEvents=this.currentKeyEvents.filter((e=>e.code!==t.code)))})),this.bindEvents()}addEvent(t){switch(t.type){case V.KeyboardDown:case V.KeyboardPressed:this.keyboardEvents.push(t);break;case V.Mouse:this.mouseEvents.push(t),window.addEventListener(t.name,(e=>t.callback(e)));break;case V.Window:this.windowEvents.push(t),this.bindEvents();break;case V.Custom:this.customEvents.push(t)}}getCustomEvent(t){return this.customEvents.find((e=>e.name===t))}bindEvents(){this.windowEvents.forEach((t=>window.addEventListener(t.name,t.callback)))}tick(){this.currentKeyEvents.length&&this.keyboardEvents.filter((t=>t.type===V.KeyboardDown)).forEach((t=>{this.currentKeyEvents.forEach((e=>{e.code===t.name&&t.callback(e)}))}))}};const Y=new class{constructor(){this.hasStarted=!1,this.animations=[]}add(t){this.animations.push(t),this.hasStarted&&t.options.autostart&&t.start()}init(){this.hasStarted=!0;for(let t of this.animations)t.options.autostart&&t.start()}tick(t){for(let e of this.animations)e.update(t)}};var I,U={exports:{}},F=U.exports=((I=function(){function t(t){return i.appendChild(t.dom),t}function e(t){for(var e=0;e<i.children.length;e++)i.children[e].style.display=e===t?"block":"none";s=t}var s=0,i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",i.addEventListener("click",(function(t){t.preventDefault(),e(++s%i.children.length)}),!1);var n=(performance||Date).now(),l=n,a=0,o=t(new I.Panel("FPS","#0ff","#002")),d=t(new I.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new I.Panel("MB","#f08","#201"));return e(0),{REVISION:16,dom:i,addPanel:t,showPanel:e,begin:function(){n=(performance||Date).now()},end:function(){a++;var t=(performance||Date).now();if(d.update(t-n,200),t>l+1e3&&(o.update(1e3*a/(t-l),100),l=t,a=0,c)){var e=performance.memory;c.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){n=this.end()},domElement:i,setMode:e}}).Panel=function(t,e,s){var i=1/0,n=0,l=Math.round,a=l(window.devicePixelRatio||1),o=80*a,d=48*a,c=3*a,h=2*a,r=3*a,m=15*a,u=74*a,p=30*a,y=document.createElement("canvas");y.width=o,y.height=d,y.style.cssText="width:80px;height:48px";var b=y.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=s,b.fillRect(0,0,o,d),b.fillStyle=e,b.fillText(t,c,h),b.fillRect(r,m,u,p),b.fillStyle=s,b.globalAlpha=.9,b.fillRect(r,m,u,p),{dom:y,update:function(d,G){i=Math.min(i,d),n=Math.max(n,d),b.fillStyle=s,b.globalAlpha=1,b.fillRect(0,0,o,m),b.fillStyle=e,b.fillText(l(d)+" "+t+" ("+l(i)+"-"+l(n)+")",c,h),b.drawImage(y,r+a,m,u-a,p,r,m,u-a,p),b.fillRect(r+u-a,m,a,p),b.fillStyle=s,b.globalAlpha=.9,b.fillRect(r+u-a,m,a,l((1-d/G)*p))}}},I);let N=0;class M{constructor(t,e){if(this.isLoaded=!1,!t)throw new Error("A source path to the resource must be provided");this.id=N++,this.image=new Image,this.image.src=t,this.image.onload=()=>{this.isLoaded=!0,this.onLoad()},this.size={width:this.image.width,height:this.image.height},this.rotation=(null==e?void 0:e.rotation)||0,this.offset=(null==e?void 0:e.offset)||u,this.scale=(null==e?void 0:e.scale)||p}async convertToBitmap(){if(!this.image.width||!this.image.height)return;const t=await createImageBitmap(this.image);return d(o({},this),{image:t})}onLoad(){}}let z=[],J=4;const T=["top-left","top-right","bottom-left","bottom-right","custom"];class E{static addItem(t,e,s){E.internalAddItem(t,e,s)}static addButton(t,e,s,i){E.internalAddItem(t,s,i,e)}static internalAddItem(t,e,s,i){const n={callback:"string"==typeof t?()=>t:t,position:e,options:s,onClick:i};z.push(n);const l=z.length;C()?E.addToDom(n,l):H.on("EngineLoaded",(()=>E.addToDom(n,l)))}static init(){E.addStyle('*,\n*::after,\n*::before {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    font-family: "Roboto";\n    font-weight: 400;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}\n\ncanvas {\n    z-index: 10;\n    image-rendering: pixelated;\n}\n\n.ue-interface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    padding: 0.5em;\n    z-index: 10;\n    /* Make the click event pass through */\n    pointer-events: none;\n}\n\n.ue-container>div {\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.ue-container>.top-left {\n    top: 0;\n    left: 0;\n}\n\n.ue-container>.top-right {\n    top: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-container>.bottom-left {\n    bottom: 0;\n    left: 0;\n}\n\n.ue-container>.bottom-right {\n    bottom: 0;\n    right: 0;\n    text-align: right;\n}\n\n.ue-interface-items {\n    padding: .1em;\n}\n\n.ue-interface-button {\n    cursor: pointer;\n    user-select: none;\n    pointer-events: all;\n}');const t=document.createElement("div");t.classList.add("ue-interface","ue-container");for(let e of T){const s=document.createElement("div");s.classList.add(e),t.appendChild(s)}document.body.appendChild(t),console.log("interface init")}static addStyle(t){const e=document.createElement("style");e.textContent=t,document.head.append(e)}static addToDom(t,e){var s,i;console.log("addToDom");const n=t.callback(),l=document.createElement("span");l.classList.add("ue-interface-items"),l.id=`item-${e}`,l.innerText=n,Object.entries(t.options||{}).forEach((([t,e])=>l.style[t]=e)),t.position?null==(s=document.querySelector(`.ue-container > .${t.position}`))||s.appendChild(l):null==(i=document.querySelector(".ue-container > .custom"))||i.appendChild(l),t.onClick&&(l.addEventListener("click",(e=>t.onClick(e))),l.classList.add("ue-interface-button"))}static update(){z.forEach(((t,e)=>{const s=t.callback(),i=document.querySelector(`.ue-interface #item-${e+1}`);i&&i.innerText!==s&&(i.innerText=s)}))}static statsShift(t){const e=document.querySelector(".top-left");e&&(e.style.top=`${t}px`)}static setUpdateInterval(t){J=t}static get updateInterval(){return J}static getItems(){return z}}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};class j extends Error{constructor(t,e){super(e?`[${e.capitalize()}] - ${t}`:t),this.name="EngineFailure"}}class Q extends j{constructor(t){super(t,"renderer")}}class P{constructor(t,e,s){this.spriteSheetPath=t,this.cols=e,this.rows=s}}const B={interval:200,loop:!1};class D extends M{constructor(t,e,s,i){if(super(t.spriteSheetPath),this.intervalId=-1,this.isAnimated=!1,this.lastRunTimeStamp=0,this.spriteSheet=t,e[0]<1||e[1]<1||s[0]<1||s[1]<1||e[0]>t.cols||e[1]>t.rows||s[0]>t.cols||s[1]>t.rows)throw new j("Invalid tuples : the spritesheet coordinate starts at (1, 1)");this.from=e,this.to=s;let n=o(o({},B),i);this.interval=n.interval,this.loop=n.loop,this.spriteWidth=this.size.width/t.cols,this.spriteHeight=this.size.height/t.rows,this.coordX=this.from[0],this.coordY=this.from[1]}run(){let t=w();t-this.lastRunTimeStamp>this.interval&&(this.step(),this.lastRunTimeStamp=t)}animate(){this.isAnimated||(this.intervalId=window.setInterval((()=>this.step()),this.interval),this.isAnimated=!0)}pause(){this.isAnimated&&(window.clearInterval(this.intervalId),this.isAnimated=!1)}reset(){this.coordX=this.from[0],this.coordY=this.from[1]}stop(){this.pause(),this.reset()}setInterval(t){this.interval=t,this.isAnimated&&(window.clearInterval(this.intervalId),this.animate())}step(){this.coordX!==this.to[0]||this.coordY!==this.to[1]?this.coordY<this.to[1]?this.coordX<this.spriteSheet.cols?this.coordX++:(this.coordY++,this.coordX=this.from[0]):this.coordX<this.to[0]&&this.coordX++:this.loop&&(this.coordX=this.from[0],this.coordY=this.from[1])}spriteBox(){return new G((this.coordX-1)*this.spriteWidth,(this.coordY-1)*this.spriteHeight,this.spriteWidth,this.spriteHeight)}}const O={strokeStyle:"black",lineWidth:2,lineJoin:"round",lineCap:"round",fillStyle:"transparent",globalAlpha:1,globalCompositeOperation:"add"},A={font:"Roboto",size:16,color:"black",textAlign:"left",textBaseline:"alphabetic"},q=2*Math.PI;let $,_,tt,et,st,it=X()?4:2*(window.devicePixelRatio||1),nt=u;function lt(t){return~~(t*it)/it}class at{static create(t,e){let[s,i]=[Z().width,Z().height];const n=f(t||s,e||i);return g(n,"main"),at.setContext(n.getContext("2d")),n}static createFromCanvas(t){let e=document.querySelector(t);if(!(e&&e instanceof HTMLCanvasElement))throw new Q("The selected element is not a canvas");return L(e),at.setContext(e.getContext("2d")),e}static setContext(t){$=t}static getContext(){return $}static setOffset(t,e){nt=new r(t,e)}static getOffset(){return nt}static style(t){if(!$)throw new Q("Context has not been initialize. Please use Renderer.setContext");const e=o(o({},O),t);if(e!==_){for(let t in e)$[t]!==e[t]&&($[t]=e[t]);_=e}}static textStyle(t){if($){let e=o(o({},A),t);$.font=`${e.size}px ${e.font}`,delete e.size,delete e.font,at.style(o({fillStyle:e.color},e))}}static clear(t){t?(at.style({fillStyle:t}),$.fillRect(0,0,$.canvas.width,$.canvas.height)):$.clearRect(0,0,$.canvas.width,$.canvas.height)}static line(t,e,s,i,n){at.style(n),$.beginPath(),$.moveTo(lt(nt.x+t),lt(nt.y+e)),$.lineTo(lt(nt.x+s),lt(nt.y+i)),$.stroke()}static rect(t,e,s,i,n){at.style(n);const[l,a,o,d]=[lt(t+nt.x),lt(e+nt.y),lt(s),lt(i)];$.fillRect(l,a,o,d),$.strokeRect(l,a,o,d)}static rectFromCenter(t,e,s,i,n){return at.rect(t-s/2,e-i/2,s,i,n)}static rectFromPoints(t,e,s,i,n){return at.rect(t,e,s-t,i-e,n)}static poly(t,e){if(t.length){at.style(e),$.beginPath(),$.moveTo(lt(t[0].x+nt.x),lt(t[0].y+nt.y));for(let e=1;e<t.length;e++)$.lineTo(lt(t[e].x+nt.x),lt(t[e].y+nt.y));$.stroke()}}static circle(t,e,s,i){at.style(i),$.beginPath(),$.arc(lt(t+nt.x),lt(e+nt.y),s,0,q),$.fill(),$.stroke()}static circleFromRect(t,e,s,i,n){return at.circle(t+s/2,e+i/2,Math.min(s,i)/2,n)}static point(t,e,s){at.circle(t,e,5,s)}static rectSprite(t,e,s,i,n){if(!n.isLoaded)return;at.style({}),$.save(),$.translate(lt(t+s/2+nt.x),lt(e+i/2+nt.y)),$.scale(n.scale.x,n.scale.y),$.rotate(n.rotation);let l=new G(0,0,n.size.width,n.size.height);n instanceof D&&(l=n.spriteBox()),$.drawImage(n.image,l.x,l.y,l.width,l.height,lt(s*n.offset.x-s/2),lt(i*n.offset.y-i/2),lt(s),lt(i)),$.restore()}static circleSprite(t,e,s,i){i.isLoaded&&($.save(),$.beginPath(),$.arc(lt(t+nt.x),lt(e+nt.y),s,0,q),$.clip(),at.rectSprite(t-s,e-s,2*s,2*s,i),$.restore())}static text(t,e,s,i){at.textStyle(i),$.fillText(t,e,s)}static centeredText(t,e,s,i){at.text(t,e,s,d(o({},i),{textAlign:"center",textBaseline:"middle"}))}static tint(t,e,s,i,n){at.rect(e,s,i,n,{fillStyle:t,globalCompositeOperation:"multiply",globalAlpha:.25})}static beginFrame(t){at.clear(t)}static endFrame(){}}class ot{constructor(t,e){this.title=t,this.content=e}}class dt{constructor(t,e){this.methodName=t,this.args=e}}function ct(){return new Worker("data:application/javascript;base64,dmFyIHQ9T2JqZWN0LmRlZmluZVByb3BlcnR5LGU9T2JqZWN0LmRlZmluZVByb3BlcnRpZXMsaT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyxzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMscj1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LG89T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxuPShlLGkscyk9PmkgaW4gZT90KGUsaSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6c30pOmVbaV09cyxhPSh0LGUpPT57Zm9yKHZhciBpIGluIGV8fChlPXt9KSlyLmNhbGwoZSxpKSYmbih0LGksZVtpXSk7aWYocylmb3IodmFyIGkgb2YgcyhlKSlvLmNhbGwoZSxpKSYmbih0LGksZVtpXSk7cmV0dXJuIHR9LGM9KHQscyk9PmUodCxpKHMpKTtjbGFzcyBoe2NvbnN0cnVjdG9yKHQsZSxpLHMpe3RoaXMueD10LHRoaXMueT1lLHRoaXMud2lkdGg9aSx0aGlzLmhlaWdodD1zfX1mdW5jdGlvbiBsKCl7cmV0dXJue3dpZHRoOndpbmRvdy5pbm5lcldpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9fWZ1bmN0aW9uIGQodCl7cmV0dXJue3dpZHRoOnQuY2xpZW50V2lkdGh8fHQud2lkdGgsaGVpZ2h0OnQuY2xpZW50SGVpZ2h0fHx0LmhlaWdodH19ZnVuY3Rpb24gdSh0LGUsaSxzKXtjb25zdCByPXN8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxOyFmdW5jdGlvbih0LGUsaSxzKXt0LndpZHRoPWUqKHN8fHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHwxKSx0LmhlaWdodD1pKihzfHx3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSksdC5zdHlsZS53aWR0aD1lKyJweCIsdC5zdHlsZS5oZWlnaHQ9aSsicHgifSh0LGV8fGQodCkud2lkdGgsaXx8ZCh0KS5oZWlnaHQsciksMSE9ciYmdC5nZXRDb250ZXh0KCIyZCIpLnNldFRyYW5zZm9ybShyLDAsMCxyLDAsMCl9Y2xhc3MgeHtjb25zdHJ1Y3Rvcih0LGUpe3RoaXMueD10LHRoaXMueT1lfWNsb25lKCl7cmV0dXJuIG5ldyB4KHRoaXMueCx0aGlzLnkpfWFkZCh0KXtyZXR1cm4gbmV3IHgodGhpcy54K3QueCx0aGlzLnkrdC55KX1tdWx0aXBseSh0KXtyZXR1cm4gbmV3IHgodGhpcy54KnQsdGhpcy55KnQpfWRvdCh0KXtyZXR1cm4gdGhpcy54KnQueCt0aGlzLnkqdC55fWRpc3QodCl7cmV0dXJuIE1hdGguc3FydCgodGhpcy54LXQueCkqKjIrKHRoaXMueS10LnkpKioyKX19Y29uc3QgcD1uZXcgeCgwLDApLGY9bmV3IHgoMSwxKTtTdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0aGlzLnNsaWNlKDEpfTtjbGFzcyBtIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IodCxlKXtzdXBlcihlP2BbJHtlLmNhcGl0YWxpemUoKX1dIC0gJHt0fWA6dCksdGhpcy5uYW1lPSJFbmdpbmVGYWlsdXJlIn19Y2xhc3MgdyBleHRlbmRzIG17Y29uc3RydWN0b3IodCl7c3VwZXIodCwicmVuZGVyZXIiKX19bGV0IGc9MDtjb25zdCB5PXtpbnRlcnZhbDoyMDAsbG9vcDohMX07Y29uc3Qgdj17c3Ryb2tlU3R5bGU6ImJsYWNrIixsaW5lV2lkdGg6MixsaW5lSm9pbjoicm91bmQiLGxpbmVDYXA6InJvdW5kIixmaWxsU3R5bGU6InRyYW5zcGFyZW50IixnbG9iYWxBbHBoYToxLGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoiYWRkIn0sYj17Zm9udDoiUm9ib3RvIixzaXplOjE2LGNvbG9yOiJibGFjayIsdGV4dEFsaWduOiJsZWZ0Iix0ZXh0QmFzZWxpbmU6ImFscGhhYmV0aWMifSxDPTIqTWF0aC5QSTtsZXQgUyxULGs9bnVsbD09c2VsZi5kb2N1bWVudCYmbnVsbD09c2VsZi53aW5kb3c/NDoyKih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb3x8MSksUj1wO2Z1bmN0aW9uIFAodCl7cmV0dXJufn4odCprKS9rfWNsYXNzIGp7c3RhdGljIGNyZWF0ZSh0LGUpe2xldFtpLHNdPVtsKCkud2lkdGgsbCgpLmhlaWdodF07Y29uc3Qgcj1mdW5jdGlvbih0LGUsaSxzKXtjb25zdCByPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImNhbnZhcyIpO3JldHVybiB1KHIsdCxlLGkpLHMmJihyLm9uY29udGV4dG1lbnU9dD0+dC5wcmV2ZW50RGVmYXVsdCgpKSxyfSh0fHxpLGV8fHMpO3JldHVybiBmdW5jdGlvbih0LGUpe3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJET01Db250ZW50TG9hZGVkIiwoKCk9Pnt2YXIgaTtjb25zdCBzPW51bGwhPShpPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSkpP2k6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlKTtzLmFwcGVuZENoaWxkKHQpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJvZHkiKS5hcHBlbmRDaGlsZChzKX0pKX0ociwibWFpbiIpLGouc2V0Q29udGV4dChyLmdldENvbnRleHQoIjJkIikpLHJ9c3RhdGljIGNyZWF0ZUZyb21DYW52YXModCl7bGV0IGU9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTtpZighKGUmJmUgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpdGhyb3cgbmV3IHcoIlRoZSBzZWxlY3RlZCBlbGVtZW50IGlzIG5vdCBhIGNhbnZhcyIpO3JldHVybiB1KGUpLGouc2V0Q29udGV4dChlLmdldENvbnRleHQoIjJkIikpLGV9c3RhdGljIHNldENvbnRleHQodCl7Uz10fXN0YXRpYyBnZXRDb250ZXh0KCl7cmV0dXJuIFN9c3RhdGljIHNldE9mZnNldCh0LGUpe1I9bmV3IHgodCxlKX1zdGF0aWMgZ2V0T2Zmc2V0KCl7cmV0dXJuIFJ9c3RhdGljIHN0eWxlKHQpe2lmKCFTKXRocm93IG5ldyB3KCJDb250ZXh0IGhhcyBub3QgYmVlbiBpbml0aWFsaXplLiBQbGVhc2UgdXNlIFJlbmRlcmVyLnNldENvbnRleHQiKTtjb25zdCBlPWEoYSh7fSx2KSx0KTtpZihlIT09VCl7Zm9yKGxldCB0IGluIGUpU1t0XSE9PWVbdF0mJihTW3RdPWVbdF0pO1Q9ZX19c3RhdGljIHRleHRTdHlsZSh0KXtpZihTKXtsZXQgZT1hKGEoe30sYiksdCk7Uy5mb250PWAke2Uuc2l6ZX1weCAke2UuZm9udH1gLGRlbGV0ZSBlLnNpemUsZGVsZXRlIGUuZm9udCxqLnN0eWxlKGEoe2ZpbGxTdHlsZTplLmNvbG9yfSxlKSl9fXN0YXRpYyBjbGVhcih0KXt0PyhqLnN0eWxlKHtmaWxsU3R5bGU6dH0pLFMuZmlsbFJlY3QoMCwwLFMuY2FudmFzLndpZHRoLFMuY2FudmFzLmhlaWdodCkpOlMuY2xlYXJSZWN0KDAsMCxTLmNhbnZhcy53aWR0aCxTLmNhbnZhcy5oZWlnaHQpfXN0YXRpYyBsaW5lKHQsZSxpLHMscil7ai5zdHlsZShyKSxTLmJlZ2luUGF0aCgpLFMubW92ZVRvKFAoUi54K3QpLFAoUi55K2UpKSxTLmxpbmVUbyhQKFIueCtpKSxQKFIueStzKSksUy5zdHJva2UoKX1zdGF0aWMgcmVjdCh0LGUsaSxzLHIpe2ouc3R5bGUocik7Y29uc3RbbyxuLGEsY109W1AodCtSLngpLFAoZStSLnkpLFAoaSksUChzKV07Uy5maWxsUmVjdChvLG4sYSxjKSxTLnN0cm9rZVJlY3QobyxuLGEsYyl9c3RhdGljIHJlY3RGcm9tQ2VudGVyKHQsZSxpLHMscil7cmV0dXJuIGoucmVjdCh0LWkvMixlLXMvMixpLHMscil9c3RhdGljIHJlY3RGcm9tUG9pbnRzKHQsZSxpLHMscil7cmV0dXJuIGoucmVjdCh0LGUsaS10LHMtZSxyKX1zdGF0aWMgcG9seSh0LGUpe2lmKHQubGVuZ3RoKXtqLnN0eWxlKGUpLFMuYmVnaW5QYXRoKCksUy5tb3ZlVG8oUCh0WzBdLngrUi54KSxQKHRbMF0ueStSLnkpKTtmb3IobGV0IGU9MTtlPHQubGVuZ3RoO2UrKylTLmxpbmVUbyhQKHRbZV0ueCtSLngpLFAodFtlXS55K1IueSkpO1Muc3Ryb2tlKCl9fXN0YXRpYyBjaXJjbGUodCxlLGkscyl7ai5zdHlsZShzKSxTLmJlZ2luUGF0aCgpLFMuYXJjKFAodCtSLngpLFAoZStSLnkpLGksMCxDKSxTLmZpbGwoKSxTLnN0cm9rZSgpfXN0YXRpYyBjaXJjbGVGcm9tUmVjdCh0LGUsaSxzLHIpe3JldHVybiBqLmNpcmNsZSh0K2kvMixlK3MvMixNYXRoLm1pbihpLHMpLzIscil9c3RhdGljIHBvaW50KHQsZSxpKXtqLmNpcmNsZSh0LGUsNSxpKX1zdGF0aWMgcmVjdFNwcml0ZSh0LGUsaSxzLHIpe2lmKCFyLmlzTG9hZGVkKXJldHVybjtqLnN0eWxlKHt9KSxTLnNhdmUoKSxTLnRyYW5zbGF0ZShQKHQraS8yK1IueCksUChlK3MvMitSLnkpKSxTLnNjYWxlKHIuc2NhbGUueCxyLnNjYWxlLnkpLFMucm90YXRlKHIucm90YXRpb24pO2xldCBvPW5ldyBoKDAsMCxyLnNpemUud2lkdGgsci5zaXplLmhlaWdodCk7ciBpbnN0YW5jZW9mIGNsYXNzIGV4dGVuZHMgY2xhc3N7Y29uc3RydWN0b3IodCxlKXtpZih0aGlzLmlzTG9hZGVkPSExLCF0KXRocm93IG5ldyBFcnJvcigiQSBzb3VyY2UgcGF0aCB0byB0aGUgcmVzb3VyY2UgbXVzdCBiZSBwcm92aWRlZCIpO3RoaXMuaWQ9ZysrLHRoaXMuaW1hZ2U9bmV3IEltYWdlLHRoaXMuaW1hZ2Uuc3JjPXQsdGhpcy5pbWFnZS5vbmxvYWQ9KCk9Pnt0aGlzLmlzTG9hZGVkPSEwLHRoaXMub25Mb2FkKCl9LHRoaXMuc2l6ZT17d2lkdGg6dGhpcy5pbWFnZS53aWR0aCxoZWlnaHQ6dGhpcy5pbWFnZS5oZWlnaHR9LHRoaXMucm90YXRpb249KG51bGw9PWU/dm9pZCAwOmUucm90YXRpb24pfHwwLHRoaXMub2Zmc2V0PShudWxsPT1lP3ZvaWQgMDplLm9mZnNldCl8fHAsdGhpcy5zY2FsZT0obnVsbD09ZT92b2lkIDA6ZS5zY2FsZSl8fGZ9YXN5bmMgY29udmVydFRvQml0bWFwKCl7aWYoIXRoaXMuaW1hZ2Uud2lkdGh8fCF0aGlzLmltYWdlLmhlaWdodClyZXR1cm47Y29uc3QgdD1hd2FpdCBjcmVhdGVJbWFnZUJpdG1hcCh0aGlzLmltYWdlKTtyZXR1cm4gYyhhKHt9LHRoaXMpLHtpbWFnZTp0fSl9b25Mb2FkKCl7fX17Y29uc3RydWN0b3IodCxlLGkscyl7aWYoc3VwZXIodC5zcHJpdGVTaGVldFBhdGgpLHRoaXMuaW50ZXJ2YWxJZD0tMSx0aGlzLmlzQW5pbWF0ZWQ9ITEsdGhpcy5sYXN0UnVuVGltZVN0YW1wPTAsdGhpcy5zcHJpdGVTaGVldD10LGVbMF08MXx8ZVsxXTwxfHxpWzBdPDF8fGlbMV08MXx8ZVswXT50LmNvbHN8fGVbMV0+dC5yb3dzfHxpWzBdPnQuY29sc3x8aVsxXT50LnJvd3MpdGhyb3cgbmV3IG0oIkludmFsaWQgdHVwbGVzIDogdGhlIHNwcml0ZXNoZWV0IGNvb3JkaW5hdGUgc3RhcnRzIGF0ICgxLCAxKSIpO3RoaXMuZnJvbT1lLHRoaXMudG89aTtsZXQgcj1hKGEoe30seSkscyk7dGhpcy5pbnRlcnZhbD1yLmludGVydmFsLHRoaXMubG9vcD1yLmxvb3AsdGhpcy5zcHJpdGVXaWR0aD10aGlzLnNpemUud2lkdGgvdC5jb2xzLHRoaXMuc3ByaXRlSGVpZ2h0PXRoaXMuc2l6ZS5oZWlnaHQvdC5yb3dzLHRoaXMuY29vcmRYPXRoaXMuZnJvbVswXSx0aGlzLmNvb3JkWT10aGlzLmZyb21bMV19cnVuKCl7bGV0IHQ9cGVyZm9ybWFuY2Uubm93KCl8fERhdGUubm93KCk7dC10aGlzLmxhc3RSdW5UaW1lU3RhbXA+dGhpcy5pbnRlcnZhbCYmKHRoaXMuc3RlcCgpLHRoaXMubGFzdFJ1blRpbWVTdGFtcD10KX1hbmltYXRlKCl7dGhpcy5pc0FuaW1hdGVkfHwodGhpcy5pbnRlcnZhbElkPXdpbmRvdy5zZXRJbnRlcnZhbCgoKCk9PnRoaXMuc3RlcCgpKSx0aGlzLmludGVydmFsKSx0aGlzLmlzQW5pbWF0ZWQ9ITApfXBhdXNlKCl7dGhpcy5pc0FuaW1hdGVkJiYod2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKSx0aGlzLmlzQW5pbWF0ZWQ9ITEpfXJlc2V0KCl7dGhpcy5jb29yZFg9dGhpcy5mcm9tWzBdLHRoaXMuY29vcmRZPXRoaXMuZnJvbVsxXX1zdG9wKCl7dGhpcy5wYXVzZSgpLHRoaXMucmVzZXQoKX1zZXRJbnRlcnZhbCh0KXt0aGlzLmludGVydmFsPXQsdGhpcy5pc0FuaW1hdGVkJiYod2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKSx0aGlzLmFuaW1hdGUoKSl9c3RlcCgpe3RoaXMuY29vcmRYIT09dGhpcy50b1swXXx8dGhpcy5jb29yZFkhPT10aGlzLnRvWzFdP3RoaXMuY29vcmRZPHRoaXMudG9bMV0/dGhpcy5jb29yZFg8dGhpcy5zcHJpdGVTaGVldC5jb2xzP3RoaXMuY29vcmRYKys6KHRoaXMuY29vcmRZKyssdGhpcy5jb29yZFg9dGhpcy5mcm9tWzBdKTp0aGlzLmNvb3JkWDx0aGlzLnRvWzBdJiZ0aGlzLmNvb3JkWCsrOnRoaXMubG9vcCYmKHRoaXMuY29vcmRYPXRoaXMuZnJvbVswXSx0aGlzLmNvb3JkWT10aGlzLmZyb21bMV0pfXNwcml0ZUJveCgpe3JldHVybiBuZXcgaCgodGhpcy5jb29yZFgtMSkqdGhpcy5zcHJpdGVXaWR0aCwodGhpcy5jb29yZFktMSkqdGhpcy5zcHJpdGVIZWlnaHQsdGhpcy5zcHJpdGVXaWR0aCx0aGlzLnNwcml0ZUhlaWdodCl9fSYmKG89ci5zcHJpdGVCb3goKSksUy5kcmF3SW1hZ2Uoci5pbWFnZSxvLngsby55LG8ud2lkdGgsby5oZWlnaHQsUChpKnIub2Zmc2V0LngtaS8yKSxQKHMqci5vZmZzZXQueS1zLzIpLFAoaSksUChzKSksUy5yZXN0b3JlKCl9c3RhdGljIGNpcmNsZVNwcml0ZSh0LGUsaSxzKXtzLmlzTG9hZGVkJiYoUy5zYXZlKCksUy5iZWdpblBhdGgoKSxTLmFyYyhQKHQrUi54KSxQKGUrUi55KSxpLDAsQyksUy5jbGlwKCksai5yZWN0U3ByaXRlKHQtaSxlLWksMippLDIqaSxzKSxTLnJlc3RvcmUoKSl9c3RhdGljIHRleHQodCxlLGkscyl7ai50ZXh0U3R5bGUocyksUy5maWxsVGV4dCh0LGUsaSl9c3RhdGljIGNlbnRlcmVkVGV4dCh0LGUsaSxzKXtqLnRleHQodCxlLGksYyhhKHt9LHMpLHt0ZXh0QWxpZ246ImNlbnRlciIsdGV4dEJhc2VsaW5lOiJtaWRkbGUifSkpfXN0YXRpYyB0aW50KHQsZSxpLHMscil7ai5yZWN0KGUsaSxzLHIse2ZpbGxTdHlsZTp0LGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjoibXVsdGlwbHkiLGdsb2JhbEFscGhhOi4yNX0pfXN0YXRpYyBiZWdpbkZyYW1lKHQpe2ouY2xlYXIodCl9c3RhdGljIGVuZEZyYW1lKCl7fX1uZXcgY2xhc3MgZXh0ZW5kcyBjbGFzc3tzZW5kTWVzc2FnZVRvTWFpblRocmVhZCh0LGUpe3NlbGYucG9zdE1lc3NhZ2Uoe3RpdGxlOnQsZGF0YTplfSl9bG9nKC4uLnQpe3RoaXMuc2VuZE1lc3NhZ2VUb01haW5UaHJlYWQoImxvZyIsLi4udCl9fXtjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5jYW52YXNSZXNvbHV0aW9uPTEsdGhpcy5vZmZzY3JlZW5DYW52YXM9bnVsbCx0aGlzLmN0eD1udWxsLHRoaXMudGV4dHVyZUFsaWFzPW5ldyBNYXAsc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwoKHtkYXRhOnR9KT0+dGhpcy5vbk1lc3NhZ2UodC50aXRsZSx0LmNvbnRlbnQpKSl9b25NZXNzYWdlKHQsZSl7c3dpdGNoKHQpe2Nhc2UiaW5pdENhbnZhcyI6dGhpcy5vZmZzY3JlZW5DYW52YXM9ZS5jYW52YXMsdGhpcy5jdHg9dGhpcy5vZmZzY3JlZW5DYW52YXMuZ2V0Q29udGV4dCgiMmQiKSxqLnNldENvbnRleHQodGhpcy5jdHgpLHRoaXMuc2V0U2l6ZShlLmRwcixlLndpZHRoLGUuaGVpZ2h0KSx0aGlzLnNlbmRNZXNzYWdlVG9NYWluVGhyZWFkKCJpbml0aWFsaXplZCIpO2JyZWFrO2Nhc2UicmVuZGVyIjpmb3IobGV0IHQgb2YgZS5yZW5kZXJTdGFjayl0aGlzLmhhbmRsZURyYXdSZXF1ZXN0KHQubWV0aG9kTmFtZSx0LmFyZ3MpO2JyZWFrO2Nhc2UibmV3VGV4dHVyZSI6dGhpcy50ZXh0dXJlQWxpYXMuc2V0KGUuaWQsZS50ZXh0dXJlKX19c2V0U2l6ZSh0LGUsaSl7Y29uc3Qgcz0odHx8MSkqdGhpcy5jYW52YXNSZXNvbHV0aW9uO3RoaXMub2Zmc2NyZWVuQ2FudmFzLndpZHRoPWUqcyx0aGlzLm9mZnNjcmVlbkNhbnZhcy5oZWlnaHQ9aSpzLCJzZXRUcmFuc2Zvcm0iaW4gdGhpcy5jdHgmJnRoaXMuY3R4LnNldFRyYW5zZm9ybShzLDAsMCxzLDAsMCl9Z2V0VGV4dHVyZSh0KXtjb25zdCBlPXRoaXMudGV4dHVyZUFsaWFzLmdldCh0LnRleHR1cmVJZCkse3NjYWxlOmkscm90YXRpb246cyxvZmZzZXQ6cn09dDtyZXR1cm4gYyhhKHt9LGUpLHtzY2FsZTppLHJvdGF0aW9uOnMsb2Zmc2V0OnJ9KX1oYW5kbGVEcmF3UmVxdWVzdCh0LGUpe3N3aXRjaCh0KXtjYXNlInN0eWxlIjpqLnN0eWxlKG51bGw9PWU/dm9pZCAwOmUub2JqKTticmVhaztjYXNlImNsZWFyIjpqLmNsZWFyKG51bGw9PWU/dm9pZCAwOmUuY29sb3IpO2JyZWFrO2Nhc2UibGluZSI6ai5saW5lKGUueDEsZS55MSxlLngyLGUueTIsZS5vYmopO2JyZWFrO2Nhc2UicmVjdCI6ai5yZWN0KGUueCxlLnksZS53aWR0aCxlLmhlaWdodCxlLm9iaik7YnJlYWs7Y2FzZSJyZWN0RnJvbUNlbnRlciI6ai5yZWN0RnJvbUNlbnRlcihlLngsZS55LGUud2lkdGgsZS5oZWlnaHQsZS5vYmopO2JyZWFrO2Nhc2UicmVjdEZyb21Qb2ludHMiOmoucmVjdEZyb21Qb2ludHMoZS54MSxlLnkxLGUueDIsZS55MixlLm9iaik7YnJlYWs7Y2FzZSJwb2x5IjpqLnBvbHkoZS5wb2ludHMsZS5vYmopO2JyZWFrO2Nhc2UiY2lyY2xlIjpqLmNpcmNsZShlLngsZS55LGUucmFkaXVzLGUub2JqKTticmVhaztjYXNlImNpcmNsZUZyb21SZWN0IjpqLmNpcmNsZUZyb21SZWN0KGUueCxlLnksZS53aWR0aCxlLmhlaWdodCxlLm9iaik7YnJlYWs7Y2FzZSJwb2ludCI6ai5wb2ludChlLngsZS55LGUub2JqKTticmVhaztjYXNlInJlY3RTcHJpdGUiOmoucmVjdFNwcml0ZShlLngsZS55LGUud2lkdGgsZS5oZWlnaHQsdGhpcy5nZXRUZXh0dXJlKGUpKTticmVhaztjYXNlImNpcmNsZVNwcml0ZSI6ai5jaXJjbGVTcHJpdGUoZS54LGUueSxlLnJhZGl1cyx0aGlzLmdldFRleHR1cmUoZSkpO2JyZWFrO2Nhc2UidGV4dCI6ai50ZXh0KGUudGV4dCxlLngsZS55LG51bGw9PWU/dm9pZCAwOmUuc3R5bGUpO2JyZWFrO2Nhc2UiY2VudGVyZWRUZXh0IjpqLmNlbnRlcmVkVGV4dChlLnRleHQsZS54LGUueSxudWxsPT1lP3ZvaWQgMDplLnN0eWxlKTticmVhaztjYXNlInRpbnQiOmoudGludChlLmNvbG9yLGUueCxlLnksZS53aWR0aCxlLmhlaWdodCl9fX07Cg==",{type:"module"})}let ht=!1,rt=[];const mt=new Map;class ut{static get worker(){return et}static get workerIsInitialized(){return ht}static get offscreenCanvas(){return tt}static get renderStack(){return rt}static create(t,e){let[s,i]=[Z().width,Z().height];return st=f(t||s,e||i,1),ut.initRenderWorker(st,t||s,e||i),g(st,"main"),st}static createFromCanvas(t){if(st=document.querySelector(t),!(st&&st instanceof HTMLCanvasElement))throw new Q("The selected element is not a canvas");return L(st,st.clientWidth,st.clientHeight,1),ut.initRenderWorker(st,st.width,st.height),st}static initRenderWorker(t,e,s){Zt.renderer instanceof ut||Zt.setRendererType("offscreen");let{clientWidth:i,clientHeight:n}=t;et=new ct,tt=t.transferControlToOffscreen(),this.sendMessageToWorker("initCanvas",{width:e||i,height:s||n,canvas:tt,dpr:window.devicePixelRatio||1},[tt]),et.onmessage=({data:{title:t,data:e}})=>{switch(t){case"log":console.log("message from the renderer worker : ",e);break;case"initialized":ht=!0,this.endFrame();break;default:console.log(t)}}}static addRenderCall(t,e){rt.push(new dt(t,e||{}))}static sendMessageToWorker(t,e,s){return et.postMessage(new ot(t,e),s||[])}static style(t){this.addRenderCall("style",{obj:t})}static clear(t){this.addRenderCall("clear",{color:t})}static line(t,e,s,i,n){this.addRenderCall("line",{x1:t,y1:e,x2:s,y2:i,obj:n})}static rect(t,e,s,i,n){this.addRenderCall("rect",{x:t,y:e,width:s,height:i,obj:n})}static rectFromCenter(t,e,s,i,n){this.addRenderCall("rectFromCenter",{x:t,y:e,width:s,height:i,obj:n})}static rectFromPoints(t,e,s,i,n){this.addRenderCall("rectFromPoints",{x1:t,y1:e,x2:s,y2:i,obj:n})}static poly(t,e){this.addRenderCall("poly",{points:t,obj:e})}static circle(t,e,s,i){this.addRenderCall("circle",{x:t,y:e,radius:s,obj:i})}static circleFromRect(t,e,s,i,n){this.addRenderCall("circleFromRect",{x:t,y:e,width:s,height:i,obj:n})}static point(t,e,s){this.addRenderCall("point",{x:t,y:e,obj:s})}static handleTexture(t,e,s){var i;if(t.isLoaded)if(mt.has(t.id)){const{scale:i,rotation:n,offset:l}=t;this.addRenderCall(e,d(o({},s),{textureId:t.id,scale:i,rotation:n,offset:l}))}else null==(i=t.convertToBitmap())||i.then((e=>{mt.set(t.id,e),this.sendMessageToWorker("newTexture",{id:t.id,texture:e})}))}static rectSprite(t,e,s,i,n){this.handleTexture(n,"rectSprite",{x:t,y:e,width:s,height:i})}static async circleSprite(t,e,s,i){this.handleTexture(i,"circleSprite",{x:t,y:e,radius:s})}static text(t,e,s,i){this.addRenderCall("text",{text:t,x:e,y:s,style:i})}static centeredText(t,e,s,i){this.addRenderCall("centeredText",{text:t,x:e,y:s,style:i})}static tint(t,e,s,i,n){this.addRenderCall("circle",{color:t,x:e,y:s,width:i,height:n})}static beginFrame(t){rt=[],this.clear(t)}static endFrame(){ht&&(this.sendMessageToWorker("render",{renderStack:rt}),rt=[])}}const pt=v("OffscreenCanvas")?ut:at;function yt(){const t=new F,e=document.createElement("div");return e.classList.toggle("stats"),t.showPanel(0),e.appendChild(t.dom),document.body.appendChild(e),E.statsShift(48),t}class bt{constructor(t,e=60){if(this.requestId=0,this.animate=t,this.fps=e,!window)throw new j("No window context","core")}start(){let t=w();const e=1e3/this.fps,s=i=>{this.requestId=window.requestAnimationFrame(s);const n=i-t;n>=e-.1&&(t=i-n%e,this.animate(n))};this.requestId=window.requestAnimationFrame(s)}stop(){window.cancelAnimationFrame(this.requestId)}}let Gt="normal";class Zt{constructor(t,e,s=60){this.fps=60,this.name=t,this.env=e,this.tick=0,this.stats=null,this.showStatsPanel=!1,this.gameLoop=this.env?()=>e.update():null,this.fps=s,this.makeAnimationFrame()}static setRendererType(t){Gt=t}static get renderer(){return"normal"===Gt?at:pt}toggleStats(t){this.showStatsPanel=void 0!==t?t:!this.showStatsPanel,this.showStatsPanel?this.stats=yt():(this.stats=null,document.querySelector(".stats")&&document.querySelector(".stats").remove())}makeAnimationFrame(){this.update&&(this.animationFrame=new bt((t=>this.update(t)),this.fps))}setMainLoop(t){this.gameLoop=t,this.makeAnimationFrame()}setFPS(t){this.fps=t,this.makeAnimationFrame()}update(t){var e,s;null==(e=this.stats)||e.begin(),k.tick(),Y.tick(t),this.gameLoop&&this.gameLoop(t),this.tick%E.updateInterval==0&&E.update(),null==(s=this.stats)||s.end(),this.tick++}start(){if(!this.gameLoop)throw new Error("No game loop");if(!this.animationFrame)throw new Error("AnimationFrame");C()?this.internalStart():window.addEventListener("DOMContentLoaded",(()=>this.internalStart()))}internalStart(){this.name&&(document.title=this.name),k.init(),Y.init(),E.init(),this.showStatsPanel&&(this.stats=yt()),this.animationFrame.start(),window.unrailEngineLoaded=!0,H.emit("EngineLoaded")}}class xt{constructor(t,e){this.width=t,this.height=e}update(){}render(){}}class Wt{constructor(t,e,s,i){this.x=t,this.y=e,this.width=s||100,this.height=i||s||100}collide(t){return!!(t.width&&t.height&&this.width&&this.height)&&(this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.height+this.y>t.y)}update(...t){}render(...t){}}class ft extends Wt{constructor(t,e,s,i){super(t,e,s,i)}update(...t){}render(...t){}}class Lt{constructor(t,e){this.delay=t,this.callback=e,window.setTimeout(this.callback,this.delay)}}class gt extends Wt{constructor(t,e,s=5,i,n){super(e.x,e.y),this.radius=2,this.id=t,this.pos=e.clone(),this.angle=i&&"random"!=i?i%2*Math.PI:Math.PI/2+2*Math.random()*Math.PI,this.velocity=new r(Math.random()*s*Math.cos(this.angle),Math.random()*s*Math.sin(this.angle)),this.color=n||"transparent",this.opacity=y(100,255*Math.random(),255)}update(){this.velocity.y+=.01,this.pos=this.pos.add(this.velocity),this.opacity-=2}render(){Zt.renderer.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255})}}class Rt{constructor(t,e,s,i){this.pos=e,this.lifeDuration=s,this.particles=[],this.UUID=100*h.randint(1,100);for(let n=0;n<t;n++){let t=new gt(this.UUID+n,this.pos);this.particles.push(t)}new Lt(this.lifeDuration,(()=>{this.destroy(),i&&i()}))}addParticles(t){return t.concat(this.particles)}removeParticles(t){const e=this.particles.length;return t.filter((t=>!b(t.id,this.UUID,this.UUID+e)))}destroy(){}}class Xt{constructor(t,e){this.rows=e,this.cols=t,this.cells=[],this.focusCell=null,this.createCells(),this.defineNeighboors()}createCells(){for(let t=0;t<this.cols;t++)for(let e=0;e<this.rows;e++)this.cells.push(new St(t,e))}updateCell(t){if(this.cells.includes(t)){if(1!==t.width||1!==t.height){if(t.width>1){let e=t.width-1,s=this.cells.filter((s=>s.y===t.y&&s.x>t.x&&s.x<=t.x+e));this.cells=this.cells.filter((t=>!s.includes(t)))}if(t.height>1){let e=t.height-1,s=this.cells.filter((s=>s.x===t.x&&s.y>t.y&&s.y<=t.y+e));this.cells=this.cells.filter((t=>!s.includes(t)))}}this.defineNeighboors(),this.cells[this.cells.indexOf(t)]=t}}defineNeighboors(){this.cells.forEach((t=>{t.neighboors.top=t.y>=1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y-t.height))[0]:null,t.neighboors.bottom=t.y<=this.rows-1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y+t.height))[0]:null,t.neighboors.left=t.x>=1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x-t.width))[0]:null,t.neighboors.right=t.x<=this.cols-1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x+t.width))[0]:null}))}get(t,e){return this.cells[t*this.cols+e]}clear(){this.cells.forEach((t=>t.state=null))}}class St{constructor(t,e,s=1,i=1){this.x=t,this.y=e,this.width=s,this.height=i,this.state=null,this.neighboors={}}}const wt={},vt={linear:t=>t,smoothStep:t=>(3-2*t)*t**2,smootherStep:t=>(6*t*t-15*t+10)*t**3,easeIn:t=>t**2,easeOut:t=>1-(1-t)**2,easeInOut:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,easeInBack:t=>2.70158*t**3-1.70158*t**2,easeOutBack:t=>1+1.70158*Math.pow(t-1,3)+2.70158*Math.pow(t-1,2),easeInOutBack:t=>t<.5?Math.pow(2*t,2)*(7.189819*t-2.5949095)/2:(Math.pow(2*t-2,2)*(3.5949095*(2*t-2)+2.5949095)+2)/2},Ct={autostart:!1,loop:!1};class Vt{constructor(t,e,s,i=vt.linear,n={}){if(this.hasStarted=!1,this.isPaused=!1,this.isEnded=!1,this.isReversed=!1,this.lastT=0,this.from=t,this.to=e,this.duration=s,i instanceof Function)this.easing=i;else{if("string"!=typeof i||!(i in vt))throw new j("Unknow easing parameter","animation");this.easing=vt[i]}this.options=o(o({},Ct),n),this.value=this.from,this.speed=Math.abs(this.to-this.from)/this.duration,Y.add(this)}start(){this.isEnded=!1,this.hasStarted=!0}reset(){this.lastT=0,this.isPaused=!1,this.hasStarted=!1,this.isEnded=!1}toggle(t){void 0!==t&&(t?this.pause():this.resume()),this.isPaused?this.resume():this.pause()}pause(){this.isPaused=!0}resume(){this.isPaused=!1}update(t){if(!this.hasStarted||this.isPaused)return;let e=y(0,this.lastT+t*this.speed/Math.abs(this.to-this.from),1);if(e>=1||e<=0){if(!this.options.loop)return this.isEnded=!0,void this.onFinish();this.speed*=-1,this.isReversed=!this.isReversed}this.lastT=e,this.value=this.from+(this.to-this.from)*this.easing(e)}get isRunning(){return this.hasStarted&&!(this.isEnded||this.isPaused)}onFinish(){}}const Kt=1,Ht=!1;class kt extends Audio{constructor(t,e={}){super(t),this.volume=e.volume||Kt,this.loop=e.loop||Ht,this.controls=!1}}const Yt="0.5.1";export{D as AnimatedSprite,Vt as Animation,v as ApiIsSupported,G as Box,St as Cell,wt as Config,Lt as Cooldown,vt as Easing,H as Event,Zt as Game,xt as GameEnvironement,Wt as GameObject,Xt as Grid,E as Interface,pt as OffscreenRenderer,gt as Particle,Rt as ParticuleGenerator,ft as PlayerObject,m as Point,h as Random,at as Renderer,kt as Sound,P as SpriteSheet,M as Texture,Yt as VERSION,u as V_NULL,p as V_UNIT,r as Vector2,L as adaptCanvasToDevicePixelRatio,R as blink,y as clamp,f as createCanvas,x as getCanvasDimensions,Z as getWindowDimensions,S as hashObject,b as inRange,g as insertCanvas,X as isWorker,w as now,W as setCanvasDimensions,C as windowIsLoaded};
