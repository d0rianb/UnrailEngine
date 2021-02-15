"use strict";
// Dorian&Co © 2021
exports.__esModule = true;
exports.GameEnvironement = void 0;
var Env = /** @class */ (function () {
    function Env(width, height) {
        this.width = width;
        this.height = height;
    }
    Env.prototype.update = function () { };
    Env.prototype.render = function (ctx) { };
    return Env;
}());
exports.GameEnvironement = Env;
