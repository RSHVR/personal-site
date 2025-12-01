# Ruh Showcase Page Implementation Plan

## Overview
Create a full-screen, story-driven showcase page for ruh (AI product safety analyzer) with major glassmorphism effects, auto-triggered waitlist popup, and warm brand aesthetics.

## User Requirements Summary
- **Custom full-screen layout** - No standard site header/footer (like how-do-you-say page)
- **Major glassmorphism** - Prominent frosted glass as key design element
- **Auto-popup Tally form** - Triggers after scroll 60% OR 15 seconds
- **Fresh, engaging copy** - Non-pretentious, empowering tone based on DEVPOST content
- **Minimalistic & slick** - Clean, modern, fun design

## Brand Guidelines Reference
**Colors:**
- Primary: Soft Sand (#E8DCC8), Sage Green (#A8B89F), Warm Taupe (#C9B5A0)
- Backgrounds: Cream (#FFFBF5), Pale Linen (#F5F0E8)
- Text: Deep Charcoal (#3A3633), Medium Gray (#6B6560)
- Semantic: Safe Green (#9BB88F), Caution Amber (#D4A574), Alert Rust (#C18A72)

**Typography:**
- Logo: Cormorant Infant Semi Bold Italic (600)
- Body/Headings: Inter (400, 500, 600)
- Logo treatment: "ruh" lowercase italic with +75-100 letter spacing

**Design Principles:**
- Soft over sharp (8-12px border radius)
- Space over clutter (generous white space)
- Warmth over clinical
- Clarity over complexity

---

## Page Structure (8 Sections)

### 1. Minimal Sticky Header
- Floating "ruh" logo (Cormorant Infant) with subtle glassmorphism on scroll
- Positioned top-left, becomes glass card (backdrop-filter: blur(15px)) after scroll
- No navigation (full-screen experience)

### 2. Hero Section (Full Viewport)
**Content:**
- Large hero text: "your soul deserves safer choices"
- Subheading: "AI-powered product analysis for every Amazon purchase"
- Two CTAs:
  - Primary: "Add to Chrome" (Soft Sand background, Deep Charcoal text)
  - Secondary: "Join Waitlist" (outlined Sage Green)
- Background: Gradient from Cream to Pale Linen with floating abstract shapes

**Glassmorphism:**
- Major glass card containing all content (backdrop-filter: blur(50px))
- Semi-transparent background (rgba(255, 251, 245, 0.7))
- Soft shadow with Sage Green glow

### 3. Problem Statement
**Content:**
- Heading: "because ingredients shouldn't be mysteries"
- 3 glass cards with icons:
  1. "87% of people have PFAS in their blood"
  2. "15+ minutes researching product safety"
  3. "No real-time safety tools exist"

**Glassmorphism:**
- Each card: backdrop-filter: blur(25px), rgba(245, 240, 232, 0.6)
- Hover: increase blur to 35px, lift with shadow

### 4. Interactive Screenshot Demo
**Content:**
- Heading: "from curiosity to clarity in three seconds"
- Auto-advancing carousel (5s intervals) showing 4 product screenshots:
  1. ruh-1-score.png (harm score view)
  2. ruh-2-ingredients.png (ingredient analysis)
  3. ruh-3-allergens.png (allergen detection)
  4. ruh-4-other-concerns.png (safety concerns)
- Captions explaining each view

**Glassmorphism:**
- Heaviest glass effect - main demo panel with backdrop-filter: blur(60px)
- Image floats within glass container
- Navigation dots with glass effect

### 5. Feature Grid
**Content:**
- 6 feature cards in 2x3 grid (mobile: 1 column):
  1. Real-Time Analysis
  2. Allergen Detection (8 major allergens)
  3. PFAS Screening
  4. 0-100 Harm Score
  5. Smart Caching (30-day)
  6. Detailed Breakdowns

**Glassmorphism:**
- Each card: backdrop-filter: blur(20px)
- Staggered entrance animations (Intersection Observer)
- Icon + title + description per card

### 6. Trust/Story Section
**Content:**
- Personal story: "built by someone who cares, not a corporation"
- Brief developer note about family inspiration
- Tech stack badges with subtle glass effect

**Design:**
- Single-column centered layout
- Warm, intimate tone
- Less glass here - focus on authenticity

### 7. Final CTA
**Content:**
- Heading: "protect what matters most"
- Two CTAs (same as hero)
- Stats: "Join 500+ people on the waitlist"

**Glassmorphism:**
- Maximum glass blur effect (backdrop-filter: blur(60px))
- Full-width glass panel with Sage Green border glow
- Pulsing glow animation on primary CTA

### 8. Minimal Footer
- Copyright, GitHub link, Privacy
- No glass effect - clean and simple

---

## Technical Implementation

### File Structure

**Create:**
1. `/src/routes/ruh/+page.svelte` (main showcase page, ~600-700 lines)
2. `/src/lib/components/WaitlistModal.svelte` (Tally popup modal, ~150 lines)

**Modify:**
3. `/src/routes/+layout.svelte` (add ruh route detection for clean layout)

**Move Assets:**
4. Copy 4 images from `/Users/arshveergahir/Downloads/ruh-images/` to `/static/project-images/ruh/`

---

## Layout Override Implementation

In `/src/routes/+layout.svelte`, add ruh detection:

```svelte
// Line 18-19: Add ruh detection
let isTranslatePage = $derived($page.url.pathname === '/how-do-you-say');
let isRuhPage = $derived($page.url.pathname === '/ruh');

// Line 21: Update conditional
{#if isTranslatePage || isRuhPage}
	<!-- Clean layout for translate and ruh pages -->
	<slot />
{:else}
	<!-- Normal layout with header and footer -->
	...
{/if}
```

**Pattern reference:** Lines 17-23 in +layout.svelte

---

## Glassmorphism CSS Strategy

### Three-Tier System

**Tier 1 - Major Moments (40-60px blur):**
```css
.glass-major {
  background: rgba(255, 251, 245, 0.7);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: 1px solid rgba(168, 184, 159, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```
Used in: Hero, Demo panel, Final CTA

**Tier 2 - Supporting (20-30px blur):**
```css
.glass-medium {
  background: rgba(245, 240, 232, 0.6);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(168, 184, 159, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```
Used in: Feature cards, Problem cards

**Tier 3 - Subtle (10-20px blur):**
```css
.glass-subtle {
  background: rgba(255, 251, 245, 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(168, 184, 159, 0.15);
}
```
Used in: Header on scroll, stat badges

### Mobile Optimization
Reduce blur by 35% on mobile for performance:
```css
@media (max-width: 768px) {
  .glass-major { backdrop-filter: blur(32px); }
  .glass-medium { backdrop-filter: blur(16px); }
  .glass-subtle { backdrop-filter: blur(10px); }
}
```

### Browser Fallback
```css
@supports not (backdrop-filter: blur(1px)) {
  .glass-major,
  .glass-medium,
  .glass-subtle {
    background: rgba(255, 251, 245, 0.95);
  }
}
```

---

## WaitlistModal Component

**Pattern reference:** `/src/lib/components/ContactModal.svelte` (lines 1-421)

### Structure
```svelte
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';

  let { showModal = $bindable(false) } = $props();

  // Tally script injection
  onMount(() => {
    if (!document.querySelector('script[src*="tally.so"]')) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  });

  function closeModal() {
    showModal = false;
  }

  // Escape key handler
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if showModal}
  <div
    class="modal-backdrop"
    onclick={closeModal}
    transition:fade={{ duration: 200 }}
    role="button"
    tabindex="0"
  >
    <div
      class="modal-container"
      onclick={(e) => e.stopPropagation()}
      transition:fly={{ y: 20, duration: 300, easing: quintOut }}
      role="dialog"
      aria-modal="true"
    >
      <!-- Tally iframe embed -->
      <iframe
        data-tally-src="https://tally.so/embed/xXV9Mk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
        loading="lazy"
        width="100%"
        height="500"
        frameborder="0"
        title="ruh waitlist"
        style="border-radius: 12px;"
      ></iframe>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(58, 54, 51, 0.85); /* Deep Charcoal with opacity */
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-container {
    background: #FFFBF5; /* Cream */
    border: 2px solid #A8B89F; /* Sage Green */
    border-radius: 16px;
    width: 100%;
    max-width: 600px;
    padding: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(168, 184, 159, 0.3); /* Sage Green glow */
  }

  @media (max-width: 640px) {
    .modal-container {
      padding: 16px;
      max-width: 95%;
    }
  }
</style>
```

---

## Auto-Popup Trigger Logic

**In `/src/routes/ruh/+page.svelte`:**

```svelte
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import WaitlistModal from '$lib/components/WaitlistModal.svelte';

  let showWaitlistModal = $state(false);
  let hasTriggered = $state(false);

  onMount(() => {
    if (!browser) return;

    // Check if user already saw popup
    const alreadySeen = localStorage.getItem('ruh-waitlist-seen');
    if (alreadySeen) return;

    let scrollTriggered = false;
    let timeTriggered = false;

    // Scroll trigger: 60% of page
    function handleScroll() {
      if (scrollTriggered) return;

      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent >= 60) {
        scrollTriggered = true;
        triggerPopup();
      }
    }

    // Time trigger: 15 seconds
    const timeoutId = setTimeout(() => {
      if (!scrollTriggered && !timeTriggered) {
        timeTriggered = true;
        triggerPopup();
      }
    }, 15000);

    function triggerPopup() {
      if (hasTriggered) return;
      hasTriggered = true;
      showWaitlistModal = true;
      localStorage.setItem('ruh-waitlist-seen', 'true');

      // Cleanup
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  });
</script>

<WaitlistModal bind:showModal={showWaitlistModal} />
```

---

## Responsive Design Breakpoints

Following existing site patterns from +layout.svelte:

```css
/* Mobile (0-480px) */
- Single column layouts
- Reduced padding (16px sides)
- Smaller text (Hero: 32px, H2: 24px)
- Stack CTAs vertically

/* Small (481-768px) */
- Slight padding increase (24px sides)
- Hero text: 40px
- 2-column feature grid

/* Medium (769-1279px) */
- Standard padding (40px sides)
- Hero text: 48px
- 3-column feature grid

/* Large (1280px+) */
- Max content width: 1200px centered
- Full padding (60px sides)
- Hero text: 56px
- 3-column feature grid
```

---

## Animations & Interactions

### Svelte Transitions
```svelte
import { fade, fly, scale } from 'svelte/transition';
import { quintOut, cubicOut } from 'svelte/easing';
```

**Hero entrance:**
- Title: `transition:fly={{ y: 30, duration: 800, easing: quintOut, delay: 100 }}`
- Subtitle: `transition:fly={{ y: 20, duration: 600, delay: 300 }}`
- CTAs: `transition:scale={{ start: 0.95, duration: 400, delay: 500 }}`

**Scroll-triggered sections:**
Use Intersection Observer API:
```javascript
onMount(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.observe-scroll').forEach(el => {
    observer.observe(el);
  });
});
```

**Hover effects:**
```css
.glass-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-4px);
  backdrop-filter: blur(35px);
  box-shadow: 0 12px 40px rgba(168, 184, 159, 0.25);
}
```

**Floating animation:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}
```

**Glow pulse (Final CTA):**
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 184, 159, 0.4); }
  50% { box-shadow: 0 0 40px rgba(168, 184, 159, 0.7); }
}

.glow-button {
  animation: glow-pulse 2s ease-in-out infinite;
}
```

---

## Font Loading

Add to `<svelte:head>` in +page.svelte:

```html
<svelte:head>
  <title>ruh - AI Product Safety Analyzer</title>
  <meta name="description" content="Protect your health with AI-powered product safety analysis. Instantly detect harmful chemicals, allergens, and PFAS in Amazon products." />
  <meta property="og:title" content="ruh - AI Product Safety Analyzer" />
  <meta property="og:description" content="Your soul deserves safer choices. AI-powered analysis for every Amazon purchase." />
  <meta property="og:type" content="website" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,600;1,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>
```

---

## Content Copy (Story-Driven)

### Hero
**Headline:** "your soul deserves safer choices"
**Subheading:** "AI-powered product analysis for every Amazon purchase. Know what's safe before you buy."

### Problem Section
**Heading:** "because ingredients shouldn't be mysteries"

**Card 1:** "87% of us have PFAS in our blood"
*Subtext:* "Forever chemicals are everywhere. It's time to know which products contain them."

**Card 2:** "15+ minutes per product"
*Subtext:* "Researching safety shouldn't take longer than shopping itself."

**Card 3:** "No real-time tools exist"
*Subtext:* "Until now. Safety analysis at the moment you're making decisions."

### Demo Section
**Heading:** "from curiosity to clarity in three seconds"

**Captions:**
1. "Your harm score, instantly. 0-100 scale with clear risk levels."
2. "Every ingredient, analyzed. No more mystery chemicals."
3. "Your allergens, flagged. 8 major allergens detected automatically."
4. "Real concerns, explained. Scientific backing without the jargon."

### Features
1. **Real-Time Analysis**
   "Instant safety assessment while browsing Amazon. No copy-paste needed."

2. **Allergen Detection**
   "Automatically flags 8 major allergens with severity levels."

3. **PFAS Screening**
   "Detects forever chemicals linked to long-term health issues."

4. **0-100 Harm Score**
   "Clear safety rating with color-coded risk levels. No guesswork."

5. **Smart Caching**
   "30-day result storage means lightning-fast repeat views."

6. **Detailed Breakdowns**
   "Scientific citations and toxicity explanations in plain language."

### Trust Section
**Heading:** "built by someone who cares, not a corporation"

**Body:**
"After watching family members struggle with allergic reactions and reading countless labels without understanding the real risks, I built ruh. This isn't a startup trying to scale—it's a tool I wish existed when my family needed it. The name 'ruh' means soul in multiple languages, because your health is what matters most."

### Final CTA
**Heading:** "protect what matters most"
**Subheading:** "Join 500+ people making safer choices every day."

---

## Asset Management

### Images to Copy
From: `/Users/arshveergahir/Downloads/ruh-images/`
To: `/static/project-images/ruh/`

Files:
- ruh-1-score.png (1.5MB)
- ruh-2-ingredients.png (1.6MB)
- ruh-3-allergens.png (1.6MB)
- ruh-4-other-concerns.png (1.7MB)

**Optimization strategy:**
- Images will be lazy-loaded using native `loading="lazy"` attribute
- Consider optimizing to WebP format (optional, can defer to later)
- Current PNG sizes are acceptable for showcase page

### Usage in carousel:
```svelte
<img
  src="/project-images/ruh/ruh-1-score.png"
  alt="ruh harm score interface showing 33/100 score"
  loading="lazy"
  class="carousel-image"
/>
```

---

## Accessibility Considerations

**Keyboard Navigation:**
- All interactive elements have focus states (2px Sage Green outline)
- Modal closes with Escape key
- CTAs accessible via Tab navigation

**Screen Readers:**
- Proper ARIA labels on modal (`role="dialog"`, `aria-modal="true"`)
- Alt text on all images (descriptive, mentions harm scores/features)
- Semantic HTML (h1, h2, section tags)

**Contrast:**
- Deep Charcoal (#3A3633) on Cream (#FFFBF5) = 10:1 ratio ✓
- Medium Gray (#6B6560) on Cream = 5.8:1 ratio ✓
- All text meets WCAG AA standards

**Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Targets

**Initial Load:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s

**Optimizations:**
- Lazy load images below fold
- Defer Tally script until modal opens
- Minimize glassmorphism blur on mobile
- Use CSS transforms (not position) for animations (GPU accelerated)

**Bundle Size:**
- Target: < 100KB JS (SvelteKit already optimized)
- CSS: < 50KB
- Images: Load on demand via lazy loading

---

## Implementation Checklist

### Phase 1: Setup
- [ ] Copy images from Downloads to `/static/project-images/ruh/`
- [ ] Create `/src/routes/ruh/+page.svelte`
- [ ] Modify `/src/routes/+layout.svelte` (add ruh detection)

### Phase 2: Modal Component
- [ ] Create `/src/lib/components/WaitlistModal.svelte`
- [ ] Implement Tally iframe embed
- [ ] Add warm brand styling (Cream bg, Sage Green border)
- [ ] Test keyboard accessibility (Escape key)

### Phase 3: Page Sections (Build Incrementally)
- [ ] Section 1: Minimal sticky header
- [ ] Section 2: Hero with major glassmorphism
- [ ] Section 3: Problem statement (3 glass cards)
- [ ] Section 4: Interactive screenshot carousel
- [ ] Section 5: Feature grid (6 cards)
- [ ] Section 6: Trust/story section
- [ ] Section 7: Final CTA with glow effect
- [ ] Section 8: Minimal footer

### Phase 4: Interactivity
- [ ] Auto-popup trigger logic (scroll 60% OR 15s)
- [ ] localStorage tracking (don't show twice)
- [ ] Scroll animations (Intersection Observer)
- [ ] Carousel auto-advance (5s intervals)
- [ ] Hover effects on glass cards

### Phase 5: Polish
- [ ] Responsive design (4 breakpoints)
- [ ] Font loading (Cormorant Infant + Inter)
- [ ] SEO metadata
- [ ] Accessibility audit
- [ ] Performance testing on mobile

### Phase 6: Testing
- [ ] Test in Chrome, Safari, Firefox
- [ ] Mobile responsiveness (iOS/Android)
- [ ] Glassmorphism fallback for unsupported browsers
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

---

## Key Design Decisions Rationale

**Why custom full-screen layout?**
Creates an immersive, focused experience that tells ruh's story without site navigation distractions. Users can dive deep into the product narrative.

**Why major glassmorphism?**
Aligns with ruh's "soul protection" essence—glass effects create a sense of transparency, purity, and modern sophistication while maintaining warmth through the brand colors.

**Why auto-popup instead of button-only?**
Maximizes conversion for waitlist signups. Users engaged enough to scroll 60% or stay 15s are prime candidates. Respects user intent by not showing again (localStorage).

**Why 8 sections instead of simpler page?**
Story-driven narrative requires multiple touchpoints: Problem → Solution → Features → Trust → Action. Each section builds emotional and logical case for installing ruh.

**Why Inter instead of trying to match existing site font (Nunito)?**
Brand guidelines specify Inter for ruh, and maintaining brand consistency is more important than site consistency since this is a custom full-screen experience.

---

## Post-Launch Enhancements (Optional, Future)

1. **Analytics Integration**
   - Track scroll depth, CTA clicks, popup conversion rate
   - Heatmap to see where users engage most

2. **A/B Testing**
   - Test popup timing (60% vs 70% scroll, 15s vs 20s)
   - Test CTA copy variations

3. **Video Demo**
   - Replace carousel with auto-playing video demo
   - Show ruh in action on real Amazon page

4. **User Testimonials**
   - Add section with early user quotes
   - Social proof for waitlist conversion

5. **Interactive Harm Score Calculator**
   - Let users try analyzing a product URL
   - Demo the AI without installing extension

---

## Critical Files Summary

**Create:**
1. `/src/routes/ruh/+page.svelte` - Main showcase page
2. `/src/lib/components/WaitlistModal.svelte` - Tally popup modal

**Modify:**
3. `/src/routes/+layout.svelte` - Add `isRuhPage` detection on line 19, update conditional on line 21

**Reference (Read-Only):**
4. `/src/lib/components/ContactModal.svelte` - Modal pattern
5. `/src/routes/how-do-you-say/+page.svelte` - Custom layout example

**Assets:**
6. Move 4 images from `/Users/arshveergahir/Downloads/ruh-images/` to `/static/project-images/ruh/`

---

*This plan provides a complete blueprint for implementing a modern, engaging showcase page that honors the ruh brand while creating an immersive user experience. Ready for implementation.*
