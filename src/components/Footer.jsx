export default function Footer() {
  const funnyNotes = [
    "Hecho por un diestro para una ambidiestra ✋🤚",
    "Tienes un novio nerd… ¿qué esperabas? 🤓❤️",
    "Diseñado con amor y un poquito de código ☕💻",
    "Made with React and IA, pero pensado en ti 💡💘",
  ];

  return (
    <footer className="bg-black text-white py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <div className="text-sm text-gray-400">
          <span>© 2025 Cumpleaños22™ </span>
          <span className="ml-2">Michel_Producciones_PaUnaNovia®</span>
        </div>

        <div className="flex flex-col items-center gap-2 text-gray-300 text-sm md:text-base">
          {funnyNotes.map((note, i) => (
            <p
              key={i}
              className="hover:text-fuchsia-400 transition-colors duration-300"
            >
              {note}
            </p>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-6">
          — Este soy yo mami y esto es lo q puedo y se hacer —
        </p>
      </div>
    </footer>
  );
}
