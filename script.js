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

  function getMaxScroll() {
    return grid.scrollWidth - grid.clientWidth;
  }

  function scrollNext() {
    const step = getStepWidth();
    const maxScroll = getMaxScroll();
    const next = grid.scrollLeft + step;

    if (next >= maxScroll - 5) {
      grid.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      grid.scrollBy({ left: step, behavior: 'smooth' });
    }
  }

  function scrollPrev() {
    const step = getStepWidth();
    const maxScroll = getMaxScroll();
    const prev = grid.scrollLeft - step;

    if (prev <= 5) {
      grid.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      grid.scrollBy({ left: -step, behavior: 'smooth' });
    }
  }

  prevBtn.addEventListener('click', scrollPrev);
  nextBtn.addEventListener('click', scrollNext);

  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  function pointerDown(e) {
    isDown = true;
    grid.classList.add('dragging');
    startX = e.pageX ?? e.clientX;
    startScrollLeft = grid.scrollLeft;
  }

  function pointerMove(e) {
    if (!isDown) return;
    const x = e.pageX ?? e.clientX;
    const walk = x - startX;
    grid.scrollLeft = startScrollLeft - walk;
  }

  function pointerUp() {
    if (!isDown) return;
    isDown = false;
    grid.classList.remove('dragging');

    const step = getStepWidth();
    const snapped = Math.round(grid.scrollLeft / step) * step;
    grid.scrollTo({ left: snapped, behavior: 'smooth' });
  }

  grid.addEventListener('mousedown', pointerDown);
  grid.addEventListener('mousemove', pointerMove);
  grid.addEventListener('mouseup', pointerUp);
  grid.addEventListener('mouseleave', pointerUp);

  grid.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    isDown = true;
    startX = touch.clientX;
    startScrollLeft = grid.scrollLeft;
    grid.classList.add('dragging');
  }, { passive: true });

  grid.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const touch = e.touches[0];
    const walk = touch.clientX - startX;
    grid.scrollLeft = startScrollLeft - walk;
  }, { passive: true });

  grid.addEventListener('touchend', pointerUp);
  grid.addEventListener('touchcancel', pointerUp);

  window.addEventListener('resize', () => {
    const step = getStepWidth();
    const snapped = Math.round(grid.scrollLeft / step) * step;
    grid.scrollTo({ left: snapped, behavior: 'auto' });
  });
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