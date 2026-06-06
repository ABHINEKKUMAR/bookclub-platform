"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <aside className="w-72 bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-10">
          BookClub CMS
        </h1>

        <nav className="space-y-4">
          <Link
            href="/admin"
            className="block hover:text-blue-400"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/books"
            className="block hover:text-blue-400"
          >
            Books
          </Link>

          <Link
            href="/admin/categories"
            className="block hover:text-blue-400"
          >
            Categories
          </Link>

          <Link
            href="/admin/members"
            className="block hover:text-blue-400"
          >
            Members
          </Link>

          <Link
            href="/admin/libraries"
            className="block hover:text-blue-400"
          >
            Libraries
          </Link>

          <Link
            href="/admin/reviews"
            className="block hover:text-blue-400"
          >
            Reviews
          </Link>

          <Link
            href="/admin/analytics"
            className="block hover:text-blue-400"
          >
            Analytics
          </Link>

          <Link
            href="/admin/settings"
            className="block hover:text-blue-400"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}

      <div className="flex-1">
        <header className="bg-white shadow p-5 flex justify-between">
          <h2 className="font-bold text-xl">
            Admin Panel
          </h2>

          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}