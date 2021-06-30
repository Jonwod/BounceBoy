import { Vec2 } from "./vec2.js";
import { SweepResult } from "./collision.js";

export {StaticEnvironment};

class StaticEnvironment{
    bedrockLevel: number;

    constructor(bedrockLevel) {
        this.bedrockLevel = bedrockLevel;
    }

    draw(canvas) {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "#5A7775";
        ctx.beginPath();
        ctx.rect(0, this.bedrockLevel, canvas.width, canvas.height - this.bedrockLevel);
        ctx.fill();
    }

    sweepCircle(radius: number, start: Vec2, end: Vec2): SweepResult {
        if(end.y > this.bedrockLevel) {
            const blockedEnd = new Vec2(end.x, this.bedrockLevel);
            const d = start.distance(blockedEnd);
            return {distance: d, collision: true};
        }
        return {distance: start.subtract(end).length(), collision: false};
    }
}
