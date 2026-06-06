import { ReactNode } from "react";
import { LoaderCircle, Search } from "lucide-react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">{title}</h1><p className="mt-2 max-w-2xl text-slate-500">{description}</p></div>{action}</div>;
}

export function StatCard({ label, value, icon, tone = "blue" }: { label: string; value: string | number; icon: ReactNode; tone?: "blue" | "violet" | "emerald" | "orange" }) {
  const tones = { blue: "bg-blue-50 text-blue-700", violet: "bg-violet-50 text-violet-700", emerald: "bg-emerald-50 text-emerald-700", orange: "bg-orange-50 text-orange-700" };
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`inline-flex rounded-xl p-2.5 ${tones[tone]}`}>{icon}</div><p className="mt-4 text-3xl font-black">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>;
}

export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><Search size={18} className="text-slate-400" /><input className="w-full bg-transparent outline-none" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}

export function LoadingState({ label = "Loading data..." }: { label?: string }) {
  return <div className="flex min-h-64 items-center justify-center gap-3 text-slate-500"><LoaderCircle className="animate-spin" />{label}</div>;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">{children}</div>;
}

export function Modal({ title, children, onClose, footer }: { title: string; children: ReactNode; onClose: () => void; footer: ReactNode }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"><div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-black">{title}</h2><button onClick={onClose} className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100">Close</button></div><div className="mt-5">{children}</div><div className="mt-6 flex justify-end gap-3">{footer}</div></div></div>;
}

export const inputClass = "w-full rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-blue-500";
export const primaryButton = "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-40";
export const secondaryButton = "rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium hover:bg-slate-50";
