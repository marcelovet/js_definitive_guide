// ELEMENTOS NO DOM
const newTaskIput = document.getElementById('newTaskIput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// CRIAR UMA NOVA TAREFA
function createTask(text) {
  // Criar o container da tarefa
  const task = document.createElement('div');
  task.className = 'tarefa';

  // Criar o texto da tarefa
  const textContainer = document.createElement('div');
  const pText = document.createElement('p');
  pText.textContent = text;

  // Criar container de botões (subir e descer)
  const btnContainer1 = document.createElement('div');
  btnContainer1.className = 'btn-container';

  // Criar container de botões (editar e remover)
  const btnContainer2 = document.createElement('div');
  btnContainer2.className = 'btn-container';

  // Criar botão "Subir"
  const btnUp = document.createElement('button');
  btnUp.textContent = '👆 Subir';
  btnUp.style.background = '#28a745';

  // Criar botão "Descer"
  const btnDown = document.createElement('button');
  btnDown.textContent = ' 👇 Descer';
  btnDown.style.background = '#28a745';

  // Criar botão "Remover"
  const btnRemover = document.createElement('button');
  btnRemover.textContent = '🗑️ Remover';
  btnRemover.style.background = '#dc3545';

  // Criar botão "Editar"
  const btnEdit = document.createElement('button');
  btnEdit.textContent = '✎ Editar';
  btnEdit.style.background = '#3529a7';

  // ADICIONAR EVENT LISTENERS
  btnUp.addEventListener('click', function () {
    const previousEl = task.previousElementSibling;
    if (previousEl) {
      previousEl.insertAdjacentElement('beforebegin', task);
    }
  });

  btnDown.addEventListener('click', function () {
    const nextEl = task.nextElementSibling;
    if (nextEl) {
      nextEl.insertAdjacentElement('afterend', task);
    }
  });

  btnRemover.addEventListener('click', function () {
    // Remover a tarefa do DOM
    taskList.removeChild(task);
  });

  btnEdit.addEventListener('click', function () {
    const newText = prompt('Digite o novo texto da tarefa:');
    if (newText !== null) {
      pText.textContent = newText;
    }
  });

  // MONTAR A ESTRUTURA
  textContainer.appendChild(pText);
  task.appendChild(textContainer);

  btnContainer1.appendChild(btnUp);
  btnContainer1.appendChild(btnDown);
  task.appendChild(btnContainer1);

  btnContainer2.appendChild(btnEdit);
  btnContainer2.appendChild(btnRemover);
  task.appendChild(btnContainer2);

  return task;
}

// ADICIONAR TAREFA
function addTask() {
  const text = newTaskIput.value.trim();

  if (text === '') {
    alert('Por favor, digite uma tarefa!');
    return;
  }

  // Criar e adicionar a tarefa
  const newTask = createTask(text);
  taskList.appendChild(newTask);

  // Limpar o campo de input e voltar o foco
  newTaskIput.value = '';
  newTaskIput.focus();
}

// EVENTOS PRINCIPAIS
// Adicionar tarefa pelo botão
addTaskBtn.addEventListener('click', addTask);

// Adicionar tarefa pressionando Enter
newTaskIput.addEventListener('keypress', function (evento) {
  if (evento.key === 'Enter') {
    addTask();
  }
});

// 7. INICIALIZAÇÃO
window.addEventListener('load', function () {
  newTaskIput.focus();
  console.log('Lista de tarefas carregada!');
});
