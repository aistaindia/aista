# The Association of Science Teachers — Website Version 1.7.0

## V1.7.0 — Notices + Conference Archive functionality
- Added `data/notices.json` as the single source for homepage notices and the full Notice Board.
- Added `data/notices.csv` as an easy-to-edit spreadsheet-style notice source.
- Homepage Notices & Announcements now render from the JSON data and retain the bottom-to-top ticker, Pause/Play and View All controls.
- The full Notice Board is generated from the same notice records, avoiding duplicate HTML content.
- Conference archive now loads from the existing `data/conferences.json` file instead of duplicating the 53 rows in `index.html`.
- Added conference search by number, year or location.
- Added a year filter and Reset control.
- Added result count for the conference archive.
- Existing hero slideshow, layout, membership demo, history, branches, activities, publications and gallery are preserved.

## Managing notices
Edit `data/notices.json` to add or update notices. Use `published: true` for items that should appear on the website. Set `published: false` to keep an item in the data file without displaying it. Use `status: "official"` only after the Association has approved the notice; current starter records are informational placeholders.

Recommended fields:
- `id` — unique identifier
- `date` — ISO date such as `2026-09-27`
- `category` — Notice, Conference, Activities, Membership, etc.
- `title` — notice headline
- `description` — short summary
- `url` — page/document link
- `status` — `official`, `information`, or `archive`
- `published` — `true` or `false`

## Managing conferences
Edit `data/conferences.json` when a verified historical correction or new conference record is required. The website automatically rebuilds the table and filters from this file.

## V1.6.3 — Hero notice alignment refinement
- Moved the **Notices & Announcements** panel to the far-right edge of the desktop hero composition.
- The panel now aligns with the right side of the responsive hero container instead of using a manual horizontal offset.
- Preserved the hero slideshow, bottom-to-top notices ticker, Pause/Play control and **View All Notices & Announcements** link.
- Preserved responsive behavior: on tablet/mobile the notices panel stacks below the hero copy.

## V1.6.2 — Previous layout refinement
- Shifted the hero Notices & Announcements panel slightly farther right for cleaner alignment with the hero composition.
- Increased separation between the hero copy and notice panel on desktop.
- Kept tablet/mobile stacking unchanged.

## V1.6.1 homepage notice placement
- Official Notices & Announcements are integrated **inside the hero**, to the right of the main headline on desktop.
- The notices ticker moves **bottom-to-top** automatically.
- Pause/Play and View All controls are included.
- At tablet/mobile widths, the notice card stacks below the hero copy.
- The old standalone V1.5 top-notices block has been retired.

## GitHub Pages
Keep `index.html` at the repository root and publish the `main` branch (or the configured Pages branch).

## V1.6 update
- Replaced the website logo with the latest official logo supplied for **The Association of Science Teachers**.
- Homepage, hero slideshow, About page and 1st–53rd conference archive from V1.2 are preserved.

## V1.1.2
This update changes the public-facing name to **The Association of Science Teachers**, introduced as **In Continuation of AISTA**.

Included:
- User-supplied official logo
- Updated registered office address
- Active branch states: Bihar, West Bengal, Maharashtra, Delhi, Uttar Pradesh, Uttarakhand, Jharkhand and other regions
- Updated history and AISTA continuity statement
- Broader aims and objects from the supplied memorandum
- Membership fee/rule summary from the supplied rules
- Activities, conferences and gallery
- Temporary email/phone retained until official details are provided

## GitHub Pages
Upload/replace the files in the repository root and keep the `assets` folder intact.

## Version 1.1.2.1 visual fix
- Improved desktop header vertical alignment and spacing.
- Reduced navigation text size/gaps to prevent wrapping.
- Changed Become a Member from an oversized round pill to a compact rectangular rounded CTA.
- Improved mobile header sizing.

## Version 1.2 — About & Conference Archive
- Expanded the historical About/Journey section using the supplied 1956 origin information.
- Added the complete supplied 1st–53rd conference chronology (1956–2025).
- Added recent conference milestones: 51st Simultala (Jan. 2024), 52nd Kushinagar (2024), 53rd Rajgir/Nalanda (2025).
- Preserved the existing hero slideshow, logo, navigation, membership and contact sections.
