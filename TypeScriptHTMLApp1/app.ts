
//Definition of a Point
class Point {
    constructor(public X: number,public Y: number) {
    }
}

//Basic 4 Directions
enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

//Ant Class
class Ant{
    orientation: Direction;
    precision: number;
    pattern: string;
    colorPattern: string;

    //Constructor for Ant
    //location
    //precision
    //orientation - Default Direction North
    //pattern for ant to move in (depending on color)
    //color for pattern movement.
    constructor(public location: Point, precision: number, orientation:Direction = Direction.NORTH, pattern:string = 'LR', colorPattern = 'BW', intialBackgroundColor = 'White') {
        this.orientation = orientation;
        this.precision = precision;
        this.pattern = pattern;
        this.colorPattern = colorPattern;

        var canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = intialBackgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    //Get next color in index
    //simple single letter patterns for now.
    GetNextColor(index: number) {
        var newColor = this.colorPattern[index];

        switch (newColor) {
            case 'W':
                return "White";
            case 'B':
                return "Black";
            case 'R':
                return "Red";
            case 'O':
                return "Orange";
            case 'Y':
                return "Yellow";
            case 'G':
                return "Green";
            case 'U':
                return "Blue";
            case 'V':
                return "Purple";

        }
    }

    //Rotate based on string Left/Right
    Rotate(c: string) {
        if (c === 'L') {
            this.RotateLeft();
        }
        else if (c === 'R') {
            this.RotateRight();
        }
    }

    //Rotate left given orientation
    RotateLeft() {
        //rotate 90 to left
        if (this.orientation > 0) {
            this.orientation = this.orientation - 1;
        }
        else {
            this.orientation = 3;
        }
    }

    //Rotate right given orientation
    RotateRight() {
        //rotate 90 to right
        if (this.orientation < 3) {
            this.orientation = this.orientation + 1;
        }
        else {
            this.orientation = 0;
        }
    }

    //Move ant
    Move() {
        var canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        var imgData = ctx.getImageData(this.location.X, this.location.Y, this.precision, this.precision);
        var pix = imgData.data;


        if (pix[0] == 255 && pix[1] == 255 && pix[2] == 255) { //White
            var index = this.colorPattern.indexOf("W", 0);
        }
        else if (pix[0] == 0 && pix[1] == 0 && pix[2] == 0) {//Black
            var index = this.colorPattern.indexOf("B", 0);
        }
        else if (pix[0] == 255 && pix[1] == 0 && pix[2] == 0) {//Red
            var index = this.colorPattern.indexOf("R", 0);
        }
        else if (pix[0] == 255 && pix[1] == 165 && pix[2] == 0) {//Orange
            var index = this.colorPattern.indexOf("O", 0);
        }
        else if (pix[0] == 255 && pix[1] == 255 && pix[2] == 0) {//Yellow
            var index = this.colorPattern.indexOf("Y", 0);
        }
        else if (pix[0] == 0 && pix[1] == 128 && pix[2] == 0) {//Green
            var index = this.colorPattern.indexOf("G", 0);
        }
        else if (pix[0] == 0 && pix[1] == 0 && pix[2] == 255) {//Blue
            var index = this.colorPattern.indexOf("U", 0);
        }
        else if (pix[0] == 128 && pix[1] == 0 && pix[2] == 128) {//Purple
            var index = this.colorPattern.indexOf("V", 0);
        }


        if (index == (this.colorPattern.length - 1))
            index = 0;
        else
            index = index + 1;

        var color = this.GetNextColor(index);
        ctx.fillStyle = color;
        ctx.fillRect(this.location.X, this.location.Y, this.precision, this.precision);
        this.Rotate(this.pattern[index]);

        //move forward one unit
        switch (this.orientation) {
            case 0: //North
                this.location = new Point(this.location.X, this.location.Y - this.precision);
                break;
            case 1: //East
                this.location = new Point(this.location.X + this.precision, this.location.Y);
                break;
            case 2: //South
                this.location = new Point(this.location.X, this.location.Y + this.precision);
                break;
            case 3: //West
                this.location = new Point(this.location.X - this.precision, this.location.Y);
                break;
        }
    }
}


window.onload = () => {
    var ant = new Ant(new Point(600, 600),1, Direction.NORTH, 'LRLL', 'ROWY', 'Red');

    for (var i = 0; i < 11000; i++) {
        ant.Move();
    }
};

