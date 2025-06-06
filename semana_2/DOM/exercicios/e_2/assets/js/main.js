// ELEMENTOS NO DOM
const newImageUrl = document.getElementById('newImageUrl');
const addImageBtn = document.getElementById('addImageBtn');
const gallery = document.getElementById('gallery');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const imgCount = document.getElementById('imgCount');

let currentPosition = 0;
let step = 20;
let moveInterval = null;

// função para adicionar cartão de imagem na galeria
function createCardImage(url) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.width = '18rem';

  const img = document.createElement('img');
  img.src = url;
  img.classList.add('card-img-top', 'img-thumbnail', 'rounded');
  img.style.maxHeight = '200px';
  img.style.maxWidth = '200px';

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardLabel = document.createElement('p');
  cardLabel.classList.add('card-text');
  cardLabel.textContent = 'A legenda será aqui incluída aqui...';

  const editBtn = document.createElement('button');
  editBtn.classList.add('btn', 'btn-primary');
  editBtn.textContent = 'Editar legenda';

  editBtn.addEventListener('click', () => {
    const newLabel = prompt('Digite a nova legenda');
    if (!newLabel) return;
    cardLabel.textContent = newLabel;
    img.alt = newLabel;
  });

  cardBody.appendChild(cardLabel);
  cardBody.appendChild(editBtn);

  card.appendChild(img);
  card.appendChild(cardBody);

  return card;
}

const descreaseFactor = (x) => 0.001 ** (1000 / x);

function calculateMovementLimits() {
  const galleryRect = gallery.getBoundingClientRect();
  const cards = document.querySelectorAll('#gallery .card');

  if (cards.length <= 1) return { maxPosition: 0, minPosition: 0 };

  let totalCardsHeight = 0;
  let visibleHeight = galleryRect.height;

  cards.forEach((card) => {
    totalCardsHeight +=
      card.offsetHeight + parseInt(getComputedStyle(card).marginBottom);
  });

  // Ajusta para considerar o espaçamento entre cards
  const cardSpacing = 30;
  totalCardsHeight += cards.length * cardSpacing;
  totalCardsHeight -= totalCardsHeight * descreaseFactor(cards.length);

  // Calcula posições máximas e mínimas baseadas na área visível
  const maxPosition = 0;
  const minPosition = -(totalCardsHeight - visibleHeight);

  return { maxPosition, minPosition };
}

// função para movimentar imagem na galeria
function galleryMove(direction) {
  if (
    typeof direction !== 'string' ||
    !(direction === 'up' || direction === 'down')
  ) {
    alert('Informe uma direção válida');
    return;
  }

  cards = document.querySelectorAll('#gallery .card');
  numOfCards = cards?.length || 0;

  if (numOfCards <= 1) return;

  const { maxPosition, minPosition } = calculateMovementLimits();
  const proposedPosition =
    currentPosition + (direction === 'up' ? step : -step);

  // Verifica se o movimento proposto está dentro dos limites
  if (proposedPosition > maxPosition && direction === 'up') {
    currentPosition = maxPosition;
    stopContinuousMove();
    return;
  }
  if (proposedPosition < minPosition && direction === 'down') {
    currentPosition = minPosition;
    stopContinuousMove();
    return;
  }

  currentPosition = proposedPosition;
  cards.forEach((card) => {
    card.style.transform = `translateY(${currentPosition}px)`;
  });
}

// Função para iniciar o movimento contínuo
function startContinuousMove(direction) {
  if (moveInterval) return; // Evita múltiplos intervalos

  galleryMove(direction); // Move imediatamente ao clicar
  moveInterval = setInterval(() => {
    galleryMove(direction);
    step *= 1.2;
  }, 100); // Ajuste este valor para controlar a velocidade do movimento
}

// Função para parar o movimento
function stopContinuousMove() {
  if (moveInterval) {
    clearInterval(moveInterval);
    moveInterval = null;
    step = 20;
  }
}

function validateURL(url) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

// Função para adicionar a imagem
function addImage() {
  newImageUrl.value = newImageUrl.value.trim();
  if (!newImageUrl.value || !validateURL(newImageUrl.value)) return;
  const card = createCardImage(newImageUrl.value);
  gallery.appendChild(card);
  imgCount.textContent = gallery.children.length;
}

// Adiciona evento de clique ao botão "Adicionar Imagem"
addImageBtn.addEventListener('click', addImage);

// Para movimento para cima
upButton.addEventListener('mousedown', () => startContinuousMove('up'));
upButton.addEventListener('mouseup', stopContinuousMove);
upButton.addEventListener('mouseleave', stopContinuousMove);

// Para movimento para cima
downButton.addEventListener('mousedown', () => startContinuousMove('down'));
downButton.addEventListener('mouseup', stopContinuousMove);
downButton.addEventListener('mouseleave', stopContinuousMove);

// listener para redimensionamento da janela
window.addEventListener('resize', () => {
  const { maxPosition, minPosition } = calculateMovementLimits();

  // Ajusta a posição atual se necessário
  if (currentPosition > maxPosition) {
    currentPosition = maxPosition;
  } else if (currentPosition < minPosition) {
    currentPosition = minPosition;
  }

  // Atualiza a posição dos cards
  const cards = document.querySelectorAll('#gallery .card');
  cards.forEach((card) => {
    card.style.transform = `translateY(${currentPosition}px)`;
  });
});
