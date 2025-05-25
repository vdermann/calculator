function getSum(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function getSubtraction(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function getMultiplication(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function getDivision(firstNumber, secondNumber) {
    if (secondNumber === 0) return "negus error.";
    return firstNumber / secondNumber;
}

console.log(getSum(42, 18));
console.log(getSubtraction(32, 83));
console.log(getMultiplication(4, 10));
console.log(getDivision(100, 10));
console.log(getDivision(6, 0));