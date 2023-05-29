const question = document.querySelector("#question");
const answers = Array.from(document.querySelectorAll(".choice-answer"));
const fillProgressBar = document.querySelector('#fill-progressbar')
const progess = document.querySelector('#progress')

//Einstellungen für Punkzahl bei korrekter Antwort und Anzahl Fragen
const pointsIfCorrect = 10;
const maxNumOfQuestions = 5;

let currQuestion = {};
let acceptAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];



let questions = [];

//Lokales .json File laden und questions Array damit auffüllen

fetch('questions.json')
    .then(response => response.json())
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startQuiz();
    })
    .catch(err => {
        console.error(err);
    });





startQuiz = () => {
    questionCounter = 0;
    score = 0;
    //Alle Fragen in das Array "availableQuestions" hinzufügen
    availableQuestions = [...questions];
    getNewQuestion();

}

getNewQuestion = () => {
    //Prüfen ob sich noch Fragen im Array befinden oder die maximale Anzahl Fragen ereicht wurde
    if (availableQuestions.length === 0 || questionCounter >= maxNumOfQuestions) {
        //Speichern des Punktestands in LocalStorage wenn Spiel fertig
        localStorage.setItem("mostRecentScore", score);
        //Sprung zur Endseite
        return window.location.assign("end.html");


    }
    //Update Progressbar
    fillProgressBar.style.width = `${(questionCounter / maxNumOfQuestions) * 100}%`;
    //Zähler der gebrauchten Fragen updaten
    questionCounter++;
    //   X/Total Fragen nazeigen
    progess.innerText = `Frage ${questionCounter}/${maxNumOfQuestions}`;

    //Auswahl einer zufälligen Frage aus dem Array 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currQuestion = availableQuestions[questionIndex];
    //Update des Frage Texts auf der Quiz Seite
    question.innerText = currQuestion.question;

    //Update der Antworten auf der Quiz Seite
    answers.forEach((answer) => {
        const number = answer.dataset["number"];
        answer.innerText = currQuestion["choice" + number];
    })


    //Entfernen der ausgewählten Frage aus dem Array
    availableQuestions.splice(questionIndex, 1);
    acceptAnswer = true;
}

answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
        if (!acceptAnswer) return;
        acceptAnswer = false;

        //Speichern der Antwortnummer für die geklickte Antwort in selectedAnswerNum
        const selectedAnswer = e.target;
        const selectedAnswerNum = selectedAnswer.dataset["number"];


        //Die Klasse inkorrekt wird automatisch zugewiesen ausser die Antwort ist richtig.

        let classToApply = 'incorrect-answer';

        //Kein strikter Vergleich weil nicht von gleichem Datentyp  
        if (selectedAnswerNum == currQuestion.answer) {
            classToApply = 'correct-answer';
            updateScore();
        }

        //Die Klasse wird zugewiesen und nach 1 Sekunde entfernt

        selectedAnswer.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedAnswer.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000)

    })
})

updateScore = () => {
    score += pointsIfCorrect;
    document.querySelector("#score").innerText = score;
}
