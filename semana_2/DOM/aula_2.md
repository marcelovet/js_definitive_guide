# 🚀 Usando o Document Object Model (DOM)

Bem-vindo de volta! Agora que você já conhece os conceitos básicos do DOM, vamos **colocar a mão na massa** e aprender como usar o DOM na prática para criar páginas dinâmicas e interativas!

## 📋 O que vamos aprender hoje?

1. Como navegar pela árvore DOM
2. Ler e modificar elementos existentes
3. Criar novos elementos completamente com JavaScript
4. Técnicas avançadas de manipulação
5. Exercícios práticos para fixar o conhecimento

---

## 🌳 Entendendo a Árvore DOM na Prática

Vamos começar com um exemplo concreto para visualizar como o DOM estrutura uma página:

```html
<html lang="pt-BR">
  <head>
    <title>Meu Documento</title>
  </head>
  <body>
    <h1>Cabeçalho</h1>
    <p>Parágrafo</p>
  </body>
</html>
```

**No DOM, isso se torna uma árvore hierárquica:**

```
document
└── html (lang="pt-BR")
    ├── head
    │   └── title
    │       └── "Meu Documento" (nó de texto)
    └── body
        ├── h1
        │   └── "Cabeçalho" (nó de texto)
        └── p
            └── "Parágrafo" (nó de texto)
```

### 🔍 **Conceito Importante**: Tipos de Nós

```javascript
// Vamos explorar os diferentes tipos de nós
const titulo = document.querySelector('h1');

console.log(titulo.nodeType); // 1 = Element Node
console.log(titulo.nodeName); // "H1"
console.log(titulo.firstChild.nodeType); // 3 = Text Node
console.log(titulo.firstChild.data); // "Cabeçalho"
```

---

## 📖 Lendo e Modificando a Árvore DOM

### 🎯 **Exemplo Prático: Editor Dinâmico de Página**

Vamos criar um exemplo que demonstra como modificar elementos existentes:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Editor Dinâmico</title>
    <style>
      .container {
        max-width: 800px;
        margin: 20px auto;
        font-family: Arial, sans-serif;
        padding: 20px;
      }

      .controls {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      .content {
        background: #fff;
        border: 2px solid #dee2e6;
        padding: 20px;
        border-radius: 8px;
        min-height: 200px;
      }

      button {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 15px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
      }

      button:hover {
        background: #0056b3;
      }

      .highlight {
        background: yellow;
        padding: 2px 4px;
        border-radius: 3px;
      }

      .modified {
        border-left: 4px solid #28a745;
        padding-left: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 id="titulo-principal">🎨 Editor Dinâmico de Página</h1>

      <div class="controls">
        <h3>Controles de Edição</h3>
        <button id="mudar-titulo">Mudar Título</button>
        <button id="mudar-paragrafo">Mudar Parágrafo</button>
        <button id="destacar-texto">Destacar Texto</button>
        <button id="adicionar-paragrafo">Adicionar Parágrafo</button>
        <button id="resetar">Resetar Página</button>
      </div>

      <div class="content">
        <h2 id="subtitulo">Subtítulo Original</h2>
        <p id="paragrafo-principal">
          Este é o parágrafo original. Clique nos botões acima para ver as
          modificações!
        </p>
        <div id="area-dinamica">
          <!-- Novos elementos aparecerão aqui -->
        </div>
      </div>

      <div
        style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 5px;"
      >
        <strong>🔍 Debug Info:</strong>
        <pre id="debug-info">Informações aparecerão aqui...</pre>
      </div>
    </div>

    <script>
      // 1. CAPTURAR REFERÊNCIAS DOS ELEMENTOS
      const tituloprincipal = document.getElementById('titulo-principal');
      const subtitulo = document.getElementById('subtitulo');
      const paragrafoPrincipal = document.getElementById('paragrafo-principal');
      const areaDinamica = document.getElementById('area-dinamica');
      const debugInfo = document.getElementById('debug-info');

      // Botões de controle
      const btnMudarTitulo = document.getElementById('mudar-titulo');
      const btnMudarParagrafo = document.getElementById('mudar-paragrafo');
      const btnDestacar = document.getElementById('destacar-texto');
      const btnAdicionar = document.getElementById('adicionar-paragrafo');
      const btnResetar = document.getElementById('resetar');

      // Função para atualizar informações de debug
      function atualizarDebug() {
        const info = `
Título: "${tituloprincipal.textContent}"
Subtítulo: "${subtitulo.textContent}"
Parágrafo: "${paragrafoPrincipal.textContent.substring(0, 50)}..."
Elementos na área dinâmica: ${areaDinamica.children.length}
Última modificação: ${new Date().toLocaleTimeString()}
            `;
        debugInfo.textContent = info.trim();
      }

      // 2. MODIFICANDO CONTEÚDO DE TEXTO
      btnMudarTitulo.addEventListener('click', function () {
        // Método 1: Usando textContent (mais seguro)
        const novoTitulo = prompt('Digite o novo título:');
        if (novoTitulo) {
          tituloprincipal.textContent = `🎯 ${novoTitulo}`;

          // Adicionar classe para indicar modificação
          tituloprincipal.classList.add('modified');

          atualizarDebug();
        }
      });

      // 3. MODIFICANDO USANDO FIRSTCHILD.DATA (técnica da MDN)
      btnMudarParagrafo.addEventListener('click', function () {
        // Esta é a técnica mostrada na documentação MDN
        const novoParagrafo = prompt('Digite o novo parágrafo:');
        if (novoParagrafo) {
          // Acessar o primeiro nó filho (que é o texto)
          paragrafoPrincipal.firstChild.data = novoParagrafo;

          paragrafoPrincipal.classList.add('modified');
          atualizarDebug();
        }
      });

      // 4. MODIFICANDO ESTILOS E CLASSES
      btnDestacar.addEventListener('click', function () {
        // Alternar destaque no subtítulo
        subtitulo.classList.toggle('highlight');

        // Exemplo de modificação direta de estilo
        if (subtitulo.classList.contains('highlight')) {
          subtitulo.style.transform = 'scale(1.1)';
          subtitulo.style.transition = 'all 0.3s ease';
        } else {
          subtitulo.style.transform = 'scale(1)';
        }

        atualizarDebug();
      });

      // 5. CRIANDO NOVOS ELEMENTOS (técnica da MDN)
      btnAdicionar.addEventListener('click', function () {
        // Criar novo texto
        const novoTexto = document.createTextNode(
          'Este é um novo parágrafo criado dinamicamente!'
        );

        // Criar novo elemento
        const novoElemento = document.createElement('p');

        // Adicionar algumas propriedades
        novoElemento.style.background = '#e8f5e8';
        novoElemento.style.padding = '10px';
        novoElemento.style.margin = '10px 0';
        novoElemento.style.borderRadius = '5px';
        novoElemento.style.border = '1px solid #28a745';

        // Colocar o texto no parágrafo
        novoElemento.appendChild(novoTexto);

        // Adicionar um botão de remoção
        const btnRemover = document.createElement('button');
        btnRemover.textContent = '❌ Remover';
        btnRemover.style.marginLeft = '10px';
        btnRemover.style.background = '#dc3545';

        btnRemover.addEventListener('click', function () {
          // Remover o elemento pai (o parágrafo)
          areaDinamica.removeChild(novoElemento);
          atualizarDebug();
        });

        novoElemento.appendChild(btnRemover);

        // Adicionar ao final da área dinâmica
        areaDinamica.appendChild(novoElemento);

        atualizarDebug();
      });

      // 6. RESETAR TUDO
      btnResetar.addEventListener('click', function () {
        if (confirm('Tem certeza que deseja resetar todas as modificações?')) {
          // Voltar textos originais
          tituloprincipal.textContent = '🎨 Editor Dinâmico de Página';
          subtitulo.textContent = 'Subtítulo Original';
          paragrafoPrincipal.firstChild.data =
            'Este é o parágrafo original. Clique nos botões acima para ver as modificações!';

          // Remover todas as classes
          tituloprincipal.className = '';
          subtitulo.className = '';
          paragrafoPrincipal.className = '';

          // Resetar estilos
          subtitulo.style.cssText = '';

          // Limpar área dinâmica
          areaDinamica.innerHTML = '';

          atualizarDebug();
        }
      });

      // 7. EXEMPLO DE NAVEGAÇÃO NA ÁRVORE DOM
      function demonstrarNavegacao() {
        console.log('=== NAVEGAÇÃO NA ÁRVORE DOM ===');

        // Partir do parágrafo principal
        const para = paragrafoPrincipal;

        console.log('Elemento atual:', para.tagName);
        console.log('Texto do elemento:', para.textContent);
        console.log('Elemento pai:', para.parentNode.className);
        console.log('Próximo irmão:', para.nextElementSibling?.id || 'Nenhum');
        console.log(
          'Irmão anterior:',
          para.previousElementSibling?.tagName || 'Nenhum'
        );
        console.log(
          'Primeiro filho (texto):',
          para.firstChild.nodeType === 3 ? 'É um nó de texto' : 'Não é texto'
        );
      }

      // Executar demonstração quando a página carregar
      window.addEventListener('load', function () {
        atualizarDebug();
        demonstrarNavegacao();

        // Adicionar informação sobre a estrutura da página
        console.log('=== ESTRUTURA DA PÁGINA ===');
        console.log(
          'Total de elementos H1:',
          document.getElementsByTagName('h1').length
        );
        console.log(
          'Total de parágrafos:',
          document.getElementsByTagName('p').length
        );
        console.log(
          'Total de botões:',
          document.getElementsByTagName('button').length
        );
      });
    </script>
  </body>
</html>
```

---

## 🏗️ Criando uma Árvore DOM Completamente em JavaScript

Vamos aprender a técnica mostrada na documentação MDN para criar uma página inteira usando apenas JavaScript:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Criação Dinâmica</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background: #f5f5f5;
      }

      .dynamic-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin: 20px 0;
      }

      .creation-controls {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        margin: 5px;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background: #0056b3;
      }

      .highlight {
        background: #fff3cd;
        padding: 10px;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="creation-controls">
      <h2>🏗️ Construtor de Páginas Dinâmicas</h2>
      <button onclick="criarPaginaCompleta()">Criar Página Completa</button>
      <button onclick="criarFormulario()">Criar Formulário</button>
      <button onclick="criarTabela()">Criar Tabela</button>
      <button onclick="limparTudo()">Limpar Tudo</button>
    </div>

    <div id="container-dinamico">
      <!-- Todo o conteúdo será criado aqui via JavaScript -->
    </div>

    <script>
      const container = document.getElementById('container-dinamico');

      // 1. CRIAR UMA PÁGINA COMPLETA (baseado no exemplo da MDN)
      function criarPaginaCompleta() {
        // Limpar container
        container.innerHTML = '';

        // Criar elemento root da nossa mini-página
        const paginaDiv = document.createElement('div');
        paginaDiv.className = 'dynamic-content';

        // 1. Criar cabeçalho
        const cabecalho = document.createElement('header');
        cabecalho.style.borderBottom = '2px solid #007bff';
        cabecalho.style.paddingBottom = '10px';
        cabecalho.style.marginBottom = '20px';

        const titulo = document.createElement('h1');
        titulo.appendChild(
          document.createTextNode('📄 Página Criada Dinamicamente')
        );
        titulo.style.color = '#007bff';
        titulo.style.margin = '0';

        const subtitulo = document.createElement('p');
        subtitulo.appendChild(
          document.createTextNode(
            'Esta página foi criada inteiramente com JavaScript usando a API DOM'
          )
        );
        subtitulo.style.color = '#6c757d';
        subtitulo.style.fontStyle = 'italic';

        cabecalho.appendChild(titulo);
        cabecalho.appendChild(subtitulo);

        // 2. Criar conteúdo principal
        const main = document.createElement('main');

        // Parágrafo de introdução
        const intro = document.createElement('p');
        intro.appendChild(
          document.createTextNode(
            'Bem-vindo à nossa página criada dinamicamente! Cada elemento que você vê foi criado usando '
          )
        );

        // Texto em destaque
        const codigo = document.createElement('code');
        codigo.appendChild(document.createTextNode('document.createElement()'));
        codigo.style.background = '#f8f9fa';
        codigo.style.padding = '2px 6px';
        codigo.style.borderRadius = '3px';
        codigo.style.border = '1px solid #dee2e6';

        intro.appendChild(codigo);
        intro.appendChild(document.createTextNode(' e '));

        const codigo2 = document.createElement('code');
        codigo2.appendChild(document.createTextNode('appendChild()'));
        codigo2.style.background = '#f8f9fa';
        codigo2.style.padding = '2px 6px';
        codigo2.style.borderRadius = '3px';
        codigo2.style.border = '1px solid #dee2e6';

        intro.appendChild(codigo2);
        intro.appendChild(document.createTextNode('.'));

        main.appendChild(intro);

        // Lista de características
        const listaTitle = document.createElement('h3');
        listaTitle.appendChild(
          document.createTextNode('🎯 Características desta implementação:')
        );
        main.appendChild(listaTitle);

        const lista = document.createElement('ul');

        const caracteristicas = [
          'Criação dinâmica de elementos',
          'Manipulação de estilos via JavaScript',
          'Estrutura hierárquica organizada',
          'Eventos interativos',
          'Conteúdo responsivo',
        ];

        caracteristicas.forEach((carac) => {
          const item = document.createElement('li');
          item.appendChild(document.createTextNode(carac));
          item.style.marginBottom = '5px';
          lista.appendChild(item);
        });

        main.appendChild(lista);

        // 3. Seção interativa
        const secaoInterativa = document.createElement('section');
        secaoInterativa.className = 'highlight';

        const tituloInterativo = document.createElement('h4');
        tituloInterativo.appendChild(
          document.createTextNode('🔄 Seção Interativa')
        );

        const btnInterativo = document.createElement('button');
        btnInterativo.appendChild(
          document.createTextNode('Clique para ver a hora atual')
        );
        btnInterativo.style.display = 'block';
        btnInterativo.style.margin = '10px 0';

        const divHora = document.createElement('div');
        divHora.style.fontWeight = 'bold';
        divHora.style.color = '#28a745';

        btnInterativo.addEventListener('click', function () {
          const agora = new Date();
          divHora.textContent = `⏰ Hora atual: ${agora.toLocaleString(
            'pt-BR'
          )}`;
        });

        secaoInterativa.appendChild(tituloInterativo);
        secaoInterativa.appendChild(btnInterativo);
        secaoInterativa.appendChild(divHora);

        main.appendChild(secaoInterativa);

        // 4. Montar tudo
        paginaDiv.appendChild(cabecalho);
        paginaDiv.appendChild(main);
        container.appendChild(paginaDiv);

        console.log('✅ Página completa criada dinamicamente!');
      }

      // 2. CRIAR FORMULÁRIO DINÂMICO
      function criarFormulario() {
        container.innerHTML = '';

        const formContainer = document.createElement('div');
        formContainer.className = 'dynamic-content';

        const titulo = document.createElement('h2');
        titulo.appendChild(document.createTextNode('📝 Formulário Dinâmico'));
        formContainer.appendChild(titulo);

        const form = document.createElement('form');
        form.style.maxWidth = '400px';

        // Campos do formulário
        const campos = [
          { label: 'Nome:', type: 'text', id: 'nome' },
          { label: 'Email:', type: 'email', id: 'email' },
          { label: 'Idade:', type: 'number', id: 'idade' },
          { label: 'Comentários:', type: 'textarea', id: 'comentarios' },
        ];

        campos.forEach((campo) => {
          const divCampo = document.createElement('div');
          divCampo.style.marginBottom = '15px';

          const label = document.createElement('label');
          label.appendChild(document.createTextNode(campo.label));
          label.style.display = 'block';
          label.style.marginBottom = '5px';
          label.style.fontWeight = 'bold';

          let input;
          if (campo.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 4;
          } else {
            input = document.createElement('input');
            input.type = campo.type;
          }

          input.id = campo.id;
          input.style.width = '100%';
          input.style.padding = '8px';
          input.style.border = '1px solid #ddd';
          input.style.borderRadius = '4px';
          input.style.boxSizing = 'border-box';

          divCampo.appendChild(label);
          divCampo.appendChild(input);
          form.appendChild(divCampo);
        });

        // Botão de submit
        const btnSubmit = document.createElement('button');
        btnSubmit.type = 'submit';
        btnSubmit.appendChild(document.createTextNode('📤 Enviar'));
        btnSubmit.style.width = '100%';
        btnSubmit.style.padding = '12px';
        btnSubmit.style.fontSize = '16px';

        // Div para mostrar resultado
        const resultado = document.createElement('div');
        resultado.style.marginTop = '20px';
        resultado.style.padding = '15px';
        resultado.style.background = '#f8f9fa';
        resultado.style.borderRadius = '5px';
        resultado.style.display = 'none';

        form.addEventListener('submit', function (e) {
          e.preventDefault();

          const dados = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            idade: document.getElementById('idade').value,
            comentarios: document.getElementById('comentarios').value,
          };

          resultado.innerHTML = `
                    <h4>✅ Dados recebidos:</h4>
                    <p><strong>Nome:</strong> ${dados.nome}</p>
                    <p><strong>Email:</strong> ${dados.email}</p>
                    <p><strong>Idade:</strong> ${dados.idade}</p>
                    <p><strong>Comentários:</strong> ${dados.comentarios}</p>
                `;
          resultado.style.display = 'block';
        });

        form.appendChild(btnSubmit);
        formContainer.appendChild(form);
        formContainer.appendChild(resultado);
        container.appendChild(formContainer);

        console.log('✅ Formulário criado dinamicamente!');
      }

      // 3. CRIAR TABELA DINÂMICA
      function criarTabela() {
        container.innerHTML = '';

        const tabelaContainer = document.createElement('div');
        tabelaContainer.className = 'dynamic-content';

        const titulo = document.createElement('h2');
        titulo.appendChild(document.createTextNode('📊 Tabela Dinâmica'));
        tabelaContainer.appendChild(titulo);

        const tabela = document.createElement('table');
        tabela.style.width = '100%';
        tabela.style.borderCollapse = 'collapse';

        // Cabeçalho
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const colunas = ['ID', 'Nome', 'Profissão', 'Cidade'];
        colunas.forEach((coluna) => {
          const th = document.createElement('th');
          th.appendChild(document.createTextNode(coluna));
          th.style.background = '#007bff';
          th.style.color = 'white';
          th.style.padding = '12px';
          th.style.border = '1px solid #ddd';
          th.style.textAlign = 'left';
          headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        tabela.appendChild(thead);

        // Corpo da tabela
        const tbody = document.createElement('tbody');

        const dados = [
          {
            id: 1,
            nome: 'Ana Silva',
            profissao: 'Desenvolvedora',
            cidade: 'São Paulo',
          },
          {
            id: 2,
            nome: 'Carlos Santos',
            profissao: 'Designer',
            cidade: 'Rio de Janeiro',
          },
          {
            id: 3,
            nome: 'Maria Oliveira',
            profissao: 'Product Manager',
            cidade: 'Belo Horizonte',
          },
          {
            id: 4,
            nome: 'João Costa',
            profissao: 'DevOps',
            cidade: 'Porto Alegre',
          },
        ];

        dados.forEach((pessoa, index) => {
          const row = document.createElement('tr');

          // Alternar cores das linhas
          if (index % 2 === 0) {
            row.style.background = '#f8f9fa';
          }

          Object.values(pessoa).forEach((valor) => {
            const td = document.createElement('td');
            td.appendChild(document.createTextNode(valor));
            td.style.padding = '10px';
            td.style.border = '1px solid #ddd';
            row.appendChild(td);
          });

          tbody.appendChild(row);
        });

        tabela.appendChild(tbody);
        tabelaContainer.appendChild(tabela);
        container.appendChild(tabelaContainer);

        console.log('✅ Tabela criada dinamicamente!');
      }

      // 4. LIMPAR TUDO
      function limparTudo() {
        container.innerHTML = '';

        const mensagem = document.createElement('div');
        mensagem.className = 'dynamic-content';
        mensagem.style.textAlign = 'center';
        mensagem.style.color = '#6c757d';

        const icone = document.createElement('div');
        icone.style.fontSize = '48px';
        icone.style.marginBottom = '10px';
        icone.appendChild(document.createTextNode('🧹'));

        const texto = document.createElement('p');
        texto.appendChild(
          document.createTextNode(
            'Área limpa! Clique em um dos botões acima para criar novo conteúdo.'
          )
        );

        mensagem.appendChild(icone);
        mensagem.appendChild(texto);
        container.appendChild(mensagem);

        console.log('✅ Container limpo!');
      }

      // Inicializar com uma mensagem de boas-vindas
      window.addEventListener('load', function () {
        limparTudo();
        console.log('🚀 Sistema de criação dinâmica carregado!');
      });
    </script>
  </body>
</html>
```

---

## 🎯 Técnicas Avançadas de Manipulação DOM

### 1. **Navegação na Árvore DOM**

```javascript
// Diferentes formas de navegar pelos elementos
const elemento = document.querySelector('#meu-elemento');

// Navegação por parentesco
console.log(elemento.parentNode); // Elemento pai
console.log(elemento.parentElement); // Elemento pai (só elementos)
console.log(elemento.children); // Filhos (só elementos)
console.log(elemento.childNodes); // Todos os nós filhos
console.log(elemento.firstElementChild); // Primeiro filho elemento
console.log(elemento.lastElementChild); // Último filho elemento
console.log(elemento.nextElementSibling); // Próximo irmão elemento
console.log(elemento.previousElementSibling); // Irmão anterior elemento

// Navegação por nós (inclui texto e comentários)
console.log(elemento.firstChild); // Primeiro nó filho
console.log(elemento.lastChild); // Último nó filho
console.log(elemento.nextSibling); // Próximo irmão nó
console.log(elemento.previousSibling); // Irmão anterior nó
```

### 2. **Manipulação Avançada de Conteúdo**

```javascript
// Diferentes formas de modificar conteúdo
const div = document.querySelector('#minha-div');

// 1. textContent - apenas texto, seguro contra XSS
div.textContent = 'Apenas texto, sem HTML';

// 2. innerHTML - permite HTML, cuidado com XSS
div.innerHTML = '<strong>Texto em negrito</strong>';

// 3. innerText - considera estilos CSS (visibilidade)
div.innerText = 'Texto visível';

// 4. Manipular nó de texto diretamente (técnica MDN)
if (div.firstChild && div.firstChild.nodeType === 3) {
  div.firstChild.data = 'Novo texto via nó';
}
```

### 3. **Criação e Inserção Avançada**

```javascript
// Diferentes formas de inserir elementos
const container = document.querySelector('#container');
const novoElemento = document.createElement('p');
novoElemento.textContent = 'Novo parágrafo';

// Inserir no final
container.appendChild(novoElemento);

// Inserir no início
container.insertBefore(novoElemento, container.firstChild);

// Inserir antes de um elemento específico
const elementoReferencia = document.querySelector('#referencia');
container.insertBefore(novoElemento, elementoReferencia);

// Métodos modernos (ES6+)
elementoReferencia.insertAdjacentElement('beforebegin', novoElemento); // Antes do elemento
elementoReferencia.insertAdjacentElement('afterbegin', novoElemento); // Primeiro filho
elementoReferencia.insertAdjacentElement('beforeend', novoElemento); // Último filho
elementoReferencia.insertAdjacentElement('afterend', novoElemento); // Depois do elemento
```

---

## 🏋️ Exercícios Práticos

### **Exercício 1: Construtor de Lista Dinâmica**

Crie uma aplicação que permita:

- Adicionar itens a uma lista
- Remover itens específicos
- Editar itens existentes
- Reorganizar itens (mover para cima/baixo)

### **Exercício 2: Galeria de Imagens Dinâmica**

Crie uma galeria que:

- Adicione imagens via URL
- Permita adicionar legendas
- Tenha navegação entre imagens
- Remova imagens selecionadas

### **Exercício 3: Calculadora DOM**

Construa uma calculadora onde:

- Todos os botões são criados via JavaScript
- O display mostra operações em tempo real
- Implemente todas as operações básicas
- Adicione histórico de cálculos

---

## 🎓 Pontos-Chave para Lembrar

### ✅ **Navegação DOM**

- Use `parentNode`/`parentElement` para subir na árvore
- Use `children`/`childNodes` para acessar filhos
- Use `nextElementSibling`/`previousElementSibling` para navegar horizontalmente

### ✅ **Criação de Elementos**

- `document.createElement()` - criar elementos
- `document.createTextNode()` - criar nós de texto
- `appendChild()` - adicionar ao final
- `insertBefore()` - inserir em posição específica

### ✅ **Modificação de Conteúdo**

- `textContent` - apenas texto (seguro)
- `innerHTML` - permite HTML (cuidado!)
- `firstChild.data` - modificar nó de texto diretamente

### ✅ **Boas Práticas**

- Sempre verificar se elementos existem antes de manipular
- Usar `textContent` quando possível para evitar XSS
- Organizar código em funções reutilizáveis
- Separar lógica de apresentação

---
