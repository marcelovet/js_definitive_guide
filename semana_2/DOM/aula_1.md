# 🌟 Document Object Model (DOM)

## 📋 O que vamos aprender hoje?

1. O que é o DOM e por que é importante
2. Como o DOM representa uma página web
3. A relação entre DOM e JavaScript
4. Tipos de dados fundamentais no DOM
5. Principais interfaces e métodos
6. Exemplos práticos para fixar o conceito

---

## 🤔 O que é o DOM?

Imagine que você tem um documento HTML - uma página web. O **DOM é como uma representação "viva" desse documento na memória do navegador**, organizando todos os elementos como uma árvore de objetos que podemos manipular.

### 🌳 Analogia da Árvore Genealógica

Pense no DOM como uma árvore genealógica da sua página:

- O documento HTML é a "raiz da família"
- Cada tag HTML (`<div>`, `<p>`, `<h1>`) é um "membro da família"
- Os elementos podem ter "filhos" (elementos dentro deles) e "pais" (elementos que os contêm)

```html
<!-- Este HTML simples... -->
<html>
  <head>
    <title>Minha Página</title>
  </head>
  <body>
    <h1>Título Principal</h1>
    <p>Um parágrafo de texto.</p>
  </body>
</html>
```

Se transforma nesta estrutura no DOM:

```
document (raiz)
└── html
    ├── head
    │   └── title
    │       └── "Minha Página" (texto)
    └── body
        ├── h1
        │   └── "Título Principal" (texto)
        └── p
            └── "Um parágrafo de texto." (texto)
```

---

## 🔗 DOM e JavaScript: Uma Parceria Poderosa

**Ponto importante**: O DOM **NÃO é parte do JavaScript**! É uma **Web API** que o JavaScript pode usar para interagir com páginas web.

### 💡 Como funciona essa interação?

```javascript
// JavaScript "conversando" com o DOM
const titulo = document.querySelector('h1'); // Busca o elemento h1
titulo.textContent = 'Novo Título!'; // Modifica o texto
titulo.style.color = 'blue'; // Muda a cor
```

**Analogia**: Imagine que o DOM é uma casa e o JavaScript é um morador. O JavaScript pode:

- Abrir e fechar portas (mostrar/ocultar elementos)
- Reorganizar móveis (mover elementos)
- Pintar paredes (mudar estilos)
- Adicionar ou remover cômodos (criar/deletar elementos)

---

## 📊 Tipos Fundamentais de Dados no DOM

Vamos conhecer os "personagens principais" do DOM:

### 1. **Document** 🏠

O objeto raiz que representa toda a página.

```javascript
console.log(document.title); // Título da página
console.log(document.URL); // URL atual
```

### 2. **Node** 🔗

Qualquer "coisa" no DOM é um nó (texto, elementos, comentários).

### 3. **Element** 🧱

Os elementos HTML (`<div>`, `<p>`, `<button>`, etc.).

```javascript
const botao = document.createElement('button');
botao.textContent = 'Clique aqui!';
```

### 4. **NodeList** 📋

Uma lista de elementos (como um array, mas não exatamente).

```javascript
const paragrafos = document.querySelectorAll('p');
console.log(paragrafos.length); // Quantos parágrafos existem
```

---

## 🛠️ Principais Métodos para Trabalhar com DOM

### 🔍 **Encontrando Elementos**

```javascript
// Por ID
const elemento = document.getElementById('meuId');

// Por classe CSS
const elementos = document.getElementsByClassName('minhaClasse');

// Por seletor CSS (mais moderno e flexível)
const umElemento = document.querySelector('.classe');
const todosElementos = document.querySelectorAll('p.destaque');
```

### ✨ **Criando e Modificando Elementos**

```javascript
// Criar novo elemento
const novaDiv = document.createElement('div');

// Adicionar texto
novaDiv.textContent = 'Sou uma nova div!';

// Adicionar ao documento
document.body.appendChild(novaDiv);

// Modificar atributos
novaDiv.setAttribute('class', 'nova-classe');
```

### 🎨 **Modificando Estilos**

```javascript
const elemento = document.querySelector('#meuElemento');

// Modificar estilos diretamente
elemento.style.backgroundColor = 'lightblue';
elemento.style.fontSize = '20px';

// Adicionar/remover classes CSS
elemento.classList.add('destaque');
elemento.classList.remove('antigo');
elemento.classList.toggle('ativo'); // Liga/desliga a classe
```

---

## 💻 Exemplo Prático: Lista de Tarefas Simples

Vamos criar um exemplo que demonstra vários conceitos do DOM:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Minha Lista de Tarefas</title>
    <style>
      .container {
        max-width: 400px;
        margin: 50px auto;
        font-family: Arial, sans-serif;
      }
      .tarefa {
        padding: 10px;
        margin: 5px 0;
        background: #f0f0f0;
        border-left: 4px solid #007bff;
      }
      .tarefa.concluida {
        background: #d4edda;
        border-left-color: #28a745;
        text-decoration: line-through;
      }
      button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        margin: 5px;
        cursor: pointer;
        border-radius: 4px;
      }
      button:hover {
        background: #0056b3;
      }
      input[type='text'] {
        padding: 8px;
        width: 200px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📝 Minha Lista de Tarefas</h1>

      <!-- Formulário para adicionar tarefas -->
      <div>
        <input
          type="text"
          id="novaTarefa"
          placeholder="Digite uma nova tarefa..."
        />
        <button id="adicionarBtn">Adicionar</button>
      </div>

      <!-- Container onde as tarefas aparecerão -->
      <div id="listaTarefas"></div>

      <!-- Botão para limpar todas as tarefas -->
      <button id="limparBtn">Limpar Todas</button>
    </div>

    <script>
      // 1. ENCONTRAR ELEMENTOS NO DOM
      const inputNovaTarefa = document.getElementById('novaTarefa');
      const btnAdicionar = document.getElementById('adicionarBtn');
      const btnLimpar = document.getElementById('limparBtn');
      const listaTarefas = document.getElementById('listaTarefas');

      // 2. FUNÇÃO PARA CRIAR UMA NOVA TAREFA
      function criarTarefa(texto) {
        // Criar o elemento div para a tarefa
        const divTarefa = document.createElement('div');
        divTarefa.className = 'tarefa';

        // Criar o texto da tarefa
        const spanTexto = document.createElement('span');
        spanTexto.textContent = texto;

        // Criar botão "Concluir"
        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = '✓ Concluir';
        btnConcluir.style.background = '#28a745';

        // Criar botão "Remover"
        const btnRemover = document.createElement('button');
        btnRemover.textContent = '🗑️ Remover';
        btnRemover.style.background = '#dc3545';

        // 3. ADICIONAR EVENT LISTENERS
        btnConcluir.addEventListener('click', function () {
          divTarefa.classList.toggle('concluida');
          // Mudar o texto do botão baseado no estado
          if (divTarefa.classList.contains('concluida')) {
            btnConcluir.textContent = '↻ Desfazer';
          } else {
            btnConcluir.textContent = '✓ Concluir';
          }
        });

        btnRemover.addEventListener('click', function () {
          // Remover a tarefa do DOM
          listaTarefas.removeChild(divTarefa);
        });

        // 4. MONTAR A ESTRUTURA
        divTarefa.appendChild(spanTexto);
        divTarefa.appendChild(btnConcluir);
        divTarefa.appendChild(btnRemover);

        return divTarefa;
      }

      // 5. FUNCTION PARA ADICIONAR TAREFA
      function adicionarTarefa() {
        const texto = inputNovaTarefa.value.trim();

        if (texto === '') {
          alert('Por favor, digite uma tarefa!');
          return;
        }

        // Criar e adicionar a tarefa
        const novaTarefa = criarTarefa(texto);
        listaTarefas.appendChild(novaTarefa);

        // Limpar o campo de input
        inputNovaTarefa.value = '';
        inputNovaTarefa.focus(); // Voltar foco para o input
      }

      // 6. EVENTOS PRINCIPAIS
      btnAdicionar.addEventListener('click', adicionarTarefa);

      // Permitir adicionar tarefa pressionando Enter
      inputNovaTarefa.addEventListener('keypress', function (evento) {
        if (evento.key === 'Enter') {
          adicionarTarefa();
        }
      });

      // Limpar todas as tarefas
      btnLimpar.addEventListener('click', function () {
        if (confirm('Tem certeza que deseja remover todas as tarefas?')) {
          listaTarefas.innerHTML = ''; // Remove todos os filhos
        }
      });

      // 7. INICIALIZAÇÃO
      window.addEventListener('load', function () {
        inputNovaTarefa.focus(); // Focar no input quando a página carregar
        console.log('Lista de tarefas carregada!');
      });
    </script>
  </body>
</html>
```

---

## 🔑 Pontos-Chave para Lembrar

### ✅ **O que o DOM faz**

- Transforma HTML em objetos JavaScript manipuláveis
- Permite mudanças dinâmicas na página
- Fornece estrutura hierárquica (árvore) dos elementos

### ✅ **Métodos essenciais**

- `document.querySelector()` / `querySelectorAll()` - encontrar elementos
- `document.createElement()` - criar novos elementos
- `appendChild()` / `removeChild()` - adicionar/remover elementos
- `addEventListener()` - reagir a eventos do usuário

### ✅ **Boas práticas**

- Sempre verificar se um elemento existe antes de manipulá-lo (el === null)
- Usar `addEventListener()` em vez de atributos HTML como `onclick`
- Separar JavaScript do HTML para melhor organização

---
