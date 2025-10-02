export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
    backgroundSize: "300% 100%",
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit items-center justify-center z-0 rounded-[1.25rem] font-medium  transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 z-0 pointer-events-none animate-gradient"
          style={gradientStyle}
        >
          {/* “Borde” con relleno negro interior */}
          <div
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}

      <div
        className="inline-block relative z-[2] text-transparent bg-clip-text animate-gradient"
        style={gradientStyle}
      >
        {children}
      </div>
    </div>
  );
}
