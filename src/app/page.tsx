"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookMarked,
  BookOpen,
  CalendarDays,
  Check,
  FileText,
  Library,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const modules = [
  { title: "Smart book catalog", text: "Discover, organize, reserve, and manage every title from one searchable catalog.", href: "/books", icon: BookOpen, color: "from-blue-500 to-cyan-400" },
  { title: "Book club community", text: "Join clubs, discuss current reads, schedule meetings, and bring readers together.", href: "/clubs", icon: Users, color: "from-violet-500 to-fuchsia-400" },
  { title: "Connected libraries", text: "Showcase library branches, book totals, memberships, and live operating status.", href: "/libraries", icon: Library, color: "from-emerald-500 to-teal-400" },
  { title: "Stories and articles", text: "Publish announcements, editorial stories, and community reading inspiration.", href: "/articles", icon: FileText, color: "from-orange-500 to-amber-400" },
  { title: "Amazon marketplace", text: "Search Amazon titles, import book details, and connect affiliate product links.", href: "/dashboard/amazon", icon: ShoppingBag, color: "from-orange-500 to-rose-500" },
  { title: "Powerful analytics", text: "Understand catalog health, publishing progress, clubs, reviews, and participation.", href: "/dashboard/analytics", icon: BarChart3, color: "from-indigo-500 to-blue-500" },
];

const experiences = [
  { role: "Readers", title: "Find a book worth talking about", text: "Browse books, reserve copies, review titles, join clubs, and manage borrowing from a personal account.", icon: BookMarked, href: "/books", cta: "Explore books" },
  { role: "Community hosts", title: "Build a thriving reading circle", text: "Create clubs, choose current reads, schedule meetings, and keep discussions active between sessions.", icon: CalendarDays, href: "/clubs", cta: "Visit clubs" },
  { role: "Platform teams", title: "Run everything from one CMS", text: "Manage books, libraries, content, members, reviews, loans, roles, marketplace imports, and analytics.", icon: ShieldCheck, href: "/dashboard", cta: "Open dashboard" },
];

const workflow = [
  { step: "01", title: "Build the catalog", text: "Add titles manually or import rich book information from Amazon." },
  { step: "02", title: "Connect the community", text: "Publish content, create clubs, and organize libraries and members." },
  { step: "03", title: "Create participation", text: "Readers reserve books, share reviews, and join club discussions." },
  { step: "04", title: "Learn and improve", text: "Use live analytics to see what needs attention and what is growing." },
];

const previewBars = [
  { label: "Catalog", width: "88%", color: "bg-blue-500" },
  { label: "Community", width: "74%", color: "bg-violet-500" },
  { label: "Publishing", width: "63%", color: "bg-orange-500" },
];

const previewStats = [
  { label: "Catalog", icon: BookOpen },
  { label: "Readers", icon: Users },
  { label: "Libraries", icon: Library },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#f7f8fc] text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white"><BookOpen size={19} /></span>BookClub</Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            <a href="#platform" className="transition hover:text-blue-600">Platform</a>
            <a href="#experience" className="transition hover:text-blue-600">Experience</a>
            <a href="#workflow" className="transition hover:text-blue-600">How it works</a>
            <Link href="/books" className="transition hover:text-blue-600">Explore books</Link>
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/login" className="hidden px-3 py-2 text-sm font-bold sm:block">Login</Link>
            <Link href="/register" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 md:px-5">Start reading</Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="absolute left-[-10rem] top-28 h-96 w-96 rounded-full bg-blue-300/35 blur-3xl" />
        <div className="absolute right-[-10rem] top-16 h-[30rem] w-[30rem] rounded-full bg-violet-300/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700"><Sparkles size={15} /> The complete reading platform</p>
            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Where books become
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-orange-500 bg-clip-text text-transparent">shared experiences.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">BookClub connects discovery, libraries, clubs, publishing, borrowing, marketplace links, and administration in one beautifully organized platform.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/books" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700">Explore the platform <ArrowRight size={18} /></Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300">View CMS demo <BarChart3 size={18} /></Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
              {["Reader friendly", "Role-based CMS", "Amazon connected"].map((item) => <span key={item} className="flex items-center gap-2"><Check size={16} className="rounded-full bg-emerald-100 p-0.5 text-emerald-700" />{item}</span>)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-3 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-blue-300">BookClub intelligence</p><h2 className="mt-2 text-2xl font-black">Everything, beautifully connected</h2></div><span className="rounded-xl bg-white/10 p-3"><BarChart3 size={22} /></span></div>
                <div className="mt-6 grid grid-cols-3 gap-3">{previewStats.map(({ label, icon: Icon }) => <div key={label} className="rounded-2xl bg-white/10 p-3"><Icon size={17} className="text-blue-300" /><p className="mt-5 text-lg font-black">{label}</p><p className="text-[10px] text-slate-400">Live and connected</p></div>)}</div>
              </div>
              <div className="grid gap-3 p-3 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl bg-slate-50 p-5"><div className="flex justify-between"><strong>Platform momentum</strong><TrendingBadge /></div><div className="mt-6 grid gap-4">{previewBars.map((bar) => <div key={bar.label}><div className="mb-2 flex justify-between text-xs font-bold text-slate-500"><span>{bar.label}</span><span>{bar.width}</span></div><div className="h-2 rounded-full bg-slate-200"><div className={`h-2 rounded-full ${bar.color}`} style={{ width: bar.width }} /></div></div>)}</div></div>
                <div className="grid gap-3">
                  <Link href="/clubs" className="group rounded-2xl bg-violet-100 p-4 transition hover:bg-violet-200"><Users className="text-violet-700" /><p className="mt-5 font-black">Book clubs</p><p className="mt-1 text-xs text-violet-700">Read and discuss together</p></Link>
                  <Link href="/dashboard/amazon" className="group rounded-2xl bg-orange-100 p-4 transition hover:bg-orange-200"><ShoppingBag className="text-orange-700" /><p className="mt-5 font-black">Marketplace</p><p className="mt-1 text-xs text-orange-700">Discover and import titles</p></Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="platform" className="bg-white px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="One connected ecosystem" title="Every part of the reading journey, in one place." text="Visitors can discover and participate. Platform teams can organize and grow everything behind the scenes." />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {modules.map(({ title, text, href, icon: Icon, color }, index) => <motion.div key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}><Link href={href} className="group block h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"><div className={`inline-flex rounded-2xl bg-gradient-to-br p-3 text-white shadow-lg ${color}`}><Icon size={24} /></div><h3 className="mt-7 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-500">{text}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-blue-600">Explore feature <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span></Link></motion.div>)}
          </div>
        </div>
      </section>

      <section id="experience" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Made for everyone" title="One platform. Three powerful experiences." text="BookClub gives every person the right tools without making the experience feel complicated." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {experiences.map(({ role, title, text, icon: Icon, href, cta }, index) => <motion.article key={role} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`relative overflow-hidden rounded-[2rem] p-7 shadow-xl ${index === 1 ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white" : index === 2 ? "bg-slate-950 text-white" : "border bg-white"}`}><div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-400/15 blur-2xl" /><Icon size={32} className={index === 0 ? "text-blue-600" : "text-blue-300"} /><p className={`mt-8 text-xs font-black uppercase tracking-[0.2em] ${index === 0 ? "text-blue-600" : "text-blue-200"}`}>{role}</p><h3 className="mt-3 text-3xl font-black leading-tight">{title}</h3><p className={`mt-4 leading-7 ${index === 0 ? "text-slate-500" : "text-white/70"}`}>{text}</p><Link href={href} className={`mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold ${index === 0 ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}>{cta}<ArrowRight size={16} /></Link></motion.article>)}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-slate-950 px-5 py-24 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading dark eyebrow="Simple, connected workflow" title="From a single book to an active community." text="Every feature supports the next, creating a platform that becomes more useful as people participate." />
          <div className="relative mt-14 grid gap-5 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500 lg:block" />
            {workflow.map((item) => <div key={item.step} className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"><span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950 shadow-xl">{item.step}</span><h3 className="mt-7 text-xl font-black">{item.title}</h3><p className="mt-3 leading-7 text-slate-400">{item.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500 shadow-2xl lg:grid-cols-[1fr_0.85fr]">
          <div className="p-8 text-white md:p-12"><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-orange-100"><ShoppingBag size={16} /> Amazon marketplace integration</p><h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Turn discovery into action.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-orange-50">Search Amazon books, import useful product details into your catalog, and show affiliate marketplace links alongside reservation options.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{["Search books by title or ISBN", "Import cover, author, and metadata", "Add affiliate product links", "Manage everything in the CMS"].map((item) => <p key={item} className="flex items-center gap-2 text-sm font-semibold"><Check size={16} />{item}</p>)}</div><Link href="/dashboard/amazon" className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-orange-600 shadow-xl">Explore marketplace tools <ArrowRight size={18} /></Link></div>
          <div className="relative min-h-80 bg-slate-950 p-8"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#fb923c55,_transparent_40%)]" /><div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{[["Atomic Habits", "James Clear"], ["The Psychology of Money", "Morgan Housel"], ["Deep Work", "Cal Newport"], ["The Midnight Library", "Matt Haig"]].map(([title, author], index) => <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur"><div className={`h-24 rounded-xl bg-gradient-to-br ${["from-blue-400 to-violet-600", "from-emerald-400 to-teal-700", "from-orange-300 to-red-600", "from-violet-400 to-indigo-800"][index]}`} /><p className="mt-4 font-black">{title}</p><p className="text-xs text-slate-400">{author}</p><div className="mt-4 flex justify-between text-xs"><span className="text-orange-300">Amazon title</span><Star size={14} className="fill-orange-300 text-orange-300" /></div></div>)}</div></div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white px-7 py-16 text-center shadow-xl md:px-14">
          <MessageSquare className="mx-auto text-blue-600" size={34} />
          <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-blue-600">Your next chapter starts here</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">Discover the platform as a reader, or run it as a team.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">Explore the public reading experience, create your account, or open the connected CMS dashboard.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/register" className="rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg transition hover:bg-blue-700">Create an account</Link><Link href="/dashboard" className="rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white transition hover:bg-slate-800">Open dashboard</Link><Link href="/books" className="rounded-2xl border px-7 py-4 font-bold transition hover:bg-slate-50">Browse books</Link></div>
        </div>
      </section>

      <footer className="border-t bg-white px-5 py-8 md:px-8"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4"><Link href="/" className="flex items-center gap-2 font-black"><BookOpen size={19} /> BookClub Platform</Link><div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-500"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div><p className="text-xs text-slate-400">Books, clubs, libraries, and stories together.</p></div></footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text: string; dark?: boolean }) {
  return <div className="max-w-3xl"><p className={`text-xs font-black uppercase tracking-[0.22em] ${dark ? "text-blue-300" : "text-blue-600"}`}>{eyebrow}</p><h2 className={`mt-4 text-4xl font-black tracking-tight md:text-5xl ${dark ? "text-white" : "text-slate-950"}`}>{title}</h2><p className={`mt-5 text-lg leading-8 ${dark ? "text-slate-400" : "text-slate-500"}`}>{text}</p></div>;
}

function TrendingBadge() {
  return <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">Live</span>;
}
