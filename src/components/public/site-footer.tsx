import Link from "next/link";

export default function SiteFooter() {
  return <footer className="mt-24 bg-slate-950 text-slate-300"><div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3"><div><p className="text-xl font-black text-white">BookClub</p><p className="mt-3 text-sm">Books, libraries, clubs, and stories in one reading community.</p></div><div className="grid gap-2 text-sm"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/articles">Articles</Link></div><div className="grid gap-2 text-sm"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link><Link href="/cookies">Cookie Policy</Link></div></div></footer>;
}
