/**
 * 
 *  My Collatz Visual
 *  Clayton McDaniel
 *  Nov 2022
 * 
 */

 import { DPI,fixCanvas } from "./utilities.js";
 import { CollatzGraph } from "./collatz-graph.js";
import { Point } from "./point.js";

 window.requestAnimationFrame = window.requestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame || 
    function(f){return setTimeout(f, 1000/60)} // simulate calling code 60 
window.cancelAnimationFrame = window.cancelAnimationFrame || 
    window.mozCancelAnimationFrame || 
    function(requestID){clearTimeout(requestID)} //fall back
const c_number_display = document.querySelector('.c-number');
const step_display = document.querySelector('.steps');
const largest_number_display = document.querySelector('.largest-number');
const path_display = document.querySelector('.path-display');
const Canvas1 = document.querySelector('.canvas1');
let cw1,ch1,ctx1;
 
let CGraph;
let CNumber = 1;
let path_point;
let len;
let interval;
let path_points;

 function init(){
    fixCanvas(Canvas1,DPI);
    cw1 = Canvas1.width;
    ch1 = Canvas1.height;
    ctx1 = Canvas1.getContext('2d');

    path_points = [];

    CGraph = new CollatzGraph(0,0, cw1, ch1, 1);
    CGraph.initialize();
    len = CGraph.animation_path.length;
    path_point = new Point(CGraph.animation_path[0].x, CGraph.animation_path[0].y,5,'red');
    c_number_display.innerText = CNumber.toString();
    step_display.innerText = CGraph.sequence.length.toString();
    const ln = CGraph.getLargestNumber();
    largest_number_display.innerText = ln.toString();
    path_display.innerText = CGraph.sequence.toString();

    console.log(CGraph.animation_path)
    CGraph.show(ctx1);
    path_point.render(ctx1);

    animate();
 }

 let index = 0;
 let last_time;
 
 function animate(timestep){
    ctx1.clearRect(0,0,cw1,ch1);
    CGraph.show(ctx1);
    

    path_point.x = CGraph.animation_path[index].x;
    path_point.y = CGraph.animation_path[index].y;
    path_points.push(new Point(path_point.x, path_point.y, 2, 'yellow'));

    ctx1.strokeStyle = 'yellow';
    ctx1.lineWidth = 4;
    ctx1.beginPath();
    ctx1.moveTo(path_points[0].x, path_points[0].y);
    for(let i = 1; i < path_points.length; i++){
        ctx1.lineTo(path_points[i].x, path_points[i].y);
    }
    ctx1.stroke();
    path_point.render(ctx1);

    index++;
    if(index >= len) {
        CNumber++;
        index = 0;
        path_points = [];
        CGraph = new CollatzGraph(0,0, cw1, ch1, CNumber);
        CGraph.initialize();
        len = CGraph.animation_path.length;
        c_number_display.innerText = CNumber.toString();
        step_display.innerText = CGraph.sequence.length.toString();
        const ln = CGraph.getLargestNumber();
        largest_number_display.innerText = ln.toString();
        path_display.innerText = CGraph.sequence.toString();
    }
    interval = requestAnimationFrame(animate)
 }
 document.addEventListener('DOMContentLoaded',init);