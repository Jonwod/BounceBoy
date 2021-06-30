import {Ball} from "./ball.js";

export class Controller {
    private myBall: Ball;
    private horizontalInput: number = 0;
    private horizontalAccel = 500;

    constructor(ball: Ball) {
        this.myBall = ball;
        document.addEventListener("keydown", e => this.keyDown(e));
        document.addEventListener("keyup", e => this.keyDown(e));
    }

    private keyDown(e) {
        this.horizontalInput = 0;
        if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
            this.horizontalInput += 1;       
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
            this.horizontalInput -= 1;
        }
    }

    private keyUp(e) {
        if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d"
           || e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
            this.horizontalInput = 0;
        }
    }

    update(dt) {
        this.myBall.velocity.x += this.horizontalInput * this.horizontalAccel * dt;
    }
}