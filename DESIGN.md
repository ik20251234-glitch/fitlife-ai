# Design Brief: FitLife AI

## Tone & Purpose
Health-tech dashboard balancing data clarity with motivational energy. Dark-first design supports evening workout sessions and extended usage.

## Differentiation
Vibrant emerald green primary (health/growth) + teal secondary (tech) + warm orange accent (motivation). Avoids generic health-app beige; instead commits to confidence and vitality through saturated, purposeful color.

## Color Palette (Light Mode)

| Token | OKLCH | Use |
| --- | --- | --- |
| Primary | 0.62 0.23 148 | Emerald green; health, primary actions, progress indicators |
| Secondary | 0.65 0.19 185 | Teal; secondary UI, chart accent, tech forward |
| Accent | 0.70 0.21 60 | Warm orange; motivation, achievement, energy |
| Success | 0.68 0.20 145 | Brighter green; goal attainment, positive states |
| Destructive | 0.55 0.24 22 | Red-orange; warnings, danger states |
| Background | 0.98 0.01 0 | Off-white; breathing room, minimal visual noise |
| Card | 0.96 0.01 0 | Subtle elevation; card backgrounds, sections |
| Muted | 0.92 0.02 0 | Inactive text, secondary info, subtle borders |
| Foreground | 0.15 0.01 0 | Primary text, high contrast |

## Color Palette (Dark Mode)

| Token | OKLCH | Use |
| --- | --- | --- |
| Primary | 0.68 0.27 148 | Luminous emerald; glowing CTAs, focus states in dark |
| Secondary | 0.72 0.22 185 | Bright teal; chart accents, highlights |
| Accent | 0.76 0.24 60 | Vivid orange; energy in dark context |
| Background | 0.12 0.01 0 | Deep charcoal; minimal glare, long sessions |
| Card | 0.16 0.01 0 | Subtle lift; card container, sections |
| Foreground | 0.92 0.01 0 | Near white; maximum readability |

## Typography
- **Display Font**: General Sans — geometric, confident, modern. Headlines, stat labels, emphasis.
- **Body Font**: DM Sans — highly legible, excellent for data-dense sections. Dashboard copy, descriptions, form labels.
- **Mono Font**: Geist Mono — technical, precise. Metrics, code snippets, exact values.
- **Type Scale**: 12px (label) → 14px (body) → 16px (emphasis) → 20px (heading) → 28px (hero/title)

## Elevation & Depth
- **Surface Layers**: Background (L=0.98) > Card (L=0.96) > Muted fill (L=0.92) in light mode; inverted contrast in dark.
- **Shadows**: xs (1px, minimal), sm (subtle 2px offset), md (confident elevation for modals/dropdowns), lg (on-hover emphasis).
- **No neumorphism**; cleaner layering via background value and minimal borders.

## Structural Zones

| Zone | Light Treatment | Dark Treatment |
| --- | --- | --- |
| Header/Nav | bg-card with border-b | bg-card (elevated) with teal accent underline |
| Hero/Progress | bg-muted/5 with emerald accent ring | bg-muted/20 with luminous primary glow |
| Content Sections | alternating bg-background/bg-muted/5 | alternating bg-background/bg-muted/10 |
| Data Visualizations | bg-muted/5 bordered chart container | bg-muted/15 with chart-color accents |
| CTA Buttons | bg-primary text-primary-foreground | bg-primary (luminous) text-primary-foreground |
| Footer | bg-muted/10 with border-t | bg-muted/10 with border-t teal accent |

## Spacing & Rhythm
- **Vertical cadence**: 8px baseline, 16px (sm), 24px (md), 32px (lg), 48px (xl) for section breaks.
- **Card padding**: 20px (compact) / 24px (comfortable). List items 12px inline, 16px vertical.
- **Dashboard grid**: 2–4 column layout on desktop (sm: 1 col, md: 2 col, lg: 4 col). 16px gutter.

## Component Patterns
- **Stat Cards**: bg-card, emerald/teal border-l (4px), data value in primary, label in muted. On-hover: subtle shadow lift.
- **Exercise Cards**: video thumbnail + title + filter tags (veg/non-veg) + green play button overlay. Hover state brightens primary.
- **Meal Plan Cards**: nutritional info grid, caloric badge in accent, check-boxes for dietary pref. Borders use secondary.
- **Progress Chart**: Recharts (LineChart, BarChart) with chart-1 (primary green) for target, chart-2 (teal) for user data. Legend uses muted-foreground.
- **Buttons**: primary (emerald, full-width or contained), secondary (teal), destructive (red-orange). No fills on ghost buttons; use border-primary.

## Motion
- **Transition Default**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` for interactive elements (buttons, cards on-hover).
- **Achievement Pulse**: Subtle scale + opacity on goal-met milestones. No bounce; keep dignified.
- **Chart Load**: Fade-in over 500ms on component mount; data bars/lines animate from baseline.
- **Micro-interactions**: Hover lift (shadow-md), focus ring (primary with 2px offset), active state (opacity-90).

## Constraints
- No gradients on text (gradients only on buttons/progress rings as accent).
- No shadows deeper than `shadow-lg` (prevents visual clutter in data-dense dashboard).
- No animations longer than 600ms (respects user preference for reduced motion).
- Chart colors locked to palette (chart-1 through chart-5); no arbitrary chart libraries' default palettes.
- All text must meet WCAG AA+ contrast; verified in light and dark modes.

## Signature Detail
**Emerald Progress Rings**: Circular progress indicators (BMI, workout streak, goal %) use a radial gradient from primary (emerald) to secondary (teal), creating a glowing, health-forward visual that anchors the dashboard. On dark mode, rings appear luminous and energizing—reinforcing the app's promise of vitality.
