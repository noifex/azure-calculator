let currentOperand = '0';
let previousOperand = '';
let operation = null;

function updateDisplay() {
    document.getElementById('current').textContent = currentOperand;
    if (operation) {
        document.getElementById('previous').textContent = `${previousOperand} ${operation}`;
    } else {
        document.getElementById('previous').textContent = previousOperand;
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0') {
        currentOperand = number === '.' ? '0.' : number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('0で割ることはできません');
                clearAll();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNum() {
    currentOperand = currentOperand.slice(0, -1);
    if (currentOperand === '') {
        currentOperand = '0';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber('.');
    } else if (event.key === '+' || event.key === '-') {
        appendOperator(event.key);
    } else if (event.key === '*') {
        appendOperator('×');
    } else if (event.key === '/') {
        event.preventDefault();
        appendOperator('÷');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Backspace') {
        deleteNum();
    } else if (event.key === 'Escape') {
        clearAll();
    }
});
