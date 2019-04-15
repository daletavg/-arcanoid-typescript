/// <reference path="Scripts/typings/jquery/jquery.d.ts"/>
//class Greeter {
//    element: HTMLElement;
//    span: HTMLElement;
//    timerToken: number;
//    constructor(element: HTMLElement) {
//        this.element = element;
//        this.element.innerHTML += "The time is: ";
//        this.span = document.createElement('span');
//        this.element.appendChild(this.span);
//        this.span.innerText = new Date().toUTCString();
//    }
//    start() {
//        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
//    }
//    stop() {
//        clearTimeout(this.timerToken);
//    }
//}
class Obj {
    constructor() {
        this.x = 50;
        this.y = 150;
    }
    SetSettings(id, color, x, y, width, height) {
        this.color = color;
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Draw() {
        $('body').append("<div style='background:" + this.color + ";' id='" + this.id + "'><\div");
        $("#" + this.id).css({ "position": "absolute", "left": this.x + "px", "top": this.y + "px", "width": this.width + "px", "height": this.height + "px" });
    }
    Hide() {
        $("#" + this.id).css({ "display": "none" });
        this.id = "none";
    }
}
Obj.alpha = Math.PI * 55 / 180;
class Player extends Obj {
}
class GamePoly {
    constructor() {
        this.ball = new Ball();
        this.SetBlocks();
        this.ball.SetCheck(this.ChekCubes);
        this.timer_ball = setInterval(() => this.ball.InitBall(this.ball), 10);
        this.ball.SetTimer(this.timer_ball);
    }
    SetBlocks() {
        var counter = 0;
        for (var i = 0; i < 5; i++) {
            var tmp_array = [];
            for (var j = 0; j < 7; j++) {
                if (counter == 0) {
                    var tmp_block = new GameBlock();
                    tmp_block.SetSettings("cube" + counter, "purple", 10, 20, 50, 10);
                    tmp_block.Draw();
                    tmp_array.push(tmp_block);
                }
                else if (i > 0) {
                    var tmp_block = new GameBlock();
                    tmp_block.SetSettings("cube" + counter, "purple", 10 + (55 * j), 20 + (25 * i), 50, 10);
                    tmp_block.Draw();
                    tmp_array.push(tmp_block);
                }
                else {
                    var tmp_block = new GameBlock();
                    tmp_block.SetSettings("cube" + counter, "purple", 10 + (55 * j), 20, 50, 10);
                    tmp_block.Draw();
                    tmp_array.push(tmp_block);
                }
                counter++;
            }
            GamePoly.array_game_blocks.push(tmp_array);
            tmp_array = [];
        }
    }
    ChekCubes(x, y) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 7; j++) {
                GamePoly.array_game_blocks[i][j].CheckCube(x, y);
            }
        }
    }
}
GamePoly.array_game_blocks = [];
class GameBlock extends Obj {
    constructor() {
        super();
    }
    CheckCube(x, y) {
        if (this.id != "none") {
            if ((x >= this.x - 10 && x <= this.x + this.width + 10) && (y >= this.y - 10 && y <= this.y + this.height + 10)) {
                this.Hide();
                if (x <= this.x || x >= this.x + this.width) {
                    Obj.alpha = Math.PI - Obj.alpha;
                }
                else if (y <= this.y + this.height - 10 || y >= this.y) {
                    Obj.alpha = -Obj.alpha;
                }
                else {
                    Obj.alpha = -Obj.alpha;
                }
                var txt = $("#scor").text();
                $("#scor").text((Number(txt) + 20));
            }
        }
    }
}
class Ball extends Obj {
    constructor() {
        super();
    }
    SetTimer(timer) {
        this.timer = timer;
    }
    SetCheck(operation) {
        this.chekcollision = operation;
    }
    InitBall(ball) {
        if (ball.x <= 0 || ball.x >= 385) {
            Obj.alpha = Math.PI - Obj.alpha;
        }
        if (ball.y <= 0) {
            Obj.alpha = -Obj.alpha;
        }
        if (ball.y >= 430) {
            //if (Math.random() == 0) {
            //    Obj.alpha = - Obj.alpha
            //}
            //else {
            //    Obj.alpha =- Obj.alpha;
            //}
            $("#dialog_loos").dialog({
                modal: true, buttons: {
                    Заново: function () {
                        location.reload();
                    },
                    Выйти: function () {
                        window.close();
                    }
                }
            });
            clearInterval(ball.timer);
        }
        ball.chekcollision(ball.x, ball.y);
        //if ((this.x >= player._x - 20 && this.x <= player._x + player._width) && (this.y >= player._y - 20 && this.y <= player._y + player._height)) {
        //    if (this.x < player._x || this.x > player._x + player._width) {
        //        Obj.alpha = Math.PI - Obj.alpha;
        //    }
        //    if (this.y <= player._y || this.y > player._y + player._height) {
        //        Obj.alpha = -Obj.alpha;
        //    }
        //
        //}
        ball.x += 3 * Math.cos(Obj.alpha);
        ball.y += 3 * Math.sin(Obj.alpha);
        document.getElementById("ball").style.top = ball.y + "px";
        document.getElementById("ball").style.left = ball.x + "px";
    }
}
window.onload = () => {
    var games = new GamePoly();
};
//# sourceMappingURL=app.js.map