/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

/**
 * FallingText
 * - Efecto de texto "caído" con Matter.js
 * - No se reinicia por re-renders ajenos: solo arranca una vez cuando effectStarted === true
 * - Notifica al padre cuando se activa (onActivated)
 */
const FallingText = ({
  text = "",
  highlightWords = [],
  trigger = "auto", // 'auto' | 'click' | 'hover' | 'scroll'
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  onActivated, // <- NUEVO: callback cuando inicia el efecto
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const hasActivatedRef = useRef(false); // evita activar dos veces

  // Render del html base SOLO si cambian text / highlightWords
  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(" ");

    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.startsWith(hw)
        );
        return `<span class="inline-block mx-[2px] select-none ${
          isHighlighted ? "text-cyan-500 font-bold" : ""
        }">${word}</span>`;
      })
      .join(" ");

    // Solo muta el DOM si realmente cambió
    if (textRef.current.innerHTML !== newHTML) {
      textRef.current.innerHTML = newHTML;
    }
  }, [text, highlightWords]);

  // Gestiona el "disparo" del efecto sin reinicios accidentales
  useEffect(() => {
    if (hasActivatedRef.current) return;

    if (trigger === "auto") {
      hasActivatedRef.current = true;
      setEffectStarted(true);
      onActivated?.();
      return;
    }

    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasActivatedRef.current) {
            hasActivatedRef.current = true;
            setEffectStarted(true);
            onActivated?.();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, onActivated]);

  // Monta Matter.js una sola vez cuando effectStarted pasa a true
  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const wordSpans = textRef.current.querySelectorAll("span");
    const wordBodies = [...wordSpans].map((elem) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      });
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      // Posicionar el span de forma absoluta para seguir al body
      elem.style.position = "absolute";
      elem.style.left = `${x}px`;
      elem.style.top = `${y}px`;
      elem.style.transform = `translate(-50%, -50%)`;
      return { elem, body };
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      // Engine.update(engine) NO es necesario porque Runner ya actualiza
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      try {
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas && render.canvas.parentNode) {
          render.canvas.parentNode.removeChild(render.canvas);
        }
        World.clear(engine.world, false);
        Engine.clear(engine);
      } catch {
        // no-op si ya está desmontado
      }
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  // Disparadores manuales (click/hover)
  const handleTrigger = () => {
    if (!hasActivatedRef.current && (trigger === "click" || trigger === "hover")) {
      hasActivatedRef.current = true;
      setEffectStarted(true);
      onActivated?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-pointer text-center pt-8 overflow-hidden"
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block"
        style={{
          fontSize,
          lineHeight: 1.4,
        }}
      />
      <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingText;
