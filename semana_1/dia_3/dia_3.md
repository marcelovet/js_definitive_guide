# Funções em JavaScript

## 1. Definindo Funções

Em JavaScript, existem várias formas de definir funções:

```javascript
// 1. Function Declaration (Declaração de Função)
function somar(a, b) {
  return a + b;
}

// 2. Function Expression (Expressão de Função)
const multiplicar = function (a, b) {
  return a * b;
};

// 3. Arrow Function (Função de Seta) - ES6+
const dividir = (a, b) => {
  return a / b;
};

// 4. Arrow Function com retorno implícito
const subtrair = (a, b) => a - b;

// Exemplos de uso
console.log(somar(5, 3)); // 8
console.log(multiplicar(4, 2)); // 8
console.log(dividir(10, 2)); // 5
console.log(subtrair(10, 3)); // 7
```

### Hoisting (Elevação) de Funções

Um conceito importante que precisamos entender é o **hoisting** das declarações de função:

```javascript
// Podemos chamar a função antes de declará-la!
console.log(quadrado(5)); // 25

// A declaração de função é "elevada" para o topo
function quadrado(x) {
  return x * x;
}

// Mas isso NÃO funciona com function expressions
// console.log(cubo(3)); // ❌ Erro! Cannot access 'cubo' before initialization

const cubo = function (x) {
  return x * x * x;
};

// Nem com arrow functions
// console.log(dobrar(4)); // ❌ Erro!

const dobrar = (x) => x * 2;
```

### Parâmetros vs Argumentos - Flexibilidade do JavaScript

JavaScript é muito flexível com argumentos de função:

```javascript
// Função espera 2 parâmetros
function saudar(nome, sobrenome) {
  console.log(`Olá, ${nome} ${sobrenome}!`);
}

// Podemos chamar com mais argumentos (extras são ignorados)
saudar('João', 'Silva', 'extra', 123); // "Olá, João Silva!"

// Ou com menos (faltantes viram undefined)
saudar('Maria'); // "Olá, Maria undefined!"

// Acessando TODOS os argumentos com 'arguments'
function mostrarTodosArgumentos() {
  console.log('Função recebeu ' + arguments.length + ' argumentos:');

  // arguments é "array-like" mas não é um Array real
  for (let i = 0; i < arguments.length; i++) {
    console.log(`  Argumento ${i}: ${arguments[i]}`);
  }

  // Converter para array real
  const arrayReal = Array.from(arguments);
  console.log('Como array:', arrayReal);
}

mostrarTodosArgumentos('a', 'b', 'c', 1, 2, 3);
```

## 2. Bindings e Escopos

**Binding** é a associação entre um nome (variável) e um valor. **Escopo** define onde essas variáveis podem ser acessadas.

```javascript
// Escopo Global
let global = 'Sou global';

function demonstrarEscopo() {
  // Escopo da Função
  let local = 'Sou local';

  if (true) {
    // Escopo de Bloco (let e const)
    let bloco = 'Sou do bloco';
    var funcao = 'Sou da função (var ignora bloco)';

    console.log(global); // ✓ Acessa global
    console.log(local); // ✓ Acessa local
    console.log(bloco); // ✓ Acessa bloco
  }

  console.log(global); // ✓ Acessa global
  console.log(local); // ✓ Acessa local
  console.log(funcao); // ✓ Acessa var (escopo de função)
  // console.log(bloco); // ❌ Erro! Fora do escopo de bloco
}

demonstrarEscopo();
// console.log(local); // ❌ Erro! Fora do escopo da função
```

## 3. Nested Scope (Escopo Aninhado)

Funções internas têm acesso às variáveis das funções externas:

```javascript
function externa(x) {
  console.log(`Externa recebeu: ${x}`);

  function media(y) {
    console.log(`Media pode acessar x: ${x}`);

    function interna(z) {
      // Acessa variáveis de todos os escopos acima
      console.log(`Interna acessa x: ${x}, y: ${y}, z: ${z}`);
      return (x + y + z) / 3;
    }

    return interna;
  }

  return media;
}

// Exemplo de uso
const funcaoMedia = externa(10);
const funcaoInterna = funcaoMedia(20);
const resultado = funcaoInterna(30);
console.log(`Média: ${resultado}`); // 20
```

## 4. Call Stack (Pilha de Chamadas)

A call stack é como JavaScript rastreia onde está na execução do código:

```javascript
function primeira() {
  console.log('Início da primeira');
  segunda();
  console.log('Fim da primeira');
}

function segunda() {
  console.log('Início da segunda');
  terceira();
  console.log('Fim da segunda');
}

function terceira() {
  console.log('Executando terceira');
  // Vamos ver a stack trace
  console.trace('Stack atual:');
}

primeira();

/* Saída:
Início da primeira
Início da segunda
Executando terceira
Stack atual:
    terceira
    segunda
    primeira
Fim da segunda
Fim da primeira
*/
```

## 5. Argumentos Opcionais

JavaScript permite argumentos opcionais com valores padrão:

```javascript
// Antes do ES6 - usando operador OR
function cumprimentar(nome, saudacao) {
  nome = nome || 'Visitante';
  saudacao = saudacao || 'Olá';
  return `${saudacao}, ${nome}!`;
}

// ES6+ - Parâmetros padrão
function cumprimentarModerno(nome = 'Visitante', saudacao = 'Olá') {
  return `${saudacao}, ${nome}!`;
}

// Objeto arguments (não disponível em arrow functions)
function listarArgumentos() {
  console.log('Número de argumentos:', arguments.length);
  for (let i = 0; i < arguments.length; i++) {
    console.log(`Argumento ${i}:`, arguments[i]);
  }
}

// Rest parameters (ES6+)
function somarTodos(...numeros) {
  return numeros.reduce((total, num) => total + num, 0);
}

// Exemplos
console.log(cumprimentar()); // "Olá, Visitante!"
console.log(cumprimentar('João')); // "Olá, João!"
console.log(cumprimentar('Maria', 'Bom dia')); // "Bom dia, Maria!"

listarArgumentos('a', 'b', 'c', 123);
console.log(somarTodos(1, 2, 3, 4, 5)); // 15
```

## 6. Closure (Fechamento)

Closure é quando uma função "lembra" das variáveis do escopo onde foi criada:

```javascript
// Exemplo 1: Contador privado
function criarContador() {
  let contador = 0; // Variável privada

  return {
    incrementar: function () {
      contador++;
      return contador;
    },
    decrementar: function () {
      contador--;
      return contador;
    },
    valor: function () {
      return contador;
    },
  };
}

const meuContador = criarContador();
console.log(meuContador.incrementar()); // 1
console.log(meuContador.incrementar()); // 2
console.log(meuContador.decrementar()); // 1
console.log(meuContador.valor()); // 1

// Exemplo 2: Factory de funções
function multiplicadorPor(fator) {
  // 'fator' fica no closure
  return function (numero) {
    return numero * fator;
  };
}

const duplicar = multiplicadorPor(2);
const triplicar = multiplicadorPor(3);

console.log(duplicar(5)); // 10
console.log(triplicar(5)); // 15
```

### O que são Closures?

Um closure é criado quando uma função "lembra" das variáveis do escopo léxico onde foi definida, mesmo após esse escopo ter terminado sua execução. É como se a função carregasse uma "mochila" com as variáveis que precisa.

```javascript
// Anatomia de um Closure
function criarClosure() {
  // Variáveis no escopo externo
  let variavelExterna = 'Eu sou do escopo externo';
  let contador = 0;

  // Função interna tem acesso às variáveis externas
  function funcaoInterna() {
    contador++;
    console.log(variavelExterna);
    console.log(`Chamada número: ${contador}`);
  }

  // Retornamos a função interna
  return funcaoInterna;
}

// minhaFuncao é um closure
const minhaFuncao = criarClosure();
minhaFuncao(); // "Eu sou do escopo externo", "Chamada número: 1"
minhaFuncao(); // "Eu sou do escopo externo", "Chamada número: 2"

// Cada closure mantém seu próprio escopo
const outraFuncao = criarClosure();
outraFuncao(); // "Eu sou do escopo externo", "Chamada número: 1"
```

### Casos de Uso Práticos de Closures

### 1. Encapsulamento e Dados Privados

```javascript
// Módulo com estado privado
function criarBanco() {
  // Variáveis privadas - não acessíveis externamente
  let saldo = 0;
  let historicoTransacoes = [];
  let senha = '1234';

  // Função privada
  function registrarTransacao(tipo, valor) {
    historicoTransacoes.push({
      tipo,
      valor,
      data: new Date(),
      saldoApos: saldo,
    });
  }

  // API pública
  return {
    depositar: function (valor) {
      if (valor > 0) {
        saldo += valor;
        registrarTransacao('depósito', valor);
        return true;
      }
      return false;
    },

    sacar: function (valor, senhaInformada) {
      if (senhaInformada !== senha) {
        console.log('Senha incorreta!');
        return false;
      }
      if (valor > 0 && valor <= saldo) {
        saldo -= valor;
        registrarTransacao('saque', valor);
        return true;
      }
      return false;
    },

    consultarSaldo: function () {
      return saldo;
    },

    obterExtrato: function () {
      // Retorna cópia para proteger o array original
      return [...historicoTransacoes];
    },

    alterarSenha: function (senhaAtual, novaSenha) {
      if (senhaAtual === senha) {
        senha = novaSenha;
        return true;
      }
      return false;
    },
  };
}

// Uso
const minhaConta = criarBanco();
minhaConta.depositar(1000);
minhaConta.sacar(200, '1234');
console.log(minhaConta.consultarSaldo()); // 800
console.log(minhaConta.obterExtrato());
// Não há como acessar 'saldo' ou 'senha' diretamente!
```

### 2. Factory Functions com Configuração

```javascript
// Criador de funções de validação personalizadas
function criarValidador(config) {
  // Configuração fica no closure
  const {
    minLength = 0,
    maxLength = Infinity,
    pattern = null,
    customMessage = 'Valor inválido',
  } = config;

  // Retorna função validadora
  return function validar(valor) {
    const erros = [];

    if (valor.length < minLength) {
      erros.push(`Mínimo ${minLength} caracteres`);
    }

    if (valor.length > maxLength) {
      erros.push(`Máximo ${maxLength} caracteres`);
    }

    if (pattern && !pattern.test(valor)) {
      erros.push(customMessage);
    }

    return {
      valido: erros.length === 0,
      erros,
      valor,
    };
  };
}

// Diferentes validadores usando closures
const validarEmail = criarValidador({
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  customMessage: 'Email inválido',
});

const validarSenha = criarValidador({
  minLength: 8,
  maxLength: 20,
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  customMessage: 'Senha deve ter maiúsculas, minúsculas e números',
});

// Teste
console.log(validarEmail('teste@email.com'));
console.log(validarSenha('Senha123'));
```

### 3. Event Handlers com Estado

```javascript
// Criador de botões com contador individual
function criarBotaoContador(nome) {
  let cliques = 0;

  return {
    elemento: null,

    criar: function () {
      const botao = document.createElement('button');
      botao.textContent = `${nome}: ${cliques} cliques`;

      // Event handler usa closure para acessar 'cliques'
      botao.addEventListener('click', () => {
        cliques++;
        botao.textContent = `${nome}: ${cliques} cliques`;
        console.log(`${nome} foi clicado ${cliques} vezes`);
      });

      this.elemento = botao;
      return botao;
    },

    resetar: function () {
      cliques = 0;
      if (this.elemento) {
        this.elemento.textContent = `${nome}: ${cliques} cliques`;
      }
    },

    obterCliques: function () {
      return cliques;
    },
  };
}

// Cada botão mantém seu próprio contador
const botao1 = criarBotaoContador('Botão A');
const botao2 = criarBotaoContador('Botão B');
```

### 4. Memoização (Cache de Resultados)

```javascript
// Função que cria uma versão memoizada de qualquer função
function memoizar(funcao) {
  const cache = new Map();

  return function (...args) {
    // Cria chave única para os argumentos
    const chave = JSON.stringify(args);

    // Verifica se já está no cache
    if (cache.has(chave)) {
      console.log(`Retornando do cache para: ${chave}`);
      return cache.get(chave);
    }

    // Calcula o resultado
    console.log(`Calculando para: ${chave}`);
    const resultado = funcao.apply(this, args);

    // Armazena no cache
    cache.set(chave, resultado);

    return resultado;
  };
}

// Função pesada que vamos otimizar
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Versão memoizada
const fibonacciMemo = memoizar(fibonacci);

console.time('Primeira vez');
console.log(fibonacciMemo(40)); // Demora um pouco
console.timeEnd('Primeira vez');

console.time('Segunda vez');
console.log(fibonacciMemo(40)); // Instantâneo!
console.timeEnd('Segunda vez');
```

## 7. Recursão

Recursão é quando uma função chama a si mesma:

```javascript
// Exemplo 1: Fatorial
function fatorial(n) {
  // Caso base: condição de parada
  if (n <= 1) return 1;

  // Caso recursivo
  return n * fatorial(n - 1);
}

// Exemplo 2: Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Exemplo 3: Percorrer estrutura aninhada
function contarPropriedades(obj) {
  let count = 0;

  for (let key in obj) {
    count++;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursão para objetos aninhados
      count += contarPropriedades(obj[key]);
    }
  }

  return count;
}

// Testes
console.log(fatorial(5)); // 120
console.log(fibonacci(7)); // 13

const objeto = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};
console.log(contarPropriedades(objeto)); // 5
```

### O que é Recursão?

Recursão é uma técnica onde uma função chama a si mesma para resolver problemas que podem ser divididos em subproblemas menores e similares.

### Anatomia de uma Função Recursiva

```javascript
function funcaoRecursiva(parametro) {
  // 1. CASO BASE (condição de parada)
  if (condicaoDeParada) {
    return valorBase;
  }

  // 2. CASO RECURSIVO (reduz o problema)
  return algumaOperacao + funcaoRecursiva(parametroModificado);
}
```

### Exemplos Clássicos Detalhados

### 1. Análise Passo a Passo do Fatorial

```javascript
function fatorial(n) {
  console.log(`Calculando fatorial de ${n}`);

  // Caso base
  if (n <= 1) {
    console.log(`Caso base atingido: ${n}! = 1`);
    return 1;
  }

  // Caso recursivo
  console.log(`${n}! = ${n} * ${n - 1}!`);
  const resultado = n * fatorial(n - 1);
  console.log(`${n}! = ${resultado}`);

  return resultado;
}

// Visualizando a execução
console.log('Resultado final:', fatorial(5));

/* Saída:
Calculando fatorial de 5
5! = 5 * 4!
Calculando fatorial de 4
4! = 4 * 3!
Calculando fatorial de 3
3! = 3 * 2!
Calculando fatorial de 2
2! = 2 * 1!
Calculando fatorial de 1
Caso base atingido: 1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
Resultado final: 120
*/
```

### 2. Percorrendo Estruturas de Árvore

```javascript
// Estrutura de árvore de arquivos
const sistemaArquivos = {
  nome: 'root',
  tipo: 'pasta',
  conteudo: [
    {
      nome: 'documentos',
      tipo: 'pasta',
      conteudo: [
        { nome: 'relatorio.pdf', tipo: 'arquivo', tamanho: 1024 },
        { nome: 'planilha.xlsx', tipo: 'arquivo', tamanho: 2048 },
        {
          nome: 'projetos',
          tipo: 'pasta',
          conteudo: [
            { nome: 'projeto1.doc', tipo: 'arquivo', tamanho: 512 },
            { nome: 'projeto2.doc', tipo: 'arquivo', tamanho: 768 },
          ],
        },
      ],
    },
    {
      nome: 'imagens',
      tipo: 'pasta',
      conteudo: [
        { nome: 'foto1.jpg', tipo: 'arquivo', tamanho: 4096 },
        { nome: 'foto2.jpg', tipo: 'arquivo', tamanho: 3072 },
      ],
    },
  ],
};

// Função recursiva para calcular tamanho total
function calcularTamanhoTotal(item) {
  // Caso base: arquivo
  if (item.tipo === 'arquivo') {
    return item.tamanho;
  }

  // Caso recursivo: pasta
  let tamanhoTotal = 0;
  for (const subitem of item.conteudo) {
    tamanhoTotal += calcularTamanhoTotal(subitem);
  }

  return tamanhoTotal;
}

// Função recursiva para encontrar arquivos
function encontrarArquivos(item, extensao, caminho = '') {
  const caminhoAtual = caminho ? `${caminho}/${item.nome}` : item.nome;
  let arquivosEncontrados = [];

  if (item.tipo === 'arquivo') {
    if (item.nome.endsWith(extensao)) {
      arquivosEncontrados.push({
        nome: item.nome,
        caminho: caminhoAtual,
        tamanho: item.tamanho,
      });
    }
  } else {
    // Recursão para subpastas
    for (const subitem of item.conteudo) {
      const subArquivos = encontrarArquivos(subitem, extensao, caminhoAtual);
      arquivosEncontrados = [...arquivosEncontrados, ...subArquivos];
    }
  }

  return arquivosEncontrados;
}

// Testes
console.log('Tamanho total:', calcularTamanhoTotal(sistemaArquivos));
console.log('Arquivos .doc:', encontrarArquivos(sistemaArquivos, '.doc'));
```

### 3. Algoritmos de Busca e Ordenação

```javascript
// Quick Sort recursivo
function quickSort(array) {
  // Caso base
  if (array.length <= 1) {
    return array;
  }

  // Escolher pivô (elemento do meio)
  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array[pivotIndex];

  // Particionar array
  const menores = [];
  const maiores = [];

  for (let i = 0; i < array.length; i++) {
    if (i === pivotIndex) continue;

    if (array[i] < pivot) {
      menores.push(array[i]);
    } else {
      maiores.push(array[i]);
    }
  }

  // Recursão: ordenar subarrays e combinar
  return [...quickSort(menores), pivot, ...quickSort(maiores)];
}

// Busca binária recursiva
function buscaBinaria(array, alvo, inicio = 0, fim = array.length - 1) {
  // Caso base: não encontrado
  if (inicio > fim) {
    return -1;
  }

  // Calcular meio
  const meio = Math.floor((inicio + fim) / 2);

  // Caso base: encontrado
  if (array[meio] === alvo) {
    return meio;
  }

  // Recursão: buscar na metade apropriada
  if (array[meio] > alvo) {
    return buscaBinaria(array, alvo, inicio, meio - 1);
  } else {
    return buscaBinaria(array, alvo, meio + 1, fim);
  }
}

// Testes
const numeros = [64, 34, 25, 12, 22, 11, 90];
console.log('Array original:', numeros);
console.log('Array ordenado:', quickSort(numeros));

const ordenado = [11, 12, 22, 25, 34, 64, 90];
console.log('Busca por 25:', buscaBinaria(ordenado, 25)); // 3
console.log('Busca por 100:', buscaBinaria(ordenado, 100)); // -1
```

### 4. Problemas Complexos com Recursão

```javascript
// Torre de Hanói
function torreDeHanoi(n, origem, destino, auxiliar) {
  if (n === 1) {
    console.log(`Mover disco 1 de ${origem} para ${destino}`);
    return;
  }

  // Mover n-1 discos de origem para auxiliar
  torreDeHanoi(n - 1, origem, auxiliar, destino);

  // Mover disco maior de origem para destino
  console.log(`Mover disco ${n} de ${origem} para ${destino}`);

  // Mover n-1 discos de auxiliar para destino
  torreDeHanoi(n - 1, auxiliar, destino, origem);
}

// Gerador de permutações
function permutacoes(array) {
  // Caso base
  if (array.length <= 1) {
    return [array];
  }

  const resultado = [];

  for (let i = 0; i < array.length; i++) {
    const elemento = array[i];
    const resto = [...array.slice(0, i), ...array.slice(i + 1)];

    // Recursão: permutações do resto
    const permutacoesResto = permutacoes(resto);

    // Adicionar elemento atual ao início de cada permutação
    for (const perm of permutacoesResto) {
      resultado.push([elemento, ...perm]);
    }
  }

  return resultado;
}

// Testes
console.log('\nTorre de Hanói com 3 discos:');
torreDeHanoi(3, 'A', 'C', 'B');

console.log('\nPermutações de [1, 2, 3]:');
console.log(permutacoes([1, 2, 3]));
```

### Otimização de Recursão

### 1. Memoização para Recursão

```javascript
// Fibonacci otimizado com memoização
function fibonacciMemoizado() {
  const cache = {};

  function fib(n) {
    if (n in cache) {
      return cache[n];
    }

    if (n <= 1) {
      cache[n] = n;
    } else {
      cache[n] = fib(n - 1) + fib(n - 2);
    }

    return cache[n];
  }

  return fib;
}

const fibMemo = fibonacciMemoizado();
console.time('Fibonacci 40');
console.log(fibMemo(40));
console.timeEnd('Fibonacci 40');
```

### 2. Tail Call Optimization (TCO)

```javascript
// Fatorial com tail recursion
function fatorialTCO(n, acumulador = 1) {
  if (n <= 1) {
    return acumulador;
  }

  // Chamada recursiva é a última operação
  return fatorialTCO(n - 1, n * acumulador);
}

// Fibonacci com tail recursion
function fibonacciTCO(n, a = 0, b = 1) {
  if (n === 0) return a;
  if (n === 1) return b;

  return fibonacciTCO(n - 1, b, a + b);
}
```

### Quando Usar Closures vs Recursão

### Use Closures quando:

- Precisar manter estado privado
- Criar funções especializadas
- Implementar padrões como Module, Factory
- Trabalhar com callbacks e eventos

### Use Recursão quando:

- O problema tem estrutura recursiva natural
- Trabalhar com árvores ou grafos
- Implementar algoritmos divide-and-conquer
- Resolver problemas matemáticos recursivos

### Exercício Combinando Closures e Recursão

```javascript
// Sistema de undo/redo com closure e recursão
function criarEditorComHistorico() {
  let estados = [];
  let indiceAtual = -1;

  // Closure para manter histórico privado
  return {
    executar: function (acao) {
      // Remove estados futuros se houver
      estados = estados.slice(0, indiceAtual + 1);

      // Adiciona nova ação
      estados.push(acao);
      indiceAtual++;

      console.log(`Executando: ${acao.descricao}`);
      acao.executar();
    },

    desfazer: function () {
      if (indiceAtual >= 0) {
        const acao = estados[indiceAtual];
        console.log(`Desfazendo: ${acao.descricao}`);
        acao.desfazer();
        indiceAtual--;
      }
    },

    refazer: function () {
      if (indiceAtual < estados.length - 1) {
        indiceAtual++;
        const acao = estados[indiceAtual];
        console.log(`Refazendo: ${acao.descricao}`);
        acao.executar();
      }
    },

    // Função recursiva para mostrar histórico em árvore
    mostrarHistorico: function (indice = 0, nivel = 0) {
      if (indice >= estados.length) return;

      const prefixo = '  '.repeat(nivel);
      const marcador = indice === indiceAtual ? '→' : ' ';
      console.log(`${prefixo}${marcador} ${estados[indice].descricao}`);

      // Recursão para próximo item
      this.mostrarHistorico(indice + 1, nivel);
    },
  };
}

// Teste
const editor = criarEditorComHistorico();

editor.executar({
  descricao: 'Adicionar título',
  executar: () => console.log('+ Título adicionado'),
  desfazer: () => console.log('- Título removido'),
});

editor.executar({
  descricao: 'Adicionar parágrafo',
  executar: () => console.log('+ Parágrafo adicionado'),
  desfazer: () => console.log('- Parágrafo removido'),
});

console.log('\nHistórico:');
editor.mostrarHistorico();

editor.desfazer();
console.log('\nHistórico após desfazer:');
editor.mostrarHistorico();
```

Agora você tem uma compreensão profunda de Closures e Recursão! Estes conceitos são fundamentais para escrever código JavaScript elegante e poderoso.

## 8. Binding Léxico de `this`

O `this` em JavaScript pode ser confuso. Arrow functions têm binding léxico (herdam o `this` do contexto):

```javascript
// Problema com function regular
const pessoa1 = {
  nome: 'João',
  hobbies: ['ler', 'correr', 'cozinhar'],

  listarHobbies: function () {
    // this aqui é 'pessoa1'
    console.log(`${this.nome} gosta de:`);

    this.hobbies.forEach(function (hobby) {
      // this aqui é undefined (ou window no browser)
      console.log(`${this.nome} gosta de ${hobby}`); // Erro!
    });
  },
};

// Solução 1: Guardar referência
const pessoa2 = {
  nome: 'Maria',
  hobbies: ['ler', 'correr', 'cozinhar'],

  listarHobbies: function () {
    const self = this; // Guardamos a referência

    this.hobbies.forEach(function (hobby) {
      console.log(`${self.nome} gosta de ${hobby}`);
    });
  },
};

// Solução 2: Arrow function (binding léxico)
const pessoa3 = {
  nome: 'Pedro',
  hobbies: ['ler', 'correr', 'cozinhar'],

  listarHobbies: function () {
    // Arrow function herda o this do contexto
    this.hobbies.forEach((hobby) => {
      console.log(`${this.nome} gosta de ${hobby}`);
    });
  },
};

// Comparação: this em diferentes contextos
const exemploThis = {
  nome: 'Exemplo',

  metodoRegular: function () {
    console.log('Regular:', this.nome); // "Exemplo"

    setTimeout(function () {
      console.log('Regular timeout:', this.nome); // undefined
    }, 100);
  },

  metodoArrow: function () {
    console.log('Com arrow:', this.nome); // "Exemplo"

    setTimeout(() => {
      console.log('Arrow timeout:', this.nome); // "Exemplo"
    }, 100);
  },
};
```

## 9. Retorno Implícito

Arrow functions permitem retorno implícito quando têm apenas uma expressão:

```javascript
// Com return explícito
const quadrado1 = (x) => {
  return x * x;
};

// Com retorno implícito
const quadrado2 = (x) => x * x;

// Retornando objeto (precisa de parênteses)
const criarPessoa = (nome, idade) => ({
  nome: nome,
  idade: idade,
  maiorIdade: idade >= 18,
});

// Arrays e métodos funcionais
const numeros = [1, 2, 3, 4, 5];

// Todos usam retorno implícito
const dobrados = numeros.map((n) => n * 2);
const pares = numeros.filter((n) => n % 2 === 0);
const soma = numeros.reduce((acc, n) => acc + n, 0);

console.log(dobrados); // [2, 4, 6, 8, 10]
console.log(pares); // [2, 4]
console.log(soma); // 15

// Exemplo mais complexo
const pessoas = [
  { nome: 'Ana', idade: 25 },
  { nome: 'Bruno', idade: 30 },
  { nome: 'Carlos', idade: 20 },
];

// Encadeamento com retorno implícito
const nomesMaiores25 = pessoas
  .filter((p) => p.idade > 25)
  .map((p) => p.nome)
  .sort((a, b) => a.localeCompare(b));

console.log(nomesMaiores25); // ["Bruno"]
```
