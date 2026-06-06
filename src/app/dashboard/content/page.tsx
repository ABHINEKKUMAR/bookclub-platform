"use client";

import { useEffect, useState } from "react";
import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import api from "@/lib/api";

type Entry = {
  _id: string;
  title: string;
  slug: string;
  type: string;
  excerpt: string;
  body: string;
  status: string;
  updatedAt: string;
};

const emptyForm = { title: "", slug: "", type: "Page", excerpt: "", body: "", status: "Draft" };

export default function ContentPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setEntries((await api.get("/content")).data.content);
      setError("");
    } catch {
      setError("Could not load content.");
    }
  };
  useEffect(() => {
    api.get("/content").then((response) => setEntries(response.data.content)).catch(() => setError("Could not load content."));
  }, []);

  const save = async () => {
    try {
      if (editingId) await api.put(`/content/${editingId}`, form);
      else await api.post("/content", form);
      setOpen(false);
      setEditingId(null);
      setForm(emptyForm);
      load();
    } catch {
      setError("Could not save content. Check your permissions and required fields.");
    }
  };
  const remove = async (id: string) => {
    try {
      await api.delete(`/content/${id}`);
      load();
    } catch {
      setError("You do not have permission to delete this content.");
    }
  };

  const edit = (entry: Entry) => {
    setEditingId(entry._id);
    setForm({ title: entry.title, slug: entry.slug, type: entry.type, excerpt: entry.excerpt, body: entry.body, status: entry.status });
    setOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-blue-600">Content management</p>
          <h1 className="mt-1 text-4xl font-black">Publish your reading community</h1>
          <p className="mt-2 text-slate-500">Manage pages, articles, and announcements from one editorial queue.</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setOpen(true); }} className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-white">
          <Plus size={18} /> New content
        </button>
      </div>
      {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

      <div className="mt-8 grid gap-4">
        {entries.map((entry) => (
          <article key={entry._id} className="flex items-center justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex min-w-0 items-center gap-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600"><FileText /></div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold">{entry.title}</h2>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{entry.type}</span>
                  <span className={`rounded-full px-2 py-1 text-xs ${entry.status === "Published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{entry.status}</span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">/{entry.slug} · {entry.excerpt || "No excerpt yet"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => edit(entry)} className="rounded-lg bg-amber-50 p-2 text-amber-700"><Pencil size={17} /></button>
              <button onClick={() => remove(entry._id)} className="rounded-lg bg-red-50 p-2 text-red-700"><Trash2 size={17} /></button>
            </div>
          </article>
        ))}
        {!entries.length && <div className="rounded-2xl border border-dashed bg-white p-12 text-center text-slate-500">No content yet. Create your first page or announcement.</div>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6">
            <h2 className="text-2xl font-black">{editingId ? "Edit content" : "Create content"}</h2>
            <div className="mt-5 grid gap-4">
              <input className="rounded-xl border p-3" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="rounded-xl border p-3" placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <select className="rounded-xl border p-3" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Page</option><option>Article</option><option>Announcement</option></select>
                <select className="rounded-xl border p-3" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Draft</option><option>Published</option><option>Archived</option></select>
              </div>
              <textarea className="rounded-xl border p-3" placeholder="Short excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              <textarea className="min-h-52 rounded-xl border p-3" placeholder="Content body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            </div>
            <div className="mt-5 flex justify-end gap-3"><button onClick={() => setOpen(false)} className="rounded-xl border px-4 py-2">Cancel</button><button onClick={save} className="rounded-xl bg-blue-600 px-5 py-2 text-white">Save content</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
