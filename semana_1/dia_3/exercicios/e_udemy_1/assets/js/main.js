// ELEMENTOS NO DOM
const display = document.querySelector('#display');
const expression = document.querySelector('#expression');
const availableDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const availableOperations = [
  '/', // division
  '*', // multiplication
  '+', // sum
  '-', // subtraction
];
const decimalPoints = [
  '.', // decimal point
  ',', // decimal point
];

display.addEventListener('keydown', function (event) {
  event.preventDefault();
});

function isAvailableKey(key) {
  if (
    ![
      ...availableDigits,
      ...availableOperations,
      ...decimalPoints,
      'Enter',
      'Backspace',
    ].includes(key)
  ) {
    console.log('Unnavailable key pressed');
    return false;
  }
  return true;
}

const isDigitKey = (key) => availableDigits.includes(key);

const isOperationKey = (key) => availableOperations.includes(key);

const isDecimalPointKey = (key) => decimalPoints.includes(key);

const isEnter = (key) => key === 'Enter';
const isBackspace = (key) => key === 'Backspace';

function erase() {
  const v = display.value;
  const e = expression.textContent;
  if (v.length === 0 && e.length === 0) return;
  if (v.length >= 1 && v !== '') {
    display.value = v.slice(0, -1);
    return;
  }
  if (e === '') return;
  const expressionArray = e.split(' ');
  if (isDigitKey(e[e.length - 2])) {
    console.log('Erasing digit');
    expression.textContent = e.slice(0, -2);
    expression.textContent +=
      expression.textContent[expression.textContent.length - 1] === ' '
        ? ''
        : ' ';
    return;
  }
  console.log('Erasing operation');
  expressionArray.pop();
  expressionArray.pop();
  expression.textContent = expressionArray.join(' ') + ' ';
}

function addDecimalPoint() {
  const v = display.value;
  if (v.includes('.')) return;
  if (v.length === 0) {
    display.value = '0.';
    return;
  }
  display.value = `${v}.`;
  return;
}

function addOperation(key) {
  const v = display.value;
  const e = expression.textContent.split(' ');

  if (v === '' || v.length === 0) return;

  console.log(e);
  console.log(v);

  // ''
  if (e.length === 1 && e[0] === '') {
    expression.textContent = `${v} ${key} `;
    display.value = '0';
    return;
  }

  // '(' ''
  if (e.length >= 2 && e[e.length - 2] === '(' && e[e.length - 1] === '') {
    expression.textContent += `${v} ${key} `;
    display.value = '0';
    return;
  }

  // '+' ''
  if (
    e.length >= 2 &&
    isOperationKey(e[e.length - 2]) &&
    e[e.length - 1] === ''
  ) {
    expression.textContent += `${v} ${key} `;
    display.value = '0';
    return;
  }

  // ')' ''
  if (e.length >= 2 && e[e.length - 2] === ')' && e[e.length - 1] === '') {
    expression.textContent += `${key} ${v} `;
    display.value = '0';
    return;
  }

  // '8' ''
  const lastElement = e[e.length - 2];
  if (
    e.length >= 2 &&
    isDigitKey(lastElement[lastElement.length - 1]) &&
    e[e.length - 1] === ''
  ) {
    expression.textContent += `${key} ${v} `;
    display.value = '0';
    return;
  }
}

display.addEventListener('keyup', function (event) {
  event.preventDefault();
  const key = event.key;
  expression.textContent = expression.textContent.trimStart();

  if (!isAvailableKey(key)) return;

  if (isBackspace(key)) return erase();

  if (isDecimalPointKey(key)) return addDecimalPoint();

  // assess digits
  if (isDigitKey(key)) {
    display.value =
      display.value === '0' ? event.key : `${display.value}${event.key}`;
    return;
  }

  // asses key operations
  if (isOperationKey(key)) return addOperation(key);
});

window.addEventListener('load', function () {
  display.focus();
  console.log('Calculadora carregada!');
});
