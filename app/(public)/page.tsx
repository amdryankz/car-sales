import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp");
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const featuredVehicles = await prisma.vehicle.findMany({
    where: { isFeatured: true },
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col">
      {/* ── Section A: Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center py-20 lg:py-28">
            {/* Text Column */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-500 shadow-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
                Dealer Resmi · Aceh
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Eksplorasi <span className="text-zinc-400">Perjalanan</span>
                <br />
                Baru Anda.
              </h1>

              <p className="max-w-md text-base leading-relaxed text-zinc-500 sm:text-lg">
                Temukan kendaraan Daihatsu impian dengan penawaran terbaik dan
                cicilan ringan hanya di dealer resmi kami.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full px-7 py-5 text-sm font-semibold shadow-none transition-colors"
                >
                  <Link href="/pricelist">Lihat Pricelist</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-zinc-300 px-7 py-5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 shadow-none transition-colors"
                >
                  <Link href="/simulasi">Simulasi Kredit</Link>
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              {/* Decorative blob */}
              <div className="absolute -top-10 -right-10 h-105 w-105 rounded-full bg-red-50/70 blur-3xl" />
              <div className="relative w-full max-w-xl">
                <Image
                  src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2000&auto=format&fit=crop"
                  alt="Daihatsu – hero vehicle"
                  width={700}
                  height={450}
                  priority
                  className="relative z-10 w-full h-auto rounded-2xl object-cover shadow-2xl shadow-zinc-200"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section B: Featured Vehicles ─────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-12 flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-red-600 uppercase">
              Lineup Terpilih
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Pilihan Favorit
            </h2>
            <p className="mt-1 text-sm text-zinc-400 max-w-sm">
              Kendaraan paling diminati pelanggan kami — dirancang untuk setiap
              perjalanan Anda.
            </p>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle) => {
              const startingPrice =
                vehicle.variants.length > 0
                  ? Math.min(...vehicle.variants.map((v) => Number(v.price)))
                  : null;

              return (
                <Card
                  key={vehicle.id}
                  className="group border-0 bg-zinc-50 shadow-none rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  {/* Car Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-zinc-100">
                    {vehicle.imageUrl ? (
                      <Image
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-300 text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  <CardContent className="flex flex-col gap-1.5 p-5">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      {vehicle.category}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900">
                      {vehicle.name}
                    </h3>
                    {startingPrice !== null && (
                      <p className="text-sm text-zinc-500">
                        Mulai dari{" "}
                        <span className="font-semibold text-zinc-800">
                          {formatRupiah(startingPrice)}
                        </span>
                      </p>
                    )}

                    <Link
                      href={`/mobil/${vehicle.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-red-600 transition-colors"
                    >
                      Lihat Detail
                      <ChevronRight size={14} />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* View all */}
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-zinc-200 px-8 py-5 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 shadow-none"
            >
              <Link href="/pricelist">
                Lihat Semua Kendaraan
                <ArrowRight size={14} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Section C: Promo Teaser ───────────────────────────────────────── */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-red-50 border border-red-100 px-8 py-14 sm:px-14 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            {/* Text */}
            <div className="flex flex-col gap-3 max-w-lg">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-red-600 shadow-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Penawaran Terbatas
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                Promo Spesial Bulan Ini
              </h2>
              <p className="text-base text-zinc-600 leading-relaxed">
                Bunga <span className="font-bold text-red-600">0%</span> atau DP
                Ringan mulai{" "}
                <span className="font-bold text-zinc-900">10%</span> untuk
                model-model pilihan. Segera manfaatkan sebelum kuota habis.
              </p>
            </div>

            {/* CTA */}
            <div className="shrink-0">
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-5 text-sm font-semibold shadow-none transition-colors"
              >
                <Link href="/promo">
                  Lihat Semua Promo
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
