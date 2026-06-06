"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Search, ShoppingBag } from "lucide-react";
import api from "@/lib/api";

type AmazonBook = { asin: string; title: string; author: string; isbn: string; pages: number; coverImage: string; detailUrl: string; price: string };

export default function AmazonPage() {
  const [configured, setConfigured] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<AmazonBook[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => { api.get("/amazon/status").then((res) => setConfigured(res.data.configured)).catch(() => setMessage("Could not check the Amazon API connection.")); }, []);
  const search = async () => {
    setMessage("");
    try {
      const response = await api.get(`/amazon/search?q=${encodeURIComponent(query)}`);
      setItems(response.data.items);
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      setMessage(apiError.response?.data?.message || "Amazon search failed.");
    }
  };
  const importBook = async (book: AmazonBook) => {
    try {
      await api.post("/amazon/import", book);
      setMessage(`${book.title} was added to your book catalog.`);
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      setMessage(apiError.response?.data?.message || "Could not add this Amazon title.");
    }
  };

  return (
    <div className="p-8">
      <div><p className="font-semibold text-orange-600">Catalog integration</p><h1 className="mt-1 text-4xl font-black">Amazon book importer</h1><p className="mt-2 text-slate-500">Search Amazon from the server and add selected titles to your managed catalog.</p></div>
      <div className={`mt-8 rounded-2xl border p-5 ${configured ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
        <div className="flex items-center gap-3">{configured ? <CheckCircle2 className="text-green-600" /> : <ShoppingBag className="text-amber-600" />}<div><p className="font-bold">{configured ? "Amazon API connected" : "Amazon API needs credentials"}</p><p className="text-sm text-slate-600">{configured ? "Catalog search is ready." : "Set AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, and AMAZON_PARTNER_TAG in backend/.env, then restart the API."}</p></div></div>
      </div>
      <div className="mt-6 flex gap-3 rounded-2xl border bg-white p-4 shadow-sm"><input className="min-w-0 flex-1 rounded-xl border px-4" placeholder="Search by title, author, or ISBN" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} /><button onClick={search} disabled={!query.trim()} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white disabled:opacity-40"><Search size={18} /> Search Amazon</button></div>
      {message && <p className="mt-4 rounded-xl bg-white p-4 text-sm shadow-sm">{message}</p>}
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((book) => <article key={book.asin} className="flex gap-4 rounded-2xl border bg-white p-5 shadow-sm">{book.coverImage ? <img src={book.coverImage} alt="" className="h-36 w-24 rounded-lg object-cover" /> : <div className="flex h-36 w-24 items-center justify-center rounded-lg bg-slate-100"><ShoppingBag /></div>}<div className="min-w-0 flex-1"><h2 className="line-clamp-2 font-bold">{book.title}</h2><p className="mt-1 text-sm text-slate-500">{book.author}</p><p className="mt-3 text-xs text-slate-400">{book.isbn || book.asin} {book.price && `· ${book.price}`}</p><button onClick={() => importBook(book)} className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm text-white">Add to catalog</button></div></article>)}</div>
    </div>
  );
}
