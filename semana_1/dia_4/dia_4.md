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

## 7. Factory Functions

### O que são Factory Functions?

Factory Functions são funções que retornam objetos. Elas são uma alternativa às classes e constructor functions para criar objetos com propriedades e métodos. O nome "factory" (fábrica) vem da analogia com uma fábrica que produz produtos similares.

#### Conceito Básico

```javascript
// Factory Function simples
function criarPessoa(nome, idade) {
  return {
    nome: nome,
    idade: idade,
    falar: function () {
      return `${this.nome} está falando`;
    },
  };
}

// Criando objetos
const pessoa1 = criarPessoa('Ana', 25);
const pessoa2 = criarPessoa('Bruno', 30);

console.log(pessoa1.falar()); // "Ana está falando"
console.log(pessoa2.falar()); // "Bruno está falando"
```

#### Sintaxe ES6 Simplificada

```javascript
// Com destructuring e arrow functions
const criarPessoa = (nome, idade) => ({
  nome,
  idade,
  falar() {
    return `${this.nome} está falando`;
  },
  // Método getter
  get info() {
    return `${this.nome} tem ${this.idade} anos`;
  },
  // Método setter
  set novaIdade(idade) {
    if (idade >= 0) {
      this.idade = idade;
    }
  },
});

const pessoa = criarPessoa('Carlos', 28);
console.log(pessoa.info); // "Carlos tem 28 anos"
pessoa.novaIdade = 29;
console.log(pessoa.info); // "Carlos tem 29 anos"
```

#### Encapsulamento com Closures

Uma das grandes vantagens das factory functions é a capacidade de criar propriedades verdadeiramente privadas:

```javascript
function criarContador(valorInicial = 0) {
  // Variável privada - só acessível dentro desta função
  let count = valorInicial;

  // Retorna objeto com métodos públicos
  return {
    // Método para incrementar
    incrementar() {
      count++;
      return this;
    },

    // Método para decrementar
    decrementar() {
      count--;
      return this;
    },

    // Método para obter valor atual
    obterValor() {
      return count;
    },

    // Método para resetar
    resetar() {
      count = valorInicial;
      return this;
    },

    // Método para adicionar valor específico
    adicionar(valor) {
      count += valor;
      return this;
    },
  };
}

const contador = criarContador(10);
console.log(contador.obterValor()); // 10

contador.incrementar().incrementar().adicionar(5).decrementar();

console.log(contador.obterValor()); // 16

// Tentativa de acessar diretamente a variável privada
console.log(contador.count); // undefined - não é acessível!
```

#### Factory Function Avançada - Sistema de Usuário

```javascript
function criarUsuario(nome, email, configuracoes = {}) {
  // Propriedades privadas
  let _senha = null;
  let _tentativasLogin = 0;
  let _bloqueado = false;
  let _historico = [];

  // Configurações padrão
  const config = {
    maxTentativas: 3,
    timeoutBloqueio: 300000, // 5 minutos
    ...configuracoes,
  };

  // Métodos privados
  const _adicionarAoHistorico = (acao) => {
    _historico.push({
      acao,
      timestamp: new Date(),
      usuario: nome,
    });
  };

  const _validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const _criptografarSenha = (senha) => {
    // Simulação de criptografia (use uma biblioteca real em produção)
    return senha.split('').reverse().join('') + '_encrypted';
  };

  // Validação inicial
  if (!_validarEmail(email)) {
    throw new Error('Email inválido');
  }

  // Objeto público retornado
  return {
    // Propriedades públicas
    nome,
    email,
    criadoEm: new Date(),

    // Métodos públicos
    definirSenha(novaSenha) {
      if (novaSenha.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      _senha = _criptografarSenha(novaSenha);
      _adicionarAoHistorico('senha_definida');
      return this;
    },

    login(senhaFornecida) {
      if (_bloqueado) {
        throw new Error('Usuário bloqueado. Tente novamente mais tarde.');
      }

      const senhaEncriptada = _criptografarSenha(senhaFornecida);

      if (senhaEncriptada === _senha) {
        _tentativasLogin = 0;
        _adicionarAoHistorico('login_sucesso');
        return { sucesso: true, mensagem: 'Login realizado com sucesso' };
      } else {
        _tentativasLogin++;
        _adicionarAoHistorico('login_falha');

        if (_tentativasLogin >= config.maxTentativas) {
          _bloqueado = true;
          setTimeout(() => {
            _bloqueado = false;
            _tentativasLogin = 0;
          }, config.timeoutBloqueio);

          throw new Error(
            'Muitas tentativas. Usuário bloqueado temporariamente.'
          );
        }

        return {
          sucesso: false,
          mensagem: `Senha incorreta. ${
            config.maxTentativas - _tentativasLogin
          } tentativas restantes.`,
        };
      }
    },

    obterEstatisticas() {
      return {
        totalAcoes: _historico.length,
        tentativasLogin: _tentativasLogin,
        bloqueado: _bloqueado,
        temSenha: _senha !== null,
      };
    },

    obterHistorico() {
      // Retorna cópia do histórico para evitar modificações
      return [..._historico];
    },

    atualizarEmail(novoEmail) {
      if (!_validarEmail(novoEmail)) {
        throw new Error('Email inválido');
      }

      this.email = novoEmail;
      _adicionarAoHistorico('email_atualizado');
      return this;
    },

    // Método para serialização (útil para salvar em banco de dados)
    toJSON() {
      return {
        nome: this.nome,
        email: this.email,
        criadoEm: this.criadoEm,
        estatisticas: this.obterEstatisticas(),
      };
    },
  };
}

// Exemplo de uso
const usuario = criarUsuario('João Silva', 'joao@email.com');
usuario.definirSenha('minhasenha123');

console.log(usuario.login('senhaerrada'));
// { sucesso: false, mensagem: "Senha incorreta. 2 tentativas restantes." }

console.log(usuario.login('minhasenha123'));
// { sucesso: true, mensagem: "Login realizado com sucesso" }

console.log(usuario.obterEstatisticas());
// { totalAcoes: 3, tentativasLogin: 0, bloqueado: false, temSenha: true }
```

#### Padrão Mixin com Factory Functions

```javascript
// Mixins - funcionalidades que podem ser reutilizadas
const podeVoar = {
  voar() {
    return `${this.nome} está voando!`;
  },
  pousar() {
    return `${this.nome} pousou.`;
  },
};

const podeNadar = {
  nadar() {
    return `${this.nome} está nadando!`;
  },
  mergulhar() {
    return `${this.nome} mergulhou fundo!`;
  },
};

const podeCaminhar = {
  caminhar() {
    return `${this.nome} está caminhando.`;
  },
  correr() {
    return `${this.nome} está correndo!`;
  },
};

// Factory function que aceita mixins
function criarAnimal(nome, tipo, ...habilidades) {
  const animal = {
    nome,
    tipo,
    energia: 100,

    status() {
      return `${this.nome} (${this.tipo}) - Energia: ${this.energia}%`;
    },

    descansar() {
      this.energia = Math.min(100, this.energia + 20);
      return `${this.nome} descansou. ${this.status()}`;
    },
  };

  // Aplicar mixins
  habilidades.forEach((habilidade) => {
    Object.assign(animal, habilidade);
  });

  return animal;
}

// Criando diferentes tipos de animais
const passaro = criarAnimal('Pardal', 'Pássaro', podeVoar, podeCaminhar);
const peixe = criarAnimal('Nemo', 'Peixe', podeNadar);
const pato = criarAnimal('Donald', 'Pato', podeVoar, podeNadar, podeCaminhar);

console.log(passaro.voar()); // "Pardal está voando!"
console.log(peixe.nadar()); // "Nemo está nadando!"
console.log(pato.voar()); // "Donald está voando!"
console.log(pato.nadar()); // "Donald está nadando!"
console.log(pato.caminhar()); // "Donald está caminhando."
```

---

## 8. Constructor Functions

### O que são Constructor Functions?

Constructor Functions são funções especiais que são chamadas com a palavra-chave `new` para criar e inicializar objetos. Elas são o precursor das classes ES6 e ainda são amplamente utilizadas.

#### Conceito Básico

```javascript
// Constructor function - convenção: primeira letra maiúscula
function Pessoa(nome, idade) {
  // 'this' refere-se ao novo objeto sendo criado
  this.nome = nome;
  this.idade = idade;

  // Método definido diretamente no objeto (não recomendado)
  this.falar = function () {
    return `${this.nome} está falando`;
  };
}

// Criando objetos com 'new'
const pessoa1 = new Pessoa('Ana', 25);
const pessoa2 = new Pessoa('Bruno', 30);

console.log(pessoa1.falar()); // "Ana está falando"
console.log(pessoa2.falar()); // "Bruno está falando"

// Verificando o tipo
console.log(pessoa1 instanceof Pessoa); // true
console.log(pessoa1.constructor === Pessoa); // true
```

#### Prototype - Compartilhando Métodos

```javascript
function Pessoa(nome, idade) {
  this.nome = nome;
  this.idade = idade;
}

// Adicionando métodos ao prototype (recomendado)
Pessoa.prototype.falar = function () {
  return `${this.nome} está falando`;
};

Pessoa.prototype.envelhecer = function () {
  this.idade++;
  return `${this.nome} agora tem ${this.idade} anos`;
};

Pessoa.prototype.cumprimentar = function (outraPessoa) {
  return `${this.nome} cumprimentou ${outraPessoa.nome}`;
};

// Propriedades no prototype (compartilhadas por todas as instâncias)
Pessoa.prototype.especie = 'Homo sapiens';

const ana = new Pessoa('Ana', 25);
const bruno = new Pessoa('Bruno', 30);

console.log(ana.falar()); // "Ana está falando"
console.log(bruno.envelhecer()); // "Bruno agora tem 31 anos"
console.log(ana.cumprimentar(bruno)); // "Ana cumprimentou Bruno"
console.log(ana.especie); // "Homo sapiens"

// Verificando se o método existe no prototype
console.log(ana.hasOwnProperty('nome')); // true (propriedade própria)
console.log(ana.hasOwnProperty('falar')); // false (método do prototype)
```

#### Constructor Function Avançada - Sistema de Conta Bancária

```javascript
function ContaBancaria(titular, numeroAgencia, numeroConta, saldoInicial = 0) {
  // Validações
  if (!titular || typeof titular !== 'string') {
    throw new Error('Titular é obrigatório e deve ser uma string');
  }

  if (!numeroAgencia || !numeroConta) {
    throw new Error('Número da agência e conta são obrigatórios');
  }

  // Propriedades da instância
  this.titular = titular;
  this.numeroAgencia = numeroAgencia;
  this.numeroConta = numeroConta;
  this.saldo = saldoInicial;
  this.criadaEm = new Date();
  this.ativa = true;
  this.historico = [];

  // Adicionar transação inicial
  if (saldoInicial > 0) {
    this.historico.push({
      tipo: 'deposito_inicial',
      valor: saldoInicial,
      timestamp: new Date(),
      saldoAnterior: 0,
      saldoAtual: saldoInicial,
    });
  }
}

// Métodos no prototype
ContaBancaria.prototype.depositar = function (valor) {
  if (!this.ativa) {
    throw new Error('Conta inativa');
  }

  if (valor <= 0) {
    throw new Error('Valor deve ser positivo');
  }

  const saldoAnterior = this.saldo;
  this.saldo += valor;

  this.historico.push({
    tipo: 'deposito',
    valor: valor,
    timestamp: new Date(),
    saldoAnterior: saldoAnterior,
    saldoAtual: this.saldo,
  });

  return {
    sucesso: true,
    mensagem: `Depósito de R$ ${valor.toFixed(2)} realizado com sucesso`,
    saldoAtual: this.saldo,
  };
};

ContaBancaria.prototype.sacar = function (valor) {
  if (!this.ativa) {
    throw new Error('Conta inativa');
  }

  if (valor <= 0) {
    throw new Error('Valor deve ser positivo');
  }

  if (valor > this.saldo) {
    return {
      sucesso: false,
      mensagem: 'Saldo insuficiente',
      saldoAtual: this.saldo,
    };
  }

  const saldoAnterior = this.saldo;
  this.saldo -= valor;

  this.historico.push({
    tipo: 'saque',
    valor: valor,
    timestamp: new Date(),
    saldoAnterior: saldoAnterior,
    saldoAtual: this.saldo,
  });

  return {
    sucesso: true,
    mensagem: `Saque de R$ ${valor.toFixed(2)} realizado com sucesso`,
    saldoAtual: this.saldo,
  };
};

ContaBancaria.prototype.transferir = function (valor, contaDestino) {
  if (!(contaDestino instanceof ContaBancaria)) {
    throw new Error('Conta destino inválida');
  }

  const resultadoSaque = this.sacar(valor);

  if (resultadoSaque.sucesso) {
    contaDestino.depositar(valor);

    // Atualizar histórico para indicar transferência
    this.historico[this.historico.length - 1].tipo = 'transferencia_enviada';
    this.historico[this.historico.length - 1].contaDestino = {
      titular: contaDestino.titular,
      agencia: contaDestino.numeroAgencia,
      conta: contaDestino.numeroConta,
    };

    contaDestino.historico[contaDestino.historico.length - 1].tipo =
      'transferencia_recebida';
    contaDestino.historico[contaDestino.historico.length - 1].contaOrigem = {
      titular: this.titular,
      agencia: this.numeroAgencia,
      conta: this.numeroConta,
    };

    return {
      sucesso: true,
      mensagem: `Transferência de R$ ${valor.toFixed(2)} para ${
        contaDestino.titular
      } realizada com sucesso`,
    };
  }

  return resultadoSaque;
};

ContaBancaria.prototype.obterExtrato = function (limite = 10) {
  const historico = this.historico
    .slice(-limite)
    .reverse()
    .map((transacao) => ({
      ...transacao,
      valor: `R$ ${transacao.valor.toFixed(2)}`,
      data: transacao.timestamp.toLocaleDateString('pt-BR'),
      hora: transacao.timestamp.toLocaleTimeString('pt-BR'),
    }));

  return {
    titular: this.titular,
    agencia: this.numeroAgencia,
    conta: this.numeroConta,
    saldoAtual: `R$ ${this.saldo.toFixed(2)}`,
    historico: historico,
  };
};

ContaBancaria.prototype.fecharConta = function () {
  if (this.saldo > 0) {
    throw new Error('Não é possível fechar conta com saldo positivo');
  }

  this.ativa = false;
  this.historico.push({
    tipo: 'conta_fechada',
    timestamp: new Date(),
    saldoAnterior: this.saldo,
    saldoAtual: 0,
  });

  return 'Conta fechada com sucesso';
};

// Método estático (definido na função, não no prototype)
ContaBancaria.validarConta = function (agencia, conta) {
  return agencia.length === 4 && conta.length >= 5;
};

// Exemplo de uso
const conta1 = new ContaBancaria('Maria Silva', '1234', '12345-6', 1000);
const conta2 = new ContaBancaria('João Santos', '1234', '54321-0');

console.log(conta1.depositar(500));
console.log(conta1.sacar(200));
console.log(conta1.transferir(300, conta2));

console.log(conta1.obterExtrato());
console.log(conta2.obterExtrato());

// Usando método estático
console.log(ContaBancaria.validarConta('1234', '12345-6')); // true
```

#### Herança com Constructor Functions

```javascript
// Constructor function base
function Veiculo(marca, modelo, ano) {
  this.marca = marca;
  this.modelo = modelo;
  this.ano = ano;
  this.velocidade = 0;
  this.ligado = false;
}

Veiculo.prototype.ligar = function () {
  this.ligado = true;
  return `${this.marca} ${this.modelo} foi ligado`;
};

Veiculo.prototype.desligar = function () {
  this.ligado = false;
  this.velocidade = 0;
  return `${this.marca} ${this.modelo} foi desligado`;
};

Veiculo.prototype.acelerar = function (incremento) {
  if (!this.ligado) {
    return 'Ligue o veículo primeiro';
  }

  this.velocidade += incremento;
  return `Velocidade atual: ${this.velocidade} km/h`;
};

// Constructor function derivada
function Carro(marca, modelo, ano, portas) {
  // Chama o constructor pai
  Veiculo.call(this, marca, modelo, ano);
  this.portas = portas;
  this.tipo = 'carro';
}

// Configurar herança do prototype
Carro.prototype = Object.create(Veiculo.prototype);
Carro.prototype.constructor = Carro;

// Métodos específicos do carro
Carro.prototype.abrirPorta = function () {
  return `Porta do ${this.marca} ${this.modelo} aberta`;
};

Carro.prototype.acelerar = function (incremento) {
  // Sobrescrever método pai com validação específica
  if (!this.ligado) {
    return 'Ligue o carro primeiro';
  }

  if (this.velocidade + incremento > 200) {
    return 'Velocidade máxima atingida (200 km/h)';
  }

  // Chamar método pai
  return Veiculo.prototype.acelerar.call(this, incremento);
};

// Constructor function para moto
function Moto(marca, modelo, ano, cilindradas) {
  Veiculo.call(this, marca, modelo, ano);
  this.cilindradas = cilindradas;
  this.tipo = 'moto';
}

Moto.prototype = Object.create(Veiculo.prototype);
Moto.prototype.constructor = Moto;

Moto.prototype.empinar = function () {
  if (!this.ligado) {
    return 'Ligue a moto primeiro';
  }
  return `${this.marca} ${this.modelo} empinou!`;
};

// Exemplo de uso
const carro = new Carro('Toyota', 'Corolla', 2022, 4);
const moto = new Moto('Honda', 'CB600', 2021, 600);

console.log(carro.ligar()); // "Toyota Corolla foi ligado"
console.log(carro.acelerar(50)); // "Velocidade atual: 50 km/h"
console.log(carro.abrirPorta()); // "Porta do Toyota Corolla aberta"

console.log(moto.ligar()); // "Honda CB600 foi ligado"
console.log(moto.empinar()); // "Honda CB600 empinou!"

// Verificando herança
console.log(carro instanceof Carro); // true
console.log(carro instanceof Veiculo); // true
console.log(moto instanceof Moto); // true
console.log(moto instanceof Veiculo); // true
```

---

## 9. Generator Functions

### O que são Generator Functions?

Generator Functions são funções especiais que podem pausar e retomar sua execução. Elas retornam um objeto Generator que implementa o protocolo Iterator, permitindo produzir uma sequência de valores sob demanda.

#### Sintaxe Básica

```javascript
// Generator function - note o asterisco (*)
function* meuGerador() {
  console.log('Início do generator');
  yield 1;
  console.log('Após o primeiro yield');
  yield 2;
  console.log('Após o segundo yield');
  yield 3;
  console.log('Final do generator');
  return 'Terminado';
}

// Criando um generator
const gen = meuGerador();

// Executando passo a passo
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 'Terminado', done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

#### Generator com Parâmetros

```javascript
function* gerarSequencia(inicio, fim, passo = 1) {
  console.log(`Gerando sequência de ${inicio} até ${fim} com passo ${passo}`);

  for (let i = inicio; i <= fim; i += passo) {
    const resultado = yield i;

    // O valor retornado por next() pode ser capturado
    if (resultado) {
      console.log(`Recebido: ${resultado}`);
    }
  }

  return 'Sequência finalizada';
}

const seq = gerarSequencia(1, 10, 2);

console.log(seq.next()); // { value: 1, done: false }
console.log(seq.next('primeiro')); // { value: 3, done: false }
console.log(seq.next('segundo')); // { value: 5, done: false }
console.log(seq.next()); // { value: 7, done: false }
console.log(seq.next()); // { value: 9, done: false }
console.log(seq.next()); // { value: 'Sequência finalizada', done: true }
```

#### Generator Infinito

```javascript
function* fibonacci() {
  let a = 0,
    b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();

// Obtendo os primeiros 10 números de Fibonacci
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

// Generator para números pares infinitos
function* numerosPares() {
  let num = 0;
  while (true) {
    yield num;
    num += 2;
  }
}

// Usando com for...of (cuidado com loops infinitos!)
const pares = numerosPares();
let contador = 0;

for (const par of pares) {
  if (contador >= 5) break; // Importante: definir condição de parada
  console.log(par);
  contador++;
}
// 0, 2, 4, 6, 8
```

#### Generator para Processamento de Dados

```javascript
function* processarDados(dados) {
  console.log('Iniciando processamento...');

  for (const item of dados) {
    console.log(`Processando: ${item}`);

    // Simular processamento pesado
    const processado = item.toUpperCase().split('').reverse().join('');

    // Pausar após cada processamento
    yield {
      original: item,
      processado: processado,
      timestamp: new Date(),
    };
  }

  console.log('Processamento concluído');
  return 'Todos os dados foram processados';
}

const dados = ['hello', 'world', 'javascript', 'generator'];
const processador = processarDados(dados);

// Processamento sob demanda
console.log('=== Processamento Passo a Passo ===');
let resultado = processador.next();

while (!resultado.done) {
  console.log('Resultado:', resultado.value);

  // Simular pausa entre processamentos
  // Em um cenário real, poderia haver input do usuário ou outras operações

  resultado = processador.next();
}

console.log('Final:', resultado.value);
```

#### Generator Avançado - Sistema de Tarefas

```javascript
function* gerenciadorTarefas() {
  const tarefas = [];
  let proximoId = 1;

  console.log('Gerenciador de tarefas iniciado');

  while (true) {
    // Aguarda comando
    const comando = yield {
      totalTarefas: tarefas.length,
      tarefasPendentes: tarefas.filter((t) => !t.concluida).length,
      tarefasConcluidas: tarefas.filter((t) => t.concluida).length,
    };

    if (!comando) continue;

    switch (comando.acao) {
      case 'adicionar':
        const novaTarefa = {
          id: proximoId++,
          titulo: comando.titulo,
          descricao: comando.descricao || '',
          criadaEm: new Date(),
          concluida: false,
          prioridade: comando.prioridade || 'normal',
        };
        tarefas.push(novaTarefa);
        console.log(`Tarefa adicionada: ${novaTarefa.titulo}`);
        break;

      case 'concluir':
        const tarefa = tarefas.find((t) => t.id === comando.id);
        if (tarefa) {
          tarefa.concluida = true;
          tarefa.concluidaEm = new Date();
          console.log(`Tarefa concluída: ${tarefa.titulo}`);
        }
        break;

      case 'listar':
        const filtro = comando.filtro || 'todas';
        let tarefasFiltradas;

        switch (filtro) {
          case 'pendentes':
            tarefasFiltradas = tarefas.filter((t) => !t.concluida);
            break;
          case 'concluidas':
            tarefasFiltradas = tarefas.filter((t) => t.concluida);
            break;
          default:
            tarefasFiltradas = tarefas;
        }

        yield {
          acao: 'listagem',
          tarefas: tarefasFiltradas,
          total: tarefasFiltradas.length,
        };
        continue; // Não avançar o loop principal

      case 'remover':
        const indice = tarefas.findIndex((t) => t.id === comando.id);
        if (indice !== -1) {
          const removida = tarefas.splice(indice, 1)[0];
          console.log(`Tarefa removida: ${removida.titulo}`);
        }
        break;

      case 'sair':
        console.log('Encerrando gerenciador de tarefas');
        return {
          totalTarefasProcessadas: tarefas.length,
          tarefasFinais: tarefas,
        };
    }
  }
}

// Exemplo de uso do gerenciador
const gerenciador = gerenciadorTarefas();

// Inicializar
console.log('Status inicial:', gerenciador.next().value);

// Adicionar tarefas
gerenciador.next({
  acao: 'adicionar',
  titulo: 'Estudar JavaScript',
  prioridade: 'alta',
});
gerenciador.next({
  acao: 'adicionar',
  titulo: 'Fazer exercícios',
  prioridade: 'normal',
});
gerenciador.next({
  acao: 'adicionar',
  titulo: 'Revisar código',
  prioridade: 'baixa',
});

// Listar tarefas
const listagem = gerenciador.next({ acao: 'listar' });
console.log('Tarefas:', listagem.value);

// Concluir uma tarefa
gerenciador.next({ acao: 'concluir', id: 1 });

// Verificar status
console.log('Status após conclusão:', gerenciador.next().value);

// Encerrar
const resultado = gerenciador.next({ acao: 'sair' });
console.log('Resultado final:', resultado.value);
```

#### Generator com Delegação (yield\*)

```javascript
function* gerarNumeros() {
  yield 1;
  yield 2;
  yield 3;
}

function* gerarLetras() {
  yield 'a';
  yield 'b';
  yield 'c';
}

function* gerarMisto() {
  console.log('Iniciando números...');
  yield* gerarNumeros(); // Delega para outro generator

  console.log('Iniciando letras...');
  yield* gerarLetras(); // Delega para outro generator

  console.log('Adicionando valores próprios...');
  yield 'final';
}

const misto = gerarMisto();

// Itera por todos os valores de todos os generators
for (const valor of misto) {
  console.log(valor);
}
// 1, 2, 3, a, b, c, final

// Exemplo mais complexo com processamento de árvore
function* percorrerArvore(no) {
  yield no.valor;

  if (no.filhos) {
    for (const filho of no.filhos) {
      yield* percorrerArvore(filho); // Recursão com delegação
    }
  }
}

const arvore = {
  valor: 'raiz',
  filhos: [
    {
      valor: 'galho1',
      filhos: [{ valor: 'folha1' }, { valor: 'folha2' }],
    },
    {
      valor: 'galho2',
      filhos: [{ valor: 'folha3' }],
    },
  ],
};

console.log('Percorrendo árvore:');
for (const valor of percorrerArvore(arvore)) {
  console.log(valor);
}
// raiz, galho1, folha1, folha2, galho2, folha3
```

#### Generator para Controle de Fluxo Assíncrono

```javascript
function* fluxoAssincrono() {
  console.log('Iniciando fluxo assíncrono');

  try {
    // Simular chamada de API
    const usuario = yield fetch('/api/usuario/1');
    console.log('Usuário carregado:', usuario);

    // Simular outra chamada baseada no resultado anterior
    const perfil = yield fetch(`/api/perfil/${usuario.id}`);
    console.log('Perfil carregado:', perfil);

    // Processamento final
    const configuracoes = yield fetch(`/api/configuracoes/${perfil.configId}`);
    console.log('Configurações carregadas:', configuracoes);

    return {
      usuario,
      perfil,
      configuracoes,
    };
  } catch (erro) {
    console.error('Erro no fluxo:', erro);
    throw erro;
  }
}

// Função para executar generator com promises
async function executarFluxo(generator) {
  const gen = generator();
  let resultado = gen.next();

  while (!resultado.done) {
    try {
      // Aguardar promise retornada pelo yield
      const valor = await resultado.value;
      resultado = gen.next(valor);
    } catch (erro) {
      // Enviar erro para o generator
      resultado = gen.throw(erro);
    }
  }

  return resultado.value;
}

// Simulação de uso (comentado para não fazer chamadas reais)
/*
executarFluxo(fluxoAssincrono)
  .then(dadosCompletos => {
    console.log('Fluxo concluído:', dadosCompletos);
  })
  .catch(erro => {
    console.error('Fluxo falhou:', erro);
  });
*/
```

#### Generator como Iterator Personalizado

```javascript
function* criarIteradorPersonalizado(colecao, filtro, transformacao) {
  for (const item of colecao) {
    // Aplicar filtro se fornecido
    if (filtro && !filtro(item)) {
      continue;
    }

    // Aplicar transformação se fornecida
    const itemProcessado = transformacao ? transformacao(item) : item;

    yield itemProcessado;
  }
}

// Dados de exemplo
const produtos = [
  { nome: 'Notebook', preco: 2500, categoria: 'eletrônicos' },
  { nome: 'Mouse', preco: 50, categoria: 'eletrônicos' },
  { nome: 'Livro', preco: 30, categoria: 'educação' },
  { nome: 'Cadeira', preco: 400, categoria: 'móveis' },
  { nome: 'Teclado', preco: 150, categoria: 'eletrônicos' },
];

// Criar iterator para produtos eletrônicos caros, formatados
const eletronicosCaros = criarIteradorPersonalizado(
  produtos,
  (produto) => produto.categoria === 'eletrônicos' && produto.preco > 100,
  (produto) => ({
    ...produto,
    precoFormatado: `R$ ${produto.preco.toFixed(2)}`,
    descricao: `${produto.nome} - ${produto.precoFormatado}`,
  })
);

console.log('Eletrônicos caros:');
for (const produto of eletronicosCaros) {
  console.log(produto.descricao);
}
// Notebook - R$ 2500.00
// Teclado - R$ 150.00

// Generator para paginação
function* paginar(dados, tamanhoPagina) {
  for (let i = 0; i < dados.length; i += tamanhoPagina) {
    yield {
      pagina: Math.floor(i / tamanhoPagina) + 1,
      dados: dados.slice(i, i + tamanhoPagina),
      total: dados.length,
      temProxima: i + tamanhoPagina < dados.length,
    };
  }
}

const paginador = paginar(produtos, 2);

console.log('\nPaginação:');
for (const pagina of paginador) {
  console.log(
    `Página ${pagina.pagina}:`,
    pagina.dados.map((p) => p.nome)
  );
  console.log(`Tem próxima: ${pagina.temProxima}\n`);
}
```

## 10. Comparação entre Factory, Constructor e Generator Functions

| Aspecto            | Factory Functions      | Constructor Functions | Generator Functions |
| ------------------ | ---------------------- | --------------------- | ------------------- |
| **Sintaxe**        | `function criar()`     | `function Criar()`    | `function* gerar()` |
| **Uso**            | `criar()`              | `new Criar()`         | `gerar().next()`    |
| **Retorno**        | Objeto literal         | `this` (novo objeto)  | Generator object    |
| **Herança**        | Mixins/composição      | Prototype chain       | Não aplicável       |
| **Encapsulamento** | Closure (privado real) | Convenção (\_private) | Controle de estado  |
| **Performance**    | Boa                    | Melhor (prototype)    | Específica (lazy)   |
| **Caso de uso**    | Objetos únicos         | Múltiplas instâncias  | Sequências/iteração |
