import { generateQuiz } from "./helpers.js";

// DOM VARIABLES
const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const operation = document.getElementById("operation");
const answers = document.querySelector(".answers");
const titleElement = document.getElementById("title");
const pointsElement = document.querySelector(".points");
const timeLeft = document.querySelector(".time-left");
let count = 11;
let countdown;

// LOGICAL VARIABLES
const quizzes = [];

// HANDLE FUNCTIONS
function handleAnswer(e) {}



const timerDisplay = () => {
	countdown = setInterval(() => {
	  count--;
	  timeLeft.innerHTML = `${count}s`;
	  if (count == 0) {
		clearInterval(countdown);
		displayNext();
	  }
	}, 1000);
  };

// UI FUNCTIONS
function renderQuiz(quiz, isView = false) {
	answers.innerHTML = "";
	

	// render quiz
	number1.innerText = quiz.number1;
	number2.innerText = quiz.number2;
	operation.innerText = quiz.operation;
	titleElement.innerText = quizzes.length;
	timeLeft.innerHTML = timerDisplay();
	

	for (let answer of quiz.answers) {
		const answerElm = document.createElement("div");
		answerElm.className = `btn btn-outline-primary`;
		answerElm.innerText = answer;
		answers.appendChild(answerElm);
		

		if (isView) {
			if (quiz.answer === answer)
				answerElm.classList.replace("btn-outline-primary", `btn-${quiz.status}`);

			if (quiz.correctAnswer === answer)
				answerElm.classList.replace("btn-outline-primary", `btn-success`);
		}

		const handleAnswer = () => {
			const isCorrect = answer === quiz.correctAnswer;
			const status = isCorrect ? "success" : "danger";

			answerElm.classList.replace("btn-outline-primary", `btn-${status}`);

			quiz.answer = answer;
			quiz.status = status;

			addPoint(quiz);

			if (quizzes.length !== 10) init();
			else {
				answers.style.pointerEvents = "none";
				pointsElement.style.pointerEvents = "unset";
				
			}
		};

		answerElm.onclick = handleAnswer;
	}
}




function addPoint(quiz) {
	const point = document.createElement("div");
	point.className = `point btn-${quiz.status}`;
	point.innerText = quizzes.length;

	point.onclick = () => renderQuiz(quiz, true);

	pointsElement.append(point);
	
}

// LOGIC FUNCTIONS

function init() {
	
	const quiz = generateQuiz();
	quizzes.push(quiz);

	console.log(quizzes);

	renderQuiz(quiz);
}

init();

