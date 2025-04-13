# 🛍️ GestaoV - Sistema de Gerenciamento de Produtos e Usuários

Sistema completo de gestão para controle de produtos, categorias e usuários, com autenticação segura via JWT. A aplicação é dividida em duas camadas: uma API robusta desenvolvida em .NET 8 e um front-end dinâmico utilizando React e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

### 🔧 Back-end (.NET 8)
- ASP.NET Core Web API
- Entity Framework Core (Migrations, DbContext)
- Autenticação JWT
- SQL Server
- Swagger (documentação automática)

### 💻 Front-end (React)
- React 18
- Tailwind CSS
- React Router DOM
- Axios para comunicação com API
- Componentização moderna com formulários dinâmicos

## 📁 Estrutura do Projeto


GestaoV/
├── APILoja/                  # API .NET 8
│   ├── ApiEndpoints/        # Endpoints organizados por entidade
│   ├── Context/             # DbContext e configurações EF Core
│   ├── Models/              # Entidades Produto, Categoria, Usuario
│   ├── Services/            # TokenService (JWT)
│   └── Migrations/          # Histórico de versões do banco
└── front_loja/              # Aplicação React
    ├── components/          # Componentes reutilizáveis (gráficos, menus)
    ├── formularios/         # CRUD de Produtos, Categorias
    ├── pages/               # Páginas principais (Login, Dashboard)
    ├── routes/              # Rotas protegidas
    ├── services/            # Integração com API
    └── styles/              # CSS global


## 🔐 Funcionalidades

- [x] Cadastro e login de usuários (com controle de perfil)
- [x] Cadastro e listagem de categorias
- [x] Cadastro e listagem de produtos
- [x] Dashboard com gráficos informativos
- [x] Acesso protegido por token JWT
- [x] Responsivo e moderno

## 🧪 Como rodar o projeto

### 🔹 Back-end (.NET 8)

```bash
cd GestaoV/APILoja
dotnet restore
dotnet ef database update
dotnet run
```

### 🔹 Front-end (React)

```bash
cd GestaoV/front_loja
npm install
npm run dev
```

---

## 📌 Endpoints principais da API

| Método | Rota                  | Descrição                        |
|--------|-----------------------|----------------------------------|
| POST   | `/login`              | Autenticação de usuário          |
| GET    | `/produtos`           | Lista todos os produtos          |
| POST   | `/produtos`           | Cria um novo produto             |
| GET    | `/categorias`         | Lista todas as categorias        |
| POST   | `/categorias`         | Cria uma nova categoria          |

---


## 👨‍💻 Desenvolvido por **Geraldo Luiz**  
🔗 [portfolio-geeh.netlify.app](https://portfolio-geeh.netlify.app)

