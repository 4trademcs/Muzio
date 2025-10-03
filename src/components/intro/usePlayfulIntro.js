import { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function usePlayfulIntro() {
  const [step, setStep] = useState(1);
  useEffect(() => { setStep(1); }, []); // siempre arrancar en 1

  const navigate = useNavigate();

  // patrón de botón correcto por fase (1..7)
  const correctButtonByStep = useMemo(() => ({
    1: "b1", 2: "b2", 3: "b1", 4: "b2", 5: "b1", 6: "b2", 7: "b1",
  }), []);

  // títulos por fase
  const h1ByStep = useMemo(() => ({
    1: "Hola Amanda, vas a tener a un novio programador… así que prepárate para estas cosas 💻✨",
    2: "Ajá… hoy es el cumple de tia Paola, tia Paola, ¿verdad? 😏",
    3: "Y te pregunto que es lo q mas te he dicho siempre?",
    4: "Ups… ¿Cuanto es (10*2)-una menor+los años que fuimos amigos? 😅💘",
    5: "Ya casi… ¿Cuan emocionada estás por saber que es tu regalo?",
    6: "No es tan fácil, primero haz que todo caiga a nuestros pies ✨",
    7: "Ok, última pregunta… ¿Jazz o K-Pop? 🎬",
  }), []);

  // textos de botones por fase (índice = step-1)
  const b1Texts = useMemo(() => ([
    "Tócame si te atreves",
    "No, tia Paola dijo grosería",
    "Hmm… así mami así 😜",
    "Cállate robacolágeno",
    "Muy emocionada 👀",
    "A ver si ahora sí…",
    "K-poooooop!!!", 
  ]), []);

  const b2Texts = useMemo(() => ([
    "Prometo portarme bien",
    "Hoy!!!! 🤝",
    "Ni idea, yo meo gradas y ya 🍕🎬",
    "F= m*a 😉",
    "Quiero un abrazo",
    "WTF!",
    "Jazz 😅", 
  ]), []);

  // desbloqueo del step 6 hasta activar FallingText
  const [step6Unlocked, setStep6Unlocked] = useState(false);
  useEffect(() => { if (step === 6) setStep6Unlocked(false); }, [step]);
  const onStep6Activated = useCallback(() => setStep6Unlocked(true), []);

  const goNext = useCallback(() => setStep(s => Math.min(s + 1, 7)), []);
  const handleFinish = useCallback(() => navigate("/season2"), [navigate]);

  const handleCorrect = useCallback((whichBtn) => {
    // Avanza solo si se presiona el botón correcto de la fase
    const correct = correctButtonByStep[step];
    if (whichBtn !== correct) return;

    if (step < 7) {
      goNext();
    } else {
      handleFinish();
    }
  }, [step, correctButtonByStep, goNext, handleFinish]);

  return {
    step,
    h1Text: h1ByStep[step],
    correctBtn: correctButtonByStep[step],
    b1Text: b1Texts[step - 1] ?? b1Texts[b1Texts.length - 1],
    b2Text: b2Texts[step - 1] ?? b2Texts[b2Texts.length - 1],
    isBlockedStep6: step === 6 && !step6Unlocked,
    handleCorrect,
    onStep6Activated,
  };
}
