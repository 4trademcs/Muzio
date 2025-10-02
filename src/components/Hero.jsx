// src/components/Hero.jsx
import GradientText from "../components/reactBits/gradient-text";

export default function Hero() {
  return (
    <GradientText
      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
      animationSpeed={3}
      showBorder={false}
      className="custom-class text-6xl p-4 text-center m-auto h-screen z-0 bg-transparent w-full"
    >
      ¡Feliz Cumple Amanda!
    </GradientText>
  );
}
