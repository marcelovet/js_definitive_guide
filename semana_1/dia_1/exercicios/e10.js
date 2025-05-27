/**
 * ### **Exercício 10 - Operador Módulo**
 * Verifique se os números 15, 20 e 33 são pares ou ímpares usando o operador %.
 */
const isEven = (numero) => numero % 2 === 0;

const printEvenEval = (numero) =>
  console.log(`${numero} é par? ${isEven(numero)}`);

printEvenEval(15);
printEvenEval(20);
printEvenEval(33);
