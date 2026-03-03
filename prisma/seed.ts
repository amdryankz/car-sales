import { PrismaClient } from "../app/generated/prisma/client";
import { scryptSync, randomBytes } from "crypto";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

// ── Helpers ──────────────────────────────────────────────────────────────────

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  console.log("🌱 Starting seed...");

  // ── Clear existing data ──────────────────────────────────────────────────────
  await prisma.vehicleVariant.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.user.deleteMany();
  console.log("🗑️  Cleared existing data.");

  // ── Vehicles ─────────────────────────────────────────────────────────────────

  // 1. Daihatsu Rocky
  const rocky = await prisma.vehicle.create({
    data: {
      name: "Daihatsu Rocky",
      slug: "daihatsu-rocky",
      category: "SUV",
      description: "Compact SUV tangguh",
      imageUrl:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop",
      isFeatured: true,
      variants: {
        create: [
          { name: "1.2 M MT", price: 208000000 },
          { name: "1.0 R TC CVT", price: 273000000 },
        ],
      },
    },
  });
  console.log(`✅ Created: ${rocky.name}`);

  // 2. All New Xenia
  const xenia = await prisma.vehicle.create({
    data: {
      name: "All New Xenia",
      slug: "all-new-xenia",
      category: "MPV",
      description: "Sahabat keluarga",
      imageUrl:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop",
      isFeatured: true,
      variants: {
        create: [
          { name: "1.3 M MT", price: 222000000 },
          { name: "1.5 R CVT", price: 279000000 },
        ],
      },
    },
  });
  console.log(`✅ Created: ${xenia.name}`);

  // 3. Daihatsu Sigra
  const sigra = await prisma.vehicle.create({
    data: {
      name: "Daihatsu Sigra",
      slug: "daihatsu-sigra",
      category: "LCGC MPV",
      description: "Mobil idaman keluarga",
      imageUrl:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop",
      isFeatured: false,
      variants: {
        create: [
          { name: "1.0 D MT", price: 138000000 },
          { name: "1.2 R AT", price: 181000000 },
        ],
      },
    },
  });
  console.log(`✅ Created: ${sigra.name}`);

  // ── Promo ────────────────────────────────────────────────────────────────────

  const now = new Date();
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 2);

  const promo = await prisma.promo.create({
    data: {
      title: "DP Ringan Sigra Mulai 10 Jutaan",
      slug: "dp-ringan-sigra-10-juta",
      description:
        "Dapatkan kemudahan memiliki Daihatsu Sigra dengan uang muka mulai dari Rp 10.000.000. Cicilan ringan, proses mudah, dan cepat disetujui.",
      imageUrl:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
      startDate: now,
      endDate,
      isActive: true,
    },
  });
  console.log(`✅ Created promo: ${promo.title}`);

  // ── Admin User ────────────────────────────────────────────────────────────────

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@daihatsu.local",
      role: "ADMIN",
      password: hashPassword("admin123456"),
    },
  });
  console.log(`✅ Created admin user: ${adminUser.email}`);
  console.log(`   Password: admin123456  ← change this after first login!`);

  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
