"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Car, Tag, LogOut } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Vehicles", href: "/admin/vehicles", icon: Car },
  { label: "Promos", href: "/admin/promos", icon: Tag },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex flex-col gap-0.5 select-none"
        >
          <span className="text-sm font-extrabold tracking-widest text-zinc-900 uppercase">
            Astra Daihatsu
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-400 uppercase">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-semibold tracking-[0.2em] text-zinc-300 uppercase">
          Menu
        </p>
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-zinc-100 pt-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
