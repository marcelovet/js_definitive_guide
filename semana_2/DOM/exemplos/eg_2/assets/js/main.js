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
  console.log('Class do Elemento pai:', para.parentNode.className);
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
