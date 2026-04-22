const SERVER_ADDRESS = "192.168.4.44";
const canvas = document.querySelector("#dashboard");
const ctx = canvas.getContext("2d");
const dataPane = document.querySelector("#main-pane");
const getDataButton = document.querySelector("#getData");
const addressField = document.querySelector("#ip-address");
ctx.fillRect(0,0,canvas.width,canvas.width);


getDataButton.addEventListener("click",(e) => {
    getData();
    if (addressField.value == "") {
        addressField.value = SERVER_ADDRESS;
    } 
});


addressField.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        getData(addressField.value);
    }
    if (addressField.value == "") {
        addressField.value = SERVER_ADDRESS;
    } 
});



async function getData(address) {
    let response;
    if (address == null || address == undefined || address == "") {
        console.log("ADDRESS NOT VALID");
        response = await fetch("http://" + SERVER_ADDRESS + ":3000/_data");
    } else {
    response = await fetch("http://" + address + ":3000/_data");
    }
    if (!response.ok) {
        console.log("Errore nella richiesta");
    } else {
        response = await response.json();
        console.log(response);
        let newData = document.createElement("div");
        newData.innerHTML = `<div class="data">
                <span id="temp">Temperature: ${response[0].temperature}°C</span>
                <span id="hum">Humidity: ${response[0].humidity}</span>
                <span id="lum">Luminosity: ${response[0].luminosity}</span>
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
