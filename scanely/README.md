# Scanely Static Social Page

This folder contains the static Scanely social profile page that opens from a QR code.

## Public Endpoint

```text
https://husofttech.com/scanely/
```

## How It Works

- This page is fully static.
- There is no backend, database, or `POST` endpoint.
- Scanely builds the page entirely from URL query parameters.
- The shorter the URL, the better the QR code scans.

## Recommended URL

Short QR-friendly example:

```text
https://husofttech.com/scanely/?t=My%20Links&b=Find%20me%20everywhere&ig=xxxuser&yt=%40xxxuser&web=https%3A%2F%2Fhusofttech.com&c1=https%3A%2F%2Fportfolio.example.com&c1l=Portfolio&ac=%230f766e&isPro=true
```

Readable example:

```text
https://husofttech.com/scanely/?title=My%20Links&bio=Find%20me%20everywhere&instagram=xxxuser&youtube=%40xxxuser&website=https%3A%2F%2Fhusofttech.com&custom1Url=https%3A%2F%2Fportfolio.example.com&custom1Label=Portfolio&accentColor=%230f766e&isPro=false
```

## Main Parameters

| Purpose | Short | Long |
|---|---|---|
| Title | `t` | `title` |
| Bio | `b` | `bio`, `subtitle`, `description` |
| Avatar URL | `a` | `avatar`, `image`, `avatarUrl`, `imageUrl` |
| Accent color | `ac` | `accent`, `accentColor`, `color` |
| Pro mode | `pro` | `isPro`, `is_pro` |

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

## Social Parameters

Every supported SVG logo now has a short key and a long key.

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

## Social Value Rules

- For username-based platforms, you can pass just the username.
- Full URLs also work for most platforms.
- For WhatsApp, a phone number is best.
- For Discord, Spotify, LINE, Messenger, Signal, WeChat, and Viber, full URLs are recommended.
- For Mastodon, use either a full URL or a handle like `@user@server.com`.

Examples:

```text
?ig=xxxuser
?yt=%40xxxuser
?wa=905551112233
?dc=https%3A%2F%2Fdiscord.gg%2Fexample
?md=%40husofttech%40mastodon.social
?web=https%3A%2F%2Fhusofttech.com
```

## Custom Links

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

## Website Label

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

## Best Practice For QR Codes

- Prefer short keys like `t`, `b`, `ig`, `yt`, `web`, `c1`, `c1l`
- Avoid very long bios
- Avoid too many custom links in one QR code
- Use `isPro=true` if you want the cleanest top area

## Related Files

- `scanely/index.html`: page entry
- `js/scanely.js`: query parser and page rendering
- `css/scanely.css`: styling
