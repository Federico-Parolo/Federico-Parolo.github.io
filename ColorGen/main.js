const hotButton = document.querySelector("#hot");
const coldButton = document.querySelector("#cold");
const idkButton = document.querySelector("#idk");
const colorArea = document.querySelector("#colorShower");
let r,g,b;
const url = "http://localhost:3000/rgby";
//const alfUrl = "http://192.168.4.45:3000/stocks";


hotButton.addEventListener('click', (e) => {
    e.preventDefault();
    storeAndUpdate("Hot");
});
coldButton.addEventListener('click', (e) => {
    e.preventDefault();
    storeAndUpdate("Cold");
});
idkButton.addEventListener('click', (e) => {
    e.preventDefault();
    storeAndUpdate("Undef");
});

const storeAndUpdate = function(opt,boolean = true) {

    if (boolean)console.log("R: " + r + " G: " + g + " B: " + b + "-> " + opt);

    if (opt && opt != "Undef") {
        let y = (opt === "Cold") ? 1 : 0;
        const data = {
            "r": r,
            "g": g,
            "b": b,
            "y": y
        };

        let opts = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, opts)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });

    }


    r = Math.round(Math.random() * 255);
    g = Math.round(Math.random() * 255);
    b = Math.round(Math.random() * 255);

    colorArea.style.backgroundColor = `rgb(${r},${g},${b})`;

}


storeAndUpdate(null, false);

