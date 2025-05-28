/**
 * ### **Exercício 14 - Null vs Undefined**
 * Crie situações onde uma variável seja undefined e outra seja null. Explique a diferença.
 */

// null é intencionalmente ausente
function givesNull() {
  let a = true;
  if (a) a = null;
  return a;
}

console.log(givesNull());
console.log(`null has type ${typeof null} because of a bug`);

// undefined é um valor que não foi definido
let b;
console.log(b);
function givesUndefined() {
  console.log('i will return');
}
console.log(givesUndefined());
const c = { a: 1 };
console.log(c.b);
console.log(`undefined has type ${typeof undefined}`);
