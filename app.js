/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,gamePlaying,prevDice,prevDice2,winScore,cekFScore;
var diceDOM = document.querySelector('.dice');
var diceDOM2 = document.querySelector('.dice2');

init();


document.querySelector('.dice').style.display="none";
document.querySelector('.dice2').style.display="none";

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.btn-submit').addEventListener('click',function(){
	
	var tmp = document.getElementById('sc-win').value;

	if(tmp>0){
		winScore = tmp;
	}else{
		winScore = 100;
	}
	cekFScore = 1;
	document.querySelector('.btn-submit').style.display = "none";
	document.getElementById('sc-win').style.display = "none";
});


document.querySelector('.btn-roll').addEventListener('click',function(){
	if(gamePlaying && cekFScore === 1){
		// 1. Rand Number
		var dice = Math.floor(Math.random() *6) + 1;
		var dice2 = Math.floor(Math.random() *6) + 1;

		//save dice if six for check
		if(dice === 6){
			prevDice += 1;
		}else if(dice2 === 6){
			prevDice2 += 1;
		}else{
			prevDice = 0;
			prevDice2 = 0;
		}

		//2. Display the result
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		diceDOM2.style.display = 'block';
		diceDOM2.src = 'dice-' + dice2 + '.png';

		console.log("prevDice1 " + prevDice);
		console.log("prevDice2 " + prevDice2);
		console.log("dice1 " + dice);
		console.log("dice2 " + dice2);


		if(prevDice <= 1 && prevDice2 <= 1){

			//3 update the round score if rolled number was not a 1
			if(dice !== 1 && dice2 !== 1){
				roundScore+=(dice+dice2);
				document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';
				//score[0,0] = document.querySelector('#score-0').textContent;

			
			}else{
				nextPlayer();
			}

		}else{
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click',function(){
	if(gamePlaying && cekFScore === 1){
		// Add Current score to Global score
		scores[activePlayer] += roundScore;

		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//check if player won the game
		if(scores[activePlayer] >=winScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

		
			diceDOM.style.display = "none";
			diceDOM2.style.display = "none";
			gamePlaying = false;

		}else{
			// next player
			nextPlayer();
		}
	}
});

function nextPlayer(){
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		diceDOM.style.display = 'none';
		diceDOM2.style.display = 'none';

	
}

function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	prevDice = 0;
	prevDice2 = 0;
	cekFScore =0;

	document.getElementById('sc-win').style.display = 'block';
	document.querySelector('.btn-submit').style.display = 'block';

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');


}

document.querySelector('.btn-new').addEventListener('click',init);

//document.querySelector('#current-' + activePlayer ).textContent = dice;

//console.log(x);

/*
	Your 3 Challenges
	Change the game to follow these rules:

	1.	A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's 
	turn. (Hint: always save the previous dice roll in a separate variable)
	2. Add an input field to the HTML where players can set the winning score, so that they can change the 
	predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This
	is a good oportuniaty to use google to figure this out :)
	3. Add another dice to the game, so that there are two dices now. They player looses his current score
	when one of them is a 1. (Hint you will need CSS to position the second dice, so take a look at the CSS
	code for the first one)

*/

