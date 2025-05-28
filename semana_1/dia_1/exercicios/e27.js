/**
 * ### **Exercício 27 - Template Literal Multilinha**
 * Crie um template literal que represente um endereço completo em múltiplas linhas.
 */

const enderecoCompleto = (rua, numero, bairro, cidade, estado, cep) => {
  return `
  Rua: ${rua}, ${numero}
  Bairro: ${bairro}
  Cidade: ${cidade}
  Estado: ${estado}
  CEP: ${cep}
  `;
};
const rua = 'Rua das Flores';
const numero = 123;
const bairro = 'Centro';
const cidade = 'São Paulo';
const estado = 'SP';
const cep = '12345-678';
console.log(enderecoCompleto(rua, numero, bairro, cidade, estado, cep));
