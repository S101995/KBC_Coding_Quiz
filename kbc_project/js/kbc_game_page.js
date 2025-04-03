const questions = [
    {
        question: " Who created JavaScript and in which year?",
        options: ["(A) Brendan Eich 1995", "(B) Brendan Eich 1992", "(C) Dennis Ritchie 1989", "(D) Guido van Rossum 1989"],
        correct: 0,
    },
    {
        question: " What is the full name of CSS?",
        options: ["(A) Cascading Style Shits", "(B) Cascading Style Sheets", "(C) Cascading Style Sheetster", "(D) None"],
        correct: 1,
    },
    {
        question: " What is the Output of 'console.log('12'-5)'?",
        options: ["(A) 125", "(B) Error", "(C) 7", "(D) 12-5"],
        correct: 2,
    },
    {
        question: "Bootstrap? is a _____",
        options: ["(A) Library", "(B) Language", "(C) Open-source framework", "(D) None of these"],
        correct: 2,
    },
    {
        question: " Which method is used to add an element at the 0 index of an array?",
        options: ["(A) join()", "(B) shift()", "(C) unshift()", "(D) pop()"],
        correct: 2,
    },
    {
        question: " What is the correct syntax of the ternary operator in JS?",
        options: ["(A) value < 10 ? condition True : condition False", "(B) value < 10 ? condition True ; condition False", "(C) value < 10 ? condition True : condition False", "(D) All is Correct"],
        correct: 0,
    },
    {
        question: " Can we change the value of a variable declared with const?",
        options: ["(A) No", "(B) Yes with Array", "(C) Yes with Object", "(D) Both B and C"],
        correct: 3,
    },
    {
        question: " What is the Output of 'console.log(x = parseInt(9 + '9' + 9))'?",
        options: ["(A) 27", "(B) Error", "(C) 999", "(D) '999'"],
        correct: 2,
    },
    {
        question: " Guess the Output let str ='hello'; str.length=8; console.log(str.length); ?",
        options: ["(A) 5", "(B) 8", "(C) error", "(D) undefined"],
        correct: 0,
    },
    {
        question: " Guess the Output const arr = [1, 2, 3, null]; const removed = arr.pop(); console.log(removed); ?",
        options: ["(A) undefined", "(B) 3", "(C) [1,2,3]", "(D) null"],
        correct: 3,
    }
];

// Prize 
const prizeOrder = [
    "₹ 10,000", "₹ 20,000", "₹ 40,000", "₹ 80,000", "₹ 1,60,000",
    "₹ 3,00,000", "₹ 6,50,000", "₹ 12,50,000", "₹ 25,00,000", "₹ 51,00,000"
];

let currentQuestionIndex = 0;
let usedLifelines = { "phone-a-friend": false, "fifty-fifty": false, "ask-audience": false };
let countDown;
let minute = 1;
let seconds = 0;
let selectedOption = null;

const kbcOpening = document.getElementById("kbcOpening");
const timerSound = document.getElementById("timerSound");
const newQuestionSound = document.getElementById("new-question-sound");
const timerDisplay = document.getElementById("timer");

const shuffledQuestions = shuffleQuestions(questions);




// Random Questions
function shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
}

function loadQuestion() {
    minute = 0;
    seconds = 46;
    stopTimer();
    startTimer();

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("answer1").textContent = currentQuestion.options[0];
    document.getElementById("answer2").textContent = currentQuestion.options[1];
    document.getElementById("answer3").textContent = currentQuestion.options[2];
    document.getElementById("answer4").textContent = currentQuestion.options[3];

    document.getElementById('msg').textContent = `Prize for this Question is`;
    document.getElementById("prize-message").textContent = prizeOrder[currentQuestionIndex];

    resetAnswers();

}

// reseting answer 
function resetAnswers() {
    const answerButtons = document.getElementsByClassName("answer");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].style.backgroundColor = "";
        answerButtons[i].disabled = false; // Ensure buttons are enabled
    }
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("answer-feedback").textContent = "";
}

// function for timer 

function formatTime(value) {
    return value < 10 ? '0' + value : value.toString();
}

function startTimer() {
    countDown = setInterval(function () {
        if (minute === 0 && seconds === 0) {
            clearInterval(countDown);
            endGame();
            disableLifelines()
            document.getElementById('gameMsg').innerText = "Time's up! Game Over.";

        } else {
            if (seconds === 0) {
                minute--;
                seconds = 59;
            } else {
                seconds--;
            }
            timerDisplay.innerHTML = formatTime(minute) + ':' + formatTime(seconds);
        }
    }, 1000);
}


// timer for lifline 50-50
function startLifeLineTimer() {
    minute = 0;
    seconds = 30;

    countDown = setInterval(function () {
        if (minute === 0 && seconds === 0) {
            document.getElementById('gameMsg').innerText = "Your Phone Time is up !!!";
            clearInterval(countDown);
            // endGame();
        } else {
            if (seconds === 0) {
                minute--;
                seconds = 59;
            } else {
                seconds--;
            }
            timerDisplay.innerHTML = formatTime(minute) + ':' + formatTime(seconds);
        }
    }, 1000);
}


function stopTimer() {
    clearInterval(countDown);
}

// function for checking ans correct or incorrect

function checkAnswer(selectedOptionIndex) {
    selectedOption = selectedOptionIndex; 
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const answerButtons = document.getElementsByClassName("answer");

    stopTimer();

    if (selectedOption === currentQuestion.correct) {
        answerButtons[selectedOption].style.backgroundColor = "green"; 
        document.getElementById("answer-feedback").textContent = "Correct! You won " + prizeOrder[currentQuestionIndex];

        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            document.getElementById('gameMsg').innerText = "Congratulations! You Won " + prizeOrder[currentQuestionIndex];
            document.getElementsByClassName('kbc-logo')[0].src = "img/kbc_cheque_given.jpg ";


            endGame();
        } else {
            document.getElementById("next-btn").style.display = "block";
        }
    } else {
        answerButtons[selectedOption].style.backgroundColor = "red"; 
        document.getElementById("answer-feedback").textContent = "Wrong Answer! Game Over.";
        disableLifelines();
        endGame();
    }
}

// function end game for chceking correct or incorrect ans

function endGame() {
    document.getElementById("next-btn").style.display = "none";
    const answerButtons = document.getElementsByClassName("answer");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = true;
    }

    if (currentQuestionIndex === 0 && selectedOption !== shuffledQuestions[currentQuestionIndex].correct) {
        document.getElementById('gameMsg').innerText = "Wrong Answer! Game Over. You Won ₹0";
    } else if (currentQuestionIndex === shuffledQuestions.length - 1) {
        document.getElementById('gameMsg').innerText = `Congratulations! You Won ${prizeOrder[currentQuestionIndex]}`;
    } else {
        document.getElementById('gameMsg').innerText = `Wrong Answer! Game Over. You Won ${prizeOrder[currentQuestionIndex - 1]}`;
        
    }
}

// functions for disable and enable lifeline btn

function disableLifelines() {
    document.getElementById("phone-a-friend").disabled = true;
    document.getElementById("fifty-fifty").disabled = true;
    document.getElementById("ask-audience").disabled = true;
}
function enaableLifelines() {
    document.getElementById("phone-a-friend").disabled =false;
    document.getElementById("fifty-fifty").disabled =false;
    document.getElementById("ask-audience").disabled =false;
}



// event listner for nxt btn

document.getElementById("next-btn").addEventListener("click", function () {
    if (document.getElementById("next-btn").style.display === "none") return;

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        document.getElementById('gameMsg').innerText = '';
        loadQuestion();
        newQuestionSound.play();
    } else {
        document.getElementById('gameMsg').innerText = "You have completed the quiz!";
        endGame();
    }
});


document.getElementById("phone-a-friend").addEventListener("click", function () {
    if (!usedLifelines["phone-a-friend"]) {
        usedLifelines["phone-a-friend"] = true;
        document.getElementById('gameMsg').innerText = "Phone a Friend lifeline used!";
        stopTimer();
        startLifeLineTimer()
        setTimeout(() => {

            timerSound.play();
        }, 60000);


        document.getElementById("phone-a-friend").disabled = true;
    } else {
        alert("You already used this lifeline.");
    }
});

document.getElementById("fifty-fifty").addEventListener("click", function () {
    if (!usedLifelines["fifty-fifty"]) {
        usedLifelines["fifty-fifty"] = true;
        document.getElementById('gameMsg').innerText = "50-50 Lifeline used! Two incorrect answers are removed.";

        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const answerButtons = document.getElementsByClassName("answer");

        const incorrectAnswers = [];
        for (let i = 0; i < answerButtons.length; i++) {
            if (i !== currentQuestion.correct) {
                incorrectAnswers.push(i);
            }
        }

        const randomIncorrectIndex = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];

        for (let i = 0; i < answerButtons.length; i++) {
            if (i !== currentQuestion.correct && i !== randomIncorrectIndex) {
                answerButtons[i].disabled = true;
            }
        }

        stopTimer();
        document.getElementById("fifty-fifty").disabled = true;
    } else {
        alert("You already used this lifeline.");
    }
});

document.getElementById("ask-audience").addEventListener("click", function () {
    if (!usedLifelines["ask-audience"]) {
        usedLifelines["ask-audience"] = true;
        document.getElementById('gameMsg').innerText = "Audience is voting Please wait.";
        stopTimer();
        startLifeLineTimer()
        document.getElementById("ask-audience").disabled = true;
    } else {
        alert("You already used this lifeline.");
    }
});



const buttons = document.querySelectorAll('.answer');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        checkAnswer(i);
    };
}

window.onload = function () {
    kbcOpening.play();  
    disableLifelines();  
    document.getElementsByClassName('kbc-logo')[0].src = "img/kbc_onload_img.png";
    

};



setTimeout(() => {
    loadQuestion();
    enaableLifelines()
    document.getElementsByClassName('kbc-logo')[0].src = "img/kbc_game_page.png";
}, 2000);
