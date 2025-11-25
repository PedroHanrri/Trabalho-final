# Sistema de Gestão Empresarial  
Aplicação Web desenvolvida em HTML, CSS, JavaScript e integrada ao Supabase para autenticação e operações de CRUD.  
O sistema permite gerenciar **Produtos**, **Clientes** e **Fornecedores** por meio de uma interface simples e responsiva.

---

# 🚀 Acesso ao Sistema

🔗 **Sistema publicado:** *https://pedrohanrri.github.io/Trabalho-final/*  
GitHub Pages.

---

# Testar o sistema
entre com esse login
- email:admin@gmail.com
- senha:admin123

---

# 📌 Funcionalidades

### ✔ Autenticação
- Login de usuário via Supabase Auth
- Redirecionamento automático após login

### ✔ Módulos CRUD
Cada módulo contém:
- Cadastro
- Listagem
- Edição
- Exclusão
- Validação básica

Módulos disponíveis:
- **Produtos**
- **Clientes**
- **Fornecedores**

### ✔ Interface dinâmica
- Atualização instantânea
- Tabelas geradas via JavaScript
- Modais para edição

---

# 🏗 Tecnologias Utilizadas

| Tecnologia | Descrição |
|-----------|-----------|
| **HTML5** | Estrutura do sistema |
| **CSS3** | Estilização da interface |
| **JavaScript (Vanilla)** | Lógica do CRUD e autenticação |
| **Supabase** | BaaS: Auth + PostgreSQL + API REST |
| **supabase-js** | Biblioteca de integração com o banco |

---

# 📂 Estrutura do Repositório
/ (root) <br>
├── index.html # Interface principal <br>
├── README.md # Este arquivo <br>
├── /src <br>
│ ├── /js <br>
│ │ └── app.js # Lógica do sistema <br>
│ └── /css <br>
│ └── styles.css # Estilos organizados <br>
├── /docs <br>
│ ├── ARCHITECTURE.md # Arquitetura da aplicação <br>
│ └── DB_SCHEMA.sql # Script SQL das tabelas <br>
└── /assets # Imagens, ícones (opcional) <br>

---


# Este padrão garante organização, clareza e fácil navegação.

---

# 🧩 Arquitetura do Sistema

A arquitetura completa está documentada em:  
📄 **/docs/ARCHITECTURE.md**

Resumo:

- Frontend estático
- JavaScript chama diretamente o Supabase
- Supabase executa operações no banco
- Respostas retornam ao JS, que atualiza o DOM

Diagrama simplificado:

Usuário → Frontend (HTML/JS) → Supabase API → PostgreSQL


---

# 🗄 Banco de Dados

As tabelas utilizadas são:

- `produtos`
- `clientes`
- `fornecedores`

O script completo está em:  
📄 **/docs/DB_SCHEMA.sql**

---

# ⚙️ Como Executar Localmente

1. Clone o repositório:

  git clone https://github.com/PedroHanrri/Trabalho-final

  
2. Abra o arquivo:

index.html


3. Configure suas chaves do Supabase:

No `app.js`:

```js
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";
```

4. O sistema já funciona — não precisa de backend.

---

# 🔐 Segurança

- Use sempre anon public key no front-end
- Não exponha chaves secretas
- Configure RLS no Supabase
- Utilize SSL/HTTPS no deploy

---

# 🛠 Melhorias Futuras

- Validações avançadas (CPF/CNPJ, email)
- Paginação de listas
- Dashboard com gráficos
- Upload de imagens
- Permissões por usuário

---

# 🤝 Contribuição

- Sinta-se livre para contribuir.
- Faça um fork
- Crie uma branch
- Faça suas alterações
- Envie um Pull Request

---

# 👨‍💻 Autor

Pedro Hanrri
Desenvolvedor do sistema e organizador do repositório.





