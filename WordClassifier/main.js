const source = "https://random-words-api.kushcreates.com/api?words=1&language=";
const langs = ["it","en"];
const itButton = document.querySelector("#italian");
const enButton = document.querySelector("#english");
const idkButton = document.querySelector("#idk");
const wordDisplayer = document.querySelector("#word");

const url = "http://localhost:3000/words";

let word,res;

itButton.addEventListener("click", (e) => {
    
    storeAndUpdate("Italian");
});

enButton.addEventListener("click", (e) => {

    storeAndUpdate("English");
});

idkButton.addEventListener("click", (e) => {

    storeAndUpdate("Undef");
});




// Italian = 0
// English = 1
const storeAndUpdate = function(opt,boolean = true) {

    if (opt && boolean && res != undefined) {
        console.log(word + "->" + opt + ` (${res[0].language})`);
    }


    if (opt && res != undefined && opt != "Undef") {

        let y = (opt === "italian") ? 0 : 1;
        const data = {
            "word" : word,
            "lang" : res[0].language,
            "y" : y
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

    update();

}


async function update() {
    res = await fetch(source + langs[Math.floor(Math.random() * langs.length)]);
    res = await res.json();
    console.log(res);
    word = res[0].word;

    wordDisplayer.innerHTML = word;
}

storeAndUpdate(null, false);

