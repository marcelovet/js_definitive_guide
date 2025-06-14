// const nomes = ['João', 'Maria', 'Antônio', 'Margarida'];
// console.log(nomes);

// nomes[2] = 'José';
// console.log(nomes);
// delete nomes[2];
// console.log(nomes);

// // criacao de array com construtor
// const nomes2 = new Array('João', 'Maria', 'Antônio', 'Margarida');
// console.log(nomes2);

// // array criam referencias de valor
// const nomes3 = ['João', 'Maria', 'Antônio', 'Margarida'];
// let nomes4 = nomes3;
// console.log(nomes3);
// nomes4.pop();
// console.log(nomes3);
// nomes4 = [...nomes3];
// nomes4.pop();
// console.log(nomes3);
// console.log(nomes4);

// // atributos
// console.log(nomes.length);

// // metodos
// console.log(nomes.join(' - '));
// console.log(nomes.reverse());
// console.log(nomes.sort());
// console.log(nomes2); // remove o ultimo elemento
// console.log(nomes2.pop()); // remove o ultimo elemento
// console.log(nomes2.shift()); // remove o primeiro elemento

// nomes2.push('José'); // adiciona um elemento no final
// console.log(nomes2);
// nomes2.unshift('José'); // adiciona um elemento no inicio
// console.log(nomes2);

// // slice
// console.log(nomes2.slice(1, -1)); // retorna um novo array com os elementos do indice 1 ao penultimo indice
// console.log(nomes2); // nao altera o array original

// // splice
// // array.splice(indice_inicial, delete_x_elementos, add_elm_1, add_elm_2, ...));
// console.log(nomes2.splice(0, 1)); // remove o elemento no indice 1
// console.log(nomes2); // altera o array original
// console.log(nomes2.splice(1, 1, 'Ricardo', 'Roberto'));
// console.log(nomes2);
// // adicionar em um indice especifico, sem remover elementos
// nomes2.splice(2, 0, 'add1', 'add2');
// console.log(nomes2);

// // permite os mesmos efeitos de pop, unshift, shift, push
// console.log('INICIAL');
// console.log(nomes2);

// console.log('Removendo Maria');
// nomes2.splice(0, 1); // unshift
// console.log(nomes2);

// console.log('Removendo José');
// nomes2.splice(-1, 1); // pop
// console.log(nomes2);

// console.log('add ao final');
// nomes2.splice(nomes2.length, 0, 'last_elm'); // push
// console.log(nomes2);

// console.log('add ao inicio');
// nomes2.splice(0, 0, 'first_elm'); // shift
// console.log(nomes2);

// const nums1 = [1, 2, 3, 4, 5];
// const nums2 = [6, 7, 8, 9, 10];
// const nums3 = [...nums1, ...nums2]; // concatena dois arrays

// filter
// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const pares = nums.filter((value) => value % 2 === 0);
// console.log(pares);

// const pessoas = [
//   { nome: 'Ricardo', idade: 20 },
//   { nome: 'João', idade: 20 },
//   { nome: 'Maria', idade: 30 },
//   { nome: 'Ana', idade: 30 },
//   { nome: 'José', idade: 40 },
//   { nome: 'Pedro', idade: 50 },
//   { nome: 'Paulo', idade: 60 },
// ];

// // > 40 anos
// console.log(pessoas.filter((pessoa) => pessoa.idade > 40));
// // nome com mais de 5 caracteres = Ricardo
// console.log(pessoas.filter((pessoa) => pessoa.nome.length > 5));
// // nome termina com a
// console.log(
//   pessoas.filter((pessoa) => pessoa.nome.toLowerCase().endsWith('a'))
// );

// map
// const nums1 = [1, 2, 3, 4, 5];
// console.log(nums1.map((value) => value * 2));
// console.log(nums1.map((value) => (value % 2 === 0 ? value * 2 : value)));
// console.log(nums1.map((value, index) => (index % 2 === 0 ? value * 2 : value)));

// const pessoas = [
//   { nome: 'Ricardo', idade: 20 },
//   { nome: 'João', idade: 20 },
//   { nome: 'Maria', idade: 30 },
//   { nome: 'Ana', idade: 30 },
//   { nome: 'José', idade: 40 },
//   { nome: 'Pedro', idade: 50 },
//   { nome: 'Paulo', idade: 60 },
// ];

// console.log(pessoas.map((pessoa) => pessoa.nome));
// console.log(
//   pessoas.map((pessoa) => {
//     pessoa.maior_30 = pessoa.idade > 30 ? 'sim' : 'nao';
//     return pessoa;
//   })
// );
// // no map de arrays de objects a alteracao acorre no objeto original
// console.log(pessoas);

// // para nao alterar o original, precisa criar um novo
// console.log(
//   pessoas.map((pessoa) => {
//     const newObj = { ...pessoa };
//     newObj.menor_30 = pessoa.idade < 30 ? 'sim' : 'nao';
//     return newObj;
//   })
// );
// console.log(pessoas);

// reduce
// const nums1 = [1, 2, 3, 4, 5];
// console.log(nums1.reduce((acc, value) => acc + value, 0));
// console.log(nums1.reduce((acc, value) => acc * 2 + value, 1));

// const pessoas = [
//   { nome: 'Ricardo', idade: 20 },
//   { nome: 'João', idade: 20 },
//   { nome: 'Maria', idade: 30 },
//   { nome: 'Ana', idade: 90 },
//   { nome: 'José', idade: 40 },
//   { nome: 'Pedro', idade: 50 },
//   { nome: 'Paulo', idade: 60 },
// ];
// // numero de pessoas com mais que 30 anos
// console.log(
//   pessoas.reduce((acc, pessoa) => (pessoa.idade > 30 ? ++acc : acc), 0)
// );

// // a pessoa  mais velha
// console.log(
//   pessoas.reduce((acc, pessoa) => (pessoa.idade > acc.idade ? pessoa : acc)) // nao fornece o valor inicial, entao o primeiro valor do array sera o valor inicial
// );

// encadeamento de metodos
// soma do dobro dos pares
// const nums1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(
//   nums1
//     .filter((v) => v % 2 === 0) // [2, 4, 6, 8, 10];
//     .map((v) => v * 2) // [4, 8, 12, 16, 20];
//     .reduce((acc, v) => acc + v) // 60;
// );

// forEach
const pessoas = [
  { nome: 'Ricardo', idade: 20 },
  { nome: 'João', idade: 20 },
  { nome: 'Maria', idade: 30 },
  { nome: 'Ana', idade: 90 },
  { nome: 'José', idade: 40 },
  { nome: 'Pedro', idade: 50 },
  { nome: 'Paulo', idade: 60 },
];
pessoas.forEach((pessoa, index) => {
  console.log(`${pessoa.nome} tem ${pessoa.idade} anos`);
  console.log(
    `Aplicando a funcao f() em ${JSON.stringify(pessoa)} do indice ${index}`
  );
});
