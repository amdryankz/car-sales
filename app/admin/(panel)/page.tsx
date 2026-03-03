import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Car, Tag, PhoneCall } from "lucide-react";

// ── Dummy Data ────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Total Leads",
    value: "124",
    sub: "+12 minggu ini",
    icon: Users,
    trend: "up",
  },
  {
    label: "Test Drive Baru",
    value: "8",
    sub: "Menunggu konfirmasi",
    icon: PhoneCall,
    trend: "neutral",
  },
  {
    label: "Kendaraan Aktif",
    value: "15",
    sub: "3 kategori",
    icon: Car,
    trend: "neutral",
  },
  {
    label: "Promo Aktif",
    value: "2",
    sub: "Berlaku bulan ini",
    icon: Tag,
    trend: "neutral",
  },
];

const recentLeads = [
  {
    id: 1,
    name: "Rizky Maulana",
    phone: "+62 812-3456-7890",
    topic: "Pembelian Kendaraan",
    vehicle: "Rocky 1.2 R Turbo CVT",
    status: "Baru",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    phone: "+62 813-9876-5432",
    topic: "Test Drive",
    vehicle: "Xenia 1.5 R AT",
    status: "Diproses",
  },
  {
    id: 3,
    name: "Ahmad Fauzi",
    phone: "+62 856-1122-3344",
    topic: "Simulasi Kredit",
    vehicle: "Terios R AT",
    status: "Selesai",
  },
  {
    id: 4,
    name: "Dewi Anggraeni",
    phone: "+62 821-4455-6677",
    topic: "Informasi Umum",
    vehicle: "-",
    status: "Baru",
  },
  {
    id: 5,
    name: "Hendra Kurniawan",
    phone: "+62 877-8899-0011",
    topic: "Promo & Penawaran",
    vehicle: "Gran Max Pick Up 1.5",
    status: "Diproses",
  },
];

const statusConfig: Record<string, string> = {
  Baru: "bg-blue-50 text-blue-600 border-blue-100",
  Diproses: "bg-amber-50 text-amber-600 border-amber-100",
  Selesai: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Selamat datang kembali. Berikut ringkasan aktivitas hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="border border-zinc-100 bg-white shadow-none rounded-2xl"
          >
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                  {stat.label}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50">
                  <stat.icon size={15} className="text-zinc-500" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-3xl font-extrabold text-zinc-900">
                  {stat.value}
                </span>
                <span className="text-xs text-zinc-400">{stat.sub}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads Table */}
      <Card className="border border-zinc-100 bg-white shadow-none rounded-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-50">
          <div>
            <h2 className="text-sm font-bold text-zinc-900">Leads Terbaru</h2>
            <p className="text-xs text-zinc-400 mt-0.5">5 entri terakhir</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-zinc-50">
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 pl-6 py-3">
                  Nama
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-3">
                  Telepon
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-3 hidden sm:table-cell">
                  Topik
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-3 hidden md:table-cell">
                  Kendaraan
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-3 pr-6">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="border-zinc-50 hover:bg-zinc-50/50 transition-colors"
                >
                  <TableCell className="py-3.5 pl-6 font-medium text-zinc-900 text-sm">
                    {lead.name}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-zinc-500">
                    {lead.phone}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-zinc-500 hidden sm:table-cell">
                    {lead.topic}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-zinc-500 hidden md:table-cell">
                    {lead.vehicle}
                  </TableCell>
                  <TableCell className="py-3.5 pr-6">
                    <Badge
                      variant="secondary"
                      className={`rounded-full text-xs font-medium border px-2.5 py-0.5 ${statusConfig[lead.status]}`}
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
