import { NodeConnection } from "./node-connection.js";
import { NumberNode } from "./number-node.js";
import { DPI } from "./utilities.js";

export class CollatzGraph{
    constructor(x,y,w,h,num){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.center = {x: this.width*0.5, y: this.height*0.5};
        this.number = num || 1;
        this.node_size = 20 * DPI;
        this.sequence = [];
        this.nodes = [];
        this.path = [];
        this.connections = [];
        this.largest_number = 0;
        this.animation_path = [];
    }
    collatz(n){
        if(n % 2 === 0){
            return n/2;
        }else{
            return n * 3 + 1;
        }
    }
    setSequence(){
        const sequence = [];
        let n = this.number;
        do{
            n = this.collatz(n);
            sequence.push(n);
        } while(n != 1);
        this.sequence = sequence;
        this.sequence.unshift(this.number)
        console.log('sequence', this.sequence)
    }
    connectPath(){
        for(let i = 1; i < this.path.length; i++){
            const start_node = this.path[i-1];
            const end_node = this.path[i];
            const connection = new NodeConnection(start_node,end_node);
            this.connections.push(connection);
        }
    }
    findPath(){
        for(let i = 0; i < this.sequence.length; i++){
            const seq_number = this.sequence[i];
            const node = this.nodes[seq_number - 1];
            this.path.push(node);
        }
        
    }
    getLargestNumber(){
        return this.sequence.reduce((acc,current)=> Math.max(acc,current));
    }
    setNodes(){
        const largest = this.getLargestNumber();
        console.log(largest)
        for(let i = 0; i < largest; i++){
            const radius = (this.width/largest)/2;
            const x = this.center.x + ((radius*2)*i) - (largest*radius) + radius;
            const y = this.center.y;
            const node = new NumberNode(x, y, radius, i+1);
            this.nodes.push(node);
        }
    }
    createAnimationPath(){
        this.connections.forEach( connection => {
            connection.curve.points.forEach( point => {
                this.animation_path.push(point);
            })
        })
    }
    renderNodes(ctx){
        for(let i = 0; i < this.nodes.length; i++){
            const node = this.nodes[i];
            if(node.radius > 1){
                node.render(ctx);
            }
        }  
    }
    renderConnections(ctx){
        for(let i = 0; i < this.connections.length; i++){
            const connection = this.connections[i];
            connection.render(ctx);
        }
    }
    initialize(){
        this.setSequence();
        this.largest_number = this.getLargestNumber();
        this.setNodes();
        this.findPath();
        this.connectPath();
        this.createAnimationPath();
    }
    show(ctx){
        this.renderConnections(ctx);
        this.renderNodes(ctx);
        
    }
}