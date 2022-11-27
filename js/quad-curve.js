import { Point } from "./point.js";
import { Line } from "./line.js";

export class QuadCurve{
    constructor(sx,sy,ex,ey,cpx,cpy,resolution,color){
        this.start = new Point(sx,sy);
        this.end = new Point(ex,ey);
        this.control_point1 = new Point(cpx,cpy);
        this.resolution = resolution || 0.1;
        this.color = color || 'white';
        this.points = [];
        this.lines = [];
        this.findPoints();
    }
    lerp(min,max,t){
        return (min + (max-min)* t);
    }
    findPoints(){
        this.s = new Point(this.start.x, this.start.y,5,'black');

        for(let t = 0; t <= 1.0000001; t+= this.resolution){
            const x1 = this.lerp(this.start.x, this.control_point1.x, t);
            const y1 = this.lerp(this.start.y, this.control_point1.y, t);
            const x2 = this.lerp(this.control_point1.x, this.end.x, t);
            const y2 = this.lerp(this.control_point1.y, this.end.y, t);

            const x = this.lerp(x1,x2, t);
            const y = this.lerp(y1,y2, t);
            const new_point = new Point(x,y,2,'black');
            this.points.push(new_point);

            const line = new Line(this.s.x, this.s.y, x, y, this.color);
            this.lines.push(line);
           
            this.s.x = x;
            this.s.y = y;
        }
    }
    render(ctx){
        if(!this.lines[0]){
            throw new Error('Must use findPoints() before lines can be rendered');
        }else{
            for(let i = 0; i < this.lines.length; i++){
                const line = this.lines[i];
                line.render(ctx);
            }
        }
    }
    renderPoints(ctx){
        if(!this.points[0]){
            throw new Error('Must use findPoints() before lines can be rendered');
        }else{
            for(let i = 0; i < this.points.length; i++){
                const point = this.points[i];
                //point.move()
                point.render(ctx);
            }
        }
    }     
}