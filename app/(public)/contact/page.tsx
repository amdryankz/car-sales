"use client";

import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Info Item ─────────────────────────────────────────────────────────────────

function InfoItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
        <Icon size={18} className="text-zinc-500" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
          {label}
        </span>
        <div className="text-sm text-zinc-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-red-600 uppercase">
            Kontak
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Hubungi Kami
          </h1>
          <p className="text-sm text-zinc-400 max-w-md">
            Tim sales kami siap membantu Anda menemukan kendaraan yang tepat.
            Atau kunjungi showroom kami langsung di Banda Aceh.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-8">
            {/* Dealership Name */}
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-zinc-900">
                Astra Daihatsu Aceh
              </h2>
              <p className="text-sm text-zinc-400">Dealer Resmi Daihatsu</p>
            </div>

            <div className="flex flex-col gap-6">
              <InfoItem icon={MapPin} label="Alamat">
                Jl. T. Nyak Arief No. 12, Lamgugob,
                <br />
                Banda Aceh, 23111
              </InfoItem>

              <InfoItem icon={Clock} label="Jam Operasional">
                <span>Senin – Sabtu: 08.00 – 17.00 WIB</span>
                <br />
                <span className="text-zinc-400">Minggu: 09.00 – 14.00 WIB</span>
              </InfoItem>

              <InfoItem icon={Phone} label="Telepon & WhatsApp">
                <a
                  href="tel:+6265155012"
                  className="hover:text-red-600 transition-colors"
                >
                  +62 651 550-123
                </a>
                <br />
                <a
                  href="https://wa.me/6285260001234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-red-600 transition-colors"
                >
                  WhatsApp: +62 852-6000-1234
                </a>
              </InfoItem>

              <InfoItem icon={Mail} label="Email">
                <a
                  href="mailto:sales@astradaihatsu-aceh.id"
                  className="hover:text-red-600 transition-colors"
                >
                  sales@astradaihatsu-aceh.id
                </a>
              </InfoItem>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl bg-zinc-100 h-52 w-full overflow-hidden flex items-center justify-center">
              <span className="text-sm text-zinc-400">
                Google Maps — Coming Soon
              </span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <Card className="border border-zinc-200/60 bg-white shadow-none rounded-2xl">
              <CardContent className="p-7 sm:p-9 flex flex-col gap-5">
                <div className="flex flex-col gap-1 mb-2">
                  <h3 className="text-lg font-bold text-zinc-900">
                    Kirim Pesan
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Kami akan merespons dalam 1×24 jam kerja.
                  </p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                    Nama Lengkap
                  </label>
                  <Input
                    placeholder="Contoh: Budi Santoso"
                    className="rounded-xl border-zinc-200 focus-visible:ring-red-500 bg-zinc-50"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                    Nomor Telepon / WhatsApp
                  </label>
                  <Input
                    type="tel"
                    placeholder="Contoh: 0852-6000-1234"
                    className="rounded-xl border-zinc-200 focus-visible:ring-red-500 bg-zinc-50"
                  />
                </div>

                {/* Topic */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                    Topik
                  </label>
                  <Select>
                    <SelectTrigger className="rounded-xl border-zinc-200 bg-zinc-50 focus:ring-red-500">
                      <SelectValue placeholder="Pilih topik pesan" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="general">Informasi Umum</SelectItem>
                      <SelectItem value="sales">Pembelian Kendaraan</SelectItem>
                      <SelectItem value="testdrive">
                        Jadwal Test Drive
                      </SelectItem>
                      <SelectItem value="promo">
                        Promo &amp; Penawaran
                      </SelectItem>
                      <SelectItem value="service">
                        Servis &amp; Suku Cadang
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                    Pesan
                  </label>
                  <Textarea
                    placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
                    className="rounded-xl border-zinc-200 focus-visible:ring-red-500 bg-zinc-50 min-h-32 resize-none"
                  />
                </div>

                {/* Submit */}
                <Button className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-5 text-sm font-semibold shadow-none transition-colors">
                  Kirim Pesan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
