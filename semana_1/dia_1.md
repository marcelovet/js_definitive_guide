Olá! Vou explicar esses conceitos fundamentais do JavaScript de forma clara e progressiva. Vamos começar!

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

## 🔤 3. Tipos de Dados em JavaScript

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
```

## 📝 4. Template Literals (Template Strings)

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

## 🏋️ Exercícios Práticos

### Exercício 1: Escopo e Hoisting

```javascript
// O que será impresso? Por quê?
console.log(a);
var a = 1;

console.log(b);
let b = 2;

if (true) {
  var c = 3;
  let d = 4;
  const e = 5;
}

console.log(c);
console.log(d);
console.log(e);
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

// Sua versão com template literals:
// ???
```

### Exercício 3: Tipos e typeof

```javascript
// Complete a função que verifica tipos corretamente
function verificarTipo(valor) {
  // Deve retornar:
  // "nulo" para null
  // "array" para arrays
  // "objeto" para objetos (não arrays)
  // O tipo real para outros valores
  // Seu código aqui
}

// Testes
console.log(verificarTipo(null)); // "nulo"
console.log(verificarTipo([1, 2, 3])); // "array"
console.log(verificarTipo({ a: 1 })); // "objeto"
console.log(verificarTipo(42)); // "number"
console.log(verificarTipo('texto')); // "string"
```

## 💡 Dicas Importantes

1. **Use `const` por padrão**, mude para `let` apenas quando precisar reatribuir
2. **Evite `var`** em código moderno - use apenas se precisar compatibilidade com navegadores muito antigos
3. **`let` não é o "novo var"** - eles têm comportamentos muito diferentes!
4. **Sempre verifique `null` explicitamente** devido ao quirk do `typeof`
5. **Template literals** tornam o código mais legível - use sempre que possível

## 🏷️ Tagged Template Literals (Detalhado)

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

## 🔧 Métodos dos Tipos Primitivos

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

## 🎯 Exemplos Práticos Avançados

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

## 🏋️ Exercícios Avançados

### Exercício 1: Crie um Tagged Template para Debug

```javascript
// Crie uma função debug que:
// - Mostra o nome e valor de cada variável
// - Mostra o tipo de cada valor
// - Destaca valores null/undefined

function debug(strings, ...valores) {
  // Seu código aqui
}

// Teste:
const nome = 'Ana';
const idade = null;
const ativo = true;
debug`nome: ${nome}, idade: ${idade}, ativo: ${ativo}`;
// Deve mostrar algo como:
// nome: "Ana" (string), idade: null (null), ativo: true (boolean)
```

### Exercício 2: Métodos de String Avançados

```javascript
// Crie uma função que:
// 1. Remove espaços extras
// 2. Capitaliza primeira letra de cada palavra
// 3. Remove caracteres especiais (mantém apenas letras, números e espaços)

function formatarTexto(texto) {
  // Seu código aqui
}

// Teste:
console.log(formatarTexto('  olá    MUNDO!!!   javascript@@  '));
// Deve retornar: "Olá Mundo Javascript"
```

### Exercício 3: Formatador de Números

```javascript
// Crie uma função que formata números de forma inteligente:
// - Números grandes: notação abreviada (1K, 1M, 1B)
// - Decimais: máximo 2 casas
// - Moeda: formato brasileiro

function formatarNumero(numero, tipo = 'normal') {
  // Seu código aqui
}

// Testes:
console.log(formatarNumero(1234)); // "1.23K"
console.log(formatarNumero(1234567)); // "1.23M"
console.log(formatarNumero(123.456, 'decimal')); // "123.46"
console.log(formatarNumero(1234.56, 'moeda')); // "R$ 1.234,56"
```
