let arrayOfQuestions = [];
let submitButton = document.getElementById("submit");
let currentPoints = 0;
let totalPoints = document.querySelector(".counter-display");
let startGame = document.querySelector(".game-start");
let current = 0;
let answer = "";

let gif1 =
  "https://media1.giphy.com/media/ciwK6u5YqvhstdD3vu/giphy.gif?cid=ecf05e47fi8eyb4bs0b66xcpg8x8878z51tgbfkdmhp37ecm&rid=giphy.gif&ct=g";
let gif2 =
  "https://media3.giphy.com/media/AhXw4MktwT7C16OsmG/giphy.gif?cid=ecf05e47fi8eyb4bs0b66xcpg8x8878z51tgbfkdmhp37ecm&rid=giphy.gif&ct=g";
let gif3 =
  "https://media1.giphy.com/media/JRDAaRchARJSWGPC8V/giphy.gif?cid=ecf05e47rgaamfma4kq9gbahyshtselpmz6hybjkox83g528&rid=giphy.gif&ct=g";
let gif4 =
  "https://media1.giphy.com/media/Y2gIlHMMse3KKKcDbS/giphy.gif?cid=ecf05e47lvemnylv7hetzfo5f0yvqzysr14ebh9zhiwgdlks&rid=giphy.gif&ct=g";
let gif5 =
  "https://media2.giphy.com/media/fjxya7CZKYt2ntEtYP/giphy.gif?cid=ecf05e4799us9rrb30yozxsgmp23g2dty3jqngk51fvzja17&rid=giphy.gif&ct=g";
let wrongGif1 =
  "https://media1.giphy.com/media/vNNsw7IsdQfowDotga/giphy.gif?cid=ecf05e47fi8eyb4bs0b66xcpg8x8878z51tgbfkdmhp37ecm&rid=giphy.gif&ct=g";
let wrongGif2 =
  "https://media1.giphy.com/media/d8QPbam0yloxId5U8G/giphy.gif?cid=ecf05e4799us9rrb30yozxsgmp23g2dty3jqngk51fvzja17&rid=giphy.gif&ct=g";
let wrongGif3 =
  "https://media2.giphy.com/media/idLKIOk7PxXWgFjTnF/giphy.gif?cid=ecf05e47h6zqvj7hjb7hgn9t2xsg04s30s0gtxfltk4uom0f&rid=giphy.gif&ct=g";
let gifArray = [gif1, gif2, gif3, gif4, gif5];
let gifArrayWrong = [wrongGif1, wrongGif2, wrongGif3];

function randomGif() {
  let randomGif = Math.floor(Math.random() * gifArray.length);
  return randomGif, gifArray[randomGif];
}

function randomWrongGif() {
  let randomGif = Math.floor(Math.random() * gifArrayWrong.length);
  return randomGif, gifArrayWrong[randomGif];
}

fetch("https://jservice.io/api/random")
  .then((response) => response.json())
  .then((data) => {
    let category = data[current].category_id;
    categorydiv = document.querySelector(".category");
    categorydiv.append(data[current].category.title);

    fetch("https://jservice.io/api/clues?category=" + category)
      .then((response) => response.json())
      .then((data) => {
        let question = data[current].question;
        let questionDisplay = document.querySelector(".question-box");
        questionDisplay.innerHTML = question;
        answer = data[current].answer;

        console.log(answer);
        arrayOfQuestions = data;
      });
  });

submitButton.onclick = function (event) {
  event.preventDefault();
  let inputText = document.getElementById("userinput");

  if (inputText.value === answer) {
    current += 1;

    var docs = document.getElementById("img");
    docs.setAttribute("src", randomGif());
    docs.style.display = "block";

    let correctAnswer = document.querySelector(".answer-text");
    correctAnswer.innerHTML = "Correct! Scroll to bottom for next question.";
    updatePointsCounter(currentPoints);

    let nextQuestionButton = document.createElement("button");
    nextQuestionButton.id = "next-question";
    nextQuestionButton.innerHTML = "Next Question";
    document.body.append(nextQuestionButton);

    nextQuestionButton.onclick = function (event) {
      event.preventDefault();

      let questionDisplay = document.querySelector(".question-box");
      questionDisplay.innerHTML = arrayOfQuestions[current].question;
      answer = arrayOfQuestions[current].answer;
      console.log(answer);
      inputText.value = inputText.defaultValue;

      docs.style.display = "none";
      correctAnswer.innerHTML = "";
      nextQuestionButton.style.display = "none";
    };
  } else {
    let wrongAnswer = document.querySelector(".answer-text");
    wrongAnswer.innerHTML = "Wrong! Game Over!";

    var docs = document.getElementById("img");
    docs.setAttribute("src", randomWrongGif());
    docs.style.display = "block";

    reset();
  }
};
// Start a new Game
function startNewGame() {
  answerDiv = document.querySelector(".answer-text");
  answerDiv.innerHTML = "";

  reset();
}

startGame.onclick = function (event) {
  event.preventDefault();
  startNewGame();
};

function updatePointsCounter() {
  currentPoints += 1;
  totalPoints.innerHTML = "<h3>Total Points: </h3>" + currentPoints;
}

function loseGamePoints() {
  currentPoints = 0;
  totalPoints.innerHTML = "<h3>Total Points: </h3>" + currentPoints;
}

// // Reset the Page
function reset() {
  categorydiv = document.querySelector(".category");
  categorydiv.innerHTML = "";

  questionDiv = document.querySelector(".question-box");
  questionDiv.innerHTML = "";

  var input = document.getElementById("userinput");
  input.value = input.defaultValue;

  loseGamePoints();
}
