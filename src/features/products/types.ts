
export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Medication {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  specifications?: Record<string, string>;
  reviews?: Review[];
}

// Mock data
export const medications: Medication[] = [
  {
    id: 1,
    name: "Extrato de Cannabis Sativa 36,76mg/ml – Ease Labs Pharma (30ml)",
    description: "Produto fitoterápico com 36,76 mg/ml de CBD, indicado para auxiliar no tratamento de condições como ansiedade e dores crônicas.",
    price: 375.00,
    image: "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png",
    images: [
      "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png",
      "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
      "/lovable-uploads/2bde0bd9-b878-4f46-95f9-abb77613dc6b.png"
    ],
    specifications: {
      "Concentração": "36,76 mg/ml de CBD",
      "Volume": "30ml",
      "Fabricante": "Ease Labs Pharma",
      "Forma": "Óleo para uso oral",
      "Indicação principal": "Ansiedade e dores crônicas",
      "Conservação": "Conservar em temperatura ambiente entre 15°C e 30°C"
    },
    reviews: [
      {
        id: 1,
        userName: "Maria S.",
        rating: 5,
        comment: "Excelente produto! Ajudou muito no controle da minha ansiedade. Recomendo totalmente.",
        date: "15/04/2025"
      },
      {
        id: 2,
        userName: "João P.",
        rating: 4,
        comment: "Estou usando há 2 meses para dores crônicas e percebi uma melhora significativa. O gosto não é dos melhores, mas os benefícios compensam.",
        date: "02/04/2025"
      },
      {
        id: 3,
        userName: "Ana L.",
        rating: 5,
        comment: "Ótimo produto, entrega rápida e embalagem discreta. Tem me ajudado muito com insônia.",
        date: "27/03/2025"
      }
    ]
  },
  {
    id: 2,
    name: "Canabidiol Herbarium 200mg/ml (30ml)",
    description: "Solução oral com alta concentração de CBD, indicada para casos de epilepsia refratária e outras condições neurológicas.",
    price: 2210.69,
    image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
    images: [
      "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
      "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png"
    ],
    specifications: {
      "Concentração": "200 mg/ml de CBD",
      "Volume": "30ml",
      "Fabricante": "Herbarium",
      "Forma": "Solução oral",
      "Indicação principal": "Epilepsia refratária",
      "Conservação": "Conservar em temperatura ambiente entre 15°C e 30°C"
    },
    reviews: [
      {
        id: 1,
        userName: "Roberto C.",
        rating: 5,
        comment: "Produto de qualidade excepcional! Superou minhas expectativas.",
        date: "10/04/2025"
      },
      {
        id: 2,
        userName: "Fernanda M.",
        rating: 5,
        comment: "Estava em dúvida se valeria o investimento, mas depois de um mês de uso posso dizer que sim.",
        date: "05/04/2025"
      }
    ]
  },
  {
    id: 3,
    name: "Canabidiol 20mg/ml – Prati-Donaduzzi (30ml)",
    description: "Solução oral com 20 mg/ml de CBD, indicada para auxiliar no tratamento de epilepsia e outras condições neurológicas.",
    price: 92.79,
    image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
    reviews: [
      {
        id: 1,
        userName: "Carlos R.",
        rating: 4,
        comment: "Bom produto para iniciantes. Concentração mais baixa, mas eficaz.",
        date: "12/04/2025"
      },
      {
        id: 2,
        userName: "Mariana T.",
        rating: 3,
        comment: "Efeito moderado. Para meu caso, precisei de uma concentração maior.",
        date: "30/03/2025"
      }
    ]
  },
  {
    id: 4,
    name: "Canabidiol 79,14mg/ml – GreenCare (30ml)",
    description: "Solução oral com 79,14 mg/ml de CBD, indicada para tratamento de dores crônicas e distúrbios neurológicos.",
    price: 994.42,
    image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png"
  },
  {
    id: 5,
    name: "Óleo CBD 1000mg – Naturecan (30ml)",
    description: "Óleo com 1000 mg de CBD, indicado para auxiliar no alívio de sintomas de ansiedade e estresse.",
    price: 499.00,
    image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png"
  },
  {
    id: 6,
    name: "Óleo de Cannabis – Abrace Esperança (30ml)",
    description: "Óleo de CBD com preço acessível, voltado para pacientes com dificuldades financeiras, indicado para diversas condições neurológicas.",
    price: 79.00,
    image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png"
  }
];

// Helper functions
export const getRelatedProducts = (currentId: number): Medication[] => {
  // Exclui o produto atual e retorna até 3 produtos relacionados
  return medications.filter(med => med.id !== currentId).slice(0, 3);
};

export const calculateAverageRating = (reviews?: Review[]): number | undefined => {
  if (!reviews || reviews.length === 0) return undefined;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};
