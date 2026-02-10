# Onfilmes

Aplicação React para listar filmes em cartaz, ver detalhes e salvar favoritos no navegador.

## Requisitos

- Node.js 18+
- npm
- Chave da API do TMDB

## Configuração local

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` com base no exemplo:

```bash
copy .env.example .env
```

3. Defina sua chave no `.env`:

```env
REACT_APP_TMDB_API_KEY=sua_chave_tmdb_aqui
```

4. Rode o projeto:

```bash
npm start
```

## Scripts

- `npm start`: inicia em desenvolvimento
- `npm test`: executa os testes
- `npm run build`: gera build de produção
- `npm run deploy`: publica no GitHub Pages

## Deploy no GitHub Pages

O projeto usa `HashRouter` para evitar erro 404 em refresh/acesso direto de rotas no Pages.

Passo a passo:

1. Configure o repositório remoto no GitHub.
2. Faça commit e push na branch principal.
3. Execute:

```bash
npm run deploy
```

4. Em `Settings > Pages`, confirme publicação pela branch `gh-pages` (ou pasta configurada).
