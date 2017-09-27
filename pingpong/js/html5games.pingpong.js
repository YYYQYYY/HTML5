/**
 * Created by yuqy on 2017/9/24.
 */
var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
};

var pingpong = {
    scoreA: 0,
    scoreB: 0
};

pingpong.pressedKeys = [];

pingpong.ball = {
    speed: 5,
    diameter: 10,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
};

pingpong.playground = {
    H: 200,
    W: 400
};

$(function () {
    pingpong.playground.H = parseInt($("#playground").height());
    pingpong.playground.W = parseInt($("#playground").width());

    pingpong.timer = setInterval(gameLoop, 30);

    $(document).keydown(function (e) {
        pingpong.pressedKeys[e.which] = true;
    });
    $(document).keyup(function (e) {
        pingpong.pressedKeys[e.which] = false;
    });
});

function gameLoop() {
    if (pingpong.scoreA >= 10 || pingpong.scoreB >= 10) {
        clearInterval(pingpong.timer);
        pingpong.pressedKeys = [];
        var msg = pingpong.scoreA >= 10 ? "playerA is win." : "playerA is win.";
        alert(msg);
    }
    moveBall();
    movePaddles();
}

function moveBall() {
    var ball = pingpong.ball;

    // 检测底边
    if (ball.y + ball.speed * ball.directionY >= pingpong.playground.H - pingpong.ball.diameter) {
        ball.directionY = -1;
    }
    // 检测顶边
    if (ball.y + ball.speed * ball.directionY < 0) {
        ball.directionY = 1;
    }
    // 检测右边
    if (ball.x + ball.speed * ball.directionX >= pingpong.playground.W - pingpong.ball.diameter) {
        ball.x = 250;
        ball.y = 100;
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);
        setBall(ball.x, ball.y);
        ball.directionX = -1;
    }
    // 检测左边
    if (ball.x + ball.speed * ball.directionX < 0) {
        ball.x = 150;
        ball.y = 100;
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);
        setBall(ball.x, ball.y);
        ball.directionX = 1;
    }

    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    // 检测左边球拍
    var paddleAx = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAyBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAyTop = parseInt($("#paddleA").css("top"));

    if (ball.x + ball.speed * ball.directionX < paddleAx) {
        if (ball.y + ball.speed * ball.directionY <= paddleAyBottom &&
            ball.y + ball.speed * ball.directionY >= paddleAyTop) {
            ball.directionX = 1;
        }
    }

    // 检测右边球拍
    var paddleBx = parseInt($("#paddleB").css("left")) - pingpong.ball.diameter;
    var paddleByBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleByTop = parseInt($("#paddleB").css("top"));

    if (ball.x + ball.speed * ball.directionX >= paddleBx) {
        if (ball.y + ball.speed * ball.directionY <= paddleByBottom &&
            ball.y + ball.speed * ball.directionY >= paddleByTop) {
            ball.directionX = -1;
        }
    }

    // 根据速度与方向移动
    setBall(ball.x, ball.y);

    // 判断得分与重围
    restart(paddleAx, paddleBx);
}

function restart(paddleAx, paddleBx) {
    var ball = pingpong.ball;

    if (ball.x > paddleBx + ball.diameter) {
        ball.x = 250;
        ball.y = 100;
        setBall(ball.x, ball.y);
        ball.directionX = -1;
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);

        pingpong.pressedKeys = [];
        //alert("play A goal, press to continue");
        //for (var i = 100000000 - 1; i >= 0; i--);
    }
    if (ball.x < paddleAx - ball.diameter) {
        ball.x = 250;
        ball.y = 100;
        setBall(ball.x, ball.y);
        ball.directionX = 1;
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);

        pingpong.pressedKeys = [];
        //alert("play B goal, press to continue");
        //for (var i = 100000000 - 1; i >= 0; i--);
    }
}

function setBall(x, y) {
    $("#ball").css({
        "left": x,
        "top": y
    });
}

function movePaddles() {
    if (pingpong.pressedKeys[KEY.UP]) {
        var topBu = parseInt($("#paddleB").css("top"));
        if (topBu >= 0) {
            $("#paddleB").css("top", topBu - 5);
        }
    }
    if (pingpong.pressedKeys[KEY.DOWN]) {
        var topBd = parseInt($("#paddleB").css("top"));
        if (topBd <= pingpong.playground.H - parseInt($("#paddleB").css("height"))) {
            $("#paddleB").css("top", topBd + 5);
        }
    }
    if (pingpong.pressedKeys[KEY.W]) {
        var topAu = parseInt($("#paddleA").css("top"));
        if (topAu >= 0) {
            $("#paddleA").css("top", topAu - 5);
        }
    }
    if (pingpong.pressedKeys[KEY.S]) {
        var topAd = parseInt($("#paddleA").css("top"));
        if (topAd <= pingpong.playground.H - parseInt($("#paddleA").css("height"))) {
            $("#paddleA").css("top", topAd + 5);
        }
    }
}
