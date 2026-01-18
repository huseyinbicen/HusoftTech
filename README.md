# HusoftTech Portfolio Site

A lightweight, static portfolio for HusoftTech iOS apps. Built with HTML, Bootstrap 5 via CDN, and vanilla JavaScript.

## Run locally

Open `index.html` directly in your browser. All app data is stored inline in `index.html` and `app.html`, so no local server is required.

## Brand info (from index.html)

The homepage reads brand metadata from the inline JSON in `index.html`:

- Name: HusoftTech
- Tagline: Clean, focused apps for daily momentum.
- Email: husofttech@gmail.com
- Copyright owner: HusoftTech

## Add a new app

1. In both `index.html` and `app.html`, find the `<script id="apps-data">` block.
2. Add a new app object under `"apps"` with a unique `id`.
3. Create a folder at `assets/apps/<new-id>/`.
4. Add your assets (or placeholders):
   - `icon.png`
   - `screenshots/<image>.png`
5. The app appears automatically on the homepage.
6. The detail page works at `app.html?id=<new-id>`.

## Project structure

- `index.html` - Homepage with the apps grid.
- `app.html` - App detail page (single template).
- `css/styles.css` - Brand styling overrides and motion polish.
- `js/main.js` - Loads the apps list from inline JSON.
- `js/app.js` - Loads a single app by query param from inline JSON.
- `assets/` - Brand assets and app screenshots.

## Notes

- Privacy Policy page: `assets/apps/trip-checklist/policy/privacy.html`
- If you rename app IDs, update both inline JSON blocks to match.
