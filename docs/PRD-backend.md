# PRD - API Backend Syntax Wear

## 1. Visao Geral

O objetivo deste projeto e criar uma API backend para o e-commerce Syntax Wear, permitindo que o frontend deixe de depender de dados mockados e passe a consumir dados reais de produtos, categorias, usuarios, carrinho, pedidos, enderecos, frete e pagamentos.

A API sera construida com Node.js, Fastify, TypeScript, Supabase, Prisma, JWT, Vitest e Stripe.

## 2. Objetivos do Produto

- Gerenciar produtos exibidos no site.
- Gerenciar categorias de produtos.
- Permitir cadastro e login de usuarios.
- Permitir que usuarios autenticados tenham carrinho persistente.
- Permitir fechamento de pedidos.
- Integrar pagamentos com Stripe.
- Calcular frete com base no CEP e regiao.
- Permitir administracao de usuarios, produtos, categorias e pedidos.
- Criar uma base testavel, segura e escalavel para evolucao do e-commerce.

## 3. Publico-Alvo

- Clientes que acessam o site para visualizar produtos, criar conta, adicionar itens ao carrinho e finalizar compras.
- Administradores da loja que precisam cadastrar produtos, atualizar estoque, acompanhar pedidos e gerenciar usuarios.

## 4. Tecnologias

- Node.js
- Fastify
- TypeScript
- Supabase
- Prisma ORM
- JWT para autenticacao
- Vitest para testes automatizados
- Stripe para pagamentos

## 5. Modulos Principais

## 5.1 Autenticacao e Usuarios

### Funcionalidades

- Cadastro de usuario.
- Login com e-mail e senha.
- Geracao de token JWT.
- Consulta do usuario autenticado.
- Atualizacao dos dados do perfil.
- Recuperacao de senha.
- Controle de permissoes por perfil.
- Diferenciacao entre usuario cliente e administrador.

### Campos do Usuario

- id
- firstName
- lastName
- email
- passwordHash
- cpf
- birthDate
- phone
- role
- createdAt
- updatedAt

### Perfis de Usuario

- customer: cliente comum da loja.
- admin: administrador com permissao para gerenciar produtos, categorias, pedidos e usuarios.

### Endpoints Sugeridos

```http
POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/me
PATCH /users/me
GET /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

## 5.2 Produtos

### Funcionalidades

- Criar produto.
- Listar produtos.
- Buscar produto por ID.
- Atualizar produto.
- Remover produto.
- Filtrar produtos por categoria.
- Buscar produtos por nome.
- Controlar preco.
- Controlar estoque.
- Cadastrar imagem do produto.
- Definir produto como ativo ou inativo.

### Campos do Produto

- id
- name
- slug
- description
- price
- color
- imageUrl
- categoryId
- stock
- isActive
- createdAt
- updatedAt

### Endpoints Sugeridos

```http
POST /products
GET /products
GET /products/:id
PATCH /products/:id
DELETE /products/:id
GET /products/category/:categoryId
```

## 5.3 Categorias

### Funcionalidades

- Criar categoria.
- Listar categorias.
- Buscar categoria por ID.
- Atualizar categoria.
- Remover categoria.
- Vincular produtos a categorias.
- Cadastrar imagem da categoria.
- Definir categoria como ativa ou inativa.

### Campos da Categoria

- id
- name
- slug
- imageUrl
- isActive
- createdAt
- updatedAt

### Endpoints Sugeridos

```http
POST /categories
GET /categories
GET /categories/:id
PATCH /categories/:id
DELETE /categories/:id
```

## 5.4 Carrinho

No frontend atual, o carrinho fica salvo no localStorage. A API deve permitir carrinho persistente para usuarios autenticados.

### Funcionalidades

- Criar carrinho para usuario.
- Buscar carrinho do usuario autenticado.
- Adicionar produto ao carrinho.
- Remover produto do carrinho.
- Alterar quantidade de um item.
- Limpar carrinho.
- Calcular subtotal.
- Calcular total com frete.

### Campos do Carrinho

- id
- userId
- createdAt
- updatedAt

### Campos dos Itens do Carrinho

- id
- cartId
- productId
- quantity
- unitPrice
- subtotal
- createdAt
- updatedAt

### Endpoints Sugeridos

```http
GET /cart
POST /cart/items
PATCH /cart/items/:itemId
DELETE /cart/items/:itemId
DELETE /cart
```

## 5.5 Enderecos e Frete

O frontend atual calcula frete com base no CEP e na regiao retornada pelo ViaCEP. O backend deve centralizar essa regra.

### Funcionalidades

- Cadastrar endereco do usuario.
- Listar enderecos do usuario.
- Buscar endereco por ID.
- Atualizar endereco.
- Remover endereco.
- Definir endereco principal.
- Consultar CEP.
- Calcular frete por regiao.
- Validar regioes atendidas.

### Regras de Frete Iniciais

- Norte: R$ 39,90
- Nordeste: R$ 29,90
- Centro-Oeste: R$ 24,90
- Sudeste: R$ 14,90
- Sul: R$ 19,90

### Campos do Endereco

- id
- userId
- cep
- street
- number
- complement
- neighborhood
- city
- state
- region
- isDefault
- createdAt
- updatedAt

### Endpoints Sugeridos

```http
POST /addresses
GET /addresses
GET /addresses/:id
PATCH /addresses/:id
DELETE /addresses/:id
GET /shipping/cep/:cep
POST /shipping/calculate
```

## 5.6 Pedidos

### Funcionalidades

- Criar pedido a partir do carrinho.
- Listar pedidos do usuario autenticado.
- Buscar pedido por ID.
- Atualizar status do pedido.
- Cancelar pedido.
- Armazenar historico de pedidos.
- Registrar itens comprados com preco do momento da compra.
- Permitir painel administrativo de pedidos.

### Status do Pedido

- pending: pedido criado, aguardando pagamento.
- paid: pagamento confirmado.
- processing: pedido em preparacao.
- shipped: pedido enviado.
- delivered: pedido entregue.
- canceled: pedido cancelado.
- refunded: pedido reembolsado.

### Campos do Pedido

- id
- userId
- status
- subtotal
- shippingCost
- total
- paymentStatus
- stripePaymentIntentId
- shippingAddressId
- createdAt
- updatedAt

### Campos dos Itens do Pedido

- id
- orderId
- productId
- productName
- quantity
- unitPrice
- total

### Endpoints Sugeridos

```http
POST /orders
GET /orders
GET /orders/:id
PATCH /orders/:id/status
POST /orders/:id/cancel
GET /admin/orders
```

## 5.7 Pagamentos com Stripe

### Funcionalidades

- Criar checkout session.
- Criar payment intent.
- Confirmar pagamento via webhook.
- Atualizar status do pedido automaticamente.
- Registrar falhas de pagamento.
- Permitir reembolso, se necessario.

### Fluxo Esperado

1. Usuario fecha o pedido.
2. Backend cria o pedido com status pending.
3. Backend cria a sessao de pagamento ou payment intent na Stripe.
4. Usuario realiza o pagamento.
5. Stripe chama o webhook da API.
6. Backend valida o evento recebido.
7. Backend atualiza o pedido para paid.
8. Backend reduz o estoque dos produtos comprados.

### Endpoints Sugeridos

```http
POST /payments/checkout
POST /payments/payment-intent
POST /webhooks/stripe
POST /payments/:orderId/refund
```

## 5.8 Estoque

### Funcionalidades

- Controlar quantidade disponivel de cada produto.
- Impedir compra acima do estoque disponivel.
- Reduzir estoque apos pagamento confirmado.
- Restaurar estoque em caso de cancelamento ou reembolso.
- Listar produtos com baixo estoque.

### Endpoints Sugeridos

```http
PATCH /products/:id/stock
GET /admin/stock/low
```

## 5.9 Administracao

### Funcionalidades

- Visualizar dashboard administrativo.
- Gerenciar produtos.
- Gerenciar categorias.
- Gerenciar usuarios.
- Gerenciar pedidos.
- Visualizar pagamentos.
- Alterar status dos pedidos.
- Acompanhar metricas basicas da loja.

### Metricas Sugeridas

- Total de pedidos.
- Receita total.
- Pedidos pendentes.
- Produtos com baixo estoque.
- Produtos mais vendidos.
- Novos usuarios.

### Endpoints Sugeridos

```http
GET /admin/dashboard
GET /admin/users
GET /admin/orders
GET /admin/products
GET /admin/revenue
```

## 5.10 Newsletter

O frontend possui formulario de inscricao. A API pode armazenar esses e-mails para futuras campanhas.

### Funcionalidades

- Cadastrar e-mail na newsletter.
- Evitar e-mails duplicados.
- Listar inscritos no painel administrativo.
- Remover inscricao.

### Campos

- id
- email
- createdAt

### Endpoints Sugeridos

```http
POST /newsletter
GET /admin/newsletter
DELETE /admin/newsletter/:id
```

## 6. Requisitos Nao Funcionais

- API REST usando JSON.
- Validacao de dados em todas as rotas.
- Senhas criptografadas com bcrypt ou argon2.
- JWT obrigatorio em rotas privadas.
- Controle de permissao para rotas administrativas.
- Paginacao em listagens.
- Filtros em produtos, pedidos e usuarios.
- Tratamento padronizado de erros.
- Logs para erros e eventos importantes.
- Variaveis sensiveis armazenadas em arquivo .env.
- Webhook da Stripe com validacao de assinatura.
- Testes automatizados com Vitest.

## 7. Banco de Dados

### Entidades Principais

- User
- Product
- Category
- Cart
- CartItem
- Address
- Order
- OrderItem
- Payment
- NewsletterSubscriber

### Relacionamentos Principais

- Um usuario pode ter muitos enderecos.
- Um usuario pode ter um carrinho ativo.
- Um carrinho pode ter muitos itens.
- Um produto pertence a uma categoria.
- Uma categoria pode ter muitos produtos.
- Um usuario pode ter muitos pedidos.
- Um pedido pode ter muitos itens.
- Um pedido pode ter um pagamento.

## 8. Seguranca

- Criptografar senhas antes de salvar no banco.
- Nunca retornar passwordHash nas respostas da API.
- Proteger rotas privadas com JWT.
- Proteger rotas administrativas com role admin.
- Validar dados de entrada.
- Validar assinatura dos webhooks da Stripe.
- Usar CORS configurado para o dominio do frontend.
- Usar rate limit em rotas sensiveis como login e cadastro.

## 9. Testes com Vitest

### Cenarios que Devem Ser Testados

- Cadastro de usuario.
- Login de usuario.
- Falha de login com credenciais invalidas.
- Consulta de usuario autenticado.
- Criacao de produto.
- Listagem de produtos.
- Atualizacao de produto.
- Remocao de produto.
- Criacao de categoria.
- Listagem de categorias.
- Adicao de item ao carrinho.
- Alteracao de quantidade no carrinho.
- Remocao de item do carrinho.
- Criacao de pedido.
- Validacao de estoque.
- Calculo de frete.
- Webhook de pagamento aprovado da Stripe.
- Bloqueio de rotas privadas sem JWT.
- Bloqueio de rotas admin para usuario customer.

## 10. MVP Recomendado

Para a primeira versao, o backend deve priorizar:

1. Autenticacao com JWT.
2. CRUD de usuarios.
3. CRUD de categorias.
4. CRUD de produtos.
5. Carrinho persistente.
6. Enderecos e calculo de frete.
7. Criacao de pedidos.
8. Checkout com Stripe.
9. Webhook da Stripe.
10. Testes principais com Vitest.

## 11. Criterios de Aceite

- O frontend consegue listar produtos reais vindos da API.
- O frontend consegue listar categorias reais vindas da API.
- Um usuario consegue criar conta e fazer login.
- Um usuario autenticado consegue adicionar produtos ao carrinho.
- Um usuario consegue criar um pedido a partir do carrinho.
- O backend consegue criar pagamento na Stripe.
- O webhook da Stripe atualiza o status do pedido.
- O estoque e atualizado apos pagamento confirmado.
- Rotas administrativas exigem usuario com role admin.
- Os principais fluxos possuem testes automatizados.

