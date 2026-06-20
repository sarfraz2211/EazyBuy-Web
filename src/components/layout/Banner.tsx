"use client";

import { useEffect, useState } from "react";

const slides = [
  { eyebrow: "SUMMER EDIT", title: "Fresh styles. Brighter days.", offer: "Up to 60% off", className: "slide-blue" },
  { eyebrow: "TECH WEEK", title: "Smart upgrades, clever prices.", offer: "Save up to ₹12,000", className: "slide-purple" },
  { eyebrow: "HOME REFRESH", title: "Make every corner feel new.", offer: "Starting at ₹299", className: "slide-green" },
  { eyebrow: "BEAUTY PICKS", title: "A little glow goes a long way.", offer: "Buy 2, get 1 free", className: "slide-pink" },
  { eyebrow: "DAILY ESSENTIALS", title: "Everything you need, delivered.", offer: "Extra 15% off", className: "slide-orange" },
];

// Shows five promotional slides with manual controls and automatic movement.
export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Automatically advances the carousel every four seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="banner" aria-label="Featured offers">
      <div className="banner-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <article className={`banner-slide ${slide.className}`} key={slide.title} aria-hidden={index !== activeSlide}>
            <div className="banner-copy">
              <span>{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.offer}</p>
              <a href="#products">Shop the collection <span>→</span></a>
            </div>
            <div className="banner-art" aria-hidden="true"><i /><i /><i /></div>
          </article>
        ))}
      </div>
      <button className="carousel-arrow previous" onClick={() => setActiveSlide(current => (current - 1 + slides.length) % slides.length)} aria-label="Previous banner">‹</button>
      <button className="carousel-arrow next" onClick={() => setActiveSlide(current => (current + 1) % slides.length)} aria-label="Next banner">›</button>
      <div className="carousel-dots">
        {slides.map((slide, index) => <button key={slide.title} className={index === activeSlide ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show banner ${index + 1}`} />)}
      </div>
    </section>
  );
}
