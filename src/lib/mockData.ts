import type { Listing, StoreProduct } from "@/types";

export const FEATURED_LISTINGS: Listing[] = [
  {
    id: 1,
    type: "CAMBIO",
    description: "Tengo doble, busco Mbappé o De Bruyne",
    status: "ACTIVE",
    createdAt: "2026-05-01T10:00:00Z",
    user: { id: 1, name: "Pablo M.", province: "Buenos Aires", city: "Pilar" },
    player: {
      id: 1,
      name: "Lionel Messi",
      country: "Argentina",
      number: 7,
      position: "Delantero",
      section: "ARG",
      image: "https://ui-avatars.com/api/?name=Lionel+Messi&background=1e3a8a&color=fbbf24&size=200&bold=true&font-size=0.33",
    },
  },
  {
    id: 2,
    type: "VENDO",
    price: 800,
    description: "Figurita en perfecto estado",
    status: "ACTIVE",
    createdAt: "2026-05-02T11:00:00Z",
    user: { id: 2, name: "Sofía R.", province: "Córdoba", city: "Córdoba" },
    player: {
      id: 2,
      name: "Kylian Mbappé",
      country: "Francia",
      number: 10,
      position: "Delantero",
      section: "FRA",
      image: "https://ui-avatars.com/api/?name=Kylian+Mbappe&background=002395&color=ffffff&size=200&bold=true&font-size=0.33",
    },
  },
  {
    id: 3,
    type: "BUSCO",
    description: "La busco urgente para completar la página de Noruega",
    status: "ACTIVE",
    createdAt: "2026-05-03T09:30:00Z",
    user: { id: 3, name: "Lucas G.", province: "Santa Fe", city: "Rosario" },
    player: {
      id: 3,
      name: "Erling Haaland",
      country: "Noruega",
      number: 9,
      position: "Delantero",
      section: "NOR",
      image: "https://ui-avatars.com/api/?name=Erling+Haaland&background=ef2b2d&color=ffffff&size=200&bold=true&font-size=0.33",
    },
  },
  {
    id: 4,
    type: "CAMBIO",
    description: "La cambio por cualquier figura de Brasil",
    status: "ACTIVE",
    createdAt: "2026-05-03T14:00:00Z",
    user: { id: 4, name: "Ana F.", province: "Mendoza", city: "Mendoza" },
    player: {
      id: 4,
      name: "Vinicius Jr",
      country: "Brasil",
      number: 7,
      position: "Delantero",
      section: "BRA",
      image: "https://ui-avatars.com/api/?name=Vinicius+Jr&background=009c3b&color=ffdf00&size=200&bold=true&font-size=0.33",
    },
  },
  {
    id: 5,
    type: "VENDO",
    price: 500,
    description: "La conseguí doble en el primer sobre",
    status: "ACTIVE",
    createdAt: "2026-05-04T16:00:00Z",
    user: { id: 5, name: "Martín T.", province: "Buenos Aires", city: "Derqui" },
    player: {
      id: 5,
      name: "Pedri",
      country: "España",
      number: 8,
      position: "Mediocampista",
      section: "ESP",
      image: "https://ui-avatars.com/api/?name=Pedri&background=aa151b&color=f1bf00&size=200&bold=true&font-size=0.33",
    },
  },
  {
    id: 6,
    type: "BUSCO",
    description: "Para completar la colección de España",
    status: "ACTIVE",
    createdAt: "2026-05-05T10:15:00Z",
    user: { id: 6, name: "Carla P.", province: "CABA", city: "Buenos Aires" },
    player: {
      id: 6,
      name: "Lamine Yamal",
      country: "España",
      number: 19,
      position: "Delantero",
      section: "ESP",
      image: "https://ui-avatars.com/api/?name=Lamine+Yamal&background=aa151b&color=f1bf00&size=200&bold=true&font-size=0.33",
    },
  },
];

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 1,
    name: "Sobre x5 Figuritas",
    description: "5 figuritas del álbum oficial del Mundial 2026 seleccionadas al azar.",
    price: 600,
    type: "SOBRE",
    image: "/store/sobre.png",
    stock: 200,
    active: true,
  },
  {
    id: 2,
    name: "Pack x25 Figuritas",
    description: "25 figuritas. Mejor precio por cantidad. Ideal para arrancar la colección.",
    price: 2500,
    type: "PACK",
    image: "/store/pack.png",
    stock: 80,
    active: true,
  },
  {
    id: 3,
    name: "Pack x50 Figuritas",
    description: "50 figuritas sin repetir. Completá la mitad del álbum de una.",
    price: 4500,
    type: "PACK",
    image: "/store/pack-grande.png",
    stock: 40,
    active: true,
  },
  {
    id: 4,
    name: "Álbum Vacío Oficial",
    description: "Álbum oficial del Mundial 2026 sin figuritas. Tapa dura, incluye 2 sobres.",
    price: 3500,
    type: "ALBUM",
    image: "/store/album.png",
    stock: 25,
    active: true,
  },
  {
    id: 5,
    name: "Álbum Completo",
    description: "El álbum con las 980 figuritas. Para el coleccionista exigente.",
    price: 95000,
    type: "ALBUM",
    image: "/store/album-completo.png",
    stock: 3,
    active: true,
  },
];

export const FAQ_ITEMS = [
  {
    question: "¿Cómo funciona el intercambio?",
    answer:
      "Publicás las figuritas que tenés dobles en 'Ofrezco' y las que te faltan en 'Busco'. El sistema te muestra usuarios con los que podés hacer match. Acordás el lugar de encuentro o el envío y ¡listo!",
  },
  {
    question: "¿Es seguro intercambiar con desconocidos?",
    answer:
      "Todos los usuarios están registrados con email verificado. Podés ver el historial de intercambios y la reputación de cada usuario. Recomendamos encontrarse en lugares públicos o usar correo con seguro de envío.",
  },
  {
    question: "¿Cómo compro figuritas o el álbum?",
    answer:
      "En la sección 'Tienda' encontrás sobres, packs y álbumes directamente de Cambiazo. El pago es por transferencia bancaria o Mercado Pago y el envío por correo a todo el país.",
  },
  {
    question: "¿Puedo vender mis figuritas dobles?",
    answer:
      "Sí. Al publicar una figurita podés elegir el tipo 'Vendo' y poner el precio que querés. Otros usuarios te pueden contactar a través de la plataforma.",
  },
  {
    question: "¿Cuánto cuesta usar Cambiazo?",
    answer:
      "Registrarte y publicar intercambios es completamente gratis. Solo pagás cuando comprás productos en la tienda oficial.",
  },
  {
    question: "¿Cómo encuentro usuarios cerca de mi zona?",
    answer:
      "Al registrarte podés indicar tu provincia y ciudad. Así te mostramos primero los usuarios de tu zona para facilitar el encuentro en persona.",
  },
  {
    question: "¿Qué hago si me estafan?",
    answer:
      "Tenemos un sistema de reporte de usuarios. Si un usuario no cumple con el intercambio podés reportarlo y será revisado. Con suficientes reportes la cuenta es bloqueada.",
  },
  {
    question: "¿Las figuritas son oficiales?",
    answer:
      "Las figuritas que vendemos en nuestra tienda son oficiales del álbum Panini del Mundial 2026. Las que intercambian los usuarios son responsabilidad de cada uno.",
  },
];
