/**
 * ### **Exercício 36 - Destructuring com Defaults**
 * Use destructuring com valores padrão para extrair propriedades que podem ser undefined.
 */
const pessoa = {
  nome: 'João',
  idade: 30,
  cidade: 'São Paulo',
};
const { nome, idade, cidade = 'Não informado' } = pessoa;
console.log(nome, idade, cidade);
