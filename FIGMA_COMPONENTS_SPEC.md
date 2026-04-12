# Schultz' Studios

Detailed Figma component spec for rebuilding the website quickly and consistently.

Use this together with:

- `/Users/carlostorres/Documents/Schutlz Studios/FIGMA_HANDOFF.md`
- `/Users/carlostorres/Documents/Schutlz Studios/src/styles/main.css`
- `/Users/carlostorres/Documents/Schutlz Studios/src/lib/pages.js`

## 1. Variables To Create In Figma

### Color Variables

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

### Radius Variables

- `radius/panel` `30`
- `radius/mobile-panel` `24`
- `radius/pill` `999`

### Spacing Variables

- `space/4`
- `space/8`
- `space/10`
- `space/12`
- `space/14`
- `space/16`
- `space/18`
- `space/24`
- `space/32`
- `space/48`
- `space/64`

## 2. Text Styles

### `Meta / Eyebrow`

- Font: Schibsted Grotesk
- Weight: 600
- Size: 11
- Line height: 14
- Letter spacing: 20%
- Uppercase
- Color: `text/faint`

### `Body / Small`

- Font: Schibsted Grotesk
- Weight: 400
- Size: 13
- Line height: 22
- Color: `text/soft`

### `Body / Standard`

- Font: Schibsted Grotesk
- Weight: 400
- Size: 14
- Line height: 25
- Color: `text/soft`

### `Body / Meta`

- Font: Schibsted Grotesk
- Weight: 500
- Size: 11
- Line height: 14
- Letter spacing: 18%
- Uppercase
- Color: `text/faint`

### `Heading / Hero`

- Font: Schibsted Grotesk
- Weight: 600
- Size: 56
- Line height: 54
- Letter spacing: -6%
- Color: `text/primary`

### `Heading / Page`

- Font: Schibsted Grotesk
- Weight: 600
- Size: 44
- Line height: 43
- Letter spacing: -6%
- Color: `text/primary`

### `Heading / Section`

- Font: Schibsted Grotesk
- Weight: 500
- Size: 32
- Line height: 31
- Letter spacing: -4%
- Color: `text/primary`

### `Heading / Row`

- Font: Schibsted Grotesk
- Weight: 500
- Size: 24
- Line height: 24
- Letter spacing: -4%
- Color: `text/primary`

### `Serif / Accent`

- Font: Newsreader
- Weight: 500 Italic
- Use only for one emphasized word fragment at a time

## 3. Effects

### `Effect / Panel Shadow`

- X: 0
- Y: 28
- Blur: 70
- Spread: 0
- Color: `rgba(0,0,0,0.22)`

### `Effect / Background Blur`

- Layer blur: 18

## 4. Core Components

## `Header / Desktop`

Frame:

- Width: 1280
- Height: 56
- Auto Layout: Horizontal
- Align: Center
- Distribution: Space between
- Padding: 12 top/bottom, 16 left/right
- Radius: 999
- Fill: `rgba(8,10,14,0.62)`
- Stroke: `line/soft`
- Effect: `Panel Shadow`

Left group:

- Auto Layout horizontal
- Gap: 12

Brand dot:

- 12 x 12
- Circular
- Radial white glow fill

Brand text group:

- Auto Layout vertical
- Gap: 2
- Text styles:
  - brand name: custom 15/15 semibold
  - location: `Body / Meta`

Right nav:

- Auto Layout horizontal
- Gap: 4

Nav link:

- Padding: 8 vertical, 12 horizontal
- Radius: 999
- Default text: 14
- Active state:
  - subtle dark fill
  - thin underline line

## `Button / Primary`

- Height: 44
- Auto Layout horizontal
- Padding: 16 horizontal
- Radius: 999
- Fill: light gray gradient
- Text:
  - 14
  - semibold
  - near-black

## `Button / Secondary`

- Height: 44
- Padding: 16 horizontal
- Radius: 999
- Fill: `rgba(255,255,255,0.04)`
- Stroke: `line/strong`
- Text: white

## `Page Intro / Open`

Use for:

- Home hero
- About intro
- Lab intro
- Blog intro
- Contact intro

Frame:

- Width: 1280
- Auto Layout vertical
- Padding: 22 all sides
- No fill panel
- No heavy border

Inner grid:

- Two columns
- Left: 8 columns
- Right: 4 columns

Left column:

- Eyebrow
- Large heading
- Lead text

Right column:

- Narrow note block
- Left border only
- Gap: 10 to 12
- Width: 240 to 260

## `Hero Index Link`

- Auto Layout vertical
- Gap: 6
- Padding: 6 top, 0 sides, 0 bottom
- No card
- Label:
  - `Body / Meta`
- Title:
  - `Heading / Row`

## `Section Heading / Split`

- Auto Layout horizontal
- Align bottom
- Justify space between
- Margin bottom: 16

Left side:

- Eyebrow
- Section title
- Optional body copy

Right side:

- Small inline text link

## `Door Row`

Use on Home.

Frame:

- Width: 1280
- Height: Hug
- Auto Layout horizontal
- Gap: 16
- Padding: 16 top/bottom, 0 sides
- Top divider only inside list system

Columns:

- Label column: 140
- Body column: fill
- Action column: hug

Body:

- Auto Layout vertical
- Gap: 8
- Title: `Heading / Row`
- Copy: `Body / Small`

## `Signal Line`

- Height: Hug
- Padding: 16 top/bottom
- Border top: `line/soft`
- Text style:
  - 16 to 18 depending on breakpoint
  - medium weight

## `Compact Row / Lab Teaser`

- Columns:
  - index 90
  - title 0.9fr
  - summary 1.1fr
  - state auto
- Row padding: 16 top/bottom
- Divider bottom

## `Archive Row / Blog`

- Columns:
  - date 110
  - type 100
  - title 0.95fr
  - excerpt 1.05fr
  - reading time 70
- Row padding: 16 top/bottom
- No card
- Divider bottom only

## `Practice Row`

- Columns:
  - label 190
  - text fill
- Padding: 16 top/bottom
- Divider bottom

## `Lab Preview Panel`

Frame:

- Width: 100%
- Auto Layout vertical
- Gap: 14
- Padding: 16
- Radius: 30
- Fill:
  - top highlight gradient
  - `surface/glass`
- Stroke: `line/soft`
- Blur: 18
- Shadow: `Panel Shadow`

Children order:

1. Kicker
2. Index
3. Title
4. Meta pills row
5. Short text
6. Detail text
7. Footprint text
8. Tag pills row

Meta/tag pill:

- Height: Hug
- Padding: 7 vertical, 10 horizontal
- Radius: 999
- Fill: `rgba(255,255,255,0.03)`
- Stroke: `line/soft`
- Text: 12 muted

## `Lab Row`

Frame:

- Auto Layout horizontal
- Gap: 18
- Padding: 18 top/bottom
- Divider bottom
- No fill

Columns:

- Index: 72
- Copy: fill
- State: hug

Copy block:

- Auto Layout vertical
- Gap: 6

Active state:

- translate right by 6 visually
- title turns brighter

## `Feature Writing Block`

Frame:

- Auto Layout vertical
- Gap: 10
- Padding: 16 to 20
- Radius: 30
- Fill: panel glass style
- Stroke: line soft

Children:

1. Kicker
2. Meta line
3. Title
4. Excerpt

## `Contact / Note Panel`

- Same panel style as feature writing block
- Padding: 16 to 20
- Vertical list of details

Contact detail row:

- Auto Layout vertical
- Gap: 8
- Top divider

## `Contact / Form`

- Auto Layout vertical
- Gap: 14
- Padding: 16 to 20
- Radius: 30
- Fill: `rgba(12,14,19,0.68)`
- Stroke: `line/soft`
- Blur: 18

Form label:

- Auto Layout vertical
- Gap: 10

Input:

- No outer card
- Transparent fill
- Bottom border only
- Border: `line/strong`
- Padding: 15 top/bottom

## `Article / Reading Template`

Overall layout:

- Left meta rail: 160
- Right body column: max width 640
- Gap: 32

Article body:

- Vertical stack
- Quote first
- Then sections
- Then next article

Quote:

- Serif italic
- Size: 28 to 32
- Left border only
- Left padding: 22

Section block:

- Vertical stack
- Gap: 16

Section heading:

- 20 semibold

Paragraph:

- 15/28 approx
- Color `text/soft`

## 5. Home Frame Recipe

Desktop Home:

1. `Header / Desktop`
2. `Page Intro / Open`
3. `Hero Index Link` x3 in horizontal row
4. `Section Heading / Split`
5. `Door Row` x3
6. `Signal Line` x3
7. `Section Heading / Split`
8. `Compact Row` x3
9. `Section Heading / Split`
10. `Archive Row` x3
11. `Closing Note`
12. Footer text lines

## 6. Mobile Adaptation Rules

Header:

- Keep pill shape
- Use menu icon version

Hero:

- Single column
- Heading size around 36
- Side note moves below headline
- Hero index becomes stacked

Rows:

- All archive rows become single-column stacks
- Preserve divider rhythm
- Keep label/meta at top

Panels:

- Radius: 24
- Padding: 18

## 7. Important Design Constraint

The first screen must stay visually open.

That means:

- no big opaque hero card
- no massive filled rectangle behind the main headline
- the particle field must be visible immediately
- the intro text should feel placed on top of the field, not boxed away from it

## 8. Rebuild Priority

If time is limited, build in this order:

1. Tokens
2. Header
3. Hero intro pattern
4. Door row
5. Archive row
6. Lab preview panel
7. Contact form
8. Article template

