const container = document.getElementById("container")
elements = ["♣️", "♠️", "♥️", "♦️"]
elements = elements.concat(elements)

function shuffle(elements) {
    for (let i = elements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elements[i], elements[j]] = [elements[j], elements[i]];
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    shuffle(elements);
    for (i = 0; i < 8; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = elements[i];
        container.append(card);
        function openCard() {
            card.classList.toggle("opened");
            const openedElements = document.querySelectorAll(".opened");
            if (openedElements.length == 2) {
                if (openedElements[0].textContent !== openedElements[1].textContent) {
                    openedElements.forEach(element => {
                        setTimeout(()=> {
                            element.classList.remove("opened");
                        }, 1000)
                    })
                } else {
                    openedElements.forEach(element => {
                        element.classList.remove("opened");
                        element.classList.add("checked");
                        element.removeEventListener("click", openCard)
                    })
                }
            }
        }
        card.addEventListener("click", openCard)
    }
})