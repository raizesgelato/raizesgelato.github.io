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
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;
  let animationId = 0;

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
    const cardsPerView = getCardsPerView();
    return Math.max(0, items.length - cardsPerView);
  }

  function setPositionByIndex(withAnimation = true) {
    const stepWidth = getStepWidth();
    currentTranslate = currentIndex * -stepWidth;
    prevTranslate = currentTranslate;

    grid.style.transition = withAnimation ? 'transform 0.45s ease' : 'none';
    grid.style.transform = `translateX(${currentTranslate}px)`;
  }

  function nextSlide() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    setPositionByIndex(true);
  }

  function prevSlide() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    setPositionByIndex(true);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  function animation() {
    grid.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) {
      animationId = requestAnimationFrame(animation);
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function dragStart(event) {
    if (event.type === 'mousedown' && event.button !== 0) return;

    isDragging = true;
    startX = getPositionX(event);
    grid.style.transition = 'none';
    grid.classList.add('dragging');

    animationId = requestAnimationFrame(animation);
  }

  function dragMove(event) {
    if (!isDragging) return;

    const currentPosition = getPositionX(event);
    const diff = currentPosition - startX;
    currentTranslate = prevTranslate + diff;
  }

  function dragEnd() {
    if (!isDragging) return;

    isDragging = false;
    cancelAnimationFrame(animationId);
    grid.classList.remove('dragging');

    const movedBy = currentTranslate - prevTranslate;
    const threshold = Math.min(120, getCardWidth() * 0.2);
    const maxIndex = getMaxIndex();

    if (movedBy < -threshold) {
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    } else if (movedBy > threshold) {
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }

    setPositionByIndex(true);
  }

  grid.addEventListener('touchstart', dragStart, { passive: true });
  grid.addEventListener('touchmove', dragMove, { passive: true });
  grid.addEventListener('touchend', dragEnd);
  grid.addEventListener('touchcancel', dragEnd);

  grid.addEventListener('mousedown', dragStart);
  grid.addEventListener('mousemove', dragMove);
  grid.addEventListener('mouseup', dragEnd);
  grid.addEventListener('mouseleave', dragEnd);

  grid.addEventListener('dragstart', (e) => e.preventDefault());

  window.addEventListener('resize', () => {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    setPositionByIndex(false);
  });

  setPositionByIndex(false);
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