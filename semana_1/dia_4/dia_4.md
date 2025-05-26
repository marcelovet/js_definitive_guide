# Funções em JavaScript

## 1. Funções de Ordem Superior

Funções de ordem superior são aquelas que recebem outras funções como argumentos ou retornam funções. Elas são fundamentais para programação funcional em JavaScript.

### O que são Funções de Ordem Superior?

```javascript
// 1. Função que recebe outra função
function executarDuasVezes(funcao) {
  funcao();
  funcao();
}

executarDuasVezes(() => console.log('Olá!'));
// Olá!
// Olá!

// 2. Função que retorna outra função
function criarSaudacao(saudacao) {
  return function (nome) {
    return `${saudacao}, ${nome}!`;
  };
}

const saudarPortugues = criarSaudacao('Olá');
const saudarIngles = criarSaudacao('Hello');

console.log(saudarPortugues('João')); // "Olá, João!"
console.log(saudarIngles('John')); // "Hello, John!"
```

### Abstração com Funções de Ordem Superior

Vamos criar abstrações úteis para evitar repetição:

```javascript
// Em vez de sempre escrever loops...
// for (let i = 0; i < 5; i++) {
//     console.log(i);
// }

// Criamos uma abstração
function repetir(vezes, acao) {
  for (let i = 0; i < vezes; i++) {
    acao(i);
  }
}

// Agora é muito mais expressivo
repetir(5, console.log); // 0, 1, 2, 3, 4

repetir(3, (i) => {
  console.log(`${i + 1}° repetição`);
});

// Abstração para controle de fluxo condicional
function aMenosQue(teste, entao) {
  if (!teste) entao();
}

repetir(5, (n) => {
  aMenosQue(n % 2 === 1, () => {
    console.log(n, 'é par');
  });
});
// 0 é par
// 2 é par
// 4 é par
```

## 2. Métodos de Array de Ordem Superior

JavaScript fornece vários métodos de array que são funções de ordem superior:

### Filter - Filtrando Elementos

```javascript
// Filter cria um novo array com elementos que passam no teste
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const pares = numeros.filter((n) => n % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]

// Exemplo prático: filtrar usuários
const usuarios = [
  { nome: 'Ana', idade: 25, ativo: true },
  { nome: 'Bruno', idade: 17, ativo: true },
  { nome: 'Carlos', idade: 30, ativo: false },
  { nome: 'Diana', idade: 22, ativo: true },
];

const usuariosAtivosAdultos = usuarios
  .filter((u) => u.ativo)
  .filter((u) => u.idade >= 18);

console.log(usuariosAtivosAdultos);
// [{nome: "Ana", idade: 25, ativo: true}, {nome: "Diana", idade: 22, ativo: true}]

// Implementação manual de filter para entender melhor
function meuFilter(array, teste) {
  const resultado = [];
  for (const elemento of array) {
    if (teste(elemento)) {
      resultado.push(elemento);
    }
  }
  return resultado;
}
```

### Map - Transformando Elementos

```javascript
// Map transforma cada elemento do array
const numeros = [1, 2, 3, 4, 5];

const dobrados = numeros.map((n) => n * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]

// Extraindo propriedades
const nomes = usuarios.map((u) => u.nome);
console.log(nomes); // ["Ana", "Bruno", "Carlos", "Diana"]

// Transformações complexas
const usuariosFormatados = usuarios.map((u) => ({
  ...u,
  nomeCompleto: u.nome.toUpperCase(),
  podeVotar: u.idade >= 16,
  categoria: u.idade < 18 ? 'menor' : u.idade < 60 ? 'adulto' : 'idoso',
}));

// Implementação manual de map
function meuMap(array, transformar) {
  const resultado = [];
  for (const elemento of array) {
    resultado.push(transformar(elemento));
  }
  return resultado;
}
```

### Reduce - Agregando Valores

```javascript
// Reduce combina todos elementos em um único valor
const numeros = [1, 2, 3, 4, 5];

// Soma total
const soma = numeros.reduce((acumulador, atual) => acumulador + atual, 0);
console.log(soma); // 15

// Produto total
const produto = numeros.reduce((acc, atual) => acc * atual, 1);
console.log(produto); // 120

// Reduce para criar objetos
const frutas = ['maçã', 'banana', 'maçã', 'laranja', 'banana', 'maçã'];

const contagem = frutas.reduce((acc, fruta) => {
  acc[fruta] = (acc[fruta] || 0) + 1;
  return acc;
}, {});

console.log(contagem); // {maçã: 3, banana: 2, laranja: 1}

// Exemplo complexo: agrupando por categoria
const transacoes = [
  { tipo: 'entrada', valor: 1000 },
  { tipo: 'saida', valor: 200 },
  { tipo: 'entrada', valor: 500 },
  { tipo: 'saida', valor: 300 },
];

const resumo = transacoes.reduce((acc, transacao) => {
  acc[transacao.tipo] = (acc[transacao.tipo] || 0) + transacao.valor;
  acc.total = acc.total || 0;
  acc.total +=
    transacao.tipo === 'entrada' ? transacao.valor : -transacao.valor;
  return acc;
}, {});

console.log(resumo); // {entrada: 1500, saida: 500, total: 1000}

// Implementação manual de reduce
function meuReduce(array, combinar, inicial) {
  let acumulador = inicial;
  for (const elemento of array) {
    acumulador = combinar(acumulador, elemento);
  }
  return acumulador;
}
```

### Outros Métodos Importantes

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// some - verifica se ALGUM elemento satisfaz a condição
const temPar = numeros.some((n) => n % 2 === 0);
console.log(temPar); // true

// every - verifica se TODOS elementos satisfazem a condição
const todosPares = numeros.every((n) => n % 2 === 0);
console.log(todosPares); // false

// find - encontra o PRIMEIRO elemento que satisfaz a condição
const primeiroPar = numeros.find((n) => n % 2 === 0);
console.log(primeiroPar); // 2

// findIndex - encontra o ÍNDICE do primeiro elemento
const indicePrimeiroPar = numeros.findIndex((n) => n % 2 === 0);
console.log(indicePrimeiroPar); // 1

// forEach - executa uma função para cada elemento (sem retornar novo array)
numeros.forEach((n, indice) => {
  console.log(`Posição ${indice}: ${n}`);
});
```

## 3. Composição de Funções

A verdadeira força das funções de ordem superior está na composição:

```javascript
// Pipeline de transformações
const pessoas = [
  { nome: 'Ana', idade: 25, salario: 3000 },
  { nome: 'Bruno', idade: 30, salario: 4500 },
  { nome: 'Carlos', idade: 22, salario: 2500 },
  { nome: 'Diana', idade: 35, salario: 5000 },
  { nome: 'Eduardo', idade: 28, salario: 3500 },
];

// Encontrar salário médio de pessoas acima de 25 anos
const salarioMedio = pessoas
  .filter((p) => p.idade > 25) // Filtrar por idade
  .map((p) => p.salario) // Extrair salários
  .reduce(
    (
      sum,
      sal,
      _,
      arr // Calcular média
    ) => sum + sal / arr.length,
    0
  );

console.log(`Salário médio (>25 anos): R$ ${salarioMedio.toFixed(2)}`);

// Função auxiliar para cálculo de média
function media(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

// Agora fica mais limpo
const salarioMedio2 = media(
  pessoas.filter((p) => p.idade > 25).map((p) => p.salario)
);
```

## 4. Funções Puras vs Impuras

### Funções Puras

São funções que:

- Sempre retornam o mesmo resultado para os mesmos argumentos
- Não têm efeitos colaterais
- Não modificam estado externo

```javascript
// FUNÇÃO PURA
function somar(a, b) {
  return a + b;
}

function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// FUNÇÃO IMPURA - modifica estado externo
let total = 0;
function adicionarAoTotal(valor) {
  total += valor; // Efeito colateral!
  return total;
}

// FUNÇÃO IMPURA - depende de estado externo
function obterSaudacao() {
  const hora = new Date().getHours(); // Depende do tempo!
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}
```

### Transformando Funções Impuras em Puras

```javascript
// Versão impura
let contador = 0;
function proximoId() {
  return ++contador;
}

// Versão pura usando closure
function criarGeradorId() {
  let contador = 0;
  return () => ++contador;
}

const gerarId = criarGeradorId();
console.log(gerarId()); // 1
console.log(gerarId()); // 2

// Versão pura com estado explícito
function proximoIdPuro(contadorAtual) {
  return {
    id: contadorAtual + 1,
    proximoContador: contadorAtual + 1,
  };
}

let estado = { contador: 0 };
const resultado = proximoIdPuro(estado.contador);
estado.contador = resultado.proximoContador;
```

## 5. Currying e Aplicação Parcial

Currying é a técnica de transformar uma função com múltiplos argumentos em uma sequência de funções com um argumento:

```javascript
// Função normal
function somar(a, b, c) {
  return a + b + c;
}

// Versão curry manual
function somarCurry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(somarCurry(1)(2)(3)); // 6

// Função auxiliar para curry automático
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// Exemplo prático
const multiplicar = curry((a, b, c) => a * b * c);

const multiplicarPor2 = multiplicar(2);
const multiplicarPor2e3 = multiplicarPor2(3);

console.log(multiplicarPor2e3(4)); // 24
console.log(multiplicar(2)(3)(4)); // 24
console.log(multiplicar(2, 3, 4)); // 24
```

## 6. Modificadores de Função

Vamos criar funções que modificam o comportamento de outras funções:

```javascript
// 1. Função com log automático
function comLog(fn) {
  return function (...args) {
    console.log(`Chamando ${fn.name} com argumentos:`, args);
    const resultado = fn.apply(this, args);
    console.log(`${fn.name} retornou:`, resultado);
    return resultado;
  };
}

const somarComLog = comLog((a, b) => a + b);
somarComLog(5, 3);

// 2. Função com cache (memoização avançada)
function memoizarComTTL(fn, ttl = 60000) {
  // TTL em ms
  const cache = new Map();

  return function (...args) {
    const chave = JSON.stringify(args);
    const agora = Date.now();

    if (cache.has(chave)) {
      const { valor, timestamp } = cache.get(chave);
      if (agora - timestamp < ttl) {
        console.log('Retornando do cache');
        return valor;
      }
    }

    console.log('Calculando...');
    const resultado = fn.apply(this, args);
    cache.set(chave, { valor: resultado, timestamp: agora });

    return resultado;
  };
}

// 3. Função com retry automático
function comRetry(fn, tentativas = 3, delay = 1000) {
  return async function (...args) {
    let ultimoErro;

    for (let i = 0; i < tentativas; i++) {
      try {
        return await fn.apply(this, args);
      } catch (erro) {
        ultimoErro = erro;
        console.log(`Tentativa ${i + 1} falhou:`, erro.message);

        if (i < tentativas - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw ultimoErro;
  };
}

// 4. Debounce - adia execução até parar de chamar
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 5. Throttle - limita frequência de execução
function throttle(fn, limite) {
  let esperando = false;

  return function (...args) {
    if (!esperando) {
      fn.apply(this, args);
      esperando = true;

      setTimeout(() => {
        esperando = false;
      }, limite);
    }
  };
}
```
