/**
 * ### **Exercício 35 - String Padding**
 * Formate números de CPF e telefone usando padStart() e padEnd().
 */
// CPF
let cpf = '1234567890';
console.log(cpf.padStart(14, '0')); // '00001234567890'
cpf = '012345678-90';
console.log(cpf.padStart(14, '0')); // '00012345678-90'
cpf = '012.345.678-90';
console.log(cpf.padStart(14, '0')); // '012.345.678-90'
// Telefone
let telefone = '12345678';
console.log(telefone.padEnd(14, '-')); // '12345678000000'
telefone = '1234-5678';
console.log(telefone.padEnd(14, '-')); // '1234-567800000'
telefone = '(11) 1234-5678';
console.log(telefone.padEnd(14, '-')); // '(11) 1234-5678'
