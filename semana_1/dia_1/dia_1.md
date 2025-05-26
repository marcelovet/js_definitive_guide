# Variáveis, tipos e interpolação

## 📚 1. Variáveis em JavaScript

Variáveis são como "caixas" onde armazenamos valores para usar em nosso código. Em JavaScript, temos três formas de declarar variáveis:

### **var** - A forma antiga (ES5)

```javascript
var nome = 'João';
var idade = 25;
var ativo = true;
```

### **let** - Variável que pode ser reatribuída (ES6)

```javascript
let contador = 0;
contador = 1; // ✅ Permitido
contador = 2; // ✅ Permitido
```

### **const** - Constante (ES6)

```javascript
const PI = 3.14159;
const usuario = { nome: 'Maria' };
// PI = 3.14; // ❌ Erro! Não pode reatribuir

// ⚠️ Mas cuidado: objetos e arrays podem ser modificados
usuario.nome = 'Ana'; // ✅ Permitido (não estamos reatribuindo)
```

### 🔗 **Múltiplas Declarações**

```javascript
// Declarando múltiplas variáveis de uma vez
let x = 1,
  y = 2,
  z = 3;

// Com const
const CORES = {
    AZUL: '#007bff',
    VERDE: '#28a745',
    VERMELHO: '#dc3545',
  },
  MAX_TENTATIVAS = 3;

// Com let (diferentes tipos)
let nome = 'Carlos',
  idade = 30,
  ativo = true;
```

## 🎯 2. Diferenças Cruciais: let, const e var

### **Escopo (Scope)**

```javascript
// VAR tem escopo de FUNÇÃO
function exemploVar() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 ✅ (var "vaza" do bloco if)
}

// LET e CONST têm escopo de BLOCO
function exemploLet() {
  if (true) {
    let y = 1;
    const z = 2;
  }
  console.log(y); // ❌ Erro! y não existe aqui
  console.log(z); // ❌ Erro! z não existe aqui
}

// Exemplo prático com loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 100); // Imprime: 3, 3, 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 100); // Imprime: 0, 1, 2
}
```

### **Hoisting (Içamento)**

Hoisting é o comportamento do JavaScript de "mover" declarações para o topo do escopo.

```javascript
// COM VAR - é içada e inicializada como undefined
console.log(minhaVar); // undefined (não dá erro!)
var minhaVar = 5;
console.log(minhaVar); // 5

// COM LET - é içada mas NÃO inicializada (Temporal Dead Zone)
console.log(minhaLet); // ❌ ReferenceError: Cannot access before initialization
let minhaLet = 5;

// COM CONST - mesmo comportamento que let
console.log(minhaConst); // ❌ ReferenceError
const minhaConst = 5;

// Função também sofre hoisting completo
digaOi(); // "Oi!" ✅ Funciona!
function digaOi() {
  console.log('Oi!');
}
```

### **Redeclaração**

```javascript
// VAR permite redeclaração
var usuario = 'Pedro';
var usuario = 'Ana'; // ✅ Sem problemas

// LET e CONST não permitem
let idade = 30;
let idade = 31; // ❌ SyntaxError: Identifier already declared

const nome = 'João';
const nome = 'Maria'; // ❌ SyntaxError
```

## 🌐 3. Bits e Valores - Fundamentos

### **Como os Computadores Armazenam Dados**

```javascript
// Tudo no computador são bits (0s e 1s)
// JavaScript usa 64 bits para representar cada número

// Exemplos de representação interna (conceitual)
const numero = 42;
// Internamente: 0100000001001010000000000000000000000000000000000000000000000000

// Limite prático: aproximadamente 9 quadrilhões
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// Um computador moderno tem mais de 100 bilhões de bits na memória volátil
// JavaScript organiza esses bits em "pedaços" chamados valores
```

### **Valores em JavaScript**

```javascript
// Cada valor em JavaScript é um "pedaço" organizado de informação
const textos = 'Olá, mundo!'; // String - sequência de caracteres
const numeros = 123.45; // Number - valor numérico
const logicos = true; // Boolean - verdadeiro ou falso
const vazio = null; // Null - ausência intencional
const indefinido = undefined; // Undefined - valor não definido
```

## 🔢 4. Números em JavaScript

### **Representação e Formatos**

```javascript
// Números inteiros
const inteiro = 13;
const zero = 0;
const negativo = -42;

// Números decimais (fracionários)
const decimal = 9.81;
const gravidade = 9.8;

// Notação científica
const velocidadeLuz = 2.998e8; // = 299,800,000
const atomico = 1.23e-10; // = 0.000000000123
const grande = 5e12; // = 5,000,000,000,000

// Diferentes bases numéricas
const binario = 0b1010; // = 10 (base 2)
const octal = 0o755; // = 493 (base 8)
const hexadecimal = 0xff; // = 255 (base 16)

console.log(binario, octal, hexadecimal); // 10 493 255
```

### **Operadores Aritméticos e Precedência**

```javascript
// Precedência de operadores (mesma ordem matemática)
console.log(100 + 4 * 11); // 144 (multiplicação primeiro)
console.log((100 + 4) * 11); // 1144 (parênteses alteram ordem)

// Operadores básicos
const soma = 10 + 5; // 15
const subtracao = 10 - 5; // 5
const multiplicacao = 10 * 5; // 50
const divisao = 10 / 5; // 2
const resto = 144 % 12; // 0 (operador módulo/resto)
const potencia = 2 ** 3; // 8 (exponenciação)

// Incremento e decremento
let contador = 5;
console.log(contador++); // 5 (pós-incremento - usa depois incrementa)
console.log(contador); // 6
console.log(++contador); // 7 (pré-incremento - incrementa depois usa)
console.log(--contador); // 6 (pré-decremento)

// Operadores de atribuição compostos
let num = 10;
num += 5; // num = num + 5;  → 15
num -= 3; // num = num - 3;  → 12
num *= 2; // num = num * 2;  → 24
num /= 4; // num = num / 4;  → 6
num %= 4; // num = num % 4;  → 2
num **= 3; // num = num ** 3; → 8
```

### **Valores Especiais Numéricos**

```javascript
// Infinitos
console.log(Infinity); // Infinity
console.log(-Infinity); // -Infinity
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log(typeof Infinity); // "number"

// NaN (Not a Number) - resultado de operações matemáticas inválidas
console.log(0 / 0); // NaN
console.log(Math.sqrt(-1)); // NaN
console.log('texto' * 2); // NaN
console.log(typeof NaN); // "number" (paradoxo!)

// Verificando NaN (NaN não é igual a nada, nem a si mesmo!)
console.log(NaN === NaN); // false ❗
console.log(Number.isNaN(NaN)); // true ✅ forma correta
console.log(isNaN('texto')); // true (mas converte primeiro)
console.log(Number.isNaN('texto')); // false (não converte)

// Verificando se é finito
console.log(Number.isFinite(42)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN)); // false
```

### **Precisão e Limitações de Números**

```javascript
// Cuidado com precisão em números decimais
console.log(0.1 + 0.2); // 0.30000000000000004 ❗
console.log(0.1 + 0.2 === 0.3); // false ❗

// Solução para comparação de decimais
const EPSILON = Number.EPSILON; // 2.220446049250313e-16
function saoIguais(a, b) {
  return Math.abs(a - b) < EPSILON;
}
console.log(saoIguais(0.1 + 0.2, 0.3)); // true ✅

// Limites seguros para inteiros
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.isSafeInteger(2 ** 53)); // false (acima do limite)

// Para números maiores, use BigInt
const numeroGigante = 123456789012345678901234567890n;
console.log(typeof numeroGigante); // "bigint"
```

## 🔤 5. Tipos de Dados em JavaScript

JavaScript tem 7 tipos primitivos e 1 tipo de objeto:

```javascript
// TIPOS PRIMITIVOS
let texto = 'Olá'; // string
let numero = 42; // number
let decimal = 3.14; // number (não há distinção)
let verdadeiro = true; // boolean
let nulo = null; // null
let indefinido = undefined; // undefined
let simbolo = Symbol('id'); // symbol
let numeroGrande = 9007199254740991n; // bigint

// TIPO OBJETO
let objeto = { nome: 'Ana' }; // object
let array = [1, 2, 3]; // object (arrays são objetos)
let funcao = function () {}; // function (mas typeof retorna "function")
let data = new Date(); // object
let regex = /abc/g; // object
```

### **Verificação de Tipos com typeof**

```javascript
// typeof retorna string com o tipo
console.log(typeof 42); // "number"
console.log(typeof 'texto'); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof Symbol('x')); // "symbol"
console.log(typeof 123n); // "bigint"
console.log(typeof function () {}); // "function"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof new Date()); // "object"

// ⚠️ Casos especiais
console.log(typeof null); // "object" (bug histórico!)
console.log(typeof NaN); // "number" (NaN é tecnicamente um número)
```

### **O Quirk do typeof null**

```javascript
// ⚠️ Este é um bug histórico do JavaScript!
console.log(typeof null); // "object" 😱

// Por que isso acontece?
// Na primeira versão do JS, valores eram representados como:
// - Tipo (tag) + Valor
// - Objetos tinham tag 000
// - null era representado como NULL pointer (0x00)
// - Por isso null foi interpretado como objeto

// Como verificar null corretamente:
let valor = null;

// Forma errada
if (typeof valor === 'object') {
  // Isso também seria verdade para objetos reais!
}

// Forma correta
if (valor === null) {
  console.log('É null!');
}

// Verificação segura para objetos
if (valor !== null && typeof valor === 'object') {
  console.log('É um objeto de verdade!');
}

// Função utilitária para verificar tipo real
function tipoReal(valor) {
  if (valor === null) return 'null';
  if (Array.isArray(valor)) return 'array';
  return typeof valor;
}

console.log(tipoReal(null)); // "null"
console.log(tipoReal([])); // "array"
console.log(tipoReal({})); // "object"
console.log(tipoReal('oi')); // "string"
```

## 🎭 6. Operadores Unários

```javascript
// typeof - retorna tipo como string
console.log(typeof 4.5); // "number"
console.log(typeof 'texto'); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"

// Negação numérica (-)
console.log(-10); // -10
console.log(-(3 + 4)); // -7

// Conversão para número (+)
console.log(+'123'); // 123
console.log(+true); // 1
console.log(+false); // 0
console.log(+'abc'); // NaN

// Negação lógica (!)
console.log(!true); // false
console.log(!false); // true
console.log(!''); // true (string vazia é falsy)
console.log(!'texto'); // false (string não vazia é truthy)
console.log(!0); // true (0 é falsy)
console.log(!42); // false (números != 0 são truthy)

// Dupla negação (!!) - converte para boolean
console.log(!!'texto'); // true
console.log(!!0); // false
console.log(!!''); // false
console.log(!!null); // false

// delete - remove propriedade de objeto
const obj = { a: 1, b: 2 };
console.log(delete obj.a); // true
console.log(obj); // { b: 2 }

// void - retorna undefined
console.log(void 0); // undefined
console.log(void 'qualquer coisa'); // undefined
```

## 🔤 7. Strings - Texto em JavaScript

### **Criação de Strings**

```javascript
// Três formas de criar strings
const simples = 'Texto com aspas simples';
const duplas = "Texto com aspas duplas'";
const template = `Template literal com interpolação`;

// Quando usar cada uma?
const nome = 'João';
const frase1 = 'Ele disse: "Olá!"'; // Aspas simples quando há duplas dentro
const frase2 = "It's a beautiful day"; // Aspas duplas quando há apóstrofe
const frase3 = `Olá, ${nome}!`; // Template literals para interpolação
```

### **Caracteres Especiais e Escape**

```javascript
// Caracteres de escape com barra invertida (\)
const texto1 = 'Primeira linha\nSegunda linha'; // \n = nova linha
const texto2 = 'Texto com "aspas" escapadas'; // \" = aspas dentro de string
const texto3 = "Don't forget to escape"; // \' = apóstrofe em string simples
const texto4 = 'Caminho: C:\\Users\\João\\Desktop'; // \\ = barra invertida literal
const texto5 = 'Tab\tentre\tpalavras'; // \t = tabulação

console.log(texto1);
// Primeira linha
// Segunda linha

// Outros caracteres especiais
const especiais = {
  novaLinha: '\n',
  tab: '\t',
  retornoCarro: '\r',
  backspace: '\b',
  formFeed: '\f',
  barraInvertida: '\\',
  aspaSimples: "'",
  aspaDupla: '"',
  unicode: '\u0041', // A (código Unicode)
  hex: '\x41', // A (código hexadecimal)
};

console.log(especiais.unicode); // "A"
console.log(especiais.hex); // "A"
```

### **Strings Multilinha**

```javascript
// Forma antiga (com \n)
const poemaAntigo =
  'Rosas são vermelhas,\n' +
  'Violetas são azuis,\n' +
  'JavaScript é incrível,\n' +
  'E você também!';

// Forma moderna (template literals)
const poemaModerno = `
    Rosas são vermelhas,
    Violetas são azuis,
    JavaScript é incrível,
    E você também!
`;

// Template literals preservam formatação, incluindo espaços e quebras
console.log(poemaModerno);
```

## ✅ 8. Valores Booleanos

### **Criação e Uso**

```javascript
// Valores booleanos literais
const verdadeiro = true;
const falso = false;

// Comparações produzem booleanos
console.log(3 > 2); // true
console.log('Aardvark' < 'Zoroaster'); // true (ordem alfabética)
console.log('Pearl' == 'Amethyst'); // false

// Comparações de strings (lexicográfica - ordem do dicionário)
console.log('A' < 'B'); // true
console.log('apple' < 'banana'); // true
console.log('Apple' < 'apple'); // true (maiúsculas vêm antes)
console.log('10' < '2'); // true (comparação de string, não número!)
```

### **Operadores de Comparação**

```javascript
// Igualdade com conversão (==)
console.log(5 == '5'); // true (string "5" vira número 5)
console.log(true == 1); // true (true vira 1)
console.log(false == 0); // true (false vira 0)
console.log(null == undefined); // true (caso especial)

// Igualdade estrita (===) - SEM conversão
console.log(5 === '5'); // false (tipos diferentes)
console.log(true === 1); // false (tipos diferentes)
console.log(null === undefined); // false (tipos diferentes)

// Desigualdade
console.log(5 != '6'); // true (com conversão)
console.log(5 !== '5'); // true (sem conversão - tipos diferentes)

// Comparações numéricas
console.log(5 > 3); // true
console.log(5 >= 5); // true
console.log(3 < 5); // true
console.log(3 <= 3); // true

// Cuidados especiais
console.log(NaN == NaN); // false (NaN não é igual a nada!)
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true (única forma de comparar NaN)
```

### **Operadores Lógicos**

```javascript
// E lógico (&&) - ambos precisam ser verdadeiros
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false

// OU lógico (||) - pelo menos um precisa ser verdadeiro
console.log(true || true); // true
console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false

// NÃO lógico (!) - inverte o valor
console.log(!true); // false
console.log(!false); // true
console.log(!!true); // true (dupla negação mantém valor)

// Operador ternário (condicional)
const idade = 18;
const status = idade >= 18 ? 'adulto' : 'menor';
console.log(status); // "adulto"

// Ternário aninhado (evite - prefira if/else)
const nota = 85;
const conceito = nota >= 90 ? 'A' : nota >= 80 ? 'B' : nota >= 70 ? 'C' : 'D';
console.log(conceito); // "B"
```

### **Valores Truthy e Falsy**

```javascript
// Valores FALSY (considerados false em contextos booleanos)
const valoresFalsy = [
  false, // boolean false
  0, // zero
  -0, // zero negativo
  0n, // bigint zero
  '', // string vazia
  null, // null
  undefined, // undefined
  NaN, // Not a Number
];

// Todos os outros valores são TRUTHY
const valoresTruthy = [
  true, // boolean true
  1, // qualquer número != 0
  -1, // números negativos
  '0', // string "0" (não é vazia!)
  'false', // string "false" (não é vazia!)
  [], // array vazio (é um objeto!)
  {}, // objeto vazio
  function () {}, // funções
  new Date(), // objetos
];

// Testando valores
valoresFalsy.forEach((valor) => {
  console.log(`${valor} é falsy:`, !valor); // todos true
});

valoresTruthy.forEach((valor) => {
  console.log(`${valor} é truthy:`, !!valor); // todos true
});

// Uso prático em condicionais
let nome = '';
if (nome) {
  console.log(`Olá, ${nome}!`);
} else {
  console.log('Nome não fornecido'); // Este será executado
}

// Valores padrão usando ||
function saudar(nome) {
  nome = nome || 'Visitante'; // tornou nome um argumento opcional
  return `Olá, ${nome}!`;
}

console.log(saudar('Ana')); // "Olá, Ana!"
console.log(saudar('')); // "Olá, Visitante!"
console.log(saudar()); // "Olá, Visitante!"
```

## 🔄 9. Conversão Automática de Tipos (Type Coercion)

### **Conversão Numérica**

```javascript
// Operações matemáticas convertem para número
console.log(8 * null); // 0 (null vira 0)
console.log('5' - 1); // 4 (string "5" vira número 5)
console.log('5' * 2); // 10
console.log('5' / 1); // 5
console.log(true + 1); // 2 (true vira 1)
console.log(false + 1); // 1 (false vira 0)

// EXCEÇÃO: + com strings faz concatenação
console.log('5' + 1); // "51" (número vira string)
console.log('Olá' + ' ' + 'mundo'); // "Olá mundo"

// Conversões que resultam em NaN
console.log('five' * 2); // NaN (conversão impossível)
console.log('abc' - 1); // NaN
console.log(undefined + 1); // NaN
```

### **Conversão de String**

```javascript
// + com strings converte o outro operando para string
console.log('Resultado: ' + 42); // "Resultado: 42"
console.log('Valor: ' + true); // "Valor: true"
console.log('Data: ' + new Date()); // "Data: [data atual]"

// Conversão explícita para string
console.log(String(123)); // "123"
console.log(String(true)); // "true"
console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"

// Método toString() (não funciona com null/undefined)
console.log((123).toString()); // "123"
console.log(true.toString()); // "true"
// console.log(null.toString());    // ❌ Erro!
```

### **Conversão Booleana**

```javascript
// Contextos que convertem para boolean
if ('qualquer string') {
  console.log('Strings não vazias são truthy');
}

// Conversão explícita para boolean
console.log(Boolean('')); // false
console.log(Boolean('texto')); // true
console.log(Boolean(0)); // false
console.log(Boolean(42)); // true
console.log(Boolean([])); // true (array vazio!)
console.log(Boolean({})); // true (objeto vazio!)

// Dupla negação (!!) também converte
console.log(!!''); // false
console.log(!!'texto'); // true
```

### **Comparações com Conversão**

```javascript
// == converte tipos antes de comparar
console.log(0 == false); // true (false vira 0)
console.log(1 == true); // true (true vira 1)
console.log('' == false); // true (ambos viram 0)
console.log(' ' == false); // true (" " vira 0)
console.log('0' == false); // true ("0" vira 0, false vira 0)

// === NÃO converte tipos
console.log(0 === false); // false (number vs boolean)
console.log(1 === true); // false (number vs boolean)

// Casos peculiares
console.log(null == 0); // false (caso especial)
console.log(undefined == 0); // false (caso especial)
console.log(null == undefined); // true (único caso especial)
console.log(null === undefined); // false (tipos diferentes)

// Comparações de strings vs números
console.log('10' > '9'); // false (comparação de string!)
console.log('10' > 9); // true (string vira número)
console.log(10 > '9'); // true (string vira número)
```

## 🚫 10. Valores Vazios - null e undefined

### **null - Ausência Intencional**

```javascript
// null representa ausência intencional de valor
let usuario = null; // Ainda não temos usuário, mas sabemos que deveria ter

// Quando usar null
function buscarUsuario(id) {
  // Se não encontrar usuário, retorna null intencionalmente
  if (id === 999) {
    return null; // "não encontrado" - valor conhecido
  }
  return { id, nome: 'João' };
}

const resultado = buscarUsuario(999);
if (resultado === null) {
  console.log('Usuário não encontrado');
}
```

### **undefined - Valor Não Definido**

```javascript
// undefined é o valor padrão de variáveis não inicializadas
let semValor;
console.log(semValor); // undefined

// Propriedades inexistentes em objetos
const obj = { a: 1 };
console.log(obj.b); // undefined

// Parâmetros de função não fornecidos
function exemplo(param) {
  console.log(param); // undefined se não passar valor
}
exemplo(); // undefined

// Retorno de função sem return explícito
function semRetorno() {
  // não tem return
}
console.log(semRetorno()); // undefined
```

### **Diferenças entre null e undefined**

```javascript
// Verificação de tipo
console.log(typeof null); // "object" (bug histórico)
console.log(typeof undefined); // "undefined"

// Conversão numérica
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN

// Conversão booleana (ambos são falsy)
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false

// Comparação
console.log(null == undefined); // true (coerção especial)
console.log(null === undefined); // false (tipos diferentes)

// JSON
console.log(JSON.stringify({ a: null, b: undefined }));
// '{"a":null}' - undefined é omitido!
```

### **Operador Nullish Coalescing (??) - ES2020**

```javascript
// ?? retorna lado direito se lado esquerdo for null ou undefined
const valor1 = null ?? 'padrão'; // "padrão"
const valor2 = undefined ?? 'padrão'; // "padrão"
const valor3 = 0 ?? 'padrão'; // 0 (0 não é nullish!)
const valor4 = '' ?? 'padrão'; // "" (string vazia não é nullish!)
const valor5 = false ?? 'padrão'; // false (false não é nullish!)

// Diferença do || (que considera todos os valores falsy)
const config = {
  tema: '',
  debug: false,
  maxItems: 0,
};

// Com || (problemas)
const tema1 = config.tema || 'claro'; // "claro" (string vazia é falsy)
const debug1 = config.debug || true; // true (false é falsy)
const max1 = config.maxItems || 10; // 10 (0 é falsy)

// Com ?? (correto)
const tema2 = config.tema ?? 'claro'; // "" (mantém string vazia)
const debug2 = config.debug ?? true; // false (mantém false)
const max2 = config.maxItems ?? 10; // 0 (mantém 0)

// Optional Chaining (?.) - ES2020
const usuario = {
  nome: 'Ana',
  endereco: {
    rua: 'Rua A',
    numero: 123,
  },
};

// Forma antiga (verbosa e propensa a erro)
const cep1 = usuario && usuario.endereco && usuario.endereco.cep;

// Forma moderna (concisa e segura)
const cep2 = usuario?.endereco?.cep; // undefined (não dá erro)
const nome = usuario?.nome; // "Ana"

// Com arrays
const items = [{ id: 1 }, { id: 2 }];
const primeiroId = items?.[0]?.id; // 1
const terceiroId = items?.[2]?.id; // undefined

// Com métodos
const resultado = usuario?.metodoQueNaoExiste?.(); // undefined (não dá erro)
```

## 📝 11. Template Literals (Template Strings)

Template literals são uma forma moderna e poderosa de trabalhar com strings:

```javascript
// Sintaxe antiga (concatenação)
const nome = 'Carlos';
const idade = 30;
const mensagemAntiga =
  'Olá, meu nome é ' + nome + ' e tenho ' + idade + ' anos.';

// Sintaxe moderna (template literals) - use crases ``
const mensagem = `Olá, meu nome é ${nome} e tenho ${idade} anos.`;

// Múltiplas linhas sem \n
const poema = `
    Rosas são vermelhas,
    Violetas são azuis,
    JavaScript é incrível,
    E você também!
`;

// Expressões dentro de ${}
const preco = 100;
const desconto = 0.2;
console.log(`Preço final: R$ ${preco * (1 - desconto)}`);
console.log(`Desconto: ${desconto * 100}%`);

// Pode chamar funções
function maiuscula(texto) {
  return texto.toUpperCase();
}
console.log(`Gritando: ${maiuscula('socorro!')}`);

// Tagged Template Literals (avançado)
function destacar(strings, ...valores) {
  return strings.reduce((resultado, str, i) => {
    return resultado + str + (valores[i] ? `**${valores[i]}**` : '');
  }, '');
}

const produto = 'notebook';
const valor = 3000;
console.log(destacar`O ${produto} custa R$ ${valor}`);
// Saída: "O **notebook** custa R$ **3000**"
```

## 🏷️ 12. Tagged Template Literals (Detalhado)

Tagged Template Literals são uma funcionalidade poderosa que permite processar template literals com uma função. É como ter um "processador personalizado" para suas strings!

### Anatomia de uma Tagged Template

```javascript
// Função tag recebe:
// 1. Array de strings literais
// 2. Valores interpolados como argumentos separados
function minhaTag(strings, ...valores) {
  console.log('Strings:', strings);
  console.log('Valores:', valores);
}

const nome = 'Ana';
const idade = 25;
minhaTag`Olá ${nome}, você tem ${idade} anos!`;
// Strings: ["Olá ", ", você tem ", " anos!"]
// Valores: ["Ana", 25]
```

### Exemplos Práticos de Tagged Templates

```javascript
// 1. FORMATADOR DE MOEDA
function moeda(strings, ...valores) {
  return strings.reduce((resultado, str, i) => {
    const valor = valores[i];
    if (typeof valor === 'number') {
      return resultado + str + `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }
    return resultado + str + (valor || '');
  }, '');
}

const preco = 49.9;
const desconto = 10.5;
console.log(
  moeda`Preço: ${preco} - Desconto: ${desconto} = Total: ${preco - desconto}`
);
// "Preço: R$ 49,90 - Desconto: R$ 10,50 = Total: R$ 39,40"

// 2. SANITIZADOR HTML (Segurança)
function sanitizeHTML(strings, ...valores) {
  const sanitize = (str) => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  return strings.reduce((resultado, str, i) => {
    return resultado + str + (valores[i] ? sanitize(valores[i]) : '');
  }, '');
}

const userInput = '<script>alert("XSS")</script>';
const html = sanitizeHTML`<div>Comentário do usuário: ${userInput}</div>`;
console.log(html);
// "<div>Comentário do usuário: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>"

// 3. CONSTRUTOR SQL (Query Builder)
function sql(strings, ...valores) {
  // Em produção, use uma biblioteca real!
  const query = strings.reduce((resultado, str, i) => {
    return resultado + str + (valores[i] !== undefined ? '?' : '');
  }, '');

  return {
    query: query,
    params: valores.filter((v) => v !== undefined),
  };
}

const userId = 123;
const status = 'ativo';
const consulta = sql`SELECT * FROM users WHERE id = ${userId} AND status = ${status}`;
console.log(consulta);
// { query: "SELECT * FROM users WHERE id = ? AND status = ?", params: [123, "ativo"] }

// 4. INTERNACIONALIZAÇÃO (i18n)
const traducoes = {
  pt: {
    saudacao: (nome) => `Olá, ${nome}!`,
    despedida: 'Tchau!',
  },
  en: {
    saudacao: (nome) => `Hello, ${nome}!`,
    despedida: 'Goodbye!',
  },
};

function i18n(strings, ...valores) {
  const idioma = 'pt'; // Poderia vir de configuração

  return strings.reduce((resultado, str, i) => {
    if (valores[i] && typeof valores[i] === 'function') {
      // Se for função, é uma chave de tradução
      return resultado + str + valores[i](idioma);
    }
    return resultado + str + (valores[i] || '');
  }, '');
}

const nome = 'Carlos';
const mensagem = i18n`${(lang) => traducoes[lang].saudacao(nome)} Como vai? ${(
  lang
) => traducoes[lang].despedida}`;
console.log(mensagem); // "Olá, Carlos! Como vai? Tchau!"

// 5. STYLED COMPONENTS (Conceito)
function css(strings, ...valores) {
  const styles = strings.reduce((resultado, str, i) => {
    return resultado + str + (valores[i] || '');
  }, '');

  // Criar hash único para className
  const hash = 'css-' + Math.random().toString(36).substr(2, 9);

  // Adicionar styles ao documento (simplificado)
  const styleElement = document.createElement('style');
  styleElement.textContent = `.${hash} { ${styles} }`;
  document.head.appendChild(styleElement);

  return hash;
}

const corPrimaria = '#007bff';
const tamanhoFonte = 16;
const className = css`
  color: ${corPrimaria};
  font-size: ${tamanhoFonte}px;
  padding: 10px;
  border-radius: 4px;
`;
// Retorna uma classe CSS única
```

### Propriedade `raw` em Tagged Templates

```javascript
function mostrarRaw(strings, ...valores) {
  console.log('Strings processadas:', strings);
  console.log('Strings raw:', strings.raw);
}

mostrarRaw`Linha 1\nLinha 2\tTab`;
// Strings processadas: ["Linha 1\nLinha 2\tTab"] - \n e \t são interpretados
// Strings raw: ["Linha 1\\nLinha 2\\tTab"] - mantém os caracteres escapados

// Útil para regex ou caminhos
function regex(strings, ...valores) {
  return new RegExp(strings.raw[0]);
}

const pattern = regex`\d{3}\.\d{3}\.\d{3}-\d{2}`; // CPF pattern
console.log(pattern.test('123.456.789-10')); // true
```

## 💡 Dicas Importantes

1. **Use `const` por padrão**, mude para `let` apenas quando precisar reatribuir
2. **Evite `var`** em código moderno - use apenas se precisar compatibilidade com navegadores muito antigos
3. **`let` não é o "novo var"** - eles têm comportamentos muito diferentes!
4. **Sempre verifique `null` explicitamente** devido ao quirk do `typeof`
5. **Template literals** tornam o código mais legível - use sempre que possível

## 🔧 13. Métodos dos Tipos Primitivos

JavaScript tem um conceito chamado "autoboxing" - quando você acessa um método em um primitivo, ele é temporariamente convertido em seu objeto wrapper.

### 📝 String - Métodos Principais

```javascript
const texto = 'JavaScript é Incrível!';

// INFORMAÇÕES
console.log(texto.length); // 22
console.log(texto.charAt(0)); // "J"
console.log(texto.charCodeAt(0)); // 74 (código Unicode)
console.log(texto[0]); // "J" (acesso por índice)

// BUSCA
console.log(texto.indexOf('Script')); // 4
console.log(texto.lastIndexOf('i')); // 18
console.log(texto.includes('Java')); // true
console.log(texto.startsWith('Java')); // true
console.log(texto.endsWith('!')); // true
console.log(texto.search(/[A-Z]/g)); // 0 (primeira maiúscula)

// EXTRAÇÃO
console.log(texto.slice(0, 10)); // "JavaScript"
console.log(texto.substring(0, 10)); // "JavaScript"
console.log(texto.substr(4, 6)); // "Script" (deprecated)

// TRANSFORMAÇÃO
console.log(texto.toLowerCase()); // "javascript é incrível!"
console.log(texto.toUpperCase()); // "JAVASCRIPT É INCRÍVEL!"
console.log('  espaços  '.trim()); // "espaços"
console.log('  espaços  '.trimStart()); // "espaços  "
console.log('  espaços  '.trimEnd()); // "  espaços"

// SUBSTITUIÇÃO
console.log(texto.replace('Incrível', 'Fantástico')); // "JavaScript é Fantástico!"
console.log(texto.replaceAll('í', 'i')); // "JavaScript é Incrivel!"
console.log('a-b-c'.split('-')); // ["a", "b", "c"]
console.log(['a', 'b', 'c'].join('-')); // "a-b-c"

// REPETIÇÃO E PADDING
console.log('Ha'.repeat(3)); // "HaHaHa"
console.log('5'.padStart(3, '0')); // "005"
console.log('5'.padEnd(3, '0')); // "500"

// MÉTODOS MODERNOS (ES2019+)
console.log('   texto   '.trimStart()); // "texto   "
console.log('   texto   '.trimEnd()); // "   texto"

// UNICODE E EMOJIS
const emoji = '👨‍👩‍👧‍👦';
console.log(emoji.length); // 11 (não é 1!)
console.log([...emoji]); // Array com cada parte
console.log(emoji.codePointAt(0)); // 128104

// COMPARAÇÃO LOCALE
console.log('ä'.localeCompare('z', 'sv')); // -1 (em sueco, ä vem antes de z)
console.log('ä'.localeCompare('z', 'en')); // 1 (em inglês, ä vem depois de z)
```

### 🔢 Number - Métodos e Propriedades

```javascript
const num = 123.456789;
const grande = 1234567890123456789012345678901234567890n; // BigInt

// FORMATAÇÃO
console.log(num.toFixed(2)); // "123.46"
console.log(num.toPrecision(5)); // "123.46"
console.log(num.toExponential(2)); // "1.23e+2"
console.log(num.toString(16)); // "7b.74bc6a7ef9dc" (hexadecimal)

// LOCALE
console.log(num.toLocaleString('pt-BR')); // "123,457"
console.log(
  num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
); // "R$ 123,46"

// MÉTODOS ESTÁTICOS DO NUMBER
console.log(Number.isNaN(NaN)); // true
console.log(Number.isFinite(123)); // true
console.log(Number.isInteger(123.0)); // true
console.log(Number.isSafeInteger(2 ** 53)); // false
console.log(Number.parseFloat('123.45abc')); // 123.45
console.log(Number.parseInt('123.45')); // 123
console.log(Number.parseInt('FF', 16)); // 255

// PROPRIEDADES ESTÁTICAS
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity
console.log(Number.EPSILON); // 2.220446049250313e-16

// BIGINT - Métodos
console.log(grande.toString()); // String do número
console.log(grande.toString(16)); // Hexadecimal
console.log(grande.toLocaleString('pt-BR')); // Com separadores

// Conversão BigInt <-> Number
const bigNum = BigInt(123);
const normalNum = Number(bigNum); // Cuidado com overflow!
```

### ✅ Boolean - Métodos

```javascript
const verdadeiro = true;
const falso = false;

// Métodos básicos
console.log(verdadeiro.toString()); // "true"
console.log(falso.toString()); // "false"
console.log(verdadeiro.valueOf()); // true

// Conversões interessantes (falsy values)
console.log(Boolean('')); // false
console.log(Boolean(0)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(false)); // false

// Todos os outros são truthy
console.log(Boolean('0')); // true (string não vazia!)
console.log(Boolean([])); // true (array vazio é truthy!)
console.log(Boolean({})); // true (objeto vazio é truthy!)
```

### 🔣 Symbol - Métodos e Uso

```javascript
// Criação de Symbols
const sym1 = Symbol('id');
const sym2 = Symbol('id');
console.log(sym1 === sym2); // false (sempre únicos!)

// Symbol com descrição
console.log(sym1.toString()); // "Symbol(id)"
console.log(sym1.description); // "id"

// Symbols globais
const globalSym1 = Symbol.for('app.id');
const globalSym2 = Symbol.for('app.id');
console.log(globalSym1 === globalSym2); // true

console.log(Symbol.keyFor(globalSym1)); // "app.id"

// Symbols conhecidos (well-known)
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 42;
    if (hint === 'string') return 'quarenta e dois';
    return true;
  },
};

console.log(+obj); // 42
console.log(`${obj}`); // "quarenta e dois"
console.log(obj + ''); // "quarenta e dois"

// Symbol.iterator
const iteravel = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const valor of iteravel) {
  console.log(valor); // 1, 2, 3
}
```

### 🚫 null e undefined - Particularidades

```javascript
// null e undefined não têm métodos!
// Tentar acessar métodos neles causa erro

let nulo = null;
let indefinido = undefined;

// console.log(nulo.toString());               // ❌ TypeError!
// console.log(indefinido.toString());         // ❌ TypeError!

// Conversão segura
console.log(String(nulo)); // "null"
console.log(String(indefinido)); // "undefined"

// Comparações
console.log(null == undefined); // true (coerção)
console.log(null === undefined); // false (tipos diferentes)

// Valores padrão com nullish coalescing (??)
const valor1 = null ?? 'padrão'; // "padrão"
const valor2 = undefined ?? 'padrão'; // "padrão"
const valor3 = 0 ?? 'padrão'; // 0 (0 não é nullish!)
const valor4 = '' ?? 'padrão'; // "" (string vazia não é nullish!)
```

## 🎯 14. Exemplos Práticos Avançados

```javascript
// FORMATADOR DE LOGS COM TAGGED TEMPLATE
function log(strings, ...valores) {
  const timestamp = new Date().toISOString();
  const nivel = valores[0];
  const mensagem = strings.slice(1).reduce((acc, str, i) => {
    return acc + (valores[i + 1] || '') + str;
  }, '');

  const cores = {
    INFO: '\x1b[36m',
    WARN: '\x1b[33m',
    ERROR: '\x1b[31m',
    RESET: '\x1b[0m',
  };

  console.log(
    `${cores[nivel]}[${timestamp}] ${nivel}: ${mensagem}${cores.RESET}`
  );
}

const usuario = 'João';
const acao = 'login';
log`${'INFO'} Usuário ${usuario} realizou ${acao}`;

// VALIDADOR DE TEMPLATE
function validar(strings, ...valores) {
  const regras = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    telefone: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  };

  return valores.every((valor, index) => {
    const tipoValidacao = strings[index].match(/:(\w+)$/)?.[1];
    if (tipoValidacao && regras[tipoValidacao]) {
      return regras[tipoValidacao].test(valor);
    }
    return true;
  });
}

const email = 'user@example.com';
const cpf = '123.456.789-10';
const valido = validar`:email${email} :cpf${cpf}`;
console.log(valido); // true ou false
```
## 💡 20. Principais Conceitos para Lembrar

### **Tipos de Dados (8 tipos total)**

- **7 Primitivos**: number, string, boolean, null, undefined, symbol, bigint
- **1 Objeto**: object (inclui arrays, funções, objetos, etc.)

### **Operadores por Categoria**

- **Aritméticos**: +, -, \*, /, %, \*\* (exponenciação)
- **Comparação**: ==, ===, !=, !==, <, >, <=, >=
- **Lógicos**: && (AND), || (OR), ! (NOT)
- **Atribuição**: =, +=, -=, \*=, /=, %=, \*\*=
- **Unários**: typeof, +, -, !, ++, --, delete, void

### **Variáveis (3 formas)**

- **let**: mutável, escopo de bloco, não pode redeclarar
- **const**: imutável, escopo de bloco, deve inicializar na declaração
- **var**: mutável, escopo de função, permite redeclaração (evitar)

### **Controle de Fluxo**

- **Condicionais**: if/else, switch, operador ternário (? :)
- **Loops**: while, do-while, for
- **Controle de loop**: break (sai), continue (pula), labels

### **Conversão de Tipos**

- **Automática (coerção)**: == faz conversão, === não faz
- **Explícita**: Number(), String(), Boolean()
- **Falsy values**: false, 0, "", null, undefined, NaN

### **Boas Práticas**

- Use `const` por padrão, `let` quando precisar reatribuir
- Sempre use `===` em vez de `==`
- Use template literals em vez de concatenação
- Nomes descritivos em camelCase
- Indentação consistente (2 ou 4 espaços)
- Comentários explicam "por que", não "o que"

Isso completa uma base sólida dos fundamentos do JavaScript! 🚀
