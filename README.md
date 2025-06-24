# Cadastro de Cliente

Este projeto é uma aplicação web para cadastro, consulta, edição e exclusão de clientes, desenvolvida com **React** + **Vite**. A aplicação consome uma API REST para persistência dos dados dos clientes.

## Funcionalidades

- Cadastro de novos clientes
- Consulta de clientes cadastrados
- Edição de dados de clientes existentes
- Exclusão de clientes
- Validação de e-mail e campos obrigatórios
- Interface responsiva e moderna

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- CSS moderno e responsivo

## Estrutura do Projeto

```
├── public/
├── src/
│   ├── Home/
│   │   ├── App.css
│   │   ├── ClienteApi.js
│   │   └── ClienteViwe.jsx
│   ├── assets/
│   ├── index.css
│   ├── main.jsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
└── ...
```

- [`src/Home/ClienteApi.js`](src/Home/ClienteApi.js): Funções para consumir a API de clientes (buscar, inserir, atualizar e deletar).
- [`src/Home/ClienteViwe.jsx`](src/Home/ClienteViwe.jsx): Componente principal da interface, com formulário e listagem dos clientes.
- [`src/Home/App.css`](src/Home/App.css): Estilos da aplicação.
- [`src/main.jsx`](src/main.jsx): Ponto de entrada da aplicação.

## Como rodar o projeto

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Rode o projeto em modo desenvolvimento:

   ```sh
   npm run dev
   ```

3. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Scripts disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento.
- `npm run build` — Gera a build de produção.
- `npm run preview` — Visualiza a build de produção localmente.
- `npm run lint` — Executa o ESLint.

## Observações

- A API utilizada está definida em [`src/Home/ClienteApi.js`](src/Home/ClienteApi.js).
- O token de autenticação está fixo no código para fins de demonstração.
- O projeto utiliza validação básica de e-mail e campos obrigatórios no formulário.

---

Desenvolvido para fins de estudo e demonstração.