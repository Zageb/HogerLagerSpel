const lifeScreen = document.querySelector(".livesText");
const coinScreen = document.querySelector(".coinsText");
const scoreScreen = document.querySelector("#scoreScreen");

const btnThrow = document.querySelector('.controlButtons button:nth-child(1)');
const btnHigher = document.querySelector('.controlButtons button:nth-child(2)');
const btnLower = document.querySelector('.controlButtons button:nth-child(3)');

const feedbackText = document.querySelector(".feedbackTekst");

let lives, coins;
let gameStarted;    //om te kijken of het de eerste ronde is
let previousDiceRoll, currentDiceRoll;
let playerBet;              //checkt of de speler hoger of lager kiest  


function updateScreens(){   //Dit update lives en coins
    lifeScreen.textContent = "Lives: " + lives;
    coinScreen.textContent = "Coins: " + coins;
}

function Feedback(text){    //witte tekst onderin
    feedbackText.textContent = text;
}

function Setup(){     //alles resetten per potje
    gameStarted = false;
    lives = 3; 
    coins = 0;
    updateScreens();
    btnThrow.textContent = "Go";
    scoreScreen.textContent = "#";
    btnThrow.disabled = false;
    btnHigher.hidden = true;
    btnLower.hidden = true;
    Feedback("Press Go to throw first dice");
}


function diceRandom(min, max) { //dice random getal geven
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateScore(){ //vergelijken of de dicerolls hetzelfde zijn en coins geven/levens eraf halen/game over
    if(previousDiceRoll == currentDiceRoll){
        Feedback("You rolled the same number ( º﹃º ) roll again!");
    }
    else if((currentDiceRoll > previousDiceRoll) && (playerBet == "higher")){
        Feedback("You won a coin! (◞థ౪థ)ᴖ roll again!");
        coins++;
    }
    else if((currentDiceRoll < previousDiceRoll) && (playerBet == "lower")){
        Feedback("You won a coin! ✌(-‿-)✌ roll again!");
        coins++;
    }
    else{
        console.log(previousDiceRoll + " -> " + currentDiceRoll);
        Feedback("You lost a life ୧༼ಠ益ಠ╭∩╮༽ roll again!");
        lives--;
    }
    updateScreens();

    if(lives <= 0){ //het kijkt of leven niet 0 is zodat je ziet of je hebt verloren of niet
        alert("It's Over ༼ ༎ຶ ෴ ༎ຶ༽ your score was " + coins);
        Setup();
    }
}

btnThrow.addEventListener('click', function() { //random getal maken en de screens updaten qua lives en score
    currentDiceRoll = diceRandom(1,6);
    scoreScreen.textContent = currentDiceRoll;
    btnThrow.disabled = true;   //je kan de knoppen niet klikken
    
    if(gameStarted == false){   //als het de eerste ronde is, verander de btn text naar throw dice en laat keuzes zien
        btnThrow.textContent = "Throw Dice";
        btnHigher.hidden = false;    //je kan de knop zien nu
        btnLower.hidden = false;     //je kan de knop zien nu
        gameStarted = true;
        Feedback("Choose whether the next roll will be Higher or Lower than the current roll ("+currentDiceRoll+")");
    }
    else{
        updateScore();   //update de score bij tweede diceroll of hoger
    }

    previousDiceRoll = currentDiceRoll; //nadat de scores zijn geupdate/of eerste ronde moet de laatste diceroll worden onthouden
    btnHigher.disabled = false; //je kan de knoppen niet klikken
    btnLower.disabled = false;
});

btnHigher.addEventListener('click', function() { //als je higher klikt kan je higher niet meer klikken
    playerBet = "higher";
    btnThrow.disabled = false;
    btnHigher.disabled = true;
    btnLower.disabled = false;
});

btnLower.addEventListener('click', function() { //als je lower klikt kan je lower niet meer klikken
    playerBet = "lower";
    btnThrow.disabled = false;
    btnHigher.disabled = false;
    btnLower.disabled = true;
});


Setup();