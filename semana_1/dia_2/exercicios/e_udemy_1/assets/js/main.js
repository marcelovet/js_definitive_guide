const elementos = [
  { tag: 'p', texto: 'Frase 1' },
  { tag: 'div', texto: 'Frase 2' },
  { tag: 'footer', texto: 'Frase 3' },
  { tag: 'section', texto: 'Frase 4' },
];

const parentElement = document.querySelector('.container');

for (let i = 0; i < elementos.length; i++) {
  const toCreate = elementos[i];
  const child = document.createElement(toCreate.tag);
  child.textContent = toCreate.texto;
  parentElement.appendChild(child);
}
