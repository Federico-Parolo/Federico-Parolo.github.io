"use strict"
//

const convert = (d) => {
    return d * (Math.PI/180);
};
// definizione della turtle
const turtle = {
    ctx : undefined,
    x : 0,
    y : 0,
    angle : 0,
    penDown : true,
    moveOf : function(r) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        let x1 = this.x + r*Math.cos(convert(this.angle));
        let y1 = this.y + r*Math.sin(convert(this.angle));
        if (this.penDown) {
            this.ctx.lineTo(x1,y1);
        }else {
            this.ctx.moveTo(x1,y1);
        }
        this.x = x1;
        this.y = y1;
        this.ctx.stroke();
    },
    moveTo : function(x1,y1) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        if (this.penDown) {
            this.ctx.lineTo(x1,y1);
        } else {
            this.ctx.moveTo(x1,y1);
        }
        this.x = x1;
        this.y = y1;
        this.ctx.stroke();
    },
    turn : function(a) {
        this.angle -= a;
        this.angle = this.angle % 360;
    },
};
// uno dei 3 lati del triangolo
function drawEdge(n,l) {
    if (n == 0) turtle.moveOf(l);
    else {
        drawEdge(n-1,l/3);
        //await sleep(1000);
        turtle.angle+=60;
        drawEdge(n-1,l/3);
        //await sleep(1000);
        turtle.angle -= 120;
        drawEdge(n-1,l/3);
        //await sleep(1000);
        turtle.angle+=60;
        drawEdge(n-1,l/3);
        //await sleep(1000);
    }
}

// riesegue lo stesso procedimento però ruotato per completare la figura
function drawFractal(n,l) {
    if (n < 0 || l <= 0) return;
    for (let i = 0; i < 3; i++) {
        drawEdge(n,l);
        turtle.angle -= 120;
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));


window.addEventListener("load", () => {

    const canvas = document.querySelector("#Canvas");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    turtle.ctx = ctx;


/*
    const drawpolygon = (edges, x0,y0,l) => {
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        let angle = ((edges-2) * 180) / edges;
        console.log(angle)
        let turnAngle = 180-angle;
        let x = x0;
        let y = y0;
        let a = -turnAngle;
        for (let i = 0; i < edges; i++) {
            x += l*Math.cos(convert(a+turnAngle));
            y += l*Math.sin(convert(a+turnAngle));

            a = (a+turnAngle) % 360;
            x = Math.round(x);
            y = Math.round(y);

            console.log(x + "," + y);
            ctx.lineTo(x,y);
        }
        ctx.stroke();
    };
*/
    
    let l = 200;
    //turtle.x = canvas.width/2 - l/2;
    //turtle.y = canvas.height/2 - l/2
    turtle.x = 400;
    turtle.y = 400;/*
    drawFractal(2,l);

    function clear() {
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, width, height);
    }

    addEventListener("input",(event) => {
        
        const val = document.querySelector("#slider").value;
        const len = document.querySelector("#lengthSlider").value;
        clear();
        drawFractal(val,len);
    });*/

/*
    const calcSequence = function(n) {
        if (n <= 0) {
            return "0";
        } else if (n == 1) {
            return "01";
        } else {
            return calcSequence(n-1) + calcSequence(n-2);
        }
    }*/

    
}); 