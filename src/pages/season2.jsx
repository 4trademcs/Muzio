import { useState } from "react";
import Hero from "../components/Hero";
import ImageTrail from "../components/reactBits/image-trailOwn";
import Reasons from "../components/Reasons";
import Timeline from "../components/Timeline";
import MarqueeLove from "../components/MarqueeLove";
import Letter from "../components/Letter";
import Coupons from "../components/Coupons";
import Gallery from "../components/Gallery";
import reasons from "../components/reasons.json";

import ConfettiBackdrop from "../components/ConfettiBackdrop";
import Footer from "../components/Footer";

export default function App() {
  const baseReasons = Array.isArray(reasons) ? reasons : [];
  const [items, setItems] = useState(baseReasons.slice(0, 12));

  const loadMore = () => {
    const next = baseReasons.slice(items.length, items.length + 8);
    if (next.length) setItems(prev => [...prev, ...next]);
  };

  return (
    <>
    <main className="relative min-h-screen bg-[#060010] text-white">
      {/* Confetti global detrás de todo */}
      <ConfettiBackdrop
        onMs={3000}
        offMs={4000}
        zIndex={2}
        piecesOn={120}
        gravity={0.35}
        wind={0.015}
        tweenDuration={5800}
        className="fixed inset-0"
      />

      {/* 1) Hero */}
      <Hero />

      {/* 2) Reasons + Infinite Scroll */}
      <section id="reasons" className="relative py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            Razones por las que te quiero
          </h2>
          <div id="reasons-list" className="mt-10">
            <Reasons items={items} />
            {items.length < baseReasons.length && (
              <div className="mt-10">
                <button
                  onClick={loadMore}
                  className="rounded-xl px-5 py-2 bg-pink-500/20 hover:bg-pink-500/30 ring-1 ring-pink-400/40 transition-colors"
                >
                  Cargar más ❤️
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3) Momentos de pics (trail) */}
      <section className="relative py-20">
        <div className="m-auto min-h-[100vh] relative">
          <h2 className="mx-auto text-2xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-400 p-4 relative z-10">
            Ven, hagamos magia juntos… arrastra un menique por la pantalla ✨
          </h2>

          <div
            className="relative min-h-[90vh] overflow-hidden p-2 bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/20 to-violet-500/30"
            style={{
              boxShadow:
                "inset 0px 1px 50px 3px #060010, 0px 30px 120px -40px rgba(0,0,0,0.6)",
            }}
          >
            {/* capas de difuminado */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 0 120px 40px rgba(6,0,16,0.75), inset 0 0 40px 10px rgba(0,0,0,0.35)",
              }}
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/* ImageTrail ocupa toda el área */}
            <div className="absolute inset-0 w-full h-full">
              <ImageTrail
                items={[
                  "/f-1.webp",
                  "/f-2.webp",
                  "/f-3.webp",
                  "/f-4.webp",
                  "/f-5.webp",
                  "/f-6.webp",
                  "/f-7.webp",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <Timeline />
      <MarqueeLove />
      <Letter />
      <Coupons />
      <Gallery />
    </main>
    <Footer/>
    </>
  );
}
