"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  FileText,
  Layers,
  Library,
  Settings,
  ShoppingBag,
  Star,
  Users,
  Menu,
  LogOut,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { clearAuthSession } from "@/lib/auth-session";
import { LoadingState } from "@/components/dashboard/dashboard-ui";

type Role = "admin" | "editor" | "librarian" | "club-host" | "reader";
const staffRoles: Role[] = ["admin", "editor", "librarian", "club-host"];

const links = [
  { href: "/dashboard", label: "Overview", icon: BarChart3, roles: staffRoles },
  { href: "/dashboard/content", label: "Content CMS", icon: FileText, roles: ["admin", "editor"] as Role[] },
  { href: "/dashboard/clubs", label: "Book Clubs", icon: Users, roles: ["admin", "club-host"] as Role[] },
  { href: "/dashboard/amazon", label: "Amazon Import", icon: ShoppingBag, roles: ["admin", "editor", "librarian"] as Role[] },
  { href: "/dashboard/books", label: "Books", icon: BookOpen, roles: ["admin", "editor", "librarian"] as Role[] },
  { href: "/dashboard/categories", label: "Categories", icon: Layers, roles: ["admin", "editor"] as Role[] },
  { href: "/dashboard/members", label: "Members", icon: Users, roles: ["admin", "librarian"] as Role[] },
  { href: "/dashboard/users", label: "User Roles", icon: Users, roles: ["admin"] as Role[] },
  { href: "/dashboard/libraries", label: "Libraries", icon: Library, roles: ["admin", "librarian"] as Role[] },
  { href: "/dashboard/reviews", label: "Reviews", icon: Star, roles: ["admin", "editor"] as Role[] },
  { href: "/dashboard/loans", label: "Borrowing", icon: BookOpen, roles: ["admin", "librarian"] as Role[] },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3, roles: staffRoles },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, roles: staffRoles },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    api.get("/auth/me")
      .then((response) => {
        const currentRole = response.data.user.role as Role;
        if (currentRole === "reader") {
          router.replace("/account");
          return;
        }
        setRole(currentRole);
      })
      .catch(() => {
        clearAuthSession();
        router.replace(`/login?next=${encodeURIComponent(window.location.pathname)}`);
      });
  }, [router]);

  const currentRoute = links.find((link) => link.href === "/dashboard" ? pathname === link.href : pathname.startsWith(link.href));
  useEffect(() => {
    if (role && currentRoute && !currentRoute.roles.includes(role)) {
      router.replace("/dashboard");
    }
  }, [currentRoute, role, router]);

  if (!role || (currentRoute && !currentRoute.roles.includes(role))) return <LoadingState label="Checking dashboard access..." />;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <button onClick={() => setOpen(!open)} className="fixed left-4 top-4 z-50 rounded-xl bg-slate-950 p-3 text-white shadow-xl lg:hidden">{open ? <X size={20} /> : <Menu size={20} />}</button>
      {open && <button onClick={() => setOpen(false)} aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 h-screen w-72 shrink-0 overflow-y-auto bg-slate-950 p-5 text-white transition-transform lg:sticky ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="mb-8 rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
            Publishing suite
          </p>
          <h2 className="mt-2 text-2xl font-black">BookClub CMS</h2>
        </div>

        <nav className="space-y-1">
          {links.filter((link) => link.roles.includes(role)).map(({ href, label, icon: Icon }) => {
            const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => {
            clearAuthSession();
            router.replace("/login");
          }}
          className="mt-8 flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="min-w-0 flex-1 pt-16 lg:pt-0">{children}</main>
    </div>
  );
}
