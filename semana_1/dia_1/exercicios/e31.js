/**
 * ### **Exercício 31 - Symbol**
 * Crie dois symbols com a mesma descrição e prove que são diferentes.
 */
const symbolA = Symbol('a');
const symbolB = Symbol('a');
console.log(symbolA == symbolB); // false
console.log(symbolA === symbolB); // false
