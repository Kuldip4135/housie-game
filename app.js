const openModelButton = document.querySelector(".game__btn--secondary");
const closeModelButton = document.querySelector(".game__modal--button");
const game = document.querySelector(".game");
const gameAllNumbersDiv = document.querySelector(".game__all--numbers");
const gamePlayerNumbersDiv = document.querySelector(".game__player--numbers");
const gameComputerNumbersDiv = document.querySelector(
  ".game__computer--numbers"
);
const gameTicketNumberDiv = document.querySelector(".game__ticket--number");
const gameNewNumberButton = document.querySelector(".game__new--numberButton");

const gameWinnerScreen = document.querySelector(".game__winner--screen");
const gameWinner = document.querySelector(".game__winner--message");
const gameRestartBtn = document.querySelector(".game__btn--restart");
const gameHelper = document.querySelector(".game__helper");
const gameModal = document.querySelector(".game__modal");
const gameButtons = document.querySelector(".game__buttons");
const gameStartButton = document.querySelector(".game__btn--primary");
const gamePlayingScreen = document.querySelector(".game__numbers");

//Audio
const drumSound = new Audio(
  "./sounds/Drum Roll - Gaming Sound Effect (HD).mp3"
);

//Loader
const gameLoader = document.querySelector(".game__loader");
window.addEventListener("load", () => {
  gameLoader.parentElement.removeChild(gameLoader);
});

// Game Modal
openModelButton.addEventListener("click", openModel);
closeModelButton.addEventListener("click", closeModel);
gameHelper.addEventListener("click", openModel);

// Open - Close Model
function openModel() {
  gameModal.classList.remove("game__modal--hidden");
  game.classList.add("game__overlay");
}

function closeModel() {
  gameModal.classList.add("game__modal--hidden");
  game.classList.remove("game__overlay");
}

// Game Screen
gameStartButton.addEventListener("click", () => {
  gameButtons.classList.add("fade-out");
  gamePlayingScreen.classList.remove("fade-out");
  gamePlayingScreen.classList.add("fade-in");
  generateAllNumbers();
});

gameNewNumberButton.addEventListener("click", startPlayingGame);
gameRestartBtn.addEventListener("click", () => {
  window.location.reload();
});

let winner = false;
let LUCKY_NUMBERS = [];
while (LUCKY_NUMBERS.length < 12) {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  //   if (arr.indexOf(ra) === -1) arr.push(r);
  if (!LUCKY_NUMBERS.includes(randomNumber)) LUCKY_NUMBERS.push(randomNumber);
}

let PLAYER_NUMBERS = LUCKY_NUMBERS.slice(0, 6);
let COMPUTER_NUMBERS = LUCKY_NUMBERS.slice(6, 12);

// console.log("LUCKY NUMBERS ARE =>", LUCKY_NUMBERS);
// console.log("PLAYER NUMBERS ARE =>", PLAYER_NUMBERS);
// console.log("COMPUTER NUMBERS ARE =>", COMPUTER_NUMBERS);

function generateAllNumbers() {
  let html = "";
  LUCKY_NUMBERS.map((number) => {
    html += `<h4 class="game__all--number">${number}</h4>`;
  });
  gameAllNumbersDiv.innerHTML = html;

  let pNum = "";
  PLAYER_NUMBERS.map((number) => {
    pNum += `<h4 class="game__player--number">${number}</h4>`;
  });
  gamePlayerNumbersDiv.innerHTML = pNum;

  let cNum = "";
  COMPUTER_NUMBERS.map((number) => {
    cNum += `<h4 class="game__computer--number">${number}</h4>`;
  });
  gameComputerNumbersDiv.innerHTML = cNum;
}

function startPlayingGame() {
  drumSound.play();
  drumSound.onended = () => {
    let tickitNumber = Math.floor(Math.random() * LUCKY_NUMBERS.length);

    // console.log("TICKIT NUMBER IS =>", LUCKY_NUMBERS[tickitNumber]);

    gameTicketNumberDiv.innerHTML = `<h4>${LUCKY_NUMBERS[tickitNumber]}</h4>`;

    if (PLAYER_NUMBERS.includes(LUCKY_NUMBERS[tickitNumber])) {
      // console.log("REMOVE FROM PLAYER NUMBERS");
      getToast(`REMOVED ${LUCKY_NUMBERS[tickitNumber]} FROM PLAYER NUMBERS`);
      PLAYER_NUMBERS = PLAYER_NUMBERS.filter(
        (item) => item !== LUCKY_NUMBERS[tickitNumber]
      );

      LUCKY_NUMBERS = LUCKY_NUMBERS.filter(
        (item) => item !== LUCKY_NUMBERS[tickitNumber]
      );
      // console.log("COMPUTER NUMBERS ARE =>", COMPUTER_NUMBERS);
      // console.log("PLAYER NUMBERS ARE =>", PLAYER_NUMBERS);
    }

    if (COMPUTER_NUMBERS.includes(LUCKY_NUMBERS[tickitNumber])) {
      // console.log("REMOVE FROM COMPUTER NUMBERS");
      getToast(`REMOVED ${LUCKY_NUMBERS[tickitNumber]} FROM COMPUTER NUMBERS`);
      COMPUTER_NUMBERS = COMPUTER_NUMBERS.filter(
        (item) => item !== LUCKY_NUMBERS[tickitNumber]
      );
      LUCKY_NUMBERS = LUCKY_NUMBERS.filter(
        (item) => item !== LUCKY_NUMBERS[tickitNumber]
      );
      // console.log("COMPUTER NUMBERS ARE =>", COMPUTER_NUMBERS);
      // console.log("PLAYER NUMBERS ARE =>", PLAYER_NUMBERS);
    }

    if (PLAYER_NUMBERS.length === 0) {
      // console.log("PLAYER WON");
      gamePlayingScreen.classList.add("fade-out");
      gameButtons.classList.add("fade-out");
      gameWinnerScreen.classList.remove("fade-out");
      gameWinnerScreen.classList.add("fade-in");
      winner = true;
      if (winner) gameWinner.innerHTML = "Congratulations...YOU WON...🥳🥳🥳";
      let utterance = new SpeechSynthesisUtterance(
        "Congratulations...YOU WON...🥳🥳🥳"
      );
      speechSynthesis.speak(utterance);
      return;
    }
    if (COMPUTER_NUMBERS.length === 0) {
      // console.log("COMPUTER WON");
      gamePlayingScreen.classList.add("fade-out");
      gameButtons.classList.add("fade-out");
      gameWinnerScreen.classList.remove("fade-out");
      gameWinnerScreen.classList.add("fade-in");
      winner = true;
      if (winner) gameWinner.innerHTML = "COMPUTER WON...🥂🥂🥂";

      let utterance = new SpeechSynthesisUtterance(
        "Oops..Computer... WON...🥳🥳🥳"
      );
      speechSynthesis.speak(utterance);
      return;
    }

    generateAllNumbers();
  };
}

function getToast(toastMessage) {
  Toastify({
    text: `${toastMessage}`,
    duration: 3000,
    newWindow: true,
    close: true,
    offset: {
      x: 200, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 250, // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    gravity: "top",
    style: {
      backgroundColor: "hsl(240, 69%, 61%)",
    },
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
}
