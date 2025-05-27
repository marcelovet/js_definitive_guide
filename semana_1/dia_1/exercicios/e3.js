/**
 * ### **Exercício 3 - Typeof**
 * Verifique o tipo de cada variável do exercício anterior usando typeof e imprima o resultado.
 */
const nome = 'João';
const idade = 25;
const valido = false;
const nulo = null;
const indefinido = undefined;

const variaveis = [nome, idade, valido, nulo, indefinido];
for (const variavel of variaveis) {
  console.log(`Tipo de ${variavel} é ${typeof variavel}`);
}
