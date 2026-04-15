-- Insertar productos iniciales de Hilo Sagrado
INSERT INTO products (name, description, price, category, image_url, available, featured, views) VALUES
  ('Collar Patitas de Amor', 'Delicado collar con patitas tejidas en mostacilla miyuki. Perfecto para los amantes de las mascotas. Cierre ajustable.', 45000, 'mascotas', '/images/products/collar-patitas.jpg', true, true, 128),
  ('Pulsera Huellitas', 'Pulsera tejida con huellitas de perro en colores tierra. Hilo encerado resistente al agua.', 28000, 'mascotas', '/images/products/pulsera-huellitas.jpg', true, false, 89),
  ('Llavero Gatito Miyuki', 'Adorable llavero de gatito tejido en mostacilla. Cada pieza es unica y hecha con amor.', 22000, 'mascotas', '/images/products/llavero-gatito.jpg', true, true, 156),
  ('Collar Infinito Mama', 'Elegante collar con simbolo infinito y la palabra Mama. Regalo perfecto para el dia de la madre.', 55000, 'mama', '/images/products/collar-infinito.jpg', true, true, 234),
  ('Pulsera Corazon de Madre', 'Pulsera con corazon central y detalles florales. Colores suaves y delicados.', 35000, 'mama', '/images/products/pulsera-corazon.jpg', true, false, 67),
  ('Aretes Flor de Loto', 'Aretes en forma de flor de loto tejidos en miyuki. Simbolizan pureza y amor maternal.', 38000, 'mama', '/images/products/aretes-flor.jpg', false, false, 45),
  ('Pulsera Boho Chic', 'Pulsera estilo bohemio con patron geometrico. Colores tierra y dorado.', 32000, 'accesorios', '/images/products/pulsera-boho.jpg', true, true, 198),
  ('Collar Mandala', 'Hermoso collar con mandala central tejido. Representa armonia y equilibrio.', 65000, 'accesorios', '/images/products/collar-mandala.jpg', true, false, 112)
ON CONFLICT DO NOTHING;
