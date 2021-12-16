const cards = document.querySelectorAll('.fbflag');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.type === secondCard.dataset.type;

    isMatch ? disableCards() : unflipCards();

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

function time() {
    let secs = 0
    let mins = 0
    let SS
    let MM
    setInterval(() => {
        secs++
        if (secs == 60) {
            secs = 0;
            mins++
        }

        secs < 10 ? SS = `0${secs}` : SS = `${secs}`
        mins < 10 ? MM = `0${mins}` : SS = `${mins}`

        document.querySelector('#time').innerHTML = `${MM}:${SS}`
    }, 1000)
}

cards.forEach(card => card.addEventListener('click', flipCard));