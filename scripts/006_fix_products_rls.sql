-- Desabilitar RLS temporalmente o revisar políticas
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Si prefieres mantener RLS, usa esto en su lugar:
-- ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
-- 
-- DROP POLICY IF EXISTS "products_select_all" ON public.products;
-- DROP POLICY IF EXISTS "products_insert_auth" ON public.products;
-- DROP POLICY IF EXISTS "products_update_auth" ON public.products;
-- DROP POLICY IF EXISTS "products_delete_auth" ON public.products;
-- 
-- CREATE POLICY "products_select_all" ON public.products FOR SELECT USING (true);
-- CREATE POLICY "products_insert_auth" ON public.products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "products_update_auth" ON public.products FOR UPDATE USING (auth.role() = 'authenticated');
-- CREATE POLICY "products_delete_auth" ON public.products FOR DELETE USING (auth.role() = 'authenticated');
