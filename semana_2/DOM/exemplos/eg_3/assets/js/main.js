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
  titulo.appendChild(document.createTextNode('📄 Página Criada Dinamicamente'));
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
  tituloInterativo.appendChild(document.createTextNode('🔄 Seção Interativa'));

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
    divHora.textContent = `⏰ Hora atual: ${agora.toLocaleString('pt-BR')}`;
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
