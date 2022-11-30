let guess_button = document.querySelector(".guess_button");
let guess_input = document.querySelector(".guess_input");

let randomNumber = Math.ceil(Math.random() * 15);
console.log(randomNumber)


let guessed_number = 0;

guess_button.addEventListener("click", function () {

    if (!(guess_input.value >= 1 && guess_input.value <= 15)) {
        alert("Guess a number between 1-15");
    } else {
        guessed_number++;
        if (randomNumber == guess_input.value) {
            document.querySelector(".display").innerText = "Well done";
            document.querySelector(".guessedNumber").innerText += randomNumber;
            document.querySelector(".mainNumber").innerText += guessed_number;
            guess_button.classList.add("pointerEvent")

        } else if (randomNumber > guess_input.value) {
            document.querySelector(".display").innerText = "Low-Try Again"
        } else {
            document.querySelector(".display").innerText = "High-Try Again"
        }
    }

})