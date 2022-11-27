let main_input = document.querySelector('.password__main_input input');
let password_copy = document.querySelector('.password__main_input__copy');
let password_checkboxes = document.querySelectorAll(".password__checkboxes");
let password_length = document.querySelector('.password__length input')
let password_length_value = password_length.value;
let password_button = document.querySelector('.password__button button');

const upperCase_letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowerCase_letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"];
let all_variables = [];
let new_password = "";

main_input.readOnly = true;

password_copy.addEventListener('click', function () {
    main_input.select()
    document.execCommand("copy")
})

password_length.addEventListener('input', function () {
    if (password_length.value < 5) {
        password_length.value = 5;
    }
    password_length_value = password_length.value;
})

password_button.addEventListener('click', function () {
    all_variables = [];
    new_password = "";
    if (document.getElementById('uppercase').checked) {
        all_variables.push(...upperCase_letters);
    }
    if (document.getElementById('lowercase').checked) {
        all_variables.push(...lowerCase_letters);
    }
    if (document.getElementById('number').checked) {
        all_variables.push(...numbers);
    }
    if (document.getElementById('symbol').checked) {
        all_variables.push(...symbols);
    }

    if (all_variables.length > 0) {
        for (let i = 0; i < password_length_value; i++) {
            let random_number = Math.floor(Math.random() * all_variables.length);
            new_password += all_variables[random_number];
        }
    }
    main_input.value = new_password;
})