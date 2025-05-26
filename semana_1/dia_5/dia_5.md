# Objects, arrays e destructuring/Spread/Rest

## 📦 Objects (Objetos)

Objetos são coleções de pares chave-valor, fundamentais para organizar dados relacionados.

### Criação de Objetos

```javascript
// 1. NOTAÇÃO LITERAL (mais comum)
const pessoa = {
  nome: 'Ana',
  idade: 28,
  ativo: true,
  'nome-completo': 'Ana Silva', // chaves com hífen precisam de aspas
  123: 'valor numérico', // números são convertidos para string
};

// 2. CONSTRUTOR OBJECT
const obj1 = new Object();
obj1.propriedade = 'valor';

// 3. OBJECT.CREATE (herança de protótipo)
const animal = {
  tipo: 'mamífero',
  respirar() {
    console.log('Respirando...');
  },
};
const gato = Object.create(animal);
gato.nome = 'Felix';
console.log(gato.tipo); // "mamífero" (herdado)

// 4. FUNÇÃO CONSTRUTORA
function Carro(marca, modelo) {
  this.marca = marca;
  this.modelo = modelo;
  this.ligar = function () {
    console.log(`${this.marca} ${this.modelo} ligado!`);
  };
}
const meuCarro = new Carro('Toyota', 'Corolla');

// 5. CLASSES (ES6+)
class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
  }

  info() {
    return `${this.titulo} por ${this.autor}`;
  }
}
const livro = new Livro('1984', 'George Orwell');
```

### Acessando e Modificando Propriedades

```javascript
const usuario = {
  nome: 'Carlos',
  idade: 30,
  endereco: {
    rua: 'Rua A',
    numero: 123,
    cidade: 'São Paulo',
  },
  hobbies: ['leitura', 'música', 'corrida'],
};

// ACESSAR - Notação de ponto
console.log(usuario.nome); // "Carlos"
console.log(usuario.endereco.cidade); // "São Paulo"

// ACESSAR - Notação de colchetes (permite chaves dinâmicas)
console.log(usuario['nome']); // "Carlos"
const prop = 'idade';
console.log(usuario[prop]); // 30

// MODIFICAR
usuario.idade = 31;
usuario['nome'] = 'Carlos Eduardo';
usuario.endereco.numero = 456;

// ADICIONAR novas propriedades
usuario.email = 'carlos@email.com';
usuario['telefone'] = '(11) 98765-4321';

// DELETAR propriedades
delete usuario.telefone;
console.log(usuario.telefone); // undefined

// VERIFICAR existência
console.log('email' in usuario); // true
console.log(usuario.hasOwnProperty('email')); // true
console.log(usuario.email !== undefined); // true
```

### Métodos Importantes de Object

```javascript
const produto = {
  nome: 'Notebook',
  preco: 3000,
  estoque: 5,
};

// OBJECT.KEYS - array com as chaves
console.log(Object.keys(produto)); // ["nome", "preco", "estoque"]

// OBJECT.VALUES - array com os valores
console.log(Object.values(produto)); // ["Notebook", 3000, 5]

// OBJECT.ENTRIES - array de arrays [chave, valor]
console.log(Object.entries(produto));
// [["nome", "Notebook"], ["preco", 3000], ["estoque", 5]]

// Iterando com entries
for (const [chave, valor] of Object.entries(produto)) {
  console.log(`${chave}: ${valor}`);
}

// OBJECT.ASSIGN - copiar/mesclar objetos
const config = { tema: 'escuro', idioma: 'pt-BR' };
const novaConfig = Object.assign({}, config, { idioma: 'en-US' });
console.log(novaConfig); // { tema: "escuro", idioma: "en-US" }

// SPREAD OPERATOR (mais moderno que assign)
const copiaConfig = { ...config };
const mesclado = { ...config, idioma: 'es-ES', fonte: '14px' };

// OBJECT.FREEZE - torna objeto imutável
const constantes = Object.freeze({
  PI: 3.14159,
  E: 2.71828,
});
constantes.PI = 4; // Não funciona! (silencioso em modo normal, erro em strict mode)

// OBJECT.SEAL - permite modificar valores mas não adicionar/remover propriedades
const selado = Object.seal({ a: 1, b: 2 });
selado.a = 10; // ✅ Funciona
selado.c = 3; // ❌ Não funciona
delete selado.b; // ❌ Não funciona

// OBJECT.PREVENTEXTENSIONS - previne novas propriedades
const semExtensao = Object.preventExtensions({ x: 1 });
semExtensao.x = 2; // ✅ Funciona
semExtensao.y = 3; // ❌ Não funciona
```

### Desestruturação de Objetos (Destructuring)

```javascript
const pessoa = {
  nome: 'Maria',
  idade: 25,
  cidade: 'Rio de Janeiro',
  profissao: 'Desenvolvedora',
};

// DESESTRUTURAÇÃO BÁSICA
const { nome, idade } = pessoa;
console.log(nome, idade); // "Maria" 25

// RENOMEANDO VARIÁVEIS
const { nome: nomeCompleto, idade: anos } = pessoa;
console.log(nomeCompleto, anos); // "Maria" 25

// VALORES PADRÃO
const { telefone = 'Não informado' } = pessoa;
console.log(telefone); // "Não informado"

// DESESTRUTURAÇÃO ANINHADA
const empresa = {
  nome: 'TechCorp',
  endereco: {
    rua: 'Av. Principal',
    numero: 1000,
    coordenadas: { lat: -23.5, lng: -46.6 },
  },
};

const {
  endereco: {
    rua,
    coordenadas: { lat, lng },
  },
} = empresa;
console.log(rua, lat, lng); // "Av. Principal" -23.5 -46.6

// REST OPERATOR
const { nome: n, ...resto } = pessoa;
console.log(resto); // { idade: 25, cidade: "Rio de Janeiro", profissao: "Desenvolvedora" }

// EM PARÂMETROS DE FUNÇÃO
function apresentar({ nome, idade = 18, cidade = 'Não informada' }) {
  console.log(`${nome}, ${idade} anos, mora em ${cidade}`);
}
apresentar(pessoa);
```

## 🎯 Arrays

Arrays são listas ordenadas de valores, essenciais para trabalhar com coleções de dados.

### Criação e Manipulação Básica

```javascript
// CRIAÇÃO
const numeros = [1, 2, 3, 4, 5];
const misto = ['texto', 123, true, null, { a: 1 }];
const vazio = [];
const matriz = [
  [1, 2],
  [3, 4],
  [5, 6],
]; // array 2D

// Construtor Array
const arr1 = new Array(5); // [empty × 5] - 5 slots vazios
const arr2 = new Array(1, 2, 3); // [1, 2, 3]
const arr3 = Array.of(5); // [5] - diferente do construtor!

// ACESSAR E MODIFICAR
console.log(numeros[0]); // 1 (primeiro elemento)
console.log(numeros[numeros.length - 1]); // 5 (último elemento)

numeros[0] = 10;
numeros[10] = 100; // Cria elementos vazios até o índice 10!
console.log(numeros.length); // 11

// MÉTODOS QUE MODIFICAM O ARRAY (mutáveis)
const frutas = ['maçã', 'banana'];

// Adicionar no final
frutas.push('laranja'); // retorna novo length: 3
console.log(frutas); // ["maçã", "banana", "laranja"]

// Remover do final
const ultima = frutas.pop(); // retorna "laranja"

// Adicionar no início
frutas.unshift('morango'); // retorna novo length: 3

// Remover do início
const primeira = frutas.shift(); // retorna "morango"

// SPLICE - Swiss Army Knife dos arrays
const cores = ['vermelho', 'verde', 'azul', 'amarelo'];
// splice(índice, quantosRemover, ...itensAdicionar)

cores.splice(1, 2); // remove 2 items do índice 1
console.log(cores); // ["vermelho", "amarelo"]

cores.splice(1, 0, 'roxo', 'rosa'); // adiciona sem remover
console.log(cores); // ["vermelho", "roxo", "rosa", "amarelo"]

cores.splice(2, 1, 'preto'); // substitui
console.log(cores); // ["vermelho", "roxo", "preto", "amarelo"]

// REVERSE e SORT (modificam o array original!)
const nums = [3, 1, 4, 1, 5];
nums.reverse(); // [5, 1, 4, 1, 3]
nums.sort(); // [1, 1, 3, 4, 5] - ordena como strings!

// Sort com função de comparação
nums.sort((a, b) => a - b); // ordem numérica crescente
nums.sort((a, b) => b - a); // ordem numérica decrescente
```

### Métodos de Iteração (Não modificam o array original)

```javascript
const numeros = [1, 2, 3, 4, 5];

// MAP - transforma cada elemento
const dobrados = numeros.map((n) => n * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]

const usuarios = [
  { nome: 'Ana', idade: 25 },
  { nome: 'João', idade: 30 },
];
const nomes = usuarios.map((u) => u.nome); // ["Ana", "João"]

// FILTER - filtra elementos
const pares = numeros.filter((n) => n % 2 === 0);
console.log(pares); // [2, 4]

const adultos = usuarios.filter((u) => u.idade >= 18);

// FIND - encontra o primeiro elemento
const encontrado = numeros.find((n) => n > 3);
console.log(encontrado); // 4

const usuario = usuarios.find((u) => u.nome === 'Ana');

// FINDINDEX - índice do primeiro elemento
const indice = numeros.findIndex((n) => n > 3);
console.log(indice); // 3

// REDUCE - reduz array a um único valor
const soma = numeros.reduce((acumulador, numero) => {
  return acumulador + numero;
}, 0); // 0 é o valor inicial
console.log(soma); // 15

// Reduce para criar objeto
const carrinho = [
  { produto: 'Notebook', preco: 3000 },
  { produto: 'Mouse', preco: 50 },
  { produto: 'Teclado', preco: 150 },
];

const total = carrinho.reduce((total, item) => total + item.preco, 0);
console.log(total); // 3200

// EVERY - todos atendem a condição?
const todosPares = numeros.every((n) => n % 2 === 0);
console.log(todosPares); // false

// SOME - algum atende a condição?
const algumPar = numeros.some((n) => n % 2 === 0);
console.log(algumPar); // true

// FOREACH - apenas itera (não retorna nada)
numeros.forEach((num, index, array) => {
  console.log(`Índice ${index}: ${num}`);
});

// INCLUDES - verifica se contém
console.log(numeros.includes(3)); // true
console.log(numeros.includes(10)); // false

// INDEXOF / LASTINDEXOF
const letras = ['a', 'b', 'c', 'b', 'd'];
console.log(letras.indexOf('b')); // 1
console.log(letras.lastIndexOf('b')); // 3
```

### Métodos de Transformação

```javascript
// SLICE - cria cópia parcial (não modifica original)
const animais = ['gato', 'cachorro', 'pássaro', 'peixe', 'hamster'];
console.log(animais.slice(1, 3)); // ["cachorro", "pássaro"]
console.log(animais.slice(-2)); // ["peixe", "hamster"]
console.log(animais.slice()); // cópia completa

// CONCAT - combina arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const combinado = arr1.concat(arr2, arr3);
console.log(combinado); // [1, 2, 3, 4, 5, 6]

// JOIN - transforma em string
const palavras = ['JavaScript', 'é', 'incrível'];
console.log(palavras.join(' ')); // "JavaScript é incrível"
console.log(palavras.join('-')); // "JavaScript-é-incrível"

// FLAT - achata arrays aninhados
const aninhado = [1, [2, 3], [4, [5, 6]]];
console.log(aninhado.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(aninhado.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(aninhado.flat(Infinity)); // achata completamente

// FLATMAP - map + flat
const frases = ['Olá mundo', 'JavaScript rocks'];
const palavrasSeparadas = frases.flatMap((frase) => frase.split(' '));
console.log(palavrasSeparadas); // ["Olá", "mundo", "JavaScript", "rocks"]
```

### Desestruturação de Arrays

```javascript
// BÁSICA
const cores = ['vermelho', 'verde', 'azul'];
const [primeiraCor, segundaCor] = cores;
console.log(primeiraCor, segundaCor); // "vermelho" "verde"

// PULAR ELEMENTOS
const [primeira, , terceira] = cores;
console.log(primeira, terceira); // "vermelho" "azul"

// REST OPERATOR
const [cabeca, ...cauda] = cores;
console.log(cabeca); // "vermelho"
console.log(cauda); // ["verde", "azul"]

// VALORES PADRÃO
const [a, b, c, d = 'roxo'] = cores;
console.log(d); // "roxo"

// TROCA DE VARIÁVEIS
let x = 10,
  y = 20;
[x, y] = [y, x];
console.log(x, y); // 20 10

// DESESTRUTURAÇÃO ANINHADA
const matriz = [
  [1, 2],
  [3, 4],
];
const [[a1, a2], [b1, b2]] = matriz;
console.log(a1, a2, b1, b2); // 1 2 3 4

// EM FUNÇÕES
function processarCoordenadas([x, y, z = 0]) {
  console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
}
processarCoordenadas([10, 20]); // X: 10, Y: 20, Z: 0
```

## 🔥 Técnicas Avançadas

### Spread e Rest Operators

```javascript
// SPREAD EM ARRAYS
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
const todos = [...nums1, ...nums2]; // [1, 2, 3, 4, 5, 6]

// Cópia de array (shallow)
const original = [1, [2, 3], 4];
const copia = [...original];
copia[1][0] = 99; // ⚠️ Afeta o original também!

// SPREAD EM OBJETOS
const pessoa = { nome: 'Ana', idade: 25 };
const profissional = { cargo: 'Dev', empresa: 'TechCo' };
const completo = { ...pessoa, ...profissional };

// Sobrescrevendo propriedades
const atualizado = { ...pessoa, idade: 26, cidade: 'SP' };

// REST EM FUNÇÕES
function somar(...numeros) {
  return numeros.reduce((a, b) => a + b, 0);
}
console.log(somar(1, 2, 3, 4, 5)); // 15

// Combinando parâmetros normais com rest
function log(primeiro, segundo, ...resto) {
  console.log(primeiro, segundo, resto);
}
log(1, 2, 3, 4, 5); // 1 2 [3, 4, 5]
```

### Métodos Modernos e Úteis

```javascript
// ARRAY.FROM - converte iteráveis em arrays
const nodeList = document.querySelectorAll('div');
const divArray = Array.from(nodeList);

// Com função de mapeamento
const numeros = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(numeros); // [1, 2, 3, 4, 5]

// ARRAY.OF - cria array com elementos
const arr = Array.of(1, 2, 3, 4, 5);

// OBJECT.FROMENTRIES - oposto de Object.entries
const entries = [
  ['nome', 'João'],
  ['idade', 30],
];
const obj = Object.fromEntries(entries);
console.log(obj); // { nome: "João", idade: 30 }

// OBJECT.GETOWNPROPERTYDESCRIPTORS
const pessoa = {
  nome: 'Ana',
  get nomeUpper() {
    return this.nome.toUpperCase();
  },
};
console.log(Object.getOwnPropertyDescriptors(pessoa));

// DEEP COPY com estruturas complexas
const complexo = {
  a: 1,
  b: { c: 2, d: [3, 4] },
  e: new Date(),
};

// Método 1: JSON (perde funções, datas, etc)
const copia1 = JSON.parse(JSON.stringify(complexo));

// Método 2: structuredClone (mais moderno)
const copia2 = structuredClone(complexo);
```

## 🎮 Exemplo Prático Completo

```javascript
// SISTEMA DE GERENCIAMENTO DE TAREFAS
class GerenciadorTarefas {
  constructor() {
    this.tarefas = [];
    this.proximoId = 1;
  }

  // Adicionar tarefa
  adicionar(titulo, descricao = '', prioridade = 'media') {
    const tarefa = {
      id: this.proximoId++,
      titulo,
      descricao,
      prioridade,
      concluida: false,
      criadaEm: new Date(),
      concluidaEm: null,
      tags: [],
    };

    this.tarefas.push(tarefa);
    return tarefa;
  }

  // Buscar tarefa por ID
  buscarPorId(id) {
    return this.tarefas.find((t) => t.id === id);
  }

  // Atualizar tarefa
  atualizar(id, atualizacoes) {
    const indice = this.tarefas.findIndex((t) => t.id === id);
    if (indice !== -1) {
      this.tarefas[indice] = {
        ...this.tarefas[indice],
        ...atualizacoes,
        atualizadaEm: new Date(),
      };
      return this.tarefas[indice];
    }
    return null;
  }

  // Marcar como concluída
  concluir(id) {
    return this.atualizar(id, {
      concluida: true,
      concluidaEm: new Date(),
    });
  }

  // Remover tarefa
  remover(id) {
    const indice = this.tarefas.findIndex((t) => t.id === id);
    if (indice !== -1) {
      return this.tarefas.splice(indice, 1)[0];
    }
    return null;
  }

  // Filtrar tarefas
  filtrar({ concluida, prioridade, tags } = {}) {
    return this.tarefas.filter((tarefa) => {
      if (concluida !== undefined && tarefa.concluida !== concluida) {
        return false;
      }
      if (prioridade && tarefa.prioridade !== prioridade) {
        return false;
      }
      if (tags && tags.length > 0) {
        return tags.some((tag) => tarefa.tags.includes(tag));
      }
      return true;
    });
  }

  // Estatísticas
  estatisticas() {
    const total = this.tarefas.length;
    const concluidas = this.tarefas.filter((t) => t.concluida).length;
    const porPrioridade = this.tarefas.reduce((acc, tarefa) => {
      acc[tarefa.prioridade] = (acc[tarefa.prioridade] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      concluidas,
      pendentes: total - concluidas,
      porcentagemConcluida: total
        ? ((concluidas / total) * 100).toFixed(2) + '%'
        : '0%',
      porPrioridade,
    };
  }

  // Ordenar tarefas
  ordenar(criterio = 'criadaEm', ordem = 'asc') {
    const comparadores = {
      criadaEm: (a, b) => a.criadaEm - b.criadaEm,
      titulo: (a, b) => a.titulo.localeCompare(b.titulo),
      prioridade: (a, b) => {
        const prioridades = { alta: 3, media: 2, baixa: 1 };
        return prioridades[b.prioridade] - prioridades[a.prioridade];
      },
    };

    const comparador = comparadores[criterio] || comparadores.criadaEm;
    const tarefasOrdenadas = [...this.tarefas].sort(comparador);

    return ordem === 'desc' ? tarefasOrdenadas.reverse() : tarefasOrdenadas;
  }

  // Adicionar tags
  adicionarTags(id, ...novasTags) {
    const tarefa = this.buscarPorId(id);
    if (tarefa) {
      tarefa.tags = [...new Set([...tarefa.tags, ...novasTags])];
      return tarefa;
    }
    return null;
  }

  // Busca avançada
  buscar(termo) {
    const termoLower = termo.toLowerCase();
    return this.tarefas.filter(
      (tarefa) =>
        tarefa.titulo.toLowerCase().includes(termoLower) ||
        tarefa.descricao.toLowerCase().includes(termoLower) ||
        tarefa.tags.some((tag) => tag.toLowerCase().includes(termoLower))
    );
  }
}

// USO DO SISTEMA
const gerenciador = new GerenciadorTarefas();

// Adicionar tarefas
gerenciador.adicionar(
  'Estudar JavaScript',
  'Focar em arrays e objetos',
  'alta'
);
gerenciador.adicionar('Fazer exercícios', 'Resolver 10 problemas', 'media');
gerenciador.adicionar('Revisar código', '', 'baixa');

// Adicionar tags
gerenciador.adicionarTags(1, 'programação', 'estudo', 'javascript');
gerenciador.adicionarTags(2, 'prática', 'estudo');

// Concluir tarefa
gerenciador.concluir(2);

// Buscar e filtrar
console.log(gerenciador.buscar('javascript'));
console.log(gerenciador.filtrar({ concluida: false, prioridade: 'alta' }));

// Estatísticas
console.log(gerenciador.estatisticas());

// Ordenar
console.log(gerenciador.ordenar('prioridade'));
```

## 🏋️ Exercícios Práticos

### Exercício 1: Manipulação de Objetos

```javascript
// Crie uma função que mescla objetos profundamente (deep merge)
function deepMerge(obj1, obj2) {
  // Seu código aqui
  // Deve mesclar objetos aninhados recursivamente
}

// Teste:
const config1 = {
  api: { url: 'http://api.com', timeout: 5000 },
  ui: { theme: 'dark', language: 'pt' },
};

const config2 = {
  api: { timeout: 10000, retries: 3 },
  ui: { theme: 'light' },
  debug: true,
};

console.log(deepMerge(config1, config2));
// Esperado: {
//   api: { url: "http://api.com", timeout: 10000, retries: 3 },
//   ui: { theme: "light", language: "pt" },
//   debug: true
// }
```

### Exercício 2: Array Avançado

```javascript
// Implemente um método groupBy para arrays
Array.prototype.groupBy = function (keyFunc) {
  // Seu código aqui
};

// Teste:
const pessoas = [
  { nome: 'Ana', idade: 25, cidade: 'SP' },
  { nome: 'João', idade: 30, cidade: 'RJ' },
  { nome: 'Maria', idade: 25, cidade: 'SP' },
  { nome: 'Pedro', idade: 30, cidade: 'SP' },
];

console.log(pessoas.groupBy((p) => p.idade));
// Esperado: {
//   25: [{ nome: "Ana", ... }, { nome: "Maria", ... }],
//   30: [{ nome: "João", ... }, { nome: "Pedro", ... }]
// }
```

### Exercício 3: Carrinho de Compras

```javascript
// Crie uma classe CarrinhoCompras com métodos:
// - adicionar(produto, quantidade)
// - remover(produtoId)
// - calcularTotal()
// - aplicarDesconto(porcentagem)
// - listarItens()

class CarrinhoCompras {
  // Seu código aqui
}

// Teste sua implementação
```

## 🎯 Destructuring (Desestruturação)

Destructuring é uma forma elegante de extrair valores de arrays ou propriedades de objetos e atribuí-los a variáveis.

### 📦 Object Destructuring

```javascript
// SINTAXE BÁSICA
const pessoa = {
  nome: 'Ana Silva',
  idade: 28,
  email: 'ana@email.com',
  telefone: '(11) 98765-4321',
};

// Forma tradicional (antiga)
const nomeAntigo = pessoa.nome;
const idadeAntiga = pessoa.idade;

// Com destructuring
const { nome, idade } = pessoa;
console.log(nome, idade); // "Ana Silva" 28

// RENOMEANDO VARIÁVEIS
const { nome: nomeCompleto, idade: anos } = pessoa;
console.log(nomeCompleto, anos); // "Ana Silva" 28

// VALORES PADRÃO
const { telefone, cpf = 'Não informado' } = pessoa;
console.log(telefone); // "(11) 98765-4321"
console.log(cpf); // "Não informado"

// COMBINANDO RENOMEAÇÃO E VALOR PADRÃO
const { endereco: enderecoCompleto = 'Não cadastrado' } = pessoa;
console.log(enderecoCompleto); // "Não cadastrado"
```

### 🎭 Destructuring Aninhado

```javascript
const empresa = {
  nome: 'TechCorp',
  fundacao: 2010,
  endereco: {
    rua: 'Av. Paulista',
    numero: 1000,
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01310-100',
  },
  contatos: {
    email: 'contato@techcorp.com',
    telefones: {
      principal: '(11) 3000-1000',
      suporte: '(11) 3000-2000',
    },
  },
};

// DESESTRUTURAÇÃO PROFUNDA
const {
  nome,
  endereco: { rua, cidade, estado },
  contatos: {
    telefones: { principal: telPrincipal },
  },
} = empresa;

console.log(nome); // "TechCorp"
console.log(rua); // "Av. Paulista"
console.log(telPrincipal); // "(11) 3000-1000"

// CUIDADO: endereco e contatos não são criados como variáveis!
// console.log(endereco); // ❌ ReferenceError

// Para manter referências intermediárias:
const {
  endereco,
  endereco: { cidade: nomeCidade },
} = empresa;
console.log(endereco); // objeto completo
console.log(nomeCidade); // "São Paulo"
```

### 🎨 Array Destructuring

```javascript
// SINTAXE BÁSICA
const cores = ['vermelho', 'verde', 'azul', 'amarelo', 'roxo'];

// Forma tradicional
const cor1Antiga = cores[0];
const cor2Antiga = cores[1];

// Com destructuring
const [cor1, cor2] = cores;
console.log(cor1, cor2); // "vermelho" "verde"

// PULANDO ELEMENTOS
const [primeira, , terceira, , quinta] = cores;
console.log(primeira, terceira, quinta); // "vermelho" "azul" "roxo"

// VALORES PADRÃO
const numeros = [10, 20];
const [n1, n2, n3 = 30, n4 = 40] = numeros;
console.log(n1, n2, n3, n4); // 10 20 30 40

// DESESTRUTURAÇÃO COM ARRAYS ANINHADOS
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const [[a, b], [, e], [, , i]] = matriz;
console.log(a, b, e, i); // 1 2 5 9

// TROCA DE VARIÁVEIS (swap)
let x = 10;
let y = 20;
console.log(x, y); // 10 20

[x, y] = [y, x];
console.log(x, y); // 20 10

// Trocar múltiplas variáveis
let a = 1,
  b = 2,
  c = 3;
[a, b, c] = [c, a, b];
console.log(a, b, c); // 3 1 2
```

### 🎯 Destructuring em Funções

```javascript
// PARÂMETROS DE FUNÇÃO COM OBJETOS
function criarUsuario({ nome, email, idade = 18, ativo = true }) {
  return {
    id: Date.now(),
    nome,
    email,
    idade,
    ativo,
    criadoEm: new Date(),
  };
}

const novoUsuario = criarUsuario({
  nome: 'Carlos',
  email: 'carlos@email.com',
  // idade usa o padrão 18
  // ativo usa o padrão true
});

// MÚLTIPLOS RETORNOS
function calcularEstatisticas(numeros) {
  const soma = numeros.reduce((a, b) => a + b, 0);
  const media = soma / numeros.length;
  const max = Math.max(...numeros);
  const min = Math.min(...numeros);

  return { soma, media, max, min };
}

const nums = [10, 20, 30, 40, 50];
const { media, max } = calcularEstatisticas(nums);
console.log(media, max); // 30 50

// ARRAYS COMO PARÂMETROS
function processarCoordenadas([x, y, z = 0]) {
  return {
    x: x * 10,
    y: y * 10,
    z: z * 10,
  };
}

const coords = [5, 3];
console.log(processarCoordenadas(coords)); // { x: 50, y: 30, z: 0 }

// DESTRUCTURING COMPLEXO EM PARÂMETROS
function configurarApp({
  tema = 'claro',
  idioma = 'pt-BR',
  funcionalidades: { notificacoes = true, autoSave = false } = {},
} = {}) {
  console.log({ tema, idioma, notificacoes, autoSave });
}

configurarApp(); // usa todos os padrões
configurarApp({
  tema: 'escuro',
  funcionalidades: { notificacoes: false },
});
```

## 📤 Spread Operator (...)

O Spread "espalha" elementos de arrays ou propriedades de objetos.

### 🎲 Spread com Arrays

```javascript
// EXPANDINDO ARRAYS
const numeros = [1, 2, 3];
console.log(...numeros); // 1 2 3 (não é array!)

// COPIANDO ARRAYS (shallow copy)
const original = [1, 2, 3];
const copia = [...original];
copia.push(4);
console.log(original); // [1, 2, 3]
console.log(copia); // [1, 2, 3, 4]

// ⚠️ CUIDADO com objetos dentro de arrays
const usuarios = [
  { nome: 'Ana', idade: 25 },
  { nome: 'João', idade: 30 },
];
const copiaUsuarios = [...usuarios];
copiaUsuarios[0].idade = 26; // Modifica o original também!

// COMBINANDO ARRAYS
const frutas = ['maçã', 'banana'];
const vegetais = ['cenoura', 'brócolis'];
const alimentos = [...frutas, 'pão', ...vegetais, 'arroz'];
console.log(alimentos);
// ["maçã", "banana", "pão", "cenoura", "brócolis", "arroz"]

// CONVERTENDO ITERÁVEIS
const palavra = 'JavaScript';
const letras = [...palavra];
console.log(letras); // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]

const nodeList = document.querySelectorAll('div');
const divArray = [...nodeList]; // Converte NodeList em Array

const conjunto = new Set([1, 2, 2, 3, 3, 3]);
const arrayUnico = [...conjunto]; // [1, 2, 3]

// PASSANDO PARA FUNÇÕES
const numeros1 = [10, 5, 8, 3, 15];
const maximo = Math.max(...numeros1); // 15
// Equivale a: Math.max(10, 5, 8, 3, 15)

// Aplicando array como argumentos
function somar(a, b, c) {
  return a + b + c;
}
const valores = [1, 2, 3];
console.log(somar(...valores)); // 6
```

### 🏠 Spread com Objetos

```javascript
// COPIANDO OBJETOS (shallow copy)
const pessoa = {
  nome: 'Maria',
  idade: 28,
  cidade: 'São Paulo',
};

const copiaPessoa = { ...pessoa };
copiaPessoa.idade = 29;
console.log(pessoa.idade); // 28
console.log(copiaPessoa.idade); // 29

// MESCLANDO OBJETOS
const dadosPessoais = {
  nome: 'Roberto',
  idade: 35,
};

const dadosProfissionais = {
  cargo: 'Desenvolvedor',
  empresa: 'TechCo',
  salario: 8000,
};

const funcionario = {
  ...dadosPessoais,
  ...dadosProfissionais,
  id: 12345,
};

console.log(funcionario);
// { nome: "Roberto", idade: 35, cargo: "Desenvolvedor",
//   empresa: "TechCo", salario: 8000, id: 12345 }

// SOBRESCREVENDO PROPRIEDADES
const config = {
  tema: 'claro',
  fonte: '14px',
  idioma: 'pt-BR',
};

const novaConfig = {
  ...config,
  tema: 'escuro', // sobrescreve
  animacoes: true, // adiciona nova
};

console.log(novaConfig);
// { tema: "escuro", fonte: "14px", idioma: "pt-BR", animacoes: true }

// ORDEM IMPORTA!
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const resultado1 = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }
const resultado2 = { ...obj2, ...obj1 }; // { b: 2, c: 4, a: 1 }

// CONDICIONAL COM SPREAD
const usuario = {
  nome: 'Ana',
  email: 'ana@email.com',
};

const isAdmin = true;
const perfilCompleto = {
  ...usuario,
  ...(isAdmin && { role: 'admin', permissoes: ['read', 'write', 'delete'] }),
};

console.log(perfilCompleto);
// Se isAdmin true: inclui role e permissoes
// Se isAdmin false: não inclui nada extra
```

## 📥 Rest Parameters (...)

Rest é o oposto do Spread - ele "coleta" múltiplos elementos em um array.

### 🎪 Rest em Funções

```javascript
// COLETANDO ARGUMENTOS
function somar(...numeros) {
  console.log(numeros); // Array com todos os argumentos
  return numeros.reduce((total, num) => total + num, 0);
}

console.log(somar(1, 2, 3)); // 6
console.log(somar(1, 2, 3, 4, 5)); // 15

// COMBINANDO PARÂMETROS NORMAIS COM REST
function criarTime(capitao, vicecapitao, ...jogadores) {
  return {
    capitao,
    vicecapitao,
    jogadores,
    totalJogadores: 2 + jogadores.length,
  };
}

const time = criarTime('João', 'Maria', 'Ana', 'Carlos', 'Pedro');
console.log(time);
// { capitao: "João", vicecapitao: "Maria",
//   jogadores: ["Ana", "Carlos", "Pedro"], totalJogadores: 5 }

// REST DEVE SER O ÚLTIMO PARÂMETRO
// function erro(...args, ultimo) {} // ❌ SyntaxError

// SUBSTITUINDO arguments
// Forma antiga (não recomendada)
function oldFunction() {
  console.log(arguments); // objeto array-like
}

// Forma moderna com rest
function newFunction(...args) {
  console.log(args); // array real
  args.forEach((arg) => console.log(arg)); // pode usar métodos de array
}
```

### 🎨 Rest em Destructuring

```javascript
// REST COM ARRAYS
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const [primeiro, segundo, ...resto] = numeros;
console.log(primeiro); // 1
console.log(segundo); // 2
console.log(resto); // [3, 4, 5, 6, 7, 8, 9, 10]

// HEAD E TAIL pattern
const [head, ...tail] = numeros;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5, 6, 7, 8, 9, 10]

// REST COM OBJETOS
const pessoa = {
  nome: 'Lucas',
  idade: 30,
  email: 'lucas@email.com',
  telefone: '(11) 98765-4321',
  endereco: 'Rua A, 123',
};

const { nome, email, ...outrosDados } = pessoa;
console.log(nome); // "Lucas"
console.log(email); // "lucas@email.com"
console.log(outrosDados); // { idade: 30, telefone: "(11) 98765-4321", endereco: "Rua A, 123" }

// REMOVENDO PROPRIEDADES
const { senha, ...usuarioSemSenha } = {
  id: 1,
  nome: 'Ana',
  email: 'ana@email.com',
  senha: '123456',
};
console.log(usuarioSemSenha); // { id: 1, nome: "Ana", email: "ana@email.com" }

// NESTED REST
const config = {
  api: {
    url: 'https://api.example.com',
    key: 'secret-key',
    timeout: 5000,
    retries: 3,
  },
  ui: {
    theme: 'dark',
    language: 'pt-BR',
  },
};

const {
  api: { url, ...apiConfig },
  ...otherConfig
} = config;

console.log(url); // "https://api.example.com"
console.log(apiConfig); // { key: "secret-key", timeout: 5000, retries: 3 }
console.log(otherConfig); // { ui: { theme: "dark", language: "pt-BR" } }
```

## 🚀 Casos de Uso Práticos

### 1. Clone e Merge Avançados

```javascript
// DEEP CLONE com spread (limitado)
const original = {
  nivel1: {
    nivel2: {
      nivel3: 'valor',
    },
  },
};

// Shallow copy - NÃO funciona para objetos aninhados
const shallowCopy = { ...original };
shallowCopy.nivel1.nivel2.nivel3 = 'modificado';
console.log(original.nivel1.nivel2.nivel3); // "modificado" 😱

// Solução: função de deep clone
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map((item) => deepClone(item));

  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

// MERGE INTELIGENTE
function smartMerge(...objects) {
  return objects.reduce((result, obj) => {
    Object.keys(obj).forEach((key) => {
      if (Array.isArray(result[key]) && Array.isArray(obj[key])) {
        result[key] = [...result[key], ...obj[key]];
      } else if (
        typeof result[key] === 'object' &&
        typeof obj[key] === 'object'
      ) {
        result[key] = smartMerge(result[key], obj[key]);
      } else {
        result[key] = obj[key];
      }
    });
    return result;
  }, {});
}
```

### 2. Função de Composição

```javascript
// PIPE/COMPOSE com rest e reduce
const pipe =
  (...funcoes) =>
  (valorInicial) =>
    funcoes.reduce((resultado, funcao) => funcao(resultado), valorInicial);

const compose =
  (...funcoes) =>
  (valorInicial) =>
    funcoes.reduceRight((resultado, funcao) => funcao(resultado), valorInicial);

// Uso
const adicionar10 = (x) => x + 10;
const multiplicar2 = (x) => x * 2;
const dividir5 = (x) => x / 5;

const processar = pipe(adicionar10, multiplicar2, dividir5);
console.log(processar(5)); // ((5 + 10) * 2) / 5 = 6

// FUNÇÃO CURRY com rest
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
};

const somar3 = (a, b, c) => a + b + c;
const somarCurried = curry(somar3);

console.log(somarCurried(1)(2)(3)); // 6
console.log(somarCurried(1, 2)(3)); // 6
console.log(somarCurried(1)(2, 3)); // 6
```

### 3. React Patterns (Conceitual)

```javascript
// PROPS SPREADING
function Button({
  children,
  variant = 'primary',
  size = 'medium',
  ...otherProps
}) {
  const className = `btn btn-${variant} btn-${size}`;

  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
}

// Uso
<Button
  variant="danger"
  size="large"
  onClick={handleClick}
  disabled={isLoading}
  data-testid="submit-button"
>
  Enviar
</Button>;

// HIGHER ORDER COMPONENT pattern
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, ...componentProps } = props;

    if (!user) {
      return <div>Por favor, faça login</div>;
    }

    return <Component user={user} {...componentProps} />;
  };
}
```

### 4. API e Configurações

```javascript
// CONFIGURAÇÃO FLEXÍVEL
class APIClient {
  constructor(baseConfig = {}) {
    this.config = {
      baseURL: 'https://api.example.com',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...baseConfig,
    };
  }

  async request(endpoint, options = {}) {
    const { method = 'GET', data, headers = {}, ...otherOptions } = options;

    const config = {
      ...this.config,
      ...otherOptions,
      headers: {
        ...this.config.headers,
        ...headers,
      },
    };

    // Fazer requisição...
  }

  get(endpoint, config) {
    return this.request(endpoint, { method: 'GET', ...config });
  }

  post(endpoint, data, config) {
    return this.request(endpoint, { method: 'POST', data, ...config });
  }
}

// BUILDER PATTERN
class QueryBuilder {
  constructor() {
    this.query = {};
  }

  select(...fields) {
    this.query.select = fields;
    return this;
  }

  where(conditions) {
    this.query.where = { ...this.query.where, ...conditions };
    return this;
  }

  orderBy(...fields) {
    this.query.orderBy = fields;
    return this;
  }

  build() {
    return { ...this.query };
  }
}

const query = new QueryBuilder()
  .select('id', 'nome', 'email')
  .where({ ativo: true, idade: { $gte: 18 } })
  .orderBy('nome', '-criadoEm')
  .build();
```
