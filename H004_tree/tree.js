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


function drawV(x,y,l) {

}

function drawTree(nLayers,l) {
    if (nLayers == 0) {
        turtle.turn(90);
        turtle.moveOf(l);
    }

}



window.addEventListener('load',() => 
    {
        const canvas = document.querySelector("#Canvas");
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        turtle.ctx = ctx;
        let l = 200;
        drawTree(0,l);
}
);