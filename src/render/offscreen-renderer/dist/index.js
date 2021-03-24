"use strict";
exports.__esModule = true;
exports.OffscreenRenderer = void 0;
var game_1 = require("../../core/game");
var geometry_1 = require("../../core/geometry");
var workerMessage_1 = require("./workerMessage");
var WORKER_PATH = './src/render/offscreen-renderer/renderer-worker.ts';
var offscreenCanvas = null;
var worker = null;
function sendMessageToWorker(title, data, transfer) {
    worker.postMessage(new workerMessage_1.WorkerMessage(title, data), transfer || []);
}
function sendRenderRequest(methodName, args) {
    sendMessageToWorker('render', { method: methodName, args: args });
}
var OffscreenRenderer = /** @class */ (function () {
    function OffscreenRenderer() {
    }
    // Create a canvas and insert it to <main>
    OffscreenRenderer.create = function (width, height) {
        var canvas = geometry_1.createCanvas(width, height, 1);
        OffscreenRenderer.transferTo(canvas, width, height);
        geometry_1.insertCanvas(canvas, 'main');
        return canvas;
    };
    OffscreenRenderer.transferTo = function (canvas, width, height) {
        offscreenCanvas = canvas.transferControlToOffscreen();
        var clientWidth = canvas.clientWidth, clientHeight = canvas.clientHeight;
        if (game_1.Game.rendererType !== 'offscreen') {
            game_1.Game.setRendererType('offscreen');
        }
        OffscreenRenderer.initRenderWorker(width || clientWidth, height || clientHeight);
    };
    OffscreenRenderer.initRenderWorker = function (width, height) {
        worker = new Worker(WORKER_PATH, { type: 'module' });
        sendMessageToWorker('initCanvas', {
            canvas: offscreenCanvas,
            width: width,
            height: height,
            dpr: window.devicePixelRatio || 1
        }, [offscreenCanvas]);
        worker.onmessage = function (e) {
            console.log('message from the worker : ', e.data);
        };
    };
    OffscreenRenderer.style = function (obj) { sendRenderRequest('style', obj); };
    OffscreenRenderer.clear = function (color) { sendRenderRequest('clear', color); };
    OffscreenRenderer.line = function (point1, point2, obj) { sendRenderRequest('line', { point1: point1, point2: point2, obj: obj }); };
    OffscreenRenderer.rect = function (x, y, width, height, obj, noStyle) { sendRenderRequest('rect', { x: x, y: y, width: width, height: height, obj: obj, noStyle: noStyle }); };
    OffscreenRenderer.poly = function (points, obj) { sendRenderRequest('poly', { points: points, obj: obj }); };
    OffscreenRenderer.circle = function (x, y, radius, obj) { sendRenderRequest('circle', { x: x, y: y, radius: radius, obj: obj }); };
    OffscreenRenderer.point = function (x, y, obj) { sendRenderRequest('point', { x: x, y: y, obj: obj }); };
    OffscreenRenderer.rectSprite = function (x, y, width, height, texture) { sendRenderRequest('rectSprite', { x: x, y: y, width: width, height: height, texture: JSON.parse(JSON.stringify((texture))) }); };
    OffscreenRenderer.circleSprite = function (x, y, radius, texture) { sendRenderRequest('circleSprite', { x: x, y: y, radius: radius, texture: texture }); };
    OffscreenRenderer.tint = function (color, x, y, width, height) { sendRenderRequest('circle', { color: color, x: x, y: y, width: width, height: height }); };
    return OffscreenRenderer;
}());
exports.OffscreenRenderer = OffscreenRenderer;
