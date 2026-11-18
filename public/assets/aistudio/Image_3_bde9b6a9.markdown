---
name: Power Term Notes
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3f4850'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-sm: 0.75rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system targets energy sector beginners, utility newcomers, and trainees who need fast, structured mastery of complex electrical power terminology. 

The aesthetic is Modern Editorial & Technical Utility—combining the credibility of a national power grid operator with the crisp, frictionless engagement of contemporary digital learning apps. It emphasizes high visual legibility, structured modular cards, and immediate cognitive clarity over decorative noise.

Key emotional attributes:
- **Authoritative & Trustworthy:** Structural discipline, deep baseline tones, and steady layout rhythms inspire confidence in institutional knowledge.
- **Electrified & Clear:** Energetic electric blues and warm amber accents punctuate vital takeaways, grid metrics, and quiz mechanics without overwhelming readability.
- **Digestible & Focused:** Mobile-first layout architecture structured around discrete learning cards, interactive glossary term chips, and scannable comprehension checks.

## Colors
The palette balances institutional stability with precise electrical vibrancy. Light mode serves as the default state to maximize reading retention and daytime focus during training sessions.

### Palette Architecture
- **Primary (`#0284C7` / `#0EA5E9`):** Energy Cyan/Blue. Represents transmission vitality, active term states, focal callouts, and primary interaction triggers.
- **Secondary (`#0F172A` / `#1E293B`):** Deep Substation Navy. Serves as anchor headers, deep structural containers, high-emphasis text, and baseline framing.
- **Tertiary (`#F59E0B` / `#FEF3C7`):** Electric Amber & Warm Filament. Reserved for key term highlights, review bookmarks, quiz feedback states, and priority badges.
- **Neutral (`#64748B`):** Cool Slate. Drives secondary metadata, structural hairline borders (`#E2E8F0`), body text support, and background canvas washes (`#F8FAFC`).

### Functional Application
- Canvas backgrounds utilize pure `#F8FAFC` to cut glare while maintaining stark contrast against pure white `#FFFFFF` surface cards.
- Dark navy surface variants (`#0F172A`) are deployed strategically for "Daily Grid Concept" focus headers and active quiz scoreboards to create distinct visual anchors.

## Typography
Typography is tuned for technical Korean and English bilingual readability, relying on neutral neo-grotesque geometry (`Inter` paired with system-standard Pretendard fallbacks for Korean CJK glyphs).

### Hierarchy Guidelines
- **Display & Section Headers:** Weighted at 700 with negative tracking to keep technical Korean compounds (e.g., 계통한계가격, 전력수급기본계획) tight and visually connected.
- **Body Rhythm:** `body-md` (15px) at 24px line height is the baseline reading tier for term definitions and article snippets, providing sufficient breathing room for long-form explanatory text on mobile screens.
- **Monospaced Units & Acronyms:** Electrical symbols (MWh, GW, SMP, REC) within body text retain crisp metrics and clear character disambiguation.

## Layout & Spacing
The layout model is mobile-first, fluid within a maximum content container of 480px on handhelds, scaling into a fixed 2-column dashboard (768px - 1024px) for desktop utility training environments.

### Breakpoints & Fluid Adaptation
- **Mobile (< 640px):** Single-column stack. Outer canvas margins strictly at `1rem` (`16px`) to maximize horizontal line length for technical descriptions. Component gutters default to `0.75rem` - `1rem`.
- **Tablet & Desktop (≥ 640px):** Centered phone shell simulator on wide viewports (480px max-width) or side-by-side splits (Glossary Term Stream on the left, Quiz/Detail drawer on the right). Canvas margins expand to `2rem`.

### Grid Rhythms
- Vertical pacing strictly adheres to a 4px/8px incremental rhythm. Spacing between independent card groups uses `space-lg` (`1.5rem`), while internal term card element gaps use `space-sm` (`0.5rem`) and `space-md` (`1rem`).

## Elevation & Depth
Elevation in this design system rejects heavy, blurry drop shadows in favor of crisp architectural stacking, tinted surface containment, and micro-borders that simulate physical flashcards.

### Elevation Hierarchy
- **Level 0 (Canvas):** Flat `#F8FAFC` base plane with no shadow.
- **Level 1 (Default Term Card):** Crisp surface layer (`#FFFFFF`) with a 1px solid border in `#E2E8F0` and an ultra-subtle tinted shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04)`.
- **Level 2 (Active/Pressed Card & Key Note):** 1px border highlighted to `#0284C7` (or `#F59E0B` for starred notes) with a soft ambient projection: `0 4px 12px -2px rgba(2, 132, 199, 0.08)`.
- **Level 3 (Modal Sheets & Quiz Overlays):** Positioned over a dim 40% opacity navy backdrop (`#0F172A`), casting a focused boundary shadow: `0 12px 28px -4px rgba(15, 23, 42, 0.16)`.

## Shapes
The shape language uses balanced rounded geometry (Level 2) to harmonize structural industrial discipline with approachable learning app ergonomics.

- **Base Components (8px / `0.5rem`):** Applied to standard interactive cards, input fields, multiple-choice quiz options, and buttons.
- **Enclosures & Surface Groups (`rounded-lg` / `1rem`):** Applied to top-level content containers, daily term feature cards, and bottom sheets.
- **Pill Elements (Full Round):** Exclusively reserved for status chips, categorized acronym tags, and stage progress indicators to provide visual contrast against rectangular term cards.

## Components

### Buttons
- **Primary Action (Learn / Confirm):** Solid `#0284C7` background, white label text, `0.5rem` border radius, min-height `48px` for comfortable thumb tap targets. Active state darkens to `#0369A1` with an inner scale transform (`0.98`).
- **Secondary Action (View Context / Skip):** Outlined `#E2E8F0` with `#0F172A` text, hover/focus state shifts background to `#F1F5F9`.
- **Accent Action (Quiz Submit / Star Term):** Warm amber `#F59E0B` background with `#0F172A` high-contrast bold text.

### Chips & Badges
- **Category Badges (e.g., 송배전, 전력시장, 신재생):** Pill-shaped, subtle 10% tint fills with high-saturation text (e.g., `#E0F2FE` fill with `#0369A1` text).
- **Difficulty Tag:** Compact pill badge (`label-sm`), 1px neutral border with clean bullet indicator.

### Term Cards (Core Learning Component)
- Built on `#FFFFFF` surfaces with `1rem` padding. Contains three distinct zones:
  1. Top: Category tag + English acronym indicator + bookmark toggle.
  2. Center: Bold Korean term header (`headline-md`) followed by a one-sentence plain language summary (`body-md`).
  3. Bottom: Expandable "News Context Sentence" inside a `#F8FAFC` recessed callout box with key target terms highlighted in amber tint (`#FEF3C7`).

### Quiz & Interaction Cards
- Multiple-choice choices are framed as full-width interactive blocks with `1px` border in `#E2E8F0`.
- **Selected State:** Border switches to 2px `#0284C7`, background tint `#F0F9FF`.
- **Correct State:** Border switches to 2px `#10B981`, background tint `#ECFDF5`.
- **Incorrect State:** Border switches to 2px `#EF4444`, background tint `#FEF2F2`.

### Input Fields & Search
- Sticky top search bar with `44px` height, 1px border in `#CBD5E1`, leading magnifying glass icon, trailing "clear" pill, and inset search placeholder: "전력 용어 검색 (예: SMP, 계통섬, 양수발전)..."
- Focus state brings a 2px `#0284C7` outline ring with zero blur spread.