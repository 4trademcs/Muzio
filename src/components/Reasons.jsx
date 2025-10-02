/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function Reasons({ items }) {
  const dirs = ["left", "right", "up", "down"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((reason, i) => {
        const dir = dirs[i % dirs.length];
        return (
          <motion.div
            key={i}
            custom={dir}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-center"
          >
            {reason}
          </motion.div>
        );
      })}
    </div>
  );
}
