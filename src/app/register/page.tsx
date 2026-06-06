// "use client";

// import { useState } from "react";

// import Link from "next/link";

// import { useRouter } from "next/navigation";

// import { motion } from "framer-motion";

// import {
//   User,
//   Mail,
//   Lock,
//   ArrowRight,
// } from "lucide-react";

// import api from "@/services/api";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [name, setName] =
//     useState("");

//   const [email, setEmail] =
//     useState("");

//   const [password, setPassword] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const handleRegister = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await api.post(
//         "/auth/register",
//         {
//           name,
//           email,
//           password,
//         }
//       );

//       router.push("/login");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex overflow-hidden">
//       {/* LEFT SECTION */}

//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black via-slate-900 to-blue-950 relative items-center justify-center p-16">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_40%)]"></div>

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 40,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.7,
//           }}
//           className="relative z-10 max-w-xl"
//         >
//           <h1 className="text-6xl font-black text-white leading-tight">
//             Join The
//             <span className="block text-blue-400">
//               Future Of Reading
//             </span>
//           </h1>

//           <p className="mt-8 text-slate-300 text-xl leading-relaxed">
//             Build reading communities,
//             manage libraries, connect
//             books, and power modern
//             digital reading ecosystems.
//           </p>

//           <div className="mt-14 grid grid-cols-2 gap-6">
//             <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
//               <h2 className="text-4xl font-black text-white">
//                 50K+
//               </h2>

//               <p className="mt-2 text-slate-300">
//                 Books Managed
//               </p>
//             </div>

//             <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
//               <h2 className="text-4xl font-black text-white">
//                 12K+
//               </h2>

//               <p className="mt-2 text-slate-300">
//                 Active Members
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* RIGHT SECTION */}

//       <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
//         <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

//         <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-20"></div>

//         <motion.div
//           initial={{
//             opacity: 0,
//             scale: 0.95,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//           }}
//           transition={{
//             duration: 0.5,
//           }}
//           className="relative z-10 w-full max-w-lg bg-white/70 backdrop-blur-2xl border border-white/30 rounded-[40px] shadow-2xl p-10"
//         >
//           <div className="text-center">
//             <h1 className="text-5xl font-black">
//               Create Account
//             </h1>

//             <p className="mt-4 text-slate-500 text-lg">
//               Start your BookClub CMS
//               journey
//             </p>
//           </div>

//           <form
//             onSubmit={handleRegister}
//             className="mt-10 space-y-6"
//           >
//             {/* NAME */}

//             <div>
//               <label className="text-sm font-medium text-slate-600">
//                 Full Name
//               </label>

//               <div className="mt-2 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-4">
//                 <User
//                   size={20}
//                   className="text-slate-400"
//                 />

//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   className="w-full bg-transparent outline-none"
//                   value={name}
//                   onChange={(e) =>
//                     setName(e.target.value)
//                   }
//                 />
//               </div>
//             </div>

//             {/* EMAIL */}

//             <div>
//               <label className="text-sm font-medium text-slate-600">
//                 Email Address
//               </label>

//               <div className="mt-2 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-4">
//                 <Mail
//                   size={20}
//                   className="text-slate-400"
//                 />

//                 <input
//                   type="email"
//                   placeholder="admin@bookclub.com"
//                   className="w-full bg-transparent outline-none"
//                   value={email}
//                   onChange={(e) =>
//                     setEmail(e.target.value)
//                   }
//                 />
//               </div>
//             </div>

//             {/* PASSWORD */}

//             <div>
//               <label className="text-sm font-medium text-slate-600">
//                 Password
//               </label>

//               <div className="mt-2 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-4">
//                 <Lock
//                   size={20}
//                   className="text-slate-400"
//                 />

//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full bg-transparent outline-none"
//                   value={password}
//                   onChange={(e) =>
//                     setPassword(
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//             </div>

//             {/* BUTTON */}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl"
//             >
//               {loading
//                 ? "Creating Account..."
//                 : "Create Account"}

//               <ArrowRight size={20} />
//             </button>
//           </form>

//           {/* FOOTER */}

//           <div className="mt-8 text-center">
//             <p className="text-slate-500">
//               Already have an account?
//             </p>

//             <Link
//               href="/login"
//               className="mt-3 inline-block text-black font-semibold hover:underline"
//             >
//               Login Here
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </main>
//   );
// }



"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

import { useDispatch } from "react-redux";

import api from "@/services/api";

import { setCredentials } from "@/store/authSlice";

export default function RegisterPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const response =
        await api.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

      const data = response.data;

      /* SAVE TOKEN */

      localStorage.setItem(
        "token",
        data.token
      );
      document.cookie = `token=${data.token}; path=/; SameSite=Lax`;

      /* SAVE USER IN REDUX */

      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        })
      );

      /* REDIRECT */

      router.push("/account");
    } catch (error: unknown) {
      console.log(error);

      const apiError = error as { response?: { data?: { message?: string } } };
      setError(
        apiError.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex overflow-hidden">
      {/* LEFT SECTION */}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black via-slate-900 to-blue-950 relative items-center justify-center p-16">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_40%)]"></div>

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative z-10 max-w-xl"
        >
          <h1 className="text-6xl font-black text-white leading-tight">
            Join The
            <span className="block text-blue-400">
              Future Of Reading
            </span>
          </h1>

          <p className="mt-8 text-slate-300 text-xl leading-relaxed">
            Build reading communities,
            manage libraries, connect
            books, and power modern
            digital reading ecosystems.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-4xl font-black text-white">
                50K+
              </h2>

              <p className="mt-2 text-slate-300">
                Books Managed
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-4xl font-black text-white">
                12K+
              </h2>

              <p className="mt-2 text-slate-300">
                Active Members
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SECTION */}

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-20"></div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="relative z-10 w-full max-w-lg bg-white/70 backdrop-blur-2xl border border-white/30 rounded-[40px] shadow-2xl p-10"
        >
          <div className="text-center">
            <h1 className="text-5xl font-black">
              Create Account
            </h1>

            <p className="mt-4 text-slate-500 text-lg">
              Start your BookClub CMS
              journey
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-6 bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="mt-10 space-y-6"
          >
            {/* NAME */}

            <div>
              <label className="text-sm font-medium text-slate-600">
                Full Name
              </label>

              <div className="mt-2 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-4">
                <User
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent outline-none"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label className="text-sm font-medium text-slate-600">
                Email Address
              </label>

              <div className="mt-2 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-4">
                <Mail
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  placeholder="admin@bookclub.com"
                  className="w-full bg-transparent outline-none"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="text-sm font-medium text-slate-600">
                Password
              </label>

              <div className="mt-2 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-4">
                <Lock
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="password"
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl disabled:opacity-70"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}

              <ArrowRight size={20} />
            </button>
          </form>

          {/* FOOTER */}

          <div className="mt-8 text-center">
            <p className="text-slate-500">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="mt-3 inline-block text-black font-semibold hover:underline"
            >
              Login Here
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
