const saboresPascoa = [
  {
    nome: 'Bolo de Cenoura Box',
    desc: 'Box especial com gelato e finalização indulgente para uma experiência única de Páscoa.',
    imagem: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    nome: 'Pistache Crunchy',
    desc: 'Gelato cremoso com notas marcantes de pistache e finalização crocante.',
    imagem: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    nome: 'Bananoff',
    desc: 'Uma combinação envolvente, cremosa e equilibrada, com toque especial da casa.',
    imagem: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    nome: 'Biscoff® Creamy',
    desc: 'Cremoso, intenso e indulgente, pensado para quem busca uma colherada memorável.',
    imagem: 'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=1200&q=80',
  },
  {
    nome: 'Chocolate Dubai',
    desc: 'Uma proposta sofisticada, com contraste de textura e um perfil de sabor marcante.',
    imagem: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
  },
];

function createCarousel({ items, gridId, prevId, nextId }) {
  const grid = document.getElementById(gridId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!grid || !prevBtn || !nextBtn || !Array.isArray(items) || items.length === 0) {
    return;
  }

  grid.innerHTML = '';

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'sabor-card';
    card.innerHTML = `
      <div class="sabor-card-image">
        <img src="${item.imagem}" alt="${item.nome}" />
      </div>
      <h3>${item.nome}</h3>
      <p>${item.desc}</p>
    `;
    grid.appendChild(card);
  });

  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1100) return 2;
    return 3;
  }

  function getMaxIndex() {
    const cardsPerView = getCardsPerView();
    return Math.max(0, items.length - cardsPerView);
  }

  function updateCarousel() {
    const firstCard = grid.querySelector('.sabor-card');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 32;
    const offset = currentIndex * (cardWidth + gap);

    grid.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener('click', () => {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    updateCarousel();
  });

  updateCarousel();
}

async function carregarSaboresGelato() {
  const response = await fetch('./sabores.json', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar sabores.json (${response.status})`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('O arquivo sabores.json não está em formato de lista');
  }

  return data.map((item) => ({
    nome: item.nome || 'Sem nome',
    desc: item.desc || 'Descrição em breve.',
    imagem:
      item.imagem ||
      'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=1000&q=80',
  }));
}

async function iniciarPagina() {
  createCarousel({
    items: saboresPascoa,
    gridId: 'pascoa-grid',
    prevId: 'pascoa-prev',
    nextId: 'pascoa-next',
  });

  try {
    const saboresGelato = await carregarSaboresGelato();

    createCarousel({
      items: saboresGelato,
      gridId: 'gelato-grid',
      prevId: 'gelato-prev',
      nextId: 'gelato-next',
    });
  } catch (error) {
    console.error('Erro ao carregar sabores do gelato:', error);

    createCarousel({
      items: [
        {
          nome: 'Pistache',
          desc: 'Cremoso, elegante e marcante, com aquele toque sofisticado que conquista na primeira colherada.',
          imagem: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=1000&q=80',
        },
        {
          nome: 'Chocolate Belga',
          desc: 'Intenso e aveludado, para quem ama um clássico com personalidade.',
          imagem: 'https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?auto=format&fit=crop&w=1000&q=80',
        },
        {
          nome: 'Fior di Latte',
          desc: 'Delicado, puro e perfeito para destacar a qualidade da base artesanal.',
          imagem: 'https://images.unsplash.com/photo-1629385701021-fcd568a74396?auto=format&fit=crop&w=1000&q=80',
        },
      ],
      gridId: 'gelato-grid',
      prevId: 'gelato-prev',
      nextId: 'gelato-next',
    });
  }
}

document.addEventListener('DOMContentLoaded', iniciarPagina);