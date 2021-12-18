const cards = document.querySelectorAll('.fbflag');
var timer = setInterval(countTimer, 1000);
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let totalSeconds = 0;
document.getElementById('score').innerHTML = score;


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
    score++;
    document.getElementById('score').innerHTML = score;
    if (score == 8) stopGame();
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

function countTimer() {
    ++totalSeconds;
    let minute = Math.floor((totalSeconds) / 60);
    let seconds = totalSeconds % 60;
    if (minute < 10)
        minute = "0" + minute;
    if (seconds < 10)
        seconds = "0" + seconds;
    document.getElementById("timer").innerHTML = minute + ":" + seconds;
}

function resetButton() {
    location.reload();
}

function stopGame() {
    clearInterval(timer);
    alert("YOU WIN!!!");
}

cards.forEach(card => card.addEventListener('click', flipCard));