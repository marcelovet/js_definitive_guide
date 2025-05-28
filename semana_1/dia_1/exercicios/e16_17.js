/**
 * ### **Exercício 16 - Conversão Implícita**
 * Demonstre a conversão automática em: "5" + 3, "5" - 3, e "5" \* 3.
 * ### **Exercício 17 - Template Literal com Expressões**
 * Use template literal para criar uma mensagem que inclua uma operação matemática.
 */
console.log('The strange world of automatic conversion');
const a = '5';
const b = 3;
console.log(`${a} is ${typeof a} whereas ${b} is ${typeof b}`);
console.log(`a + b = ${a + b}`);
console.log(`a - b = ${a - b}`);
console.log(`a * b = ${a * b}`);
console.log(`a / b = ${(a / b).toFixed(2)}`);
