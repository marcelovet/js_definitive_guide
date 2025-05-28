/**
 * ### **Exercício 38 - Expressões Regulares Básicas**
 * Use search() e match() com regex simples em strings.
 */

const texto = 'O rato roeu a roupa do rei de Roma';
const regex = /r[a-z]{1,4}/gi;
// search retorna o índice da primeira ocorrência
console.log(texto.search(regex)); // 2
// match retorna um array com todas as ocorrências
console.log(texto.match(regex)); // ['rato', 'roeu', 'roupa', 'rei', 'Roma']
