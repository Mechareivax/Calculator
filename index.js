const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
const equalsButton = document.querySelector('#equals');
const operandButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
let firstNum = null;
let secondNum = null;
let tempNum = null;
let operator = null;
let result = null;

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
    
    switch (currentOperator) {
        case 'addition':
            return add(a,b);
        case 'subtraction':
            return subtract(a,b);
        case 'multiplication':
            return multiply(a,b);
        case 'division':
            if(b === 0) {
                return 'Cannot divide by 0';
            } else {
                return divide(a,b);
            }
        default:
            console.log('An error has occurred');
            break;
    }
}

function equals () {
    if(firstNum !== null && operator !== null && secondNum !== null) {
        return operate(firstNum, operator, secondNum);
    }
}

function clear() {
    firstNum = null;
    secondNum = null;
    operator = null;
    result = null;
}

function getButtonValue(button) {
    //TODO: allow the user to enter a number w/multiple digits
    //maybe put everything in an inputString var and then parse 
    //the number of that string into firstNum and secondNum
    if (firstNum === null) {
        display.setAttribute('value', button.textContent);
        firstNum = parseFloat(button.textContent);
    } else if (secondNum === null){
        display.setAttribute('value', button.textContent);
        secondNum = parseFloat(button.textContent);
    } else {
        console.log('an error has occurred');
    }
}

function getOperandValue(button) {
    if(firstNum !== null) {
        operator = button.id;
    }
}

function main () {
    operandButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            getButtonValue(e.target); 
        })
    })

    operatorButtons.forEach((button) => {
        //TODO: let the user click a second operator before clicking
        //equals. this will operate the previous two nums, display the
        //result, assign that to the firstNum, and clear the secondNum
        // similar to the equals button below
        button.addEventListener('click', (e) => {
            getOperandValue(e.target);
        })
    })

    equalsButton.addEventListener('click', () => {
        //the equals button will allow for the user to continue to press an operator
        //and a number, to build on the last result, which is held by tempNum and reassigned
        //to firstNum
        result = equals();
        display.setAttribute('value', result);
        tempNum = result;
        clear();
        firstNum = tempNum;
    })

    clearButton.addEventListener('click', () =>{
        clear();
        display.setAttribute('value', '|');
    })
}

main()