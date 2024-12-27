var htmlQuestions  = [
  {
    question: "What does HTML stand for?",
    option1: "Hyper Text Markup Language",
    option2: "Home Tool Markup Language",
    option3: "Hyperlinks and Text Markup Language",
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which HTML element is used for the largest heading?",
    option1: "<h6>",
    option2: "<h1>",
    option3: "<header>",
    correctAnswer: "<h1>",
  },
];

var index = 0;
var score = 0;
var questions = [];
var timerInterval;

function startQuiz(quizId) {
  // Show quiz section and hide cards
  document.getElementById("quiz-section").classList.remove("hidden");
  document.querySelector(".quiz-cards").style.display = "none";

  // Reset index and score
  index = 0;
  score = 0;

  // Set questions based on quizId
  if (quizId === 1) {
    questions = htmlQuestions;
  } else if (quizId === 2) {
    questions = cssQuestions;
  } else if (quizId === 3) {
    questions = jsQuestions;
  }

  // Start first question
  nextQuestion();

  // Start timer
  startTimer();
}

function startTimer() {
  var min = 1;
  var sec = 10;
  var timer = document.getElementById("timer");

  timerInterval = setInterval(function () {
    timer.innerHTML = `${min}:${sec}`;
    sec--;

    if (sec < 0) {
      if (min < 1) {
        nextQuestion();
        min = 1;
        sec = 10;
      } else {
        min--;
        sec = 10;
      }
    }
  }, 1000);
}

function nextQuestion() {
  var options = document.getElementsByName("answer");

  // Check for selected answer from previous question
  for (var i = 0; i < options.length; i++) {
    if (options[i].checked) {
      var selected = options[i].value;
      var userAnswer = questions[index - 1][`option${selected}`];
      var correctAns = questions[index - 1].correctAnswer;

      if (userAnswer === correctAns) {
        score++;
      }
      options[i].checked = false;
    }
  }

  if (index >= questions.length) {
    // End of quiz, show score
    clearInterval(timerInterval);
    alert(`Quiz finished! Your score is ${score}/${questions.length}`);
    document.getElementById("quiz-section").classList.add("hidden");
    document.querySelector(".quiz-cards").style.display = "block";
  } else {
    // Display next question
    document.getElementById("question").innerText = questions[index].question;
    document.getElementById("option1").innerText = questions[index].option1;
    document.getElementById("option2").innerText = questions[index].option2;
    document.getElementById("option3").innerText = questions[index].option3;
    index++;
  }
}

function enableBtn() {
  document.getElementById("btn").disabled = false;
}
