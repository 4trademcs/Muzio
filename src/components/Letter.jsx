// src/components/Letter.jsx
import { motion } from "framer-motion";

export default function Letter() {
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="py-24 bg-gradient-to-r from-violet-900/40 to-pink-900/40">
      <div className="mx-auto max-w-3xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-3xl md:text-5xl font-bold"
        >
          Una carta para ti 💌
        </motion.h2>

        {/* Carta */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-2xl shadow-black/30"
        >
          {/* Cabecera tipo carta */}
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-6 text-sm text-white/70">
            <div>
              <div><span className="font-semibold text-white">De:</span> Michel</div>
              <div><span className="font-semibold text-white">Para:</span> Amanda</div>
            </div>
            <div>
              <div><span className="font-semibold text-white">Fecha:</span> {today}</div>
            </div>
          </header>

          {/* Cuerpo de la carta */}
          <div className="p-6 md:p-8 font-serif leading-relaxed text-white/90 text-lg space-y-6">
            <p>
              Desde que llegaste, mi vida es más brillante. Hoy celebro a la persona más especial que
              conozco. Te hago coito en habitaciones randoms (WTF). <span className="text-pink-200">❤️</span>
            </p>

            <p className="text-white/80">
              Fue un revolucionario que luchó por las luchas de la… <em>fuck</em>, mierda, me perdí. Perdón,
              fueron muchos años valorando gente en Historia.
            </p>

            <p>
              Mami, desde que usé esa palabra aquel día, desde que hablamos de los{" "}
              <strong className="text-cyan-200">pingüinos</strong>, aquellas conversaciones que iniciaron
              precisamente hablando de <strong className="text-fuchsia-200">paternidad</strong> hicieron girar
              nuestro mundo en reversa para traernos hasta aquí.
            </p>

            <p>
              Pero no quiero hablar de nuestra <strong className="text-violet-200">historia de amor</strong>;
              esa se está escribiendo todavía. Quiero tomarme los minutitos necesarios —mientras te miro leer
              esto— para decirte y repetirte una y otra y otra y otra y otra y otra y otra… <em>f*uck</em>,
              me volví a liar… una y otra vez cuánto agradezco haber mirado hacia ti, descubrirte, tomar para mí
              la mujer que eres. Dios, te quiero, y te lo hago saber.
            </p>

            <p className="text-white/80">
              Aún estoy dudando si poner este link público o no, no lo sé. Quizás, si alguien lo lee, así sabrá
              que Michel tiene alguien importante a su lado y en quien confía{" "}
              <strong className="tracking-wide">CARBON OXITOGENADO</strong>. Mñe… he leído que decir
              boludeces y que la gente las vea —preguntándose “¿qué rayos es eso?”— activa su cerebro, así que…
              probé, jajaja.
            </p>

            <p>
              Nena, te quiero mucho. <strong className="text-pink-200">Feliz cumpleaños</strong>, de veras,
              de veras eres muy importante para mí.
            </p>
          </div>

          {/* Firma */}
          <footer className="border-t border-white/10 px-6 md:px-8 py-6 text-right">
            <p className="font-serif text-white/80">
              Con amor,
            </p>
            <p className="mt-1 text-xl font-semibold text-white">Michel</p>
          </footer>
        </motion.article>
      </div>
    </section>
  );
}
