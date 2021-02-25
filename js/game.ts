class GameConstants {
    static get Colors() { return ["green", "red", "blue", "yellow", "fuchsia", "lime", "aqua"]; };
    static get TotalRows() { return 15; };
    static get TotalColumns() { return 20; };
};

class Brick {

    color: string = "black";
    rowNumber: number  = 0;
    columnNumber: number  = 0;

    constructor(color: string, rowNumber: number , columnNumber: number ) {
        this.color = color;
        this.rowNumber = rowNumber;
        this.columnNumber = columnNumber;
    };

    GetHTML() {
        const inlineStyle: string = "background: "+this.color;
        return `<div class='brick' style='${inlineStyle}' data-row='${this.rowNumber}' data-column='${this.columnNumber}'></div>`;
    };

    GetHTMLDivElement() {
        const brickDiv: HTMLDivElement = document.createElement('div');
        brickDiv.classList.add('brick');
        brickDiv.style.background = this.color;
        brickDiv.setAttribute('data-row', this.rowNumber.toString());
        brickDiv.setAttribute('data-colmn', this.columnNumber.toString());
        return brickDiv;
    };
};

class Paddle {

    parentCssSelector: string = "";
    color: string = "red";
    left: number = 0;
    pixelWidth: number = 0;

    constructor(parentCssSelector: string, color: string, pixelWidth: number) {
        this.parentCssSelector = parentCssSelector;
        this.color = color;
        this.pixelWidth = pixelWidth;
        this.Render(true);
    }

    Render(startCentered: boolean) {
        this.left = startCentered ? Math.floor((visualViewport.width / 2) - (this.pixelWidth/2)) : 0;
        const paddle = document.createElement('div');
        paddle.classList.add('paddle');
        paddle.style.left = this.left+'px';
        paddle.style.background = this.color;
        paddle.style.width = this.pixelWidth+'px';
        document.querySelector(this.parentCssSelector).append(paddle);
    }

    GetLeft() {
        return this.left;
    }
    GetWidth() {
        return this.pixelWidth;
    }
}

class Ball {

    cssContainerSelector: string = "blue";
    color: string = "blue";
    top: number = 0;
    left: number = 0;
    pixelDiameter: number = 0;

    constructor(cssContainerSelector: string, color: string, top: number, left: number, pixelDiameter: number) {
        this.cssContainerSelector = cssContainerSelector;
        this.color = color;
        this.pixelDiameter = pixelDiameter;
        this.top = top;
        this.left = Math.floor(left - (pixelDiameter/2));
        this.Render();
    }

    Render() {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.top = this.top+'px';
        ball.style.left = this.left+'px';
        ball.style.background = this.color;
        ball.style.height = this.pixelDiameter+'px';
        ball.style.width = this.pixelDiameter+'px';
        document.querySelector(this.cssContainerSelector).append(ball);
    }
}
