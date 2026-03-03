import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ── Dummy Data ────────────────────────────────────────────────────────────────

const promos = [
  {
    id: 1,
    title: "Bunga 0% Tenor 1 Tahun — Xenia",
    description:
      "Nikmati kemudahan memiliki Daihatsu Xenia dengan bunga 0% untuk tenor 1 tahun. Cicilan mulai dari Rp 4 jutaan per bulan.",
    validity: "Berlaku s/d 31 Maret 2026",
    image:
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "DP Ringan 10% — Rocky Turbo CVT",
    description:
      "Dapatkan Rocky Turbo CVT dengan DP hanya 10% dari harga OTR. Syarat dan ketentuan berlaku.",
    validity: "Berlaku s/d 31 Maret 2026",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cashback Rp 10 Juta — Gran Max Pick Up",
    description:
      "Beli Gran Max Pick Up dan dapatkan cashback senilai Rp 10.000.000 untuk pembelian di bulan ini.",
    validity: "Berlaku s/d Akhir Bulan",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Free Aksesori Senilai Rp 5 Juta — Terios",
    description:
      "Setiap pembelian Daihatsu Terios varian apapun mendapatkan aksesori gratis senilai Rp 5.000.000.",
    validity: "Berlaku s/d 15 Maret 2026",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Trade-In Bonus Rp 3 Juta — Semua Model",
    description:
      "Tukar kendaraan lama Anda dan dapatkan bonus tambahan Rp 3.000.000 di atas nilai appraisal.",
    validity: "Berlaku s/d Akhir Kuartal",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Cicilan Ringan Mulai Rp 2,9 Juta — Ayla",
    description:
      "Miliki Daihatsu Ayla, kendaraan tangguh untuk kebutuhan harian Anda, dengan cicilan mulai Rp 2,9 juta.",
    validity: "Berlaku s/d 31 Maret 2026",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800&auto=format&fit=crop",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PromoPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-red-600 uppercase">
            Promo Bulan Ini
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Penawaran Spesial
          </h1>
          <p className="text-sm text-zinc-400 max-w-md">
            Manfaatkan berbagai penawaran eksklusif dari Astra Daihatsu Aceh.
            Stok dan kuota terbatas — segera hubungi tim sales kami.
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promos.map((promo) => (
            <Card
              key={promo.id}
              className="group border border-zinc-100 bg-white shadow-none rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100 shrink-0">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <CardContent className="flex flex-col gap-3 p-5 flex-1">
                {/* Badge */}
                <Badge
                  variant="secondary"
                  className="w-fit rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-medium px-2.5 py-0.5"
                >
                  {promo.validity}
                </Badge>

                {/* Title */}
                <h3 className="text-base font-bold text-zinc-900 leading-snug">
                  {promo.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                  {promo.description}
                </p>

                {/* CTA */}
                <Button
                  asChild
                  className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold shadow-none transition-colors"
                >
                  <Link href="/contact">Klaim Promo</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
