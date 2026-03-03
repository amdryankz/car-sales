import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ── Dummy Vehicle Data ────────────────────────────────────────────────────────

const vehicles: Record<
  string,
  {
    name: string;
    category: string;
    startingPrice: string;
    description: string;
    image: string;
    variants: { tipe: string; harga: string }[];
  }
> = {
  rocky: {
    name: "Daihatsu Rocky",
    category: "Compact SUV",
    startingPrice: "Rp 222.400.000",
    description:
      "Rocky hadir sebagai SUV kompak yang berani tampil beda. Dengan desain eksterior yang bold, kabin yang modern, dan teknologi turbo terkini, Rocky menjawab kebutuhan Anda sebagai kendaraan harian maupun petualangan akhir pekan. Dibekali mesin 1.2L turbo bertenaga tinggi dan transmisi CVT yang halus.",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop",
    variants: [
      { tipe: "Rocky 1.2 X MT", harga: "Rp 222.400.000" },
      { tipe: "Rocky 1.2 X CVT", harga: "Rp 235.900.000" },
      { tipe: "Rocky 1.2 R CVT", harga: "Rp 254.400.000" },
      { tipe: "Rocky 1.2 R Turbo CVT", harga: "Rp 276.900.000" },
      { tipe: "Rocky 1.2 R Turbo CVT ADS", harga: "Rp 291.500.000" },
    ],
  },
  xenia: {
    name: "Daihatsu Xenia",
    category: "Low MPV",
    startingPrice: "Rp 198.600.000",
    description:
      "Xenia adalah pilihan sempurna untuk keluarga Indonesia yang dinamis. Dengan kabin luas, kursi tiga baris, dan konsumsi bahan bakar yang efisien, Xenia mampu bersama Anda di setiap momen berharga keluarga — dari perjalanan harian hingga liburan jauh.",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1600&auto=format&fit=crop",
    variants: [
      { tipe: "Xenia 1.3 M MT", harga: "Rp 198.600.000" },
      { tipe: "Xenia 1.3 X MT", harga: "Rp 218.600.000" },
      { tipe: "Xenia 1.3 X AT", harga: "Rp 230.600.000" },
      { tipe: "Xenia 1.5 R MT", harga: "Rp 236.400.000" },
      { tipe: "Xenia 1.5 R AT", harga: "Rp 248.400.000" },
    ],
  },
  terios: {
    name: "Daihatsu Terios",
    category: "SUV",
    startingPrice: "Rp 238.150.000",
    description:
      "Terios adalah SUV andalan Daihatsu yang dirancang untuk menaklukkan berbagai kondisi jalan. Ground clearance tinggi, sistem penggerak empat roda, dan desain yang tangguh menjadikan Terios teman setia di segala medan — baik dalam kota maupun off-road.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1600&auto=format&fit=crop",
    variants: [
      { tipe: "Terios X MT", harga: "Rp 238.150.000" },
      { tipe: "Terios X AT", harga: "Rp 251.150.000" },
      { tipe: "Terios R AT", harga: "Rp 272.750.000" },
      { tipe: "Terios R AT Custom", harga: "Rp 284.500.000" },
    ],
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(vehicles).map((slug) => ({ slug }));
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = vehicles[slug];

  if (!vehicle) notFound();

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/pricelist"
            className="hover:text-zinc-700 transition-colors"
          >
            Pricelist
          </Link>
          <span>/</span>
          <span className="text-zinc-600 font-medium">{vehicle.name}</span>
        </nav>

        {/* ── 2-Column Layout ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          {/* Left: Image */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-zinc-100">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-6">
            {/* Category Badge */}
            <Badge
              variant="secondary"
              className="w-fit rounded-full bg-zinc-100 text-zinc-500 border-0 text-xs font-semibold tracking-widest uppercase px-3 py-1"
            >
              {vehicle.category}
            </Badge>

            {/* Name */}
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl leading-tight">
              {vehicle.name}
            </h1>

            {/* Starting Price */}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                Harga Mulai
              </span>
              <span className="text-2xl font-bold text-zinc-900">
                {vehicle.startingPrice}
              </span>
              <span className="text-xs text-zinc-400">
                *Harga OTR Aceh, dapat berubah sewaktu-waktu
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-100" />

            {/* Description */}
            <p className="text-sm leading-relaxed text-zinc-500">
              {vehicle.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-7 py-5 text-sm font-semibold shadow-none transition-colors"
              >
                <Link href="/contact?topic=sales">Simulasi Kredit</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-zinc-300 px-7 py-5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 shadow-none transition-colors"
              >
                <Link href="/contact?topic=testdrive">Booking Test Drive</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Variants & Pricing Table ── */}
        <div className="mt-20">
          <div className="mb-6 flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-red-600 uppercase">
              Spesifikasi Harga
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
              Varian &amp; Harga
            </h2>
            <p className="text-sm text-zinc-400">
              Pilih varian yang sesuai dengan kebutuhan dan anggaran Anda.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                  <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4 pl-6">
                    Tipe Varian
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4 pr-6 text-right">
                    Harga OTR
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicle.variants.map((v, i) => (
                  <TableRow
                    key={i}
                    className="border-zinc-100 hover:bg-zinc-50 transition-colors"
                  >
                    <TableCell className="py-4 pl-6 font-medium text-zinc-900">
                      {v.tipe}
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-right font-semibold text-zinc-800">
                      {v.harga}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="mt-4 text-xs text-zinc-300 text-right">
            * Harga OTR Aceh. Update: Maret 2026.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/pricelist"
            className="text-sm font-medium text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            ← Kembali ke Pricelist
          </Link>
        </div>
      </div>
    </div>
  );
}
