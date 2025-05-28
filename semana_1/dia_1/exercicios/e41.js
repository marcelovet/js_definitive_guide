/**
 * ### **Exercício 41 - Tagged Template Function**
 * Crie uma função tag que destaque valores interpolados com asteriscos.
 */

function destaque(strings, ...valores) {
  return strings.reduce(
    (acc, str, i) => acc + str + (valores[i] ? `*${valores[i]}*` : ''),
    ''
  );
}

console.log(destaque`Olá ${'mundo'}!`); // Olá *mundo*!
