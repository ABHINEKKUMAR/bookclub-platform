"use client";

import { useEffect, useState } from "react";
import { Calendar, Plus, Trash2, Users } from "lucide-react";
import api from "@/lib/api";

type Book = { _id: string; title: string; author: string };
type Club = { _id: string; name: string; host: string; description: string; meetingDate?: string; meetingLink?: string; memberCount: number; status: string; currentBook?: Book };
const emptyForm = { name: "", host: "", description: "", currentBook: "", meetingDate: "", meetingLink: "", memberCount: 0, status: "Active" };

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [clubResponse, bookResponse] = await Promise.all([api.get("/clubs"), api.get("/books?limit=100")]);
      setClubs(clubResponse.data.clubs);
      setBooks(bookResponse.data.books || []);
      setError("");
    } catch {
      setError("Could not load book clubs.");
    }
  };
  useEffect(() => {
    Promise.all([api.get("/clubs"), api.get("/books?limit=100")]).then(
      ([clubResponse, bookResponse]) => {
        setClubs(clubResponse.data.clubs);
        setBooks(bookResponse.data.books || []);
      }
    ).catch(() => setError("Could not load book clubs."));
  }, []);

  const create = async () => {
    try {
      await api.post("/clubs", { ...form, currentBook: form.currentBook || null, meetingDate: form.meetingDate || null });
      setOpen(false);
      setForm(emptyForm);
      load();
    } catch {
      setError("Could not create this club. Check your permissions and required fields.");
    }
  };
  const remove = async (id: string) => {
    try {
      await api.delete(`/clubs/${id}`);
      load();
    } catch {
      setError("You do not have permission to delete this club.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="font-semibold text-violet-600">Community</p><h1 className="mt-1 text-4xl font-black">Book clubs</h1><p className="mt-2 text-slate-500">Schedule meetings, assign the current read, and track participation.</p></div>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-white"><Plus size={18} /> Create club</button>
      </div>
      {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {clubs.map((club) => (
          <article key={club._id} className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between"><span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">{club.status}</span><button onClick={() => remove(club._id)} className="rounded-lg bg-red-50 p-2 text-red-600"><Trash2 size={16} /></button></div>
            <h2 className="mt-5 text-2xl font-black">{club.name}</h2>
            <p className="mt-2 min-h-12 text-sm text-slate-500">{club.description || "A welcoming space for readers."}</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current read</p><p className="mt-1 font-bold">{club.currentBook?.title || "Not selected"}</p><p className="text-sm text-slate-500">{club.currentBook?.author}</p></div>
            <div className="mt-5 flex items-center justify-between text-sm text-slate-600"><span className="flex items-center gap-2"><Users size={16} /> {club.memberCount} members</span><span className="flex items-center gap-2"><Calendar size={16} /> {club.meetingDate ? new Date(club.meetingDate).toLocaleDateString() : "Not scheduled"}</span></div>
            <p className="mt-4 text-sm">Hosted by <strong>{club.host}</strong></p>
          </article>
        ))}
        {!clubs.length && <div className="col-span-full rounded-2xl border border-dashed bg-white p-12 text-center text-slate-500">Create the first club and choose its current book.</div>}
      </div>

      {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"><div className="w-full max-w-xl rounded-3xl bg-white p-6"><h2 className="text-2xl font-black">Create a book club</h2><div className="mt-5 grid gap-4">
        <input className="rounded-xl border p-3" placeholder="Club name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-xl border p-3" placeholder="Host name" value={form.host} onChange={(e) => setForm({ ...form, host: e.target.value })} />
        <textarea className="rounded-xl border p-3" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <select className="rounded-xl border p-3" value={form.currentBook} onChange={(e) => setForm({ ...form, currentBook: e.target.value })}><option value="">Choose current book</option>{books.map((book) => <option key={book._id} value={book._id}>{book.title} · {book.author}</option>)}</select>
        <div className="grid grid-cols-2 gap-4"><input type="datetime-local" className="rounded-xl border p-3" value={form.meetingDate} onChange={(e) => setForm({ ...form, meetingDate: e.target.value })} /><input type="number" min="0" className="rounded-xl border p-3" placeholder="Members" value={form.memberCount} onChange={(e) => setForm({ ...form, memberCount: Number(e.target.value) })} /></div>
        <input className="rounded-xl border p-3" placeholder="Meeting link" value={form.meetingLink} onChange={(e) => setForm({ ...form, meetingLink: e.target.value })} />
      </div><div className="mt-5 flex justify-end gap-3"><button onClick={() => setOpen(false)} className="rounded-xl border px-4 py-2">Cancel</button><button onClick={create} className="rounded-xl bg-violet-600 px-5 py-2 text-white">Create club</button></div></div></div>}
    </div>
  );
}
