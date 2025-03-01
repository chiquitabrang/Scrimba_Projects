const newDeck = document.getElementById("new-deck");
const drawCard = document.getElementById("draw-card");
const cardOne = document.getElementById("card-one");
const cardTwo = document.getElementById("card-two");
const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");

let currentCardId = "";
let computerPts = 0;
let userPts = 0;

newDeck.addEventListener("click", handleClick);
drawCard.addEventListener("click", draw2Cards);

drawCard.setAttribute("disabled", "true");

function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      currentCardId = data.deck_id;

      drawCard.removeAttribute("disabled");

      document.getElementById(
        "remaining-cards"
      ).innerText = `${data.remaining}`;

      if (data.remaining === 0) {
        drawCard.removeAttribute("disabled");
        setTimeout(() => {
          document.querySelector(".modal").style.display = "flex";
        }, 3000);
      }

      document.querySelector(".modal").style.display = "none";
    });
}

function draw2Cards() {
  fetch(`https://deckofcardsapi.com/api/deck/${currentCardId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const getCardOne = data.cards[0];
      const getCardTwo = data.cards[1];
      cardOne.innerHTML = `
        <img src="${getCardOne.image}" class="card">
        `;
      cardTwo.innerHTML = `
        <img src="${getCardTwo.image}" class="card">
        `;

      document.getElementById(
        "remaining-cards"
      ).innerText = `${data.remaining}`;

      if (data.remaining === 0) {
        drawCard.setAttribute("disabled", "false");

        if (computerPts > userPts) {
          document.getElementById("winner").innerText = "Computer wins!";
        } else if (computerPts < userPts) {
          document.getElementById("winner").innerText = "You win!";
        } else {
          document.getElementById("winner").innerText = "It's a tie!";
        }

        document.querySelector(".modal").style.display = "flex";
      }
      compareCard(getCardOne, getCardTwo);
    });
}

const arr = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

const cardSuits = {
  CLUBS: 1,
  SPADES: 2,
  HEARTS: 3,
  DIAMONDS: 4,
};

function compareCard(card1, card2) {
  const index1 = arr.indexOf(card1.value);
  const index2 = arr.indexOf(card2.value);

  if (index1 > index2) {
    computerPts += 1;
    console.log(computerPts);
    computerScore.innerText = computerPts;
  } else if (index1 < index2) {
    userPts += 1;
    console.log(userPts);
    userScore.innerText = userPts;
  } else {
    const suit1 = cardSuits.indexOf(card1.suit);
    const suit2 = cardSuits.indexOf(card2.suit);

    if (suit1 > suit2) {
      computerPts += 1;
      computerScore.innerText = computerPts;
    } else {
      userPts += 1;
      userScore.innerText = userPts;
    }
  }
}
