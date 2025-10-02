// src/components/MarqueeLove.jsx
import Marquee from "react-fast-marquee";

const messages = [
  "Gracias por existir 💖",
  "Siempre contigo 🌙",
  "Eres mi todo ✨",
  "Hoy celebramos tu luz 🎂",
];

export default function MarqueeLove() {
  return (
    <section className="py-16 bg-black/30">
      <Marquee gradient={false} speed={60}>
        {messages.map((msg, i) => (
          <span key={i} className="mx-8 text-2xl font-semibold text-pink-400">
            {msg}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
