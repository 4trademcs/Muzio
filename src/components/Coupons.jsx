// src/components/Coupons.jsx
import { motion } from "framer-motion";

const coupons = [
  "Un dulcesito personalizado 🥐",
  `Una tarde de dominoes en casita🎬`,
  `Un ratito a solas "relajante"...o no 💆`,
  "Un paseo nocturno romántico cuando se vaya la luz 🌙",
  "Zapaticos para ti👠",
  "Un regalo-sorpresa-especial V2.0 💆‍♀️",
];

export default function Coupons() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">
          Cuponcitos válidos para:
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coupons.map((c, i) => {
            // alternar colores: par = blanco, impar = azul
            const borderColor =
              i % 2 === 0 ? "border-white border-dotted" : "border-blue-400 border-dashed";

            return (
              <motion.div
                key={i}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className={`p-6 rounded-xl bg-white/10 backdrop-blur-md border-8 ${borderColor}`}
              >
                {c}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
