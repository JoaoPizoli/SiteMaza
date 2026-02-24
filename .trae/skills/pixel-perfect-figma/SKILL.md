---
name: "pixel-perfect-figma"
description: "Ensures pixel-perfect yet responsive implementation of Figma designs. Invoke when implementing UI from Figma or when precise design fidelity is required."
---

# Pixel-Perfect Figma Implementation

This skill guides the agent to implement designs from Figma with high fidelity while maintaining responsiveness.

## Core Principles

1.  **Pixel-Perfect Fidelity**:
    -   Follow exact values for **spacings** (margins, paddings, gaps).
    -   Use exact **colors** (hex, rgba, or design system tokens if available).
    -   Replicate **typography** precisely (font-family, size, weight, line-height, letter-spacing).
    -   Match **sizes** (width, height, border-radius) exactly as specified in the design.
    -   Ensure **positions** (absolute/relative/fixed) and **z-indexes** reflect the visual hierarchy.
    -   Verify **background colors**, gradients, and shadows match the design specifications.

2.  **Responsive Adaptation**:
    -   While initial values should match the design (often mobile-first or desktop-first), ensure the layout adapts fluidly across screen sizes.
    -   Use **relative units** (rem, %, vw/vh) where appropriate for scalability, converting pixels if necessary (e.g., 16px = 1rem).
    -   Implement **breakpoints** consistent with the design's grid system or standard industry practices if not explicitly defined.
    -   Ensure images and containers are flexible (`max-width: 100%`, `flex-wrap`, etc.) to prevent overflow.

3.  **Component Accuracy**:
    -   Treat UI elements as reusable components where possible.
    -   Maintain consistency in button styles, form inputs, and cards.

## Checklist for Implementation

-   [ ] **Typography**: Font family, weight, size, line-height, color.
-   [ ] **Spacing**: Padding, margin, gap between elements.
-   [ ] **Colors**: Backgrounds, borders, text, shadows.
-   [ ] **Layout**: Flexbox/Grid structure, alignment, distribution.
-   [ ] **Assets**: Correct export formats (SVG for icons, optimized images for photos).
-   [ ] **Interactions**: Hover states, active states, focus states (if defined).
-   [ ] **Responsiveness**: Verify behavior on mobile, tablet, and desktop.

## Usage Instructions

When the user provides a Figma design (URL, screenshot, or description):
1.  Analyze the design properties meticulously.
2.  Extract exact values.
3.  Write code that reflects these values.
4.  Review the generated code against the design to ensure no visual discrepancies exist.
