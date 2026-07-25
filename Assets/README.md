# Forbidden Oasis Staking — Asset Pack v1

This package is built from:
- the provided Forbidden Oasis website source/theme;
- the generated mobile-first staking UI concepts;
- the generated desktop staking UI concept.

## Folders

01-concept-screens/
Full-resolution design concepts.

02-branding/
Forbidden Oasis logo lockup and scarab emblem crops, including approximate transparent PNG variants.

03-backgrounds/
Hero art, pharaoh/oasis crops, temple art and reusable helper textures.

04-icons/
Pool, vault, WATER, BNB and navigation icon crops. Transparent variants are approximate extractions.

05-ui-elements/
Reference crops for cards, wallet control, pool cards and feature strip.

06-theme/
Colour scheme, CSS variables, typography reference and asset manifest.

07-reference-source/
The user-supplied website source used to match the existing visual language.

## Important

The generated UI concepts are flattened images. Therefore the individual art/icon extractions are raster crops, not original layered source assets.
Transparent variants use automated near-black removal and should be treated as implementation references or cleaned further before production use.

The website source is largely CSS/inline rendering; it does not expose a conventional library of standalone image assets. This pack therefore captures the look and the generated staking art in practical PNG form rather than pretending hidden source layers exist.


## Typography implementation

A complete implementation font system has been added under:

`06-theme/fonts/`

Included:
- `FONT-SYSTEM.md`
- `FONT-USAGE-QUICK-REFERENCE.txt`
- `fonts.css`
- `ReactTypographyExample.jsx`
- `font-preview.html`

The package does not redistribute font binary files. It includes exact Google Fonts imports and production-oriented CSS instead.
