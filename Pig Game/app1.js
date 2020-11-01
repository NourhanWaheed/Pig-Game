/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, activeGame, prevdice;


init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (activeGame){
        //get a random variable for dice
        dice = Math.floor(Math.random() * 6) + 1;
        

        //choose the specific picture
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        //move to the next player if dice 1
        if (dice === 6 && prevdice === 6){
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if(dice !== 1){
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
        }
        prevdice = dice;
    }
    
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (activeGame){
        // updaate the player score
        scores[activePlayer] += roundScore;

        // update the global value
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //check the winner
        var finalScore = document.querySelector('.final-score').value;
        var winningScore = finalScore;
        if (finalScore){
            winningScore = finalScore;
        }
        else{
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            activeGame = false;

        }
        else{
            nextPlayer();
        }
    }
    
})

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    //set the current active player to zero
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';

    //change the active player
    activePlayer ? activePlayer = 0 : activePlayer = 1;

    //set and remove active class
    document.querySelector('.dice').style.display = 'none';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}


function init()
{
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    activeGame = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}