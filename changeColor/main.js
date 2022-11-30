let main_input = document.querySelector(".color__input");

main_input.readOnly = true;

let color = "#";
const variables = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

document.querySelector(".color__change").addEventListener("click", function () {
    color = "#";

    for (let i = 0; i < 6; i++) {
        let randomnumber = Math.floor(Math.random() * variables.length);
        color += variables[randomnumber];
    }

    main_input.value = color;
    document.querySelector('body').style.background = color;
})

document.querySelector(".color__copy").addEventListener("click", function () {
    main_input.select()
    document.execCommand("copy")
    alert("copied")
})