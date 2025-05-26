# 📝 **EXERCÍCIOS DE JAVASCRIPT - ESTRUTURA E CONTROLE DE FLUXO**

---

## 🟢 **NÍVEL BÁSICO (1-20)**

_Foco: if/else, loops simples, convenções básicas_

### **Exercício 1 - Primeiro Programa**

Escreva um programa que declare três variáveis (nome, idade, cidade) e use console.log() para exibir uma mensagem formatada.

### **Exercício 2 - If Simples**

Crie um programa que verifique se um número é positivo. Se for, exiba "Número positivo!".

### **Exercício 3 - If/Else**

Verifique se um número é par ou ímpar usando o operador módulo (%).

### **Exercício 4 - Comparação de Strings**

Compare duas strings e determine qual vem primeiro na ordem alfabética.

### **Exercício 5 - Loop While Básico**

Use while para contar de 1 até 10 e exibir cada número.

### **Exercício 6 - Loop For Básico**

Refaça o exercício anterior usando for ao invés de while.

### **Exercício 7 - Tabuada**

Crie a tabuada do 7 usando um loop for (de 1 a 10).

### **Exercício 8 - Múltiplas Condições**

Verifique se um número está entre 10 e 20 (inclusive) usando operadores lógicos.

### **Exercício 9 - Math Object**

Use Math.random() para gerar um número entre 1 e 100. Use Math.floor() para arredondar.

### **Exercício 10 - String para Número**

Converta a string "123.45" para número e calcule seu dobro.

### **Exercício 11 - Operador Ternário**

Verifique se uma pessoa pode votar (idade >= 16) usando operador ternário.

### **Exercício 12 - Do-While**

Use do-while para solicitar um número positivo ao usuário até ele digitar corretamente.

### **Exercício 13 - Break em Loop**

Encontre o primeiro número divisível por 7 entre 50 e 100 usando break.

### **Exercício 14 - Continue em Loop**

Imprima todos os números de 1 a 20, pulando os múltiplos de 3 usando continue.

### **Exercício 15 - If Aninhado**

Classifique uma idade em: bebê (0-2), criança (3-12), adolescente (13-17), adulto (18+).

### **Exercício 16 - Contador com For**

Conte quantos números pares existem entre 1 e 50.

### **Exercício 17 - Validação Simples**

Verifique se uma string tem pelo menos 3 caracteres e no máximo 10.

### **Exercício 18 - Switch Básico**

Converta um número (1-7) para o dia da semana correspondente usando switch.

### **Exercício 19 - Expressões vs Declarações**

Identifique se cada linha é uma expressão ou declaração:

```javascript
// Classifique cada linha:
5 + 3;
let x = 10;
console.log('olá');
x > 5;
if (true) {
}
('texto');
```

### **Exercício 20 - Convenções de Nomes**

Corrija os nomes de variáveis para seguir as convenções JavaScript:

```javascript
// Corrija:
let NomeCompleto = "João"
let IDADE_usuario = 25
const pi_value = 3.14
let 123nome = "inválido"
```

---

## 🟡 **NÍVEL INTERMEDIÁRIO (21-40)**

_Foco: Loops aninhados, switch complexo, padrões de controle_

### **Exercício 21 - Padrão Triângulo**

Use loops aninhados para criar este padrão:

```
*
**
***
****
*****
```

### **Exercício 22 - FizzBuzz**

Para números de 1 a 100: imprima "Fizz" para múltiplos de 3, "Buzz" para múltiplos de 5, e "FizzBuzz" para múltiplos de ambos.

### **Exercício 23 - Validação de Senha**

Verifique se uma senha tem: mínimo 8 caracteres, pelo menos 1 número, 1 letra maiúscula e 1 minúscula.

### **Exercício 24 - Menu Switch**

Crie um menu com switch que execute diferentes operações matemáticas baseadas na escolha do usuário.

### **Exercício 25 - Números Primos**

Encontre todos os números primos entre 1 e 50 usando loops aninhados.

### **Exercício 26 - Pirâmide de Números**

Crie este padrão:

```
    1
   121
  12321
 1234321
123454321
```

### **Exercício 27 - Busca em Array**

Use for e break para encontrar a posição de um elemento em um array. Retorne -1 se não encontrar.

### **Exercício 28 - Contagem Regressiva**

Implemente uma contagem regressiva de 10 a 0 com delay usando setTimeout (assíncrono).

### **Exercício 29 - Validação de CPF (simplificada)**

Verifique se uma string tem 11 dígitos e calcule o primeiro dígito verificador.

### **Exercício 30 - Jogo de Adivinhação**

Crie um jogo onde o computador escolhe um número (1-100) e o usuário tenta adivinhar.

### **Exercício 31 - Calculadora de Notas**

Calcule a média de N notas e atribua conceito (A-F) baseado na média.

### **Exercício 32 - Formatador de Data**

Receba uma data e formate para diferentes padrões (DD/MM/AAAA, MM-DD-AAAA, etc).

### **Exercício 33 - Filtro de Palavrões**

Substitua palavras proibidas em um texto por asteriscos do mesmo tamanho.

### **Exercício 34 - Conversor de Temperatura**

Converta entre Celsius, Fahrenheit e Kelvin usando switch e funções.

### **Exercício 35 - Sequência Fibonacci**

Gere os primeiros N números da sequência Fibonacci.

### **Exercício 36 - Palíndromo**

Verifique se uma palavra é palíndromo (igual de trás para frente).

### **Exercício 37 - Contador de Palavras**

Conte quantas palavras há em um texto, ignorando espaços extras.

### **Exercício 38 - Ordenação Bubble Sort**

Implemente o algoritmo bubble sort usando loops aninhados.

### **Exercício 39 - Matriz Identidade**

Crie uma matriz identidade NxN usando loops aninhados.

### **Exercício 40 - Parser de Horário**

Converta horário de 24h para 12h (AM/PM) e vice-versa.

---

## 🔴 **NÍVEL AVANÇADO (41-45)**

_Foco: Algoritmos complexos, otimização, edge cases_

### **Exercício 41 - State Machine**

Implemente uma máquina de estados para validar formato de email usando switch e loops.

### **Exercício 42 - Expressão Matemática**

Parse e calcule expressões simples como "2 + 3 \* 4" respeitando precedência.

### **Exercício 43 - Gerador de Labirinto**

Crie um labirinto simples 10x10 usando algoritmo de backtracking.

### **Exercício 44 - Compilador de Template**

Crie um mini compilador que substitua variáveis em templates: "Olá {nome}, você tem {idade} anos".

### **Exercício 45 - Detector de Padrões**

Encontre padrões repetidos em strings (ex: "abcabcabc" → "abc" repete 3x).

---

## 🏆 **DESAFIOS (46-50)**

_Foco: Problemas do mundo real integrando todos os conceitos_

### **Exercício 46 - Sistema de Vendas**

```javascript
// Crie um sistema que:
// 1. Mantenha controle de estoque (array de produtos)
// 2. Processe vendas verificando disponibilidade
// 3. Aplique descontos baseados em regras:
//    - Acima de R$100: 10% desconto
//    - Acima de R$500: 20% desconto
//    - Cliente VIP: +5% adicional
// 4. Gere relatório de vendas
// 5. Use switch para menu de opções
// 6. Valide todas as entradas
```

### **Exercício 47 - Jogo da Velha**

```javascript
// Implemente o jogo da velha:
// 1. Tabuleiro 3x3 representado por array
// 2. Alternância entre jogadores X e O
// 3. Verificação de vitória em todas as direções
// 4. Detecção de empate
// 5. Opção de jogar novamente
// 6. Validação de jogadas (casa já ocupada)
// 7. Interface via console.log() e prompt()
```

### **Exercício 48 - Analisador de Logs**

```javascript
// Analise logs de servidor:
// 1. Parse linhas no formato: "[DATA] [NÍVEL] [MENSAGEM]"
// 2. Filtre por nível (ERROR, WARN, INFO)
// 3. Busque por palavras-chave
// 4. Gere estatísticas:
//    - Total de erros por hora
//    - IPs mais frequentes
//    - Páginas mais acessadas
// 5. Identifique padrões suspeitos
```

### **Exercício 49 - Sistema de Reservas**

```javascript
// Sistema de reservas de hotel:
// 1. Quartos com diferentes categorias e preços
// 2. Verificação de disponibilidade por data
// 3. Cálculo de diárias com taxas:
//    - Final de semana: +20%
//    - Alta temporada: +50%
//    - Mais de 7 dias: -10%
// 4. Validação de datas (check-in < check-out)
// 5. Cancelamento com políticas diferentes
// 6. Relatório de ocupação
```

### **Exercício 50 - Interpretador de Comandos**

```javascript
// Crie um mini interpretador que:
// 1. Aceite comandos tipo: "SET x 10", "ADD x 5", "PRINT x"
// 2. Suporte variáveis e operações básicas
// 3. Implemente loops: "REPEAT 3 PRINT hello"
// 4. Condicionais: "IF x > 5 PRINT 'grande'"
// 5. Funções: "DEFINE double x = x * 2"
// 6. Tratamento de erros com mensagens claras
// 7. Histórico de comandos

// Exemplo de sessão:
// > SET x 10
// > ADD x 5
// > PRINT x
// 15
// > IF x > 10 PRINT "maior que 10"
// maior que 10
```

---

## 💡 **DICAS PARA RESOLVER OS EXERCÍCIOS**

### **Estrutura Recomendada**

```javascript
// 1. Sempre comece com comentários explicando o problema
// 2. Declare variáveis no início com nomes claros
// 3. Separe a lógica em blocos bem definidos
// 4. Teste casos extremos (0, negativo, string vazia)
// 5. Use console.log() para debug

// Exemplo de estrutura:
/**
 * Exercício X: Descrição do problema
 * Entrada: tipo de dados esperados
 * Saída: o que deve retornar
 */

// Declaração de variáveis
let entrada = prompt('Digite algo:');
let resultado = null;

// Validação de entrada
if (!entrada || entrada.trim() === '') {
  console.log('Entrada inválida!');
  // return ou tratamento apropriado
}

// Processamento principal
// ... sua lógica aqui ...

// Saída formatada
console.log(`Resultado: ${resultado}`);
```

### **Padrões Comuns**

```javascript
// Busca em array
for (let i = 0; i < array.length; i++) {
  if (array[i] === procurado) {
    // encontrado!
    break;
  }
}

// Acumulador
let soma = 0;
for (let i = 0; i < numeros.length; i++) {
  soma += numeros[i];
}

// Validação com while
let entrada;
while (!entradaValida(entrada)) {
  entrada = prompt('Digite novamente:');
}

// Switch com retorno
function getDiaSemana(numero) {
  switch (numero) {
    case 1:
      return 'Segunda';
    case 2:
      return 'Terça';
    // etc...
    default:
      return 'Inválido';
  }
}
```

## 🎯 **CRITÉRIOS DE AVALIAÇÃO**

- ✅ **Funcionalidade**: O código resolve o problema?
- ✅ **Legibilidade**: Código limpo e bem organizado
- ✅ **Convenções**: Segue padrões JavaScript
- ✅ **Robustez**: Trata casos extremos e erros
- ✅ **Eficiência**: Usa estruturas apropriadas

---
