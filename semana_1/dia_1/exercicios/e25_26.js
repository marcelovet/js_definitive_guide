/**
 * ### **Exercício 25 - Number Methods**
 * Formate números usando toFixed(), toPrecision() e toLocaleString('pt-BR').
 * ### **Exercício 26 - Parsing de Números**
 * Parse diferentes strings para números usando parseInt(), parseFloat() e Number().
 */
const num = 25.432;
console.log(num.toFixed(2)); // 25.43
console.log(num.toPrecision(3)); // 25.4
console.log(
  num.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
); // R$ 25,43

console.log(Number.parseInt('145.896')); // 145
console.log(Number.parseFloat('145.896')); // 145.896
console.log(Number(true)); // 1
