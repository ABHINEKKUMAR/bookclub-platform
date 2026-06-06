"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, FileText, Library, MessageSquare, ShoppingBag, Users } from "lucide-react";
import api from "@/lib/api";
import { LoadingState, PageHeader, StatCard } from "@/components/dashboard/dashboard-ui";

type Summary = { stats: Record<string, number>; recentBooks: { _id: string; title: string; author: string; source: string; status: string }[]; upcomingClubs: { _id: string; name: string; meetingDate: string; currentBook?: { title: string } }[] };
const quickLinks = [{ href: "/dashboard/content", label: "Publish content", icon: FileText }, { href: "/dashboard/clubs", label: "Create a club", icon: Users }, { href: "/dashboard/amazon", label: "Import from Amazon", icon: ShoppingBag }, { href: "/dashboard/books", label: "Manage catalog", icon: BookOpen }];

export default function DashboardPage() {
  const [data, setData] = useState<Summary | null>(null);
  const [offline, setOffline] = useState(false);
  useEffect(() => { api.get("/dashboard").then((response) => setData(response.data)).catch(() => setOffline(true)); }, []);
  if (!data && !offline) return <LoadingState label="Loading dashboard..." />;
  const stats = data?.stats || {};
  return <div className="p-8">
    <PageHeader eyebrow="Overview" title="Your reading platform" description="A connected view of the catalog, publishing workflow, clubs, members, and moderation." />
    {offline && <p className="mt-6 rounded-xl bg-amber-50 p-4 text-amber-800">The frontend is ready, but the backend API is offline. Start it to load live totals and activity.</p>}
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Books" value={stats.totalBooks || 0} icon={<BookOpen size={20} />} /><StatCard label="Members" value={stats.totalMembers || 0} icon={<Users size={20} />} tone="emerald" /><StatCard label="Active clubs" value={stats.activeClubs || 0} icon={<Users size={20} />} tone="violet" /><StatCard label="Published content" value={stats.publishedContent || 0} icon={<FileText size={20} />} tone="orange" /></div>
    <section className="mt-8"><h2 className="text-lg font-black">Quick actions</h2><div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{quickLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300"><Icon className="text-blue-600" /><p className="mt-4 font-bold group-hover:text-blue-700">{label}</p></Link>)}</div></section>
    <div className="mt-8 grid gap-6 xl:grid-cols-2"><section className="rounded-2xl border bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black">Recent catalog additions</h2><Link href="/dashboard/books" className="text-sm font-semibold text-blue-600">View books</Link></div><div className="mt-4 grid gap-3">{data?.recentBooks?.length ? data.recentBooks.map((book) => <div key={book._id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="font-semibold">{book.title}</p><p className="text-sm text-slate-500">{book.author}</p></div><span className="text-xs text-slate-500">{book.source || book.status}</span></div>) : <p className="text-sm text-slate-500">No books added yet.</p>}</div></section><section className="rounded-2xl border bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black">Upcoming club meetings</h2><Link href="/dashboard/clubs" className="text-sm font-semibold text-blue-600">View clubs</Link></div><div className="mt-4 grid gap-3">{data?.upcomingClubs?.length ? data.upcomingClubs.map((club) => <div key={club._id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="font-semibold">{club.name}</p><p className="text-sm text-slate-500">{club.currentBook?.title || "Book not selected"}</p></div><span className="text-xs text-slate-500">{new Date(club.meetingDate).toLocaleDateString()}</span></div>) : <p className="text-sm text-slate-500">No club meetings scheduled.</p>}</div></section></div>
    <section className="mt-6 grid gap-4 md:grid-cols-3"><StatCard label="Libraries" value={stats.totalLibraries || 0} icon={<Library size={20} />} /><StatCard label="Pending reviews" value={stats.pendingReviews || 0} icon={<MessageSquare size={20} />} tone="orange" /><StatCard label="Categories" value={stats.totalCategories || 0} icon={<BookOpen size={20} />} tone="violet" /></section>
  </div>;
}
