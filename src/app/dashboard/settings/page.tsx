"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Database, ExternalLink, Server, ShoppingBag } from "lucide-react";
import api from "@/lib/api";
import { PageHeader, StatCard } from "@/components/dashboard/dashboard-ui";

export default function SettingsPage() {
  const [apiOnline, setApiOnline] = useState(false);
  const [amazonConfigured, setAmazonConfigured] = useState(false);
  useEffect(() => {
    api.get("/status").then(() => setApiOnline(true)).catch(() => setApiOnline(false));
    api.get("/amazon/status").then((response) => setAmazonConfigured(response.data.configured)).catch(() => setAmazonConfigured(false));
  }, []);
  return <div className="p-8"><PageHeader eyebrow="Configuration" title="Platform settings" description="Connection health and secure integration guidance for this installation." />
    <div className="mt-8 grid gap-4 md:grid-cols-2"><StatCard label="Backend API" value={apiOnline ? "Online" : "Offline"} icon={<Server size={20} />} tone={apiOnline ? "emerald" : "orange"} /><StatCard label="Amazon Product API" value={amazonConfigured ? "Connected" : "Needs setup"} icon={<ShoppingBag size={20} />} tone={amazonConfigured ? "emerald" : "orange"} /></div>
    <div className="mt-8 grid gap-6 xl:grid-cols-2"><section className="rounded-2xl border bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><Database className="text-blue-600" /><h2 className="font-black">Backend connection</h2></div><p className="mt-4 text-sm leading-6 text-slate-600">The dashboard uses <code className="rounded bg-slate-100 px-2 py-1">NEXT_PUBLIC_API_URL</code> from the frontend environment. Current status: <strong>{apiOnline ? "connected" : "not reachable"}</strong>.</p></section><section className="rounded-2xl border bg-white p-6 shadow-sm"><div className="flex items-center gap-3">{amazonConfigured ? <CheckCircle2 className="text-emerald-600" /> : <ShoppingBag className="text-orange-600" />}<h2 className="font-black">Amazon integration</h2></div><p className="mt-4 text-sm leading-6 text-slate-600">Amazon credentials stay on the backend. Configure <code className="rounded bg-slate-100 px-2 py-1">AMAZON_ACCESS_KEY</code>, <code className="rounded bg-slate-100 px-2 py-1">AMAZON_SECRET_KEY</code>, and <code className="rounded bg-slate-100 px-2 py-1">AMAZON_PARTNER_TAG</code>.</p><Link href="/dashboard/amazon" className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600">Open Amazon importer <ExternalLink size={16} /></Link></section></div>
  </div>;
}
