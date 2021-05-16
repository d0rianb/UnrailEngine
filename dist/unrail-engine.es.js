var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,i=Object.getOwnPropertySymbols,s=Object.prototype.propertyIsEnumerable,n=(e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s,r=(t,r)=>{for(var o in r||(r={}))e.call(r,o)&&n(t,o,r[o]);if(i)for(var o of i(r))s.call(r,o)&&n(t,o,r[o]);return t};class o{static random(){return Math.random()}static randint(t,e){return Math.floor(t+Math.random()*(e-t))}static choice(t){return t[~~(o.random()*t.length)]}static bool(){return o.random()>.5}static sign(){return o.choice([-1,1])}static percent(t){return o.random()<t/100}}var a=o;class l{constructor(t,e){this.x=t,this.y=e}add(t){return new l(this.x+t.x,this.y+t.y)}clone(){return new l(this.x,this.y)}dist(t){return Math.sqrt((this.x-t.x)**2+(this.y-t.y)**2)}}const c=l,h=new l(0,0),d=new l(1,1);function u(t,e,i){return Math.max(t,Math.min(e,i))}function p(t,e,i){return u(e,t,i)===t}var m,f;(f=m||(m={}))[f.KeyboardPressed=0]="KeyboardPressed",f[f.KeyboardDown=1]="KeyboardDown",f[f.Mouse=2]="Mouse",f[f.Window=3]="Window",f[f.Custom=4]="Custom";class w{constructor(t,e,i=4){this.name=t,this.callback=e,this.type=i,this.listeners=[this.callback]}static emit(t,e){const i=y.getCustomEvent(t);i&&i.listeners.forEach((t=>t(e)))}static on(t,e){const i=y.getCustomEvent(t);if(i)i.listeners.push(e);else{const i=new w(t,e,4);y.addEvent(i)}}static onKeyDown(t,e){y.addEvent(new w(t,e,1))}static onKeyPressed(t,e){y.addEvent(new w(t,e,0))}static onMouseClick(t){y.addEvent(new w("click",t,2))}}const y=new class{constructor(){this.windowEvents=[],this.keyboardDownEvents=[],this.keyboardPressedEvents=[],this.customEvents=[],this.currentKeyEvents=[]}init(){window.addEventListener("keydown",(t=>{this.currentKeyEvents.find((e=>e.code===t.code))||this.currentKeyEvents.push(t),this.keyboardPressedEvents.forEach((e=>{t.code===e.name&&e.callback(t)}))})),window.addEventListener("keyup",(t=>{this.currentKeyEvents.length&&(this.currentKeyEvents=this.currentKeyEvents.filter((e=>e.code!==t.code)))}))}addEvent(t){switch(t.type){case m.KeyboardDown:this.keyboardDownEvents.push(t);case m.KeyboardPressed:this.keyboardPressedEvents.push(t);case m.Mouse:break;case m.Window:this.windowEvents.push(t),this.bindEvents();case m.Custom:this.customEvents.push(t)}}getCustomEvent(t){return this.customEvents.find((e=>e.name===t))}bindEvents(){this.windowEvents.forEach((t=>window.addEventListener(t.name,t.callback)))}tick(){this.currentKeyEvents.length&&this.keyboardDownEvents.forEach((t=>{this.currentKeyEvents.forEach((e=>{e.code===t.name&&t.callback(e)}))}))}};"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var g,v=(function(t,e){var i;t.exports=((i=function(){function t(t){return n.appendChild(t.dom),t}function e(t){for(var e=0;e<n.children.length;e++)n.children[e].style.display=e===t?"block":"none";s=t}var s=0,n=document.createElement("div");n.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",n.addEventListener("click",(function(t){t.preventDefault(),e(++s%n.children.length)}),!1);var r=(performance||Date).now(),o=r,a=0,l=t(new i.Panel("FPS","#0ff","#002")),c=t(new i.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var h=t(new i.Panel("MB","#f08","#201"));return e(0),{REVISION:16,dom:n,addPanel:t,showPanel:e,begin:function(){r=(performance||Date).now()},end:function(){a++;var t=(performance||Date).now();if(c.update(t-r,200),t>o+1e3&&(l.update(1e3*a/(t-o),100),o=t,a=0,h)){var e=performance.memory;h.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){r=this.end()},domElement:n,setMode:e}}).Panel=function(t,e,i){var s=1/0,n=0,r=Math.round,o=r(window.devicePixelRatio||1),a=80*o,l=48*o,c=3*o,h=2*o,d=3*o,u=15*o,p=74*o,m=30*o,f=document.createElement("canvas");f.width=a,f.height=l,f.style.cssText="width:80px;height:48px";var w=f.getContext("2d");return w.font="bold "+9*o+"px Helvetica,Arial,sans-serif",w.textBaseline="top",w.fillStyle=i,w.fillRect(0,0,a,l),w.fillStyle=e,w.fillText(t,c,h),w.fillRect(d,u,p,m),w.fillStyle=i,w.globalAlpha=.9,w.fillRect(d,u,p,m),{dom:f,update:function(l,y){s=Math.min(s,l),n=Math.max(n,l),w.fillStyle=i,w.globalAlpha=1,w.fillRect(0,0,a,u),w.fillStyle=e,w.fillText(r(l)+" "+t+" ("+r(s)+"-"+r(n)+")",c,h),w.drawImage(f,d+o,u,p-o,m,d,u,p-o,m),w.fillRect(d+p-o,u,o,m),w.fillStyle=i,w.globalAlpha=.9,w.fillRect(d+p-o,u,o,r((1-l/y)*m))}}},i)}(g={exports:{}},g.exports),g.exports);function x(){return{width:window.innerWidth,height:window.innerHeight}}function b(t,e,i,s){const n=i||window.devicePixelRatio||1,r=document.createElement("canvas");return r.width=t*n,r.height=e*n,r.style.width=t+"px",r.style.height=e+"px",1!=n&&r.getContext("2d").setTransform(n,0,0,n,0,0),s&&(r.oncontextmenu=t=>t.preventDefault()),r}function E(t,e){window.onload=()=>{let i=document.querySelector(e);i||(i=document.createElement(e)),i.appendChild(t),document.querySelector("body").appendChild(i)}}const k={strokeStyle:"black",lineWidth:2,lineJoin:"round",fillStyle:"transparent",globalAlpha:1,globalCompositeOperation:"add"};let C=null==self.document&&null==self.window?4:2*(window.devicePixelRatio||1);function S(t){return~~(t*C)/C}let P=null;class R{static create(t,e){const i=b(t,e);return E(i,"main"),R.setContext(i.getContext("2d")),i}static setContext(t){P=t}static getContext(){return P}static style(t){if(!P)throw new Error("Context has not been initialize. Please use Renderer.setContext");const e=r(r({},k),t);for(let i in e)P[i]!==e[i]&&(P[i]=e[i])}static clear(t){t?(R.style({fillStyle:t}),P.fillRect(0,0,P.canvas.width,P.canvas.height)):P.clearRect(0,0,P.canvas.width,P.canvas.height)}static line(t,e,i,s,n){R.style(n),P.beginPath(),P.moveTo(S(t),S(e)),P.lineTo(S(i),S(s)),P.stroke()}static rect(t,e,i,s,n,r){r||R.style(n);const[o,a,l,c]=[S(t),S(e),S(i),S(s)];P.fillRect(o,a,l,c),P.strokeRect(o,a,l,c)}static poly(t,e){if(t.length){R.style(e),P.beginPath(),P.moveTo(S(t[0].x),S(t[0].y));for(let e=1;e<t.length;e++)P.lineTo(S(t[e].x),S(t[e].y));P.stroke()}}static circle(t,e,i,s){R.style(s),P.beginPath(),P.arc(S(t),S(e),i,0,2*Math.PI),P.stroke()}static point(t,e,i){R.circle(t,e,5,i)}static rectSprite(t,e,i,s,n){R.style({}),P.save(),P.translate(S(t+i/2),S(e+s/2)),P.scale(n.scale.x,n.scale.y),P.rotate(n.rotation),P.drawImage(n.image,S(i*n.offset.x-i/2),S(s*n.offset.y-s/2),S(i),S(s)),P.restore()}static circleSprite(t,e,i,s){P.save(),P.beginPath(),P.arc(S(t),S(e),i,0,2*Math.PI),P.clip(),R.rectSprite(t-i,e-i,2*i,2*i,s),P.restore()}static tint(t,e,i,s,n){R.rect(e,i,s,n,{fillStyle:t,globalCompositeOperation:"multiply",globalAlpha:.25})}}class M{constructor(t,e){this.title=t,this.content=e}}class T{constructor(t,e){this.methodName=t,this.args=e}}const I="./src/render/offscreen-renderer/rendererWorker.ts";let L=null,D=null,A=null,W=!1,K=[];const q=new Map;class F{static get worker(){return D}static get offscreenCanvas(){return L}static get workerIsInitialized(){return W}static get renderStack(){return K}static get workerUrl(){return new URL(I,window.location.origin)}static create(t,e){return A=b(t,e,1),F.initRenderWorker(A,t,e),E(A,"main"),A}static initRenderWorker(t,e,i){"offscreen"!==J.rendererType&&J.setRendererType("offscreen");let{clientWidth:s,clientHeight:n}=t;const r=new URL(I,window.location.origin);D=new Worker(r,{type:"module"}),L=t.transferControlToOffscreen(),this.sendMessageToWorker("initCanvas",{width:e||s,height:i||n,canvas:L,dpr:window.devicePixelRatio||1},[L]),D.onmessage=({data:{title:t,data:e}})=>{switch(t){case"log":console.log("message from the renderer worker : ",e);break;case"initialized":W=!0}}}static addRenderCall(t,e){K.push(new T(t,e||{}))}static sendMessageToWorker(t,e,i){return D.postMessage(new M(t,e),i||[])}static style(t){this.addRenderCall("style",{obj:t})}static clear(t){this.addRenderCall("clear",{color:t})}static line(t,e,i,s,n){this.addRenderCall("line",{x1:t,y1:e,x2:i,y2:s,obj:n})}static rect(t,e,i,s,n,r){this.addRenderCall("rect",{x:t,y:e,width:i,height:s,obj:n,noStyle:r})}static poly(t,e){this.addRenderCall("poly",{points:t,obj:e})}static circle(t,e,i,s){this.addRenderCall("circle",{x:t,y:e,radius:i,obj:s})}static point(t,e,i){this.addRenderCall("point",{x:t,y:e,obj:i})}static rectSprite(t,e,i,s,n){n.id in q?this.addRenderCall("rectSprite",{x:t,y:e,width:i,height:s,textureId:n.id}):n.convertToBitmap().then((t=>{q[n.id]=t,this.sendMessageToWorker("newTexture",{id:n.id,texture:t})}))}static async circleSprite(t,e,i,s){if(s.id in q)this.addRenderCall("circleSprite",{x:t,y:e,radius:i,textureId:s.id});else{const t=await s.convertToBitmap();q[s.id]=t,this.sendMessageToWorker("newTexture",{id:s.id,texture:t})}}static tint(t,e,i,s,n){this.addRenderCall("circle",{color:t,x:e,y:i,width:s,height:n})}static beginFrame(){K=[],this.addRenderCall("clear")}static endFrame(){W&&(this.sendMessageToWorker("render",{renderStack:K}),K=[])}}let O=0;class j{constructor(t,e){if(!t)throw new Error("A source path to the resource must be provided");this.id=O++,this.image=new Image,this.image.src=t,this.size=new l(this.image.width,this.image.height),this.options=e||{},this.rotation=this.options.rotation||0,this.offset=this.options.offset||h,this.scale=this.options.scale||d}async convertToBitmap(){if(!this.image.width||!this.image.height)return;const t=await createImageBitmap(this.image);return r(r({},this),{image:t})}}let U=[],z=4;const B=["top-left","top-right","bottom-left","bottom-right","custom"];class N{static addItem(t,e,i){N.internalAddItem(t,e,i)}static addButton(t,e,i,s){N.internalAddItem(t,e,i,s)}static internalAddItem(t,e,i,s){const n={callback:t,position:e,options:i,onClick:s};U.push(n);const r=U.length;window.addEventListener("load",(()=>N.addToDom(n,r)))}static init(){const t=document.createElement("div");t.classList.add("ue-interface","ue-container");for(let e of B){const i=document.createElement("div");i.classList.add(e),t.appendChild(i)}document.body.appendChild(t)}static addToDom(t,e){var i,s;const n=t.callback(),r=document.createElement("span");r.classList.add("ue-interface-items"),r.id=`item-${e}`,r.innerText=n,Object.entries(t.options||{}).forEach((([t,e])=>r.style[t]=e)),t.position?null==(i=document.querySelector(`.ue-container > .${t.position}`))||i.appendChild(r):null==(s=document.querySelector(".ue-container > .custom"))||s.appendChild(r),t.onClick&&(r.addEventListener("click",(e=>t.onClick(e))),r.classList.add("ue-interface-button"))}static update(){U.forEach(((t,e)=>{const i=t.callback(),s=document.querySelector(`.ue-interface #item-${e+1}`);s&&s.innerText!==i&&(s.innerText=i)}))}static statsShift(t){const e=document.querySelector(".top-left");e&&(e.style.top=`${t}px`)}static setUpdateInterval(t){z=t}static get updateInterval(){return z}}function H(){const t=new v,e=document.createElement("div");return e.classList.toggle("stats"),t.showPanel(0),e.appendChild(t.dom),document.body.appendChild(e),N.statsShift(48),t}class ${constructor(t,e=60){if(this.requestId=0,this.animate=t,this.fps=e,!window)throw new Error("No window context")}start(){let t=performance.now();const e=1e3/this.fps,i=s=>{this.requestId=window.requestAnimationFrame(i);const n=s-t;n>=e-.1&&(t=s-n%e,this.animate(n))};this.requestId=window.requestAnimationFrame(i)}stop(){window.cancelAnimationFrame(this.requestId)}}let G="normal";class J{constructor(t,e,i=60){this.fps=60,this.name=t,this.env=e,this.tick=0,this.stats=null,this.showStatsPanel=!0,this.gameLoop=null,this.fps=i}static setRendererType(t){G=t}static get rendererType(){return G}toggleStats(t){this.showStatsPanel=void 0!==t?t:!this.showStatsPanel,this.showStatsPanel?this.stats=H():(this.stats=null,document.querySelector(".stats")&&document.querySelector(".stats").remove())}makeAnimationFrame(){this.animationFrame=new $((t=>this.update(t)),this.fps)}setMainLoop(t){this.gameLoop=t,this.makeAnimationFrame()}setFPS(t){this.fps=t,this.makeAnimationFrame()}update(t){var e,i;null==(e=this.stats)||e.begin(),y.tick(),this.gameLoop&&this.gameLoop(t),this.tick%N.updateInterval==0&&N.update(),null==(i=this.stats)||i.end(),this.tick++}start(){if(!this.gameLoop)throw new Error("No game loop");if(!this.animationFrame)throw new Error("AnimationFrame");window.addEventListener("DOMContentLoaded",(()=>{this.name&&(document.title=this.name),y.init(),N.init(),this.showStatsPanel&&(this.stats=H()),this.animationFrame.start()}))}}class V{constructor(t,e){this.width=t,this.height=e}update(){}render(){}}class Q{constructor(t,e){this.x=t,this.y=e}collide(t){return!!(t.width&&t.height&&this.width&&this.height)&&(this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.height+this.y>t.y)}update(...t){}render(t,...e){}}class X extends Q{constructor(t,e){super(t,e)}update(...t){}render(t,...e){}}class Y{constructor(t,e){this.delay=t,this.callback=e,window.setTimeout(this.callback,this.delay)}}class Z extends Q{constructor(t,e,i=5,s,n){super(e.x,e.y),this.id=t,this.pos=e.clone(),this.angle=s&&"random"!=s?s%2*Math.PI:Math.PI/2+2*Math.random()*Math.PI,this.velocity=new l(Math.random()*i*Math.cos(this.angle),Math.random()*i*Math.sin(this.angle)),this.color=n||"red",this.opacity=u(100,255*Math.random(),255),this.radius=2}update(){this.velocity.y+=.01,this.pos=this.pos.add(this.velocity),this.opacity--}render(){switch(J.rendererType){case"normal":R.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255});break;case"offscreen":F.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255})}}}class _{constructor(t,e,i,s){this.pos=e,this.lifeDuration=i,this.particles=[],this.UUID=100*a.randint(1,100);for(let n=0;n<t;n++){let t=new Z(this.UUID+n,this.pos);this.particles.push(t)}new Y(this.lifeDuration,(()=>{this.destroy(),s()}))}addParticles(t){return t.concat(this.particles)}removeParticles(t){const e=this.particles.length;return t.filter((t=>!p(t.id,this.UUID,this.UUID+e)))}destroy(){}}var tt,et;(et=tt||(tt={}))[et.Turret=0]="Turret",et[et.Road=1]="Road",et[et.Ground=2]="Ground",et[et.Empty=3]="Empty";class it{constructor(t,e){this.rows=e,this.cols=t,this.cells=[],this.focusCell=null,this.createCells(),this.defineNeighboors()}createCells(){for(let t=0;t<this.cols;t++)for(let e=0;e<this.rows;e++)this.cells.push(new st(t,e))}updateCell(t){if(this.cells.includes(t)){if(1!==t.width||1!==t.height){if(t.width>1){let e=t.width-1,i=this.cells.filter((i=>i.y===t.y&&i.x>t.x&&i.x<=t.x+e));this.cells=this.cells.filter((t=>!i.includes(t)))}if(t.height>1){let e=t.height-1,i=this.cells.filter((i=>i.x===t.x&&i.y>t.y&&i.y<=t.y+e));this.cells=this.cells.filter((t=>!i.includes(t)))}}this.defineNeighboors(),this.cells[this.cells.indexOf(t)]=t}}defineNeighboors(){this.cells.forEach((t=>{t.neighboor.top=t.y>=1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y-t.height))[0]:null,t.neighboor.bottom=t.y<=this.rows-1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y+t.height))[0]:null,t.neighboor.left=t.x>=1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x-t.width))[0]:null,t.neighboor.right=t.x<=this.cols-1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x+t.width))[0]:null}))}}class st{constructor(t,e,i=1,s=1){this.x=t,this.y=e,this.width=i,this.height=s,this.highlight=!1,this.type=2,this.neighboor={}}toggleHighlight(){this.highlight=!this.highlight}}const nt={},rt="0.3.6";export{st as Cell,nt as Config,Y as Cooldown,w as Event,J as Game,V as GameEnvironement,Q as GameObject,it as Grid,N as Interface,F as OffscreenRenderer,Z as Particle,_ as ParticuleGenerator,X as PlayerObject,c as Point,a as Random,R as Renderer,j as Texture,rt as VERSION,h as V_NULL,d as V_UNIT,l as Vector2,u as clamp,b as createCanvas,x as getWindowDimensions,p as inRange};
//# sourceMappingURL=unrail-engine.es.js.map
