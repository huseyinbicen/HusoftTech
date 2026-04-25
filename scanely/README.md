# Scanely Static QR Landing Page

This folder contains the static Scanely web page that opens from a QR code.

It now supports three page types from the same endpoint:

- `app=SH`: Social Hub
- `app=BC`: Business Card
- `app=PH`: Payment Hub

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
| Payment Hub | `PH` | Bank transfer, online payment, and crypto wallet landing page |

The `app` parameter is required. Use `app=SH` for Social Hub, `app=BC` for Business Card, or `app=PH` for Payment Hub.

## Shared Parameters

These work in both modes.

| Purpose | Short | Long |
|---|---|---|
| App mode | `app` | `None` |
| Avatar URL | `a` | `avatar`, `image`, `avatarUrl`, `imageUrl` |
| Accent color | `ac` | `accent`, `accentColor`, `color` |
| Pro mode | `pro` | `isPro`, `is_pro` |
| Description / subtitle | `b` | `bio`, `subtitle`, `description` |

## `isPro`

`isPro` controls the Scanely brand badge.

If `isPro` is omitted, it defaults to `false`.

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
https://husofttech.com/scanely/?app=SH&t=My%20Links&b=Find%20me%20everywhere&ig=xxxuser&yt=%40xxxuser&web=https%3A%2F%2Fhusofttech.com&c1=https%3A%2F%2Fportfolio.example.com&c1l=Portfolio&ac=%230f766e
```

Readable example:

```text
https://husofttech.com/scanely/?app=SH&title=My%20Links&bio=Find%20me%20everywhere&instagram=xxxuser&youtube=%40xxxuser&website=https%3A%2F%2Fhusofttech.com&custom1Url=https%3A%2F%2Fportfolio.example.com&custom1Label=Portfolio&accentColor=%230f766e
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

- For most username-based platforms, you can pass either a plain username or a full URL.
- For WhatsApp, a phone number is best, but a full WhatsApp URL also works.
- Spotify accepts either a username like `sp=exampleuser` or a full Spotify profile URL.
- WeChat accepts either a full share URL or a plain WeChat ID. When you pass only a WeChat ID, Scanely builds a best-effort mobile `weixin://` deep link.
- Discord, LINE, Messenger, Signal, and Viber are still safest when you pass full URLs.
- For Mastodon, use either a plain username like `exampleuser` or a full profile URL like `https://mastodon.social/@exampleuser`. If you need another server, pass the full profile URL.

### Social Value Samples

Use the sample values below after either the short key or the long key. Example: `?app=SH&ig=exampleuser` or `?app=SH&instagram=https://www.instagram.com/exampleuser/`.

| Platform | Plain value sample | URL value sample |
|---|---|---|
| Instagram | `exampleuser` | `https://www.instagram.com/exampleuser/` |
| TikTok | `exampleuser` | `https://www.tiktok.com/@exampleuser` |
| X | `exampleuser` | `https://x.com/exampleuser` |
| YouTube | `@exampleuser` | `https://www.youtube.com/@exampleuser` |
| Threads | `exampleuser` | `https://www.threads.com/@exampleuser` |
| Facebook | `exampleuser` | `https://www.facebook.com/exampleuser` |
| GitHub | `exampleuser` | `https://github.com/exampleuser` |
| Telegram | `exampleuser` | `https://t.me/exampleuser` |
| WhatsApp | `905551112233` | `https://wa.me/905551112233` |
| Snapchat | `exampleuser` | `https://www.snapchat.com/add/exampleuser` |
| Reddit | `exampleuser` | `https://www.reddit.com/user/exampleuser/` |
| Discord | `URL recommended` | `https://discord.gg/example` |
| Spotify | `exampleuser` | `https://open.spotify.com/user/exampleuser` |
| Pinterest | `exampleuser` | `https://www.pinterest.com/exampleuser/` |
| Twitch | `exampleuser` | `https://www.twitch.tv/exampleuser` |
| Bluesky | `example.bsky.social` | `https://bsky.app/profile/example.bsky.social` |
| Mastodon | `exampleuser` | `https://mastodon.social/@exampleuser` |
| LINE | `URL recommended` | `https://line.me/ti/p/example` |
| Messenger | `URL recommended` | `https://m.me/exampleuser` |
| Signal | `URL recommended` | `https://signal.me/#eu/example` |
| WeChat | `examplewechatid` | `https://u.wechat.com/exampleShareToken` |
| Viber | `URL recommended` | `https://invite.viber.com/?g2=AQexample` |
| Tumblr | `exampleuser` | `https://exampleuser.tumblr.com/` |
| Behance | `exampleuser` | `https://www.behance.net/exampleuser` |
| Dribbble | `exampleuser` | `https://dribbble.com/exampleuser` |
| Website | `example.com` | `https://example.com` |

### Custom Links

These custom-link parameters work in both Social Hub mode and Business Card mode.

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
https://husofttech.com/scanely/?app=BC&fn=Alex&ln=Carter&jt=iOS%20Designer&co=HusoftTech&ph=%2B905551112233&em=alex%40husofttech.com&web=https%3A%2F%2Fhusofttech.com&li=https%3A%2F%2Fwww.linkedin.com%2Fin%2Falexcarter&c1=https%3A%2F%2Fportfolio.example.com&c1l=Portfolio&ac=%230f766e
```

Readable example:

```text
https://husofttech.com/scanely/?app=BC&firstName=Alex&lastName=Carter&jobTitle=iOS%20Designer&company=HusoftTech&phone=%2B905551112233&email=alex%40husofttech.com&website=https%3A%2F%2Fhusofttech.com&linkedin=https%3A%2F%2Fwww.linkedin.com%2Fin%2Falexcarter&custom1Url=https%3A%2F%2Fportfolio.example.com&custom1Label=Portfolio&accentColor=%230f766e
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

### Business Card Custom Links

Business cards can also include extra named URLs such as Portfolio, Booking, Resume, or Store.

- URL fields: `c1` to `c8` or `custom1Url` to `custom8Url`
- Label fields: `c1l` to `c8l` or `custom1Label` to `custom8Label`
- Optional icon hints: `c1i` to `c8i` or `custom1Icon` to `custom8Icon`

Example:

```text
&c1=https%3A%2F%2Fportfolio.example.com&c1l=Portfolio&c2=https%3A%2F%2Fcal.example.com&c2l=Book%20a%20Call
```

These custom links are shown on the business card and in the larger quick-action list below it. They are not added to the generated `.vcf` file.

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

- Put `app=SH`, `app=BC`, or `app=PH` first when generating the final URL
- Prefer short keys like `fn`, `ln`, `jt`, `co`, `ph`, `em`, `web`, `li`
- Avoid long bios or subtitles
- Avoid too many custom links in one social QR code
- Keep Payment Hub URLs focused. Too many wallet addresses can make QR codes denser and harder to scan.
- Crypto networks matter. Especially for tokens like USDT and USDC, always share the correct network with the address.
- Use `isPro=true` if you want the cleanest top area

## Payment Hub Mode

Use `app=PH` to show a payment-first landing page with bank transfer details, direct payment links, and crypto wallet copy buttons.

### Recommended URL

Short QR-friendly example:

```text
https://husofttech.com/scanely/?app=PH&t=HusoftTech%20Payments&b=Choose%20the%20best%20way%20to%20pay&bn=Garanti%20BBVA&ib=TR330006100519786457841326&an=458741326&rc=610005&bn1=Akbank&ib1=TR120006200019876543210987&an1=198765432109&rc1=0001987&pp=husofttech&pp1=husofttech.global&pl=https%3A%2F%2Fbuy.stripe.com%2Ftest_4gw7vKgYw4example&pll=Checkout&pl1=https%3A%2F%2Fexample.com%2Finvoice%2F4587&pll1=Invoice&btc=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh&btc1=bc1q8example9secondarywallet0z7k2n3m4p5q6r7s8t&eth=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&eth1=0x1111111254EEB25477B68fb85Ed929f73A960582&usdt=TQn9Y2o5Qh9mP7tLYTexampleTron&usdtn=TRC20&usdt1=0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&usdtn1=ERC20&sol=9xQeWvG816bUx9EPmexampleSolanaWallet&ac=%230f766e
```

Readable example:

```text
https://husofttech.com/scanely/?app=PH&title=HusoftTech%20Payments&bio=Choose%20the%20best%20way%20to%20pay&bankName=Garanti%20BBVA&iban=TR330006100519786457841326&accountNumber=458741326&routingCode=610005&bankName1=Akbank&iban1=TR120006200019876543210987&accountNumber1=198765432109&routingCode1=0001987&paypal=husofttech&paypal1=husofttech.global&paymentLink=https%3A%2F%2Fbuy.stripe.com%2Ftest_4gw7vKgYw4example&paymentLinkLabel=Checkout&paymentLink1=https%3A%2F%2Fexample.com%2Finvoice%2F4587&paymentLinkLabel1=Invoice&bitcoin=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh&bitcoin1=bc1q8example9secondarywallet0z7k2n3m4p5q6r7s8t&ethereum=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&ethereum1=0x1111111254EEB25477B68fb85Ed929f73A960582&tether=TQn9Y2o5Qh9mP7tLYTexampleTron&tetherNetwork=TRC20&tether1=0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&tetherNetwork1=ERC20&solana=9xQeWvG816bUx9EPmexampleSolanaWallet&accentColor=%230f766e
```

### Payment Hub Parameters

| Field | Short | Long | Required? | Notes |
|---|---|---|---|---|
| Title | `t` | `title` | Optional | Defaults to `Payment Hub` |
| Bio / subtitle | `b` | `bio`, `subtitle`, `description` | Optional | Short helper text below the title |
| Bank name | `bn` | `bank`, `bankName` | Optional | Name of the receiving bank |
| IBAN | `ib` | `iban` | Optional | Tap the row to copy |
| Account number | `an` | `account`, `accountNumber`, `acct` | Optional | Useful for local transfer instructions |
| Routing Number/Bank Code | `rc`, `rn`, `bc` | `routing`, `routingCode`, `routingNumber`, `bankCode` | Optional | Use for routing numbers or local bank codes |
| PayPal handle / URL | `pp` | `paypal`, `paypalUrl` | Optional | Best passed as a PayPal handle or full `paypal.me` URL |
| Payment link | `pl` | `paymentLink`, `payLink`, `checkout`, `checkoutUrl` | Optional | Hosted checkout or invoice URL |
| Payment link label | `pll` | `paymentLinkLabel`, `payLabel` | Optional | Renames the payment-link button |

### Multiple Online Payments

Payment Hub also supports more than one PayPal entry and more than one payment link.

Single-field format still works:

- `pp`, `pl`, `pll`
- `paypal`, `paymentLink`, `paymentLinkLabel`

If you want more than one online payment method, add a numeric suffix from `1` to `8`.

Short format examples:

- `pp1`, `pp2`
- `pl1`, `pll1`
- `pl2`, `pll2`

Readable format examples:

- `paypal1`, `paypal2`
- `paymentLink1`, `paymentLinkLabel1`
- `paymentLink2`, `paymentLinkLabel2`

Example:

```text
&pp=husofttech&pp1=husofttech.global&pl=https%3A%2F%2Fbuy.stripe.com%2Ftest_4gw7vKgYw4example&pll=Checkout&pl1=https%3A%2F%2Fexample.com%2Finvoice%2F4587&pll1=Invoice
```

Notes:

- The original unsuffixed fields still work, so older QR codes remain compatible.
- Numbered fields are recommended when you need multiple online payment actions.
- `pll1` or `paymentLinkLabel1` matches `pl1` or `paymentLink1`.

### Multiple Bank Accounts

Payment Hub still supports the original single bank fields:

- `bn`, `ib`, `an`, `rc`
- `bankName`, `iban`, `accountNumber`, `routingCode`

If you want more than one bank account, add a numeric suffix from `1` to `8`.

Short format examples:

- `bn1`, `ib1`, `an1`, `rc1`
- `bn2`, `ib2`, `an2`, `rc2`

Readable format examples:

- `bankName1`, `iban1`, `accountNumber1`, `routingCode1`
- `bankName2`, `iban2`, `accountNumber2`, `routingCode2`

Example:

```text
&bn=Garanti%20BBVA&ib=TR330006100519786457841326&an=458741326&rc=610005&bn1=Akbank&ib1=TR120006200019876543210987&an1=198765432109&rc1=0001987
```

Notes:

- The original unsuffixed fields still work, so older QR codes remain compatible.
- The numbered fields are recommended for new Payment Hub QR codes when you need more than one bank account.
- Each bank account is shown as its own compact card with tap-to-copy rows for the IBAN, account number, and Routing Number/Bank Code.

### Supported Crypto Wallets

Each wallet accepts a short key, a readable long key, and an optional network field.

| Coin | Address Short | Address Long | Network Short | Network Long |
|---|---|---|---|---|
| Bitcoin | `btc` | `bitcoin` | `btcn` | `btcNetwork`, `bitcoinNetwork` |
| Ethereum | `eth` | `ethereum` | `ethn` | `ethNetwork`, `ethereumNetwork` |
| Tether | `usdt` | `tether` | `usdtn` | `usdtNetwork`, `tetherNetwork` |
| USD Coin | `usdc` | `usdcoin` | `usdcn` | `usdcNetwork`, `usdcoinNetwork` |
| Solana | `sol` | `solana` | `soln` | `solNetwork`, `solanaNetwork` |
| BNB | `bnb` | `binance` | `bnbn` | `bnbNetwork`, `binanceNetwork` |
| Cardano | `ada` | `cardano` | `adan` | `adaNetwork`, `cardanoNetwork` |
| Dogecoin | `doge` | `dogecoin` | `dogen` | `dogeNetwork`, `dogecoinNetwork` |
| TRON | `trx` | `tron` | `trxn` | `trxNetwork`, `tronNetwork` |
| Litecoin | `ltc` | `litecoin` | `ltcn` | `ltcNetwork`, `litecoinNetwork` |

### Multiple Crypto Wallets

Payment Hub also supports more than one wallet for the same coin.

Single-field format still works:

- `btc`, `eth`, `usdt`
- `bitcoin`, `ethereum`, `tether`

If you want more than one wallet for the same coin, add a numeric suffix from `1` to `8`.

Short format examples:

- `btc1`, `btc2`
- `eth1`, `eth2`
- `usdt1`, `usdtn1`

Readable format examples:

- `bitcoin1`, `bitcoin2`
- `ethereum1`, `ethereum2`
- `tether1`, `tetherNetwork1`

Example:

```text
&btc=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh&btc1=bc1q8example9secondarywallet0z7k2n3m4p5q6r7s8t&eth=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&eth1=0x1111111254EEB25477B68fb85Ed929f73A960582&usdt=TQn9Y2o5Qh9mP7tLYTexampleTron&usdtn=TRC20&usdt1=0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&usdtn1=ERC20
```

Notes:

- The original unsuffixed fields still work, so older QR codes remain compatible.
- Numbered fields are recommended when you need multiple wallets for the same coin.
- Network fields follow the same suffix as the wallet field, for example `usdtn1` matches `usdt1`.

### Payment Hub Notes

- Payment Hub is still fully static. All values come from the URL query string.
- Public payment details like IBANs and wallet addresses will be visible in the generated URL.
- Multiple bank accounts are supported from `1` to `8` using numbered keys like `bn1`, `ib1`, `an1`, `rc1`.
- For PayPal, pass either a plain handle like `pp=husofttech` or a full URL like `paypal=https://paypal.me/husofttech`.
- For tokens and multi-network assets, always include the network when possible. Example: `usdt=...&usdtn=TRC20`.
- If you only need a few wallets, prefer only sharing the ones you actually use so the QR code stays easier to scan.

## Related Files

- `scanely/index.html`: page entry
- `js/scanely.js`: query parser, page rendering, business card `.vcf` generator, payment hub copy actions
- `css/scanely.css`: styling
