# GulfHelper Brand Guidelines

## Brand Identity

**Name:** GulfHelper  
**Tagline:** Smart Tools for Saudi & GCC  
**Mission:** Providing professional financial and business tools for Saudi Arabia and GCC countries

---

## Logo

### Primary Logo
The primary logo consists of a gradient icon (letter "G" in a rounded square) combined with the wordmark "GulfHelper" in Inter Bold.

**Files:**
- `public/logo.svg` - Full logo (SVG)
- `public/logo-icon.svg` - Icon only (SVG)

**Usage:**
- Use on light backgrounds (white, soft gray)
- Minimum width: 120px
- Maintain clear space equal to icon height around logo

### Logo Variations

#### Light Background
- Text color: `#1C1C1E` (Dark Text)
- Icon: Blue to Gold gradient
- Use on: White, light gray backgrounds

#### Dark Background (Alternative)
- Text color: `#FFFFFF` (White)
- Icon: Blue to Gold gradient
- Use on: Dark backgrounds (if needed)

### Logo Clear Space
Maintain minimum clear space equal to the height of the "G" icon around all sides of the logo.

### Minimum Sizes
- Primary logo: 120px width minimum
- Icon only: 24px minimum

---

## Color Palette

### Primary Colors

#### Gulf Blue `#0057B8`
- **Usage:** Primary brand color, buttons, links, main accents
- **Text:** Use with white text (WCAG AAA compliant)
- **RGB:** rgb(0, 87, 184)

#### Gulf Gold `#C9A94A`
- **Usage:** Accent color, highlights, borders, secondary actions
- **Text:** Use with dark text (WCAG AA compliant)
- **RGB:** rgb(201, 169, 74)

### Secondary Colors

#### Soft Gray `#F4F5F7`
- **Usage:** Backgrounds, cards, subtle dividers
- **RGB:** rgb(244, 245, 247)

#### Dark Text `#1C1C1E`
- **Usage:** Primary text color, headings, body text
- **RGB:** rgb(28, 28, 30)

#### Muted Text `#6B7280`
- **Usage:** Secondary text, descriptions, captions
- **RGB:** rgb(107, 114, 128)

#### White `#FFFFFF`
- **Usage:** Primary background color
- **RGB:** rgb(255, 255, 255)

### Gradients

**Primary Gradient (Blue to Gold)**
- Start: `#0057B8` (0%)
- End: `#C9A94A` (100%)
- Usage: Logo, hero sections, premium features

---

## Typography

### Headings
**Font:** Inter Bold (700)  
**Usage:** All headings (H1-H6), important labels

**Sizes:**
- H1: 3rem (48px) / 3.5rem (56px) desktop
- H2: 2.25rem (36px) / 2.5rem (40px) desktop
- H3: 1.875rem (30px)
- H4: 1.5rem (24px)
- H5: 1.25rem (20px)
- H6: 1.125rem (18px)

**Properties:**
- Line height: 1.2
- Letter spacing: -0.02em

### Body Text
**Font:** DM Sans Regular (400)  
**Usage:** Body text, paragraphs, descriptions

**Sizes:**
- Base: 1rem (16px)
- Large: 1.125rem (18px)
- Small: 0.875rem (14px)
- XSmall: 0.75rem (12px)

**Properties:**
- Line height: 1.75
- Letter spacing: 0

### Arabic Support
**Font:** Cairo, Noto Sans Arabic, or system fallback  
**Direction:** RTL  
**Note:** Ensure fonts support Arabic characters for bilingual content

---

## Buttons

### Primary Button
- **Background:** `#0057B8` (Gulf Blue)
- **Text:** `#FFFFFF` (White)
- **Border Radius:** 0.75rem (12px)
- **Padding:** 0.6875rem 1.5rem (11px 24px)
- **Font Size:** 0.875rem (14px)
- **Font Weight:** 500 (Medium)

**Hover State:**
- Background: `#004A9A`
- Transform: translateY(-1px)
- Box Shadow: 0 4px 12px rgba(0, 87, 184, 0.3)

**Active State:**
- Background: `#003D7C`

### Secondary Button
- **Background:** Transparent
- **Text:** `#1C1C1E` (Dark Text)
- **Border:** 1px solid `#C9A94A` (Gulf Gold)
- **Border Radius:** 0.75rem (12px)
- **Padding:** 0.6875rem 1.5rem (11px 24px)

**Hover State:**
- Background: `#C9A94A`
- Text: `#1C1C1E`
- Border: `#C9A94A`

### Ghost Button
- **Background:** Transparent
- **Text:** `#1C1C1E`
- **Border:** None

**Hover State:**
- Background: `#F4F5F7` (Soft Gray)

---

## Cards

### Standard Card
- **Background:** `#FFFFFF` (White)
- **Border Radius:** 1rem (16px)
- **Border:** 1px solid `#E5E7EB`
- **Padding:** 1.5rem (24px)
- **Box Shadow:** 0 1px 3px rgba(0, 0, 0, 0.1)

### Card Hover State
- **Box Shadow:** 0 4px 12px rgba(0, 0, 0, 0.15)
- **Transform:** translateY(-2px)
- **Border Color:** `#C9A94A` (Gulf Gold)
- **Transition:** all 0.3s ease

---

## Icons

### Style
- **Type:** Minimal line icons
- **Library:** Lucide React
- **Stroke Width:** 2

### Sizes
- Small: 16px
- Medium: 20px
- Large: 24px
- XLarge: 32px

### Colors
- Default: `#1C1C1E` (Dark Text)
- Primary: `#0057B8` (Gulf Blue)
- Accent: `#C9A94A` (Gulf Gold)
- Muted: `#6B7280` (Muted Text)

---

## Spacing

Use a 4px base unit system. All spacing should be multiples of 4:

- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

---

## Shadows

- **Small:** 0 1px 2px rgba(0, 0, 0, 0.05)
- **Medium:** 0 4px 6px rgba(0, 0, 0, 0.1)
- **Large:** 0 10px 15px rgba(0, 0, 0, 0.1)
- **XLarge:** 0 20px 25px rgba(0, 0, 0, 0.1)

---

## Design Principles

### Do's ✅
- Use primary blue for main actions and brand elements
- Maintain clear space around logo
- Use gold accent sparingly for highlights
- Follow typography hierarchy
- Ensure sufficient contrast for accessibility
- Use rounded corners consistently (xl for cards, lg for buttons)

### Don'ts ❌
- Don't stretch or distort the logo
- Don't use colors outside the palette
- Don't use gold as primary background
- Don't use fonts other than Inter/DM Sans
- Don't reduce logo below minimum size
- Don't place logo on busy backgrounds without clear space

---

## Design Inspiration

**Style:** Clean Gulf/KSA governmental dashboard

**Characteristics:**
- Professional and trustworthy
- Approachable and user-friendly
- Modern and clean
- Culturally appropriate for GCC market
- Accessible and inclusive

**References:**
- Saudi government portals
- GCC financial institutions
- Modern fintech applications
- Professional business tools

---

## Implementation Notes

### Web Usage
- Use SVG logos for scalability
- Implement CSS variables for colors
- Use TailwindCSS classes matching brand tokens
- Ensure responsive logo sizing

### Print Usage
- Use high-resolution PNG versions (300 DPI minimum)
- Maintain color accuracy
- Ensure sufficient contrast

### Digital Assets
- Favicon: 32x32px SVG (supports all sizes)
- App Icons: 48x48px minimum
- Social Media: 1200x630px for Open Graph images

---

## Accessibility

- All color combinations meet WCAG AA standards (minimum)
- Primary blue with white text meets WCAG AAA
- Maintain 4.5:1 contrast ratio for text
- Ensure interactive elements are keyboard accessible
- Use semantic HTML and ARIA labels where needed

---

## File Structure

```
public/
  ├── logo.svg          # Primary logo (icon + text)
  ├── logo-icon.svg     # Icon only
  └── favicon.svg       # Browser favicon

brand-kit.json          # Complete brand specifications
BRAND_GUIDELINES.md     # This document
```

---

**Version:** 1.0  
**Last Updated:** 2024  
**Maintained by:** GulfHelper Design Team

