"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [["Books", "/books"], ["Clubs", "/clubs"], ["Articles", "/articles"], ["Libraries", "/libraries"]];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"><Link href="/" className="flex items-center gap-2 text-xl font-black"><BookOpen className="text-blue-600" />BookClub</Link><nav className="hidden items-center gap-7 md:flex">{links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-slate-600 hover:text-blue-600">{label}</Link>)}</nav><div className="hidden items-center gap-3 md:flex"><Link href="/account" className="text-sm font-semibold">My account</Link><Link href="/login" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">Login</Link></div><button onClick={() => setOpen(!open)} className="md:hidden">{open ? <X /> : <Menu />}</button></div>{open && <nav className="grid gap-2 border-t bg-white p-5 md:hidden">{links.concat([["My account", "/account"], ["Login", "/login"]]).map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="rounded-lg px-3 py-2 font-semibold hover:bg-slate-50">{label}</Link>)}</nav>}</header>;
}
