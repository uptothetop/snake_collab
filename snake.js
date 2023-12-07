import { scale, drawCell } from './utils.js';

export class Snake {
    constructor() {
        this.speedX = 1;
        this.speedY = 0;
        this.tail = [{ x: 10, y: 10 }];
    }

    reset() {
        this.tail = [{ x: 10, y: 10 }];
        this.speedX = 1;
        this.speedY = 0;
    }

    draw(context) {
        this.tail.forEach(({ x, y }) => drawCell(context, x, y));
    }

    update() {
        let { x, y } = this.tail[this.tail.length - 1]; // Get the last segment of the tail, which is the head
        x += this.speedX;
        y += this.speedY;
        this.tail.push({ x, y }); // Push the new head to the tail
    }

    removeTail() {
        if (this.tail.length > 1) {
            this.tail.shift();
        }
    }

    changeDirection(direction) {
        /* The previous code stays the same */
    }

    grow() {
        // The grow method is no longer needed because we are growing the tail inside the update method
    }

    eat(fruit) {
        let { x, y } = this.tail[this.tail.length - 1]; // Get the head coordinates
        return x === fruit.x && y === fruit.y;
    }

    checkBoundary(canvas) {
        let { x, y } = this.tail[this.tail.length - 1]; // Get the head coordinates
        if (x < 0 || x >= canvas.width / scale) {
            return false;
        }
        if (y < 0 || y >= canvas.height / scale) {
            return false;
        }
        return true;
    }

    collideWithTail() {
        let head = this.tail[this.tail.length - 1]; // Get the head coordinates
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.tail[i].x === head.x && this.tail[i].y === head.y) {
                return true;
            }
        }
        return false;
    }
}
