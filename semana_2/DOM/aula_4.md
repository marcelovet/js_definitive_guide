# 🌐 Aula: APIs Modernas - Fetch, Storage e Geolocation

Excelente! Agora que você domina eventos e manipulação DOM, vamos explorar as **APIs modernas** que transformam suas aplicações web em experiências ricas e interativas. Essas APIs são fundamentais para o desenvolvimento web atual!

## 📋 O que vamos aprender hoje?

1. **Fetch API** - Requisições HTTP modernas e assíncronas
2. **Storage APIs** - LocalStorage, SessionStorage e IndexedDB
3. **Geolocation API** - Localização e mapas interativos
4. **Integração prática** - Combinando todas as APIs
5. **Padrões modernos** - Async/await, error handling e boas práticas

---

## 🚀 Fetch API - Requisições HTTP Modernas

### 🤔 Por que Fetch em vez de XMLHttpRequest?

A Fetch API é **mais limpa, moderna e baseada em Promises**, oferecendo uma sintaxe muito mais intuitiva para requisições HTTP.

### 💻 Exemplo Prático: Sistema Completo de Requisições

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fetch API - Requisições Modernas</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #f5f5f5;
      }

      .container {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .api-section {
        margin: 30px 0;
        padding: 20px;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        background: #f8f9fa;
      }

      .controls {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin: 15px 0;
      }

      .btn {
        padding: 10px 15px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .btn:hover {
        background: #0056b3;
        transform: translateY(-2px);
      }

      .btn:active {
        transform: translateY(0);
      }

      .btn.success {
        background: #28a745;
      }
      .btn.warning {
        background: #ffc107;
        color: #212529;
      }
      .btn.danger {
        background: #dc3545;
      }
      .btn.info {
        background: #17a2b8;
      }

      .response-area {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        max-height: 300px;
        overflow-y: auto;
        margin: 15px 0;
        white-space: pre-wrap;
      }

      .loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 10px;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .user-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
        margin: 15px 0;
      }

      .user-card {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .user-card:hover {
        transform: translateY(-5px);
      }

      .user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 10px;
      }

      .form-section {
        background: #e8f5e9;
        border: 2px solid #4caf50;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }

      .form-group {
        margin: 15px 0;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
      }

      .error {
        background: #f8d7da;
        color: #721c24;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        border-left: 4px solid #dc3545;
      }

      .success {
        background: #d4edda;
        color: #155724;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        border-left: 4px solid #28a745;
      }

      .status-indicator {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .status-online {
        background: #28a745;
      }
      .status-offline {
        background: #dc3545;
      }
      .status-loading {
        background: #ffc107;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🚀 Fetch API - Requisições HTTP Modernas</h1>

      <!-- Status da Conexão -->
      <div id="connection-status">
        <span class="status-indicator status-online"></span>
        <span>Online - Pronto para fazer requisições</span>
      </div>

      <!-- Seção 1: GET Requests -->
      <div class="api-section">
        <h2>📥 GET Requests - Buscar Dados</h2>

        <div class="controls">
          <button class="btn" onclick="fetchUsers()">👥 Buscar Usuários</button>
          <button class="btn info" onclick="fetchRandomUser()">
            🎲 Usuário Aleatório
          </button>
          <button class="btn warning" onclick="fetchWithError()">
            ❌ Testar Erro
          </button>
          <button class="btn" onclick="fetchWithTimeout()">
            ⏱️ Timeout (5s)
          </button>
        </div>

        <div class="response-area" id="get-response">
          Clique nos botões acima para fazer requisições GET...
        </div>

        <div class="user-grid" id="users-grid">
          <!-- Usuários aparecerão aqui -->
        </div>
      </div>

      <!-- Seção 2: POST Requests -->
      <div class="api-section form-section">
        <h2>📤 POST Requests - Enviar Dados</h2>

        <form id="user-form">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" required />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" required />
          </div>

          <div class="form-group">
            <label for="job">Profissão:</label>
            <input type="text" id="job" required />
          </div>

          <div class="controls">
            <button type="submit" class="btn success">📤 Criar Usuário</button>
            <button type="button" class="btn info" onclick="updateUser()">
              ✏️ Atualizar
            </button>
            <button type="button" class="btn danger" onclick="deleteUser()">
              🗑️ Deletar
            </button>
          </div>
        </form>

        <div class="response-area" id="post-response">
          Resultados do formulário aparecerão aqui...
        </div>
      </div>

      <!-- Seção 3: Advanced Features -->
      <div class="api-section">
        <h2>🔬 Recursos Avançados</h2>

        <div class="controls">
          <button class="btn" onclick="parallelRequests()">
            🔄 Requisições Paralelas
          </button>
          <button class="btn info" onclick="sequentialRequests()">
            📋 Requisições Sequenciais
          </button>
          <button class="btn warning" onclick="uploadFile()">
            📁 Upload de Arquivo
          </button>
          <button class="btn" onclick="downloadFile()">💾 Download</button>
        </div>

        <div class="response-area" id="advanced-response">
          Resultados dos recursos avançados...
        </div>
      </div>
    </div>

    <script>
      // Configurações globais
      const API_BASE = 'https://reqres.in/api';
      const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com';

      // Elementos DOM
      const getResponse = document.getElementById('get-response');
      const postResponse = document.getElementById('post-response');
      const advancedResponse = document.getElementById('advanced-response');
      const usersGrid = document.getElementById('users-grid');
      const userForm = document.getElementById('user-form');
      const connectionStatus = document.getElementById('connection-status');

      // Utilitários
      function log(element, message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix =
          type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        element.textContent =
          `[${timestamp}] ${prefix} ${message}\n` + element.textContent;
      }

      function showLoading(element) {
        element.innerHTML = '<span class="loading"></span>Carregando...';
      }

      function updateConnectionStatus(status) {
        const indicator = connectionStatus.querySelector('.status-indicator');
        const text = connectionStatus.querySelector('span:last-child');

        indicator.className = `status-indicator status-${status}`;

        switch (status) {
          case 'online':
            text.textContent = 'Online - Pronto para fazer requisições';
            break;
          case 'offline':
            text.textContent = 'Offline - Verifique sua conexão';
            break;
          case 'loading':
            text.textContent = 'Fazendo requisição...';
            break;
        }
      }

      // 1. FETCH BÁSICO COM ASYNC/AWAIT
      async function fetchUsers() {
        try {
          updateConnectionStatus('loading');
          showLoading(getResponse);

          // Simulação de delay para demonstrar loading
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const response = await fetch(`${API_BASE}/users?page=1`);

          // Verificar se a resposta foi bem-sucedida
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          log(
            getResponse,
            `Usuários carregados: ${data.data.length}`,
            'success'
          );
          log(getResponse, JSON.stringify(data, null, 2));

          displayUsers(data.data);
          updateConnectionStatus('online');
        } catch (error) {
          log(
            getResponse,
            `Erro ao buscar usuários: ${error.message}`,
            'error'
          );
          updateConnectionStatus('offline');
        }
      }

      // 2. REQUISIÇÃO COM HEADERS CUSTOMIZADOS
      async function fetchRandomUser() {
        try {
          updateConnectionStatus('loading');

          const response = await fetch(`${API_BASE}/users/2`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'User-Agent': 'FetchAPI-Demo/1.0',
              'X-Custom-Header': 'Demonstração',
            },
          });

          if (!response.ok) {
            throw new Error(`Erro ${response.status}`);
          }

          const data = await response.json();

          log(getResponse, 'Usuário aleatório carregado:', 'success');
          log(getResponse, JSON.stringify(data, null, 2));

          displayUsers([data.data]);
          updateConnectionStatus('online');
        } catch (error) {
          log(getResponse, `Erro: ${error.message}`, 'error');
          updateConnectionStatus('offline');
        }
      }

      // 3. TRATAMENTO DE ERROS
      async function fetchWithError() {
        try {
          updateConnectionStatus('loading');

          // URL que vai retornar erro 404
          const response = await fetch(`${API_BASE}/users/999`);

          if (!response.ok) {
            throw new Error(`Usuário não encontrado (${response.status})`);
          }

          const data = await response.json();
          log(getResponse, JSON.stringify(data, null, 2));
        } catch (error) {
          log(getResponse, `Erro esperado: ${error.message}`, 'error');
          log(
            getResponse,
            'Este erro foi proposital para demonstrar o tratamento de erros.'
          );
          updateConnectionStatus('offline');

          // Voltar status online após alguns segundos
          setTimeout(() => updateConnectionStatus('online'), 3000);
        }
      }

      // 4. TIMEOUT E ABORT CONTROLLER
      async function fetchWithTimeout() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
          updateConnectionStatus('loading');
          log(getResponse, 'Iniciando requisição com timeout de 5s...');

          const response = await fetch(`${API_BASE}/users?delay=3`, {
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`Erro ${response.status}`);
          }

          const data = await response.json();
          log(
            getResponse,
            'Requisição completada dentro do timeout!',
            'success'
          );
          log(getResponse, JSON.stringify(data, null, 2));

          updateConnectionStatus('online');
        } catch (error) {
          clearTimeout(timeoutId);

          if (error.name === 'AbortError') {
            log(getResponse, 'Requisição cancelada por timeout (5s)', 'error');
          } else {
            log(getResponse, `Erro: ${error.message}`, 'error');
          }

          updateConnectionStatus('offline');
          setTimeout(() => updateConnectionStatus('online'), 3000);
        }
      }

      // 5. POST REQUEST COM DADOS
      async function createUser(userData) {
        try {
          updateConnectionStatus('loading');
          showLoading(postResponse);

          const response = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error(`Erro ao criar usuário: ${response.status}`);
          }

          const result = await response.json();

          log(postResponse, 'Usuário criado com sucesso!', 'success');
          log(postResponse, JSON.stringify(result, null, 2));

          updateConnectionStatus('online');

          return result;
        } catch (error) {
          log(postResponse, `Erro: ${error.message}`, 'error');
          updateConnectionStatus('offline');
          throw error;
        }
      }

      // 6. PUT REQUEST (UPDATE)
      async function updateUser() {
        try {
          const userData = {
            name: 'João Silva Atualizado',
            job: 'Senior Developer',
          };

          updateConnectionStatus('loading');

          const response = await fetch(`${API_BASE}/users/2`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error(`Erro ao atualizar: ${response.status}`);
          }

          const result = await response.json();

          log(postResponse, 'Usuário atualizado!', 'success');
          log(postResponse, JSON.stringify(result, null, 2));

          updateConnectionStatus('online');
        } catch (error) {
          log(postResponse, `Erro: ${error.message}`, 'error');
          updateConnectionStatus('offline');
        }
      }

      // 7. DELETE REQUEST
      async function deleteUser() {
        try {
          updateConnectionStatus('loading');

          const response = await fetch(`${API_BASE}/users/2`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error(`Erro ao deletar: ${response.status}`);
          }

          log(postResponse, 'Usuário deletado!', 'success');
          log(
            postResponse,
            `Status: ${response.status} - ${response.statusText}`
          );

          updateConnectionStatus('online');
        } catch (error) {
          log(postResponse, `Erro: ${error.message}`, 'error');
          updateConnectionStatus('offline');
        }
      }

      // 8. REQUISIÇÕES PARALELAS
      async function parallelRequests() {
        try {
          updateConnectionStatus('loading');
          showLoading(advancedResponse);

          log(advancedResponse, 'Iniciando 3 requisições paralelas...');

          const startTime = performance.now();

          // Promise.all executa todas as requisições em paralelo
          const [users, posts, comments] = await Promise.all([
            fetch(`${JSONPLACEHOLDER_API}/users`).then((r) => r.json()),
            fetch(`${JSONPLACEHOLDER_API}/posts`).then((r) => r.json()),
            fetch(`${JSONPLACEHOLDER_API}/comments`).then((r) => r.json()),
          ]);

          const endTime = performance.now();
          const duration = (endTime - startTime).toFixed(2);

          log(
            advancedResponse,
            `✅ Todas as requisições completadas em ${duration}ms`,
            'success'
          );
          log(advancedResponse, `👥 Usuários: ${users.length}`);
          log(advancedResponse, `📝 Posts: ${posts.length}`);
          log(advancedResponse, `💬 Comentários: ${comments.length}`);

          updateConnectionStatus('online');
        } catch (error) {
          log(
            advancedResponse,
            `Erro nas requisições paralelas: ${error.message}`,
            'error'
          );
          updateConnectionStatus('offline');
        }
      }

      // 9. REQUISIÇÕES SEQUENCIAIS
      async function sequentialRequests() {
        try {
          updateConnectionStatus('loading');
          showLoading(advancedResponse);

          log(advancedResponse, 'Iniciando 3 requisições sequenciais...');

          const startTime = performance.now();

          // Executar uma após a outra
          log(advancedResponse, '1. Buscando usuários...');
          const users = await fetch(`${JSONPLACEHOLDER_API}/users`).then((r) =>
            r.json()
          );

          log(advancedResponse, '2. Buscando posts...');
          const posts = await fetch(`${JSONPLACEHOLDER_API}/posts`).then((r) =>
            r.json()
          );

          log(advancedResponse, '3. Buscando comentários...');
          const comments = await fetch(`${JSONPLACEHOLDER_API}/comments`).then(
            (r) => r.json()
          );

          const endTime = performance.now();
          const duration = (endTime - startTime).toFixed(2);

          log(
            advancedResponse,
            `✅ Requisições sequenciais completadas em ${duration}ms`,
            'success'
          );
          log(advancedResponse, `👥 Usuários: ${users.length}`);
          log(advancedResponse, `📝 Posts: ${posts.length}`);
          log(advancedResponse, `💬 Comentários: ${comments.length}`);

          updateConnectionStatus('online');
        } catch (error) {
          log(advancedResponse, `Erro: ${error.message}`, 'error');
          updateConnectionStatus('offline');
        }
      }

      // 10. SIMULAÇÃO DE UPLOAD
      async function uploadFile() {
        try {
          // Criar um FormData simulado
          const formData = new FormData();

          // Simular um arquivo
          const blob = new Blob(['Conteúdo do arquivo simulado'], {
            type: 'text/plain',
          });
          formData.append('file', blob, 'exemplo.txt');
          formData.append('description', 'Arquivo de exemplo');

          updateConnectionStatus('loading');
          log(advancedResponse, 'Simulando upload de arquivo...');

          const response = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            body: formData,
            // Não definir Content-Type para FormData, o browser faz automaticamente
          });

          if (!response.ok) {
            throw new Error(`Erro no upload: ${response.status}`);
          }

          const result = await response.json();

          log(advancedResponse, 'Upload simulado com sucesso!', 'success');
          log(advancedResponse, JSON.stringify(result, null, 2));

          updateConnectionStatus('online');
        } catch (error) {
          log(advancedResponse, `Erro no upload: ${error.message}`, 'error');
          updateConnectionStatus('offline');
        }
      }

      // 11. DOWNLOAD DE ARQUIVO
      async function downloadFile() {
        try {
          updateConnectionStatus('loading');
          log(advancedResponse, 'Simulando download...');

          // Simular download de JSON
          const response = await fetch(`${JSONPLACEHOLDER_API}/posts/1`);

          if (!response.ok) {
            throw new Error(`Erro no download: ${response.status}`);
          }

          const data = await response.json();

          // Criar arquivo para download
          const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json',
          });

          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'post.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          log(advancedResponse, 'Download iniciado!', 'success');
          log(advancedResponse, 'Arquivo: post.json');

          updateConnectionStatus('online');
        } catch (error) {
          log(advancedResponse, `Erro no download: ${error.message}`, 'error');
          updateConnectionStatus('offline');
        }
      }

      // 12. FUNÇÕES AUXILIARES
      function displayUsers(users) {
        usersGrid.innerHTML = '';

        users.forEach((user) => {
          const userCard = document.createElement('div');
          userCard.className = 'user-card';

          userCard.innerHTML = `
                    <img src="${user.avatar}" alt="${user.first_name}" class="user-avatar">
                    <h4>${user.first_name} ${user.last_name}</h4>
                    <p>📧 ${user.email}</p>
                    <small>ID: ${user.id}</small>
                `;

          usersGrid.appendChild(userCard);
        });
      }

      // Event Listeners
      userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(userForm);
        const userData = {
          name: formData.get('name'),
          email: formData.get('email'),
          job: formData.get('job'),
        };

        try {
          await createUser(userData);
          userForm.reset();
        } catch (error) {
          console.error('Erro ao criar usuário:', error);
        }
      });

      // Detectar status da conexão
      window.addEventListener('online', () => updateConnectionStatus('online'));
      window.addEventListener('offline', () =>
        updateConnectionStatus('offline')
      );

      // Inicialização
      window.addEventListener('load', () => {
        updateConnectionStatus(navigator.onLine ? 'online' : 'offline');

        log(getResponse, 'Fetch API Demo carregado!');
        log(postResponse, 'Formulário pronto para uso');
        log(advancedResponse, 'Recursos avançados disponíveis');

        console.log('🚀 Fetch API Demo carregado!');
        console.log('💡 Experimente as diferentes funcionalidades');
        console.log('🔍 Abra o Network tab para ver as requisições');
      });
    </script>
  </body>
</html>
```

---

## 💾 Storage APIs - Armazenamento Local

### 🤔 Tipos de Storage

1. **LocalStorage** - Persistente, domínio específico
2. **SessionStorage** - Temporário, aba específica
3. **IndexedDB** - Banco de dados local avançado

### 💻 Exemplo Prático: Sistema de Armazenamento Completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Storage APIs - Armazenamento Local</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #f5f5f5;
      }

      .container {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .storage-section {
        margin: 30px 0;
        padding: 20px;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        background: #f8f9fa;
      }

      .localstorage {
        border-color: #007bff;
        background: #e3f2fd;
      }
      .sessionstorage {
        border-color: #28a745;
        background: #e8f5e9;
      }
      .indexeddb {
        border-color: #dc3545;
        background: #ffebee;
      }

      .controls {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin: 15px 0;
      }

      .btn {
        padding: 10px 15px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }

      .btn:hover {
        background: #0056b3;
      }
      .btn.success {
        background: #28a745;
      }
      .btn.danger {
        background: #dc3545;
      }
      .btn.warning {
        background: #ffc107;
        color: #212529;
      }

      .storage-display {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        max-height: 200px;
        overflow-y: auto;
        margin: 15px 0;
        white-space: pre-wrap;
      }

      .form-group {
        margin: 15px 0;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
      }

      .stats {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
      }

      .todo-item {
        background: white;
        border: 1px solid #dee2e6;
        padding: 15px;
        margin: 10px 0;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .todo-item.completed {
        opacity: 0.6;
        text-decoration: line-through;
      }

      .user-profile {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 8px;
        margin: 15px 0;
      }

      .cache-item {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 10px;
        margin: 5px 0;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>💾 Storage APIs - Armazenamento Local</h1>

      <!-- Stats Gerais -->
      <div class="stats" id="storage-stats">Carregando estatísticas...</div>

      <!-- LocalStorage -->
      <div class="storage-section localstorage">
        <h2>🔵 LocalStorage - Persistente</h2>
        <p>Dados persistem entre sessões e abas do navegador</p>

        <div class="form-group">
          <label for="local-key">Chave:</label>
          <input type="text" id="local-key" placeholder="Ex: username" />
        </div>

        <div class="form-group">
          <label for="local-value">Valor:</label>
          <input type="text" id="local-value" placeholder="Ex: João Silva" />
        </div>

        <div class="controls">
          <button class="btn success" onclick="setLocalStorage()">
            💾 Salvar
          </button>
          <button class="btn" onclick="getLocalStorage()">📖 Buscar</button>
          <button class="btn danger" onclick="removeLocalStorage()">
            🗑️ Remover
          </button>
          <button class="btn warning" onclick="clearLocalStorage()">
            🧹 Limpar Tudo
          </button>
        </div>

        <div class="storage-display" id="local-display"></div>
      </div>

      <!-- SessionStorage -->
      <div class="storage-section sessionstorage">
        <h2>🟢 SessionStorage - Temporário</h2>
        <p>Dados válidos apenas para esta aba/sessão</p>

        <div class="form-group">
          <label for="session-key">Chave:</label>
          <input
            type="text"
            id="session-key"
            placeholder="Ex: temporary_data"
          />
        </div>

        <div class="form-group">
          <label for="session-value">Valor:</label>
          <input
            type="text"
            id="session-value"
            placeholder="Ex: dados temporários"
          />
        </div>

        <div class="controls">
          <button class="btn success" onclick="setSessionStorage()">
            💾 Salvar
          </button>
          <button class="btn" onclick="getSessionStorage()">📖 Buscar</button>
          <button class="btn danger" onclick="removeSessionStorage()">
            🗑️ Remover
          </button>
          <button class="btn warning" onclick="clearSessionStorage()">
            🧹 Limpar Tudo
          </button>
        </div>

        <div class="storage-display" id="session-display"></div>
      </div>

      <!-- IndexedDB -->
      <div class="storage-section indexeddb">
        <h2>🔴 IndexedDB - Banco de Dados Local</h2>
        <p>Banco NoSQL para grandes volumes de dados estruturados</p>

        <div class="form-group">
          <label for="user-name">Nome:</label>
          <input type="text" id="user-name" placeholder="Nome do usuário" />
        </div>

        <div class="form-group">
          <label for="user-email">Email:</label>
          <input type="email" id="user-email" placeholder="email@exemplo.com" />
        </div>

        <div class="form-group">
          <label for="user-age">Idade:</label>
          <input type="number" id="user-age" placeholder="25" />
        </div>

        <div class="controls">
          <button class="btn success" onclick="addUserToIndexedDB()">
            👤 Adicionar Usuário
          </button>
          <button class="btn" onclick="getAllUsersFromIndexedDB()">
            📋 Listar Todos
          </button>
          <button class="btn warning" onclick="searchUsersIndexedDB()">
            🔍 Buscar
          </button>
          <button class="btn danger" onclick="clearIndexedDB()">
            🗑️ Limpar DB
          </button>
        </div>

        <div class="storage-display" id="indexeddb-display"></div>
      </div>

      <!-- Aplicação Prática: Todo List -->
      <div class="storage-section">
        <h2>📝 Aplicação Prática: Todo List com Storage</h2>

        <div class="form-group">
          <label for="todo-input">Nova tarefa:</label>
          <input
            type="text"
            id="todo-input"
            placeholder="Digite uma tarefa..."
          />
        </div>

        <div class="controls">
          <button class="btn success" onclick="addTodo()">➕ Adicionar</button>
          <button class="btn warning" onclick="clearCompletedTodos()">
            ✅ Limpar Concluídas
          </button>
          <button class="btn danger" onclick="clearAllTodos()">
            🗑️ Limpar Todas
          </button>
        </div>

        <div id="todos-container">
          <!-- Todos aparecerão aqui -->
        </div>
      </div>

      <!-- Cache System -->
      <div class="storage-section">
        <h2>🚀 Sistema de Cache Inteligente</h2>

        <div class="controls">
          <button class="btn" onclick="fetchWithCache('users')">
            👥 Buscar Usuários (Com Cache)
          </button>
          <button class="btn" onclick="fetchWithCache('posts')">
            📝 Buscar Posts (Com Cache)
          </button>
          <button class="btn warning" onclick="clearCache()">
            🧹 Limpar Cache
          </button>
          <button class="btn" onclick="showCacheStatus()">
            📊 Status do Cache
          </button>
        </div>

        <div id="cache-container">
          <!-- Cache items aparecerão aqui -->
        </div>
      </div>
    </div>

    <script>
      // Variáveis globais
      let db = null;
      const DB_NAME = 'UserDB';
      const DB_VERSION = 1;
      const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutos

      // Elementos DOM
      const localDisplay = document.getElementById('local-display');
      const sessionDisplay = document.getElementById('session-display');
      const indexeddbDisplay = document.getElementById('indexeddb-display');
      const storageStats = document.getElementById('storage-stats');
      const todosContainer = document.getElementById('todos-container');
      const cacheContainer = document.getElementById('cache-container');

      // 1. LOCALSTORAGE FUNCTIONS
      function setLocalStorage() {
        const key = document.getElementById('local-key').value;
        const value = document.getElementById('local-value').value;

        if (!key || !value) {
          alert('Preencha chave e valor!');
          return;
        }

        try {
          localStorage.setItem(key, value);
          log(localDisplay, `✅ Salvo: ${key} = ${value}`, 'success');
          updateStorageStats();
          displayLocalStorage();
        } catch (error) {
          log(localDisplay, `❌ Erro: ${error.message}`, 'error');
        }
      }

      function getLocalStorage() {
        const key = document.getElementById('local-key').value;

        if (!key) {
          alert('Digite uma chave!');
          return;
        }

        const value = localStorage.getItem(key);

        if (value !== null) {
          log(localDisplay, `📖 Encontrado: ${key} = ${value}`, 'success');
          document.getElementById('local-value').value = value;
        } else {
          log(localDisplay, `❌ Chave '${key}' não encontrada`, 'error');
        }
      }

      function removeLocalStorage() {
        const key = document.getElementById('local-key').value;

        if (!key) {
          alert('Digite uma chave!');
          return;
        }

        localStorage.removeItem(key);
        log(localDisplay, `🗑️ Removido: ${key}`, 'info');
        updateStorageStats();
        displayLocalStorage();
      }

      function clearLocalStorage() {
        if (confirm('Limpar todo o localStorage?')) {
          localStorage.clear();
          log(localDisplay, '🧹 LocalStorage limpo!', 'info');
          updateStorageStats();
          displayLocalStorage();
        }
      }

      function displayLocalStorage() {
        let content = '=== CONTEÚDO DO LOCALSTORAGE ===\n';

        if (localStorage.length === 0) {
          content += 'Vazio\n';
        } else {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            content += `${key}: ${value}\n`;
          }
        }

        localDisplay.textContent = content;
      }

      // 2. SESSIONSTORAGE FUNCTIONS
      function setSessionStorage() {
        const key = document.getElementById('session-key').value;
        const value = document.getElementById('session-value').value;

        if (!key || !value) {
          alert('Preencha chave e valor!');
          return;
        }

        try {
          sessionStorage.setItem(key, value);
          log(sessionDisplay, `✅ Salvo: ${key} = ${value}`, 'success');
          updateStorageStats();
          displaySessionStorage();
        } catch (error) {
          log(sessionDisplay, `❌ Erro: ${error.message}`, 'error');
        }
      }

      function getSessionStorage() {
        const key = document.getElementById('session-key').value;

        if (!key) {
          alert('Digite uma chave!');
          return;
        }

        const value = sessionStorage.getItem(key);

        if (value !== null) {
          log(sessionDisplay, `📖 Encontrado: ${key} = ${value}`, 'success');
          document.getElementById('session-value').value = value;
        } else {
          log(sessionDisplay, `❌ Chave '${key}' não encontrada`, 'error');
        }
      }

      function removeSessionStorage() {
        const key = document.getElementById('session-key').value;

        if (!key) {
          alert('Digite uma chave!');
          return;
        }

        sessionStorage.removeItem(key);
        log(sessionDisplay, `🗑️ Removido: ${key}`, 'info');
        updateStorageStats();
        displaySessionStorage();
      }

      function clearSessionStorage() {
        if (confirm('Limpar todo o sessionStorage?')) {
          sessionStorage.clear();
          log(sessionDisplay, '🧹 SessionStorage limpo!', 'info');
          updateStorageStats();
          displaySessionStorage();
        }
      }

      function displaySessionStorage() {
        let content = '=== CONTEÚDO DO SESSIONSTORAGE ===\n';

        if (sessionStorage.length === 0) {
          content += 'Vazio\n';
        } else {
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            content += `${key}: ${value}\n`;
          }
        }

        sessionDisplay.textContent = content;
      }

      // 3. INDEXEDDB FUNCTIONS
      function initIndexedDB() {
        return new Promise((resolve, reject) => {
          const request = indexedDB.open(DB_NAME, DB_VERSION);

          request.onerror = () => {
            reject(request.error);
          };

          request.onsuccess = () => {
            db = request.result;
            resolve(db);
          };

          request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Criar object store para usuários
            if (!db.objectStoreNames.contains('users')) {
              const userStore = db.createObjectStore('users', {
                keyPath: 'id',
                autoIncrement: true,
              });

              // Criar índices
              userStore.createIndex('email', 'email', { unique: true });
              userStore.createIndex('name', 'name', { unique: false });
            }
          };
        });
      }

      async function addUserToIndexedDB() {
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const age = parseInt(document.getElementById('user-age').value);

        if (!name || !email || !age) {
          alert('Preencha todos os campos!');
          return;
        }

        try {
          if (!db) await initIndexedDB();

          const transaction = db.transaction(['users'], 'readwrite');
          const store = transaction.objectStore('users');

          const user = {
            name: name,
            email: email,
            age: age,
            createdAt: new Date().toISOString(),
          };

          const request = store.add(user);

          request.onsuccess = () => {
            log(indexeddbDisplay, `✅ Usuário adicionado: ${name}`, 'success');

            // Limpar campos
            document.getElementById('user-name').value = '';
            document.getElementById('user-email').value = '';
            document.getElementById('user-age').value = '';

            getAllUsersFromIndexedDB();
          };

          request.onerror = () => {
            log(
              indexeddbDisplay,
              `❌ Erro ao adicionar: ${request.error}`,
              'error'
            );
          };
        } catch (error) {
          log(indexeddbDisplay, `❌ Erro: ${error.message}`, 'error');
        }
      }

      async function getAllUsersFromIndexedDB() {
        try {
          if (!db) await initIndexedDB();

          const transaction = db.transaction(['users'], 'readonly');
          const store = transaction.objectStore('users');
          const request = store.getAll();

          request.onsuccess = () => {
            const users = request.result;

            let content = `=== USUÁRIOS NO INDEXEDDB (${users.length}) ===\n`;

            if (users.length === 0) {
              content += 'Nenhum usuário encontrado\n';
            } else {
              users.forEach((user) => {
                content += `ID: ${user.id}\n`;
                content += `Nome: ${user.name}\n`;
                content += `Email: ${user.email}\n`;
                content += `Idade: ${user.age}\n`;
                content += `Criado: ${new Date(
                  user.createdAt
                ).toLocaleString()}\n`;
                content += '---\n';
              });
            }

            indexeddbDisplay.textContent = content;
          };
        } catch (error) {
          log(indexeddbDisplay, `❌ Erro: ${error.message}`, 'error');
        }
      }

      async function searchUsersIndexedDB() {
        const searchTerm = prompt('Buscar por nome:');
        if (!searchTerm) return;

        try {
          if (!db) await initIndexedDB();

          const transaction = db.transaction(['users'], 'readonly');
          const store = transaction.objectStore('users');
          const index = store.index('name');

          const request = index.getAll();

          request.onsuccess = () => {
            const users = request.result;
            const filtered = users.filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            let content = `=== BUSCA: "${searchTerm}" (${filtered.length} encontrados) ===\n`;

            if (filtered.length === 0) {
              content += 'Nenhum usuário encontrado\n';
            } else {
              filtered.forEach((user) => {
                content += `${user.name} (${user.email})\n`;
              });
            }

            indexeddbDisplay.textContent = content;
          };
        } catch (error) {
          log(indexeddbDisplay, `❌ Erro na busca: ${error.message}`, 'error');
        }
      }

      async function clearIndexedDB() {
        if (!confirm('Limpar todo o banco IndexedDB?')) return;

        try {
          if (!db) await initIndexedDB();

          const transaction = db.transaction(['users'], 'readwrite');
          const store = transaction.objectStore('users');
          const request = store.clear();

          request.onsuccess = () => {
            log(indexeddbDisplay, '🗑️ IndexedDB limpo!', 'info');
            getAllUsersFromIndexedDB();
          };
        } catch (error) {
          log(indexeddbDisplay, `❌ Erro: ${error.message}`, 'error');
        }
      }

      // 4. TODO LIST APPLICATION
      function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        displayTodos(todos);
      }

      function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
      }

      function addTodo() {
        const input = document.getElementById('todo-input');
        const text = input.value.trim();

        if (!text) return;

        const todos = JSON.parse(localStorage.getItem('todos') || '[]');

        const newTodo = {
          id: Date.now(),
          text: text,
          completed: false,
          createdAt: new Date().toISOString(),
        };

        todos.push(newTodo);
        saveTodos(todos);
        displayTodos(todos);

        input.value = '';
      }

      function toggleTodo(id) {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        const todo = todos.find((t) => t.id === id);

        if (todo) {
          todo.completed = !todo.completed;
          saveTodos(todos);
          displayTodos(todos);
        }
      }

      function deleteTodo(id) {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        const filtered = todos.filter((t) => t.id !== id);

        saveTodos(filtered);
        displayTodos(filtered);
      }

      function displayTodos(todos) {
        todosContainer.innerHTML = '';

        if (todos.length === 0) {
          todosContainer.innerHTML =
            '<p style="text-align: center; color: #666;">Nenhuma tarefa</p>';
          return;
        }

        todos.forEach((todo) => {
          const todoElement = document.createElement('div');
          todoElement.className = `todo-item ${
            todo.completed ? 'completed' : ''
          }`;

          todoElement.innerHTML = `
                    <div>
                        <strong>${todo.text}</strong>
                        <br>
                        <small>Criado: ${new Date(
                          todo.createdAt
                        ).toLocaleString()}</small>
                    </div>
                    <div>
                        <button class="btn ${
                          todo.completed ? 'warning' : 'success'
                        }"
                                onclick="toggleTodo(${todo.id})">
                            ${todo.completed ? '↶ Desfazer' : '✅ Concluir'}
                        </button>
                        <button class="btn danger" onclick="deleteTodo(${
                          todo.id
                        })">
                            🗑️ Deletar
                        </button>
                    </div>
                `;

          todosContainer.appendChild(todoElement);
        });
      }

      function clearCompletedTodos() {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        const active = todos.filter((t) => !t.completed);

        saveTodos(active);
        displayTodos(active);
      }

      function clearAllTodos() {
        if (confirm('Deletar todas as tarefas?')) {
          saveTodos([]);
          displayTodos([]);
        }
      }

      // 5. CACHE SYSTEM
      function setCacheItem(key, data, expiry = CACHE_EXPIRY) {
        const cacheItem = {
          data: data,
          expiry: Date.now() + expiry,
          timestamp: Date.now(),
        };

        localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem));
      }

      function getCacheItem(key) {
        const cached = localStorage.getItem(`cache_${key}`);

        if (!cached) return null;

        const cacheItem = JSON.parse(cached);

        if (Date.now() > cacheItem.expiry) {
          localStorage.removeItem(`cache_${key}`);
          return null;
        }

        return cacheItem.data;
      }

      async function fetchWithCache(type) {
        const cacheKey = `api_${type}`;

        // Verificar cache primeiro
        const cached = getCacheItem(cacheKey);

        if (cached) {
          log(indexeddbDisplay, `📦 Dados do cache: ${type}`, 'info');
          displayCacheData(type, cached, true);
          return;
        }

        // Buscar da API
        try {
          log(indexeddbDisplay, `🌐 Buscando da API: ${type}`, 'info');

          const apiUrl =
            type === 'users'
              ? 'https://jsonplaceholder.typicode.com/users'
              : 'https://jsonplaceholder.typicode.com/posts';

          const response = await fetch(apiUrl);
          const data = await response.json();

          // Salvar no cache
          setCacheItem(cacheKey, data);

          log(
            indexeddbDisplay,
            `✅ ${type} carregados e salvos no cache`,
            'success'
          );
          displayCacheData(type, data, false);
        } catch (error) {
          log(indexeddbDisplay, `❌ Erro: ${error.message}`, 'error');
        }
      }

      function displayCacheData(type, data, fromCache) {
        const container = document.createElement('div');
        container.className = 'cache-item';

        const source = fromCache ? '📦 CACHE' : '🌐 API';
        const count = Array.isArray(data) ? data.length : 1;

        container.innerHTML = `
                <strong>${source} - ${type.toUpperCase()}</strong><br>
                Items: ${count} |
                Timestamp: ${new Date().toLocaleTimeString()}<br>
                ${
                  fromCache
                    ? 'Dados vindos do cache local'
                    : 'Dados buscados da API e salvos no cache'
                }
            `;

        cacheContainer.insertBefore(container, cacheContainer.firstChild);
      }

      function clearCache() {
        const keys = Object.keys(localStorage);
        const cacheKeys = keys.filter((key) => key.startsWith('cache_'));

        cacheKeys.forEach((key) => localStorage.removeItem(key));

        log(
          indexeddbDisplay,
          `🧹 Cache limpo (${cacheKeys.length} itens removidos)`,
          'info'
        );
        cacheContainer.innerHTML = '';
      }

      function showCacheStatus() {
        const keys = Object.keys(localStorage);
        const cacheKeys = keys.filter((key) => key.startsWith('cache_'));

        let content = '=== STATUS DO CACHE ===\n';

        if (cacheKeys.length === 0) {
          content += 'Cache vazio\n';
        } else {
          cacheKeys.forEach((key) => {
            const cached = localStorage.getItem(key);
            const cacheItem = JSON.parse(cached);
            const remaining = cacheItem.expiry - Date.now();
            const status = remaining > 0 ? 'VÁLIDO' : 'EXPIRADO';

            content += `${key}: ${status}\n`;
            content += `Expira em: ${Math.max(
              0,
              Math.round(remaining / 1000)
            )}s\n`;
            content += '---\n';
          });
        }

        indexeddbDisplay.textContent = content;
      }

      // 6. UTILITY FUNCTIONS
      function log(element, message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix =
          type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';

        element.textContent =
          `[${timestamp}] ${prefix} ${message}\n` + element.textContent;
      }

      function updateStorageStats() {
        const localCount = localStorage.length;
        const sessionCount = sessionStorage.length;

        // Calcular tamanho aproximado
        let localSize = 0;
        let sessionSize = 0;

        for (let key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            localSize += localStorage[key].length;
          }
        }

        for (let key in sessionStorage) {
          if (sessionStorage.hasOwnProperty(key)) {
            sessionSize += sessionStorage[key].length;
          }
        }

        storageStats.innerHTML = `
                📊 <strong>Estatísticas de Storage:</strong><br>
                LocalStorage: ${localCount} itens (~${(
          localSize / 1024
        ).toFixed(2)} KB)<br>
                SessionStorage: ${sessionCount} itens (~${(
          sessionSize / 1024
        ).toFixed(2)} KB)<br>
                IndexedDB: ${db ? 'Conectado' : 'Desconectado'}<br>
                Quota disponível: ${
                  navigator.storage ? 'Suportado' : 'Não suportado'
                }
            `;
      }

      // Event Listeners
      document
        .getElementById('todo-input')
        .addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        });

      // Storage events (detectar mudanças em outras abas)
      window.addEventListener('storage', (e) => {
        console.log('Storage alterado em outra aba:', e);

        if (e.key === 'todos') {
          loadTodos();
        }

        updateStorageStats();
        displayLocalStorage();
      });

      // Inicialização
      window.addEventListener('load', async () => {
        try {
          await initIndexedDB();
          log(indexeddbDisplay, '✅ IndexedDB inicializado', 'success');
        } catch (error) {
          log(
            indexeddbDisplay,
            `❌ Erro no IndexedDB: ${error.message}`,
            'error'
          );
        }

        updateStorageStats();
        displayLocalStorage();
        displaySessionStorage();
        loadTodos();
        getAllUsersFromIndexedDB();

        console.log('💾 Storage APIs Demo carregado!');
        console.log('📊 Todos os tipos de storage estão disponíveis');
      });

      // Verificar quota de storage (se suportado)
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate().then((estimate) => {
          console.log('Storage quota:', estimate);
        });
      }
    </script>
  </body>
</html>
```

---

## 📍 Geolocation API - Localização e Mapas

### 🤔 O que é Geolocation API?

Permite acessar a localização geográfica do usuário com permissão, oferecendo coordenadas precisas para criar experiências baseadas em localização.

### 💻 Exemplo Prático: Sistema de Geolocalização Completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Geolocation API - Localização e Mapas</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #f5f5f5;
      }

      .container {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .location-section {
        margin: 30px 0;
        padding: 20px;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        background: #f8f9fa;
      }

      .current-location {
        border-color: #28a745;
        background: #e8f5e9;
      }
      .watch-location {
        border-color: #007bff;
        background: #e3f2fd;
      }
      .maps-section {
        border-color: #dc3545;
        background: #ffebee;
      }

      .controls {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin: 15px 0;
      }

      .btn {
        padding: 10px 15px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }

      .btn:hover {
        background: #0056b3;
      }
      .btn.success {
        background: #28a745;
      }
      .btn.danger {
        background: #dc3545;
      }
      .btn.warning {
        background: #ffc107;
        color: #212529;
      }

      .location-display {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        margin: 15px 0;
        white-space: pre-wrap;
      }

      .location-card {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        margin: 15px 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .coordinates {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
      }

      .map-container {
        width: 100%;
        height: 400px;
        border: 2px solid #ddd;
        border-radius: 8px;
        margin: 15px 0;
        position: relative;
        background: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
      }

      .nearby-places {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
        margin: 15px 0;
      }

      .place-card {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .accuracy-indicator {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
      }

      .accuracy-high {
        background: #d4edda;
        color: #155724;
      }
      .accuracy-medium {
        background: #fff3cd;
        color: #856404;
      }
      .accuracy-low {
        background: #f8d7da;
        color: #721c24;
      }

      .status-indicator {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .status-success {
        background: #28a745;
      }
      .status-error {
        background: #dc3545;
      }
      .status-loading {
        background: #ffc107;
        animation: pulse 1s infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .distance-calculator {
        background: #e8f5e9;
        border: 2px solid #4caf50;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }

      .form-group {
        margin: 15px 0;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      .form-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
      }

      .weather-info {
        background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
        color: white;
        padding: 20px;
        border-radius: 8px;
        margin: 15px 0;
      }

      .loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 10px;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📍 Geolocation API - Localização e Mapas</h1>

      <!-- Status da Geolocalização -->
      <div id="geo-status">
        <span class="status-indicator status-loading"></span>
        <span>Verificando suporte de geolocalização...</span>
      </div>

      <!-- Localização Atual -->
      <div class="location-section current-location">
        <h2>📌 Localização Atual</h2>

        <div class="controls">
          <button class="btn success" onclick="getCurrentLocation()">
            📍 Obter Localização
          </button>
          <button class="btn" onclick="getCurrentLocationHighAccuracy()">
            🎯 Alta Precisão
          </button>
          <button class="btn warning" onclick="getLocationWithOptions()">
            ⚙️ Com Opções
          </button>
        </div>

        <div class="location-display" id="current-location-display">
          Clique em "Obter Localização" para começar...
        </div>

        <div id="current-location-card" style="display: none;">
          <!-- Informações da localização aparecerão aqui -->
        </div>
      </div>

      <!-- Rastreamento de Localização -->
      <div class="location-section watch-location">
        <h2>🛰️ Rastreamento de Localização</h2>
        <p>Monitora mudanças na posição em tempo real</p>

        <div class="controls">
          <button
            class="btn success"
            onclick="startWatchingLocation()"
            id="start-watch-btn"
          >
            ▶️ Iniciar Rastreamento
          </button>
          <button
            class="btn danger"
            onclick="stopWatchingLocation()"
            id="stop-watch-btn"
            disabled
          >
            ⏹️ Parar Rastreamento
          </button>
          <button class="btn" onclick="clearLocationHistory()">
            🧹 Limpar Histórico
          </button>
        </div>

        <div class="location-display" id="watch-location-display">
          Clique em "Iniciar Rastreamento" para monitorar posição...
        </div>

        <div id="location-history">
          <!-- Histórico de posições aparecerá aqui -->
        </div>
      </div>

      <!-- Calculadora de Distância -->
      <div class="distance-calculator">
        <h2>📏 Calculadora de Distância</h2>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <h4>📍 Ponto A</h4>
            <div class="form-group">
              <label for="lat-a">Latitude:</label>
              <input
                type="number"
                id="lat-a"
                step="any"
                placeholder="-23.5505"
              />
            </div>
            <div class="form-group">
              <label for="lng-a">Longitude:</label>
              <input
                type="number"
                id="lng-a"
                step="any"
                placeholder="-46.6333"
              />
            </div>
            <button class="btn" onclick="useCurrentLocationForA()">
              📍 Usar Localização Atual
            </button>
          </div>

          <div>
            <h4>📍 Ponto B</h4>
            <div class="form-group">
              <label for="lat-b">Latitude:</label>
              <input
                type="number"
                id="lat-b"
                step="any"
                placeholder="-22.9068"
              />
            </div>
            <div class="form-group">
              <label for="lng-b">Longitude:</label>
              <input
                type="number"
                id="lng-b"
                step="any"
                placeholder="-43.1729"
              />
            </div>
            <button class="btn" onclick="setCityCoordinates()">
              🏙️ Usar Cidades Exemplo
            </button>
          </div>
        </div>

        <div class="controls">
          <button class="btn success" onclick="calculateDistance()">
            📏 Calcular Distância
          </button>
          <button class="btn warning" onclick="getRoute()">
            🗺️ Obter Rota
          </button>
        </div>

        <div id="distance-result"></div>
      </div>

      <!-- Informações Detalhadas -->
      <div class="location-section">
        <h2>ℹ️ Informações Detalhadas</h2>

        <div class="controls">
          <button class="btn" onclick="getLocationDetails()">
            🔍 Detalhes da Localização
          </button>
          <button class="btn" onclick="reverseGeocode()">
            🏠 Endereço da Localização
          </button>
          <button class="btn" onclick="getNearbyPlaces()">
            📍 Lugares Próximos
          </button>
          <button class="btn" onclick="getWeatherInfo()">🌤️ Tempo Local</button>
        </div>

        <div class="location-display" id="details-display">
          Informações detalhadas aparecerão aqui...
        </div>

        <div class="nearby-places" id="nearby-places">
          <!-- Lugares próximos aparecerão aqui -->
        </div>
      </div>

      <!-- Mapa Simples -->
      <div class="location-section maps-section">
        <h2>🗺️ Visualização no Mapa</h2>

        <div class="controls">
          <button class="btn" onclick="showLocationOnMap()">
            🗺️ Mostrar no Mapa
          </button>
          <button class="btn warning" onclick="openInGoogleMaps()">
            🌐 Abrir Google Maps
          </button>
          <button class="btn" onclick="openInAppleMaps()">
            🍎 Abrir Apple Maps
          </button>
          <button class="btn" onclick="shareLocation()">
            📤 Compartilhar Localização
          </button>
        </div>

        <div class="map-container" id="map-container">
          🗺️ Mapa aparecerá aqui após obter localização
        </div>
      </div>
    </div>

    <script>
      // Variáveis globais
      let currentPosition = null;
      let watchId = null;
      let locationHistory = [];
      const geoStatus = document.getElementById('geo-status');

      // Elementos DOM
      const currentLocationDisplay = document.getElementById(
        'current-location-display'
      );
      const watchLocationDisplay = document.getElementById(
        'watch-location-display'
      );
      const detailsDisplay = document.getElementById('details-display');
      const currentLocationCard = document.getElementById(
        'current-location-card'
      );
      const locationHistoryElement =
        document.getElementById('location-history');
      const nearbyPlacesElement = document.getElementById('nearby-places');
      const mapContainer = document.getElementById('map-container');
      const distanceResult = document.getElementById('distance-result');

      // 1. VERIFICAR SUPORTE
      function checkGeolocationSupport() {
        if ('geolocation' in navigator) {
          updateGeoStatus('success', 'Geolocalização suportada');
          log(currentLocationDisplay, '✅ Geolocation API disponível');

          // Verificar permissões se suportado
          if ('permissions' in navigator) {
            navigator.permissions
              .query({ name: 'geolocation' })
              .then((result) => {
                log(currentLocationDisplay, `Permissão: ${result.state}`);
              });
          }
        } else {
          updateGeoStatus('error', 'Geolocalização não suportada');
          log(
            currentLocationDisplay,
            '❌ Geolocation API não suportada neste navegador'
          );
        }
      }

      function updateGeoStatus(status, message) {
        const indicator = geoStatus.querySelector('.status-indicator');
        const text = geoStatus.querySelector('span:last-child');

        indicator.className = `status-indicator status-${status}`;
        text.textContent = message;
      }

      // 2. OBTER LOCALIZAÇÃO ATUAL
      function getCurrentLocation() {
        if (!navigator.geolocation) {
          log(
            currentLocationDisplay,
            '❌ Geolocalização não suportada',
            'error'
          );
          return;
        }

        updateGeoStatus('loading', 'Obtendo localização...');
        log(currentLocationDisplay, '📍 Solicitando localização...');

        navigator.geolocation.getCurrentPosition(
          // Sucesso
          (position) => {
            currentPosition = position;
            updateGeoStatus('success', 'Localização obtida');
            displayLocationInfo(position, currentLocationDisplay);
            createLocationCard(position);
            showLocationOnMap();
          },
          // Erro
          (error) => {
            updateGeoStatus('error', `Erro: ${getErrorMessage(error)}`);
            log(
              currentLocationDisplay,
              `❌ Erro: ${getErrorMessage(error)}`,
              'error'
            );
          },
          // Opções
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      }

      function getCurrentLocationHighAccuracy() {
        if (!navigator.geolocation) return;

        updateGeoStatus('loading', 'Obtendo localização de alta precisão...');
        log(
          currentLocationDisplay,
          '🎯 Solicitando alta precisão (pode demorar mais)...'
        );

        navigator.geolocation.getCurrentPosition(
          (position) => {
            currentPosition = position;
            updateGeoStatus('success', 'Localização de alta precisão obtida');
            displayLocationInfo(position, currentLocationDisplay);
            createLocationCard(position);
          },
          (error) => {
            updateGeoStatus('error', `Erro: ${getErrorMessage(error)}`);
            log(
              currentLocationDisplay,
              `❌ Erro: ${getErrorMessage(error)}`,
              'error'
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0,
          }
        );
      }

      function getLocationWithOptions() {
        const timeout = prompt('Timeout (ms):', '15000');
        const maxAge = prompt('Idade máxima do cache (ms):', '300000');
        const highAccuracy = confirm('Alta precisão? (pode demorar mais)');

        if (!timeout || !maxAge) return;

        const options = {
          enableHighAccuracy: highAccuracy,
          timeout: parseInt(timeout),
          maximumAge: parseInt(maxAge),
        };

        updateGeoStatus(
          'loading',
          'Obtendo localização com opções customizadas...'
        );
        log(
          currentLocationDisplay,
          `⚙️ Opções: Precisão=${highAccuracy}, Timeout=${timeout}ms, MaxAge=${maxAge}ms`
        );

        navigator.geolocation.getCurrentPosition(
          (position) => {
            currentPosition = position;
            updateGeoStatus(
              'success',
              'Localização obtida com opções customizadas'
            );
            displayLocationInfo(position, currentLocationDisplay);
            createLocationCard(position);
          },
          (error) => {
            updateGeoStatus('error', `Erro: ${getErrorMessage(error)}`);
            log(
              currentLocationDisplay,
              `❌ Erro: ${getErrorMessage(error)}`,
              'error'
            );
          },
          options
        );
      }

      // 3. RASTREAMENTO DE LOCALIZAÇÃO
      function startWatchingLocation() {
        if (!navigator.geolocation) return;

        if (watchId !== null) {
          log(watchLocationDisplay, '⚠️ Rastreamento já está ativo');
          return;
        }

        updateGeoStatus('loading', 'Iniciando rastreamento...');
        log(
          watchLocationDisplay,
          '🛰️ Iniciando rastreamento de localização...'
        );

        watchId = navigator.geolocation.watchPosition(
          (position) => {
            updateGeoStatus('success', 'Rastreando localização');

            // Adicionar ao histórico
            locationHistory.push({
              position: position,
              timestamp: new Date(),
            });

            displayLocationInfo(
              position,
              watchLocationDisplay,
              locationHistory.length
            );
            updateLocationHistory();

            // Detectar movimento significativo
            if (locationHistory.length > 1) {
              const prev = locationHistory[locationHistory.length - 2].position;
              const distance = calculateDistanceBetweenPoints(
                prev.coords.latitude,
                prev.coords.longitude,
                position.coords.latitude,
                position.coords.longitude
              );

              if (distance > 10) {
                // Movimento de mais de 10 metros
                log(
                  watchLocationDisplay,
                  `🚶 Movimento detectado: ${distance.toFixed(2)}m`
                );
              }
            }
          },
          (error) => {
            updateGeoStatus(
              'error',
              `Erro no rastreamento: ${getErrorMessage(error)}`
            );
            log(
              watchLocationDisplay,
              `❌ Erro: ${getErrorMessage(error)}`,
              'error'
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 5000,
          }
        );

        // Atualizar botões
        document.getElementById('start-watch-btn').disabled = true;
        document.getElementById('stop-watch-btn').disabled = false;
      }

      function stopWatchingLocation() {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId);
          watchId = null;

          updateGeoStatus('success', 'Rastreamento parado');
          log(watchLocationDisplay, '⏹️ Rastreamento parado');

          // Atualizar botões
          document.getElementById('start-watch-btn').disabled = false;
          document.getElementById('stop-watch-btn').disabled = true;
        }
      }

      function clearLocationHistory() {
        locationHistory = [];
        locationHistoryElement.innerHTML = '';
        log(watchLocationDisplay, '🧹 Histórico limpo');
      }

      function updateLocationHistory() {
        locationHistoryElement.innerHTML = '';

        // Mostrar últimas 5 posições
        const recent = locationHistory.slice(-5).reverse();

        recent.forEach((entry, index) => {
          const card = document.createElement('div');
          card.className = 'location-card';

          const accuracy = getAccuracyLevel(entry.position.coords.accuracy);
          const speed = entry.position.coords.speed
            ? `${(entry.position.coords.speed * 3.6).toFixed(1)} km/h`
            : 'N/A';

          card.innerHTML = `
                    <h4>📍 Posição ${locationHistory.length - index}</h4>
                    <p><strong>Coordenadas:</strong> ${entry.position.coords.latitude.toFixed(
                      6
                    )}, ${entry.position.coords.longitude.toFixed(6)}</p>
                    <p><strong>Precisão:</strong> <span class="accuracy-indicator accuracy-${
                      accuracy.level
                    }">${entry.position.coords.accuracy.toFixed(1)}m</span></p>
                    <p><strong>Velocidade:</strong> ${speed}</p>
                    <p><strong>Horário:</strong> ${entry.timestamp.toLocaleTimeString()}</p>
                `;

          locationHistoryElement.appendChild(card);
        });
      }

      // 4. CALCULADORA DE DISTÂNCIA
      function calculateDistance() {
        const latA = parseFloat(document.getElementById('lat-a').value);
        const lngA = parseFloat(document.getElementById('lng-a').value);
        const latB = parseFloat(document.getElementById('lat-b').value);
        const lngB = parseFloat(document.getElementById('lng-b').value);

        if (isNaN(latA) || isNaN(lngA) || isNaN(latB) || isNaN(lngB)) {
          alert('Por favor, preencha todas as coordenadas!');
          return;
        }

        const distance = calculateDistanceBetweenPoints(latA, lngA, latB, lngB);
        const bearing = calculateBearing(latA, lngA, latB, lngB);

        distanceResult.innerHTML = `
                <div class="location-card">
                    <h4>📏 Resultado da Distância</h4>
                    <p><strong>Distância:</strong> ${distance.toFixed(
                      2
                    )} metros (${(distance / 1000).toFixed(2)} km)</p>
                    <p><strong>Direção:</strong> ${bearing.toFixed(
                      1
                    )}° (${getCompassDirection(bearing)})</p>
                    <p><strong>Ponto A:</strong> ${latA}, ${lngA}</p>
                    <p><strong>Ponto B:</strong> ${latB}, ${lngB}</p>
                </div>
            `;
      }

      function useCurrentLocationForA() {
        if (!currentPosition) {
          alert('Obtenha sua localização atual primeiro!');
          return;
        }

        document.getElementById('lat-a').value =
          currentPosition.coords.latitude;
        document.getElementById('lng-a').value =
          currentPosition.coords.longitude;
      }

      function setCityCoordinates() {
        // São Paulo
        document.getElementById('lat-a').value = -23.5505;
        document.getElementById('lng-a').value = -46.6333;

        // Rio de Janeiro
        document.getElementById('lat-b').value = -22.9068;
        document.getElementById('lng-b').value = -43.1729;
      }

      // 5. INFORMAÇÕES DETALHADAS
      function getLocationDetails() {
        if (!currentPosition) {
          alert('Obtenha sua localização primeiro!');
          return;
        }

        const pos = currentPosition.coords;
        const accuracy = getAccuracyLevel(pos.accuracy);

        const details = `
=== DETALHES DA LOCALIZAÇÃO ===
Latitude: ${pos.latitude}
Longitude: ${pos.longitude}
Precisão: ${pos.accuracy.toFixed(1)}m (${accuracy.description})
Altitude: ${pos.altitude ? pos.altitude.toFixed(1) + 'm' : 'N/A'}
Precisão da Altitude: ${
          pos.altitudeAccuracy ? pos.altitudeAccuracy.toFixed(1) + 'm' : 'N/A'
        }
Direção: ${pos.heading ? pos.heading.toFixed(1) + '°' : 'N/A'}
Velocidade: ${pos.speed ? (pos.speed * 3.6).toFixed(1) + ' km/h' : 'N/A'}
Timestamp: ${new Date(currentPosition.timestamp).toLocaleString()}

=== INFORMAÇÕES TÉCNICAS ===
Fonte: ${getLocationSource(pos.accuracy)}
Coordenadas Decimais: ${pos.latitude.toFixed(6)}, ${pos.longitude.toFixed(6)}
Formato DMS: ${convertToDMS(pos.latitude, pos.longitude)}
            `;

        detailsDisplay.textContent = details;
      }

      async function reverseGeocode() {
        if (!currentPosition) {
          alert('Obtenha sua localização primeiro!');
          return;
        }

        const lat = currentPosition.coords.latitude;
        const lng = currentPosition.coords.longitude;

        try {
          log(detailsDisplay, '🏠 Buscando endereço...');

          // Usando Nominatim (OpenStreetMap) - gratuito
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
          );

          if (!response.ok) {
            throw new Error('Erro na geocodificação reversa');
          }

          const data = await response.json();

          const address = `
=== ENDEREÇO DA LOCALIZAÇÃO ===
Endereço Completo: ${data.display_name}

Detalhes:
${data.address.road ? `Rua: ${data.address.road}` : ''}
${data.address.house_number ? `Número: ${data.address.house_number}` : ''}
${data.address.neighbourhood ? `Bairro: ${data.address.neighbourhood}` : ''}
${
  data.address.city || data.address.town
    ? `Cidade: ${data.address.city || data.address.town}`
    : ''
}
${data.address.state ? `Estado: ${data.address.state}` : ''}
${data.address.country ? `País: ${data.address.country}` : ''}
${data.address.postcode ? `CEP: ${data.address.postcode}` : ''}
                `;

          detailsDisplay.textContent = address;
        } catch (error) {
          log(
            detailsDisplay,
            `❌ Erro ao buscar endereço: ${error.message}`,
            'error'
          );
        }
      }

      async function getNearbyPlaces() {
        if (!currentPosition) {
          alert('Obtenha sua localização primeiro!');
          return;
        }

        const lat = currentPosition.coords.latitude;
        const lng = currentPosition.coords.longitude;

        try {
          log(detailsDisplay, '📍 Buscando lugares próximos...');

          // Simulação de lugares próximos (normalmente usaria Google Places API)
          const places = [
            {
              name: 'Farmácia',
              type: 'pharmacy',
              distance: Math.random() * 500,
            },
            {
              name: 'Supermercado',
              type: 'supermarket',
              distance: Math.random() * 800,
            },
            {
              name: 'Posto de Gasolina',
              type: 'gas_station',
              distance: Math.random() * 600,
            },
            {
              name: 'Restaurante',
              type: 'restaurant',
              distance: Math.random() * 400,
            },
            { name: 'Banco', type: 'bank', distance: Math.random() * 700 },
            {
              name: 'Hospital',
              type: 'hospital',
              distance: Math.random() * 1200,
            },
          ];

          nearbyPlacesElement.innerHTML = '';

          places.forEach((place) => {
            const placeCard = document.createElement('div');
            placeCard.className = 'place-card';

            const icon = getPlaceIcon(place.type);

            placeCard.innerHTML = `
                        <h4>${icon} ${place.name}</h4>
                        <p><strong>Tipo:</strong> ${place.type}</p>
                        <p><strong>Distância:</strong> ${place.distance.toFixed(
                          0
                        )}m</p>
                        <button class="btn" onclick="getDirections('${
                          place.name
                        }')">🗺️ Direções</button>
                    `;

            nearbyPlacesElement.appendChild(placeCard);
          });

          log(
            detailsDisplay,
            `✅ ${places.length} lugares encontrados`,
            'success'
          );
        } catch (error) {
          log(detailsDisplay, `❌ Erro: ${error.message}`, 'error');
        }
      }

      async function getWeatherInfo() {
        if (!currentPosition) {
          alert('Obtenha sua localização primeiro!');
          return;
        }

        try {
          log(detailsDisplay, '🌤️ Buscando informações do tempo...');

          // Simulação de dados meteorológicos
          // Em produção, usaria OpenWeatherMap API ou similar
          const weather = {
            temperature: Math.round(Math.random() * 20 + 15),
            condition: [
              'Ensolarado',
              'Nublado',
              'Chuvoso',
              'Parcialmente nublado',
            ][Math.floor(Math.random() * 4)],
            humidity: Math.round(Math.random() * 40 + 40),
            windSpeed: Math.round(Math.random() * 20 + 5),
          };

          const weatherInfo = `
=== INFORMAÇÕES METEOROLÓGICAS ===
🌡️ Temperatura: ${weather.temperature}°C
☁️ Condição: ${weather.condition}
💧 Umidade: ${weather.humidity}%
💨 Vento: ${weather.windSpeed} km/h
📅 Atualizado: ${new Date().toLocaleTimeString()}

Nota: Dados simulados para demonstração
                `;

          detailsDisplay.textContent = weatherInfo;
        } catch (error) {
          log(detailsDisplay, `❌ Erro: ${error.message}`, 'error');
        }
      }

      // 6. MAPA E VISUALIZAÇÃO
      function showLocationOnMap() {
        if (!currentPosition) {
          mapContainer.innerHTML = '🗺️ Obtenha sua localização primeiro';
          return;
        }

        const lat = currentPosition.coords.latitude;
        const lng = currentPosition.coords.longitude;
        const accuracy = currentPosition.coords.accuracy;

        // Criar um mapa simples com ASCII art
        mapContainer.innerHTML = `
                <div style="text-align: center; color: #333;">
                    <h3>📍 Sua Localização</h3>
                    <p><strong>Coordenadas:</strong> ${lat.toFixed(
                      6
                    )}, ${lng.toFixed(6)}</p>
                    <p><strong>Precisão:</strong> ±${accuracy.toFixed(1)}m</p>
                    <div style="font-size: 48px; margin: 20px;">📍</div>
                    <p>Clique nos botões abaixo para abrir em apps de mapa</p>
                </div>
            `;
      }

      function openInGoogleMaps() {
        if (!currentPosition) {
          alert('Obtenha sua localização primeiro!');
          return;
        }

        const lat = currentPosition.coords.latitude;
        const lng = currentPosition.coords.longitude;

        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, '_blank');
      }

      function openInAppleMaps() {
        if (!currentPosition) {
          alert('Obtenha sua localização primeiro!');
          return;
        }

        const lat = currentPosition.coords.latitude;
        const lng = currentPosition.coords.longitude;

        const url = `http://maps.apple.com/?q=${lat},${lng}`;
        window.open(url, '_blank');
      }

      function shareLocation() {
        if (!currentPosition) {
          alert('Obtenha sua localização primeiro!');
          return;
        }

        const lat = currentPosition.coords.latitude;
        const lng = currentPosition.coords.longitude;

        const locationText = `Minha localização: ${lat.toFixed(
          6
        )}, ${lng.toFixed(6)}`;
        const locationUrl = `https://www.google.com/maps?q=${lat},${lng}`;

        if (navigator.share) {
          navigator.share({
            title: 'Minha Localização',
            text: locationText,
            url: locationUrl,
          });
        } else {
          // Fallback para cópia
          navigator.clipboard
            .writeText(`${locationText}\n${locationUrl}`)
            .then(() => {
              alert('Localização copiada para a área de transferência!');
            });
        }
      }

      // 7. FUNÇÕES UTILITÁRIAS
      function displayLocationInfo(position, element, index = null) {
        const coords = position.coords;
        const accuracy = getAccuracyLevel(coords.accuracy);
        const timestamp = new Date(position.timestamp);

        const info = `
${
  index ? `[${index}] ` : ''
}Localização obtida em ${timestamp.toLocaleTimeString()}:
📍 Latitude: ${coords.latitude.toFixed(6)}
📍 Longitude: ${coords.longitude.toFixed(6)}
🎯 Precisão: ${coords.accuracy.toFixed(1)}m (${accuracy.description})
${coords.altitude ? `⛰️ Altitude: ${coords.altitude.toFixed(1)}m` : ''}
${coords.speed ? `🚗 Velocidade: ${(coords.speed * 3.6).toFixed(1)} km/h` : ''}
${coords.heading ? `🧭 Direção: ${coords.heading.toFixed(1)}°` : ''}
            `;

        log(element, info, 'success');
      }

      function createLocationCard(position) {
        const coords = position.coords;
        const accuracy = getAccuracyLevel(coords.accuracy);

        currentLocationCard.style.display = 'block';
        currentLocationCard.innerHTML = `
                <div class="coordinates">
                    <h3>📍 Sua Localização Atual</h3>
                    <p><strong>Latitude:</strong> ${coords.latitude.toFixed(
                      6
                    )}</p>
                    <p><strong>Longitude:</strong> ${coords.longitude.toFixed(
                      6
                    )}</p>
                    <p><strong>Precisão:</strong>
                        <span class="accuracy-indicator accuracy-${
                          accuracy.level
                        }">
                            ±${coords.accuracy.toFixed(1)}m
                        </span>
                    </p>
                    <p><strong>Obtido em:</strong> ${new Date(
                      position.timestamp
                    ).toLocaleString()}</p>
                </div>
            `;
      }

      function getErrorMessage(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            return 'Permissão negada pelo usuário';
          case error.POSITION_UNAVAILABLE:
            return 'Localização indisponível';
          case error.TIMEOUT:
            return 'Timeout na solicitação';
          default:
            return 'Erro desconhecido';
        }
      }

      function getAccuracyLevel(accuracy) {
        if (accuracy <= 10) {
          return { level: 'high', description: 'Alta precisão' };
        } else if (accuracy <= 100) {
          return { level: 'medium', description: 'Precisão média' };
        } else {
          return { level: 'low', description: 'Baixa precisão' };
        }
      }

      function getLocationSource(accuracy) {
        if (accuracy <= 10) return 'GPS';
        if (accuracy <= 100) return 'GPS/WiFi';
        return 'Rede/WiFi';
      }

      function calculateDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Raio da Terra em metros
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
      }

      function calculateBearing(lat1, lon1, lat2, lon2) {
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const y = Math.sin(Δλ) * Math.cos(φ2);
        const x =
          Math.cos(φ1) * Math.sin(φ2) -
          Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

        const bearing = (Math.atan2(y, x) * 180) / Math.PI;

        return (bearing + 360) % 360;
      }

      function getCompassDirection(bearing) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(bearing / 45) % 8];
      }

      function convertToDMS(lat, lng) {
        function toDMS(coord, isLat) {
          const absolute = Math.abs(coord);
          const degrees = Math.floor(absolute);
          const minutesFloat = (absolute - degrees) * 60;
          const minutes = Math.floor(minutesFloat);
          const seconds = (minutesFloat - minutes) * 60;

          const direction = isLat
            ? coord >= 0
              ? 'N'
              : 'S'
            : coord >= 0
            ? 'E'
            : 'W';

          return `${degrees}°${minutes}'${seconds.toFixed(2)}"${direction}`;
        }

        return `${toDMS(lat, true)}, ${toDMS(lng, false)}`;
      }

      function getPlaceIcon(type) {
        const icons = {
          pharmacy: '💊',
          supermarket: '🛒',
          gas_station: '⛽',
          restaurant: '🍽️',
          bank: '🏦',
          hospital: '🏥',
        };

        return icons[type] || '📍';
      }

      function log(element, message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix =
          type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';

        element.textContent =
          `[${timestamp}] ${prefix} ${message}\n` + element.textContent;
      }

      // Funções placeholder para demonstração
      function getRoute() {
        alert(
          '🗺️ Em uma aplicação real, aqui você integraria com APIs de rota como Google Directions'
        );
      }

      function getDirections(placeName) {
        alert(`🗺️ Direções para ${placeName} - Integração com API de direções`);
      }

      // Inicialização
      window.addEventListener('load', () => {
        checkGeolocationSupport();

        log(currentLocationDisplay, 'Geolocation API Demo carregado');
        log(watchLocationDisplay, 'Sistema de rastreamento pronto');
        log(detailsDisplay, 'Recursos de informações detalhadas disponíveis');

        console.log('📍 Geolocation API Demo carregado!');
        console.log(
          '🔐 Lembre-se: sites precisam de HTTPS para geolocalização'
        );
      });
    </script>
  </body>
</html>
```

---

## 🎓 Pontos-Chave das APIs Modernas

### ✅ **Fetch API**

- **Promises nativas** - Mais limpo que XMLHttpRequest
- **Async/await** - Sintaxe moderna e legível
- **Headers customizados** - Controle total das requisições
- **Timeout e AbortController** - Controle de cancelamento
- **Tratamento de erros** - Always check `response.ok`

### ✅ **Storage APIs**

- **LocalStorage** - Persistente, ~5-10MB, síncrono
- **SessionStorage** - Temporário, mesmas limitações
- **IndexedDB** - Banco NoSQL, ~250MB+, assíncrono
- **Cache inteligente** - Implementar TTL e invalidação

### ✅ **Geolocation API**

- **Permissão necessária** - Sempre tratar negação
- **HTTPS obrigatório** - Não funciona em HTTP
- **Opções de precisão** - Balance performance vs precisão
- **Tratamento de erros** - Timeout, permissão, disponibilidade

---
