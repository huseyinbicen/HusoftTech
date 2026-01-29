# Copilot Instructions for HusoftTech Portfolio Site

This project is a static portfolio for HusoftTech iOS apps, built with HTML, Bootstrap 5 (CDN), and vanilla JavaScript. Use these instructions to maximize AI agent productivity in this codebase.

## Architecture & Data Flow
- **Single-page static site**: No backend, all data is inline in HTML files.
- **App data**: Defined in `<script id="apps-data">` blocks in both `index.html` and `app.html` as JSON.
- **Homepage** (`index.html`): Lists all apps using data from the inline JSON.
- **App detail page** (`app.html`): Displays details for a single app, selected by `id` query param (e.g., `app.html?id=trip-checklist`).
- **JavaScript**:
  - `js/main.js`: Loads and renders the app list from inline JSON.
  - `js/app.js`: Loads and renders a single app's details from inline JSON, using the query param.
- **Assets**: Each app has a folder at `assets/apps/<app-id>/` with `icon.png` and `screenshots/`.

## Developer Workflows
- **No build step**: Open `index.html` or `app.html` directly in a browser to view or test.
- **Add a new app**:
  1. Update the `apps-data` JSON in both `index.html` and `app.html`.
  2. Create a new folder at `assets/apps/<new-id>/` and add assets.
  3. The app will appear automatically on the homepage and detail page.
- **Styling**: Use `css/styles.css` for custom styles. Bootstrap 5 is loaded via CDN.

## Project Conventions
- **Data duplication**: App data is duplicated in both HTML files for simplicity (no shared JS modules).
- **No frameworks**: Only vanilla JS and Bootstrap via CDN.
- **Privacy/Policy pages**: Placed under each app's folder, e.g., `assets/apps/trip-checklist/policy/privacy.html`.
- **Screenshots**: Store under `assets/apps/<app-id>/screenshots/`.

## Key Files & Directories
- `index.html`, `app.html`: Main entry points and data sources.
- `js/main.js`, `js/app.js`: Core logic for rendering app lists/details.
- `assets/apps/`: App-specific assets and policies.
- `css/styles.css`: Custom styles.

## Example: Adding an App
- Update both `index.html` and `app.html` in the `<script id="apps-data">` block.
- Add `assets/apps/my-new-app/icon.png` and screenshots.
- Access detail page at `app.html?id=my-new-app`.

## Contact
- For brand info, see the inline JSON in `index.html`.
- Email: husofttech@gmail.com

---
For more, see the [README.md](../../README.md).
