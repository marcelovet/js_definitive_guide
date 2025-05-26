// var
var nome = 'João';
var idade = 25;
var ativo = true;

var idade = 26; // var pode ser redeclarada

// let
let contador = 1;
contador = 2;
// let contador = 3; // let não pode ser redeclarada

// const
const nome2 = 'João';
// nome = 'Maria'; // const não pode ser reatribuída
const pessoa = {
  nome: 'João',
  idade: 25,
};
pessoa.nome = 'Maria'; // const não impede a alteração de propriedades
const listaCompras = ['arroz', 'feijão', 'macarrão'];
listaCompras.push('carne'); // const não impede alterar o conteúdo de um array

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
let cidade = 'belo horizonte',
  cep = 3021583,
  ativada = true;

// let vs const vs var
// var é function-scoped
// let e const são block-scoped
function exemploVar() {
  if (true) {
    var variavel = 'var';
  }
  console.log(variavel); // imprime 'var'
}
exemploVar();

function exemploLetConst() {
  if (true) {
    let variavel = 'let';
    const constante = 'const';
  }
  console.log(
    typeof variavel === 'undefined' ? 'não existe let aqui' : 'existe let aqui'
  ); // ReferenceError: variavel is not defined se tenta acessar o valor de variavel fora do bloco
  console.log(
    typeof constante === 'undefined'
      ? 'não existe const aqui'
      : 'existe const aqui'
  ); // ReferenceError: constante is not defined se tenta acessar o valor de constante fora do bloco
}
exemploLetConst();

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 1);
  // Imprime: 3, 3, 3 pois var é function-scoped, ou seja, a variável i é compartilhada entre os callbacks
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 1); // Imprime: 0, 1, 2
  // let é block-scoped, ou seja, a variável j é criada e destruída a cada iteração do loop
}

// Hoisting é o comportamento do JavaScript de "mover" declarações para o topo do escopo.
// var é hoisted, let e const não são
// COM VAR - é içada e inicializada como undefined
console.log(minhaVar); // undefined (não dá erro!)
var minhaVar = 5;
console.log(minhaVar); // 5

// COM LET - é içada mas NÃO inicializada (Temporal Dead Zone)
//console.log(minhaLet); // ❌ ReferenceError: Cannot access before initialization
let minhaLet = 5;

// COM CONST - mesmo comportamento que let
//console.log(minhaConst); // ❌ ReferenceError
const minhaConst = 5;

// Função também sofre hoisting completo
digaOi(); // "Oi!" ✅ Funciona!
function digaOi() {
  console.log('Oi!');
}

// tipos
// JavaScript tem 7 tipos primitivos e 1 tipo de objeto:
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
let objeto = { nome: 'João', idade: 25 }; // objeto
let array = [1, 2, 3]; // object (arrays são objetos)
let funcao = function () {}; // function (mas typeof retorna "function")
console.log(typeof funcao); // object

// O Quirk do typeof null
console.log(typeof null); // object
// Como verificar null corretamente:
let valor = null;

// Forma errada
if (typeof valor === 'object') {
  // Isso também seria verdade para objetos reais!
  console.log('É null, mas também pode ser um objeto!');
}

// Forma correta
if (valor === null) {
  console.log('É null!');
}

// Verificação segura para objetos
if (valor !== null && typeof valor === 'object') {
  console.log('É um objeto de verdade!');
}

// strings em JS
// podem ser criadas com aspas simples, duplas ou template literals
let carro = 'Fusca';
let carro2 = 'Fusca';
let carro3 = `Fusca`;
// Template literals são uma forma moderna e poderosa de trabalhar com strings
// elas permitem que você insira variáveis diretamente em strings
// Forma antiga (concatenação de strings)
const usuario = 'Carlos';
const user_idade = 30;
const mensagemAntiga =
  'Olá, meu nome é ' + usuario + ' e tenho ' + user_idade + ' anos.';
console.log(mensagemAntiga);

// Sintaxe moderna (template literals) - use crases ``
const mensagem = `Olá, meu nome é ${usuario} e tenho ${user_idade} anos.`;
console.log(mensagem);

// template literals aceita múltiplas linhas sem \n
const poema = `
    Rosas são vermelhas,
    Violetas são azuis,
    JavaScript é incrível,
    E você também!
`;
console.log(poema);

// aceitam expressões e chamadas de funções dentro de ${}
const preco = 100;
const desconto = 0.2;
console.log(`Preço final: R$ ${preco * (1 - desconto)}`);
console.log(`Desconto: ${desconto * 100}%`);
console.log(`Desconto: ${(0.2 - 0.3).toFixed(3)}%`);
function maiuscula(texto) {
  return texto.toUpperCase();
}
console.log(`Gritando: ${maiuscula('socorro!')}`);

// Tagged Template Literals (avançado)
// permitem processar template literals com uma função
function destacar(strings, ...valores) {
  return strings.reduce((resultado, str, i) => {
    console.log(strings, valores);
    return resultado + str + (valores[i] ? `**${valores[i]}**` : '');
  }, '');
}

const produto = 'notebook';
console.log(destacar`O ${produto} custa R$ ${3000}`);

function minhaTag(strings, ...valores) {
  console.log('Strings:', strings);
  console.log('len de Strings:', strings.length);
  console.log('Valores:', valores);
  console.log('len de Valores:', valores.length);
}

minhaTag`Olá ${'colega'}, você tem ${25} anos! e as vars ${1}${2}${3}${4}`;

// exemplo de uso de tagged template literals
// formatador de moeda
function moeda(strings, ...valores) {
  return strings.reduce((resultado, str, i) => {
    const valor = valores[i];
    if (typeof valor === 'number') {
      return resultado + str + `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }
    return resultado + str + (valor || '');
  }, '');
}
console.log(
  moeda`O produto ${'notebook'} custa R$ ${3000} e o serviço ${'manutenção'} custa R$ ${100}`
);

// sanitizador de html (Segurança)
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

// construtor de sql (query builder)
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

const mensagem_translate = i18n`${(lang) =>
  traducoes[lang].saudacao('Fulano')} Como vai? ${(lang) =>
  traducoes[lang].despedida}`;
console.log(mensagem_translate);

function regex(strings, ...valores) {
  console.log(strings);
  console.log(strings.raw[0]);
  let a = new RegExp(strings.raw[0]);
  console.log(a);
  return a;
}

const pattern = regex`^\d{3}\.\d{3}\.\d{3}-\d{2}$`; // CPF pattern
console.log(pattern.test('123.456.789-10')); // true

// Métodos dos Tipos Primitivos
texto = 'JavaScript é Incrível!';

// INFORMAÇÕES
console.log(texto.length); // 22 (número de caracteres)
console.log(texto.charAt(0)); // "J" (primeiro caractere)
console.log(texto.charCodeAt(0)); // 74 (código Unicode)
console.log(texto[0]); // "J" (acesso por índice)

// BUSCA
console.log(texto.indexOf('Script')); // 4 (índice da primeira ocorrência)
console.log(texto.lastIndexOf('i')); // 18 (índice da última ocorrência)
console.log(texto.includes('Java')); // true (contém "Java")
console.log(texto.startsWith('Java')); // true (começa com "Java")
console.log(texto.endsWith('!')); // true (termina com "!")
console.log(texto.search(/[A-Z]/g)); // 0 (primeira maiúscula) (expressão regular)

// EXTRAÇÃO
console.log(texto.slice(0, 10)); // "JavaScript" (slice)
console.log(texto.substring(0, 10)); // "JavaScript" (substring)
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

// UNICODE E EMOJIS
const emoji = '👨‍👩‍👧‍👦';
console.log(emoji.length); // 11 (não é 1!)
console.log([...emoji]); // Array com cada parte
console.log(emoji.codePointAt(0)); // 128104

// COMPARAÇÃO LOCALE
// returns a negative number if referenceStr occurs before compareString;
// positive if the referenceStr occurs after compareString; 0 if they are equivalent.
console.log('ä'.localeCompare('z', 'sv'));
console.log('ä'.localeCompare('z', 'en'));

// Number
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
console.log(Number.isFinite(+Infinity)); // false
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

let myNum = 1.23456789;
console.log(
  myNum.toLocaleString('pt-BR', { style: 'percent', maximumFractionDigits: 2 })
); // Com separadores

// booleans
const verdade = true;
const falso = false;

// Métodos básicos
console.log(verdade.toString()); // "true"
console.log(falso.toString()); // "false"
console.log(verdade.valueOf()); // true

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

if ('') {
  console.log('Entrou no if 1!');
}
if ('0') {
  console.log('Entrou no if 2!');
}
if (0) {
  console.log('Entrou no if 3!');
}
if (1) {
  console.log('Entrou no if 4!');
}
if (null) {
  console.log('Entrou no if 5!');
}
if ([]) {
  console.log('Entrou no if 6!');
}

// Symbols
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

// null e undefined
// null e undefined não têm métodos!
// Tentar acessar métodos neles causa erro

let nullVariable = null;
let undefinedVariable = undefined;

// console.log(nulo.toString());               // ❌ TypeError!
// console.log(indefinido.toString());         // ❌ TypeError!

// Conversão segura
console.log(String(nullVariable)); // "null"
console.log(String(undefinedVariable)); // "undefined"

// Comparações
console.log(null == undefined); // true (coerção)
console.log(null === undefined); // false (tipos diferentes)

// Valores padrão com nullish coalescing (??)
console.log(null ?? 'padrão'); // "padrão"
console.log(undefined ?? 'padrão'); // "padrão"
console.log(0 ?? 'padrão'); // 0 (0 não é nullish!)
console.log('' ?? 'padrão'); // "" (string vazia não é nullish!)

console.log(NaN === NaN); // false ❗
console.log(Number.isNaN(NaN)); // true ✅ forma correta
console.log(isNaN('texto')); // true (converte primeiro para number)
console.log(Number.isNaN('texto')); // false (não converte)

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

const acao = 'login';
log`${'WARN'} Usuário ${'João'} realizou ${acao}`;
