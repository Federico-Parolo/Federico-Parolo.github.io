"use strict";
let sumOfAreas = 0;
let calcPI =() => {};


window.addEventListener('load', () => {


    const canvas = document.querySelector("#Canvas");
    const textArea = document.querySelector("#text");
    //console.log(canvas);
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "rgb(0 0 0)";
    ctx.lineWidth = 2;
    const r = width / 2;
    
    ctx.beginPath();
    ctx.arc(width/2,height/2,r,0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width/2,0);
    ctx.lineTo(width/2,height/2);
    ctx.lineTo(width,height/2);
    ctx.stroke();

    let attempts = 10000;
    let h = (width/2) / attempts;
    //console.log(h);

    
    let bTot = width/2;

    calcPI = () => {
        for (let i = 0; i < attempts; ++i) {
            let hI = Math.sqrt(r*r - Math.pow(h*i,2));

            ctx.beginPath();
            ctx.moveTo(width/2 + h*i,height/2);
            ctx.lineTo(width/2 + h*i,height/2 - (hI));
            ctx.stroke();
            console.log(hI);
            
            sumOfAreas += hI * h;
            
        }
        
        
        
    }
    
    calcPI();


    if (textArea) {
        textArea.value = (sumOfAreas * 4) / Math.pow(width/2,2);
    }


}); 