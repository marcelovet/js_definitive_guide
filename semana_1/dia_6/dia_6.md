# Objects, arrays e destructuring/Spread/Rest

## 🔍 Conceitos Fundamentais Adicionais

### Acesso a Propriedades por Índice Zero

```javascript
// Arrays começam no índice 0
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[0]); // → 2 (primeiro elemento)
console.log(listOfNumbers[2]); // → 5 (terceiro elemento)
console.log(listOfNumbers[2 - 1]); // → 3 (cálculo de índice)

// O índice representa quantos elementos pular desde o início
// Índice 0 = não pula nenhum (primeiro)
// Índice 1 = pula 1 (segundo)
// Índice 2 = pula 2 (terceiro)
```

### Propriedades com Nomes Especiais

```javascript
// Propriedades com espaços ou caracteres especiais precisam de aspas
let descriptions = {
  work: 'Went to work',
  'touched tree': 'Touched a tree', // nome com espaço
  123: 'Número como string', // números como chave
  'kebab-case': 'Com hífen', // nomes com hífen
};

// Acessar essas propriedades
console.log(descriptions['touched tree']); // → "Touched a tree"
console.log(descriptions['123']); // → "Número como string"
// descriptions.touched tree // ❌ SyntaxError!
```

## 🧬 Protótipos e Herança Prototípica

### Sistema de Protótipos em JavaScript

```javascript
// Todo objeto tem um protótipo do qual herda propriedades
let empty = {};
console.log(empty.toString); // → function toString()…{}
console.log(empty.toString()); // → [object Object]

// Verificando protótipos
console.log(Object.getPrototypeOf({}) === Object.prototype); // → true
console.log(Object.getPrototypeOf(Object.prototype)); // → null

// Arrays herdam de Array.prototype
console.log(Object.getPrototypeOf([]) === Array.prototype); // → true

// Que por sua vez herda de Object.prototype
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // → true
```

### Criando Objetos com Protótipos Específicos

```javascript
// Criando um protótipo
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};

// Criando objetos que herdam do protótipo
let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = 'black';
blackRabbit.speak('I am fear and darkness');
// → The black rabbit says 'I am fear and darkness'

// O método speak vem do protótipo
console.log(blackRabbit.hasOwnProperty('speak')); // → false
console.log(blackRabbit.hasOwnProperty('type')); // → true
```

## 🏗️ Classes em JavaScript

### Sintaxe Moderna de Classes (ES6+)

```javascript
class Rabbit {
  // Propriedades de instância
  speed = 0;

  constructor(type) {
    this.type = type;
  }

  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }

  // Getter
  get description() {
    return `A ${this.type} rabbit`;
  }

  // Setter
  set age(value) {
    if (value < 0) throw new Error('Age cannot be negative');
    this._age = value;
  }

  // Método estático
  static createWhiteRabbit() {
    return new Rabbit('white');
  }
}

let killerRabbit = new Rabbit('killer');
killerRabbit.speak('SKREEE!'); // → The killer rabbit says 'SKREEE!'

// Usando método estático
let whiteRabbit = Rabbit.createWhiteRabbit();
```

### Propriedades Privadas

```javascript
class SecretiveObject {
  #privateField = 42;
  #privateMethod() {
    return 'This is secret';
  }

  revealSecret() {
    return this.#privateMethod() + ' and the number is ' + this.#privateField;
  }
}

let secretive = new SecretiveObject();
console.log(secretive.revealSecret()); // → "This is secret and the number is 42"
// console.log(secretive.#privateField); // ❌ SyntaxError
```

## 🗺️ Map vs Object

### Problemas com Objetos como Maps

```javascript
// Objetos têm propriedades herdadas que podem causar conflitos
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62,
};

console.log("Is toString's age known?", 'toString' in ages); // → true (problema!)
console.log(ages.toString); // → function toString() {...}

// Solução 1: Criar objeto sem protótipo
let betterAges = Object.create(null);
betterAges.Boris = 39;
console.log('toString' in betterAges); // → false

// Solução 2: Usar Object.hasOwn
console.log(Object.hasOwn(ages, 'Boris')); // → true
console.log(Object.hasOwn(ages, 'toString')); // → false
```

### Classe Map Nativa

```javascript
// Map é a estrutura adequada para mapeamentos chave-valor
let ages = new Map();
ages.set('Boris', 39);
ages.set('Liang', 22);
ages.set('Júlia', 62);

console.log(`Júlia is ${ages.get('Júlia')}`); // → Júlia is 62
console.log("Is Jack's age known?", ages.has('Jack')); // → false
console.log(ages.has('toString')); // → false

// Métodos úteis de Map
console.log(ages.size); // → 3
ages.delete('Boris');
ages.clear(); // remove todos

// Iterando sobre Map
ages.set('Ana', 25);
ages.set('João', 30);

for (let [name, age] of ages) {
  console.log(`${name} tem ${age} anos`);
}

// Convertendo para array
let entries = [...ages]; // Array de [chave, valor]
let keys = [...ages.keys()]; // Array de chaves
let values = [...ages.values()]; // Array de valores
```

## 🔄 Polimorfismo e Interfaces

### Implementando toString Personalizado

```javascript
// Sobrescrevendo toString para comportamento customizado
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

let point = new Point(3, 4);
console.log(String(point)); // → "(3, 4)"
console.log(`Point: ${point}`); // → "Point: (3, 4)"

// Arrays têm seu próprio toString
console.log([1, 2, 3].toString()); // → "1,2,3"
console.log(Object.prototype.toString.call([1, 2, 3])); // → "[object Array]"
```

### Duck Typing e Interfaces Array-like

```javascript
// Objetos array-like (têm length e índices numéricos)
let arrayLike = {
  0: 'A',
  1: 'B',
  2: 'C',
  length: 3,
};

// Métodos de array funcionam com objetos array-like
Array.prototype.forEach.call(arrayLike, (elt, i) => {
  console.log(`${i}: ${elt}`);
});
// → 0: A
// → 1: B
// → 2: C

// Convertendo para array real
let realArray = Array.from(arrayLike);
console.log(realArray); // → ["A", "B", "C"]
```

## 🎭 Symbols - Propriedades Únicas

### Criação e Uso de Symbols

```javascript
// Symbols são valores únicos e imutáveis
let sym1 = Symbol('name');
let sym2 = Symbol('name');
console.log(sym1 === sym2); // → false (sempre únicos!)

// Usando symbols como propriedades
const id = Symbol('id');
const internalMethod = Symbol('internalMethod');

class User {
  constructor(name) {
    this.name = name;
    this[id] = Math.random(); // propriedade "escondida"
  }

  [internalMethod]() {
    return `Internal: ${this.name}`;
  }

  publicMethod() {
    return this[internalMethod](); // pode acessar internamente
  }
}

let user = new User('João');
console.log(user.name); // → "João"
console.log(user[id]); // → 0.8394720938 (precisa do symbol para acessar)
console.log(Object.keys(user)); // → ["name"] (symbols não aparecem)
```

### Symbols Conhecidos (Well-known Symbols)

```javascript
// Symbol.iterator - define como o objeto é iterado
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    let end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      },
    };
  }
}

let range = new Range(1, 5);
console.log([...range]); // → [1, 2, 3, 4, 5]

for (let num of range) {
  console.log(num); // → 1, 2, 3, 4, 5
}
```

## 🎨 Exemplo Prático Completo: Sistema de Análise de Dados

```javascript
// Sistema completo usando todos os conceitos abordados
class DataAnalyzer {
  #data = [];
  #correlationCache = new Map();

  constructor(initialData = []) {
    this.#data = [...initialData]; // cópia defensiva
  }

  // Adicionar entrada no formato do diário do licantropo
  addEntry(events, outcome) {
    this.#data.push({
      events: [...events], // cópia para evitar mutação
      outcome,
      timestamp: new Date(),
    });
    this.#correlationCache.clear(); // limpa cache
  }

  // Calcular tabela de contingência
  #tableFor(event) {
    let table = [0, 0, 0, 0];

    for (let entry of this.#data) {
      let index = 0;
      if (entry.events.includes(event)) index += 1;
      if (entry.outcome) index += 2;
      table[index] += 1;
    }

    return table;
  }

  // Calcular coeficiente phi (correlação)
  #phi([n00, n01, n10, n11]) {
    return (
      (n11 * n00 - n10 * n01) /
      Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10))
    );
  }

  // Calcular correlação com cache
  correlationFor(event) {
    if (this.#correlationCache.has(event)) {
      return this.#correlationCache.get(event);
    }

    const table = this.#tableFor(event);
    const correlation = this.#phi(table);
    this.#correlationCache.set(event, correlation);

    return correlation;
  }

  // Encontrar todos os eventos únicos
  get allEvents() {
    const events = new Set();

    for (let entry of this.#data) {
      for (let event of entry.events) {
        events.add(event);
      }
    }

    return [...events].sort();
  }

  // Análise completa
  analyze(threshold = 0.1) {
    const results = {};

    for (let event of this.allEvents) {
      const correlation = this.correlationFor(event);

      if (Math.abs(correlation) > threshold) {
        results[event] = {
          correlation,
          strength:
            Math.abs(correlation) > 0.5
              ? 'strong'
              : Math.abs(correlation) > 0.3
              ? 'moderate'
              : 'weak',
          direction: correlation > 0 ? 'positive' : 'negative',
        };
      }
    }

    return results;
  }

  // Iterator para percorrer dados
  [Symbol.iterator]() {
    return this.#data[Symbol.iterator]();
  }

  // Converter para JSON
  toJSON() {
    return {
      data: this.#data,
      totalEntries: this.#data.length,
      analyzedAt: new Date(),
    };
  }

  // Método estático para criar do JSON
  static fromJSON(json) {
    const parsed = typeof json === 'string' ? JSON.parse(json) : json;
    return new DataAnalyzer(parsed.data);
  }
}

// Uso do sistema
const analyzer = new DataAnalyzer();

// Adicionando dados
analyzer.addEntry(['work', 'pizza', 'running'], false);
analyzer.addEntry(['work', 'ice cream', 'peanuts'], true);
analyzer.addEntry(['weekend', 'peanuts'], true);
analyzer.addEntry(['work', 'pizza'], false);

// Análise
console.log('Correlação com peanuts:', analyzer.correlationFor('peanuts'));
console.log('\nAnálise completa:');
console.log(analyzer.analyze());

// Serialização
const json = JSON.stringify(analyzer);
const restored = DataAnalyzer.fromJSON(json);
console.log('\nDados restaurados:', restored.allEvents);
```

## 🎯 Herança e Composição

### Implementando Herança com extends

```javascript
// Classe base
class Animal {
  constructor(name) {
    this.name = name;
    this.energy = 100;
  }

  eat(amount) {
    this.energy += amount;
    console.log(`${this.name} ganhou ${amount} de energia`);
  }

  move(distance) {
    this.energy -= distance;
    console.log(`${this.name} se moveu ${distance}m`);
  }
}

// Classe derivada
class Bird extends Animal {
  constructor(name, canFly = true) {
    super(name); // DEVE chamar super() primeiro!
    this.canFly = canFly;
  }

  fly(distance) {
    if (!this.canFly) {
      console.log(`${this.name} não pode voar!`);
      return;
    }

    super.move(distance * 0.5); // voo é mais eficiente
    console.log(`${this.name} voou!`);
  }
}

// Múltiplos níveis de herança
class Penguin extends Bird {
  constructor(name) {
    super(name, false); // pinguins não voam
  }

  swim(distance) {
    super.move(distance * 0.3); // nadar é muito eficiente
    console.log(`${this.name} nadou!`);
  }
}

const sparrow = new Bird('Pardal');
sparrow.fly(100); // usa 50 de energia

const penguin = new Penguin('Pingu');
penguin.fly(100); // "Pingu não pode voar!"
penguin.swim(100); // usa 30 de energia
```

### Verificação de Tipos com instanceof

```javascript
// instanceof verifica toda a cadeia de protótipos
console.log(sparrow instanceof Bird); // → true
console.log(sparrow instanceof Animal); // → true
console.log(sparrow instanceof Object); // → true
console.log(sparrow instanceof Penguin); // → false

console.log(penguin instanceof Penguin); // → true
console.log(penguin instanceof Bird); // → true
console.log(penguin instanceof Animal); // → true

// Verificação de tipos nativos
console.log([] instanceof Array); // → true
console.log([] instanceof Object); // → true
console.log(new Date() instanceof Date); // → true
console.log(/regex/ instanceof RegExp); // → true
```

## 🌟 Exemplo Avançado: Sistema de Componentes UI

```jsx type=react
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Tag,
  Calendar,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

// Demonstração prática de Objects, Arrays, Destructuring e Classes
export default function DataStructuresDemo() {
  // Estado usando destructuring
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Classe para gerenciar dados (conceito de POO)
  class JournalEntry {
    constructor(events, isSquirrel) {
      this.id = Date.now() + Math.random();
      this.events = [...events]; // spread para cópia
      this.isSquirrel = isSquirrel;
      this.date = new Date();
    }

    hasEvent(event) {
      return this.events.includes(event);
    }

    get summary() {
      const eventCount = this.events.length;
      const status = this.isSquirrel ? '🐿️ Transformado' : '👤 Normal';
      return `${status} - ${eventCount} eventos`;
    }
  }

  // Dados iniciais
  useEffect(() => {
    const sampleEntries = [
      new JournalEntry(['trabalho', 'pizza', 'corrida'], false),
      new JournalEntry(['trabalho', 'sorvete', 'amendoim'], true),
      new JournalEntry(['fim de semana', 'amendoim', 'cerveja'], true),
      new JournalEntry(['trabalho', 'pizza', 'televisão'], false),
      new JournalEntry(['fim de semana', 'ciclismo', 'amendoim'], true),
    ];
    setEntries(sampleEntries);
  }, []);

  // Função para calcular correlação
  const calculateCorrelation = (event) => {
    let table = [0, 0, 0, 0];

    entries.forEach((entry) => {
      let index = 0;
      if (entry.hasEvent(event)) index += 1;
      if (entry.isSquirrel) index += 2;
      table[index] += 1;
    });

    const [n00, n01, n10, n11] = table; // destructuring
    const phi =
      (n11 * n00 - n10 * n01) /
      Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10));

    return isNaN(phi) ? 0 : phi;
  };

  // Extrair todos os eventos únicos
  const getAllEvents = () => {
    const eventSet = new Set();
    entries.forEach(({ events }) => {
      // destructuring no parâmetro
      events.forEach((event) => eventSet.add(event));
    });
    return [...eventSet].sort(); // spread de Set para Array
  };

  // Filtrar entradas
  const filteredEntries = entries.filter((entry) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'squirrel' && entry.isSquirrel) ||
      (filter === 'normal' && !entry.isSquirrel);

    const matchesSearch =
      searchTerm === '' ||
      entry.events.some((event) =>
        event.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  // Análise de correlações
  const correlationAnalysis = getAllEvents()
    .map((event) => ({
      event,
      correlation: calculateCorrelation(event),
      occurrences: entries.filter((e) => e.hasEvent(event)).length,
    }))
    .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

  // Adicionar nova entrada
  const addEntry = () => {
    const possibleEvents = [
      'trabalho',
      'pizza',
      'corrida',
      'amendoim',
      'sorvete',
      'televisão',
      'leitura',
      'ciclismo',
      'cerveja',
      'fim de semana',
    ];

    // Selecionar eventos aleatórios
    const eventCount = Math.floor(Math.random() * 4) + 2;
    const selectedEvents = [];

    for (let i = 0; i < eventCount; i++) {
      const randomEvent =
        possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
      if (!selectedEvents.includes(randomEvent)) {
        selectedEvents.push(randomEvent);
      }
    }

    // Maior chance de transformação com amendoim
    const hasSquirrel = selectedEvents.includes('amendoim')
      ? Math.random() > 0.2
      : Math.random() > 0.8;

    const newEntry = new JournalEntry(selectedEvents, hasSquirrel);
    setEntries([...entries, newEntry]); // spread para criar novo array
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Sistema de Análise: Diário do Licantropo 🐿️
        </h1>
        <p className="text-blue-100">
          Demonstração prática de Objects, Arrays, Destructuring e Classes em
          JavaScript
        </p>
      </div>

      {/* Controles */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Busca */}
          <div className="flex-1 min-w-48">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filtro */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as entradas</option>
              <option value="squirrel">Apenas transformações</option>
              <option value="normal">Apenas normal</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Botões */}
          <button
            onClick={addEntry}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Adicionar Entrada
          </button>

          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            {showAnalysis ? 'Ocultar' : 'Mostrar'} Análise
          </button>
        </div>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <AlertCircle className="w-4 h-4" />
          <span>
            Total de entradas: {entries.length} | Transformações:{' '}
            {entries.filter((e) => e.isSquirrel).length}
          </span>
        </div>
      </div>

      {/* Lista de Entradas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Entradas do Diário</h2>
        </div>

        <div className="divide-y">
          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhuma entrada encontrada
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const { id, events, isSquirrel, date, summary } = entry; // destructuring

              return (
                <div
                  key={id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {isSquirrel ? '🐿️' : '👤'}
                        </span>
                        <span className="font-medium">{summary}</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {date.toLocaleDateString('pt-BR')}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {events.map((event, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            <Tag className="w-3 h-3" />
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Análise de Correlação */}
      {showAnalysis && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">Análise de Correlação</h2>
            <p className="text-sm text-gray-600 mt-1">
              Coeficiente Phi entre eventos e transformações
            </p>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              {correlationAnalysis.map(
                ({ event, correlation, occurrences }) => {
                  const percentage = Math.abs(correlation * 100);
                  const isPositive = correlation > 0;
                  const isStrong = Math.abs(correlation) > 0.3;

                  return (
                    <div key={event} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium capitalize">
                            {event}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({occurrences} ocorrências)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              isPositive ? 'text-red-600' : 'text-green-600'
                            }`}
                          >
                            {correlation.toFixed(3)}
                          </span>
                          {isStrong && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                isPositive
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {isPositive ? 'Aumenta' : 'Diminui'} chance
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isPositive ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                Como interpretar:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • Valores próximos a <strong>+1</strong>: forte correlação
                  positiva (aumenta chance de transformação)
                </li>
                <li>
                  • Valores próximos a <strong>-1</strong>: forte correlação
                  negativa (diminui chance de transformação)
                </li>
                <li>
                  • Valores próximos a <strong>0</strong>: sem correlação
                  significativa
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Código de Exemplo */}
      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
        <div className="text-sm font-mono whitespace-pre">
          <span className="text-green-400">
            // Exemplo de uso dos conceitos apresentados
          </span>
          {'\n'}
          <span className="text-blue-400">const</span> entrada = {'\u007B'}
          {'\n'} eventos: [<span className="text-yellow-300">'trabalho'</span>, <span className="text-yellow-300">
            'amendoim'
          </span>],
          {'\n'} esquilo: <span className="text-purple-400">true</span>
          {'\n'}
          {'\u007D'};{'\n'}
          {'\n'}
          <span className="text-green-400">// Destructuring</span>
          {'\n'}
          <span className="text-blue-400">const</span> {'\u007B'} eventos,
          esquilo {'\u007D'} = entrada;
          {'\n'}
          {'\n'}
          <span className="text-green-400">// Spread operator</span>
          {'\n'}
          <span className="text-blue-400">const</span> novaEntrada = {'\u007B'} ...entrada,
          data: <span className="text-blue-400">new</span> <span className="text-yellow-400">
            Date
          </span>() {'\u007D'};{'\n'}
          {'\n'}
          <span className="text-green-400">// Array methods</span>
          {'\n'}
          <span className="text-blue-400">const</span> temAmendoim = eventos.<span className="text-purple-400">
            includes
          </span>(<span className="text-yellow-300">'amendoim'</span>);
          {'\n'}
          <span className="text-blue-400">const</span> eventosUnicos = [...<span className="text-blue-400">
            new
          </span> <span className="text-yellow-400">Set</span>(eventos)];
        </div>
      </div>
    </div>
  );
}
```

## 🎮 Exercício Final Completo: Sistema de Tarefas com Análise

```javascript
// Exercício que combina TODOS os conceitos da aula
class TaskManager {
  #tasks = new Map();
  #tags = new Set();
  #idCounter = 1;

  // Adicionar tarefa com destructuring nos parâmetros
  addTask({
    title,
    description = '',
    tags = [],
    priority = 'medium',
    dueDate = null,
  }) {
    const id = this.#idCounter++;
    const task = {
      id,
      title,
      description,
      tags: [...tags], // cópia defensiva
      priority,
      completed: false,
      createdAt: new Date(),
      dueDate: dueDate ? new Date(dueDate) : null,
      completedAt: null,
    };

    this.#tasks.set(id, task);
    tags.forEach((tag) => this.#tags.add(tag)); // atualiza conjunto de tags

    return { ...task }; // retorna cópia
  }

  // Atualizar tarefa com spread
  updateTask(id, updates) {
    const task = this.#tasks.get(id);
    if (!task) throw new Error(`Task ${id} not found`);

    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date(),
    };

    // Se tem novas tags, adiciona ao conjunto
    if (updates.tags) {
      updates.tags.forEach((tag) => this.#tags.add(tag));
    }

    this.#tasks.set(id, updatedTask);
    return { ...updatedTask };
  }

  // Completar tarefa
  completeTask(id) {
    return this.updateTask(id, {
      completed: true,
      completedAt: new Date(),
    });
  }

  // Buscar com filtros complexos
  findTasks({
    completed,
    priority,
    tags = [],
    dueBefore,
    dueAfter,
    searchTerm = '',
  } = {}) {
    return Array.from(this.#tasks.values()).filter((task) => {
      // Filtro por status
      if (completed !== undefined && task.completed !== completed) {
        return false;
      }

      // Filtro por prioridade
      if (priority && task.priority !== priority) {
        return false;
      }

      // Filtro por tags (deve ter todas as tags especificadas)
      if (tags.length > 0 && !tags.every((tag) => task.tags.includes(tag))) {
        return false;
      }

      // Filtro por data de vencimento
      if (dueBefore && task.dueDate && task.dueDate > new Date(dueBefore)) {
        return false;
      }

      if (dueAfter && task.dueDate && task.dueDate < new Date(dueAfter)) {
        return false;
      }

      // Busca por texto
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term) ||
          task.tags.some((tag) => tag.toLowerCase().includes(term))
        );
      }

      return true;
    });
  }

  // Análise estatística
  getStatistics() {
    const tasks = Array.from(this.#tasks.values());
    const total = tasks.length;

    if (total === 0) {
      return {
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: '0%',
        byPriority: {},
        byTag: {},
        overdue: 0,
      };
    }

    const completed = tasks.filter((t) => t.completed).length;
    const now = new Date();
    const overdue = tasks.filter(
      (t) => !t.completed && t.dueDate && t.dueDate < now
    ).length;

    // Agrupamento por prioridade
    const byPriority = tasks.reduce((acc, task) => {
      const key = task.priority;
      if (!acc[key]) {
        acc[key] = { total: 0, completed: 0 };
      }
      acc[key].total++;
      if (task.completed) acc[key].completed++;
      return acc;
    }, {});

    // Agrupamento por tag
    const byTag = {};
    tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        if (!byTag[tag]) {
          byTag[tag] = { total: 0, completed: 0 };
        }
        byTag[tag].total++;
        if (task.completed) byTag[tag].completed++;
      });
    });

    return {
      total,
      completed,
      pending: total - completed,
      completionRate: ((completed / total) * 100).toFixed(1) + '%',
      byPriority,
      byTag,
      overdue,
      avgCompletionTime: this.#calculateAvgCompletionTime(),
    };
  }

  // Tempo médio de conclusão
  #calculateAvgCompletionTime() {
    const completedTasks = Array.from(this.#tasks.values()).filter(
      (t) => t.completed && t.completedAt
    );

    if (completedTasks.length === 0) return null;

    const totalTime = completedTasks.reduce((sum, task) => {
      return sum + (task.completedAt - task.createdAt);
    }, 0);

    const avgMs = totalTime / completedTasks.length;
    const hours = Math.floor(avgMs / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} dias`;
    return `${hours} horas`;
  }

  // Iterator pattern
  [Symbol.iterator]() {
    return this.#tasks.values();
  }

  // Exportar/Importar dados
  export() {
    return {
      tasks: Array.from(this.#tasks.entries()),
      tags: Array.from(this.#tags),
      lastId: this.#idCounter - 1,
    };
  }

  static import(data) {
    const manager = new TaskManager();
    manager.#tasks = new Map(data.tasks);
    manager.#tags = new Set(data.tags);
    manager.#idCounter = data.lastId + 1;
    return manager;
  }
}

// TESTE DO SISTEMA
const tm = new TaskManager();

// Adicionar tarefas
tm.addTask({
  title: 'Estudar JavaScript',
  description: 'Focar em destructuring e spread',
  tags: ['estudo', 'programação'],
  priority: 'high',
  dueDate: '2024-12-31',
});

tm.addTask({
  title: 'Fazer exercícios',
  tags: ['estudo', 'prática'],
  priority: 'medium',
});

tm.addTask({
  title: 'Revisar código',
  tags: ['trabalho', 'programação'],
  priority: 'low',
});

// Completar tarefa
tm.completeTask(2);

// Buscar tarefas
console.log('Tarefas de estudo:', tm.findTasks({ tags: ['estudo'] }));
console.log('Tarefas pendentes:', tm.findTasks({ completed: false }));

// Estatísticas
console.log('Estatísticas:', tm.getStatistics());

// Iterar sobre todas as tarefas
for (const task of tm) {
  console.log(`- ${task.title} (${task.priority})`);
}

// Exportar e importar
const exported = tm.export();
const imported = TaskManager.import(exported);
console.log('Importado com sucesso:', imported.getStatistics());
```

## 📚 Resumo dos Conceitos Integrados

Esta aula expandida cobriu:

1. **Objects**:

   - Criação e manipulação
   - Métodos importantes (keys, values, entries, assign, freeze, seal)
   - Protótipos e herança prototípica
   - Classes e POO moderna

2. **Arrays**:

   - Métodos que modificam (push, pop, shift, unshift, splice, sort, reverse)
   - Métodos de iteração (map, filter, reduce, find, every, some)
   - Métodos de transformação (slice, concat, flat, flatMap)

3. **Destructuring**:

   - Em objetos e arrays
   - Com valores padrão
   - Aninhado
   - Em parâmetros de função

4. **Spread/Rest**:

   - Spread para expandir elementos
   - Rest para coletar elementos
   - Em objetos e arrays
   - Diferenças e casos de uso

5. **Conceitos Avançados**:
   - Symbols e propriedades únicas
   - Map vs Object
   - Iteradores e iteráveis
   - Herança com extends
   - Polimorfismo e interfaces

Lembre-se: a prática constante é fundamental! Experimente os exemplos, modifique-os e crie suas próprias variações. Tem alguma dúvida sobre algum conceito específico? 😊

## 🎮 Exercícios Práticos

### Exercício 1: Sistema de Eventos

```javascript
// Implemente um EventEmitter usando rest/spread
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, ...handlers) {
    // Adicionar handlers ao evento
  }

  emit(event, ...args) {
    // Emitir evento com argumentos
  }

  off(event, handler) {
    // Remover handler específico
  }
}

// Teste:
const emitter = new EventEmitter();
emitter.on(
  'user:login',
  (user) => console.log(`${user.name} fez login`),
  (user) => console.log(`Último acesso: ${user.lastLogin}`)
);
emitter.emit('user:login', { name: 'Ana', lastLogin: new Date() });
```

### Exercício 2: Função de Formatação

```javascript
// Crie uma função format que funcione assim:
// format("Olá {nome}, você tem {idade} anos", { nome: "João", idade: 30 })
// Retorna: "Olá João, você tem 30 anos"

function format(template, values) {
  // Use destructuring e spread
  // Seu código aqui
}

// Teste com casos complexos:
const user = { nome: 'Maria', cargo: 'Dev', empresa: 'TechCo' };
console.log(format('{nome} é {cargo} na {empresa}', user));
```

### Exercício 3: Middleware System

```javascript
// Crie um sistema de middleware usando rest/spread
class MiddlewareManager {
  use(...middlewares) {
    // Adicionar middlewares
  }

  execute(context) {
    // Executar todos os middlewares em ordem
  }
}

// Exemplo de uso:
const app = new MiddlewareManager();

app.use(
  (ctx, next) => {
    ctx.timestamp = Date.now();
    next();
  },
  (ctx, next) => {
    ctx.user = 'João';
    next();
  },
  (ctx, next) => {
    console.log(ctx);
    next();
  }
);

app.execute({}); // Deve logar objeto com timestamp e user
```

## 💡 Dicas e Boas Práticas

1. **Use destructuring** para tornar o código mais legível
2. **Prefira rest** ao invés de `arguments` em funções
3. **Spread é shallow** - cuidado com objetos aninhados
4. **Combine os três** para código mais expressivo
5. **Performance**: spread/rest podem ser mais lentos em grandes volumes
