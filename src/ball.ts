import {constants, sweepCircle} from "./world.js";
import {Vec2} from "./vec2.js";
export {Ball};

class Ball {
    position: Vec2;
    velocity: Vec2;
    radius: number;

    constructor(radius: number, position: Vec2) {
        this.radius = radius;
        this.position = position;
        this.velocity = new Vec2(0,0);
    }

    update(dt) {
        this.velocity.y += constants.g * dt;
        const end = this.position.add(this.velocity.scaled(dt));
        const result = sweepCircle(this.radius, this.position, end);
        if(result.collision) {
            this.velocity.y *= -1;
            const offset = end.subtract(this.position);
            this.position = this.position.add(offset.normalized().scaled(result.distance));
        } else {
            this.position = end;
        }
    }

    draw(canvas) {
        let context = canvas.getContext("2d");
        context.fillStyle = "#FF0000";
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }
}