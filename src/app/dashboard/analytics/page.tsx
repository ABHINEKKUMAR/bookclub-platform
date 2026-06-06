"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  FileText,
  Library,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import api from "@/lib/api";
import { LoadingState } from "@/components/dashboard/dashboard-ui";

type Summary = {
  stats: Record<string, number>;
  recentBooks: { _id: string; title: string; author: string; source: string; status: string }[];
  upcomingClubs: { _id: string; name: string; meetingDate: string; currentBook?: { title: string } }[];
};

const number = (value = 0) => new Intl.NumberFormat("en-US").format(value);
const percent = (value: number, total: number) => Math.min(Math.round((value / Math.max(total, 1)) * 100), 100);

function MetricCard({ label, value, note, icon, accent }: { label: string; value: number; note: string; icon: React.ReactNode; accent: string }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className={`absolute inset-x-0 top-0 h-1 ${accent}`} />
      <div className="flex items-start justify-between">
        <div><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-2 text-4xl font-black tracking-tight text-slate-950">{number(value)}</p></div>
        <div className={`rounded-2xl p-3 text-white shadow-lg ${accent}`}>{icon}</div>
      </div>
      <p className="mt-5 border-t pt-4 text-xs font-medium text-slate-500">{note}</p>
    </article>
  );
}

function ProgressRow({ label, value, total, color, detail }: { label: string; value: number; total: number; color: string; detail: string }) {
  const width = percent(value, total);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm"><span className="font-bold text-slate-700">{label}</span><span className="text-slate-500">{detail}</span></div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${width}%` }} /></div>
      <p className="mt-1 text-right text-xs font-semibold text-slate-400">{width}%</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/dashboard")
      .then((response) => setData(response.data))
      .catch(() => setError("Analytics are not available for this account."));
  }, []);

  const insights = useMemo(() => {
    const stats = data?.stats || {};
    const publishing = percent(stats.publishedContent || 0, stats.totalContent || 0);
    const activeClubs = percent(stats.activeClubs || 0, stats.totalClubs || 0);
    const moderatedReviews = 100 - percent(stats.pendingReviews || 0, stats.totalReviews || 0);
    const categoryCoverage = Math.min(percent(stats.totalCategories || 0, Math.max(Math.ceil((stats.totalBooks || 0) / 5), 1)), 100);
    const health = Math.round((publishing + activeClubs + moderatedReviews + categoryCoverage) / 4);
    return { publishing, activeClubs, moderatedReviews, categoryCoverage, health };
  }, [data]);

  if (error) return <div className="p-8"><p className="rounded-2xl bg-red-50 p-5 font-semibold text-red-700">{error}</p></div>;
  if (!data) return <LoadingState label="Building your analytics story..." />;

  const stats = data.stats;
  const totalCommunity = (stats.totalMembers || 0) + (stats.totalReviews || 0) + (stats.totalClubs || 0);
  const totalPlatform = (stats.totalBooks || 0) + (stats.totalContent || 0) + totalCommunity;
  const mix = [
    { label: "Catalog", value: stats.totalBooks || 0, color: "bg-blue-500" },
    { label: "Community", value: totalCommunity, color: "bg-violet-500" },
    { label: "Publishing", value: stats.totalContent || 0, color: "bg-orange-500" },
  ];
  const needsAttention = [
    { label: "Reviews waiting for moderation", value: stats.pendingReviews || 0, href: "/dashboard/reviews", icon: MessageSquare },
    { label: "Clubs not currently active", value: Math.max((stats.totalClubs || 0) - (stats.activeClubs || 0), 0), href: "/dashboard/clubs", icon: Users },
    { label: "Content not yet published", value: Math.max((stats.totalContent || 0) - (stats.publishedContent || 0), 0), href: "/dashboard/content", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe_0,_transparent_28%),radial-gradient(circle_at_top_left,_#ede9fe_0,_transparent_24%)] p-5 md:p-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl md:p-10">
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative grid gap-8 xl:grid-cols-[1fr_auto] xl:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-300"><Sparkles size={15} /> Live platform intelligence</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Turn reading activity into momentum.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">See how your catalog, publishing, libraries, and community work together, then focus on the opportunities that matter most.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/dashboard/books" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100">Explore catalog <ArrowRight size={16} /></Link>
              <Link href="/dashboard/content" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/20">Publish a story</Link>
            </div>
          </div>
          <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-[conic-gradient(#3b82f6_var(--score),#ffffff20_0)] p-4 shadow-2xl" style={{ "--score": `${insights.health * 3.6}deg` } as React.CSSProperties}>
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-950">
              <TrendingUp className="text-emerald-400" />
              <p className="mt-2 text-5xl font-black">{insights.health}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Health score</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Catalog reach" value={stats.totalBooks || 0} note={`${number(stats.totalCategories || 0)} categories available`} icon={<BookOpen size={21} />} accent="bg-gradient-to-r from-blue-500 to-cyan-400" />
        <MetricCard label="Reader community" value={stats.totalMembers || 0} note={`${number(stats.totalClubs || 0)} book clubs connecting readers`} icon={<Users size={21} />} accent="bg-gradient-to-r from-violet-500 to-fuchsia-400" />
        <MetricCard label="Library network" value={stats.totalLibraries || 0} note="Connected locations serving your community" icon={<Library size={21} />} accent="bg-gradient-to-r from-emerald-500 to-teal-400" />
        <MetricCard label="Community voices" value={stats.totalReviews || 0} note={`${number(stats.pendingReviews || 0)} reviews need moderation`} icon={<MessageSquare size={21} />} accent="bg-gradient-to-r from-orange-500 to-amber-400" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-3xl border bg-white p-6 shadow-sm md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-blue-600">Performance pulse</p><h2 className="mt-2 text-2xl font-black">Operational health</h2></div><span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700"><CheckCircle2 className="mr-1 inline" size={15} /> Live records</span></div>
          <div className="mt-8 grid gap-6">
            <ProgressRow label="Publishing completion" value={stats.publishedContent || 0} total={stats.totalContent || 0} color="bg-gradient-to-r from-orange-400 to-orange-600" detail={`${number(stats.publishedContent || 0)} of ${number(stats.totalContent || 0)} live`} />
            <ProgressRow label="Active club network" value={stats.activeClubs || 0} total={stats.totalClubs || 0} color="bg-gradient-to-r from-violet-400 to-violet-600" detail={`${number(stats.activeClubs || 0)} active clubs`} />
            <ProgressRow label="Review moderation complete" value={Math.max((stats.totalReviews || 0) - (stats.pendingReviews || 0), 0)} total={stats.totalReviews || 0} color="bg-gradient-to-r from-emerald-400 to-emerald-600" detail={`${insights.moderatedReviews}% reviewed`} />
            <ProgressRow label="Category coverage" value={stats.totalCategories || 0} total={Math.max(Math.ceil((stats.totalBooks || 0) / 5), 1)} color="bg-gradient-to-r from-blue-400 to-blue-600" detail={`${number(stats.totalCategories || 0)} discovery paths`} />
          </div>
        </article>

        <article className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl md:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Platform mix</p>
          <h2 className="mt-2 text-2xl font-black">What drives engagement</h2>
          <div className="mt-8 flex h-5 overflow-hidden rounded-full bg-white/10">{mix.map((item) => <div key={item.label} className={item.color} style={{ width: `${percent(item.value, totalPlatform)}%` }} />)}</div>
          <div className="mt-7 grid gap-5">{mix.map((item) => <div key={item.label} className="flex items-center justify-between"><span className="flex items-center gap-3 text-sm font-semibold"><span className={`h-3 w-3 rounded-full ${item.color}`} />{item.label}</span><span className="text-right"><strong className="block text-xl">{number(item.value)}</strong><small className="text-blue-200">{percent(item.value, totalPlatform)}% of activity</small></span></div>)}</div>
          <p className="mt-7 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-blue-100">Community combines members, reviews, and clubs to show how strongly people participate around the catalog.</p>
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <article className="rounded-3xl border bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-violet-600">Fresh activity</p><h2 className="mt-2 text-2xl font-black">Recent catalog additions</h2></div><Link href="/dashboard/books" className="text-sm font-bold text-blue-600">View all</Link></div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">{data.recentBooks.length ? data.recentBooks.map((book, index) => <Link href="/dashboard/books" key={book._id} className="group flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white font-black text-blue-600 shadow-sm">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 flex-1"><strong className="block truncate text-slate-900">{book.title}</strong><small className="text-slate-500">{book.author}</small></span><span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase text-slate-500">{book.source || book.status}</span></Link>) : <p className="col-span-2 rounded-2xl border border-dashed p-8 text-center text-slate-500">Add books to begin tracking catalog momentum.</p>}</div>
        </article>

        <article className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Action center</p><h2 className="mt-2 text-2xl font-black">Needs attention</h2>
          <div className="mt-6 grid gap-3">{needsAttention.map(({ label, value, href, icon: Icon }) => <Link href={href} key={label} className="group flex items-center gap-3 rounded-2xl border p-4 transition hover:border-amber-300 hover:bg-amber-50"><span className="rounded-xl bg-amber-100 p-2 text-amber-700"><Icon size={18} /></span><span className="min-w-0 flex-1 text-sm font-semibold text-slate-600">{label}</span><strong className="text-xl text-slate-950">{number(value)}</strong></Link>)}</div>
          {!needsAttention.some((item) => item.value > 0) && <p className="mt-5 flex gap-2 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700"><CheckCircle2 size={18} /> Everything is up to date.</p>}
        </article>
      </section>

      <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Coming together</p><h2 className="mt-2 text-2xl font-black">Upcoming club meetings</h2></div><Link href="/dashboard/clubs" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">Manage clubs <ArrowRight size={15} /></Link></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.upcomingClubs.length ? data.upcomingClubs.map((club) => <article key={club._id} className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5"><CalendarDays className="text-emerald-600" /><h3 className="mt-4 font-black">{club.name}</h3><p className="mt-1 text-sm text-slate-500">{club.currentBook?.title || "Book selection pending"}</p><p className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-700">{new Date(club.meetingDate).toLocaleString()}</p></article>) : <div className="col-span-full flex items-center gap-3 rounded-2xl border border-dashed p-8 text-slate-500"><CircleAlert /> No future meetings scheduled. Plan one to keep readers engaged.</div>}</div>
      </section>
    </div>
  );
}
