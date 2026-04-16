-- Actualizar productos con category_id correcto basado en las categorías
-- Primero, obtener los IDs de las categorías
WITH category_ids AS (
  SELECT id, name FROM public.categories
)
UPDATE public.products p
SET category_id = CASE 
  WHEN p.name IN ('Collar Patitas de Amor', 'Pulsera Huellitas', 'Llavero Gatito Miyuki') THEN (SELECT id FROM category_ids WHERE name = 'Mascotas')
  WHEN p.name IN ('Collar Infinito Mama', 'Pulsera Corazon de Madre', 'Aretes Flor de Loto') THEN (SELECT id FROM category_ids WHERE name = 'Mamá')
  WHEN p.name IN ('Pulsera Boho Chic', 'Collar Mandala') THEN (SELECT id FROM category_ids WHERE name = 'Accesorios')
END
WHERE category_id IS NULL;

-- Insertar productos iniciales si no existen (con category_id)
INSERT INTO public.products (name, description, price, category_id, image_url, available, is_featured, is_new) 
SELECT * FROM (
  VALUES
    ('Collar Patitas de Amor', 'Delicado collar con patitas tejidas en mostacilla miyuki. Perfecto para los amantes de las mascotas. Cierre ajustable.', 45000, (SELECT id FROM public.categories WHERE name = 'Mascotas'), '/images/products/collar-patitas.jpg', true, true, false),
    ('Pulsera Huellitas', 'Pulsera tejida con huellitas de perro en colores tierra. Hilo encerado resistente al agua.', 28000, (SELECT id FROM public.categories WHERE name = 'Mascotas'), '/images/products/pulsera-huellitas.jpg', true, false, false),
    ('Llavero Gatito Miyuki', 'Adorable llavero de gatito tejido en mostacilla. Cada pieza es unica y hecha con amor.', 22000, (SELECT id FROM public.categories WHERE name = 'Mascotas'), '/images/products/llavero-gatito.jpg', true, true, false),
    ('Collar Infinito Mama', 'Elegante collar con simbolo infinito y la palabra Mama. Regalo perfecto para el dia de la madre.', 55000, (SELECT id FROM public.categories WHERE name = 'Mamá'), '/images/products/collar-infinito.jpg', true, true, false),
    ('Pulsera Corazon de Madre', 'Pulsera con corazon central y detalles florales. Colores suaves y delicados.', 35000, (SELECT id FROM public.categories WHERE name = 'Mamá'), '/images/products/pulsera-corazon.jpg', true, false, false),
    ('Aretes Flor de Loto', 'Aretes en forma de flor de loto tejidos en miyuki. Simbolizan pureza y amor maternal.', 38000, (SELECT id FROM public.categories WHERE name = 'Mamá'), '/images/products/aretes-flor.jpg', false, false, false),
    ('Pulsera Boho Chic', 'Pulsera estilo bohemio con patron geometrico. Colores tierra y dorado.', 32000, (SELECT id FROM public.categories WHERE name = 'Accesorios'), '/images/products/pulsera-boho.jpg', true, true, false),
    ('Collar Mandala', 'Hermoso collar con mandala central tejido. Representa armonia y equilibrio.', 65000, (SELECT id FROM public.categories WHERE name = 'Accesorios'), '/images/products/collar-mandala.jpg', true, false, false)
) AS t(name, description, price, category_id, image_url, available, is_featured, is_new)
ON CONFLICT DO NOTHING;
