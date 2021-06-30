import {update, draw} from "./world.js";
let canvas = <HTMLCanvasElement>document.getElementById("mainCanvas");
let context = canvas.getContext("2d");

let last_t = 0;

function loop(t) {
    let dt = t - last_t;
    update(dt / 1000.0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(canvas);
    last_t = t;
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
