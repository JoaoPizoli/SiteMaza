"use client";

import { type RefObject, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

type ScopeRef = RefObject<HTMLElement | null>;

let scrollTriggerRegistered = false;
let motionPathRegistered = false;

const useGsapLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function registerScrollTrigger() {
  if (typeof window === "undefined") return;
  if (scrollTriggerRegistered) return;

  gsap.registerPlugin(ScrollTrigger);
  scrollTriggerRegistered = true;
}

function registerMotionPath() {
  if (typeof window === "undefined") return;
  if (motionPathRegistered) return;

  gsap.registerPlugin(MotionPathPlugin);
  motionPathRegistered = true;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function numberFromDataset(
  element: HTMLElement,
  key: keyof DOMStringMap,
  fallback: number
) {
  const value = Number(element.dataset[key]);
  return Number.isFinite(value) ? value : fallback;
}

function renderCounter(
  element: HTMLElement,
  value: number,
  decimals: number,
  prefix: string,
  suffix: string
) {
  const rounded = value.toLocaleString("pt-BR", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });

  element.textContent = `${prefix}${rounded}${suffix}`;
}

export function useGsapHero(scope: ScopeRef) {
  useGsapLayoutEffect(() => {
    registerScrollTrigger();
    registerMotionPath();

    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-gsap-hero-item]");
      const heroLayers = gsap.utils.toArray<HTMLElement>("[data-gsap-hero-bg]");
      const paintPath = root.querySelector<SVGPathElement>(
        "[data-gsap-paint-path]"
      );
      const paintArc = root.querySelector<SVGPathElement>(
        "[data-gsap-paint-arc]"
      );
      const paintHighlight = root.querySelector<SVGPathElement>(
        "[data-gsap-paint-highlight]"
      );
      const paintShadow = root.querySelector<SVGPathElement>(
        "[data-gsap-paint-shadow]"
      );
      const paintBrush = root.querySelector<HTMLElement>(
        "[data-gsap-paint-brush]"
      );

      if (prefersReducedMotion()) {
        gsap.set([...heroItems, ...heroLayers], {
          autoAlpha: 1,
          clearProps: "all",
        });
        if (paintArc) {
          gsap.set(paintArc, {
            autoAlpha: 0.92,
            clearProps: "strokeDasharray,strokeDashoffset",
          });
        }
        if (paintHighlight) {
          gsap.set(paintHighlight, {
            autoAlpha: 0.82,
            clearProps: "strokeDasharray,strokeDashoffset",
          });
        }
        if (paintShadow) gsap.set(paintShadow, { autoAlpha: 0.58 });
        if (paintBrush) gsap.set(paintBrush, { autoAlpha: 0 });
        return;
      }

      if (paintArc) {
        const paintArcLength = paintArc.getTotalLength();
        gsap.set(paintArc, {
          autoAlpha: 0.92,
          strokeDasharray: paintArcLength,
          strokeDashoffset: paintArcLength,
        });
      }

      if (paintHighlight) {
        const paintHighlightLength = paintHighlight.getTotalLength();
        gsap.set(paintHighlight, {
          autoAlpha: 0.82,
          strokeDasharray: paintHighlightLength,
          strokeDashoffset: paintHighlightLength,
        });
      }

      if (paintShadow) gsap.set(paintShadow, { autoAlpha: 0 });

      if (paintBrush) {
        gsap.set(paintBrush, {
          autoAlpha: 0,
          transformOrigin: "11% 53%",
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        heroLayers,
        { autoAlpha: 0, scale: 0.94 },
        { autoAlpha: 1, scale: 1, duration: 1.15, stagger: 0.08 },
        0
      );

      if (paintPath && paintArc && paintBrush) {
        tl.to(paintBrush, { autoAlpha: 1, duration: 0.12 }, 0.22);

        if (paintShadow) {
          tl.to(
            paintShadow,
            {
              autoAlpha: 0.58,
              duration: 1.8,
              ease: "power2.out",
            },
            0.24
          );
        }

        tl.to(
          paintBrush,
          {
            duration: 2.28,
            ease: "power2.inOut",
            motionPath: {
              path: paintPath,
              align: paintPath,
              alignOrigin: [0.11, 0.53],
              autoRotate: true,
            },
          },
          0.24
        )
          .to(
            paintArc,
            {
              strokeDashoffset: 0,
              duration: 2.28,
              ease: "power2.inOut",
            },
            0.24
          )
          .to(
            paintBrush,
            {
              autoAlpha: 0,
              scale: 0.94,
              duration: 0.34,
              ease: "power2.in",
            },
            2.55
          );
      }

      if (paintHighlight) {
        tl.to(
          paintHighlight,
          {
            strokeDashoffset: 0,
            duration: 1.9,
            ease: "power2.out",
          },
          0.58
        );
      }

      tl.fromTo(
        heroItems,
        { autoAlpha: 0, y: 32, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
        },
        0.68
      );

      gsap.to("[data-gsap-scroll-cue]", {
        y: 9,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}

export function useGsapReveal(scope: ScopeRef) {
  useGsapLayoutEffect(() => {
    registerScrollTrigger();

    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]");

      if (prefersReducedMotion()) {
        gsap.set(revealItems, { autoAlpha: 1, y: 0, clearProps: "all" });
        return;
      }

      const staggerGroups = gsap.utils.toArray<HTMLElement>("[data-gsap-stagger]");
      const grouped = new Set<HTMLElement>();

      staggerGroups.forEach((group) => {
        const children = gsap.utils.toArray<HTMLElement>(
          group.querySelectorAll("[data-gsap-reveal]")
        );

        if (!children.length) return;
        children.forEach((child) => grouped.add(child));

        gsap.fromTo(
          children,
          {
            autoAlpha: 0,
            y: numberFromDataset(group, "gsapY", 28),
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: numberFromDataset(group, "gsapDuration", 0.72),
            ease: "power3.out",
            stagger: numberFromDataset(group, "gsapStagger", 0.08),
            scrollTrigger: {
              trigger: group,
              start: group.dataset.gsapStart ?? "top 82%",
              once: true,
            },
          }
        );
      });

      revealItems
        .filter((item) => !grouped.has(item))
        .forEach((item) => {
          gsap.fromTo(
            item,
            {
              autoAlpha: 0,
              y: numberFromDataset(item, "gsapY", 28),
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: numberFromDataset(item, "gsapDuration", 0.72),
              delay: numberFromDataset(item, "gsapDelay", 0),
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: item.dataset.gsapStart ?? "top 84%",
                once: true,
              },
            }
          );
        });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}

export function useGsapParallax(scope: ScopeRef) {
  useGsapLayoutEffect(() => {
    registerScrollTrigger();

    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-parallax]").forEach((layer) => {
        const section = layer.closest("section") ?? root;

        gsap.to(layer, {
          yPercent: numberFromDataset(layer, "gsapSpeed", 10),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}

export function useGsapCountUp(scope: ScopeRef) {
  useGsapLayoutEffect(() => {
    registerScrollTrigger();

    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-count]").forEach((target) => {
        const end = Number(target.dataset.gsapCount);
        if (!Number.isFinite(end)) return;

        const decimals = numberFromDataset(target, "gsapDecimals", 0);
        const prefix = target.dataset.gsapPrefix ?? "";
        const suffix = target.dataset.gsapSuffix ?? "";

        if (prefersReducedMotion()) {
          renderCounter(target, end, decimals, prefix, suffix);
          return;
        }

        const counter = { value: 0 };
        const update = () =>
          renderCounter(target, counter.value, decimals, prefix, suffix);

        update();

        gsap.to(counter, {
          value: end,
          duration: numberFromDataset(target, "gsapDuration", 1.25),
          ease: "power2.out",
          onUpdate: update,
          onComplete: () => renderCounter(target, end, decimals, prefix, suffix),
          scrollTrigger: {
            trigger: target,
            start: target.dataset.gsapStart ?? "top 86%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}

export function useGsapMagneticCards(scope: ScopeRef) {
  useGsapLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-card]").forEach((card) => {
        const glare = card.querySelector<HTMLElement>("[data-gsap-card-glare]");

        gsap.set(card, {
          transformPerspective: 900,
          transformStyle: "preserve-3d",
          willChange: "transform",
        });

        if (glare) gsap.set(glare, { autoAlpha: 0 });

        const rotateXTo = gsap.quickTo(card, "rotationX", {
          duration: 0.45,
          ease: "power3.out",
        });
        const rotateYTo = gsap.quickTo(card, "rotationY", {
          duration: 0.45,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(card, "y", {
          duration: 0.45,
          ease: "power3.out",
        });

        const reset = () => {
          rotateXTo(0);
          rotateYTo(0);
          yTo(0);
          if (glare) gsap.to(glare, { autoAlpha: 0, duration: 0.35 });
        };

        const handlePointerMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          rotateYTo((x - 0.5) * 7);
          rotateXTo((0.5 - y) * 6);
          yTo(-5);

          if (!glare) return;

          gsap.to(glare, {
            autoAlpha: 1,
            duration: 0.2,
            overwrite: true,
            background: `radial-gradient(circle at ${x * 100}% ${
              y * 100
            }%, rgba(255,255,255,0.26) 0%, rgba(251,185,67,0.12) 22%, transparent 46%)`,
          });
        };

        const handleFocus = () => {
          yTo(-4);
          if (glare) {
            gsap.to(glare, {
              autoAlpha: 1,
              duration: 0.25,
              background:
                "radial-gradient(circle at 70% 24%, rgba(255,255,255,0.2) 0%, rgba(251,185,67,0.1) 24%, transparent 48%)",
            });
          }
        };

        card.addEventListener("pointermove", handlePointerMove);
        card.addEventListener("pointerleave", reset);
        card.addEventListener("focus", handleFocus);
        card.addEventListener("blur", reset);

        cleanups.push(() => {
          card.removeEventListener("pointermove", handlePointerMove);
          card.removeEventListener("pointerleave", reset);
          card.removeEventListener("focus", handleFocus);
          card.removeEventListener("blur", reset);
        });
      });
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [scope]);
}

export function useGsapAmbientMotion(scope: ScopeRef) {
  useGsapLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-float]").forEach((target, index) => {
        gsap.to(target, {
          y: numberFromDataset(target, "gsapFloatY", -10),
          rotation: numberFromDataset(target, "gsapFloatRotate", 0),
          duration: numberFromDataset(target, "gsapFloatDuration", 3.8),
          delay: index * 0.12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
