# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server on http://localhost:3000.
- `npm run build` — production build (`next build`).
- `npm start` — run the production build.
- `npm run lint` — ESLint via flat config (`eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + TypeScript).

There is no test runner configured. Do not invent one — if a change needs verification, run the dev server and exercise the feature in a browser (per the user-facing rule about UI changes).

## High-level architecture

Marketing/site for Tintas Maza built on **Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4**. UI strings, route slugs, and content are in **pt-BR** (e.g. `/produtos`, `/sobre`, `/onde-encontrar`). Path alias: `@/*` → `src/*`.

### Routing & rendering model

- `src/app/layout.tsx` is the root layout: loads the Roboto font, renders `<Navbar />` + page + `<Footer />`, and sets metadata + `metadataBase: https://tintasmaza.com.br`. Uses `<link rel="preconnect">` for ViaCEP/Nominatim/OSM tiles.
- `src/app/page.tsx` (home) imports `HeroSection` eagerly and lazy-loads the rest of the home sections via `next/dynamic` to keep initial JS small. Replicate this pattern when adding heavy sections.
- `/produto/[slug]` uses `generateStaticParams()` over the static `PRODUCTS` array — adding a new product means appending to `src/lib/products.ts`; the dynamic route picks it up automatically.
- `/onde-encontrar/page.tsx` reads optional query params (`tipo`/`modo`/`tab`) on the server to choose `initialMode` (`stores` | `representatives`), then renders the client `StoreLocator`.
- Default to **server components**. Mark `"use client"` only when needed (state, browser APIs, GSAP/framer-motion). The store locator and the GSAP-driven sections are the main client-component clusters.

### Tailwind v4 + design tokens

`src/app/globals.css` uses the v4 `@import "tailwindcss"` + `@theme { … }` syntax, mapping HSL CSS variables (defined under `@layer base { :root { … } }`) into Tailwind color tokens. Brand palette is centered on red `#B11116` and gold `#FBB943`. Reuse the existing CSS variables / utility classes (`bg-maza-grid`, `animate-maza-mesh`, etc.) instead of hard-coding new ones.

### Animations: GSAP via data attributes

`src/hooks/use-gsap-effects.ts` exports scoped hooks (`useGsapHero`, `useGsapReveal`, `useGsapParallax`, `useGsapCountUp`, `useGsapMagneticCards`, `useGsapAmbientMotion`) that each take a section ref and look up elements inside it by **data attributes**:

- `data-gsap-reveal` (+ optional `data-gsap-y`, `data-gsap-duration`, `data-gsap-delay`, `data-gsap-start`)
- `data-gsap-stagger` group wrapper
- `data-gsap-parallax` + `data-gsap-speed`
- `data-gsap-count` + `data-gsap-decimals` / `data-gsap-prefix` / `data-gsap-suffix`
- `data-gsap-card` (+ `data-gsap-card-glare` child) for magnetic-card hover
- `data-gsap-float` (+ `data-gsap-float-y/-rotate/-duration`) for ambient motion
- Hero timeline reads `data-gsap-hero-bg`, `data-gsap-hero-item`, `data-gsap-paint-path/arc/highlight/shadow`, `data-gsap-paint-brush`, `data-gsap-scroll-cue`.

When adding animated content, prefer wiring it into these data hooks rather than calling GSAP directly. All hooks honor `prefers-reduced-motion` and use `gsap.context` for cleanup — keep that contract.

### Store locator (`/onde-encontrar`)

Currently runs **fully client-side against mock data + public APIs**:

- `src/lib/store-locator.ts` — `MOCK_STORES`, `MOCK_REPRESENTATIVES`, `MOCK_REPRESENTATIVE_REGIONS`, distance helpers (`@turf/turf`), CEP normalization/validation, plus `fetchRepresentativeStates / Cities / Representatives` that hit `/api/representantes/*` and accept either `T[]` or `{ data: T[] }`.
- `src/lib/nominatim.ts` — CEP → coords pipeline: ViaCEP (structured address) → Nominatim geocode (street+city+state, then city+state fallback) → raw-CEP Nominatim fallback. 10 s per-request timeout, accepts an external `AbortSignal`.
- `src/lib/ip-location.ts` — IP geolocation fallback chain: ipapi.co → ipwho.is, 5 s timeout each.
- `src/components/store-locator/StoreLocator.tsx` — orchestrates UI, search, distance sorting, mode toggle.
- `StoreLocatorMap.tsx` is loaded via `next/dynamic` with `ssr: false` because **leaflet touches `window`**. Keep that import shape when modifying the map.

The expected backend contract (when `/api/lojas` and `/api/representantes/*` are implemented) is documented in [docs/endpoints-onde-encontrar.md](docs/endpoints-onde-encontrar.md) — match the field shapes there exactly (no extra fields like `email`/`hours`/`whatsapp` on stores; representatives must not leak `id`/`address`/`state`/`city`).

### Security headers / CSP

`next.config.ts` ships a strict CSP plus HSTS, X-Frame-Options DENY, Permissions-Policy, etc., and sets long immutable caching for `/assets/:path*`. The `script-src 'unsafe-inline' 'unsafe-eval'` entries are required by the Next dev runtime — if you tighten CSP for production, do it via middleware (nonce/strict-dynamic), not by removing those tokens, or dev will break.

### Image optimization

`next.config.ts` configures AVIF/WebP, custom device/image sizes, 30-day min cache TTL, and an explicit `qualities` whitelist (`[50, 65, 75, 85]`). When using `<Image quality={…}>`, pick a value from that list — others will be rejected by Next 16. Remote images are only allowed from `placehold.co`; add new hostnames to `images.remotePatterns` if needed.

## Conventions worth knowing

- New product = append to `PRODUCTS` in `src/lib/products.ts`. The slug becomes the URL via `generateStaticParams`.
- Heavy/below-the-fold sections should be `next/dynamic`-loaded the way `src/app/page.tsx` does it.
- `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) is the standard className combiner.
- Icons come from `lucide-react`; carousels from `embla-carousel-react` (+ `embla-carousel-autoplay`); ad-hoc motion from `framer-motion`. `experimental.optimizePackageImports` already covers these — no manual barrel-file tricks needed.
