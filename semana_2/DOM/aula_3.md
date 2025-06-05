# Eventos DOM

Olá! Agora que você já domina a manipulação do DOM, vamos dar vida às suas páginas aprendendo sobre **Eventos**! Os eventos são o que tornam as páginas web verdadeiramente interativas e responsivas às ações dos usuários.

## 📋 O que vamos aprender hoje?

1. O que são eventos e como funcionam
2. Como usar `addEventListener()` - a melhor prática
3. Objetos de evento e suas propriedades
4. Prevenir comportamentos padrão
5. Diferentes mecanismos de escuta de eventos
6. Exercícios práticos para dominar o conceito

---

## 🤔 O que é um Evento?

**Eventos são "coisas que acontecem"** no sistema que você está programando. O navegador nos "avisa" quando algo importante acontece, permitindo que nosso código reaja a essas situações.

### 🎭 Analogia do Teatro

Imagine que você está assistindo uma peça de teatro:

- **Evento**: O ator entra no palco
- **Event Handler**: A luz do palco se acende automaticamente
- **addEventListener**: O técnico de som que "escuta" a entrada do ator

### 📝 Tipos Comuns de Eventos

```javascript
// Eventos de mouse
'click'; // Clique do mouse
'dblclick'; // Clique duplo
'mouseover'; // Mouse sobre o elemento
'mouseout'; // Mouse sai do elemento
'mousedown'; // Botão do mouse pressionado
'mouseup'; // Botão do mouse solto

// Eventos de teclado
'keydown'; // Tecla pressionada
'keyup'; // Tecla solta
'keypress'; // Tecla pressionada (caracteres)

// Eventos de formulário
'submit'; // Formulário enviado
'change'; // Valor do input mudou
'input'; // Conteúdo do input mudou (tempo real)
'focus'; // Elemento recebeu foco
'blur'; // Elemento perdeu foco

// Eventos da página
'load'; // Página carregou completamente
'resize'; // Janela foi redimensionada
'scroll'; // Página foi rolada
```

---

## 🎧 Usando addEventListener() - A Melhor Prática

### 🔧 Sintaxe Básica

```javascript
elemento.addEventListener('tipoDoEvento', funcaoHandler);
```

### 💻 Exemplo Prático Completo

Vamos criar uma aplicação interativa que demonstra vários tipos de eventos:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Laboratório de Eventos DOM</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        background: #f5f5f5;
      }

      .section {
        background: white;
        margin: 20px 0;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .demo-button {
        background: #007bff;
        color: white;
        border: none;
        padding: 12px 24px;
        margin: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
      }

      .demo-button:hover {
        background: #0056b3;
        transform: translateY(-2px);
      }

      .demo-button:active {
        transform: translateY(0);
      }

      .demo-button.focused {
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      }

      .color-box {
        width: 200px;
        height: 100px;
        border: 2px solid #ddd;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .event-log {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 15px;
        margin: 10px 0;
        border-radius: 5px;
        height: 150px;
        overflow-y: auto;
        font-family: monospace;
        font-size: 14px;
      }

      .input-demo {
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        margin: 10px 0;
        width: 100%;
        box-sizing: border-box;
      }

      .input-demo:focus {
        border-color: #007bff;
        outline: none;
      }

      .keyboard-display {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 5px;
        margin: 10px 0;
        font-family: monospace;
        font-size: 18px;
        text-align: center;
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .form-demo {
        border: 2px solid #dee2e6;
        padding: 20px;
        border-radius: 5px;
        margin: 10px 0;
      }

      .error-message {
        color: #dc3545;
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        display: none;
      }

      .success-message {
        color: #155724;
        background: #d4edda;
        border: 1px solid #c3e6cb;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        display: none;
      }
    </style>
  </head>
  <body>
    <h1>🎯 Laboratório de Eventos DOM</h1>

    <!-- 1. EVENTOS DE CLIQUE -->
    <div class="section">
      <h2>🖱️ 1. Eventos de Mouse</h2>
      <button class="demo-button" id="color-btn">Mudar Cor de Fundo</button>
      <button class="demo-button" id="reset-btn">Resetar</button>

      <div class="color-box" id="hover-box">Passe o mouse aqui!</div>

      <div class="event-log" id="mouse-log"></div>
    </div>

    <!-- 2. EVENTOS DE TECLADO -->
    <div class="section">
      <h2>⌨️ 2. Eventos de Teclado</h2>
      <input
        type="text"
        class="input-demo"
        id="keyboard-input"
        placeholder="Digite algo aqui..."
      />

      <div class="keyboard-display" id="key-display">
        Pressione uma tecla...
      </div>

      <div class="event-log" id="keyboard-log"></div>
    </div>

    <!-- 3. EVENTOS DE FOCO -->
    <div class="section">
      <h2>🎯 3. Eventos de Foco</h2>
      <button class="demo-button" id="focus-btn1">Botão 1</button>
      <button class="demo-button" id="focus-btn2">Botão 2</button>
      <button class="demo-button" id="focus-btn3">Botão 3</button>

      <div class="event-log" id="focus-log"></div>
    </div>

    <!-- 4. PREVENÇÃO DE COMPORTAMENTO PADRÃO -->
    <div class="section">
      <h2>🚫 4. Prevenindo Comportamento Padrão</h2>

      <form class="form-demo" id="demo-form">
        <div>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" class="input-demo" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" class="input-demo" required />
        </div>
        <button type="submit" class="demo-button">Enviar Formulário</button>
      </form>

      <div class="error-message" id="form-error"></div>
      <div class="success-message" id="form-success"></div>
    </div>

    <!-- 5. MÚLTIPLOS EVENT LISTENERS -->
    <div class="section">
      <h2>🔢 5. Múltiplos Event Listeners</h2>
      <button class="demo-button" id="multi-btn">
        Botão com Múltiplos Listeners
      </button>
      <button class="demo-button" id="remove-listeners">
        Remover Listeners
      </button>

      <div class="event-log" id="multi-log"></div>
    </div>

    <script>
      // UTILITÁRIOS
      function log(logElement, message) {
        const time = new Date().toLocaleTimeString();
        logElement.innerHTML += `[${time}] ${message}<br>`;
        logElement.scrollTop = logElement.scrollHeight;
      }

      function random(max) {
        return Math.floor(Math.random() * (max + 1));
      }

      function randomColor() {
        return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
      }

      // ELEMENTOS DO DOM
      const colorBtn = document.getElementById('color-btn');
      const resetBtn = document.getElementById('reset-btn');
      const hoverBox = document.getElementById('hover-box');
      const mouseLog = document.getElementById('mouse-log');

      const keyboardInput = document.getElementById('keyboard-input');
      const keyDisplay = document.getElementById('key-display');
      const keyboardLog = document.getElementById('keyboard-log');

      const focusBtn1 = document.getElementById('focus-btn1');
      const focusBtn2 = document.getElementById('focus-btn2');
      const focusBtn3 = document.getElementById('focus-btn3');
      const focusLog = document.getElementById('focus-log');

      const demoForm = document.getElementById('demo-form');
      const nomeInput = document.getElementById('nome');
      const emailInput = document.getElementById('email');
      const formError = document.getElementById('form-error');
      const formSuccess = document.getElementById('form-success');

      const multiBtn = document.getElementById('multi-btn');
      const removeListenersBtn = document.getElementById('remove-listeners');
      const multiLog = document.getElementById('multi-log');

      // 1. EVENTOS DE MOUSE

      // Evento de clique simples
      colorBtn.addEventListener('click', function () {
        const newColor = randomColor();
        document.body.style.backgroundColor = newColor;
        log(mouseLog, `🎨 Cor alterada para: ${newColor}`);
      });

      // Botão de reset
      resetBtn.addEventListener('reset', function () {
        document.body.style.backgroundColor = '#f5f5f5';
        log(mouseLog, '🔄 Cor resetada');
      });

      // Eventos de hover
      hoverBox.addEventListener('mouseover', function (event) {
        event.target.style.backgroundColor = randomColor();
        event.target.style.transform = 'scale(1.1)';
        log(mouseLog, '🐭 Mouse entrou na caixa');
      });

      hoverBox.addEventListener('mouseout', function (event) {
        event.target.style.backgroundColor = '#f8f9fa';
        event.target.style.transform = 'scale(1)';
        log(mouseLog, '🐭 Mouse saiu da caixa');
      });

      // Clique duplo
      hoverBox.addEventListener('dblclick', function () {
        this.style.borderRadius =
          this.style.borderRadius === '50%' ? '5px' : '50%';
        log(mouseLog, '🖱️ Clique duplo - forma alterada');
      });

      // 2. EVENTOS DE TECLADO

      keyboardInput.addEventListener('keydown', function (event) {
        keyDisplay.textContent = `Tecla pressionada: "${event.key}" (Código: ${event.keyCode})`;
        log(keyboardLog, `⬇️ KeyDown: "${event.key}"`);

        // Exemplo de tecla especial
        if (event.key === 'Enter') {
          keyDisplay.style.backgroundColor = '#28a745';
          log(keyboardLog, '✅ Enter pressionado!');
        } else if (event.key === 'Escape') {
          keyboardInput.value = '';
          keyDisplay.textContent = 'Campo limpo com ESC';
          keyDisplay.style.backgroundColor = '#dc3545';
          log(keyboardLog, '🧹 ESC - campo limpo');
        } else {
          keyDisplay.style.backgroundColor = '#343a40';
        }
      });

      keyboardInput.addEventListener('keyup', function (event) {
        log(keyboardLog, `⬆️ KeyUp: "${event.key}"`);
      });

      // Evento input para mudanças em tempo real
      keyboardInput.addEventListener('input', function (event) {
        log(keyboardLog, `📝 Input: "${event.target.value}"`);
      });

      // 3. EVENTOS DE FOCO

      const focusButtons = [focusBtn1, focusBtn2, focusBtn3];

      focusButtons.forEach((btn, index) => {
        btn.addEventListener('focus', function () {
          this.classList.add('focused');
          log(focusLog, `🎯 Botão ${index + 1} recebeu foco`);
        });

        btn.addEventListener('blur', function () {
          this.classList.remove('focused');
          log(focusLog, `😴 Botão ${index + 1} perdeu foco`);
        });
      });

      // 4. PREVENÇÃO DE COMPORTAMENTO PADRÃO

      demoForm.addEventListener('submit', function (event) {
        // Limpar mensagens anteriores
        formError.style.display = 'none';
        formSuccess.style.display = 'none';

        // Validação simples
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();

        if (nome === '' || email === '') {
          // PREVENIR o envio do formulário
          event.preventDefault();

          formError.textContent = 'Por favor, preencha todos os campos!';
          formError.style.display = 'block';

          log(focusLog, '❌ Formulário inválido - envio bloqueado');
          return;
        }

        if (nome.length < 2) {
          event.preventDefault();
          formError.textContent = 'Nome deve ter pelo menos 2 caracteres!';
          formError.style.display = 'block';
          return;
        }

        // Se chegou aqui, o formulário é válido
        // Mas vamos prevenir o envio real para demonstração
        event.preventDefault();

        formSuccess.textContent = `✅ Formulário válido! Nome: ${nome}, Email: ${email}`;
        formSuccess.style.display = 'block';

        log(focusLog, '✅ Formulário validado com sucesso');
      });

      // 5. MÚLTIPLOS EVENT LISTENERS

      // Função 1
      function listener1() {
        log(multiLog, '🔵 Listener 1 executado');
      }

      // Função 2
      function listener2() {
        log(multiLog, '🟢 Listener 2 executado');
      }

      // Função 3
      function listener3() {
        log(multiLog, '🟡 Listener 3 executado');
      }

      // Adicionar múltiplos listeners
      multiBtn.addEventListener('click', listener1);
      multiBtn.addEventListener('click', listener2);
      multiBtn.addEventListener('click', listener3);

      // Demonstrar como remover listeners
      removeListenersBtn.addEventListener('click', function () {
        multiBtn.removeEventListener('click', listener2); // Remove apenas o listener 2
        log(multiLog, '❌ Listener 2 removido');
      });

      // 6. EXEMPLO AVANÇADO: OBJETO DE EVENTO

      document.addEventListener('click', function (event) {
        // Só logar se não for nos elementos de log para evitar spam
        if (!event.target.classList.contains('event-log')) {
          console.log('=== PROPRIEDADES DO EVENTO DE CLIQUE ===');
          console.log('Tipo do evento:', event.type);
          console.log('Elemento alvo:', event.target);
          console.log('Posição X:', event.clientX);
          console.log('Posição Y:', event.clientY);
          console.log('Tecla Ctrl pressionada?', event.ctrlKey);
          console.log('Tecla Shift pressionada?', event.shiftKey);
          console.log('Botão do mouse:', event.button); // 0=esquerdo, 1=meio, 2=direito
        }
      });

      // INICIALIZAÇÃO
      window.addEventListener('load', function () {
        log(mouseLog, '🚀 Laboratório de eventos carregado!');
        log(keyboardLog, '⌨️ Digite no campo acima para ver os eventos');
        log(focusLog, '🎯 Use TAB para navegar entre os botões');
        log(multiLog, '🔢 Clique no botão para ver múltiplos listeners');

        console.log('🎯 Laboratório de Eventos DOM carregado!');
        console.log(
          '💡 Dica: Abra o console para ver informações detalhadas dos eventos'
        );
      });
    </script>
  </body>
</html>
```

---

## 📦 Objetos de Evento

### 🔍 O que são Objetos de Evento?

Quando um evento acontece, o navegador cria automaticamente um **objeto de evento** que contém informações detalhadas sobre o que aconteceu.

```javascript
button.addEventListener('click', function (event) {
  console.log('Tipo do evento:', event.type);
  console.log('Elemento que disparou:', event.target);
  console.log('Posição X do mouse:', event.clientX);
  console.log('Posição Y do mouse:', event.clientY);
});
```

### 🎯 Propriedades Importantes do Objeto Event

```javascript
// Propriedades comuns a todos os eventos
event.type; // Tipo do evento ('click', 'keydown', etc.)
event.target; // Elemento que disparou o evento
event.currentTarget; // Elemento que está ouvindo o evento
event.timeStamp; // Quando o evento aconteceu

// Para eventos de mouse
event.clientX; // Posição X do mouse na janela
event.clientY; // Posição Y do mouse na janela
event.button; // Qual botão foi clicado (0=esquerdo, 1=meio, 2=direito)
event.ctrlKey; // Tecla Ctrl estava pressionada?
event.shiftKey; // Tecla Shift estava pressionada?
event.altKey; // Tecla Alt estava pressionada?

// Para eventos de teclado
event.key; // Qual tecla foi pressionada ('Enter', 'a', 'ArrowUp')
event.keyCode; // Código numérico da tecla (deprecado, use 'key')
event.code; // Código físico da tecla ('KeyA', 'Enter')
```

### 💻 Exemplo Prático: Analisador de Eventos

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Analisador de Eventos</title>
    <style>
      .analyzer {
        max-width: 600px;
        margin: 20px auto;
        font-family: Arial, sans-serif;
      }

      .test-area {
        background: #f8f9fa;
        border: 2px solid #dee2e6;
        padding: 40px;
        text-align: center;
        margin: 20px 0;
        border-radius: 8px;
        cursor: pointer;
      }

      .info-panel {
        background: #343a40;
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-family: monospace;
        white-space: pre-line;
      }
    </style>
  </head>
  <body>
    <div class="analyzer">
      <h1>🔍 Analisador de Eventos</h1>

      <div class="test-area" id="test-area">
        <h2>Área de Teste</h2>
        <p>Clique, mova o mouse, ou pressione teclas aqui!</p>
      </div>

      <div class="info-panel" id="info-panel">Aguardando eventos...</div>
    </div>

    <script>
      const testArea = document.getElementById('test-area');
      const infoPanel = document.getElementById('info-panel');

      function updateInfo(event) {
        const info = `
EVENTO: ${event.type.toUpperCase()}
────────────────────────
Elemento alvo: ${event.target.tagName}
Horário: ${new Date(event.timeStamp).toLocaleTimeString()}

${
  event.type.includes('mouse')
    ? `
🖱️ DADOS DO MOUSE:
Posição X: ${event.clientX}px
Posição Y: ${event.clientY}px
Botão: ${event.button} (0=esquerdo, 1=meio, 2=direito)
Ctrl: ${event.ctrlKey ? 'SIM' : 'NÃO'}
Shift: ${event.shiftKey ? 'SIM' : 'NÃO'}
Alt: ${event.altKey ? 'SIM' : 'NÃO'}
`
    : ''
}

${
  event.type.includes('key')
    ? `
⌨️ DADOS DO TECLADO:
Tecla: "${event.key}"
Código: ${event.code}
Ctrl: ${event.ctrlKey ? 'SIM' : 'NÃO'}
Shift: ${event.shiftKey ? 'SIM' : 'NÃO'}
Alt: ${event.altKey ? 'SIM' : 'NÃO'}
`
    : ''
}
            `;

        infoPanel.textContent = info.trim();
      }

      // Eventos de mouse
      testArea.addEventListener('click', updateInfo);
      testArea.addEventListener('mousemove', updateInfo);
      testArea.addEventListener('mousedown', updateInfo);
      testArea.addEventListener('mouseup', updateInfo);

      // Eventos de teclado (no documento para capturar de qualquer lugar)
      document.addEventListener('keydown', updateInfo);
      document.addEventListener('keyup', updateInfo);
    </script>
  </body>
</html>
```

---

## 🚫 Prevenindo Comportamento Padrão

### 🤔 Quando Usar preventDefault()?

```javascript
// Exemplos comuns de uso do preventDefault()

// 1. Validação de formulários
form.addEventListener('submit', function (event) {
  if (!isValid()) {
    event.preventDefault(); // Impede o envio
    showError();
  }
});

// 2. Links customizados
link.addEventListener('click', function (event) {
  event.preventDefault(); // Impede a navegação
  // Executar ação customizada
  showModal();
});

// 3. Teclas especiais
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Impede quebra de linha
    saveData();
  }
});
```

### 💻 Exemplo: Sistema de Validação Avançado

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Sistema de Validação</title>
    <style>
      .form-container {
        max-width: 500px;
        margin: 20px auto;
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      .field {
        margin-bottom: 20px;
      }

      .field label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      .field input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
      }

      .field input.valid {
        border-color: #28a745;
      }

      .field input.invalid {
        border-color: #dc3545;
      }

      .error {
        color: #dc3545;
        font-size: 14px;
        margin-top: 5px;
        display: none;
      }

      .success {
        color: #28a745;
        font-size: 14px;
        margin-top: 5px;
        display: none;
      }

      .submit-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 12px 30px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
      }

      .submit-btn:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }
    </style>
  </head>
  <body>
    <div class="form-container">
      <h1>📝 Sistema de Validação Avançado</h1>

      <form id="validation-form">
        <div class="field">
          <label for="username">Nome de usuário:</label>
          <input type="text" id="username" required />
          <div class="error" id="username-error"></div>
          <div class="success" id="username-success"></div>
        </div>

        <div class="field">
          <label for="email">Email:</label>
          <input type="email" id="email" required />
          <div class="error" id="email-error"></div>
          <div class="success" id="email-success"></div>
        </div>

        <div class="field">
          <label for="password">Senha:</label>
          <input type="password" id="password" required />
          <div class="error" id="password-error"></div>
          <div class="success" id="password-success"></div>
        </div>

        <div class="field">
          <label for="confirm-password">Confirmar senha:</label>
          <input type="password" id="confirm-password" required />
          <div class="error" id="confirm-password-error"></div>
          <div class="success" id="confirm-password-success"></div>
        </div>

        <button type="submit" class="submit-btn" id="submit-btn" disabled>
          Criar Conta
        </button>
      </form>
    </div>

    <script>
      // Elementos do formulário
      const form = document.getElementById('validation-form');
      const usernameInput = document.getElementById('username');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirm-password');
      const submitBtn = document.getElementById('submit-btn');

      // Estado de validação
      const validationState = {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
      };

      // Funções de validação
      function validateUsername(value) {
        if (value.length < 3) {
          return {
            valid: false,
            message: 'Nome deve ter pelo menos 3 caracteres',
          };
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return {
            valid: false,
            message: 'Use apenas letras, números e underscore',
          };
        }
        return { valid: true, message: 'Nome válido!' };
      }

      function validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { valid: false, message: 'Email inválido' };
        }
        return { valid: true, message: 'Email válido!' };
      }

      function validatePassword(value) {
        if (value.length < 6) {
          return {
            valid: false,
            message: 'Senha deve ter pelo menos 6 caracteres',
          };
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return {
            valid: false,
            message: 'Senha deve ter maiúscula, minúscula e número',
          };
        }
        return { valid: true, message: 'Senha forte!' };
      }

      function validateConfirmPassword(value, originalPassword) {
        if (value !== originalPassword) {
          return { valid: false, message: 'Senhas não coincidem' };
        }
        if (value === '') {
          return { valid: false, message: 'Confirme sua senha' };
        }
        return { valid: true, message: 'Senhas coincidem!' };
      }

      // Função para atualizar UI
      function updateFieldUI(input, validation, fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const successElement = document.getElementById(`${fieldName}-success`);

        if (validation.valid) {
          input.classList.remove('invalid');
          input.classList.add('valid');
          errorElement.style.display = 'none';
          successElement.textContent = validation.message;
          successElement.style.display = 'block';
          validationState[fieldName] = true;
        } else {
          input.classList.remove('valid');
          input.classList.add('invalid');
          successElement.style.display = 'none';
          errorElement.textContent = validation.message;
          errorElement.style.display = 'block';
          validationState[fieldName] = false;
        }

        updateSubmitButton();
      }

      // Atualizar estado do botão submit
      function updateSubmitButton() {
        const allValid = Object.values(validationState).every((state) => state);
        submitBtn.disabled = !allValid;
      }

      // Event listeners para validação em tempo real
      usernameInput.addEventListener('input', function (event) {
        const validation = validateUsername(event.target.value);
        updateFieldUI(event.target, validation, 'username');
      });

      emailInput.addEventListener('input', function (event) {
        const validation = validateEmail(event.target.value);
        updateFieldUI(event.target, validation, 'email');
      });

      passwordInput.addEventListener('input', function (event) {
        const validation = validatePassword(event.target.value);
        updateFieldUI(event.target, validation, 'password');

        // Re-validar confirmação de senha se já foi preenchida
        if (confirmPasswordInput.value) {
          const confirmValidation = validateConfirmPassword(
            confirmPasswordInput.value,
            event.target.value
          );
          updateFieldUI(
            confirmPasswordInput,
            confirmValidation,
            'confirmPassword'
          );
        }
      });

      confirmPasswordInput.addEventListener('input', function (event) {
        const validation = validateConfirmPassword(
          event.target.value,
          passwordInput.value
        );
        updateFieldUI(event.target, validation, 'confirmPassword');
      });

      // Event listener do formulário
      form.addEventListener('submit', function (event) {
        event.preventDefault(); // SEMPRE prevenir o envio padrão

        // Validar todos os campos novamente
        const usernameValidation = validateUsername(usernameInput.value);
        const emailValidation = validateEmail(emailInput.value);
        const passwordValidation = validatePassword(passwordInput.value);
        const confirmPasswordValidation = validateConfirmPassword(
          confirmPasswordInput.value,
          passwordInput.value
        );

        // Atualizar UI para todos os campos
        updateFieldUI(usernameInput, usernameValidation, 'username');
        updateFieldUI(emailInput, emailValidation, 'email');
        updateFieldUI(passwordInput, passwordValidation, 'password');
        updateFieldUI(
          confirmPasswordInput,
          confirmPasswordValidation,
          'confirmPassword'
        );

        // Se tudo válido, simular envio
        if (Object.values(validationState).every((state) => state)) {
          alert('✅ Formulário válido! Conta criada com sucesso!');
          console.log('Dados do formulário:', {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
          });
        } else {
          alert('❌ Por favor, corrija os erros antes de continuar.');
        }
      });

      // Prevenir colar senhas fracas
      passwordInput.addEventListener('paste', function (event) {
        // Permitir colar, mas validar após um pequeno delay
        setTimeout(() => {
          const validation = validatePassword(event.target.value);
          updateFieldUI(event.target, validation, 'password');
        }, 10);
      });

      console.log('🚀 Sistema de validação carregado!');
    </script>
  </body>
</html>
```

---

## 🔄 Diferentes Mecanismos de Event Listeners

### 1. **addEventListener() - RECOMENDADO ✅**

```javascript
// Melhor prática - permite múltiplos listeners
button.addEventListener('click', function1);
button.addEventListener('click', function2); // Ambos executarão

// Fácil remoção
button.removeEventListener('click', function1);
```

### 2. **Event Handler Properties - OK para casos simples**

```javascript
// Propriedades onclick, onmouseover, etc.
button.onclick = function () {
  console.log('Clicou!');
};

// PROBLEMA: Sobrescreve listeners anteriores
button.onclick = outraFuncao; // A primeira função é perdida!
```

### 3. **Inline Event Handlers - ❌ EVITAR**

```html
<!-- NÃO FAÇA ISSO -->
<button onclick="alert('Não é uma boa prática!')">Clique</button>

<!-- PROBLEMAS: -->
<!-- 1. Mistura HTML com JavaScript -->
<!-- 2. Difícil de manter -->
<!-- 3. Problemas de segurança -->
<!-- 4. Não escala bem -->
```

---

## 🏋️ Exercícios Práticos

### **Exercício 1: Piano Virtual**

Crie um piano que:

- Tenha teclas que respondam a cliques e teclas do teclado
- Produza sons diferentes (use `new Audio()` ou console.log)
- Mostre qual tecla está sendo pressionada
- Permita tocar acordes (múltiplas teclas)

### **Exercício 2: Jogo de Reação**

Desenvolva um jogo onde:

- Um botão aparece em posição aleatória
- O usuário deve clicar o mais rápido possível
- Meça e exiba o tempo de reação
- Mantenha um ranking dos melhores tempos

### **Exercício 3: Editor de Texto Simples**

Construa um editor que:

- Responda a atalhos de teclado (Ctrl+B para negrito, etc.)
- Tenha contagem de caracteres em tempo real
- Implemente desfazer/refazer com Ctrl+Z/Ctrl+Y
- Salve automaticamente no localStorage

---

## 🎓 Pontos-Chave para Lembrar

### ✅ **Eventos Fundamentais**

- `addEventListener()` é sempre a melhor escolha
- Use `event.preventDefault()` para controlar comportamentos padrão
- O objeto `event` contém informações valiosas sobre o que aconteceu

### ✅ **Boas Práticas**

- Sempre remover event listeners quando não precisar mais deles
- Usar validação tanto no frontend quanto backend
- Separar lógica de apresentação
- Tratar erros adequadamente

### ✅ **Performance**

- Evitar muitos listeners em elementos individuais
- Considerar event delegation para listas grandes
- Usar `passive: true` para eventos de scroll quando possível

---

# 🚀 Aula Avançada: Event Bubbling, Delegation e Eventos Modernos

Parabéns por dominar os eventos básicos! Agora vamos explorar os conceitos avançados que vão elevar suas habilidades de desenvolvimento web para o próximo nível. Estes tópicos são essenciais para criar aplicações performáticas e bem estruturadas.

## 📋 O que vamos aprender hoje?

1. **Event Bubbling e Capturing** - Como eventos se propagam na árvore DOM
2. **Event Delegation** - Técnica poderosa para performance e código limpo
3. **Custom Events** - Criar e disparar seus próprios eventos
4. **Touch Events** - Suporte completo para dispositivos móveis
5. **Intersection Observer** - Scroll infinito e lazy loading modernos

---

## 🫧 Event Bubbling e Capturing

### 🤔 O que é Event Propagation?

Quando um evento acontece em um elemento, ele não fica "preso" apenas naquele elemento. O evento **propaga** (viaja) através da árvore DOM em duas fases:

1. **Capturing Phase** (Fase de Captura) - Do `document` até o elemento alvo
2. **Bubbling Phase** (Fase de Borbulhamento) - Do elemento alvo de volta ao `document`

### 🎭 Analogia da Pedra na Água

Imagine jogar uma pedra na água:

- **Capturing**: A pedra desce através das camadas de água
- **Target**: A pedra atinge o fundo
- **Bubbling**: As bolhas sobem de volta à superfície

### 💻 Demonstração Prática: Event Propagation

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Event Propagation Demo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        background: #f5f5f5;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .demo-area {
        border: 3px solid #007bff;
        padding: 20px;
        margin: 20px 0;
        background: #e3f2fd;
        cursor: pointer;
        position: relative;
      }

      .parent {
        border: 3px solid #28a745;
        padding: 20px;
        background: #e8f5e9;
        cursor: pointer;
      }

      .child {
        border: 3px solid #dc3545;
        padding: 20px;
        background: #ffebee;
        cursor: pointer;
      }

      .grandchild {
        border: 3px solid #ff9800;
        padding: 20px;
        background: #fff3e0;
        cursor: pointer;
      }

      .log-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 20px 0;
      }

      .event-log {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 15px;
        border-radius: 5px;
        height: 200px;
        overflow-y: auto;
        font-family: monospace;
        font-size: 14px;
      }

      .controls {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
      }

      .control-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        margin: 5px;
        border-radius: 4px;
        cursor: pointer;
      }

      .control-btn:hover {
        background: #0056b3;
      }

      .phase-indicator {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #ffc107;
        color: #212529;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🫧 Event Bubbling & Capturing Demo</h1>

      <div class="controls">
        <h3>🎛️ Controles</h3>
        <button class="control-btn" id="clear-logs">Limpar Logs</button>
        <button class="control-btn" id="toggle-capturing">
          Capturing: <span id="capturing-status">OFF</span>
        </button>
        <button class="control-btn" id="toggle-bubbling">
          Bubbling: <span id="bubbling-status">ON</span>
        </button>
      </div>

      <div class="demo-area" id="demo-area">
        <div class="phase-indicator" id="phase-indicator">
          Clique em qualquer lugar
        </div>
        <strong>🌐 Document/Window Level</strong>
        <div class="parent" id="parent">
          <strong>👨‍👩‍👧‍👦 Parent Element</strong>
          <div class="child" id="child">
            <strong>🧒 Child Element</strong>
            <div class="grandchild" id="grandchild">
              <strong>👶 Grandchild Element</strong>
              <p>Clique aqui para ver a propagação!</p>
            </div>
          </div>
        </div>
      </div>

      <div class="log-container">
        <div>
          <h3>📥 Capturing Phase</h3>
          <div class="event-log" id="capturing-log"></div>
        </div>
        <div>
          <h3>📤 Bubbling Phase</h3>
          <div class="event-log" id="bubbling-log"></div>
        </div>
      </div>

      <div
        style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;"
      >
        <h4>🎯 Como testar:</h4>
        <ol>
          <li>Clique no elemento mais interno (laranja)</li>
          <li>Observe como o evento viaja pelos elementos pais</li>
          <li>Use os controles para ativar/desativar as fases</li>
          <li>Experimente <code>stopPropagation()</code> no console</li>
        </ol>
      </div>
    </div>

    <script>
      // Elementos DOM
      const demoArea = document.getElementById('demo-area');
      const parent = document.getElementById('parent');
      const child = document.getElementById('child');
      const grandchild = document.getElementById('grandchild');
      const phaseIndicator = document.getElementById('phase-indicator');

      const capturingLog = document.getElementById('capturing-log');
      const bubblingLog = document.getElementById('bubbling-log');

      const clearLogsBtn = document.getElementById('clear-logs');
      const toggleCapturingBtn = document.getElementById('toggle-capturing');
      const toggleBubblingBtn = document.getElementById('toggle-bubbling');
      const capturingStatus = document.getElementById('capturing-status');
      const bubblingStatus = document.getElementById('bubbling-status');

      // Estado dos controles
      let capturingEnabled = false;
      let bubblingEnabled = true;

      // Utilitários
      function logEvent(logElement, phase, elementName, event) {
        const time = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.style.padding = '5px';
        logEntry.style.borderLeft = `4px solid ${getPhaseColor(phase)}`;
        logEntry.style.marginBottom = '5px';
        logEntry.style.background =
          phase === 'capturing' ? '#e3f2fd' : '#fff3e0';

        logEntry.innerHTML = `
                <strong>[${time}]</strong> ${phase.toUpperCase()}<br>
                <strong>Elemento:</strong> ${elementName}<br>
                <strong>Target:</strong> ${event.target.id || 'demo-area'}<br>
                <strong>Current:</strong> ${
                  event.currentTarget.id || 'demo-area'
                }
            `;

        logElement.appendChild(logEntry);
        logElement.scrollTop = logElement.scrollHeight;
      }

      function getPhaseColor(phase) {
        return phase === 'capturing' ? '#2196f3' : '#ff9800';
      }

      function updatePhaseIndicator(phase, element) {
        phaseIndicator.textContent = `${phase.toUpperCase()}: ${element}`;
        phaseIndicator.style.background = getPhaseColor(phase);
      }

      // Função para adicionar event listeners
      function addEventListeners() {
        const elements = [
          { element: document, name: 'Document' },
          { element: demoArea, name: 'Demo Area' },
          { element: parent, name: 'Parent' },
          { element: child, name: 'Child' },
          { element: grandchild, name: 'Grandchild' },
        ];

        elements.forEach(({ element, name }) => {
          // CAPTURING PHASE
          element.addEventListener(
            'click',
            function (event) {
              if (capturingEnabled) {
                logEvent(capturingLog, 'capturing', name, event);
                updatePhaseIndicator('capturing', name);

                // Demonstrar como parar a propagação
                if (name === 'Child' && event.ctrlKey) {
                  event.stopPropagation();
                  logEvent(
                    capturingLog,
                    'STOPPED',
                    name + ' (Ctrl+Click)',
                    event
                  );
                }
              }
            },
            true
          ); // true = capturing phase

          // BUBBLING PHASE
          element.addEventListener(
            'click',
            function (event) {
              if (bubblingEnabled) {
                logEvent(bubblingLog, 'bubbling', name, event);
                updatePhaseIndicator('bubbling', name);

                // Demonstrar como parar a propagação
                if (name === 'Child' && event.shiftKey) {
                  event.stopPropagation();
                  logEvent(
                    bubblingLog,
                    'STOPPED',
                    name + ' (Shift+Click)',
                    event
                  );
                }
              }
            },
            false
          ); // false = bubbling phase
        });
      }

      // Controles
      clearLogsBtn.addEventListener('click', function () {
        capturingLog.innerHTML = '';
        bubblingLog.innerHTML = '';
        phaseIndicator.textContent = 'Logs limpos';
      });

      toggleCapturingBtn.addEventListener('click', function () {
        capturingEnabled = !capturingEnabled;
        capturingStatus.textContent = capturingEnabled ? 'ON' : 'OFF';
        capturingStatus.style.color = capturingEnabled ? '#28a745' : '#dc3545';
      });

      toggleBubblingBtn.addEventListener('click', function () {
        bubblingEnabled = !bubblingEnabled;
        bubblingStatus.textContent = bubblingEnabled ? 'ON' : 'OFF';
        bubblingStatus.style.color = bubblingEnabled ? '#28a745' : '#dc3545';
      });

      // Inicializar
      addEventListeners();

      // Demonstrações via console
      console.log('🫧 Event Propagation Demo carregado!');
      console.log('💡 Dicas:');
      console.log('   • Ctrl+Click no Child para parar capturing');
      console.log('   • Shift+Click no Child para parar bubbling');
      console.log('   • Use event.stopPropagation() para parar a propagação');
      console.log(
        '   • Use event.stopImmediatePropagation() para parar todos os listeners'
      );
    </script>
  </body>
</html>
```

---

## 🎯 Event Delegation - Técnica Poderosa

### 🤔 O que é Event Delegation?

Event Delegation é uma técnica que aproveita o **event bubbling** para escutar eventos em um elemento pai ao invés de adicionar listeners individuais a cada elemento filho.

### 🏆 Vantagens da Event Delegation

1. **Performance**: Menos event listeners = melhor performance
2. **Elementos dinâmicos**: Funciona automaticamente com elementos criados depois
3. **Memória**: Usa menos memória
4. **Manutenção**: Código mais limpo e fácil de manter

### 💻 Exemplo Prático: Lista de Tarefas com Delegation

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Event Delegation Demo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: #f5f5f5;
      }

      .app-container {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin: 20px 0;
      }

      .method {
        border: 2px solid #dee2e6;
        padding: 20px;
        border-radius: 8px;
      }

      .method.delegation {
        border-color: #28a745;
        background: #f8fff9;
      }

      .method.individual {
        border-color: #dc3545;
        background: #fff8f8;
      }

      .task-list {
        min-height: 200px;
        border: 1px solid #dee2e6;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
      }

      .task-item {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
      }

      .task-item:hover {
        background: #e9ecef;
        transform: translateX(5px);
      }

      .task-item.completed {
        background: #d4edda;
        text-decoration: line-through;
        opacity: 0.7;
      }

      .task-actions {
        display: flex;
        gap: 5px;
      }

      .task-btn {
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
      }

      .complete-btn {
        background: #28a745;
        color: white;
      }

      .edit-btn {
        background: #007bff;
        color: white;
      }

      .delete-btn {
        background: #dc3545;
        color: white;
      }

      .add-task {
        display: flex;
        gap: 10px;
        margin: 10px 0;
      }

      .add-task input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .add-task button {
        padding: 8px 16px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .stats {
        background: #e9ecef;
        padding: 15px;
        border-radius: 5px;
        margin: 10px 0;
        font-family: monospace;
      }

      .performance-indicator {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="app-container">
      <h1>🎯 Event Delegation vs Individual Listeners</h1>

      <div class="performance-indicator">
        <strong>📊 Performance Monitor:</strong>
        <span id="performance-stats">Listeners ativos: 0</span>
      </div>

      <div class="comparison">
        <!-- Event Delegation -->
        <div class="method delegation">
          <h2>✅ Event Delegation</h2>
          <p><strong>1 listener no container pai</strong></p>

          <div class="add-task">
            <input
              type="text"
              id="delegation-input"
              placeholder="Nova tarefa..."
            />
            <button onclick="addTask('delegation')">Adicionar</button>
          </div>

          <div class="task-list" id="delegation-list" data-method="delegation">
            <!-- Tarefas serão adicionadas aqui -->
          </div>

          <div class="stats" id="delegation-stats">
            Total de listeners: 1<br />
            Tarefas: 0
          </div>
        </div>

        <!-- Individual Listeners -->
        <div class="method individual">
          <h2>❌ Listeners Individuais</h2>
          <p><strong>3 listeners por tarefa</strong></p>

          <div class="add-task">
            <input
              type="text"
              id="individual-input"
              placeholder="Nova tarefa..."
            />
            <button onclick="addTask('individual')">Adicionar</button>
          </div>

          <div class="task-list" id="individual-list" data-method="individual">
            <!-- Tarefas serão adicionadas aqui -->
          </div>

          <div class="stats" id="individual-stats">
            Total de listeners: 0<br />
            Tarefas: 0
          </div>
        </div>
      </div>

      <div
        style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px;"
      >
        <h4>🧪 Teste de Performance:</h4>
        <button
          onclick="addManyTasks()"
          style="padding: 10px 20px; background: #17a2b8; color: white; border: none; border-radius: 5px; cursor: pointer;"
        >
          Adicionar 100 tarefas em cada lista
        </button>
        <p><small>Observe a diferença no número de listeners!</small></p>
      </div>
    </div>

    <script>
      // Contadores globais
      let delegationTaskCount = 0;
      let individualTaskCount = 0;
      let totalListeners = 0;

      // Elementos DOM
      const delegationList = document.getElementById('delegation-list');
      const individualList = document.getElementById('individual-list');
      const delegationStats = document.getElementById('delegation-stats');
      const individualStats = document.getElementById('individual-stats');
      const performanceStats = document.getElementById('performance-stats');

      // 1. EVENT DELEGATION SETUP
      // UM ÚNICO listener para toda a lista
      delegationList.addEventListener('click', function (event) {
        handleTaskAction(event, 'delegation');
      });

      totalListeners = 1; // Começamos com 1 listener (delegation)

      function handleTaskAction(event, method) {
        const target = event.target;
        const taskItem = target.closest('.task-item');

        if (!taskItem) return;

        const taskId = taskItem.dataset.taskId;

        if (target.classList.contains('complete-btn')) {
          toggleComplete(taskItem);
        } else if (target.classList.contains('edit-btn')) {
          editTask(taskItem);
        } else if (target.classList.contains('delete-btn')) {
          deleteTask(taskItem, method);
        }
      }

      // 2. FUNÇÕES DE MANIPULAÇÃO DE TAREFAS
      function addTask(method) {
        const input = document.getElementById(`${method}-input`);
        const list = document.getElementById(`${method}-list`);
        const taskText = input.value.trim();

        if (!taskText) return;

        const taskId = Date.now() + Math.random();
        const taskItem = createTaskElement(taskId, taskText, method);

        list.appendChild(taskItem);
        input.value = '';

        if (method === 'delegation') {
          delegationTaskCount++;
        } else {
          individualTaskCount++;
          // Para individual listeners, adicionar 3 listeners por tarefa
          addIndividualListeners(taskItem);
          totalListeners += 3;
        }

        updateStats();
      }

      function createTaskElement(taskId, text, method) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.dataset.taskId = taskId;
        taskItem.dataset.method = method;

        taskItem.innerHTML = `
                <span class="task-text">${text}</span>
                <div class="task-actions">
                    <button class="task-btn complete-btn">✓</button>
                    <button class="task-btn edit-btn">✏️</button>
                    <button class="task-btn delete-btn">🗑️</button>
                </div>
            `;

        return taskItem;
      }

      function addIndividualListeners(taskItem) {
        const completeBtn = taskItem.querySelector('.complete-btn');
        const editBtn = taskItem.querySelector('.edit-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');

        completeBtn.addEventListener('click', () => toggleComplete(taskItem));
        editBtn.addEventListener('click', () => editTask(taskItem));
        deleteBtn.addEventListener('click', () =>
          deleteTask(taskItem, 'individual')
        );
      }

      function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
        const completeBtn = taskItem.querySelector('.complete-btn');
        completeBtn.textContent = taskItem.classList.contains('completed')
          ? '↶'
          : '✓';
      }

      function editTask(taskItem) {
        const taskText = taskItem.querySelector('.task-text');
        const currentText = taskText.textContent;
        const newText = prompt('Editar tarefa:', currentText);

        if (newText && newText.trim()) {
          taskText.textContent = newText.trim();
        }
      }

      function deleteTask(taskItem, method) {
        if (confirm('Deletar esta tarefa?')) {
          taskItem.remove();

          if (method === 'delegation') {
            delegationTaskCount--;
          } else {
            individualTaskCount--;
            totalListeners -= 3; // Remove 3 listeners
          }

          updateStats();
        }
      }

      function updateStats() {
        const delegationListeners = 1;
        const individualListeners = individualTaskCount * 3;

        delegationStats.innerHTML = `
                Total de listeners: ${delegationListeners}<br>
                Tarefas: ${delegationTaskCount}
            `;

        individualStats.innerHTML = `
                Total de listeners: ${individualListeners}<br>
                Tarefas: ${individualTaskCount}
            `;

        performanceStats.textContent = `Listeners ativos: ${
          delegationListeners + individualListeners
        } | Diferença: ${individualListeners - delegationListeners}`;
      }

      // Função para teste de performance
      function addManyTasks() {
        const tasks = [
          'Estudar JavaScript',
          'Fazer exercícios',
          'Ler documentação',
          'Praticar algoritmos',
          'Revisar código',
          'Fazer backup',
          'Atualizar dependências',
          'Testar aplicação',
          'Fazer deploy',
          'Documentar projeto',
          'Revisar pull request',
          'Fazer code review',
        ];

        for (let i = 0; i < 100; i++) {
          const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
          const taskWithNumber = `${randomTask} #${i + 1}`;

          // Adicionar à lista de delegation
          const delegationInput = document.getElementById('delegation-input');
          delegationInput.value = taskWithNumber;
          addTask('delegation');

          // Adicionar à lista de individual
          const individualInput = document.getElementById('individual-input');
          individualInput.value = taskWithNumber;
          addTask('individual');
        }
      }

      // Demonstração de event.target vs event.currentTarget
      delegationList.addEventListener('click', function (event) {
        console.log('=== EVENT DELEGATION DEBUG ===');
        console.log('event.target:', event.target); // Elemento clicado
        console.log('event.currentTarget:', event.currentTarget); // Elemento com listener
        console.log('Classe do target:', event.target.className);
        console.log('ID do currentTarget:', event.currentTarget.id);
      });

      // Inicialização
      updateStats();

      console.log('🎯 Event Delegation Demo carregado!');
      console.log('💡 Compare o número de listeners conforme adiciona tarefas');
      console.log('🚀 Event delegation é mais eficiente para listas dinâmicas');
    </script>
  </body>
</html>
```

---

## 🎨 Custom Events - Criando Seus Próprios Eventos

### 🤔 Por que Criar Custom Events?

Custom Events permitem que diferentes partes da sua aplicação se comuniquem sem acoplamento direto, seguindo o padrão Observer.

### 💻 Exemplo Prático: Sistema de Notificações

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Custom Events Demo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        background: #f5f5f5;
      }

      .app {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .modules {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin: 20px 0;
      }

      .module {
        border: 2px solid #dee2e6;
        padding: 20px;
        border-radius: 8px;
        background: #f8f9fa;
      }

      .module h3 {
        margin-top: 0;
        color: #495057;
      }

      .notification-center {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 300px;
        z-index: 1000;
      }

      .notification {
        background: white;
        border-left: 4px solid #007bff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 0 5px 5px 0;
        animation: slideIn 0.3s ease;
        position: relative;
      }

      .notification.success {
        border-left-color: #28a745;
      }

      .notification.warning {
        border-left-color: #ffc107;
      }

      .notification.error {
        border-left-color: #dc3545;
      }

      .notification.info {
        border-left-color: #17a2b8;
      }

      .notification .close {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #999;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 15px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
      }

      .btn:hover {
        background: #0056b3;
      }

      .btn.success {
        background: #28a745;
      }
      .btn.warning {
        background: #ffc107;
        color: #212529;
      }
      .btn.error {
        background: #dc3545;
      }
      .btn.info {
        background: #17a2b8;
      }

      .event-log {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        height: 200px;
        overflow-y: auto;
      }

      .user-profile {
        text-align: center;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 8px;
      }

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        margin: 0 auto 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }

      .shopping-cart {
        background: #e8f5e9;
        border: 2px solid #4caf50;
      }

      .cart-items {
        background: white;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        min-height: 100px;
      }

      .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;
        border-bottom: 1px solid #eee;
      }

      .cart-total {
        font-weight: bold;
        font-size: 18px;
        text-align: right;
        margin-top: 10px;
        color: #2e7d32;
      }
    </style>
  </head>
  <body>
    <div class="app">
      <h1>🎨 Custom Events - Sistema de Comunicação</h1>

      <!-- Notification Center -->
      <div class="notification-center" id="notification-center">
        <!-- Notificações aparecerão aqui -->
      </div>

      <div class="modules">
        <!-- User Profile Module -->
        <div class="module">
          <div class="user-profile">
            <div class="avatar" id="user-avatar">👤</div>
            <h3 id="user-name">João Silva</h3>
            <p id="user-status">Online</p>
            <button class="btn" onclick="userLogin()">Login</button>
            <button class="btn" onclick="userLogout()">Logout</button>
            <button class="btn info" onclick="updateProfile()">
              Atualizar Perfil
            </button>
          </div>
        </div>

        <!-- Shopping Cart Module -->
        <div class="module shopping-cart">
          <h3>🛒 Carrinho de Compras</h3>
          <div class="cart-items" id="cart-items">
            <p style="text-align: center; color: #666;">Carrinho vazio</p>
          </div>
          <div class="cart-total" id="cart-total">Total: R$ 0,00</div>
          <button class="btn success" onclick="addToCart()">
            Adicionar Item
          </button>
          <button class="btn warning" onclick="clearCart()">
            Limpar Carrinho
          </button>
          <button class="btn" onclick="checkout()">Finalizar Compra</button>
        </div>

        <!-- Notification Triggers -->
        <div class="module">
          <h3>📢 Disparadores de Eventos</h3>
          <button
            class="btn success"
            onclick="showNotification('success', 'Operação realizada com sucesso!')"
          >
            Sucesso
          </button>
          <button
            class="btn warning"
            onclick="showNotification('warning', 'Atenção: Verifique os dados!')"
          >
            Aviso
          </button>
          <button
            class="btn error"
            onclick="showNotification('error', 'Erro: Falha na operação!')"
          >
            Erro
          </button>
          <button
            class="btn info"
            onclick="showNotification('info', 'Informação: Sistema atualizado!')"
          >
            Info
          </button>

          <hr style="margin: 20px 0;" />

          <button class="btn" onclick="simulateUserActivity()">
            🎭 Simular Atividade do Usuário
          </button>
        </div>

        <!-- Event Log -->
        <div class="module">
          <h3>📋 Log de Eventos</h3>
          <div class="event-log" id="event-log"></div>
          <button class="btn" onclick="clearLog()">Limpar Log</button>
        </div>
      </div>
    </div>

    <script>
      // Sistema de Log
      const eventLog = document.getElementById('event-log');

      function logEvent(message) {
        const time = new Date().toLocaleTimeString();
        eventLog.innerHTML += `[${time}] ${message}\n`;
        eventLog.scrollTop = eventLog.scrollHeight;
      }

      // 1. CUSTOM EVENTS BÁSICOS

      // Criar e disparar evento customizado simples
      function createCustomEvent(name, data) {
        const customEvent = new CustomEvent(name, {
          detail: data,
          bubbles: true,
          cancelable: true,
        });

        document.dispatchEvent(customEvent);
        logEvent(`🚀 Evento '${name}' disparado`);
      }

      // 2. SISTEMA DE NOTIFICAÇÕES

      const notificationCenter = document.getElementById('notification-center');

      // Escutar evento de notificação
      document.addEventListener('showNotification', function (event) {
        const { type, message, duration = 5000 } = event.detail;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
                <button class="close" onclick="this.parentElement.remove()">×</button>
                <strong>${type.toUpperCase()}</strong><br>
                ${message}
            `;

        notificationCenter.appendChild(notification);

        // Auto-remover após duração especificada
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, duration);

        logEvent(`📢 Notificação ${type}: ${message}`);
      });

      function showNotification(type, message, duration) {
        createCustomEvent('showNotification', { type, message, duration });
      }

      // 3. SISTEMA DE USUÁRIO

      let currentUser = {
        name: 'João Silva',
        status: 'offline',
        avatar: '👤',
      };

      // Eventos de usuário
      document.addEventListener('userLogin', function (event) {
        const userData = event.detail;
        currentUser.status = 'online';
        updateUserUI();
        showNotification('success', `Bem-vindo, ${userData.name}!`);
        logEvent(`👤 Usuário ${userData.name} fez login`);
      });

      document.addEventListener('userLogout', function (event) {
        currentUser.status = 'offline';
        updateUserUI();
        showNotification('info', 'Usuário deslogado');
        logEvent(`👤 Usuário ${currentUser.name} fez logout`);
      });

      document.addEventListener('profileUpdated', function (event) {
        const { name, avatar } = event.detail;
        currentUser.name = name;
        currentUser.avatar = avatar;
        updateUserUI();
        showNotification('success', 'Perfil atualizado com sucesso!');
        logEvent(`👤 Perfil atualizado: ${name}`);
      });

      function updateUserUI() {
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-status').textContent =
          currentUser.status === 'online' ? '🟢 Online' : '🔴 Offline';
        document.getElementById('user-avatar').textContent = currentUser.avatar;
      }

      function userLogin() {
        createCustomEvent('userLogin', { name: currentUser.name });
      }

      function userLogout() {
        createCustomEvent('userLogout', {});
      }

      function updateProfile() {
        const newName = prompt('Novo nome:', currentUser.name);
        const avatars = ['👤', '👨', '👩', '🧑', '👨‍💻', '👩‍💻', '🤖'];
        const newAvatar = avatars[Math.floor(Math.random() * avatars.length)];

        if (newName && newName.trim()) {
          createCustomEvent('profileUpdated', {
            name: newName.trim(),
            avatar: newAvatar,
          });
        }
      }

      // 4. SISTEMA DE CARRINHO DE COMPRAS

      let cart = [];

      document.addEventListener('itemAdded', function (event) {
        const item = event.detail;
        cart.push(item);
        updateCartUI();
        showNotification('success', `${item.name} adicionado ao carrinho`);
        logEvent(`🛒 Item adicionado: ${item.name} - R$ ${item.price}`);
      });

      document.addEventListener('cartCleared', function (event) {
        cart = [];
        updateCartUI();
        showNotification('warning', 'Carrinho limpo');
        logEvent(`🛒 Carrinho limpo`);
      });

      document.addEventListener('checkoutStarted', function (event) {
        const { total, itemCount } = event.detail;
        showNotification(
          'info',
          `Finalizando compra: ${itemCount} itens - R$ ${total.toFixed(2)}`
        );
        logEvent(`💳 Checkout iniciado: R$ ${total.toFixed(2)}`);

        // Simular processamento
        setTimeout(() => {
          createCustomEvent('orderCompleted', {
            orderId: Date.now(),
            total: total,
            items: [...cart],
          });
        }, 2000);
      });

      document.addEventListener('orderCompleted', function (event) {
        const { orderId, total } = event.detail;
        cart = [];
        updateCartUI();
        showNotification(
          'success',
          `Pedido #${orderId} finalizado! Total: R$ ${total.toFixed(2)}`
        );
        logEvent(`✅ Pedido concluído: #${orderId}`);
      });

      function updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (cart.length === 0) {
          cartItems.innerHTML =
            '<p style="text-align: center; color: #666;">Carrinho vazio</p>';
          cartTotal.textContent = 'Total: R$ 0,00';
          return;
        }

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
          const itemElement = document.createElement('div');
          itemElement.className = 'cart-item';
          itemElement.innerHTML = `
                    <span>${item.name}</span>
                    <span>R$ ${item.price.toFixed(2)}</span>
                `;
          cartItems.appendChild(itemElement);
          total += item.price;
        });

        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
      }

      function addToCart() {
        const products = [
          { name: 'Notebook', price: 2500.0 },
          { name: 'Mouse', price: 45.9 },
          { name: 'Teclado', price: 120.0 },
          { name: 'Monitor', price: 850.0 },
          { name: 'Webcam', price: 180.0 },
          { name: 'Fone', price: 95.5 },
        ];

        const randomProduct =
          products[Math.floor(Math.random() * products.length)];
        createCustomEvent('itemAdded', randomProduct);
      }

      function clearCart() {
        if (cart.length > 0) {
          createCustomEvent('cartCleared', {});
        }
      }

      function checkout() {
        if (cart.length === 0) {
          showNotification('warning', 'Carrinho está vazio!');
          return;
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        createCustomEvent('checkoutStarted', {
          total: total,
          itemCount: cart.length,
        });
      }

      // 5. SIMULAÇÃO DE ATIVIDADE

      function simulateUserActivity() {
        const activities = [
          () => userLogin(),
          () => addToCart(),
          () => showNotification('info', 'Sistema verificado automaticamente'),
          () => updateProfile(),
          () => addToCart(),
          () => checkout(),
        ];

        let currentActivity = 0;

        function runNextActivity() {
          if (currentActivity < activities.length) {
            activities[currentActivity]();
            currentActivity++;
            setTimeout(runNextActivity, 1500);
          }
        }

        showNotification('info', 'Simulando atividade do usuário...');
        runNextActivity();
      }

      // 6. EVENTO CUSTOMIZADO AVANÇADO COM CANCELAMENTO

      document.addEventListener('beforeUserAction', function (event) {
        const { action, data } = event.detail;

        // Exemplo de validação que pode cancelar o evento
        if (action === 'deleteUser' && currentUser.status === 'online') {
          event.preventDefault(); // Cancela o evento
          showNotification('error', 'Não é possível deletar usuário online!');
          logEvent(`🚫 Ação '${action}' cancelada`);
          return;
        }

        logEvent(`✅ Ação '${action}' validada`);
      });

      function clearLog() {
        eventLog.innerHTML = '';
      }

      // Inicialização
      window.addEventListener('load', function () {
        logEvent('🚀 Sistema de Custom Events carregado');
        updateUserUI();
        updateCartUI();

        // Demonstrar event listeners múltiplos
        document.addEventListener('appReady', function (event) {
          logEvent('📱 App pronto para uso');
        });

        createCustomEvent('appReady', { timestamp: Date.now() });
      });

      console.log('🎨 Custom Events Demo carregado!');
      console.log('💡 Todos os módulos se comunicam via custom events');
      console.log('🔍 Observe o log para ver os eventos sendo disparados');
    </script>
  </body>
</html>
```

---

## 📱 Touch Events - Suporte para Dispositivos Móveis

### 🤔 Por que Touch Events?

Com o crescimento do uso mobile, é essencial criar interfaces que respondam adequadamente a toques, gestos e interações touch.

### 💻 Exemplo Prático: Interface Touch Completa

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Touch Events Demo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background: #f5f5f5;
        user-select: none; /* Previne seleção de texto */
        touch-action: manipulation; /* Otimiza para touch */
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .touch-area {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        margin: 20px 0;
        position: relative;
        overflow: hidden;
        touch-action: none; /* Previne scroll/zoom */
      }

      .drawing-canvas {
        width: 100%;
        height: 300px;
        cursor: crosshair;
        background: white;
        border: 2px solid #ddd;
        border-radius: 8px;
      }

      .gesture-area {
        height: 200px;
        background: #e3f2fd;
        border: 2px dashed #2196f3;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #1976d2;
        margin: 20px 0;
      }

      .swipe-detector {
        height: 150px;
        background: #fff3e0;
        border: 2px solid #ff9800;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #f57c00;
        margin: 20px 0;
        position: relative;
      }

      .touch-info {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        margin: 10px 0;
        white-space: pre-line;
      }

      .controls {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin: 20px 0;
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

      .btn:active {
        transform: scale(0.95);
      }

      .touch-point {
        position: absolute;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid #fff;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: touchPulse 0.3s ease-out;
      }

      @keyframes touchPulse {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.8;
        }
      }

      .swipe-arrow {
        position: absolute;
        font-size: 24px;
        opacity: 0;
        transition: all 0.3s ease;
      }

      .swipe-arrow.show {
        opacity: 1;
      }

      .device-info {
        background: #e8f5e9;
        border: 1px solid #4caf50;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
      }

      @media (max-width: 768px) {
        .container {
          padding: 10px;
        }

        .controls {
          justify-content: center;
        }

        .btn {
          min-width: 120px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📱 Touch Events - Interface Mobile</h1>

      <!-- Device Info -->
      <div class="device-info">
        <strong>📊 Informações do Dispositivo:</strong>
        <div id="device-info">Carregando...</div>
      </div>

      <!-- Multi-touch Area -->
      <h2>👆 Área Multi-touch</h2>
      <div class="touch-area" id="multi-touch-area">
        <div style="padding: 20px; color: white; text-align: center;">
          <h3>Toque com um ou mais dedos</h3>
          <p>Suporte para até 10 toques simultâneos</p>
        </div>
      </div>

      <div class="touch-info" id="touch-info">Aguardando toques...</div>

      <!-- Drawing Canvas -->
      <h2>🎨 Canvas de Desenho</h2>
      <canvas class="drawing-canvas" id="drawing-canvas"></canvas>

      <div class="controls">
        <button class="btn" onclick="clearCanvas()">🧹 Limpar</button>
        <button class="btn" onclick="changeColor()">🎨 Mudar Cor</button>
        <button class="btn" onclick="changeBrushSize()">
          📏 Tamanho do Pincel
        </button>
      </div>

      <!-- Gesture Detection -->
      <h2>👋 Detecção de Gestos</h2>
      <div class="gesture-area" id="gesture-area">
        Faça gestos de pinça para zoom
      </div>

      <div class="touch-info" id="gesture-info">
        Gesture info aparecerá aqui...
      </div>

      <!-- Swipe Detection -->
      <h2>👈 Detecção de Swipe</h2>
      <div class="swipe-detector" id="swipe-detector">
        <div class="swipe-arrow" id="arrow-left" style="left: 20px;">⬅️</div>
        <div class="swipe-arrow" id="arrow-right" style="right: 20px;">➡️</div>
        <div class="swipe-arrow" id="arrow-up" style="top: 20px;">⬆️</div>
        <div class="swipe-arrow" id="arrow-down" style="bottom: 20px;">⬇️</div>
        <span>Deslize em qualquer direção</span>
      </div>

      <div class="touch-info" id="swipe-info">Swipe info aparecerá aqui...</div>

      <!-- Mobile-specific Instructions -->
      <div
        style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;"
      >
        <h4>📱 Instruções para Mobile:</h4>
        <ul>
          <li>Use múltiplos dedos na área azul</li>
          <li>Desenhe no canvas branco</li>
          <li>Faça pinça (zoom) na área azul clara</li>
          <li>Deslize na área laranja</li>
          <li>Pressione e segure para ver efeitos especiais</li>
        </ul>
      </div>
    </div>

    <script>
      // Elementos DOM
      const multiTouchArea = document.getElementById('multi-touch-area');
      const touchInfo = document.getElementById('touch-info');
      const drawingCanvas = document.getElementById('drawing-canvas');
      const gestureArea = document.getElementById('gesture-area');
      const gestureInfo = document.getElementById('gesture-info');
      const swipeDetector = document.getElementById('swipe-detector');
      const swipeInfo = document.getElementById('swipe-info');
      const deviceInfo = document.getElementById('device-info');

      // Configuração do canvas
      const ctx = drawingCanvas.getContext('2d');
      let isDrawing = false;
      let currentColor = '#007bff';
      let brushSize = 3;
      let lastTouchPos = null;

      // Configurar canvas
      function setupCanvas() {
        const rect = drawingCanvas.getBoundingClientRect();
        drawingCanvas.width = rect.width;
        drawingCanvas.height = rect.height;

        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
      }

      // 1. DETECÇÃO DE DISPOSITIVO E SUPORTE
      function detectDevice() {
        const isTouchDevice =
          'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const userAgent = navigator.userAgent;
        const maxTouchPoints = navigator.maxTouchPoints || 0;

        let deviceType = 'Desktop';
        if (/Android/i.test(userAgent)) deviceType = 'Android';
        else if (/iPhone|iPad|iPod/i.test(userAgent)) deviceType = 'iOS';
        else if (isTouchDevice) deviceType = 'Touch Device';

        deviceInfo.innerHTML = `
Tipo: ${deviceType}
Touch Support: ${isTouchDevice ? 'SIM' : 'NÃO'}
Max Touch Points: ${maxTouchPoints}
User Agent: ${userAgent.substring(0, 50)}...
Viewport: ${window.innerWidth}x${window.innerHeight}
            `;
      }

      // 2. MULTI-TOUCH AREA
      multiTouchArea.addEventListener('touchstart', function (event) {
        event.preventDefault();
        handleMultiTouch(event, 'start');
      });

      multiTouchArea.addEventListener('touchmove', function (event) {
        event.preventDefault();
        handleMultiTouch(event, 'move');
      });

      multiTouchArea.addEventListener('touchend', function (event) {
        event.preventDefault();
        handleMultiTouch(event, 'end');
      });

      function handleMultiTouch(event, phase) {
        const touches = event.touches;
        const changedTouches = event.changedTouches;

        // Criar pontos visuais de toque
        if (phase === 'start') {
          Array.from(changedTouches).forEach((touch) => {
            createTouchPoint(touch, multiTouchArea);
          });
        }

        // Atualizar informações
        touchInfo.textContent = `
Fase: ${phase.toUpperCase()}
Toques ativos: ${touches.length}
Toques alterados: ${changedTouches.length}
Coordenadas do primeiro toque:
  X: ${touches[0]?.clientX || 'N/A'}
  Y: ${touches[0]?.clientY || 'N/A'}

Todos os toques:
${Array.from(touches)
  .map(
    (touch, i) =>
      `  Toque ${i + 1}: (${Math.round(touch.clientX)}, ${Math.round(
        touch.clientY
      )})`
  )
  .join('\n')}
            `;
      }

      function createTouchPoint(touch, container) {
        const point = document.createElement('div');
        point.className = 'touch-point';

        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        point.style.left = x + 'px';
        point.style.top = y + 'px';

        container.appendChild(point);

        // Remover após animação
        setTimeout(() => {
          if (point.parentElement) {
            point.remove();
          }
        }, 500);
      }

      // 3. CANVAS DE DESENHO
      drawingCanvas.addEventListener('touchstart', function (event) {
        event.preventDefault();
        const touch = event.touches[0];
        const rect = drawingCanvas.getBoundingClientRect();

        isDrawing = true;
        lastTouchPos = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };

        // Desenhar ponto inicial
        ctx.beginPath();
        ctx.arc(lastTouchPos.x, lastTouchPos.y, brushSize / 2, 0, 2 * Math.PI);
        ctx.fillStyle = currentColor;
        ctx.fill();
      });

      drawingCanvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        if (!isDrawing || !lastTouchPos) return;

        const touch = event.touches[0];
        const rect = drawingCanvas.getBoundingClientRect();
        const currentPos = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };

        // Desenhar linha
        ctx.beginPath();
        ctx.moveTo(lastTouchPos.x, lastTouchPos.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.stroke();

        lastTouchPos = currentPos;
      });

      drawingCanvas.addEventListener('touchend', function (event) {
        event.preventDefault();
        isDrawing = false;
        lastTouchPos = null;
      });

      // Suporte para mouse também
      drawingCanvas.addEventListener('mousedown', function (event) {
        const rect = drawingCanvas.getBoundingClientRect();
        isDrawing = true;
        lastTouchPos = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      });

      drawingCanvas.addEventListener('mousemove', function (event) {
        if (!isDrawing) return;

        const rect = drawingCanvas.getBoundingClientRect();
        const currentPos = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };

        ctx.beginPath();
        ctx.moveTo(lastTouchPos.x, lastTouchPos.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.stroke();

        lastTouchPos = currentPos;
      });

      drawingCanvas.addEventListener('mouseup', function () {
        isDrawing = false;
      });

      // 4. DETECÇÃO DE GESTOS (PINCH/ZOOM)
      let initialDistance = 0;
      let initialScale = 1;
      let currentScale = 1;

      gestureArea.addEventListener('touchstart', function (event) {
        if (event.touches.length === 2) {
          event.preventDefault();

          const touch1 = event.touches[0];
          const touch2 = event.touches[1];

          initialDistance = getDistance(touch1, touch2);
          initialScale = currentScale;

          gestureInfo.textContent = `
Gesture: PINCH START
Distância inicial: ${Math.round(initialDistance)}px
Scale atual: ${currentScale.toFixed(2)}x
                `;
        }
      });

      gestureArea.addEventListener('touchmove', function (event) {
        if (event.touches.length === 2) {
          event.preventDefault();

          const touch1 = event.touches[0];
          const touch2 = event.touches[1];

          const currentDistance = getDistance(touch1, touch2);
          const scaleChange = currentDistance / initialDistance;
          currentScale = initialScale * scaleChange;

          // Aplicar transformação visual
          gestureArea.style.transform = `scale(${currentScale})`;

          gestureInfo.textContent = `
Gesture: PINCH MOVE
Distância atual: ${Math.round(currentDistance)}px
Scale: ${currentScale.toFixed(2)}x
Mudança: ${scaleChange > 1 ? 'ZOOM IN' : 'ZOOM OUT'}
                `;
        }
      });

      gestureArea.addEventListener('touchend', function (event) {
        if (event.touches.length < 2) {
          gestureInfo.textContent = `
Gesture: PINCH END
Scale final: ${currentScale.toFixed(2)}x
                `;
        }
      });

      function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      }

      // 5. DETECÇÃO DE SWIPE
      let swipeStartPos = null;
      let swipeStartTime = null;

      swipeDetector.addEventListener('touchstart', function (event) {
        event.preventDefault();
        const touch = event.touches[0];

        swipeStartPos = {
          x: touch.clientX,
          y: touch.clientY,
        };
        swipeStartTime = Date.now();

        // Reset arrows
        document.querySelectorAll('.swipe-arrow').forEach((arrow) => {
          arrow.classList.remove('show');
        });
      });

      swipeDetector.addEventListener('touchend', function (event) {
        event.preventDefault();
        if (!swipeStartPos) return;

        const touch = event.changedTouches[0];
        const endPos = {
          x: touch.clientX,
          y: touch.clientY,
        };

        const deltaX = endPos.x - swipeStartPos.x;
        const deltaY = endPos.y - swipeStartPos.y;
        const deltaTime = Date.now() - swipeStartTime;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const velocity = distance / deltaTime; // pixels per millisecond

        // Detectar direção (mínimo 50px e velocidade mínima)
        if (distance > 50 && velocity > 0.3) {
          let direction = '';
          let arrow = null;

          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Swipe horizontal
            if (deltaX > 0) {
              direction = 'RIGHT';
              arrow = document.getElementById('arrow-right');
            } else {
              direction = 'LEFT';
              arrow = document.getElementById('arrow-left');
            }
          } else {
            // Swipe vertical
            if (deltaY > 0) {
              direction = 'DOWN';
              arrow = document.getElementById('arrow-down');
            } else {
              direction = 'UP';
              arrow = document.getElementById('arrow-up');
            }
          }

          // Mostrar seta
          if (arrow) {
            arrow.classList.add('show');
            setTimeout(() => {
              arrow.classList.remove('show');
            }, 1000);
          }

          swipeInfo.textContent = `
Swipe: ${direction}
Distância: ${Math.round(distance)}px
Velocidade: ${velocity.toFixed(2)} px/ms
Tempo: ${deltaTime}ms
Delta X: ${Math.round(deltaX)}
Delta Y: ${Math.round(deltaY)}
                `;
        } else {
          swipeInfo.textContent = `
Movimento muito lento ou curto
Distância: ${Math.round(distance)}px
Velocidade: ${velocity.toFixed(2)} px/ms
(Mínimo: 50px e 0.3 px/ms)
                `;
        }

        swipeStartPos = null;
        swipeStartTime = null;
      });

      // 6. FUNÇÕES DE CONTROLE DO CANVAS
      function clearCanvas() {
        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
      }

      function changeColor() {
        const colors = [
          '#007bff',
          '#28a745',
          '#dc3545',
          '#ffc107',
          '#6f42c1',
          '#fd7e14',
        ];
        currentColor = colors[Math.floor(Math.random() * colors.length)];

        // Feedback visual
        drawingCanvas.style.borderColor = currentColor;
        setTimeout(() => {
          drawingCanvas.style.borderColor = '#ddd';
        }, 1000);
      }

      function changeBrushSize() {
        const sizes = [1, 3, 5, 8, 12];
        const currentIndex = sizes.indexOf(brushSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        brushSize = sizes[nextIndex];

        // Mostrar feedback
        alert(`Tamanho do pincel: ${brushSize}px`);
      }

      // 7. LONG PRESS DETECTION
      let longPressTimer = null;

      multiTouchArea.addEventListener('touchstart', function (event) {
        longPressTimer = setTimeout(() => {
          // Long press detectado
          navigator.vibrate && navigator.vibrate(100); // Vibração se disponível
          multiTouchArea.style.background =
            'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';

          setTimeout(() => {
            multiTouchArea.style.background =
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          }, 500);
        }, 800);
      });

      multiTouchArea.addEventListener('touchend', function () {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      });

      multiTouchArea.addEventListener('touchmove', function () {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      });

      // INICIALIZAÇÃO
      window.addEventListener('load', function () {
        detectDevice();
        setupCanvas();

        console.log('📱 Touch Events Demo carregado!');
        console.log('👆 Use dispositivos touch para melhor experiência');
        console.log('🎨 Todos os eventos touch estão sendo capturados');
      });

      // Redimensionar canvas quando necessário
      window.addEventListener('resize', function () {
        setupCanvas();
        detectDevice();
      });
    </script>
  </body>
</html>
```

---

## 👁️ Intersection Observer - Scroll Infinito e Lazy Loading

### 🤔 O que é Intersection Observer?

É uma API moderna que permite observar quando elementos entram ou saem da viewport (área visível) de forma performática, sem usar eventos de scroll.

### 💻 Exemplo Prático: Sistema Completo de Lazy Loading

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Intersection Observer Demo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background: #f5f5f5;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        min-height: 100vh;
      }

      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px 20px;
        text-align: center;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .stats {
        background: #e8f5e9;
        padding: 15px;
        margin: 20px;
        border-radius: 8px;
        border-left: 4px solid #4caf50;
        font-family: monospace;
        font-size: 14px;
      }

      .content-section {
        padding: 20px;
      }

      .image-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin: 20px 0;
      }

      .image-item {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
        position: relative;
      }

      .image-item.visible {
        transform: translateY(0);
        opacity: 1;
      }

      .image-item.hidden {
        transform: translateY(20px);
        opacity: 0.3;
      }

      .image-placeholder {
        width: 100%;
        height: 200px;
        background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
          linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(
            45deg,
            transparent 75%,
            #f0f0f0 75%
          ), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
        font-size: 14px;
        position: relative;
      }

      .lazy-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        opacity: 0;
        transition: opacity 0.5s ease;
      }

      .lazy-image.loaded {
        opacity: 1;
      }

      .image-info {
        padding: 15px;
      }

      .loading-spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #007bff;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      @keyframes spin {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }

      .infinite-scroll-container {
        min-height: 200px;
      }

      .post {
        background: white;
        margin: 20px;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-left: 4px solid #007bff;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
      }

      .post.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .post h3 {
        margin-top: 0;
        color: #333;
      }

      .post-meta {
        color: #666;
        font-size: 14px;
        margin-bottom: 10px;
      }

      .load-more-trigger {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-size: 18px;
        margin: 20px;
      }

      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        z-index: 1000;
      }

      .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #00c6ff, #0072ff);
        width: 0%;
        transition: width 0.1s ease;
      }

      .controls {
        background: #343a40;
        color: white;
        padding: 20px;
        margin: 20px;
        border-radius: 8px;
      }

      .controls button {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 15px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
      }

      .controls button:hover {
        background: #0056b3;
      }

      .observer-info {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        padding: 15px;
        margin: 20px;
        border-radius: 8px;
        font-size: 14px;
      }

      .performance-monitor {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 1000;
      }
    </style>
  </head>
  <body>
    <!-- Progress Bar -->
    <div class="scroll-progress">
      <div class="scroll-progress-bar" id="progress-bar"></div>
    </div>

    <div class="container">
      <div class="header">
        <h1>👁️ Intersection Observer Demo</h1>
        <p>Lazy Loading, Scroll Infinito e Animações</p>
      </div>

      <!-- Stats -->
      <div class="stats" id="stats">
        Imagens carregadas: 0/0 | Posts carregados: 0 | Observadores ativos: 0
      </div>

      <!-- Controls -->
      <div class="controls">
        <h3>🎛️ Controles</h3>
        <button onclick="loadMoreImages()">📷 Carregar Mais Imagens</button>
        <button onclick="scrollToBottom()">⬇️ Ir para o Final</button>
        <button onclick="resetDemo()">🔄 Resetar Demo</button>
        <button onclick="togglePerformanceMonitor()">
          📊 Monitor Performance
        </button>
      </div>

      <!-- Observer Info -->
      <div class="observer-info">
        <h4>🔍 Como Funciona:</h4>
        <ul>
          <li>
            <strong>Lazy Loading:</strong> Imagens carregam apenas quando ficam
            visíveis
          </li>
          <li>
            <strong>Animações:</strong> Elementos aparecem suavemente ao entrar
            na viewport
          </li>
          <li>
            <strong>Scroll Infinito:</strong> Novos posts carregam
            automaticamente
          </li>
          <li>
            <strong>Performance:</strong> Sem eventos de scroll, muito mais
            eficiente
          </li>
        </ul>
      </div>

      <!-- Image Gallery -->
      <div class="content-section">
        <h2>📷 Galeria com Lazy Loading</h2>
        <div class="image-gallery" id="image-gallery">
          <!-- Imagens serão geradas aqui -->
        </div>
      </div>

      <!-- Infinite Scroll Area -->
      <div class="content-section">
        <h2>📜 Scroll Infinito</h2>
        <div class="infinite-scroll-container" id="posts-container">
          <!-- Posts serão carregados aqui -->
        </div>

        <!-- Trigger para carregar mais -->
        <div class="load-more-trigger" id="load-more-trigger">
          <div class="loading-spinner"></div>
          Carregando mais conteúdo...
        </div>
      </div>
    </div>

    <!-- Performance Monitor -->
    <div
      class="performance-monitor"
      id="performance-monitor"
      style="display: none;"
    >
      <div id="performance-data">
        FPS: 60<br />
        Memory: 0 MB<br />
        Elements: 0
      </div>
    </div>

    <script>
      // Estado global
      let imageCount = 0;
      let postCount = 0;
      let loadedImages = 0;
      let observersCount = 0;
      let isLoadingPosts = false;

      // Elementos DOM
      const imageGallery = document.getElementById('image-gallery');
      const postsContainer = document.getElementById('posts-container');
      const loadMoreTrigger = document.getElementById('load-more-trigger');
      const stats = document.getElementById('stats');
      const progressBar = document.getElementById('progress-bar');
      const performanceMonitor = document.getElementById('performance-monitor');
      const performanceData = document.getElementById('performance-data');

      // 1. INTERSECTION OBSERVER PARA LAZY LOADING DE IMAGENS
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const placeholder = img.parentElement;

              // Simular carregamento
              setTimeout(() => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                loadedImages++;
                updateStats();

                // Para de observar esta imagem
                observer.unobserve(img);
                observersCount--;
              }, Math.random() * 1000 + 500); // 0.5-1.5s delay
            }
          });
        },
        {
          root: null,
          rootMargin: '50px', // Carregar 50px antes de ficar visível
          threshold: 0.1,
        }
      );

      // 2. INTERSECTION OBSERVER PARA ANIMAÇÕES
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            } else {
              entry.target.classList.remove('visible');
            }
          });
        },
        {
          threshold: 0.2, // 20% do elemento deve estar visível
        }
      );

      // 3. INTERSECTION OBSERVER PARA SCROLL INFINITO
      const scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoadingPosts) {
              loadMorePosts();
            }
          });
        },
        {
          rootMargin: '100px', // Trigger 100px antes do elemento
        }
      );

      // 4. FUNÇÕES DE CRIAÇÃO DE CONTEÚDO

      function createImageItem() {
        imageCount++;

        const imageItem = document.createElement('div');
        imageItem.className = 'image-item hidden';

        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        placeholder.appendChild(spinner);

        const img = document.createElement('img');
        img.className = 'lazy-image';
        img.dataset.src = `https://picsum.photos/300/200?random=${imageCount}`;
        img.alt = `Imagem ${imageCount}`;

        const info = document.createElement('div');
        info.className = 'image-info';
        info.innerHTML = `
                <h4>Imagem ${imageCount}</h4>
                <p>Esta imagem foi carregada usando Intersection Observer</p>
                <small>ID: ${imageCount} | Timestamp: ${new Date().toLocaleTimeString()}</small>
            `;

        placeholder.appendChild(img);
        imageItem.appendChild(placeholder);
        imageItem.appendChild(info);

        // Observar para lazy loading
        imageObserver.observe(img);
        observersCount++;

        // Observar para animação
        animationObserver.observe(imageItem);

        return imageItem;
      }

      function createPost() {
        postCount++;

        const post = document.createElement('div');
        post.className = 'post';

        const titles = [
          'Como usar Intersection Observer',
          'Performance em aplicações web',
          'Lazy loading de imagens',
          'Scroll infinito otimizado',
          'APIs modernas do navegador',
          'JavaScript assíncrono',
          'Otimização de DOM',
          'Experiência do usuário',
        ];

        const title = titles[Math.floor(Math.random() * titles.length)];

        post.innerHTML = `
                <h3>${title} #${postCount}</h3>
                <div class="post-meta">
                    📅 ${new Date().toLocaleDateString('pt-BR')} |
                    👀 ${Math.floor(Math.random() * 1000)} visualizações |
                    ⏱️ ${Math.floor(Math.random() * 10) + 1} min de leitura
                </div>
                <p>Este é o conteúdo do post ${postCount}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris.</p>
                <p>Utilizando Intersection Observer, este post foi carregado automaticamente quando você
                se aproximou dele. Isso proporciona uma experiência de scroll infinito muito mais performática
                do que usar eventos de scroll tradicionais.</p>
            `;

        // Observar para animação
        animationObserver.observe(post);

        return post;
      }

      // 5. FUNÇÕES DE CARREGAMENTO

      function loadMoreImages() {
        for (let i = 0; i < 6; i++) {
          const imageItem = createImageItem();
          imageGallery.appendChild(imageItem);
        }
        updateStats();
      }

      function loadMorePosts() {
        if (isLoadingPosts) return;

        isLoadingPosts = true;
        loadMoreTrigger.style.display = 'flex';

        // Simular delay de carregamento
        setTimeout(() => {
          for (let i = 0; i < 3; i++) {
            const post = createPost();
            postsContainer.appendChild(post);
          }

          isLoadingPosts = false;
          updateStats();

          // Esconder trigger temporariamente
          setTimeout(() => {
            loadMoreTrigger.style.display = postCount < 50 ? 'flex' : 'none';
          }, 1000);
        }, 1000);
      }

      // 6. FUNÇÕES UTILITÁRIAS

      function updateStats() {
        stats.textContent = `Imagens carregadas: ${loadedImages}/${imageCount} | Posts carregados: ${postCount} | Observadores ativos: ${observersCount}`;
      }

      function scrollToBottom() {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }

      function resetDemo() {
        if (confirm('Resetar toda a demonstração?')) {
          imageGallery.innerHTML = '';
          postsContainer.innerHTML = '';

          imageCount = 0;
          postCount = 0;
          loadedImages = 0;
          observersCount = 0;

          updateStats();
          loadInitialContent();
        }
      }

      function loadInitialContent() {
        // Carregar conteúdo inicial
        loadMoreImages();
        loadMorePosts();
      }

      // 7. SCROLL PROGRESS BAR
      function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
      }

      // 8. PERFORMANCE MONITOR
      let performanceInterval;

      function togglePerformanceMonitor() {
        if (performanceMonitor.style.display === 'none') {
          performanceMonitor.style.display = 'block';
          startPerformanceMonitoring();
        } else {
          performanceMonitor.style.display = 'none';
          stopPerformanceMonitoring();
        }
      }

      function startPerformanceMonitoring() {
        let lastTime = performance.now();
        let frameCount = 0;

        performanceInterval = setInterval(() => {
          const now = performance.now();
          frameCount++;

          if (now - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (now - lastTime));

            const memory = performance.memory
              ? (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)
              : 'N/A';

            const elements = document.querySelectorAll('*').length;

            performanceData.innerHTML = `
FPS: ${fps}<br>
Memory: ${memory} MB<br>
Elements: ${elements}<br>
Observers: ${observersCount}
                    `;

            frameCount = 0;
            lastTime = now;
          }
        }, 100);
      }

      function stopPerformanceMonitoring() {
        if (performanceInterval) {
          clearInterval(performanceInterval);
        }
      }

      // 9. EVENT LISTENERS

      // Scroll progress
      window.addEventListener('scroll', updateScrollProgress, {
        passive: true,
      });

      // Redimensionamento
      window.addEventListener('resize', updateScrollProgress);

      // 10. INICIALIZAÇÃO

      window.addEventListener('load', function () {
        // Observar trigger de scroll infinito
        scrollObserver.observe(loadMoreTrigger);

        // Carregar conteúdo inicial
        loadInitialContent();

        // Atualizar progress bar
        updateScrollProgress();

        console.log('👁️ Intersection Observer Demo carregado!');
        console.log('🚀 Observadores configurados:');
        console.log('   • Image Lazy Loading Observer');
        console.log('   • Animation Observer');
        console.log('   • Infinite Scroll Observer');
        console.log('📊 Use o monitor de performance para ver a eficiência');
      });

      // Demonstrar diferentes threshold values
      const thresholdDemo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log(
              `Elemento ${entry.target.className} visível em ${Math.round(
                entry.intersectionRatio * 100
              )}%`
            );
          });
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1.0], // Múltiplos thresholds
        }
      );

      // Aplicar a alguns elementos para demonstração
      setTimeout(() => {
        document.querySelectorAll('.post').forEach((post) => {
          thresholdDemo.observe(post);
        });
      }, 2000);
    </script>
  </body>
</html>
```

---

## 🎓 Resumo dos Conceitos Avançados

### ✅ **Event Bubbling & Capturing**

- Eventos viajam pela árvore DOM em duas fases
- Use `stopPropagation()` para controlar a propagação
- `event.target` vs `event.currentTarget` são diferentes

### ✅ **Event Delegation**

- Uma técnica poderosa para performance
- Um listener no pai escuta eventos dos filhos
- Funciona automaticamente com elementos dinâmicos

### ✅ **Custom Events**

- Permite comunicação entre módulos desacoplados
- Use `CustomEvent` constructor e `dispatchEvent()`
- Inclua dados no `detail` property

### ✅ **Touch Events**

- Essencial para experiência mobile
- Diferentes de mouse events
- Suporte a multi-touch e gestos

### ✅ **Intersection Observer**

- API moderna para observar visibilidade
- Substitui eventos de scroll de forma performática
- Ideal para lazy loading e scroll infinito

---
