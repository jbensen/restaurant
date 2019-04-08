/*
	Name: Jacob Bensen
	Date Created: 4/3/19
	Most recent revision: 4/3/19
*/

var money;
var result;
var diceCount;
var rollCount;
var maxMoney;
var maxMoneyRoll;
var startBet;
var moneyList = new Array();

//Rolls the specified number of dice with the specified number of sides once.
function rollDice(numDice, numSides){
	result = Math.floor(Math.random() * numSides) + 1;
	diceCount = 1;
	while(diceCount < numDice){
		result += Math.floor(Math.random() * numSides) + 1;
		diceCount++;
	}
	return result;
}

//Records money value into an array. To be called after each roll of the dice.
function recordMoney(array){
	array.push(money);
}

//Searches array for the highest value and returns it as maxMoney. Roll count is returned as maxMoneyRoll.
function findMax(array){
	maxMoney = array[0];
	maxMoneyRoll = 0;
	for(i = 0; i <= array.length - 1; i ++){
		if(maxMoney < array[i]){
			maxMoney = array[i];
			maxMoneyRoll = i;
		}
	}
	return maxMoney;
}

//Called when the input field for starting bet is changed.
function addMoney(){
	money = Number(document.getElementById("money").value);
}

//Called when money runs out in the playGame function.
//Displays results block with relevant values, resets money input to zero.
function gameOver(){
	findMax(moneyList);
	document.getElementById("maxMoney").innerText = maxMoney;
	document.getElementById("maxMoneyRoll").innerText = maxMoneyRoll;
	document.getElementById("startBet").innerText = startBet;
	document.getElementById("rollCount").innerText = rollCount;
	document.getElementById("results").style.display = "block";
	document.getElementById("money").value = 0;
}

//Plays the game Lucky Sevens.
function playGame(){
	if(money<=0){
		document.getElementById("error").style.display = "block";
	}else{document.getElementById("error").style.display = "none";}
	rollCount = 0;					//resets rollCount for new game
	moneyList.length = 0;			//resets moneyList array to empty for new game
	startBet = money;				//records initial money
	while(money > 0){				//runs until money is 0 or less
		recordMoney(moneyList);		//calls recordMoney function to add to moneyList
		rollDice(2,6);				//calls rollDice function with two six-sided dice
		rollCount ++;				//increments rollCount for this game instance
		if(result == 7){			//if the roll result is 7
			money += 4;				//add 4 to money
		}else{						//if the roll result is not 7
			money -= 1;				//subtract 1 from money
		}
	gameOver();
	}
}

