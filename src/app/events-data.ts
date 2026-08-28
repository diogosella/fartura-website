export type EventItem = {
  slug: string;
  title: string;
  description: string;
  details: string[];
  schedule: string[];
  href: string;
  image: string;
  start: string;
  end: string;
  venue: string;
  address: string;
  organizer: string;
  organizerPhone?: string;
  organizerEmail?: string;
  category: string;
};

export const eventItems: EventItem[] = [
  {
    slug: "pedal-da-padroeira",
    title: "Pedal da Padroeira",
    description:
      "II Etapa do Passeio Ciclístico 4 Estações, Estação Primavera, com concentração na Praça 9 de Julho e percursos light de 13 km e hard de 32 km.",
    details: [
      "O evento integra o Passeio Ciclístico 4 Estações, na etapa Primavera, com saída na Praça 9 de Julho.",
      "O percurso light tem 13 km e passa pela Igreja Matriz Nossa Senhora das Dores, Monumento da Padroeira, Rota dos Mirantes e Caminho das Águas.",
      "O percurso hard tem 32 km e amplia o trajeto por estradas rurais, capelas dos bairros Guaiuvira e Bortotti e retorno ao centro da cidade.",
    ],
    schedule: ["Concentração a partir das 6h", "Saída às 8h"],
    href: "https://www.turismo.fartura.sp.gov.br/evento/pedal-da-padroeira/",
    image: "/assets/events/pedal-padroeira-2026.jpeg",
    start: "2026-09-20T06:00:00-03:00",
    end: "2026-09-20T15:00:00-03:00",
    venue: "Praça 9 de Julho",
    address: "Praça 9 de Julho, Fartura, SP",
    organizer: "CTur + Secretaria de Esportes",
    organizerPhone: "(14) 3382 1016 / (14) 3382 1898",
    category: "Turísticos",
  },
  {
    slug: "especial-dia-das-criancas",
    title: "Especial Dia das Crianças - Show com o Palhaço Tubinho",
    description:
      "Apresentação especial de Dia das Crianças no Recinto de Exposições Luiz Garbelotto, com programação cultural aberta ao público.",
    details: [
      "O especial de Dia das Crianças terá show com o Palhaço Tubinho, em programação cultural realizada no Recinto de Exposições Luiz Garbelotto.",
      "A página oficial do evento informa data, horário, local, categorias e contato da organização.",
    ],
    schedule: ["Apresentação das 19h às 23h"],
    href: "https://www.turismo.fartura.sp.gov.br/evento/especial-dia-das-criancas/",
    image: "/assets/events/palhaco-tubinho.png",
    start: "2026-10-12T19:00:00-03:00",
    end: "2026-10-12T23:00:00-03:00",
    venue: "Recinto de Exposições Luiz Garbelotto",
    address: "Avenida Antonio Priolli, Fartura, SP",
    organizer: "CTur",
    organizerPhone: "1433821016",
    organizerEmail: "ctur@fartura.sp.gov.br",
    category: "Culturais",
  },
];
