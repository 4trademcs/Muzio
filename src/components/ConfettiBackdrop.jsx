import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

/**
 * ConfettiBackdrop
 * - ON 3s / OFF 4s en bucle (parametrizable).
 * - Empieza inmediatamente en ON.
 * - Pausa cuando #noConfetti (o el id indicado) está en viewport.
 * - Fuerza el <canvas> a fixed, full-viewport y pointer-events: none.
 */
export default function ConfettiBackdrop({
  onMs = 3000,
  offMs = 4000,
  zIndex = 20,
  piecesOn = 120,
  gravity = 0.35,
  wind = 0.015,
  tweenDuration = 5800,
  blockTargetId = "noConfetti",
  className = "",
}) {
  const { width, height } = useWindowSize();
  const [cycleOn, setCycleOn] = useState(true);   // empieza encendido
  const [blocked, setBlocked] = useState(false);  // true si #noConfetti visible
  const wrapRef = useRef(null);

  // Bucle ON/OFF (3s/4s) iniciando en true
  useEffect(() => {
    let on = true;
    let timer;

    const tick = () => {
      setCycleOn(on);
      timer = setTimeout(() => {
        on = !on;
        tick();
      }, on ? onMs : offMs);
    };

    // Lanza de inmediato sin esperar al primer timeout
    tick();

    return () => clearTimeout(timer);
  }, [onMs, offMs]);

  // Observar elemento que bloquea confeti (por defecto #noConfetti)
  useEffect(() => {
    const el = document.getElementById(blockTargetId);
    if (!el) { setBlocked(false); return; }

    const io = new IntersectionObserver(
      (entries) => setBlocked(entries[0]?.isIntersecting === true),
      { root: null, rootMargin: "0px", threshold: 0 } // cualquier intersección lo pausa
    );
    io.observe(el);
    return () => io.disconnect();
  }, [blockTargetId]);

  // Forzar estilo FIXED al canvas generado por react-confetti
  useEffect(() => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.zIndex = String(zIndex);
    canvas.style.pointerEvents = "none";
  }, [cycleOn, blocked, width, height, zIndex]);

  // Si está bloqueado, confeti efectivo OFF aunque el ciclo diga ON
  const effectiveOn = cycleOn && !blocked;

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`}>
      <Confetti
        width={width}
        height={height}
        recycle={effectiveOn}
        numberOfPieces={effectiveOn ? piecesOn : 0}
        gravity={gravity}
        wind={wind}
        tweenDuration={tweenDuration}
      />
    </div>
  );
}
