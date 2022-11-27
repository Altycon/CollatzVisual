export const TWO_PI = Math.PI*2;
export const DPI = devicePixelRatio;
export const random = (min,max,bool) => !bool ? Math.random()*(max-min)+min:Math.floor(Math.random()*(max-min)+min);
export function scale(num, InMin, InMax, OutMin, OutMax){
    return (num - InMin)*(OutMax-OutMin)/(InMax-InMin)+OutMin;
}
export function fixCanvas(canvas,dpi){
    const style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
    const style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
    canvas.setAttribute('width', style_width*dpi);
    canvas.setAttribute('height',style_height*dpi);
}