var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var length = parseFloat(document.getElementById("length").value);
    var diff = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
    var depth = parseInt(document.getElementById("depth").value);

    var startX = canvas.width / 2;
    var startY = canvas.height;
    var startAngle = -Math.PI / 2; // upward

    drawBranch(startX, startY, length, startAngle, depth, diff);
}

function drawBranch(x, y, length, angle, depth, diff) {
    if (depth <= 0) return;

    var x2 = x + length * Math.cos(angle);
    var y2 = y + length * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    var newLength = length / 2;

    drawBranch(x2, y2, newLength, angle - diff, depth - 1, diff);
    drawBranch(x2, y2, newLength, angle + diff, depth - 1, diff);
}

// draw once when page loads
drawTree();