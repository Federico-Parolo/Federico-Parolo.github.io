const SERVER_ADDRESS = "192.168.4.44:3000";
const canvas = document.querySelector("#dashboard");
const ctx = canvas.getContext("2d");
const dataPane = document.querySelector("#data-section");
const getDataButton = document.querySelector("#getData");
const addressField = document.querySelector("#ip-address");
const labsField = document.querySelector("#lab-selection");
let data = [];
let labs = {};
ctx.fillRect(0,0,canvas.width,canvas.width);


getDataButton.addEventListener("click",(e) => {
    getData(addressField.value);
    console.log(addressField.value);
    if (addressField.value === "") {
        addressField.value = SERVER_ADDRESS;
    } 
});


addressField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getData(addressField.value);
    }
    if (addressField.value == "") {
        addressField.value = SERVER_ADDRESS;
    } 
});



async function getData(address) {
    let response;
    if (address == null || address === undefined || address === "") {
        console.log("ADDRESS NOT VALID OR EMPTY");
        response = await fetch("http://" + SERVER_ADDRESS + "/data");
    } else {
    response = await fetch("http://" + address + "/data");
    }
    if (!response.ok) {
        console.log("Errore nella richiesta");
    } else {
        dataPane.textContent = '';
        response = await response.json();
        // console.log(response);
        data = response;
        for (const sample of response) {
            parseSample(sample);
            let newData = document.createElement("div");
            newData.innerHTML = `<div class="data">
                <span id="temp">Temperature: ${sample.temperature}°C</span>
                <span id="hum">Humidity: ${sample.humidity}</span>
                <span id="lum">Luminosity: ${sample.luminosity}</span>
                <span id="timestamp">${sample.timestamp}</span>
            </div>`;
            dataPane.appendChild(newData);

        }
        createLabsSelections();
        
        console.log(labs);   
    }
}

function parseSample(sample) {
    let lab = sample.position.split("-")[0];
    if (!(lab in labs)) {
        labs[lab] = [];
    }
    labs[lab].push(sample);
}

function createLabsSelections() {
    for (const [lab,samples] of Object.entries(labs)) {
        let labButton = document.createElement("input");
        labButton.type = "button";
        labButton.value = lab.split("-")[0];
        labButton.addEventListener("click", e => {
            showLabDetails(samples);
        });
        labsField.appendChild(labButton);
    }
}

function showLabDetails(samples) {
    dataPane.textContent = '';
    for (const sample of samples) {
            let newData = document.createElement("div");
            newData.innerHTML = `<div class="data">
                <span id="temp">Temperature: ${sample.temperature}°C</span>
                <span id="hum">Humidity: ${sample.humidity}</span>
                <span id="lum">Luminosity: ${sample.luminosity}</span>
                <span id="timestamp">${sample.timestamp}</span>
            </div>`;
            dataPane.appendChild(newData);

        }
}
















/*fetch(url, opts)
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
});*/


/*
3d leggero con laboratori disegnati in base ai dati, postazione attiva e disattivata, vista dall alto click su postazione fa apparire grafico e dettagli di quella

*/ 
