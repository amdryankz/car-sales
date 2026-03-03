"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Promo", href: "/promo" },
  { label: "Pricelist", href: "/pricelist" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1 select-none">
          <span className="text-lg font-extrabold tracking-widest text-zinc-900 uppercase">
            Astra Daihatsu
          </span>
          <span className="text-xs font-light tracking-[0.3em] text-zinc-400 uppercase ml-2">
            Aceh
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Button
            asChild
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 text-sm font-semibold shadow-none transition-colors"
          >
            <Link href="/contact">Hubungi Sales</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              aria-label="Open menu"
              className="p-2 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white p-0">
            <div className="flex flex-col h-full">
              {/* Sheet Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
                <span className="text-base font-extrabold tracking-widest text-zinc-900 uppercase">
                  Astra Daihatsu
                </span>
                <SheetClose asChild>
                  <button
                    aria-label="Close menu"
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </SheetClose>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors ${
                          isActive
                            ? "text-red-600 font-semibold bg-red-50"
                            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-auto px-4 pb-8">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold shadow-none"
                  >
                    <Link href="/contact">Hubungi Sales</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
