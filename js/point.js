import { TWO_PI, random } from "./utilities.js";

export class Point{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius || 0;
        this.color = color || 'black';;
    }
    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fill();
    }
}