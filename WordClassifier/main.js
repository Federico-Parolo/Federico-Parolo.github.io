const source = "https://random-words-api.kushcreates.com/api?words=1&language=";
const langs = ["it","en"];
const itButton = document.querySelector("#italian");
const enButton = document.querySelector("#english");
const idkButton = document.querySelector("#idk");
const wordDisplayer = document.querySelector("#word");

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





const storeAndUpdate = async function(opt,b = true) {

    if (b) console.log(word + "->" + opt + ` (${res[0].language})`);

    res = await fetch(source + langs[Math.floor(Math.random() * langs.length)]);
    //console.log(res);
    res = await res.json();
    console.log(res);
    word = res[0].word;

    wordDisplayer.innerHTML = word;

}

storeAndUpdate("",false);
