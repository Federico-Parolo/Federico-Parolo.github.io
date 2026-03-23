const hotButton = document.querySelector("#hot");
const coldButton = document.querySelector("#cold");
const idkButton = document.querySelector("#idk");
const colorArea = document.querySelector("#colorShower");
let r,g,b;
const url = window.location.origin;
const storagePath = "/Data/db.json";

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

    if (opt != "Undef") {
        let y = (opt === "Cold") ? 1 : 0;
        const data = {
            "r": r,
            "g": g,
            "b": b,
            "y": y
        };

        fetch(url + storagePath + "/rgby/add", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => consol.log(json))

    }


    r = Math.round(Math.random() * 255);
    g = Math.round(Math.random() * 255);
    b = Math.round(Math.random() * 255);

    colorArea.style.backgroundColor = `rgb(${r},${g},${b})`;

}

storeAndUpdate(undefined,false);