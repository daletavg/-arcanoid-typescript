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
    public color: string;
    public id: string;
    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public static alpha = Math.PI * 55 / 180;
    public constructor() {
        this.x = 50;
        this.y = 150;
    }

    public SetSettings(id: string, color: string, x: number, y: number, width: number, height: number):void {
        this.color = color;
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    public Draw(): void {
        $('body').append("<div style='background:" + this.color + ";' id='" + this.id + "'><\div");
        $("#" + this.id).css({ "position": "absolute", "left": this.x + "px", "top": this.y + "px", "width": this.width + "px", "height": this.height + "px" });
        
    }
    public Hide(): void {
        $("#" + this.id).css({ "display": "none" });
        this.id = "none";
    }
    

}
class Player extends Obj {
    
    
}
class GamePoly {
    private static array_game_blocks: GameBlock[][]= [];
    private ball: Ball = new Ball();
    private timer_ball: number;

    constructor() {
       this.SetBlocks();
       this.ball.SetCheck(this.ChekCubes);
       this.timer_ball = setInterval(() => this.ball.InitBall(this.ball), 10);
       this.ball.SetTimer(this.timer_ball);
    }
    private SetBlocks(): void {
        var counter = 0;
        for (var i = 0; i < 5; i++) {
            var tmp_array: GameBlock[] = [];
            for (var j = 0; j < 7; j++) {
                if (counter == 0) {
                    var tmp_block = new GameBlock();
                    tmp_block.SetSettings("cube" + counter, "purple", 10, 20, 50, 10);
                    tmp_block.Draw();
                    tmp_array.push(tmp_block)
                }
                else if (i > 0) {
                    var tmp_block = new GameBlock();
                    tmp_block.SetSettings("cube" + counter, "purple", 10 + (55 * j), 20 + (25 * i), 50, 10);
                    tmp_block.Draw();
                    tmp_array.push(tmp_block)
                }
                else {
                    var tmp_block = new GameBlock();
                    tmp_block.SetSettings("cube" + counter, "purple", 10 + (55 * j), 20, 50, 10);
                    tmp_block.Draw();
                    tmp_array.push(tmp_block)
                }
                counter++;
            }
            GamePoly.array_game_blocks.push(tmp_array);
            tmp_array = [];
        }

    }
    private ChekCubes(x: number, y: number) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 7; j++) {
                GamePoly.array_game_blocks[i][j].CheckCube(x, y);
            }
        }
    }
    //public ChekWin(): void {
    //    if (cub.checkWin()) {
    //        $("#dialog").dialog({
    //            modal: true, buttons: {
    //                Заново: function () {
    //                    location.reload();

    //                },
    //                Выйти: function () {

    //                    window.close();
    //                }
    //            }
    //        });
    //        clearInterval(timer);
    //    }
    //}
    
}
class GameBlock extends Obj {

    constructor() {
        super();
    }
    public CheckCube(x: number, y: number):void {   
        if (this.id != "none") {
            if ((x >= this.x-10 && x <= this.x + this.width+10) && (y >= this.y-10 && y <= this.y + this.height+10)) {
                this.Hide();
                if (x <= this.x || x >= this.x + this.width) {
                    Obj.alpha = Math.PI - Obj.alpha;
                }
                else if (y <= this.y + this.height - 10 || y >= this.y ) {
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

    private chekcollision: Function;
    private timer: number;
    constructor() {
        super(); 

    }
    public SetTimer(timer: number):void {
        this.timer = timer;
    }

    public SetCheck(operation: (a: number, b: number) => void): void {
        this.chekcollision = operation
    }

    public InitBall(ball: Ball): void {
        if (ball.x <= 0 || ball.x >= 385) {
            Obj.alpha = Math.PI - Obj.alpha;
        }
        if (ball.y <= 0) {
            Obj.alpha = -Obj.alpha ;
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
            clearInterval(this.timer);
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


        ball.x += 3 * Math.cos(Obj.alpha );
        ball.y += 3 * Math.sin(Obj.alpha );
        document.getElementById("ball").style.top = ball.y + "px";
        document.getElementById("ball").style.left = ball.x + "px";
    }
}



window.onload = () => {
    var games = new GamePoly();
    
};