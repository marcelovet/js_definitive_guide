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
