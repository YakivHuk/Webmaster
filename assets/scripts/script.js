const container = document.getElementById("container")
elements = ["♣️", "♠️", "♥️", "♦️"]
elements = elements.concat(elements)

function shuffle(elements) {
    for (let i = elements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elements[i], elements[j]] = [elements[j], elements[i]];
    }
}

shuffle(elements);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

document.addEventListener("DOMContentLoaded", () => {
    for (i = 0; i < 8; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = elements[i];
        container.append(card);

        card.addEventListener("click", () => {
            if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

            card.classList.add("opened");

            if (!hasFlippedCard) {
                hasFlippedCard = true;
                firstCard = card;
                return;
            }

            secondCard = card;
            checkForMatch();
        });
    }
});

function checkForMatch() {
    let isMatch = firstCard.textContent === secondCard.textContent;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("opened");
        secondCard.classList.remove("opened");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
