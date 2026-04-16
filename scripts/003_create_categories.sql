-- Insertar categorías iniciales
INSERT INTO public.categories (name, description, image) VALUES
  ('Mascotas', 'Accesorios y joyería para mascotas', NULL),
  ('Mamá', 'Joyería especial para mamás', NULL),
  ('Accesorios', 'Accesorios y joyería general', NULL)
ON CONFLICT DO NOTHING;
