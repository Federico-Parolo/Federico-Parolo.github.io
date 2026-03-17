const hotButton = document.querySelector("#hot");
const coldButton = document.querySelector("#cold");
const idkButton = document.querySelector("#idk");
const colorArea = document.querySelector("#colorShower");
let r,g,b;

hotButton.addEventListener('click', (e) => {

    storeAndUpdate("Hot");
});
coldButton.addEventListener('click', (e) => {

    storeAndUpdate("Cold");
});
idkButton.addEventListener('click', (e) => {

    storeAndUpdate("Undef");
});

const storeAndUpdate = function(opt,b = true) {

    if (b)console.log("R: " + r + " G: " + g + " B: " + b + "-> " + opt);

    r = Math.round(Math.random() * 255);
    g = Math.round(Math.random() * 255);
    b = Math.round(Math.random() * 255);

    colorArea.style.backgroundColor = `rgb(${r},${g},${b})`;

}

storeAndUpdate(undefined,false);