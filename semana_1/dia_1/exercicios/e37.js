/**
 * ### **Exercício 37 - Number Formatting Internacional**
 * Formate valores monetários para diferentes locales (pt-BR, en-US, ja-JP).
 */
const valor = 1234.56;
console.log(
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
); // R$ 1.234,56
console.log(
  valor.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
); // $1,234.56
console.log(
  valor.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
); // ¥1,234
