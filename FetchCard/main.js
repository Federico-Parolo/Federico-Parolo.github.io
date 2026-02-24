async function main() {
    const cardImage = document.querySelector("#cardImage");
    const cardsLabel = document.querySelector("#cardsLeft");
    const drawButton = document.querySelector("#draw");
    const drawDeckButton = document.querySelector("#changeDeck");

    async function getNewDeckId() {
        let deck = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1&jokers_enabled=true`);
        let jsonDeck = await deck.json();
        console.log(jsonDeck.deck_id);
        return jsonDeck.deck_id;
    }
    
    let deckID = await getNewDeckId();
    
    

    async function drawAndDisplay() {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
        if (!response.ok) {
            console.log(response.error + " response");
        } else {
            const data = await response.json();
            //console.log(data);
            if (!data.success) {
                console.log(data.error + " data");
                deckID = await getNewDeckId();
                drawAndDisplay();
            } else {
                const link = data.cards[0].image;
                cardImage.src = link;
                cardsLabel.innerHTML = data.remaining + " cards left.";
            }
        }
        


    }
    drawAndDisplay();


    drawButton.addEventListener("click", () => {
        drawAndDisplay();
    });

    drawDeckButton.addEventListener("click", async () => {
        deckID = await getNewDeckId();
        drawAndDisplay();
    });

}

window.addEventListener("load", main);