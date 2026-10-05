import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. Llavero Axolotl Gamer (Doc 1, Pag 2)
  {
    id: 'prod-llavero-axolotl',
    sku: 'GFT-LLAV-001',
    vendor: 'Gifti Club Artesanal',
    name: 'Llavero de Madera "Axolotl Gamer"',
    tagline: 'Grabado láser en madera de haya natural con tu nombre personalizado',
    price: 249,
    originalPrice: 299,
    category: 'llaveros',
    categoryLabel: 'Llaveros Grabados',
    rating: 4.9,
    reviewsCount: 128,
    inventory: 14,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Más Vendido ⭐',
    description: 'Elaborado artesanalmente en madera de haya sustentable de 5mm con corte y grabado láser de 1200 DPI. Ilustración exclusiva de ajolote gamer con control retro. Puedes grabar tu nombre, gamertag o las iniciales que desees.',
    isCustomizable: true,
    customizationType: 'name',
    defaultCustomText: 'GAMER ALEX',
    variants: ['Madera Haya Natural (Claro)', 'Madera Nogal Oscuro (Prémium)', 'Acrílico Cristal 4mm'],
    features: [
      'Madera sólida sustentable tratada con cera de abeja natural',
      'Grabado láser permanente indeleble',
      'Argolla reforzada y cadena de acero inoxidable 316L',
      'Diámetro: 5.5 cm • Peso ligero: 18g',
      'Hecho con amor en taller mexicano'
    ]
  },

  // 2. Llavero Acrílico Kawaii Bunny (Doc 1, Pag 3)
  {
    id: 'prod-llavero-conejito',
    sku: 'GFT-LLAV-002',
    vendor: 'Gifti Club Cute',
    name: 'Llavero Acrílico "Kawaii Bunny"',
    tagline: 'Acrílico cristal óptico de alto brillo con placa para tu nombre',
    price: 229,
    originalPrice: 269,
    category: 'llaveros',
    categoryLabel: 'Llaveros Grabados',
    rating: 5.0,
    reviewsCount: 94,
    inventory: 9,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Edición Tierna 💕',
    description: 'Adorable conejita blanca con moño rosa en acrílico de doble capa de 4mm. Acabado vítreo irrompible con espacio frontal inferior para personalizar con nombre caligráfico.',
    isCustomizable: true,
    customizationType: 'name',
    defaultCustomText: 'SOFÍA',
    variants: ['Acrílico Cristal Puro', 'Acrílico Tornasol Glow', 'Acrílico Rosa Pastel'],
    features: [
      'Acrílico óptico con bordes pulidos al fuego',
      'Resistente a rayaduras y lluvia',
      'Incluye mini charm 3D en forma de zanahoria',
      'Medidas: 6 x 5 cm'
    ]
  },

  // 3. Llavero Día de los Muertos Luna Cat (Doc 1, Pag 4)
  {
    id: 'prod-llavero-muertos-luna',
    sku: 'GFT-LLAV-003',
    vendor: 'Gifti Club Tradición',
    name: 'Llavero Ovalado "Día de los Muertos Luna"',
    tagline: 'Grabado botánico en madera con corona de flores de cempasúchil',
    price: 269,
    originalPrice: 320,
    category: 'llaveros',
    categoryLabel: 'Llaveros Grabados',
    rating: 4.9,
    reviewsCount: 182,
    inventory: 18,
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578387453818-6c42a46df520?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Tradición Mexicana 🌼',
    description: 'Homenaje a nuestros compañeros de cuatro patas que cruzaron el arcoíris. Grabado oval con flores de cempasúchil, filigrana calavera y espacio para el nombre de tu mascota.',
    isCustomizable: true,
    customizationType: 'pet_name',
    defaultCustomText: 'LUNA',
    variants: ['Madera Tilo Dorado', 'Madera Cedro Rojizo'],
    features: [
      'Grabado profundo de doble relieve',
      'Protección contra sudor y humedad con barniz ecológico',
      'Opcional: Dedicatoria grabada al reverso sin costo',
      'Medidas: 6.5 x 4.5 cm'
    ]
  },

  // 4. Termo 40oz Día de los Muertos Husky (Doc 1, Pag 5)
  {
    id: 'prod-termo-muertos-husky',
    sku: 'GFT-TER-001',
    vendor: 'Gifti Club Drinks',
    name: 'Termo 40oz "Día de los Muertos Husky"',
    tagline: 'Vaso térmico prémium con arte folclórico, cempasúchil y papel picado',
    price: 899,
    originalPrice: 1099,
    category: 'termos',
    categoryLabel: 'Vasos & Mugs',
    rating: 5.0,
    reviewsCount: 247,
    inventory: 11,
    image: 'https://images.unsplash.com/photo-1578387453818-6c42a46df520?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578387453818-6c42a46df520?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Envío Gratis 🚀',
    description: 'Inspirado en la fiesta tradicional mexicana con un hermoso Husky siberiano caracterizado con maquillaje de catrina, flores vivas de cempasúchil y banderines tradicionales de papel picado.',
    isCustomizable: true,
    customizationType: 'pet_name',
    defaultCustomText: 'KODA & HUSKY',
    variants: ['Blanco Puro Mate 40oz', 'Negro Obsidiana 40oz', 'Naranja Cempasúchil 40oz'],
    features: [
      'Acero inoxidable 18/8 de grado alimenticio doble pared',
      'Mantiene 11h frío, 7h caliente y hasta 48h con hielo',
      'Tapa FlowState con 3 posiciones rotativas y popote reutilizable',
      'Base cónica compatible con portavasos de vehículo'
    ]
  },

  // 5. Placa de Acero Huesito Halloween (Doc 1, Pag 6)
  {
    id: 'prod-placa-acero-luna',
    sku: 'GFT-PLA-001',
    vendor: 'Gifti Club Pet Care',
    name: 'Placa de Acero Huesito "Halloween Edition"',
    tagline: 'Acero inoxidable cepillado con grabado de retrato y teléfono de contacto',
    price: 320,
    originalPrice: 380,
    category: 'llaveros',
    categoryLabel: 'Llaveros Grabados',
    rating: 4.9,
    reviewsCount: 310,
    inventory: 25,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Seguridad & Estilo 🛡️',
    description: 'Placa de identificación conmemorativa en forma de hueso. Grabado frontal con sombrero de brujito, nombre de tu mascota y grabado posterior con hasta 2 teléfonos de emergencia.',
    isCustomizable: true,
    customizationType: 'pet_name',
    defaultCustomText: 'LUNA • 55-1234-5678',
    variants: ['Plata Cepillada', 'Negro Mate PVD', 'Oro Rosado'],
    features: [
      'Acero inoxidable quirúrgico de 2mm indestructible',
      'No se desgasta, no mancha el pelaje de la mascota',
      'Incluye arnés doble reforzado para collar',
      'Garantía de por vida en la legibilidad del grabado'
    ]
  },

  // 6. Termo 40oz Spooky Witch Husky (Doc 1, Pag 8)
  {
    id: 'prod-termo-witch-husky',
    sku: 'GFT-TER-002',
    vendor: 'Gifti Club Drinks',
    name: 'Termo 40oz "Spooky Witch Husky"',
    tagline: 'Negro mate con Husky brujito, calabazas iluminadas y murciélagos',
    price: 899,
    originalPrice: 1099,
    category: 'termos',
    categoryLabel: 'Vasos & Mugs',
    rating: 4.8,
    reviewsCount: 165,
    inventory: 7,
    image: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578387453818-6c42a46df520?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Temporada Halloween 🎃',
    description: 'El vaso definitivo para los amantes de las noches otoñales. Acabado powder-coat negro mate con grabado UV duradero y brillante que resiste lavadas continuas.',
    isCustomizable: true,
    customizationType: 'pet_name',
    defaultCustomText: 'PET LOVER MAYA',
    variants: ['Negro Mate Noche', 'Morado Místico'],
    features: [
      'Capacidad masiva: 40 onzas (1.18 Litros)',
      'Mango ergonómico con agarre soft-touch',
      'Libre de BPA y toxinas',
      'Incluye popote y cepillo de limpieza de regalo'
    ]
  },

  // 7. Cuadro Memorial Recuerdo Ofrenda (Doc 1, Pag 10)
  {
    id: 'prod-cuadro-memorial-recuerdo',
    sku: 'GFT-DEC-001',
    vendor: 'Gifti Club Memorial',
    name: 'Cuadro Memorial "Ofrenda de Amor"',
    tagline: 'Marco de madera tallada con banderines, cempasúchil y dedicatoria',
    price: 680,
    originalPrice: 850,
    category: 'cuadros',
    categoryLabel: 'Cuadros & Ofrendas',
    rating: 5.0,
    reviewsCount: 198,
    inventory: 8,
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Para Recordar Siempre 🕊️',
    description: 'Un homenaje eterno para nuestros fieles compañeros. Marco de madera envejecida artesanalmente con mini papel picado de tela, cempasúchil en relieve y placa personalizada con nombres y fechas.',
    isCustomizable: true,
    customizationType: 'quote',
    defaultCustomText: 'Koda (2018-2024) - Siempre en nuestro corazón',
    variants: ['Madera Nogal Rústico', 'Madera Roble Claro', 'Negro Ceniza'],
    features: [
      'Dimensiones: 30 x 25 cm',
      'Espacio fotográfico 15x10 cm con vidrio antirreflejo',
      'Base para colocar en altar o gancho para colgar en pared',
      'Placa con nombres, fechas y mensaje grabados en bajo relieve'
    ]
  },

  // 8. Vela Aromática Three Brother Cats (Doc 1, Pag 11)
  {
    id: 'prod-vela-three-brother-cats',
    sku: 'GFT-VEL-001',
    vendor: 'Gifti Club Aromas',
    name: 'Vela Aromática "Three Brother Cats"',
    tagline: 'Cera de soya 8oz en vaso negro mate con esencia de Calabaza y Ámbar',
    price: 390,
    originalPrice: 450,
    category: 'velas',
    categoryLabel: 'Velas & Stickers',
    rating: 4.9,
    reviewsCount: 112,
    inventory: 15,
    image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Aroma Exclusivo 🕯️',
    description: 'Vela artesanal vertida a mano con cera 100% de soya natural y mecha de algodón puro. Fragancia cálida de calabaza horneada, canela dulce, ámbar negro y vainilla de Papantla.',
    isCustomizable: false,
    variants: ['Vaso Cerámica Negro Mate 8oz', 'Lata Vintage Ámbar 8oz'],
    features: [
      'Tiempo de quemado: 50+ horas limpias sin humo negro',
      'Aceites esenciales botánicos libres de parabenos',
      'Etiqueta texturizada con los 3 gatos en sombrero de brujito',
      'Vaso cerámico reutilizable'
    ]
  },

  // 9. Hoodie Wolf Lovers Moon & Bamboo (Doc 1, Pag 1)
  {
    id: 'prod-hoodie-wolf-lovers',
    sku: 'GFT-ROPA-001',
    vendor: 'Gifti Club Streetwear',
    name: 'Hoodie "Wolf Lovers - 月 & Bambú"',
    tagline: 'Sudadera premium negra con arte japonés sumi-e de lobo aullando',
    price: 950,
    originalPrice: 1200,
    category: 'ropa',
    categoryLabel: 'Ropa & Hoodies',
    rating: 4.9,
    reviewsCount: 203,
    inventory: 12,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Streetwear Art 🐺',
    description: 'Sudadera pesada de 320g en felpa francesa con 80% algodón peinado y 20% poliéster. Serigrafía de alta densidad que resiste más de 100 lavadas sin decolorarse.',
    isCustomizable: false,
    variants: ['Talla CH', 'Talla M', 'Talla G', 'Talla XG', 'Talla 2XG'],
    features: [
      'Corte unisex holgado y moderno',
      'Capucha doble forrada con jaretas gruesas y puntas metálicas',
      'Bolsillo canguro frontal con remates reforzados',
      'Interior afelpado ultrasuave'
    ]
  },

  // 10. Playera Akame Cumpleaños Husky (Doc 2, Pag 72)
  {
    id: 'prod-playera-cumple-husky',
    sku: 'GFT-ROPA-002',
    vendor: 'Gifti Club Apparel',
    name: 'Playera "Cumpleaños Canino Fest"',
    tagline: 'Playera 100% algodón con Husky en gorrito festivo y globos dorados',
    price: 450,
    originalPrice: 550,
    category: 'ropa',
    categoryLabel: 'Ropa & Hoodies',
    rating: 4.9,
    reviewsCount: 88,
    inventory: 16,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Edición Fiesta 🎂',
    description: 'La playera perfecta para festejar el cumpleaños de tu perrhijo. Algodón peinado de 200g con estampado de tacto cero en DTG de alta definición.',
    isCustomizable: false,
    variants: ['Talla CH', 'Talla M', 'Talla G', 'Talla XG'],
    features: [
      '100% Algodón peinado pre-encogido',
      'Cuello redondo acanalado con cinta tapacosturas',
      'Tintas ecológicas al agua certificadas OEKO-TEX',
      'Lavable a máquina'
    ]
  },

  // 11. Playera Editorial Akame Día de los Muertos (Doc 2, Pag 74)
  {
    id: 'prod-playera-editorial-diademuertos',
    sku: 'GFT-ROPA-003',
    vendor: 'Gifti Club Editorial',
    name: 'Playera Editorial "Cempasúchil Husky"',
    tagline: 'Algodón peinado 200gsm con corona floral de cempasúchil y calaveritas',
    price: 480,
    originalPrice: 590,
    category: 'ropa',
    categoryLabel: 'Ropa & Hoodies',
    rating: 5.0,
    reviewsCount: 142,
    inventory: 10,
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Edición Curada 👑',
    description: 'Perteneciente a la colección editorial Akame. Algodón peinado premium de 200gsm con estampado de corona de flores vivas y calaveras de azúcar en tonos vibrantes.',
    isCustomizable: false,
    variants: ['Talla CH', 'Talla M', 'Talla G', 'Talla XG'],
    features: [
      'Tejido premium pesado de 200g suave al contacto',
      'Corte regular contemporáneo',
      'Etiqueta exterior cosida en el ruedo',
      'No encoge ni pierde color'
    ]
  },

  // 12. Mousepad Gamer RGB XXL (Doc 1, Pag 15)
  {
    id: 'prod-mousepad-rgb-howl',
    sku: 'GFT-GAM-001',
    vendor: 'Gifti Club Setup',
    name: 'Mousepad Gamer RGB XXL "Howl Mode On"',
    tagline: 'Tapete de 900x400mm con iluminación LED de 14 modos y microfibra Speed',
    price: 690,
    originalPrice: 850,
    category: 'gaming',
    categoryLabel: 'Gamer Setups',
    rating: 4.9,
    reviewsCount: 178,
    inventory: 20,
    image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'RGB 14 Modos 🌈',
    description: 'Ilustración cyberpunk del Husky aullando a la luna de neón entre bambúes digitales. Borde con fibra óptica luminosa de 14 modos controlables con un botón.',
    isCustomizable: false,
    variants: ['900 x 400 x 4mm (XXL)', '800 x 300 x 4mm (XL)'],
    features: [
      '14 modos de iluminación: 7 colores fijos y 7 dinámicos',
      'Superficie de tela microporosa impermeable',
      'Base de goma natural antiderrapante',
      'Cable trenzado USB tipo C de 1.8 metros'
    ]
  },

  // 13. Taza Cerámica Three Brother Cats (Doc 1, Pag 17)
  {
    id: 'prod-taza-three-cats',
    sku: 'GFT-TAZ-001',
    vendor: 'Gifti Club Cerámica',
    name: 'Taza Cerámica "Three Brother Cats"',
    tagline: 'Taza blanca prémium 11oz con los tres michis bajo la luna rosada',
    price: 280,
    originalPrice: 350,
    category: 'termos',
    categoryLabel: 'Vasos & Mugs',
    rating: 5.0,
    reviewsCount: 162,
    inventory: 30,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Michi Lover ☕',
    description: 'La taza más acogedora para tu café matutino o té. Ilustración en acuarela pastel de tres hermanitos felinos: atigrado naranja, blanco de ojos azules y gatito negro.',
    isCustomizable: true,
    customizationType: 'quote',
    defaultCustomText: 'MICHIS DE MI CORAZÓN',
    variants: ['Taza 11oz Blanca Clásica', 'Taza 15oz Jumbo', 'Taza Mágica Termosensible'],
    features: [
      'Cerámica de alta densidad apta para microondas y lavavajillas',
      'Impresión por sublimación vívida de alta resolución',
      'Asa ergonómica de agarre seguro',
      'Caja protectora anti-impacto incluida'
    ]
  },

  // 14. Figura de Acción Coleccionable Royal Guardian (Doc 3, Pag 32)
  {
    id: 'prod-figura-accion-royal',
    sku: 'GFT-COL-001',
    vendor: 'Gifti Club Collectibles',
    name: 'Figura de Acción "Black Canine Royal Guardian"',
    tagline: 'Figura de 6 pulgadas con 14 puntos de articulación, manto de rey, cetro y escudo',
    price: 790,
    originalPrice: 950,
    category: 'gaming',
    categoryLabel: 'Gamer Setups',
    rating: 5.0,
    reviewsCount: 64,
    inventory: 5,
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Coleccionista 👑',
    description: 'Empaque de tarjeta blister estilo retro Series 1 No. 007. Figura detallada del perro rey con manto de terciopelo y león bordado, corona dorada desmontable, pedestal y moneda conmemorativa.',
    isCustomizable: false,
    variants: ['Edición Vintage Blister', 'Edición Caja de Lujo con Ventana'],
    features: [
      '14 puntos de articulación para poses dinámicas',
      'Accesorios: Cetro real, escudo de león y moneda de coleccionista',
      'Pintura a mano con sombreados realistas',
      'Edición numerada limitada'
    ]
  },

  // 15. Cojín Velvet Alebrije Moon Dog (Doc 3, Pag 40)
  {
    id: 'prod-cojin-alebrije-dog',
    sku: 'GFT-DEC-002',
    vendor: 'Gifti Club Decor',
    name: 'Cojín Velvet "Alebrije Moon Dog"',
    tagline: 'Cojín decorativo de terciopelo con arte Huichol de perro aullando bajo la luna',
    price: 520,
    originalPrice: 650,
    category: 'cuadros',
    categoryLabel: 'Cuadros & Ofrendas',
    rating: 4.9,
    reviewsCount: 75,
    inventory: 13,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Arte Huichol 🌟',
    description: 'Cojín de lujo confeccionado en terciopelo suave con ribete de flecos artesanales. Impresión de alta fidelidad con colores neón que evocan la mística de los alebrijes oaxaqueños.',
    isCustomizable: false,
    variants: ['45 x 45 cm con Relleno', '50 x 50 cm Grande'],
    features: [
      'Funda de terciopelo con cierre invisible desfundable',
      'Relleno de fibra siliconada hipoalergénica incluido',
      'Colores resistentes al lavado en máquina ciclo delicado',
      'Diseño exclusivo Gifti Club México'
    ]
  },

  // 16. Pack Stickers Halloween 6 Costumes (Doc 3, Pag 23)
  {
    id: 'prod-stickers-halloween-akame',
    sku: 'GFT-STK-001',
    vendor: 'Gifti Club Stationery',
    name: 'Planilla Stickers "Akame 6-Costumes"',
    tagline: '6 stickers de vinil troquelado: Bruja, Vampiro, Esqueleto, Fantasma, Calabaza y Frankenstein',
    price: 180,
    originalPrice: 220,
    category: 'velas',
    categoryLabel: 'Velas & Stickers',
    rating: 5.0,
    reviewsCount: 156,
    inventory: 40,
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Halloween Fun 🎃',
    description: 'Los disfraces más tiernos del perro negro en vinil grueso 3M laminado resistente al agua, sol y microondas. Ideal para pegar en termos, laptops, libretas y fundas de celular.',
    isCustomizable: false,
    variants: ['Acabado Holográfico Brillante', 'Acabado Mate Soft Touch'],
    features: [
      '6 calcomanías individuales cortadas a silueta (Kiss-Cut)',
      'Adhesivo de grado automotriz que no deja goma',
      '100% resistente a lavavajillas',
      'Medida promedio por sticker: 7 x 5 cm'
    ]
  }
];

export const GIFT_WRAPPING_OPTIONS = {
  price: 79,
  title: 'Envoltorio de Regalo Prémium Gifti Club',
  description: 'Caja rígida azul noche profundo, lazo de listón satín terracota coral hecho a mano, sello lacrado isotipo Gifti, viruta protectora y tarjeta de dedicatoria.',
};
