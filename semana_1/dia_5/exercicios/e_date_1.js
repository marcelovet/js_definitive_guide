/**
 * Crie uma função que:
 * 1. Receba uma data e um tipo de evento
 * 2. Formate a data conforme o contexto:
 *    - 'reuniao': formato completo com horário
 *    - 'aniversario': só data, formato amigável
 *    - 'deadline': data e hora, com urgência
 * 3. Considere o fuso horário brasileiro
 */

function formatarDataEvento(data, tipoEvento, locale = 'pt-BR') {
  let dataCorreta = new Date(data);
  if (isNaN(dataCorreta.getTime())) {
    throw new Error('Data inválida');
  }

  const opcoesBrasil = { timeZone: 'America/Sao_Paulo' };
  let dataFormatada;

  switch (tipoEvento) {
    case 'reuniao':
      dataFormatada = dataCorreta.toLocaleString(locale, {
        ...opcoesBrasil,
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return `📅 Reunião marcada para ${dataFormatada}`;
    case 'aniversario':
      dataFormatada = dataCorreta.toLocaleString(locale, {
        ...opcoesBrasil,
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      return `🎂 Aniversário: ${dataFormatada}`;
    case 'deadline':
      dataFormatada = dataCorreta.toLocaleString(locale, {
        ...opcoesBrasil,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      const agora = new Date();
      const horasRestantes = Math.ceil(
        (dataCorreta - agora) / (1000 * 60 * 60)
      );
      const urgencia =
        horasRestantes <= 24 ? '🚨 MUITO URGENTE!' : '⚠️ Urgente!';
      return `${urgencia} Prazo final em ${dataFormatada}`;
    default:
      dataFormatada = dataCorreta.toLocaleString(locale, opcoesBrasil);
      return dataFormatada;
  }
}

const evento = new Date('2024-01-15T14:30:00');
console.log(formatarDataEvento(evento, 'reuniao'));
console.log(formatarDataEvento(evento, 'aniversario'));
console.log(formatarDataEvento(evento, 'deadline'));
