let numbers = document.querySelectorAll(".number");
let display = document.querySelector("#display");
let equals = document.querySelector("#equals");
let operators = document.querySelectorAll(".operator");
let decimal = document.querySelector("#decimal");
let clear = document.querySelector("#clear");
let allOperatos = [];
let lastChar;
let displayValue;

numbers.forEach(function (element) {
    element.addEventListener("click", function () {
        let num = element.value;
        displayValue = display.innerText;
        lastChar = displayValue.charAt(displayValue.length - 1);
        if (displayValue == "0") {
            display.innerText = "";
        } else if (allOperatos.includes(lastChar)) {
            if (element.value == "0") {
                num = "";
            }
        }
        display.innerText += num;
    })
})

operators.forEach(function (element) {
    allOperatos.push(element.value);
    element.addEventListener("click", function () {
        displayValue = display.innerText;
        lastChar = displayValue.charAt(displayValue.length - 1);
        if (allOperatos.includes(lastChar)) {
            let lastOperator = displayValue.lastIndexOf(lastChar);
            let replaceLastOperator = element.value;
            let replacedDisplay = displayValue.substring(0, lastOperator) + replaceLastOperator + displayValue.substring(lastOperator + 1);
            display.innerText = replacedDisplay;
        } else {
            display.innerText += element.value;
        }
    })
})

decimal.addEventListener("click", function () {
    displayValue = display.innerText;
    let splittedDisplay = displayValue.split(/(?=[-+*/])/);
    let lastIndexDisplay = splittedDisplay[splittedDisplay.length - 1];
    if (!lastIndexDisplay.includes(".")) {
        display.innerText += decimal.value;
    }
})


equals.addEventListener("click", function () {
    let result;
    displayValue = display.innerText;
    lastChar = displayValue.charAt(displayValue.length - 1);
    if (allOperatos.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
    }
    if (eval(displayValue) % 1 != 0) {
        result = eval(displayValue).toFixed(2);
    } else {
        result = eval(displayValue);
    }
    display.innerText = result;
})

clear.addEventListener("click", function () {
    display.innerText = 0;
})




