import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Promo", href: "/promo" },
  { label: "Pricelist", href: "/pricelist" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold tracking-widest text-white uppercase">
                Astra Daihatsu
              </span>
              <span className="text-xs font-light tracking-[0.3em] text-zinc-500 uppercase ml-2">
                Aceh
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 max-w-xs">
              Dealer resmi Astra Daihatsu di Aceh. Kami menyediakan kendaraan
              terbaik dengan layanan profesional, penawaran kompetitif, dan
              kemudahan proses pembelian.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-zinc-300 uppercase">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-zinc-300 uppercase">
              Kontak
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0 text-zinc-500" />
                <span className="leading-relaxed">
                  Jl. T. Nyak Arief No. 12, Lamgugob,
                  <br />
                  Banda Aceh, 23111
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="shrink-0 text-zinc-500" />
                <a
                  href="tel:+6265155012"
                  className="hover:text-white transition-colors"
                >
                  +62 651 550-123
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="shrink-0 text-zinc-500" />
                <a
                  href="mailto:sales@astradaihatsu-aceh.id"
                  className="hover:text-white transition-colors"
                >
                  sales@astradaihatsu-aceh.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Astra Daihatsu Aceh. All rights
            reserved.
          </p>
          <p className="text-xs text-zinc-700">Authorized Daihatsu Dealer</p>
        </div>
      </div>
    </footer>
  );
}
