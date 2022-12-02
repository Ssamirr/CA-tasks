let guessButton = document.querySelector(".guess_button");
let guessInput = document.querySelector(".guess_input");

let randomNumber = Math.ceil(Math.random() * 15);
console.log(randomNumber)


let guessedNumber = 0;

guessButton.addEventListener("click", function () {

    if (!(guessInput.value >= 1 && guessInput.value <= 15)) {
        alert("Guess a number between 1-15");
    } else {
        guessedNumber++;
        if (randomNumber == guessInput.value) {
            document.querySelector(".display").innerText = "Well done";
            document.querySelector(".guessedNumber").innerText += randomNumber;
            document.querySelector(".mainNumber").innerText += guessedNumber;
            guessButton.classList.add("pointerEvent")

        } else if (randomNumber > guessInput.value) {
            document.querySelector(".display").innerText = "Low-Try Again"
        } else {
            document.querySelector(".display").innerText = "High-Try Again"
        }
    }

})