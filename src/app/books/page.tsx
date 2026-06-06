"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import api from "@/lib/api";
import PublicShell from "@/components/public/public-shell";

type Book = { _id: string; title: string; author: string; category: string; coverImage?: string; availableCopies: number; rating: number };
export default function PublicBooksPage() {
  const [books, setBooks] = useState<Book[]>([]); const [search, setSearch] = useState(""); const [error, setError] = useState("");
  useEffect(() => { api.get("/books?limit=100").then((response) => setBooks(response.data.books || [])).catch(() => setError("The book catalog is temporarily unavailable.")); }, []);
  const filtered = books.filter((book) => [book.title, book.author, book.category].some((value) => value.toLowerCase().includes(search.toLowerCase())));
  return <PublicShell><section className="mx-auto max-w-7xl px-6 py-14"><p className="font-bold uppercase tracking-[0.2em] text-blue-600">Explore</p><h1 className="mt-3 text-5xl font-black">Find your next book</h1>{error&&<p className="mt-6 rounded-xl bg-amber-50 p-4 text-amber-800">{error}</p>}<label className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border bg-white px-5 py-4 shadow-sm"><Search className="text-slate-400" /><input className="w-full outline-none" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search books, authors, and categories..." /></label><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((book) => <Link href={`/books/${book._id}`} key={book._id} className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="flex h-64 items-center justify-center bg-slate-100">{book.coverImage ? <img src={book.coverImage} alt="" className="h-full w-full object-cover" /> : <BookOpen size={48} className="text-slate-300" />}</div><div className="p-5"><p className="text-xs font-bold uppercase text-blue-600">{book.category}</p><h2 className="mt-2 text-lg font-black">{book.title}</h2><p className="mt-1 text-sm text-slate-500">{book.author}</p><p className="mt-4 text-xs text-slate-500">{book.availableCopies} copies available</p></div></Link>)}</div></section></PublicShell>;
}
