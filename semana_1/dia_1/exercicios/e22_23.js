/**
 * ### **Exercício 22 - Hoisting**
 * Crie exemplos mostrando hoisting com var, let, const e function. O que acontece em cada caso?
 * ### **Exercício 23 - Temporal Dead Zone**
 * Demonstre o conceito de Temporal Dead Zone com let e const.
 */

/**
 * variables from let, const, or class is in a "temporal dead zone" (TDZ)
 * from the start of the block until code execution reaches the place where
 * the variable is declared and initialized.
 * While inside the TDZ, the variable has not been initialized with a value,
 * and any attempt to access it will result in a ReferenceError.
 */

try {
  console.log(a); // ❌
  console.log(b); // ❌
} catch (error) {
  console.log(error.message); // a is not defined
}
try {
  console.log(b); // ❌
} catch (error) {
  console.log(error.message); // b is not defined
}
let a;
const b = 1;

/**
 * Hoisting behavior
 * Being able to use a variable's value in its scope before
 * the line it is declared. ("Value hoisting")
 * Being able to reference a variable in its scope before the line it is
 * declared, without throwing a ReferenceError, but the value is
 * always undefined. ("Declaration hoisting")
 * The declaration of the variable causes behavior changes in its scope before
 * the line in which it is declared.
 * The side effects of a declaration are produced before evaluating the rest
 * of the code that contains it.
 */

hoisted();
function hoisted() {
  console.log('Hoisting');
}
console.log(hoistedVar); // ✅ does not throw an error, but it is undefined
var hoistedVar = 'Hoisted';
