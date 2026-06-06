// // import Link from "next/link";

// // export default function HomePage() {
// //   return (
// //     <main className="min-h-screen bg-slate-100">
// //       <div className="max-w-7xl mx-auto px-6 py-20">
// //         <h1 className="text-6xl font-bold">
// //           BookClub Platform
// //         </h1>

// //         <p className="mt-5 text-xl text-slate-600">
// //           LibraryLink + Amazon Product API Integration
// //         </p>

// //         <div className="mt-10">
// //           <Link
// //             href="/admin"
// //             className="bg-black text-white px-6 py-3 rounded-xl"
// //           >
// //             Go To Dashboard
// //           </Link>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }


// import DashboardLayout from "@/components/layout/dashboard-layout";

// export default function AdminPage() {
//   return (
//     <DashboardLayout>
//       <div>
//         <h1 className="text-3xl font-bold">
//           Dashboard
//         </h1>

//         <p className="text-slate-500 mt-2">
//           Welcome to BookClub Admin Panel
//         </p>

//         <div className="grid grid-cols-4 gap-6 mt-10">
//           <div className="bg-white rounded-2xl p-6 shadow">
//             <h3 className="font-semibold">
//               Total Books
//             </h3>

//             <p className="text-3xl mt-4">
//               120
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow">
//             <h3 className="font-semibold">
//               Users
//             </h3>

//             <p className="text-3xl mt-4">
//               540
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow">
//             <h3 className="font-semibold">
//               Libraries
//             </h3>

//             <p className="text-3xl mt-4">
//               24
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow">
//             <h3 className="font-semibold">
//               Clubs
//             </h3>

//             <p className="text-3xl mt-4">
//               14
//             </p>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }




import DashboardLayout from "@/components/layout/dashboard-layout";

import StatsCard from "@/components/dashboard/stats-card";

import {
  BookOpen,
  Users,
  Library,
  MessageSquare,
} from "lucide-react";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Welcome back to your BookClub CMS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatsCard
            title="Total Books"
            value="2,450"
            icon={<BookOpen size={26} />}
          />

          <StatsCard
            title="Users"
            value="18,200"
            icon={<Users size={26} />}
          />

          <StatsCard
            title="Libraries"
            value="240"
            icon={<Library size={26} />}
          />

          <StatsCard
            title="Reviews"
            value="8,430"
            icon={<MessageSquare size={26} />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}