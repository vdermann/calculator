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
let operatorSign = "";
let result = "";

// ===== FLAGS ===== //
let equalsPressed = false;
let operatorPressed = false;


numbers.forEach((number) => {
    number.addEventListener("click", () => {
        equalsPressed = false;
        // We assign the value of current Value to previous Value to save the next value in currentValue again.
        previousNumber = currentNumber;

        // This allows only up to 12 characters to be entered.
        if (displayScreen.textContent.length < 12 && equalsPressed === false) {

            // The value of the currentNumber is only saved when an operator is pressed. 
            // As long as it is false, it will continue concatenating numbers onto the display screen.
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


operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (displayScreen.textContent.length === "0") return;
        // When operatorPressed is true, we saved the value in currentNumber.
        operatorPressed = true;                     
        operatorSign = operator.textContent;
        currentNumber = displayScreen.textContent;
    })
})


equals.addEventListener("click", () => {
    if (operatorPressed === false) return;
    // When we perform the operation, we set the value of operatorPressed back to false.
    operatorPressed = false;
    equalsPressed = true;
    currentNumber = displayScreen.textContent;
    currentNumber = operate(previousNumber, operatorSign, currentNumber).toString();
    displayScreen.textContent = currentNumber;
})


// function changeSign() {

// }

// function clear() {
    
// }

// function del() {
    
// }



function operate(previousNumber, operatorSign, currentNumber) {
    // The values ​​are strings, so we convert them to numbers before performing the operation.
    previousNumber = parseFloat(previousNumber);
    currentNumber = parseFloat(currentNumber);
    switch (operatorSign) {
        case "+":
            result = sum(previousNumber, currentNumber);
            break;
        case "-":
            result = subtract(previousNumber, currentNumber);
            break;
        case "*":
            result = multiply(previousNumber, currentNumber);
            break;
        case "/":
            result = divide(previousNumber, currentNumber);
            break;
        default:
            break;
    }
    return result;
}