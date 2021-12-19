const cards = document.querySelectorAll('.fbflag');
var timer = setInterval(countTimer, 1000);
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let totalSeconds = 0;
document.getElementById('score').innerHTML = score;

// function for flipping cards

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

//check for match function

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
// unflip cards function 

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
// shuffle function

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

//function for timer board

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

//reset game

function resetButton() {
    location.reload();
}

//stop game

function stopGame() {
    clearInterval(timer);
    alert("YOU WIN!!!");
}

cards.forEach(card => card.addEventListener('click', flipCard));