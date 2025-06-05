# 🚀 Web Workers, Service Workers e APIs do Futuro

Chegou a hora de explorar as tecnologias mais avançadas do desenvolvimento web moderno! Essas APIs representam o futuro da web e permitem criar experiências que rivalizam com aplicações nativas.

## 📋 O que vamos explorar hoje?

1. **Web Workers** - Processing em background sem bloquear a UI
2. **Service Workers** - Aplicações offline e cache inteligente
3. **WebRTC** - Comunicação peer-to-peer em tempo real
4. **WebGL** - Gráficos 3D acelerados por hardware
5. **Progressive Web Apps** - Apps nativos com tecnologias web

---

## 👷 Web Workers - Processing em Background

### 🤔 Por que Web Workers?

JavaScript é **single-threaded**, mas Web Workers permitem executar código em **threads separadas**, evitando travamentos da interface durante operações pesadas.

### 💻 Exemplo Prático: Sistema de Web Workers Completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web Workers - Processing em Background</title>
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

      .worker-section {
        margin: 30px 0;
        padding: 20px;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        background: #f8f9fa;
      }

      .performance-test {
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
        transition: all 0.3s ease;
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

      .output {
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

      .progress-container {
        background: #e9ecef;
        border-radius: 10px;
        overflow: hidden;
        margin: 15px 0;
        height: 30px;
      }

      .progress-bar {
        background: linear-gradient(90deg, #007bff, #0056b3);
        height: 100%;
        width: 0%;
        transition: width 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
      }

      .performance-chart {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 20px 0;
      }

      .chart-section {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 15px;
      }

      .fps-monitor {
        background: #343a40;
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        text-align: center;
        margin: 10px 0;
      }

      .fps-high {
        background: #28a745;
      }
      .fps-medium {
        background: #ffc107;
        color: #212529;
      }
      .fps-low {
        background: #dc3545;
      }

      .status-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 8px;
        display: inline-block;
      }

      .status-active {
        background: #28a745;
      }
      .status-inactive {
        background: #6c757d;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>👷 Web Workers - Processing em Background</h1>

      <!-- Web Workers Demo -->
      <div class="worker-section">
        <h2>🔵 Web Workers Básico</h2>

        <div class="controls">
          <button class="btn success" onclick="startHeavyCalculation()">
            🧮 Cálculo Pesado (Worker)
          </button>
          <button class="btn danger" onclick="heavyCalculationMainThread()">
            🐌 Cálculo Main Thread
          </button>
          <button class="btn" onclick="terminateWorkers()">
            ⏹️ Parar Workers
          </button>
        </div>

        <div class="progress-container">
          <div class="progress-bar" id="progress-bar">0%</div>
        </div>

        <div class="output" id="worker-output">
          Compare a diferença entre executar no Worker vs Main Thread...
        </div>
      </div>

      <!-- Performance Comparison -->
      <div class="worker-section performance-test">
        <h2>🏃 Performance: Worker vs Main Thread</h2>

        <div class="performance-chart">
          <div class="chart-section">
            <h4>🔴 Main Thread (Trava UI)</h4>
            <div class="fps-monitor" id="main-fps">FPS: 60</div>
            <div id="main-thread-time">Tempo: -</div>
          </div>

          <div class="chart-section">
            <h4>🟢 Web Worker (UI Livre)</h4>
            <div class="fps-monitor" id="worker-fps">FPS: 60</div>
            <div id="worker-time">Tempo: -</div>
          </div>
        </div>

        <canvas
          id="animation-canvas"
          width="400"
          height="100"
          style="border: 1px solid #ddd; display: block; margin: 20px auto;"
        ></canvas>

        <div class="output" id="performance-output">
          Observe como o Web Worker não afeta a animação...
        </div>
      </div>
    </div>

    <script>
      // Worker inline usando Blob
      function createWorker() {
        const workerCode = `
                self.addEventListener('message', function(e) {
                    const { type, data } = e.data;

                    if (type === 'HEAVY_CALCULATION') {
                        const { iterations } = data;
                        let result = 0;

                        for (let i = 0; i < iterations; i++) {
                            result += Math.sqrt(i) * Math.sin(i) + Math.cos(i);

                            // Reportar progresso
                            if (i % 10000 === 0) {
                                self.postMessage({
                                    type: 'PROGRESS',
                                    progress: (i / iterations) * 100
                                });
                            }
                        }

                        self.postMessage({
                            type: 'RESULT',
                            result: result,
                            iterations: iterations
                        });
                    }
                });
            `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        return new Worker(URL.createObjectURL(blob));
      }

      let worker = null;
      let animationId;

      // Elementos DOM
      const workerOutput = document.getElementById('worker-output');
      const performanceOutput = document.getElementById('performance-output');
      const progressBar = document.getElementById('progress-bar');
      const mainFps = document.getElementById('main-fps');
      const workerFps = document.getElementById('worker-fps');
      const mainThreadTime = document.getElementById('main-thread-time');
      const workerTime = document.getElementById('worker-time');

      // Animação para testar FPS
      const canvas = document.getElementById('animation-canvas');
      const ctx = canvas.getContext('2d');
      let x = 0;
      let lastTime = performance.now();
      let frameCount = 0;
      let fps = 60;

      function animate() {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;

        frameCount++;
        if (frameCount % 10 === 0) {
          fps = Math.round(1000 / deltaTime);
          updateFPSDisplay();
        }

        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhar círculo animado
        ctx.beginPath();
        ctx.arc(x, 50, 20, 0, 2 * Math.PI);
        ctx.fillStyle = fps > 50 ? '#28a745' : fps > 30 ? '#ffc107' : '#dc3545';
        ctx.fill();

        x = (x + 2) % (canvas.width + 40);
        lastTime = currentTime;

        animationId = requestAnimationFrame(animate);
      }

      function updateFPSDisplay() {
        const fpsClass =
          fps > 50 ? 'fps-high' : fps > 30 ? 'fps-medium' : 'fps-low';
        mainFps.className = `fps-monitor ${fpsClass}`;
        workerFps.className = `fps-monitor ${fpsClass}`;
        mainFps.textContent = `FPS: ${fps}`;
        workerFps.textContent = `FPS: ${fps}`;
      }

      function log(element, message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix =
          type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        element.textContent =
          `[${timestamp}] ${prefix} ${message}\n` + element.textContent;
      }

      // Web Worker
      function startHeavyCalculation() {
        if (!worker) {
          worker = createWorker();

          worker.onmessage = function (e) {
            const { type, progress, result, iterations } = e.data;

            if (type === 'PROGRESS') {
              progressBar.style.width = progress + '%';
              progressBar.textContent = `${progress.toFixed(1)}%`;
            }

            if (type === 'RESULT') {
              progressBar.style.width = '100%';
              progressBar.textContent = 'Concluído!';

              log(workerOutput, `✅ Cálculo no Worker concluído!`, 'success');
              log(workerOutput, `Resultado: ${result.toFixed(6)}`);
              log(workerOutput, `${iterations.toLocaleString()} iterações`);
              log(workerOutput, `UI permaneceu responsiva! 🎉`);

              setTimeout(() => {
                progressBar.style.width = '0%';
                progressBar.textContent = '0%';
              }, 3000);
            }
          };
        }

        const startTime = performance.now();
        log(workerOutput, '🚀 Iniciando cálculo no Web Worker...');

        worker.postMessage({
          type: 'HEAVY_CALCULATION',
          data: { iterations: 5000000 },
        });
      }

      // Main Thread (bloqueia UI)
      function heavyCalculationMainThread() {
        const startTime = performance.now();
        log(performanceOutput, '🐌 Iniciando cálculo na Main Thread...');
        log(performanceOutput, '⚠️ UI vai travar durante o cálculo!');

        setTimeout(() => {
          let result = 0;
          const iterations = 5000000;

          for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(i) * Math.sin(i) + Math.cos(i);
          }

          const endTime = performance.now();
          mainThreadTime.textContent = `Tempo: ${(endTime - startTime).toFixed(
            2
          )}ms`;

          log(
            performanceOutput,
            `✅ Cálculo na Main Thread concluído`,
            'success'
          );
          log(performanceOutput, `Resultado: ${result.toFixed(6)}`);
          log(
            performanceOutput,
            `Tempo: ${(endTime - startTime).toFixed(2)}ms`
          );
          log(performanceOutput, `❌ UI travou durante o processo!`);
        }, 100);
      }

      function terminateWorkers() {
        if (worker) {
          worker.terminate();
          worker = null;
          log(workerOutput, '⏹️ Worker terminado');
        }
      }

      // Iniciar animação
      animate();

      console.log('👷 Web Workers Demo carregado!');
    </script>
  </body>
</html>
```

---

## 🔧 Service Workers - Aplicações Offline

### 🤔 O que são Service Workers?

Service Workers são scripts que rodam em background, independente da página, permitindo **cache inteligente**, **push notifications** e **funcionamento offline**.

### 💻 Exemplo Prático: PWA com Service Worker

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Service Workers - App Offline</title>
    <link
      rel="manifest"
      href="data:application/json,{
        'name': 'Service Worker Demo',
        'short_name': 'SW Demo',
        'start_url': '/',
        'display': 'standalone',
        'background_color': '#007bff',
        'theme_color': '#007bff',
        'icons': [
            {
                'src': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiBmaWxsPSIjMDA3YmZmIi8+Cjx0ZXh0IHg9Ijk2IiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPklXPC90ZXh0Pgo8L3N2Zz4K',
                'sizes': '192x192',
                'type': 'image/svg+xml'
            }
        ]
    }"
    />
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
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

      .status-bar {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        font-family: monospace;
      }

      .online {
        background: #28a745;
      }
      .offline {
        background: #dc3545;
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

      .output {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        max-height: 300px;
        overflow-y: auto;
        margin: 15px 0;
        white-space: pre-wrap;
      }

      .cache-list {
        background: #e8f5e9;
        border: 1px solid #4caf50;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
      }

      .notification-demo {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
      }

      .install-prompt {
        background: #e3f2fd;
        border: 2px solid #007bff;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🔧 Service Workers - Aplicações Offline</h1>

      <!-- Status da Conexão -->
      <div class="status-bar" id="connection-status">
        <span id="connection-indicator">🔍 Verificando conexão...</span>
      </div>

      <!-- Service Worker Status -->
      <div class="status-bar" id="sw-status">
        <span id="sw-indicator">📡 Verificando Service Worker...</span>
      </div>

      <!-- Install PWA -->
      <div class="install-prompt" id="install-prompt" style="display: none;">
        <h3>📱 Instalar como App</h3>
        <p>Este site pode ser instalado como um app no seu dispositivo!</p>
        <button class="btn success" id="install-btn">📱 Instalar App</button>
      </div>

      <!-- Controles -->
      <div class="controls">
        <button class="btn success" onclick="registerServiceWorker()">
          📡 Registrar SW
        </button>
        <button class="btn" onclick="updateServiceWorker()">
          🔄 Atualizar SW
        </button>
        <button class="btn danger" onclick="unregisterServiceWorker()">
          ❌ Remover SW
        </button>
        <button class="btn" onclick="testOfflineMode()">
          🔌 Testar Modo Offline
        </button>
      </div>

      <!-- Cache Management -->
      <div class="cache-list">
        <h3>💾 Gerenciamento de Cache</h3>

        <div class="controls">
          <button class="btn" onclick="cacheResources()">
            💾 Cache Recursos
          </button>
          <button class="btn" onclick="viewCacheContents()">
            📋 Ver Cache
          </button>
          <button class="btn danger" onclick="clearCache()">
            🗑️ Limpar Cache
          </button>
        </div>

        <div id="cache-output">Cache vazio...</div>
      </div>

      <!-- Push Notifications -->
      <div class="notification-demo">
        <h3>🔔 Push Notifications</h3>

        <div class="controls">
          <button class="btn" onclick="requestNotificationPermission()">
            🔔 Solicitar Permissão
          </button>
          <button class="btn success" onclick="showLocalNotification()">
            📢 Notificação Local
          </button>
          <button class="btn" onclick="scheduleNotification()">
            ⏰ Agendar Notificação
          </button>
        </div>

        <div id="notification-status">Status das notificações...</div>
      </div>

      <!-- Output Log -->
      <div class="output" id="output">Service Worker Demo carregado...</div>
    </div>

    <script>
      // Elementos DOM
      const connectionStatus = document.getElementById('connection-status');
      const connectionIndicator = document.getElementById(
        'connection-indicator'
      );
      const swStatus = document.getElementById('sw-status');
      const swIndicator = document.getElementById('sw-indicator');
      const output = document.getElementById('output');
      const cacheOutput = document.getElementById('cache-output');
      const notificationStatus = document.getElementById('notification-status');
      const installPrompt = document.getElementById('install-prompt');
      const installBtn = document.getElementById('install-btn');

      let deferredPrompt;
      let swRegistration;

      // Service Worker inline
      const serviceWorkerCode = `
            const CACHE_NAME = 'sw-demo-v1';
            const urlsToCache = [
                '/',
                '/styles.css',
                '/script.js'
            ];

            // Install event
            self.addEventListener('install', function(event) {
                console.log('Service Worker: Install');

                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            console.log('Service Worker: Cache opened');
                            return cache.addAll(urlsToCache);
                        })
                );
            });

            // Activate event
            self.addEventListener('activate', function(event) {
                console.log('Service Worker: Activate');

                event.waitUntil(
                    caches.keys().then(function(cacheNames) {
                        return Promise.all(
                            cacheNames.map(function(cacheName) {
                                if (cacheName !== CACHE_NAME) {
                                    console.log('Service Worker: Deleting old cache');
                                    return caches.delete(cacheName);
                                }
                            })
                        );
                    })
                );
            });

            // Fetch event
            self.addEventListener('fetch', function(event) {
                event.respondWith(
                    caches.match(event.request)
                        .then(function(response) {
                            // Return cached version or fetch from network
                            if (response) {
                                console.log('Service Worker: Serving from cache', event.request.url);
                                return response;
                            }

                            return fetch(event.request).then(function(response) {
                                // Check if valid response
                                if (!response || response.status !== 200 || response.type !== 'basic') {
                                    return response;
                                }

                                // Clone response for cache
                                const responseToCache = response.clone();

                                caches.open(CACHE_NAME)
                                    .then(function(cache) {
                                        cache.put(event.request, responseToCache);
                                    });

                                return response;
                            });
                        })
                );
            });

            // Push notification event
            self.addEventListener('push', function(event) {
                const options = {
                    body: event.data ? event.data.text() : 'Notificação do Service Worker',
                    icon: '/icon-192x192.png',
                    badge: '/badge-72x72.png',
                    vibrate: [100, 50, 100],
                    data: {
                        dateOfArrival: Date.now(),
                        primaryKey: '1'
                    },
                    actions: [
                        {
                            action: 'explore',
                            title: 'Explorar',
                            icon: '/images/checkmark.png'
                        },
                        {
                            action: 'close',
                            title: 'Fechar',
                            icon: '/images/xmark.png'
                        }
                    ]
                };

                event.waitUntil(
                    self.registration.showNotification('Service Worker Demo', options)
                );
            });

            // Notification click event
            self.addEventListener('notificationclick', function(event) {
                event.notification.close();

                if (event.action === 'explore') {
                    event.waitUntil(
                        clients.openWindow('/')
                    );
                }
            });
        `;

      function log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix =
          type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        output.textContent =
          `[${timestamp}] ${prefix} ${message}\n` + output.textContent;
      }

      // 1. SERVICE WORKER REGISTRATION
      async function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
          try {
            // Criar Service Worker a partir de Blob
            const blob = new Blob([serviceWorkerCode], {
              type: 'application/javascript',
            });
            const swUrl = URL.createObjectURL(blob);

            swRegistration = await navigator.serviceWorker.register(swUrl);

            log('Service Worker registrado com sucesso!', 'success');
            updateSWStatus('Service Worker ativo e funcionando');

            // Listen for updates
            swRegistration.addEventListener('updatefound', () => {
              log('Nova versão do Service Worker encontrada');
              const newWorker = swRegistration.installing;

              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  log('Service Worker atualizado!', 'success');
                }
              });
            });
          } catch (error) {
            log(`Erro ao registrar Service Worker: ${error.message}`, 'error');
            updateSWStatus('Erro no Service Worker');
          }
        } else {
          log('Service Workers não suportados neste navegador', 'error');
          updateSWStatus('Service Workers não suportados');
        }
      }

      async function updateServiceWorker() {
        if (swRegistration) {
          try {
            await swRegistration.update();
            log('Verificação de atualização solicitada', 'success');
          } catch (error) {
            log(`Erro ao atualizar: ${error.message}`, 'error');
          }
        } else {
          log('Nenhum Service Worker registrado', 'error');
        }
      }

      async function unregisterServiceWorker() {
        if (swRegistration) {
          try {
            await swRegistration.unregister();
            log('Service Worker removido', 'success');
            updateSWStatus('Service Worker removido');
          } catch (error) {
            log(`Erro ao remover: ${error.message}`, 'error');
          }
        }
      }

      // 2. CACHE MANAGEMENT
      async function cacheResources() {
        if ('caches' in window) {
          try {
            const cache = await caches.open('sw-demo-v1');

            // Recursos para cache
            const resources = [
              'https://jsonplaceholder.typicode.com/posts/1',
              'https://jsonplaceholder.typicode.com/users/1',
            ];

            await cache.addAll(resources);
            log(`${resources.length} recursos adicionados ao cache`, 'success');
            viewCacheContents();
          } catch (error) {
            log(`Erro ao cachear recursos: ${error.message}`, 'error');
          }
        }
      }

      async function viewCacheContents() {
        if ('caches' in window) {
          try {
            const cacheNames = await caches.keys();
            let content = 'CACHES DISPONÍVEIS:\n';

            for (const cacheName of cacheNames) {
              const cache = await caches.open(cacheName);
              const requests = await cache.keys();

              content += `\n📦 ${cacheName} (${requests.length} itens):\n`;
              requests.forEach((request) => {
                content += `  - ${request.url}\n`;
              });
            }

            cacheOutput.textContent = content || 'Nenhum cache encontrado';
          } catch (error) {
            log(`Erro ao listar cache: ${error.message}`, 'error');
          }
        }
      }

      async function clearCache() {
        if ('caches' in window) {
          try {
            const cacheNames = await caches.keys();

            await Promise.all(
              cacheNames.map((cacheName) => caches.delete(cacheName))
            );

            log(`${cacheNames.length} caches removidos`, 'success');
            cacheOutput.textContent = 'Cache limpo';
          } catch (error) {
            log(`Erro ao limpar cache: ${error.message}`, 'error');
          }
        }
      }

      // 3. OFFLINE MODE TEST
      async function testOfflineMode() {
        try {
          // Simular requisição que pode falhar offline
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts/1'
          );
          const data = await response.json();

          log('Dados carregados (online ou cache)', 'success');
          log(`Título: ${data.title}`);
        } catch (error) {
          log('Falha na requisição - provavelmente offline', 'error');

          // Tentar buscar do cache
          if ('caches' in window) {
            try {
              const cache = await caches.open('sw-demo-v1');
              const cachedResponse = await cache.match(
                'https://jsonplaceholder.typicode.com/posts/1'
              );

              if (cachedResponse) {
                const data = await cachedResponse.json();
                log('Dados carregados do cache!', 'success');
                log(`Título (cache): ${data.title}`);
              } else {
                log('Nenhum dado em cache disponível', 'error');
              }
            } catch (cacheError) {
              log(`Erro no cache: ${cacheError.message}`, 'error');
            }
          }
        }
      }

      // 4. PUSH NOTIFICATIONS
      async function requestNotificationPermission() {
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();

          notificationStatus.textContent = `Permissão: ${permission}`;

          if (permission === 'granted') {
            log('Permissão para notificações concedida!', 'success');
          } else {
            log('Permissão para notificações negada', 'error');
          }
        } else {
          log('Notificações não suportadas', 'error');
        }
      }

      function showLocalNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
          const notification = new Notification('Service Worker Demo', {
            body: 'Esta é uma notificação local!',
            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMDA3YmZmIi8+Cjx0ZXh0IHg9IjMyIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U1c8L3RleHQ+Cjwvc3ZnPgo=',
            badge:
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMzYiIGZpbGw9IiMwMDdiZmYiLz4KPC9zdmc+Cg==',
            tag: 'demo-notification',
            requireInteraction: false,
            vibrate: [200, 100, 200],
          });

          notification.onclick = function () {
            log('Notificação clicada!');
            window.focus();
            notification.close();
          };

          log('Notificação local enviada!', 'success');
        } else {
          log('Permissão de notificação necessária', 'error');
        }
      }

      function scheduleNotification() {
        setTimeout(() => {
          showLocalNotification();
          log('Notificação agendada foi enviada!', 'success');
        }, 5000);

        log('Notificação agendada para 5 segundos');
      }

      // 5. PWA INSTALLATION
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installPrompt.style.display = 'block';
        log('Prompt de instalação disponível');
      });

      installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const choiceResult = await deferredPrompt.userChoice;

          if (choiceResult.outcome === 'accepted') {
            log('App instalado!', 'success');
          } else {
            log('Instalação cancelada');
          }

          deferredPrompt = null;
          installPrompt.style.display = 'none';
        }
      });

      // 6. CONNECTION STATUS
      function updateConnectionStatus() {
        const isOnline = navigator.onLine;

        if (isOnline) {
          connectionStatus.className = 'status-bar online';
          connectionIndicator.textContent = '🟢 Online - Conectado à internet';
        } else {
          connectionStatus.className = 'status-bar offline';
          connectionIndicator.textContent = '🔴 Offline - Funcionando em cache';
        }
      }

      function updateSWStatus(message) {
        swIndicator.textContent = `📡 ${message}`;
      }

      // Event listeners
      window.addEventListener('online', () => {
        updateConnectionStatus();
        log('Conexão restaurada!', 'success');
      });

      window.addEventListener('offline', () => {
        updateConnectionStatus();
        log('Conexão perdida - modo offline ativo');
      });

      // Inicialização
      window.addEventListener('load', () => {
        updateConnectionStatus();

        // Check if SW is already registered
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then((registration) => {
            if (registration) {
              swRegistration = registration;
              updateSWStatus('Service Worker já registrado');
              log('Service Worker já estava registrado');
            }
          });
        }

        // Check notification permission
        if ('Notification' in window) {
          notificationStatus.textContent = `Permissão: ${Notification.permission}`;
        }

        log('Service Workers Demo carregado!');
        log('💡 Experimente desconectar a internet para testar modo offline');
      });

      console.log('🔧 Service Workers Demo carregado!');
      console.log('📱 Este site pode ser instalado como PWA');
    </script>
  </body>
</html>
```

---

## 📹 WebRTC - Comunicação Peer-to-Peer

### 🤔 O que é WebRTC?

WebRTC permite **comunicação em tempo real** diretamente entre navegadores, sem servidor intermediário - ideal para videochamadas, jogos online e compartilhamento de arquivos.

### 💻 Exemplo Prático: Sistema de Videochamada

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebRTC - Comunicação P2P</title>
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

      .video-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 20px 0;
      }

      .video-section {
        border: 2px solid #dee2e6;
        border-radius: 8px;
        overflow: hidden;
        background: #000;
        position: relative;
      }

      .video-section video {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }

      .video-label {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
      }

      .controls {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin: 15px 0;
        justify-content: center;
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
      .btn:disabled {
        background: #6c757d;
        cursor: not-allowed;
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

      .status {
        background: #343a40;
        color: white;
        padding: 15px;
        border-radius: 5px;
        font-family: monospace;
        margin: 15px 0;
      }

      .connection-info {
        background: #e8f5e9;
        border: 1px solid #4caf50;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
      }

      .data-channel {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
      }

      .message-container {
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #ddd;
        padding: 10px;
        margin: 10px 0;
        background: #f8f9fa;
      }

      .message {
        margin: 5px 0;
        padding: 8px;
        border-radius: 5px;
      }

      .message.sent {
        background: #007bff;
        color: white;
        text-align: right;
      }

      .message.received {
        background: #e9ecef;
        color: #333;
      }

      .input-group {
        display: flex;
        gap: 10px;
        margin: 10px 0;
      }

      .input-group input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .stats {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        margin: 10px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📹 WebRTC - Comunicação Peer-to-Peer</h1>

      <!-- Status da Conexão -->
      <div class="connection-info">
        <h3>🔗 Status da Conexão</h3>
        <div id="connection-status">Aguardando inicialização...</div>
      </div>

      <!-- Controles Principais -->
      <div class="controls">
        <button class="btn success" onclick="startLocalVideo()">
          📷 Iniciar Câmera
        </button>
        <button class="btn" onclick="createOffer()">📞 Criar Chamada</button>
        <button class="btn warning" onclick="createAnswer()">
          📞 Aceitar Chamada
        </button>
        <button class="btn danger" onclick="hangUp()">📴 Desligar</button>
      </div>

      <!-- Container de Vídeos -->
      <div class="video-container">
        <div class="video-section">
          <div class="video-label">📹 Vídeo Local</div>
          <video id="localVideo" autoplay muted playsinline></video>
        </div>

        <div class="video-section">
          <div class="video-label">📺 Vídeo Remoto</div>
          <video id="remoteVideo" autoplay playsinline></video>
        </div>
      </div>

      <!-- Controles de Mídia -->
      <div class="controls">
        <button class="btn" onclick="toggleVideo()" id="videoBtn">
          📷 Pausar Vídeo
        </button>
        <button class="btn" onclick="toggleAudio()" id="audioBtn">
          🎤 Muted
        </button>
        <button class="btn" onclick="switchCamera()">🔄 Trocar Câmera</button>
        <button class="btn warning" onclick="shareScreen()">
          🖥️ Compartilhar Tela
        </button>
      </div>

      <!-- Data Channel para Mensagens -->
      <div class="data-channel">
        <h3>💬 Chat P2P (Data Channel)</h3>

        <div class="message-container" id="messageContainer">
          <!-- Mensagens aparecerão aqui -->
        </div>

        <div class="input-group">
          <input
            type="text"
            id="messageInput"
            placeholder="Digite uma mensagem..."
            onkeypress="if(event.key==='Enter') sendMessage()"
          />
          <button class="btn" onclick="sendMessage()">📤 Enviar</button>
        </div>

        <div class="controls">
          <button class="btn" onclick="sendFile()">📁 Enviar Arquivo</button>
          <button class="btn" onclick="clearMessages()">🧹 Limpar Chat</button>
        </div>
      </div>

      <!-- Estatísticas da Conexão -->
      <div class="stats" id="connectionStats">
        Estatísticas da conexão aparecerão aqui...
      </div>

      <!-- Área de SDP para Troca Manual -->
      <div class="connection-info">
        <h3>🔧 Troca Manual de SDP (Para Teste)</h3>
        <p>
          <small
            >Em produção, isso seria feito via servidor de sinalização</small
          >
        </p>

        <div class="input-group">
          <textarea
            id="localSDP"
            placeholder="SDP local aparecerá aqui..."
            rows="3"
            style="flex: 1; margin-right: 10px;"
          ></textarea>
          <textarea
            id="remoteSDP"
            placeholder="Cole o SDP remoto aqui..."
            rows="3"
            style="flex: 1;"
          ></textarea>
        </div>

        <div class="controls">
          <button class="btn" onclick="copySDP()">📋 Copiar SDP Local</button>
          <button class="btn" onclick="pasteSDP()">
            📥 Aplicar SDP Remoto
          </button>
        </div>
      </div>

      <!-- Log de Status -->
      <div class="status" id="statusLog">
        WebRTC Demo carregado - Clique em "Iniciar Câmera" para começar...
      </div>
    </div>

    <script>
      // Configuração WebRTC
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
        ],
      };

      // Variáveis globais
      let localStream;
      let remoteStream;
      let peerConnection;
      let dataChannel;
      let isVideoEnabled = true;
      let isAudioEnabled = true;

      // Elementos DOM
      const localVideo = document.getElementById('localVideo');
      const remoteVideo = document.getElementById('remoteVideo');
      const connectionStatus = document.getElementById('connection-status');
      const statusLog = document.getElementById('statusLog');
      const messageContainer = document.getElementById('messageContainer');
      const messageInput = document.getElementById('messageInput');
      const localSDP = document.getElementById('localSDP');
      const remoteSDP = document.getElementById('remoteSDP');
      const connectionStats = document.getElementById('connectionStats');
      const videoBtn = document.getElementById('videoBtn');
      const audioBtn = document.getElementById('audioBtn');

      function log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix =
          type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        statusLog.textContent =
          `[${timestamp}] ${prefix} ${message}\n` + statusLog.textContent;
        console.log(`WebRTC: ${message}`);
      }

      // 1. INICIALIZAR CÂMERA LOCAL
      async function startLocalVideo() {
        try {
          const constraints = {
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: true,
          };

          localStream = await navigator.mediaDevices.getUserMedia(constraints);
          localVideo.srcObject = localStream;

          log('Câmera local iniciada com sucesso!', 'success');
          updateConnectionStatus('Câmera ativa - Pronto para chamada');

          // Atualizar controles
          updateMediaControls();
        } catch (error) {
          log(`Erro ao acessar câmera: ${error.message}`, 'error');
          updateConnectionStatus('Erro ao acessar câmera');
        }
      }

      // 2. CRIAR PEER CONNECTION
      function createPeerConnection() {
        peerConnection = new RTCPeerConnection(configuration);

        // Adicionar stream local
        if (localStream) {
          localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
          });
        }

        // Receber stream remoto
        peerConnection.ontrack = (event) => {
          log('Stream remoto recebido!', 'success');
          remoteStream = event.streams[0];
          remoteVideo.srcObject = remoteStream;
          updateConnectionStatus('Conectado - Chamada ativa');
        };

        // ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            log('ICE candidate gerado');
            // Em produção, enviaria via servidor de sinalização
          }
        };

        // Connection state changes
        peerConnection.onconnectionstatechange = () => {
          const state = peerConnection.connectionState;
          log(`Estado da conexão: ${state}`);
          updateConnectionStatus(`Estado: ${state}`);

          if (state === 'connected') {
            startStatsCollection();
          }
        };

        // Data channel
        peerConnection.ondatachannel = (event) => {
          const channel = event.channel;
          setupDataChannel(channel);
          log('Data channel recebido!', 'success');
        };

        return peerConnection;
      }

      // 3. CRIAR OFERTA (CALLER)
      async function createOffer() {
        if (!localStream) {
          alert('Inicie a câmera primeiro!');
          return;
        }

        try {
          peerConnection = createPeerConnection();

          // Criar data channel
          dataChannel = peerConnection.createDataChannel('messages', {
            ordered: true,
          });
          setupDataChannel(dataChannel);

          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);

          localSDP.value = JSON.stringify(offer, null, 2);

          log('Oferta criada! Compartilhe o SDP local', 'success');
          updateConnectionStatus('Aguardando resposta...');
        } catch (error) {
          log(`Erro ao criar oferta: ${error.message}`, 'error');
        }
      }

      // 4. CRIAR RESPOSTA (CALLEE)
      async function createAnswer() {
        if (!localStream) {
          alert('Inicie a câmera primeiro!');
          return;
        }

        const remoteSdpText = remoteSDP.value;
        if (!remoteSdpText) {
          alert('Cole o SDP remoto primeiro!');
          return;
        }

        try {
          peerConnection = createPeerConnection();

          const remoteDesc = JSON.parse(remoteSdpText);
          await peerConnection.setRemoteDescription(remoteDesc);

          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);

          localSDP.value = JSON.stringify(answer, null, 2);

          log('Resposta criada! Compartilhe o SDP local', 'success');
          updateConnectionStatus('Conectando...');
        } catch (error) {
          log(`Erro ao criar resposta: ${error.message}`, 'error');
        }
      }

      // 5. APLICAR SDP REMOTO
      async function pasteSDP() {
        const remoteSdpText = remoteSDP.value;
        if (!remoteSdpText || !peerConnection) {
          alert('SDP remoto ou peer connection não disponível!');
          return;
        }

        try {
          const remoteDesc = JSON.parse(remoteSdpText);

          if (remoteDesc.type === 'answer') {
            await peerConnection.setRemoteDescription(remoteDesc);
            log('SDP de resposta aplicado!', 'success');
            updateConnectionStatus('Estabelecendo conexão...');
          }
        } catch (error) {
          log(`Erro ao aplicar SDP: ${error.message}`, 'error');
        }
      }

      // 6. DATA CHANNEL SETUP
      function setupDataChannel(channel) {
        channel.onopen = () => {
          log('Data channel aberto!', 'success');
          messageInput.disabled = false;
        };

        channel.onclose = () => {
          log('Data channel fechado');
          messageInput.disabled = true;
        };

        channel.onmessage = (event) => {
          let data;
          try {
            data = JSON.parse(event.data);
          } catch (e) {
            data = { type: 'text', content: event.data };
          }

          if (data.type === 'text') {
            addMessage(data.content, 'received');
          } else if (data.type === 'file') {
            receiveFile(data);
          }
        };

        channel.onerror = (error) => {
          log(`Erro no data channel: ${error}`, 'error');
        };
      }

      // 7. ENVIAR MENSAGEM
      function sendMessage() {
        const message = messageInput.value.trim();
        if (!message || !dataChannel || dataChannel.readyState !== 'open') {
          return;
        }

        const data = {
          type: 'text',
          content: message,
          timestamp: Date.now(),
        };

        dataChannel.send(JSON.stringify(data));
        addMessage(message, 'sent');
        messageInput.value = '';
      }

      function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = content;

        messageContainer.appendChild(messageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }

      // 8. CONTROLES DE MÍDIA
      function toggleVideo() {
        if (localStream) {
          const videoTrack = localStream.getVideoTracks()[0];
          if (videoTrack) {
            isVideoEnabled = !isVideoEnabled;
            videoTrack.enabled = isVideoEnabled;
            videoBtn.textContent = isVideoEnabled
              ? '📷 Pausar Vídeo'
              : '📷 Retomar Vídeo';
            log(`Vídeo ${isVideoEnabled ? 'ativado' : 'pausado'}`);
          }
        }
      }

      function toggleAudio() {
        if (localStream) {
          const audioTrack = localStream.getAudioTracks()[0];
          if (audioTrack) {
            isAudioEnabled = !isAudioEnabled;
            audioTrack.enabled = isAudioEnabled;
            audioBtn.textContent = isAudioEnabled ? '🔇 Mute' : '🎤 Unmute';
            log(`Áudio ${isAudioEnabled ? 'ativado' : 'mutado'}`);
          }
        }
      }

      function updateMediaControls() {
        audioBtn.textContent = isAudioEnabled ? '🔇 Mute' : '🎤 Unmute';
        videoBtn.textContent = isVideoEnabled
          ? '📷 Pausar Vídeo'
          : '📷 Retomar Vídeo';
      }

      // 9. COMPARTILHAMENTO DE TELA
      async function shareScreen() {
        try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          });

          // Substituir video track
          if (peerConnection) {
            const sender = peerConnection
              .getSenders()
              .find((s) => s.track && s.track.kind === 'video');

            if (sender) {
              await sender.replaceTrack(screenStream.getVideoTracks()[0]);
            }
          }

          localVideo.srcObject = screenStream;
          log('Compartilhamento de tela iniciado!', 'success');

          // Voltar para câmera quando parar de compartilhar
          screenStream.getVideoTracks()[0].onended = () => {
            if (localStream && peerConnection) {
              const sender = peerConnection
                .getSenders()
                .find((s) => s.track && s.track.kind === 'video');

              if (sender) {
                sender.replaceTrack(localStream.getVideoTracks()[0]);
              }
            }

            localVideo.srcObject = localStream;
            log('Compartilhamento de tela finalizado');
          };
        } catch (error) {
          log(`Erro no compartilhamento: ${error.message}`, 'error');
        }
      }

      // 10. ESTATÍSTICAS DA CONEXÃO
      function startStatsCollection() {
        setInterval(async () => {
          if (peerConnection) {
            try {
              const stats = await peerConnection.getStats();
              const statsText = parseStats(stats);
              connectionStats.textContent = statsText;
            } catch (error) {
              console.log('Erro ao coletar stats:', error);
            }
          }
        }, 2000);
      }

      function parseStats(stats) {
        let result = 'ESTATÍSTICAS DA CONEXÃO:\n';

        stats.forEach((report) => {
          if (report.type === 'inbound-rtp' && report.kind === 'video') {
            result += `📺 Vídeo Recebido: ${report.framesPerSecond || 0} FPS\n`;
            result += `   Bytes: ${report.bytesReceived || 0}\n`;
          }

          if (report.type === 'outbound-rtp' && report.kind === 'video') {
            result += `📹 Vídeo Enviado: ${report.framesPerSecond || 0} FPS\n`;
            result += `   Bytes: ${report.bytesSent || 0}\n`;
          }

          if (
            report.type === 'candidate-pair' &&
            report.state === 'succeeded'
          ) {
            result += `🔗 RTT: ${
              report.currentRoundTripTime
                ? (report.currentRoundTripTime * 1000).toFixed(0)
                : 0
            }ms\n`;
          }
        });

        return result;
      }

      // 11. UTILITÁRIOS
      function hangUp() {
        if (peerConnection) {
          peerConnection.close();
          peerConnection = null;
        }

        if (dataChannel) {
          dataChannel.close();
          dataChannel = null;
        }

        remoteVideo.srcObject = null;
        localSDP.value = '';
        remoteSDP.value = '';
        messageInput.disabled = true;

        log('Chamada encerrada', 'success');
        updateConnectionStatus('Desconectado');
      }

      function copySDP() {
        localSDP.select();
        document.execCommand('copy');
        log('SDP copiado para clipboard!');
      }

      function clearMessages() {
        messageContainer.innerHTML = '';
        log('Chat limpo');
      }

      function updateConnectionStatus(status) {
        connectionStatus.textContent = `🔗 ${status}`;
      }

      // Placeholder para envio de arquivo
      function sendFile() {
        alert(
          '💡 Envio de arquivo seria implementado usando FileReader e data channel'
        );
        log('Funcionalidade de envio de arquivo não implementada nesta demo');
      }

      // Inicialização
      window.addEventListener('load', () => {
        messageInput.disabled = true;
        updateConnectionStatus('Aguardando inicialização da câmera');

        log('WebRTC Demo carregado!');
        log('💡 Para testar: 1) Inicie câmera 2) Crie oferta 3) Copie SDP');
        log('📱 Abra esta página em outra aba para simular peer remoto');

        console.log('📹 WebRTC Demo carregado!');
        console.log('🔧 STUN servers configurados para NAT traversal');
      });
    </script>
  </body>
</html>
```

---

## 🎮 WebGL - Gráficos 3D Avançados

### 🤔 O que é WebGL?

WebGL permite renderização de **gráficos 3D acelerados por hardware** diretamente no navegador, usando a GPU para performance máxima.

### 💻 Exemplo Prático: Engine 3D Básica

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebGL - Gráficos 3D</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #222;
        color: white;
      }

      .container {
        background: #333;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      }

      .canvas-container {
        text-align: center;
        margin: 20px 0;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
      }

      #webgl-canvas {
        border: 2px solid #007bff;
        display: block;
        margin: 0 auto;
      }

      .controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin: 20px 0;
      }

      .control-group {
        background: #444;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #555;
      }

      .control-group h4 {
        margin-top: 0;
        color: #007bff;
      }

      .slider-group {
        margin: 10px 0;
      }

      .slider-group label {
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
      }

      .slider-group input[type='range'] {
        width: 100%;
        margin-bottom: 5px;
      }

      .slider-value {
        background: #222;
        color: #0ff;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: monospace;
        font-size: 12px;
      }

      .btn {
        padding: 8px 12px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 2px;
        font-size: 12px;
      }

      .btn:hover {
        background: #0056b3;
      }
      .btn.danger {
        background: #dc3545;
      }
      .btn.success {
        background: #28a745;
      }

      .info-panel {
        background: #444;
        border: 1px solid #555;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        font-family: monospace;
        font-size: 14px;
      }

      .performance {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
        margin: 10px 0;
      }

      .metric {
        background: #222;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
      }

      .metric-value {
        font-size: 24px;
        font-weight: bold;
        color: #0ff;
      }

      .metric-label {
        font-size: 12px;
        color: #aaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🎮 WebGL - Gráficos 3D Avançados</h1>

      <!-- Canvas WebGL -->
      <div class="canvas-container">
        <canvas id="webgl-canvas" width="800" height="600"></canvas>
      </div>

      <!-- Controles -->
      <div class="controls">
        <!-- Rotação -->
        <div class="control-group">
          <h4>🔄 Rotação</h4>
          <div class="slider-group">
            <label
              >Eixo X:
              <span class="slider-value" id="rotX-value">0</span></label
            >
            <input type="range" id="rotX" min="0" max="360" value="0" />
          </div>
          <div class="slider-group">
            <label
              >Eixo Y:
              <span class="slider-value" id="rotY-value">0</span></label
            >
            <input type="range" id="rotY" min="0" max="360" value="45" />
          </div>
          <div class="slider-group">
            <label
              >Eixo Z:
              <span class="slider-value" id="rotZ-value">0</span></label
            >
            <input type="range" id="rotZ" min="0" max="360" value="0" />
          </div>
          <button class="btn" onclick="toggleAutoRotation()">
            🔄 Auto Rotação
          </button>
        </div>

        <!-- Cor e Material -->
        <div class="control-group">
          <h4>🎨 Material</h4>
          <div class="slider-group">
            <label
              >Vermelho:
              <span class="slider-value" id="colorR-value">1.0</span></label
            >
            <input type="range" id="colorR" min="0" max="100" value="100" />
          </div>
          <div class="slider-group">
            <label
              >Verde:
              <span class="slider-value" id="colorG-value">0.5</span></label
            >
            <input type="range" id="colorG" min="0" max="100" value="50" />
          </div>
          <div class="slider-group">
            <label
              >Azul:
              <span class="slider-value" id="colorB-value">0.0</span></label
            >
            <input type="range" id="colorB" min="0" max="100" value="0" />
          </div>
          <button class="btn" onclick="randomColor()">🎲 Cor Aleatória</button>
        </div>

        <!-- Iluminação -->
        <div class="control-group">
          <h4>💡 Iluminação</h4>
          <div class="slider-group">
            <label
              >Posição X:
              <span class="slider-value" id="lightX-value">1.0</span></label
            >
            <input
              type="range"
              id="lightX"
              min="-5"
              max="5"
              value="1"
              step="0.1"
            />
          </div>
          <div class="slider-group">
            <label
              >Posição Y:
              <span class="slider-value" id="lightY-value">1.0</span></label
            >
            <input
              type="range"
              id="lightY"
              min="-5"
              max="5"
              value="1"
              step="0.1"
            />
          </div>
          <div class="slider-group">
            <label
              >Posição Z:
              <span class="slider-value" id="lightZ-value">1.0</span></label
            >
            <input
              type="range"
              id="lightZ"
              min="-5"
              max="5"
              value="1"
              step="0.1"
            />
          </div>
          <button class="btn" onclick="toggleLighting()">
            💡 Liga/Desliga
          </button>
        </div>

        <!-- Objetos -->
        <div class="control-group">
          <h4>📦 Objetos</h4>
          <button class="btn" onclick="loadCube()">🧊 Cubo</button>
          <button class="btn" onclick="loadSphere()">⚪ Esfera</button>
          <button class="btn" onclick="loadPyramid()">🔺 Pirâmide</button>
          <button class="btn success" onclick="loadComplexScene()">
            🌟 Cena Complexa
          </button>
          <button class="btn danger" onclick="clearScene()">🗑️ Limpar</button>
        </div>
      </div>

      <!-- Performance -->
      <div class="info-panel">
        <h4>📊 Performance e Informações</h4>
        <div class="performance">
          <div class="metric">
            <div class="metric-value" id="fps">60</div>
            <div class="metric-label">FPS</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="triangles">12</div>
            <div class="metric-label">Triângulos</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="vertices">8</div>
            <div class="metric-label">Vértices</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="drawCalls">1</div>
            <div class="metric-label">Draw Calls</div>
          </div>
        </div>

        <div id="webgl-info">Carregando informações WebGL...</div>
      </div>
    </div>

    <script>
      // Variáveis globais WebGL
      let gl;
      let shaderProgram;
      let currentObject;
      let animationId;

      // Controles
      let autoRotate = false;
      let lightingEnabled = true;
      let rotation = { x: 0, y: 45, z: 0 };
      let color = { r: 1.0, g: 0.5, b: 0.0 };
      let lightPosition = { x: 1.0, y: 1.0, z: 1.0 };

      // Performance
      let lastTime = 0;
      let frameCount = 0;
      let fps = 60;

      // Shaders
      const vertexShaderSource = `
            attribute vec4 aVertexPosition;
            attribute vec3 aVertexNormal;

            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;
            uniform mat4 uNormalMatrix;

            varying highp vec3 vLighting;

            void main(void) {
                gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;

                // Lighting calculation
                highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
                highp vec3 directionalLightColor = vec3(1, 1, 1);
                highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

                highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

                highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
                vLighting = ambientLight + (directionalLightColor * directional);
            }
        `;

      const fragmentShaderSource = `
            varying highp vec3 vLighting;
            uniform highp vec4 uColor;

            void main(void) {
                gl_FragColor = vec4(uColor.rgb * vLighting, uColor.a);
            }
        `;

      // Inicialização
      function initWebGL() {
        const canvas = document.getElementById('webgl-canvas');
        gl = canvas.getContext('webgl');

        if (!gl) {
          alert('WebGL não suportado neste navegador!');
          return false;
        }

        // Configurações WebGL
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        // Inicializar shaders
        shaderProgram = initShaderProgram();

        // Carregar objeto inicial
        loadCube();

        // Configurar controles
        setupControls();

        // Iniciar loop de renderização
        startRenderLoop();

        // Mostrar informações WebGL
        displayWebGLInfo();

        return true;
      }

      function initShaderProgram() {
        const vertexShader = loadShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = loadShader(
          gl.FRAGMENT_SHADER,
          fragmentShaderSource
        );

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(
            'Erro ao inicializar shader program:',
            gl.getProgramInfoLog(program)
          );
          return null;
        }

        // Obter localizações dos atributos e uniforms
        program.attribLocations = {
          vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
          vertexNormal: gl.getAttribLocation(program, 'aVertexNormal'),
        };

        program.uniformLocations = {
          projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
          normalMatrix: gl.getUniformLocation(program, 'uNormalMatrix'),
          color: gl.getUniformLocation(program, 'uColor'),
        };

        return program;
      }

      function loadShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error(
            'Erro ao compilar shader:',
            gl.getShaderInfoLog(shader)
          );
          gl.deleteShader(shader);
          return null;
        }

        return shader;
      }

      // Geometria - Cubo
      function loadCube() {
        const positions = [
          // Face frontal
          -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

          // Face traseira
          -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

          // Face superior
          -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

          // Face inferior
          -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

          // Face direita
          1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

          // Face esquerda
          -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
        ];

        const indices = [
          0,
          1,
          2,
          0,
          2,
          3, // frontal
          4,
          5,
          6,
          4,
          6,
          7, // traseira
          8,
          9,
          10,
          8,
          10,
          11, // superior
          12,
          13,
          14,
          12,
          14,
          15, // inferior
          16,
          17,
          18,
          16,
          18,
          19, // direita
          20,
          21,
          22,
          20,
          22,
          23, // esquerda
        ];

        // Normais das faces
        const normals = [
          // Frontal
          0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

          // Traseira
          0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

          // Superior
          0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

          // Inferior
          0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

          // Direita
          1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

          // Esquerda
          -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
        ];

        currentObject = createBuffers(positions, indices, normals);
        updateStats(positions.length / 3, indices.length / 3);
        console.log('🧊 Cubo carregado');
      }

      function loadSphere() {
        const { positions, indices, normals } = generateSphere(1.0, 16, 16);
        currentObject = createBuffers(positions, indices, normals);
        updateStats(positions.length / 3, indices.length / 3);
        console.log('⚪ Esfera carregada');
      }

      function loadPyramid() {
        const positions = [
          // Base
          -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

          // Topo
          0.0, 1.0, 0.0,
        ];

        const indices = [
          // Base
          0, 1, 2, 0, 2, 3,

          // Faces laterais
          0, 4, 1, 1, 4, 2, 2, 4, 3, 3, 4, 0,
        ];

        const normals = [
          // Base
          0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

          // Topo
          0.0, 1.0, 0.0,
        ];

        currentObject = createBuffers(positions, indices, normals);
        updateStats(positions.length / 3, indices.length / 3);
        console.log('🔺 Pirâmide carregada');
      }

      function generateSphere(radius, latSegments, lonSegments) {
        const positions = [];
        const indices = [];
        const normals = [];

        for (let lat = 0; lat <= latSegments; lat++) {
          const theta = (lat * Math.PI) / latSegments;
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          for (let lon = 0; lon <= lonSegments; lon++) {
            const phi = (lon * 2 * Math.PI) / lonSegments;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const x = cosPhi * sinTheta;
            const y = cosTheta;
            const z = sinPhi * sinTheta;

            positions.push(radius * x, radius * y, radius * z);
            normals.push(x, y, z);
          }
        }

        for (let lat = 0; lat < latSegments; lat++) {
          for (let lon = 0; lon < lonSegments; lon++) {
            const first = lat * (lonSegments + 1) + lon;
            const second = first + lonSegments + 1;

            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
          }
        }

        return { positions, indices, normals };
      }

      function createBuffers(positions, indices, normals) {
        // Buffer de posições
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(positions),
          gl.STATIC_DRAW
        );

        // Buffer de índices
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(
          gl.ELEMENT_ARRAY_BUFFER,
          new Uint16Array(indices),
          gl.STATIC_DRAW
        );

        // Buffer de normais
        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(normals),
          gl.STATIC_DRAW
        );

        return {
          position: positionBuffer,
          indices: indexBuffer,
          normal: normalBuffer,
          vertexCount: indices.length,
        };
      }

      // Renderização
      function render(currentTime) {
        currentTime *= 0.001; // converter para segundos

        // Calcular FPS
        frameCount++;
        if (currentTime - lastTime >= 1.0) {
          fps = Math.round(frameCount / (currentTime - lastTime));
          document.getElementById('fps').textContent = fps;
          frameCount = 0;
          lastTime = currentTime;
        }

        // Auto rotação
        if (autoRotate) {
          rotation.y += 1;
          if (rotation.y >= 360) rotation.y = 0;
          updateSlider('rotY', rotation.y);
        }

        // Limpar canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if (currentObject) {
          drawObject(currentObject);
        }

        animationId = requestAnimationFrame(render);
      }

      function drawObject(buffers) {
        // Usar o programa de shader
        gl.useProgram(shaderProgram);

        // Configurar atributos
        // Posições
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
          shaderProgram.attribLocations.vertexPosition,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.enableVertexAttribArray(
          shaderProgram.attribLocations.vertexPosition
        );

        // Normais
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
        gl.vertexAttribPointer(
          shaderProgram.attribLocations.vertexNormal,
          3,
          gl.FLOAT,
          false,
          0,
          0
        );
        gl.enableVertexAttribArray(shaderProgram.attribLocations.vertexNormal);

        // Configurar matrizes
        const projectionMatrix = mat4.create();
        mat4.perspective(
          projectionMatrix,
          (45 * Math.PI) / 180,
          gl.canvas.clientWidth / gl.canvas.clientHeight,
          0.1,
          100.0
        );

        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);
        mat4.rotate(
          modelViewMatrix,
          modelViewMatrix,
          (rotation.x * Math.PI) / 180,
          [1, 0, 0]
        );
        mat4.rotate(
          modelViewMatrix,
          modelViewMatrix,
          (rotation.y * Math.PI) / 180,
          [0, 1, 0]
        );
        mat4.rotate(
          modelViewMatrix,
          modelViewMatrix,
          (rotation.z * Math.PI) / 180,
          [0, 0, 1]
        );

        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

        // Enviar uniforms
        gl.uniformMatrix4fv(
          shaderProgram.uniformLocations.projectionMatrix,
          false,
          projectionMatrix
        );
        gl.uniformMatrix4fv(
          shaderProgram.uniformLocations.modelViewMatrix,
          false,
          modelViewMatrix
        );
        gl.uniformMatrix4fv(
          shaderProgram.uniformLocations.normalMatrix,
          false,
          normalMatrix
        );
        gl.uniform4f(
          shaderProgram.uniformLocations.color,
          color.r,
          color.g,
          color.b,
          1.0
        );

        // Desenhar
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
        gl.drawElements(
          gl.TRIANGLES,
          buffers.vertexCount,
          gl.UNSIGNED_SHORT,
          0
        );
      }

      // Controles
      function setupControls() {
        // Rotação
        document.getElementById('rotX').addEventListener('input', (e) => {
          rotation.x = parseInt(e.target.value);
          updateSliderValue('rotX', rotation.x);
        });

        document.getElementById('rotY').addEventListener('input', (e) => {
          rotation.y = parseInt(e.target.value);
          updateSliderValue('rotY', rotation.y);
        });

        document.getElementById('rotZ').addEventListener('input', (e) => {
          rotation.z = parseInt(e.target.value);
          updateSliderValue('rotZ', rotation.z);
        });

        // Cor
        document.getElementById('colorR').addEventListener('input', (e) => {
          color.r = parseInt(e.target.value) / 100;
          updateSliderValue('colorR', color.r.toFixed(2));
        });

        document.getElementById('colorG').addEventListener('input', (e) => {
          color.g = parseInt(e.target.value) / 100;
          updateSliderValue('colorG', color.g.toFixed(2));
        });

        document.getElementById('colorB').addEventListener('input', (e) => {
          color.b = parseInt(e.target.value) / 100;
          updateSliderValue('colorB', color.b.toFixed(2));
        });

        // Luz
        document.getElementById('lightX').addEventListener('input', (e) => {
          lightPosition.x = parseFloat(e.target.value);
          updateSliderValue('lightX', lightPosition.x.toFixed(1));
        });

        document.getElementById('lightY').addEventListener('input', (e) => {
          lightPosition.y = parseFloat(e.target.value);
          updateSliderValue('lightY', lightPosition.y.toFixed(1));
        });

        document.getElementById('lightZ').addEventListener('input', (e) => {
          lightPosition.z = parseFloat(e.target.value);
          updateSliderValue('lightZ', lightPosition.z.toFixed(1));
        });

        // Inicializar valores dos sliders
        updateSliderValue('rotX', rotation.x);
        updateSliderValue('rotY', rotation.y);
        updateSliderValue('rotZ', rotation.z);
        updateSliderValue('colorR', color.r.toFixed(2));
        updateSliderValue('colorG', color.g.toFixed(2));
        updateSliderValue('colorB', color.b.toFixed(2));
        updateSliderValue('lightX', lightPosition.x.toFixed(1));
        updateSliderValue('lightY', lightPosition.y.toFixed(1));
        updateSliderValue('lightZ', lightPosition.z.toFixed(1));
      }

      function updateSliderValue(id, value) {
        document.getElementById(id + '-value').textContent = value;
      }

      function updateSlider(id, value) {
        document.getElementById(id).value = value;
        updateSliderValue(id, value);
      }

      // Funções de controle
      function toggleAutoRotation() {
        autoRotate = !autoRotate;
        console.log('Auto rotação:', autoRotate ? 'ligada' : 'desligada');
      }

      function randomColor() {
        color.r = Math.random();
        color.g = Math.random();
        color.b = Math.random();

        updateSlider('colorR', Math.round(color.r * 100));
        updateSlider('colorG', Math.round(color.g * 100));
        updateSlider('colorB', Math.round(color.b * 100));
      }

      function toggleLighting() {
        lightingEnabled = !lightingEnabled;
        console.log('Iluminação:', lightingEnabled ? 'ligada' : 'desligada');
      }

      function loadComplexScene() {
        // Esta é uma simplificação - uma cena complexa teria múltiplos objetos
        loadSphere();
        console.log('🌟 Cena complexa carregada (esfera de alta resolução)');
      }

      function clearScene() {
        currentObject = null;
        updateStats(0, 0);
        console.log('🗑️ Cena limpa');
      }

      function startRenderLoop() {
        render(0);
      }

      function updateStats(vertices, triangles) {
        document.getElementById('vertices').textContent = vertices;
        document.getElementById('triangles').textContent = triangles;
        document.getElementById('drawCalls').textContent = currentObject
          ? 1
          : 0;
      }

      function displayWebGLInfo() {
        const info = [
          `Vendor: ${gl.getParameter(gl.VENDOR)}`,
          `Renderer: ${gl.getParameter(gl.RENDERER)}`,
          `Versão: ${gl.getParameter(gl.VERSION)}`,
          `GLSL: ${gl.getParameter(gl.SHADING_LANGUAGE_VERSION)}`,
          `Max Texture Size: ${gl.getParameter(gl.MAX_TEXTURE_SIZE)}`,
          `Max Viewport: ${gl.getParameter(gl.MAX_VIEWPORT_DIMS)[0]}x${
            gl.getParameter(gl.MAX_VIEWPORT_DIMS)[1]
          }`,
        ].join('\n');

        document.getElementById('webgl-info').textContent = info;
      }

      // Biblioteca de matemática 3D básica (mat4)
      const mat4 = {
        create() {
          return new Float32Array([
            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
          ]);
        },

        perspective(out, fovy, aspect, near, far) {
          const f = 1.0 / Math.tan(fovy / 2);
          const rangeInv = 1 / (near - far);

          out[0] = f / aspect;
          out[1] = 0;
          out[2] = 0;
          out[3] = 0;
          out[4] = 0;
          out[5] = f;
          out[6] = 0;
          out[7] = 0;
          out[8] = 0;
          out[9] = 0;
          out[10] = (far + near) * rangeInv;
          out[11] = -1;
          out[12] = 0;
          out[13] = 0;
          out[14] = 2 * far * near * rangeInv;
          out[15] = 0;

          return out;
        },

        translate(out, a, v) {
          const x = v[0],
            y = v[1],
            z = v[2];

          out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
          out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
          out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
          out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];

          return out;
        },

        rotate(out, a, rad, axis) {
          const x = axis[0],
            y = axis[1],
            z = axis[2];
          const len = Math.sqrt(x * x + y * y + z * z);

          if (len < 0.000001) return null;

          const s = Math.sin(rad);
          const c = Math.cos(rad);
          const t = 1 - c;

          // Simplified rotation matrix multiplication
          // This is a basic implementation
          return out;
        },

        invert(out, a) {
          // Simplified matrix inversion
          for (let i = 0; i < 16; i++) {
            out[i] = a[i];
          }
          return out;
        },

        transpose(out, a) {
          // Matrix transpose
          if (out === a) {
            const a01 = a[1],
              a02 = a[2],
              a03 = a[3];
            const a12 = a[6],
              a13 = a[7];
            const a23 = a[11];

            out[1] = a[4];
            out[2] = a[8];
            out[3] = a[12];
            out[4] = a01;
            out[6] = a[9];
            out[7] = a[13];
            out[8] = a02;
            out[9] = a12;
            out[11] = a[14];
            out[12] = a03;
            out[13] = a13;
            out[14] = a23;
          } else {
            out[0] = a[0];
            out[1] = a[4];
            out[2] = a[8];
            out[3] = a[12];
            out[4] = a[1];
            out[5] = a[5];
            out[6] = a[9];
            out[7] = a[13];
            out[8] = a[2];
            out[9] = a[6];
            out[10] = a[10];
            out[11] = a[14];
            out[12] = a[3];
            out[13] = a[7];
            out[14] = a[11];
            out[15] = a[15];
          }

          return out;
        },
      };

      // Inicialização
      window.addEventListener('load', () => {
        if (initWebGL()) {
          console.log('🎮 WebGL Demo carregado com sucesso!');
          console.log('🔧 Use os controles para manipular o objeto 3D');
        } else {
          console.error('❌ Falha ao inicializar WebGL');
        }
      });

      // Cleanup
      window.addEventListener('beforeunload', () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      });
    </script>
  </body>
</html>
```

---

## 📱 Progressive Web Apps (PWA) - Apps Nativos com Web

### 🤔 O que são PWAs?

PWAs combinam o **melhor da web e dos apps nativos**: funcionam offline, podem ser instalados, enviam notificações e oferecem experiência nativa.

### 💻 Exemplo Prático: PWA Completa

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PWA Demo - App Web Nativo</title>

    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="#007bff" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    <meta name="apple-mobile-web-app-title" content="PWA Demo" />

    <!-- Manifest -->
    <link
      rel="manifest"
      href="data:application/json;base64,ewogICJuYW1lIjogIlBXQSBEZW1vIC0gQXBwIFdlYiBOYXRpdm8iLAogICJzaG9ydF9uYW1lIjogIlBXQSBEZW1vIiwKICAic3RhcnRfdXJsIjogIi8iLAogICJkaXNwbGF5IjogInN0YW5kYWxvbmUiLAogICJiYWNrZ3JvdW5kX2NvbG9yIjogIiNmNWY1ZjUiLAogICJ0aGVtZV9jb2xvciI6ICIjMDA3YmZmIiwKICAiaWNvbnMiOiBbCiAgICB7CiAgICAgICJzcmMiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTVRreUlpQm9aV2xuYUhROUlqa3lJaUIyYVdWM1FtOTRQU0l3SURBZ01Ua3lJREU1TWlJZ1ptbHNiRDBpYm05dVpTSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtQSEpsWTNRZ2QybGtkR2c5SWpFNU1pSWdhR1ZwWjJoMFBTSXhPVElpSUdacGJHdzlJaU13TURkaVptWWlMejRLUEhSbGVIUWdlRDBpT1RZaUlIazlJakV3TUNJZ1ptOXVkQzFtWVcxcGJIazlJa0Z5YVdGc0lpQm1iMjUwTFhOcGVtVTlJalF3SWlCbWFXeHNQU0ozYUdsMFpTSWdkR1Y0ZEMxaGJtTm9iM0k5SW0xcFpHUnNaU0krVUZkQkxrWnNiR0k4TDNSbGVIUStDand2YzNabkxnb3QiLAogICAgICAic2l6ZXMiOiAiMTkyeDE5MiIsCiAgICAgICJ0eXBlIjogImltYWdlL3N2Zyt4bWwiCiAgICB9LAogICAgewogICAgICAic3JjIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU5URXlJaUJvWldsbmFIUTlJalV4TWlJZ2RtbGxkMEp2ZUQwaU1DQXdJRFV4TWlBMU1USWlJR1pwYkd3OUltNXZibVVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaUzh5TURBd0wzTjJaeUkrQ2p4eVpXTjBJSGRwWkhSb1BTSTFNVElpSUdobGFXZG9kRDBpTlRFeUlpQm1hV3hzUFNJaU1EQTNZbVptSWk4K0NqeDBaWGgwSUhnOUlqSTFOaUlnZVQwaU1qYzJJaUJtYjI1MExXWmhiV2xzZVQwaVFYSnBZV3dpSUdadmJuUXRjMmw2WlQwaU1qZ2lJR1pwYkd3OUluZG9hWFJsSWlCMFpYaDBMV0Z1WTJodmNqMGliV2xrWkd4bElqNVFWMEV2VkdWemRHVThMM1JsZUhRK0Nqd3ZjM1puUGdvSyIsCiAgICAgICJzaXplcyI6ICI1MTJ4NTEyIiwKICAgICAgInR5cGUiOiAiaW1hZ2Uvc3ZnK3htbCIKICAgIH0KICBdLAogICJkZXNjcmlwdGlvbiI6ICJEZW1vbnN0cmHDp8OjbyBjb21wbGV0YSBkZSBQcm9ncmVzc2l2ZSBXZWIgQXBwIGNvbSB0b2RvcyBvcyByZWN1cnNvcyBuYXRpdm9zIgp9"
    />

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        color: white;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      .app-header {
        text-align: center;
        padding: 40px 0;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        margin-bottom: 30px;
        backdrop-filter: blur(10px);
      }

      .app-header h1 {
        font-size: 2.5em;
        margin-bottom: 10px;
      }

      .app-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin: 30px 0;
      }

      .feature-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        padding: 25px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: transform 0.3s ease;
      }

      .feature-card:hover {
        transform: translateY(-5px);
      }

      .feature-card h3 {
        font-size: 1.5em;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .controls {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin: 15px 0;
      }

      .btn {
        padding: 12px 20px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
      }

      .btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
      }

      .btn.primary {
        background: rgba(0, 123, 255, 0.7);
      }

      .btn.success {
        background: rgba(40, 167, 69, 0.7);
      }

      .btn.danger {
        background: rgba(220, 53, 69, 0.7);
      }

      .status-indicator {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 15px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        font-size: 14px;
        margin: 5px;
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .status-online {
        background: #28a745;
      }
      .status-offline {
        background: #dc3545;
      }
      .status-installing {
        background: #ffc107;
      }

      .log-area {
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        padding: 20px;
        font-family: monospace;
        font-size: 14px;
        max-height: 300px;
        overflow-y: auto;
        margin: 20px 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .todo-app {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        padding: 25px;
        margin: 20px 0;
      }

      .todo-input {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }

      .todo-input input {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        placeholder-color: rgba(255, 255, 255, 0.7);
      }

      .todo-input input::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }

      .todo-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        margin: 10px 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .todo-item.completed {
        opacity: 0.6;
        text-decoration: line-through;
      }

      .install-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: rgba(0, 123, 255, 0.95);
        color: white;
        padding: 15px;
        border-radius: 10px;
        display: none;
        align-items: center;
        justify-content: space-between;
        backdrop-filter: blur(10px);
        z-index: 1000;
      }

      .install-banner.show {
        display: flex;
      }

      .notification-demo {
        background: rgba(255, 193, 7, 0.2);
        border: 1px solid rgba(255, 193, 7, 0.5);
        border-radius: 10px;
        padding: 15px;
        margin: 15px 0;
      }

      @media (max-width: 768px) {
        .app-features {
          grid-template-columns: 1fr;
        }

        .controls {
          justify-content: center;
        }

        .install-banner {
          left: 10px;
          right: 10px;
        }
      }

      /* Animações PWA */
      @keyframes slideUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .slide-up {
        animation: slideUp 0.5s ease-out;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <header class="app-header">
        <h1>📱 Progressive Web App Demo</h1>
        <p>Experiência nativa usando tecnologias web</p>

        <!-- Status Indicators -->
        <div style="margin-top: 20px;">
          <div class="status-indicator">
            <div class="status-dot" id="connection-dot"></div>
            <span id="connection-status">Verificando conexão...</span>
          </div>

          <div class="status-indicator">
            <div class="status-dot" id="install-dot"></div>
            <span id="install-status">Verificando instalação...</span>
          </div>

          <div class="status-indicator">
            <div class="status-dot" id="sw-dot"></div>
            <span id="sw-status">Verificando Service Worker...</span>
          </div>
        </div>
      </header>

      <!-- Features Grid -->
      <section class="app-features">
        <!-- Offline Capability -->
        <div class="feature-card">
          <h3>🔌 Funciona Offline</h3>
          <p>
            Cache inteligente mantém a aplicação funcionando mesmo sem internet.
          </p>

          <div class="controls">
            <button class="btn" onclick="testOfflineMode()">
              🔌 Testar Offline
            </button>
            <button class="btn" onclick="clearOfflineCache()">
              🗑️ Limpar Cache
            </button>
          </div>

          <div class="notification-demo">
            <strong>💡 Dica:</strong> Desconecte a internet para testar!
          </div>
        </div>

        <!-- Installation -->
        <div class="feature-card">
          <h3>📱 Instalação Nativa</h3>
          <p>Pode ser instalado como um app nativo no dispositivo.</p>

          <div class="controls">
            <button
              class="btn primary"
              onclick="promptInstall()"
              id="install-btn"
            >
              📱 Instalar App
            </button>
            <button class="btn" onclick="checkInstallation()">
              ✅ Status da Instalação
            </button>
          </div>

          <div class="notification-demo">
            <strong>📲 Info:</strong> Funciona em Chrome, Edge, Safari e outros
            navegadores modernos.
          </div>
        </div>

        <!-- Push Notifications -->
        <div class="feature-card">
          <h3>🔔 Notificações Push</h3>
          <p>Receba notificações mesmo com o app fechado.</p>

          <div class="controls">
            <button class="btn" onclick="requestNotificationPermission()">
              🔔 Solicitar Permissão
            </button>
            <button class="btn success" onclick="showNotification()">
              📢 Testar Notificação
            </button>
            <button class="btn" onclick="scheduleNotification()">
              ⏰ Agendar (10s)
            </button>
          </div>

          <div id="notification-status">Status: Verificando permissões...</div>
        </div>

        <!-- Background Sync -->
        <div class="feature-card">
          <h3>🔄 Sincronização</h3>
          <p>
            Dados são sincronizados automaticamente quando a conexão retorna.
          </p>

          <div class="controls">
            <button class="btn" onclick="addDataOffline()">
              💾 Adicionar Dados
            </button>
            <button class="btn" onclick="syncData()">🔄 Forçar Sync</button>
            <button class="btn" onclick="viewPendingData()">
              📋 Ver Pendências
            </button>
          </div>

          <div id="sync-status">Sync Status: Aguardando...</div>
        </div>
      </section>

      <!-- Todo App Demo -->
      <section class="todo-app">
        <h2>📝 Todo App com Sync Offline</h2>
        <p>Uma aplicação funcional que demonstra persistência offline</p>

        <div class="todo-input">
          <input
            type="text"
            id="todo-input"
            placeholder="Digite uma nova tarefa..."
            onkeypress="if(event.key==='Enter') addTodo()"
          />
          <button class="btn primary" onclick="addTodo()">➕ Adicionar</button>
        </div>

        <div id="todo-list">
          <!-- Todos aparecerão aqui -->
        </div>

        <div class="controls">
          <button class="btn" onclick="clearCompletedTodos()">
            ✅ Limpar Concluídas
          </button>
          <button class="btn danger" onclick="clearAllTodos()">
            🗑️ Limpar Todas
          </button>
          <button class="btn" onclick="exportTodos()">📤 Exportar</button>
        </div>
      </section>

      <!-- Activity Log -->
      <section class="feature-card">
        <h3>📊 Log de Atividades</h3>
        <div class="log-area" id="activity-log">PWA Demo carregado...</div>

        <div class="controls">
          <button class="btn" onclick="clearLog()">🧹 Limpar Log</button>
          <button class="btn" onclick="exportLog()">📤 Exportar Log</button>
        </div>
      </section>
    </div>

    <!-- Install Banner -->
    <div class="install-banner" id="install-banner">
      <div>
        <strong>📱 Instalar App</strong>
        <p>Adicione este app à sua tela inicial para melhor experiência!</p>
      </div>
      <div>
        <button class="btn primary" onclick="promptInstall()">Instalar</button>
        <button
          class="btn"
          onclick="dismissInstallBanner()"
          style="margin-left: 10px;"
        >
          Mais tarde
        </button>
      </div>
    </div>

    <script>
      // Service Worker
      const SW_VERSION = 'v1.0.0';
      const CACHE_NAME = `pwa-demo-${SW_VERSION}`;

      // Variáveis globais
      let deferredPrompt;
      let isAppInstalled = false;
      let todos = JSON.parse(localStorage.getItem('todos') || '[]');
      let pendingSync = JSON.parse(localStorage.getItem('pendingSync') || '[]');

      // Elementos DOM
      const activityLog = document.getElementById('activity-log');
      const todoList = document.getElementById('todo-list');
      const todoInput = document.getElementById('todo-input');
      const installBanner = document.getElementById('install-banner');
      const installBtn = document.getElementById('install-btn');

      // Status elements
      const connectionDot = document.getElementById('connection-dot');
      const connectionStatus = document.getElementById('connection-status');
      const installDot = document.getElementById('install-dot');
      const installStatus = document.getElementById('install-status');
      const swDot = document.getElementById('sw-dot');
      const swStatus = document.getElementById('sw-status');
      const notificationStatus = document.getElementById('notification-status');
      const syncStatus = document.getElementById('sync-status');

      // Utility functions
      function log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix =
          type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';

        activityLog.innerHTML =
          `[${timestamp}] ${prefix} ${message}\n` + activityLog.innerHTML;
        console.log(`PWA: ${message}`);
      }

      function updateStatus(element, dotElement, message, status = 'online') {
        element.textContent = message;
        dotElement.className = `status-dot status-${status}`;
      }

      // 1. SERVICE WORKER REGISTRATION
      async function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
          try {
            // Service Worker inline
            const swCode = `
                        const CACHE_NAME = '${CACHE_NAME}';
                        const urlsToCache = [
                            '/',
                            '/manifest.json'
                        ];

                        self.addEventListener('install', event => {
                            event.waitUntil(
                                caches.open(CACHE_NAME)
                                    .then(cache => cache.addAll(urlsToCache))
                            );
                        });

                        self.addEventListener('fetch', event => {
                            event.respondWith(
                                caches.match(event.request)
                                    .then(response => {
                                        if (response) {
                                            return response;
                                        }
                                        return fetch(event.request);
                                    }
                                )
                            );
                        });

                        self.addEventListener('push', event => {
                            const options = {
                                body: event.data ? event.data.text() : 'Nova notificação!',
                                icon: '/icon-192x192.png',
                                badge: '/badge-72x72.png',
                                vibrate: [100, 50, 100],
                                data: {
                                    dateOfArrival: Date.now(),
                                    primaryKey: 1
                                }
                            };

                            event.waitUntil(
                                self.registration.showNotification('PWA Demo', options)
                            );
                        });

                        self.addEventListener('sync', event => {
                            if (event.tag === 'background-sync') {
                                event.waitUntil(doBackgroundSync());
                            }
                        });

                        function doBackgroundSync() {
                            return new Promise(resolve => {
                                // Simular sincronização
                                setTimeout(resolve, 1000);
                            });
                        }
                    `;

            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(blob);

            const registration = await navigator.serviceWorker.register(swUrl);

            updateStatus(swStatus, swDot, 'Service Worker ativo', 'online');
            log('Service Worker registrado com sucesso!', 'success');

            return registration;
          } catch (error) {
            updateStatus(swStatus, swDot, 'Erro no Service Worker', 'offline');
            log(`Erro ao registrar Service Worker: ${error.message}`, 'error');
          }
        } else {
          updateStatus(swStatus, swDot, 'Não suportado', 'offline');
          log('Service Workers não suportados', 'error');
        }
      }

      // 2. INSTALLATION
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        updateStatus(
          installStatus,
          installDot,
          'Pronto para instalar',
          'installing'
        );
        installBanner.classList.add('show');
        installBtn.disabled = false;

        log('Prompt de instalação disponível');
      });

      async function promptInstall() {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const choiceResult = await deferredPrompt.userChoice;

          if (choiceResult.outcome === 'accepted') {
            updateStatus(installStatus, installDot, 'App instalado!', 'online');
            log('PWA instalado com sucesso!', 'success');
            isAppInstalled = true;
          } else {
            log('Instalação cancelada pelo usuário');
          }

          deferredPrompt = null;
          installBanner.classList.remove('show');
        } else {
          log('Prompt de instalação não disponível');

          // Fallback: instruções manuais
          if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            alert(
              '📱 Para instalar no iOS:\n1. Toque no botão Compartilhar\n2. Selecione "Adicionar à Tela de Início"'
            );
          } else {
            alert(
              '📱 Para instalar:\n1. Clique no menu do navegador (⋮)\n2. Selecione "Instalar App" ou "Adicionar à tela inicial"'
            );
          }
        }
      }

      function dismissInstallBanner() {
        installBanner.classList.remove('show');
        log('Banner de instalação dispensado');
      }

      function checkInstallation() {
        if ('getInstalledRelatedApps' in navigator) {
          navigator.getInstalledRelatedApps().then((apps) => {
            if (apps.length > 0) {
              updateStatus(
                installStatus,
                installDot,
                'App já instalado',
                'online'
              );
              log('PWA já está instalado', 'success');
              isAppInstalled = true;
            } else {
              updateStatus(
                installStatus,
                installDot,
                'App não instalado',
                'offline'
              );
              log('PWA não está instalado');
            }
          });
        } else {
          log('Detecção de instalação não suportada');
        }
      }

      // 3. PUSH NOTIFICATIONS
      async function requestNotificationPermission() {
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();

          notificationStatus.textContent = `Status: ${permission}`;

          if (permission === 'granted') {
            log('Permissão para notificações concedida!', 'success');

            // Registrar para push notifications
            if ('serviceWorker' in navigator && 'PushManager' in window) {
              try {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(
                    'BEl62iUYgUivxIkv69yViEuiBIa40HI0DLLMxkcHt8Js'
                  ),
                });

                log('Inscrito para push notifications!', 'success');
              } catch (error) {
                log(
                  `Erro ao se inscrever para push: ${error.message}`,
                  'error'
                );
              }
            }
          } else {
            log('Permissão para notificações negada', 'error');
          }
        } else {
          notificationStatus.textContent = 'Status: Não suportado';
          log('Notificações não suportadas', 'error');
        }
      }

      function showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
          const notification = new Notification('PWA Demo Notification', {
            body: 'Esta é uma notificação de teste do nosso PWA!',
            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMDA3YmZmIi8+Cjx0ZXh0IHg9IjMyIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UDwvdGV4dD4KPC9zdmc+Cg==',
            badge:
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMzYiIGZpbGw9IiMwMDdiZmYiLz4KPC9zdmc+Cg==',
            tag: 'pwa-demo',
            requireInteraction: false,
            vibrate: [200, 100, 200],
            actions: [
              {
                action: 'view',
                title: 'Ver App',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
              },
              {
                action: 'close',
                title: 'Fechar',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4IDZMNiAxOE02IDZMMTggMTgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=',
              },
            ],
          });

          notification.onclick = function () {
            window.focus();
            this.close();
            log('Notificação clicada!');
          };

          log('Notificação local enviada!', 'success');
        } else {
          log('Permissão de notificação necessária', 'error');
        }
      }

      function scheduleNotification() {
        setTimeout(() => {
          showNotification();
          log('Notificação agendada foi enviada!', 'success');
        }, 10000);

        log('Notificação agendada para 10 segundos');
      }

      // 4. OFFLINE FUNCTIONALITY
      function testOfflineMode() {
        // Simular teste offline fazendo uma requisição que pode falhar
        fetch('https://jsonplaceholder.typicode.com/posts/1')
          .then((response) => response.json())
          .then((data) => {
            log('Requisição bem-sucedida (online)', 'success');
            log(`Dados recebidos: ${data.title}`);
          })
          .catch((error) => {
            log('Requisição falhou - provavelmente offline', 'error');

            // Tentar buscar dados do cache local
            const cachedData = localStorage.getItem('cachedData');
            if (cachedData) {
              log('Dados carregados do cache local!', 'success');
              const data = JSON.parse(cachedData);
              log(`Dados em cache: ${data.title}`);
            } else {
              log('Nenhum dado em cache disponível');

              // Salvar dados fictícios para demonstração
              const fallbackData = {
                title: 'Dados offline de demonstração',
                body: 'Este conteúdo está sendo servido do cache local',
              };
              localStorage.setItem('cachedData', JSON.stringify(fallbackData));
              log('Dados de fallback salvos no cache');
            }
          });
      }

      function clearOfflineCache() {
        if ('caches' in window) {
          caches
            .keys()
            .then((cacheNames) => {
              return Promise.all(
                cacheNames.map((cacheName) => caches.delete(cacheName))
              );
            })
            .then(() => {
              log('Cache offline limpo!', 'success');
            });
        }

        // Limpar localStorage cache também
        localStorage.removeItem('cachedData');
        log('Cache local limpo');
      }

      // 5. BACKGROUND SYNC
      function addDataOffline() {
        const newData = {
          id: Date.now(),
          content: `Dados criados offline em ${new Date().toLocaleString()}`,
          synced: false,
          timestamp: Date.now(),
        };

        pendingSync.push(newData);
        localStorage.setItem('pendingSync', JSON.stringify(pendingSync));

        syncStatus.textContent = `Sync Status: ${pendingSync.length} itens pendentes`;
        log(`Dados adicionados offline: ${newData.content}`, 'success');

        // Tentar registrar background sync se disponível
        if (
          'serviceWorker' in navigator &&
          'sync' in window.ServiceWorkerRegistration.prototype
        ) {
          navigator.serviceWorker.ready
            .then((registration) => {
              return registration.sync.register('background-sync');
            })
            .then(() => {
              log('Background sync registrado');
            })
            .catch((error) => {
              log(`Erro no background sync: ${error.message}`, 'error');
            });
        }
      }

      function syncData() {
        if (pendingSync.length === 0) {
          log('Nenhum dado pendente para sincronizar');
          return;
        }

        log(`Sincronizando ${pendingSync.length} itens...`);

        // Simular sincronização com servidor
        setTimeout(() => {
          pendingSync.forEach((item) => {
            item.synced = true;
            log(`Item sincronizado: ${item.content}`, 'success');
          });

          // Limpar dados sincronizados
          pendingSync = pendingSync.filter((item) => !item.synced);
          localStorage.setItem('pendingSync', JSON.stringify(pendingSync));

          syncStatus.textContent = `Sync Status: ${pendingSync.length} itens pendentes`;
          log('Sincronização concluída!', 'success');
        }, 2000);
      }

      function viewPendingData() {
        if (pendingSync.length === 0) {
          log('Nenhum dado pendente');
          return;
        }

        log(`=== DADOS PENDENTES (${pendingSync.length}) ===`);
        pendingSync.forEach((item, index) => {
          log(`${index + 1}. ${item.content}`);
        });
      }

      // 6. TODO APP FUNCTIONALITY
      function renderTodos() {
        todoList.innerHTML = '';

        if (todos.length === 0) {
          todoList.innerHTML =
            '<p style="text-align: center; opacity: 0.7;">Nenhuma tarefa ainda. Adicione uma acima!</p>';
          return;
        }

        todos.forEach((todo, index) => {
          const todoElement = document.createElement('div');
          todoElement.className = `todo-item ${
            todo.completed ? 'completed' : ''
          }`;

          todoElement.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" ${
                          todo.completed ? 'checked' : ''
                        }
                               onchange="toggleTodo(${index})" style="margin: 0;">
                        <span>${todo.text}</span>
                        ${
                          !todo.synced
                            ? '<span style="color: #ffc107; font-size: 12px;">⏳ Não sincronizado</span>'
                            : ''
                        }
                    </div>
                    <div>
                        <button class="btn" onclick="editTodo(${index})" style="font-size: 12px; padding: 5px 10px;">✏️</button>
                        <button class="btn danger" onclick="deleteTodo(${index})" style="font-size: 12px; padding: 5px 10px;">🗑️</button>
                    </div>
                `;

          todoList.appendChild(todoElement);
        });
      }

      function addTodo() {
        const text = todoInput.value.trim();
        if (!text) return;

        const newTodo = {
          id: Date.now(),
          text: text,
          completed: false,
          synced: navigator.onLine,
          createdAt: new Date().toISOString(),
        };

        todos.push(newTodo);
        saveTodos();
        renderTodos();

        todoInput.value = '';
        log(`Nova tarefa adicionada: ${text}`, 'success');

        if (!navigator.onLine) {
          log('Tarefa será sincronizada quando voltar online');
        }
      }

      function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        todos[index].synced = navigator.onLine;
        saveTodos();
        renderTodos();

        log(
          `Tarefa ${todos[index].completed ? 'concluída' : 'reativada'}: ${
            todos[index].text
          }`
        );
      }

      function editTodo(index) {
        const newText = prompt('Editar tarefa:', todos[index].text);
        if (newText && newText.trim()) {
          todos[index].text = newText.trim();
          todos[index].synced = navigator.onLine;
          saveTodos();
          renderTodos();
          log(`Tarefa editada: ${newText}`);
        }
      }

      function deleteTodo(index) {
        const todo = todos[index];
        if (confirm(`Deletar tarefa: "${todo.text}"?`)) {
          todos.splice(index, 1);
          saveTodos();
          renderTodos();
          log(`Tarefa deletada: ${todo.text}`);
        }
      }

      function clearCompletedTodos() {
        const completedCount = todos.filter((todo) => todo.completed).length;
        if (completedCount === 0) {
          log('Nenhuma tarefa concluída para remover');
          return;
        }

        if (confirm(`Remover ${completedCount} tarefa(s) concluída(s)?`)) {
          todos = todos.filter((todo) => !todo.completed);
          saveTodos();
          renderTodos();
          log(`${completedCount} tarefa(s) concluída(s) removida(s)`);
        }
      }

      function clearAllTodos() {
        if (todos.length === 0) {
          log('Nenhuma tarefa para remover');
          return;
        }

        if (confirm(`Remover todas as ${todos.length} tarefa(s)?`)) {
          todos = [];
          saveTodos();
          renderTodos();
          log('Todas as tarefas foram removidas');
        }
      }

      function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
      }

      function exportTodos() {
        const dataStr = JSON.stringify(todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        log('Tarefas exportadas com sucesso!', 'success');
      }

      // 7. CONNECTION STATUS
      function updateConnectionStatus() {
        const isOnline = navigator.onLine;

        if (isOnline) {
          updateStatus(connectionStatus, connectionDot, 'Online', 'online');
          log('Conexão restaurada - sincronizando dados...', 'success');

          // Auto-sync quando voltar online
          if (pendingSync.length > 0) {
            syncData();
          }

          // Marcar todos não sincronizados para sync
          let unsyncedCount = 0;
          todos.forEach((todo) => {
            if (!todo.synced) {
              todo.synced = true;
              unsyncedCount++;
            }
          });

          if (unsyncedCount > 0) {
            saveTodos();
            renderTodos();
            log(`${unsyncedCount} tarefa(s) sincronizada(s)`, 'success');
          }
        } else {
          updateStatus(connectionStatus, connectionDot, 'Offline', 'offline');
          log('Conexão perdida - funcionando offline');
        }
      }

      // 8. UTILITY FUNCTIONS
      function clearLog() {
        activityLog.innerHTML = '';
        log('Log limpo');
      }

      function exportLog() {
        const logData = activityLog.textContent;
        const dataBlob = new Blob([logData], { type: 'text/plain' });

        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pwa-log-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        log('Log exportado com sucesso!', 'success');
      }

      function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }

      // EVENT LISTENERS
      window.addEventListener('online', updateConnectionStatus);
      window.addEventListener('offline', updateConnectionStatus);

      window.addEventListener('appinstalled', (e) => {
        updateStatus(installStatus, installDot, 'App instalado!', 'online');
        log('PWA foi instalado!', 'success');
        isAppInstalled = true;
        installBanner.classList.remove('show');
      });

      // Listen for notification clicks
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NOTIFICATION_CLICK') {
          log('Notificação clicada via Service Worker');
        }
      });

      // INITIALIZATION
      window.addEventListener('load', async () => {
        // Initialize PWA features
        updateConnectionStatus();
        checkInstallation();
        await registerServiceWorker();

        // Initialize notification status
        if ('Notification' in window) {
          notificationStatus.textContent = `Status: ${Notification.permission}`;
        } else {
          notificationStatus.textContent = 'Status: Não suportado';
        }

        // Initialize sync status
        syncStatus.textContent = `Sync Status: ${pendingSync.length} itens pendentes`;

        // Render todos
        renderTodos();

        // Show install banner after delay if not installed
        setTimeout(() => {
          if (deferredPrompt && !isAppInstalled) {
            installBanner.classList.add('show');
          }
        }, 3000);

        log('PWA Demo totalmente carregado!', 'success');
        log(
          '💡 Esta é uma Progressive Web App completa com todos os recursos nativos'
        );
        log(
          '📱 Experimente instalar no seu dispositivo para a melhor experiência'
        );

        console.log('📱 PWA Demo carregado com sucesso!');
        console.log('🚀 Recursos disponíveis:', {
          serviceWorker: 'serviceWorker' in navigator,
          notifications: 'Notification' in window,
          pushManager: 'PushManager' in window,
          backgroundSync: 'sync' in window.ServiceWorkerRegistration.prototype,
          installPrompt: !!deferredPrompt,
        });
      });

      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        saveTodos();
        log('Dados salvos antes de sair da página');
      });
    </script>
  </body>
</html>
```

---

## 🎓 Resumo das Tecnologias Avançadas

### ✅ **Web Workers**

- **Threading em JavaScript** - Execução paralela sem bloquear UI
- **Tipos**: Dedicated, Shared, Service Workers
- **Casos de uso**: Cálculos pesados, processamento de imagem, criptografia
- **Comunicação**: postMessage() e event listeners

### ✅ **Service Workers**

- **Proxy entre app e rede** - Intercepta todas as requisições
- **Funcionalidades**: Cache inteligente, push notifications, background sync
- **Ciclo de vida**: Install → Activate → Fetch
- **Base para PWAs**

### ✅ **WebRTC**

- **Comunicação P2P** - Direto entre navegadores
- **APIs principais**: getUserMedia, RTCPeerConnection, DataChannel
- **Casos de uso**: Videochamadas, jogos multiplayer, file sharing
- **Protocolos**: STUN/TURN para NAT traversal

### ✅ **WebGL**

- **Gráficos 3D nativos** - Aceleração por hardware
- **Pipeline**: Vertex Shader → Rasterization → Fragment Shader
- **Matemática 3D**: Matrizes, transformações, projeções
- **Performance**: 60+ FPS em cenas complexas

### ✅ **Progressive Web Apps**

- **Experiência nativa** - Instalável, offline, notificações
- **Componentes**: Service Worker + Web App Manifest + HTTPS
- **Recursos**: Background sync, push notifications, install prompts
- **Cross-platform**: Funciona em todas as plataformas

---

# 🔧 Service Workers - Aplicações Offline (Detalhado)

## 📖 Índice Completo

1. **Introdução aos Service Workers**
2. **Arquitetura e Conceitos Fundamentais**
3. **Ciclo de Vida Detalhado**
4. **Estratégias de Cache Avançadas**
5. **Background Sync e Sincronização**
6. **Push Notifications Completas**
7. **Interceptação de Rede Avançada**
8. **Debug e Ferramentas de Desenvolvimento**
9. **Performance e Otimizações**
10. **Casos de Uso Reais e Padrões**
11. **Migração e Versionamento**
12. **Segurança e Boas Práticas**

---

## 1. 🏗️ Arquitetura e Conceitos Fundamentais

### 🧠 O que são Service Workers?

Service Workers são **scripts que rodam em background**, separados da thread principal da aplicação web. Eles funcionam como um **proxy programável** entre sua aplicação e a rede, permitindo:

- **Interceptação de requisições HTTP**
- **Cache inteligente e estratégico**
- **Funcionamento offline completo**
- **Background sync** para sincronização posterior
- **Push notifications** mesmo com app fechado
- **Pre-caching** de recursos críticos

### 🔄 Modelo de Threading

```javascript
// Thread Principal (DOM/UI)
// ↕️ postMessage
// Service Worker Thread (Background)
// ↕️ fetch/cache
// Network/Cache Storage
```

### 🌍 Escopo e Registro

```javascript
// ✅ Registrar Service Worker com escopo específico
navigator.serviceWorker
  .register('/sw.js', {
    scope: '/app/', // Controla apenas /app/* URLs
  })
  .then((registration) => {
    console.log('SW registrado:', registration.scope);

    // Verificar estado do SW
    if (registration.installing) {
      console.log('SW instalando...');
    } else if (registration.waiting) {
      console.log('SW aguardando ativação...');
    } else if (registration.active) {
      console.log('SW ativo!');
    }
  })
  .catch((error) => {
    console.error('Erro no registro:', error);
  });
```

---

## 2. 🔄 Ciclo de Vida Detalhado

### 📊 Estados do Service Worker

```javascript
// Service Worker Lifecycle States
const SW_STATES = {
  INSTALLING: 'installing', // Download e instalação
  INSTALLED: 'installed', // Instalado, aguardando ativação
  ACTIVATING: 'activating', // Processo de ativação
  ACTIVATED: 'activated', // Ativo e controlando páginas
  REDUNDANT: 'redundant', // Substituído por nova versão
};

// Monitorar mudanças de estado
navigator.serviceWorker.addEventListener('statechange', (event) => {
  console.log('SW State:', event.target.state);
});
```

### 🛠️ Evento Install - Configuração Inicial

```javascript
// sw.js - Evento de Instalação
const CACHE_VERSION = 'v2.1.0';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

// URLs críticas para cache inicial
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js',
  '/js/vendor.js',
  '/images/logo.png',
  '/fonts/roboto.woff2',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  console.log('🔧 SW: Install event');

  event.waitUntil(
    (async () => {
      try {
        // Abrir cache
        const cache = await caches.open(CACHE_NAME);

        console.log('📦 Caching app shell...');

        // Adicionar recursos críticos ao cache
        await cache.addAll(PRECACHE_URLS);

        console.log('✅ App shell cached');

        // Pre-cache recursos adicionais opcionalmente
        await precacheOptionalResources(cache);

        // Forçar ativação imediata (cuidado em produção!)
        // self.skipWaiting();
      } catch (error) {
        console.error('❌ Install failed:', error);
        throw error;
      }
    })()
  );
});

async function precacheOptionalResources(cache) {
  const OPTIONAL_RESOURCES = [
    '/images/hero-bg.jpg',
    '/data/initial-data.json',
    '/pages/about.html',
  ];

  // Cache recursos opcionais sem falhar se algum der erro
  for (const url of OPTIONAL_RESOURCES) {
    try {
      await cache.add(url);
      console.log(`✅ Cached optional: ${url}`);
    } catch (error) {
      console.warn(`⚠️ Failed to cache optional: ${url}`, error);
    }
  }
}
```

### ⚡ Evento Activate - Limpeza e Controle

```javascript
// sw.js - Evento de Ativação
self.addEventListener('activate', (event) => {
  console.log('⚡ SW: Activate event');

  event.waitUntil(
    (async () => {
      try {
        // Limpar caches antigos
        await cleanupOldCaches();

        // Reivindicar controle imediato de todas as páginas
        await self.clients.claim();

        // Configurações pós-ativação
        await postActivationSetup();

        console.log('✅ SW activated and ready');
      } catch (error) {
        console.error('❌ Activation failed:', error);
        throw error;
      }
    })()
  );
});

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();

  const oldCaches = cacheNames.filter(
    (name) => name.startsWith('app-cache-') && name !== CACHE_NAME
  );

  console.log(`🗑️ Removing ${oldCaches.length} old caches`);

  await Promise.all(
    oldCaches.map((name) => {
      console.log(`Deleting cache: ${name}`);
      return caches.delete(name);
    })
  );
}

async function postActivationSetup() {
  // Notificar todas as páginas abertas sobre nova versão
  const clients = await self.clients.matchAll();

  clients.forEach((client) => {
    client.postMessage({
      type: 'SW_ACTIVATED',
      version: CACHE_VERSION,
      timestamp: Date.now(),
    });
  });

  // Configurar background sync se suportado
  if (self.registration.sync) {
    console.log('🔄 Background sync available');
  }

  // Configurar push notifications se suportado
  if (self.registration.pushManager) {
    console.log('🔔 Push notifications available');
  }
}
```

---

## 3. 🗄️ Estratégias de Cache Avançadas

### 🎯 Padrões de Cache Estratégicos

```javascript
// Cache Strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first', // Cache primeiro, rede como fallback
  NETWORK_FIRST: 'network-first', // Rede primeiro, cache como fallback
  CACHE_ONLY: 'cache-only', // Apenas cache (offline-first)
  NETWORK_ONLY: 'network-only', // Apenas rede (sempre fresh)
  STALE_WHILE_REVALIDATE: 'swr', // Cache imediato + update em background
};

// Configuração de estratégias por tipo de recurso
const CACHE_CONFIG = {
  // App Shell - Cache First (mudança rara)
  appShell: {
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cache: 'app-shell-v1',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    patterns: [/^\/$/, /\.html$/, /\/css\/.+\.css$/, /\/js\/.+\.js$/],
  },

  // API Data - Network First (dados dinâmicos)
  apiData: {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cache: 'api-cache-v1',
    maxAge: 5 * 60 * 1000, // 5 minutos
    patterns: [/^https:\/\/api\.example\.com\//, /\/api\/.+/],
  },

  // Images - Stale While Revalidate (performance + freshness)
  images: {
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cache: 'images-cache-v1',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
    maxEntries: 100,
    patterns: [/\.(?:jpg|jpeg|png|gif|webp|svg)$/i],
  },

  // Fonts - Cache First (raramente mudam)
  fonts: {
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cache: 'fonts-cache-v1',
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 ano
    patterns: [/\.(?:woff|woff2|ttf|eot)$/i],
  },
};
```

### 🔄 Implementação das Estratégias

```javascript
// sw.js - Fetch Event com Estratégias Avançadas
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignorar requisições não-HTTP
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Encontrar estratégia apropriada
  const strategy = getStrategyForRequest(request);

  if (strategy) {
    event.respondWith(handleRequest(request, strategy));
  }
});

function getStrategyForRequest(request) {
  const url = request.url;

  for (const [name, config] of Object.entries(CACHE_CONFIG)) {
    for (const pattern of config.patterns) {
      if (pattern.test(url)) {
        return config;
      }
    }
  }

  // Estratégia padrão para recursos não categorizados
  return {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cache: 'runtime-cache-v1',
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
  };
}

async function handleRequest(request, strategy) {
  switch (strategy.strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, strategy);

    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, strategy);

    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, strategy);

    case CACHE_STRATEGIES.CACHE_ONLY:
      return cacheOnly(request, strategy);

    case CACHE_STRATEGIES.NETWORK_ONLY:
      return networkOnly(request, strategy);

    default:
      return fetch(request);
  }
}
```

### 📦 Cache First Strategy

```javascript
async function cacheFirst(request, strategy) {
  try {
    const cache = await caches.open(strategy.cache);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      // Verificar se está expirado
      if (isCacheEntryFresh(cachedResponse, strategy.maxAge)) {
        console.log('📦 Cache hit (fresh):', request.url);
        return cachedResponse;
      } else {
        console.log('📦 Cache hit (stale):', request.url);
        // Retornar cache stale e tentar atualizar em background
        updateCacheInBackground(request, cache);
        return cachedResponse;
      }
    }

    // Cache miss - buscar da rede
    console.log('🌐 Cache miss, fetching:', request.url);
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Clonar resposta antes de cachear
      const responseToCache = networkResponse.clone();
      await cacheResponse(cache, request, responseToCache, strategy);
    }

    return networkResponse;
  } catch (error) {
    console.error('❌ Cache first failed:', error);

    // Fallback: tentar cache mesmo se stale
    const cache = await caches.open(strategy.cache);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      console.log('📦 Returning stale cache as fallback');
      return cachedResponse;
    }

    // Último recurso: página offline
    return createOfflineFallback(request);
  }
}
```

### 🌐 Network First Strategy

```javascript
async function networkFirst(request, strategy) {
  try {
    console.log('🌐 Network first:', request.url);

    // Tentar rede primeiro com timeout
    const networkResponse = await fetchWithTimeout(request, 3000);

    if (networkResponse.ok) {
      // Cachear resposta bem-sucedida
      const cache = await caches.open(strategy.cache);
      const responseToCache = networkResponse.clone();
      await cacheResponse(cache, request, responseToCache, strategy);

      console.log('✅ Network success, cached');
      return networkResponse;
    }

    throw new Error(`Network response not ok: ${networkResponse.status}`);
  } catch (error) {
    console.log('⚠️ Network failed, trying cache:', error.message);

    // Fallback para cache
    const cache = await caches.open(strategy.cache);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      console.log('📦 Cache fallback success');
      return cachedResponse;
    }

    // Nenhum cache disponível
    console.log('❌ No cache available');
    return createOfflineFallback(request);
  }
}

async function fetchWithTimeout(request, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(request, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
```

### 🔄 Stale While Revalidate Strategy

```javascript
async function staleWhileRevalidate(request, strategy) {
  const cache = await caches.open(strategy.cache);

  // Buscar do cache imediatamente
  const cachedResponsePromise = cache.match(request);

  // Buscar da rede em paralelo
  const networkResponsePromise = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        // Atualizar cache com nova resposta
        const responseToCache = response.clone();
        await cacheResponse(cache, request, responseToCache, strategy);
        console.log('🔄 Cache updated in background');
      }
      return response;
    })
    .catch((error) => {
      console.log('🌐 Network update failed:', error.message);
      return null;
    });

  // Retornar cache se disponível, senão aguardar rede
  const cachedResponse = await cachedResponsePromise;

  if (cachedResponse) {
    console.log('📦 SWR: Returning cached response');

    // Se cache está fresh, não precisamos aguardar rede
    if (isCacheEntryFresh(cachedResponse, strategy.maxAge)) {
      return cachedResponse;
    }

    // Cache stale, mas retornamos imediatamente
    return cachedResponse;
  }

  // Não há cache, aguardar resposta da rede
  console.log('🌐 SWR: No cache, waiting for network');
  const networkResponse = await networkResponsePromise;

  return networkResponse || createOfflineFallback(request);
}
```

### 🧹 Cache Management e Limpeza

```javascript
// Gerenciamento inteligente de cache
async function cacheResponse(cache, request, response, strategy) {
  // Verificar limites do cache
  if (strategy.maxEntries) {
    await enforceMaxEntries(cache, strategy.maxEntries);
  }

  // Adicionar metadados à resposta
  const responseWithMetadata = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...response.headers,
      'sw-cached-at': new Date().toISOString(),
      'sw-cache-strategy': strategy.strategy,
    },
  });

  await cache.put(request, responseWithMetadata);
}

async function enforceMaxEntries(cache, maxEntries) {
  const keys = await cache.keys();

  if (keys.length >= maxEntries) {
    // Remover entradas mais antigas (LRU - Least Recently Used)
    const entriesToDelete = keys.length - maxEntries + 1;

    // Ordenar por data de acesso (simplificado)
    const sortedKeys = keys.sort((a, b) => {
      // Em implementação real, você manteria timestamps de acesso
      return Math.random() - 0.5; // Simplificado para demo
    });

    const keysToDelete = sortedKeys.slice(0, entriesToDelete);

    await Promise.all(keysToDelete.map((key) => cache.delete(key)));

    console.log(`🗑️ Removed ${entriesToDelete} cache entries`);
  }
}

function isCacheEntryFresh(response, maxAge) {
  const cachedAt = response.headers.get('sw-cached-at');

  if (!cachedAt) return false;

  const age = Date.now() - new Date(cachedAt).getTime();
  return age < maxAge;
}

async function updateCacheInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
      console.log('🔄 Background cache update completed');
    }
  } catch (error) {
    console.log('⚠️ Background cache update failed:', error.message);
  }
}
```

---

## 4. 📱 Push Notifications Avançadas

### 🔔 Configuração Completa de Push

```javascript
// main.js - Configuração de Push Notifications
class PushNotificationManager {
  constructor() {
    this.vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI0DLLMxkcHt8Js';
    this.subscription = null;
    this.permission = 'default';
  }

  async initialize() {
    // Verificar suporte
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    if (!('PushManager' in window)) {
      throw new Error('Push messaging not supported');
    }

    // Verificar permissão atual
    this.permission = Notification.permission;

    // Registrar Service Worker se necessário
    const registration = await this.ensureServiceWorker();

    // Verificar subscrição existente
    this.subscription = await registration.pushManager.getSubscription();

    console.log('🔔 Push manager initialized');
    return this;
  }

  async requestPermission() {
    if (this.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;

    if (permission === 'granted') {
      console.log('✅ Notification permission granted');
      return true;
    } else {
      console.log('❌ Notification permission denied');
      return false;
    }
  }

  async subscribe() {
    if (!(await this.requestPermission())) {
      throw new Error('Permission denied');
    }

    const registration = await navigator.serviceWorker.ready;

    try {
      this.subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey),
      });

      console.log('📡 Push subscription created');

      // Enviar subscription para servidor
      await this.sendSubscriptionToServer(this.subscription);

      return this.subscription;
    } catch (error) {
      console.error('❌ Push subscription failed:', error);
      throw error;
    }
  }

  async unsubscribe() {
    if (!this.subscription) {
      return true;
    }

    try {
      await this.subscription.unsubscribe();
      await this.removeSubscriptionFromServer(this.subscription);
      this.subscription = null;

      console.log('🔕 Push subscription removed');
      return true;
    } catch (error) {
      console.error('❌ Unsubscribe failed:', error);
      return false;
    }
  }

  async sendSubscriptionToServer(subscription) {
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }

    console.log('📤 Subscription sent to server');
  }

  async removeSubscriptionFromServer(subscription) {
    await fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscription }),
    });
  }

  async ensureServiceWorker() {
    if ('serviceWorker' in navigator) {
      return await navigator.serviceWorker.ready;
    }
    throw new Error('Service Worker not supported');
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Notificação local para teste
  async showLocalNotification(title, options = {}) {
    if (this.permission !== 'granted') {
      throw new Error('Permission not granted');
    }

    const notification = new Notification(title, {
      body: options.body || 'Notification body',
      icon: options.icon || '/images/icon-192x192.png',
      badge: options.badge || '/images/badge-72x72.png',
      tag: options.tag || 'default',
      renotify: options.renotify || false,
      silent: options.silent || false,
      vibrate: options.vibrate || [200, 100, 200],
      data: options.data || {},
      actions: options.actions || [],
      ...options,
    });

    notification.onclick = (event) => {
      event.notification.close();

      // Focar ou abrir aplicação
      if (options.onClick) {
        options.onClick(event);
      } else {
        window.focus();
      }
    };

    return notification;
  }
}
```

### 🎯 Service Worker Push Handler

```javascript
// sw.js - Push Event Handler Avançado
self.addEventListener('push', (event) => {
  console.log('🔔 Push received');

  let notificationData = {
    title: 'Nova Notificação',
    body: 'Você tem uma nova mensagem',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
  };

  // Parse push data se disponível
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (error) {
      notificationData.body = event.data.text();
    }
  }

  // Configurações avançadas da notificação
  const notificationOptions = {
    body: notificationData.body,
    icon: notificationData.icon || '/images/icon-192x192.png',
    badge: notificationData.badge || '/images/badge-72x72.png',
    image: notificationData.image, // Imagem grande na notificação
    vibrate: notificationData.vibrate || [200, 100, 200, 100, 200],
    sound: notificationData.sound,
    tag: notificationData.tag || 'default',
    renotify: notificationData.renotify || false,
    silent: notificationData.silent || false,
    requireInteraction: notificationData.requireInteraction || false,

    // Dados customizados
    data: {
      url: notificationData.url || '/',
      timestamp: Date.now(),
      ...notificationData.data,
    },

    // Actions (botões na notificação)
    actions: notificationData.actions || [
      {
        action: 'view',
        title: '👀 Ver',
        icon: '/images/actions/view.png',
      },
      {
        action: 'dismiss',
        title: '❌ Dispensar',
        icon: '/images/actions/dismiss.png',
      },
    ],
  };

  event.waitUntil(
    showNotificationWithAnalytics(notificationData.title, notificationOptions)
  );
});

async function showNotificationWithAnalytics(title, options) {
  // Mostrar notificação
  await self.registration.showNotification(title, options);

  // Registrar analytics
  await recordNotificationEvent('shown', {
    title,
    tag: options.tag,
    timestamp: Date.now(),
  });

  console.log('📊 Notification shown and tracked');
}

// Handler para cliques na notificação
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;
  const data = notification.data;

  console.log('🔔 Notification clicked:', { action, data });

  // Fechar notificação
  notification.close();

  // Registrar analytics
  recordNotificationEvent('clicked', {
    action,
    tag: notification.tag,
    timestamp: Date.now(),
  });

  // Processar ação
  event.waitUntil(handleNotificationClick(action, data));
});

async function handleNotificationClick(action, data) {
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  switch (action) {
    case 'view':
      // Abrir URL específica ou focar app existente
      const urlToOpen = data.url || '/';

      // Verificar se já existe uma janela aberta
      const existingClient = clients.find((client) =>
        client.url.includes(urlToOpen)
      );

      if (existingClient) {
        await existingClient.focus();
      } else if (clients.length > 0) {
        await clients[0].focus();
        await clients[0].navigate(urlToOpen);
      } else {
        await self.clients.openWindow(urlToOpen);
      }
      break;

    case 'dismiss':
      // Apenas dispensar (já fechada)
      break;

    default:
      // Ação padrão - abrir app
      if (clients.length > 0) {
        await clients[0].focus();
      } else {
        await self.clients.openWindow('/');
      }
  }
}

// Handler para fechamento da notificação
self.addEventListener('notificationclose', (event) => {
  const notification = event.notification;

  console.log('🔔 Notification closed:', notification.tag);

  // Registrar analytics
  recordNotificationEvent('closed', {
    tag: notification.tag,
    timestamp: Date.now(),
  });
});

async function recordNotificationEvent(type, data) {
  try {
    // Enviar evento para analytics
    await fetch('/api/analytics/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        userAgent: self.navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error('📊 Analytics recording failed:', error);
  }
}
```

---

## 5. 🔄 Background Sync Avançado

### 📤 Configuração de Background Sync

```javascript
// Background Sync para sincronização offline
class BackgroundSyncManager {
  constructor() {
    this.dbName = 'background-sync-db';
    this.storeName = 'pending-requests';
    this.db = null;
  }

  async initialize() {
    this.db = await this.openDatabase();
    console.log('🔄 Background sync manager initialized');
  }

  async openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true,
          });

          store.createIndex('tag', 'tag', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async queueRequest(tag, requestData) {
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    const entry = {
      tag,
      requestData,
      timestamp: Date.now(),
      attempts: 0,
      maxAttempts: 3,
    };

    await store.add(entry);

    // Registrar background sync
    if (
      'serviceWorker' in navigator &&
      'sync' in window.ServiceWorkerRegistration.prototype
    ) {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register(tag);

      console.log(`🔄 Background sync registered: ${tag}`);
    } else {
      console.warn('⚠️ Background sync not supported');
    }
  }

  async getPendingRequests(tag = null) {
    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);

    if (tag) {
      const index = store.index('tag');
      return await index.getAll(tag);
    }

    return await store.getAll();
  }

  async removeRequest(id) {
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    await store.delete(id);
  }

  async incrementAttempts(id) {
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    const request = await store.get(id);
    if (request) {
      request.attempts += 1;
      await store.put(request);
    }
  }
}

// Uso da classe
const syncManager = new BackgroundSyncManager();

// Exemplo: Adicionar dados offline para sincronização
async function addTodoOffline(todoData) {
  await syncManager.queueRequest('sync-todos', {
    method: 'POST',
    url: '/api/todos',
    body: todoData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('📤 Todo queued for background sync');
}
```

### 🔄 Service Worker Sync Handler

```javascript
// sw.js - Background Sync Event Handler
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);

  if (event.tag === 'sync-todos') {
    event.waitUntil(syncTodos());
  } else if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  } else if (event.tag.startsWith('sync-')) {
    event.waitUntil(syncGeneric(event.tag));
  }
});

async function syncTodos() {
  try {
    const pendingRequests = await getPendingRequests('sync-todos');

    console.log(`🔄 Syncing ${pendingRequests.length} todos`);

    for (const request of pendingRequests) {
      try {
        await processSyncRequest(request);
        await removePendingRequest(request.id);

        console.log('✅ Todo synced successfully');
      } catch (error) {
        console.error('❌ Todo sync failed:', error);

        await incrementRequestAttempts(request.id);

        // Se excedeu tentativas máximas, remover ou marcar como falha
        if (request.attempts >= request.maxAttempts) {
          await handleFailedSync(request);
        }
      }
    }

    // Notificar páginas abertas sobre sincronização
    await notifyClientsOfSync('todos', pendingRequests.length);
  } catch (error) {
    console.error('❌ Background sync failed:', error);
    throw error; // Fará o browser tentar novamente mais tarde
  }
}

async function processSyncRequest(request) {
  const { method, url, body, headers } = request.requestData;

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response;
}

async function getPendingRequests(tag) {
  // Implementação simplificada - em produção usaria IndexedDB
  const cache = await caches.open('background-sync-cache');
  const cachedRequests = await cache.match('/sync-data');

  if (cachedRequests) {
    const data = await cachedRequests.json();
    return data.filter((item) => item.tag === tag);
  }

  return [];
}

async function removePendingRequest(id) {
  // Remover da lista de pendências
  console.log(`🗑️ Removing synced request: ${id}`);
}

async function incrementRequestAttempts(id) {
  // Incrementar contador de tentativas
  console.log(`🔄 Incrementing attempts for request: ${id}`);
}

async function handleFailedSync(request) {
  console.log('❌ Request failed permanently:', request.id);

  // Notificar usuário sobre falha
  await self.registration.showNotification('Sync Failed', {
    body: 'Some data could not be synchronized',
    icon: '/images/error-icon.png',
    tag: 'sync-failed',
  });

  // Remover da fila
  await removePendingRequest(request.id);
}

async function notifyClientsOfSync(dataType, count) {
  const clients = await self.clients.matchAll();

  clients.forEach((client) => {
    client.postMessage({
      type: 'SYNC_COMPLETED',
      dataType,
      count,
      timestamp: Date.now(),
    });
  });
}
```

---

## 6. 🐛 Debug e Ferramentas de Desenvolvimento

### 🔍 DevTools para Service Workers

```javascript
// Debugging utilities para Service Workers
class ServiceWorkerDebugger {
  constructor() {
    this.isDebugMode = location.hostname === 'localhost' ||
                      location.search.includes('debug=true');
  }

  log(message, data = null) {
    if (this.isDebugMode) {
      console.log(`[SW Debug] ${message}`, data);

      // Enviar logs para página principal
      this.sendMessageToClients({
        type: 'SW_DEBUG_LOG',
        message,
        data,
        timestamp: Date.now()
      });
    }
  }

  error(message, error = null) {
    console.error(`[SW Error] ${message}`, error);

    this.sendMessageToClients({
      type: 'SW_ERROR',
      message,
      error: error ? error.message : null,
      stack: error ? error.stack : null,
      timestamp: Date.now()
    });
  }

  async sendMessageToClients(message) {
    const clients = await self.clients.matchAll();
    clients.forEach(client => client.postMessage(message));
  }

  async inspectCache(cacheName) {
    try {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();

      const cacheData = await Promise.all(
        keys.map(async (request) => {
          const response = await cache.match(request);
          return {
            url: request.url,
            method: request.method,
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            size: await this.getResponseSize(response.clone())
          };
        })
      );

      this.log('Cache inspection', { cacheName, entries: cacheData });
      return cacheData;

    } catch (error) {
      this.error('Cache inspection failed', error);
      return [];
    }
  }

  async getResponseSize(response) {
    try {
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer.byteLength;
    } catch {
      return 0;
    }
  }

  async getCacheStats() {
    const cacheNames = await caches.keys();
    const stats = {};

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();

      let totalSize = 0;
      for (const request of keys) {
        const response = await cache.match(request);
        totalSize += await this.getResponseSize(response.clone());
      }

      stats[cacheName] = {
        entries: keys.length,
        size: totalSize,
        sizeFormatted: this.formatBytes(totalSize)
      };
    }

    this.log('Cache statistics', stats);
    return stats;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async simulateOffline() {
    this.log('Simulating offline mode');

    // Override fetch temporariamente
    const originalFetch = self.fetch;

    self.fetch = async (...args) => {
      throw new Error('Simulated offline mode');
    };

    // Restaurar após 10 segundos
    setTimeout(() => {
      self.fetch = originalFetch;
      this.log('Offline simulation ended');
    }, 10000);
  }
}

// Usar debugger no Service Worker
const debugger = new ServiceWorkerDebugger();

// Instrumentar eventos principais
const originalAddEventListener = self.addEventListener;
self.addEventListener = function(type, listener, options) {
  debugger.log(`Event listener added: ${type}`);

  const wrappedListener = function(...args) {
    debugger.log(`Event triggered: ${type}`, args[0]);
    return listener.apply(this, args);
  };

  return originalAddEventListener.call(this, type, wrappedListener, options);
};
```

### 🧪 Testing Service Workers

```javascript
// main.js - Ferramentas de teste para SW
class ServiceWorkerTester {
  constructor() {
    this.tests = [];
    this.results = [];
  }

  async runAllTests() {
    console.log('🧪 Running Service Worker tests...');

    this.results = [];

    for (const test of this.tests) {
      try {
        const startTime = performance.now();
        await test.fn();
        const duration = performance.now() - startTime;

        this.results.push({
          name: test.name,
          status: 'PASS',
          duration: Math.round(duration),
          error: null,
        });

        console.log(`✅ ${test.name} (${Math.round(duration)}ms)`);
      } catch (error) {
        this.results.push({
          name: test.name,
          status: 'FAIL',
          duration: 0,
          error: error.message,
        });

        console.error(`❌ ${test.name}: ${error.message}`);
      }
    }

    this.displayResults();
  }

  addTest(name, testFn) {
    this.tests.push({ name, fn: testFn });
  }

  displayResults() {
    const passed = this.results.filter((r) => r.status === 'PASS').length;
    const failed = this.results.filter((r) => r.status === 'FAIL').length;

    console.log(`\n🧪 Test Results: ${passed} passed, ${failed} failed`);

    // Mostrar resultados na UI
    this.createResultsUI();
  }

  createResultsUI() {
    const existingResults = document.getElementById('sw-test-results');
    if (existingResults) {
      existingResults.remove();
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'sw-test-results';
    resultsContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border: 2px solid #007bff;
      border-radius: 8px;
      padding: 15px;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      z-index: 10000;
      font-family: monospace;
      font-size: 12px;
    `;

    const passed = this.results.filter((r) => r.status === 'PASS').length;
    const failed = this.results.filter((r) => r.status === 'FAIL').length;

    resultsContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <strong>🧪 SW Tests</strong>
        <button onclick="this.parentElement.parentElement.remove()" style="border: none; background: #dc3545; color: white; border-radius: 3px; padding: 2px 6px;">×</button>
      </div>
      <div style="margin-bottom: 10px;">
        <span style="color: green;">✅ ${passed} passed</span> |
        <span style="color: red;">❌ ${failed} failed</span>
      </div>
      ${this.results
        .map(
          (result) => `
        <div style="margin: 5px 0; padding: 5px; background: ${
          result.status === 'PASS' ? '#d4edda' : '#f8d7da'
        }; border-radius: 3px;">
          <strong>${result.status === 'PASS' ? '✅' : '❌'} ${
            result.name
          }</strong>
          ${
            result.duration > 0
              ? `<span style="float: right;">${result.duration}ms</span>`
              : ''
          }
          ${
            result.error
              ? `<div style="color: #721c24; font-size: 11px;">${result.error}</div>`
              : ''
          }
        </div>
      `
        )
        .join('')}
    `;

    document.body.appendChild(resultsContainer);
  }
}

// Configurar testes
const swTester = new ServiceWorkerTester();

// Teste: Registration
swTester.addTest('Service Worker Registration', async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker not supported');
  }

  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    throw new Error('No Service Worker registered');
  }

  if (!registration.active) {
    throw new Error('Service Worker not active');
  }
});

// Teste: Cache API
swTester.addTest('Cache API Functionality', async () => {
  if (!('caches' in window)) {
    throw new Error('Cache API not supported');
  }

  const testCacheName = 'sw-test-cache';
  const testUrl = '/test-cache-entry';
  const testResponse = new Response('Test data', {
    headers: { 'Content-Type': 'text/plain' },
  });

  // Abrir cache
  const cache = await caches.open(testCacheName);

  // Adicionar entrada
  await cache.put(testUrl, testResponse.clone());

  // Verificar se foi cacheado
  const cachedResponse = await cache.match(testUrl);
  if (!cachedResponse) {
    throw new Error('Failed to cache response');
  }

  // Verificar conteúdo
  const cachedText = await cachedResponse.text();
  if (cachedText !== 'Test data') {
    throw new Error('Cached data mismatch');
  }

  // Limpar
  await caches.delete(testCacheName);
});

// Teste: Fetch Interception
swTester.addTest('Fetch Interception', async () => {
  const testUrl = '/sw-test-fetch';

  try {
    const response = await fetch(testUrl);
    // Verificar se foi interceptado pelo SW (header específico)
    if (!response.headers.get('x-served-by-sw')) {
      console.warn('Fetch may not be intercepted by SW');
    }
  } catch (error) {
    // Expected para URL de teste
  }
});

// Teste: Push Notifications Support
swTester.addTest('Push Notifications Support', async () => {
  if (!('Notification' in window)) {
    throw new Error('Notifications not supported');
  }

  if (!('PushManager' in window)) {
    throw new Error('Push Manager not supported');
  }

  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    throw new Error('Service Worker required for push');
  }

  if (!registration.pushManager) {
    throw new Error('Push Manager not available');
  }
});

// Executar testes automaticamente em desenvolvimento
if (
  location.hostname === 'localhost' ||
  location.search.includes('test=true')
) {
  window.addEventListener('load', () => {
    setTimeout(() => swTester.runAllTests(), 2000);
  });
}

// Adicionar comando global para testes manuais
window.testServiceWorker = () => swTester.runAllTests();
```

---

## 7. ⚡ Performance e Otimizações

### 📊 Métricas de Performance

```javascript
// Performance monitoring para Service Workers
class ServiceWorkerPerformanceMonitor {
  constructor() {
    this.metrics = {
      cacheHits: 0,
      cacheMisses: 0,
      networkRequests: 0,
      networkFailures: 0,
      averageResponseTime: 0,
      responseTimes: [],
    };

    this.startTime = Date.now();
  }

  recordCacheHit(url) {
    this.metrics.cacheHits++;
    console.log(`📦 Cache hit: ${url}`);
  }

  recordCacheMiss(url) {
    this.metrics.cacheMisses++;
    console.log(`🌐 Cache miss: ${url}`);
  }

  recordNetworkRequest(url, responseTime, success = true) {
    this.metrics.networkRequests++;

    if (!success) {
      this.metrics.networkFailures++;
    }

    this.metrics.responseTimes.push(responseTime);

    // Calcular média móvel dos últimos 50 requests
    if (this.metrics.responseTimes.length > 50) {
      this.metrics.responseTimes.shift();
    }

    this.metrics.averageResponseTime =
      this.metrics.responseTimes.reduce((a, b) => a + b, 0) /
      this.metrics.responseTimes.length;

    console.log(`⏱️ Network request: ${url} (${responseTime}ms)`);
  }

  getCacheHitRatio() {
    const total = this.metrics.cacheHits + this.metrics.cacheMisses;
    return total > 0 ? (this.metrics.cacheHits / total) * 100 : 0;
  }

  getNetworkSuccessRate() {
    return this.metrics.networkRequests > 0
      ? ((this.metrics.networkRequests - this.metrics.networkFailures) /
          this.metrics.networkRequests) *
          100
      : 0;
  }

  generateReport() {
    const uptime = Date.now() - this.startTime;

    return {
      uptime: Math.round(uptime / 1000), // segundos
      cacheHitRatio: this.getCacheHitRatio().toFixed(2),
      networkSuccessRate: this.getNetworkSuccessRate().toFixed(2),
      averageResponseTime: this.metrics.averageResponseTime.toFixed(2),
      totalRequests: this.metrics.cacheHits + this.metrics.cacheMisses,
      ...this.metrics,
    };
  }

  async sendReport() {
    const report = this.generateReport();

    try {
      await fetch('/api/sw-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });

      console.log('📊 Performance report sent');
    } catch (error) {
      console.error('📊 Failed to send performance report:', error);
    }
  }
}

const perfMonitor = new ServiceWorkerPerformanceMonitor();

// Instrumentar fetch event para coleta de métricas
const originalFetchHandler = self.addEventListener;

self.addEventListener('fetch', (event) => {
  const startTime = performance.now();
  const url = event.request.url;

  event.respondWith(
    (async () => {
      try {
        // Tentar cache primeiro
        const cachedResponse = await caches.match(event.request);

        if (cachedResponse) {
          perfMonitor.recordCacheHit(url);
          return cachedResponse;
        }

        perfMonitor.recordCacheMiss(url);

        // Buscar da rede
        const response = await fetch(event.request);
        const responseTime = performance.now() - startTime;

        perfMonitor.recordNetworkRequest(url, responseTime, response.ok);

        return response;
      } catch (error) {
        const responseTime = performance.now() - startTime;
        perfMonitor.recordNetworkRequest(url, responseTime, false);
        throw error;
      }
    })()
  );
});

// Enviar relatório periodicamente
setInterval(() => {
  perfMonitor.sendReport();
}, 5 * 60 * 1000); // A cada 5 minutos
```

### 🚀 Otimizações de Cache

```javascript
// Estratégias avançadas de otimização
class CacheOptimizer {
  constructor() {
    this.compressionEnabled = 'CompressionStream' in window;
    this.maxCacheSize = 50 * 1024 * 1024; // 50MB
  }

  async optimizeResponse(response, request) {
    const url = new URL(request.url);

    // Otimizações específicas por tipo de conteúdo
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      return this.optimizeJSON(response);
    }

    if (contentType.includes('text/html')) {
      return this.optimizeHTML(response);
    }

    if (contentType.includes('image/')) {
      return this.optimizeImage(response, url);
    }

    return response;
  }

  async optimizeJSON(response) {
    try {
      const data = await response.json();

      // Comprimir JSON se possível
      const compressedData = this.compressionEnabled
        ? await this.compressData(JSON.stringify(data))
        : JSON.stringify(data);

      return new Response(compressedData, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...response.headers,
          'x-cache-optimized': 'json',
          'x-compression': this.compressionEnabled ? 'gzip' : 'none',
        },
      });
    } catch (error) {
      console.warn('JSON optimization failed:', error);
      return response;
    }
  }

  async optimizeHTML(response) {
    try {
      let html = await response.text();

      // Minificar HTML básico
      html = html
        .replace(/>\s+</g, '><') // Remover espaços entre tags
        .replace(/\s{2,}/g, ' ') // Reduzir múltiplos espaços
        .replace(/<!--.*?-->/g, '') // Remover comentários
        .trim();

      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...response.headers,
          'x-cache-optimized': 'html',
        },
      });
    } catch (error) {
      console.warn('HTML optimization failed:', error);
      return response;
    }
  }

  async optimizeImage(response, url) {
    // Para imagens, adicionar headers de cache agressivo
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        'cache-control': 'public, max-age=31536000', // 1 ano
        'x-cache-optimized': 'image',
      },
    });
  }

  async compressData(data) {
    if (!this.compressionEnabled) return data;

    try {
      const stream = new CompressionStream('gzip');
      const writer = stream.writable.getWriter();
      const reader = stream.readable.getReader();

      writer.write(new TextEncoder().encode(data));
      writer.close();

      const chunks = [];
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) chunks.push(value);
      }

      return new Uint8Array(
        chunks.reduce((acc, chunk) => [...acc, ...chunk], [])
      );
    } catch (error) {
      console.warn('Compression failed:', error);
      return data;
    }
  }

  async manageCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    // Calcular tamanho total dos caches
    for (const cacheName of cacheNames) {
      const size = await this.getCacheSize(cacheName);
      totalSize += size;
    }

    console.log(`📊 Total cache size: ${this.formatBytes(totalSize)}`);

    // Se exceder limite, limpar caches mais antigos
    if (totalSize > this.maxCacheSize) {
      await this.cleanupOldestCaches(totalSize - this.maxCacheSize);
    }
  }

  async getCacheSize(cacheName) {
    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      let size = 0;

      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          size += blob.size;
        }
      }

      return size;
    } catch (error) {
      console.warn(`Failed to calculate cache size for ${cacheName}:`, error);
      return 0;
    }
  }

  async cleanupOldestCaches(bytesToFree) {
    console.log(`🧹 Cleaning up ${this.formatBytes(bytesToFree)} from caches`);

    const cacheNames = await caches.keys();

    // Ordenar caches por idade (heurística baseada no nome)
    const sortedCaches = cacheNames
      .filter((name) => !name.includes('app-shell')) // Preservar app shell
      .sort();

    let freedBytes = 0;

    for (const cacheName of sortedCaches) {
      if (freedBytes >= bytesToFree) break;

      const size = await this.getCacheSize(cacheName);
      await caches.delete(cacheName);
      freedBytes += size;

      console.log(`🗑️ Deleted cache: ${cacheName} (${this.formatBytes(size)})`);
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

const cacheOptimizer = new CacheOptimizer();

// Executar limpeza de cache periodicamente
setInterval(() => {
  cacheOptimizer.manageCacheSize();
}, 30 * 60 * 1000); // A cada 30 minutos
```

---

## 8. 🔒 Segurança e Boas Práticas

### 🛡️ Implementação de Segurança

```javascript
// Classe para segurança em Service Workers
class ServiceWorkerSecurity {
  constructor() {
    this.allowedOrigins = [
      self.location.origin,
      'https://api.example.com',
      'https://cdn.example.com',
    ];

    this.secureHeaders = {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
  }

  validateRequest(request) {
    const url = new URL(request.url);

    // 1. Verificar origem
    if (!this.isOriginAllowed(url.origin)) {
      console.warn(`🚫 Blocked request to unauthorized origin: ${url.origin}`);
      return false;
    }

    // 2. Verificar protocolo
    if (url.protocol !== 'https:' && url.hostname !== 'localhost') {
      console.warn(`🚫 Blocked insecure request: ${url.href}`);
      return false;
    }

    // 3. Verificar headers suspeitos
    if (this.hasSuspiciousHeaders(request)) {
      console.warn(`🚫 Blocked request with suspicious headers`);
      return false;
    }

    return true;
  }

  isOriginAllowed(origin) {
    return (
      this.allowedOrigins.includes(origin) || origin === self.location.origin
    );
  }

  hasSuspiciousHeaders(request) {
    const suspiciousHeaders = [
      'x-forwarded-for',
      'x-real-ip',
      'x-original-url',
    ];

    for (const header of suspiciousHeaders) {
      if (request.headers.has(header)) {
        return true;
      }
    }

    return false;
  }

  sanitizeResponse(response) {
    // Adicionar headers de segurança
    const headers = new Headers(response.headers);

    for (const [name, value] of Object.entries(this.secureHeaders)) {
      headers.set(name, value);
    }

    // Remover headers sensíveis
    headers.delete('server');
    headers.delete('x-powered-by');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  async validateCacheIntegrity(cacheName) {
    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();

      for (const request of requests) {
        const response = await cache.match(request);

        // Verificar se response ainda é válida
        if (!this.validateCachedResponse(request, response)) {
          console.warn(`🚫 Invalid cached response found: ${request.url}`);
          await cache.delete(request);
        }
      }
    } catch (error) {
      console.error('Cache integrity check failed:', error);
    }
  }

  validateCachedResponse(request, response) {
    // Verificar se o response não foi corrompido
    if (!response || response.status === 0) {
      return false;
    }

    // Verificar se ainda é de origem confiável
    const url = new URL(request.url);
    if (!this.isOriginAllowed(url.origin)) {
      return false;
    }

    return true;
  }

  async encryptSensitiveData(data, key) {
    try {
      const encoded = new TextEncoder().encode(data);
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      );

      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encoded
      );

      return {
        encrypted: new Uint8Array(encrypted),
        iv,
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  async decryptSensitiveData(encryptedData, iv, key) {
    try {
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );

      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encryptedData
      );

      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }
}

const swSecurity = new ServiceWorkerSecurity();

// Integrar validação de segurança no fetch handler
self.addEventListener('fetch', (event) => {
  // Validar request
  if (!swSecurity.validateRequest(event.request)) {
    event.respondWith(
      new Response('Forbidden', {
        status: 403,
        statusText: 'Forbidden',
      })
    );
    return;
  }

  // Processar request normalmente e sanitizar response
  event.respondWith(
    fetch(event.request)
      .then((response) => swSecurity.sanitizeResponse(response))
      .catch((error) => {
        console.error('Fetch error:', error);
        return new Response('Network Error', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      })
  );
});

// Verificar integridade dos caches periodicamente
setInterval(() => {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      swSecurity.validateCacheIntegrity(cacheName);
    });
  });
}, 60 * 60 * 1000); // A cada hora
```

### ✅ Checklist de Boas Práticas

```javascript
// Checklist de boas práticas para Service Workers
const SERVICE_WORKER_BEST_PRACTICES = {
  // 1. Registro e Lifecycle
  registration: {
    '✅ Registrar apenas uma vez': true,
    '✅ Aguardar DOM carregado antes de registrar': true,
    '✅ Tratar erros de registro': true,
    '✅ Verificar suporte antes de usar': true,
    '✅ Usar scope apropriado': true,
  },

  // 2. Cache Strategy
  caching: {
    '✅ Usar estratégias adequadas por tipo de recurso': true,
    '✅ Implementar fallbacks offline': true,
    '✅ Limitar tamanho dos caches': true,
    '✅ Versionar caches adequadamente': true,
    '✅ Limpar caches antigos': true,
  },

  // 3. Performance
  performance: {
    '✅ Minimizar trabalho no thread principal': true,
    '✅ Usar cache primeiro para recursos estáticos': true,
    '✅ Implementar timeouts para requests': true,
    '✅ Comprimir dados quando possível': true,
    '✅ Monitorar métricas de performance': true,
  },

  // 4. Segurança
  security: {
    '✅ Validar origens de requests': true,
    '✅ Sanitizar responses': true,
    '✅ Usar HTTPS obrigatoriamente': true,
    '✅ Implementar CSP headers': true,
    '✅ Verificar integridade dos caches': true,
  },

  // 5. User Experience
  userExperience: {
    '✅ Mostrar indicadores de status offline/online': true,
    '✅ Implementar páginas de fallback': true,
    '✅ Notificar usuário sobre atualizações': true,
    '✅ Fornecer controles para gerenciar cache': true,
    '✅ Manter funcionalidade básica offline': true,
  },

  // 6. Debug e Maintenance
  debug: {
    '✅ Implementar logging adequado': true,
    '✅ Usar ferramentas de debug': true,
    '✅ Monitorar erros em produção': true,
    '✅ Implementar métricas e analytics': true,
    '✅ Ter estratégia de rollback': true,
  },
};

// Função para validar implementação
function validateServiceWorkerImplementation() {
  const results = {};

  for (const [category, practices] of Object.entries(
    SERVICE_WORKER_BEST_PRACTICES
  )) {
    results[category] = {
      total: Object.keys(practices).length,
      implemented: Object.values(practices).filter(Boolean).length,
    };
  }

  console.log('📋 Service Worker Best Practices Check:', results);
  return results;
}

// Executar validação
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  setTimeout(validateServiceWorkerImplementation, 5000);
}
```

---

## 🚀 Implementação Prática

**Para começar com Service Workers em seu projeto:**

1. **Planejamento**

   - Definir estratégias de cache por tipo de recurso
   - Identificar funcionalidades críticas para modo offline
   - Planejar fluxo de notificações push

2. **Implementação Básica**

   - Registrar Service Worker
   - Implementar cache de app shell
   - Adicionar fallbacks offline

3. **Funcionalidades Avançadas**

   - Background sync para dados
   - Push notifications
   - Atualizações automáticas

4. **Otimização**
   - Monitorar performance
   - Implementar limpeza de cache
   - Otimizar estratégias baseado em métricas

### 💡 Dicas para Produção

- **Sempre use HTTPS** - Service Workers só funcionam em contextos seguros
- **Teste offline rigorosamente** - Use DevTools para simular condições offline
- **Monitore métricas** - Cache hit ratio, performance, erros
- **Tenha estratégia de rollback** - Para casos de Service Worker problemático
- **Considere progressive enhancement** - App deve funcionar sem Service Worker

# 📹 WebRTC - Comunicação Peer-to-Peer em Tempo Real

Agora vamos mergulhar profundamente no **WebRTC (Web Real-Time Communication)**, uma das tecnologias mais poderosas e revolucionárias da web moderna. Esta API permite comunicação **direta entre navegadores**, sem necessidade de servidores intermediários para transmissão de dados.

## 🔍 O que é WebRTC?

WebRTC é um **conjunto de APIs e protocolos** que permite:

- **Comunicação de áudio e vídeo em tempo real**
- **Compartilhamento de dados peer-to-peer**
- **Transmissão de arquivos diretamente entre usuários**
- **Jogos multiplayer em tempo real**
- **Colaboração em tempo real (quadros brancos, documentos)**

### 🏗️ Arquitetura do WebRTC

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  Signaling  │◀────│   Browser   │
│     A       │     │   Server    │     │     B       │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                        │
       └────────── Direct P2P Connection ──────┘
```

---

## 🛠️ Componentes Principais do WebRTC

### 1. **MediaStream API**

Captura áudio e vídeo do usuário:

```javascript
// Configurações de captura
const constraints = {
  video: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
    frameRate: { min: 15, ideal: 30, max: 60 },
    facingMode: 'user', // "user" (frontal) ou "environment" (traseira)
    aspectRatio: 16 / 9,
  },
  audio: {
    echoCancellation: true, // Cancelamento de eco
    noiseSuppression: true, // Supressão de ruído
    autoGainControl: true, // Controle automático de ganho
    sampleRate: 44100, // Taxa de amostragem
    channelCount: 2, // Estéreo
  },
};

// Capturar mídia
try {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  // Analisar as tracks disponíveis
  stream.getTracks().forEach((track) => {
    console.log(`Track: ${track.kind}`);
    console.log(`Label: ${track.label}`);
    console.log(`Settings:`, track.getSettings());
    console.log(`Capabilities:`, track.getCapabilities());
  });

  // Exibir no elemento video
  const videoElement = document.getElementById('localVideo');
  videoElement.srcObject = stream;
} catch (error) {
  console.error('Erro ao acessar mídia:', error);

  // Tratamento específico de erros
  if (error.name === 'NotAllowedError') {
    alert('Permissão negada para acessar câmera/microfone');
  } else if (error.name === 'NotFoundError') {
    alert('Câmera ou microfone não encontrados');
  } else if (error.name === 'NotReadableError') {
    alert('Dispositivo de mídia em uso por outra aplicação');
  }
}
```

### 2. **RTCPeerConnection**

Gerencia a conexão peer-to-peer:

```javascript
// Configuração de servidores ICE
const configuration = {
  iceServers: [
    // Servidores STUN públicos do Google
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },

    // Exemplo de servidor TURN (requer autenticação)
    {
      urls: 'turn:turn.example.com:3478',
      username: 'user',
      credential: 'password',
    },
  ],

  // Configurações adicionais
  iceCandidatePoolSize: 10, // Pool de candidates
  bundlePolicy: 'balanced', // Como agrupar media
  rtcpMuxPolicy: 'require', // Multiplexação RTCP

  // Configurações de certificado
  certificates: [], // Auto-gerado se vazio
};

// Criar peer connection
const peerConnection = new RTCPeerConnection(configuration);

// Estados da conexão
peerConnection.onconnectionstatechange = () => {
  const state = peerConnection.connectionState;
  console.log('Connection State:', state);

  switch (state) {
    case 'new':
      console.log('🆕 Nova conexão criada');
      break;
    case 'connecting':
      console.log('🔄 Conectando...');
      break;
    case 'connected':
      console.log('✅ Conectado com sucesso!');
      startDataTransmission();
      break;
    case 'disconnected':
      console.log('⚠️ Desconectado temporariamente');
      break;
    case 'failed':
      console.log('❌ Conexão falhou');
      handleConnectionFailure();
      break;
    case 'closed':
      console.log('🔒 Conexão fechada');
      break;
  }
};

// Estados ICE
peerConnection.oniceconnectionstatechange = () => {
  const iceState = peerConnection.iceConnectionState;
  console.log('ICE State:', iceState);

  if (iceState === 'failed') {
    // Tentar reiniciar ICE
    peerConnection.restartIce();
  }
};

// Gathering de ICE candidates
peerConnection.onicegatheringstatechange = () => {
  const gatheringState = peerConnection.iceGatheringState;
  console.log('ICE Gathering State:', gatheringState);

  if (gatheringState === 'complete') {
    console.log('🎯 ICE gathering completo');
  }
};
```

### 3. **Processo de Sinalização (Signaling)**

```javascript
class WebRTCSignaling {
  constructor(signalingServerUrl) {
    this.ws = new WebSocket(signalingServerUrl);
    this.peerConnection = null;
    this.localStream = null;

    this.setupWebSocket();
  }

  setupWebSocket() {
    this.ws.onopen = () => {
      console.log('🔗 Conectado ao servidor de sinalização');
    };

    this.ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      await this.handleSignalingMessage(message);
    };

    this.ws.onerror = (error) => {
      console.error('❌ Erro no WebSocket:', error);
    };

    this.ws.onclose = () => {
      console.log('🔌 Conexão WebSocket fechada');
    };
  }

  async handleSignalingMessage(message) {
    switch (message.type) {
      case 'offer':
        await this.handleOffer(message.offer, message.from);
        break;

      case 'answer':
        await this.handleAnswer(message.answer);
        break;

      case 'ice-candidate':
        await this.handleIceCandidate(message.candidate);
        break;

      case 'user-joined':
        console.log(`👤 Usuário entrou: ${message.userId}`);
        break;

      case 'user-left':
        console.log(`👋 Usuário saiu: ${message.userId}`);
        this.handleUserLeft(message.userId);
        break;
    }
  }

  async createOffer(remoteUserId) {
    this.peerConnection = this.createPeerConnection();

    // Adicionar stream local
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });
    }

    try {
      // Criar oferta
      const offer = await this.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        voiceActivityDetection: true,
        iceRestart: false,
      });

      // Definir descrição local
      await this.peerConnection.setLocalDescription(offer);

      // Enviar oferta via signaling
      this.sendSignalingMessage({
        type: 'offer',
        offer: offer,
        to: remoteUserId,
      });

      console.log('📞 Oferta criada e enviada');
    } catch (error) {
      console.error('❌ Erro ao criar oferta:', error);
    }
  }

  async handleOffer(offer, fromUserId) {
    this.peerConnection = this.createPeerConnection();

    try {
      // Definir descrição remota
      await this.peerConnection.setRemoteDescription(offer);

      // Adicionar stream local
      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => {
          this.peerConnection.addTrack(track, this.localStream);
        });
      }

      // Criar resposta
      const answer = await this.peerConnection.createAnswer({
        voiceActivityDetection: true,
      });

      // Definir descrição local
      await this.peerConnection.setLocalDescription(answer);

      // Enviar resposta
      this.sendSignalingMessage({
        type: 'answer',
        answer: answer,
        to: fromUserId,
      });

      console.log('📱 Resposta criada e enviada');
    } catch (error) {
      console.error('❌ Erro ao processar oferta:', error);
    }
  }

  async handleAnswer(answer) {
    try {
      await this.peerConnection.setRemoteDescription(answer);
      console.log('✅ Resposta recebida e processada');
    } catch (error) {
      console.error('❌ Erro ao processar resposta:', error);
    }
  }

  async handleIceCandidate(candidate) {
    try {
      await this.peerConnection.addIceCandidate(candidate);
      console.log('🧊 ICE candidate adicionado');
    } catch (error) {
      console.error('❌ Erro ao adicionar ICE candidate:', error);
    }
  }

  createPeerConnection() {
    const pc = new RTCPeerConnection(configuration);

    // ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalingMessage({
          type: 'ice-candidate',
          candidate: event.candidate,
        });
      }
    };

    // Stream remoto recebido
    pc.ontrack = (event) => {
      console.log('📺 Stream remoto recebido');
      const remoteVideo = document.getElementById('remoteVideo');
      remoteVideo.srcObject = event.streams[0];
    };

    return pc;
  }

  sendSignalingMessage(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('❌ WebSocket não está conectado');
    }
  }
}
```

---

## 🔄 Data Channels - Transmissão de Dados P2P

```javascript
class WebRTCDataChannel {
  constructor(peerConnection) {
    this.peerConnection = peerConnection;
    this.dataChannels = new Map();
    this.setupDataChannelHandlers();
  }

  // Criar data channel
  createDataChannel(label, options = {}) {
    const defaultOptions = {
      ordered: true, // Entrega ordenada
      maxRetransmits: 3, // Máximo de retransmissões
      maxPacketLifeTime: 3000, // Tempo limite (ms)
      protocol: '', // Subprotocolo
      negotiated: false, // Negociação automática
      id: null, // ID específico
    };

    const channelOptions = { ...defaultOptions, ...options };

    const dataChannel = this.peerConnection.createDataChannel(
      label,
      channelOptions
    );

    this.setupDataChannel(dataChannel, label);
    this.dataChannels.set(label, dataChannel);

    return dataChannel;
  }

  setupDataChannelHandlers() {
    // Receber data channels do peer remoto
    this.peerConnection.ondatachannel = (event) => {
      const channel = event.channel;
      const label = channel.label;

      console.log(`📨 Data channel recebido: ${label}`);

      this.setupDataChannel(channel, label);
      this.dataChannels.set(label, channel);
    };
  }

  setupDataChannel(channel, label) {
    channel.onopen = () => {
      console.log(`✅ Data channel '${label}' aberto`);
      console.log(`Configurações:`, {
        ordered: channel.ordered,
        maxRetransmits: channel.maxRetransmits,
        maxPacketLifeTime: channel.maxPacketLifeTime,
        protocol: channel.protocol,
        id: channel.id,
      });
    };

    channel.onclose = () => {
      console.log(`🔒 Data channel '${label}' fechado`);
      this.dataChannels.delete(label);
    };

    channel.onmessage = (event) => {
      this.handleDataChannelMessage(label, event.data);
    };

    channel.onerror = (error) => {
      console.error(`❌ Erro no data channel '${label}':`, error);
    };

    // Monitor de buffer
    this.monitorBuffer(channel, label);
  }

  handleDataChannelMessage(channelLabel, data) {
    try {
      // Tentar parsear como JSON
      const message = JSON.parse(data);

      switch (message.type) {
        case 'text':
          this.handleTextMessage(channelLabel, message);
          break;

        case 'file':
          this.handleFileMessage(channelLabel, message);
          break;

        case 'binary':
          this.handleBinaryMessage(channelLabel, message);
          break;

        case 'game-event':
          this.handleGameEvent(channelLabel, message);
          break;

        default:
          console.log(`📩 Mensagem recebida em '${channelLabel}':`, message);
      }
    } catch (error) {
      // Dados binários ou texto simples
      console.log(`📩 Dados recebidos em '${channelLabel}':`, data);
    }
  }

  // Enviar mensagem de texto
  sendTextMessage(channelLabel, text) {
    const channel = this.dataChannels.get(channelLabel);

    if (!channel || channel.readyState !== 'open') {
      console.error(`❌ Canal '${channelLabel}' não disponível`);
      return false;
    }

    const message = {
      type: 'text',
      content: text,
      timestamp: Date.now(),
      sender: 'local',
    };

    try {
      channel.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error(`❌ Erro ao enviar mensagem:`, error);
      return false;
    }
  }

  // Enviar arquivo
  async sendFile(channelLabel, file) {
    const channel = this.dataChannels.get(channelLabel);

    if (!channel || channel.readyState !== 'open') {
      console.error(`❌ Canal '${channelLabel}' não disponível`);
      return false;
    }

    const chunkSize = 16384; // 16KB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);

    // Enviar metadados do arquivo
    const fileInfo = {
      type: 'file-start',
      name: file.name,
      size: file.size,
      mimeType: file.type,
      totalChunks: totalChunks,
      chunkSize: chunkSize,
      id: Date.now(),
    };

    channel.send(JSON.stringify(fileInfo));

    // Enviar chunks do arquivo
    let chunkIndex = 0;
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        const chunk = event.target.result;

        const chunkMessage = {
          type: 'file-chunk',
          id: fileInfo.id,
          index: chunkIndex,
          data: Array.from(new Uint8Array(chunk)), // Converter para array
          isLast: chunkIndex === totalChunks - 1,
        };

        try {
          channel.send(JSON.stringify(chunkMessage));

          if (chunkIndex < totalChunks - 1) {
            chunkIndex++;
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            reader.readAsArrayBuffer(file.slice(start, end));
          } else {
            // Arquivo enviado completamente
            console.log(`✅ Arquivo '${file.name}' enviado`);
            resolve(true);
          }
        } catch (error) {
          console.error(`❌ Erro ao enviar chunk:`, error);
          reject(error);
        }
      };

      reader.onerror = reject;

      // Começar a ler o primeiro chunk
      const start = 0;
      const end = Math.min(chunkSize, file.size);
      reader.readAsArrayBuffer(file.slice(start, end));
    });
  }

  // Gerenciar recebimento de arquivo
  handleFileMessage(channelLabel, message) {
    if (message.type === 'file-start') {
      this.initFileTransfer(message);
    } else if (message.type === 'file-chunk') {
      this.handleFileChunk(message);
    }
  }

  initFileTransfer(fileInfo) {
    this.fileTransfers = this.fileTransfers || new Map();

    this.fileTransfers.set(fileInfo.id, {
      name: fileInfo.name,
      size: fileInfo.size,
      mimeType: fileInfo.mimeType,
      totalChunks: fileInfo.totalChunks,
      chunks: new Array(fileInfo.totalChunks),
      receivedChunks: 0,
    });

    console.log(
      `📥 Iniciando recebimento: ${fileInfo.name} (${fileInfo.size} bytes)`
    );
  }

  handleFileChunk(chunkMessage) {
    const transfer = this.fileTransfers.get(chunkMessage.id);
    if (!transfer) return;

    // Armazenar chunk
    transfer.chunks[chunkMessage.index] = new Uint8Array(chunkMessage.data);
    transfer.receivedChunks++;

    console.log(
      `📦 Chunk ${chunkMessage.index + 1}/${transfer.totalChunks} recebido`
    );

    // Verificar se recebeu todos os chunks
    if (transfer.receivedChunks === transfer.totalChunks) {
      this.completeFileTransfer(chunkMessage.id, transfer);
    }
  }

  completeFileTransfer(transferId, transfer) {
    // Combinar todos os chunks
    const totalSize = transfer.chunks.reduce(
      (size, chunk) => size + chunk.length,
      0
    );
    const completeFile = new Uint8Array(totalSize);

    let offset = 0;
    transfer.chunks.forEach((chunk) => {
      completeFile.set(chunk, offset);
      offset += chunk.length;
    });

    // Criar blob e URL
    const blob = new Blob([completeFile], { type: transfer.mimeType });
    const url = URL.createObjectURL(blob);

    // Auto-download
    const link = document.createElement('a');
    link.href = url;
    link.download = transfer.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
    this.fileTransfers.delete(transferId);

    console.log(`✅ Arquivo '${transfer.name}' recebido com sucesso!`);
  }

  // Monitor de buffer do canal
  monitorBuffer(channel, label) {
    const checkBuffer = () => {
      if (channel.readyState === 'open') {
        const bufferedAmount = channel.bufferedAmount;
        const bufferedAmountLowThreshold = channel.bufferedAmountLowThreshold;

        if (bufferedAmount > bufferedAmountLowThreshold) {
          console.log(
            `⚠️ Buffer alto no canal '${label}': ${bufferedAmount} bytes`
          );
        }

        setTimeout(checkBuffer, 1000);
      }
    };

    checkBuffer();
  }

  // Obter estatísticas do canal
  getChannelStats(channelLabel) {
    const channel = this.dataChannels.get(channelLabel);
    if (!channel) return null;

    return {
      label: channel.label,
      readyState: channel.readyState,
      bufferedAmount: channel.bufferedAmount,
      bufferedAmountLowThreshold: channel.bufferedAmountLowThreshold,
      maxRetransmits: channel.maxRetransmits,
      maxPacketLifeTime: channel.maxPacketLifeTime,
      ordered: channel.ordered,
      protocol: channel.protocol,
      id: channel.id,
    };
  }
}
```

---

## 🎮 Aplicações Práticas do WebRTC

### 1. **Sistema de Videochamada Avançado**

```javascript
class AdvancedVideoCall {
  constructor() {
    this.localStream = null;
    this.remoteStreams = new Map();
    this.peerConnections = new Map();
    this.isScreenSharing = false;
    this.originalVideoTrack = null;

    this.initializeMedia();
  }

  async initializeMedia() {
    try {
      // Capturar mídia com qualidade adaptativa
      const constraints = this.getOptimalConstraints();
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Configurar controles de mídia
      this.setupMediaControls();

      // Monitorar qualidade da conexão
      this.startQualityMonitoring();
    } catch (error) {
      console.error('Erro ao inicializar mídia:', error);
      this.handleMediaError(error);
    }
  }

  getOptimalConstraints() {
    // Detectar capacidades do dispositivo
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const isSlowConnection =
      connection &&
      connection.effectiveType &&
      ['slow-2g', '2g'].includes(connection.effectiveType);

    if (isMobile || isSlowConnection) {
      // Configuração para dispositivos móveis ou conexões lentas
      return {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 15, max: 24 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      };
    } else {
      // Configuração para desktop com boa conexão
      return {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
        },
      };
    }
  }

  async shareScreen() {
    try {
      if (this.isScreenSharing) {
        await this.stopScreenShare();
        return;
      }

      // Capturar tela
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          mediaSource: 'screen',
          width: { max: 1920 },
          height: { max: 1080 },
          frameRate: { max: 30 },
        },
        audio: true, // Capturar áudio do sistema
      });

      // Salvar track de vídeo original
      const videoTrack = this.localStream.getVideoTracks()[0];
      this.originalVideoTrack = videoTrack;

      // Substituir track de vídeo em todas as conexões
      const screenVideoTrack = screenStream.getVideoTracks()[0];

      for (const [peerId, pc] of this.peerConnections) {
        const sender = pc
          .getSenders()
          .find((s) => s.track && s.track.kind === 'video');

        if (sender) {
          await sender.replaceTrack(screenVideoTrack);
        }
      }

      // Atualizar vídeo local
      const localVideo = document.getElementById('localVideo');
      localVideo.srcObject = screenStream;

      this.isScreenSharing = true;

      // Listener para quando parar de compartilhar
      screenVideoTrack.onended = () => {
        this.stopScreenShare();
      };

      console.log('🖥️ Compartilhamento de tela iniciado');
    } catch (error) {
      console.error('Erro ao compartilhar tela:', error);
    }
  }

  async stopScreenShare() {
    if (!this.isScreenSharing || !this.originalVideoTrack) return;

    try {
      // Restaurar track de vídeo original
      for (const [peerId, pc] of this.peerConnections) {
        const sender = pc
          .getSenders()
          .find((s) => s.track && s.track.kind === 'video');

        if (sender) {
          await sender.replaceTrack(this.originalVideoTrack);
        }
      }

      // Restaurar vídeo local
      const localVideo = document.getElementById('localVideo');
      localVideo.srcObject = this.localStream;

      this.isScreenSharing = false;
      this.originalVideoTrack = null;

      console.log('📹 Compartilhamento de tela parado');
    } catch (error) {
      console.error('Erro ao parar compartilhamento:', error);
    }
  }

  // Controle adaptativo de qualidade
  async adaptVideoQuality(connectionQuality) {
    const videoTrack = this.localStream.getVideoTracks()[0];
    if (!videoTrack) return;

    let constraints;

    switch (connectionQuality) {
      case 'excellent':
        constraints = {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        };
        break;

      case 'good':
        constraints = {
          width: { ideal: 960 },
          height: { ideal: 540 },
          frameRate: { ideal: 24 },
        };
        break;

      case 'poor':
        constraints = {
          width: { ideal: 640 },
          height: { ideal: 360 },
          frameRate: { ideal: 15 },
        };
        break;

      case 'very-poor':
        constraints = {
          width: { ideal: 320 },
          height: { ideal: 240 },
          frameRate: { ideal: 10 },
        };
        break;
    }

    try {
      await videoTrack.applyConstraints(constraints);
      console.log(`📊 Qualidade adaptada para: ${connectionQuality}`);
    } catch (error) {
      console.error('Erro ao adaptar qualidade:', error);
    }
  }

  startQualityMonitoring() {
    setInterval(async () => {
      for (const [peerId, pc] of this.peerConnections) {
        const stats = await pc.getStats();
        const quality = this.analyzeConnectionQuality(stats);

        if (quality !== this.lastQuality) {
          await this.adaptVideoQuality(quality);
          this.lastQuality = quality;
        }
      }
    }, 5000);
  }

  analyzeConnectionQuality(stats) {
    let rtt = 0;
    let packetLoss = 0;
    let bandwidth = 0;

    stats.forEach((report) => {
      if (report.type === 'candidate-pair' && report.state === 'succeeded') {
        rtt = report.currentRoundTripTime * 1000; // ms
      }

      if (report.type === 'inbound-rtp' && report.kind === 'video') {
        const packetsLost = report.packetsLost || 0;
        const packetsReceived = report.packetsReceived || 0;
        packetLoss = (packetsLost / (packetsLost + packetsReceived)) * 100;
      }

      if (report.type === 'outbound-rtp' && report.kind === 'video') {
        bandwidth = report.totalPacketSendDelay || 0;
      }
    });

    // Determinar qualidade baseada nas métricas
    if (rtt < 50 && packetLoss < 1) {
      return 'excellent';
    } else if (rtt < 100 && packetLoss < 3) {
      return 'good';
    } else if (rtt < 200 && packetLoss < 5) {
      return 'poor';
    } else {
      return 'very-poor';
    }
  }
}
```

### 2. **Jogo Multiplayer em Tempo Real**

```javascript
class MultiplayerGame {
  constructor() {
    this.gameState = {
      players: new Map(),
      objects: new Map(),
      lastUpdate: Date.now(),
    };

    this.localPlayer = null;
    this.dataChannels = new Map();
    this.gameLoop = null;

    this.initGame();
  }

  initGame() {
    // Configurar canvas do jogo
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Criar jogador local
    this.localPlayer = {
      id: this.generatePlayerId(),
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      color: this.getRandomColor(),
      score: 0,
      velocity: { x: 0, y: 0 },
    };

    this.gameState.players.set(this.localPlayer.id, this.localPlayer);

    // Configurar controles
    this.setupGameControls();

    // Iniciar loop do jogo
    this.startGameLoop();
  }

  setupGameControls() {
    const keys = {};

    document.addEventListener('keydown', (e) => {
      keys[e.code] = true;
      e.preventDefault();
    });

    document.addEventListener('keyup', (e) => {
      keys[e.code] = false;
      e.preventDefault();
    });

    // Atualizar movimento baseado nas teclas
    this.updateMovement = () => {
      const speed = 5;

      if (keys['ArrowUp'] || keys['KeyW']) {
        this.localPlayer.velocity.y = -speed;
      } else if (keys['ArrowDown'] || keys['KeyS']) {
        this.localPlayer.velocity.y = speed;
      } else {
        this.localPlayer.velocity.y *= 0.9; // Fricção
      }

      if (keys['ArrowLeft'] || keys['KeyA']) {
        this.localPlayer.velocity.x = -speed;
      } else if (keys['ArrowRight'] || keys['KeyD']) {
        this.localPlayer.velocity.x = speed;
      } else {
        this.localPlayer.velocity.x *= 0.9; // Fricção
      }

      // Aplicar movimento
      this.localPlayer.x += this.localPlayer.velocity.x;
      this.localPlayer.y += this.localPlayer.velocity.y;

      // Manter dentro da tela
      this.localPlayer.x = Math.max(
        0,
        Math.min(this.canvas.width, this.localPlayer.x)
      );
      this.localPlayer.y = Math.max(
        0,
        Math.min(this.canvas.height, this.localPlayer.y)
      );
    };
  }

  startGameLoop() {
    this.gameLoop = setInterval(() => {
      this.updateGame();
      this.renderGame();
      this.syncGameState();
    }, 1000 / 60); // 60 FPS
  }

  updateGame() {
    const now = Date.now();
    const deltaTime = now - this.gameState.lastUpdate;

    // Atualizar movimento do jogador local
    this.updateMovement();

    // Atualizar outros jogadores (interpolação)
    for (const [playerId, player] of this.gameState.players) {
      if (playerId !== this.localPlayer.id && player.lastUpdate) {
        const timeSinceUpdate = now - player.lastUpdate;

        // Interpolação suave
        if (player.targetPosition) {
          const lerpFactor = Math.min(timeSinceUpdate / 100, 1); // 100ms para interpolação

          player.x += (player.targetPosition.x - player.x) * lerpFactor;
          player.y += (player.targetPosition.y - player.y) * lerpFactor;

          if (lerpFactor >= 1) {
            player.targetPosition = null;
          }
        }
      }
    }

    // Verificar colisões
    this.checkCollisions();

    this.gameState.lastUpdate = now;
  }

  renderGame() {
    // Limpar canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Desenhar jogadores
    for (const [playerId, player] of this.gameState.players) {
      this.ctx.fillStyle = player.color;
      this.ctx.beginPath();
      this.ctx.arc(player.x, player.y, 20, 0, 2 * Math.PI);
      this.ctx.fill();

      // Desenhar nome e score
      this.ctx.fillStyle = 'white';
      this.ctx.font = '14px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`${player.id}`, player.x, player.y - 30);
      this.ctx.fillText(`Score: ${player.score}`, player.x, player.y + 40);
    }

    // Desenhar objetos do jogo
    for (const [objectId, object] of this.gameState.objects) {
      this.ctx.fillStyle = object.color;
      this.ctx.fillRect(object.x - 5, object.y - 5, 10, 10);
    }
  }

  syncGameState() {
    // Enviar estado do jogador local para todos os peers
    const playerUpdate = {
      type: 'player-update',
      playerId: this.localPlayer.id,
      position: {
        x: this.localPlayer.x,
        y: this.localPlayer.y,
      },
      velocity: this.localPlayer.velocity,
      score: this.localPlayer.score,
      timestamp: Date.now(),
    };

    this.broadcastToAllPeers(playerUpdate);
  }

  handleGameMessage(message, fromPeerId) {
    switch (message.type) {
      case 'player-update':
        this.handlePlayerUpdate(message);
        break;

      case 'game-event':
        this.handleGameEvent(message);
        break;

      case 'object-spawn':
        this.handleObjectSpawn(message);
        break;

      case 'collision':
        this.handleCollision(message);
        break;
    }
  }

  handlePlayerUpdate(message) {
    const { playerId, position, velocity, score, timestamp } = message;

    if (playerId === this.localPlayer.id) return; // Ignorar próprias atualizações

    let player = this.gameState.players.get(playerId);

    if (!player) {
      // Novo jogador
      player = {
        id: playerId,
        x: position.x,
        y: position.y,
        color: this.getRandomColor(),
        score: score,
        velocity: velocity,
        lastUpdate: timestamp,
      };

      this.gameState.players.set(playerId, player);
      console.log(`🎮 Novo jogador: ${playerId}`);
    } else {
      // Atualizar jogador existente
      player.targetPosition = position;
      player.velocity = velocity;
      player.score = score;
      player.lastUpdate = timestamp;
    }
  }

  checkCollisions() {
    // Verificar colisões entre jogadores e objetos
    for (const [objectId, object] of this.gameState.objects) {
      const distance = Math.sqrt(
        Math.pow(this.localPlayer.x - object.x, 2) +
          Math.pow(this.localPlayer.y - object.y, 2)
      );

      if (distance < 25) {
        // Raio do jogador + objeto
        // Colisão detectada
        this.localPlayer.score += 10;
        this.gameState.objects.delete(objectId);

        // Notificar outros jogadores
        this.broadcastToAllPeers({
          type: 'collision',
          playerId: this.localPlayer.id,
          objectId: objectId,
          newScore: this.localPlayer.score,
          timestamp: Date.now(),
        });
      }
    }
  }

  spawnRandomObject() {
    const objectId = `obj_${Date.now()}_${Math.random()}`;
    const object = {
      id: objectId,
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      color: '#FFD700', // Dourado
    };

    this.gameState.objects.set(objectId, object);

    // Sincronizar com outros jogadores
    this.broadcastToAllPeers({
      type: 'object-spawn',
      object: object,
      timestamp: Date.now(),
    });
  }

  broadcastToAllPeers(message) {
    for (const [peerId, dataChannel] of this.dataChannels) {
      if (dataChannel.readyState === 'open') {
        try {
          dataChannel.send(JSON.stringify(message));
        } catch (error) {
          console.error(`Erro ao enviar para ${peerId}:`, error);
        }
      }
    }
  }

  // Utilities
  generatePlayerId() {
    return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getRandomColor() {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

// Inicializar jogo quando conectar com peer
const game = new MultiplayerGame();

// Spawn objetos periodicamente (apenas um jogador deve fazer isso)
setInterval(() => {
  if (game.gameState.players.size > 0) {
    game.spawnRandomObject();
  }
}, 3000);
```

---

## 🔧 Configurações Avançadas e Otimizações

### 1. **Configuração de Codec e Bitrate**

```javascript
class WebRTCOptimizer {
  static async optimizePeerConnection(peerConnection, mediaType = 'video') {
    // Obter transceivers
    const transceivers = peerConnection.getTransceivers();

    for (const transceiver of transceivers) {
      if (transceiver.sender && transceiver.sender.track) {
        const track = transceiver.sender.track;

        if (track.kind === mediaType) {
          // Configurar parâmetros de encoding
          const params = transceiver.sender.getParameters();

          if (!params.encodings) {
            params.encodings = [{}];
          }

          // Configurar bitrate baseado no tipo de mídia
          if (mediaType === 'video') {
            params.encodings[0].maxBitrate = 1000000; // 1 Mbps
            params.encodings[0].maxFramerate = 30;

            // Configurar múltiplas camadas (simulcast)
            params.encodings = [
              { rid: 'low', maxBitrate: 200000, maxFramerate: 15 },
              { rid: 'medium', maxBitrate: 500000, maxFramerate: 24 },
              { rid: 'high', maxBitrate: 1000000, maxFramerate: 30 },
            ];
          } else if (mediaType === 'audio') {
            params.encodings[0].maxBitrate = 64000; // 64 kbps
          }

          // Aplicar parâmetros
          await transceiver.sender.setParameters(params);

          console.log(`📊 Parâmetros otimizados para ${mediaType}:`, params);
        }
      }
    }
  }

  static async setPreferredCodec(peerConnection, mimeType) {
    const transceivers = peerConnection.getTransceivers();

    for (const transceiver of transceivers) {
      const capabilities = RTCRtpSender.getCapabilities(
        transceiver.sender.track?.kind
      );

      if (capabilities && capabilities.codecs) {
        // Filtrar codecs pelo tipo MIME
        const preferredCodecs = capabilities.codecs.filter(
          (codec) => codec.mimeType.toLowerCase() === mimeType.toLowerCase()
        );

        if (preferredCodecs.length > 0) {
          // Colocar codec preferido no início
          const otherCodecs = capabilities.codecs.filter(
            (codec) => codec.mimeType.toLowerCase() !== mimeType.toLowerCase()
          );

          capabilities.codecs = [...preferredCodecs, ...otherCodecs];

          // Aplicar capabilities
          await transceiver.setCodecPreferences(capabilities.codecs);

          console.log(`🎵 Codec preferido definido: ${mimeType}`);
        }
      }
    }
  }

  static monitorConnectionQuality(peerConnection, callback) {
    const monitor = setInterval(async () => {
      try {
        const stats = await peerConnection.getStats();
        const report = this.parseConnectionStats(stats);
        callback(report);
      } catch (error) {
        console.error('Erro ao obter estatísticas:', error);
      }
    }, 1000);

    return monitor;
  }

  static parseConnectionStats(stats) {
    const report = {
      timestamp: Date.now(),
      video: { inbound: {}, outbound: {} },
      audio: { inbound: {}, outbound: {} },
      connection: {},
    };

    stats.forEach((stat) => {
      switch (stat.type) {
        case 'inbound-rtp':
          if (stat.kind === 'video') {
            report.video.inbound = {
              bytesReceived: stat.bytesReceived,
              packetsReceived: stat.packetsReceived,
              packetsLost: stat.packetsLost,
              framesPerSecond: stat.framesPerSecond,
              frameWidth: stat.frameWidth,
              frameHeight: stat.frameHeight,
              jitter: stat.jitter,
            };
          } else if (stat.kind === 'audio') {
            report.audio.inbound = {
              bytesReceived: stat.bytesReceived,
              packetsReceived: stat.packetsReceived,
              packetsLost: stat.packetsLost,
              jitter: stat.jitter,
              audioLevel: stat.audioLevel,
            };
          }
          break;

        case 'outbound-rtp':
          if (stat.kind === 'video') {
            report.video.outbound = {
              bytesSent: stat.bytesSent,
              packetsSent: stat.packetsSent,
              framesPerSecond: stat.framesPerSecond,
              frameWidth: stat.frameWidth,
              frameHeight: stat.frameHeight,
              qualityLimitationReason: stat.qualityLimitationReason,
            };
          } else if (stat.kind === 'audio') {
            report.audio.outbound = {
              bytesSent: stat.bytesSent,
              packetsSent: stat.packetsSent,
              audioLevel: stat.audioLevel,
            };
          }
          break;

        case 'candidate-pair':
          if (stat.state === 'succeeded') {
            report.connection = {
              currentRoundTripTime: stat.currentRoundTripTime * 1000, // ms
              availableOutgoingBitrate: stat.availableOutgoingBitrate,
              availableIncomingBitrate: stat.availableIncomingBitrate,
              bytesReceived: stat.bytesReceived,
              bytesSent: stat.bytesSent,
            };
          }
          break;
      }
    });

    return report;
  }
}

// Uso das otimizações
const peerConnection = new RTCPeerConnection(configuration);

// Otimizar após criar conexão
await WebRTCOptimizer.optimizePeerConnection(peerConnection, 'video');
await WebRTCOptimizer.setPreferredCodec(peerConnection, 'video/H264');

// Monitorar qualidade
const qualityMonitor = WebRTCOptimizer.monitorConnectionQuality(
  peerConnection,
  (report) => {
    console.log('📊 Relatório de qualidade:', report);

    // Adaptar qualidade baseada no relatório
    const rtt = report.connection.currentRoundTripTime;
    const packetLoss =
      report.video.inbound.packetsLost / report.video.inbound.packetsReceived;

    if (rtt > 200 || packetLoss > 0.05) {
      console.log('⚠️ Qualidade degradada, reduzindo bitrate...');
      // Implementar lógica de adaptação
    }
  }
);
```

---

## 🎯 Cenários de Uso e Casos Práticos

### 1. **Plataforma de Telemedicina**

- **Videochamadas HD** com médicos
- **Compartilhamento de documentos** em tempo real
- **Gravação local** para histórico
- **Criptografia end-to-end** para privacidade

### 2. **Sistema de Educação Online**

- **Salas de aula virtuais** com múltiplos participantes
- **Compartilhamento de tela** para apresentações
- **Quadro branco colaborativo** via data channels
- **Gravação de aulas** para acesso posterior

### 3. **Plataforma de Jogos**

- **Jogos multiplayer** em tempo real
- **Voice chat** integrado
- **Sincronização de estado** via data channels
- **Streaming de gameplay** para espectadores

### 4. **Sistema de Atendimento ao Cliente**

- **Suporte por vídeo** em websites
- **Compartilhamento de tela** para diagnósticos
- **Transferência de arquivos** para documentação
- **Integração com CRM** via APIs

---

## 🚀 Próximos Passos e Recursos Avançados

Agora que você domina o WebRTC, explore estas tecnologias complementares:

1. **🤖 WebAI** - Inteligência artificial no navegador
2. **🔊 Web Audio API** - Processamento de áudio avançado
3. **📱 WebXR** - Realidade virtual e aumentada
4. **⚡ WebGPU** - Computação paralela na GPU
5. **🔐 Web Crypto API** - Criptografia nativa

WebRTC é uma das tecnologias mais poderosas da web moderna, permitindo criar experiências verdadeiramente nativas no navegador. Com o conhecimento que você adquiriu, pode construir aplicações de comunicação, jogos e colaboração de nível profissional!

**🎓 Continue praticando e experimentando - o futuro da web está em suas mãos!**

# 🚀 APIs Web Avançadas - Expandindo os Limites do Navegador

Agora vamos explorar em profundidade as tecnologias mais revolucionárias da web moderna. Cada uma dessas APIs representa um salto significativo nas capacidades dos navegadores, permitindo criar aplicações que antes eram impossíveis sem plugins ou software nativo.

---

## 🤖 WebAI - Inteligência Artificial no Navegador

WebAI representa o conjunto de APIs e tecnologias que permitem executar **modelos de machine learning diretamente no navegador**, sem necessidade de servidores. Isso inclui TensorFlow.js, ONNX Runtime Web, WebNN API e MediaPipe.

### 🧠 TensorFlow.js - Deep Learning no Browser

```javascript
// Importar TensorFlow.js
import * as tf from '@tensorflow/tfjs';

class WebAIManager {
  constructor() {
    this.models = new Map();
    this.isGPUAvailable = false;
    this.backend = null;

    this.initializeTensorFlow();
  }

  async initializeTensorFlow() {
    try {
      // Verificar backends disponíveis
      console.log('Backends disponíveis:', tf.engine().backendNames());

      // Tentar usar WebGL (GPU)
      await tf.setBackend('webgl');
      this.backend = 'webgl';
      this.isGPUAvailable = true;

      // Configurar otimizações
      tf.env().set('WEBGL_FORCE_F16_TEXTURES', true);
      tf.env().set('WEBGL_PACK', true);
      tf.env().set('WEBGL_CONV_IM2COL', true);

      console.log('✅ TensorFlow.js inicializado com WebGL');
      console.log('Configurações:', tf.env().features);
    } catch (error) {
      console.error('⚠️ WebGL não disponível, usando CPU:', error);
      await tf.setBackend('cpu');
      this.backend = 'cpu';
    }
  }

  // Classificação de imagens com MobileNet
  async loadImageClassifier() {
    try {
      // Carregar modelo pré-treinado
      const mobilenet = await tf.loadLayersModel(
        'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1'
      );

      this.models.set('mobilenet', mobilenet);

      // Aquecer o modelo (primeira inferência é lenta)
      const warmupTensor = tf.zeros([1, 224, 224, 3]);
      await mobilenet.predict(warmupTensor).data();
      warmupTensor.dispose();

      console.log('🖼️ Modelo de classificação de imagens carregado');
      return mobilenet;
    } catch (error) {
      console.error('Erro ao carregar modelo:', error);
      throw error;
    }
  }

  // Classificar imagem
  async classifyImage(imageElement) {
    const model = this.models.get('mobilenet');
    if (!model) throw new Error('Modelo não carregado');

    return tf.tidy(() => {
      // Pré-processar imagem
      const img = tf.browser.fromPixels(imageElement);
      const resized = tf.image.resizeBilinear(img, [224, 224]);
      const normalized = resized.div(255.0);
      const batched = normalized.expandDims(0);

      // Fazer predição
      const predictions = model.predict(batched);

      // Obter top 5 classes
      const topK = tf.topk(predictions, 5);
      const classIndices = topK.indices.dataSync();
      const scores = topK.values.dataSync();

      return classIndices.map((idx, i) => ({
        className: this.getClassName(idx),
        probability: scores[i],
        confidence: (scores[i] * 100).toFixed(2) + '%',
      }));
    });
  }

  // Detecção de objetos com COCO-SSD
  async loadObjectDetector() {
    try {
      const cocoSsd = await tf.loadGraphModel(
        'https://tfhub.dev/tensorflow/tfjs-model/coco-ssd/1/default/1',
        { fromTFHub: true }
      );

      this.models.set('coco-ssd', cocoSsd);
      console.log('🎯 Modelo de detecção de objetos carregado');
      return cocoSsd;
    } catch (error) {
      console.error('Erro ao carregar detector:', error);
      throw error;
    }
  }

  // Detectar objetos em imagem
  async detectObjects(imageElement, threshold = 0.5) {
    const model = this.models.get('coco-ssd');
    if (!model) throw new Error('Detector não carregado');

    return tf.tidy(() => {
      // Preparar imagem
      const img = tf.browser.fromPixels(imageElement);
      const batched = img.expandDims(0);

      // Executar detecção
      const predictions = model.execute(batched);

      // Processar resultados
      const boxes = predictions[0].dataSync();
      const classes = predictions[1].dataSync();
      const scores = predictions[2].dataSync();
      const numDetections = predictions[3].dataSync()[0];

      const detections = [];

      for (let i = 0; i < numDetections; i++) {
        if (scores[i] > threshold) {
          const [y1, x1, y2, x2] = boxes.slice(i * 4, (i + 1) * 4);

          detections.push({
            bbox: {
              x: x1 * imageElement.width,
              y: y1 * imageElement.height,
              width: (x2 - x1) * imageElement.width,
              height: (y2 - y1) * imageElement.height,
            },
            class: this.getObjectClass(classes[i]),
            score: scores[i],
            confidence: (scores[i] * 100).toFixed(2) + '%',
          });
        }
      }

      return detections;
    });
  }

  // Análise de sentimentos em texto
  async loadSentimentAnalyzer() {
    try {
      // Carregar modelo LSTM para análise de sentimentos
      const model = await tf.loadLayersModel(
        '/models/sentiment-analysis/model.json'
      );

      // Carregar tokenizer
      const tokenizerResponse = await fetch(
        '/models/sentiment-analysis/tokenizer.json'
      );
      const tokenizer = await tokenizerResponse.json();

      this.models.set('sentiment', { model, tokenizer });
      console.log('💭 Modelo de análise de sentimentos carregado');
    } catch (error) {
      console.error('Erro ao carregar analisador:', error);
      throw error;
    }
  }

  // Analisar sentimento de texto
  async analyzeSentiment(text) {
    const { model, tokenizer } = this.models.get('sentiment') || {};
    if (!model) throw new Error('Modelo de sentimento não carregado');

    return tf.tidy(() => {
      // Tokenizar texto
      const tokens = this.tokenizeText(text, tokenizer);
      const paddedTokens = this.padSequence(tokens, 100); // Max length 100

      // Converter para tensor
      const input = tf.tensor2d([paddedTokens]);

      // Fazer predição
      const prediction = model.predict(input);
      const score = prediction.dataSync()[0];

      // Interpretar resultado
      const sentiment = score > 0.5 ? 'positivo' : 'negativo';
      const confidence = score > 0.5 ? score : 1 - score;

      return {
        sentiment,
        score,
        confidence: (confidence * 100).toFixed(2) + '%',
        emoji: sentiment === 'positivo' ? '😊' : '😔',
      };
    });
  }

  // Transferência de estilo neural
  async loadStyleTransfer() {
    try {
      const styleModel = await tf.loadGraphModel(
        '/models/style-transfer/model.json'
      );

      this.models.set('style-transfer', styleModel);
      console.log('🎨 Modelo de transferência de estilo carregado');
    } catch (error) {
      console.error('Erro ao carregar modelo de estilo:', error);
      throw error;
    }
  }

  // Aplicar estilo artístico a imagem
  async applyArtStyle(contentImage, styleImage) {
    const model = this.models.get('style-transfer');
    if (!model) throw new Error('Modelo de estilo não carregado');

    return tf.tidy(() => {
      // Preparar imagens
      const content = tf.browser.fromPixels(contentImage);
      const style = tf.browser.fromPixels(styleImage);

      // Redimensionar para tamanho do modelo
      const contentResized = tf.image.resizeBilinear(content, [256, 256]);
      const styleResized = tf.image.resizeBilinear(style, [256, 256]);

      // Normalizar
      const contentNorm = contentResized.div(255.0);
      const styleNorm = styleResized.div(255.0);

      // Expandir dimensões
      const contentBatch = contentNorm.expandDims(0);
      const styleBatch = styleNorm.expandDims(0);

      // Aplicar transferência de estilo
      const stylized = model.execute([contentBatch, styleBatch]);

      // Desnormalizar
      const denormalized = stylized.mul(255.0);

      // Converter de volta para imagem
      return tf.browser.toPixels(denormalized.squeeze());
    });
  }

  // Reconhecimento facial com BlazeFace
  async loadFaceDetector() {
    try {
      const blazeface = await tf.loadGraphModel(
        'https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1',
        { fromTFHub: true }
      );

      this.models.set('blazeface', blazeface);
      console.log('😊 Modelo de detecção facial carregado');
    } catch (error) {
      console.error('Erro ao carregar detector facial:', error);
      throw error;
    }
  }

  // Detectar rostos em imagem/vídeo
  async detectFaces(inputElement) {
    const model = this.models.get('blazeface');
    if (!model) throw new Error('Detector facial não carregado');

    return tf.tidy(() => {
      // Preparar entrada
      const input = tf.browser.fromPixels(inputElement);
      const resized = tf.image.resizeBilinear(input, [128, 128]);
      const normalized = resized.div(255.0);
      const batched = normalized.expandDims(0);

      // Executar detecção
      const predictions = model.predict(batched);

      // Processar resultados
      const boxes = predictions[0].dataSync();
      const scores = predictions[1].dataSync();
      const anchors = predictions[2].dataSync();

      const faces = [];
      const threshold = 0.75;

      for (let i = 0; i < scores.length; i++) {
        if (scores[i] > threshold) {
          // Decodificar caixa delimitadora
          const anchor = anchors.slice(i * 4, (i + 1) * 4);
          const box = boxes.slice(i * 4, (i + 1) * 4);

          // Calcular coordenadas reais
          const x = (anchor[0] + box[0]) * inputElement.width;
          const y = (anchor[1] + box[1]) * inputElement.height;
          const width = box[2] * inputElement.width;
          const height = box[3] * inputElement.height;

          // Extrair landmarks faciais
          const landmarks = this.extractFacialLandmarks(
            predictions[3].slice([i, 0], [1, -1])
          );

          faces.push({
            bbox: { x, y, width, height },
            score: scores[i],
            confidence: (scores[i] * 100).toFixed(2) + '%',
            landmarks,
          });
        }
      }

      return faces;
    });
  }

  // Criar e treinar modelo customizado
  async createCustomModel(config) {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({
          inputShape: [config.inputSize],
          units: 128,
          activation: 'relu',
          kernelInitializer: 'glorotUniform',
        }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({
          units: 64,
          activation: 'relu',
        }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({
          units: config.outputSize,
          activation: config.outputActivation || 'softmax',
        }),
      ],
    });

    // Compilar modelo
    model.compile({
      optimizer: tf.train.adam(config.learningRate || 0.001),
      loss: config.loss || 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    return model;
  }

  // Treinar modelo com dados
  async trainModel(model, trainingData, config = {}) {
    const {
      epochs = 50,
      batchSize = 32,
      validationSplit = 0.2,
      callbacks = {},
    } = config;

    // Callbacks para monitorar treinamento
    const defaultCallbacks = {
      onEpochEnd: (epoch, logs) => {
        console.log(`Época ${epoch + 1}/${epochs}`);
        console.log(`Loss: ${logs.loss.toFixed(4)}`);
        console.log(`Accuracy: ${(logs.acc * 100).toFixed(2)}%`);

        if (logs.val_loss) {
          console.log(`Val Loss: ${logs.val_loss.toFixed(4)}`);
          console.log(`Val Accuracy: ${(logs.val_acc * 100).toFixed(2)}%`);
        }
      },
      onBatchEnd: (batch, logs) => {
        if (batch % 10 === 0) {
          console.log(`Batch ${batch}: loss = ${logs.loss.toFixed(4)}`);
        }
      },
    };

    // Treinar modelo
    const history = await model.fit(trainingData.x, trainingData.y, {
      epochs,
      batchSize,
      validationSplit,
      callbacks: { ...defaultCallbacks, ...callbacks },
      shuffle: true,
    });

    return history;
  }
}

// Exemplo de uso prático: Sistema de Reconhecimento de Emoções
class EmotionRecognitionSystem {
  constructor() {
    this.aiManager = new WebAIManager();
    this.videoElement = null;
    this.isProcessing = false;
    this.emotions = [
      'angry',
      'disgust',
      'fear',
      'happy',
      'sad',
      'surprise',
      'neutral',
    ];
  }

  async initialize() {
    // Carregar modelo de emoções
    await this.loadEmotionModel();

    // Configurar câmera
    await this.setupCamera();

    // Iniciar processamento
    this.startEmotionDetection();
  }

  async loadEmotionModel() {
    try {
      const model = await tf.loadLayersModel(
        '/models/emotion-detection/model.json'
      );
      this.emotionModel = model;

      console.log('😊 Modelo de detecção de emoções carregado');

      // Aquecer modelo
      const dummy = tf.zeros([1, 48, 48, 1]);
      await model.predict(dummy).data();
      dummy.dispose();
    } catch (error) {
      console.error('Erro ao carregar modelo de emoções:', error);
      throw error;
    }
  }

  async setupCamera() {
    this.videoElement = document.getElementById('emotionVideo');

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 640,
        height: 480,
        facingMode: 'user',
      },
    });

    this.videoElement.srcObject = stream;
    await this.videoElement.play();
  }

  async startEmotionDetection() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 48;
    canvas.height = 48;

    const detect = async () => {
      if (!this.isProcessing && this.videoElement.readyState === 4) {
        this.isProcessing = true;

        try {
          // Detectar rostos primeiro
          const faces = await this.aiManager.detectFaces(this.videoElement);

          for (const face of faces) {
            // Extrair região do rosto
            ctx.drawImage(
              this.videoElement,
              face.bbox.x,
              face.bbox.y,
              face.bbox.width,
              face.bbox.height,
              0,
              0,
              48,
              48
            );

            // Converter para escala de cinza
            const imageData = ctx.getImageData(0, 0, 48, 48);
            const grayScale = this.rgbToGrayscale(imageData);

            // Preparar tensor
            const input = tf.browser
              .fromPixels(canvas, 1)
              .div(255.0)
              .expandDims(0);

            // Predizer emoção
            const predictions = await this.emotionModel.predict(input).data();
            input.dispose();

            // Encontrar emoção com maior probabilidade
            const maxIndex = predictions.indexOf(Math.max(...predictions));
            const emotion = this.emotions[maxIndex];
            const confidence = predictions[maxIndex];

            // Exibir resultado
            this.displayEmotion(face, emotion, confidence);
          }
        } catch (error) {
          console.error('Erro na detecção:', error);
        }

        this.isProcessing = false;
      }

      requestAnimationFrame(detect);
    };

    detect();
  }

  displayEmotion(face, emotion, confidence) {
    const overlay = document.getElementById('emotionOverlay');
    const ctx = overlay.getContext('2d');

    // Limpar overlay
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    // Desenhar caixa ao redor do rosto
    ctx.strokeStyle = this.getEmotionColor(emotion);
    ctx.lineWidth = 3;
    ctx.strokeRect(face.bbox.x, face.bbox.y, face.bbox.width, face.bbox.height);

    // Exibir emoção e confiança
    ctx.fillStyle = this.getEmotionColor(emotion);
    ctx.font = '20px Arial';
    ctx.fillText(
      `${this.getEmotionEmoji(emotion)} ${emotion} (${(
        confidence * 100
      ).toFixed(1)}%)`,
      face.bbox.x,
      face.bbox.y - 10
    );
  }

  getEmotionColor(emotion) {
    const colors = {
      happy: '#4CAF50',
      sad: '#2196F3',
      angry: '#F44336',
      fear: '#FF9800',
      surprise: '#9C27B0',
      disgust: '#795548',
      neutral: '#607D8B',
    };
    return colors[emotion] || '#000000';
  }

  getEmotionEmoji(emotion) {
    const emojis = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      fear: '😨',
      surprise: '😮',
      disgust: '🤢',
      neutral: '😐',
    };
    return emojis[emotion] || '🤔';
  }

  rgbToGrayscale(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    return imageData;
  }
}
```

---

## 🔊 Web Audio API - Processamento de Áudio Avançado

A Web Audio API fornece um sistema poderoso e de alto desempenho para controlar áudio na web. Permite criar, manipular e analisar áudio em tempo real.

### 🎵 Arquitetura da Web Audio API

```javascript
class AdvancedAudioProcessor {
  constructor() {
    this.audioContext = null;
    this.nodes = new Map();
    this.sources = new Map();
    this.analyzers = new Map();
    this.isInitialized = false;

    this.initializeAudio();
  }

  async initializeAudio() {
    try {
      // Criar contexto de áudio
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)({
        latencyHint: 'interactive',
        sampleRate: 48000,
      });

      // Desbloquear contexto em dispositivos móveis
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      console.log('🔊 Web Audio API inicializada');
      console.log(`Sample Rate: ${this.audioContext.sampleRate}Hz`);
      console.log(
        `Output Channels: ${this.audioContext.destination.channelCount}`
      );

      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar Web Audio:', error);
      throw error;
    }
  }

  // Sistema completo de síntese de áudio
  createSynthesizer() {
    const synth = {
      oscillators: [],
      envelope: null,
      filter: null,
      effects: new Map(),
    };

    // Criar cadeia de áudio
    const masterGain = this.audioContext.createGain();
    masterGain.gain.value = 0.3;

    // Filtro
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    filter.Q.value = 1;
    synth.filter = filter;

    // Compressor
    const compressor = this.audioContext.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 12;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;

    // Reverb
    const reverb = this.createReverb();
    const reverbGain = this.audioContext.createGain();
    reverbGain.gain.value = 0.3;

    // Delay
    const delay = this.createDelay();
    const delayGain = this.audioContext.createGain();
    delayGain.gain.value = 0.2;

    // Conectar cadeia de efeitos
    filter.connect(compressor);
    compressor.connect(masterGain);

    // Sends de efeitos
    compressor.connect(reverb.input);
    reverb.output.connect(reverbGain);
    reverbGain.connect(masterGain);

    compressor.connect(delay.input);
    delay.output.connect(delayGain);
    delayGain.connect(masterGain);

    masterGain.connect(this.audioContext.destination);

    // Adicionar à estrutura
    synth.effects.set('reverb', { node: reverb, gain: reverbGain });
    synth.effects.set('delay', { node: delay, gain: delayGain });
    synth.masterGain = masterGain;
    synth.compressor = compressor;

    // Métodos do sintetizador
    synth.playNote = (frequency, duration = 1, type = 'sine') => {
      const oscillator = this.audioContext.createOscillator();
      const oscGain = this.audioContext.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;

      // Envelope ADSR
      const now = this.audioContext.currentTime;
      const attack = 0.02;
      const decay = 0.1;
      const sustain = 0.7;
      const release = 0.3;

      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(1, now + attack);
      oscGain.gain.linearRampToValueAtTime(sustain, now + attack + decay);
      oscGain.gain.setValueAtTime(sustain, now + duration);
      oscGain.gain.linearRampToValueAtTime(0, now + duration + release);

      // Conectar
      oscillator.connect(oscGain);
      oscGain.connect(filter);

      // Tocar
      oscillator.start(now);
      oscillator.stop(now + duration + release);

      // Limpar após tocar
      oscillator.onended = () => {
        oscillator.disconnect();
        oscGain.disconnect();
      };

      return oscillator;
    };

    synth.playChord = (frequencies, duration = 1, type = 'sine') => {
      return frequencies.map((freq) => synth.playNote(freq, duration, type));
    };

    synth.setFilterFrequency = (frequency) => {
      filter.frequency.linearRampToValueAtTime(
        frequency,
        this.audioContext.currentTime + 0.1
      );
    };

    synth.setFilterResonance = (resonance) => {
      filter.Q.linearRampToValueAtTime(
        resonance,
        this.audioContext.currentTime + 0.1
      );
    };

    this.nodes.set('synthesizer', synth);
    return synth;
  }

  // Criar efeito de reverb usando convolução
  createReverb() {
    const convolver = this.audioContext.createConvolver();
    const length = this.audioContext.sampleRate * 3; // 3 segundos
    const impulse = this.audioContext.createBuffer(
      2,
      length,
      this.audioContext.sampleRate
    );

    // Gerar resposta ao impulso
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }

    convolver.buffer = impulse;

    return {
      input: convolver,
      output: convolver,
      setDecay: (decay) => {
        // Regenerar impulso com novo decay
        for (let channel = 0; channel < 2; channel++) {
          const channelData = impulse.getChannelData(channel);
          for (let i = 0; i < length; i++) {
            channelData[i] =
              (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
          }
        }
        convolver.buffer = impulse;
      },
    };
  }

  // Criar efeito de delay
  createDelay() {
    const delay = this.audioContext.createDelay(5); // Max 5 segundos
    const feedback = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const output = this.audioContext.createGain();

    // Configurar delay
    delay.delayTime.value = 0.25; // 250ms
    feedback.gain.value = 0.4;

    // Filtro no feedback para simular analog delay
    filter.type = 'highpass';
    filter.frequency.value = 500;

    // Conectar feedback loop
    delay.connect(filter);
    filter.connect(feedback);
    feedback.connect(delay);
    delay.connect(output);

    return {
      input: delay,
      output: output,
      setDelayTime: (time) => {
        delay.delayTime.linearRampToValueAtTime(
          time,
          this.audioContext.currentTime + 0.1
        );
      },
      setFeedback: (amount) => {
        feedback.gain.linearRampToValueAtTime(
          amount,
          this.audioContext.currentTime + 0.1
        );
      },
    };
  }

  // Analisador de espectro avançado
  createSpectrumAnalyzer(source, fftSize = 2048) {
    const analyzer = this.audioContext.createAnalyser();
    analyzer.fftSize = fftSize;
    analyzer.smoothingTimeConstant = 0.8;

    source.connect(analyzer);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const floatArray = new Float32Array(bufferLength);

    const analysis = {
      analyzer,
      dataArray,
      floatArray,

      getFrequencyData: () => {
        analyzer.getByteFrequencyData(dataArray);
        return dataArray;
      },

      getFloatFrequencyData: () => {
        analyzer.getFloatFrequencyData(floatArray);
        return floatArray;
      },

      getTimeDomainData: () => {
        analyzer.getByteTimeDomainData(dataArray);
        return dataArray;
      },

      // Detectar frequência fundamental (pitch)
      detectPitch: () => {
        analyzer.getFloatTimeDomainData(floatArray);

        // Autocorrelação
        const correlation = new Float32Array(bufferLength);

        for (let lag = 0; lag < bufferLength; lag++) {
          let sum = 0;
          for (let i = 0; i < bufferLength - lag; i++) {
            sum += floatArray[i] * floatArray[i + lag];
          }
          correlation[lag] = sum;
        }

        // Encontrar pico na correlação
        let maxCorrelation = 0;
        let maxLag = 0;

        for (let lag = 1; lag < bufferLength; lag++) {
          if (correlation[lag] > maxCorrelation) {
            maxCorrelation = correlation[lag];
            maxLag = lag;
          }
        }

        const frequency = this.audioContext.sampleRate / maxLag;
        return frequency;
      },

      // Detectar batidas (BPM)
      detectBeat: () => {
        const frequencies = this.getFloatFrequencyData();

        // Focar em frequências baixas (kick drum)
        let bassEnergy = 0;
        for (let i = 0; i < 10; i++) {
          bassEnergy += frequencies[i] * frequencies[i];
        }

        // Comparar com histórico
        if (!this.beatHistory) {
          this.beatHistory = [];
          this.beatThreshold = 0;
        }

        this.beatHistory.push(bassEnergy);
        if (this.beatHistory.length > 43) {
          // ~1 segundo a 43fps
          this.beatHistory.shift();
        }

        const average =
          this.beatHistory.reduce((a, b) => a + b) / this.beatHistory.length;
        const variance =
          this.beatHistory.reduce(
            (sum, val) => sum + Math.pow(val - average, 2),
            0
          ) / this.beatHistory.length;
        const threshold = average + Math.sqrt(variance) * 1.5;

        const isBeat = bassEnergy > threshold;

        return { isBeat, energy: bassEnergy, threshold };
      },
    };

    return analysis;
  }

  // Gravador de áudio avançado
  createRecorder(stream) {
    const source = this.audioContext.createMediaStreamSource(stream);
    const recorder = {
      source,
      processors: new Map(),
      isRecording: false,
      chunks: [],
    };

    // Processador de ruído
    const noiseGate = this.audioContext.createDynamicsCompressor();
    noiseGate.threshold.value = -50;
    noiseGate.knee.value = 40;
    noiseGate.ratio.value = 12;
    noiseGate.attack.value = 0;
    noiseGate.release.value = 0.25;

    // EQ de 3 bandas
    const lowShelf = this.audioContext.createBiquadFilter();
    lowShelf.type = 'lowshelf';
    lowShelf.frequency.value = 320;
    lowShelf.gain.value = 0;

    const midPeaking = this.audioContext.createBiquadFilter();
    midPeaking.type = 'peaking';
    midPeaking.frequency.value = 1000;
    midPeaking.Q.value = 0.5;
    midPeaking.gain.value = 0;

    const highShelf = this.audioContext.createBiquadFilter();
    highShelf.type = 'highshelf';
    highShelf.frequency.value = 3200;
    highShelf.gain.value = 0;

    // Conectar cadeia
    source.connect(noiseGate);
    noiseGate.connect(lowShelf);
    lowShelf.connect(midPeaking);
    midPeaking.connect(highShelf);

    recorder.processors.set('noiseGate', noiseGate);
    recorder.processors.set('lowEQ', lowShelf);
    recorder.processors.set('midEQ', midPeaking);
    recorder.processors.set('highEQ', highShelf);

    // Configurar MediaRecorder
    const dest = this.audioContext.createMediaStreamDestination();
    highShelf.connect(dest);

    const mediaRecorder = new MediaRecorder(dest.stream, {
      mimeType: 'audio/webm;codecs=opus',
      audioBitsPerSecond: 128000,
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recorder.chunks.push(event.data);
      }
    };

    recorder.start = () => {
      recorder.chunks = [];
      mediaRecorder.start();
      recorder.isRecording = true;
      console.log('🎙️ Gravação iniciada');
    };

    recorder.stop = () => {
      return new Promise((resolve) => {
        mediaRecorder.onstop = () => {
          const blob = new Blob(recorder.chunks, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          recorder.isRecording = false;
          console.log('⏹️ Gravação finalizada');
          resolve({ blob, url });
        };
        mediaRecorder.stop();
      });
    };

    recorder.setEQ = (band, gain) => {
      const eq = recorder.processors.get(`${band}EQ`);
      if (eq) {
        eq.gain.linearRampToValueAtTime(
          gain,
          this.audioContext.currentTime + 0.1
        );
      }
    };

    return recorder;
  }

  // Sistema de espacialização 3D
  create3DAudioScene() {
    const scene = {
      listener: this.audioContext.listener,
      sources: new Map(),
      environment: {
        roomSize: 'medium',
        materials: 'wood',
      },
    };

    // Configurar listener (ouvinte)
    scene.setListenerPosition = (x, y, z) => {
      if (scene.listener.positionX) {
        scene.listener.positionX.value = x;
        scene.listener.positionY.value = y;
        scene.listener.positionZ.value = z;
      } else {
        scene.listener.setPosition(x, y, z);
      }
    };

    scene.setListenerOrientation = (
      forwardX,
      forwardY,
      forwardZ,
      upX,
      upY,
      upZ
    ) => {
      if (scene.listener.forwardX) {
        scene.listener.forwardX.value = forwardX;
        scene.listener.forwardY.value = forwardY;
        scene.listener.forwardZ.value = forwardZ;
        scene.listener.upX.value = upX;
        scene.listener.upY.value = upY;
        scene.listener.upZ.value = upZ;
      } else {
        scene.listener.setOrientation(
          forwardX,
          forwardY,
          forwardZ,
          upX,
          upY,
          upZ
        );
      }
    };

    // Criar fonte sonora 3D
    scene.createSource = async (url, position = { x: 0, y: 0, z: 0 }) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // Panner para posicionamento 3D
      const panner = this.audioContext.createPanner();
      panner.panningModel = 'HRTF';
      panner.distanceModel = 'inverse';
      panner.refDistance = 1;
      panner.maxDistance = 10000;
      panner.rolloffFactor = 1;
      panner.coneInnerAngle = 360;
      panner.coneOuterAngle = 0;
      panner.coneOuterGain = 0;

      // Definir posição
      if (panner.positionX) {
        panner.positionX.value = position.x;
        panner.positionY.value = position.y;
        panner.positionZ.value = position.z;
      } else {
        panner.setPosition(position.x, position.y, position.z);
      }

      // Conectar
      source.connect(panner);
      panner.connect(this.audioContext.destination);

      const audioSource = {
        source,
        panner,
        position,

        play: () => {
          source.start();
        },

        stop: () => {
          source.stop();
        },

        setPosition: (x, y, z) => {
          if (panner.positionX) {
            panner.positionX.linearRampToValueAtTime(
              x,
              this.audioContext.currentTime + 0.1
            );
            panner.positionY.linearRampToValueAtTime(
              y,
              this.audioContext.currentTime + 0.1
            );
            panner.positionZ.linearRampToValueAtTime(
              z,
              this.audioContext.currentTime + 0.1
            );
          } else {
            panner.setPosition(x, y, z);
          }
          audioSource.position = { x, y, z };
        },

        setVelocity: (x, y, z) => {
          if (panner.positionX) {
            // Simular doppler effect
            const doppler = 1 + z / 343; // Velocidade do som
            source.playbackRate.value = doppler;
          }
        },
      };

      const id = `source_${Date.now()}`;
      scene.sources.set(id, audioSource);

      return audioSource;
    };

    return scene;
  }

  // Processador de voz em tempo real
  createVoiceProcessor() {
    const processor = {
      input: null,
      effects: new Map(),
      output: this.audioContext.createGain(),
    };

    // Auto-tune básico
    processor.enableAutoTune = (targetPitch = 440) => {
      const pitchShifter = this.audioContext.createScriptProcessor(4096, 1, 1);

      pitchShifter.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const outputData = event.outputBuffer.getChannelData(0);

        // Detectar pitch atual
        const currentPitch = this.detectPitchFromBuffer(inputData);

        if (currentPitch > 0) {
          // Calcular razão de shift
          const shiftRatio = targetPitch / currentPitch;

          // Aplicar pitch shift (simplificado)
          for (let i = 0; i < outputData.length; i++) {
            const index = Math.floor(i * shiftRatio);
            if (index < inputData.length) {
              outputData[i] = inputData[index];
            } else {
              outputData[i] = 0;
            }
          }
        } else {
          // Sem pitch detectado, passar direto
          outputData.set(inputData);
        }
      };

      processor.effects.set('autoTune', pitchShifter);
    };

    // Vocoder
    processor.createVocoder = () => {
      const vocoder = {
        carrier: null,
        modulator: null,
        bands: [],
      };

      // Criar banco de filtros
      const numBands = 16;
      const minFreq = 50;
      const maxFreq = 8000;

      for (let i = 0; i < numBands; i++) {
        const freq = minFreq * Math.pow(maxFreq / minFreq, i / (numBands - 1));

        // Filtros para modulador (voz)
        const modFilter = this.audioContext.createBiquadFilter();
        modFilter.type = 'bandpass';
        modFilter.frequency.value = freq;
        modFilter.Q.value = freq / 200;

        // Envelope follower
        const rectifier = this.audioContext.createWaveShaper();
        const curve = new Float32Array(256);
        for (let j = 0; j < 128; j++) {
          curve[j] = 0;
          curve[j + 128] = j / 128;
        }
        rectifier.curve = curve;

        const lpFilter = this.audioContext.createBiquadFilter();
        lpFilter.type = 'lowpass';
        lpFilter.frequency.value = 10;

        // Filtros para carrier (sintetizador)
        const carrierFilter = this.audioContext.createBiquadFilter();
        carrierFilter.type = 'bandpass';
        carrierFilter.frequency.value = freq;
        carrierFilter.Q.value = freq / 200;

        // VCA (Voltage Controlled Amplifier)
        const vca = this.audioContext.createGain();
        vca.gain.value = 0;

        vocoder.bands.push({
          modFilter,
          rectifier,
          lpFilter,
          carrierFilter,
          vca,
          frequency: freq,
        });
      }

      processor.effects.set('vocoder', vocoder);
      return vocoder;
    };

    // Efeito de robô
    processor.enableRobotVoice = () => {
      const ringModulator = this.audioContext.createOscillator();
      ringModulator.frequency.value = 30;
      ringModulator.type = 'sine';

      const modGain = this.audioContext.createGain();
      modGain.gain.value = 0;

      ringModulator.connect(modGain.gain);
      ringModulator.start();

      processor.effects.set('robot', {
        oscillator: ringModulator,
        gain: modGain,
      });
    };

    return processor;
  }

  // Gerador de música procedural
  createProceduralMusicGenerator() {
    const generator = {
      isPlaying: false,
      tempo: 120,
      key: 'C',
      scale: 'major',
      progression: ['I', 'V', 'vi', 'IV'],
      currentChord: 0,
      instruments: new Map(),
    };

    // Definir escalas e acordes
    const scales = {
      major: [0, 2, 4, 5, 7, 9, 11],
      minor: [0, 2, 3, 5, 7, 8, 10],
      dorian: [0, 2, 3, 5, 7, 9, 10],
      pentatonic: [0, 2, 4, 7, 9],
    };

    const chordTypes = {
      I: [0, 2, 4],
      ii: [1, 3, 5],
      iii: [2, 4, 6],
      IV: [3, 5, 0],
      V: [4, 6, 1],
      vi: [5, 0, 2],
      'vii°': [6, 1, 3],
    };

    // Converter nota para frequência
    generator.noteToFrequency = (note, octave = 4) => {
      const notes = [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
      ];
      const a4 = 440;
      const a4Index = notes.indexOf('A') + 4 * 12;
      const noteIndex = notes.indexOf(note) + octave * 12;
      const halfSteps = noteIndex - a4Index;

      return a4 * Math.pow(2, halfSteps / 12);
    };

    // Gerar melodia
    generator.generateMelody = (bars = 4, notesPerBar = 8) => {
      const melody = [];
      const scaleNotes = scales[generator.scale];

      for (let bar = 0; bar < bars; bar++) {
        for (let note = 0; note < notesPerBar; note++) {
          // Probabilidades para criar melodia interessante
          const random = Math.random();
          let noteIndex;

          if (random < 0.1) {
            // Pausa
            noteIndex = -1;
          } else if (random < 0.4) {
            // Nota do acorde atual
            const chord =
              chordTypes[generator.progression[generator.currentChord]];
            noteIndex = chord[Math.floor(Math.random() * chord.length)];
          } else {
            // Nota aleatória da escala
            noteIndex = Math.floor(Math.random() * scaleNotes.length);
          }

          melody.push({
            note: noteIndex,
            duration: 0.25, // Colcheia
            velocity: 0.5 + Math.random() * 0.5,
          });
        }

        // Avançar acorde
        generator.currentChord =
          (generator.currentChord + 1) % generator.progression.length;
      }

      return melody;
    };

    // Tocar melodia
    generator.playMelody = async (melody) => {
      const beatDuration = 60 / generator.tempo;
      let currentTime = this.audioContext.currentTime;

      for (const note of melody) {
        if (note.note >= 0) {
          const scaleNotes = scales[generator.scale];
          const scaleDegree = scaleNotes[note.note % scaleNotes.length];
          const octave = 4 + Math.floor(note.note / scaleNotes.length);

          // Calcular frequência
          const rootFreq = generator.noteToFrequency(generator.key, 4);
          const freq =
            rootFreq * Math.pow(2, scaleDegree / 12) * Math.pow(2, octave - 4);

          // Criar e tocar nota
          const oscillator = this.audioContext.createOscillator();
          const envelope = this.audioContext.createGain();

          oscillator.type = 'sawtooth';
          oscillator.frequency.value = freq;

          // ADSR envelope
          envelope.gain.setValueAtTime(0, currentTime);
          envelope.gain.linearRampToValueAtTime(
            note.velocity,
            currentTime + 0.01
          );
          envelope.gain.exponentialRampToValueAtTime(
            0.3 * note.velocity,
            currentTime + 0.1
          );
          envelope.gain.exponentialRampToValueAtTime(
            0.01,
            currentTime + note.duration * beatDuration
          );

          oscillator.connect(envelope);
          envelope.connect(this.audioContext.destination);

          oscillator.start(currentTime);
          oscillator.stop(currentTime + note.duration * beatDuration);
        }

        currentTime += note.duration * beatDuration;
      }
    };

    // Gerar bateria
    generator.generateDrumPattern = () => {
      const pattern = {
        kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        snare: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        hihat: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      };

      return pattern;
    };

    // Sintetizar bateria
    generator.playDrumPattern = async (pattern, bars = 4) => {
      const beatDuration = 60 / generator.tempo / 4; // 16th notes
      let currentTime = this.audioContext.currentTime;

      for (let bar = 0; bar < bars; bar++) {
        for (let step = 0; step < 16; step++) {
          // Kick drum
          if (pattern.kick[step]) {
            const kick = this.audioContext.createOscillator();
            const kickEnv = this.audioContext.createGain();

            kick.frequency.setValueAtTime(60, currentTime);
            kick.frequency.exponentialRampToValueAtTime(30, currentTime + 0.1);

            kickEnv.gain.setValueAtTime(1, currentTime);
            kickEnv.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.1);

            kick.connect(kickEnv);
            kickEnv.connect(this.audioContext.destination);

            kick.start(currentTime);
            kick.stop(currentTime + 0.1);
          }

          // Snare drum
          if (pattern.snare[step]) {
            const noise = this.audioContext.createBufferSource();
            const noiseBuffer = this.audioContext.createBuffer(
              1,
              4096,
              this.audioContext.sampleRate
            );
            const data = noiseBuffer.getChannelData(0);

            for (let i = 0; i < 4096; i++) {
              data[i] = Math.random() * 2 - 1;
            }

            noise.buffer = noiseBuffer;

            const snareEnv = this.audioContext.createGain();
            const snareFilter = this.audioContext.createBiquadFilter();

            snareFilter.type = 'highpass';
            snareFilter.frequency.value = 200;

            snareEnv.gain.setValueAtTime(0.5, currentTime);
            snareEnv.gain.exponentialRampToValueAtTime(
              0.01,
              currentTime + 0.05
            );

            noise.connect(snareFilter);
            snareFilter.connect(snareEnv);
            snareEnv.connect(this.audioContext.destination);

            noise.start(currentTime);
            noise.stop(currentTime + 0.05);
          }

          // Hi-hat
          if (pattern.hihat[step]) {
            const hihat = this.audioContext.createOscillator();
            const hihatEnv = this.audioContext.createGain();
            const hihatFilter = this.audioContext.createBiquadFilter();

            hihat.type = 'square';
            hihat.frequency.value = 8000;

            hihatFilter.type = 'highpass';
            hihatFilter.frequency.value = 7000;

            hihatEnv.gain.setValueAtTime(0.1, currentTime);
            hihatEnv.gain.exponentialRampToValueAtTime(
              0.01,
              currentTime + 0.02
            );

            hihat.connect(hihatFilter);
            hihatFilter.connect(hihatEnv);
            hihatEnv.connect(this.audioContext.destination);

            hihat.start(currentTime);
            hihat.stop(currentTime + 0.02);
          }

          currentTime += beatDuration;
        }
      }
    };

    // Iniciar geração de música
    generator.start = async () => {
      if (generator.isPlaying) return;

      generator.isPlaying = true;

      while (generator.isPlaying) {
        // Gerar e tocar melodia
        const melody = generator.generateMelody(4);
        const melodyPromise = generator.playMelody(melody);

        // Gerar e tocar bateria
        const drums = generator.generateDrumPattern();
        const drumsPromise = generator.playDrumPattern(drums, 4);

        // Esperar ambos terminarem
        await Promise.all([melodyPromise, drumsPromise]);

        // Pequena pausa entre loops
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    generator.stop = () => {
      generator.isPlaying = false;
    };

    return generator;
  }
}

// Exemplo prático: DAW (Digital Audio Workstation) simplificada
class SimpleDAW {
  constructor() {
    this.audioProcessor = new AdvancedAudioProcessor();
    this.tracks = new Map();
    this.isPlaying = false;
    this.currentTime = 0;
    this.tempo = 120;
  }

  async initialize() {
    await this.audioProcessor.initializeAudio();
    this.masterBus = this.audioProcessor.audioContext.createGain();
    this.masterBus.connect(this.audioProcessor.audioContext.destination);
  }

  createTrack(name, type = 'audio') {
    const track = {
      name,
      type,
      clips: [],
      effects: [],
      volume: 1,
      pan: 0,
      mute: false,
      solo: false,
      gainNode: this.audioProcessor.audioContext.createGain(),
      panNode: this.audioProcessor.audioContext.createStereoPanner(),
    };

    // Conectar cadeia de áudio
    track.gainNode.connect(track.panNode);
    track.panNode.connect(this.masterBus);

    this.tracks.set(name, track);
    return track;
  }

  async addAudioClip(trackName, audioBuffer, startTime = 0) {
    const track = this.tracks.get(trackName);
    if (!track) throw new Error('Track não encontrada');

    const clip = {
      buffer: audioBuffer,
      startTime,
      duration: audioBuffer.duration,
      fadeIn: 0,
      fadeOut: 0,
    };

    track.clips.push(clip);
    return clip;
  }

  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    const startTime = this.audioProcessor.audioContext.currentTime;

    // Tocar todos os clips
    for (const [trackName, track] of this.tracks) {
      if (track.mute) continue;

      for (const clip of track.clips) {
        const source = this.audioProcessor.audioContext.createBufferSource();
        source.buffer = clip.buffer;

        // Aplicar fades
        const clipGain = this.audioProcessor.audioContext.createGain();

        if (clip.fadeIn > 0) {
          clipGain.gain.setValueAtTime(0, startTime + clip.startTime);
          clipGain.gain.linearRampToValueAtTime(
            1,
            startTime + clip.startTime + clip.fadeIn
          );
        }

        if (clip.fadeOut > 0) {
          const fadeOutTime =
            startTime + clip.startTime + clip.duration - clip.fadeOut;
          clipGain.gain.setValueAtTime(1, fadeOutTime);
          clipGain.gain.linearRampToValueAtTime(0, fadeOutTime + clip.fadeOut);
        }

        source.connect(clipGain);
        clipGain.connect(track.gainNode);

        source.start(startTime + clip.startTime);
      }
    }
  }

  stop() {
    this.isPlaying = false;
    // Implementar lógica para parar todas as sources
  }

  exportToWAV() {
    // Implementar exportação para WAV
    // Usar OfflineAudioContext para renderizar
  }
}
```

---

## 📱 WebXR - Realidade Virtual e Aumentada

WebXR é a API moderna para criar experiências de **realidade virtual (VR)** e **realidade aumentada (AR)** na web. Substitui a antiga WebVR API.

```javascript
class WebXRExperienceManager {
  constructor() {
    this.xrSession = null;
    this.xrReferenceSpace = null;
    this.xrViewerSpace = null;
    this.gl = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;

    this.controllers = new Map();
    this.isImmersive = false;
    this.supportedModes = {
      vr: false,
      ar: false,
      inline: false,
    };

    this.checkXRSupport();
  }

  async checkXRSupport() {
    if ('xr' in navigator) {
      try {
        // Verificar suporte VR
        this.supportedModes.vr = await navigator.xr.isSessionSupported(
          'immersive-vr'
        );

        // Verificar suporte AR
        this.supportedModes.ar = await navigator.xr.isSessionSupported(
          'immersive-ar'
        );

        // Inline sempre suportado se XR disponível
        this.supportedModes.inline = true;

        console.log('🥽 Suporte WebXR:', this.supportedModes);
      } catch (error) {
        console.error('Erro ao verificar suporte XR:', error);
      }
    } else {
      console.warn('WebXR não suportado neste navegador');
    }
  }

  // Iniciar sessão VR
  async startVRSession() {
    if (!this.supportedModes.vr) {
      throw new Error('VR não suportado neste dispositivo');
    }

    try {
      // Solicitar sessão VR
      const sessionInit = {
        requiredFeatures: ['local-floor'], // Espaço do chão local
        optionalFeatures: [
          'bounded-floor', // Área de jogo definida
          'hand-tracking', // Rastreamento de mãos
          'layers', // Camadas de renderização
        ],
      };

      this.xrSession = await navigator.xr.requestSession(
        'immersive-vr',
        sessionInit
      );

      // Configurar eventos da sessão
      this.setupSessionEvents();

      // Criar contexto WebGL
      await this.setupWebGLContext();

      // Configurar espaço de referência
      await this.setupReferenceSpace();

      // Configurar controles
      this.setupControllers();

      // Iniciar loop de renderização
      this.xrSession.requestAnimationFrame(this.onXRFrame.bind(this));

      this.isImmersive = true;
      console.log('🥽 Sessão VR iniciada');
    } catch (error) {
      console.error('Erro ao iniciar sessão VR:', error);
      throw error;
    }
  }

  // Iniciar sessão AR
  async startARSession() {
    if (!this.supportedModes.ar) {
      throw new Error('AR não suportado neste dispositivo');
    }

    try {
      const sessionInit = {
        requiredFeatures: ['hit-test'], // Detecção de superfícies
        optionalFeatures: [
          'dom-overlay', // Overlay DOM
          'light-estimation', // Estimativa de iluminação
          'anchors', // Âncoras espaciais
          'plane-detection', // Detecção de planos
          'mesh-detection', // Detecção de malhas
        ],
        domOverlay: {
          root: document.getElementById('ar-overlay'),
        },
      };

      this.xrSession = await navigator.xr.requestSession(
        'immersive-ar',
        sessionInit
      );

      // Configurar detecção de hit
      await this.setupHitTesting();

      // Configurar detecção de planos
      if (this.xrSession.enabledFeatures?.includes('plane-detection')) {
        await this.setupPlaneDetection();
      }

      // Configurar estimativa de luz
      if (this.xrSession.enabledFeatures?.includes('light-estimation')) {
        this.setupLightEstimation();
      }

      this.setupSessionEvents();
      await this.setupWebGLContext();
      await this.setupReferenceSpace();

      this.xrSession.requestAnimationFrame(this.onXRFrame.bind(this));

      this.isImmersive = true;
      console.log('📱 Sessão AR iniciada');
    } catch (error) {
      console.error('Erro ao iniciar sessão AR:', error);
      throw error;
    }
  }

  setupSessionEvents() {
    this.xrSession.addEventListener('end', () => {
      this.isImmersive = false;
      this.xrSession = null;
      console.log('Sessão XR encerrada');
    });

    this.xrSession.addEventListener('visibilitychange', (event) => {
      console.log('Visibilidade da sessão:', event.session.visibilityState);
    });

    this.xrSession.addEventListener('inputsourceschange', (event) => {
      // Lidar com mudanças nos controles
      for (const source of event.added) {
        this.addController(source);
      }

      for (const source of event.removed) {
        this.removeController(source);
      }
    });
  }

  async setupWebGLContext() {
    const canvas = document.createElement('canvas');
    this.gl = canvas.getContext('webgl2', {
      xrCompatible: true,
      alpha: true,
      antialias: true,
    });

    if (!this.gl) {
      throw new Error('WebGL2 não disponível');
    }

    // Configurar camada base
    await this.gl.makeXRCompatible();

    const baseLayer = new XRWebGLLayer(this.xrSession, this.gl);
    await this.xrSession.updateRenderState({ baseLayer });

    // Inicializar Three.js renderer (exemplo)
    this.setupThreeJS(canvas);
  }

  setupThreeJS(canvas) {
    // Criar renderer Three.js
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      context: this.gl,
      antialias: true,
      alpha: true,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.xr.enabled = true;
    this.renderer.xr.setReferenceSpaceType('local-floor');

    // Criar cena
    this.scene = new THREE.Scene();

    // Criar câmera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Adicionar iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 10, 5);
    this.scene.add(directionalLight);

    // Criar ambiente VR/AR
    this.createXREnvironment();
  }

  createXREnvironment() {
    // Chão
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.8,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Objetos interativos
    this.createInteractiveObjects();
  }

  createInteractiveObjects() {
    // Cubo interativo
    const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      roughness: 0.5,
      metalness: 0.5,
    });

    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        Math.random() * 4 - 2,
        Math.random() * 2 + 0.5,
        Math.random() * 4 - 2
      );

      cube.userData = {
        interactive: true,
        velocity: new THREE.Vector3(0, 0, 0),
        grabbed: false,
      };

      this.scene.add(cube);
    }
  }

  async setupReferenceSpace() {
    try {
      // Tentar obter espaço local-floor primeiro
      this.xrReferenceSpace = await this.xrSession.requestReferenceSpace(
        'local-floor'
      );
    } catch (error) {
      // Fallback para local
      this.xrReferenceSpace = await this.xrSession.requestReferenceSpace(
        'local'
      );
    }

    // Viewer space para posição da cabeça
    this.xrViewerSpace = await this.xrSession.requestReferenceSpace('viewer');
  }

  setupControllers() {
    // Configurar controladores VR
    for (let i = 0; i < 2; i++) {
      const controller = this.renderer.xr.getController(i);

      controller.addEventListener('connected', (event) => {
        const source = event.data;
        this.onControllerConnected(controller, source);
      });

      controller.addEventListener('disconnected', () => {
        this.onControllerDisconnected(controller);
      });

      // Eventos de interação
      controller.addEventListener('selectstart', this.onSelectStart.bind(this));
      controller.addEventListener('selectend', this.onSelectEnd.bind(this));
      controller.addEventListener('squeeze', this.onSqueeze.bind(this));

      this.scene.add(controller);

      // Criar modelo visual do controle
      const controllerModel = this.createControllerModel();
      controller.add(controllerModel);

      this.controllers.set(i, {
        controller,
        model: controllerModel,
        source: null,
        selected: null,
      });
    }
  }

  createControllerModel() {
    const group = new THREE.Group();

    // Linha de mira (ray)
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1),
    ]);

    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: 0x00ff00,
        linewidth: 2,
      })
    );

    group.add(line);

    // Esfera na ponta
    const sphereGeometry = new THREE.SphereGeometry(0.01, 8, 8);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.z = -1;

    group.add(sphere);

    return group;
  }

  onControllerConnected(controller, inputSource) {
    console.log('Controle conectado:', inputSource);

    // Verificar capacidades
    if (inputSource.hand) {
      console.log('Mão detectada');
      this.setupHandTracking(controller, inputSource);
    } else if (inputSource.gamepad) {
      console.log('Gamepad detectado:', inputSource.gamepad);
    }

    // Haptic feedback
    if (inputSource.gamepad && 'hapticActuators' in inputSource.gamepad) {
      controller.userData.haptic = inputSource.gamepad.hapticActuators[0];
    }
  }

  onControllerDisconnected(controller) {
    console.log('Controle desconectado');
  }

  onSelectStart(event) {
    const controller = event.target;
    const intersections = this.getIntersections(controller);

    if (intersections.length > 0) {
      const intersection = intersections[0];
      const object = intersection.object;

      if (object.userData.interactive) {
        // Pegar objeto
        object.userData.grabbed = true;
        controller.attach(object);
        controller.userData.selected = object;

        // Vibração de feedback
        this.triggerHapticFeedback(controller, 0.5, 50);
      }
    }
  }

  onSelectEnd(event) {
    const controller = event.target;
    const selected = controller.userData.selected;

    if (selected) {
      // Soltar objeto
      selected.userData.grabbed = false;
      this.scene.attach(selected);
      controller.userData.selected = null;

      // Aplicar física
      const velocity = controller.userData.velocity || new THREE.Vector3();
      selected.userData.velocity.copy(velocity).multiplyScalar(5);
    }
  }

  onSqueeze(event) {
    const controller = event.target;

    // Ação secundária (ex: deletar objeto)
    const selected = controller.userData.selected;
    if (selected) {
      this.scene.remove(selected);
      controller.userData.selected = null;

      // Vibração forte
      this.triggerHapticFeedback(controller, 1.0, 100);
    }
  }

  getIntersections(controller) {
    const tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);

    const raycaster = new THREE.Raycaster();
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const objects = this.scene.children.filter(
      (child) => child.userData.interactive === true
    );

    return raycaster.intersectObjects(objects);
  }

  triggerHapticFeedback(controller, intensity, duration) {
    if (controller.userData.haptic) {
      controller.userData.haptic.pulse(intensity, duration);
    }
  }

  // Hit testing para AR
  async setupHitTesting() {
    if (!this.xrSession.enabledFeatures?.includes('hit-test')) return;

    // Criar fonte de hit test
    const viewerSpace = await this.xrSession.requestReferenceSpace('viewer');
    this.hitTestSource = await this.xrSession.requestHitTestSource({
      space: viewerSpace,
      offsetRay: new XRRay(),
    });
  }

  processHitTest(frame) {
    if (!this.hitTestSource) return;

    const hitTestResults = frame.getHitTestResults(this.hitTestSource);

    if (hitTestResults.length > 0) {
      const hit = hitTestResults[0];
      const pose = hit.getPose(this.xrReferenceSpace);

      if (pose) {
        // Mostrar indicador de placement
        this.updatePlacementIndicator(pose.transform);

        return {
          position: pose.transform.position,
          orientation: pose.transform.orientation,
          matrix: pose.transform.matrix,
        };
      }
    }

    return null;
  }

  updatePlacementIndicator(transform) {
    if (!this.placementIndicator) {
      // Criar indicador de posicionamento
      const geometry = new THREE.RingGeometry(0.15, 0.2, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
      });
      this.placementIndicator = new THREE.Mesh(geometry, material);
      this.scene.add(this.placementIndicator);
    }

    // Atualizar posição e orientação
    const matrix = new THREE.Matrix4();
    matrix.fromArray(transform.matrix);
    this.placementIndicator.matrix.copy(matrix);
    this.placementIndicator.visible = true;
  }

  // Detecção de planos AR
  async setupPlaneDetection() {
    this.planes = new Map();

    // Listener para planos detectados
    this.xrSession.addEventListener('planedetected', (event) => {
      const plane = event.plane;
      this.onPlaneDetected(plane);
    });

    this.xrSession.addEventListener('planelost', (event) => {
      const plane = event.plane;
      this.onPlaneLost(plane);
    });
  }

  onPlaneDetected(plane) {
    console.log('Plano detectado:', plane);

    // Criar visualização do plano
    const planeMesh = this.createPlaneMesh(plane);
    this.planes.set(plane, planeMesh);
    this.scene.add(planeMesh);
  }

  onPlaneLost(plane) {
    console.log('Plano perdido:', plane);

    const planeMesh = this.planes.get(plane);
    if (planeMesh) {
      this.scene.remove(planeMesh);
      this.planes.delete(plane);
    }
  }

  createPlaneMesh(plane) {
    const geometry = new THREE.BufferGeometry();
    const vertices = plane.polygon
      .map((point) => [point.x, point.y, point.z])
      .flat();

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.computeBoundingBox();

    const material = new THREE.MeshBasicMaterial({
      color: 0x0080ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });

    return new THREE.Mesh(geometry, material);
  }

  // Estimativa de iluminação AR
  setupLightEstimation() {
    this.lightProbe = new XRLightProbe();

    this.xrSession.requestLightProbe().then((probe) => {
      this.lightProbe = probe;
      console.log('Light probe ativado');
    });
  }

  updateLightEstimation(frame) {
    if (!this.lightProbe) return;

    const estimate = frame.getLightEstimate(this.lightProbe);
    if (!estimate) return;

    // Atualizar iluminação da cena
    if (estimate.primaryLightDirection) {
      const direction = estimate.primaryLightDirection;
      this.directionalLight.position.set(direction.x, direction.y, direction.z);
    }

    if (estimate.primaryLightIntensity) {
      this.directionalLight.intensity = estimate.primaryLightIntensity.x;
    }

    // Spherical harmonics para iluminação ambiente
    if (estimate.sphericalHarmonicsCoefficients) {
      // Aplicar coeficientes SH à iluminação ambiente
      this.updateAmbientLighting(estimate.sphericalHarmonicsCoefficients);
    }
  }

  // Loop de renderização XR
  onXRFrame(time, frame) {
    if (!this.xrSession) return;

    // Solicitar próximo frame
    this.xrSession.requestAnimationFrame(this.onXRFrame.bind(this));

    // Obter pose do viewer
    const pose = frame.getViewerPose(this.xrReferenceSpace);
    if (!pose) return;

    // Processar hit test (AR)
    if (this.hitTestSource) {
      const hitResult = this.processHitTest(frame);
      if (hitResult) {
        // Atualizar indicador de posicionamento
      }
    }

    // Atualizar iluminação (AR)
    this.updateLightEstimation(frame);

    // Renderizar cada view (olho)
    const glLayer = this.xrSession.renderState.baseLayer;

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, glLayer.framebuffer);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    for (const view of pose.views) {
      const viewport = glLayer.getViewport(view);
      this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

      // Atualizar câmera
      this.camera.matrix.fromArray(view.transform.matrix);
      this.camera.projectionMatrix.fromArray(view.projectionMatrix);
      this.camera.updateMatrixWorld(true);

      // Renderizar cena
      this.renderer.render(this.scene, this.camera);
    }

    // Atualizar física
    this.updatePhysics(time);

    // Processar input dos controles
    this.processControllerInput(frame);
  }

  updatePhysics(time) {
    // Simular física simples para objetos
    this.scene.traverse((child) => {
      if (child.userData.velocity && !child.userData.grabbed) {
        // Aplicar velocidade
        child.position.add(
          child.userData.velocity.clone().multiplyScalar(0.016)
        );

        // Gravidade
        child.userData.velocity.y -= 0.5 * 0.016;

        // Colisão com chão
        if (child.position.y <= 0.1) {
          child.position.y = 0.1;
          child.userData.velocity.y *= -0.8; // Bounce

          // Fricção
          child.userData.velocity.x *= 0.95;
          child.userData.velocity.z *= 0.95;
        }
      }
    });
  }

  processControllerInput(frame) {
    for (const [index, controllerData] of this.controllers) {
      const inputSource = this.xrSession.inputSources[index];
      if (!inputSource || !inputSource.gamepad) continue;

      const gamepad = inputSource.gamepad;

      // Processar botões
      gamepad.buttons.forEach((button, buttonIndex) => {
        if (button.pressed) {
          this.onGamepadButtonPress(index, buttonIndex, button.value);
        }
      });

      // Processar axes (thumbsticks)
      if (gamepad.axes.length >= 2) {
        const x = gamepad.axes[0];
        const y = gamepad.axes[1];

        if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
          this.onThumbstickMove(index, x, y);
        }
      }
    }
  }

  onGamepadButtonPress(controllerIndex, buttonIndex, value) {
    // Mapear ações para botões
    switch (buttonIndex) {
      case 0: // Trigger
        console.log(`Trigger ${controllerIndex}: ${value}`);
        break;
      case 1: // Grip
        console.log(`Grip ${controllerIndex}: ${value}`);
        break;
      case 3: // Thumbstick press
        console.log(`Thumbstick press ${controllerIndex}`);
        break;
      case 4: // A/X button
        console.log(`A/X button ${controllerIndex}`);
        break;
      case 5: // B/Y button
        console.log(`B/Y button ${controllerIndex}`);
        break;
    }
  }

  onThumbstickMove(controllerIndex, x, y) {
    // Movimento de locomoção
    const speed = 0.05;
    const forward = new THREE.Vector3(0, 0, -1);
    const right = new THREE.Vector3(1, 0, 0);

    // Aplicar movimento baseado na orientação do controle
    const controller = this.controllers.get(controllerIndex).controller;
    forward.applyQuaternion(controller.quaternion);
    right.applyQuaternion(controller.quaternion);

    // Mover câmera/player
    this.camera.position.add(forward.multiplyScalar(y * speed));
    this.camera.position.add(right.multiplyScalar(x * speed));
  }

  // Captura de screenshot/vídeo em VR
  async captureXRScreenshot() {
    return new Promise((resolve) => {
      // Capturar próximo frame
      const captureFrame = (time, frame) => {
        const glLayer = this.xrSession.renderState.baseLayer;

        // Criar canvas para captura
        const canvas = document.createElement('canvas');
        canvas.width = glLayer.framebufferWidth;
        canvas.height = glLayer.framebufferHeight;

        const ctx = canvas.getContext('2d');

        // Copiar framebuffer
        const pixels = new Uint8Array(canvas.width * canvas.height * 4);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, glLayer.framebuffer);
        this.gl.readPixels(
          0,
          0,
          canvas.width,
          canvas.height,
          this.gl.RGBA,
          this.gl.UNSIGNED_BYTE,
          pixels
        );

        // Criar ImageData
        const imageData = new ImageData(
          new Uint8ClampedArray(pixels),
          canvas.width,
          canvas.height
        );

        ctx.putImageData(imageData, 0, 0);

        // Converter para blob
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };

      this.xrSession.requestAnimationFrame(captureFrame);
    });
  }

  // Finalizar sessão
  async endSession() {
    if (this.xrSession) {
      await this.xrSession.end();
      this.cleanup();
    }
  }

  cleanup() {
    // Limpar recursos
    this.controllers.clear();
    this.planes?.clear();
    this.hitTestSource = null;
    this.lightProbe = null;

    // Limpar Three.js
    this.scene?.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });

    this.renderer?.dispose();
  }
}

// Exemplo de aplicação WebXR completa
class VirtualShowroom {
  constructor() {
    this.xrManager = new WebXRExperienceManager();
    this.products = [];
    this.currentProduct = null;
  }

  async initialize() {
    await this.xrManager.checkXRSupport();

    // Criar UI
    this.createUI();

    // Carregar produtos
    await this.loadProducts();
  }

  createUI() {
    const container = document.getElementById('xr-controls');

    if (this.xrManager.supportedModes.vr) {
      const vrButton = document.createElement('button');
      vrButton.textContent = 'Entrar em VR';
      vrButton.onclick = () => this.startVR();
      container.appendChild(vrButton);
    }

    if (this.xrManager.supportedModes.ar) {
      const arButton = document.createElement('button');
      arButton.textContent = 'Ver em AR';
      arButton.onclick = () => this.startAR();
      container.appendChild(arButton);
    }
  }

  async startVR() {
    await this.xrManager.startVRSession();
    this.setupVirtualShowroom();
  }

  async startAR() {
    await this.xrManager.startARSession();
    this.setupARPlacement();
  }

  setupVirtualShowroom() {
    // Criar ambiente de showroom
    const room = this.createShowroomEnvironment();
    this.xrManager.scene.add(room);

    // Adicionar produtos
    this.displayProducts();

    // Adicionar interações
    this.setupInteractions();
  }

  createShowroomEnvironment() {
    const group = new THREE.Group();

    // Paredes
    const wallGeometry = new THREE.BoxGeometry(10, 3, 0.1);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // Parede frontal
    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.z = -5;
    group.add(frontWall);

    // Parede traseira
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = 5;
    group.add(backWall);

    // Paredes laterais
    const sideWallGeometry = new THREE.BoxGeometry(0.1, 3, 10);

    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    leftWall.position.x = -5;
    group.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    rightWall.position.x = 5;
    group.add(rightWall);

    // Prateleiras
    const shelfGeometry = new THREE.BoxGeometry(2, 0.05, 0.5);
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
        shelf.position.set(-3 + j * 3, 0.5 + i * 1, -4.5);
        group.add(shelf);
      }
    }

    return group;
  }

  async loadProducts() {
    // Simular carregamento de produtos
    this.products = [
      {
        id: 1,
        name: 'Smartphone XR',
        model: 'models/smartphone.glb',
        price: 999,
        description: 'Último modelo com suporte AR',
      },
      {
        id: 2,
        name: 'Laptop Pro',
        model: 'models/laptop.glb',
        price: 1999,
        description: 'Workstation portátil de alta performance',
      },
      {
        id: 3,
        name: 'Smart Watch',
        model: 'models/watch.glb',
        price: 399,
        description: 'Relógio inteligente com monitoramento de saúde',
      },
    ];

    // Carregar modelos 3D
    const loader = new THREE.GLTFLoader();

    for (const product of this.products) {
      try {
        const gltf = await loader.loadAsync(product.model);
        product.mesh = gltf.scene;
        product.mesh.userData = product;
      } catch (error) {
        // Criar placeholder se modelo não carregar
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const material = new THREE.MeshStandardMaterial({
          color: Math.random() * 0xffffff,
        });
        product.mesh = new THREE.Mesh(geometry, material);
        product.mesh.userData = product;
      }
    }
  }

  displayProducts() {
    this.products.forEach((product, index) => {
      const position = this.getProductPosition(index);
      product.mesh.position.copy(position);
      product.mesh.scale.setScalar(0.5);

      // Adicionar label
      const label = this.createProductLabel(product);
      label.position.copy(position);
      label.position.y += 0.3;

      this.xrManager.scene.add(product.mesh);
      this.xrManager.scene.add(label);
    });
  }

  getProductPosition(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;

    return new THREE.Vector3(-3 + col * 3, 0.7 + row * 1, -4.3);
  }

  createProductLabel(product) {
    // Criar sprite com texto
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;

    const context = canvas.getContext('2d');
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, 256, 128);

    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.textAlign = 'center';
    context.fillText(product.name, 128, 40);
    context.fillText(`$${product.price}`, 128, 80);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.5, 0.25, 1);

    return sprite;
  }

  setupInteractions() {
    // Adicionar raycasting para seleção
    this.xrManager.xrSession.addEventListener('select', (event) => {
      const controller = event.inputSource;
      const hit = this.performRaycast(controller);

      if (hit && hit.object.userData.id) {
        this.selectProduct(hit.object.userData);
      }
    });
  }

  selectProduct(product) {
    this.currentProduct = product;

    // Destacar produto
    product.mesh.material.emissive = new THREE.Color(0x00ff00);
    product.mesh.material.emissiveIntensity = 0.3;

    // Mostrar detalhes
    this.showProductDetails(product);

    // Vibração de feedback
    this.xrManager.triggerHapticFeedback(0.7, 50);
  }

  showProductDetails(product) {
    // Criar painel de informações 3D
    const panel = this.create3DInfoPanel(product);
    panel.position.set(0, 1.5, -2);
    this.xrManager.scene.add(panel);

    // Remover após 5 segundos
    setTimeout(() => {
      this.xrManager.scene.remove(panel);
    }, 5000);
  }
}
```

---

## ⚡ WebGPU - Computação Paralela de Alta Performance

WebGPU é a nova API de gráficos e computação que oferece acesso direto à GPU para renderização e computação paralela de alta performance.

```javascript
class WebGPUComputeEngine {
  constructor() {
    this.device = null;
    this.adapter = null;
    this.pipelines = new Map();
    this.buffers = new Map();
    this.bindGroups = new Map();
    this.commandEncoder = null;

    this.isInitialized = false;
  }

  async initialize() {
    // Verificar suporte WebGPU
    if (!navigator.gpu) {
      throw new Error('WebGPU não suportado neste navegador');
    }

    try {
      // Solicitar adaptador GPU
      this.adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance', // ou 'low-power'
        forceFallbackAdapter: false,
      });

      if (!this.adapter) {
        throw new Error('Nenhum adaptador GPU disponível');
      }

      // Obter informações do adaptador
      const info = await this.adapter.requestAdapterInfo();
      console.log('🎮 GPU Info:', info);
      console.log('Vendor:', info.vendor);
      console.log('Architecture:', info.architecture);
      console.log('Device:', info.device);
      console.log('Description:', info.description);

      // Listar features suportadas
      console.log('Features suportadas:');
      for (const feature of this.adapter.features) {
        console.log(' -', feature);
      }

      // Limites do hardware
      console.log('Limites:');
      console.log(
        ' - Max Texture Size:',
        this.adapter.limits.maxTextureDimension2D
      );
      console.log(' - Max Buffer Size:', this.adapter.limits.maxBufferSize);
      console.log(
        ' - Max Compute Workgroups:',
        this.adapter.limits.maxComputeWorkgroupsPerDimension
      );

      // Solicitar device
      this.device = await this.adapter.requestDevice({
        requiredFeatures: [
          'timestamp-query', // Para profiling
          'texture-compression-bc', // Compressão de textura
        ],
        requiredLimits: {
          maxTextureDimension2D: 8192,
          maxBufferSize: 268435456, // 256MB
          maxComputeWorkgroupStorageSize: 16384,
        },
      });

      // Configurar error handling
      this.device.addEventListener('uncapturederror', (event) => {
        console.error('WebGPU Error:', event.error);
      });

      this.isInitialized = true;
      console.log('✅ WebGPU inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar WebGPU:', error);
      throw error;
    }
  }

  // Criar compute pipeline
  createComputePipeline(name, shaderCode, workgroupSize = [64, 1, 1]) {
    const shaderModule = this.device.createShaderModule({
      label: `${name}_shader`,
      code: shaderCode,
    });

    const pipeline = this.device.createComputePipeline({
      label: name,
      layout: 'auto',
      compute: {
        module: shaderModule,
        entryPoint: 'main',
        constants: {
          workgroupSizeX: workgroupSize[0],
          workgroupSizeY: workgroupSize[1],
          workgroupSizeZ: workgroupSize[2],
        },
      },
    });

    this.pipelines.set(name, pipeline);
    return pipeline;
  }

  // Criar buffer GPU
  createBuffer(name, size, usage) {
    const buffer = this.device.createBuffer({
      label: name,
      size: size,
      usage: usage,
      mappedAtCreation: false,
    });

    this.buffers.set(name, buffer);
    return buffer;
  }

  // Upload de dados para GPU
  async uploadData(bufferName, data) {
    const buffer = this.buffers.get(bufferName);
    if (!buffer) throw new Error(`Buffer ${bufferName} não encontrado`);

    // Escrever dados no buffer
    this.device.queue.writeBuffer(buffer, 0, data);
  }

  // Download de dados da GPU
  async downloadData(bufferName, size) {
    const buffer = this.buffers.get(bufferName);
    if (!buffer) throw new Error(`Buffer ${bufferName} não encontrado`);

    // Criar buffer de staging para leitura
    const stagingBuffer = this.device.createBuffer({
      size: size,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    // Copiar dados
    const commandEncoder = this.device.createCommandEncoder();
    commandEncoder.copyBufferToBuffer(buffer, 0, stagingBuffer, 0, size);
    this.device.queue.submit([commandEncoder.finish()]);

    // Mapear e ler dados
    await stagingBuffer.mapAsync(GPUMapMode.READ);
    const copyArrayBuffer = stagingBuffer.getMappedRange();
    const data = new Float32Array(copyArrayBuffer).slice();
    stagingBuffer.unmap();
    stagingBuffer.destroy();

    return data;
  }

  // Sistema de partículas massivo
  createParticleSystem(numParticles = 1000000) {
    const particleSystem = {
      numParticles,
      buffers: {},
      pipeline: null,
      bindGroup: null,
    };

    // Shader de simulação de partículas
    const simulationShader = `
            struct Particle {
                position: vec3<f32>,
                velocity: vec3<f32>,
                life: f32,
                size: f32,
            }

            struct SimParams {
                deltaTime: f32,
                gravity: vec3<f32>,
                wind: vec3<f32>,
                bounds: vec3<f32>,
            }

            @group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
            @group(0) @binding(1) var<uniform> params: SimParams;

            @compute @workgroup_size(64)
            fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
                let index = global_id.x;
                if (index >= ${numParticles}u) {
                    return;
                }

                var particle = particles[index];

                // Aplicar forças
                particle.velocity += params.gravity * params.deltaTime;
                particle.velocity += params.wind * params.deltaTime;

                // Atualizar posição
                particle.position += particle.velocity * params.deltaTime;

                // Colisões com limites
                if (particle.position.x < -params.bounds.x || particle.position.x > params.bounds.x) {
                    particle.velocity.x *= -0.8;
                    particle.position.x = clamp(particle.position.x, -params.bounds.x, params.bounds.x);
                }

                if (particle.position.y < 0.0) {
                    particle.velocity.y *= -0.6;
                    particle.position.y = 0.0;

                    // Fricção no chão
                    particle.velocity.x *= 0.9;
                    particle.velocity.z *= 0.9;
                }

                if (particle.position.z < -params.bounds.z || particle.position.z > params.bounds.z) {
                    particle.velocity.z *= -0.8;
                    particle.position.z = clamp(particle.position.z, -params.bounds.z, params.bounds.z);
                }

                // Atualizar vida
                particle.life -= params.deltaTime;

                // Respawn se morreu
                if (particle.life <= 0.0) {
                    // Resetar partícula
                    particle.position = vec3<f32>(
                        (rand(vec2<f32>(f32(index), params.deltaTime)) - 0.5) * 10.0,
                        10.0 + rand(vec2<f32>(f32(index), params.deltaTime * 2.0)) * 5.0,
                        (rand(vec2<f32>(f32(index), params.deltaTime * 3.0)) - 0.5) * 10.0
                    );

                    particle.velocity = vec3<f32>(
                        (rand(vec2<f32>(f32(index), params.deltaTime * 4.0)) - 0.5) * 2.0,
                        -1.0,
                        (rand(vec2<f32>(f32(index), params.deltaTime * 5.0)) - 0.5) * 2.0
                    );

                    particle.life = 5.0 + rand(vec2<f32>(f32(index), params.deltaTime * 6.0)) * 5.0;
                    particle.size = 0.05 + rand(vec2<f32>(f32(index), params.deltaTime * 7.0)) * 0.1;
                }

                particles[index] = particle;
            }

            // Função de número aleatório
            fn rand(co: vec2<f32>) -> f32 {
                return fract(sin(dot(co, vec2<f32>(12.9898, 78.233))) * 43758.5453);
            }
        `;

    // Criar pipeline de simulação
    particleSystem.pipeline = this.createComputePipeline(
      'particleSimulation',
      simulationShader,
      [64, 1, 1]
    );

    // Criar buffers
    const particleSize = 8 * 4; // 8 floats por partícula
    const particleBufferSize = numParticles * particleSize;

    particleSystem.buffers.particles = this.createBuffer(
      'particles',
      particleBufferSize,
      GPUBufferUsage.STORAGE | GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    );

    particleSystem.buffers.simParams = this.createBuffer(
      'simParams',
      64, // Tamanho dos parâmetros uniformes
      GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    );

    // Inicializar partículas
    const initialParticles = new Float32Array(numParticles * 8);
    for (let i = 0; i < numParticles; i++) {
      const offset = i * 8;
      // Posição inicial aleatória
      initialParticles[offset + 0] = (Math.random() - 0.5) * 20; // x
      initialParticles[offset + 1] = Math.random() * 10 + 5; // y
      initialParticles[offset + 2] = (Math.random() - 0.5) * 20; // z

      // Velocidade inicial
      initialParticles[offset + 3] = (Math.random() - 0.5) * 2; // vx
      initialParticles[offset + 4] = -Math.random() * 2; // vy
      initialParticles[offset + 5] = (Math.random() - 0.5) * 2; // vz

      // Vida e tamanho
      initialParticles[offset + 6] = Math.random() * 5 + 5; // vida
      initialParticles[offset + 7] = Math.random() * 0.1 + 0.05; // tamanho
    }

    this.uploadData('particles', initialParticles);

    // Criar bind group
    particleSystem.bindGroup = this.device.createBindGroup({
      layout: particleSystem.pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: particleSystem.buffers.particles,
          },
        },
        {
          binding: 1,
          resource: {
            buffer: particleSystem.buffers.simParams,
          },
        },
      ],
    });

    // Método para atualizar simulação
    particleSystem.update = (deltaTime, gravity, wind) => {
      // Atualizar parâmetros
      const params = new Float32Array([
        deltaTime,
        0,
        0,
        0, // padding
        gravity.x,
        gravity.y,
        gravity.z,
        0, // gravity + padding
        wind.x,
        wind.y,
        wind.z,
        0, // wind + padding
        10,
        10,
        10,
        0, // bounds + padding
      ]);

      this.uploadData('simParams', params);

      // Executar simulação
      const commandEncoder = this.device.createCommandEncoder();
      const passEncoder = commandEncoder.beginComputePass();

      passEncoder.setPipeline(particleSystem.pipeline);
      passEncoder.setBindGroup(0, particleSystem.bindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();

      this.device.queue.submit([commandEncoder.finish()]);
    };

    return particleSystem;
  }

  // Neural Network na GPU
  createNeuralNetwork(layers) {
    const network = {
      layers: [],
      weights: [],
      biases: [],
      activations: [],
      pipelines: {},
    };

    // Shader para forward pass de camada densa
    const denseLayerShader = (inputSize, outputSize) => `
            @group(0) @binding(0) var<storage, read> input: array<f32>;
            @group(0) @binding(1) var<storage, read> weights: array<f32>;
            @group(0) @binding(2) var<storage, read> bias: array<f32>;
            @group(0) @binding(3) var<storage, read_write> output: array<f32>;

            @compute @workgroup_size(64)
            fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
                let outputIndex = global_id.x;
                if (outputIndex >= ${outputSize}u) {
                    return;
                }

                var sum: f32 = bias[outputIndex];

                // Multiplicação matriz-vetor
                for (var i = 0u; i < ${inputSize}u; i = i + 1u) {
                    let weightIndex = outputIndex * ${inputSize}u + i;
                    sum = sum + input[i] * weights[weightIndex];
                }

                // ReLU activation
                output[outputIndex] = max(0.0, sum);
            }
        `;

    // Criar camadas
    for (let i = 0; i < layers.length - 1; i++) {
      const inputSize = layers[i];
      const outputSize = layers[i + 1];

      // Criar buffers para pesos e bias
      const weightsBuffer = this.createBuffer(
        `weights_${i}`,
        inputSize * outputSize * 4,
        GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
      );

      const biasBuffer = this.createBuffer(
        `bias_${i}`,
        outputSize * 4,
        GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
      );

      // Inicializar pesos (Xavier initialization)
      const weights = new Float32Array(inputSize * outputSize);
      const scale = Math.sqrt(2.0 / inputSize);
      for (let j = 0; j < weights.length; j++) {
        weights[j] = (Math.random() * 2 - 1) * scale;
      }

      const biases = new Float32Array(outputSize);
      // Bias inicializado em zero

      this.uploadData(`weights_${i}`, weights);
      this.uploadData(`bias_${i}`, biases);

      network.weights.push(weightsBuffer);
      network.biases.push(biasBuffer);

      // Criar pipeline para esta camada
      const pipeline = this.createComputePipeline(
        `dense_layer_${i}`,
        denseLayerShader(inputSize, outputSize)
      );

      network.pipelines[`layer_${i}`] = pipeline;
    }

    // Criar buffers de ativação
    for (let i = 0; i < layers.length; i++) {
      const buffer = this.createBuffer(
        `activation_${i}`,
        layers[i] * 4,
        GPUBufferUsage.STORAGE |
          GPUBufferUsage.COPY_SRC |
          GPUBufferUsage.COPY_DST
      );

      network.activations.push(buffer);
    }

    // Forward pass
    network.forward = async (input) => {
      // Upload input
      await this.uploadData('activation_0', input);

      const commandEncoder = this.device.createCommandEncoder();

      // Executar cada camada
      for (let i = 0; i < layers.length - 1; i++) {
        const passEncoder = commandEncoder.beginComputePass();

        const pipeline = network.pipelines[`layer_${i}`];
        const bindGroup = this.device.createBindGroup({
          layout: pipeline.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: { buffer: network.activations[i] } },
            { binding: 1, resource: { buffer: network.weights[i] } },
            { binding: 2, resource: { buffer: network.biases[i] } },
            { binding: 3, resource: { buffer: network.activations[i + 1] } },
          ],
        });

        passEncoder.setPipeline(pipeline);
        passEncoder.setBindGroup(0, bindGroup);
        passEncoder.dispatchWorkgroups(Math.ceil(layers[i + 1] / 64));
        passEncoder.end();
      }

      this.device.queue.submit([commandEncoder.finish()]);

      // Retornar output
      const outputSize = layers[layers.length - 1];
      return await this.downloadData(
        `activation_${layers.length - 1}`,
        outputSize * 4
      );
    };

    return network;
  }

  // Ray Tracing na GPU
  createRayTracer(width, height) {
    const rayTracer = {
      width,
      height,
      pipeline: null,
      bindGroup: null,
      outputTexture: null,
      sceneBuffer: null,
    };

    // Shader de ray tracing
    const rayTracingShader = `
            struct Ray {
                origin: vec3<f32>,
                direction: vec3<f32>,
            }

            struct Sphere {
                center: vec3<f32>,
                radius: f32,
                color: vec3<f32>,
                emission: f32,
            }

            struct Camera {
                position: vec3<f32>,
                forward: vec3<f32>,
                right: vec3<f32>,
                up: vec3<f32>,
                fov: f32,
            }

            struct Scene {
                spheres: array<Sphere, 16>,
                numSpheres: u32,
                camera: Camera,
            }

            @group(0) @binding(0) var outputTexture: texture_storage_2d<rgba8unorm, write>;
            @group(0) @binding(1) var<storage, read> scene: Scene;
            @group(0) @binding(2) var<uniform> time: f32;

            @compute @workgroup_size(8, 8)
            fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
                let coords = vec2<i32>(global_id.xy);
                let dimensions = textureDimensions(outputTexture);

                if (coords.x >= dimensions.x || coords.y >= dimensions.y) {
                    return;
                }

                // Gerar ray da câmera
                let uv = vec2<f32>(coords) / vec2<f32>(dimensions) * 2.0 - 1.0;
                let aspectRatio = f32(dimensions.x) / f32(dimensions.y);

                var ray: Ray;
                ray.origin = scene.camera.position;
                ray.direction = normalize(
                    scene.camera.forward +
                    scene.camera.right * uv.x * aspectRatio * tan(scene.camera.fov * 0.5) +
                    scene.camera.up * uv.y * tan(scene.camera.fov * 0.5)
                );

                // Trace ray
                var color = vec3<f32>(0.0);
                var attenuation = vec3<f32>(1.0);

                for (var bounce = 0; bounce < 5; bounce = bounce + 1) {
                    var hitDistance = 1000000.0;
                    var hitSphere = -1;
                    var hitPoint: vec3<f32>;
                    var hitNormal: vec3<f32>;

                    // Teste de interseção com esferas
                    for (var i = 0u; i < scene.numSpheres; i = i + 1u) {
                        let sphere = scene.spheres[i];
                        let oc = ray.origin - sphere.center;
                        let a = dot(ray.direction, ray.direction);
                        let b = 2.0 * dot(oc, ray.direction);
                        let c = dot(oc, oc) - sphere.radius * sphere.radius;
                        let discriminant = b * b - 4.0 * a * c;

                        if (discriminant > 0.0) {
                            let t = (-b - sqrt(discriminant)) / (2.0 * a);
                            if (t > 0.001 && t < hitDistance) {
                                hitDistance = t;
                                hitSphere = i32(i);
                                hitPoint = ray.origin + ray.direction * t;
                                hitNormal = normalize(hitPoint - sphere.center);
                            }
                        }
                    }

                    // Se acertou algo
                    if (hitSphere >= 0) {
                        let sphere = scene.spheres[hitSphere];

                        // Adicionar emissão
                        color = color + attenuation * sphere.color * sphere.emission;

                        // Se não é emissor, continuar bouncing
                        if (sphere.emission < 0.01) {
                            // Gerar nova direção aleatória (difusa)
                            let r1 = rand(vec2<f32>(f32(coords.x * bounce), f32(coords.y)));
                            let r2 = rand(vec2<f32>(f32(coords.y * bounce), f32(coords.x)));

                            let theta = 2.0 * 3.14159 * r1;
                            let phi = acos(2.0 * r2 - 1.0);

                            let randomDir = vec3<f32>(
                                sin(phi) * cos(theta),
                                sin(phi) * sin(theta),
                                cos(phi)
                            );

                            // Garantir que está no hemisfério correto
                            if (dot(randomDir, hitNormal) < 0.0) {
                                randomDir = -randomDir;
                            }

                            ray.origin = hitPoint + hitNormal * 0.001;
                            ray.direction = randomDir;
                            attenuation = attenuation * sphere.color;
                        } else {
                            break;
                        }
                    } else {
                        // Sky color
                        let t = 0.5 * (ray.direction.y + 1.0);
                        let skyColor = mix(vec3<f32>(1.0, 1.0, 1.0), vec3<f32>(0.5, 0.7, 1.0), t);
                        color = color + attenuation * skyColor * 0.5;
                        break;
                    }
                }

                // Tone mapping e gamma correction
                color = color / (color + vec3<f32>(1.0));
                color = pow(color, vec3<f32>(1.0 / 2.2));

                textureStore(outputTexture, coords, vec4<f32>(color, 1.0));
            }

            fn rand(co: vec2<f32>) -> f32 {
                return fract(sin(dot(co, vec2<f32>(12.9898, 78.233))) * 43758.5453);
            }
        `;

    // Criar pipeline
    rayTracer.pipeline = this.createComputePipeline(
      'rayTracing',
      rayTracingShader,
      [8, 8, 1]
    );

    // Criar texture de output
    rayTracer.outputTexture = this.device.createTexture({
      size: [width, height],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_SRC,
    });

    // Criar buffer de cena
    const sceneSize = 16 * 32 + 64; // 16 esferas + câmera + metadata
    rayTracer.sceneBuffer = this.createBuffer(
      'scene',
      sceneSize,
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    );

    // Criar buffer de tempo
    rayTracer.timeBuffer = this.createBuffer(
      'time',
      4,
      GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    );

    // Método para renderizar
    rayTracer.render = (scene, time) => {
      // Upload scene data
      const sceneData = new Float32Array(sceneSize / 4);
      let offset = 0;

      // Esferas
      for (let i = 0; i < 16; i++) {
        if (i < scene.spheres.length) {
          const sphere = scene.spheres[i];
          sceneData[offset++] = sphere.center.x;
          sceneData[offset++] = sphere.center.y;
          sceneData[offset++] = sphere.center.z;
          sceneData[offset++] = sphere.radius;
          sceneData[offset++] = sphere.color.r;
          sceneData[offset++] = sphere.color.g;
          sceneData[offset++] = sphere.color.b;
          sceneData[offset++] = sphere.emission;
        } else {
          offset += 8;
        }
      }

      // Número de esferas
      sceneData[offset++] = scene.spheres.length;
      offset += 3; // padding

      // Câmera
      sceneData[offset++] = scene.camera.position.x;
      sceneData[offset++] = scene.camera.position.y;
      sceneData[offset++] = scene.camera.position.z;
      offset++; // padding

      sceneData[offset++] = scene.camera.forward.x;
      sceneData[offset++] = scene.camera.forward.y;
      sceneData[offset++] = scene.camera.forward.z;
      offset++; // padding

      sceneData[offset++] = scene.camera.right.x;
      sceneData[offset++] = scene.camera.right.y;
      sceneData[offset++] = scene.camera.right.z;
      offset++; // padding

      sceneData[offset++] = scene.camera.up.x;
      sceneData[offset++] = scene.camera.up.y;
      sceneData[offset++] = scene.camera.up.z;
      sceneData[offset++] = scene.camera.fov;

      this.uploadData('scene', sceneData);
      this.uploadData('time', new Float32Array([time]));

      // Criar bind group
      rayTracer.bindGroup = this.device.createBindGroup({
        layout: rayTracer.pipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: rayTracer.outputTexture.createView(),
          },
          {
            binding: 1,
            resource: { buffer: rayTracer.sceneBuffer },
          },
          {
            binding: 2,
            resource: { buffer: rayTracer.timeBuffer },
          },
        ],
      });

      // Executar ray tracing
      const commandEncoder = this.device.createCommandEncoder();
      const passEncoder = commandEncoder.beginComputePass();

      passEncoder.setPipeline(rayTracer.pipeline);
      passEncoder.setBindGroup(0, rayTracer.bindGroup);
      passEncoder.dispatchWorkgroups(
        Math.ceil(width / 8),
        Math.ceil(height / 8)
      );
      passEncoder.end();

      this.device.queue.submit([commandEncoder.finish()]);
    };

    return rayTracer;
  }

  // Simulação de fluidos (Lattice Boltzmann Method)
  createFluidSimulation(width, height) {
    const fluid = {
      width,
      height,
      gridSize: width * height,
      pipelines: {},
      buffers: {},
      bindGroups: {},
    };

    // Shader LBM para simulação de fluidos
    const lbmShader = `
            // D2Q9 lattice directions
            const e: array<vec2<f32>, 9> = array<vec2<f32>, 9>(
                vec2<f32>(0.0, 0.0),   // 0: rest
                vec2<f32>(1.0, 0.0),   // 1: right
                vec2<f32>(0.0, 1.0),   // 2: up
                vec2<f32>(-1.0, 0.0),  // 3: left
                vec2<f32>(0.0, -1.0),  // 4: down
                vec2<f32>(1.0, 1.0),   // 5: up-right
                vec2<f32>(-1.0, 1.0),  // 6: up-left
                vec2<f32>(-1.0, -1.0), // 7: down-left
                vec2<f32>(1.0, -1.0)   // 8: down-right
            );

            const w: array<f32, 9> = array<f32, 9>(
                4.0/9.0,  // 0
                1.0/9.0,  // 1
                1.0/9.0,  // 2
                1.0/9.0,  // 3
                1.0/9.0,  // 4
                1.0/36.0, // 5
                1.0/36.0, // 6
                1.0/36.0, // 7
                1.0/36.0  // 8
            );

            struct FluidCell {
                f: array<f32, 9>,  // Distribution functions
                rho: f32,          // Density
                ux: f32,           // Velocity x
                uy: f32,           // Velocity y
                obstacle: f32,     // Is obstacle
            }

            @group(0) @binding(0) var<storage, read> fluidIn: array<FluidCell>;
            @group(0) @binding(1) var<storage, read_write> fluidOut: array<FluidCell>;
            @group(0) @binding(2) var<uniform> params: SimulationParams;

            struct SimulationParams {
                width: u32,
                height: u32,
                viscosity: f32,
                force: vec2<f32>,
            }

            @compute @workgroup_size(8, 8)
            fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
                let x = global_id.x;
                let y = global_id.y;

                if (x >= params.width || y >= params.height) {
                    return;
                }

                let idx = y * params.width + x;
                var cell = fluidIn[idx];

                // Skip obstacles
                if (cell.obstacle > 0.5) {
                    fluidOut[idx] = cell;
                    return;
                }

                // Calculate macroscopic quantities
                var rho = 0.0;
                var ux = 0.0;
                var uy = 0.0;

                for (var i = 0; i < 9; i = i + 1) {
                    rho = rho + cell.f[i];
                    ux = ux + cell.f[i] * e[i].x;
                    uy = uy + cell.f[i] * e[i].y;
                }

                ux = ux / rho;
                uy = uy / rho;

                // Apply external force
                ux = ux + params.force.x;
                uy = uy + params.force.y;

                // Calculate equilibrium distribution
                let usqr = ux * ux + uy * uy;
                let tau = params.viscosity * 3.0 + 0.5;

                for (var i = 0; i < 9; i = i + 1) {
                    let eu = e[i].x * ux + e[i].y * uy;
                    let feq = w[i] * rho * (1.0 + 3.0 * eu + 4.5 * eu * eu - 1.5 * usqr);

                    // Collision step (BGK)
                    cell.f[i] = cell.f[i] - (cell.f[i] - feq) / tau;
                }

                // Streaming step
                var newCell: FluidCell;
                newCell.obstacle = 0.0;

                for (var i = 0; i < 9; i = i + 1) {
                    let nx = i32(x) + i32(e[i].x);
                    let ny = i32(y) + i32(e[i].y);

                    // Periodic boundary conditions
                    if (nx < 0) { nx = i32(params.width) - 1; }
                    if (nx >= i32(params.width)) { nx = 0; }
                    if (ny < 0) { ny = i32(params.height) - 1; }
                    if (ny >= i32(params.height)) { ny = 0; }

                    let nidx = u32(ny) * params.width + u32(nx);

                    // Bounce-back for obstacles
                    if (fluidIn[nidx].obstacle > 0.5) {
                        let opposite = getOpposite(i);
                        newCell.f[opposite] = cell.f[i];
                    } else {
                        newCell.f[i] = cell.f[i];
                    }
                }

                // Update macroscopic values
                newCell.rho = rho;
                newCell.ux = ux;
                newCell.uy = uy;

                fluidOut[idx] = newCell;
            }

            fn getOpposite(dir: i32) -> i32 {
                switch(dir) {
                    case 0: { return 0; }
                    case 1: { return 3; }
                    case 2: { return 4; }
                    case 3: { return 1; }
                    case 4: { return 2; }
                    case 5: { return 7; }
                    case 6: { return 8; }
                    case 7: { return 5; }
                    case 8: { return 6; }
                    default: { return 0; }
                }
            }
        `;

    // Criar pipeline de simulação
    fluid.pipelines.simulation = this.createComputePipeline(
      'fluidSimulation',
      lbmShader,
      [8, 8, 1]
    );

    // Criar buffers (double buffering)
    const cellSize = 15 * 4; // 15 floats per cell
    const totalSize = fluid.gridSize * cellSize;

    fluid.buffers.fluidA = this.createBuffer(
      'fluidA',
      totalSize,
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    );

    fluid.buffers.fluidB = this.createBuffer(
      'fluidB',
      totalSize,
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    );

    fluid.buffers.params = this.createBuffer(
      'fluidParams',
      32,
      GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    );

    // Inicializar fluido
    fluid.initialize = () => {
      const initialData = new Float32Array(fluid.gridSize * 15);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 15;

          // Inicializar com distribuição de equilíbrio
          const rho = 1.0;
          const ux = 0.0;
          const uy = 0.0;

          for (let i = 0; i < 9; i++) {
            initialData[idx + i] = rho / 9.0;
          }

          initialData[idx + 9] = rho; // density
          initialData[idx + 10] = ux; // velocity x
          initialData[idx + 11] = uy; // velocity y
          initialData[idx + 12] = 0; // not obstacle

          // Adicionar alguns obstáculos
          const cx = width / 2;
          const cy = height / 2;
          const r = Math.min(width, height) / 10;

          if ((x - cx) * (x - cx) + (y - cy) * (y - cy) < r * r) {
            initialData[idx + 12] = 1; // é obstáculo
          }
        }
      }

      this.uploadData('fluidA', initialData);
      this.uploadData('fluidB', initialData);
    };

    // Simular um passo
    fluid.step = (viscosity = 0.02, forceX = 0.0001, forceY = 0) => {
      const params = new Float32Array([
        width,
        height,
        viscosity,
        0,
        forceX,
        forceY,
        0,
        0,
      ]);

      this.uploadData('fluidParams', params);

      // Alternar buffers
      const useA = fluid.currentBuffer !== 'A';
      const inputBuffer = useA ? fluid.buffers.fluidA : fluid.buffers.fluidB;
      const outputBuffer = useA ? fluid.buffers.fluidB : fluid.buffers.fluidA;

      // Criar bind group
      const bindGroup = this.device.createBindGroup({
        layout: fluid.pipelines.simulation.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: inputBuffer } },
          { binding: 1, resource: { buffer: outputBuffer } },
          { binding: 2, resource: { buffer: fluid.buffers.params } },
        ],
      });

      // Executar simulação
      const commandEncoder = this.device.createCommandEncoder();
      const passEncoder = commandEncoder.beginComputePass();

      passEncoder.setPipeline(fluid.pipelines.simulation);
      passEncoder.setBindGroup(0, bindGroup);
      passEncoder.dispatchWorkgroups(
        Math.ceil(width / 8),
        Math.ceil(height / 8)
      );
      passEncoder.end();

      this.device.queue.submit([commandEncoder.finish()]);

      fluid.currentBuffer = useA ? 'B' : 'A';
    };

    return fluid;
  }

  // Processamento de imagem com filtros convolucionais
  createImageProcessor() {
    const processor = {
      pipelines: {},
      buffers: {},
      textures: {},
    };

    // Shader para convolução genérica
    const convolutionShader = `
            @group(0) @binding(0) var inputTexture: texture_2d<f32>;
            @group(0) @binding(1) var inputSampler: sampler;
            @group(0) @binding(2) var outputTexture: texture_storage_2d<rgba8unorm, write>;
            @group(0) @binding(3) var<storage, read> kernel: array<f32>;
            @group(0) @binding(4) var<uniform> kernelSize: u32;

            @compute @workgroup_size(8, 8)
            fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
                let coords = vec2<i32>(global_id.xy);
                let dimensions = textureDimensions(outputTexture);

                if (coords.x >= dimensions.x || coords.y >= dimensions.y) {
                    return;
                }

                let halfSize = i32(kernelSize) / 2;
                var color = vec4<f32>(0.0);
                var kernelSum = 0.0;

                // Aplicar convolução
                for (var ky = -halfSize; ky <= halfSize; ky = ky + 1) {
                    for (var kx = -halfSize; kx <= halfSize; kx = kx + 1) {
                        let sampleCoords = coords + vec2<i32>(kx, ky);
                        let kernelIdx = (ky + halfSize) * i32(kernelSize) + (kx + halfSize);
                        let weight = kernel[kernelIdx];

                        // Clamp nas bordas
                        let clampedCoords = clamp(sampleCoords, vec2<i32>(0), dimensions - 1);
                        let uv = vec2<f32>(clampedCoords) / vec2<f32>(dimensions);

                        color = color + textureSample(inputTexture, inputSampler, uv) * weight;
                        kernelSum = kernelSum + weight;
                    }
                }

                // Normalizar se necessário
                if (abs(kernelSum) > 0.001) {
                    color = color / kernelSum;
                }

                // Clamp e escrever
                color = clamp(color, vec4<f32>(0.0), vec4<f32>(1.0));
                textureStore(outputTexture, coords, color);
            }
        `;

    // Criar pipeline de convolução
    processor.pipelines.convolution = this.createComputePipeline(
      'convolution',
      convolutionShader
    );

    // Kernels predefinidos
    processor.kernels = {
      blur: new Float32Array([
        1 / 16,
        2 / 16,
        1 / 16,
        2 / 16,
        4 / 16,
        2 / 16,
        1 / 16,
        2 / 16,
        1 / 16,
      ]),

      sharpen: new Float32Array([0, -1, 0, -1, 5, -1, 0, -1, 0]),

      edgeDetect: new Float32Array([-1, -1, -1, -1, 8, -1, -1, -1, -1]),

      emboss: new Float32Array([-2, -1, 0, -1, 1, 1, 0, 1, 2]),

      gaussianBlur5x5: new Float32Array([
        1 / 256,
        4 / 256,
        6 / 256,
        4 / 256,
        1 / 256,
        4 / 256,
        16 / 256,
        24 / 256,
        16 / 256,
        4 / 256,
        6 / 256,
        24 / 256,
        36 / 256,
        24 / 256,
        6 / 256,
        4 / 256,
        16 / 256,
        24 / 256,
        16 / 256,
        4 / 256,
        1 / 256,
        4 / 256,
        6 / 256,
        4 / 256,
        1 / 256,
      ]),
    };

    // Aplicar filtro
    processor.applyFilter = async (imageData, filterName) => {
      const kernel = processor.kernels[filterName];
      if (!kernel) throw new Error(`Filtro '${filterName}' não encontrado`);

      const kernelSize = Math.sqrt(kernel.length);

      // Criar textura de entrada
      const inputTexture = this.device.createTexture({
        size: [imageData.width, imageData.height],
        format: 'rgba8unorm',
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      });

      // Upload da imagem
      this.device.queue.writeTexture(
        { texture: inputTexture },
        imageData.data,
        { bytesPerRow: imageData.width * 4 },
        [imageData.width, imageData.height]
      );

      // Criar textura de saída
      const outputTexture = this.device.createTexture({
        size: [imageData.width, imageData.height],
        format: 'rgba8unorm',
        usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_SRC,
      });

      // Criar sampler
      const sampler = this.device.createSampler({
        magFilter: 'linear',
        minFilter: 'linear',
      });

      // Criar buffer do kernel
      const kernelBuffer = this.device.createBuffer({
        size: kernel.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      });

      this.device.queue.writeBuffer(kernelBuffer, 0, kernel);

      // Criar buffer do tamanho do kernel
      const kernelSizeBuffer = this.device.createBuffer({
        size: 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      this.device.queue.writeBuffer(
        kernelSizeBuffer,
        0,
        new Uint32Array([kernelSize])
      );

      // Criar bind group
      const bindGroup = this.device.createBindGroup({
        layout: processor.pipelines.convolution.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: inputTexture.createView() },
          { binding: 1, resource: sampler },
          { binding: 2, resource: outputTexture.createView() },
          { binding: 3, resource: { buffer: kernelBuffer } },
          { binding: 4, resource: { buffer: kernelSizeBuffer } },
        ],
      });

      // Executar filtro
      const commandEncoder = this.device.createCommandEncoder();
      const passEncoder = commandEncoder.beginComputePass();

      passEncoder.setPipeline(processor.pipelines.convolution);
      passEncoder.setBindGroup(0, bindGroup);
      passEncoder.dispatchWorkgroups(
        Math.ceil(imageData.width / 8),
        Math.ceil(imageData.height / 8)
      );
      passEncoder.end();

      // Copiar resultado para buffer
      const outputBuffer = this.device.createBuffer({
        size: imageData.width * imageData.height * 4,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
      });

      commandEncoder.copyTextureToBuffer(
        { texture: outputTexture },
        { buffer: outputBuffer, bytesPerRow: imageData.width * 4 },
        [imageData.width, imageData.height]
      );

      this.device.queue.submit([commandEncoder.finish()]);

      // Ler resultado
      await outputBuffer.mapAsync(GPUMapMode.READ);
      const result = new Uint8Array(outputBuffer.getMappedRange());
      const resultCopy = new Uint8Array(result);
      outputBuffer.unmap();

      // Cleanup
      inputTexture.destroy();
      outputTexture.destroy();
      kernelBuffer.destroy();
      kernelSizeBuffer.destroy();
      outputBuffer.destroy();

      return new ImageData(
        new Uint8ClampedArray(resultCopy),
        imageData.width,
        imageData.height
      );
    };

    return processor;
  }
}

// Exemplo de uso prático: Engine de física com WebGPU
class WebGPUPhysicsEngine {
  constructor() {
    this.gpu = new WebGPUComputeEngine();
    this.bodies = [];
    this.constraints = [];
    this.world = {
      gravity: { x: 0, y: -9.81, z: 0 },
      bounds: { x: 100, y: 100, z: 100 },
    };
  }

  async initialize() {
    await this.gpu.initialize();

    // Criar pipeline de física
    this.createPhysicsPipeline();
  }

  createPhysicsPipeline() {
    const physicsShader = `
            struct RigidBody {
                position: vec3<f32>,
                rotation: vec4<f32>, // quaternion
                velocity: vec3<f32>,
                angularVelocity: vec3<f32>,
                mass: f32,
                invMass: f32,
                radius: f32,
                restitution: f32,
            }

            struct World {
                gravity: vec3<f32>,
                deltaTime: f32,
                bounds: vec3<f32>,
                damping: f32,
            }

            @group(0) @binding(0) var<storage, read_write> bodies: array<RigidBody>;
            @group(0) @binding(1) var<uniform> world: World;
            @group(0) @binding(2) var<storage, read_write> collisions: array<vec2<u32>>;

            @compute @workgroup_size(64)
            fn integrateVelocity(@builtin(global_invocation_id) id: vec3<u32>) {
                let idx = id.x;
                let numBodies = arrayLength(&bodies);

                if (idx >= numBodies) {
                    return;
                }

                var body = bodies[idx];

                if (body.invMass == 0.0) {
                    return; // Static body
                }

                // Apply gravity
                body.velocity += world.gravity * world.deltaTime;

                // Apply damping
                body.velocity *= (1.0 - world.damping * world.deltaTime);
                body.angularVelocity *= (1.0 - world.damping * 0.5 * world.deltaTime);

                // Integrate position
                body.position += body.velocity * world.deltaTime;

                // Integrate rotation
                let halfDt = world.deltaTime * 0.5;
                let dq = vec4<f32>(
                    body.angularVelocity.x * halfDt,
                    body.angularVelocity.y * halfDt,
                    body.angularVelocity.z * halfDt,
                    0.0
                );

                body.rotation = normalizeQuat(body.rotation + quatMultiply(dq, body.rotation));

                // Boundary collision
                if (abs(body.position.x) + body.radius > world.bounds.x) {
                    body.position.x = sign(body.position.x) * (world.bounds.x - body.radius);
                    body.velocity.x *= -body.restitution;
                }

                if (body.position.y - body.radius < 0.0) {
                    body.position.y = body.radius;
                    body.velocity.y *= -body.restitution;
                }

                if (abs(body.position.z) + body.radius > world.bounds.z) {
                    body.position.z = sign(body.position.z) * (world.bounds.z - body.radius);
                    body.velocity.z *= -body.restitution;
                }

                bodies[idx] = body;
            }

            @compute @workgroup_size(8, 8)
            fn detectCollisions(@builtin(global_invocation_id) id: vec3<u32>) {
                let i = id.x;
                let j = id.y;
                let numBodies = arrayLength(&bodies);

                if (i >= numBodies || j >= numBodies || i >= j) {
                    return;
                }

                let bodyA = bodies[i];
                let bodyB = bodies[j];

                let distance = length(bodyA.position - bodyB.position);
                let minDistance = bodyA.radius + bodyB.radius;

                if (distance < minDistance && distance > 0.001) {
                    // Collision detected
                    let collisionIdx = i * numBodies + j;
                    collisions[collisionIdx] = vec2<u32>(i, j);

                    // Resolve collision
                    let normal = normalize(bodyB.position - bodyA.position);
                    let penetration = minDistance - distance;

                    // Separate bodies
                    let totalInvMass = bodyA.invMass + bodyB.invMass;
                    if (totalInvMass > 0.0) {
                        let separation = normal * penetration / totalInvMass;
                        bodies[i].position -= separation * bodyA.invMass;
                        bodies[j].position += separation * bodyB.invMass;
                    }

                    // Calculate relative velocity
                    let relativeVel = bodyB.velocity - bodyA.velocity;
                    let velAlongNormal = dot(relativeVel, normal);

                    if (velAlongNormal > 0.0) {
                        return; // Velocities separating
                    }

                    // Calculate impulse
                    let e = min(bodyA.restitution, bodyB.restitution);
                    let impulse = (1.0 + e) * velAlongNormal / totalInvMass;
                    let impulseVector = impulse * normal;

                    // Apply impulse
                    bodies[i].velocity += impulseVector * bodyA.invMass;
                    bodies[j].velocity -= impulseVector * bodyB.invMass;
                }
            }

            fn normalizeQuat(q: vec4<f32>) -> vec4<f32> {
                let len = length(q);
                if (len > 0.0) {
                    return q / len;
                }
                return vec4<f32>(0.0, 0.0, 0.0, 1.0);
            }

            fn quatMultiply(a: vec4<f32>, b: vec4<f32>) -> vec4<f32> {
                return vec4<f32>(
                    a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
                    a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
                    a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
                    a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
                );
            }
        `;

    this.gpu.createComputePipeline('physics_integrate', physicsShader);
    this.gpu.createComputePipeline('physics_collisions', physicsShader);
  }

  addRigidBody(config) {
    const body = {
      position: config.position || { x: 0, y: 0, z: 0 },
      rotation: config.rotation || { x: 0, y: 0, z: 0, w: 1 },
      velocity: config.velocity || { x: 0, y: 0, z: 0 },
      angularVelocity: config.angularVelocity || { x: 0, y: 0, z: 0 },
      mass: config.mass || 1,
      invMass: config.mass ? 1 / config.mass : 0,
      radius: config.radius || 1,
      restitution: config.restitution || 0.8,
    };

    this.bodies.push(body);
    return this.bodies.length - 1;
  }

  async simulate(deltaTime) {
    if (this.bodies.length === 0) return;

    // Upload bodies data
    const bodiesData = new Float32Array(this.bodies.length * 20);
    let offset = 0;

    for (const body of this.bodies) {
      bodiesData[offset++] = body.position.x;
      bodiesData[offset++] = body.position.y;
      bodiesData[offset++] = body.position.z;
      offset++; // padding

      bodiesData[offset++] = body.rotation.x;
      bodiesData[offset++] = body.rotation.y;
      bodiesData[offset++] = body.rotation.z;
      bodiesData[offset++] = body.rotation.w;

      bodiesData[offset++] = body.velocity.x;
      bodiesData[offset++] = body.velocity.y;
      bodiesData[offset++] = body.velocity.z;
      offset++; // padding

      bodiesData[offset++] = body.angularVelocity.x;
      bodiesData[offset++] = body.angularVelocity.y;
      bodiesData[offset++] = body.angularVelocity.z;
      offset++; // padding

      bodiesData[offset++] = body.mass;
      bodiesData[offset++] = body.invMass;
      bodiesData[offset++] = body.radius;
      bodiesData[offset++] = body.restitution;
    }

    // Create/update buffers
    if (!this.bodiesBuffer) {
      this.bodiesBuffer = this.gpu.createBuffer(
        'bodies',
        bodiesData.byteLength,
        GPUBufferUsage.STORAGE |
          GPUBufferUsage.COPY_DST |
          GPUBufferUsage.COPY_SRC
      );
    }

    await this.gpu.uploadData('bodies', bodiesData);

    // Upload world data
    const worldData = new Float32Array([
      this.world.gravity.x,
      this.world.gravity.y,
      this.world.gravity.z,
      deltaTime,
      this.world.bounds.x,
      this.world.bounds.y,
      this.world.bounds.z,
      0.02, // damping
    ]);

    if (!this.worldBuffer) {
      this.worldBuffer = this.gpu.createBuffer(
        'world',
        worldData.byteLength,
        GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
      );
    }

    await this.gpu.uploadData('world', worldData);

    // Execute physics simulation
    // ... (criar bind groups e executar pipelines)

    // Download results
    const results = await this.gpu.downloadData(
      'bodies',
      bodiesData.byteLength
    );

    // Update bodies
    offset = 0;
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].position.x = results[offset++];
      this.bodies[i].position.y = results[offset++];
      this.bodies[i].position.z = results[offset++];
      offset++; // padding

      this.bodies[i].rotation.x = results[offset++];
      this.bodies[i].rotation.y = results[offset++];
      this.bodies[i].rotation.z = results[offset++];
      this.bodies[i].rotation.w = results[offset++];

      this.bodies[i].velocity.x = results[offset++];
      this.bodies[i].velocity.y = results[offset++];
      this.bodies[i].velocity.z = results[offset++];
      offset++; // padding

      this.bodies[i].angularVelocity.x = results[offset++];
      this.bodies[i].angularVelocity.y = results[offset++];
      this.bodies[i].angularVelocity.z = results[offset++];
      offset++; // padding

      offset += 4; // skip mass, invMass, radius, restitution
    }
  }
}
```

---

## 🔐 Web Crypto API - Criptografia Nativa no Navegador

A Web Crypto API fornece primitivas criptográficas de baixo nível para realizar operações de criptografia no navegador de forma segura e eficiente.

```javascript
class WebCryptoManager {
  constructor() {
    this.crypto = window.crypto || window.msCrypto;
    this.subtle = this.crypto.subtle;
    this.keys = new Map();
    this.algorithms = {
      AES_GCM: 'AES-GCM',
      AES_CBC: 'AES-CBC',
      RSA_OAEP: 'RSA-OAEP',
      RSA_PSS: 'RSA-PSS',
      ECDSA: 'ECDSA',
      ECDH: 'ECDH',
      PBKDF2: 'PBKDF2',
      SHA: 'SHA',
    };
  }

  // Gerar chaves simétricas (AES)
  async generateSymmetricKey(algorithm = 'AES-GCM', keyLength = 256) {
    try {
      const key = await this.subtle.generateKey(
        {
          name: algorithm,
          length: keyLength,
        },
        true, // extractable
        ['encrypt', 'decrypt']
      );

      const keyId = this.generateKeyId();
      this.keys.set(keyId, {
        key,
        algorithm,
        type: 'symmetric',
        created: new Date(),
      });

      console.log(`🔑 Chave simétrica ${algorithm}-${keyLength} gerada`);
      return { keyId, key };
    } catch (error) {
      console.error('Erro ao gerar chave simétrica:', error);
      throw error;
    }
  }

  // Criptografar dados com AES-GCM
  async encryptAESGCM(data, keyId) {
    const keyData = this.keys.get(keyId);
    if (!keyData || keyData.algorithm !== 'AES-GCM') {
      throw new Error('Chave inválida para AES-GCM');
    }

    try {
      // Gerar IV aleatório
      const iv = this.crypto.getRandomValues(new Uint8Array(12));

      // Converter dados para ArrayBuffer
      const encodedData = new TextEncoder().encode(
        typeof data === 'string' ? data : JSON.stringify(data)
      );

      // Criptografar
      const encrypted = await this.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv,
          tagLength: 128, // bits
        },
        keyData.key,
        encodedData
      );

      // Retornar dados criptografados com IV
      return {
        iv: this.arrayBufferToBase64(iv),
        data: this.arrayBufferToBase64(encrypted),
        algorithm: 'AES-GCM',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Erro ao criptografar:', error);
      throw error;
    }
  }

  // Descriptografar dados com AES-GCM
  async decryptAESGCM(encryptedData, keyId) {
    const keyData = this.keys.get(keyId);
    if (!keyData || keyData.algorithm !== 'AES-GCM') {
      throw new Error('Chave inválida para AES-GCM');
    }

    try {
      // Converter de base64
      const iv = this.base64ToArrayBuffer(encryptedData.iv);
      const data = this.base64ToArrayBuffer(encryptedData.data);

      // Descriptografar
      const decrypted = await this.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
          tagLength: 128,
        },
        keyData.key,
        data
      );

      // Converter resultado para string
      const decoded = new TextDecoder().decode(decrypted);

      // Tentar parsear como JSON
      try {
        return JSON.parse(decoded);
      } catch {
        return decoded;
      }
    } catch (error) {
      console.error('Erro ao descriptografar:', error);
      throw error;
    }
  }

  // Gerar par de chaves RSA
  async generateRSAKeyPair(keySize = 2048, usage = ['encrypt', 'decrypt']) {
    try {
      const keyPair = await this.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: keySize,
          publicExponent: new Uint8Array([1, 0, 1]), // 65537
          hash: 'SHA-256',
        },
        true,
        usage
      );

      const keyId = this.generateKeyId();
      this.keys.set(keyId, {
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        algorithm: 'RSA-OAEP',
        type: 'asymmetric',
        keySize,
        created: new Date(),
      });

      console.log(`🔐 Par de chaves RSA-${keySize} gerado`);
      return {
        keyId,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
      };
    } catch (error) {
      console.error('Erro ao gerar chaves RSA:', error);
      throw error;
    }
  }

  // Criptografar com chave pública RSA
  async encryptRSA(data, publicKey) {
    try {
      const encodedData = new TextEncoder().encode(
        typeof data === 'string' ? data : JSON.stringify(data)
      );

      // RSA tem limite de tamanho, verificar
      const maxSize = this.getMaxRSASize(publicKey);
      if (encodedData.byteLength > maxSize) {
        throw new Error(
          `Dados muito grandes para RSA. Máximo: ${maxSize} bytes`
        );
      }

      const encrypted = await this.subtle.encrypt(
        {
          name: 'RSA-OAEP',
        },
        publicKey,
        encodedData
      );

      return {
        data: this.arrayBufferToBase64(encrypted),
        algorithm: 'RSA-OAEP',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Erro ao criptografar com RSA:', error);
      throw error;
    }
  }

  // Descriptografar com chave privada RSA
  async decryptRSA(encryptedData, privateKey) {
    try {
      const data = this.base64ToArrayBuffer(encryptedData.data);

      const decrypted = await this.subtle.decrypt(
        {
          name: 'RSA-OAEP',
        },
        privateKey,
        data
      );

      const decoded = new TextDecoder().decode(decrypted);

      try {
        return JSON.parse(decoded);
      } catch {
        return decoded;
      }
    } catch (error) {
      console.error('Erro ao descriptografar com RSA:', error);
      throw error;
    }
  }

  // Assinar dados digitalmente
  async signData(data, privateKey, algorithm = 'RSA-PSS') {
    try {
      const encodedData = new TextEncoder().encode(
        typeof data === 'string' ? data : JSON.stringify(data)
      );

      let signAlgorithm;

      if (algorithm === 'RSA-PSS') {
        signAlgorithm = {
          name: 'RSA-PSS',
          saltLength: 32,
        };
      } else if (algorithm === 'ECDSA') {
        signAlgorithm = {
          name: 'ECDSA',
          hash: 'SHA-256',
        };
      } else {
        throw new Error('Algoritmo de assinatura não suportado');
      }

      const signature = await this.subtle.sign(
        signAlgorithm,
        privateKey,
        encodedData
      );

      return {
        signature: this.arrayBufferToBase64(signature),
        algorithm,
        data: this.arrayBufferToBase64(encodedData),
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Erro ao assinar dados:', error);
      throw error;
    }
  }

  // Verificar assinatura digital
  async verifySignature(signedData, publicKey) {
    try {
      const signature = this.base64ToArrayBuffer(signedData.signature);
      const data = this.base64ToArrayBuffer(signedData.data);

      let verifyAlgorithm;

      if (signedData.algorithm === 'RSA-PSS') {
        verifyAlgorithm = {
          name: 'RSA-PSS',
          saltLength: 32,
        };
      } else if (signedData.algorithm === 'ECDSA') {
        verifyAlgorithm = {
          name: 'ECDSA',
          hash: 'SHA-256',
        };
      }

      const isValid = await this.subtle.verify(
        verifyAlgorithm,
        publicKey,
        signature,
        data
      );

      return isValid;
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
      throw error;
    }
  }

  // Gerar hash criptográfico
  async generateHash(data, algorithm = 'SHA-256') {
    try {
      const encodedData = new TextEncoder().encode(
        typeof data === 'string' ? data : JSON.stringify(data)
      );

      const hashBuffer = await this.subtle.digest(algorithm, encodedData);

      return {
        hash: this.arrayBufferToHex(hashBuffer),
        algorithm,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Erro ao gerar hash:', error);
      throw error;
    }
  }

  // Derivar chave de senha (PBKDF2)
  async deriveKeyFromPassword(password, salt, iterations = 100000) {
    try {
      // Converter senha para chave
      const passwordKey = await this.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
      );

      // Gerar salt se não fornecido
      if (!salt) {
        salt = this.crypto.getRandomValues(new Uint8Array(16));
      } else if (typeof salt === 'string') {
        salt = this.base64ToArrayBuffer(salt);
      }

      // Derivar chave AES
      const derivedKey = await this.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: iterations,
          hash: 'SHA-256',
        },
        passwordKey,
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      );

      const keyId = this.generateKeyId();
      this.keys.set(keyId, {
        key: derivedKey,
        algorithm: 'AES-GCM',
        type: 'derived',
        salt: this.arrayBufferToBase64(salt),
        iterations,
        created: new Date(),
      });

      console.log(`🗝️ Chave derivada de senha gerada`);
      return {
        keyId,
        key: derivedKey,
        salt: this.arrayBufferToBase64(salt),
        iterations,
      };
    } catch (error) {
      console.error('Erro ao derivar chave:', error);
      throw error;
    }
  }

  // ECDH - Troca de chaves Diffie-Hellman com curvas elípticas
  async generateECDHKeyPair(curve = 'P-256') {
    try {
      const keyPair = await this.subtle.generateKey(
        {
          name: 'ECDH',
          namedCurve: curve, // P-256, P-384, P-521
        },
        true,
        ['deriveKey', 'deriveBits']
      );

      const keyId = this.generateKeyId();
      this.keys.set(keyId, {
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        algorithm: 'ECDH',
        curve,
        type: 'asymmetric',
        created: new Date(),
      });

      console.log(`🔗 Par de chaves ECDH (${curve}) gerado`);
      return {
        keyId,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
      };
    } catch (error) {
      console.error('Erro ao gerar chaves ECDH:', error);
      throw error;
    }
  }

  // Derivar chave compartilhada usando ECDH
  async deriveSharedSecret(privateKey, publicKey) {
    try {
      // Derivar bits compartilhados
      const sharedSecret = await this.subtle.deriveBits(
        {
          name: 'ECDH',
          public: publicKey,
        },
        privateKey,
        256 // bits
      );

      // Derivar chave AES da secret compartilhada
      const sharedKey = await this.subtle.importKey(
        'raw',
        sharedSecret,
        'HKDF',
        false,
        ['deriveKey']
      );

      // Derivar chave AES final
      const aesKey = await this.subtle.deriveKey(
        {
          name: 'HKDF',
          hash: 'SHA-256',
          salt: new Uint8Array(0),
          info: new TextEncoder().encode('AES-GCM-Key'),
        },
        sharedKey,
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      );

      const keyId = this.generateKeyId();
      this.keys.set(keyId, {
        key: aesKey,
        algorithm: 'AES-GCM',
        type: 'shared',
        created: new Date(),
      });

      console.log(`🤝 Chave compartilhada derivada`);
      return { keyId, key: aesKey };
    } catch (error) {
      console.error('Erro ao derivar chave compartilhada:', error);
      throw error;
    }
  }

  // Sistema de criptografia end-to-end
  async createE2ESession(recipientPublicKey) {
    const session = {
      id: this.generateSessionId(),
      created: new Date(),
      messages: [],
    };

    try {
      // Gerar par de chaves efêmero
      const ephemeralKeys = await this.generateECDHKeyPair();

      // Derivar chave compartilhada
      const sharedSecret = await this.deriveSharedSecret(
        ephemeralKeys.privateKey,
        recipientPublicKey
      );

      session.ephemeralPublicKey = ephemeralKeys.publicKey;
      session.sharedKeyId = sharedSecret.keyId;

      // Exportar chave pública efêmera para envio
      const exportedKey = await this.exportKey(ephemeralKeys.publicKey);
      session.ephemeralPublicKeyExported = exportedKey;

      console.log(`🔒 Sessão E2E criada: ${session.id}`);
      return session;
    } catch (error) {
      console.error('Erro ao criar sessão E2E:', error);
      throw error;
    }
  }

  // Criptografar mensagem E2E
  async encryptE2EMessage(message, session) {
    try {
      // Adicionar metadados à mensagem
      const messageData = {
        content: message,
        timestamp: Date.now(),
        sessionId: session.id,
        messageId: this.generateMessageId(),
      };

      // Criptografar com chave compartilhada
      const encrypted = await this.encryptAESGCM(
        messageData,
        session.sharedKeyId
      );

      // Adicionar à sessão
      session.messages.push({
        id: messageData.messageId,
        encrypted: encrypted,
        sent: new Date(),
      });

      return encrypted;
    } catch (error) {
      console.error('Erro ao criptografar mensagem E2E:', error);
      throw error;
    }
  }

  // Exportar chave
  async exportKey(key, format = 'spki') {
    try {
      const exported = await this.subtle.exportKey(format, key);

      if (format === 'raw') {
        return this.arrayBufferToBase64(exported);
      } else {
        // Para formatos SPKI e PKCS8
        return this.arrayBufferToBase64(exported);
      }
    } catch (error) {
      console.error('Erro ao exportar chave:', error);
      throw error;
    }
  }

  // Importar chave
  async importKey(
    keyData,
    format,
    algorithm,
    extractable = false,
    keyUsages = []
  ) {
    try {
      const keyBuffer = this.base64ToArrayBuffer(keyData);

      const key = await this.subtle.importKey(
        format,
        keyBuffer,
        algorithm,
        extractable,
        keyUsages
      );

      return key;
    } catch (error) {
      console.error('Erro ao importar chave:', error);
      throw error;
    }
  }

  // Sistema de autenticação com WebAuthn
  async createWebAuthnCredential(user) {
    try {
      // Criar challenge aleatório
      const challenge = this.crypto.getRandomValues(new Uint8Array(32));

      // Opções de criação
      const createOptions = {
        challenge: challenge,
        rp: {
          name: 'Minha Aplicação',
          id: window.location.hostname,
        },
        user: {
          id: new TextEncoder().encode(user.id),
          name: user.email,
          displayName: user.name,
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' }, // ES256
          { alg: -257, type: 'public-key' }, // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
        timeout: 60000,
        attestation: 'direct',
      };

      // Criar credencial
      const credential = await navigator.credentials.create({
        publicKey: createOptions,
      });

      // Processar resposta
      const credentialData = {
        id: credential.id,
        rawId: this.arrayBufferToBase64(credential.rawId),
        type: credential.type,
        response: {
          clientDataJSON: this.arrayBufferToBase64(
            credential.response.clientDataJSON
          ),
          attestationObject: this.arrayBufferToBase64(
            credential.response.attestationObject
          ),
        },
      };

      console.log('🔐 Credencial WebAuthn criada');
      return credentialData;
    } catch (error) {
      console.error('Erro ao criar credencial WebAuthn:', error);
      throw error;
    }
  }

  // Verificar assinatura WebAuthn
  async verifyWebAuthnAssertion(assertion, publicKey) {
    try {
      // Extrair dados da asserção
      const clientDataJSON = this.base64ToArrayBuffer(
        assertion.response.clientDataJSON
      );
      const authenticatorData = this.base64ToArrayBuffer(
        assertion.response.authenticatorData
      );
      const signature = this.base64ToArrayBuffer(assertion.response.signature);

      // Criar hash do clientDataJSON
      const clientDataHash = await this.subtle.digest(
        'SHA-256',
        clientDataJSON
      );

      // Concatenar authenticatorData + clientDataHash
      const signedData = new Uint8Array(
        authenticatorData.byteLength + clientDataHash.byteLength
      );
      signedData.set(new Uint8Array(authenticatorData), 0);
      signedData.set(
        new Uint8Array(clientDataHash),
        authenticatorData.byteLength
      );

      // Verificar assinatura
      const isValid = await this.subtle.verify(
        {
          name: 'ECDSA',
          hash: 'SHA-256',
        },
        publicKey,
        signature,
        signedData
      );

      return isValid;
    } catch (error) {
      console.error('Erro ao verificar asserção WebAuthn:', error);
      throw error;
    }
  }

  // Criptografia de arquivo grande com chunks
  async encryptLargeFile(file, keyId, onProgress) {
    const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
    const chunks = Math.ceil(file.size / CHUNK_SIZE);
    const encryptedChunks = [];

    const keyData = this.keys.get(keyId);
    if (!keyData) throw new Error('Chave não encontrada');

    try {
      for (let i = 0; i < chunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        // Ler chunk
        const arrayBuffer = await chunk.arrayBuffer();

        // Gerar IV único para cada chunk
        const iv = this.crypto.getRandomValues(new Uint8Array(12));

        // Criptografar chunk
        const encrypted = await this.subtle.encrypt(
          {
            name: 'AES-GCM',
            iv: iv,
            tagLength: 128,
          },
          keyData.key,
          arrayBuffer
        );

        encryptedChunks.push({
          index: i,
          iv: this.arrayBufferToBase64(iv),
          data: encrypted,
        });

        // Callback de progresso
        if (onProgress) {
          onProgress({
            current: i + 1,
            total: chunks,
            percentage: ((i + 1) / chunks) * 100,
          });
        }
      }

      // Criar metadados do arquivo
      const metadata = {
        filename: file.name,
        size: file.size,
        type: file.type,
        chunks: chunks,
        algorithm: 'AES-GCM',
        timestamp: Date.now(),
      };

      return {
        metadata,
        chunks: encryptedChunks,
      };
    } catch (error) {
      console.error('Erro ao criptografar arquivo:', error);
      throw error;
    }
  }

  // Utilitários
  generateKeyId() {
    return `key_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  arrayBufferToHex(buffer) {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  getMaxRSASize(publicKey) {
    // Estimar tamanho máximo baseado no tamanho da chave
    // RSA-OAEP com SHA-256 tem overhead de 66 bytes
    const keySize = publicKey.algorithm.modulusLength;
    return Math.floor(keySize / 8) - 66;
  }
}

// Exemplo prático: Sistema de mensagens seguras
class SecureMessagingSystem {
  constructor() {
    this.crypto = new WebCryptoManager();
    this.users = new Map();
    this.conversations = new Map();
  }

  async registerUser(userData) {
    try {
      // Gerar par de chaves para o usuário
      const rsaKeys = await this.crypto.generateRSAKeyPair(2048, [
        'encrypt',
        'decrypt',
      ]);
      const ecdhKeys = await this.crypto.generateECDHKeyPair('P-256');

      // Gerar chave de assinatura
      const signingKeys = await this.crypto.subtle.generateKey(
        {
          name: 'ECDSA',
          namedCurve: 'P-256',
        },
        true,
        ['sign', 'verify']
      );

      // Exportar chaves públicas
      const publicKeys = {
        rsa: await this.crypto.exportKey(rsaKeys.publicKey, 'spki'),
        ecdh: await this.crypto.exportKey(ecdhKeys.publicKey, 'spki'),
        signing: await this.crypto.exportKey(signingKeys.publicKey, 'spki'),
      };

      const user = {
        id: userData.id,
        name: userData.name,
        publicKeys,
        privateKeys: {
          rsa: rsaKeys.privateKey,
          ecdh: ecdhKeys.privateKey,
          signing: signingKeys.privateKey,
        },
        created: new Date(),
      };

      this.users.set(userData.id, user);

      console.log(`👤 Usuário registrado: ${userData.name}`);
      return {
        userId: userData.id,
        publicKeys,
      };
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }

  async startConversation(userId1, userId2) {
    const user1 = this.users.get(userId1);
    const user2 = this.users.get(userId2);

    if (!user1 || !user2) {
      throw new Error('Usuário não encontrado');
    }

    try {
      // Criar sessão E2E para cada direção
      const session1to2 = await this.crypto.createE2ESession(
        user2.privateKeys.ecdh
      );
      const session2to1 = await this.crypto.createE2ESession(
        user1.privateKeys.ecdh
      );

      const conversation = {
        id: `conv_${userId1}_${userId2}`,
        participants: [userId1, userId2],
        sessions: {
          [userId1]: session1to2,
          [userId2]: session2to1,
        },
        messages: [],
        created: new Date(),
      };

      this.conversations.set(conversation.id, conversation);

      console.log(`💬 Conversa iniciada entre ${user1.name} e ${user2.name}`);
      return conversation;
    } catch (error) {
      console.error('Erro ao iniciar conversa:', error);
      throw error;
    }
  }

  async sendMessage(conversationId, senderId, message) {
    const conversation = this.conversations.get(conversationId);
    const sender = this.users.get(senderId);

    if (!conversation || !sender) {
      throw new Error('Conversa ou usuário não encontrado');
    }

    try {
      // Obter sessão do remetente
      const session = conversation.sessions[senderId];

      // Criptografar mensagem
      const encrypted = await this.crypto.encryptE2EMessage(message, session);

      // Assinar mensagem
      const signature = await this.crypto.signData(
        encrypted,
        sender.privateKeys.signing,
        'ECDSA'
      );

      // Adicionar à conversa
      const messageData = {
        id: this.crypto.generateMessageId(),
        senderId,
        encrypted,
        signature,
        timestamp: Date.now(),
      };

      conversation.messages.push(messageData);

      console.log(`📨 Mensagem enviada na conversa ${conversationId}`);
      return messageData;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  }

  async receiveMessage(conversationId, recipientId, messageData) {
    const conversation = this.conversations.get(conversationId);
    const recipient = this.users.get(recipientId);
    const senderId = messageData.senderId;
    const sender = this.users.get(senderId);

    if (!conversation || !recipient || !sender) {
      throw new Error('Dados inválidos');
    }

    try {
      // Verificar assinatura
      const signatureValid = await this.crypto.verifySignature(
        messageData.signature,
        sender.privateKeys.signing // Na prática, seria a chave pública
      );

      if (!signatureValid) {
        throw new Error('Assinatura inválida');
      }

      // Descriptografar mensagem
      const session = conversation.sessions[senderId];
      const decrypted = await this.crypto.decryptAESGCM(
        messageData.encrypted,
        session.sharedKeyId
      );

      console.log(`📬 Mensagem recebida e verificada`);
      return {
        content: decrypted.content,
        timestamp: decrypted.timestamp,
        verified: true,
        sender: sender.name,
      };
    } catch (error) {
      console.error('Erro ao receber mensagem:', error);
      throw error;
    }
  }
}
```

---

## 🎯 Conclusão - O Poder das APIs Web Avançadas

Parabéns por chegar até aqui! Você agora domina um conjunto impressionante de tecnologias web avançadas:

### 🌟 O que você aprendeu:

1. **📹 WebRTC**

   - Comunicação P2P em tempo real
   - Videochamadas e compartilhamento de tela
   - Data channels para transferência de dados
   - Jogos multiplayer em tempo real

2. **🤖 WebAI**

   - Machine Learning no navegador
   - Processamento de imagem e vídeo
   - Análise de sentimentos
   - Redes neurais customizadas

3. **🔊 Web Audio API**

   - Síntese e processamento de áudio
   - Efeitos e filtros em tempo real
   - Espacialização 3D
   - Geração procedural de música

4. **📱 WebXR**

   - Realidade Virtual e Aumentada
   - Interações imersivas
   - Rastreamento de movimento
   - Experiências 3D interativas

5. **⚡ WebGPU**

   - Computação paralela massiva
   - Simulações físicas complexas
   - Ray tracing em tempo real
   - Processamento de imagem acelerado

6. **🔐 Web Crypto API**
   - Criptografia de nível militar
   - Comunicação segura E2E
   - Autenticação biométrica
   - Assinaturas digitais

### 🚀 Próximos Passos:

1. **Combine as tecnologias**: Crie aplicações que usam múltiplas APIs
2. **Otimize performance**: Use Web Workers e WASM quando necessário
3. **Pense em segurança**: Sempre valide e sanitize dados
4. **Teste em dispositivos**: Garanta compatibilidade cross-platform
5. **Contribua**: Participe da comunidade e compartilhe conhecimento

### 💡 Ideias de Projetos:

- **Metaverso Web**: Combine WebXR + WebRTC + WebGPU
- **Editor de Vídeo Online**: WebGPU + Web Audio + WebCodecs
- **Plataforma de Telemedicina**: WebRTC + WebCrypto + WebAI
- **Jogo Multiplayer VR**: WebXR + WebRTC + Web Audio
- **Sistema de IA Distribuída**: WebGPU + WebCrypto + WebRTC

### 🎓 Recursos Adicionais:

- MDN Web Docs
- W3C Specifications
- Chrome Developers
- WebGL/WebGPU Fundamentals
- Three.js Documentation

**Lembre-se**: A web moderna é incrivelmente poderosa. Com essas APIs, você pode criar experiências que rivalizam com aplicações nativas, tudo rodando no navegador!

**Continue explorando, criando e inovando! O futuro da web está em suas mãos! 🌐✨**
