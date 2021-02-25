var GameConstants = /** @class */ (function () {
    function GameConstants() {
    }
    Object.defineProperty(GameConstants, "Colors", {
        get: function () { return ["green", "red", "blue", "yellow", "fuchsia", "lime", "aqua"]; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(GameConstants, "TotalRows", {
        get: function () { return 15; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(GameConstants, "TotalColumns", {
        get: function () { return 20; },
        enumerable: false,
        configurable: true
    });
    ;
    return GameConstants;
}());
;
var Brick = /** @class */ (function () {
    function Brick(color, rowNumber, columnNumber) {
        this.color = "black";
        this.rowNumber = 0;
        this.columnNumber = 0;
        this.color = color;
        this.rowNumber = rowNumber;
        this.columnNumber = columnNumber;
    }
    ;
    Brick.prototype.GetHTML = function () {
        var inlineStyle = "background: " + this.color;
        return "<div class='brick' style='" + inlineStyle + "' data-row='" + this.rowNumber + "' data-column='" + this.columnNumber + "'></div>";
    };
    ;
    Brick.prototype.GetHTMLDivElement = function () {
        var brickDiv = document.createElement('div');
        brickDiv.classList.add('brick');
        brickDiv.style.background = this.color;
        brickDiv.setAttribute('data-row', this.rowNumber.toString());
        brickDiv.setAttribute('data-colmn', this.columnNumber.toString());
        return brickDiv;
    };
    ;
    return Brick;
}());
;
var Paddle = /** @class */ (function () {
    function Paddle(parentCssSelector, color, pixelWidth) {
        this.parentCssSelector = "";
        this.color = "red";
        this.left = 0;
        this.pixelWidth = 0;
        this.parentCssSelector = parentCssSelector;
        this.color = color;
        this.pixelWidth = pixelWidth;
        this.Render(true);
    }
    Paddle.prototype.Render = function (startCentered) {
        this.left = startCentered ? Math.floor((visualViewport.width / 2) - (this.pixelWidth / 2)) : 0;
        var paddle = document.createElement('div');
        paddle.classList.add('paddle');
        paddle.style.left = this.left + 'px';
        paddle.style.background = this.color;
        paddle.style.width = this.pixelWidth + 'px';
        document.querySelector(this.parentCssSelector).append(paddle);
    };
    Paddle.prototype.GetLeft = function () {
        return this.left;
    };
    Paddle.prototype.GetWidth = function () {
        return this.pixelWidth;
    };
    return Paddle;
}());
var Ball = /** @class */ (function () {
    function Ball(cssContainerSelector, color, top, left, pixelDiameter) {
        this.cssContainerSelector = "blue";
        this.color = "blue";
        this.top = 0;
        this.left = 0;
        this.pixelDiameter = 0;
        this.cssContainerSelector = cssContainerSelector;
        this.color = color;
        this.pixelDiameter = pixelDiameter;
        this.top = top;
        this.left = Math.floor(left - (pixelDiameter / 2));
        this.Render();
    }
    Ball.prototype.Render = function () {
        var ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.top = this.top + 'px';
        ball.style.left = this.left + 'px';
        ball.style.background = this.color;
        ball.style.height = this.pixelDiameter + 'px';
        ball.style.width = this.pixelDiameter + 'px';
        document.querySelector(this.cssContainerSelector).append(ball);
    };
    return Ball;
}());
