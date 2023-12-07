import { scale, drawCell } from './utils.js';

export class Fruit {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    pickLocation() {
        this.x = Math.floor(Math.random() * 32);
        this.y = Math.floor(Math.random() * 32);
    }

    draw(context) {
        drawCell(context, this.x, this.y);
    }
}
