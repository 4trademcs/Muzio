/* eslint-disable react/prop-types */
import { useRef, useState, useLayoutEffect, useEffect, useMemo, useCallback } from "react";

export default function ButtonsPanel({ step, correctBtn, isBlockedStep6, b1Text, b2Text, onCorrect, className }) {
  const areaRef = useRef(null), b1Ref = useRef(null), b2Ref = useRef(null);
  const [area, setArea] = useState({ w:0, h:0 }), [b1Sz, setB1Sz] = useState({ w:0, h:0 }), [b2Sz, setB2Sz] = useState({ w:0, h:0 });
  const [b1Base, setB1Base] = useState({ left:0, top:0 }), [b2Base, setB2Base] = useState({ left:0, top:0 });
  const [b1T, setB1T] = useState({ x:0, y:0 }), [b2T, setB2T] = useState({ x:0, y:0 });
  const PADDING = 12, MIN_MOVE = 50;

  const measure = useCallback(() => {
    const a = areaRef.current, r1 = b1Ref.current, r2 = b2Ref.current;
    if (!a || !r1 || !r2) return;
    const A = a.getBoundingClientRect(), R1 = r1.getBoundingClientRect(), R2 = r2.getBoundingClientRect();
    setArea({ w:Math.round(A.width), h:Math.round(A.height) });
    setB1Sz({ w:Math.round(R1.width), h:Math.round(R1.height) });
    setB2Sz({ w:Math.round(R2.width), h:Math.round(R2.height) });
  }, []);

  const setBases = useCallback(() => {
    if (!area.w || !area.h || !b1Sz.w || !b2Sz.w) return;
    setB1Base({ left: Math.round((area.w - b1Sz.w)/2), top: Math.round(area.h*0.35 - b1Sz.h/2) });
    setB2Base({ left: Math.round((area.w - b2Sz.w)/2), top: Math.round(area.h*0.65 - b2Sz.h/2) });
  }, [area, b1Sz, b2Sz]);

  useLayoutEffect(() => { requestAnimationFrame(() => { measure(); requestAnimationFrame(setBases); }); }, [measure, setBases, step]);

  const mkBounds = (sz, base) => !area.w||!area.h||!sz.w ? {minX:0,maxX:0,minY:0,maxY:0} : ({
    minX: Math.round(-(base.left - PADDING)),
    maxX: Math.round(area.w - sz.w - base.left - PADDING),
    minY: Math.round(-(base.top  - PADDING)),
    maxY: Math.round(area.h - sz.h - base.top  - PADDING)
  });
  const b1Bounds = useMemo(() => mkBounds(b1Sz, b1Base), [b1Sz, b1Base, area]);
  const b2Bounds = useMemo(() => mkBounds(b2Sz, b2Base), [b2Sz, b2Base, area]);

  const clamp = (t, b) => ({ x: Math.min(Math.max(t.x, b.minX), b.maxX), y: Math.min(Math.max(t.y, b.minY), b.maxY) });
  const nextT = (prev, b) => {
    const rand = (min,max)=>min+Math.random()*(max-min);
    for (let i=0;i<24;i++){ const nx=Math.round(rand(b.minX,b.maxX)), ny=Math.round(rand(b.minY,b.maxY));
      if (Math.hypot(nx-prev.x, ny-prev.y) >= MIN_MOVE) return { x:nx, y:ny }; }
    const corners=[{x:b.minX,y:b.minY},{x:b.minX,y:b.maxY},{x:b.maxX,y:b.minY},{x:b.maxX,y:b.maxY}];
    return corners.sort((c1,c2)=>Math.hypot(c2.x-prev.x,c2.y-prev.y)-Math.hypot(c1.x-prev.x,c1.y-prev.y))[0];
  };

  useEffect(() => {
    const onR = () => { measure(); setBases(); setB1T(t=>clamp(t,b1Bounds)); setB2T(t=>clamp(t,b2Bounds)); };
    window.addEventListener("resize", onR); return () => window.removeEventListener("resize", onR);
  }, [measure, setBases, b1Bounds, b2Bounds]);

  useEffect(() => { setB1T({x:0,y:0}); setB2T({x:0,y:0}); }, [step]);

  const clickB1 = () => { if (isBlockedStep6) return; if (correctBtn==="b1") return onCorrect("b1"); setB1T(p=>clamp(nextT(p,b1Bounds),b1Bounds)); };
  const clickB2 = () => { if (isBlockedStep6) return; if (correctBtn==="b2") return onCorrect("b2"); setB2T(p=>clamp(nextT(p,b2Bounds),b2Bounds)); };

  const baseBtnCls = "absolute rounded-full px-6 py-3 bg-white/5 text-slate-100 border border-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60";

  return (
    <div ref={areaRef} id="content-area" className={`relative w-full h-full min-h-[40svh] overflow-hidden ${className||""}`}>
      <button
        ref={b1Ref}
        className={baseBtnCls}
        style={{ left:b1Base.left, top:b1Base.top, transform:`translate(${b1T.x}px,${b1T.y}px)`, transition:"transform 380ms cubic-bezier(.2,.8,.2,1)", willChange:"transform" }}
        onClick={clickB1}
        disabled={isBlockedStep6}
      >{b1Text}</button>

      <button
        ref={b2Ref}
        className={baseBtnCls}
        style={{ left:b2Base.left, top:b2Base.top, transform:`translate(${b2T.x}px,${b2T.y}px)`, transition:"transform 380ms cubic-bezier(.2,.8,.2,1)", willChange:"transform" }}
        onClick={clickB2}
        disabled={isBlockedStep6}
      >{b2Text}</button>
    </div>
  );
}