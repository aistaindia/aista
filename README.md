## V1.2.1 update

- Replaced the website logo with the latest official logo supplied for **The Association of Science Teachers**.
- Homepage, hero slideshow, About page and 1st–53rd conference archive from V1.2 are preserved.

# The Association of Science Teachers — Website Version 1.1.2

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


## V1.8 — Membership Enrolment
The membership section has been digitised from the paper Membership Enrolment Form supplied by the Association. It includes Annual, Life, Personal and Institutional membership options and the form fields visible on the supplied document. No fee is assumed. The supplied form image is retained under `assets/membership-enrolment-form-reference.jpg`.


## V1.8.1 — Official Membership Fees
Membership fees and eligibility were updated from the rules supplied by the Association. The form now auto-populates the membership fee and calculates total payable including the ₹100 admission fee.


## V1.8.2 — Member Photo Upload
The membership form now includes a local photo upload control. Applicants can select a photo from a laptop/desktop file picker or from a mobile phone gallery. The browser shows a preview before submission and accepts image files up to 5 MB. Actual storage of the uploaded image in Google Drive will be connected in the Google Apps Script backend phase.


## V1.8.3 — Notices & Announcements restored
Restored the hero Notices & Announcements panel, scrolling updates, pause/play control, View All Notices link, and a dedicated Notice Board section. Notice data is also stored in `data/notices.json` for future approved updates.

## V1.8.4 — Hero Notice Position Fix
The Notices & Announcements panel is explicitly anchored to the far-right side of the hero slider on desktop/tablet widths. On smaller screens it moves to the bottom of the hero without disappearing.
