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

// for in - itera sobre arrays e objetos (indices e chaves)
const frutas = ['Pera', 'Maçã', 'Uva'];
for (const i in frutas) {
  console.log(i, frutas[i]);
}

const objeto = { nome: 'fulano', sobrenome: 'sicrano', idade: 22 };
for (const i in objeto) {
  console.log(i, objeto[i]);
}

// for of - itera sobre arrays e strings (valores)
for (const i of frutas) {
  console.log(i);
}

// forEach - itera sobre arrays (função callback)
frutas.forEach((fruta) => console.log(fruta));
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

## 4. 🎯 Aula Completa: Tratamento e Lançamento de Erros em JavaScript

Olá! Sou o JavaScriptMentor e hoje vamos mergulhar profundamente no mundo do **tratamento de erros** em JavaScript. Este é um dos tópicos mais importantes para se tornar um desenvolvedor profissional!

---

### 📋 **Índice da Aula**

1. [O que são Erros em JavaScript?](#1-o-que-são-erros)
2. [Tipos de Erros](#2-tipos-de-erros)
3. [Try...Catch - A Base do Tratamento](#3-try-catch)
4. [Finally - Sempre Executado](#4-finally)
5. [Throw - Lançando Seus Próprios Erros](#5-throw)
6. [Exemplos Práticos](#6-exemplos-práticos)
7. [Boas Práticas](#7-boas-práticas)
8. [Exercícios](#8-exercícios)

---

### 1. **O que são Erros em JavaScript?** 🚨

Erros são situações inesperadas que podem interromper a execução do seu código. Imagine que você está dirigindo e de repente o carro para - você precisa saber como lidar com essa situação!

#### **Por que Tratar Erros?**

```javascript
// ❌ Sem tratamento de erro - aplicação quebra
function dividir(a, b) {
  return a / b; // E se b for 0? E se não forem números?
}

console.log(dividir(10, 0)); // Infinity
console.log(dividir('abc', 5)); // NaN
```

```javascript
// ✅ Com tratamento de erro - aplicação continua funcionando
function dividirSeguro(a, b) {
  try {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Ambos os parâmetros devem ser números');
    }
    if (b === 0) {
      throw new Error('Divisão por zero não é permitida');
    }
    return a / b;
  } catch (error) {
    console.error('Erro na divisão:', error.message);
    return null;
  }
}
```

---

### 2. **Tipos de Erros** ⚡

#### **Erros de Sintaxe (SyntaxError)**

```javascript
// ❌ Erro de sintaxe - código nem executa
function exemploSintaxe() {
    console.log("Olá mundo" // Parêntese não fechado
}
```

#### **Erros de Referência (ReferenceError)**

```javascript
// ❌ Tentando usar variável que não existe
function exemploReferencia() {
  console.log(variavelQueNaoExiste); // ReferenceError
}
```

#### **Erros de Tipo (TypeError)**

```javascript
// ❌ Tentando usar método em tipo inadequado
function exemploTipo() {
  let numero = 42;
  numero.toUpperCase(); // TypeError: numero.toUpperCase is not a function
}
```

#### **Erros Personalizados**

```javascript
// ✅ Criando nossos próprios erros
function exemploPersonalizado() {
  throw new Error('Este é um erro personalizado!');
}
```

---

### 3. **Try...Catch - A Base do Tratamento** 🛡️

#### **Sintaxe Básica**

```javascript
try {
  // Código que pode gerar erro
  let resultado = operacaoArriscada();
  console.log(resultado);
} catch (error) {
  // Código executado quando há erro
  console.error('Oops! Algo deu errado:', error.message);
}
```

#### **Exemplo Prático - Conversão JSON**

```javascript
function processarJSON(jsonString) {
  try {
    // JSON.parse pode lançar SyntaxError se o JSON for inválido
    const dados = JSON.parse(jsonString);
    console.log('Dados processados:', dados);
    return dados;
  } catch (error) {
    console.error('JSON inválido:', error.message);
    return null;
  }
}

// Teste com JSON válido
processarJSON('{"nome": "João", "idade": 30}'); // ✅ Funciona

// Teste com JSON inválido
processarJSON('{"nome": "João", "idade":}'); // ❌ Erro capturado
```

#### **Capturando Diferentes Tipos de Erro**

```javascript
function exemploMultiplosErros(data) {
  try {
    // Pode gerar ReferenceError
    if (variavelInexistente) {
      return false;
    }

    // Pode gerar TypeError
    data.toUpperCase();
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error('Erro de referência:', error.message);
    } else if (error instanceof TypeError) {
      console.error('Erro de tipo:', error.message);
    } else {
      console.error('Erro desconhecido:', error.message);
    }
  }
}
```

---

### 4. **Finally - Sempre Executado** 🔄

O bloco `finally` **sempre** executa, independentemente de haver erro ou não. É como uma "limpeza" garantida.

#### **Sintaxe com Finally**

```javascript
function exemploFinally() {
  try {
    console.log('1. Executando operação...');
    // Simular erro aleatório
    if (Math.random() > 0.5) {
      throw new Error('Erro simulado!');
    }
    console.log('2. Operação bem-sucedida!');
  } catch (error) {
    console.log('3. Erro capturado:', error.message);
  } finally {
    console.log('4. Limpeza sempre executada!');
  }
}

// Execute várias vezes para ver o comportamento
exemploFinally();
```

#### **Caso Prático - Gerenciamento de Recursos**

```javascript
function lerArquivo(nomeArquivo) {
  let arquivo = null;

  try {
    console.log(`📂 Abrindo arquivo: ${nomeArquivo}`);
    arquivo = {
      nome: nomeArquivo,
      aberto: true,
    };

    // Simular erro na leitura
    if (nomeArquivo.includes('erro')) {
      throw new Error('Arquivo corrompido!');
    }

    console.log('📖 Arquivo lido com sucesso!');
    return 'Conteúdo do arquivo...';
  } catch (error) {
    console.error('❌ Erro ao ler arquivo:', error.message);
    return null;
  } finally {
    // Sempre fechar o arquivo, mesmo com erro
    if (arquivo && arquivo.aberto) {
      console.log('🔒 Fechando arquivo...');
      arquivo.aberto = false;
    }
  }
}

lerArquivo('documento.txt'); // ✅ Sucesso
lerArquivo('arquivo_erro.txt'); // ❌ Erro, mas arquivo é fechado
```

---

### 5. **Throw - Lançando Seus Próprios Erros** 🚀

#### **Sintaxe Básica do Throw**

```javascript
// Lançar erro simples
throw new Error('Mensagem de erro');

// Lançar diferentes tipos de erro
throw new TypeError('Tipo inválido');
throw new RangeError('Valor fora do intervalo');

// Lançar valores personalizados
throw 'String como erro';
throw 404;
throw { codigo: 500, mensagem: 'Erro interno' };
```

#### **Criando Validações Personalizadas**

```javascript
function validarIdade(idade) {
  // Validar se é número
  if (typeof idade !== 'number') {
    throw new TypeError('Idade deve ser um número');
  }

  // Validar se é número válido
  if (isNaN(idade)) {
    throw new Error('Idade deve ser um número válido');
  }

  // Validar intervalo
  if (idade < 0) {
    throw new RangeError('Idade não pode ser negativa');
  }

  if (idade > 150) {
    throw new RangeError('Idade deve ser menor que 150 anos');
  }

  return true;
}

function criarPessoa(nome, idade) {
  try {
    validarIdade(idade);
    return {
      nome: nome,
      idade: idade,
      status: 'válido',
    };
  } catch (error) {
    console.error('Erro ao criar pessoa:', error.message);
    return {
      nome: nome,
      idade: null,
      status: 'inválido',
      erro: error.message,
    };
  }
}

// Testes
console.log(criarPessoa('João', 30)); // ✅ Válido
console.log(criarPessoa('Maria', 'abc')); // ❌ TypeError
console.log(criarPessoa('Pedro', -5)); // ❌ RangeError
console.log(criarPessoa('Ana', 200)); // ❌ RangeError
```

#### **Criando Classes de Erro Personalizadas**

```javascript
// Classe de erro personalizada
class ErroValidacao extends Error {
  constructor(campo, valor, motivo) {
    super(`Erro de validação no campo "${campo}": ${motivo}`);
    this.name = 'ErroValidacao';
    this.campo = campo;
    this.valor = valor;
    this.motivo = motivo;
  }
}

class ErroAutenticacao extends Error {
  constructor(usuario) {
    super(`Falha na autenticação para o usuário: ${usuario}`);
    this.name = 'ErroAutenticacao';
    this.usuario = usuario;
    this.timestamp = new Date();
  }
}

function validarUsuario(dados) {
  try {
    if (!dados.email || !dados.email.includes('@')) {
      throw new ErroValidacao('email', dados.email, 'formato inválido');
    }

    if (!dados.senha || dados.senha.length < 6) {
      throw new ErroValidacao(
        'senha',
        '***',
        'deve ter pelo menos 6 caracteres'
      );
    }

    // Simular falha de autenticação
    if (dados.email === 'teste@erro.com') {
      throw new ErroAutenticacao(dados.email);
    }

    return { status: 'sucesso', usuario: dados.email };
  } catch (error) {
    if (error instanceof ErroValidacao) {
      console.error(`❌ ${error.message}`);
      console.error(`   Campo: ${error.campo}`);
      console.error(`   Valor: ${error.valor}`);
    } else if (error instanceof ErroAutenticacao) {
      console.error(`🔒 ${error.message}`);
      console.error(`   Tentativa em: ${error.timestamp}`);
    } else {
      console.error('Erro inesperado:', error.message);
    }

    return { status: 'erro', erro: error.message };
  }
}

// Testes
validarUsuario({ email: 'joao@email.com', senha: '123456' }); // ✅
validarUsuario({ email: 'email-inválido', senha: '123456' }); // ❌ ErroValidacao
validarUsuario({ email: 'joao@email.com', senha: '123' }); // ❌ ErroValidacao
validarUsuario({ email: 'teste@erro.com', senha: '123456' }); // ❌ ErroAutenticacao
```

---

### 6. **Exemplos Práticos** 💡

#### **Exemplo 1: Sistema de Calculadora Robusta**

```javascript
class Calculadora {
  static somar(a, b) {
    try {
      this.validarNumeros(a, b);
      return a + b;
    } catch (error) {
      console.error('Erro na soma:', error.message);
      return null;
    }
  }

  static dividir(a, b) {
    try {
      this.validarNumeros(a, b);
      if (b === 0) {
        throw new Error('Divisão por zero não é permitida');
      }
      return a / b;
    } catch (error) {
      console.error('Erro na divisão:', error.message);
      return null;
    }
  }

  static raizQuadrada(num) {
    try {
      if (typeof num !== 'number') {
        throw new TypeError('Parâmetro deve ser um número');
      }
      if (num < 0) {
        throw new RangeError(
          'Não é possível calcular raiz quadrada de número negativo'
        );
      }
      return Math.sqrt(num);
    } catch (error) {
      console.error('Erro na raiz quadrada:', error.message);
      return null;
    }
  }

  static validarNumeros(...nums) {
    for (let i = 0; i < nums.length; i++) {
      if (typeof nums[i] !== 'number' || isNaN(nums[i])) {
        throw new TypeError(`Parâmetro ${i + 1} deve ser um número válido`);
      }
    }
  }
}

// Testes da calculadora
console.log('=== TESTES DA CALCULADORA ===');
console.log('Soma 5 + 3:', Calculadora.somar(5, 3)); // ✅ 8
console.log('Divisão 10 / 2:', Calculadora.dividir(10, 2)); // ✅ 5
console.log('Divisão 10 / 0:', Calculadora.dividir(10, 0)); // ❌ null
console.log('Raiz de 16:', Calculadora.raizQuadrada(16)); // ✅ 4
console.log('Raiz de -4:', Calculadora.raizQuadrada(-4)); // ❌ null
console.log('Soma "abc" + 5:', Calculadora.somar('abc', 5)); // ❌ null
```

#### **Exemplo 2: Sistema de Requisições HTTP Simulado**

```javascript
class ApiClient {
  static async fazerRequisicao(url, opcoes = {}) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout da requisição')), 3000);
    });

    const requestPromise = new Promise((resolve, reject) => {
      try {
        // Validar URL
        if (!url || typeof url !== 'string') {
          throw new TypeError('URL deve ser uma string válida');
        }

        // Simular diferentes cenários
        setTimeout(() => {
          if (url.includes('erro-500')) {
            reject(new Error('Erro interno do servidor (500)'));
          } else if (url.includes('erro-404')) {
            reject(new Error('Recurso não encontrado (404)'));
          } else if (url.includes('timeout')) {
            // Não resolve nem rejeita (simula timeout)
            return;
          } else {
            resolve({
              status: 200,
              data: { mensagem: 'Sucesso!', url: url },
            });
          }
        }, Math.random() * 2000);
      } catch (error) {
        reject(error);
      }
    });

    try {
      const resultado = await Promise.race([requestPromise, timeoutPromise]);
      console.log('✅ Requisição bem-sucedida:', resultado);
      return resultado;
    } catch (error) {
      console.error('❌ Erro na requisição:', error.message);
      throw error; // Re-lança o erro para quem chamou tratar
    } finally {
      console.log('🔄 Requisição finalizada para:', url);
    }
  }
}

// Função para testar múltiplas requisições
async function testarRequisicoes() {
  const urls = [
    'https://api.sucesso.com/dados',
    'https://api.erro-404.com/dados',
    'https://api.erro-500.com/dados',
    'https://api.timeout.com/dados',
    null, // URL inválida
  ];

  for (const url of urls) {
    try {
      await ApiClient.fazerRequisicao(url);
    } catch (error) {
      console.log(`Tratamento final do erro para ${url}:`, error.message);
    }
    console.log('---');
  }
}

// Executar testes
// testarRequisicoes();
```

#### **Exemplo 3: Sistema de Validação de Formulário**

```javascript
class ValidadorFormulario {
  static validarFormulario(dados) {
    const erros = [];

    try {
      // Validar cada campo
      this.validarNome(dados.nome);
    } catch (error) {
      erros.push({ campo: 'nome', erro: error.message });
    }

    try {
      this.validarEmail(dados.email);
    } catch (error) {
      erros.push({ campo: 'email', erro: error.message });
    }

    try {
      this.validarTelefone(dados.telefone);
    } catch (error) {
      erros.push({ campo: 'telefone', erro: error.message });
    }

    try {
      this.validarIdade(dados.idade);
    } catch (error) {
      erros.push({ campo: 'idade', erro: error.message });
    }

    if (erros.length > 0) {
      throw new Error(
        `Formulário inválido: ${erros.length} erro(s) encontrado(s)`
      );
    }

    return { status: 'válido', dados: dados };
  }

  static validarNome(nome) {
    if (!nome || typeof nome !== 'string') {
      throw new Error('Nome é obrigatório e deve ser texto');
    }
    if (nome.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres');
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
      throw new Error('Nome deve conter apenas letras e espaços');
    }
  }

  static validarEmail(email) {
    if (!email || typeof email !== 'string') {
      throw new Error('Email é obrigatório');
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      throw new Error('Formato de email inválido');
    }
  }

  static validarTelefone(telefone) {
    if (!telefone) {
      throw new Error('Telefone é obrigatório');
    }
    const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!regexTelefone.test(telefone)) {
      throw new Error('Telefone deve estar no formato (XX) XXXXX-XXXX');
    }
  }

  static validarIdade(idade) {
    if (typeof idade !== 'number' || isNaN(idade)) {
      throw new Error('Idade deve ser um número');
    }
    if (idade < 0 || idade > 120) {
      throw new Error('Idade deve estar entre 0 e 120 anos');
    }
  }
}

function processarFormulario(dados) {
  try {
    const resultado = ValidadorFormulario.validarFormulario(dados);
    console.log('✅ Formulário válido!', resultado);
    return resultado;
  } catch (error) {
    console.error('❌ Formulário inválido:', error.message);

    // Se o erro contém informações sobre campos específicos
    if (error.message.includes('Formulário inválido')) {
      console.log('Detalhes dos erros por campo:');
      // Aqui você poderia acessar os erros específicos
    }

    return { status: 'inválido', erro: error.message };
  }
}

// Testes do formulário
console.log('=== TESTES DO FORMULÁRIO ===');

// Formulário válido
processarFormulario({
  nome: 'João Silva',
  email: 'joao@email.com',
  telefone: '(11) 99999-9999',
  idade: 30,
});

// Formulário com erros
processarFormulario({
  nome: '',
  email: 'email-inválido',
  telefone: '123456',
  idade: 'abc',
});
```

---

### 7. **Boas Práticas** ⭐

#### **1. Seja Específico nos Erros**

```javascript
// ❌ Erro genérico demais
throw new Error('Algo deu errado');

// ✅ Erro específico e útil
throw new Error(
  'Falha ao conectar com o banco de dados: timeout após 30 segundos'
);
```

#### **2. Use Finally para Limpeza**

```javascript
function operacaoComRecursos() {
  let recurso = null;

  try {
    recurso = abrirRecurso();
    return processarDados(recurso);
  } catch (error) {
    console.error('Erro no processamento:', error.message);
    return null;
  } finally {
    // Sempre limpar, mesmo com erro
    if (recurso) {
      fecharRecurso(recurso);
    }
  }
}
```

#### **3. Não Ignore Erros Silenciosamente**

```javascript
// ❌ Ignorar erro silenciosamente
try {
  operacaoArriscada();
} catch (error) {
  // Erro ignorado - muito perigoso!
}

// ✅ Sempre faça algo com o erro
try {
  operacaoArriscada();
} catch (error) {
  console.error('Erro registrado:', error.message);
  // Ou registrar em log, mostrar para usuário, etc.
}
```

#### **4. Valide Entrada de Dados**

```javascript
function processarDados(dados) {
  // Validar no início da função
  if (!dados) {
    throw new Error('Dados são obrigatórios');
  }

  if (typeof dados !== 'object') {
    throw new TypeError('Dados devem ser um objeto');
  }

  // Continuar com o processamento...
}
```

#### **5. Use Async/Await com Try/Catch**

```javascript
async function buscarDados() {
  try {
    const resposta = await fetch('/api/dados');

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    return dados;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Erro de rede:', error.message);
    } else {
      console.error('Erro na API:', error.message);
    }
    throw error; // Re-lançar para quem chamou decidir
  }
}
```

---

### 8. **Exercícios Práticos** 📝

#### **Exercício 1: Sistema de Login**

Crie uma função `realizarLogin(usuario, senha)` que:

- Valide se usuário e senha foram fornecidos
- Valide se são strings
- Simule verificação de credenciais
- Lance erros apropriados para cada situação
- Use try/catch/finally

```javascript
// Sua implementação aqui
function realizarLogin(usuario, senha) {
  // Implemente a validação e lógica de login
}

// Teste com diferentes cenários
```

#### **Exercício 2: Conversor de Moeda**

Crie um sistema que:

- Converta valores entre diferentes moedas
- Valide se o valor é numérico e positivo
- Valide se as moedas são válidas (USD, EUR, BRL)
- Trate erros de rede (simule com Promise)
- Use classes de erro personalizadas

```javascript
// Sua implementação aqui
class ConversorMoeda {
  static async converter(valor, moedaOrigem, moedaDestino) {
    // Implemente a conversão com tratamento de erro
  }
}
```

#### **Exercício 3: Processador de Arquivo JSON**

Crie uma função que:

- Receba uma string JSON
- Valide e parse o JSON
- Valide se contém campos obrigatórios
- Processe os dados
- Trate todos os possíveis erros

```javascript
// Sua implementação aqui
function processarArquivoJSON(jsonString, camposObrigatorios) {
  // Implemente o processamento com tratamento completo de erros
}
```

---

### 🎯 **Resumo da Aula**

#### **O que Aprendemos:**

1. **Try/Catch**: Base do tratamento de erros
2. **Finally**: Bloco sempre executado para limpeza
3. **Throw**: Como lançar nossos próprios erros
4. **Tipos de Erro**: ReferenceError, TypeError, SyntaxError, etc.
5. **Erros Personalizados**: Criando classes de erro específicas
6. **Boas Práticas**: Como escrever código robusto

#### **Pontos-Chave:**

- ✅ Sempre trate erros que podem acontecer
- ✅ Use finally para limpeza de recursos
- ✅ Seja específico nas mensagens de erro
- ✅ Valide dados de entrada
- ✅ Não ignore erros silenciosamente

#### **Próximos Passos:**

1. Pratique os exercícios propostos
2. Estude Promises e async/await com tratamento de erros
3. Aprenda sobre logging e monitoramento de erros
4. Explore bibliotecas como Winston para logs profissionais

---
