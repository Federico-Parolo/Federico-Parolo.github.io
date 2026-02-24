"use strict";


window.addEventListener('load', () => {


    const canvas = document.querySelector("#Canvas");
    const textArea = document.querySelector("#text");
    console.log(canvas);
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "rgb(0 0 0)";
    ctx.lineWidth = 2;
    const r = width / 2;
    let insideP = 0;
    let outsideP = 0;



    ctx.beginPath();
    ctx.arc(width/2,height/2,r,0,2*Math.PI);
    ctx.stroke();



    const calcPI = (nTrows) => {
        for (let i = 0; i < nTrows; ++i) {
            let x = Math.floor(Math.random() * width);
            //x = x - r;
            let y = Math.floor(Math.random() * height);
            //y = y - r;
            let dist = Math.sqrt((x-r)* (x-r) + (y-r)*(y-r)); 
            if (dist > r) {
                outsideP++;
                ctx.strokeStyle = "rgb(0 255 0)";
            }else {
                insideP++;
                ctx.strokeStyle = "rgb(0 0 255)";
            }
            ctx.beginPath();
            ctx.moveTo(x,y);
            ctx.lineTo(x+1,y+1);
            ctx.stroke();
        }
    };


    let throws = 10000000;
    calcPI(throws);
    let pi = (insideP / throws) * 4;
    textArea.innerHTML = pi;


    const attempt = {
        val : pi,
        nPoints : throws
    };


}); 