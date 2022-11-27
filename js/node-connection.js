import { Point } from "./point.js";
import { QuadCurve } from "./quad-curve.js";
import { TWO_PI, scale } from "./utilities.js";

export class NodeConnection{
    constructor(start_node,end_node){
        this.start_node = start_node;
        this.end_node = end_node;
        this.dx = this.start_node.position.x - this.end_node.position.x;
        this.dy = this.start_node.position.y - this.end_node.position.y;
        this.distance = Math.hypot(this.dx,this.dy);
        this.distanceSquared = Math.sqrt(this.distance);
        this.vertical_direction = this.start_node.number < this.end_node.number ? -1:1;
        this.color = this.start_node.number < this.end_node.number ? `hsl(180 100% 50%)`:`hsl(120 100% 50%)`;
        this.lineWidth = 2;
        this.node_size = this.start_node.radius;
        this.control_point = new Point(
            this.start_node.position.x - (this.distance/2) * this.vertical_direction,
            this.start_node.position.y - ((this.distance/this.node_size) + (this.distanceSquared * 12 * devicePixelRatio)) * this.vertical_direction,
            5,
            'yellow'
        )
        this.curve = new QuadCurve(
            this.start_node.position.x, this.start_node.position.y,
            this.end_node.position.x, this.end_node.position.y,
            this.control_point.x, this.control_point.y,
            0.01,
            this.color);
    }
    renderBezierCurve(ctx){
        const cp1 = {
            x: this.start_node.position.x,
            y: this.start_node.position.y - ((this.distance/this.node_size) + (this.distanceSquared * 4 * devicePixelRatio)) * this.vertical_direction
        };
        const cp2 = {
            x: this.end_node.position.x,
            y: this.end_node.position.y - ((this.distance/this.node_size) + (this.distanceSquared * 4 * devicePixelRatio)) * this.vertical_direction
        };
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.start_node.position.x, this.start_node.position.y - (this.node_size*.75) * this.vertical_direction);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, this.end_node.position.x, this.end_node.position.y - (this.node_size*.75) * this.vertical_direction);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(cp1.x, cp1.y, 2, 0, TWO_PI);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(cp2.x, cp2.y, 2, 0, TWO_PI);
        ctx.fill();
    }
    render(ctx){
        this.curve.render(ctx);
        // this.control_point.render(ctx);
    }
}