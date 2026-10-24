# Portfólio 2.0 — Luan Aquino

Site estático e responsivo, criado a partir do modelo HTML original, para hospedagem no **GitHub Pages**. A versão inicial apresenta exclusivamente o **Projeto Questões** e utiliza **cinco capturas reais** fornecidas pelo autor.

## O que contém

- Tema claro/escuro, com detecção da preferência do sistema e armazenamento no navegador.
- Apresentação inicial com bloco de código decorativo, sem foto pessoal.
- Seções: Início, Sobre mim, Projeto, Tecnologias, Formação e Contato.
- Galeria com 2 imagens do computador e 3 do celular; filtros e visualizador ampliado.
- Links reais para o Projeto Questões, seu código no GitHub, e-mail, WhatsApp e Instagram.
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
│       └── projeto-questoes/   Cinco capturas reais em WebP
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
- **Conteúdo do Projeto Questões:** `data/projetos.json`.
- **Imagens:** `assets/img/projeto-questoes/`.

### Adicionar outro projeto depois

1. Inclua um novo objeto no array `projects` em `data/projetos.json`, com um `id` diferente de `projeto-questoes`.
2. Preencha `name`, `category`, `summary`, `technologies`, `urls` e `images`.
3. Salve as capturas do novo sistema na pasta `assets/img/NOME-DO-PROJETO/` e use os caminhos relativos em `images[].src`.
4. Publique os arquivos atualizados no GitHub. O site mostrará automaticamente uma seção de projetos adicionais com campo de busca.

**Importante:** a galeria principal mostra as imagens do projeto de destaque (`projeto-questoes`). Para alterar essa lógica ou transformar um projeto futuro em destaque, edite `index.html` e `js/app.js`.

O modo de visualização por duplo clique possui uma cópia mínima do catálogo de imagens em `js/projects.js`. Quando o site é servido via HTTP/HTTPS, o catálogo é carregado de `data/projetos.json`. Ao alterar o Projeto Questões, se precisar que a prévia por duplo clique também mostre as novas imagens, ajuste o array `offlineImages` em `js/projects.js`.

## Privacidade

Este pacote **não contém o diploma em PDF**, documentos de identidade, códigos de autenticação, dados de clientes, nem imagens de sistemas ainda não selecionados para publicação. Exibe apenas os contatos fornecidos para uso público e os dados acadêmicos essenciais.

## Checklist antes de publicar

- [ ] Verificar se deseja disponibilizar e-mail e WhatsApp publicamente.
- [ ] Conferir links do GitHub, Instagram e da plataforma Projeto Questões.
- [ ] Testar as imagens, o tema e o menu no celular.
- [ ] Confirmar que todas as capturas estão autorizadas para uso público.
- [ ] Se desejar, configurar domínio personalizado e ajustar URLs absolutas do Open Graph.

**Créditos:** Luan Aquino · 2026.
