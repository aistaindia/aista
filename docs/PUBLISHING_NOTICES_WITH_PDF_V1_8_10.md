# Publishing an Association Notice with a downloadable PDF (V1.8.10)

The homepage **LATEST UPDATES** ticker and the lower **Notices & Announcements** board both read from `data/notices.json`. To publish an approved circular:

1. Add the approved PDF to `assets/notices/` (example filename: `annual-meeting-notice-2026.pdf`). Keep the filename simple and avoid spaces.
2. Open `data/notices.json` and add a new object inside the outer `[` `]` array. Separate it from the preceding object with a comma. Example:

```json
{
  "id": "annual-meeting-2026",
  "date": "11 Oct 2026",
  "title": "Notice of Annual Meeting",
  "summary": "Please read the attached official circular for the meeting details.",
  "type": "Official Notice",
  "official": true,
  "linkTarget": "#notices",
  "pdfUrl": "assets/notices/annual-meeting-notice-2026.pdf",
  "cta": "Download PDF ↓"
}
```

3. Save both files, upload them to the GitHub repository, and commit the changes. GitHub Pages will display the new notice in **LATEST UPDATES** and in the Notice Board; its PDF link opens the uploaded document. Newest notices should be placed at the top of the JSON array.
4. Only publish notices and circulars approved by the Association. Check the live page and PDF link after deployment.

## Important membership form limitation

The photo and signature controls let applicants select an image and preview it in the browser. This static GitHub Pages prototype does **not** transmit or securely store the application, photo, or signature. Connect a secure form backend before using it to collect real membership applications.
