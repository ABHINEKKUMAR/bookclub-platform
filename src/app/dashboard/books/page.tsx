"use client";

import { useCallback, useEffect, useState } from "react";
import { BookOpen, Pencil, Plus, ShoppingBag, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { EmptyState, inputClass, LoadingState, Modal, PageHeader, primaryButton, SearchBox, secondaryButton, StatCard } from "@/components/dashboard/dashboard-ui";

type Book = { _id: string; title: string; author: string; category: string; isbn: string; status: string; source: string; quantity: number; availableCopies: number; coverImage?: string; description?: string };
const emptyForm = { title: "", author: "", category: "", isbn: "", status: "Available", quantity: 1, availableCopies: 1, coverImage: "", description: "" };

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState({ totalBooks: 0, availableBooks: 0, borrowedBooks: 0, amazonBooks: 0 });
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [booksResponse, statsResponse] = await Promise.all([api.get("/books?limit=100"), api.get("/books/stats/overview")]);
      setBooks(booksResponse.data.books || []);
      setStats(statsResponse.data);
      setError("");
    } catch {
      setError("Could not load the book catalog.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    Promise.all([api.get("/books?limit=100"), api.get("/books/stats/overview")])
      .then(([booksResponse, statsResponse]) => {
        setBooks(booksResponse.data.books || []);
        setStats(statsResponse.data);
        setError("");
      })
      .catch(() => setError("Could not load the book catalog."))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    try {
      if (editingId) await api.put(`/books/${editingId}`, form); else await api.post("/books", form);
      setOpen(false); setEditingId(null); setForm(emptyForm); load();
    } catch {
      setError("You do not have permission to save this book.");
    }
  };
  const remove = async (id: string) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      load();
    } catch {
      setError("You do not have permission to delete this book.");
    }
  };
  const filtered = books.filter((book) => [book.title, book.author, book.category, book.isbn].some((value) => value?.toLowerCase().includes(search.toLowerCase())));

  return <div className="p-8">
    <PageHeader eyebrow="Catalog" title="Books" description="Manage manual and Amazon-imported titles in one connected catalog." action={<button className={primaryButton} onClick={() => { setForm(emptyForm); setEditingId(null); setOpen(true); }}><Plus size={18} /> Add book</button>} />
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Total books" value={stats.totalBooks} icon={<BookOpen size={20} />} /><StatCard label="Available" value={stats.availableBooks} icon={<BookOpen size={20} />} tone="emerald" /><StatCard label="Borrowed" value={stats.borrowedBooks} icon={<BookOpen size={20} />} tone="violet" /><StatCard label="Amazon imports" value={stats.amazonBooks} icon={<ShoppingBag size={20} />} tone="orange" /></div>
    <div className="mt-6"><SearchBox value={search} onChange={setSearch} placeholder="Search title, author, category, or ISBN..." /></div>
    {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    {loading ? <LoadingState /> : filtered.length ? <div className="mt-6 grid gap-4 xl:grid-cols-2">{filtered.map((book) => <article key={book._id} className="flex gap-4 rounded-2xl border bg-white p-5 shadow-sm">{book.coverImage ? <img alt="" src={book.coverImage} className="h-32 w-20 rounded-lg object-cover" /> : <div className="flex h-32 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-100"><BookOpen className="text-slate-400" /></div>}<div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><h2 className="font-black">{book.title}</h2><p className="text-sm text-slate-500">{book.author}</p></div><span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{book.source || "Manual"}</span></div><p className="mt-3 text-sm text-slate-600">{book.category} · {book.status}</p><p className="mt-1 text-xs text-slate-400">{book.availableCopies}/{book.quantity} copies available</p><div className="mt-4 flex gap-2"><button onClick={() => { setEditingId(book._id); setForm({ ...emptyForm, ...book }); setOpen(true); }} className="rounded-lg bg-amber-50 p-2 text-amber-700"><Pencil size={16} /></button><button onClick={() => remove(book._id)} className="rounded-lg bg-red-50 p-2 text-red-700"><Trash2 size={16} /></button></div></div></article>)}</div> : <div className="mt-6"><EmptyState>No matching books found.</EmptyState></div>}
    {open && <Modal title={editingId ? "Edit book" : "Add book"} onClose={() => setOpen(false)} footer={<><button className={secondaryButton} onClick={() => setOpen(false)}>Cancel</button><button className={primaryButton} onClick={save}>Save book</button></>}><div className="grid gap-4 md:grid-cols-2">{(["title", "author", "category", "isbn", "coverImage"] as const).map((key) => <label key={key} className="grid gap-2 text-sm font-semibold">{key === "coverImage" ? "Cover image URL" : key[0].toUpperCase() + key.slice(1)}<input className={inputClass} value={String(form[key])} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>)}<label className="grid gap-2 text-sm font-semibold">Status<select className={inputClass} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>{["Available", "Borrowed", "Reserved", "Lost", "Maintenance"].map((value) => <option key={value}>{value}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Quantity<input type="number" className={inputClass} value={form.quantity} onChange={(event) => setForm({ ...form, quantity: Number(event.target.value) })} /></label><label className="grid gap-2 text-sm font-semibold">Available copies<input type="number" className={inputClass} value={form.availableCopies} onChange={(event) => setForm({ ...form, availableCopies: Number(event.target.value) })} /></label><label className="grid gap-2 text-sm font-semibold md:col-span-2">Description<textarea className={`${inputClass} min-h-28`} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label></div></Modal>}
  </div>;
}
