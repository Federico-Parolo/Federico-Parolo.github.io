"use-strict"
window.addEventListener("load", () => {
    const canvas = document.querySelector("#canva");
    const ctx = canvas.getContext("2d");
    
    const size = canvas.width;
    const cellSize = size / 3;

    const board = [
      [1,2,0],
      [0,1,2],
      [2,0,1]
    ];

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    

    const drawGrid = (ctx,size,dim) => {
      // Set line style
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000";
      const cellSize =  size / dim;

      // vertical
      for (let i = 0; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, size);
      ctx.stroke();
    }

    // horizontal
    for (let i = 0; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(size, i * cellSize);
      ctx.stroke();
    }
    };

    const drawCircle = (ctx,i,j,cellSize) => {
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#0000ff";
      let center = cellSize/2;
      let radius = center - (center*0.3);
      ctx.beginPath();
      ctx.arc(center + cellSize*j, center + cellSize*i, radius,0,Math.PI*2, true);
      ctx.stroke();
    };

    

    const drawX = (ctx,i,j,cellSize) => {
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#ff0000";
      let center = cellSize/2;
      const halfLength = (center - (center*0.3));
      const offsetI = cellSize * i;
      const offsetJ = cellSize * j;
      ctx.beginPath();
      ctx.moveTo(center-halfLength + offsetJ, center-halfLength + offsetI);
      ctx.lineTo(center+halfLength + offsetJ, center+halfLength + offsetI);
      ctx.moveTo(center+halfLength + offsetJ, center-halfLength + offsetI);
      ctx.lineTo(center-halfLength + offsetJ, center+halfLength + offsetI);
      ctx.stroke();
    };

/*
    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        drawCircle(ctx,i,j,cellSize);
        drawX(ctx,i,j,cellSize);
      }
    }*/

    drawGrid(ctx,size,3);
/*
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const element = board[i][j]
        if (element === 1) {
          drawCircle(ctx,i,j,cellSize);
        }else if (element === 2) {
          drawX(ctx,i,j,cellSize);
        }
      }
      
    }*/

    let turn = true;
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      let row;
      let col;

      if (x <= cellSize) {
        col = 0
      }else if (x > cellSize && x < 2*cellSize) {
        col = 1
      }else {
        col = 2;
      }
      if (y <= cellSize) {
        row = 0
      }else if (y > cellSize && y < 2*cellSize) {
        row = 1
      }else {
        row = 2;
      }
      if (turn) {
        drawX(ctx,row,col,cellSize);
      }else {
        drawCircle(ctx,row,col,cellSize);
      }
      turn = !turn;
    });
    
    const res = document.querySelector("#reset");
    res.addEventListener("click", () => {
      ctx.clearRect(0, 0, size, size);
      drawGrid(ctx,size,3);
      turn = true;
    });
});