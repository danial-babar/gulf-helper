# GulfHelper Brand Assets

## Quick Reference

### Logo Files
- **`/public/logo.svg`** - Primary logo (icon + text) - Use for headers, navigation
- **`/public/logo-icon.svg`** - Icon only - Use for favicons, app icons, compact spaces
- **`/public/favicon.svg`** - Browser favicon - 32x32px optimized

### Brand Specifications
- **`/public/brand-kit.json`** - Complete brand specifications in JSON format
- **`/BRAND_GUIDELINES.md`** - Comprehensive brand guidelines document

## Usage in Code

### Using the Logo Component
```tsx
import { BrandLogo } from "@/components/BrandLogo"

// Full logo
<BrandLogo variant="full" size="md" />

// Icon only
<BrandLogo variant="icon" size="lg" />
```

### Direct Image Usage
```tsx
import Image from "next/image"

<Image
  src="/logo.svg"
  alt="GulfHelper"
  width={160}
  height={38}
  className="h-8 w-auto"
/>
```

## Color Quick Reference

```css
/* Primary Colors */
--primary: #0057B8;      /* Gulf Blue */
--accent: #C9A94A;       /* Gulf Gold */
--secondary: #F4F5F7;    /* Soft Gray */
--text: #1C1C1E;         /* Dark Text */
--muted: #6B7280;        /* Muted Text */
--background: #FFFFFF;    /* White */
```

## Typography

- **Headings:** Inter Bold (700)
- **Body:** DM Sans Regular (400)
- **Arabic:** Cairo or Noto Sans Arabic

## Implementation Status

✅ Logo SVG files created  
✅ Brand guidelines documented  
✅ Brand kit JSON created  
✅ Components updated to use new logos  
✅ Favicon configured  

## Next Steps

1. Generate PNG versions of logos for print use (300 DPI)
2. Create social media image templates (1200x630px)
3. Create app icon sets (iOS/Android)
4. Generate high-resolution versions for marketing materials

---

For complete details, see `BRAND_GUIDELINES.md`

