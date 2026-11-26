const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    navigation.classList.remove('open');
  });
});

const filterButtons = document.querySelectorAll('.filter');
const clientCards = document.querySelectorAll('.client-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('active')) return;

    document.querySelector('.filter.active')?.classList.remove('active');
    filterButtons.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
    button.classList.add('active');

    const selected = button.dataset.filter;
    clientCards.forEach((card) => {
      card.classList.remove('is-entering');
      card.style.removeProperty('--stagger');
      const shouldShow = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !shouldShow);
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        clientCards.forEach((card, index) => {
          if (card.classList.contains('hidden')) return;
          card.style.setProperty('--stagger', `${index * 45}ms`);
          card.classList.add('is-entering');
        });
      });
    });
  });
});

clientCards.forEach((card) => {
  card.addEventListener('animationend', () => {
    card.classList.remove('is-entering');
    card.style.removeProperty('--stagger');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
