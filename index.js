let firstNum = null;
let secondNum = null;
let operator = null;
let result = null;
const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
const equalsButton = document.querySelector('#equals');
const operandButton = document.querySelectorAll(".operand");

function add (a,b) {
    return a+b;
}

function subtract (a,b) {
    return a-b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    return a/b;
}

function operate (a, currentOperator, b) {
    let solution;
    
    switch (currentOperator) {
        case 'addition':
            solution = add(a,b);
            break;
        case 'subtraction':
            solution = subtract(a,b);
            break;
        case 'multiplication':
            solution = multiply(a,b);
            break;
        case 'division':
            solution = divide(a,b);
            break;
        default:
            console.log('An error has occurred');
            break;
    }

    return solution;
}

function clear() {
    // TODO: attach this to the clear button
    firstNum, secondNum, operator, result = null;
}

function getButtonValue(button) {
    //get the current button's value

    if (firstNum === null) {
        display.setAttribute('value', button.textContent);
        firstNum = parseFloat(button.textContent);
        console.log('firstNum is now ' + firstNum);
    } else if (isOperator(button.textContent)) {
        operator = button.id;
        console.log('Current value is an operator: ' + operator);
    } else if (secondNum === null){
        display.setAttribute('value', button.textContent);
        secondNum = parseFloat(button.textContent);
        console.log('secondNum has been assigned to ' + secondNum);
    } else {
        console.log('an error has occurred');
    }
}

function isOperator (value) {
    // return true if selection is an operator
    //TODO: reeavluate if this is needed now that we have a selector for the operand buttons
    const validOperators = ['÷', '×', '-', '+'];
    return validOperators.includes(value);
}

function main () {
    // TODO: add an event listener to the equals button that will clear the
    // previous operator and secondNum, while assigning firstNum the value of the solution
    // maybe move that if statement below into that listener
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            
            getButtonValue(e.target);

            if(firstNum && operator && secondNum) {
                result = operate(firstNum, operator, secondNum);
                console.log(result);
            }
            
        })
    })


}

main()