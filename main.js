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
let displayHistorial = document.querySelector(".historial");
let displayScreen = document.querySelector(".screen");
let plusMinus = document.querySelector(".plusminus");
let decimalPoint = document.querySelector(".point");
let backspace = document.querySelector(".backspace");
let allClear = document.querySelector(".clear");
let equals = document.querySelector(".equal");


// ===== VARIABLES ===== //
let previousNumber = "";
let currentNumber = "";
let operatorSign = "";
let result;


// ===== FLAGS ===== //
let operatorPressed = false;


// ===== NUMBERS ===== //
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        // We assign the value of current Value to previous Value to save the next value in currentValue again.
        previousNumber = currentNumber;

        // This allows only up to 12 characters to be entered.
        if (displayScreen.textContent.length < 12 ||
            displayScreen.textContent.length === currentNumber.length // In case any result exceeds the number of 12 characters.
        ) {
            // The value of the currentNumber is only saved when an operator is pressed. 
            // As long as it is false, it will continue concatenating numbers onto the display screen.
            if (operatorPressed === false) {
                // previousNumber represents the last result obtained, if a digit is pressed after obtaining a result a new operation should be started.
                if (displayScreen.textContent === "0" || displayScreen.textContent === previousNumber) { 
                    displayHistorial.textContent = "";
                    displayScreen.textContent = number.textContent;
                    operators.forEach(op => op.classList.remove("active"));
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


// ===== OPERATORS ===== //
operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (displayScreen.textContent.length === "0") return;
        // When operatorPressed is true, we saved the value in currentNumber.
        operatorPressed = true;                     
        operatorSign = operator.textContent;
        currentNumber = displayScreen.textContent;
        // Changes the background color of the pressed button to make the action being performed more visible and understandable.
        operators.forEach(op => op.classList.remove("active"));
        operator.classList.add("active");
    })
})

equals.addEventListener("click", () => {
    if (operatorPressed === false) return;
    // When we perform the operation, we set the value of operatorPressed back to false.
    operatorPressed = false;
    currentNumber = displayScreen.textContent;
    // Shows the last operation performed before the value of current number is modified on the next line
    displayHistorial.textContent = `${previousNumber} ${operatorSign} ${currentNumber} =`;  
    currentNumber = operate(previousNumber, operatorSign, currentNumber);
    displayScreen.textContent = currentNumber;
})


// ===== EXTRA FUNCTIONALITIES ===== //
// All variables are reset.
allClear.addEventListener("click", () => {
    displayScreen.textContent = "0";
    displayHistorial.textContent = "";
    currentNumber = "";
    previousNumber = "";
    operatorSign = "";
    operatorPressed = false;
    operators.forEach(op => op.classList.remove("active"));
})

// Change the sign of the number.
plusMinus.addEventListener("click", () => {
    displayScreen.textContent = parseFloat(displayScreen.textContent) * -1;
})

// Add the decimal point only if it has not already been included, if it has already been included it is ignored.
decimalPoint.addEventListener("click", () => {
    if (displayScreen.textContent.includes(".")) return;
    displayScreen.textContent += decimalPoint.textContent;
})

// Deletes the last digit entered
backspace.addEventListener("click", () => {
    // Decided to make the backspace clear the calculator in case it is pressed after getting a result.
    if (displayScreen.textContent.length <= 1 || displayScreen.textContent === result) {
        displayHistorial.textContent = "";  
        displayScreen.textContent = "0";
        operators.forEach(op => op.classList.remove("active"));
        return;
    }
    displayScreen.textContent = displayScreen.textContent.slice(0, -1);
})


// ===== OPERATION ===== //
function operate(previousNumber, operatorSign, currentNumber) {
    // Result is reset to zero to be able to use toFixed().
    result = 0;
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
    // Added extra lines here to round the result to two decimal places in case it has them.
    if (result.toString().includes(".")) {
        result = result.toFixed(2);
    }
    result = result.toString();
    return result;  
}






// ===== KEYBOARD SUPPORT ===== // (duplicated code).
document.addEventListener("keydown", (e) => {

    if (/[0-9]/.test(e.key)) {
        // To prevent function keys from being displayed.
        if (e.key.includes("F")) return;
        // We assign the value of current Value to previous Value to save the next value in currentValue again.
        previousNumber = currentNumber;
        // This allows only up to 12 characters to be entered.
        if (displayScreen.textContent.length < 12 ||
            displayScreen.textContent.length === currentNumber.length) {
            // The value of the currentNumber is only saved when an operator is pressed. 
            // As long as it is false, it will continue concatenating numbers onto the display screen.
            if (operatorPressed === false) {
                // previousNumber represents the last result obtained, if a digit is pressed after obtaining a result a new operation should be started.
                if (displayScreen.textContent === "0" || displayScreen.textContent === previousNumber) { 
                    displayHistorial.textContent = "";
                    displayScreen.textContent = e.key;
                    operators.forEach(op => op.classList.remove("active"));
                    return;
                } else {
                    displayScreen.textContent += e.key;
                    return;
                }
            } else {
                if (displayScreen.textContent === "0" || displayScreen.textContent === currentNumber) {
                    displayScreen.textContent = e.key;
                    return;
                } else {
                    displayScreen.textContent += e.key;
                    return;
                }
            }
        }

    } else if (/[\.\,]/.test(e.key)) {
        if (displayScreen.textContent.includes(".")) return;
        displayScreen.textContent += decimalPoint.textContent;

    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "*" || 
        e.key === "/"
        ) {
        if (displayScreen.textContent.length === "0") return;
        // When operatorPressed is true, we saved the value in currentNumber.
        operatorPressed = true;                     
        operatorSign = e.key;
        currentNumber = displayScreen.textContent;
        // Changes the background color of the pressed button to make the action being performed more visible and understandable.
        operators.forEach(op => op.classList.remove("active"))
        operators.forEach(op => {
            if (op.textContent === e.key) op.classList.add("active");
        });
        
    } else if (e.key === "Enter") {
        if (operatorPressed === false) return;
        // When we perform the operation, we set the value of operatorPressed back to false.
        operatorPressed = false;
        currentNumber = displayScreen.textContent;
        // Shows the last operation performed before the value of current number is modified on the next line
        displayHistorial.textContent = `${previousNumber} ${operatorSign} ${currentNumber} =`;  
        currentNumber = operate(previousNumber, operatorSign, currentNumber);
        displayScreen.textContent = currentNumber;

    } else if (e.key === "Backspace") {
        // Decided to make the backspace clear the calculator in case it is pressed after getting a result.
        if (displayScreen.textContent.length <= 1 || displayScreen.textContent === result) {
            displayHistorial.textContent = "";  
            displayScreen.textContent = "0";
            operators.forEach(op => op.classList.remove("active"));
            return;
        }
        displayScreen.textContent = displayScreen.textContent.slice(0, -1);
    }

})