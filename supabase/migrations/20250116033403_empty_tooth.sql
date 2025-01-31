/*
  # Criação das tabelas iniciais

  1. Novas Tabelas
    - `categories`
      - `id` (uuid, chave primária)
      - `name` (texto, não nulo)
      - `created_at` (timestamp com fuso horário)
    - `recipes`
      - `id` (uuid, chave primária)
      - `category_id` (uuid, chave estrangeira para categories)
      - `name` (texto, não nulo)
      - `image_url` (texto)
      - `ingredients` (array de texto)
      - `instructions` (array de texto)
      - `nutritional_info` (json)
      - `created_at` (timestamp com fuso horário)
      - `updated_at` (timestamp com fuso horário)

  2. Segurança
    - Habilitado RLS em ambas as tabelas
    - Políticas para permitir operações CRUD para todos os usuários (modo público)
*/

-- Criar tabela de categorias
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de receitas
CREATE TABLE recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  image_url text,
  ingredients text[] DEFAULT '{}',
  instructions text[] DEFAULT '{}',
  nutritional_info jsonb DEFAULT '{
    "calories": 0,
    "proteins": 0,
    "carbs": 0,
    "fats": 0
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Criar políticas para categorias (modo público)
CREATE POLICY "Permitir leitura de categorias para todos"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Permitir inserção de categorias para todos"
  ON categories FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de categorias para todos"
  ON categories FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir exclusão de categorias para todos"
  ON categories FOR DELETE
  TO public
  USING (true);

-- Criar políticas para receitas (modo público)
CREATE POLICY "Permitir leitura de receitas para todos"
  ON recipes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Permitir inserção de receitas para todos"
  ON recipes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de receitas para todos"
  ON recipes FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir exclusão de receitas para todos"
  ON recipes FOR DELETE
  TO public
  USING (true);