const canvas = document.querySelector("#stockDiagram");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const dataSample = document.querySelector("#dataSample");
const plotButton = document.querySelector("#plotButton");
const lastChanges = document.querySelector("#last-changes");
const samples = [];
const xDelta = 10;

dataSample.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        samples.push(Number(dataSample.value));
        const element = document.createElement("span");
        element.innerHTML = Number(dataSample.value);
        lastChanges.appendChild(element);
        dataSample.value = "";
        plotButton.click();
    }
    
    
});

plotButton.addEventListener("click", () => {

    let sample = dataSample.value;
    dataSample.value = "";
    sample = Number(sample);
    let i = 0;
    let currentY = height/2;
    initCanvas();
    ctx.beginPath();
    ctx.moveTo(0, height/2);
    for (const element of samples) {
        if (element > 0) {
            ctx.strokeStyle = "rgb(0,255,0)";
        } else {
            ctx.strokeStyle = "rgb(255,0,0)";
        }
        i += xDelta;
        currentY -= element;
        ctx.lineTo(i,currentY);
        
    }
    ctx.stroke();
    
    
});



function initCanvas() {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,width,height);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.beginPath();
    ctx.moveTo(0,height/2);
    ctx.lineTo(width,height/2);
    ctx.stroke();
}

initCanvas();



