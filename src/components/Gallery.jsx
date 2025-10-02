// src/components/Gallery.jsx
import { motion } from "framer-motion";

const images = ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg"];

export default function Gallery() {
  return (
    <section className="py-24 bg-black/40">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center">
          Momentos Polaroid
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="w-40 h-52 bg-white p-2 shadow-xl rotate-[-3deg] hover:rotate-0"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
