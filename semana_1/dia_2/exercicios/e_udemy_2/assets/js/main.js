const paragrafosDiv = document.querySelector('.paragrafos');
const paragrafos = document.querySelectorAll('p');
const estilosBody = getComputedStyle(document.body);
const background = estilosBody.backgroundColor;

for (const p of paragrafos) {
  p.style.backgroundColor = background;
  p.style.color = '#fff';
}
