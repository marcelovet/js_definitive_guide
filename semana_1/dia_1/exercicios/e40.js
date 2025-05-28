/**
 * ### **Exercício 40 - Template Literals Aninhados**
 * Crie template literals dentro de outros template literals.
 */
const nome = 'João';
const idade = 30;
const mensagem = `Olá, meu nome é ${nome} e eu tenho ${idade} anos.`;
console.log(mensagem);
console.log(`INFO: ${mensagem}`);
console.log(`WARNING: ${`Olá, meu nome é ${nome} e eu tenho ${idade} anos.`}`);
