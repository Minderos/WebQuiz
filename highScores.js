const highScoreList = document.querySelector('#highScoresList');
//laden des Highscores aus lokalem Speicher
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];



//Erstellen des strings welcher anschliessen in die ul eingefügt wird
highScoresList.innerHTML =

    highScores.map((scoreObj) => {
        return `<li>${scoreObj.placement}. ${scoreObj.player} - ${scoreObj.score} Pkt.</li>`;
    }).join('');





