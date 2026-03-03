"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Types ─────────────────────────────────────────────────────────────────────

type Variant = { id: string; name: string; price: string | number | { toString(): string } };
type Vehicle = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  variants: Variant[];
};

const categoryColors: Record<string, string> = {
  SUV: "bg-violet-50 text-violet-600 border-violet-100",
  MPV: "bg-blue-50 text-blue-600 border-blue-100",
  "LCGC MPV": "bg-emerald-50 text-emerald-600 border-emerald-100",
  Komersial: "bg-amber-50 text-amber-600 border-amber-100",
};

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp");
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function VehicleTableClient({
  initialVehicles,
}: {
  initialVehicles: Vehicle[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ── Add form state
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAddLoading(true);
    try {
      await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          slug: newSlug,
          category: newCategory,
          imageUrl: newImageUrl || null,
        }),
      });
      setDialogOpen(false);
      setNewName("");
      setNewSlug("");
      setNewCategory("");
      setNewImageUrl("");
      startTransition(() => router.refresh());
    } finally {
      setAddLoading(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    setDeleteId(null);
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
            Vehicle Management
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Kelola data kendaraan yang ditampilkan di website.
          </p>
        </div>

        {/* Add New Vehicle Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0 bg-zinc-900 hover:bg-zinc-700 text-white rounded-full px-5 text-sm font-semibold shadow-none transition-colors">
              <Plus size={15} className="mr-1.5" />
              Add New Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl bg-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-zinc-900">
                Tambah Kendaraan Baru
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                  Nama Kendaraan
                </Label>
                <Input
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Daihatsu Ayla"
                  className="rounded-xl border-zinc-200 bg-zinc-50 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                  Slug (URL)
                </Label>
                <Input
                  required
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="Contoh: daihatsu-ayla"
                  className="rounded-xl border-zinc-200 bg-zinc-50 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                  Kategori
                </Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger className="rounded-xl border-zinc-200 bg-zinc-50">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="MPV">MPV</SelectItem>
                    <SelectItem value="LCGC MPV">LCGC MPV</SelectItem>
                    <SelectItem value="Komersial">Komersial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                  URL Gambar
                </Label>
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="rounded-xl border-zinc-200 bg-zinc-50 text-sm"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="flex-1 rounded-full border-zinc-200 text-sm font-semibold text-zinc-600 shadow-none"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 rounded-full bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-semibold shadow-none"
                >
                  {addLoading ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vehicle Table */}
      <div className="border border-zinc-100 bg-white shadow-none rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50 hover:bg-zinc-50 border-zinc-100">
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4 pl-6">
                  Gambar
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4">
                  Nama
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4 hidden sm:table-cell">
                  Kategori
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4 hidden md:table-cell">
                  Harga Mulai
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-widest uppercase text-zinc-400 py-4 pr-6 text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialVehicles.map((vehicle) => {
                const startingPrice =
                  vehicle.variants.length > 0
                    ? Math.min(
                        ...vehicle.variants.map((v) => Number(v.price))
                      )
                    : null;

                return (
                  <TableRow
                    key={vehicle.id}
                    className="border-zinc-100 hover:bg-zinc-50/50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <TableCell className="py-3 pl-6">
                      <div className="relative h-12 w-20 overflow-hidden rounded-lg bg-zinc-100 shrink-0">
                        {vehicle.imageUrl ? (
                          <Image
                            src={vehicle.imageUrl}
                            alt={vehicle.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-zinc-300 text-[10px]">
                            No img
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Name */}
                    <TableCell className="py-3 font-semibold text-sm text-zinc-900">
                      {vehicle.name}
                    </TableCell>

                    {/* Category */}
                    <TableCell className="py-3 hidden sm:table-cell">
                      <Badge
                        variant="secondary"
                        className={`rounded-full text-xs font-medium border px-2.5 py-0.5 ${
                          categoryColors[vehicle.category] ??
                          "bg-zinc-100 text-zinc-500 border-zinc-100"
                        }`}
                      >
                        {vehicle.category}
                      </Badge>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="py-3 text-sm text-zinc-600 hidden md:table-cell">
                      {startingPrice !== null
                        ? `Mulai ${formatRupiah(startingPrice)}`
                        : "—"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-3 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit (placeholder) */}
                        <button
                          aria-label="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>

                        {/* Delete with confirm dialog */}
                        <Dialog
                          open={deleteId === vehicle.id}
                          onOpenChange={(open) =>
                            setDeleteId(open ? vehicle.id : null)
                          }
                        >
                          <DialogTrigger asChild>
                            <button
                              aria-label="Delete"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="rounded-2xl bg-white sm:max-w-sm">
                            <DialogHeader>
                              <DialogTitle className="text-base font-bold text-zinc-900">
                                Hapus Kendaraan
                              </DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-zinc-500 mt-1">
                              Apakah Anda yakin ingin menghapus{" "}
                              <span className="font-semibold text-zinc-900">
                                {vehicle.name}
                              </span>
                              ? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex gap-2 mt-4">
                              <Button
                                variant="outline"
                                onClick={() => setDeleteId(null)}
                                className="flex-1 rounded-full border-zinc-200 text-sm font-semibold text-zinc-600 shadow-none"
                              >
                                Batal
                              </Button>
                              <Button
                                disabled={isPending}
                                onClick={() => handleDelete(vehicle.id)}
                                className="flex-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-none"
                              >
                                {isPending ? "Menghapus..." : "Hapus"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

              {initialVehicles.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-12 text-center text-sm text-zinc-400"
                  >
                    Belum ada kendaraan. Tambahkan kendaraan pertama Anda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
