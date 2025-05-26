## 📚 **50 Exercícios de JavaScript - Estruturas, Controle de Fluxo, Funções, Objects e Arrays**

### 🟢 **NÍVEL BÁSICO (20 exercícios)**

#### **Arrays e Índices (1-5)**

**1. Acesso Básico a Arrays**

```javascript
// Complete o código para acessar os elementos corretos
let frutas = ['maçã', 'banana', 'laranja', 'uva', 'manga'];

// Acesse o primeiro elemento
let primeira = // ?

// Acesse o último elemento (sem usar o índice 4 diretamente)
let ultima = // ?

// Acesse o elemento do meio
let meio = // ?

console.log(primeira); // deve mostrar: 'maçã'
console.log(ultima);   // deve mostrar: 'manga'
console.log(meio);     // deve mostrar: 'laranja'
```

**2. Modificando Arrays**

```javascript
// Modifique o array conforme solicitado
let numeros = [10, 20, 30, 40, 50];

// Mude o primeiro elemento para 15
// ?

// Mude o último elemento para 100
// ?

// Adicione 60 ao final do array
// ?

console.log(numeros); // deve mostrar: [15, 20, 30, 40, 100, 60]
```

**3. Propriedades de Arrays**

```javascript
// Trabalhe com propriedades de arrays
let cores = ['vermelho', 'azul', 'verde'];

// Obtenha o tamanho do array
let tamanho = // ?

// Verifique se 'azul' está no array
let temAzul = // ?

// Encontre o índice de 'verde'
let indiceVerde = // ?

console.log(tamanho);     // deve mostrar: 3
console.log(temAzul);     // deve mostrar: true
console.log(indiceVerde); // deve mostrar: 2
```

**4. Criando Arrays**

```javascript
// Crie arrays de diferentes formas
// Crie um array com os números de 1 a 5
let numeros = // ?

// Crie um array vazio e adicione 3 elementos
let vazio = // ?
// adicione 'a', 'b', 'c'

// Crie um array com 5 elementos undefined
let indefinidos = // ?

console.log(numeros);     // [1, 2, 3, 4, 5]
console.log(vazio);       // ['a', 'b', 'c']
console.log(indefinidos); // [undefined, undefined, undefined, undefined, undefined]
```

**5. Arrays com Loops**

```javascript
// Use loops para trabalhar com arrays
let numeros = [2, 4, 6, 8, 10];
let soma = 0;

// Use um loop for para somar todos os números
// ?

console.log(soma); // deve mostrar: 30

// Use um loop para criar um novo array com o dobro de cada número
let dobrados = [];
// ?

console.log(dobrados); // deve mostrar: [4, 8, 12, 16, 20]
```

#### **Objects Básicos (6-10)**

**6. Criando e Acessando Objects**

```javascript
// Crie um objeto pessoa com as propriedades solicitadas
let pessoa = {
  // adicione: nome (string), idade (number), cidade (string)
};

// Acesse e mostre cada propriedade
console.log(); // deve mostrar o nome
console.log(); // deve mostrar a idade
console.log(); // deve mostrar a cidade
```

**7. Modificando Objects**

```javascript
let carro = {
  marca: 'Toyota',
  modelo: 'Corolla',
  ano: 2020,
};

// Mude o ano para 2023
// ?

// Adicione uma propriedade 'cor' com valor 'prata'
// ?

// Delete a propriedade 'modelo'
// ?

console.log(carro); // deve mostrar: {marca: 'Toyota', ano: 2023, cor: 'prata'}
```

**8. Objects com Arrays**

```javascript
// Complete o objeto estudante
let estudante = {
    nome: 'João',
    // adicione um array 'notas' com 3 notas numéricas
    notas: // ?
};

// Calcule a média das notas
let media = // ?

console.log(media); // deve mostrar a média das 3 notas
```

**9. Acessando Propriedades Especiais**

```javascript
let config = {
    'nome-completo': 'Maria Silva',
    'data-nascimento': '01/01/2000',
    123: 'código especial'
};

// Acesse cada propriedade corretamente
let nome = // ?
let data = // ?
let codigo = // ?

console.log(nome);   // 'Maria Silva'
console.log(data);   // '01/01/2000'
console.log(codigo); // 'código especial'
```

**10. Verificando Propriedades**

```javascript
let livro = {
    titulo: 'JavaScript para Iniciantes',
    autor: 'João Silva',
    paginas: 200
};

// Verifique se as propriedades existem
let temTitulo = // ? (use 'in')
let temEditora = // ? (use 'in')
let temPaginas = // ? (use hasOwnProperty)

console.log(temTitulo);  // true
console.log(temEditora); // false
console.log(temPaginas); // true
```

#### **Funções Básicas (11-15)**

**11. Criando Funções Simples**

```javascript
// Crie uma função que recebe dois números e retorna a soma
function somar(a, b) {
  // ?
}

// Crie uma arrow function que faz o mesmo
const somarArrow = // ?
  console.log(somar(5, 3)); // 8
console.log(somarArrow(5, 3)); // 8
```

**12. Funções com Condicionais**

```javascript
// Crie uma função que verifica se um número é par
function ehPar(numero) {
  // retorne true se for par, false se for ímpar
  // ?
}

console.log(ehPar(4)); // true
console.log(ehPar(7)); // false
console.log(ehPar(0)); // true
```

**13. Funções com Arrays**

```javascript
// Crie uma função que recebe um array e retorna o maior número
function maiorNumero(numeros) {
  // ?
}

console.log(maiorNumero([3, 7, 2, 9, 1])); // 9
console.log(maiorNumero([10, 5, 8])); // 10
```

**14. Funções com Objects**

```javascript
// Crie uma função que recebe um objeto pessoa e retorna uma apresentação
function apresentar(pessoa) {
  // retorne: "Olá, meu nome é [nome] e tenho [idade] anos"
  // ?
}

let p1 = { nome: 'Ana', idade: 25 };
let p2 = { nome: 'Carlos', idade: 30 };

console.log(apresentar(p1)); // "Olá, meu nome é Ana e tenho 25 anos"
console.log(apresentar(p2)); // "Olá, meu nome é Carlos e tenho 30 anos"
```

**15. Valores Padrão em Funções**

```javascript
// Crie uma função com parâmetros padrão
function cumprimentar(nome = 'visitante', periodo = 'dia') {
  // retorne: "Bom [periodo], [nome]!"
  // ?
}

console.log(cumprimentar()); // "Bom dia, visitante!"
console.log(cumprimentar('João')); // "Bom dia, João!"
console.log(cumprimentar('Maria', 'tarde')); // "Boa tarde, Maria!"
```

#### **Destructuring Básico (16-20)**

**16. Destructuring de Arrays**

```javascript
let cores = ['vermelho', 'verde', 'azul'];

// Use destructuring para extrair as cores
let [cor1, cor2, cor3] = console.log(cor1); // ? // 'vermelho'
console.log(cor2); // 'verde'
console.log(cor3); // 'azul'

// Extraia apenas a primeira e última cor
let numeros = [10, 20, 30, 40, 50];
let [primeiro, , , , ultimo] = console.log(primeiro); // ? // 10
console.log(ultimo); // 50
```

**17. Destructuring de Objects**

```javascript
let usuario = {
  nome: 'Pedro',
  email: 'pedro@email.com',
  idade: 28,
};

// Use destructuring para extrair as propriedades
let {
  nome,
  email,
  idade,
} = console.log(nome); // ? // 'Pedro'
console.log(email); // 'pedro@email.com'
console.log(idade); // 28
```

**18. Spread com Arrays**

```javascript
let numeros1 = [1, 2, 3];
let numeros2 = [4, 5, 6];

// Use spread para combinar os arrays
let todos = console.log(todos); // ? // [1, 2, 3, 4, 5, 6]

// Use spread para copiar um array
let original = [10, 20, 30];
let copia = // ?
  (copia[0] = 99);
console.log(original); // [10, 20, 30] (não foi modificado)
console.log(copia); // [99, 20, 30]
```

**19. Spread com Objects**

```javascript
let pessoa = { nome: 'Ana', idade: 25 };
let endereco = { cidade: 'São Paulo', pais: 'Brasil' };

// Use spread para combinar os objetos
let completo = console.log(completo); // ?
// {nome: 'Ana', idade: 25, cidade: 'São Paulo', pais: 'Brasil'}

// Use spread para criar uma cópia com modificação
let pessoaAtualizada = console.log(pessoaAtualizada); // ? (mude a idade para 26) // {nome: 'Ana', idade: 26}
```

**20. Rest Parameters**

```javascript
// Crie uma função que soma qualquer quantidade de números
function somarTodos(...numeros) {
  // use rest parameters e retorne a soma
  // ?
}

console.log(somarTodos(1, 2, 3)); // 6
console.log(somarTodos(10, 20, 30, 40)); // 100
console.log(somarTodos(5)); // 5
```

### 🟡 **NÍVEL INTERMEDIÁRIO (20 exercícios)**

#### **Manipulação Avançada de Arrays (21-25)**

**21. Map, Filter e Reduce**

```javascript
let produtos = [
    {nome: 'Notebook', preco: 3000, categoria: 'eletrônicos'},
    {nome: 'Mouse', preco: 50, categoria: 'eletrônicos'},
    {nome: 'Livro', preco: 40, categoria: 'livros'},
    {nome: 'Teclado', preco: 150, categoria: 'eletrônicos'}
];

// Use filter para pegar apenas eletrônicos
let eletronicos = // ?

// Use map para criar array apenas com nomes dos produtos
let nomes = // ?

// Use reduce para calcular o total de todos os produtos
let total = // ?

console.log(eletronicos.length); // 3
console.log(nomes); // ['Notebook', 'Mouse', 'Livro', 'Teclado']
console.log(total); // 3240
```

**22. Métodos de Array Encadeados**

```javascript
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filtre números pares, dobre cada um, e some tudo
let resultado = numeros
  .filter(/* ? */) // apenas pares
  .map(/* ? */) // dobrar
  .reduce(/* ? */); // somar

console.log(resultado); // 60 (2+4+6+8+10 = 30, dobrado = 60)
```

**23. Array de Arrays (Matriz)**

```javascript
let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Acesse o elemento 5 (centro da matriz)
let centro = // ?

// Some todos os elementos da matriz
let soma = 0;
// use loops aninhados
// ?

// Crie um array unidimensional com todos os elementos (flatten)
let flat = // ?

console.log(centro); // 5
console.log(soma);   // 45
console.log(flat);   // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**24. Find e FindIndex**

```javascript
let usuarios = [
    {id: 1, nome: 'Ana', ativo: true},
    {id: 2, nome: 'Bruno', ativo: false},
    {id: 3, nome: 'Carlos', ativo: true},
    {id: 4, nome: 'Diana', ativo: false}
];

// Encontre o primeiro usuário inativo
let inativo = // ?

// Encontre o índice do usuário com id = 3
let indice = // ?

// Verifique se existe algum usuário chamado 'Bruno'
let existeBruno = // ?

// Verifique se todos os usuários estão ativos
let todosAtivos = // ?

console.log(inativo.nome); // 'Bruno'
console.log(indice);       // 2
console.log(existeBruno);  // true
console.log(todosAtivos);  // false
```

**25. Sort Complexo**

```javascript
let pessoas = [
  { nome: 'João', idade: 25 },
  { nome: 'Ana', idade: 30 },
  { nome: 'Pedro', idade: 25 },
  { nome: 'Maria', idade: 28 },
];

// Ordene por idade (crescente) e depois por nome (alfabético)
let ordenadas = pessoas.sort((a, b) => {
  // ?
});

console.log(ordenadas);
// Deve mostrar:
// [{nome: 'João', idade: 25}, {nome: 'Pedro', idade: 25},
//  {nome: 'Maria', idade: 28}, {nome: 'Ana', idade: 30}]
```

#### **Objects e Prototypes (26-30)**

**26. Object.create e Herança**

```javascript
// Crie um sistema de herança sem classes
let animal = {
    tipo: 'desconhecido',
    som() {
        return `O ${this.tipo} faz um som`;
    }
};

// Crie um cachorro que herda de animal
let cachorro = // ?
// Configure tipo como 'cachorro' e sobrescreva som()

// Crie um gato específico que herda de animal
let gato = // ?
// Configure tipo como 'gato'

console.log(cachorro.som()); // "O cachorro faz au au"
console.log(gato.som());     // "O gato faz um som"
```

**27. Object Methods**

```javascript
let obj1 = {a: 1, b: 2, c: 3};
let obj2 = {c: 4, d: 5};

// Use Object.keys() para pegar as chaves
let chaves = // ?

// Use Object.values() para pegar os valores
let valores = // ?

// Use Object.entries() para pegar pares [chave, valor]
let entradas = // ?

// Use Object.assign() para mesclar obj1 e obj2
let mesclado = // ?

console.log(chaves);    // ['a', 'b', 'c']
console.log(valores);   // [1, 2, 3]
console.log(entradas);  // [['a', 1], ['b', 2], ['c', 3]]
console.log(mesclado);  // {a: 1, b: 2, c: 4, d: 5}
```

**28. Getters e Setters**

```javascript
// Crie um objeto com getters e setters
let retangulo = {
  largura: 10,
  altura: 5,

  // Crie um getter para área
  get area() {
    // ?
  },

  // Crie um getter para perímetro
  get perimetro() {
    // ?
  },

  // Crie um setter para dimensões (recebe string "LxA")
  set dimensoes(valor) {
    // ex: "20x10" define largura=20, altura=10
    // ?
  },
};

console.log(retangulo.area); // 50
console.log(retangulo.perimetro); // 30
retangulo.dimensoes = '20x10';
console.log(retangulo.area); // 200
```

**29. Object.defineProperty**

```javascript
let pessoa = { nome: 'João' };

// Adicione uma propriedade 'idade' não enumerável
Object.defineProperty(pessoa, 'idade', {
  // ?
});

// Adicione uma propriedade 'id' somente leitura
Object.defineProperty(pessoa, 'id', {
  // ?
});

pessoa.idade = 25;
console.log(pessoa.idade); // 25
console.log(Object.keys(pessoa)); // ['nome'] (idade não aparece)

pessoa.id = 999; // não deve funcionar
console.log(pessoa.id); // 123
```

**30. Composição de Objects**

```javascript
// Crie mixins para composição
let nadador = {
  nadar() {
    return `${this.nome} está nadando`;
  },
};

let corredor = {
  correr() {
    return `${this.nome} está correndo`;
  },
};

let voador = {
  voar() {
    return `${this.nome} está voando`;
  },
};

// Crie um pato que nada e voa
let pato = {
  nome: 'Donald',
  // adicione os comportamentos necessários
};

// Crie um atleta que nada e corre
let atleta = {
  nome: 'Michael',
  // adicione os comportamentos necessários
};

console.log(pato.nadar()); // "Donald está nadando"
console.log(pato.voar()); // "Donald está voando"
console.log(atleta.nadar()); // "Michael está nadando"
console.log(atleta.correr()); // "Michael está correndo"
```

#### **Funções Avançadas (31-35)**

**31. Closures**

```javascript
// Crie uma função contador com closure
function criarContador(inicial = 0) {
  // retorne um objeto com métodos incrementar, decrementar e valor
  // ?
}

let contador1 = criarContador(10);
let contador2 = criarContador();

console.log(contador1.incrementar()); // 11
console.log(contador1.incrementar()); // 12
console.log(contador2.incrementar()); // 1
console.log(contador1.valor()); // 12
console.log(contador2.valor()); // 1
```

**32. Currying**

```javascript
// Implemente uma função de multiplicação com currying
function multiplicar(a) {
  // retorne uma função que recebe b e retorna a * b
  // ?
}

// Crie multiplicadores específicos
let dobrar = multiplicar(2);
let triplicar = multiplicar(3);

console.log(dobrar(5)); // 10
console.log(triplicar(5)); // 15

// Implemente uma função curry genérica
function curry(fn) {
  // ?
}

function somar3(a, b, c) {
  return a + b + c;
}

let somaCurried = curry(somar3);
console.log(somaCurried(1)(2)(3)); // 6
```

**33. Function Composition**

```javascript
// Crie funções para composição
const adicionar = (x) => (y) => y + x;
const multiplicar = (x) => (y) => y * x;
const elevar = (x) => (y) => Math.pow(y, x);

// Crie uma função compose
function compose(...fns) {
  // ?
}

// Componha as funções: (x + 2) * 3
const formula = compose(adicionar(2), multiplicar(3));

console.log(formula(5)); // 21 ((5 + 2) * 3)

// Crie pipe (composição reversa)
function pipe(...fns) {
  // ?
}
```

**34. Memoização**

```javascript
// Implemente memoização para otimizar funções
function memoize(fn) {
  // ?
}

// Função cara (fibonacci)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

let fibMemo = memoize(fibonacci);

console.time('Primeira vez');
console.log(fibMemo(40)); // demora um pouco
console.timeEnd('Primeira vez');

console.time('Segunda vez');
console.log(fibMemo(40)); // instantâneo (do cache)
console.timeEnd('Segunda vez');
```

**35. Debounce e Throttle**

```javascript
// Implemente debounce
function debounce(fn, delay) {
  // ?
}

// Implemente throttle
function throttle(fn, limit) {
  // ?
}

// Teste (simulação)
let contador = 0;
let incrementar = () => console.log(++contador);

let debouncedIncrement = debounce(incrementar, 1000);
let throttledIncrement = throttle(incrementar, 1000);

// Simule múltiplas chamadas
// debouncedIncrement só executa após 1s sem chamadas
// throttledIncrement executa no máximo 1x por segundo
```

#### **Classes e POO (36-40)**

**36. Classes com Herança**

```javascript
// Crie uma hierarquia de classes
class Veiculo {
  constructor(marca, modelo) {
    // ?
  }

  info() {
    // ?
  }
}

class Carro extends Veiculo {
  constructor(marca, modelo, portas) {
    // ?
  }

  // sobrescreva info()
}

class Moto extends Veiculo {
  constructor(marca, modelo, cilindradas) {
    // ?
  }

  // sobrescreva info()
}

let carro = new Carro('Toyota', 'Corolla', 4);
let moto = new Moto('Honda', 'CB500', 500);

console.log(carro.info());
// "Carro Toyota Corolla com 4 portas"
console.log(moto.info());
// "Moto Honda CB500 de 500cc"
```

**37. Classes com Métodos Estáticos**

```javascript
class Matematica {
  // Crie métodos estáticos para operações matemáticas
  static somar(a, b) {
    // ?
  }

  static media(...numeros) {
    // ?
  }

  static fatorial(n) {
    // ?
  }

  // Crie uma propriedade estática PI
  // ?
}

console.log(Matematica.somar(5, 3)); // 8
console.log(Matematica.media(10, 20, 30)); // 20
console.log(Matematica.fatorial(5)); // 120
console.log(Matematica.PI); // 3.14159...
```

**38. Classes com Propriedades Privadas**

```javascript
class ContaBancaria {
  #saldo = 0;
  #historicoTransacoes = [];

  constructor(titular, saldoInicial = 0) {
    // ?
  }

  depositar(valor) {
    // adicione ao saldo e registre no histórico
    // ?
  }

  sacar(valor) {
    // verifique se há saldo, retire e registre
    // ?
  }

  get saldo() {
    // ?
  }

  get extrato() {
    // retorne o histórico formatado
    // ?
  }
}

let conta = new ContaBancaria('João', 1000);
conta.depositar(500);
conta.sacar(200);
console.log(conta.saldo); // 1300
console.log(conta.extrato);
// console.log(conta.#saldo); // Erro! Propriedade privada
```

**39. Polimorfismo com Classes**

```javascript
// Crie uma interface através de classe abstrata (simulada)
class Forma {
  constructor(nome) {
    if (new.target === Forma) {
      throw new Error('Forma é abstrata');
    }
    this.nome = nome;
  }

  // Métodos que devem ser implementados
  area() {
    throw new Error('area() deve ser implementado');
  }

  perimetro() {
    throw new Error('perimetro() deve ser implementado');
  }

  info() {
    return `${this.nome}: área=${this.area()}, perímetro=${this.perimetro()}`;
  }
}

// Implemente as classes concretas
class Circulo extends Forma {
  constructor(raio) {
    // ?
  }

  area() {
    // ?
  }

  perimetro() {
    // ?
  }
}

class Quadrado extends Forma {
  constructor(lado) {
    // ?
  }

  area() {
    // ?
  }

  perimetro() {
    // ?
  }
}

let formas = [new Circulo(5), new Quadrado(4), new Circulo(3)];

formas.forEach((forma) => console.log(forma.info()));
```

**40. Factory Pattern com Classes**

```javascript
// Implemente um factory pattern
class ProdutoFactory {
  static criarProduto(tipo, dados) {
    switch (tipo) {
      case 'livro':
        return new Livro(dados);
      case 'eletronico':
        return new Eletronico(dados);
      case 'roupa':
        return new Roupa(dados);
      default:
        throw new Error('Tipo desconhecido');
    }
  }
}

class Produto {
  constructor(dados) {
    this.nome = dados.nome;
    this.preco = dados.preco;
  }

  info() {
    return `${this.nome}: R$ ${this.preco}`;
  }
}

class Livro extends Produto {
  constructor(dados) {
    // adicione autor e páginas
    // ?
  }

  info() {
    // sobrescreva para incluir autor
    // ?
  }
}

class Eletronico extends Produto {
  constructor(dados) {
    // adicione garantia
    // ?
  }
}

class Roupa extends Produto {
  constructor(dados) {
    // adicione tamanho e cor
    // ?
  }
}

// Teste
let produtos = [
  ProdutoFactory.criarProduto('livro', {
    nome: 'JavaScript',
    preco: 50,
    autor: 'João',
    paginas: 300,
  }),
  ProdutoFactory.criarProduto('eletronico', {
    nome: 'Notebook',
    preco: 3000,
    garantia: 12,
  }),
];

produtos.forEach((p) => console.log(p.info()));
```

### 🔴 **NÍVEL AVANÇADO (5 exercícios)**

**41. Sistema de EventEmitter Personalizado**

```javascript
// Implemente um sistema completo de eventos
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    // adicione listener ao evento
    // ?
  }

  once(event, listener) {
    // adicione listener que executa apenas uma vez
    // ?
  }

  off(event, listener) {
    // remova listener específico
    // ?
  }

  emit(event, ...args) {
    // dispare todos os listeners do evento
    // ?
  }

  removeAllListeners(event) {
    // remova todos os listeners de um evento
    // ?
  }
}

// Teste
let emitter = new EventEmitter();

emitter.on('data', (data) => console.log('Listener 1:', data));
emitter.on('data', (data) => console.log('Listener 2:', data));
emitter.once('data', (data) => console.log('Once:', data));

emitter.emit('data', { message: 'Hello' }); // todos executam
emitter.emit('data', { message: 'World' }); // once não executa
```

**42. Proxy com Validação e Computed Properties**

```javascript
// Crie um sistema de modelo reativo usando Proxy
function criarModeloReativo(esquema) {
  let dados = {};
  let computadas = {};
  let validators = esquema.validators || {};
  let watchers = new Map();

  // Implemente:
  // 1. Validação ao definir propriedades
  // 2. Propriedades computadas que atualizam automaticamente
  // 3. Sistema de watchers para mudanças

  return new Proxy(dados, {
    get(target, prop) {
      // ?
    },

    set(target, prop, value) {
      // ?
    },
  });
}

// Teste
let usuario = criarModeloReativo({
  validators: {
    idade: (val) => val >= 0 && val <= 150,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  },
  computed: {
    nomeCompleto: {
      get() {
        return `${this.nome} ${this.sobrenome}`;
      },
    },
  },
});

usuario.watch('idade', (novo, antigo) => {
  console.log(`Idade mudou de ${antigo} para ${novo}`);
});

usuario.nome = 'João';
usuario.sobrenome = 'Silva';
usuario.idade = 25; // "Idade mudou de undefined para 25"
console.log(usuario.nomeCompleto); // "João Silva"

// usuario.idade = 200; // Deve lançar erro de validação
```

**43. Sistema de Injeção de Dependências**

```javascript
// Implemente um container de IoC (Inversion of Control)
class DIContainer {
  constructor() {
    this.services = new Map();
    this.singletons = new Map();
  }

  register(name, factory, options = {}) {
    // registre um serviço
    // options: { singleton: true/false, dependencies: [...] }
    // ?
  }

  resolve(name) {
    // resolva um serviço e suas dependências
    // ?
  }

  // Decorator para injeção automática
  static inject(...dependencies) {
    return function (target) {
      // ?
    };
  }
}

// Teste
let container = new DIContainer();

// Registre serviços
container.register(
  'config',
  () => ({
    apiUrl: 'https://api.example.com',
    timeout: 5000,
  }),
  { singleton: true }
);

container.register('http', ['config'], (config) => ({
  get(url) {
    console.log(`GET ${config.apiUrl}${url}`);
    return Promise.resolve({ data: 'mock' });
  },
}));

container.register('userService', ['http'], (http) => ({
  async getUser(id) {
    return await http.get(`/users/${id}`);
  },
}));

// Use
let userService = container.resolve('userService');
userService.getUser(1); // "GET https://api.example.com/users/1"
```

**44. Observable Pattern com Operators**

```javascript
// Implemente um sistema de Observables similar ao RxJS básico
class Observable {
  constructor(producer) {
    this.producer = producer;
  }

  subscribe(observer) {
    // implemente subscription
    // ?
  }

  // Operators
  map(fn) {
    // ?
  }

  filter(predicate) {
    // ?
  }

  reduce(fn, initial) {
    // ?
  }

  take(n) {
    // ?
  }

  static from(iterable) {
    // crie Observable de array/iterable
    // ?
  }

  static interval(ms) {
    // crie Observable que emite a cada ms
    // ?
  }
}

// Teste
Observable.from([1, 2, 3, 4, 5])
  .filter((x) => x % 2 === 0)
  .map((x) => x * 2)
  .subscribe({
    next: (val) => console.log(val),
    complete: () => console.log('Completo!'),
  });
// Deve imprimir: 4, 8, Completo!

Observable.interval(1000)
  .take(3)
  .subscribe({
    next: (val) => console.log(`Tick ${val}`),
    complete: () => console.log('Fim!'),
  });
// Deve imprimir: Tick 0, Tick 1, Tick 2, Fim!
```

**45. Parser de Expressões Matemáticas**

```javascript
// Crie um parser e avaliador de expressões matemáticas
class ExpressionParser {
  constructor() {
    this.variables = new Map();
  }

  // Parse expressão para AST (Abstract Syntax Tree)
  parse(expression) {
    // Suporte: +, -, *, /, ^, (), variáveis, números
    // Exemplo: "2 * (x + 3) ^ 2"
    // ?
  }

  // Avalie AST com valores de variáveis
  evaluate(ast, variables = {}) {
    // ?
  }

  // Método conveniente
  calc(expression, variables = {}) {
    let ast = this.parse(expression);
    return this.evaluate(ast, variables);
  }

  // Derive expressão em relação a uma variável
  derivative(expression, variable) {
    // implemente derivação simbólica básica
    // ?
  }
}

// Teste
let parser = new ExpressionParser();

console.log(parser.calc('2 + 3 * 4')); // 14
console.log(parser.calc('(2 + 3) * 4')); // 20
console.log(parser.calc('x^2 + 2*x + 1', { x: 3 })); // 16
console.log(parser.calc('sin(pi/2) + cos(0)')); // 2

let derivada = parser.derivative('x^2 + 2*x + 1', 'x');
console.log(derivada); // "2*x + 2"
```

### 🏆 **DESAFIOS (5 exercícios)**

**46. Mini Framework Reativo (tipo Vue.js simplificado)**

```javascript
// Crie um mini framework reativo completo
class MiniVue {
  constructor(options) {
    // Implemente:
    // 1. Sistema reativo de dados
    // 2. Computed properties
    // 3. Watchers
    // 4. Methods
    // 5. Lifecycle hooks (created, mounted)
    // 6. Template básico com interpolação {{ }}
    // ?
  }
}

// Uso esperado:
let app = new MiniVue({
  el: '#app',
  data: {
    contador: 0,
    nome: 'Mundo',
  },
  computed: {
    mensagem() {
      return `Olá ${this.nome}! Contador: ${this.contador}`;
    },
  },
  methods: {
    incrementar() {
      this.contador++;
    },
  },
  watch: {
    contador(novo, antigo) {
      console.log(`Contador mudou de ${antigo} para ${novo}`);
    },
  },
  created() {
    console.log('App criado!');
  },
});

// Template HTML:
// <div id="app">
//   <h1>{{ mensagem }}</h1>
//   <button @click="incrementar">+1</button>
// </div>
```

**47. ORM (Object-Relational Mapping) em Memória**

```javascript
// Crie um ORM completo com relacionamentos
class Model {
  static tableName = '';
  static fields = {};
  static relations = {};

  // Implemente:
  // 1. CRUD (create, read, update, delete)
  // 2. Query builder fluente
  // 3. Relacionamentos (hasOne, hasMany, belongsTo, belongsToMany)
  // 4. Validações
  // 5. Hooks (beforeSave, afterSave, etc)
  // 6. Migrations
  // ?
}

// Uso esperado:
class User extends Model {
  static tableName = 'users';
  static fields = {
    id: { type: 'number', primaryKey: true, autoIncrement: true },
    name: { type: 'string', required: true },
    email: { type: 'string', unique: true, validate: 'email' },
    age: { type: 'number', min: 0, max: 150 },
  };

  static relations = {
    posts: { type: 'hasMany', model: 'Post', foreignKey: 'userId' },
    profile: { type: 'hasOne', model: 'Profile', foreignKey: 'userId' },
  };
}

class Post extends Model {
  static tableName = 'posts';
  static fields = {
    id: { type: 'number', primaryKey: true, autoIncrement: true },
    title: { type: 'string', required: true },
    content: { type: 'text' },
    userId: { type: 'number', references: 'users.id' },
  };

  static relations = {
    author: { type: 'belongsTo', model: 'User', foreignKey: 'userId' },
    tags: { type: 'belongsToMany', model: 'Tag', through: 'post_tags' },
  };
}

// Queries esperadas:
let users = await User.where('age', '>', 18)
  .orderBy('name', 'asc')
  .limit(10)
  .include('posts')
  .get();

let user = await User.create({
  name: 'João',
  email: 'joao@email.com',
  age: 25,
});

await user.posts().create({
  title: 'Meu primeiro post',
  content: 'Conteúdo...',
});
```

**48. Motor de Template com Compilação**

```javascript
// Crie um motor de template que compila para funções otimizadas
class TemplateEngine {
  constructor() {
    this.helpers = new Map();
    this.partials = new Map();
    this.cache = new Map();
  }

  // Compile template para função
  compile(template, options = {}) {
    // Suporte:
    // 1. Interpolação: {{ expression }}
    // 2. Condicionais: {{#if condition}} ... {{else}} ... {{/if}}
    // 3. Loops: {{#each array}} ... {{/each}}
    // 4. Helpers: {{ helperName arg1 arg2 }}
    // 5. Partials: {{> partialName }}
    // 6. Escape HTML por padrão, {{{ }}} para raw
    // ?
  }

  registerHelper(name, fn) {
    // ?
  }

  registerPartial(name, template) {
    // ?
  }

  render(template, data, options = {}) {
    // ?
  }
}

// Teste
let engine = new TemplateEngine();

engine.registerHelper('uppercase', (str) => str.toUpperCase());
engine.registerHelper('formatDate', (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
});

engine.registerPartial('header', '<h1>{{ title }}</h1>');

let template = `
{{> header }}
<div class="users">
  {{#if users}}
    <ul>
    {{#each users}}
      <li>
        {{ uppercase name }} - {{ email }}
        {{#if admin}}
          <span class="admin">Admin</span>
        {{/if}}
      </li>
    {{/each}}
    </ul>
  {{else}}
    <p>Nenhum usuário encontrado</p>
  {{/if}}
</div>
<footer>
  Gerado em: {{ formatDate currentDate }}
</footer>
`;

let html = engine.render(template, {
  title: 'Lista de Usuários',
  users: [
    { name: 'João', email: 'joao@email.com', admin: true },
    { name: 'Maria', email: 'maria@email.com', admin: false },
  ],
  currentDate: new Date(),
});
```

**49. State Machine com Visualização**

```javascript
// Crie uma máquina de estados finitos completa
class StateMachine {
  constructor(config) {
    // Implemente:
    // 1. Estados e transições
    // 2. Guards (condições para transições)
    // 3. Actions (executadas em transições)
    // 4. Estados aninhados
    // 5. História de estados
    // 6. Visualização (gerar diagrama)
    // ?
  }

  transition(event, data) {
    // ?
  }

  can(event) {
    // verifica se pode fazer transição
    // ?
  }

  getStateHistory() {
    // ?
  }

  visualize() {
    // gera representação visual (mermaid/graphviz)
    // ?
  }
}

// Exemplo: Máquina de estados para pedido
let orderMachine = new StateMachine({
  initial: 'pending',
  states: {
    pending: {
      on: {
        PAY: {
          target: 'processing',
          guard: (context) => context.payment > 0,
          action: (context) => console.log('Pagamento processado'),
        },
        CANCEL: 'cancelled',
      },
    },
    processing: {
      on: {
        SHIP: 'shipped',
        REFUND: 'refunded',
      },
      entry: () => console.log('Processando pedido'),
      exit: () => console.log('Pedido processado'),
    },
    shipped: {
      on: {
        DELIVER: 'delivered',
        RETURN: 'returned',
      },
    },
    delivered: {
      type: 'final',
    },
    cancelled: {
      type: 'final',
    },
    refunded: {
      type: 'final',
    },
    returned: {
      on: {
        REFUND: 'refunded',
      },
    },
  },
  context: {
    payment: 0,
    items: [],
  },
});

// Uso
console.log(orderMachine.state); // 'pending'
orderMachine.transition('PAY', { payment: 100 }); // 'processing'
console.log(orderMachine.can('SHIP')); // true
console.log(orderMachine.can('DELIVER')); // false

console.log(orderMachine.visualize());
// Gera algo como:
// pending --> processing: PAY
// pending --> cancelled: CANCEL
// processing --> shipped: SHIP
// ...
```

**50. Sistema de Tipos em Runtime**

```javascript
// Crie um sistema completo de tipos com validação em runtime
class TypeSystem {
  constructor() {
    this.types = new Map();
    this.validators = new Map();
  }

  // Defina tipos básicos e compostos
  define(name, definition) {
    // Suporte:
    // 1. Tipos primitivos: string, number, boolean, null, undefined
    // 2. Tipos compostos: object, array, tuple, union, intersection
    // 3. Tipos genéricos: Array<T>, Map<K, V>
    // 4. Tipos literais: 'foo', 42, true
    // 5. Tipos opcionais e nullable
    // 6. Validações customizadas
    // ?
  }

  // Valide valor contra tipo
  validate(value, type) {
    // ?
  }

  // Infira tipo de valor
  infer(value) {
    // ?
  }

  // Type guards
  is(value, type) {
    // ?
  }

  // Crie função tipada
  fn(signature, implementation) {
    // ?
  }
}

// Teste
let ts = new TypeSystem();

// Defina tipos
ts.define('Email', {
  type: 'string',
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
});

ts.define('User', {
  type: 'object',
  properties: {
    id: 'number',
    name: 'string',
    email: 'Email',
    age: { type: 'number', min: 0, max: 150 },
    tags: { type: 'array', items: 'string' },
    role: { type: 'union', types: ['admin', 'user', 'guest'] },
    profile: { type: 'object', optional: true },
  },
});

ts.define('ApiResponse<T>', {
  type: 'generic',
  params: ['T'],
  definition: {
    type: 'object',
    properties: {
      success: 'boolean',
      data: 'T',
      error: { type: 'string', optional: true },
    },
  },
});

// Use tipos
let user = {
  id: 1,
  name: 'João',
  email: 'joao@email.com',
  age: 25,
  tags: ['developer', 'javascript'],
  role: 'admin',
};

console.log(ts.validate(user, 'User')); // { valid: true }

// Função tipada
let createUser = ts.fn(
  { params: ['User'], returns: 'ApiResponse<User>' },
  (userData) => {
    // implementação com garantia de tipos
    return {
      success: true,
      data: userData,
    };
  }
);

let result = createUser(user); // validado automaticamente
```

---

## 📝 **Instruções para os Exercícios**

### Como usar estes exercícios:

1. **Comece pelos básicos**: Não pule níveis! A base sólida é fundamental.

2. **Escreva o código**: Não apenas leia - digite e execute cada exercício.

3. **Teste variações**: Após resolver, tente modificar e criar variações.

4. **Debug ativamente**: Se algo não funcionar, use `console.log()` para entender o fluxo.

5. **Compare soluções**: Após resolver, pesquise outras formas de fazer o mesmo.

### Dicas de Estudo:

- **Básicos**: Foque em entender bem a sintaxe e comportamento
- **Intermediários**: Pratique combinar diferentes conceitos
- **Avançados**: Entenda os padrões e quando usá-los
- **Desafios**: Quebre em partes menores e implemente incrementalmente

### Próximos Passos:

Após completar estes exercícios, você estará preparado para:

- Trabalhar com frameworks modernos (React, Vue, Angular)
- Desenvolver aplicações Node.js
- Contribuir em projetos open source
- Criar suas próprias bibliotecas
