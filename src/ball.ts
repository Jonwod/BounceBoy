import {constants, sweepCircle} from "./world.js";
import {Vec2} from "./vec2.js";
export {Ball};

class Ball {
    position: Vec2;
    velocity: Vec2;
    radius: number;
    // 'air restistance' force per unit speed for x axis
    private xResistance = 1;

    constructor(radius: number, position: Vec2) {
        this.radius = radius;
        this.position = position;
        this.velocity = new Vec2(0,0);
    }

    update(deltaTime) {
        let dt = deltaTime;
        this.velocity.y += constants.g * dt;
        const restistanceDeltaV = -this.velocity.x * this.xResistance * dt;
        this.velocity.x = (Math.abs(restistanceDeltaV) > Math.abs(this.velocity.x)) 
            ? 0 : this.velocity.x + restistanceDeltaV;
        
        const itrLimit = 5;
        let itrs = 0;
        while(dt > 0  &&  ++itrs <= itrLimit) {
            dt = this.move(dt);
        }
        // console.log("used " + itrs + " itrs for ball collision");
    }

    /**
     * Applies movement update up until collision.
     * @returns The remaining unused time of the input dt, after the first collision
     */
    private move(deltaTime) {
        let dt = deltaTime;
        const end = this.position.add(this.velocity.scaled(dt));
        const result = sweepCircle(this.radius, this.position, end);
        if(result.collision) {
            const distanceToCol = result.end.subtract(this.position).length();
            const partialDt = distanceToCol / Math.abs(this.velocity.y);
            dt -= partialDt;
            this.position = result.end;
            this.velocity.y *= -1;
        } else {
            this.position = end;
            dt = 0;
        }
        return dt;
    }

    draw(canvas) {
        let context = canvas.getContext("2d");
        context.fillStyle = "#FF0000";
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }
}