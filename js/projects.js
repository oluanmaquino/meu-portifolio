/**
 * Projeto Questões / futuros projetos
 * Fonte principal: data/projetos.json (GitHub Pages e servidores estáticos).
 * A cópia mínima abaixo permite que a galeria funcione também ao abrir
 * index.html diretamente pelo Explorador do Windows (protocolo file://).
 * Para adicionar projetos, atualize data/projetos.json. Consulte README.md.
 */
(function () {
  'use strict';

  const BASE = 'assets/img/projeto-questoes/';
  const offlineImages = [
    ['desktop-banco.webp', 'Banco de questões', 'Área administrativa · banco de questões, busca e filtros', 'desktop', 'Captura real da área administrativa do Projeto Questões no computador'],
    ['desktop-dashboard.webp', 'Painel de desempenho', 'Área de estudos · indicadores e histórico do aluno', 'desktop', 'Captura real do painel de desempenho do Projeto Questões no computador'],
    ['mobile-dashboard.webp', 'Dashboard no celular', 'Visão geral · experiência para dispositivos móveis', 'mobile', 'Captura real do painel de desempenho do Projeto Questões em celular'],
    ['mobile-questoes.webp', 'Prática de questões', 'Resolução de questões · alternativas e conferência de resposta', 'mobile', 'Captura real de uma questão com alternativas A a E no Projeto Questões para celular'],
    ['mobile-menu.webp', 'Navegação mobile', 'Menu lateral · módulos de estudo e administração', 'mobile', 'Captura real do menu mobile do Projeto Questões']
  ];
  const localFallback = [{
    id: 'projeto-questoes',
    name: 'Projeto Questões',
    category: 'Educação e tecnologia',
    summary: 'Plataforma web de questões, simulados, flashcards e acompanhamento de desempenho.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'JSON'],
    urls: {live: 'https://oluanmaquino.github.io/ProjetoQuestoes/', repository: 'https://github.com/oluanmaquino/ProjetoQuestoes'},
    images: offlineImages.map(function (parts) {
      return {src: BASE + parts[0], label: parts[1], caption: parts[2], device: parts[3], alt: parts[4]};
    })
  }];

  async function load() {
    if (window.location.protocol === 'file:') return localFallback;
    try {
      const result = await fetch('data/projetos.json', {cache: 'no-cache'});
      if (!result.ok) throw new Error('Falha ao abrir projetos.json: ' + result.status);
      const data = await result.json();
      if (!data || !Array.isArray(data.projects) || data.projects.length === 0) {
        throw new Error('O JSON não possui projetos válidos.');
      }
      return data.projects;
    } catch (error) {
      console.warn('Usando a galeria local de segurança:', error);
      return localFallback;
    }
  }

  window.SiteProjects = {load: load};
}());
