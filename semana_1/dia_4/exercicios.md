## 📚 50 Exercícios de Funções de Ordem Superior

### 🟢 NÍVEL BÁSICO (20 exercícios)

#### 1. Executar com Callback

```javascript
// Crie uma função que recebe uma função e a executa
function executar(callback) {
  // Seu código aqui
}

// Teste: executar(() => console.log("Executado!"))
// Deve imprimir: "Executado!"
```

#### 2. Repetir Ação

```javascript
// Crie uma função que executa uma ação N vezes
function repetir(vezes, acao) {
  // Seu código aqui
}

// Teste: repetir(3, () => console.log("Oi"))
// Deve imprimir "Oi" 3 vezes
```

#### 3. Map Simples

```javascript
// Use map para dobrar todos os números
const numeros = [1, 2, 3, 4, 5];
// const dobrados = ?

// Resultado esperado: [2, 4, 6, 8, 10]
```

#### 4. Filter Básico

```javascript
// Use filter para obter apenas números maiores que 10
const valores = [5, 12, 8, 20, 3, 15];
// const maioresQue10 = ?

// Resultado esperado: [12, 20, 15]
```

#### 5. Reduce Soma

```javascript
// Use reduce para somar todos os números
const nums = [10, 20, 30, 40];
// const total = ?

// Resultado esperado: 100
```

#### 6. Criar Saudação

```javascript
// Crie uma função que retorna outra função
function criarSaudacao(prefixo) {
  // Retorne uma função que recebe nome e retorna saudação completa
}

// Teste: const ola = criarSaudacao("Olá");
// ola("Maria") deve retornar "Olá Maria"
```

#### 7. ForEach com Índice

```javascript
// Use forEach para imprimir cada elemento com seu índice
const frutas = ['maçã', 'banana', 'laranja'];
// frutas.forEach(?)

// Saída esperada:
// 0: maçã
// 1: banana
// 2: laranja
```

#### 8. Map para Propriedades

```javascript
// Extraia apenas os nomes usando map
const pessoas = [
  { nome: 'Ana', idade: 25 },
  { nome: 'João', idade: 30 },
];
// const nomes = ?

// Resultado esperado: ["Ana", "João"]
```

#### 9. Filter Strings

```javascript
// Filtre palavras com mais de 4 letras
const palavras = ['sol', 'lua', 'estrela', 'mar', 'montanha'];
// const palavrasGrandes = ?

// Resultado esperado: ["estrela", "montanha"]
```

#### 10. Some Básico

```javascript
// Verifique se existe algum número negativo
const numeros = [1, 5, -3, 10, 8];
// const temNegativo = ?

// Resultado esperado: true
```

#### 11. Every Básico

```javascript
// Verifique se todos os números são positivos
const valores = [2, 4, 6, 8, 10];
// const todosPositivos = ?

// Resultado esperado: true
```

#### 12. Find Número

```javascript
// Encontre o primeiro número par
const nums = [1, 3, 5, 6, 7, 8];
// const primeiroPar = ?

// Resultado esperado: 6
```

#### 13. Aplicar Desconto

```javascript
// Use map para aplicar 10% de desconto
const precos = [100, 200, 300];
// const comDesconto = ?

// Resultado esperado: [90, 180, 270]
```

#### 14. Contador com Closure

```javascript
// Crie um contador usando closure
function criarContador() {
  let count = 0;
  // Retorne função que incrementa e retorna count
}

// Teste: const contador = criarContador();
// contador() => 1, contador() => 2, etc.
```

#### 15. Filter Idades

```javascript
// Filtre pessoas maiores de idade
const usuarios = [
  { nome: 'Pedro', idade: 15 },
  { nome: 'Maria', idade: 22 },
  { nome: 'João', idade: 17 },
  { nome: 'Ana', idade: 19 },
];
// const maioresDeIdade = ?

// Resultado: pessoas com idade >= 18
```

#### 16. Reduce para String

```javascript
// Use reduce para concatenar strings
const letras = ['J', 'a', 'v', 'a'];
// const palavra = ?

// Resultado esperado: "Java"
```

#### 17. Map Quadrados

```javascript
// Crie array com quadrados dos números
const nums = [1, 2, 3, 4, 5];
// const quadrados = ?

// Resultado esperado: [1, 4, 9, 16, 25]
```

#### 18. Função Condicional

```javascript
// Execute função apenas se condição for verdadeira
function seSim(condicao, acao) {
  // Seu código aqui
}

// Teste: seSim(5 > 3, () => console.log("É maior!"))
```

#### 19. Filter e Length

```javascript
// Conte quantas palavras começam com 'a'
const palavras = ['amor', 'bola', 'asa', 'carro', 'amigo'];
// const quantidadeComA = ?

// Resultado esperado: 3
```

#### 20. Reduce Máximo

```javascript
// Use reduce para encontrar o maior número
const numeros = [10, 5, 30, 15, 25];
// const maior = ?

// Resultado esperado: 30
```

### 🟡 NÍVEL INTERMEDIÁRIO (20 exercícios)

#### 21. Composição de Filtros

```javascript
// Filtre números pares maiores que 10
const nums = [2, 15, 8, 22, 11, 30, 5, 12];
// Use filter duas vezes ou combine condições
// const resultado = ?

// Resultado esperado: [22, 30, 12]
```

#### 22. Map e Filter Combinados

```javascript
// Dobre os números pares e filtre os maiores que 10
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];
// const resultado = ?

// Resultado esperado: [12, 16]
```

#### 23. Reduce para Objeto

```javascript
// Conte ocorrências de cada letra
const letras = ['a', 'b', 'a', 'c', 'b', 'a', 'b'];
// const contagem = ?

// Resultado esperado: { a: 3, b: 3, c: 1 }
```

#### 24. Função Curry

```javascript
// Implemente uma função curry para multiplicação
function multiplicar(a) {
  // Retorne função que recebe b e retorna a * b
}

// Teste: const vezes3 = multiplicar(3);
// vezes3(4) => 12
```

#### 25. Pipeline de Transformações

```javascript
// Calcule salário total de desenvolvedores ativos
const funcionarios = [
  { nome: 'Ana', cargo: 'dev', salario: 5000, ativo: true },
  { nome: 'João', cargo: 'designer', salario: 4000, ativo: true },
  { nome: 'Maria', cargo: 'dev', salario: 6000, ativo: false },
  { nome: 'Pedro', cargo: 'dev', salario: 5500, ativo: true },
];
// const totalSalarioDevs = ?

// Resultado esperado: 10500 (Ana + Pedro)
```

#### 26. Memoização Simples

```javascript
// Crie uma função que memoriza resultados
function memoizar(fn) {
  const cache = {};
  return function (x) {
    // Se x está no cache, retorne valor cached
    // Senão, calcule, armazene e retorne
  };
}

// Teste com função cara
const fatorial = memoizar(function (n) {
  console.log(`Calculando ${n}!`);
  return n <= 1 ? 1 : n * fatorial(n - 1);
});
```

#### 27. Debounce Simples

```javascript
// Implemente debounce básico
function debounce(fn, delay) {
  // Seu código aqui
}

// Teste: const salvar = debounce(() => console.log("Salvando..."), 1000);
// Múltiplas chamadas rápidas devem resultar em apenas uma execução
```

#### 28. Agrupar por Propriedade

```javascript
// Use reduce para agrupar por categoria
const produtos = [
  { nome: 'Notebook', categoria: 'eletrônicos', preco: 3000 },
  { nome: 'Camisa', categoria: 'roupas', preco: 80 },
  { nome: 'Mouse', categoria: 'eletrônicos', preco: 50 },
  { nome: 'Calça', categoria: 'roupas', preco: 120 },
];
// const porCategoria = ?

// Resultado: { eletrônicos: [...], roupas: [...] }
```

#### 29. FlatMap Manual

```javascript
// Implemente flatMap usando reduce
function flatMap(array, fn) {
  // Use reduce para mapear e achatar
}

// Teste: flatMap([1, 2, 3], x => [x, x * 2])
// Resultado: [1, 2, 2, 4, 3, 6]
```

#### 30. Validação com Every

```javascript
// Valide formulário usando every
const formulario = {
  nome: 'João Silva',
  email: 'joao@email.com',
  idade: 25,
  senha: '123456',
};

const regras = [
  { campo: 'nome', validar: (v) => v.length > 3 },
  { campo: 'email', validar: (v) => v.includes('@') },
  { campo: 'idade', validar: (v) => v >= 18 },
  { campo: 'senha', validar: (v) => v.length >= 6 },
];

// const formularioValido = ?
```

#### 31. Reduce para Média

```javascript
// Calcule média de notas por aluno
const notas = [
  { aluno: 'Ana', nota: 8 },
  { aluno: 'Ana', nota: 9 },
  { aluno: 'João', nota: 7 },
  { aluno: 'João', nota: 8 },
  { aluno: 'Ana', nota: 7 },
];
// const mediasPorAluno = ?

// Resultado: { Ana: 8, João: 7.5 }
```

#### 32. Compose Functions

```javascript
// Crie função para compor outras funções
function compose(...fns) {
  return function (x) {
    // Execute funções da direita para esquerda
  };
}

// Teste:
const adicionar1 = (x) => x + 1;
const dobrar = (x) => x * 2;
const composta = compose(adicionar1, dobrar);
// composta(5) => 11 (5 * 2 + 1)
```

#### 33. Partial Application

```javascript
// Implemente aplicação parcial
function partial(fn, ...argsFixos) {
  return function (...argsRestantes) {
    // Combine argumentos e chame fn
  };
}

// Teste:
const somar3 = (a, b, c) => a + b + c;
const somar10e = partial(somar3, 10);
// somar10e(5, 2) => 17
```

#### 34. Rate Limiter

```javascript
// Limite execuções por período
function rateLimiter(fn, limite, periodo) {
  let execucoes = [];

  return function (...args) {
    const agora = Date.now();
    // Filtre execuções antigas
    // Verifique se pode executar
    // Execute ou rejeite
  };
}
```

#### 35. Array Único com Reduce

```javascript
// Remove duplicatas usando reduce
const numeros = [1, 2, 2, 3, 4, 3, 5, 1];
// const unicos = ?

// Resultado: [1, 2, 3, 4, 5]
```

#### 36. Transform Object

```javascript
// Transforme objeto usando reduce
const pessoa = { nome: 'João', idade: 30, cidade: 'SP' };
// Crie novo objeto com chaves em maiúsculo
// const pessoaMaiusculo = ?

// Resultado: { NOME: "João", IDADE: 30, CIDADE: "SP" }
```

#### 37. Pipeline Builder

```javascript
// Crie um construtor de pipeline
function pipeline(...funcoes) {
  // Retorne função que aplica todas em sequência
}

// Teste:
const processar = pipeline(
  (x) => x * 2,
  (x) => x + 10,
  (x) => x / 2
);
// processar(5) => 10 (5*2=10, 10+10=20, 20/2=10)
```

#### 38. Async Filter

```javascript
// Implemente filter para funções assíncronas
async function asyncFilter(array, predicado) {
  // Seu código aqui
}

// Teste:
const ehPar = async (n) => n % 2 === 0;
// await asyncFilter([1,2,3,4], ehPar) => [2, 4]
```

#### 39. Deep Map

```javascript
// Map recursivo para arrays aninhados
function deepMap(array, fn) {
  // Se elemento é array, aplique deepMap recursivamente
  // Senão, aplique fn
}

// Teste: deepMap([1, [2, [3, 4]], 5], x => x * 2)
// Resultado: [2, [4, [6, 8]], 10]
```

#### 40. Batch Process

```javascript
// Processe array em lotes
function processPorLotes(array, tamanhoLote, processar) {
  // Divida array em lotes e processe cada um
}

// Teste:
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
processPorLotes(numeros, 3, (lote) => console.log('Lote:', lote));
// Lote: [1,2,3], Lote: [4,5,6], Lote: [7,8,9], Lote: [10]
```

### 🔴 NÍVEL AVANÇADO (5 exercícios)

#### 41. Transducer Implementation

```javascript
// Implemente um transducer básico
function map(fn) {
  return function (reducer) {
    return function (acc, val) {
      return reducer(acc, fn(val));
    };
  };
}

function filter(pred) {
  return function (reducer) {
    return function (acc, val) {
      return pred(val) ? reducer(acc, val) : acc;
    };
  };
}

function compose(...fns) {
  // Implemente composição de transducers
}

// Use os transducers para processar dados eficientemente
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const processamento = compose(
  filter((x) => x % 2 === 0),
  map((x) => x * 2),
  filter((x) => x > 10)
);
// const resultado = ?
```

#### 42. Monad Maybe

```javascript
// Implemente Maybe Monad
class Maybe {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  isNothing() {
    return this.value === null || this.value === undefined;
  }

  map(fn) {
    // Implemente map que lida com null/undefined
  }

  flatMap(fn) {
    // Implemente flatMap
  }

  getOrElse(defaultValue) {
    // Retorne value ou default
  }
}

// Teste com operações seguras
const usuario = { nome: 'João', endereco: { cidade: 'SP' } };
const getCidade = (user) =>
  Maybe.of(user)
    .map((u) => u.endereco)
    .map((e) => e.cidade)
    .getOrElse('Cidade não encontrada');
```

#### 43. Lens Implementation

```javascript
// Implemente lenses para acesso imutável
function lens(getter, setter) {
  return {
    get: getter,
    set: setter,
    over: (fn, obj) => setter(fn(getter(obj)), obj),
  };
}

function prop(key) {
  return lens(
    (obj) => obj[key],
    (val, obj) => ({ ...obj, [key]: val })
  );
}

function compose(...lenses) {
  // Componha múltiplas lenses
}

// Teste:
const pessoa = {
  nome: 'João',
  endereco: {
    cidade: 'SP',
    pais: 'Brasil',
  },
};

const enderecoLens = prop('endereco');
const cidadeLens = prop('cidade');
const enderecoCidadeLens = compose(enderecoLens, cidadeLens);

// Use as lenses para ler e modificar dados imutavelmente
```

#### 44. Lazy Evaluation Stream

```javascript
// Implemente avaliação preguiçosa
class LazyStream {
  constructor(generator) {
    this.generator = generator;
  }

  static from(array) {
    return new LazyStream(function* () {
      for (const item of array) yield item;
    });
  }

  static range(start, end) {
    // Crie stream de números
  }

  map(fn) {
    // Retorne novo LazyStream com transformação
  }

  filter(pred) {
    // Retorne novo LazyStream filtrado
  }

  take(n) {
    // Pegue apenas n elementos
  }

  toArray() {
    // Materialize o stream
  }
}

// Teste com operações infinitas
const numeros = LazyStream.range(1, Infinity)
  .map((x) => x * x)
  .filter((x) => x % 2 === 0)
  .take(10)
  .toArray();
```

#### 45. Function Memoization com WeakMap

```javascript
// Memoização avançada para objetos
function memoizeComplex(fn) {
  const cache = new WeakMap();

  return function (...args) {
    // Implemente cache que funciona com objetos como chave
    // Use WeakMap para evitar vazamento de memória
    // Trate múltiplos argumentos
  };
}

// Teste com função que recebe objetos
const processarUsuario = memoizeComplex(function (usuario, config) {
  console.log('Processando...');
  return {
    ...usuario,
    processado: true,
    timestamp: Date.now(),
    config: config,
  };
});

// Mesmos objetos devem retornar resultado cacheado
```

### 🏆 DESAFIOS (5 exercícios)

#### 46. Sistema de Eventos Funcional

```javascript
// Crie um sistema de eventos usando apenas funções
function createEventEmitter() {
  // Implemente:
  // - on(evento, handler)
  // - off(evento, handler)
  // - emit(evento, ...args)
  // - once(evento, handler)
  // Sem usar classes, apenas closures e HOFs
}

// Teste:
const emitter = createEventEmitter();
const handler = (data) => console.log('Recebido:', data);

emitter.on('teste', handler);
emitter.emit('teste', { msg: 'olá' });
emitter.once('único', () => console.log('Só uma vez'));
```

#### 47. Query Builder Funcional

```javascript
// Construa queries SQL usando composição funcional
function query(tabela) {
  // Retorne objeto com métodos encadeáveis:
  // - select(...campos)
  // - where(condicao)
  // - join(tabela, on)
  // - orderBy(campo, direcao)
  // - limit(n)
  // - build() // retorna SQL string
}

// Teste:
const sql = query('usuarios')
  .select('nome', 'email')
  .join('pedidos', 'usuarios.id = pedidos.usuario_id')
  .where('usuarios.ativo = true')
  .orderBy('nome', 'ASC')
  .limit(10)
  .build();

// Deve gerar SQL válido
```

#### 48. Parser Combinator

```javascript
// Implemente um parser combinator básico
function Parser(parseFn) {
  this.parse = parseFn;
}

Parser.prototype.map = function (fn) {
  // Transforme resultado do parse
};

Parser.prototype.chain = function (fn) {
  // Encadeie parsers
};

Parser.prototype.or = function (otherParser) {
  // Tente este parser ou outro
};

// Parsers básicos
const char = (c) =>
  new Parser((input) => {
    // Parse um caractere específico
  });

const digit = new Parser((input) => {
  // Parse um dígito
});

const many = (parser) =>
  new Parser((input) => {
    // Parse zero ou mais ocorrências
  });

// Combine para criar parser de números
const number = many(digit).map((digits) => parseInt(digits.join('')));
```

#### 49. Reactive Programming Mini-Framework

```javascript
// Crie um framework reativo mínimo
function observable(initialValue) {
  let value = initialValue;
  const observers = [];

  return {
    subscribe(observer) {
      // Adicione observer e retorne unsubscribe
    },

    map(fn) {
      // Retorne novo observable mapeado
    },

    filter(pred) {
      // Retorne novo observable filtrado
    },

    combineLatest(other, combineFn) {
      // Combine dois observables
    },

    setValue(newValue) {
      // Atualize valor e notifique observers
    },
  };
}

// Teste com exemplo prático
const temperatura = observable(20);
const umidade = observable(60);

const conforto = temperatura
  .combineLatest(umidade, (t, u) => ({
    temperatura: t,
    umidade: u,
    confortavel: t >= 18 && t <= 24 && u >= 40 && u <= 60,
  }))
  .subscribe((dados) => console.log('Conforto:', dados));
```

#### 50. Type-Safe Builder Pattern

```javascript
// Implemente um builder pattern type-safe usando funções
function createBuilder(schema) {
  // Crie builder que valida tipos e required fields

  function builder(config = {}) {
    const instance = { ...config };

    const methods = {};

    Object.keys(schema).forEach((key) => {
      methods[`with${key.charAt(0).toUpperCase() + key.slice(1)}`] = function (
        value
      ) {
        // Valide tipo
        // Retorne novo builder com valor setado
      };
    });

    methods.build = function () {
      // Valide campos obrigatórios
      // Retorne objeto final
    };

    return methods;
  }

  return builder;
}

// Teste:
const userBuilder = createBuilder({
  name: { type: 'string', required: true },
  age: { type: 'number', required: true },
  email: { type: 'string', required: false, validator: (v) => v.includes('@') },
});

const user = userBuilder()
  .withName('João')
  .withAge(25)
  .withEmail('joao@email.com')
  .build();
```

---

## 💡 Dicas para Resolver os Exercícios

1. **Comece pelos básicos**: Domine os conceitos fundamentais antes de avançar
2. **Teste sempre**: Use console.log para debugar seu código
3. **Leia a documentação**: MDN é sua amiga para métodos de array
4. **Pratique a leitura**: Entenda o que cada exercício pede antes de codificar
5. **Refatore**: Após funcionar, tente melhorar seu código

## 🎯 Como Estudar

1. Resolva 5-10 exercícios por dia
2. Revise exercícios anteriores regularmente
3. Implemente variações dos exercícios
4. Explique seu código para alguém (ou para si mesmo)
5. Compare diferentes soluções
