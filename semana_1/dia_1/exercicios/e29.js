/**
 * ### **Exercício 29 - Comparação Estrita vs Coerção**
 * Compare valores usando == e === mostrando pelo menos 5 casos onde os resultados diferem.
 */
console.log(1 == '1'); // true
console.log(1 === '1'); // false
console.log(0 == false); // true
console.log(0 === false); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(0 == ''); // true
console.log(0 === ''); // false
