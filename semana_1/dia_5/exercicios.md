## 📚 50 Exercícios de JavaScript - Arrays, Objetos e Destructuring/Spread/Rest

### 🟢 NÍVEL BÁSICO (1-20)

#### **Exercício 1 - Criação de Objetos**

```javascript
// Crie um objeto 'livro' com as propriedades: titulo, autor, ano e disponivel (boolean)
// Depois, acesse e imprima o título do livro

// Sua solução:
```

#### **Exercício 2 - Acessando Propriedades**

```javascript
const produto = {
  nome: 'Notebook',
  preco: 3500,
  estoque: 15,
};

// Acesse o preço usando notação de ponto e notação de colchetes
// Adicione uma propriedade 'categoria' com valor 'Eletrônicos'
// Delete a propriedade 'estoque'

// Sua solução:
```

#### **Exercício 3 - Arrays Básicos**

```javascript
// Crie um array com 5 frutas
// Adicione uma fruta no final
// Remova a primeira fruta
// Encontre o índice da fruta 'banana'

// Sua solução:
```

#### **Exercício 4 - Object.keys() e Object.values()**

```javascript
const carro = {
  marca: 'Toyota',
  modelo: 'Corolla',
  ano: 2022,
};

// Use Object.keys() para listar todas as propriedades
// Use Object.values() para listar todos os valores
// Use Object.entries() para criar um array de pares [chave, valor]

// Sua solução:
```

#### **Exercício 5 - Array Push e Pop**

```javascript
const numeros = [10, 20, 30];

// Adicione 40 e 50 ao final do array
// Remova o último elemento
// Qual é o novo comprimento do array?

// Sua solução:
```

#### **Exercício 6 - Destructuring Básico de Objetos**

```javascript
const usuario = {
  nome: 'Maria',
  idade: 25,
  cidade: 'Rio de Janeiro',
};

// Use destructuring para extrair nome e idade
// Renomeie 'cidade' para 'localidade' durante a desestruturação

// Sua solução:
```

#### **Exercício 7 - Destructuring Básico de Arrays**

```javascript
const cores = ['vermelho', 'verde', 'azul', 'amarelo'];

// Use destructuring para pegar a primeira e terceira cor
// Use rest operator para pegar todas as cores exceto a primeira

// Sua solução:
```

#### **Exercício 8 - Spread com Arrays**

```javascript
const numeros1 = [1, 2, 3];
const numeros2 = [4, 5, 6];

// Combine os dois arrays usando spread
// Adicione o número 0 no início e 7 no final

// Sua solução:
```

#### **Exercício 9 - Spread com Objetos**

```javascript
const dadosBasicos = { nome: 'João', idade: 30 };
const dadosContato = { email: 'joao@email.com', telefone: '123456' };

// Combine os dois objetos em um novo objeto 'pessoa'
// Adicione uma propriedade 'ativo: true'

// Sua solução:
```

#### **Exercício 10 - Array Map Básico**

```javascript
const precos = [10, 20, 30, 40, 50];

// Use map para criar um novo array com todos os preços dobrados
// Use map para criar um array de strings: "R$ 10", "R$ 20", etc.

// Sua solução:
```

#### **Exercício 11 - Array Filter Básico**

```javascript
const idades = [15, 22, 18, 30, 17, 25, 16, 40];

// Filtre apenas as idades maiores ou iguais a 18
// Filtre apenas as idades entre 20 e 30 (inclusive)

// Sua solução:
```

#### **Exercício 12 - Rest Parameters**

```javascript
// Crie uma função 'multiplicar' que aceite qualquer quantidade de números
// e retorne o produto de todos eles
// Exemplo: multiplicar(2, 3, 4) deve retornar 24

// Sua solução:
```

#### **Exercício 13 - Verificando Propriedades**

```javascript
const pessoa = {
  nome: 'Ana',
  profissao: 'Desenvolvedora',
};

// Verifique se existe a propriedade 'idade' (use 2 métodos diferentes)
// Adicione 'idade: 28' apenas se ela não existir

// Sua solução:
```

#### **Exercício 14 - Array Includes e IndexOf**

```javascript
const tecnologias = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];

// Verifique se 'React' está no array
// Encontre o índice de 'JavaScript'
// Verifique se 'Python' está no array

// Sua solução:
```

#### **Exercício 15 - Objeto com Método**

```javascript
// Crie um objeto 'calculadora' com propriedades a e b (números)
// e um método 'somar' que retorna a + b

// Sua solução:
```

#### **Exercício 16 - Array Join**

```javascript
const palavras = ['JavaScript', 'é', 'uma', 'linguagem', 'incrível'];

// Use join para criar a frase com espaços
// Use join para criar a frase com hífens

// Sua solução:
```

#### **Exercício 17 - Modificando Arrays**

```javascript
const letras = ['a', 'b', 'c', 'd', 'e'];

// Use splice para remover 'c'
// Use splice para adicionar 'x' e 'y' depois de 'b'

// Sua solução:
```

#### **Exercício 18 - Object.assign()**

```javascript
const config1 = { tema: 'claro', fonte: 12 };
const config2 = { tema: 'escuro', idioma: 'pt-BR' };

// Use Object.assign para mesclar as configurações
// Crie uma cópia de config1 sem modificar o original

// Sua solução:
```

#### **Exercício 19 - Array Find**

```javascript
const usuarios = [
  { id: 1, nome: 'João', ativo: true },
  { id: 2, nome: 'Maria', ativo: false },
  { id: 3, nome: 'Pedro', ativo: true },
];

// Encontre o usuário com id = 2
// Encontre o primeiro usuário ativo

// Sua solução:
```

#### **Exercício 20 - Valor Padrão em Destructuring**

```javascript
const config = { tema: 'escuro' };

// Use destructuring para extrair tema, fonte (padrão: 14) e idioma (padrão: 'pt-BR')

// Sua solução:
```

### 🟡 NÍVEL INTERMEDIÁRIO (21-40)

#### **Exercício 21 - Array Reduce**

```javascript
const vendas = [
  { produto: 'Notebook', valor: 3000 },
  { produto: 'Mouse', valor: 50 },
  { produto: 'Teclado', valor: 150 },
  { produto: 'Monitor', valor: 800 },
];

// Use reduce para calcular o valor total das vendas
// Use reduce para criar um objeto com os produtos como chaves e valores como valores

// Sua solução:
```

#### **Exercício 22 - Desestruturação Aninhada**

```javascript
const empresa = {
  nome: 'TechCorp',
  endereco: {
    rua: 'Rua A',
    numero: 123,
    cidade: {
      nome: 'São Paulo',
      estado: 'SP',
    },
  },
};

// Use destructuring para extrair: nome da empresa, rua e nome da cidade
// Renomeie 'nome' da cidade para 'nomeCidade'

// Sua solução:
```

#### **Exercício 23 - Array Every e Some**

```javascript
const notas = [7.5, 8.0, 6.5, 9.0, 8.5];

// Verifique se todas as notas são maiores ou iguais a 6
// Verifique se alguma nota é igual a 10
// Verifique se todas as notas estão entre 5 e 10

// Sua solução:
```

#### **Exercício 24 - Clonagem Profunda**

```javascript
const usuario = {
  nome: 'Ana',
  configuracoes: {
    tema: 'escuro',
    notificacoes: {
      email: true,
      push: false,
    },
  },
};

// Crie uma função que faça uma cópia profunda do objeto
// Modifique a cópia sem afetar o original

// Sua solução:
```

#### **Exercício 25 - Array FlatMap**

```javascript
const turmas = [
  { nome: 'Turma A', alunos: ['João', 'Maria'] },
  { nome: 'Turma B', alunos: ['Pedro', 'Ana', 'Carlos'] },
  { nome: 'Turma C', alunos: ['Lucas'] },
];

// Use flatMap para criar um array com todos os alunos
// Use flatMap para criar array de objetos { aluno, turma }

// Sua solução:
```

#### **Exercício 26 - Spread Condicional**

```javascript
// Crie uma função criarUsuario que recebe nome, email e opcionalmente dados extras
// Se o usuário for admin, adicione propriedades especiais

function criarUsuario(nome, email, isAdmin = false, dadosExtras = {}) {
  // Implemente a função usando spread condicional
}

// Sua solução:
```

#### **Exercício 27 - Array Sort Complexo**

```javascript
const produtos = [
  { nome: 'Notebook', preco: 3000, estoque: 5 },
  { nome: 'Mouse', preco: 50, estoque: 100 },
  { nome: 'Teclado', preco: 150, estoque: 0 },
  { nome: 'Monitor', preco: 800, estoque: 15 },
];

// Ordene por preço (crescente)
// Ordene por estoque (decrescente)
// Ordene por nome (alfabética)

// Sua solução:
```

#### **Exercício 28 - Object.fromEntries()**

```javascript
const queryString = 'nome=João&idade=30&cidade=SP';

// Converta a query string em um objeto usando fromEntries
// Dica: use split e map antes

// Sua solução:
```

#### **Exercício 29 - Manipulação Complexa de Arrays**

```javascript
const dados = [
  { categoria: 'eletrônicos', produto: 'notebook', valor: 3000 },
  { categoria: 'eletrônicos', produto: 'mouse', valor: 50 },
  { categoria: 'livros', produto: 'JavaScript', valor: 80 },
  { categoria: 'livros', produto: 'Python', valor: 75 },
  { categoria: 'eletrônicos', produto: 'teclado', valor: 150 },
];

// Agrupe produtos por categoria
// Calcule o valor total por categoria
// Encontre a categoria com maior valor total

// Sua solução:
```

#### **Exercício 30 - Rest e Spread Combinados**

```javascript
// Crie uma função que remove propriedades específicas de um objeto
function omitir(objeto, ...propriedadesParaRemover) {
  // Use rest e spread para implementar
}

// Teste: omitir({a: 1, b: 2, c: 3, d: 4}, 'b', 'd')
// deve retornar {a: 1, c: 3}

// Sua solução:
```

#### **Exercício 31 - Array Slice e Paginação**

```javascript
const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

// Crie uma função paginar(array, pagina, itensPorPagina)
// que retorna os items da página especificada

// Sua solução:
```

#### **Exercício 32 - Destructuring em Loops**

```javascript
const vendas = [
  { mes: 'Jan', valor: 10000, custos: 7000 },
  { mes: 'Fev', valor: 12000, custos: 8000 },
  { mes: 'Mar', valor: 15000, custos: 9000 },
];

// Use destructuring no loop para calcular o lucro de cada mês
// Crie um novo array com objetos { mes, lucro }

// Sua solução:
```

#### **Exercício 33 - Objeto Dinâmico**

```javascript
const campos = ['nome', 'email', 'telefone'];
const valores = ['Ana Silva', 'ana@email.com', '(11) 98765-4321'];

// Crie um objeto combinando campos e valores dinamicamente
// Use reduce ou outra abordagem

// Sua solução:
```

#### **Exercício 34 - Array Unique com Set**

```javascript
const numeros = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5];
const nomes = ['Ana', 'João', 'Ana', 'Maria', 'João', 'Pedro'];

// Remova duplicatas usando Set e spread
// Crie uma função generica removerDuplicatas(array)

// Sua solução:
```

#### **Exercício 35 - Nested Object Update**

```javascript
const estado = {
  usuario: {
    dados: {
      nome: 'Carlos',
      email: 'carlos@email.com',
    },
    configuracoes: {
      tema: 'claro',
      idioma: 'pt',
    },
  },
};

// Crie uma função para atualizar propriedades aninhadas sem mutar
// atualizarProfundo(estado, 'usuario.configuracoes.tema', 'escuro')

// Sua solução:
```

#### **Exercício 36 - Array Reduce Avançado**

```javascript
const transacoes = [
  { tipo: 'entrada', valor: 1000, categoria: 'salário' },
  { tipo: 'saida', valor: 200, categoria: 'alimentação' },
  { tipo: 'saida', valor: 500, categoria: 'aluguel' },
  { tipo: 'entrada', valor: 300, categoria: 'freelance' },
  { tipo: 'saida', valor: 150, categoria: 'transporte' },
];

// Use reduce para calcular:
// - Total de entradas
// - Total de saídas
// - Saldo final
// - Gastos por categoria

// Sua solução:
```

#### **Exercício 37 - Função Pipeline**

```javascript
// Crie uma função pipeline que aplica várias transformações em sequência
const pipeline =
  (...funcoes) =>
  (valorInicial) => {
    // Implemente usando reduce
  };

// Teste:
const adicionar5 = (x) => x + 5;
const multiplicar2 = (x) => x * 2;
const subtrair3 = (x) => x - 3;

const resultado = pipeline(adicionar5, multiplicar2, subtrair3)(10);
// (10 + 5) * 2 - 3 = 27

// Sua solução:
```

#### **Exercício 38 - Merge Profundo de Arrays**

```javascript
const config1 = {
  cores: ['azul', 'verde'],
  tamanhos: { pequeno: 10, medio: 20 },
  ativo: true,
};

const config2 = {
  cores: ['vermelho'],
  tamanhos: { medio: 25, grande: 30 },
  debug: true,
};

// Crie uma função que mescla objetos profundamente
// Arrays devem ser concatenados, não substituídos

// Sua solução:
```

#### **Exercício 39 - Factory com Destructuring**

```javascript
// Crie uma factory function para produtos
function criarProduto({
  nome,
  preco = 0,
  categoria = 'Geral',
  ...outrasProps
}) {
  // Valide os dados
  // Calcule preço com imposto (15%)
  // Retorne objeto formatado
}

// Sua solução:
```

#### **Exercício 40 - Array Methods Chain**

```javascript
const funcionarios = [
  { nome: 'Ana', departamento: 'TI', salario: 5000, ativo: true },
  { nome: 'Carlos', departamento: 'RH', salario: 4000, ativo: true },
  { nome: 'João', departamento: 'TI', salario: 6000, ativo: false },
  { nome: 'Maria', departamento: 'TI', salario: 5500, ativo: true },
  { nome: 'Pedro', departamento: 'RH', salario: 4500, ativo: true },
];

// Use encadeamento de métodos para:
// 1. Filtrar apenas funcionários ativos
// 2. Filtrar apenas do departamento TI
// 3. Mapear para ter nome e salário com bônus de 10%
// 4. Ordenar por salário (com bônus) decrescente

// Sua solução:
```

### 🔴 NÍVEL AVANÇADO (41-45)

#### **Exercício 41 - Proxy e Reflect**

```javascript
// Crie um objeto reativo usando Proxy
// Quando uma propriedade for modificada, console.log a mudança
// Implemente validação para idade (deve ser número entre 0 e 150)

function criarObjetoReativo(objeto) {
  // Use Proxy para interceptar get e set
}

// Sua solução:
```

#### **Exercício 42 - Iterator Customizado**

```javascript
// Crie um objeto Range que seja iterável
// range(1, 5) deve permitir: for (const n of range(1, 5))
// Deve produzir: 1, 2, 3, 4, 5

class Range {
  constructor(inicio, fim) {
    // Implemente
  }

  // Implemente Symbol.iterator
}

// Sua solução:
```

#### **Exercício 43 - Memoização com WeakMap**

```javascript
// Implemente uma função de memoização que funcione com objetos como argumentos
// Use WeakMap para evitar vazamentos de memória

function memoize(fn) {
  // Implemente usando WeakMap
}

// Teste com função que calcula propriedades de objetos
const calcularArea = memoize((forma) => {
  console.log('Calculando...');
  return forma.largura * forma.altura;
});

// Sua solução:
```

#### **Exercício 44 - Deep Freeze Recursivo**

```javascript
// Implemente uma função que congela objetos profundamente
// Deve congelar objetos aninhados e arrays

function deepFreeze(obj) {
  // Implemente recursivamente
}

// Teste:
const config = deepFreeze({
  api: {
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
    },
    keys: ['key1', 'key2'],
  },
});

// Sua solução:
```

#### **Exercício 45 - Object Path Parser**

```javascript
// Crie funções para acessar/modificar objetos usando caminhos string
// get(obj, 'a.b.c')
// set(obj, 'a.b.c', value)
// has(obj, 'a.b.c')

function get(objeto, caminho, valorPadrao) {
  // Implemente
}

function set(objeto, caminho, valor) {
  // Implemente (retorna novo objeto, imutável)
}

function has(objeto, caminho) {
  // Implemente
}

// Sua solução:
```

### 🏆 DESAFIOS (46-50)

#### **Desafio 46 - Sistema de Query em Arrays**

```javascript
// Implemente um sistema de query similar ao MongoDB
class ArrayQuery {
  constructor(data) {
    this.data = data;
  }

  where(condicoes) {
    // Filtra baseado em condições
    // Suporte: $gt, $lt, $eq, $in, $regex
  }

  select(campos) {
    // Seleciona apenas campos específicos
  }

  orderBy(campo, ordem = 'asc') {
    // Ordena resultados
  }

  limit(n) {
    // Limita resultados
  }

  execute() {
    // Retorna resultado final
  }
}

// Exemplo de uso:
// new ArrayQuery(users)
//   .where({ idade: { $gt: 18 }, cidade: { $in: ['SP', 'RJ'] } })
//   .select(['nome', 'email'])
//   .orderBy('idade', 'desc')
//   .limit(10)
//   .execute()

// Sua solução:
```

#### **Desafio 47 - Immutable State Manager**

```javascript
// Crie um gerenciador de estado imutável
class StateManager {
  constructor(initialState) {
    // Implemente
  }

  getState() {
    // Retorna cópia do estado
  }

  setState(updates) {
    // Atualiza estado (imutável)
    // Suporte para função updater
  }

  subscribe(listener) {
    // Adiciona listener para mudanças
    // Retorna função unsubscribe
  }

  // Adicione histórico de estados
  undo() {
    // Volta ao estado anterior
  }

  redo() {
    // Avança para próximo estado
  }
}

// Sua solução:
```

#### **Desafio 48 - Schema Validator**

```javascript
// Crie um validador de schema para objetos
const schema = {
  nome: { type: 'string', required: true, min: 3, max: 50 },
  idade: { type: 'number', required: true, min: 0, max: 150 },
  email: {
    type: 'string',
    required: true,
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  telefone: { type: 'string', required: false },
  endereco: {
    type: 'object',
    properties: {
      rua: { type: 'string', required: true },
      numero: { type: 'number', required: true },
      cidade: { type: 'string', required: true },
    },
  },
  hobbies: {
    type: 'array',
    items: { type: 'string' },
    min: 1,
    max: 5,
  },
};

function validate(objeto, schema) {
  // Retorna { valid: boolean, errors: array }
}

// Sua solução:
```

#### **Desafio 49 - Observable Pattern**

```javascript
// Implemente o padrão Observable para objetos e arrays
class Observable {
  constructor(target) {
    // Implemente
  }

  // Deve detectar:
  // - Mudanças em propriedades
  // - Adições/remoções em arrays
  // - Mudanças profundas

  observe(path, callback) {
    // Observa mudanças em caminho específico
  }

  unobserve(path, callback) {
    // Remove observer
  }

  // Batch updates
  batch(updates) {
    // Agrupa várias mudanças em uma notificação
  }
}

// Sua solução:
```

#### **Desafio 50 - JSON Parser Customizado**

```javascript
// Crie um parser JSON que suporte:
// - Comentários (// e /* */)
// - Trailing commas
// - Strings com aspas simples
// - Undefined como valor válido

function parseJSON(str) {
  // Implemente o parser
  // Dica: use regex para pre-processar
}

// Teste:
const json = `{
  // Configurações do usuário
  'nome': 'João',
  'idade': 30,
  'ativo': true,
  'config': {
    'tema': 'escuro', // pode ter vírgula no final
  },
  /* Dados opcionais */
  'extra': undefined,
}`;

// Sua solução:
```

---

## 📌 Dicas para Resolução

1. **Básicos (1-20)**: Foque em entender a sintaxe e comportamento básico
2. **Intermediários (21-40)**: Combine múltiplos conceitos e métodos
3. **Avançados (41-45)**: Explore features avançadas do JavaScript
4. **Desafios (46-50)**: Crie soluções completas e reutilizáveis

### 🎯 Como praticar:

- Resolva um exercício por vez
- Teste seu código com diferentes casos
- Compare com soluções alternativas
- Refatore para melhorar performance/legibilidade
