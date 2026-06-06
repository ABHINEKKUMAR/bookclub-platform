import { ReactNode } from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

export default function PublicShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-slate-50"><SiteHeader /><main>{children}</main><SiteFooter /></div>;
}
