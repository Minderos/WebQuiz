const username = document.querySelector("#username");
const finalscore = document.querySelector("#finalScore");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Maximale Einträge in der Highscoreliste
const maxEntries = 5;

//Erstellung der Array für die Platzierung
const placement = [];

for (let i = 0; i < maxEntries; i++) {
    placement.push(i + 1);
}

//Ausgabe der errreichten Punktzahl
finalscore.innerText = `${mostRecentScore} Pkt.`;


//Button zum Speichern der Punktzahl
saveScoreBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const scoreObj = {
        score: mostRecentScore,
        player: username.value
    }
    highScores.unshift(scoreObj);
    //Sortierung nach Punktzahl (absteigend)
    highScores.sort((a, b) => b.score - a.score);
    //Löschen des Wertes mit der tiefsten Punktzahl, falls maxEntries überschritten wird
    highScores.splice(maxEntries);
    //Hinzufügen der Platzierung
    highScores.map((scoreObj, index) => {
        scoreObj.placement = placement[index];
    })
    //Speichern der Highscores in LocalStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("index.html");
})


//Der Button ist deaktiviert, solange das Feld Spielername leer ist.
username.addEventListener("input", function () {
    saveScoreBtn.disabled = !username.value;
})






