function range(start = 0, end, step = 1) {
  return Array.from(
    { length: Math.ceil((end - start) / step) },
    (_, v) => start + v * step
  );
}

const listOfNumbers = range(0, 10);
const [first, second, , fourth, ...remainder] = listOfNumbers;
console.log(first, second, fourth, remainder);

const pessoa = {
  nome: 'Fulano',
  sobrenome: 'da Silva',
  idade: 23,
  endereco: {
    rua: 'Avenida das pedreiras',
    numero: 21,
    bairro: 'algum',
    cidade: 'cidadópolis',
  },
};

const {
  nome: name,
  idade: age = 18,
  endereco: { rua: street },
  ...resto
} = pessoa;
console.log(name, age, street, resto);
