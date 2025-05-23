# Semana 1 — JavaScript ES 6+ Essentials (8 h)

Objetivo: revisar/consolidar o JavaScript moderno que você realmente usará em React, mapeando mentalmente as diferenças em relação ao Python.

---

## 0. Pré-requisitos

- Editor configurado (VS Code) com:
  - Extensão **ESLint** (airbnb ou standard)
  - **Prettier**
  - Ambiente Node ≥ 18 (`node -v`)
- Conta no GitHub para publicar o _learning-log_.

---

## Visão macro da semana

| Dia | Carga | Tema principal                                                           | Entregável                     |
| --- | ----- | ------------------------------------------------------------------------ | ------------------------------ |
| 1   | 2 h   | Variáveis, tipos e Template Literals                                     | “Hello, JS ES6” repo           |
| 2   | 2 h   | Funções (clássicas × arrow) e `this`                                     | katas CodeWars                 |
| 3   | 2 h   | Destructuring, spread/rest, objetos/arrays imutáveis                     | snippet comparando Python ↔ JS |
| 4   | 2 h   | Módulos (`import/export`) + Laboratório de conversão de 5 scripts Python | Gist com 5 scripts             |

Total: 8 h

---

## Dia 1 – Variáveis, tipos e interpolação

1. Leitura guiada (25 min)
   MDN → _let_, _const_, _var_; diferenças de escopo e _hoisting_.
2. Hands-on (45 min)
   ```bash
   mkdir js-es6-week1 && cd $_
   npm init -y
   touch index.js
   ```
   Dentro de `index.js`:
   - Crie constantes numéricas, booleanas, strings.
   - Use _template literals_ para montar:
     ```js
     const name = 'Ana';
     console.log(
       `Olá, ${name}! Hoje é ${new Date().toLocaleDateString('pt-BR')}`
     );
     ```
3. Kata rápida (30 min)
   CodeWars nível 8kyu: “Even or Odd”, “Opposite number”.
4. Diário de bordo (20 min)
   Commit “day 1 – var vs let/const, template literals”.

🚩 Pontos de atenção

- `let` não é o “novo var”; ele respeita escopo de bloco.
- `typeof null === 'object'` é um _quirk_ famoso.

---

## Dia 2 – Funções e `this`

1. Revisão expressa (15 min)
   Diferença sintaxe clássica × _arrow_:
   ```js
   function sum(a, b) {
     return a + b;
   }
   const sumArrow = (a, b) => a + b;
   ```
2. Leitura + experimentos (45 min)
   _arrow functions_: ausência de `arguments`, _binding_ léxico de `this`, retorno implícito.
3. Exercícios (45 min)
   a. Converta 3 funções clássicas em arrow, verifique se mudam de comportamento quando usadas como _callbacks_ de `setTimeout`.
   b. Re-implemente o _map_ de array manualmente (callback + `push`).
4. Kata CodeWars (15 min)
   “Remove First and Last Character” usando arrow + template literals.

🚩 Comparação Python → JS

- `lambda` é sempre expressão; em JS, arrow pode conter bloco.
- Não há _keyword-only args_, mas você ganha _destructuring_ (dia 3).

---

## Dia 3 – Destructuring, Spread & Rest

1. Destructuring arrays/objetos (30 min)
   ```js
   const [first, , third] = ['a', 'b', 'c'];
   const { id, ...userWithoutId } = { id: 1, name: 'Ana' };
   ```
2. Spread/rest operator (30 min)
   _Clone_ superficial de objetos, concat de arrays, parâmetros variádicos.
3. Prática guiada (45 min)
   Reescreva estas construções Python em JS:
   - `a, *_, c = [1,2,3]`
   - `def somar(*args): return sum(args)`
4. Cheatsheet pessoal (15 min)
   Crie `cheatsheet.md` com equivalências Python ↔ JavaScript.

---

## Dia 4 – Módulos ES 2015 + Mini-projeto

1. Conceito (20 min)
   Diferença entre módulo CommonJS (`require`) e ES Modules (`import/export`).
2. Setup (10 min)
   Ative `"type": "module"` em `package.json`.
3. Laboratório “Python → JS” (80 min)
   Escolha 5 scripts Python que você domina (ex.: conversor de temperatura, fibonacci, calculadora de IMC, palíndromo, contagem de palavras).
   Para cada script:
   a. Crie um arquivo `.mjs` (ex.: `fibonacci.mjs`).
   b. Exporte a função principal:
   ```js
   export function fibonacci(n) { ... }
   ```
   c. Importe em `index.mjs` e rode `node index.mjs`.
4. Publicação (10 min)
   - Gist “week1-python-to-js”.
   - Issue no repositório principal listando **dúvidas abertas** (ex.: _como debugar modules no Node?_).

---

## Check-list de compreensão

Marque ✓ quando conseguir:

- [ ] Explicar por que `const` não torna um objeto imutável.
- [ ] Mostrar dois casos onde `this` muda dependendo de arrow × função.
- [ ] Usar rest parameters para aceitar número variável de argumentos.
- [ ] Importar 2 funções de módulos diferentes em um único arquivo.

---

## Recursos para aprofundar (opcionais)

- Livro gratuito: _You Don’t Know JS Yet – Scope & Closures_ (cap. 2-5).
- Série de vídeos “ES6 for Everyone” – Wes Bos (aulas 1-7 são gratuitas).
- Artigo MDN “Destructuring assignment”.

---

## Entregáveis finais da semana

1. Repositório `js-es6-week1` com:
   - `index.mjs` rodando os 5 scripts convertidos.
   - `cheatsheet.md`.
2. Print do seu dashboard CodeWars mostrando ≥ 5 katas concluídas.
3. Resumo em até 200 palavras no _learning-log_ sobre diferenças Python ↔ JS percebidas.

Parabéns! Ao fechar a semana você terá vocabulário ES 6 sólido para entrar nos componentes React na semana 2.
