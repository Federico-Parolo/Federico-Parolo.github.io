"use strict";


window.addEventListener('load', () => {
    const canvas = document.querySelector("#Canvas");
    const textArea = document.querySelector("#text");
    const pointsLabel = document.querySelector("#nPoints");
    console.log(canvas);
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "rgb(0 0 0)";
    ctx.lineWidth = 2;
    const r = width / 2;
    let insideP = 0;
    let outsideP = 0;
    let throws = 100000;


    ctx.beginPath();
    ctx.arc(width/2,height/2,r,0,2*Math.PI);
    ctx.stroke();

   

    const addPoints = (nTrows) => {
        
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


    
    addPoints(throws);
    pointsLabel.innerHTML = throws;
    let pi = (insideP / throws) * 4;
    textArea.innerHTML = pi;

    const pointAdder = document.querySelector("#pointAdder");

    pointAdder.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            let n = Number(pointAdder.value);
            pointAdder.value = "";
            addPoints(n);
            throws += n;
            pi = (insideP / throws) * 4;
            textArea.innerHTML = pi;
            pointsLabel.innerHTML = throws;
        }
    });

    const reset = document.querySelector("#reset");
    reset.addEventListener("click", () => {
        ctx.clearRect(0,0,width,height);
        ctx.beginPath();
        ctx.arc(width/2,height/2,r,0,2*Math.PI);
        ctx.stroke();
        insideP = 0;
        outsideP = 0;
        throws = 100000;
        addPoints(throws);
        pi = (insideP / throws) * 4;
        textArea.innerHTML = pi;
        pointsLabel.innerHTML = throws;
    });


}); 