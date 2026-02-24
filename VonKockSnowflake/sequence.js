"use strict"

const calcSequence = function(n) {
    let seq = [0];
    for (let i = 0; i < n; i++) {
        console.log(seq.length);
        seq.forEach((b) => {
            seq.push(1 - b);
        });
    }
    return seq;
};

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
let seq = [];
window.addEventListener('load', () => {
    const canvas = document.querySelector("#Canvas");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    turtle.ctx = ctx;
    let l = 0.05; // tuning dimention 
    let n = 20; // tuning the shape
    turtle.x = canvas.width/2;
    turtle.y = canvas.height/2 - 300;
    

    seq = calcSequence(n);
    console.log(seq.length);
    for(let k = 0; k < 3; ++k) {
        for (const iterator of seq) {
            if (iterator == 0) {
                turtle.moveOf(l);
            } else {
                turtle.turn(60);
            }
        }
    }
    



    /*const sequence = (n) => {
        for (let i = 0; i < n; ++i) {

        }
    }*/


});


