"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { layoutConfig } from "@/lib/layout";

const { slides, identity } = layoutConfig;

function SlideNumber({ slide }) {
  return (
    <div className="slide-number" aria-label={`Slide ${slide.index}`}>
      <span>{slide.index}</span>
      <span className="slide-number__rule" />
      <span>04</span>
    </div>
  );
}

function BrandMark() {
  return (
    <a className="brand-mark" href="#hook" aria-label="Ayusha home">
      A<span>.</span>
    </a>
  );
}

function Cursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label || window.matchMedia("(pointer: coarse)").matches) return undefined;
    const move = (event) => {
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.45, ease: "expo.out" });
    };
    const enter = (event) => {
      const target = event.currentTarget;
      cursor.classList.add("is-hovering");
      label.textContent = target.dataset.cursor || "VIEW";
    };
    const leave = () => cursor.classList.remove("is-hovering");
    const interactive = document.querySelectorAll("[data-cursor]");
    window.addEventListener("pointermove", move);
    interactive.forEach((element) => {
      element.addEventListener("pointerenter", enter);
      element.addEventListener("pointerleave", leave);
    });
    return () => {
      window.removeEventListener("pointermove", move);
      interactive.forEach((element) => {
        element.removeEventListener("pointerenter", enter);
        element.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span ref={labelRef}>VIEW</span></div>;
}

function OpeningSequence({ onComplete }) {
  const openingRef = useRef(null);
  const ruleRef = useRef(null);
  const nameRef = useRef(null);
  const headlineRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const opening = openingRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      onComplete();
      return undefined;
    }
    const timeline = gsap.timeline({ onComplete });
    timeline
      .fromTo(opening.querySelector(".opening-label"), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0)
      .fromTo(ruleRef.current, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.65, ease: "power4.inOut" }, 1)
      .fromTo(nameRef.current, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "power4.out" }, 1.5)
      .fromTo(headlineRef.current.querySelectorAll("[data-opening-line]"), { yPercent: 110, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power4.out",
      }, 2.2)
      .fromTo(portraitRef.current, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 }, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 1, ease: "power4.out",
      }, 3)
      .to(opening, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, 4.2);
    return () => timeline.kill();
  }, [onComplete]);

  return (
    <div className="opening-sequence" ref={openingRef} aria-hidden="true">
      <p className="opening-label">PRESENTATION // DOCUMENTATION // DATA</p>
      <span className="opening-rule" ref={ruleRef} />
      <div className="opening-name" ref={nameRef}>Ayusha<span>.</span></div>
      <div className="opening-headline" ref={headlineRef}>
        <span data-opening-line>I transform messy data</span>
        <span data-opening-line>into polished, executive-ready</span>
        <span data-opening-line>presentations.</span>
      </div>
      <a className="opening-portrait" href="#hook" ref={portraitRef} aria-label="Go to Ayusha home">
        <span className="opening-monogram">A<span>.</span></span>
      </a>
    </div>
  );
}

function ArtFrame({ project, compact = false }) {
  return (
    <div className={`art-frame art-frame--${project.accent} ${compact ? "art-frame--compact" : ""}`} data-cursor={compact ? "VIEW" : undefined}>
      <div className="art-frame__grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
      </div>
      <span className="art-frame__crosshair art-frame__crosshair--top">+</span>
      <span className="art-frame__crosshair art-frame__crosshair--bottom">+</span>
      <div className="art-frame__topline">
        <span>{project.number} / 12 · {project.type}</span>
        <span>AY—DECK</span>
      </div>
      <div className="art-frame__body">
        <span className="art-frame__eyebrow">{project.metric}</span>
        <strong>{project.title}</strong>
        <span>{project.subtitle}</span>
        <div className="art-frame__bars" aria-hidden="true">
          <i data-chart-bar />
          <i data-chart-bar />
          <i data-chart-bar />
          <i data-chart-bar />
        </div>
      </div>
      <div className="art-frame__footer">
        <span>Presentation system</span>
        <span>→</span>
      </div>
      <div className="art-frame__callout">
        <span>Data → insight</span>
        <strong>{project.metric}</strong>
      </div>
    </div>
  );
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const sliderRef = useRef(null);
  const setFromPointer = (event) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.max(8, Math.min(92, ((event.clientX - rect.left) / rect.width) * 100)));
  };
  const onKeyDown = (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    setPosition((value) => Math.max(8, Math.min(92, value + (event.key === "ArrowRight" ? 4 : -4))));
  };
  return (
    <div
      className="before-after"
      ref={sliderRef}
      onPointerMove={(event) => event.buttons === 1 && setFromPointer(event)}
      onPointerDown={setFromPointer}
      onKeyDown={onKeyDown}
      role="slider"
      aria-label="Compare the original and redesigned presentation slide"
      aria-valuemin="8"
      aria-valuemax="92"
      aria-valuenow={Math.round(position)}
      tabIndex={0}
    >
      <div className="before-after__slide before-after__slide--before">
        <span className="before-after__label">Before / raw source</span>
        <strong>Quarterly<br />performance<br />update</strong>
        <p>Revenue overview / regional data / operational notes / next steps / appendix</p>
        <i /><i /><i />
      </div>
      <div className="before-after__slide before-after__slide--after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <span className="before-after__label">After / executive system</span>
        <strong>What changed<br />this quarter?</strong>
        <p>One narrative. Three signals. A clear decision.</p>
        <i /><i /><i />
      </div>
      <div className="before-after__curtain" style={{ left: `${position}%` }}>
        <span>↔</span>
      </div>
    </div>
  );
}

function CaseStudy({ project, onClose }) {
  const [deckIndex, setDeckIndex] = useState(0);
  const modalRef = useRef(null);
  const deckSlides = project.deckSlides || [
    { label: "Overview", title: project.title, kind: "after" },
    { label: "Approach", title: project.subtitle, kind: "after" },
    { label: "Result", title: project.metric, kind: "after" },
  ];

  useEffect(() => {
    const modal = modalRef.current;
    const keyHandler = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setDeckIndex((value) => Math.min(deckSlides.length - 1, value + 1));
      if (event.key === "ArrowLeft") setDeckIndex((value) => Math.max(0, value - 1));
    };
    window.addEventListener("keydown", keyHandler);
    if (modal) gsap.fromTo(modal, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" });
    return () => window.removeEventListener("keydown", keyHandler);
  }, [deckSlides.length, onClose]);

  const currentDeckSlide = deckSlides[deckIndex];
  return (
    <div className="case-study" ref={modalRef} style={{ "--case-tone": project.tone || "#0B0B0A" }} role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
      <button className="case-study__close" onClick={onClose} type="button">
        Close <span>×</span>
      </button>
      <div className="case-study__inner">
        <div className="case-study__visual">
          {project.id === "before-after" && deckIndex === 0 ? <BeforeAfterSlider /> : <ArtFrame project={{ ...project, title: currentDeckSlide.title, metric: currentDeckSlide.label }} />}
          <div className="case-study__index"><span>0{deckIndex + 1} / 0{deckSlides.length}</span><i style={{ transform: `scaleX(${(deckIndex + 1) / deckSlides.length})` }} /></div>
        </div>
        <div className="case-study__copy">
          <p className="eyebrow">{project.number} / {currentDeckSlide.label}</p>
          <h2>{currentDeckSlide.title}<br /><em>{deckIndex === 0 ? project.subtitle : project.type}</em></h2>
          <p className="case-study__lead">{project.cardText}</p>
          <div className="case-study__details">
            <div><span>Challenge</span><p>{project.challenge}</p></div>
            <div><span>Approach</span><p>{project.approach}</p></div>
            <div><span>Result</span><p>{project.result}</p></div>
          </div>
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="case-study__controls">
            <button type="button" onClick={() => setDeckIndex((value) => Math.max(0, value - 1))} disabled={deckIndex === 0}>← Previous</button>
            <div className="case-study__thumbs" aria-label="Case study slides">
              {deckSlides.map((slide, index) => <button key={`${slide.label}-${index}`} className={index === deckIndex ? "is-active" : ""} onClick={() => setDeckIndex(index)} type="button" aria-label={`Open ${slide.label}`}><span>{String(index + 1).padStart(2, "0")}</span></button>)}
            </div>
            <button type="button" onClick={() => setDeckIndex((value) => Math.min(deckSlides.length - 1, value + 1))} disabled={deckIndex === deckSlides.length - 1}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const deckRef = useRef(null);
  const activeIndexRef = useRef(0);
  const navigateRef = useRef(() => {});
  const galleryTrackRef = useRef(null);
  const transitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpening, setIsOpening] = useState(true);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return undefined;

    const sections = gsap.utils.toArray(".deck-slide");
    const transition = transitionRef.current;
    const galleryTrack = galleryTrackRef.current;
    const playCue = () => {
      if (!soundEnabled || !window.AudioContext) return;
      const context = audioContextRef.current || new window.AudioContext();
      audioContextRef.current = context;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(190, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(90, context.currentTime + 0.12);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.025, context.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.14);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.15);
    };
    const animateData = (section) => {
      gsap.fromTo(section.querySelectorAll("[data-chart-bar]"), { scaleY: 0, transformOrigin: "bottom center" }, {
        scaleY: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      });
    };
    const enter = (section) => {
      const elements = section.querySelectorAll("[data-reveal]");
      gsap.fromTo(elements, { yPercent: 18, opacity: 0 }, {
        yPercent: 0,
        opacity: 1,
        duration: layoutConfig.designSystem.motion.revealDuration,
        stagger: 0.06,
        ease: layoutConfig.designSystem.motion.ease,
        clearProps: "transform",
      });
      animateData(section);
    };
    enter(sections[0]);

    const moveTo = (nextIndex) => {
      const currentIndex = activeIndexRef.current;
      if (isAnimating.current || nextIndex < 0 || nextIndex >= sections.length || nextIndex === currentIndex) return;
      isAnimating.current = true;
      const current = sections[currentIndex];
      const next = sections[nextIndex];
      const direction = nextIndex > currentIndex ? 1 : -1;
      const isGalleryTransition = currentIndex === 0 && nextIndex === 1;
      gsap.set(next, { visibility: "visible" });
      playCue();

      if (isGalleryTransition && transition) {
        const shutterLeft = transition.querySelector(".transition-shutter--left");
        const shutterRight = transition.querySelector(".transition-shutter--right");
        const statement = transition.querySelector(".transition-statement");
        const statementRule = transition.querySelector(".transition-statement__rule");
        const firstFrame = next.querySelector(".project-card");
        const projectCards = next.querySelectorAll(".project-card");
        gsap.set(transition, { autoAlpha: 1 });
        const transitionCanvas = transition.querySelector(".transition-canvas");
        gsap.set([shutterLeft, shutterRight], { xPercent: 0 });
        gsap.set(transitionCanvas, { opacity: 1, scaleY: 0, transformOrigin: "bottom center" });
        gsap.set(statement, { opacity: 0, y: 20 });
        gsap.set(statementRule, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(next, { opacity: 1, yPercent: 0 });
        gsap.set(firstFrame, { scale: 1.15, transformOrigin: "center center" });
        gsap.set(projectCards, { xPercent: 8, opacity: 0 });

        gsap.timeline({
          onComplete: () => {
            gsap.set(current, { visibility: "hidden" });
            gsap.set(transition, { autoAlpha: 0 });
            gsap.set(projectCards, { clearProps: "transform,opacity" });
            gsap.set(firstFrame, { clearProps: "transform" });
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
            isAnimating.current = false;
          },
        })
          .to(current, { yPercent: -4, opacity: 0, duration: 0.6, ease: "power3.inOut" }, 0)
          .to(transitionCanvas, { scaleY: 1, duration: 0.6, ease: "power4.inOut" }, 0)
          .to(statement, { opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }, 0.6)
          .to(statementRule, { scaleX: 1, duration: 0.2, ease: "power3.out" }, 0.8)
          .to(statement, { opacity: 0, duration: 0.08 }, 1.3)
          .to(transitionCanvas, { opacity: 0, duration: 0.12 }, 1.3)
          .to(shutterLeft, { xPercent: -100, duration: 0.8, ease: "power4.inOut" }, 1.3)
          .to(shutterRight, { xPercent: 100, duration: 0.8, ease: "power4.inOut" }, 1.3)
          .to(firstFrame, { scale: 1, duration: 0.8, ease: "power4.out" }, 1.3)
          .to(projectCards, { xPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power4.out" }, 1.4)
          .to(transition, { autoAlpha: 0, duration: 0.12 }, 2.1)
          .add(() => animateData(next), 1.35)
          .add(updateGalleryFocus, 2.1);
        return;
      }

      gsap.timeline({
        defaults: { ease: layoutConfig.designSystem.motion.ease },
        onComplete: () => {
          gsap.set(current, { visibility: "hidden" });
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
          isAnimating.current = false;
        },
      }).to(current, { yPercent: -direction * 8, opacity: 0, duration: 0.72 }, 0)
        .fromTo(next, { yPercent: direction * 8, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05 }, 0.12)
        .fromTo(next.querySelectorAll("[data-reveal]"), { yPercent: 18, opacity: 0 }, {
          yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05, clearProps: "transform",
        }, 0.28)
        .add(() => animateData(next), 0.45);
    };
    navigateRef.current = moveTo;

    const onWheel = (event) => {
      if (window.matchMedia("(max-width: 800px), (prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      if (Math.abs(event.deltaY) < 8) return;
      moveTo(activeIndexRef.current + (event.deltaY > 0 ? 1 : -1));
    };
    const onKey = (event) => {
      if (["ArrowDown", "PageDown", "ArrowRight"].includes(event.key)) moveTo(activeIndexRef.current + 1);
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(event.key)) moveTo(activeIndexRef.current - 1);
    };
    deck.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    const updateGalleryFocus = () => {
      if (!galleryTrack) return;
      const trackRect = galleryTrack.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      galleryTrack.querySelectorAll(".project-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        const distance = (rect.left + rect.width / 2) - center;
        const normalized = Math.max(-1, Math.min(1, distance / (trackRect.width * 0.45)));
        card.classList.toggle("is-active", Math.abs(normalized) < 0.42);
        card.style.setProperty("--card-shift", `${normalized * -3}%`);
        card.querySelector(".art-frame")?.style.setProperty("--parallax", `${normalized * 18}px`);
      });
    };
    galleryTrack?.addEventListener("scroll", updateGalleryFocus, { passive: true });
    window.addEventListener("resize", updateGalleryFocus);
    window.setTimeout(updateGalleryFocus, 0);
    return () => {
      deck.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      galleryTrack?.removeEventListener("scroll", updateGalleryFocus);
      window.removeEventListener("resize", updateGalleryFocus);
      navigateRef.current = () => {};
    };
  }, [soundEnabled]);

  const goTo = (index) => {
    navigateRef.current(index);
  };

  return (
    <main className="deck-shell" ref={deckRef}>
      {isOpening && <OpeningSequence onComplete={() => setIsOpening(false)} />}
      <Cursor />
      <div className="transition-wipe" ref={transitionRef} aria-hidden="true">
        <div className="transition-canvas" />
        <div className="transition-shutter transition-shutter--left" />
        <div className="transition-shutter transition-shutter--right" />
        <div className="transition-statement">
          <span>Clarity is an architectural<br />design decision.</span>
          <i className="transition-statement__rule" />
        </div>
      </div>
      <div className={`blueprint-layer ${showBlueprint ? "is-visible" : ""}`} aria-hidden={!showBlueprint}>
        <span className="blueprint-crosshair blueprint-crosshair--one">+</span>
        <span className="blueprint-crosshair blueprint-crosshair--two">+</span>
        <span className="blueprint-crosshair blueprint-crosshair--three">+</span>
      </div>
      <header className="deck-header">
        <BrandMark />
        <span className="deck-header__label">Presentation / Documentation / Data</span>
        <div className="deck-header__tools">
          <button className="deck-tool" onClick={() => setShowBlueprint((value) => !value)} type="button" aria-pressed={showBlueprint}>
            [{showBlueprint ? "HIDE GRID" : "VIEW BLUEPRINT"}]
          </button>
          <button className="deck-tool" onClick={() => setSoundEnabled((value) => !value)} type="button" aria-pressed={soundEnabled}>
            [ SOUND {soundEnabled ? "ON" : "OFF"} ]
          </button>
          <button className="deck-header__contact deck-header__contact--button" onClick={() => goTo(3)} type="button">Hire me <span>↘</span></button>
        </div>
      </header>
      <div className="deck-progress" aria-label="Deck navigation">
        {slides.map((slide, index) => (
          <button key={slide.id} className={index === activeIndex ? "is-active" : ""} onClick={() => goTo(index)} type="button">
            <span>{slide.index}</span>
          </button>
        ))}
      </div>

      <section className="deck-slide deck-slide--hero" id="hook">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow" data-reveal>01 / The hook</p>
          <h1 data-reveal>{slides[0].title[0]}<br />{slides[0].title[1]}<br /><em>{slides[0].title[2]}</em></h1>
          <p className="hero-description" data-reveal>{slides[0].description}</p>
          <button className="text-button" onClick={() => goTo(1)} data-reveal data-cursor="DRAG" type="button">View my work <span>↓</span></button>
        </div>
        <div className="hero-portrait" data-reveal>
          <div className="hero-portrait__inner">
            <span className="hero-wordmark">Ayusha<span>.</span></span>
            <span className="hero-wordmark__line">Presentation / Documentation</span>
          </div>
        </div>
        <SlideNumber slide={slides[0]} />
      </section>

      <section className="deck-slide deck-slide--gallery" id="gallery">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow" data-reveal>02 / The gallery</p>
            <h2 data-reveal>{slides[1].title[0]}<br /><em>{slides[1].title[1]}</em></h2>
          </div>
          <p data-reveal>{slides[1].description}</p>
        </div>
        <div className="gallery-track" data-reveal ref={galleryTrackRef}>
          {slides[1].projects.map((project) => (
            <button className="project-card" key={project.id} onClick={() => setSelectedProject(project)} data-cursor="VIEW" type="button">
              <ArtFrame project={project} compact />
              <div className="project-card__caption"><span>{project.number} / {project.type}</span><strong>{project.subtitle}</strong></div>
              <div className="project-card__changes">
                <span>What changed?</span>
                {project.whatChanged.map((change) => <p key={change}>{change}</p>)}
              </div>
            </button>
          ))}
        </div>
        <SlideNumber slide={slides[1]} />
      </section>

      <section className="deck-slide deck-slide--profile" id="profile">
        <div className="profile-copy">
          <p className="eyebrow" data-reveal>03 / Kinetic profile</p>
          <h2 data-reveal>{slides[2].title[0]}<br /><em>{slides[2].title[1]}</em></h2>
          <p data-reveal>{slides[2].description}</p>
        </div>
        <div className="capability-wall" data-reveal>
          {[...slides[2].capabilities.advanced, ...slides[2].capabilities.agile].map((skill, index) => <span key={skill} style={{ "--i": index }}>{skill}</span>)}
        </div>
        <SlideNumber slide={slides[2]} />
      </section>

      <section className="deck-slide deck-slide--closing" id="closing">
        <p className="eyebrow" data-reveal>04 / The closing</p>
        <h2 data-reveal>{slides[3].title[0]}<br /><em>{slides[3].title[1]}</em></h2>
        <p className="closing-copy" data-reveal>{slides[3].description}</p>
        <a className="closing-email" href={`mailto:${identity.email}`} data-reveal>{identity.email} <span>↗</span></a>
        <div className="closing-links" data-reveal><a href={identity.linkedin}>LinkedIn</a><a href={identity.behance}>Behance</a><a href={`tel:${identity.phone}`}>{identity.phone}</a></div>
        <SlideNumber slide={slides[3]} />
      </section>

      {selectedProject && <CaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
