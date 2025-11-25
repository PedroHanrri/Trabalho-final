-- Tabela produtos
create table public.produtos (
  id serial primary key,
  nome text not null,
  quantidade integer not null default 0,
  preco numeric(12,2) not null default 0.00,
  categoria text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabela clientes
create table public.clientes (
  id serial primary key,
  nome text not null,
  email text not null,
  telefone text,
  cpf text,
  cidade text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabela fornecedores
create table public.fornecedores (
  id serial primary key,
  nome text not null,
  cnpj text not null,
  email text,
  telefone text,
  cidade text,
  produto text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
