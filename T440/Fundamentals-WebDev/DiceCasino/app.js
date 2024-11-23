
const game = document.querySelector(".casino");
const validationMessage = document.querySelector(".validation-message");
const rollButton = document.querySelector("button");
const diceImages = document.querySelectorAll("img");

const dice1 = diceImages[0];
const dice2 = diceImages[1];
const dice3 = diceImages[2];

const balance = document.querySelector("#balance");

let amount = 0;

game.style.display = "none";


rollButton.addEventListener("click", () => {

    const userAge = document.querySelector("input").value; // "16"
    const numAge = parseInt(userAge);     // 16

    if (userAge === "") {
        validationMessage.style.display = ""
        validationMessage.innerText = "Please enter your age!"
        game.style.display = "none"
        return;
    }

    if (numAge < 18) {
        validationMessage.style.display = ""
        validationMessage.innerText = "You are not eligible to play!"
        game.style.display = "none"
        return;
    }

    validationMessage.style.display = "none"
    game.style.display = ""

    const random1 = Math.floor(Math.random() * (6 - 1 + 1) + 1);    //2 6 4 1
    const random2 = Math.floor(Math.random() * (6 - 1 + 1) + 1);   // 3 5 4 2
    const random3 = Math.floor(Math.random() * (6 - 1 + 1) + 1);   // 5 3 3 3

    dice1.src = `dice0${random1}.png`
    dice2.src = `dice0${random2}.png`
    dice3.src = `dice0${random3}.png`

    if (random1 === random2 && random1 === random3) {
        amount += 500;
    } else if (random1 % 2 == 0 && random2 % 2 == 0 && random3 % 2 == 0) {
        amount += 2000;
    } else {
        amount -= 20;
    }

    balance.innerText = `Your balance is ${amount}`;
})
