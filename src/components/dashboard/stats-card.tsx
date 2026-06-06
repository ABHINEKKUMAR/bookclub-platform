"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div className="bg-black text-white p-4 rounded-2xl">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}