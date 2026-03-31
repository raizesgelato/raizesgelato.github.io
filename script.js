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
    imagem: 'assets/sabores/belga.png',
  },
  {
    nome: 'Fior di Latte',
    desc: 'Gelato de Leite',
   imagem: 'assets/sabores/fiordilatte.png',
  },
  {
    nome: 'Choco & Brownie',
    desc: 'Gelato de Chocolate Belga e Brownie',
    imagem: 'assets/sabores/chocobrownie.png',
  },
  {
    nome: 'Abacate',
    desc: 'Gelato de Abacate',
    imagem: 'assets/sabores/abacate.png',
  },
  {
    nome: 'Mango',
    desc: 'Sorbet de Manga a base de água',
    imagem: 'assets/sabores/manga.png',
  },
  {
    nome: 'Cocada Queimada',
    desc: 'Gelato de coco, leite condensado e cocada queimada',
    imagem: 'assets/sabores/cocada.png',
  },
  {
    nome: 'Biscoff',
    desc: 'Gelato de Biscoito Belga com Especiarias',
    imagem: 'assets/sabores/biscoff.png',
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
        <img src="${item.imagem}" alt="${item.nome}" draggable="false" />
      </div>
      <h3>${item.nome}</h3>
      <p>${item.desc}</p>
    `;
    grid.appendChild(card);
  });

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let startTranslate = 0;

  function getCardsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1100) return 2;
    return 3;
  }

  function getGap() {
    const styles = window.getComputedStyle(grid);
    return parseInt(styles.gap || styles.columnGap || '32', 10) || 32;
  }

  function getCardWidth() {
    const firstCard = grid.querySelector('.sabor-card');
    return firstCard ? firstCard.offsetWidth : 0;
  }

  function getStepWidth() {
    return getCardWidth() + getGap();
  }

  function getMaxIndex() {
    return Math.max(0, items.length - getCardsPerView());
  }

  function updateCarousel(withAnimation = true) {
    const offset = currentIndex * getStepWidth();
    grid.style.transition = withAnimation ? 'transform 0.45s ease' : 'none';
    grid.style.transform = `translate3d(-${offset}px, 0, 0)`;
  }

  function nextSlide() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel(true);
  }

  function prevSlide() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel(true);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    isDragging = true;
    startX = e.clientX;
    currentX = e.clientX;
    startTranslate = -(currentIndex * getStepWidth());

    grid.style.transition = 'none';
    grid.classList.add('dragging');

    try {
      grid.setPointerCapture(e.pointerId);
    } catch (_) {}
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    currentX = e.clientX;
    const deltaX = currentX - startX;
    const translate = startTranslate + deltaX;
    grid.style.transform = `translate3d(${translate}px, 0, 0)`;
  }

  function onPointerEnd(e) {
    if (!isDragging) return;

    isDragging = false;
    grid.classList.remove('dragging');

    const deltaX = currentX - startX;
    const threshold = Math.min(100, getCardWidth() * 0.2);

    if (deltaX < -threshold) {
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    } else if (deltaX > threshold) {
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }

    try {
      grid.releasePointerCapture(e.pointerId);
    } catch (_) {}

    updateCarousel(true);
  }

  grid.addEventListener('pointerdown', onPointerDown);
  grid.addEventListener('pointermove', onPointerMove);
  grid.addEventListener('pointerup', onPointerEnd);
  grid.addEventListener('pointercancel', onPointerEnd);
  grid.addEventListener('lostpointercapture', onPointerEnd);

  grid.addEventListener('dragstart', (e) => e.preventDefault());

  window.addEventListener('resize', () => {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    updateCarousel(false);
  });

  updateCarousel(false);
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

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const overlay = document.getElementById('menu-overlay');

function openMenu() {
  menu.classList.add('active');
  overlay.classList.add('active');
  toggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menu.classList.remove('active');
  overlay.classList.remove('active');
  toggle.classList.remove('active');
  document.body.style.overflow = '';
}

toggle.addEventListener('click', (e) => {
  e.stopPropagation();

  if (menu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

/* evita clique fechar quando dentro do menu */
menu.addEventListener('click', (e) => {
  e.stopPropagation();
});

/* clicar fora fecha */
overlay.addEventListener('click', closeMenu);

/* links funcionam */
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      closeMenu();

      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 200);
    } else {
      closeMenu();
    }
  });
});