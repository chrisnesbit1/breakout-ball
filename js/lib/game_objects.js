class GameConstants {
    static get Colors() { return ["green", "red", "blue", "yellow", "fuchsia", "lime", "aqua"]; };
    static get TotalRows() { return 15; };
    static get TotalColumns() { return 20; };
};

class Brick {

    color = "black";
    rowNumber = 0;
    columnNumber = 0;

    constructor(color, rowNumber, columnNumber) {
        this.color = color;
        this.rowNumber = rowNumber;
        this.columnNumber = columnNumber;
    };

    GetHTML() {
        let inlineStyle = "background: "+this.color;
        return `<div class='brick' style='${inlineStyle}' data-row='${this.rowNumber}' data-column='${this.columnNumber}'></div>`;
    }
};


class Paddle {

    parentCssSelector = "";
    color = "red";
    left = 0;
    pixelWidth = 0;

    constructor(parentCssSelector, color, pixelWidth) {
        this.parentCssSelector = parentCssSelector;
        this.color = color;
        this.pixelWidth = pixelWidth;
        this.Render({startCentered: true});
    }

    Render(args) {
        this.left = args.startCentered ? parseInt((visualViewport.width / 2) - (this.pixelWidth/2)) : 0;
        let paddle = document.createElement('div');
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

    cssContainerSelector = "blue";
    color = "blue";
    top = 0;
    left = 0;
    pixelDiameter = 0;

    constructor(cssContainerSelector, color, top, left, pixelDiameter) {
        this.cssContainerSelector = cssContainerSelector;
        this.color = color;
        this.pixelDiameter = pixelDiameter;
        this.top = top;
        this.left = left - (pixelDiameter/2);
        this.Render();
    }

    Render() {
        let ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.top = this.top+'px';
        ball.style.left = this.left+'px';
        ball.style.background = this.color;
        ball.style.height = this.pixelDiameter+'px';
        ball.style.width = this.pixelDiameter+'px';
        document.querySelector(this.cssContainerSelector).append(ball);
    }
}

class GameBoard {

    cssSelector = '';
    numRows = 0;
    numColumns = 0; 
    numBrickRows = 0;
    numBrickColumns = 0; 
    bricks = [];

    constructor(cssSelector, numRows, numColumns, numBrickRows, numBrickColumns) {
        this.cssSelector = cssSelector;
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.numBrickRows = numBrickRows;
        this.numBrickColumns = numBrickColumns;
        console.log("brick rows:", numBrickRows, "brick columns:", numBrickColumns);
        this.Render();
    };

    Render() {
        for (let r = GameConstants.TotalRows; r > 0; r--) {
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('board-row');
            rowDiv.classList.add(`row-${r}`);
            document.querySelector(this.cssSelector).append(rowDiv);
            for (let c = 0; c < GameConstants.TotalColumns; c++) {
                const curBrickRow = r-4;
                if (curBrickRow >= this.numBrickRows || r < 4) {
                    continue;
                }

                let brickHTML = '';
                const brickColumnPadding = (GameConstants.TotalColumns - this.numBrickColumns) / 2;
                if (brickColumnPadding <= c && c < GameConstants.TotalColumns - brickColumnPadding) {
                    let brick = new Brick(Random.Color(), r, c);
                    this.bricks.push(brick);
                    brickHTML = brick.GetHTML();
                }

                let tileDiv = document.createElement('div');
                tileDiv.classList.add('tile');
                tileDiv.innerHTML = brickHTML;
                document.querySelector('.board-row.row-'+r).append(tileDiv);
            }
        }
    };

    GetCssSelector() {
        return this.cssSelector;
    }
};

class Game {

    static get enumStatus() {
        return {
            notStarted:'notStarted', 
            inProgress:'inProgress', 
            paused:'paused', 
            over:'over'
        };
    };

    status = undefined;
    board = {};
    paddle = {};
    ball = {};

    constructor() {
        this.status = Game.enumStatus.notStarted;
        
        var numBrickRows = Random.Number(Math.ceil(GameConstants.TotalRows/3), Math.ceil((GameConstants.TotalRows/3)*2));
        var numBrickColumns = Random.Number(Math.ceil(GameConstants.TotalColumns/3), GameConstants.TotalColumns);
        if ((GameConstants.TotalColumns%2 == 0 && numBrickColumns%2 != 0) || (GameConstants.TotalColumns%2 != 0 && numBrickColumns%2 == 0)) {
            //for an even number of available columns, generate an even number of brick columns.
            //for an odd number of available columns, generate an odd number of brick columns.
            numBrickColumns--;
        }

        this.board = new GameBoard('.board', GameConstants.TotalRows, GameConstants.TotalColumns, numBrickRows, numBrickColumns);
    };

    Start() {
        const paddleWidth = 100;
        const paddleColor = Random.Color();
        this.paddle = new Paddle('.board-row.row-1', paddleColor, paddleWidth);

        const ballDiameter = document.getElementsByClassName('row-1')[0].offsetHeight / 2;
        const ballTop =  document.getElementsByClassName('row-1')[0].offsetTop - ballDiameter;
        const ballLeft =  this.paddle.GetLeft() + (paddleWidth/2);
        const cssContainerSelector = this.board.GetCssSelector();
        let ballColor = Random.Color();
        while (ballColor == paddleColor) {
            ballColor = Random.Color();
        }
        this.ball = new Ball(cssContainerSelector, ballColor, ballTop, ballLeft, ballDiameter);
        //this.ball.Bounce();
        this.status = Game.enumStatus.inProgress;
    };
    Pause() {
        this.status = Game.enumStatus.paused;
    };
    UnPause() {
        this.status = Game.enumStatus.inProgress;
    };
    End() {
        this.status = Game.enumStatus.over;
    };
};
