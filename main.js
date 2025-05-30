// ===== FUNCTIONS FOR THE OPERATIONS ===== //
function sum(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
    return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
    if (secondOperand === 0) return "Error.";
    return firstOperand / secondOperand;
}


// ===== BUTTONS ===== //
const numbers = document.querySelectorAll(".number");       // List of Numbers.
const operators = document.querySelectorAll(".operator");   // List of Operators.

let displayScreen = document.querySelector(".screen");
let plusMinus = document.querySelector(".plusminus");
let decimal = document.querySelector(".point");
let backspace = document.querySelector(".backspace");
let allClear = document.querySelector(".clear");
let equals = document.querySelector(".equal");

// ===== VARIABLES ===== //
let previousNumber = "";
let currentNumber = "";
let operator = "";
let result = "";

// ===== FLAGS ===== //
let equalsPressed = false;
let operatorPressed = false;


numbers.forEach((number) => {
    number.addEventListener("click", () => {
        equalsPressed = false;
        previousNumber = currentNumber;

        if (displayScreen.textContent.length < 12 && equalsPressed === false) {
            if (operatorPressed === false) {
                if (displayScreen.textContent === "0" || displayScreen.textContent === previousNumber) {
                    displayScreen.textContent = number.textContent;
                    return;
                } else {
                    displayScreen.textContent += number.textContent;
                    return;
                }

            } else {
                if (displayScreen.textContent === "0" || displayScreen.textContent === currentNumber) {
                    displayScreen.textContent = number.textContent;
                    return;
                } else {
                    displayScreen.textContent += number.textContent;
                    return;
                }
            }
        }
    })
});


function changeSign() {

}

function clear() {
    
}

function del() {
    
}



function operate(operator) {
    switch (operator) {
        case "+":
            sum(previousNumber, currentNumber);
            break;
        case ".":
            subtract(previousNumber, currentNumber);
            break;
        case "*":
            multiply(previousNumber, currentNumber);
            break;
        case "/":
            divide(previousNumber, currentNumber);
            break;
        default:
            break;
    }
}