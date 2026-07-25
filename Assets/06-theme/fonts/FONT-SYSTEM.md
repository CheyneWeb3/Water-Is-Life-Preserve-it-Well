# Forbidden Oasis — Font System

This is the implementation typography system for the staking app.

## Core font stack

### 1. Cinzel
Use for:
- Forbidden Oasis brand
- Hero headlines
- Section headings
- Pool names
- Buttons
- Navigation labels
- Large display metrics when space allows

Recommended weights:
- 500 — secondary labels
- 600 — navigation / small headings
- 700 — buttons / section headings
- 800 — strong display headings
- 900 — major hero headlines

Google Fonts:
https://fonts.google.com/specimen/Cinzel

### 2. Cormorant Garamond
Use for:
- Supporting copy
- Lore / editorial copy
- Hero subheadings
- Descriptions
- Elegant italic microcopy

Recommended weights:
- 400 — body/editorial
- 500 — stronger body
- 600 — emphasized copy
- italic 400/500 — atmospheric copy

Google Fonts:
https://fonts.google.com/specimen/Cormorant+Garamond

### 3. Spectral
Use for:
- Wallet addresses
- Contract addresses
- Utility labels
- Transaction/history rows
- Dense data
- Tables
- Technical copy
- Secondary metrics

Recommended weights:
- 300 — light supporting data
- 400 — standard utility text
- 600 — emphasized values

Google Fonts:
https://fonts.google.com/specimen/Spectral

---

# Optional UI upgrade font

For a future denser product UI, a modern sans-serif may be added for highly compact mobile controls.

Recommended optional families:
- General Sans
- Satoshi

Do NOT replace Cinzel as the brand/display face.

Suggested split if added later:

- Cinzel = brand / hero / headings
- Cormorant Garamond = editorial / descriptive
- General Sans or Satoshi = compact application controls
- Spectral = technical / wallet / data

The current asset pack remains fully implementable with the original three-font system only.

---

# Exact Google Fonts import

Use this in the HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Spectral:wght@300;400;600&display=swap"
  rel="stylesheet"
/>
```

Or import from CSS:

```css
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Spectral:wght@300;400;600&display=swap");
```

---

# CSS font variables

```css
:root {
  --font-display: "Cinzel", "Times New Roman", serif;
  --font-editorial: "Cormorant Garamond", Georgia, serif;
  --font-data: "Spectral", Georgia, serif;
}
```

---

# Recommended mobile-first type scale

## Mobile

Hero title:
- Cinzel 800
- 30–36px
- line-height 0.98–1.05
- letter-spacing 0.01em

Hero subtitle:
- Cormorant Garamond 500
- 18–22px
- line-height 1.3

Section title:
- Cinzel 700
- 18–22px
- line-height 1.15
- letter-spacing 0.06em

Card title:
- Cinzel 600–700
- 15–18px
- letter-spacing 0.04em

Button:
- Cinzel 700
- 13–15px
- letter-spacing 0.08em–0.14em

Primary balance:
- Cinzel 700–800
- 28–38px
- font-variant-numeric: tabular-nums

Metric:
- Spectral 600
- 18–24px
- tabular-nums

Data label:
- Spectral 400–600
- 11–13px
- letter-spacing 0.03em–0.08em

Body:
- Cormorant Garamond 400–500
- 17–20px
- line-height 1.45–1.65

Wallet / contract:
- Spectral 400
- 12–14px
- letter-spacing 0.02em

## Desktop

Hero title:
- Cinzel 800–900
- clamp(46px, 4.2vw, 76px)

Hero subtitle:
- Cormorant Garamond 500
- 22–28px

Section title:
- Cinzel 700
- 22–30px

Card title:
- Cinzel 600–700
- 17–22px

Primary balance:
- Cinzel 700–800
- 34–52px

Metric:
- Spectral 600
- 20–30px

Body:
- Cormorant Garamond 400–500
- 18–22px

---

# Capitalization rules

Use uppercase sparingly.

Good:
- STAKE WATER
- MY VAULT
- FLEXIBLE POOL
- LOCKED POOL
- CLAIM WATER

Avoid long uppercase paragraphs.

Long explanatory text should use normal title/sentence case with Cormorant Garamond.

---

# Letter spacing

Cinzel benefits from wider tracking on small labels.

Recommended:
- hero: 0.01em–0.03em
- section headings: 0.06em–0.12em
- navigation: 0.08em–0.14em
- micro labels: 0.12em–0.20em

Do not heavily track numbers or wallet addresses.

---

# Number formatting

Use:

```css
font-variant-numeric: tabular-nums;
```

for:
- balances
- rewards
- countdowns
- APY/APR
- prices
- pool totals

This prevents the UI from visually jumping as values update.

---

# Recommended hierarchy example

```text
Cinzel 800
STAKE WATER

Cormorant Garamond 500 italic
Earn WATER and BNB while your personal vault preserves your dividends.

Cinzel 700
MY VAULT

Spectral 600
25,680.42 WATER

Spectral 400
Pending WATER

Cinzel 700
CLAIM WATER
```

---

# Accessibility

- Do not use gold text below roughly 12px.
- Do not use Cinzel for long paragraphs.
- Maintain strong contrast against the obsidian canvas.
- Avoid overly thin Cormorant Garamond weights on mobile.
- Use Spectral instead of Cinzel for long numeric tables.
- Buttons should remain at least 44px high on touch devices.
