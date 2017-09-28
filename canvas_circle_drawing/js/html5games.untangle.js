/**
 * Created by yuqy on 2017/9/27.
 */
var untangleGame = {
    circles: [],
    thinLineThickness: 1,
    lines: []
};

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function Line(startPoint, endPoint, thickness) {
    this.tartPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness;
}

function drawLine(ctx, x1, y1, x2, y2, thickness) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#cfc";
    ctx.stroke();
}

function drawCircle(ctx, x, y, radius) {
    ctx.fillStyle = "rgba(200,200,100,.9)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function connectCircles() {
    untangleGame.lines.length = 0;
    for (var li = 0; li < untangleGame.circles.length; li++) {
        var startPoint = untangleGame.circles[li];
        for (var lj = 0; lj < li; lj++) {
            var endPoint = untangleGame.circles[lj];
            untangleGame.lines.push(new Line(startPoint, endPoint, untangleGame.thinLineThickness));
        }
    }
}

function clear(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

$(function () {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

    //ctx.fillStyle = "rgba(200,200,100,.6)";
    //ctx.beginPath();
    //ctx.arc(100, 100, 50, 0, Math.PI * 2, true);
    //ctx.closePath();
    //ctx.fill();
    //ctx.beginPath();
    //ctx.arc(100, 110, 50, 0, Math.PI);
    //ctx.closePath();
    //ctx.fill();
    //
    //ctx.beginPath();
    //ctx.arc(100, 90, 50, 0, Math.PI, true);
    //ctx.closePath();
    //ctx.fill();
    //
    //ctx.beginPath();
    //ctx.arc(230, 100, 50, Math.PI / 2, Math.PI * 3 / 2);
    //ctx.closePath();
    //ctx.fill();
    //
    //ctx.beginPath();
    //ctx.arc(250, 100, 50, Math.PI * 3 / 2, Math.PI / 2);
    //ctx.closePath();
    //ctx.fill();
    //
    //ctx.beginPath();
    //ctx.arc(180, 240, 50, Math.PI * 7 / 6, Math.PI * 2 / 3);
    //ctx.closePath();
    //ctx.fill();
    //
    //ctx.beginPath();
    //ctx.arc(150, 250, 50, Math.PI * 7 / 6, Math.PI * 2 / 3, true);
    //ctx.closePath();
    //ctx.fill();
    //
    //ctx.beginPath();
    //ctx.arc(300, 250, 50, Math.PI * 3 / 2, 0, true);
    //ctx.closePath();
    //ctx.fill();

    var circleRadius = 10;//Math.random() * 10 + 1;
    var width = canvas.width;
    var height = canvas.height;

    var circlesCount = 5;
    for (var ci = 0; ci < circlesCount; ci++) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        drawCircle(ctx, x, y, circleRadius);
        untangleGame.circles.push(new Circle(x, y, circleRadius));
    }
    connectCircles();

    $("#game").mousedown(function (e) {
        var canvasPosition = $(this).offset();
        var mouseX = (e.pageX - canvasPosition.left) || 0;
        var mouseY = (e.pageY - canvasPosition.top) || 0;
        for (var i = 0; i < untangleGame.circles.length; i++) {
            var circleX = untangleGame.circles[i].x;
            var circleY = untangleGame.circles[i].y;
            var radius = untangleGame.circles[i].radius;
            if (Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2) < Math.pow(radius, 2)) {
                untangleGame.targetCircle = i;
                break;
            }
        }
    });

    $("#game").mousemove(function (e) {
        if (untangleGame.targetCircle != undefined) {
            var canvasPosition = $(this).offset();
            var mouseX = (e.pageX - canvasPosition.left) || 0;
            var mouseY = (e.pageY - canvasPosition.top) || 0;
            var radius = untangleGame.circles[untangleGame.targetCircle].radius;
            untangleGame.circles[untangleGame.targetCircle] = new Circle(mouseX, mouseY, radius);
        }
        connectCircles();
    });

    $("#game").mouseup(function (e) {
        untangleGame.targetCircle = undefined;
    });

    setInterval(gameLoop, 30);
});

function gameLoop() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

    clear(ctx, canvas);

    for (var li = 0; li < untangleGame.lines.length; li++) {
        var line = untangleGame.lines[li];
        var startPoint = line.tartPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        drawLine(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    }
    for (var ci = 0; ci < untangleGame.circles.length; ci++) {
        var circle = untangleGame.circles[ci];
        drawCircle(ctx, circle.x, circle.y, circle.radius);
    }
}
