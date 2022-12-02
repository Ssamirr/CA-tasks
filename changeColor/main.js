let mainInput = document.querySelector(".color__input");

mainInput.readOnly = true;

let color = "#";
const variables = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

document.querySelector(".color__change").addEventListener("click", function () {
    color = "#";

    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * variables.length);
        color += variables[randomNumber];
    }

    mainInput.value = color;
    document.querySelector('body').style.background = color;
})

document.querySelector(".color__copy").addEventListener("click", function () {
    mainInput.select()
    document.execCommand("copy")
    alert("copied")
})