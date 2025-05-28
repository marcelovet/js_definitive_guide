// Crie um sistema de logs que:
// 1. Use diferentes níveis (info, warn, error)
// 2. Formate timestamps automaticamente
// 3. Use cores no console (opcional)
// 4. Implemente type checking robusto
// 5. Use template literals para formatação

// Exemplo de uso esperado:
// log.info`Usuário ${usuario} fez login às ${new Date()}`;
// log.error`Falha ao processar ${arquivo}: ${erro}`;

// Versão inicial - somente com funções

function logger(strings, ...values) {
  const timestamp = new Date().toISOString();
  const level = values[0];
  const message = strings.reduce(
    (acc, str, i) => acc + str + (values[i + 1] || ''),
    ''
  );

  const colors = {
    INFO: '\x1b[36m',
    WARN: '\x1b[33m',
    ERROR: '\x1b[31m',
    RESET: '\x1b[0m',
  };

  return `${colors[level]}[${timestamp}] ${level}: ${message}${colors.RESET}`;
}

const log = {
  info: (strings, ...values) =>
    console.log(logger(strings, ...['INFO', ...values])),
  warn: (strings, ...values) =>
    console.log(logger(strings, ...['WARN', ...values])),
  error: (strings, ...values) =>
    console.log(logger(strings, ...['ERROR', ...values])),
};

log.info`Usuário ${'Fulano'} fez login às ${new Date()}`;
log.warn`Falha de autenticação para o usuário ${'Fulano'} às ${new Date()}`;
log.error`Múltiplas falhas de autenticação para o usuário ${'Fulano'} às ${new Date()}`;

arquivo = 'arquivo.txt';
erro = 'Erro desconhecido';
log.error`Falha ao processar ${arquivo}: ${erro}`;

// TODO: implementar versão com classes
