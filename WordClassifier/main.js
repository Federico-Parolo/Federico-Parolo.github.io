const source = "https://random-words-api.kushcreates.com/api?words=1&language=";
const langs = ["it","en"];
const itButton = document.querySelector("#italian");
const enButton = document.querySelector("#english");
const idkButton = document.querySelector("#idk");
const wordDisplayer = document.querySelector("#word");

const url = "http://localhost:3000/words";

let word,res;

itButton.addEventListener("click", () => {
    storeAndUpdate("Italian");
});

enButton.addEventListener("click", () => {
    storeAndUpdate("English");
});

idkButton.addEventListener("click", () => {
    storeAndUpdate("Undef");
});




// Italian = 0
// English = 1
const storeAndUpdate = async function(opt,boolean = true) {

    if (opt === null) return;

    if (boolean) console.log(word + "->" + opt + ` (${res[0].language})`);

    if (opt != "Undef") {
        let y = (opt === "Cold") ? 1 : 0;
        const data = {
            word : res[0].language,
            "y": (opt === "Italian" ? 0 : 1)
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





    res = await fetch(source + langs[Math.floor(Math.random() * langs.length)]);
    //console.log(res);
    res = await res.json();
    console.log(res);
    word = res[0].word;

    wordDisplayer.innerHTML = word;

}

if (!sessionStorage.getItem("initialized")) {
    storeAndUpdate(null, false);
    sessionStorage.setItem("initialized", "true");
}
