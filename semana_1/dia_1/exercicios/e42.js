/**
 * ### **Exercício 42 - Custom Type Checker**
 * Implemente uma função que retorne o tipo real de qualquer valor (incluindo null e array).
 */

function tipo(valor) {
  return Array.isArray(valor)
    ? 'array'
    : valor === null
    ? 'null'
    : typeof valor;
}

console.log(tipo(null)); // null
console.log(tipo([])); // array
console.log(tipo(1)); // number
console.log(tipo(undefined)); // undefined
console.log(tipo({})); // object
