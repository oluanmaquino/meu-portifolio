# Portfólio 2.0 — Luan Aquino

Site estático e responsivo, criado a partir do modelo HTML original, para hospedagem no **GitHub Pages**. Esta versão apresenta **Gestão de Obras v0.4.10** como destaque e **Projeto Questões (PQ)** como projeto adicional. Utiliza 12 capturas reais fornecidas pelo autor (7 de Gestão de Obras e 5 de Projeto Questões).

## O que contém

- Tema claro/escuro, com detecção da preferência do sistema e armazenamento no navegador.
- Apresentação inicial com bloco de código decorativo, sem foto pessoal.
- Seções: Início, Sobre mim, Projetos, Tecnologias, Formação e Contato.
- Galeria principal de Gestão de Obras com 7 capturas do computador; modal de Projeto Questões com 2 capturas desktop e 3 mobile.
- Links reais para o Projeto Questões e seu repositório público, e-mail, WhatsApp e Instagram. O Gestão de Obras é local e não recebe link fictício de demonstração ou código.
- Fundo de partículas discreto, desativado para quem prefere menos movimento.
- HTML, CSS e JavaScript puro, sem Node.js ou instalação de pacotes.
- `data/projetos.json` para facilitar a inclusão futura de novos projetos.

## Estrutura

```text
portfolio-luan-v2/
├── index.html                   Página principal
├── .nojekyll                    Impede processamento desnecessário do Jekyll
├── README.md                    Este guia
├── assets/
│   ├── icons/favicon.svg       Ícone do site
│   └── img/
│       ├── og-preview.png      Imagem para compartilhamento
│       └── gestao-obras/       Sete capturas reais e ícone em WebP
│       └── projeto-questoes/    Cinco capturas reais em WebP
├── css/
│   ├── variables.css           Paletas dos temas e tipografia
│   ├── styles.css              Componentes e estilo visual principal
│   └── responsive.css          Ajustes para tablets e celulares
├── data/
│   └── projetos.json           Informações e imagens dos projetos
└── js/
    ├── app.js                  Menu, galeria, lightbox e contato
    ├── theme.js                Alternância de tema
    ├── projects.js             Leitura do catálogo JSON e fallback offline
    └── animations.js           Entrada de seções e fundo de partículas
```

## Como visualizar no computador

**Opção simples:** abra `index.html` com duplo clique. A galeria do Projeto Questões também funciona neste modo, graças aos dados de segurança em `js/projects.js`.

**Opção indicada para desenvolvimento:** execute um servidor estático local. Se já tiver Python, por exemplo:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000/` no navegador. Não é necessário Node.js para este portfólio.

## Publicação no GitHub Pages

1. Crie um repositório público no GitHub para o portfólio, por exemplo `portfolio` (o nome fica a seu critério).
2. Extraia o ZIP e **envie o conteúdo da pasta `portfolio-luan-v2` à raiz do repositório**. O arquivo `index.html` precisa ficar na raiz, não dentro de outra pasta.
3. Acesse **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
4. Selecione a branch `main` e o diretório `/ (root)`, depois clique em **Save**.
5. Depois da publicação, o endereço será semelhante a `https://oluanmaquino.github.io/NOME-DO-REPOSITORIO/`.

Todos os caminhos de CSS, JS, dados e imagens são relativos para funcionar em repositórios de projeto.

> Para melhorar a prévia de links compartilhados, após conhecer o endereço final do portfólio, substitua `og:image` em `index.html` pelo endereço **absoluto** da imagem `assets/img/og-preview.png` (com `https://...`). A referência relativa já funciona na página, mas algumas redes sociais exigem uma URL absoluta para Open Graph.

## Como editar a primeira versão

- **Nome, formação, apresentação e contatos:** `index.html`.
- **Cores claras e escuras:** `css/variables.css`.
- **Visual de cada seção:** `css/styles.css`.
- **Layouts de celular:** `css/responsive.css`.
- **Conteúdo dos projetos:** `data/projetos.json`.
- **Imagens:** `assets/img/gestao-obras/` e `assets/img/projeto-questoes/`.

### Cadastrar mais projetos depois

1. Inclua novo objeto em `data/projetos.json` com um `id` único e campos equivalentes aos atuais.
2. Salve as imagens em `assets/img/NOME-DO-PROJETO/` e referencie pelos caminhos relativos.
3. Os projetos adicionais aparecerão na grade e poderão abrir um modal com descrições, tecnologias e capturas.
4. O **projeto principal** é o `gestao-obras`, fixado no destaque HTML. Para trocar o destaque, atualize `index.html` e o ID usado em `js/app.js`.
5. Para funcionar por duplo clique (`file://`), atualize também a cópia local em `js/projects.js` (em HTTP/HTTPS, a fonte principal é o JSON).

## Como foi criado o conteúdo do Gestão de Obras

- Capturas reais enviadas pelo autor em 24/10/2026 e descrição conferida com `Gestao-de-Obras-v0410.zip`.
- O arquivo original do programa e seu código **não estão incluídos no portfólio**. Apenas capturas e ícone visual público.
- Projeto local para Windows com servidor Node.js e persistência SQLite; apresentado como **em desenvolvimento**, não como SaaS público ou serviço pronto para produção.
- O suporte a janela independente vem de inicializador que tenta Microsoft Edge e Chrome, podendo recorrer ao navegador padrão.

## Privacidade

Este pacote **não contém o diploma em PDF**, documentos de identidade, códigos de autenticação, bancos de dados, código-fonte ou executável do Gestão de Obras. Trechos de nomes de clientes nas capturas foram desfocados para preservar a privacidade. Exibe apenas os contatos fornecidos para uso público e os dados acadêmicos essenciais.

## Checklist antes de publicar

- [ ] Verificar se deseja disponibilizar e-mail e WhatsApp publicamente.
- [ ] Conferir links do GitHub, Instagram e da plataforma Projeto Questões.
- [ ] Testar as imagens, o tema e o menu no celular.
- [ ] Confirmar que todas as capturas estão autorizadas para uso público.
- [ ] Se desejar, configurar domínio personalizado e ajustar URLs absolutas do Open Graph.

**Créditos:** Luan Aquino · 2026.
