import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ── Dummy Data ───────────────────────────────────────────────────────────────

const suv = [
  {
    model: "Terios X MT",
    transmisi: "Manual",
    harga: "Rp 238.150.000",
  },
  {
    model: "Terios X AT",
    transmisi: "Otomatis",
    harga: "Rp 251.150.000",
  },
  {
    model: "Terios R AT",
    transmisi: "Otomatis",
    harga: "Rp 272.750.000",
  },
  {
    model: "Rocky 1.2 X MT",
    transmisi: "Manual",
    harga: "Rp 222.400.000",
  },
  {
    model: "Rocky 1.2 R CVT",
    transmisi: "Otomatis (CVT)",
    harga: "Rp 254.400.000",
  },
  {
    model: "Rocky 1.2 R Turbo CVT",
    transmisi: "Otomatis (CVT)",
    harga: "Rp 276.900.000",
  },
];

const mpv = [
  {
    model: "Xenia 1.3 M MT",
    transmisi: "Manual",
    harga: "Rp 198.600.000",
  },
  {
    model: "Xenia 1.3 X MT",
    transmisi: "Manual",
    harga: "Rp 218.600.000",
  },
  {
    model: "Xenia 1.3 X AT",
    transmisi: "Otomatis",
    harga: "Rp 230.600.000",
  },
  {
    model: "Xenia 1.5 R MT",
    transmisi: "Manual",
    harga: "Rp 236.400.000",
  },
  {
    model: "Xenia 1.5 R AT",
    transmisi: "Otomatis",
    harga: "Rp 248.400.000",
  },
  {
    model: "Luxio X MT",
    transmisi: "Manual",
    harga: "Rp 264.900.000",
  },
];

const commercial = [
  {
    model: "Gran Max Pick Up 1.3 STD",
    transmisi: "Manual",
    harga: "Rp 185.000.000",
  },
  {
    model: "Gran Max Pick Up 1.5 STD",
    transmisi: "Manual",
    harga: "Rp 194.500.000",
  },
  {
    model: "Gran Max MB 1.3 STD",
    transmisi: "Manual",
    harga: "Rp 199.700.000",
  },
  {
    model: "Gran Max MB 1.5 D",
    transmisi: "Manual",
    harga: "Rp 218.100.000",
  },
  {
    model: "Himax PU STD MT",
    transmisi: "Manual",
    harga: "Rp 175.200.000",
  },
];

// ── Price Table ───────────────────────────────────────────────────────────────

function PriceTable({
  data,
}: {
  data: { model: string; transmisi: string; harga: string }[];
}) {
  return (
    <div className="rounded-xl border border-zinc-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-50 hover:bg-zinc-50">
            <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4 pl-6">
              Model &amp; Tipe
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4">
              Transmisi
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4 pr-6 text-right">
              Harga (Rp)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              className="border-zinc-100 hover:bg-zinc-50 transition-colors"
            >
              <TableCell className="py-4 pl-6 font-medium text-zinc-900">
                {row.model}
              </TableCell>
              <TableCell className="py-4 text-sm text-zinc-500">
                {row.transmisi}
              </TableCell>
              <TableCell className="py-4 pr-6 text-right font-semibold text-zinc-800">
                {row.harga}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PricelistPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-red-600 uppercase">
            Harga OTR
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Daftar Harga OTR Aceh
          </h1>
          <p className="text-sm text-zinc-400 max-w-md">
            Harga yang tercantum adalah harga On The Road (OTR) Aceh dan dapat
            berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Hubungi kami
            untuk konfirmasi harga terkini.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="suv">
          <TabsList className="mb-8 bg-zinc-100 rounded-full p-1 h-auto gap-1">
            <TabsTrigger
              value="suv"
              className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500 transition-all"
            >
              SUV
            </TabsTrigger>
            <TabsTrigger
              value="mpv"
              className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500 transition-all"
            >
              MPV
            </TabsTrigger>
            <TabsTrigger
              value="commercial"
              className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500 transition-all"
            >
              Komersial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suv">
            <PriceTable data={suv} />
          </TabsContent>
          <TabsContent value="mpv">
            <PriceTable data={mpv} />
          </TabsContent>
          <TabsContent value="commercial">
            <PriceTable data={commercial} />
          </TabsContent>
        </Tabs>

        <p className="mt-6 text-xs text-zinc-300 text-right">
          * Harga belum termasuk aksesori tambahan. Update: Maret 2026.
        </p>
      </div>
    </div>
  );
}
