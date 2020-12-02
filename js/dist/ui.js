var UiConstants = /** @class */ (function () {
    function UiConstants() {
    }
    Object.defineProperty(UiConstants, "Colors", {
        get: function () { return ["green", "red", "blue", "yellow", "fuchsia", "lime", "aqua"]; },
        enumerable: false,
        configurable: true
    });
    ;
    return UiConstants;
}());
var Random = /** @class */ (function () {
    function Random() {
    }
    Random.Number = function (random_min, random_max) {
        return Math.floor(Math.random() * (random_max - random_min + 1)) + random_min;
    };
    Random.Color = function () {
        return UiConstants.Colors[Random.Number(0, UiConstants.Colors.length - 1)];
    };
    return Random;
}());
var Modal = /** @class */ (function () {
    function Modal(cssSelector, showCallback, hideCallback) {
        this.cssSelector = '.modal';
        this.cssSelector = cssSelector;
        this.showCallback = showCallback;
        this.hideCallback = hideCallback;
    }
    ;
    Modal.prototype.Show = function () {
        document.querySelector(this.cssSelector).style.display = 'block';
        this.showCallback();
    };
    ;
    Modal.prototype.Hide = function () {
        document.querySelector(this.cssSelector).style.display = 'none';
        this.hideCallback();
    };
    ;
    Modal.prototype.IsVisible = function () {
        return document.querySelector(this.cssSelector).style.display != 'none';
    };
    return Modal;
}());
;
