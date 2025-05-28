/**
 * ### **Exercício 21 - Escopo de Bloco**
 * Demonstre a diferença de escopo entre var, let e const dentro de um bloco if.
 */

// Var leaks from block scope
if (true) {
  var x = 1;
}
console.log(x); // 1 ✅

// LET and CONST has block scope
if (true) {
  let y = 1;
  const z = 2;
}

try {
  console.log(y); // ❌
} catch (error) {
  console.log(error.message); // y is not defined
}

try {
  console.log(z); // ❌
} catch (error) {
  console.log(error.message); // z is not defined
}
