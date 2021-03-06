/// <reference path="Scripts\typings\jquery\jquery.d.ts"/>
//Definition of a Point
var Point = (function () {
    function Point(X, Y) {
        this.X = X;
        this.Y = Y;
    }
    return Point;
})();
//Basic 4 Directions
var Direction;
(function (Direction) {
    Direction._map = [];
    Direction._map[0] = "NORTH";
    Direction.NORTH = 0;
    Direction._map[1] = "EAST";
    Direction.EAST = 1;
    Direction._map[2] = "SOUTH";
    Direction.SOUTH = 2;
    Direction._map[3] = "WEST";
    Direction.WEST = 3;
})(Direction || (Direction = {}));
//Ant Class
var Ant = (function () {
    //Constructor for Ant
    //location
    //precision
    //orientation - Default Direction North
    //pattern for ant to move in (depending on color)
    //color for pattern movement.
    function Ant(location, precision, orientation, pattern, colorPattern, intialBackgroundColor) {
        if (typeof orientation === "undefined") { orientation = Direction.NORTH; }
        if (typeof pattern === "undefined") { pattern = 'LR'; }
        if (typeof colorPattern === "undefined") { colorPattern = 'BW'; }
        if (typeof intialBackgroundColor === "undefined") { intialBackgroundColor = 'White'; }
        this.location = location;
        this.orientation = orientation;
        this.precision = precision;
        this.pattern = pattern;
        this.colorPattern = colorPattern;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = intialBackgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    Ant.prototype.GetNextColor = //Get next color in index
    //simple single letter patterns for now.
    function (index) {
        var newColor = this.colorPattern[index];
        switch(newColor) {
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
    };
    Ant.prototype.Rotate = //Rotate based on string Left/Right
    function (c) {
        if(c === 'L') {
            this.RotateLeft();
        } else if(c === 'R') {
            this.RotateRight();
        }
    };
    Ant.prototype.RotateLeft = //Rotate left given orientation
    function () {
        //rotate 90 to left
        if(this.orientation > 0) {
            this.orientation = this.orientation - 1;
        } else {
            this.orientation = 3;
        }
    };
    Ant.prototype.RotateRight = //Rotate right given orientation
    function () {
        //rotate 90 to right
        if(this.orientation < 3) {
            this.orientation = this.orientation + 1;
        } else {
            this.orientation = 0;
        }
    };
    Ant.prototype.Move = //Move ant
    function () {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        var imgData = ctx.getImageData(this.location.X, this.location.Y, this.precision, this.precision);
        var pix = imgData.data;
        if(pix[0] == 255 && pix[1] == 255 && pix[2] == 255) {
            //White
            var index = this.colorPattern.indexOf("W", 0);
        } else if(pix[0] == 0 && pix[1] == 0 && pix[2] == 0) {
            //Black
            var index = this.colorPattern.indexOf("B", 0);
        } else if(pix[0] == 255 && pix[1] == 0 && pix[2] == 0) {
            //Red
            var index = this.colorPattern.indexOf("R", 0);
        } else if(pix[0] == 255 && pix[1] == 165 && pix[2] == 0) {
            //Orange
            var index = this.colorPattern.indexOf("O", 0);
        } else if(pix[0] == 255 && pix[1] == 255 && pix[2] == 0) {
            //Yellow
            var index = this.colorPattern.indexOf("Y", 0);
        } else if(pix[0] == 0 && pix[1] == 128 && pix[2] == 0) {
            //Green
            var index = this.colorPattern.indexOf("G", 0);
        } else if(pix[0] == 0 && pix[1] == 0 && pix[2] == 255) {
            //Blue
            var index = this.colorPattern.indexOf("U", 0);
        } else if(pix[0] == 128 && pix[1] == 0 && pix[2] == 128) {
            //Purple
            var index = this.colorPattern.indexOf("V", 0);
        }
        if(index == (this.colorPattern.length - 1)) {
            index = 0;
        } else {
            index = index + 1;
        }
        var color = this.GetNextColor(index);
        ctx.fillStyle = color;
        ctx.fillRect(this.location.X, this.location.Y, this.precision, this.precision);
        this.Rotate(this.pattern[index]);
        //move forward one unit
        switch(this.orientation) {
            case 0:
                //North
                this.location = new Point(this.location.X, this.location.Y - this.precision);
                break;
            case 1:
                //East
                this.location = new Point(this.location.X + this.precision, this.location.Y);
                break;
            case 2:
                //South
                this.location = new Point(this.location.X, this.location.Y + this.precision);
                break;
            case 3:
                //West
                this.location = new Point(this.location.X - this.precision, this.location.Y);
                break;
        }
    };
    return Ant;
})();
window.onload = function () {
    $('#btnRun').click(function () {
        var pattern = $('#txtPattern').val();
        var colorPattern = $('#txtColorPattern').val();
        var initialColor = $('#txtInitialColor').val();
        var midWidth = $('#myCanvas').width() >> 1;
        var midHeight = $('#myCanvas').height() >> 1;
        var ant = new Ant(new Point(midWidth, midHeight), 1, Direction.NORTH, pattern, colorPattern, initialColor);
        for(var i = 0; i < 11000; i++) {
            ant.Move();
        }
    });
};
//@ sourceMappingURL=app.js.map
