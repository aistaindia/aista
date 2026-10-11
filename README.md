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


## Version 1.8.5 — National Managing Committee
- Added a dedicated National Managing Committee section and navigation link.
- Public display is limited to names and designations, with a photo slot for each person.
- Replace the temporary initials placeholders with approved portrait files before publishing. To do so, add each image under `assets/committee/` and replace the corresponding `photo-placeholder` element in `index.html` with an `<img>` element using that image path.
- The published section does not show personal phone numbers, home addresses or email addresses.


## Version 1.8.6 — Registration details and office information
- Added a Registration & Continuity section based on the handwritten introduction supplied by the Association.
- Added registration number S000529/2025-26 and registration date 30 March 2026.
- Added the Head Office / Registered Office address and bank account details supplied by the Association.
- The account holder name is flagged for confirmation; verify the bank-registered account name and details before accepting payments.


## Version 1.8.7 — National Managing Committee photo update
- Replaced initials placeholders with the supplied individual committee photographs.
- Removed initials such as RP/BP/RS from the visible committee cards.
- Standardised card spacing, portrait dimensions, names and designations for desktop, tablet and mobile layouts.
- Public committee section intentionally excludes personal addresses and phone numbers.


## Version 1.8.8 updates
- Removed the repeated Registered Office address from the Contact section.
- Updated the official phone number to 9631174778.
- Removed the clarification in brackets after the bank account name.
- Removed the duplicate address card from the National Network section; visitors are directed to the single Registered Office & Contact section.
- Updated the footer to show the same Head Office / Registered Office address.


## V1.8.10 — PDF Notices and Membership Signature
- Latest Updates and the Notice Board now render from `data/notices.json`.
- Add an approved PDF to `assets/notices/` and set its `pdfUrl` in `data/notices.json` to publish a downloadable notice in both places. See `docs/PUBLISHING_NOTICES_WITH_PDF_V1_8_10.md`.
- Improved contrast of the membership enrolment declaration.
- Added applicant signature image selection and browser preview (maximum 5 MB).
- Important: the static form does not yet send/store application data, photo, or signature; a secure backend is required for live collection.


## V1.8.12 — Tablet layout and administrative registration banner
- Fixed the hero layout at tablet and medium viewport widths: Latest Updates now sits below the hero text rather than overlapping it.
- Kept the side-by-side hero layout on wider desktop screens and made the tablet/mobile layout responsive.
- Restored the light-yellow Administrative Update panel and combined the continuity statement with Registration No. S000529/2025-26 in the same panel.
- Preserved the current official contact, membership, notice, and committee content.


## V1.8.13 — Membership application-first workflow
- Payment is disabled during application submission; membership fees remain informational only.
- Applicants submit details, photo and signature for committee review.
- Added Google Apps Script backend starter at `backend/MembershipAppsScript.gs` for Google Sheets storage and email notification to `tastorg.india@gmail.com`.
- Follow `docs/MEMBERSHIP_APPLICATION_WORKFLOW_V1_8_13.md` to create the sheet, deploy the endpoint and configure `MEMBERSHIP_SUBMISSION_URL` in `script.js`.
- The live form does not store/send applications until the one-time backend deployment is completed and the URL is added. Test before announcing applications are open.
