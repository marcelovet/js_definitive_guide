let operacao = '+';
let a = 5,
  b = 3;
switch (operacao) {
  case '+':
    console.log(a + b); // 8
    break;
  case '-':
    console.log(a - b);
    break;
  case '*':
    console.log(a * b);
    break;
  case '/':
    console.log(b !== 0 ? a / b : 'Divisão por zero');
    break;
  default:
    console.log('Operação inválida');
}

let schema = {
  q1: {
    question: 'Who are You?',
    type: 'string',
    depends_on: null,
    constraint: '.$ !== null',
  },
  q2: {
    question: 'Age?',
    type: 'number',
    depends_on: 'q1',
    constraint: '.$ >= 10',
  },
  q3: {
    question: 'Ok?',
    type: 'bool',
    depends_on: 'q1 !== null && q2 >= 20',
    constraint: '.$ >= 10',
  },
};

let answer = {
  q1: {
    value: null,
  },
  q2: {
    value: 12,
  },
  q3: {
    value: false,
  },
};

function get_operacao(part) {
  switch (part) {
    case '>=':
      const gt = (a, b) => a >= b;
      return gt;
    case '!==':
      const ineq = (a, b) => a !== b;
      return ineq;
    case '&&':
      const and_ = (a, b) => a && b;
      return and_;
    default:
      return null;
  }
}

console.log(get_operacao('>=')(1, 3));
