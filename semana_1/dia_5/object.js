// const pessoa = {
//   nome: 'João',
//   idade: 25,
//   profissao: 'programador',
//   possuiFaculdade: true,

//   //metodo
//   describe() {
//     return `Meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.profissao}.`;
//   },
//   getBirthYear() {
//     const actualYear = new Date().getFullYear();
//     return actualYear - this.idade;
//   },
// };
// console.log(pessoa.nome);
// console.log(pessoa['nome']);
// pessoa['endereco'] = 'Rua A';
// console.log(pessoa);
// console.log(pessoa.describe());
// console.log(pessoa.getBirthYear());

// factory function
function criaPessoa(nome, sobrenome, idade, profissao) {
  return {
    nome,
    sobrenome,
    idade,
    profissao,
    get nomeCompleto() {
      return `${this.nome} ${this.sobrenome}`;
    },
  };
}

const p2 = criaPessoa('João', 'Silva', 25, 'Programador');
console.log(p2.nomeCompleto);

// constructor function
function Pessoa(nome, idade, profissao) {
  this.nome = nome;
  this.profissao = profissao;
  this._idade = idade;

  Object.defineProperty(this, '_idade', {
    enumerable: false,
  });

  Object.defineProperty(this, 'idade', {
    enumerable: true,
    get: function () {
      return this._idade;
    },
    set: function (value) {
      if (value < 0) {
        throw new Error('Idade inválida');
      }
      this._idade = value;
    },
  });
}

const p1 = new Pessoa('Fulano', 12, 'estudante');
console.log(p1);
console.log(p1.idade);
try {
  p1.idade = -1;
} catch (error) {
  console.log(error.toString());
}

function Produto(nome, preco, estoque) {
  let _preco = preco;

  Object.defineProperties(this, {
    nome: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: nome,
    },
    preco: {
      enumerable: true,
      configurable: false,
      get: function () {
        return _preco;
      },
      set: function (value) {
        if (typeof value !== 'number') {
          throw new TypeError('Preço precisa ser um número');
        }
        if (value < 0) {
          throw new Error('Preço precisa ser maior que zero');
        }
        _preco = value;
      },
    },
    estoque: {
      enumerable: true, // se true, aparece no for in
      writable: true, // se true, pode ser alterado
      configurable: false, // se true, pode ser deletado
      value: estoque, // valor do atributo
    },
  });
}

const p = new Produto('Camiseta', 20, 10);
// console.log(p);
// console.log(p.preco);
// p.preco = 30;
// console.log(p.preco);
// try {
//   p.preco = -1;
// } catch (error) {
//   console.log(error.toString());
// }

// try {
//   p.preco = null;
// } catch (error) {
//   console.log(error.toString());
// }

// metodos uteis para objetos
// Object.keys() - retorna um array com as propriedades do objeto
// Object.values() - retorna um array com os valores das propriedades do objeto
// Object.entries() - retorna um array com arrays de propriedades e valores do objeto
// Object.getOwnPropertyDescriptor() - retorna as propriedades de um objeto
console.log(Object.keys(p));
console.log(Object.values(p));
console.log(Object.entries(p));
console.log(Object.getOwnPropertyDescriptor(p, 'nome'));
console.log(
  Object.keys(p).map((key) => {
    console.log(key, Object.getOwnPropertyDescriptor(p, key));
  })
);
// Object.assign() - copia as propriedades de um objeto para outro
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 5, c: 3, d: 4 };
Object.assign(obj1, obj2);
console.log(obj1);

// Object.freeze() - congela um objeto, não permite adicionar, remover ou modificar propriedades
const obj3 = { a: 1, b: 2 };
Object.freeze(obj3);
obj3.a = 5;
console.log(obj3);
