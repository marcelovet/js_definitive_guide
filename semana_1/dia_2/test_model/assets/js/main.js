const pesoInput = document.querySelector('#peso');
const alturaInput = document.querySelector('#altura');
const form = document.querySelector('#form');
const result = document.querySelector('#result');

function isValidValue(inputValue) {
  if (isNaN(inputValue) || inputValue <= 0) {
    return false;
  }
  return true;
}

function getIMCLevel(imc) {
  if (imc < 18.5) {
    return { level: 'Abaixo do peso', background: 'var(--warning)' };
  }
  if (imc >= 18.5 && imc < 25) {
    return { level: 'Peso normal', background: 'var(--all-good)' };
  }
  if (imc >= 25 && imc < 30) {
    return { level: 'Sobrepeso', background: 'var(--warning)' };
  }
  if (imc >= 30 && imc < 35) {
    return { level: 'Obesidade grau 1', background: 'var(--warning)' };
  }
  if (imc >= 35 && imc < 40) {
    return { level: 'Obesidade grau 2', background: 'var(--warning)' };
  }
  return { level: 'Obesidade grau 3', background: 'var(--warning)' };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let peso = Number(pesoInput.value);
  let altura = Number(alturaInput.value);
  if (!isValidValue(peso)) {
    result.style.setProperty('background-color', 'var(--error)');
    return (result.textContent = 'Peso inválido');
  }
  if (!isValidValue(altura)) {
    result.style.setProperty('background-color', 'var(--error)');
    return (result.textContent = 'Altura inválida');
  }
  let imc = peso / altura ** 2;
  let { level, background } = getIMCLevel(imc);
  result.style.setProperty('background-color', background);
  result.textContent = `Seu IMC é ${imc.toFixed(2)} (${level})`;
});
