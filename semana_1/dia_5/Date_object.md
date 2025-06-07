# Objetos Date em JavaScript - Guia Completo 📅

Olá! Vou explicar os **objetos Date** em JavaScript de forma clara e prática. Vamos começar desde o básico!

## 🎯 O que são Objetos Date?

Os objetos `Date` representam um único momento no tempo em um formato independente de plataforma. Eles são fundamentais para trabalhar com datas e horários em JavaScript.

### Conceito Principal

```javascript
// Criando um objeto Date que representa AGORA
const agora = new Date();
console.log(agora); // data em ISO
```

## 🕐 Como Funciona Internamente?

O `Date` armazena internamente um **timestamp** - o número de milissegundos desde 1º de janeiro de 1970, 00:00:00 UTC (conhecido como "época" ou "epoch").

```javascript
// Exemplo prático do timestamp
const data = new Date();
console.log(data.getTime()); // milissegundos desde 1970
console.log(typeof data.getTime()); // number

// Convertendo timestamp de volta para data
const dataDoTimestamp = new Date(1749051737792); // timestamp da var data
console.log(data);
console.log(dataDoTimestamp);
```

## 🔧 Diferentes Formas de Criar Objetos Date

### 1. Data Atual

```javascript
const hoje = new Date();
console.log(hoje);
```

### 2. A partir de String (CUIDADO!)

```javascript
// ✅ Formato padrão ISO (recomendado)
const nascimento = new Date('1995-12-17T15:30:00');

// ⚠️ Formato brasileiro - pode não funcionar em todos os navegadores
const nascimento2 = new Date('17/12/1995'); // EVITE!

// ✅ Formato americano mais seguro
const nascimento3 = new Date('December 17, 1995 15:30:00');
```

### 3. A partir de Parâmetros Individuais

```javascript
// new Date(ano, mês, dia, hora, minuto, segundo, milissegundo)
// ATENÇÃO: Mês é indexado em 0! (0 = Janeiro, 11 = Dezembro)
const aniversario = new Date(1995, 11, 17, 15, 30, 0); // 17 de dezembro
console.log(aniversario); // Sun Dec 17 1995 15:30:00
```

### 4. A partir de Timestamp

```javascript
const dataEspecifica = new Date(628021800000);
console.log(dataEspecifica);
```

## 📊 Métodos para Obter Informações

### Métodos de Tempo Local

```javascript
const data = new Date('2023-12-17T15:30:45');

// Obtendo componentes da data
console.log(data.getFullYear()); // 2023 (ano completo)
console.log(data.getMonth()); // 11 (dezembro - lembre-se: 0-indexado!)
console.log(data.getDate()); // 17 (dia do mês)
console.log(data.getDay()); // Dia da semana (0=domingo, 6=sábado)

// Obtendo componentes do horário
console.log(data.getHours()); // 15 (horas)
console.log(data.getMinutes()); // 30 (minutos)
console.log(data.getSeconds()); // 45 (segundos)
console.log(data.getMilliseconds()); // 0 (milissegundos)
```

### Métodos UTC (Tempo Universal)

```javascript
// Mesmos métodos, mas para UTC (sem considerar fuso horário local)
console.log(data.getUTCFullYear()); // Ano em UTC
console.log(data.getUTCMonth()); // Mês em UTC
console.log(data.getUTCDate()); // Dia em UTC
console.log(data.getUTCHours()); // Horas em UTC
```

## ✏️ Métodos para Modificar Datas

```javascript
const data = new Date();

// Modificando componentes
data.setFullYear(2025); // Define o ano
data.setMonth(5); // Define junho (lembre-se: 0-indexado!)
data.setDate(15); // Define o dia 15
data.setHours(10, 30, 0); // Define 10:30:00

console.log(data); // A data foi modificada!
```

## 🌍 Formatação de Datas

### Métodos de Formatação Básicos

```javascript
const data = new Date('2023-12-17T15:30:45');

console.log(data.toString()); // "Sun Dec 17 2023 15:30:45 GMT-0300"
console.log(data.toDateString()); // "Sun Dec 17 2023"
console.log(data.toTimeString()); // "15:30:45 GMT-0300"
console.log(data.toISOString()); // "2023-12-17T18:30:45.000Z"
```

### Formatação Localizada (Recomendado!)

```javascript
const data = new Date();

// Formatação brasileira
console.log(data.toLocaleDateString('pt-BR')); // "17/12/2023"
console.log(data.toLocaleTimeString('pt-BR')); // "15:30:45"
console.log(data.toLocaleString('pt-BR')); // "17/12/2023 15:30:45"

// Com opções personalizadas
const opcoes = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
console.log(data.toLocaleDateString('pt-BR', opcoes));
// "domingo, 17 de dezembro de 2023"
```

## ⚡ Métodos Estáticos Úteis

```javascript
// Data atual em timestamp
const agora = Date.now();
console.log(agora); // 1702316445000

// Convertendo string para timestamp
const timestamp = Date.parse('2023-12-17T15:30:45');
console.log(timestamp); // 1702831845000

// Criando timestamp para UTC
const timestampUTC = Date.UTC(2023, 11, 17, 15, 30, 45);
console.log(timestampUTC); // 1702824645000
```

## 🧮 Exemplo Prático: Calculando Diferenças de Tempo

```javascript
function calcularIdade(dataNascimento) {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  // Diferença em milissegundos
  const diferenca = hoje - nascimento;

  // Convertendo para anos
  const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

  return anos;
}

// Testando
console.log(calcularIdade('1995-12-17')); // Idade calculada
```

## ⚠️ Armadilhas Importantes

### 1. Meses são 0-indexados!

```javascript
// ERRO COMUM: tentar criar 17 de dezembro
const errado = new Date(2023, 12, 17); // Janeiro de 2024! (mês 12 overflow)
const correto = new Date(2023, 11, 17); // Dezembro de 2023 ✅
```

### 2. Anos de 2 dígitos

```javascript
// Comportamento inconsistente
const data1 = new Date(98, 11, 17); // 1998
const data2 = new Date(22, 11, 17); // 1922
const data3 = new Date('12/17/22'); // 2022

// Use sempre 4 dígitos!
const correto = new Date(2022, 11, 17); // ✅
```

# Formatação de Datas com `toLocaleDateString()` - Opções Avançadas 🌍

## 🎯 O que são as Opções do toLocaleDateString?

O método `toLocaleDateString()` aceita um segundo parâmetro com opções de formatação baseadas no `Intl.DateTimeFormat`. Isso nos dá controle total sobre como a data será exibida!

### Sintaxe Básica

```javascript
data.toLocaleDateString(locale, options);
```

## 📊 Categorias de Opções

### 1. Opções de Locale (Localização)

```javascript
const data = new Date('2023-12-17T15:30:45');

// Definindo o sistema de calendário
console.log(
  data.toLocaleDateString('pt-BR', {
    calendar: 'gregory', // Calendário gregoriano (padrão)
  })
);

// Sistema de numeração
console.log(
  data.toLocaleDateString('ar-EG', {
    numberingSystem: 'arab', // Números árabes
  })
);

// Ciclo de horas (12h vs 24h)
console.log(
  data.toLocaleDateString('pt-BR', {
    hour12: true, // Usar formato 12h
    timeZone: 'America/Sao_Paulo',
  })
);
```

### 2. Opções de Componentes de Data

#### **Dia da Semana (weekday)**

```javascript
const opcoes = [
  { weekday: 'long' }, // "domingo"
  { weekday: 'short' }, // "dom"
  { weekday: 'narrow' }, // "D"
];

opcoes.forEach((opcao) => {
  console.log(data.toLocaleDateString('pt-BR', opcao));
});
```

#### **Era**

```javascript
const dataAntiga = new Date(-1000, 0, 1); // Ano 1000 A.C.

console.log(
  dataAntiga.toLocaleDateString('pt-BR', {
    era: 'long', // "antes de Cristo"
    year: 'numeric',
  })
);

console.log(
  dataAntiga.toLocaleDateString('pt-BR', {
    era: 'short', // "a.C."
    year: 'numeric',
  })
);
```

#### **Ano (year)**

```javascript
console.log(
  data.toLocaleDateString('pt-BR', {
    year: 'numeric', // "2023"
  })
);

console.log(
  data.toLocaleDateString('pt-BR', {
    year: '2-digit', // "23"
  })
);
```

#### **Mês (month)**

```javascript
const opcoesMonth = [
  { month: 'numeric' }, // "12"
  { month: '2-digit' }, // "12"
  { month: 'long' }, // "dezembro"
  { month: 'short' }, // "dez"
  { month: 'narrow' }, // "D"
];

opcoesMonth.forEach((opcao) => {
  console.log(data.toLocaleDateString('pt-BR', opcao));
});
```

#### **Dia (day)**

```javascript
console.log(
  data.toLocaleDateString('pt-BR', {
    day: 'numeric', // "17"
  })
);

console.log(
  data.toLocaleDateString('pt-BR', {
    day: '2-digit', // "17"
  })
);
```

## 🕐 Opções de Horário (quando usado com toLocaleString)

```javascript
// Quando você quiser data E hora
const dataHora = new Date('2023-12-17T15:30:45');

// Período do dia
console.log(
  dataHora.toLocaleString('pt-BR', {
    hour: 'numeric',
    dayPeriod: 'long', // "da tarde"
    hour12: true,
  })
);

// Hora, minuto, segundo
console.log(
  dataHora.toLocaleString('pt-BR', {
    hour: '2-digit', // "15"
    minute: '2-digit', // "30"
    second: '2-digit', // "45"
    fractionalSecondDigits: 3, // milissegundos
  })
);
```

## 🌍 Fusos Horários (timeZone)

```javascript
const agora = new Date();

// Diferentes fusos horários
const fusos = [
  'America/Sao_Paulo',
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'UTC',
];

fusos.forEach((fuso) => {
  console.log(
    `${fuso}: ${agora.toLocaleString('pt-BR', {
      timeZone: fuso,
      timeZoneName: 'short',
    })}`
  );
});
```

### Nomes de Fuso Horário (timeZoneName)

```javascript
const opcoesFuso = [
  'long', // "Horário Padrão de Brasília"
  'short', // "BRT"
  'shortOffset', // "GMT-3"
  'longOffset', // "GMT-03:00"
  'shortGeneric', // "Horário de Brasília"
  'longGeneric', // "Horário de Brasília"
];

opcoesFuso.forEach((opcao) => {
  console.log(
    agora.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      timeZoneName: opcao,
    })
  );
});
```

## 🎨 Atalhos de Estilo (Style Shortcuts)

### dateStyle e timeStyle

```javascript
// Atalhos para formatação rápida
const estilos = ['full', 'long', 'medium', 'short'];

estilos.forEach((estilo) => {
  console.log(
    `${estilo}: ${data.toLocaleDateString('pt-BR', {
      dateStyle: estilo,
    })}`
  );
});

// Saída:
// full: "domingo, 17 de dezembro de 2023"
// long: "17 de dezembro de 2023"
// medium: "17 de dez. de 2023"
// short: "17/12/2023"
```

## 💡 Exemplos Práticos Avançados

### 1. Formatador de Data Brasileiro Completo

```javascript
function formatarDataBrasileira(data, opcoes = {}) {
  const opcoesDefault = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Sao_Paulo',
    ...opcoes,
  };

  return data.toLocaleDateString('pt-BR', opcoesDefault);
}

// Testando
const hoje = new Date();
console.log(formatarDataBrasileira(hoje));
// "domingo, 17 de dezembro de 2023"

console.log(
  formatarDataBrasileira(hoje, {
    weekday: 'short',
    month: 'short',
  })
);
// "dom, 17 de dez de 2023"
```

### 2. Comparador de Datas em Diferentes Locales

```javascript
function compararFormatos(data) {
  const locales = [
    { codigo: 'pt-BR', nome: 'Brasileiro' },
    { codigo: 'en-US', nome: 'Americano' },
    { codigo: 'en-GB', nome: 'Britânico' },
    { codigo: 'fr-FR', nome: 'Francês' },
    { codigo: 'de-DE', nome: 'Alemão' },
    { codigo: 'ja-JP', nome: 'Japonês' },
  ];

  const opcoes = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  locales.forEach(({ codigo, nome }) => {
    console.log(`${nome}: ${data.toLocaleDateString(codigo, opcoes)}`);
  });
}

compararFormatos(new Date());
```

### 3. Gerador de Relatórios com Data Personalizada

```javascript
function gerarCabecalhoRelatorio(data, tipoRelatorio) {
  const configs = {
    completo: {
      dateStyle: 'full',
      timeStyle: 'medium',
    },
    simples: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    mensal: {
      year: 'numeric',
      month: 'long',
    },
    anual: {
      year: 'numeric',
    },
  };

  const config = configs[tipoRelatorio] || configs.simples;

  return `Relatório gerado em: ${data.toLocaleDateString('pt-BR', config)}`;
}

// Testando
const agora = new Date();
console.log(gerarCabecalhoRelatorio(agora, 'completo'));
console.log(gerarCabecalhoRelatorio(agora, 'mensal'));
```

## ⚠️ Dicas Importantes

### 1. Compatibilidade de Opções

```javascript
// ❌ ERRO: Não misture dateStyle com componentes individuais
const data = new Date();

// Isso vai dar erro!
try {
  data.toLocaleDateString('pt-BR', {
    dateStyle: 'full',
    year: 'numeric', // Conflito!
  });
} catch (error) {
  console.log('Erro:', error.message);
}

// ✅ CORRETO: Use uma ou outra abordagem
console.log(data.toLocaleDateString('pt-BR', { dateStyle: 'full' }));
// OU
console.log(
  data.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
);
```

### 2. Fallbacks para Locales

```javascript
// Use arrays para fallbacks
const locale = new Intl.NumberFormat().resolvedOptions().locale; // obter o locale do usuario
const formatador = new Date().toLocaleDateString(['pt-BR', 'pt', 'en'], {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
```

## 🏆 Exercício Prático Avançado

Vou te dar um desafio mais complexo:

```javascript
/**
 * Crie uma função que:
 * 1. Receba uma data e um tipo de evento
 * 2. Formate a data conforme o contexto:
 *    - 'reuniao': formato completo com horário
 *    - 'aniversario': só data, formato amigável
 *    - 'deadline': data e hora, com urgência
 * 3. Considere o fuso horário brasileiro
 */

function formatarDataEvento(data, tipoEvento, locale = 'pt-BR') {
  // Seu código aqui!
  // Dica: use switch/case para os diferentes tipos
}

// Teste com:
const evento = new Date('2024-01-15T14:30:00');
console.log(formatarDataEvento(evento, 'reuniao'));
console.log(formatarDataEvento(evento, 'aniversario'));
console.log(formatarDataEvento(evento, 'deadline'));
```
