import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLAYERS = [
  // Argentina
  { name: "Emiliano Martínez", country: "Argentina", number: 1, position: "Arquero", section: "ARG" },
  { name: "Lionel Messi", country: "Argentina", number: 7, position: "Delantero", section: "ARG" },
  { name: "Ángel Di María", country: "Argentina", number: 11, position: "Delantero", section: "ARG" },
  { name: "Lautaro Martínez", country: "Argentina", number: 22, position: "Delantero", section: "ARG" },
  // Brasil
  { name: "Vinicius Jr", country: "Brasil", number: 101, position: "Delantero", section: "BRA" },
  { name: "Rodrygo", country: "Brasil", number: 102, position: "Delantero", section: "BRA" },
  { name: "Endrick", country: "Brasil", number: 103, position: "Delantero", section: "BRA" },
  // Francia
  { name: "Kylian Mbappé", country: "Francia", number: 201, position: "Delantero", section: "FRA" },
  { name: "Antoine Griezmann", country: "Francia", number: 202, position: "Delantero", section: "FRA" },
  // España
  { name: "Pedri", country: "España", number: 301, position: "Mediocampista", section: "ESP" },
  { name: "Lamine Yamal", country: "España", number: 302, position: "Delantero", section: "ESP" },
  { name: "Gavi", country: "España", number: 303, position: "Mediocampista", section: "ESP" },
  // Noruega
  { name: "Erling Haaland", country: "Noruega", number: 401, position: "Delantero", section: "NOR" },
  // Alemania
  { name: "Jamal Musiala", country: "Alemania", number: 501, position: "Mediocampista", section: "GER" },
  { name: "Florian Wirtz", country: "Alemania", number: 502, position: "Mediocampista", section: "GER" },
];

const STORE_PRODUCTS = [
  { name: "Sobre x5 Figuritas", description: "5 figuritas al azar del álbum oficial.", price: 600, type: "SOBRE", stock: 200 },
  { name: "Pack x25 Figuritas", description: "25 figuritas. Mejor precio por cantidad.", price: 2500, type: "PACK", stock: 80 },
  { name: "Pack x50 Figuritas", description: "50 figuritas sin repetir.", price: 4500, type: "PACK", stock: 40 },
  { name: "Álbum Vacío Oficial", description: "Álbum oficial del Mundial 2026 sin figuritas.", price: 3500, type: "ALBUM", stock: 25 },
  { name: "Álbum Completo", description: "El álbum con las 980 figuritas completas.", price: 95000, type: "ALBUM", stock: 3 },
];

async function main() {
  console.log("🌱 Seeding catalog data (players + store products)...");

  for (const player of PLAYERS) {
    await prisma.player.upsert({
      where: { id: player.number },
      update: {},
      create: player,
    });
  }

  for (const product of STORE_PRODUCTS) {
    await prisma.storeProduct.create({ data: product }).catch(() => {});
  }

  console.log("✅ Seed completado!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
