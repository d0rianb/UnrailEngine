"use strict";
exports.__esModule = true;
exports.createCanvas = exports.getWindowDimensions = void 0;
function getWindowDimensions() {
    return { width: window.innerWidth, height: window.innerHeight };
}
exports.getWindowDimensions = getWindowDimensions;
function createCanvas(w, h, preventRightClick) {
    var ratio = window.devicePixelRatio || 1;
    var canvas = document.createElement('canvas');
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    if (!!preventRightClick) {
        canvas.oncontextmenu = function (e) { return e.preventDefault(); };
    }
    return canvas;
}
exports.createCanvas = createCanvas;
