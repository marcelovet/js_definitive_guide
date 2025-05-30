# Estrutura de programa, controle de fluxo e convenções

## 🏗️ 1. Estrutura do Programa

### **Expressões vs Declarações (Statements)**

```javascript
// EXPRESSÕES - produzem um valor
2 + 2; // expressão aritmética → 4
'Olá ' + 'mundo'; // expressão de concatenação → "Olá mundo"
idade >= 18; // expressão lógica → true/false
usuario.nome; // expressão de acesso → valor da propriedade

// DECLARAÇÕES (STATEMENTS) - realizam uma ação
let nome = 'João'; // declaração de variável
console.log('Mensagem'); // declaração de chamada de função
if (true) {
  /* código */
} // declaração condicional

// Expressões podem fazer parte de declarações
let resultado = 2 + 2; // 2 + 2 é expressão, let resultado = ... é declaração
console.log(idade >= 18); // idade >= 18 é expressão dentro da declaração

// Um programa é uma lista de declarações executadas sequencialmente
let x = 10; // declaração 1
let y = x * 2; // declaração 2 (usa resultado da declaração 1)
console.log(y); // declaração 3 (usa resultado da declaração 2)
```

### **Bindings (Variáveis) - Aprofundando**

```javascript
// Declaração simples
let idade = 25;
idade = 26; // reatribuição permitida

// Múltiplas declarações na mesma linha
let x = 1,
  y = 2,
  z = 3;

// Declaração sem inicialização
let nome;
console.log(nome); // undefined

// const deve ser inicializada na declaração
const PI = 3.14159;
// const VAZIO; // ❌ SyntaxError: Missing initializer

// const com objetos/arrays (conteúdo pode mudar)
const pessoa = { nome: 'Ana' };
pessoa.nome = 'Carlos'; // ✅ permitido
pessoa.idade = 30; // ✅ permitido
// pessoa = {};          // ❌ erro - não pode reatribuir

const numeros = [1, 2, 3];
numeros.push(4); // ✅ permitido
numeros[0] = 0; // ✅ permitido
// numeros = [];         // ❌ erro - não pode reatribuir
```

### **Funções - Chamadas e Métodos**

```javascript
// Funções built-in (nativas)
console.log('Mensagem'); // exibe no console
alert('Alerta'); // mostra popup (browser)
prompt('Digite algo:'); // solicita entrada (browser)

// Math - objeto com métodos matemáticos
Math.max(2, 4, 6, 8); // retorna 6
Math.min(2, 4, 6, 8); // retorna 2
Math.random(); // número aleatório 0-1
Math.floor(4.7); // 4 (arredonda para baixo)
Math.ceil(4.2); // 5 (arredonda para cima)
Math.round(4.5); // 5 (arredonda para mais próximo)

// Number - conversões
Number('123'); // 123 (string para número)
Number('123.45'); // 123.45
Number('abc'); // NaN (conversão inválida)

// String - conversões
String(123); // "123" (número para string)
String(true); // "true"
String(null); // "null"

// Funções retornam valores
let maximo = Math.max(10, 20, 30); // maximo = 30
let texto = String(42); // texto = "42"
```

## 🔄 2. Controle de Fluxo

### **Execução Condicional - if/else**

```javascript
// if simples
let temperatura = 30;
if (temperatura > 25) {
  console.log('Está quente!');
}

// if/else
let idade = 17;
if (idade >= 18) {
  console.log('Maior de idade');
} else {
  console.log('Menor de idade');
}

// if/else if/else (múltiplas condições)
let nota = 85;
if (nota >= 90) {
  console.log('Conceito A');
} else if (nota >= 80) {
  console.log('Conceito B');
} else if (nota >= 70) {
  console.log('Conceito C');
} else if (nota >= 60) {
  console.log('Conceito D');
} else {
  console.log('Conceito F');
}

// Condições complexas
let dia = 'sábado';
let hora = 14;
if ((dia === 'sábado' || dia === 'domingo') && hora >= 10) {
  console.log('Fim de semana e hora adequada para passeio');
}

// Blocos podem ter uma única instrução sem chaves (não recomendado)
if (true) console.log('Funciona, mas evite');

// Sempre use chaves para clareza
if (true) {
  console.log('Melhor assim');
}
```

### **Loops - while e do-while**

```javascript
// Loop while - pode não executar nenhuma vez
let contador = 0;
while (contador < 5) {
  console.log(`Contagem: ${contador}`);
  contador++;
}
// Saída: 0, 1, 2, 3, 4

// Loop while que não executa
let x = 10;
while (x < 5) {
  console.log('Não será executado');
  x++;
}

// Loop do-while - executa pelo menos uma vez
let nome;
do {
  nome = prompt("Qual seu nome? (digite 'sair' para terminar)");
  if (nome && nome !== 'sair') {
    console.log(`Olá, ${nome}!`);
  }
} while (!nome || nome === '');

// Exemplo prático: validação de entrada
let numero;
do {
  numero = Number(prompt('Digite um número entre 1 e 10:'));
} while (numero < 1 || numero > 10 || isNaN(numero));
console.log(`Você digitou: ${numero}`);
```

### **Loop for - Mais Conciso**

```javascript
// for básico
for (let i = 0; i < 10; i++) {
  console.log(i);
}
// Equivale a:
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}

// for com diferentes incrementos
for (let i = 0; i < 20; i += 2) {
  console.log(i); // números pares: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18
}

// for regressivo
for (let i = 10; i >= 0; i--) {
  console.log(i); // contagem regressiva: 10, 9, 8, ..., 1, 0
}

// for com múltiplas variáveis
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(`i: ${i}, j: ${j}`);
}

// for infinito (cuidado!)
for (;;) {
  // loop infinito - sempre use break para sair
  let input = prompt("Digite 'sair' para terminar:");
  if (input === 'sair') break;
  console.log(`Você digitou: ${input}`);
}

// for aninhados - tabuada
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}
```

### **Controle de Loop - break e continue**

```javascript
// break - sai completamente do loop
console.log('Procurando primeiro múltiplo de 7 depois de 20:');
for (let i = 20; ; i++) {
  if (i % 7 === 0) {
    console.log(i); // 21
    break; // sai do loop
  }
}

// continue - pula para próxima iteração
console.log('Números ímpares de 0 a 10:');
for (let i = 0; i <= 10; i++) {
  if (i % 2 === 0) continue; // pula números pares
  console.log(i); // 1, 3, 5, 7, 9
}

// Labels - para loops aninhados
console.log('Procurando par (i,j) onde i*j = 12:');
externo: for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    if (i * j === 12) {
      console.log(`Encontrado: ${i} x ${j} = 12`);
      break externo; // sai dos dois loops
    }
  }
}

// continue com label
console.log('Pulando linhas que contêm 5:');
externo: for (let i = 1; i <= 3; i++) {
  console.log(`Linha ${i}:`);
  for (let j = 1; j <= 5; j++) {
    if (j === 5) continue externo; // pula para próxima linha
    console.log(`  ${j}`);
  }
}
```

### **Switch - Múltiplas Condições**

```javascript
// switch básico
let diaDaSemana = 3;
switch (diaDaSemana) {
  case 1:
    console.log('Segunda-feira');
    break;
  case 2:
    console.log('Terça-feira');
    break;
  case 3:
    console.log('Quarta-feira');
    break;
  case 4:
    console.log('Quinta-feira');
    break;
  case 5:
    console.log('Sexta-feira');
    break;
  case 6:
    console.log('Sábado');
    break;
  case 7:
    console.log('Domingo');
    break;
  default:
    console.log('Dia inválido');
}

// switch com agrupamento de casos
let mes = 2;
switch (mes) {
  case 12:
  case 1:
  case 2:
    console.log('Verão');
    break;
  case 3:
  case 4:
  case 5:
    console.log('Outono');
    break;
  case 6:
  case 7:
  case 8:
    console.log('Inverno');
    break;
  case 9:
  case 10:
  case 11:
    console.log('Primavera');
    break;
  default:
    console.log('Mês inválido');
}

// switch sem break (fall-through) - raramente usado
let opcao = 'a';
switch (opcao) {
  case 'a':
    console.log('Executando A');
  // sem break - continua para B
  case 'b':
    console.log('Executando B');
    break;
  case 'c':
    console.log('Executando C');
    break;
}
// Se opcao = 'a', imprime "Executando A" E "Executando B"

// switch com expressões
let operacao = '+';
let a = 5,
  b = 3;
switch (operacao) {
  case '+':
    console.log(a + b); // 8
    break;
  case '-':
    console.log(a - b);
    break;
  case '*':
    console.log(a * b);
    break;
  case '/':
    console.log(b !== 0 ? a / b : 'Divisão por zero');
    break;
  default:
    console.log('Operação inválida');
}
```

## 📝 3. Convenções e Boas Práticas

### **Nomes de Variáveis e Funções**

```javascript
// camelCase - convenção padrão para JavaScript
let nomeCompleto = 'João Silva';
let idadeUsuario = 25;
let isAtivo = true;

// PascalCase - para construtores e classes
function ContaBancaria(saldo) {
  this.saldo = saldo;
}

// UPPER_SNAKE_CASE - para constantes
const MAX_TENTATIVAS = 3;
const API_URL = 'https://api.exemplo.com';
const CORES = {
  VERMELHO: '#ff0000',
  VERDE: '#00ff00',
  AZUL: '#0000ff',
};

// Nomes descritivos
// ❌ Ruim
let d = new Date();
let u = users.filter((x) => x.active);

// ✅ Bom
let dataAtual = new Date();
let usuariosAtivos = users.filter((usuario) => usuario.ativo);

// Verbos para funções, substantivos para variáveis
// ✅ Bom
function calcularIdade(dataNascimento) {
  // implementação
}

let idadeCalculada = calcularIdade(dataNascimento);

// Booleanos com prefixos is, has, can, should
let isLogado = true;
let hasPermissao = false;
let canEdit = true;
let shouldUpdate = false;
```

### **Indentação e Formatação**

```javascript
// Use 2 ou 4 espaços consistentemente (nunca misture)
// Exemplo com 2 espaços:
if (condicao) {
  if (outraCondicao) {
    console.log('Bem indentado');
  }
}

// Exemplo com 4 espaços:
if (condicao) {
  if (outraCondicao) {
    console.log('Também bem indentado');
  }
}

// Chaves na mesma linha (JavaScript Style)
// ✅ Recomendado
if (true) {
  console.log('Padrão JavaScript');
}

// ❌ Menos comum em JavaScript
if (true) {
  console.log('Estilo C/C#');
}

// Espaços em operadores
// ✅ Bom
let resultado = a + b * c;
let condicao = x > 5 && y < 10;

// ❌ Ruim
let resultado = a + b * c;
let condicao = x > 5 && y < 10;

// Arrays e objetos com múltiplas linhas
// ✅ Bom
const usuario = {
  nome: 'João',
  idade: 30,
  email: 'joao@email.com',
};

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Função com múltiplos parâmetros
function criarUsuario(nome, email, idade, endereco) {
  // implementação
}
```

### **Comentários Eficazes**

```javascript
// Comentário de uma linha para explicações rápidas
let contador = 0; // Conta quantos usuários processamos

/*
   Comentário de múltiplas linhas
   para explicações mais longas
   ou documentação de funções
*/

/**
 * Calcula a idade baseada na data de nascimento
 * @param {Date} dataNascimento - Data de nascimento do usuário
 * @returns {number} Idade em anos
 */
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const diferenca = hoje - dataNascimento;
  return Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
}

// TODO: implementar validação de email
// FIXME: bug quando usuário não tem nome
// HACK: solução temporária até refatorar
// NOTE: importante manter sincronizado com API

// ❌ Comentários desnecessários
let nome = 'João'; // define nome como João
contador++; // incrementa contador

// ✅ Comentários úteis
let nome = 'João'; // Nome padrão para usuários anônimos
contador++; // Incrementa apenas para operações válidas

// Comentários explicando "por que", não "o que"
// ❌ Ruim
if (idade >= 18) {
  // se idade maior ou igual a 18
  // permitir acesso
}

// ✅ Bom
if (idade >= 18) {
  // Lei brasileira exige maioridade para cadastro
  // permitir acesso
}
```

### **Ponto e Vírgula (Semicolon)**

```javascript
// JavaScript tem ASI (Automatic Semicolon Insertion)
// Mas é boa prática ser explícito

// ✅ Recomendado - sempre use ponto e vírgula
let nome = 'João';
let idade = 30;
console.log('Olá');

// ❌ Funciona mas pode causar problemas
let nome = 'João';
let idade = 30;
console.log('Olá');

// Casos onde ASI pode falhar:
// ❌ Problema potencial
let a = 1;
let b = ((2)[(a, b)] = [b, a]); // ASI não funciona aqui!

// ✅ Solução
let a = 1;
let b = 2;
[a, b] = [b, a];

// ❌ Outro problema
function getValue() {
  return;
  42; // ASI adiciona ; após return, retorna undefined!
}

// ✅ Solução
function getValue() {
  return 42; // ou return (42);
}
```

## 🏋️ 4. Exercícios Práticos

### Exercício 1: Escopo e Hoisting

```javascript
// O que será impresso? Por quê?
console.log(a); // undefined (var é içada mas não inicializada)
var a = 1;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 2;

if (true) {
  var c = 3; // escopo de função (vaza do bloco)
  let d = 4; // escopo de bloco
  const e = 5; // escopo de bloco
}

console.log(c); // 3 (var vaza do bloco if)
console.log(d); // ReferenceError: d is not defined
console.log(e); // ReferenceError: e is not defined
```

### Exercício 2: Template Literals

```javascript
// Reescreva usando template literals
const usuario = {
  nome: 'Ana',
  idade: 28,
  cidade: 'São Paulo',
};

// Versão antiga
const bio =
  'Meu nome é ' +
  usuario.nome +
  ', tenho ' +
  usuario.idade +
  ' anos e moro em ' +
  usuario.cidade +
  '.';

// Versão com template literals:
const bioModerna = `Meu nome é ${usuario.nome}, tenho ${usuario.idade} anos e moro em ${usuario.cidade}.`;
```

### Exercício 3: Tipos e typeof

```javascript
// Complete a função que verifica tipos corretamente
function verificarTipo(valor) {
  if (valor === null) return 'nulo';
  if (Array.isArray(valor)) return 'array';
  if (typeof valor === 'object') return 'objeto';
  return typeof valor;
}

// Testes
console.log(verificarTipo(null)); // "nulo"
console.log(verificarTipo([1, 2, 3])); // "array"
console.log(verificarTipo({ a: 1 })); // "objeto"
console.log(verificarTipo(42)); // "number"
console.log(verificarTipo('texto')); // "string"
```

### Exercício 4: Triângulo com Loop

```javascript
// Criar um triângulo de # usando loops
function criarTriangulo(altura) {
  for (let linha = 1; linha <= altura; linha++) {
    let triangulo = '';
    for (let coluna = 1; coluna <= linha; coluna++) {
      triangulo += '#';
    }
    console.log(triangulo);
  }
}

criarTriangulo(5);
// #
// ##
// ###
// ####
// #####
```

### Exercício 5: FizzBuzz

```javascript
// Imprimir números de 1 a 100 com regras especiais:
// - Múltiplos de 3: "Fizz"
// - Múltiplos de 5: "Buzz"
// - Múltiplos de ambos: "FizzBuzz"
// - Outros: o próprio número

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log('FizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}

// Versão mais concisa
for (let i = 1; i <= 100; i++) {
  let output = '';
  if (i % 3 === 0) output += 'Fizz';
  if (i % 5 === 0) output += 'Buzz';
  console.log(output || i);
}
```

### Exercício 6: Tabuleiro de Xadrez

```javascript
// Criar padrão de xadrez 8x8 alternando entre espaço e #
function tabuleiro(tamanho = 8) {
  for (let linha = 0; linha < tamanho; linha++) {
    let padrao = '';
    for (let coluna = 0; coluna < tamanho; coluna++) {
      if ((linha + coluna) % 2 === 0) {
        padrao += ' ';
      } else {
        padrao += '#';
      }
    }
    console.log(padrao);
  }
}

tabuleiro();
// # # # #
//  # # #
// # # # #
//  # # #
// # # # #
//  # # #
// # # # #
//  # # #
```

## 🏋️ 5. Exercícios Avançados

### Exercício 1: Debug com Tagged Template

```javascript
// Crie uma função debug que:
// - Mostra o nome e valor de cada variável
// - Mostra o tipo de cada valor
// - Destaca valores null/undefined

function debug(strings, ...valores) {
  let resultado = '';

  strings.forEach((str, i) => {
    resultado += str;

    if (i < valores.length) {
      const valor = valores[i];
      const tipo = typeof valor;
      const valorStr =
        valor === null
          ? 'null'
          : valor === undefined
          ? 'undefined'
          : JSON.stringify(valor);

      const destaque = valor === null || valor === undefined ? '⚠️ ' : '';
      resultado += `${destaque}${valorStr} (${tipo})`;
    }
  });

  console.log(resultado);
}

// Teste:
const nome = 'Ana';
const idade = null;
const ativo = true;
debug`nome: ${nome}, idade: ${idade}, ativo: ${ativo}`;
// nome: "Ana" (string), idade: ⚠️ null (object), ativo: true (boolean)
```

### Exercício 2: Formatador de Texto

```javascript
// Crie uma função que:
// 1. Remove espaços extras
// 2. Capitaliza primeira letra de cada palavra
// 3. Remove caracteres especiais (mantém apenas letras, números e espaços)

function formatarTexto(texto) {
  return (
    texto
      // Remove caracteres especiais (mantém letras, números, espaços)
      .replace(/[^a-zA-Z0-9\s]/g, '')
      // Remove espaços extras
      .replace(/\s+/g, ' ')
      // Remove espaços do início e fim
      .trim()
      // Converte para minúsculas
      .toLowerCase()
      // Capitaliza primeira letra de cada palavra
      .split(' ')
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ')
  );
}

// Teste:
console.log(formatarTexto('  olá    MUNDO!!!   javascript@@  '));
// "Olá Mundo Javascript"
```

### Exercício 3: Formatador de Números

```javascript
// Crie uma função que formata números de forma inteligente:
// - Números grandes: notação abreviada (1K, 1M, 1B)
// - Decimais: máximo 2 casas
// - Moeda: formato brasileiro

function formatarNumero(numero, tipo = 'normal') {
  if (typeof numero !== 'number' || isNaN(numero)) {
    return 'Número inválido';
  }

  switch (tipo) {
    case 'normal':
      if (numero >= 1e9) {
        return (numero / 1e9).toFixed(2).replace('.00', '') + 'B';
      } else if (numero >= 1e6) {
        return (numero / 1e6).toFixed(2).replace('.00', '') + 'M';
      } else if (numero >= 1e3) {
        return (numero / 1e3).toFixed(2).replace('.00', '') + 'K';
      }
      return numero.toString();

    case 'decimal':
      return numero.toFixed(2);

    case 'moeda':
      return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

    default:
      return numero.toString();
  }
}

// Testes:
console.log(formatarNumero(1234)); // "1.23K"
console.log(formatarNumero(1234567)); // "1.23M"
console.log(formatarNumero(123.456, 'decimal')); // "123.46"
console.log(formatarNumero(1234.56, 'moeda')); // "R$ 1.234,56"
```
