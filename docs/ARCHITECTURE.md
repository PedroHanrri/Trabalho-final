# 📘 ARCHITECTURE.md
- Arquitetura do Sistema de Gestão Empresarial

Este documento descreve a arquitetura geral do sistema, suas camadas, fluxos internos, integrações externas (Supabase) e organização do repositório.
O objetivo é fornecer uma visão clara e completa para desenvolvedores, avaliadores e futuros mantenedores.

---

# 🔷 1. Visão Geral da Arquitetura

O sistema é uma aplicação Web Front-end estática, construída em:

- HTML5
- CSS3
- JavaScript (Vanilla JS)

Supabase (Auth + Banco de Dados + API REST)

- Não há backend
- próprio — o sistema se conecta diretamente ao Supabase utilizando a biblioteca @supabase/supabase-js.

➤ Estilo arquitetural

Cliente → BaaS (Backend-as-a-Service)

---

# 🔷 2. Componentes do Sistema
## 2.1. Frontend

Responsável por:

- Interface visual
- Manipulação da DOM
- Lógica de autenticação
- CRUD de Produtos, Clientes e Fornecedores
- Comunicação com Supabase via JavaScript

Arquivos principais:
```
index.html
src/js/app.js
src/css/styles.css
```

## 2.2. Supabase

O Supabase funciona como:

- Serviço de Autenticação
- Banco de dados PostgreSQL
- API REST disponível através do SDK
- Gerenciador de políticas RLS

O sistema utiliza:

- ✔ `auth.signInWithPassword()`
- ✔ `from("produtos").select()`
- ✔ `from("clientes").insert()`
- ✔ `from("fornecedores").update()`
- ✔ e outras operações CRUD

---

# 🔷 3. Estrutura de Pastas do Projeto]
```
/ (root) 
├── index.html                # Arquivo principal da aplicação
├── README.md                 # Documentação principal do repositório
├── /src
│   ├── /js
│   │   └── app.js            # Lógica de login e CRUDs
│   └── /css
│       └── styles.css        # Estilos da interface
├── /docs
│   ├── ARCHITECTURE.md       # Arquitetura do sistema (este arquivo)
│   └── DB_SCHEMA.sql         # Script de criação das tabelas no Supabase
└── /assets (opcional)        # Imagens, ícones, logos
```

---

# 🔷 4. Fluxo de Autenticação

O login é feito assim:

1. Usuário insere email e senha
2. JavaScript chama:
   ```
   supabase.auth.signInWithPassword({
    email: email,
    password: password
})

3. O Supabase:

- valida credenciais
- gera sessão JWT automaticamente

4. O usuário é redirecionado para a dashboard

✔ Não há backend intermediário
✔ A sessão é mantida pelo SDK

---

# 🔷 5. Fluxos CRUD

O sistema possui 3 módulos CRUD:

- Produtos
- Clientes
- Fornecedores

Todos funcionam da mesma forma.

## 5.1. Fluxo Geral
 ```
Tela → JS → Supabase → Banco → Supabase retorna → JS atualiza DOM
 ```
Exemplo de listagem:
```
const { data } = await supabase.from("produtos").select("*");
```
Exemplo de criação:
```
await supabase.from("clientes").insert({ nome, email, telefone });
```
Exemplo de edição:
```
await supabase.from("fornecedores")
 .update({ cidade })
 .eq("id", fornecedorId);
```
Exemplo de exclusão:
```
await supabase.from("produtos").delete().eq("id", id);
```
## 5.2. Atualização na interface

Após cada operação:

- Tabelas HTML são reconstruídas dinamicamente
- Usuário vê a alteração imediatamente

---

# 🔷 6. Banco de Dados

As tabelas ficam no Supabase:
```
produtos
clientes
fornecedores
```
Cada uma segue o padrão:

- id (PK)
- texto
- números
- timestamps
- campos personalizados de cada módulo
O script completo está em `/docs/DB_SCHEMA.sql.`

---

# 🔷 7. Diagrama de Arquitetura
```
┌──────────────────────┐
│     Usuário Web       │
└───────────▲──────────┘
            │ Interação (UI)
┌───────────┴──────────┐
│   Frontend (HTML/JS)  │
│  index.html + app.js  │
└───────────▲──────────┘
            │ Chamadas REST via SDK
┌───────────┴──────────┐
│   Supabase (API)      │
│ Auth | DB | Policies  │
└───────────▲──────────┘
            │ Queries SQL
┌───────────┴──────────┐
│ PostgreSQL (DB)       │
└──────────────────────┘

```

---

# 🔷 8. Políticas e Segurança

O sistema depende das políticas do Supabase:

- RLS deve estar ativado
- Usuários autenticados podem realizar operações CRUD
- Chave "anon" usada no front-end

Boas práticas recomendadas:

- ✔ Não expor chaves secretas
- ✔ Validar dados no frontend
- ✔ Criar policies no Supabase para cada tabela
- ✔ Usar HTTPS sempre

---

# 🔷 9. Pontos Fortes da Arquitetura

- ✔ Simplicidade
- ✔ Dependência mínima
- ✔ Código fácil de manter
- ✔ Integração direta com Supabase
- ✔ Deploy rápido em qualquer host estático

---

# 🔷 10. Possíveis Melhorias Futuras

- Criar backend Node.js para rotas protegidas
- Paginação e busca avançada
- Dashboards com gráficos
- Logs de auditoria
- Upload de imagens em bucket Supabase
- Máscaras e validações avançadas

---

# 📌 Conclusão

Este documento fornece uma visão clara e completa da arquitetura do sistema, detalhando como o frontend, o Supabase e o banco de dados interagem para entregar as funcionalidades de autenticação e CRUD.
