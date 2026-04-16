-- Habilitar RLS en categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas antiguas si existen
DROP POLICY IF EXISTS "categories_select_all" ON public.categories;
DROP POLICY IF EXISTS "categories_insert_auth" ON public.categories;
DROP POLICY IF EXISTS "categories_update_auth" ON public.categories;
DROP POLICY IF EXISTS "categories_delete_auth" ON public.categories;

-- Política para lectura pública (todos pueden ver categorías)
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT USING (true);

-- Política para insertar (solo usuarios autenticados - admin)
CREATE POLICY "categories_insert_auth" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para actualizar (solo usuarios autenticados - admin)
CREATE POLICY "categories_update_auth" ON public.categories FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para eliminar (solo usuarios autenticados - admin)
CREATE POLICY "categories_delete_auth" ON public.categories FOR DELETE USING (auth.role() = 'authenticated');
