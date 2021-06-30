export class Vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    scaled(scalar: number): Vec2 {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    length(): number {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    distance(other: Vec2): number {
        return this.subtract(other).length();
    }

    normalized(): Vec2 {
        const l = this.length();
        if(l == 0) {
            return new Vec2(0, 0); 
        }
        return this.scaled(1/l);
    }
}
