import dotenv from "dotenv"
dotenv.config()

import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Camiseta Basic",
        slug: "camiseta-basic",
        description: "Camiseta 100% algodão com caimento regular.",
        price: 79.9,
        color: "Preto",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Camiseta+Basic",
        stock: 120,
        isActive: true,
      },
      {
        name: "Calça Jogger",
        slug: "calca-jogger",
        description: "Calça jogger confortável com tecido stretch.",
        price: 149.9,
        color: "Cinza",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Calca+Jogger",
        stock: 80,
        isActive: true,
      },
      {
        name: "Jaqueta Bomber",
        slug: "jaqueta-bomber",
        description: "Jaqueta bomber com acabamento em ribana.",
        price: 249.9,
        color: "Verde Militar",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Jaqueta+Bomber",
        stock: 45,
        isActive: true,
      },
      {
        name: "Tênis Street",
        slug: "tenis-street",
        description: "Tênis para uso diário com sola antiderrapante.",
        price: 299.9,
        color: "Branco",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Tenis+Street",
        stock: 60,
        isActive: true,
      },
      {
        name: "Moleton Oversized",
        slug: "moleton-oversized",
        description: "Moleton oversized com capuz e bolso frontal.",
        price: 179.9,
        color: "Azul Marinho",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Moleton+Oversized",
        stock: 90,
        isActive: true,
      },
      {
        name: "Shorts Denim",
        slug: "shorts-denim",
        description: "Shorts jeans com lavagem clara e modelagem reta.",
        price: 129.9,
        color: "Azul Claro",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Shorts+Denim",
        stock: 70,
        isActive: true,
      },
      {
        name: "Camisa Polo",
        slug: "camisa-polo",
        description: "Camisa polo com gola em ribana e tecido leve.",
        price: 99.9,
        color: "Branco",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Camisa+Polo",
        stock: 110,
        isActive: true,
      },
      {
        name: "Boné Trucker",
        slug: "bone-trucker",
        description: "Boné trucker com fechamento ajustável.",
        price: 59.9,
        color: "Preto",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Bone+Trucker",
        stock: 150,
        isActive: true,
      },
      {
        name: "Mochila Urbana",
        slug: "mochila-urbana",
        description: "Mochila com compartimento para notebook e bolsos frontais.",
        price: 189.9,
        color: "Cinza",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Mochila+Urbana",
        stock: 40,
        isActive: true,
      },
      {
        name: "Carteira Minimal",
        slug: "carteira-minimal",
        description: "Carteira slim em material sintético resistente.",
        price: 49.9,
        color: "Marrom",
        imageUrl: "https://via.placeholder.com/400x400.png?text=Carteira+Minimal",
        stock: 200,
        isActive: true,
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
