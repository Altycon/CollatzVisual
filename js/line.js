export class Line{
    constructor(sx,sy,ex,ey,color){
        this.start = {x: sx, y: sy};
        this.end = {x: ex, y: ey};
        this.color = color || 'white';
        this.width = 1;
    }
    render(ctx){
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }
}