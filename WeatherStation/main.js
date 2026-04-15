const SERVER_ADDRESS = "localhost:3000";
const canvas = document.querySelector("#dashboard");
const ctx = canvas.getContext("2d");

ctx.fillRect(0,0,canvas.width,canvas.width);





















// fetch 
const data = {
            "something": 67
        };

let opts = {
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
};

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
