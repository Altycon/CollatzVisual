import { TWO_PI } from "./utilities.js";

export class NumberNode{
    constructor(x,y,radius,num,color){
        this.position = {x: x, y: y};
        this.radius = radius || 10;
        this.number = num || 1;
        this.color = color || 'hsl(0 0% 90%)';
        this.connections = 0;
    }
    render(ctx){
        ctx.font = `${this.radius}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, TWO_PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.fillText(`${this.number}`, this.position.x, this.position.y + (this.radius * 0.33));
    }
}