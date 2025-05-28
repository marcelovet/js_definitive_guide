/**
 * ### **Exercício 28 - Operadores Lógicos Complexos**
 * Crie expressões usando && e || que demonstrem short-circuit evaluation.
 */
// nao gera erro por causa do short-circuit evaluation
console.log(true && false && varNaoDeclarada); // para no primeiro false
console.log(false || true || varNaoDeclarada); // para no primeiro true
