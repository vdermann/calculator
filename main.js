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
let operatorPressed = false;
let previousNumber = "";
let currentNumber = "";
let operatorSign = "";
let result;

// Does not allow entering more than 12 digits.
function isValidLength(input) {
    return input.length < 12;
}

// Updates the display.
function updateDisplay(content, resetHistorial = false) {
    displayScreen.textContent = content
    if (resetHistorial) displayHistorial.textContent = ""
}


// ===== HANDLER OF INPUTS ===== //
// Number input handler.
function handleNumberInput(number) {
    previousNumber = currentNumber;
    // This allows only up to 12 characters to be entered.
    if (isValidLength(displayScreen.textContent) ||
        displayScreen.textContent.length === currentNumber.length // In case any result exceeds the number of 12 characters.
    ) {
        // The value of the currentNumber is only saved when an operator is pressed. 
        // As long as operatorPressed is false, it will continue concatenating numbers onto the display screen.
        if (!operatorPressed) {
            // previousNumber represents the last result obtained, if a digit is pressed after obtaining a result a new operation should be started.
            if (displayScreen.textContent === "0" || displayScreen.textContent === previousNumber) { 
                updateDisplay(number, true)
                operators.forEach(op => op.classList.remove("active"));
                return;
            } else {
                updateDisplay(displayScreen.textContent + number)
                return;
            }
        } else {
            if (displayScreen.textContent === "0" || displayScreen.textContent === currentNumber) {
                updateDisplay(number);
                return;
            } else {
                updateDisplay(displayScreen.textContent + number);
                return;
            }
        }
    }
}

// Operator input handler
function handleOperatorInput(operator) {
    if (displayScreen.textContent.length === "0") return;
    // When operatorPressed is true, we saved the value in currentNumber.
    operatorPressed = true;                     
    operatorSign = operator;
    currentNumber = displayScreen.textContent;
}


// ===== LISTENERS ===== //
// Numbers.
numbers.forEach(button => {
    button.addEventListener("click", () => handleNumberInput(button.textContent));
});

// Operators.
operators.forEach((button) => {
    button.addEventListener("click", () => {
        handleOperatorInput(button.textContent);
        // Changes the background color of the pressed button to make the action being performed more visible and understandable.
        operators.forEach(op => op.classList.remove("active"));
        button.classList.add("active");
    });
});

// Equals.
equals.addEventListener("click", () => {
    if (!operatorPressed) return;
    // When we perform the operation, we set the value of operatorPressed back to false.
    operatorPressed = false;
    currentNumber = displayScreen.textContent;
    // Shows the last operation performed before the value of current number is modified on the next line
    displayHistorial.textContent = `${previousNumber} ${operatorSign} ${currentNumber} =`;  
    currentNumber = operate(previousNumber, operatorSign, currentNumber);
    updateDisplay(currentNumber);
})

// AC. All variables are reset.
allClear.addEventListener("click", () => {
    updateDisplay("0", true)
    currentNumber = "";
    previousNumber = "";
    operatorSign = "";
    operatorPressed = false;
    operators.forEach(op => op.classList.remove("active"));
})

// Plus-minus sign. Change the sign of the number.
plusMinus.addEventListener("click", () => {
    updateDisplay(parseFloat(displayScreen.textContent) * -1);
})

// Decimal point. Add the decimal point only if it has not already been included, if it has already been included it is ignored.
decimalPoint.addEventListener("click", () => {
    if (displayScreen.textContent.includes(".")) return;
    updateDisplay(displayScreen.textContent + decimalPoint.textContent);
})

// Backspace. Deletes the last digit entered.
backspace.addEventListener("click", () => {
    // Decided to make the backspace clear the calculator in case it is pressed after getting a result.
    if (displayScreen.textContent.length <= 1 || displayScreen.textContent === result) {
        updateDisplay("0", true)
        operators.forEach(op => op.classList.remove("active"));
        return;
    }
    updateDisplay(displayScreen.textContent.slice(0, -1));
})


// ===== OPERATIONS ===== //
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
        result = +result.toFixed(2);
    }
    result = result.toString();
    return result;  
}





// ===== KEYBOARD SUPPORT ===== // 
window.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        handleNumberInput(e.key);
    } else if ("+-*/".includes(e.key)) {
        handleOperatorInput(e.key);
        operators.forEach(op => op.classList.remove("active")); 

        // We convert the nodeList into an array so we can use the .find() method.
        // Compares the text of each button (op) with the key pressed (e.key).
        // If it finds a button whose text matches the key pressed, it returns that button.
        const activeOperator = Array.from(operators).find(op => op.textContent === e.key);
        if (activeOperator) {
            console.log(`Operador encontrado:`, activeOperator);
            activeOperator.classList.add("active");
        }
    } else if (e.key === "Enter") {
        equals.click();
    } else if (e.key === "Backspace") {
        backspace.click();
    } else if (e.key === ".") {
        decimalPoint.click();
    } else if (e.key === "Escape") {
        allClear.click();
    }
});