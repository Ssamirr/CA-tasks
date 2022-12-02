let mainInput = document.querySelector('.password__main_input input');
let passwordCopy = document.querySelector('.password__main_input__copy');
let passwordCheckboxes = document.querySelectorAll(".password__checkboxes");
let passwordLength = document.querySelector('.password__length input')
let passwordLengthValue = passwordLength.value;
let passwordButton = document.querySelector('.password__button button');

const upperCaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowerCaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"];
let allVariables = [];
let newPassword = "";

mainInput.readOnly = true;

passwordCopy.addEventListener('click', function () {
    mainInput.select()
    document.execCommand("copy")
})

passwordLength.addEventListener('input', function () {
    if (passwordLength.value < 5) {
        passwordLength.value = 5;
    }
    passwordLengthValue = passwordLength.value;
})

passwordButton.addEventListener('click', function () {
    allVariables = [];
    newPassword = "";
    if (document.getElementById('uppercase').checked) {
        allVariables.push(...upperCaseLetters);
    }
    if (document.getElementById('lowercase').checked) {
        allVariables.push(...lowerCaseLetters);
    }
    if (document.getElementById('number').checked) {
        allVariables.push(...numbers);
    }
    if (document.getElementById('symbol').checked) {
        allVariables.push(...symbols);
    }

    if (allVariables.length > 0) {
        for (let i = 0; i < passwordLengthValue; i++) {
            let randomNumber = Math.floor(Math.random() * allVariables.length);
            newPassword += allVariables[randomNumber];
        }
    }
    mainInput.value = newPassword;
})