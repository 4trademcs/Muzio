// ImageTrail.jsx (solo variante 7, mínimo necesario)
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// Helpers mínimos
const lerp = (a, b, n) => (1 - n) * a + n * b;
const getLocalPointerPos = (e, rect) => {
  const t = e.touches?.[0];
  const x = t ? t.clientX : e.clientX;
  const y = t ? t.clientY : e.clientY;
  return { x: x - rect.left, y: y - rect.top };
};
const getMouseDistance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
const getNewPosition = (pos, off, arr) => {
  const o = Math.abs(off) % arr.length;
  return pos - o >= 0 ? pos - o : arr.length - (o - pos);
};

// Cada imagen: guarda nodo y rect, se actualiza en resize
class ImageItem {
  DOM = { el: null, inner: null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect = null;
  constructor(el) {
    this.DOM.el = el;
    this.DOM.inner = el.querySelector(".content__img-inner");
    this.getRect();
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener("resize", this.resize);
  }
  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }
}

class ImageTrailVariant7 {
  constructor(container) {
    this.container = container;
    this.images = [...container.querySelectorAll(".content__img")].map(
      (img) => new ImageItem(img)
    );
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.visibleImagesCount = 0;
    this.visibleImagesTotal = Math.min(9, this.imagesTotal - 1);

    const move = (ev) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener("mousemove", move);
    container.addEventListener("touchmove", move, { passive: true });

    const init = (ev) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      container.removeEventListener("mousemove", init);
      container.removeEventListener("touchmove", init);
    };
    container.addEventListener("mousemove", init);
    container.addEventListener("touchmove", init, { passive: true });
  }

  render() {
    const d = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);

    if (d > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition =
      this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    ++this.visibleImagesCount;

    gsap.killTweensOf(img.DOM.el);
    const scaleValue = gsap.utils.random(0.5, 1.6);

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),
          rotationZ: 0,
          opacity: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: "power3",
          scale: scaleValue,
          rotationZ: gsap.utils.random(-3, 3),
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      );

    if (this.visibleImagesCount >= this.visibleImagesTotal) {
      const lastIdx = getNewPosition(
        this.imgPosition,
        this.visibleImagesTotal,
        this.images
      );
      const oldImg = this.images[lastIdx];
      gsap.to(oldImg.DOM.el, {
        duration: 0.4,
        ease: "power4",
        opacity: 0,
        scale: 1.3,
        onComplete: () => {
          if (this.activeImagesCount === 0) this.isIdle = true;
        },
      });
    }
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
  }
}

// Componente React mínimo (solo variante 7)
export default function ImageTrail({ items = [] }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) new ImageTrailVariant7(ref.current);
  }, [items]);
  return (
    <div
      ref={ref}
      className="relative w-full h-full rounded-lg bg-transparent overflow-visible"
    >
      {items.map((url, i) => (
        <div
          key={i}
          className="content__img w-[190px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter]"
        >
          <div
            className="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}
