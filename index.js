const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');
const equalsButton = document.querySelector('#equals');
const operandButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');
const decimalButton = document.querySelector('#decimal');
let firstNum = null;
let secondNum = null;
let inputString = '';
let operator = null;
let result = null;
let tempNum = null;

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
    //This is used in conjunction with the equals() function
    switch (currentOperator) {
        case 'addition':
            return add(a,b);
        case 'subtraction':
            return subtract(a,b);
        case 'multiplication':
            return multiply(a,b);
        case 'division':
            if(b === 0) {
                secondNum = null;
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
    //This uses the operate function to do the math only if
    //all values are filled
    if(firstNum !== null && operator !== null) {
        secondNum = parseFloat(inputString);
        return operate(firstNum, operator, secondNum);
    }
}

function clear() {
    firstNum = null;
    secondNum = null;
    inputString = '';
    operator = null;
    result = null;
}

function getButtonValue(button) {
    inputString += button.textContent;
    updateDisplay(inputString);
}

function getOperatorValue(button) {

    if (inputString === '' && tempNum === null) {
        //if there are no values to pull from, just break out of function
        console.log('Error: There is nothing in inputString or tempNum');
        return;
    }

    if (inputString === '') {
        //getting to this point means the user wants
        //to continue the operation with the previous result
        firstNum = tempNum
    } else if (inputString !== '') {
        if (firstNum === null) {
            firstNum = parseFloat(inputString);
            inputString = '';
        } else if (secondNum === null) {
            //at this point, there are two numbers and they clicked the operator twice
            //this implies that they want the result of the previous two and continue 
            //operating on the result
            calculateAndDisplay();
            firstNum = tempNum;
        } else {
            console.log('An error has occurred');
        }
    }
    operator = button.id;
}

function calculateAndDisplay() {
    //puts the last result in tempNum. in case the user wants to continue to
    //operate on it it can be reassigned to firstNum
    result = equals();
    updateDisplay(result);
    tempNum = result;
    clear();
}

function updateDisplay(value) {
    display.setAttribute('value', value);
}


function main () {
    //TODO: have the output rounded to a max of 7 decimals

    operandButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            getButtonValue(e.target); 
        })
    })

    operatorButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            getOperatorValue(e.target);
        })
    })

    equalsButton.addEventListener('click', () => {
        calculateAndDisplay();
    })

    clearButton.addEventListener('click', () =>{
        clear();
        tempNum = null;
        updateDisplay('|');
    })

    backspaceButton.addEventListener('click', () =>{
        inputString = inputString.slice(0, -1);
        updateDisplay(inputString);
        if (inputString === '') {
            updateDisplay('|');
        }
    })

    decimalButton.addEventListener('click', () => {
        // This allows the user to add a decimal, but only if one isn't already present

        if (inputString !== '' && !inputString.includes('.')) {
            inputString += '.';
            updateDisplay(inputString);
        } else if (inputString === '') {
            inputString = '0.';
            updateDisplay(inputString);
        }
    })
}

main()