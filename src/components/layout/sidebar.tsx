// "use client";

// import Link from "next/link";

// import {
//   LayoutDashboard,
//   BookOpen,
//   Users,
//   Library,
//   Settings,
// } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-white border-r min-h-screen p-5">
//       <h1 className="text-2xl font-bold mb-10">
//         BookClub CMS
//       </h1>

//       <nav className="space-y-2">
//         <Link
//           href="/admin"
//           className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
//         >
//           <LayoutDashboard size={18} />
//           Dashboard
//         </Link>

//         <Link
//           href="/admin/books"
//           className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
//         >
//           <BookOpen size={18} />
//           Books
//         </Link>

//         <Link
//           href="/admin/users"
//           className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
//         >
//           <Users size={18} />
//           Users
//         </Link>

//         <Link
//           href="/admin/libraries"
//           className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
//         >
//           <Library size={18} />
//           Libraries
//         </Link>

//         <Link
//           href="/admin/settings"
//           className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
//         >
//           <Settings size={18} />
//           Settings
//         </Link>
//       </nav>
//     </aside>
//   );
// }



"use client";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  Library,
  Settings,
  Link,
} from "lucide-react";

import { motion } from "framer-motion";

const menu = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Books",
    href: "/admin/books",
    icon: BookOpen,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Libraries",
    href: "/admin/libraries",
    icon: Library,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-black text-white min-h-screen p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-12"
      >
        BookClub
      </motion.h1>

      <nav className="space-y-3">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all"
              >
                <Icon size={20} />
                {item.name}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
}