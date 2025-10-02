import { useMemo, useCallback } from "react";
import clsx from "clsx";
import DecryptedText from "../reactBits/DecryptedText";
import FallingText from "../reactBits/FallingText";
import ButtonsPanel from "./ButtonsPanel";
import usePlayfulIntro from "./usePlayfulIntro";

export default function PlayfulIntro() {
  const {
    step,
    h1Text,
    b1Text,
    b2Text,
    correctBtn,
    isBlockedStep6,
    handleCorrect,
    onStep6Activated,
  } = usePlayfulIntro();

  const highlightWords = useMemo(() => ["Amanda", "programador", "corazón", "cae"], []);
  const handleFallingActivated = useCallback(() => onStep6Activated(), [onStep6Activated]);

  return (
    <section
      className={clsx(
        "min-h-dvh h-dvh w-full bg-[#0b0b12] text-white",
        "flex flex-col items-stretch justify-between"
      )}
    >
      <div className="w-full h-full relative flex flex-col items-stretch">
        {/* Título (fila 1: crece pero mantiene mínimo para no apretar botones) */}
        <div className="w-full min-h-[50svh] flex items-center justify-center text-center px-6">
          {step === 6 ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <FallingText
                text={h1Text}
                highlightWords={highlightWords}
                trigger="click"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.35}
                fontSize="2rem"
                mouseConstraintStiffness={0.5}
                onActivated={handleFallingActivated}
              />
            </div>
          ) : (
            <DecryptedText
              text={h1Text}
              animateOn="view"
              revealDirection="center"
              speed={50}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-200"
              encryptedClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-200"
            />
          )}
        </div>

        {/* Hints (fila 2: auto) */}
        <section className="text-center text-xl text-slate-300/70">
          {step === 1 && "Ok, lista para jugar? 😉"}
          {step === 2 && "cambia el correcto 😏"}
          {step === 3 && "piensa bien 🤔"}
          {step === 4 && "disfruta  ✨"}
          {step === 5 && "cada vez más cerca 💫"}
          {step === 6 && "hay mas regalos 🙌"}
          {step === 7 && "tkm mami 🎬"}
        </section>

        {/* Botones (fila 3: ocupa TODO el espacio restante) */}
        <ButtonsPanel
          step={step}
          correctBtn={correctBtn}
          isBlockedStep6={isBlockedStep6}
          b1Text={b1Text}
          b2Text={b2Text}
          onCorrect={handleCorrect}
          
        />
      </div>
    </section>
  );
}
