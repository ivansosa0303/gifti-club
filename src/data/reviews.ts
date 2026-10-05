import { ProductReview } from '../types';

export const INITIAL_REVIEWS: Record<string, ProductReview[]> = {
  'prod-llavero-axolotl': [
    {
      id: 'rev-ax-1',
      productId: 'prod-llavero-axolotl',
      author: 'Alejandro Morales',
      petName: 'Axolito & Toby',
      rating: 5,
      date: 'Hace 2 días',
      comment: 'El grabado en madera de haya tiene un acabado impecable, se siente súper sólido y el detalle del control retro es genial. Llegó a Puebla en 48 horas en su caja de regalo.',
      verified: true
    },
    {
      id: 'rev-ax-2',
      productId: 'prod-llavero-axolotl',
      author: 'Diana Paola',
      petName: 'Pixel (Gatita)',
      rating: 5,
      date: 'Hace 1 semana',
      comment: 'Me encantó cómo grabaron el nombre de mi gatita. El aroma a madera recién grabada es una delicia. 100% recomendado.',
      verified: true
    }
  ],
  'prod-llavero-muertos-luna': [
    {
      id: 'rev-muert-1',
      productId: 'prod-llavero-muertos-luna',
      author: 'Mariana González',
      petName: 'Luna (Michi en el cielo)',
      rating: 5,
      date: 'Ayer',
      comment: 'Lloré de emoción cuando abrí la cajita azul. El detalle de las flores de cempasúchil y el grabado del nombre Luna quedó hermoso para su ofrenda. Gracias por tanto amor al detalle.',
      verified: true
    },
    {
      id: 'rev-muert-2',
      productId: 'prod-llavero-muertos-luna',
      author: 'Roberto C.',
      petName: 'Max',
      rating: 5,
      date: 'Hace 4 días',
      comment: 'Madera de excelente grosor y el listón coral le da un toque de regalo de boutique de primer nivel.',
      verified: true
    }
  ],
  'prod-termo-muertos-husky': [
    {
      id: 'rev-ter-1',
      productId: 'prod-termo-muertos-husky',
      author: 'Fernanda Ortiz',
      petName: 'Koda (Husky)',
      rating: 5,
      date: 'Hace 3 días',
      comment: 'Mantiene el hielo por dos días enteros en el calor de Monterrey. El grabado del Husky con catrina no se despega con nada. La mejor compra del año.',
      verified: true
    },
    {
      id: 'rev-ter-2',
      productId: 'prod-termo-muertos-husky',
      author: 'Héctor Soto',
      petName: 'Ghost',
      rating: 5,
      date: 'Hace 6 días',
      comment: 'Excelente calidad de acero, muy cómodo el mango y la tapa no derrama nada. Además llegó con envío gratis súper rápido.',
      verified: true
    }
  ],
  'prod-placa-acero-luna': [
    {
      id: 'rev-pla-1',
      productId: 'prod-placa-acero-luna',
      author: 'Valeria R.',
      petName: 'Luna',
      rating: 5,
      date: 'Hace 5 días',
      comment: 'El acero es grueso, no se dobla ni se raya con las ramas del parque. Mis teléfonos al reverso se leen perfectamente claros. Da mucha tranquilidad.',
      verified: true
    }
  ],
  'prod-cuadro-memorial-recuerdo': [
    {
      id: 'rev-cua-1',
      productId: 'prod-cuadro-memorial-recuerdo',
      author: 'Familia Ramírez',
      petName: 'Koda & Negro',
      rating: 5,
      date: 'Hace 2 días',
      comment: 'Es un tributo conmovedor para honrar a nuestros angelitos. El mini papel picado y la madera tallada le dan una presencia hermosa a nuestro altar.',
      verified: true
    }
  ],
  'prod-vela-three-brother-cats': [
    {
      id: 'rev-vel-1',
      productId: 'prod-vela-three-brother-cats',
      author: 'Camila Torres',
      petName: 'Mis 3 michis',
      rating: 5,
      date: 'Hace 4 días',
      comment: 'El aroma de calabaza especiada y ámbar huele a otoño puro. La cera quema súper parejo sin humear.',
      verified: true
    }
  ]
};

export const DEFAULT_PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: 'rev-gen-1',
    productId: 'default',
    author: 'Andrea S.',
    petName: 'Milo',
    rating: 5,
    date: 'Hace 3 días',
    comment: 'La atención al cliente por WhatsApp fue maravillosa y la pieza superó lo que se ve en pantalla. El empaque de regalo azul noche con listón terracota coral es una joya.',
    verified: true
  },
  {
    id: 'rev-gen-2',
    productId: 'default',
    author: 'Jorge Navarro',
    petName: 'Rocky',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'Calidad de primera. Se nota el cariño y el trabajo artesanal mexicano en cada detalle.',
    verified: true
  }
];
