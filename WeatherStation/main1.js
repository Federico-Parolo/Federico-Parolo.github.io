const SERVER_ADDRESS = "localhost:3000";
const dataSection = document.querySelector("#data-section");
const getDataButton = document.querySelector("#getData");
const addressField = document.querySelector("#ip-address");
const labsSelection = document.querySelector("#lab-selection");
const workstationsList = document.querySelector("#workstations-list");

let data = []; // array that contains parsed json
let labs = {}; // object that contains a field for every lab with the respective measures

let tempChartInstance = null;
let humChartInstance = null;
let lumChartInstance = null;

let currentSelectedLabSamples = [];
let currentSelectedStation = null;

getDataButton.addEventListener("click", (e) => {
    getData(addressField.value);
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

    let response;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout

    try {
        response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`Request error: ${response.status}`);
    } catch (err) {
        clearTimeout(timeoutId);
        console.warn("Could not fetch from server, falling back to local measures.json...", err);
        try {
            response = await fetch("Measures/measures.json");
            if (!response.ok) throw new Error("Could not fetch local file");
        } catch (err) {
            alert("Could not load data from server or local file.");
            console.error(err);
            return;
        }
    }

    try {
        let json = await response.json();
        //console.log(json);

        if (JSON.stringify(data) === JSON.stringify(json)) {
            console.log("unnecessary reload, same data");
            return;
        }

        dataSection.textContent = '';
        data = json;

        for (const sample of json) {
            parseSample(sample);
        }

        createLabsSelections();

    } catch (err) {
        alert("Error parsing data.");
        console.error("Error:", err);
    }
}

function parseSample(sample) {
    let lab = sample.position.split("-")[0];
    // setup array for existing workstation
    if (!(lab in labs)) {
        labs[lab] = [];
    }
    labs[lab].push(sample);
}

function createLabsSelections() {
    while (labsSelection.firstChild) {
        labsSelection.removeChild(labsSelection.lastChild);
    }/*
    const sortedLabs = Object.entries(labs).sort((a, b) => {
        const [labA] = a;
        const [labB] = b;

        const matchA = labA.match(/^([A-Z]+)(\d+)/);
        const matchB = labB.match(/^([A-Z]+)(\d+)/);

        if (matchA && matchB) {
            const prefixA = matchA[1];
            const numA = matchA[2];
            const prefixB = matchB[1];
            const numB = matchB[2];

            if (prefixA !== prefixB) {
                return prefixA.localeCompare(prefixB);
            }
            return Number(numA) - Number(numB);
        }
        return labA.localeCompare(labB);
    });*/
    const sortedLabs = Object.entries(labs).sort(([a], [b]) =>
        a.localeCompare(b, undefined, { numeric: true })
    );

    for (const [lab, samples] of sortedLabs) {
        let labButton = document.createElement("input");
        labButton.type = "button";
        labButton.value = lab;
        labButton.classList.add("lab-button");
        labButton.addEventListener("click", e => {
            for (let child of labsSelection.children) {
                child.classList.remove("selected");
            }
            e.target.classList.add("selected");
            showLabDetails(samples);
        });
        labsSelection.appendChild(labButton);
    }
}

function showLabDetails(samples) {
    currentSelectedLabSamples = samples;
    currentSelectedStation = null;

    // Extract unique active stations
    const stations = [...new Set(samples.map(s => s.position))].sort((a, b) => {
        const numA = parseInt(a.split("-")[1]);
        const numB = parseInt(b.split("-")[1]);
        return numA - numB;
    });

    // Populate workstations menu
    workstationsList.innerHTML = '';
    for (const station of stations) {
        let btn = document.createElement("button");
        btn.classList.add("station-button");
        btn.innerText = station;
        btn.addEventListener("click", (e) => {
            for (let b of workstationsList.children) {
                b.classList.remove("active-station");
            }
            btn.classList.add("active-station");
            showStationDetails(station);
        });
        workstationsList.appendChild(btn);
    }

    // Update charts to show Lab Means
    updateChartsForLab(samples);
}

function showStationDetails(stationName) {
    currentSelectedStation = stationName;
    const stationSamples = currentSelectedLabSamples.filter(s => s.position === stationName);
    updateChartsForStation(stationSamples, stationName);
}

function getAggregatedData(samples) {
    const grouped = {};
    for (const s of samples) {
        if (!grouped[s.timestamp]) {
            grouped[s.timestamp] = { tempSum: 0, humSum: 0, lumSum: 0, count: 0 };
        }
        grouped[s.timestamp].tempSum += s.temperature;
        grouped[s.timestamp].humSum += s.humidity;
        grouped[s.timestamp].lumSum += s.luminosity;
        grouped[s.timestamp].count++;
    }

    const timestamps = Object.keys(grouped).sort();
    const temps = [];
    const hums = [];
    const lums = [];

    for (const ts of timestamps) {
        const g = grouped[ts];
        temps.push(g.tempSum / g.count);
        hums.push(g.humSum / g.count);
        lums.push(g.lumSum / g.count);
    }

    return { timestamps, temps, hums, lums };
}

function updateChartsForLab(samples) {
    const { timestamps, temps, hums, lums } = getAggregatedData(samples);
    renderCharts(timestamps, temps, hums, lums, "Lab Mean");
}

function updateChartsForStation(samples, stationName) {
    // Already filtered by station, sort by timestamp
    samples.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    const timestamps = samples.map(s => s.timestamp);
    const temps = samples.map(s => s.temperature);
    const hums = samples.map(s => s.humidity);
    const lums = samples.map(s => s.luminosity);

    renderCharts(timestamps, temps, hums, lums, `Station ${stationName}`);
}

function renderCharts(labels, temps, hums, lums, title) {
    // Format labels nicely (extract time if possible)
    const formattedLabels = labels.map(l => {
        try {
            return l.split(" ")[1] || l;
        } catch {
            return l;
        }
    });

    updateChart('tempChart', formattedLabels, temps, `Temperature (°C) - ${title}`, 'rgb(255, 99, 132)');
    updateChart('humChart', formattedLabels, hums, `Humidity (%) - ${title}`, 'rgb(54, 162, 235)');
    updateChart('lumChart', formattedLabels, lums, `Luminosity - ${title}`, 'rgb(255, 206, 86)');
}

function updateChart(canvasId, labels, data, label, color) {
    let chartInstance;
    if (canvasId === 'tempChart') chartInstance = tempChartInstance;
    if (canvasId === 'humChart') chartInstance = humChartInstance;
    if (canvasId === 'lumChart') chartInstance = lumChartInstance;

    if (chartInstance) {
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = data;
        chartInstance.data.datasets[0].label = label;
        chartInstance.update();
    } else {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const newInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: color,
                    backgroundColor: "white",
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4, // 0 = straight, >1 = too curved
                    pointRadius: 2,
                    pointHoverRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: { maxTicksLimit: 10 }
                    },
                    y: {
                        beginAtZero: false
                    }
                }/*,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }*/
            }
        });

        if (canvasId === 'tempChart') tempChartInstance = newInstance;
        if (canvasId === 'humChart') humChartInstance = newInstance;
        if (canvasId === 'lumChart') lumChartInstance = newInstance;
    }
}

// Initial fetch
addressField.value = SERVER_ADDRESS;
getData(addressField.value);
