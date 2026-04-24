# Scanely Static QR Landing Page

This folder contains the static Scanely web page that opens from a QR code.

It now supports two page types from the same endpoint:

- `app=SH`: Social Hub
- `app=BC`: Business Card

## Public Endpoint

```text
https://husofttech.com/scanely/
```

## How It Works

- This page is fully static.
- There is no backend, database, or `POST` endpoint.
- Scanely builds the page entirely from URL query parameters.
- Shorter URLs produce better QR codes.

## App Mode

Use the `app` query parameter to choose the page type.

| Mode | Value | Purpose |
|---|---|---|
| Social Hub | `SH` | Linktree-style list of social and custom links |
| Business Card | `BC` | Contact card with quick actions and downloadable `.vcf` |

If `app` is missing, Scanely defaults to the Social Hub flow for backward compatibility.

## Shared Parameters

These work in both modes.

| Purpose | Short | Long |
|---|---|---|
| App mode | `app` | `mode`, `type` |
| Avatar URL | `a` | `avatar`, `image`, `avatarUrl`, `imageUrl` |
| Accent color | `ac` | `accent`, `accentColor`, `color` |
| Pro mode | `pro` | `isPro`, `is_pro` |
| Description / subtitle | `b` | `bio`, `subtitle`, `description` |

## `isPro`

`isPro` controls the Scanely brand badge.

- `isPro=true`: hide the `Powered by Scanely` badge
- `isPro=false`: show the badge in the top bar beside the light/dark toggle

Accepted true values:

- `true`
- `1`
- `yes`
- `on`

Accepted false values:

- `false`
- `0`
- `no`
- `off`

## Social Hub Mode

Use `app=SH` for the current Linktree-style experience.

### Recommended URL

Short QR-friendly example:

```text
https://husofttech.com/scanely/?app=SH&t=My%20Links&b=Find%20me%20everywhere&ig=xxxuser&yt=%40xxxuser&web=https%3A%2F%2Fhusofttech.com&c1=https%3A%2F%2Fportfolio.example.com&c1l=Portfolio&ac=%230f766e&isPro=true
```

Readable example:

```text
https://husofttech.com/scanely/?app=SH&title=My%20Links&bio=Find%20me%20everywhere&instagram=xxxuser&youtube=%40xxxuser&website=https%3A%2F%2Fhusofttech.com&custom1Url=https%3A%2F%2Fportfolio.example.com&custom1Label=Portfolio&accentColor=%230f766e&isPro=false
```

### Main Social Hub Parameters

| Purpose | Short | Long |
|---|---|---|
| Title | `t` | `title` |
| Bio | `b` | `bio`, `subtitle`, `description` |
| Avatar URL | `a` | `avatar`, `image`, `avatarUrl`, `imageUrl` |
| Accent color | `ac` | `accent`, `accentColor`, `color` |
| Pro mode | `pro` | `isPro`, `is_pro` |

### Social Parameters

Every supported SVG logo has a short key and a long key.

| Platform | Short key | Long key |
|---|---|---|
| Instagram | `ig` | `instagram` |
| TikTok | `tt` | `tiktok` |
| X | `x` | `twitter` |
| YouTube | `yt` | `youtube` |
| Threads | `th` | `threads` |
| Facebook | `fb` | `facebook` |
| GitHub | `gh` | `github` |
| Telegram | `tg` | `telegram` |
| WhatsApp | `wa` | `whatsapp` |
| Snapchat | `sc` | `snapchat` |
| Reddit | `rd` | `reddit` |
| Discord | `dc` | `discord` |
| Spotify | `sp` | `spotify` |
| Pinterest | `pin` | `pinterest` |
| Twitch | `tw` | `twitch` |
| Bluesky | `bsky` | `bluesky` |
| Mastodon | `md` | `mastodon` |
| LINE | `ln` | `line` |
| Messenger | `msg` | `messenger` |
| Signal | `sg` | `signal` |
| WeChat | `wc` | `wechat` |
| Viber | `vb` | `viber` |
| Tumblr | `tb` | `tumblr` |
| Behance | `bh` | `behance` |
| Dribbble | `db` | `dribbble` |
| Website | `web` | `website` |

### Social Value Rules

- For username-based platforms, you can pass just the username.
- Full URLs also work for most platforms.
- For WhatsApp, a phone number is best.
- For Discord, Spotify, LINE, Messenger, Signal, WeChat, and Viber, full URLs are recommended.
- For Mastodon, use either a full URL or a handle like `@user@server.com`.

Examples:

```text
?app=SH&ig=xxxuser
?app=SH&yt=%40xxxuser
?app=SH&wa=905551112233
?app=SH&dc=https%3A%2F%2Fdiscord.gg%2Fexample
?app=SH&md=%40husofttech%40mastodon.social
?app=SH&web=https%3A%2F%2Fhusofttech.com
```

### Custom Links

Short format:

- `c1` to `c8`: custom URL
- `c1l` to `c8l`: custom label
- `c1i` to `c8i`: optional custom icon hint

Readable format:

- `custom1Url` to `custom8Url`
- `custom1Label` to `custom8Label`
- `custom1Icon` to `custom8Icon`

Example:

```text
&c1=https%3A%2F%2Fportfolio.example.com&c1l=Portfolio&c1i=gh
```

Custom icon hints can use either the platform id, the short key, or the long key when they exist in the parser.

Examples:

- `c1i=gh`
- `c1i=github`
- `c1i=instagram`
- `c1i=ig`

### Website Label

If you want to rename the main website button:

- `wl`
- `webLabel`
- `websiteLabel`
- `web_label`
- `website_label`

Example:

```text
&web=https%3A%2F%2Fhusofttech.com&wl=Main%20Site
```

## Business Card Mode

Use `app=BC` to show a contact-style page with quick actions and a downloadable `.vcf`.

### Recommended URL

Short QR-friendly example:

```text
https://husofttech.com/scanely/?app=BC&fn=Alex&ln=Carter&jt=iOS%20Designer&co=HusoftTech&ph=%2B905551112233&em=alex%40husofttech.com&web=https%3A%2F%2Fhusofttech.com&li=https%3A%2F%2Fwww.linkedin.com%2Fin%2Falexcarter&ac=%230f766e
```

Readable example:

```text
https://husofttech.com/scanely/?app=BC&firstName=Alex&lastName=Carter&jobTitle=iOS%20Designer&company=HusoftTech&phone=%2B905551112233&email=alex%40husofttech.com&website=https%3A%2F%2Fhusofttech.com&linkedin=https%3A%2F%2Fwww.linkedin.com%2Fin%2Falexcarter&accentColor=%230f766e
```

### Business Card Parameters

| Field | Short | Long | Required? | Notes |
|---|---|---|---|---|
| First name | `fn` | `first`, `firstName`, `given`, `givenName` | `✓ At least one name` | Used for display name and `N` |
| Last name | `ln` | `last`, `lastName`, `surname`, `familyName` | Optional | Used for `N` |
| Full name fallback | `name` | `fullName` | Optional | Used when you want to override display name |
| Job title | `jt` | `jobTitle`, `job`, `role`, `title` | Optional | Saved as `TITLE` |
| Company | `co` | `company`, `org`, `organization` | Optional | Saved as `ORG` |
| Phone | `ph` | `phone`, `tel`, `mobile` | Optional | Saved as `TEL` and shown as a Call button |
| Email | `em` | `email`, `mail` | Optional | Saved as `EMAIL` and shown as an Email button |
| Website URL | `web` | `website`, `url` | Optional | Saved as `URL` |
| LinkedIn URL | `li` | `linkedin`, `linkedinUrl` | Optional | Saved as `URL;TYPE=linkedin` |

Notes:

- At least one name value is strongly recommended for a clean contact card.
- `title` is treated as the job title only in `app=BC` mode.
- `web` is reused for the business website in `app=BC` mode.
- `li` should be a full URL for the cleanest result.

### vCard Mapping

| Field | vCard Property | Required? | Notes |
|---|---|---|---|
| First name | `FN` + `N` | `✓ At least one` | Combined into display name |
| Last name | `N` | Optional | Part of structured name |
| Job title | `TITLE` | Optional | Professional title |
| Company | `ORG` | Optional | Organization / employer |
| Phone | `TEL` | Optional | Telephone number |
| Email | `EMAIL` | Optional | Email address |
| Website URL | `URL` | Optional | Website or portfolio |
| LinkedIn URL | `URL;TYPE=linkedin` | Optional | LinkedIn profile link |

## Best Practice For QR Codes

- Put `app=SH` or `app=BC` first when generating the final URL
- Prefer short keys like `fn`, `ln`, `jt`, `co`, `ph`, `em`, `web`, `li`
- Avoid long bios or subtitles
- Avoid too many custom links in one social QR code
- Use `isPro=true` if you want the cleanest top area

## Related Files

- `scanely/index.html`: page entry
- `js/scanely.js`: query parser, page rendering, business card `.vcf` generator
- `css/scanely.css`: styling
