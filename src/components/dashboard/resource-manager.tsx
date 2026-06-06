"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { EmptyState, inputClass, LoadingState, Modal, PageHeader, primaryButton, SearchBox, secondaryButton } from "./dashboard-ui";

export type Field = { key: string; label: string; type?: "text" | "number" | "textarea" | "select"; options?: string[]; required?: boolean };
type Item = Record<string, unknown> & { _id: string };
type ApiError = { response?: { status?: number; data?: { message?: string } } };

const requestError = (error: unknown, fallback: string) => {
  const apiError = error as ApiError;
  if (apiError.response?.status === 403) return "You do not have permission to perform this action.";
  return apiError.response?.data?.message || fallback;
};

export default function ResourceManager({ eyebrow, title, description, apiPath, fields, searchKeys, listKey, canCreate = true, canDelete = true }: { eyebrow: string; title: string; description: string; apiPath: string; fields: Field[]; searchKeys: string[]; listKey?: string; canCreate?: boolean; canDelete?: boolean }) {
  const singularTitle = title.endsWith("ies") ? `${title.slice(0, -3)}y` : title.replace(/s$/, "");
  const emptyForm = useMemo(() => Object.fromEntries(fields.map((field) => [field.key, field.type === "number" ? 0 : field.options?.[0] || ""])), [fields]);
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(apiPath);
      setItems(listKey ? response.data[listKey] || [] : response.data || []);
      setError("");
    } catch (requestFailure) {
      setError(requestError(requestFailure, "Could not load data. Check that the backend API is running."));
    } finally {
      setLoading(false);
    }
  }, [apiPath, listKey]);

  useEffect(() => {
    api.get(apiPath)
      .then((response) => setItems(listKey ? response.data[listKey] || [] : response.data || []))
      .catch((requestFailure) => setError(requestError(requestFailure, "Could not load data. Check that the backend API is running.")))
      .finally(() => setLoading(false));
  }, [apiPath, listKey]);

  const filtered = items.filter((item) => searchKeys.some((key) => String(item[key] || "").toLowerCase().includes(search.toLowerCase())));
  const save = async () => {
    try {
      if (editingId) await api.put(`${apiPath}/${editingId}`, form);
      else await api.post(apiPath, form);
      setOpen(false); setEditingId(null); setForm(emptyForm); load();
    } catch (requestFailure) {
      setError(requestError(requestFailure, `Could not save this ${singularTitle.toLowerCase()}.`));
    }
  };
  const remove = async (id: string) => {
    if (!window.confirm(`Delete this ${singularTitle.toLowerCase()}?`)) return;
    try {
      await api.delete(`${apiPath}/${id}`);
      load();
    } catch (requestFailure) {
      setError(requestError(requestFailure, `Could not delete this ${singularTitle.toLowerCase()}.`));
    }
  };
  const edit = (item: Item) => {
    setEditingId(item._id);
    setForm(Object.fromEntries(fields.map((field) => [field.key, item[field.key] ?? emptyForm[field.key]])));
    setOpen(true);
  };

  return <div className="p-8">
    <PageHeader eyebrow={eyebrow} title={title} description={description} action={canCreate ? <button className={primaryButton} onClick={() => { setEditingId(null); setForm(emptyForm); setOpen(true); }}><Plus size={18} /> Add {singularTitle}</button> : undefined} />
    <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]"><SearchBox value={search} onChange={setSearch} placeholder={`Search ${title.toLowerCase()}...`} /><div className="rounded-xl border bg-white px-5 py-3 text-sm text-slate-500"><strong className="text-slate-950">{items.length}</strong> total</div></div>
    {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    {loading ? <LoadingState /> : filtered.length ? <div className="mt-6 overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500"><tr>{fields.slice(0, 5).map((field) => <th key={field.key} className="p-4">{field.label}</th>)}<th className="p-4">Actions</th></tr></thead><tbody>{filtered.map((item) => <tr key={item._id} className="border-t hover:bg-slate-50">{fields.slice(0, 5).map((field) => <td key={field.key} className="max-w-xs truncate p-4 text-sm">{String(item[field.key] ?? "—")}</td>)}<td className="p-4"><div className="flex gap-2"><button onClick={() => edit(item)} className="rounded-lg bg-amber-50 p-2 text-amber-700"><Pencil size={16} /></button>{canDelete && <button onClick={() => remove(item._id)} className="rounded-lg bg-red-50 p-2 text-red-700"><Trash2 size={16} /></button>}</div></td></tr>)}</tbody></table></div></div> : <div className="mt-6"><EmptyState>No matching {title.toLowerCase()} found.</EmptyState></div>}
    {open && <Modal title={editingId ? `Edit ${singularTitle}` : `Add ${singularTitle}`} onClose={() => setOpen(false)} footer={<><button className={secondaryButton} onClick={() => setOpen(false)}>Cancel</button><button className={primaryButton} onClick={save}>Save</button></>}><div className="grid gap-4">{fields.map((field) => <label key={field.key} className="grid gap-2 text-sm font-semibold">{field.label}{field.type === "textarea" ? <textarea className={`${inputClass} min-h-28`} value={String(form[field.key] ?? "")} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} /> : field.type === "select" ? <select className={inputClass} value={String(form[field.key] ?? "")} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input required={field.required} type={field.type || "text"} className={inputClass} value={String(form[field.key] ?? "")} onChange={(event) => setForm({ ...form, [field.key]: field.type === "number" ? Number(event.target.value) : event.target.value })} />}</label>)}</div></Modal>}
  </div>;
}
