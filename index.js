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

function operate (a, operand, b) {
    switch (operand) {
        case addition:
            return add(a,b);
        case subtraction:
            return subtract(a,b);
        case multiplication:
            return multiply(a,b);
        case division:
            return divide(a,b);
        default:
            console.log('An error has occurred');
            break;
    }
}