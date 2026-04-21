---
name: husofttech-add-app
description: Use when adding a new HusoftTech app to this portfolio site, including app metadata, policy pages, support list updates, sitemap entries, and privacy/terms content derived from a project brief or ABOUT.md file.
---

# HusoftTech App Addition Workflow

Use this skill when a new app needs to be added to the HusoftTech site in the same style as the existing app entries.

## Inputs to gather

- App id / slug, for example `scanely`
- Display name and tagline
- App Store ID or full App Store URL
- Logo path under `assets/apps/<id>/`
- Any screenshots that already exist
- Product brief, `ABOUT.md`, or launch notes that describe features, privacy behavior, permissions, and monetization

## Existing patterns to copy

- App metadata blocks in `index.html` and `app.html`
- Policy page structure from `assets/apps/flipora/policy/` or another recent app folder
- Support app selector in `support.html`
- Search indexing entries in `sitemap.xml`

## Required file work

1. Create `assets/apps/<id>/policy/index.html`.
2. Create `assets/apps/<id>/policy/privacy.html`.
3. Create `assets/apps/<id>/policy/terms.html`.
4. Add the app object to the inline JSON inside `index.html`.
5. Add the same app object to the inline JSON inside `app.html`.
6. Add the app to the selector in `support.html`.
7. Add the app page and policy URLs to `sitemap.xml`.

## Policy writing rules

- Keep the HusoftTech document shell and relative asset paths unchanged.
- Use concrete app behavior from the brief instead of generic privacy wording.
- State whether the app:
  - requires an account
  - uses analytics, ads, or tracking
  - works offline
  - stores data locally
  - uses Apple permissions such as camera, photos, notifications, or location
  - offers optional iCloud or CloudKit sync
  - has paid features or one-time purchases through Apple
- Use an exact `Last updated` date.
- Contact email is `husofttech@gmail.com` unless the repo shows a new support address.

## App metadata rules

- `id` must match the folder name and the `app.html?id=<id>` route.
- `appStoreUrl` should use the full Apple URL, for example `https://apps.apple.com/app/id1234567890`.
- `icon` should point to the provided app logo under `assets/apps/<id>/`.
- `screenshots` can be an empty array if no screenshots are available yet.
- Keep the description concise but specific to the app's actual feature set.

## UI safeguard

- If the new app has no screenshots, make sure the detail page does not show an empty screenshots section.
- Reuse or extend the existing app page logic instead of inventing a separate template.

## Verification

- Run a quick search for the new app id with `rg`.
- Check that `index.html`, `app.html`, `support.html`, and `sitemap.xml` all reference the new app.
- Parse or sanity-check the inline JSON blocks after editing.
- Confirm the three policy files exist under `assets/apps/<id>/policy/`.

## Notes

- Do not rename existing app ids unless the user explicitly asks.
- Prefer mirroring the newest app entry in the repo rather than the oldest one.
- If screenshots are missing, do not invent fake screenshot assets unless the user explicitly asks for placeholders.
