const questions = [
    {
        question: "What is the capital of India?",
        choices: ["Paris", "London", "NewDelhi", "Rome"],
        correctAnswer: 2
    },
    {
        question: "Who invented python?",
        choices: ["Guido van Rossum", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correctAnswer: 0
    },
    {
        question: "which built-in funtion can get information from the user?",
        choices: ["print", "input", "int", "round"],
        correctAnswer: 1
    }
];
let currentQuestion = 0;
let score = 0;
let questionTimer;
let userAnswers = [];
function displayQuestion() {
    const questionElem = document.getElementById("question");
    const choicesElem = document.getElementById("choices");
    const questionObj = questions[currentQuestion];

    questionElem.textContent = questionObj.question;
    choicesElem.innerHTML = "";

    questionObj.choices.forEach((choice, index) => {
        const choiceElem = document.createElement("button");
        choiceElem.textContent = choice;
        choiceElem.addEventListener("click", () => checkAnswer(index));
        choicesElem.appendChild(choiceElem);
    });

    startTimer(questionObj);
}
function startTimer(questionObj) {
    let timeLeft = 10; 
    const timerElem = document.getElementById("timer");

    clearInterval(questionTimer);
    timerElem.textContent = `Time Left: ${timeLeft}`;

    questionTimer = setInterval(() => {
        timeLeft--;
        timerElem.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(questionTimer);
            checkAnswer(-1); 
        }
    }, 1000);
}
function checkAnswer(choice) {
    clearInterval(questionTimer);
    
    const questionObj = questions[currentQuestion];

    if (choice === questionObj.correctAnswer) {
        score++;
        document.getElementById("feedback").textContent = "Correct!";
    } else if (choice !== -1) {
        document.getElementById("feedback").textContent = "Incorrect!";
    } else {
        document.getElementById("feedback").textContent = "Time's Up!";
    }

    userAnswers.push(choice);
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}
function endQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = `Your Score: ${score}/${questions.length}`;
}
function reviewAnswers() {
    const resultContainer = document.getElementById("result-container");
    const reviewList = document.createElement("ol");

    resultContainer.innerHTML = "<h2>Your Quiz Results</h2>";
    resultContainer.appendChild(reviewList);

    questions.forEach((question, index) => {
        const listItem = document.createElement("li");
        const userChoice = userAnswers[index];
        const correctChoice = question.correctAnswer;
        const isCorrect = userChoice === correctChoice;

        listItem.textContent = `${question.question} - ${isCorrect ? 'Correct' : 'Incorrect'}`;
        if (!isCorrect) {
            const correctChoiceText = question.choices[correctChoice];
            listItem.textContent += ` (Your Answer: ${question.choices[userChoice]}, Correct Answer: ${correctChoiceText})`;
        }

        reviewList.appendChild(listItem);
    });
}
document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
});
document.getElementById("review-btn").addEventListener("click", () => {
    reviewAnswers();
});
document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    displayQuestion();
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
});
displayQuestion();
