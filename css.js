var cssQuestions = [
    {
      question: "Which property is used to change the background color in CSS?",
      option1: "background-color",
      option2: "bg-color",
      option3: "color-background",
      correctAnswer: "background-color",
    },
    {
      question: "How do you select an element with the id 'demo' in CSS?",
      option1: "#demo",
      option2: ".demo",
      option3: "demo",
      correctAnswer: "#demo",
    },
    {
      question: "Which CSS property is used to change the text color?",
      option1: "color",
      option2: "font-color",
      option3: "text-color",
      correctAnswer: "color",
    },
    {
      question: "How do you make a list not display bullet points in CSS?",
      option1: "list-style-type: none",
      option2: "list-type: none",
      option3: "none-style: list",
      correctAnswer: "list-style-type: none",
    },
    {
      question: "Which CSS property is used to change the font size?",
      option1: "font-size",
      option2: "text-size",
      option3: "font-style",
      correctAnswer: "font-size",
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