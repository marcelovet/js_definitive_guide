/**
 * ### **Exercício 32 - Valores Especiais**
 * Trabalhe com Number.EPSILON para comparar números decimais corretamente.
 */

const isEqual = (a, b) => {
  return Math.abs(a - b) < Number.EPSILON;
};

console.log(0.1 + 0.2 == 0.3); // false, sem tratamento de float
console.log(isEqual(0.1 + 0.2, 0.3)); // true, com tratamento de float
