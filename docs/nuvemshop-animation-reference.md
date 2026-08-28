# Nuvemshop animation reference

Captured on 2026-08-25 from https://www.nuvemshop.com.br/.

This is a design and motion reference for the Fartura Perola refactor. It is not a copy target. Use the structure, rhythm, interaction logic, and motion language as inspiration, then translate it to our brand, products, imagery, and content.

## Source structure observed

- Header: pill-style navigation, mega menus, login/primary CTA, scroll-aware state.
- Hero: dark blue stage, brand logo, large editorial title, typed rotating phrase, primary/secondary CTAs, full-bleed hero video.
- Brand proof: floating product/store images and logos that reveal around a central media target.
- Connected channels/features: large image cards in a two-column grid on desktop, horizontal carousel on mobile.
- Storefront/editor: step list plus synchronized preview cards/videos.
- Showcase: long dark section with multiple vertical columns of store screenshots moving at different scroll speeds.
- Lumi/solution blocks: rich dark gradient sections, media-first composition, staggered copy/action reveal.
- Sticky sections: stacked sections with video backgrounds, active copy, scroll-linked radius and scale.
- Resource cards: count-up numbers and floating icon rows.
- Pricing: monthly/annual segmented control, sliding active pill, staggered plan cards, subtle hover focus.
- Pre-footer: title, CTA group, and video reveal in a compact timeline.

## Motion stack and principles

- The page uses a small homepage core script plus lazy section modules. Sections load when they approach the viewport through IntersectionObserver with roughly 200px preloading.
- Motion is driven by the Motion library (`animate`, `timeline`, `scroll`, `spring`) plus CSS transitions/keyframes.
- Reduced motion is first-class: when `prefers-reduced-motion: reduce` is active, animation durations are nearly zero, animated items are immediately visible, and autoplay motion is reduced.
- The main easing token is `cubic-bezier(0.19, 1, 0.22, 1)` for UI transitions. Section modules also use `[0.33, 1, 0.68, 1]`, `[0.16, 1, 0.3, 1]`, and spring curves around stiffness 80-120 / damping 18-20.
- Most reveal animations are simple and premium: opacity 0 to 1, y 20-40px to 0, 0.5-0.8s duration, 80-150ms stagger.
- Interactions avoid noisy motion. They use small scale, opacity, blur/backdrop, radius, and transform changes.

## Component motion patterns to reuse

### Header

- Initial entrance: header becomes visible after a short delay, around 100ms.
- Scroll state: add an `is-scrolled` style after about 50px scroll.
- Desktop behavior: logo can switch from hero logo to header logo as the hero expands.
- Refactor use: make our header sticky, compact, and scroll-aware. Use soft background transition, not heavy drop shadows.

### Hero

- Title words enter staggered: opacity 0 to 1 and y 30px to 0, duration about 0.6s, 80ms stagger.
- Typed phrase rotates through a word list with type speed about 70ms per char, delete speed about 40ms per char, hold about 1400ms, next-word pause about 200ms.
- Desktop first-scroll interaction: the first wheel/touch gesture expands the hero video from a rounded lower panel into full viewport, duration about 0.8s, easing `[0.33, 1, 0.68, 1]`.
- Hero media then docks into the next brand/media target as the user scrolls.
- Refactor use: use this for a jewel/product hero only if the first-screen image/video is strong. A good adaptation is: headline + CTA + macro pearl/jewelry video that expands, then docks into a product proof section.

### Brand proof / floating images

- Floating cards start hidden: opacity 0, translateY 24px, scale 0.5.
- On scroll progress they reveal in a cascade with about 60ms offset per item.
- Center title/media reveal with stronger y offset: title y 80px scale 0.82, center media y 96px scale 0.82.
- Refactor use: use floating product close-ups, customer photos, packaging shots, and trust marks around one central product/collection image.

### Feature cards

- Desktop hover changes the layout: hovered card expands from 50% to about 66%, sibling compresses to about 33%.
- Hover state is class-based, with cards returning to equal columns on mouse leave.
- Mobile becomes a horizontal carousel with centered scroll snap and previous/next controls.
- Refactor use: adapt for categories or value props, for example "Perolas naturais", "Joias autorais", "Presentes", "Sob medida".

### Storefront/editor section

- Section reveal targets title, description, steps, and preview cards with staggered y 30px reveals.
- Active step and active preview card are synchronized by scroll position: closest card to viewport center becomes active.
- Active preview video plays; inactive previews pause.
- Clicking a step scrolls the matching preview card into center.
- Refactor use: translate this into a process section: "Escolha a joia", "Personalize", "Finalize com embalagem", "Receba em casa", each with matching image/video.

### Sticky sections

- Each sticky item becomes active inside a central viewport band.
- Active copy animates in: title, description, CTA staggered by about 150ms.
- Inactive copy fades/slides out faster, around 0.4s.
- Background image/video scales through scroll: about 1.4 to 1 to 1 to 1.4.
- Section corner radius is scroll-linked, flattening top corners and restoring bottom radius as the stack moves.
- Refactor use: reserve for 2-4 high-impact story panels, not every section.

### Showcase / parallax columns

- Dark section height is long: around 280vh on desktop, 150vh on tablet/mobile.
- Multiple columns begin with different y offsets: desktop roughly 150, 100, 180, 80, 210, 140px.
- Columns move vertically at different scroll speeds, default around 0.08 on desktop and 0.3 on mobile.
- Items reveal once with opacity 0 to 1 and y 20px to 0, duration 0.5s, easing `[0.16, 1, 0.3, 1]`, column stagger around 60ms.
- Refactor use: excellent for a product gallery wall. Use mixed card heights and product crops, but keep it lighter and more tactile for Fartura Perola.

### Cards grid and counters

- Cards reveal with y 40px and 100ms stagger.
- Numbers count up over about 2000ms using ease-out cubic.
- Rows of app icons use a slow float keyframe, with reduced-motion disabled.
- Refactor use: counters for "anos", "clientes", "pecas", "avaliacoes" if the numbers are real. Avoid fake metrics.

### Interactive accordion

- Desktop media gallery swaps when accordion item opens.
- Slide transition: opacity and visibility over 0.5s, y 8px to 0.
- Image hover: scale 1.03 over 0.4s.
- Accordion icon rotates 180deg.
- Refactor use: good for FAQ, materials, care instructions, and delivery details with an image changing beside the text.

### Pricing / plan controls

- Segmented control uses an absolute slider pill. Slider transitions `left` and `width` over 0.3s with expo easing.
- Price values animate in with opacity and y 10px over 0.3s, staggered by about 80ms.
- Plan cards reveal y 40px with stagger, then on hover lift y -4px and gain a soft shadow.
- Track hover dims all cards to opacity 0.8 / scale 0.98, while hovered card returns to full.
- Refactor use: use for collections, bundles, or service tiers only if we genuinely have tiered offers.

### Pre-footer

- Uses a mini timeline: title y 40px, CTAs y 30px overlapping by about 0.4s, video y 60px and scale 0.95 to 1 overlapping by about 0.3s.
- Video lazy-loads and plays only when near/in viewport, pauses when hidden.
- Refactor use: final CTA with a product/editorial video or a strong still image.

## Implementation notes for our refactor

- Build a small motion utility instead of scattering one-off animation code:
  - `useReducedMotion()`
  - `useInViewReveal()`
  - `staggerChildren()`
  - `scrollProgressTransform()`
  - `lazyVideoInView()`
- Use section-level modules/components so heavy motion only initializes when the section exists.
- Prefer CSS transitions for hover and simple states; use Framer Motion or Motion One for timelines and scroll-linked transforms.
- Keep tokens centralized:
  - `easeOutExpo = cubic-bezier(0.19, 1, 0.22, 1)`
  - `easeHero = cubic-bezier(0.33, 1, 0.68, 1)`
  - `easeGallery = cubic-bezier(0.16, 1, 0.3, 1)`
  - reveal duration 0.6s
  - hero expand duration 0.8s
  - item stagger 80-150ms
- Respect reduced motion in every animated component.
- Avoid copying the Nuvemshop blue-heavy palette. For Fartura Perola, keep the interaction rhythm but translate the visual language to pearl, jewelry, packaging, editorial photography, and refined contrast.

