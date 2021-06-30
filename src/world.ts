import {Ball} from "./ball.js";
import { StaticEnvironment } from "./staticEnvironment.js";
import { SweepResult } from "./collision.js";
import { Vec2 } from "./vec2.js";
export {draw, update, constants, sweepCircle};

const constants = {
    g: 1000
}

let ball = new Ball(20, new Vec2(200, 100));
let env = new StaticEnvironment(460);

function update(dt) {
    ball.update(dt);
}

function draw(canvas) {
    env.draw(canvas);
    ball.draw(canvas);
}

/**
 * Test collision of circle linear move against the world
 * @param start Start position of circle
 * @param end Desired end position of circle
 * @param radius Radius of circle
 * @return distance is the distance that the circle can be moved without colliding
 *          collision is true if there was a collision
 */
function sweepCircle(radius: number, start: Vec2, end: Vec2): SweepResult {
    return env.sweepCircle(radius, start, end);
}