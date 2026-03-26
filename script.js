const saboresPascoa = [
  {
    nome: 'Bolo de Cenoura',
    desc: 'Box em formato de cenoura, com gelato de cenoura e cobertura de brigadeiro belga. Finalizado com granulado.',
    imagem: 'assets/pascoa/cenoura.png',
  },
  {
    nome: 'Pistache Crunchy',
    desc: 'Casca branca, gelato de pistache e creme de pistache crunch. Finalizado com crumbs de pistache.',
    imagem: 'assets/pascoa/pistache.png',
  },
  {
    nome: 'Bananoff',
    desc: 'Casca branca, gelato de banana, camada de doce de leite e Biscoff®. Finalizado com crumbs de Biscoff®.',
    imagem: 'assets/pascoa/bananoff.png',
  },
  {
    nome: 'Biscoff® Creamy',
    desc: 'Casca preta, gelato Biscoff® e creamy de Biscoff®. Finalizado com crumbs de Biscoff®.',
    imagem: 'assets/pascoa/biscoff.png',
  },
  {
    nome: 'Chocolate Dubai',
    desc: 'Casca preta, gelato de chocolate belga Callebaut®, creme de pistache com kadaif. Finalizado com crumbs de pistache.',
    imagem: 'assets/pascoa/dubai.png',
  },
  {
    nome: 'Nocciola',
    desc: 'Casca preta, gelato de creme de avelã, ganache de chocolate com avelã. Finalizado com avelã torrada.',
    imagem: 'assets/pascoa/nocciola.png',
  },
  {
    nome: 'Choco & Brownie',
    desc: 'Casca preta, gelato de chocolate belga Callebaut® com brownie artesanal. Finalizado com pedaços de brownie.',
    imagem: 'assets/pascoa/chocobrownie.png',
  },
];


const saboresGelato = [
  {
    nome: 'Pistache',
    desc: 'Gelato de pistache',
    imagem: 'assets/sabores/pistache.png',
  },
   {
    nome: 'Fragola',
    desc: 'Sorbet de morango a base de água',
    imagem: 'assets/sabores/fragola.png',
  },
  {
    nome: 'Doce de Leite',
    desc: 'Gelato de Doce de Leite',
    imagem: 'assets/sabores/doceleite.png',
  },
    {
    nome: 'Mousse de Limão',
    desc: 'Gelato de limão siciliano e leite condensado',
    imagem: 'assets/sabores/mousse.png',
  },
  {
    nome: 'Maracuja & Amora',
    desc: 'Sorbet de maracujá a base de água com calda de amora',
    imagem: 'assets/sabores/maracuja.png',
  },
    {
    nome: 'Cocco',
    desc: 'Gelato de coco e leite condensado',
    imagem: 'assets/sabores/coco.png',
  },
  {
    nome: 'Chocolate Belga',
    desc: 'Gelato de Chocolate Belga',
    imagem: 'assets/pattern-raizes.jpeg',
  },
  {
    nome: 'Fior di Latte',
    desc: 'Gelato de Leite',
   imagem: 'assets/sabores/pattern-raizes.jpeg',
  },
  {
    nome: 'Choco & Brownie',
    desc: 'Gelato de Chocolate Belga e Brownie',
    imagem: 'assets/pattern-raizes.jpeg',
  },
  {
    nome: 'Abacate',
    desc: 'Gelato de Abacate',
    imagem: 'assets/pattern-raizes.jpeg',
  },
  {
    nome: 'Mango',
    desc: 'Sorbet de Manga a base de água',
    imagem: 'assets/pattern-raizes.jpeg',
  },
  {
    nome: 'Cocada Queimada',
    desc: 'Gelato de coco, leite condensado e cocada queimada',
    imagem: 'assets/pattern-raizes.jpeg',
  },
  {
    nome: 'Biscoff',
    desc: 'Gelato de Biscoito Belga com Especiarias',
    imagem: 'assets/pattern-raizes.jpeg',
  }
  
];

function createCarousel({
  items,
  gridId,
  prevId,
  nextId
}) {
  const grid = document.getElementById(gridId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!grid || !prevBtn || !nextBtn) return;

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

createCarousel({
  items: saboresPascoa,
  gridId: 'pascoa-grid',
  prevId: 'pascoa-prev',
  nextId: 'pascoa-next'
});

createCarousel({
  items: saboresGelato,
  gridId: 'gelato-grid',
  prevId: 'gelato-prev',
  nextId: 'gelato-next'
});