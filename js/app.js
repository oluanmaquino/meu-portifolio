/**
 * PORTFÓLIO LUAN 2.0 — comportamento geral.
 * Sem dependências: menu responsivo, navegação, galeria, modal, contatos
 * e grade opcional para projetos futuros cadastrados no arquivo JSON.
 */
(function () {
  'use strict';
  const $ = function (selector, root) { return (root || document).querySelector(selector); };
  const $$ = function (selector, root) { return Array.from((root || document).querySelectorAll(selector)); };
  const svg = function (name) {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#i-' + name);
    icon.append(use);
    return icon;
  };

  // Menu mobile
  const menuBtn = $('#mobile-menu-toggle');
  const mobileNav = $('#mobile-nav');
  const setMenu = function (open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menuBtn.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
    mobileNav.hidden = !open;
  };
  menuBtn.addEventListener('click', function () { setMenu(mobileNav.hidden); });
  $$('a', mobileNav).forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !mobileNav.hidden) { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener('click', function (event) {
    if (!mobileNav.hidden && !mobileNav.contains(event.target) && !menuBtn.contains(event.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 951px)').addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });

  // Destaca a seção atual no menu, sem disparar scroll extra.
  const navigation = $$('.desktop-nav [data-nav]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      const visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      const active = visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0].target.id;
      navigation.forEach(function (link) {
        link.classList.toggle('nav-active', link.dataset.nav === active);
      });
    }, {rootMargin: '-18% 0px -56% 0px', threshold: [0, .1, .4]});
    $$('main section[id]').forEach(function (section) { observer.observe(section); });
  }

  $('#current-year').textContent = new Date().getFullYear();
  const toast = $('#toast');
  let toastTimer;
  function announce(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2900);
  }
  $('#copy-email').addEventListener('click', async function () {
    const email = this.dataset.email;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(email);
      $('#copy-label').textContent = 'E-mail copiado!';
      announce('E-mail copiado para a área de transferência.');
      setTimeout(function () { $('#copy-label').textContent = 'Copiar e-mail'; }, 2300);
    } catch (_) {
      // Sem permissão de clipboard, entrega o endereço para seleção manual.
      announce('E-mail para copiar: ' + email);
      $('#copy-label').textContent = email;
    }
  });

  // Galeria: 5 capturas reais que foram fornecidas pelo autor.
  let allImages = [];
  let filteredImages = [];
  let currentIndex = 0;
  let selectedDevice = 'all';
  const viewer = $('#gallery-viewer');
  const thumbnails = $('#gallery-thumbnails');
  const counter = $('#gallery-counter');
  const dialog = $('#lightbox');
  const lightboxImage = $('#lightbox-image');
  const title = $('#lightbox-title');
  const caption = $('#lightbox-caption');
  const position = $('#lightbox-position');
  const expand = $('#gallery-expand');
  let previousFocus = null;

  function displayImage(index) {
    if (!filteredImages.length) return;
    currentIndex = (index + filteredImages.length) % filteredImages.length;
    const item = filteredImages[currentIndex];
    viewer.replaceChildren();
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-screen ' + (item.device === 'mobile' ? 'mobile' : 'desktop');
    button.setAttribute('aria-label', 'Ampliar: ' + item.label);
    button.title = 'Clique para ampliar';
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    const overlay = document.createElement('span');
    overlay.className = 'gallery-zoom-overlay';
    overlay.append(svg('expand'));
    button.append(img, overlay);
    button.addEventListener('click', openLightbox);
    viewer.append(button);
    $$('button', thumbnails).forEach(function (thumb, thumbIndex) {
      const isCurrent = thumbIndex === currentIndex;
      thumb.classList.toggle('is-current', isCurrent);
      thumb.setAttribute('aria-pressed', String(isCurrent));
      if (isCurrent) thumb.setAttribute('aria-current', 'true');
      else thumb.removeAttribute('aria-current');
    });
    counter.textContent = item.label + ' · ' + (currentIndex + 1) + ' de ' + filteredImages.length;
    if (dialog.open) updateLightbox();
  }

  function updateThumbnails() {
    thumbnails.replaceChildren();
    filteredImages.forEach(function (item, index) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-thumb ' + (item.device === 'mobile' ? 'mobile' : 'desktop');
      button.setAttribute('aria-label', 'Ver captura: ' + item.label);
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = '';
      img.loading = 'lazy';
      const label = document.createElement('span');
      label.textContent = item.label;
      button.append(img, label);
      button.addEventListener('click', function () { displayImage(index); });
      thumbnails.append(button);
    });
    displayImage(0);
  }

  function applyFilter(device) {
    selectedDevice = device;
    filteredImages = allImages.filter(function (item) { return device === 'all' || item.device === device; });
    $$('.gallery-filter').forEach(function (button) {
      const current = button.dataset.device === device;
      button.classList.toggle('is-selected', current);
      button.setAttribute('aria-pressed', String(current));
    });
    if (!filteredImages.length) {
      viewer.textContent = 'Não há imagens para este dispositivo.';
      thumbnails.replaceChildren();
      expand.disabled = true;
      counter.textContent = 'Nenhuma captura disponível';
      return;
    }
    expand.disabled = false;
    updateThumbnails();
  }

  function updateLightbox() {
    const item = filteredImages[currentIndex];
    if (!item) return;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    title.textContent = item.label;
    caption.textContent = item.caption || '';
    position.textContent = (currentIndex + 1) + ' / ' + filteredImages.length;
  }
  function openLightbox() {
    if (!filteredImages.length) return;
    previousFocus = document.activeElement;
    updateLightbox();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    $('#lightbox-close').focus();
  }
  function closeLightbox() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    if (previousFocus && previousFocus.isConnected && typeof previousFocus.focus === 'function') previousFocus.focus();
  }
  $('#lightbox-close').addEventListener('click', closeLightbox);
  $('#lightbox-prev').addEventListener('click', function () { displayImage(currentIndex - 1); });
  $('#lightbox-next').addEventListener('click', function () { displayImage(currentIndex + 1); });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) closeLightbox(); });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') { event.preventDefault(); displayImage(currentIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); displayImage(currentIndex + 1); }
  });
  dialog.addEventListener('close', function () {
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  });
  expand.addEventListener('click', openLightbox);
  $$('.gallery-filter').forEach(function (button) {
    button.addEventListener('click', function () { applyFilter(button.dataset.device); });
  });

  // Quando mais projetos forem incluídos no JSON, mostrar automaticamente a
  // grade complementar. Cria nós DOM com textContent, sem injetar HTML externo.
  const otherContainer = $('#future-projects');
  const grid = $('#future-project-list');
  const search = $('#project-search');
  const empty = $('#project-empty');
  let others = [];
  function trustedUrl(url) {
    try {
      const u = new URL(url);
      return ['https:', 'http:'].includes(u.protocol) ? u.href : null;
    } catch (_) { return null; }
  }
  function renderOthers(query) {
    grid.replaceChildren();
    const term = query.trim().toLocaleLowerCase('pt-BR');
    const matches = others.filter(function (project) {
      return [project.name, project.category, project.summary].concat(project.technologies || [])
        .join(' ').toLocaleLowerCase('pt-BR').includes(term);
    });
    empty.hidden = matches.length > 0;
    matches.forEach(function (project) {
      const card = document.createElement('article');
      card.className = 'future-card';
      const first = Array.isArray(project.images) && project.images[0];
      if (first && first.src) {
        const img = document.createElement('img');
        img.src = first.src;
        img.alt = first.alt || ('Captura do sistema ' + project.name);
        img.loading = 'lazy';
        card.append(img);
      }
      const content = document.createElement('div');
      content.className = 'future-card-content';
      const category = document.createElement('span');
      category.className = 'micro-label';
      category.textContent = project.category || 'Projeto';
      const heading = document.createElement('h4');
      heading.textContent = project.name || 'Projeto sem nome';
      const description = document.createElement('p');
      description.textContent = project.summary || '';
      content.append(category, heading, description);
      if (project.urls && trustedUrl(project.urls.live)) {
        const link = document.createElement('a');
        link.href = trustedUrl(project.urls.live);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Abrir projeto ↗';
        content.append(link);
      }
      card.append(content);
      grid.append(card);
    });
  }
  search.addEventListener('input', function () { renderOthers(search.value); });

  // Carrega o catálogo com fallback para index.html aberto por duplo clique.
  window.SiteProjects.load().then(function (projects) {
    const mainProject = projects.find(function (project) { return project.id === 'projeto-questoes'; }) || projects[0];
    allImages = Array.isArray(mainProject.images) ? mainProject.images : [];
    applyFilter('all');
    $('#project-total').textContent = String(projects.length).padStart(2, '0') + (projects.length === 1 ? ' PROJETO PUBLICADO' : ' PROJETOS CADASTRADOS');
    others = projects.filter(function (project) { return project.id !== mainProject.id; });
    if (others.length > 0) {
      otherContainer.hidden = false;
      renderOthers('');
    }
  }).catch(function (error) {
    console.error('Não foi possível carregar os dados da galeria:', error);
    viewer.textContent = 'Não foi possível carregar a galeria. Confira a pasta data.';
  });
}());
