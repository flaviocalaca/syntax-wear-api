# Instruções para Agentes de IA (AGENTS.md)

Este documento foi criado para ajudar você (e outros agentes de IA) a entender rapidamente a estrutura do projeto, as regras de codificação e os comandos disponíveis no repositório **syntax-wear-api**.

---

## 🛠️ Stack Tecnológica & Frameworks

Este é um projeto de API Backend estruturado com as seguintes tecnologias:

*   **Runtime:** Node.js
*   **Linguagem:** TypeScript
*   **Framework Web:** [Fastify](https://fastify.dev/) (mais rápido e eficiente que o Express, com suporte nativo a schemas e TypeScript)
*   **Banco de Dados & ORM:** PostgreSQL com [Prisma ORM](https://www.prisma.io/)
*   **Gerenciador de Execução:** [tsx](https://github.com/privatenumber/tsx) (TypeScript Execute, usado para rodar os arquivos TypeScript em desenvolvimento sem precisar compilá-los manualmente)

---

## 📁 Estrutura do Projeto e Convenções

A estrutura de arquivos do código fonte está localizada em `src/` e segue o padrão arquitetural de separação de responsabilidades:

*   [`src/app.ts`](file:///E:/backup/Projetos/syntax-wear-api/src/app.ts): Arquivo principal onde o servidor Fastify é instanciado, os plugins (CORS, Helmet) são registrados e o servidor é colocado para escutar requisições.
*   `src/controllers/`: Responsável por receber as requisições HTTP, validar dados de entrada simples e responder ao cliente (enviar status HTTP, JSON, etc.).
*   `src/services/`: Concentra as regras de negócio da aplicação. É onde a lógica principal acontece (ex: criar usuário, validar regras de negócio, persistir dados).
*   `src/routes/`: Definição de endpoints/rotas e mapeamento para seus respectivos controllers.
*   `src/middlewares/`: Funções executadas no ciclo de requisição (ex: autenticação de token JWT, validação de permissões).
*   `src/types/`: Definições globais de tipos e interfaces do TypeScript.
*   `src/utils/`: Funções utilitárias reutilizáveis que auxiliam no desenvolvimento.
*   [`prisma/schema.prisma`](file:///E:/backup/Projetos/syntax-wear-api/prisma/schema.prisma): Arquivo de configuração do banco de dados e definição das tabelas (modelos `User`, `Product`, etc.).

---

## 🚀 Comandos Importantes

Aqui estão os comandos do projeto definidos no [`package.json`](file:///E:/backup/Projetos/syntax-wear-api/package.json):

*   `npm run dev` / `npm dev`: Inicia o servidor Fastify em modo de desenvolvimento com hot-reload (recarrega automaticamente ao salvar alterações).
*   `npm run build` / `npm build`: Compila o código TypeScript em JavaScript puro na pasta `dist/` usando o compilador `tsc`.
*   `npm run start` / `npm start`: Roda a versão compilada em JavaScript direto da pasta `dist/`.
*   `npm run prisma:generate`: Atualiza as definições de tipo do cliente Prisma com base no [`schema.prisma`](file:///E:/backup/Projetos/syntax-wear-api/prisma/schema.prisma).
*   `npm run prisma:migrate`: Cria e aplica migrações no banco de dados com base nas alterações feitas no [`schema.prisma`](file:///E:/backup/Projetos/syntax-wear-api/prisma/schema.prisma).
*   `npm run prisma:studio`: Abre uma interface web para visualizar e manipular os dados do banco.
*   `npm run prisma:seed`: Executa o script de população inicial de dados no banco.

---

## ⚠️ Regras Fixas de Segurança e Conduta (Mandatório)

> **Nunca leia ou edite arquivos de credenciais ou variáveis de ambiente diretamente.**
> É terminantemente proibido acessar, alterar ou ler o conteúdo dos arquivos abaixo sob qualquer pretexto:
> *   Arquivos de ambiente: `.env`, `.env.*` (ex: `.env.local`, `.env.production`)
> *   Chaves privadas e certificados: `*.pem`, `*.key`
>
> Caso precise documentar variáveis necessárias, faça-o sempre no arquivo de exemplo (ex: `.env.example`).
