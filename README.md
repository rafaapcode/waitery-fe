# Waitery — Frontend

Interface web para o sistema **Waitery**, uma plataforma de gestão de restaurantes que permite controle de pedidos, cardápio, usuários e organizações em tempo real.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **React Router DOM 7** — roteamento com proteção por perfil
- **TanStack React Query 5** — gerenciamento de estado do servidor
- **React Hook Form + Zod** — formulários e validação
- **Tailwind CSS 4** + **Radix UI** — estilização e componentes acessíveis
- **Axios** — cliente HTTP
- **Socket.io-client** — atualizações de pedidos em tempo real

## Requisitos

- Node.js 20+
- npm

## Estrutura

```
src/
├── app/
│   ├── config/     # Variáveis de ambiente e constantes
│   ├── context/    # AuthContext — estado de autenticação e helpers de perfil
│   ├── entities/   # Tipos TypeScript (User, Order, Product, Category, Org…)
│   ├── hooks/      # Queries, mutations e revalidações (TanStack Query)
│   ├── lib/        # StorageManager, formatadores
│   └── service/    # Serviços Axios separados por domínio
├── router/         # Rotas e AuthGuard
├── view/
│   ├── page/       # Páginas por funcionalidade
│   └── layout/     # Layout com sidebar
└── components/
    ├── atoms/      # Componentes base (Button, Input…)
    └── molecules/  # Componentes compostos (Modal, Table…)
```

## Funcionalidades

### Dashboard de Pedidos (tempo real)
Kanban com três colunas — **Aguardando**, **Em produção** e **Pronto** — atualizado via WebSocket. Clicar em um pedido abre um modal de detalhes com opção de avançar o status. Suporta reinício do dia (reset de todos os pedidos da organização).

### Histórico de Pedidos
Tabela com todos os pedidos do dia. Permite visualizar detalhes e excluir registros individualmente.

### Cardápio
Gestão completa de **categorias** (criar, editar, excluir) e **produtos** (criar, editar, excluir, adicionar ingredientes e aplicar/remover desconto). Upload de imagem do produto via Lambda.

### Usuários
Listagem, criação e edição de usuários da organização com controle de perfil (OWNER, ADMIN, WAITER, CLIENT).

### Organização
Edição dos dados da organização (nome, imagem, descrição). Caso o usuário ainda não tenha uma organização vinculada, é exibido um fluxo de criação.

### Perfil
Edição dos dados pessoais do usuário autenticado.

### Autenticação
Login e cadastro com proteção de rotas por perfil. Token e dados do usuário persistidos em `localStorage`.

---

## Perfis de Acesso

| Perfil | Acesso                                 |
| ------ | -------------------------------------- |
| OWNER  | Total — inclui gestão da organização   |
| ADMIN  | Dashboard, pedidos, cardápio, usuários |
| WAITER | Apenas pedidos (uso no salão)          |
| CLIENT | Visualização do cardápio               |
