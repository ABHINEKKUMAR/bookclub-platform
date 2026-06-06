// export default function Navbar() {
//   return (
//     <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
//       <h2 className="text-xl font-semibold">
//         Admin Dashboard
//       </h2>

//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-slate-300" />

//         <span className="font-medium">
//           Admin
//         </span>
//       </div>
//     </header>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/auth-session";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthSession();
    router.replace("/login");
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold">
        Admin Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Logout
      </button>
    </header>
  );
}
