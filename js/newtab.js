class Constants {
    static get Colors() { return ["green", "red", "blue", "yellow", "fuchsia", "lime", "aqua"]; };
    static get TotalRows() { return 15; };
    static get TotalColumns() { return 20; };
}

class Random {

    static Number(random_min, random_max) {
        return Math.floor(Math.random() * (random_max - random_min + 1)) + random_min;
    }

    static Color() {
        return Constants.Colors[Random.Number(0, Constants.Colors.length-1)];
    }
}

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
        let inlineStyle = "background: "+this.color+";background: "+this.color;
        let jsonData = {'r':this.rowNumber,'c':this.columnNumber};
        return "<div class='brick' style='"+inlineStyle+"'>"+JSON.stringify(jsonData)+"</div>";
    }
};

class GameBoard {

    numRows = 0;
    numColumns = 0; 
    numBrickRows = 0;
    numBrickColumns = 0; 
    bricks = [];

    constructor(numRows, numColumns, numBrickRows, numBrickColumns) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.numBrickRows = numBrickRows;
        this.numBrickColumns = numBrickColumns;
        console.log("brick rows:", numBrickRows, "brick columns:", numBrickColumns);
        this.Render();
    };

    Render() {
        for (let r = Constants.TotalRows-1; r > 0; r--) {
            $('.board').append("<div class='board-row row-"+r+"'></div>");
            for (let c = 0; c < Constants.TotalColumns; c++) {
                const curBrickRow = r-4;
                if (curBrickRow >= this.numBrickRows || r < 4) {
                    continue;
                }

                let brickHTML = '';
                const brickColumnPadding = (Constants.TotalColumns - this.numBrickColumns) / 2;
                if (brickColumnPadding <= c && c < Constants.TotalColumns - brickColumnPadding) {
                    const brickColor = Random.Color();
                    let brick = new Brick(brickColor, r, c);
                    this.bricks.push(brick);
                    brickHTML = brick.GetHTML();
                }
                let tileHTML = "<div class='tile'>"+brickHTML+"</div>";
                $('.board-row.row-'+r).append(tileHTML);
            }
        }
    };
};

class Game {

    constructor() {
        var numBrickRows = Random.Number(Math.ceil(Constants.TotalRows/3), Math.ceil((Constants.TotalRows/3)*2));
        var numBrickColumns = Random.Number(Math.ceil(Constants.TotalColumns/3), Constants.TotalColumns);
        if ((Constants.TotalColumns%2 == 0 && numBrickColumns%2 != 0) || (Constants.TotalColumns%2 != 0 && numBrickColumns%2 == 0)) {
            //for an even number of available columns, generate an even number of brick columns.
            //for an odd number of available columns, generate an odd number of brick columns.
            numBrickColumns--;
        }

        this.board = new GameBoard(Constants.TotalRows, Constants.TotalColumns, numBrickRows, numBrickColumns);
    };
    Start() {

    };
    End() {

    };
};

var gm = new Game();