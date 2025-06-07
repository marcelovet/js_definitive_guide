const eventTypeElement = document.querySelector('#eventType');
const eventDateTimeElement = document.querySelector('#eventDateTime');
const form = document.querySelector('#form');
const scheduleElement = document.querySelector('#schedule');
const errorElement = document.querySelector('#form-error');

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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    const scheduleItemText = formatarDataEvento(
      eventDateTimeElement.value,
      eventTypeElement.value
    );
    const scheduleItem = document.createElement('li');
    scheduleItem.textContent = scheduleItemText;
    scheduleElement.appendChild(scheduleItem);
  } catch (error) {
    errorElement.textContent = error.toLocaleString();
  }
});
