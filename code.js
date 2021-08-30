let arrayOfQuestions = [];
let submitButton = document.getElementById("submit");
let currentPoints = 0;
let totalPoints = document.querySelector(".counter-display");
let startGame = document.querySelector(".game-start");
let currentIndex = 0;
let answer = "";

// Set correct answer gifs
let gif1 =
  "https://media4.giphy.com/media/3o6UB3VhArvomJHtdK/200.webp?cid=ecf05e47kege4iapjyy4t3s3v0j5vk0klla5d1873sqt506c&rid=200.webp&ct=g";
let gif2 =
  "https://media0.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif?cid=ecf05e47kege4iapjyy4t3s3v0j5vk0klla5d1873sqt506c&rid=giphy.gif&ct=g";
let gif3 =
  "https://media0.giphy.com/media/3ohhweiVB36rAlqVCE/giphy.gif?cid=ecf05e47kege4iapjyy4t3s3v0j5vk0klla5d1873sqt506c&rid=giphy.gif&ct=g";
let gif4 =
  "https://media2.giphy.com/media/vvbGMpbhZMcHSsD50w/giphy.gif?cid=ecf05e47kege4iapjyy4t3s3v0j5vk0klla5d1873sqt506c&rid=giphy.gif&ct=g";
let gif5 =
  "https://media4.giphy.com/media/fkD36jhiqzJ9m/giphy.gif?cid=ecf05e473knw4iss4cwphafddjf221cqie7iegwuzyq13az1&rid=giphy.gif&ct=g";

// Set incorrect answer gifs
  let wrongGif1 =
  "https://media2.giphy.com/media/hPPx8yk3Bmqys/giphy.gif?cid=ecf05e471zw7xlwwbrsmipbtrlcdvvvlqt95m868k69ei501&rid=giphy.gif&ct=g";
let wrongGif2 =
  "https://media1.giphy.com/media/4OJFCEeGzYGs0/giphy.gif?cid=ecf05e471zw7xlwwbrsmipbtrlcdvvvlqt95m868k69ei501&rid=giphy.gif&ct=g";
let wrongGif3 =
  "https://media4.giphy.com/media/f0BaErqmljUd2/giphy.gif?cid=ecf05e47m872td7wgvoy1fs2x1xoo8gugjyby2w5ulchpb6b&rid=giphy.gif&ct=g";
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
    let category = data[currentIndex].category_id;
    categorydiv = document.querySelector(".category");
    categorydiv.append(data[currentIndex].category.title);

    fetch("https://jservice.io/api/clues?category=" + category)
      .then((response) => response.json())
      .then((data) => {
        let question = data[currentIndex].question;
        let questionDisplay = document.querySelector(".question-box");
        questionDisplay.innerHTML = question;
        answer = data[currentIndex].answer;

        console.log(answer);
        arrayOfQuestions = data;
      });
  });

submitButton.onclick = function (event) {
  event.preventDefault();
  let inputText = document.getElementById("userinput");

  if (inputText.value === answer) {
    currentIndex += 1;

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
      questionDisplay.innerHTML = arrayOfQuestions[currentIndex].question;
      answer = arrayOfQuestions[currentIndex].answer;
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

// Update points
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
