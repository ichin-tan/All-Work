const playNow = document.querySelector("button");
const playerValueP = document.querySelector("#player-value");
const computerValueP = document.querySelector("#computer-value");
const resultContainer = document.querySelector(".result-container");
const images = document.querySelectorAll("img");
const userDice = images[0];
const computerDice = images[1];
const resultP = document.querySelector("#result-p");

showResult(true);

userDice.src = "";
computerDice.src = "";


playNow.addEventListener("click", () => {

    const userValue = document.querySelector("input").value
    
    const numUserValue = parseInt(userValue);
    console.log(typeof(numUserValue));

    const computerValue = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    console.log(computerValue);

    const isValidUserNumber = numUserValue === 1 || numUserValue === 2 || numUserValue === 3 || numUserValue === 4 || numUserValue === 5 || numUserValue === 6; 

    if(!isValidUserNumber) {
        resultP.innerText = "The number should be in 1 to 6";
        showResult(true);
        return;    
    } 

    let winner = ""
    if (computerValue > numUserValue) {
        winner = "computer"
    } else if (computerValue < numUserValue) {
        winner = "user"
    } else if (computerValue === numUserValue) {
        winner = "tie"
    }
    
    playerValueP.innerText = "player value is " + numUserValue;
    computerValueP.innerText = "computer value is " + computerValue;
    resultP.innerText = "The winner is: " + winner;    

    const userDiceFile = `./assets/dice0${numUserValue}.png`;
    userDice.src = userDiceFile;

    const computerDiceFile = `./assets/dice0${computerValue}.png`;
    computerDice.src = computerDiceFile;

    showResult(false);   
    
    document.querySelector("#history").innerHTML += `<li>User picked : ${numUserValue}, computer picked : ${computerValue}, winner is : ${winner}</li>`
})

function showResult(hidden) {
    resultContainer.style.display = hidden ? "none" : "";
}

