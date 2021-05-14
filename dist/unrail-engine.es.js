var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,i=Object.getOwnPropertySymbols,s=Object.prototype.propertyIsEnumerable,n=(e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s,a=(t,a)=>{for(var o in a||(a={}))e.call(a,o)&&n(t,o,a[o]);if(i)for(var o of i(a))s.call(a,o)&&n(t,o,a[o]);return t};class o{static random(){return Math.random()}static randint(t,e){return Math.floor(t+Math.random()*(e-t))}static choice(t){return t[~~(o.random()*t.length)]}static bool(){return o.random()>.5}static sign(){return o.choice([-1,1])}static percent(t){return o.random()<t/100}}var r=o;class l{constructor(t,e){this.x=t,this.y=e}add(t){return new l(this.x+t.x,this.y+t.y)}clone(){return new l(this.x,this.y)}dist(t){return Math.sqrt((this.x-t.x)**2+(this.y-t.y)**2)}}const c=l,h=new l(0,0),d=new l(1,1);function u(t,e,i){return Math.max(t,Math.min(e,i))}function p(t,e,i){return u(e,t,i)===t}var m,f;(f=m||(m={}))[f.KeyboardPressed=0]="KeyboardPressed",f[f.KeyboardDown=1]="KeyboardDown",f[f.Mouse=2]="Mouse",f[f.Window=3]="Window",f[f.Custom=4]="Custom";class y{constructor(t,e,i=4){this.name=t,this.callback=e,this.type=i,this.listeners=[this.callback]}static emit(t,e){const i=w.getCustomEvent(t);i&&i.listeners.forEach((t=>t(e)))}static on(t,e){const i=w.getCustomEvent(t);if(i)i.listeners.push(e);else{const i=new y(t,e,4);w.addEvent(i)}}static onKeyDown(t,e){w.addEvent(new y(t,e,1))}static onKeyPressed(t,e){w.addEvent(new y(t,e,0))}static onMouseClick(t){w.addEvent(new y("click",t,2))}}const w=new class{constructor(){this.windowEvents=[],this.keyboardDownEvents=[],this.keyboardPressedEvents=[],this.customEvents=[],this.currentKeyEvents=[]}init(){window.addEventListener("keydown",(t=>{this.currentKeyEvents.find((e=>e.code===t.code))||this.currentKeyEvents.push(t),this.keyboardPressedEvents.forEach((e=>{t.code===e.name&&e.callback(t)}))})),window.addEventListener("keyup",(t=>{this.currentKeyEvents.length&&(this.currentKeyEvents=this.currentKeyEvents.filter((e=>e.code!==t.code)))}))}addEvent(t){switch(t.type){case m.KeyboardDown:this.keyboardDownEvents.push(t);case m.KeyboardPressed:this.keyboardPressedEvents.push(t);case m.Mouse:break;case m.Window:this.windowEvents.push(t),this.bindEvents();case m.Custom:this.customEvents.push(t)}}getCustomEvent(t){return this.customEvents.find((e=>e.name===t))}bindEvents(){this.windowEvents.forEach((t=>window.addEventListener(t.name,t.callback)))}tick(){this.currentKeyEvents.length&&this.keyboardDownEvents.forEach((t=>{this.currentKeyEvents.forEach((e=>{e.code===t.name&&t.callback(e)}))}))}};"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var g,v=(function(t,e){var i;t.exports=((i=function(){function t(t){return n.appendChild(t.dom),t}function e(t){for(var e=0;e<n.children.length;e++)n.children[e].style.display=e===t?"block":"none";s=t}var s=0,n=document.createElement("div");n.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",n.addEventListener("click",(function(t){t.preventDefault(),e(++s%n.children.length)}),!1);var a=(performance||Date).now(),o=a,r=0,l=t(new i.Panel("FPS","#0ff","#002")),c=t(new i.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var h=t(new i.Panel("MB","#f08","#201"));return e(0),{REVISION:16,dom:n,addPanel:t,showPanel:e,begin:function(){a=(performance||Date).now()},end:function(){r++;var t=(performance||Date).now();if(c.update(t-a,200),t>o+1e3&&(l.update(1e3*r/(t-o),100),o=t,r=0,h)){var e=performance.memory;h.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){a=this.end()},domElement:n,setMode:e}}).Panel=function(t,e,i){var s=1/0,n=0,a=Math.round,o=a(window.devicePixelRatio||1),r=80*o,l=48*o,c=3*o,h=2*o,d=3*o,u=15*o,p=74*o,m=30*o,f=document.createElement("canvas");f.width=r,f.height=l,f.style.cssText="width:80px;height:48px";var y=f.getContext("2d");return y.font="bold "+9*o+"px Helvetica,Arial,sans-serif",y.textBaseline="top",y.fillStyle=i,y.fillRect(0,0,r,l),y.fillStyle=e,y.fillText(t,c,h),y.fillRect(d,u,p,m),y.fillStyle=i,y.globalAlpha=.9,y.fillRect(d,u,p,m),{dom:f,update:function(l,w){s=Math.min(s,l),n=Math.max(n,l),y.fillStyle=i,y.globalAlpha=1,y.fillRect(0,0,r,u),y.fillStyle=e,y.fillText(a(l)+" "+t+" ("+a(s)+"-"+a(n)+")",c,h),y.drawImage(f,d+o,u,p-o,m,d,u,p-o,m),y.fillRect(d+p-o,u,o,m),y.fillStyle=i,y.globalAlpha=.9,y.fillRect(d+p-o,u,o,a((1-l/w)*m))}}},i)}(g={exports:{}},g.exports),g.exports);function x(){return{width:window.innerWidth,height:window.innerHeight}}function b(t,e,i,s){const n=i||window.devicePixelRatio||1,a=document.createElement("canvas");return a.width=t*n,a.height=e*n,a.style.width=t+"px",a.style.height=e+"px",1!=n&&a.getContext("2d").setTransform(n,0,0,n,0,0),s&&(a.oncontextmenu=t=>t.preventDefault()),a}function E(t,e){window.onload=()=>{let i=document.querySelector(e);i||(i=document.createElement(e)),i.appendChild(t),document.querySelector("body").appendChild(i)}}const k={strokeStyle:"black",lineWidth:2,lineJoin:"round",fillStyle:"transparent",globalAlpha:1,globalCompositeOperation:"add"};let C=null==self.document&&null==self.window?4:2*(window.devicePixelRatio||1);function S(t){return~~(t*C)/C}let P=null;class M{static create(t,e){const i=b(t,e);return E(i,"main"),M.setContext(i.getContext("2d")),i}static setContext(t){P=t}static getContext(){return P}static style(t){if(!P)throw new Error("Context has not been initialize. Please use Renderer.setContext");const e=a(a({},k),t);for(let i in e)P[i]!==e[i]&&(P[i]=e[i])}static clear(t){t?(M.style({fillStyle:t}),P.fillRect(0,0,P.canvas.width,P.canvas.height)):P.clearRect(0,0,P.canvas.width,P.canvas.height)}static line(t,e,i,s,n){M.style(n),P.beginPath(),P.moveTo(S(t),S(e)),P.lineTo(S(i),S(s)),P.stroke()}static rect(t,e,i,s,n,a){a||M.style(n);const[o,r,l,c]=[S(t),S(e),S(i),S(s)];P.fillRect(o,r,l,c),P.strokeRect(o,r,l,c)}static poly(t,e){if(t.length){M.style(e),P.beginPath(),P.moveTo(S(t[0].x),S(t[0].y));for(let e=1;e<t.length;e++)P.lineTo(S(t[e].x),S(t[e].y));P.stroke()}}static circle(t,e,i,s){M.style(s),P.beginPath(),P.arc(S(t),S(e),i,0,2*Math.PI),P.stroke()}static point(t,e,i){M.circle(t,e,5,i)}static rectSprite(t,e,i,s,n){M.style({}),P.save(),P.translate(S(t+i/2),S(e+s/2)),P.scale(n.scale.x,n.scale.y),P.rotate(n.rotation),P.drawImage(n.image,S(i*n.offset.x-i/2),S(s*n.offset.y-s/2),S(i),S(s)),P.restore()}static circleSprite(t,e,i,s){P.save(),P.beginPath(),P.arc(S(t),S(e),i,0,2*Math.PI),P.clip(),M.rectSprite(t-i,e-i,2*i,2*i,s),P.restore()}static tint(t,e,i,s,n){M.rect(e,i,s,n,{fillStyle:t,globalCompositeOperation:"multiply",globalAlpha:.25})}}class T{constructor(t,e){this.title=t,this.content=e}}class R{constructor(t,e){this.methodName=t,this.args=e}}let I=null,D=null,L=null,A=!1,K=[];const W=new Map;class q{static create(t,e){return L=b(t,e,1),q.initRenderWorker(L,t,e),E(L,"main"),L}static initRenderWorker(t,e,i){"offscreen"!==G.rendererType&&G.setRendererType("offscreen");let{clientWidth:s,clientHeight:n}=t;D=new Worker("./src/render/offscreen-renderer/renderer-worker.ts",{type:"module"}),I=t.transferControlToOffscreen(),this.sendMessageToWorker("initCanvas",{width:e||s,height:i||n,canvas:I,dpr:window.devicePixelRatio||1},[I]),D.onmessage=({data:{title:t,data:e}})=>{switch(t){case"log":console.log("message from the renderer worker : ",e);break;case"workerIsInitialized":A=!0}}}static addRenderCall(t,e){K.push(new R(t,e))}static sendMessageToWorker(t,e,i){return D.postMessage(new T(t,e),i||[])}static style(t){this.addRenderCall("style",{obj:t})}static clear(t){this.addRenderCall("clear",{color:t})}static line(t,e,i,s,n){this.addRenderCall("line",{x1:t,y1:e,x2:i,y2:s,obj:n})}static rect(t,e,i,s,n,a){this.addRenderCall("rect",{x:t,y:e,width:i,height:s,obj:n,noStyle:a})}static poly(t,e){this.addRenderCall("poly",{points:t,obj:e})}static circle(t,e,i,s){this.addRenderCall("circle",{x:t,y:e,radius:i,obj:s})}static point(t,e,i){this.addRenderCall("point",{x:t,y:e,obj:i})}static rectSprite(t,e,i,s,n){n.id in W?this.addRenderCall("rectSprite",{x:t,y:e,width:i,height:s,textureId:n.id}):n.convertToBitmap().then((t=>{W[n.id]=t,this.sendMessageToWorker("newTexture",{id:n.id,texture:t})}))}static async circleSprite(t,e,i,s){if(s.id in W)this.addRenderCall("circleSprite",{x:t,y:e,radius:i,textureId:s.id});else{const t=await s.convertToBitmap();W[s.id]=t,this.sendMessageToWorker("newTexture",{id:s.id,texture:t})}}static tint(t,e,i,s,n){this.addRenderCall("circle",{color:t,x:e,y:i,width:s,height:n})}static endFrame(){A&&(this.sendMessageToWorker("render",{renderStack:K}),K=[])}}let F=0;class O{constructor(t,e){if(!t)throw new Error("A source path to the resource must be provided");this.id=F++,this.image=new Image,this.image.src=t,this.size=new l(this.image.width,this.image.height),this.options=e||{},this.rotation=this.options.rotation||0,this.offset=this.options.offset||h,this.scale=this.options.scale||d}async convertToBitmap(){if(!this.image.width||!this.image.height)return;const t=await createImageBitmap(this.image);return a(a({},this),{image:t})}}let j=[],U=4;const B=["top-left","top-right","bottom-left","bottom-right","custom"];class z{static addItem(t,e,i){z.internalAddItem(t,e,i)}static addButton(t,e,i,s){z.internalAddItem(t,e,i,s)}static internalAddItem(t,e,i,s){const n={callback:t,position:e,options:i,onClick:s};j.push(n);const a=j.length;window.addEventListener("load",(()=>z.addToDom(n,a)))}static init(){const t=document.createElement("div");t.classList.add("ue-interface","ue-container");for(let e of B){const i=document.createElement("div");i.classList.add(e),t.appendChild(i)}document.body.appendChild(t)}static addToDom(t,e){var i,s;const n=t.callback(),a=document.createElement("span");a.classList.add("ue-interface-items"),a.id=`item-${e}`,a.innerText=n,Object.entries(t.options||{}).forEach((([t,e])=>a.style[t]=e)),t.position?null==(i=document.querySelector(`.ue-container > .${t.position}`))||i.appendChild(a):null==(s=document.querySelector(".ue-container > .custom"))||s.appendChild(a),t.onClick&&(a.addEventListener("click",(e=>t.onClick(e))),a.classList.add("ue-interface-button"))}static update(){j.forEach(((t,e)=>{const i=t.callback(),s=document.querySelector(`.ue-interface #item-${e+1}`);s&&s.innerText!==i&&(s.innerText=i)}))}static statsShift(t){const e=document.querySelector(".top-left");e&&(e.style.top=`${t}px`)}static setUpdateInterval(t){U=t}static get updateInterval(){return U}}function H(){const t=new v,e=document.createElement("div");return e.classList.toggle("stats"),t.showPanel(0),e.appendChild(t.dom),document.body.appendChild(e),z.statsShift(48),t}class N{constructor(t,e=60){this.requestId=0,this.animate=t,this.fps=e}start(){let t=performance.now();const e=1e3/this.fps,i=s=>{this.requestId=requestAnimationFrame(i);const n=s-t;n>=e-.1&&(t=s-n%e,this.animate(n))};this.requestId=requestAnimationFrame(i)}stop(){cancelAnimationFrame(this.requestId)}}let $="normal";class G{constructor(t,e,i=60){this.fps=60,this.name=t,this.env=e,this.tick=0,this.stats=null,this.showStatsPanel=!0,this.gameLoop=null,this.fps=i}static setRendererType(t){$=t}static get rendererType(){return $}toggleStats(t){this.showStatsPanel=void 0!==t?t:!this.showStatsPanel,this.showStatsPanel?this.stats=H():(this.stats=null,document.querySelector(".stats")&&document.querySelector(".stats").remove())}makeAnimationFrame(){this.animationFrame=new N((t=>this.update(t)),this.fps)}setMainLoop(t){this.gameLoop=t,this.makeAnimationFrame()}setFPS(t){this.fps=t,this.makeAnimationFrame()}update(t){var e,i;null==(e=this.stats)||e.begin(),w.tick(),this.gameLoop&&this.gameLoop(t),this.tick%z.updateInterval==0&&z.update(),null==(i=this.stats)||i.end(),this.tick++}start(){if(!this.gameLoop)throw new Error("No game loop");if(!this.animationFrame)throw new Error("AnimationFrame");window.addEventListener("DOMContentLoaded",(()=>{this.name&&(document.title=this.name),w.init(),z.init(),this.showStatsPanel&&(this.stats=H()),this.animationFrame.start()}))}}class J{constructor(t,e){this.width=t,this.height=e}update(){}render(){}}class V{constructor(t,e){this.x=t,this.y=e}collide(t){return!!(t.width&&t.height&&this.width&&this.height)&&(this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.height+this.y>t.y)}update(...t){}render(t,...e){}}class Q extends V{constructor(t,e){super(t,e)}update(...t){}render(t,...e){}}class X{constructor(t,e){this.delay=t,this.callback=e,window.setTimeout(this.callback,this.delay)}}class Y extends V{constructor(t,e,i=5,s,n){super(e.x,e.y),this.id=t,this.pos=e.clone(),this.angle=s&&"random"!=s?s%2*Math.PI:Math.PI/2+2*Math.random()*Math.PI,this.velocity=new l(Math.random()*i*Math.cos(this.angle),Math.random()*i*Math.sin(this.angle)),this.color=n||"red",this.opacity=u(100,255*Math.random(),255),this.radius=2}update(){this.velocity.y+=.01,this.pos=this.pos.add(this.velocity),this.opacity--}render(){switch(G.rendererType){case"normal":M.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255});break;case"offscreen":q.circle(this.pos.x,this.pos.y,this.radius,{fillStyle:this.color,lineWidth:1,globalAlpha:this.opacity/255})}}}class Z{constructor(t,e,i,s){this.pos=e,this.lifeDuration=i,this.particles=[],this.UUID=100*r.randint(1,100);for(let n=0;n<t;n++){let t=new Y(this.UUID+n,this.pos);this.particles.push(t)}new X(this.lifeDuration,(()=>{this.destroy(),s()}))}addParticles(t){return t.concat(this.particles)}removeParticles(t){const e=this.particles.length;return t.filter((t=>!p(t.id,this.UUID,this.UUID+e)))}destroy(){}}var _,tt;(tt=_||(_={}))[tt.Turret=0]="Turret",tt[tt.Road=1]="Road",tt[tt.Ground=2]="Ground",tt[tt.Empty=3]="Empty";class et{constructor(t,e){this.rows=e,this.cols=t,this.cells=[],this.focusCell=null,this.createCells(),this.defineNeighboors()}createCells(){for(let t=0;t<this.cols;t++)for(let e=0;e<this.rows;e++)this.cells.push(new it(t,e))}updateCell(t){if(this.cells.includes(t)){if(1!==t.width||1!==t.height){if(t.width>1){let e=t.width-1,i=this.cells.filter((i=>i.y===t.y&&i.x>t.x&&i.x<=t.x+e));this.cells=this.cells.filter((t=>!i.includes(t)))}if(t.height>1){let e=t.height-1,i=this.cells.filter((i=>i.x===t.x&&i.y>t.y&&i.y<=t.y+e));this.cells=this.cells.filter((t=>!i.includes(t)))}}this.defineNeighboors(),this.cells[this.cells.indexOf(t)]=t}}defineNeighboors(){this.cells.forEach((t=>{t.neighboor.top=t.y>=1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y-t.height))[0]:null,t.neighboor.bottom=t.y<=this.rows-1?this.cells.filter((e=>e.x<=t.x&&e.x+e.width>t.x&&e.y===t.y+t.height))[0]:null,t.neighboor.left=t.x>=1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x-t.width))[0]:null,t.neighboor.right=t.x<=this.cols-1?this.cells.filter((e=>e.y<=t.y&&e.y+e.height>t.y&&e.x===t.x+t.width))[0]:null}))}}class it{constructor(t,e,i=1,s=1){this.x=t,this.y=e,this.width=i,this.height=s,this.highlight=!1,this.type=2,this.neighboor={}}toggleHighlight(){this.highlight=!this.highlight}}const st={},nt="0.3.0";export{it as Cell,st as Config,X as Cooldown,y as Event,G as Game,J as GameEnvironement,V as GameObject,et as Grid,z as Interface,q as OffscreenRenderer,Y as Particle,Z as ParticuleGenerator,Q as PlayerObject,c as Point,r as Random,M as Renderer,O as Texture,nt as VERSION,h as V_NULL,d as V_UNIT,l as Vector2,u as clamp,b as createCanvas,x as getWindowDimensions,p as inRange};
