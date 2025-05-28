/**
 * ### **Exercício 34 - Optional Chaining**
 * Crie um objeto aninhado e use ?. para acessar propriedades que podem não existir.
 */
const myObject = {
  name: 'John',
};
console.log(myObject?.address?.street); // undefined
console.log(myObject?.address?.getStreet?.()); // undefined
