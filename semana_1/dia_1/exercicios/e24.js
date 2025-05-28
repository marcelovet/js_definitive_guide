/**
 * ### **Exercício 24 - String Methods**
 * Use 5 métodos diferentes de string em um texto: toUpperCase(), slice(), indexOf(), replace() e trim().
 */
let texto = '   Olá, mundo!   ';
console.log(`O texto original é: "${texto}"`);
texto = texto.trim();
console.log(`O texto removido os espaços em branco: "${texto}"`);
console.log(`O texto em upper case: "${texto.toUpperCase()}"`);
console.log(
  `O índice inicial de "mundo" em texto: "${texto.indexOf('mundo')}"`
);
console.log(`O texto alterado: "${texto.replace('mundo', 'universo')}"`);
console.log(`O slice do texto: "${texto.slice(1, 3)}"`);
