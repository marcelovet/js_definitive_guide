/**
 * ### **Exercício 8 - Valores Booleanos**
 * Crie expressões que resultem em true e false usando operadores de comparação.
 */
const numero_truthy = 10;
const numero_falsy = 0;
const string_truthy = 'Hello';
const string_falsy = '';

console.log(numero_truthy > 0);
console.log(numero_truthy < 20);
console.log(numero_truthy >= 10);
console.log(!!numero_truthy);
console.log(!!numero_falsy);
console.log(string_truthy === 'Hello');
console.log(!!string_falsy);
console.log(!![] === true);
