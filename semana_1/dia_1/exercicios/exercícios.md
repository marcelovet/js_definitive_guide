## 📝 **EXERCÍCIOS DE JAVASCRIPT - VARIÁVEIS, TIPOS E INTERPOLAÇÃO**

---

## 🟢 **NÍVEL BÁSICO (1-20)**

_Foco: Declaração de variáveis, tipos primitivos, operadores básicos_

### **Exercício 1 - Declaração de Variáveis**

Declare três variáveis: uma constante para PI (3.14159), uma variável let para contador iniciando em 0, e uma var para mensagem com o texto "Olá Mundo".

### **Exercício 2 - Tipos de Dados**

Crie variáveis para cada tipo primitivo: string, number, boolean, null, undefined. Use nomes descritivos.

### **Exercício 3 - Typeof**

Verifique o tipo de cada variável do exercício anterior usando typeof e imprima o resultado.

### **Exercício 4 - Operações Matemáticas**

Calcule: a soma de 15 + 27, a subtração de 100 - 42, a multiplicação de 8 \* 7, e a divisão de 144 / 12.

### **Exercício 5 - Concatenação de Strings**

Crie duas variáveis com seu primeiro e último nome. Concatene-as usando o operador +.

### **Exercício 6 - Template Literals Básico**

Refaça o exercício 5 usando template literals (crase).

### **Exercício 7 - Conversão de Tipos**

Converta a string "123" para número e o número 456 para string.

### **Exercício 8 - Valores Booleanos**

Crie expressões que resultem em true e false usando operadores de comparação.

### **Exercício 9 - Incremento e Decremento**

Demonstre a diferença entre pré-incremento (++x) e pós-incremento (x++).

### **Exercício 10 - Operador Módulo**

Verifique se os números 15, 20 e 33 são pares ou ímpares usando o operador %.

### **Exercício 11 - Strings com Escape**

Crie uma string que contenha: aspas duplas, uma quebra de linha (\n) e uma tabulação (\t).

### **Exercício 12 - Comparação de Strings**

Compare "apple" com "banana" e "JavaScript" com "javascript" usando operadores de comparação.

### **Exercício 13 - NaN e Infinity**

Demonstre como obter NaN e Infinity através de operações matemáticas.

### **Exercício 14 - Null vs Undefined**

Crie situações onde uma variável seja undefined e outra seja null. Explique a diferença.

### **Exercício 15 - Operadores de Atribuição Compostos**

Use +=, -=, \*= e /= para modificar uma variável numérica.

### **Exercício 16 - Conversão Implícita**

Demonstre a conversão automática em: "5" + 3, "5" - 3, e "5" \* 3.

### **Exercício 17 - Template Literal com Expressões**

Use template literal para criar uma mensagem que inclua uma operação matemática.

### **Exercício 18 - Verificação de Números**

Verifique se um valor é NaN usando Number.isNaN() e isNaN(). Qual a diferença?

### **Exercício 19 - Truthy e Falsy**

Liste todos os valores falsy e crie exemplos testando cada um em uma estrutura if.

### **Exercício 20 - Operador Ternário**

Verifique se uma idade é maior ou igual a 18 e retorne "Maior" ou "Menor" usando operador ternário.

---

## 🟡 **NÍVEL INTERMEDIÁRIO (21-40)**

_Foco: Escopo, hoisting, conversões complexas, métodos de tipos_

### **Exercício 21 - Escopo de Bloco**

Demonstre a diferença de escopo entre var, let e const dentro de um bloco if.

### **Exercício 22 - Hoisting**

Crie exemplos mostrando hoisting com var, let, const e function. O que acontece em cada caso?

### **Exercício 23 - Temporal Dead Zone**

Demonstre o conceito de Temporal Dead Zone com let e const.

### **Exercício 24 - String Methods**

Use 5 métodos diferentes de string em um texto: toUpperCase(), slice(), indexOf(), replace() e trim().

### **Exercício 25 - Number Methods**

Formate números usando toFixed(), toPrecision() e toLocaleString('pt-BR').

### **Exercício 26 - Parsing de Números**

Parse diferentes strings para números usando parseInt(), parseFloat() e Number().

### **Exercício 27 - Template Literal Multilinha**

Crie um template literal que represente um endereço completo em múltiplas linhas.

### **Exercício 28 - Operadores Lógicos Complexos**

Crie expressões usando && e || que demonstrem short-circuit evaluation.

### **Exercício 29 - Comparação Estrita vs Coerção**

Compare valores usando == e === mostrando pelo menos 5 casos onde os resultados diferem.

### **Exercício 30 - BigInt**

Crie operações com BigInt para números maiores que Number.MAX_SAFE_INTEGER.

### **Exercício 31 - Symbol**

Crie dois symbols com a mesma descrição e prove que são diferentes.

### **Exercício 32 - Valores Especiais**

Trabalhe com Number.EPSILON para comparar números decimais corretamente.

### **Exercício 33 - Nullish Coalescing**

Use ?? para definir valores padrão diferenciando de ||. Mostre casos onde ?? é melhor.

### **Exercício 34 - Optional Chaining**

Crie um objeto aninhado e use ?. para acessar propriedades que podem não existir.

### **Exercício 35 - String Padding**

Formate números de CPF e telefone usando padStart() e padEnd().

### **Exercício 36 - Destructuring com Defaults**

Use destructuring com valores padrão para extrair propriedades que podem ser undefined.

### **Exercício 37 - Number Formatting Internacional**

Formate valores monetários para diferentes locales (pt-BR, en-US, ja-JP).

### **Exercício 38 - Expressões Regulares Básicas**

Use search() e match() com regex simples em strings.

### **Exercício 39 - Conversão de Base Numérica**

Converta números entre decimal, binário, octal e hexadecimal.

### **Exercício 40 - Template Literals Aninhados**

Crie template literals dentro de outros template literals.

---

## 🔴 **NÍVEL AVANÇADO (41-45)**

_Foco: Tagged templates, Symbol avançado, edge cases_

### **Exercício 41 - Tagged Template Function**

Crie uma função tag que destaque valores interpolados com asteriscos.

### **Exercício 42 - Custom Type Checker**

Implemente uma função que retorne o tipo real de qualquer valor (incluindo null e array).

### **Exercício 43 - Symbol Iterator**

Crie um objeto iterável customizado usando Symbol.iterator.

### **Exercício 44 - Formatador SQL Seguro**

Implemente um tagged template que previna SQL injection.

### **Exercício 45 - Internacionalização**

Crie um sistema simples de i18n usando tagged templates.

---

## 🏆 **DESAFIOS (46-50)**

_Foco: Problemas complexos integrando múltiplos conceitos_

### **Exercício 46 - Sistema de Logs Tipado**

```javascript
// Crie um sistema de logs que:
// 1. Use diferentes níveis (info, warn, error)
// 2. Formate timestamps automaticamente
// 3. Use cores no console (opcional)
// 4. Implemente type checking robusto
// 5. Use template literals para formatação

// Exemplo de uso esperado:
// log.info`Usuário ${usuario} fez login às ${new Date()}`;
// log.error`Falha ao processar ${arquivo}: ${erro}`;
```

### **Exercício 47 - Validador de CPF/CNPJ**

```javascript
// Implemente funções que:
// 1. Aceitem strings com ou sem formatação
// 2. Validem os dígitos verificadores
// 3. Retornem o documento formatado se válido
// 4. Usem operações matemáticas e string methods
// 5. Tratem edge cases (null, undefined, números)
```

### **Exercício 48 - Calculadora de Expressões**

```javascript
// Crie uma calculadora que:
// 1. Aceite expressões como "2 + 3 * 4"
// 2. Respeite precedência de operadores
// 3. Suporte parênteses
// 4. Trate erros graciosamente (divisão por zero, NaN)
// 5. Use parsing de string avançado
```

### **Exercício 49 - Conversor Universal**

```javascript
// Desenvolva um conversor que:
// 1. Converta entre diferentes unidades (metros, pés, celsius, fahrenheit, etc)
// 2. Use template literals para entrada: convert`10 meters to feet`
// 3. Implemente precisão decimal configurável
// 4. Suporte notação científica
// 5. Trate conversões impossíveis
```

### **Exercício 50 - Mini Template Engine**

```javascript
// Crie um motor de templates que:
// 1. Suporte variáveis: {{nome}}
// 2. Suporte condicionais: {{#if condition}}...{{/if}}
// 3. Suporte loops: {{#each items}}...{{/each}}
// 4. Use regex e string manipulation avançados
// 5. Implemente escapamento de HTML por segurança

// Exemplo:
// render(`Olá {{nome}}! {{#if vip}}Você é VIP!{{/if}}`, {nome: 'João', vip: true});
```

---

## 💡 **DICAS PARA RESOLVER OS EXERCÍCIOS**

1. **Teste sempre no console** - Use console.log() liberalmente
2. **Leia as mensagens de erro** - Elas indicam exatamente o problema
3. **Comece simples** - Resolva por partes, não tente fazer tudo de uma vez
4. **Use a documentação** - MDN é seu melhor amigo
5. **Pratique debugging** - Use debugger ou breakpoints

## 🎯 **CRITÉRIOS DE AVALIAÇÃO**

- ✅ Código funciona corretamente
- ✅ Uso apropriado de let/const (evitar var)
- ✅ Nomenclatura clara de variáveis
- ✅ Tratamento de edge cases
- ✅ Código limpo e legível

---
