var jsQuestions = [
    {
      question: "What does 'var' do in JavaScript?",
      option1: "Declares a variable",
      option2: "Defines a constant",
      option3: "Creates a function",
      correctAnswer: "Declares a variable",
    },
    {
      question: "How do you create a function in JavaScript?",
      option1: "function myFunction()",
      option2: "def myFunction()",
      option3: "create myFunction()",
      correctAnswer: "function myFunction()",
    },
    {
      question: "What is the correct way to write an array in JavaScript?",
      option1: "[1, 2, 3]",
      option2: "(1, 2, 3)",
      option3: "{1, 2, 3}",
      correctAnswer: "[1, 2, 3]",
    },
    {
      question: "Which method is used to add a new item to the end of an array in JavaScript?",
      option1: "push()",
      option2: "add()",
      option3: "append()",
      correctAnswer: "push()",
    },
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      option1: "onclick",
      option2: "onmouseover",
      option3: "onchange",
      correctAnswer: "onclick",
    }
  ];
  
  var questions = [];  // This will hold the current quiz questions

  var ques = document.getElementById("question");
  var option1 = document.getElementById("option1");
  var option2 = document.getElementById("option2");
  var option3 = document.getElementById("option3");
  var button = document.getElementById("btn");
  var quizSection = document.getElementById("quiz-section");
  var cardsContainer = document.querySelector(".quiz-cards");
  var index = 0;
  var score = 0;
  
  function startQuiz(quizId) {
      // Show quiz section and hide cards
      quizSection.classList.remove("hidden");
      cardsContainer.style.display = "none";
    
      // Reset index and score
      index = 0;
      score = 0;
    
      // Set the questions based on the quiz selected
      if (quizId === 1) {
          questions = htmlQuestions;  // HTML Quiz
      } else if (quizId === 2) {
          questions = cssQuestions;  // CSS Quiz
      } else if (quizId === 3) {
          questions = jsQuestions;   // JS Quiz
      }
    
      // Start the first question
      nextQuestion();
  }
  
  function nextQuestion() {
      var options = document.getElementsByName("answer");
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
          showScore();
          return;
      }
    
      ques.innerText = questions[index].question;
      option1.innerText = questions[index].option1;
      option2.innerText = questions[index].option2;
      option3.innerText = questions[index].option3;
      index++;
      button.disabled = true;
  }
  
  function showScore() {
      // Hide the quiz section
      quizSection.innerHTML = `
          <h2>Quiz Completed!</h2>
          <p>Your Score: ${score} / ${questions.length}</p>
          <button onclick="restartQuiz()">Restart Quiz</button>
      `;
  }
  
  function restartQuiz() {
      // Reset and show cards
      score = 0;
      index = 0;
      cardsContainer.style.display = "block";
      quizSection.classList.add("hidden");
  
      // Optionally reset any styles that might have been applied during the quiz
      cardsContainer.style.display = "flex";  // Ensure it's displayed as a flex container
      cardsContainer.style.flexWrap = "wrap"; // Allow wrapping for smaller screens
      cardsContainer.style.justifyContent = "space-around"; // Ensure cards are spaced out properly
  }
  
  function enableBtn() {
      button.disabled = false;
  }
  
  var min = 1;
  var sec = 10;
  var timer = document.getElementById("timer");
  var interval = setInterval(function () {
      timer.innerHTML = `${min} : ${sec}`;
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