# Schultz' Studios

Figma handoff for rebuilding the current website as an editable design file.

## 1. Creative Direction

- Mood: dark, restrained, intimate, premium, spatial
- References in feeling: Steve Jobs keynote restraint, Nothing sharpness, Google Anti-Gravity softness
- Core idea: not a portfolio site, but a digital house
- Brand logic:
  - `Schultz' Studios` = the parent space
  - `Schultz' Lab` = the internal room for products, experiments, and builds
- Emotional goal:
  - calm
  - precise
  - warm without sentimentality
  - experimental without noise

## 2. Figma File Structure

Create one page per section:

1. `00 Cover`
2. `01 Tokens`
3. `02 Components`
4. `03 Home`
5. `04 About Us`
6. `05 Schultz' Lab`
7. `06 Blog`
8. `07 Article Templates`
9. `08 Contact`
10. `09 Mobile`

## 3. Suggested Frames

Desktop:

- Width: `1440`
- Home height starting frame: `2600`
- Inner content max width: `1280`
- Outer page padding: `18` top, `36` horizontal

Tablet:

- Width: `1024`
- Inner content width: `calc(100% - 32px)`

Mobile:

- Width: `390`
- Inner content width: `calc(100% - 24px)`

## 4. Grid System

Desktop grid:

- Columns: `12`
- Gutter: `24`
- Margin: `40`
- Content max width: `1280`

Tablet grid:

- Columns: `8`
- Gutter: `20`
- Margin: `24`

Mobile grid:

- Columns: `4`
- Gutter: `16`
- Margin: `12`

## 5. Color Tokens

Use these as Figma color styles:

- `bg/base` `#07080B`
- `bg/elevated` `#0F1116`
- `surface/glass` `rgba(13,15,20,0.66)`
- `surface/strong` `rgba(15,17,23,0.9)`
- `line/soft` `rgba(255,255,255,0.08)`
- `line/strong` `rgba(255,255,255,0.16)`
- `text/primary` `#F4F6FA`
- `text/soft` `#C1C8D4`
- `text/muted` `#8D95A4`
- `text/faint` `#697180`
- `glow/cool` `rgba(140,154,178,0.22)`
- `hero/highlight` `rgba(246,249,255,0.98)`

Background recipe:

- Base fill: `bg/base`
- Add 2 soft radial glows:
  - top-left cool gray glow
  - upper-right white haze
- Add vignette overlay with very soft falloff

## 6. Typography

Fonts:

- Sans: `Schibsted Grotesk`
- Serif accent: `Newsreader`

Type styles:

- `Display / Hero`
  - Family: Schibsted Grotesk
  - Weight: 600
  - Size: `56`
  - Line height: `54`
  - Letter spacing: `-6%`

- `Display / Page`
  - Family: Schibsted Grotesk
  - Weight: 600
  - Size: `44`
  - Line height: `43`
  - Letter spacing: `-6%`

- `Section / Title`
  - Family: Schibsted Grotesk
  - Weight: 500
  - Size: `32`
  - Line height: `31`
  - Letter spacing: `-4%`

- `Body / Large`
  - Family: Schibsted Grotesk
  - Weight: 400
  - Size: `14`
  - Line height: `25`
  - Color: `text/soft`

- `Body / Standard`
  - Family: Schibsted Grotesk
  - Weight: 400
  - Size: `13`
  - Line height: `22`

- `Meta / Eyebrow`
  - Family: Schibsted Grotesk
  - Weight: 600
  - Size: `11`
  - Line height: `14`
  - Letter spacing: `20%`
  - Uppercase
  - Color: `text/faint`

- `Meta / Small`
  - Family: Schibsted Grotesk
  - Weight: 500
  - Size: `11`
  - Line height: `14`

- `Serif / Accent`
  - Family: Newsreader
  - Weight: 500 Italic
  - Use only for emphasized word fragments and article quotes

Mobile adjustments:

- Hero: `36 / 35`
- Page title: `30 / 30`
- Section title: `24 / 24`
- Body: `15 / 24`

## 7. Spacing Tokens

Create these as spacing variables:

- `4`
- `8`
- `10`
- `12`
- `14`
- `16`
- `18`
- `24`
- `32`
- `48`
- `64`
- `88`

Vertical rhythm:

- Between major sections: `48 to 64`
- Between heading and body: `12 to 16`
- Between list rows: `0`, with divider lines
- Between hero headline and lead: `16`

## 8. Radius + Effects

- Large panel radius: `30`
- Medium pill/button radius: `999`
- Soft blur for glass surfaces: `18`
- Panel shadow: `0 28 70 rgba(0,0,0,0.22)`

Only use the glass panel style where needed. The hero itself should stay visually open so the particle field is visible.

## 9. Particle Field Direction

This is the key background behavior.

Visual rules:

- Only dots, no connecting lines
- Dot color: cool white with soft variation in opacity
- Dot size: very small, between `1` and `2.5`
- Dense enough to feel like a field, not like stars
- Slight ambient drift even when idle

Interaction rules:

- Cursor acts like a small magnet
- Nearby points are pulled toward the cursor
- The effect radius is moderate, not huge
- Response should be smooth and elastic, never twitchy
- Add only a very soft glow around the cursor influence
- No explosive repulsion
- No particle trails
- No playful bounce

Design intent:

- It should feel like an invisible force passing through a calm surface
- More “field tension” than “animation”

## 10. Components

Build these as reusable Figma components:

### Header

- Full-width pill container
- Left: brand dot + wordmark + location meta
- Right: nav links
- Height: `52 to 56`
- Background: translucent charcoal
- Border: `line/soft`

### Hero Copy Block

- Eyebrow
- Large display headline
- Small lead paragraph
- Two pill buttons

### Side Note Block

- Narrow text column
- Left border line only
- Used on Home and page intros

### Hero Index Link

- Small label
- One-line or two-line title
- No card
- Hover state: subtle horizontal movement

### Door Row

- Three-column row:
  - label
  - title + text
  - action word
- Divider-based, not card-based

### Lab Preview Panel

- Small framed panel
- Current focus label
- Project title
- meta pills
- short text
- detail text
- footprint text
- tags

### Lab Row

- index
- title + summary
- state
- Hover/active translates slightly right

### Blog Archive Row

- date
- type
- title
- excerpt
- reading time

### Contact Form

- Open layout
- Inputs with bottom border only
- No heavy cards or thick outlines

## 11. Page-by-Page Layout Logic

### Home

Order:

1. Header
2. Open hero over visible field
3. Short hero index
4. Parent space / internal room intro
5. Door rows
6. Signals strip
7. From the Lab list
8. Blog list
9. Closing contact note
10. Footer

Notes:

- Hero must breathe
- Do not frame the hero with a large opaque card
- The field must be visible immediately

### About Us

Order:

1. Open page intro
2. 3-column narrative text
3. Practice list
4. Shared standards panel

### Schultz' Lab

Order:

1. Open page intro
2. Left sticky preview panel + right archive list
3. Lab rules strip

### Blog

Order:

1. Open page intro
2. Featured writing block
3. Archive list

Important:

- No thumbnails
- No category chips everywhere
- No “read more” buttons
- Typography and spacing should do most of the work

### Article Template

Order:

1. Back link
2. Eyebrow
3. Title
4. Deck
5. Meta rail on the left
6. Quote
7. Text sections
8. Next article block

Reading width:

- Max text width: `640`

### Contact

Order:

1. Open intro
2. Left note with studio details
3. Right form

## 12. What To Avoid In Figma

- Do not convert every section into a rounded card
- Do not add large image placeholders
- Do not use gradients as decoration everywhere
- Do not introduce extra accent colors
- Do not center everything
- Do not increase type scale again
- Do not make the blog look like a SaaS resource hub

## 13. Recommended Build Order In Figma

1. Set up color and type styles
2. Set up spacing variables
3. Build header and button components
4. Build page intro pattern
5. Build row-based archive components
6. Build Home desktop
7. Build About, Lab, Blog, Contact
8. Build one article template
9. Create responsive mobile frames

## 14. Source of Truth In Code

If you need the final live content and structure while rebuilding in Figma, use:

- Content: `/Users/carlostorres/Documents/Schutlz Studios/src/content/site.js`
- Page composition: `/Users/carlostorres/Documents/Schutlz Studios/src/lib/pages.js`
- Visual tokens and spacing: `/Users/carlostorres/Documents/Schutlz Studios/src/styles/main.css`
- Particle behavior: `/Users/carlostorres/Documents/Schutlz Studios/src/lib/field.js`

## 15. Optional Next Step

If wanted, create a second file called `Figma Components Spec` and break every component into:

- Auto layout direction
- padding
- spacing
- text style
- fills
- borders
- hover state

That would make the reconstruction even faster.
