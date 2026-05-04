const SERVER_ADDRESS = "localhost:3000";
const dataSection = document.querySelector("#data-section");
const getDataButton = document.querySelector("#getData");
const addressField = document.querySelector("#ip-address");
const labsSelection = document.querySelector("#lab-selection");
let data = []; // array that contains parsed json
let labs = {}; // object that contains a field for every lab with the respective measures


getDataButton.addEventListener("click",(e) => {
    getData(addressField.value);
    console.log(addressField.value);
});


addressField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getData(addressField.value);
    }

});



async function getData(address) {
    data = [];
    labs = {};
    const url = (!address || address === "")
        ? `http://${SERVER_ADDRESS}/data`
        : `http://${address}/data`;
    if (address === "") addressField.value = SERVER_ADDRESS;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP_ERROR_${response.status}`);
        }

        const json = await response.json();

        // Clear UI
        dataSection.textContent = '';
        data = json;

        for (const sample of json) {
            parseSample(sample);
/*
            const newData = document.createElement("div");
            newData.innerHTML = `
                <div class="data">
                    <span>Temperature: ${sample.temperature}°C</span>
                    <span>Humidity: ${sample.humidity}</span>
                    <span>Luminosity: ${sample.luminosity}</span>
                    <span>${sample.timestamp}</span>
                </div>`;
            dataPane.appendChild(newData);*/
        }

        createLabsSelections();

    } catch (err) {
        clearTimeout(timeoutId);

        // Precise error classification
        if (err.name === "AbortError") {
            alert("Request timed out (server unreachable)");
        } else if (err.message.startsWith("HTTP_ERROR_")) {
            const status = err.message.split("_")[2];
            alert(`Server responded with error: ${status}`);
        } else {
            // Network-level failure (DNS, refused connection, CORS, etc.)
            alert("Cannot connect to server (invalid address or offline)");
        }

        console.error("Error:", err);
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
    while (labsSelection.firstChild) {
            labsSelection.removeChild(labsSelection.lastChild);
    }
    const sortedLabs = Object.entries(labs).sort((a, b) => {
        const [labA] = a;
        const [labB] = b;

        const [, prefixA, numA] = labA.match(/^([A-Z]+)(\d+)/);
        const [, prefixB, numB] = labB.match(/^([A-Z]+)(\d+)/);

        // First: alphabetical by prefix (LAP, LEN, OEN)
        if (prefixA !== prefixB) {
            return prefixA.localeCompare(prefixB);
        }

        // Second: numeric order (1–9)
        return Number(numA) - Number(numB);
    });
    for (const [lab,samples] of sortedLabs) {
        let labButton = document.createElement("input");
        labButton.type = "button";
        labButton.value = lab.split("-")[0];
        labButton.classList.add("lab-button");
        labButton.addEventListener("click", e => {
            for (let lab of labsSelection.children) {
                lab.classList.remove("selected");
            }
            e.target.classList.add("selected");
            showLabDetails(samples);
        });
        labsSelection.appendChild(labButton);
    }
}

function showLabDetails(samples) {
    dataSection.textContent = '';
    while (dataSection.firstChild) {
        dataSection.removeChild(dataSection.lastChild);
    }
    for (const sample of samples) {
            let newData = document.createElement("div");
            newData.innerHTML = `<div class="data">
                <span id="temp">Temperature: ${sample.temperature}°C</span>
                <span id="hum">Humidity: ${sample.humidity}</span>
                <span id="lum">Luminosity: ${sample.luminosity}</span>
                <span id="timestamp">${sample.timestamp}</span>
            </div>`;
            dataSection.appendChild(newData);

        }
}



/*
3d leggero con laboratori disegnati in base ai dati, postazione attiva e disattivata, vista dall alto click su postazione fa apparire grafico e dettagli di quella

*/ 


addressField.value = SERVER_ADDRESS;
getData(addressField.value);
const timestamps = data.map(d => d.timestamp);
const temperatures = data.map(d => d.temperature);
const humidities = data.map(d => d.humidity);
const luminosities = data.map(d => d.luminosity);




/*
{
    "id": "102010",
    "position" : "LEN4-16",
    "temperature" : 0.0,
    "humidity": 0.0,
    "luminosity": 0.0,
    "timestamp": "formato ISO (YYYY-MM-DD hh:mm:ss)" 
        }
*/
