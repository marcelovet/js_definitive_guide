/**
 * ### **Exercício 19 - Truthy e Falsy**
 * Liste todos os valores falsy e crie exemplos testando cada um em uma estrutura if.
 */
const falsyValues = [false, 0, '', null, undefined, NaN, 0n];

const testFalsyValues = (value) => {
  if (value) {
    console.log(`'${value}' variable is truthy`);
  } else {
    console.log(`'${value}' variable is falsy`);
  }
};

falsyValues.forEach((v) => testFalsyValues(v));
