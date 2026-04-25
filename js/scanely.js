const scanelyRoot = document.getElementById("scanely-root");
const feedbackToast = document.getElementById("scanely-feedback");
const rootElement = document.documentElement;
const pageCanonical = document.querySelector('link[rel="canonical"]');
const pageDescription = document.querySelector('meta[name="description"]');
const pageOgTitle = document.querySelector('meta[property="og:title"]');
const pageOgDescription = document.querySelector('meta[property="og:description"]');
const pageOgUrl = document.querySelector('meta[property="og:url"]');
const pageOgImage = document.querySelector('meta[property="og:image"]');
const pageTwitterTitle = document.querySelector('meta[name="twitter:title"]');
const pageTwitterDescription = document.querySelector('meta[name="twitter:description"]');
const pageTwitterImage = document.querySelector('meta[name="twitter:image"]');
const pageThemeColor = document.querySelector('meta[name="theme-color"]');

let feedbackTimeoutId = 0;
let tabsInstanceCount = 0;
const THEME_STORAGE_KEY = "scanely-theme";

const ICONS = {
  behance: "../assets/social-media-icons/social-behance.imageset/social-behance.svg",
  bluesky: "../assets/social-media-icons/social-bluesky.imageset/social-bluesky.svg",
  discord: "../assets/social-media-icons/social-discord.imageset/social-discord.svg",
  dribbble: "../assets/social-media-icons/social-dribbble.imageset/social-dribbble.svg",
  facebook: "../assets/social-media-icons/social-facebook.imageset/social-facebook.svg",
  github: "../assets/social-media-icons/social-github.imageset/social-github.svg",
  instagram: "../assets/social-media-icons/social-instagram.imageset/social-instagram.svg",
  line: "../assets/social-media-icons/social-line.imageset/social-line.svg",
  mastodon: "../assets/social-media-icons/social-mastodon.imageset/social-mastodon.svg",
  messenger: "../assets/social-media-icons/social-messenger.imageset/social-messenger.svg",
  pinterest: "../assets/social-media-icons/social-pinterest.imageset/social-pinterest.svg",
  reddit: "../assets/social-media-icons/social-reddit.imageset/social-reddit.svg",
  signal: "../assets/social-media-icons/social-signal.imageset/social-signal.svg",
  snapchat: "../assets/social-media-icons/social-snapchat.imageset/social-snapchat.svg",
  spotify: "../assets/social-media-icons/social-spotify.imageset/social-spotify.svg",
  telegram: "../assets/social-media-icons/social-telegram.imageset/social-telegram.svg",
  threads: "../assets/social-media-icons/social-threads.imageset/social-threads.svg",
  tiktok: "../assets/social-media-icons/social-tiktok.imageset/social-tiktok.svg",
  tumblr: "../assets/social-media-icons/social-tumblr.imageset/social-tumblr.svg",
  twitch: "../assets/social-media-icons/social-twitch.imageset/social-twitch.svg",
  viber: "../assets/social-media-icons/social-viber.imageset/social-viber.svg",
  wechat: "../assets/social-media-icons/social-wechat.imageset/social-wechat.svg",
  website: "../assets/social-media-icons/social-website.imageset/social-website.svg",
  whatsapp: "../assets/social-media-icons/social-whatsapp.imageset/social-whatsapp.svg",
  x: "../assets/social-media-icons/social-x.imageset/social-x.svg",
  youtube: "../assets/social-media-icons/social-youtube.imageset/social-youtube.svg",
};

const PLATFORM_DEFINITIONS = [
  { id: "instagram", label: "Instagram", icon: ICONS.instagram, iconHex: "#e4405f", iconInk: "#ffffff", group: "social", keys: ["ig", "instagram"], domains: ["instagram.com"], buildUrl: buildSimpleUserUrl("https://www.instagram.com/"), display: formatHandleDisplay },
  { id: "tiktok", label: "TikTok", icon: ICONS.tiktok, iconHex: "#25f4ee", iconInk: "#05181d", group: "social", keys: ["tt", "tiktok"], domains: ["tiktok.com"], buildUrl: buildSimpleUserUrl("https://www.tiktok.com/@"), display: formatHandleDisplay },
  { id: "x", label: "X", icon: ICONS.x, iconHex: "#0f172a", iconInk: "#ffffff", group: "social", keys: ["x", "twitter"], domains: ["x.com", "twitter.com"], buildUrl: buildSimpleUserUrl("https://x.com/"), display: formatHandleDisplay },
  { id: "youtube", label: "YouTube", icon: ICONS.youtube, iconHex: "#ff0033", iconInk: "#ffffff", group: "social", keys: ["yt", "youtube"], domains: ["youtube.com", "youtu.be"], buildUrl: buildYouTubeUrl, display: formatYouTubeDisplay },
  { id: "threads", label: "Threads", icon: ICONS.threads, iconHex: "#1f2937", iconInk: "#ffffff", group: "social", keys: ["th", "threads"], domains: ["threads.com", "threads.net"], buildUrl: buildThreadsUrl, display: formatHandleDisplay },
  { id: "facebook", label: "Facebook", icon: ICONS.facebook, iconHex: "#1877f2", iconInk: "#ffffff", group: "social", keys: ["fb", "facebook"], domains: ["facebook.com", "fb.com", "fb.me"], buildUrl: buildSimpleUserUrl("https://www.facebook.com/"), display: formatHandleDisplay },
  { id: "github", label: "GitHub", icon: ICONS.github, iconHex: "#24292f", iconInk: "#ffffff", group: "social", keys: ["gh", "github"], domains: ["github.com", "gist.github.com"], buildUrl: buildSimpleUserUrl("https://github.com/"), display: formatHandleDisplay },
  { id: "telegram", label: "Telegram", icon: ICONS.telegram, iconHex: "#26a5e4", iconInk: "#ffffff", group: "social", keys: ["tg", "telegram"], domains: ["t.me", "telegram.me", "telegram.org"], buildUrl: buildSimpleUserUrl("https://t.me/"), display: formatHandleDisplay },
  { id: "whatsapp", label: "WhatsApp", icon: ICONS.whatsapp, iconHex: "#25d366", iconInk: "#ffffff", group: "social", keys: ["wa", "whatsapp"], domains: ["wa.me", "whatsapp.com"], buildUrl: buildWhatsAppUrl, display: formatPhoneDisplay },
  { id: "snapchat", label: "Snapchat", icon: ICONS.snapchat, iconHex: "#fffc00", iconInk: "#111827", group: "social", keys: ["sc", "snapchat"], domains: ["snapchat.com"], buildUrl: buildSimpleUserUrl("https://www.snapchat.com/add/"), display: formatHandleDisplay },
  { id: "reddit", label: "Reddit", icon: ICONS.reddit, iconHex: "#ff4500", iconInk: "#ffffff", group: "social", keys: ["rd", "reddit"], domains: ["reddit.com"], buildUrl: buildSimpleUserUrl("https://www.reddit.com/user/"), display: formatHandleDisplay },
  { id: "discord", label: "Discord", icon: ICONS.discord, iconHex: "#5865f2", iconInk: "#ffffff", group: "social", keys: ["dc", "discord"], domains: ["discord.gg", "discord.com"], buildUrl: buildDiscordUrl, display: formatIdentifierOrHostDisplay },
  { id: "spotify", label: "Spotify", icon: ICONS.spotify, iconHex: "#1db954", iconInk: "#062714", group: "social", keys: ["sp", "spotify"], domains: ["spotify.com"], buildUrl: buildSimpleUserUrl("https://open.spotify.com/user/"), display: formatIdentifierOrHostDisplay },
  { id: "pinterest", label: "Pinterest", icon: ICONS.pinterest, iconHex: "#e60023", iconInk: "#ffffff", group: "social", keys: ["pin", "pinterest"], domains: ["pinterest.com", "pin.it"], buildUrl: buildSimpleUserUrl("https://www.pinterest.com/"), display: formatHandleDisplay },
  { id: "twitch", label: "Twitch", icon: ICONS.twitch, iconHex: "#9146ff", iconInk: "#ffffff", group: "social", keys: ["tw", "twitch"], domains: ["twitch.tv"], buildUrl: buildSimpleUserUrl("https://www.twitch.tv/"), display: formatHandleDisplay },
  { id: "bluesky", label: "Bluesky", icon: ICONS.bluesky, iconHex: "#1185fe", iconInk: "#ffffff", group: "social", keys: ["bsky", "bluesky"], domains: ["bsky.app"], buildUrl: buildSimpleUserUrl("https://bsky.app/profile/"), display: formatBlueskyDisplay },
  { id: "mastodon", label: "Mastodon", icon: ICONS.mastodon, iconHex: "#6364ff", iconInk: "#ffffff", group: "social", keys: ["md", "mastodon"], domains: ["mastodon.social", "mastodon.online", "fosstodon.org", "hachyderm.io"], buildUrl: buildMastodonUrl, display: formatMastodonDisplay },
  { id: "line", label: "LINE", icon: ICONS.line, iconHex: "#00c300", iconInk: "#ffffff", group: "social", keys: ["ln", "line"], domains: ["line.me"], buildUrl: buildLineUrl, display: formatIdentifierOrHostDisplay },
  { id: "messenger", label: "Messenger", icon: ICONS.messenger, iconHex: "#0084ff", iconInk: "#ffffff", group: "social", keys: ["msg", "messenger"], domains: ["m.me", "messenger.com"], buildUrl: buildMessengerUrl, display: formatIdentifierOrHostDisplay },
  { id: "signal", label: "Signal", icon: ICONS.signal, iconHex: "#3a76f0", iconInk: "#ffffff", group: "social", keys: ["sg", "signal"], domains: ["signal.me", "signal.group"], buildUrl: buildSignalUrl, display: formatIdentifierOrHostDisplay },
  { id: "wechat", label: "WeChat", icon: ICONS.wechat, iconHex: "#07c160", iconInk: "#ffffff", group: "social", keys: ["wc", "wechat"], domains: ["u.wechat.com", "weixin.qq.com"], buildUrl: buildWeChatUrl, display: formatIdentifierOrHostDisplay },
  { id: "viber", label: "Viber", icon: ICONS.viber, iconHex: "#7360f2", iconInk: "#ffffff", group: "social", keys: ["vb", "viber"], domains: ["viber.com"], buildUrl: buildViberUrl, display: formatIdentifierOrHostDisplay },
  { id: "tumblr", label: "Tumblr", icon: ICONS.tumblr, iconHex: "#36465d", iconInk: "#ffffff", group: "social", keys: ["tb", "tumblr"], domains: ["tumblr.com"], buildUrl: buildTumblrUrl, display: formatHandleDisplay },
  { id: "behance", label: "Behance", icon: ICONS.behance, iconHex: "#1769ff", iconInk: "#ffffff", group: "social", keys: ["bh", "behance"], domains: ["behance.net"], buildUrl: buildSimpleUserUrl("https://www.behance.net/"), display: formatHandleDisplay },
  { id: "dribbble", label: "Dribbble", icon: ICONS.dribbble, iconHex: "#ea4c89", iconInk: "#ffffff", group: "social", keys: ["db", "dribbble"], domains: ["dribbble.com"], buildUrl: buildSimpleUserUrl("https://dribbble.com/"), display: formatHandleDisplay },
  { id: "website", label: "Website", icon: ICONS.website, iconHex: "#0f766e", iconInk: "#ffffff", group: "custom", keys: ["web", "website"], domains: [], buildUrl: buildFlexibleUrl, display: formatHostDisplay },
];

const DEFAULT_PROFILE = {
  title: "My Links",
  bio: "",
  accent: "#0f766e",
  avatar: "",
};

const APP_MODES = {
  SOCIAL_HUB: "SH",
  BUSINESS_CARD: "BC",
  PAYMENT_HUB: "PH",
};

const APP_MODE_KEYS = ["app"];

// Payment Hub supports a focused set of widely used coins so the QR mode stays
// predictable and easy to document.
const PAYMENT_WALLET_DEFINITIONS = [
  { id: "btc", label: "Bitcoin", symbol: "BTC", keys: ["btc", "bitcoin"], networkKeys: ["btcn", "btcNetwork", "btc_network", "bitcoinNetwork", "bitcoin_network"], iconHex: "#f7931a", iconInk: "#111827" },
  { id: "eth", label: "Ethereum", symbol: "ETH", keys: ["eth", "ethereum"], networkKeys: ["ethn", "ethNetwork", "eth_network", "ethereumNetwork", "ethereum_network"], iconHex: "#627eea", iconInk: "#ffffff" },
  { id: "usdt", label: "Tether", symbol: "USDT", keys: ["usdt", "tether"], networkKeys: ["usdtn", "usdtNetwork", "usdt_network", "tetherNetwork", "tether_network"], iconHex: "#26a17b", iconInk: "#ffffff" },
  { id: "usdc", label: "USD Coin", symbol: "USDC", keys: ["usdc", "usdcoin"], networkKeys: ["usdcn", "usdcNetwork", "usdc_network", "usdcoinNetwork", "usdcoin_network"], iconHex: "#2775ca", iconInk: "#ffffff" },
  { id: "sol", label: "Solana", symbol: "SOL", keys: ["sol", "solana"], networkKeys: ["soln", "solNetwork", "sol_network", "solanaNetwork", "solana_network"], iconHex: "#14f195", iconInk: "#062714" },
  { id: "bnb", label: "BNB", symbol: "BNB", keys: ["bnb", "binance"], networkKeys: ["bnbn", "bnbNetwork", "bnb_network", "binanceNetwork", "binance_network"], iconHex: "#f3ba2f", iconInk: "#111827" },
  { id: "ada", label: "Cardano", symbol: "ADA", keys: ["ada", "cardano"], networkKeys: ["adan", "adaNetwork", "ada_network", "cardanoNetwork", "cardano_network"], iconHex: "#0033ad", iconInk: "#ffffff" },
  { id: "doge", label: "Dogecoin", symbol: "DOGE", keys: ["doge", "dogecoin"], networkKeys: ["dogen", "dogeNetwork", "doge_network", "dogecoinNetwork", "dogecoin_network"], iconHex: "#c2a633", iconInk: "#111827" },
  { id: "trx", label: "TRON", symbol: "TRX", keys: ["trx", "tron"], networkKeys: ["trxn", "trxNetwork", "trx_network", "tronNetwork", "tron_network"], iconHex: "#ef0027", iconInk: "#ffffff" },
  { id: "ltc", label: "Litecoin", symbol: "LTC", keys: ["ltc", "litecoin"], networkKeys: ["ltcn", "ltcNetwork", "ltc_network", "litecoinNetwork", "litecoin_network"], iconHex: "#345d9d", iconInk: "#ffffff" },
];

let activeAccentColor = DEFAULT_PROFILE.accent;

function getSearchParams() {
  return new URLSearchParams(window.location.search);
}

function getParamValue(params, keys) {
  for (const key of keys) {
    const value = params.get(key);
    if (value && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function clampText(value, maxLength) {
  if (!value) return "";
  return value.trim().slice(0, maxLength);
}

function getAppMode(params) {
  const rawMode = getParamValue(params, APP_MODE_KEYS);
  if (!rawMode) {
    throw new Error("Missing required `app` parameter. Use `app=SH`, `app=BC`, or `app=PH`.");
  }

  const normalizedMode = rawMode.toUpperCase();

  if ([
    APP_MODES.BUSINESS_CARD,
    "BUSINESSCARD",
    "BUSINESS-CARD",
    "BUSINESS_CARD",
    "VCARD",
    "CONTACT",
  ].includes(normalizedMode)) {
    return APP_MODES.BUSINESS_CARD;
  }

  if ([
    APP_MODES.PAYMENT_HUB,
    "PAYMENTHUB",
    "PAYMENT-HUB",
    "PAYMENT_HUB",
    "PAYMENTS",
    "PAYMENT",
    "PAY",
  ].includes(normalizedMode)) {
    return APP_MODES.PAYMENT_HUB;
  }

  if ([
    APP_MODES.SOCIAL_HUB,
    "SOCIALHUB",
    "SOCIAL-HUB",
    "SOCIAL_HUB",
    "SOCIAL",
    "LINKS",
  ].includes(normalizedMode)) {
    return APP_MODES.SOCIAL_HUB;
  }

  throw new Error("Invalid `app` parameter. Use `app=SH`, `app=BC`, or `app=PH`.");
}

function hasRenderableParams(params) {
  return Array.from(params.keys()).some((key) => !APP_MODE_KEYS.includes(key));
}

function parseBooleanParam(rawValue, fallback = false) {
  if (!rawValue) return fallback;

  const normalized = rawValue.trim().toLowerCase();

  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;

  return fallback;
}

function normalizeAccent(rawValue) {
  if (!rawValue) return DEFAULT_PROFILE.accent;
  const match = rawValue.trim().match(/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/);
  if (!match) return DEFAULT_PROFILE.accent;

  const expandedHex = match[1].length === 3
    ? match[1]
        .split("")
        .map((char) => `${char}${char}`)
        .join("")
    : match[1];

  return `#${expandedHex.toLowerCase()}`;
}

function hexToRgbTuple(hexColor) {
  const clean = hexColor.replace("#", "");
  const value = Number.parseInt(clean, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `${red} ${green} ${blue}`;
}

function hexToRgbObject(hexColor) {
  const clean = hexColor.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return {
    red: (value >> 16) & 255,
    green: (value >> 8) & 255,
    blue: value & 255,
  };
}

function rgbObjectToTuple(color) {
  return `${color.red} ${color.green} ${color.blue}`;
}

function rgbObjectToHex(color) {
  const toHex = (value) => value.toString(16).padStart(2, "0");
  return `#${toHex(color.red)}${toHex(color.green)}${toHex(color.blue)}`;
}

function blendHexColors(baseHex, mixHex, mixAmount) {
  const amount = Math.min(1, Math.max(0, mixAmount));
  const base = hexToRgbObject(baseHex);
  const mix = hexToRgbObject(mixHex);

  return {
    red: Math.round(base.red * (1 - amount) + mix.red * amount),
    green: Math.round(base.green * (1 - amount) + mix.green * amount),
    blue: Math.round(base.blue * (1 - amount) + mix.blue * amount),
  };
}

function getContrastingInk(hexColor) {
  const { red, green, blue } = hexToRgbObject(hexColor);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 160 ? "#111827" : "#ffffff";
}

function sanitizeHandle(rawValue) {
  if (!rawValue) return "";
  return rawValue.trim().replace(/^@+/, "").replace(/^\/+|\/+$/g, "");
}

function normalizeEmail(rawValue) {
  if (!rawValue) return "";

  const normalized = rawValue.trim().replace(/^mailto:/i, "").trim();
  if (!normalized) return "";

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : "";
}

function normalizePhoneValue(rawValue) {
  if (!rawValue) return "";

  const withoutScheme = rawValue.trim().replace(/^tel:/i, "").trim();
  if (!withoutScheme) return "";

  const hasLeadingPlus = withoutScheme.startsWith("+");
  const digits = withoutScheme.replace(/[^\d]/g, "");
  if (!digits) return "";

  return hasLeadingPlus ? `+${digits}` : digits;
}

function normalizeCompactToken(rawValue, maxLength = 180) {
  if (!rawValue) return "";
  return rawValue.trim().replace(/\s+/g, "").slice(0, maxLength);
}

function normalizeIban(rawValue) {
  const cleaned = normalizeCompactToken(rawValue, 34).toUpperCase().replace(/[^A-Z0-9]/g, "");
  return cleaned.length >= 8 ? cleaned : "";
}

function normalizeWalletAddress(rawValue) {
  return normalizeCompactToken(rawValue, 180);
}

function formatGroupedValue(value, groupSize = 4) {
  if (!value) return "";
  const pattern = new RegExp(`.{1,${groupSize}}`, "g");
  return value.match(pattern)?.join(" ") || value;
}

function formatCountLabel(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function normalizeUrl(rawValue) {
  if (!rawValue) return "";
  const trimmed = rawValue.trim();

  if (/^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.toString();
      }
    } catch (error) {
      return "";
    }
    return "";
  }

  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return "";
}

function buildDirectUrlOnly(rawValue) {
  return normalizeUrl(rawValue);
}

function buildFlexibleUrl(rawValue) {
  return normalizeUrl(rawValue);
}

function buildPayPalUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;

  const handle = sanitizeHandle(rawValue);
  if (!handle || handle.includes("@")) return "";
  return `https://paypal.me/${handle}`;
}

function buildDiscordUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;
  const code = sanitizeHandle(rawValue);
  if (!code) return "";
  return `https://discord.gg/${code}`;
}

function buildMessengerUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;
  const handle = sanitizeHandle(rawValue);
  if (!handle) return "";
  return `https://m.me/${handle}`;
}

function buildLineUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;
  const handle = sanitizeHandle(rawValue);
  if (!handle) return "";
  return `https://line.me/ti/p/${handle}`;
}

function buildSignalUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;
  const handle = sanitizeHandle(rawValue);
  if (!handle) return "";
  return `https://signal.me/#eu/${handle}`;
}

function buildViberUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;
  const code = sanitizeHandle(rawValue);
  if (!code) return "";
  return `https://invite.viber.com/?g2=${encodeURIComponent(code)}`;
}

function buildSimpleUserUrl(baseUrl) {
  return (rawValue) => {
    const directUrl = normalizeUrl(rawValue);
    if (directUrl) return directUrl;

    const handle = sanitizeHandle(rawValue);
    if (!handle) return "";
    return `${baseUrl}${handle}`;
  };
}

function buildYouTubeUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;

  const value = rawValue.trim();
  if (!value) return "";

  if (value.startsWith("@")) {
    return `https://www.youtube.com/${value}`;
  }

  if (/^(channel\/|c\/|user\/)/i.test(value)) {
    return `https://www.youtube.com/${value}`;
  }

  return `https://www.youtube.com/@${sanitizeHandle(value)}`;
}

function buildThreadsUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;

  const handle = sanitizeHandle(rawValue);
  if (!handle) return "";
  return `https://www.threads.com/@${handle}`;
}

function buildTumblrUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;

  const handle = sanitizeHandle(rawValue);
  if (!handle) return "";
  return `https://${handle}.tumblr.com`;
}

function buildWhatsAppUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;

  const digits = rawValue.replace(/[^\d]/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}`;
}

function buildMastodonUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;

  const value = rawValue.trim();
  if (!value) return "";

  const federatedHandle = value.match(/^@?([^@\s]+)@([^@\s]+)$/);
  if (federatedHandle) {
    return `https://${federatedHandle[2]}/@${federatedHandle[1]}`;
  }

  const username = sanitizeHandle(value);
  if (!username || username.includes("@")) return "";

  return `https://mastodon.social/@${username}`;
}

function buildWeChatUrl(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) return directUrl;

  const identifier = sanitizeHandle(rawValue);
  if (!identifier) return "";

  // WeChat share URLs are the safest option, but a plain WeChat ID can still
  // fall back to a mobile deep link when the app is installed.
  return `weixin://dl/chat?${encodeURIComponent(identifier)}`;
}

function formatHandleDisplay(rawValue) {
  const handle = sanitizeHandle(rawValue);
  return handle ? `@${handle}` : "";
}

function formatYouTubeDisplay(rawValue) {
  if (normalizeUrl(rawValue)) {
    return formatHostDisplay(rawValue);
  }
  if (rawValue.trim().startsWith("@")) {
    return rawValue.trim();
  }
  return `@${sanitizeHandle(rawValue)}`;
}

function formatPhoneDisplay(rawValue) {
  const digits = normalizePhoneValue(rawValue);
  return digits || formatHostDisplay(rawValue);
}

function formatBlueskyDisplay(rawValue) {
  const value = sanitizeHandle(rawValue);
  if (!value) return "";
  return value.includes(".") ? value : `@${value}`;
}

function formatMastodonDisplay(rawValue) {
  if (normalizeUrl(rawValue)) {
    return formatHostDisplay(rawValue);
  }

  const value = rawValue.trim();
  if (!value) return "";

  if (/^@?[^@\s]+@[^@\s]+$/.test(value)) {
    return value.startsWith("@") ? value : `@${value}`;
  }

  const username = sanitizeHandle(value);
  return username ? `@${username}` : "";
}

function formatIdentifierOrHostDisplay(rawValue) {
  if (normalizeUrl(rawValue)) {
    return formatHostDisplay(rawValue);
  }

  return sanitizeHandle(rawValue);
}

function formatHostDisplay(rawValue) {
  const normalized = normalizeUrl(rawValue);
  if (!normalized) return "";

  try {
    const url = new URL(normalized);
    if (url.protocol === "mailto:" || url.protocol === "tel:") {
      return url.pathname;
    }
    return url.hostname.replace(/^www\./, "");
  } catch (error) {
    return rawValue.trim();
  }
}

function formatPayPalDisplay(rawValue) {
  const directUrl = normalizeUrl(rawValue);
  if (directUrl) {
    return formatCompactUrlDisplay(directUrl);
  }

  const handle = sanitizeHandle(rawValue);
  return handle ? `paypal.me/${handle}` : "";
}

function buildCustomLinks(
  params,
  {
    group = "custom",
    idPrefix = "custom",
    defaultIcon = ICONS.website,
    defaultIconHex = "#0f766e",
    defaultIconInk = "#ffffff",
  } = {}
) {
  const links = [];

  for (let index = 1; index <= 8; index += 1) {
    const href = normalizeUrl(
      getParamValue(params, [`c${index}`, `c${index}u`, `custom${index}_url`, `custom${index}Url`])
    );
    if (!href) continue;

    const label = clampText(
      getParamValue(params, [`c${index}l`, `custom${index}_label`, `custom${index}Label`]) || `Custom Link ${index}`,
      40
    );

    const iconHint = sanitizeHandle(
      getParamValue(params, [`c${index}i`, `custom${index}_icon`, `custom${index}Icon`])
    ).toLowerCase();
    const customPlatform = resolveCustomPlatform(iconHint) || resolvePlatformFromUrl(href);

    links.push({
      id: `${idPrefix}-${index}`,
      label,
      caption: formatHostDisplay(href),
      href,
      icon: customPlatform?.icon || defaultIcon,
      iconHex: customPlatform?.iconHex || defaultIconHex,
      iconInk: customPlatform?.iconInk || defaultIconInk,
      group,
      isCustom: true,
    });
  }

  return links;
}

function buildProfileLinks(params) {
  const links = [];

  for (const platform of PLATFORM_DEFINITIONS) {
    const rawValue = getParamValue(params, platform.keys);
    if (!rawValue) continue;

    const href = platform.buildUrl(rawValue);
    if (!href) continue;

    const customLabel = platform.id === "website"
      ? getParamValue(params, ["web_label", "website_label", "webLabel", "websiteLabel", "wl"])
      : "";

    links.push({
      id: platform.id,
      label: customLabel || platform.label,
      caption: platform.display ? platform.display(rawValue) : "",
      href,
      icon: platform.icon,
      iconHex: platform.iconHex || "",
      iconInk: platform.iconInk || "",
      group: platform.group,
      isCustom: platform.group === "custom",
    });
  }

  links.push(...buildCustomLinks(params));
  return links;
}

function resolveCustomPlatform(iconHint) {
  if (!iconHint) return null;

  return PLATFORM_DEFINITIONS.find(
    (item) => item.id === iconHint || item.keys.includes(iconHint)
  );
}

function resolvePlatformFromUrl(href) {
  if (!href) return null;

  let hostname;
  try {
    hostname = new URL(href).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }

  return PLATFORM_DEFINITIONS.find((platform) =>
    platform.domains?.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    )
  ) ?? null;
}

function composeDisplayName(firstName, lastName, fullName = "") {
  const combinedName = [firstName, lastName].filter(Boolean).join(" ").trim();
  return combinedName || fullName;
}

function buildBusinessHeadline(jobTitle, company) {
  if (jobTitle && company) return `${jobTitle} at ${company}`;
  return jobTitle || company;
}

function buildBusinessCardDetailItems(contact) {
  const items = [];

  if (contact.firstName) items.push({ label: "First name", value: contact.firstName });
  if (contact.lastName) items.push({ label: "Last name", value: contact.lastName });

  if (!items.length && contact.displayName) {
    items.push({ label: "Name", value: contact.displayName });
  }

  if (contact.jobTitle) items.push({ label: "Job title", value: contact.jobTitle });
  if (contact.company) items.push({ label: "Company", value: contact.company });

  return items;
}

function escapeVCardValue(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

// Generate the downloadable vCard in one place so the QR page and saved contact stay in sync.
function buildVCardText(contact) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "PRODID:-//HusoftTech//Scanely//EN",
  ];

  if (contact.firstName || contact.lastName) {
    lines.push(`N:${escapeVCardValue(contact.lastName)};${escapeVCardValue(contact.firstName)};;;`);
  }

  if (contact.displayName) lines.push(`FN:${escapeVCardValue(contact.displayName)}`);
  if (contact.jobTitle) lines.push(`TITLE:${escapeVCardValue(contact.jobTitle)}`);
  if (contact.company) lines.push(`ORG:${escapeVCardValue(contact.company)}`);
  if (contact.phone) lines.push(`TEL;TYPE=CELL:${escapeVCardValue(contact.phone)}`);
  if (contact.email) lines.push(`EMAIL:${escapeVCardValue(contact.email)}`);
  if (contact.website) lines.push(`URL:${contact.website}`);
  if (contact.linkedin) lines.push(`URL;TYPE=linkedin:${contact.linkedin}`);

  lines.push("END:VCARD");
  return `${lines.join("\r\n")}\r\n`;
}

function buildBusinessCardLinks(contact, params = new URLSearchParams()) {
  const links = [];

  if (contact.phone) {
    links.push({
      id: "phone",
      label: "Call",
      caption: contact.phone,
      href: `tel:${contact.phone}`,
      icon: "phone",
      iconHex: "#0f766e",
      iconInk: "#ffffff",
      group: "contact",
      isCustom: false,
    });
  }

  if (contact.email) {
    links.push({
      id: "email",
      label: "Email",
      caption: contact.email,
      href: `mailto:${contact.email}`,
      icon: "mail",
      iconHex: "#0f766e",
      iconInk: "#ffffff",
      group: "contact",
      isCustom: false,
    });
  }

  if (contact.website) {
    links.push({
      id: "website",
      label: "Website",
      caption: formatHostDisplay(contact.website),
      href: contact.website,
      icon: "globe",
      iconHex: "#0f766e",
      iconInk: "#ffffff",
      group: "contact",
      isCustom: false,
    });
  }

  if (contact.linkedin) {
    links.push({
      id: "linkedin",
      label: "LinkedIn",
      caption: formatHostDisplay(contact.linkedin),
      href: contact.linkedin,
      icon: "linkedin",
      iconHex: "#0f766e",
      iconInk: "#ffffff",
      group: "contact",
      isCustom: false,
    });
  }

  links.push(
    ...buildCustomLinks(params, {
      group: "custom",
      idPrefix: "contact-custom",
      defaultIcon: ICONS.website,
      defaultIconHex: "#0f766e",
      defaultIconInk: "#ffffff",
    })
  );

  return links;
}

function buildPaymentHubLinks(params) {
  const links = [];
  const signatures = new Set();

  const pushLink = (link) => {
    if (!link?.href) return;
    const signature = [link.label || "", link.href || "", link.caption || ""].join("|");
    if (signatures.has(signature)) return;
    signatures.add(signature);
    links.push(link);
  };

  const getPaymentOnlineFieldKeys = (field, index = 0) => {
    const suffix = index > 0 ? String(index) : "";

    if (field === "paypal") {
      return index > 0
        ? [`pp${suffix}`, `paypal${suffix}`, `paypalUrl${suffix}`, `paypal_url${suffix}`]
        : ["pp", "paypal", "paypalUrl", "paypal_url"];
    }

    if (field === "paymentLink") {
      return index > 0
        ? [
            `pl${suffix}`,
            `paymentLink${suffix}`,
            `payment_link${suffix}`,
            `payLink${suffix}`,
            `pay_link${suffix}`,
            `checkout${suffix}`,
            `checkoutUrl${suffix}`,
          ]
        : ["pl", "paymentLink", "payment_link", "payLink", "pay_link", "checkout", "checkoutUrl"];
    }

    if (field === "paymentLinkLabel") {
      return index > 0
        ? [
            `pll${suffix}`,
            `paymentLinkLabel${suffix}`,
            `payment_link_label${suffix}`,
            `payLabel${suffix}`,
            `pay_label${suffix}`,
          ]
        : ["pll", "paymentLinkLabel", "payment_link_label", "payLabel", "pay_label"];
    }

    return [];
  };

  const buildPayPalLink = (index = 0) => {
    const paypalRaw = getParamValue(params, getPaymentOnlineFieldKeys("paypal", index));
    const paypalHref = buildPayPalUrl(paypalRaw);
    if (!paypalHref) return null;

    return {
      id: index > 0 ? `paypal-${index}` : "paypal",
      label: "PayPal",
      caption: formatPayPalDisplay(paypalRaw) || "paypal.me",
      href: paypalHref,
      icon: "paypal",
      iconHex: "#003087",
      iconInk: "#ffffff",
      group: "online",
      isCustom: false,
    };
  };

  const buildPaymentLink = (index = 0) => {
    const paymentLink = normalizeUrl(
      getParamValue(params, getPaymentOnlineFieldKeys("paymentLink", index))
    );
    if (!paymentLink) return null;

    return {
      id: index > 0 ? `payment-link-${index}` : "payment-link",
      label: clampText(
        getParamValue(params, getPaymentOnlineFieldKeys("paymentLinkLabel", index)),
        32
      ) || "Payment Link",
      caption: formatCompactUrlDisplay(paymentLink),
      href: paymentLink,
      icon: "link",
      iconHex: "#0f766e",
      iconInk: "#ffffff",
      group: "online",
      isCustom: false,
    };
  };

  pushLink(buildPayPalLink(0));
  pushLink(buildPaymentLink(0));

  for (let index = 1; index <= 8; index += 1) {
    pushLink(buildPayPalLink(index));
    pushLink(buildPaymentLink(index));
  }

  return links;
}

function buildCryptoWallets(params) {
  const wallets = [];
  const signatures = new Set();

  const withSuffix = (keys = [], index = 0) => {
    if (index === 0) return keys;
    return keys.map((key) => `${key}${index}`);
  };

  const pushWallet = (wallet) => {
    if (!wallet?.address) return;
    const signature = [wallet.id, wallet.address, wallet.network || ""].join("|");
    if (signatures.has(signature)) return;
    signatures.add(signature);
    wallets.push(wallet);
  };

  PAYMENT_WALLET_DEFINITIONS.forEach((wallet) => {
    const buildWalletEntry = (index = 0) => {
      const address = normalizeWalletAddress(getParamValue(params, withSuffix(wallet.keys, index)));
      if (!address) return null;

      return {
        id: index > 0 ? `${wallet.id}-${index}` : wallet.id,
        label: wallet.label,
        symbol: wallet.symbol,
        address,
        network: clampText(getParamValue(params, withSuffix(wallet.networkKeys, index)), 24),
        iconHex: wallet.iconHex,
        iconInk: wallet.iconInk,
        feedbackMessage: `${wallet.symbol} address copied.`,
      };
    };

    pushWallet(buildWalletEntry(0));

    for (let index = 1; index <= 8; index += 1) {
      pushWallet(buildWalletEntry(index));
    }
  });

  return wallets;
}

function buildPaymentBankAccount({
  id = "",
  index = 0,
  bankName = "",
  iban = "",
  accountNumber = "",
  routingCode = "",
} = {}) {
  if (!bankName && !iban && !accountNumber && !routingCode) return null;

  return {
    id: id || `bank-${index + 1}`,
    index,
    title: bankName,
    bankName,
    iban,
    accountNumber,
    routingCode,
    primaryCopy: iban
      ? {
          label: "Copy IBAN",
          copyValue: iban,
          feedbackMessage: "IBAN copied.",
        }
      : accountNumber
        ? {
            label: "Copy Account",
            copyValue: accountNumber,
            feedbackMessage: "Account number copied.",
          }
        : routingCode
          ? {
              label: "Copy Routing Number/Bank Code",
              copyValue: routingCode,
              feedbackMessage: "Routing Number/Bank Code copied.",
            }
        : null,
  };
}

function getPaymentBankFieldKeys(field, index = 0) {
  const suffix = index > 0 ? String(index) : "";

  if (field === "bankName") {
    return index > 0
      ? [`bn${suffix}`, `bank${suffix}`, `bankName${suffix}`, `bank_name${suffix}`]
      : ["bn", "bank", "bankName", "bank_name"];
  }

  if (field === "iban") {
    return index > 0
      ? [`ib${suffix}`, `iban${suffix}`]
      : ["ib", "iban"];
  }

  if (field === "accountNumber") {
    return index > 0
      ? [`an${suffix}`, `account${suffix}`, `accountNumber${suffix}`, `account_number${suffix}`, `acct${suffix}`]
      : ["an", "account", "accountNumber", "account_number", "acct"];
  }

  if (field === "routingCode") {
    return index > 0
      ? [
          `rc${suffix}`,
          `rn${suffix}`,
          `bc${suffix}`,
          `routing${suffix}`,
          `routingCode${suffix}`,
          `routingNumber${suffix}`,
          `routing_number${suffix}`,
          `bankCode${suffix}`,
          `bank_code${suffix}`,
        ]
      : [
          "rc",
          "rn",
          "bc",
          "routing",
          "routingCode",
          "routingNumber",
          "routing_number",
          "bankCode",
          "bank_code",
        ];
  }

  return [];
}

function buildPaymentBankAccountFromParams(params, index = 0) {
  const bankName = clampText(
    getParamValue(params, getPaymentBankFieldKeys("bankName", index)),
    60
  );
  const iban = normalizeIban(getParamValue(params, getPaymentBankFieldKeys("iban", index)));
  const accountNumber = clampText(
    getParamValue(params, getPaymentBankFieldKeys("accountNumber", index)).replace(/\s+/g, " "),
    50
  );
  const routingCode = clampText(
    getParamValue(params, getPaymentBankFieldKeys("routingCode", index)).replace(/\s+/g, " "),
    40
  );

  return buildPaymentBankAccount({
    id: index > 0 ? `bank-${index}` : "bank-primary",
    index: index > 0 ? index - 1 : 0,
    bankName,
    iban,
    accountNumber,
    routingCode,
  });
}

function getPaymentBankAccountSignature(account) {
  return [
    account?.bankName?.toLowerCase() || "",
    account?.iban || "",
    account?.accountNumber || "",
    account?.routingCode || "",
  ].join("|");
}

function buildPaymentBankAccounts(params) {
  const accounts = [];
  const signatures = new Set();

  const pushAccount = (account) => {
    if (!account) return;

    const signature = getPaymentBankAccountSignature(account);
    if (signatures.has(signature)) return;

    signatures.add(signature);
    accounts.push(account);
  };

  pushAccount(buildPaymentBankAccountFromParams(params, 0));

  for (let index = 1; index <= 8; index += 1) {
    pushAccount(buildPaymentBankAccountFromParams(params, index));
  }

  return accounts;
}

function buildPaymentPrimaryCopy(payment) {
  if (payment.bankAccounts?.length) {
    return null;
  }

  if (payment.cryptoWallets?.length === 1) {
    const firstWallet = payment.cryptoWallets[0];
    return {
      label: `Copy ${firstWallet.symbol}`,
      copyValue: firstWallet.address,
      feedbackMessage: firstWallet.feedbackMessage,
    };
  }

  return null;
}

function buildSharedProfileSettings(params) {
  return {
    isPro: parseBooleanParam(getParamValue(params, ["isPro", "pro", "is_pro"]), false),
    accent: normalizeAccent(getParamValue(params, ["ac", "accent", "accentColor", "color"])),
    avatar: normalizeUrl(getParamValue(params, ["a", "avatar", "image", "avatarUrl", "imageUrl"])),
  };
}

function buildSocialHubConfig(params) {
  return {
    appMode: APP_MODES.SOCIAL_HUB,
    mode: "live",
    title: clampText(getParamValue(params, ["t", "title"]), 60) || DEFAULT_PROFILE.title,
    bio: clampText(getParamValue(params, ["b", "bio", "subtitle", "description"]), 180),
    links: buildProfileLinks(params),
    ...buildSharedProfileSettings(params),
  };
}

function buildBusinessCardConfig(params) {
  const firstName = clampText(
    getParamValue(params, ["fn", "first", "firstName", "first_name", "given", "givenName"]),
    40
  );
  const lastName = clampText(
    getParamValue(params, ["ln", "last", "lastName", "last_name", "surname", "family", "familyName"]),
    40
  );
  const fullName = clampText(getParamValue(params, ["name", "fullName", "full_name"]), 60);
  const jobTitle = clampText(
    getParamValue(params, ["jt", "jobTitle", "job_title", "job", "role", "title"]),
    60
  );
  const company = clampText(getParamValue(params, ["co", "company", "org", "organization"]), 60);
  const phone = normalizePhoneValue(getParamValue(params, ["ph", "phone", "tel", "mobile"]));
  const email = normalizeEmail(getParamValue(params, ["em", "email", "mail"]));
  const website = normalizeUrl(getParamValue(params, ["web", "website", "url"]));
  const linkedin = normalizeUrl(
    getParamValue(params, ["li", "linkedin", "linkedinUrl", "linkedin_url"])
  );
  const displayName = composeDisplayName(firstName, lastName, fullName) || company || "Business Card";
  const contact = {
    displayName,
    firstName,
    lastName,
    jobTitle,
    company,
    phone,
    email,
    website,
    linkedin,
  };

  return {
    appMode: APP_MODES.BUSINESS_CARD,
    mode: "live",
    title: displayName,
    bio: clampText(getParamValue(params, ["b", "bio", "subtitle", "description", "note"]), 180)
      || buildBusinessHeadline(jobTitle, company),
    links: buildBusinessCardLinks(contact, params),
    contact: {
      ...contact,
      detailItems: buildBusinessCardDetailItems(contact),
      vcard: buildVCardText(contact),
    },
    ...buildSharedProfileSettings(params),
  };
}

function buildPaymentHubConfig(params) {
  const bankAccounts = buildPaymentBankAccounts(params);
  const cryptoWallets = buildCryptoWallets(params);
  const payment = {
    bankAccounts,
    cryptoWallets,
  };

  return {
    appMode: APP_MODES.PAYMENT_HUB,
    mode: "live",
    title: clampText(getParamValue(params, ["t", "title"]), 60) || "Payment Hub",
    bio: clampText(getParamValue(params, ["b", "bio", "subtitle", "description"]), 180)
      || "Choose the payment method that works best for you.",
    links: buildPaymentHubLinks(params),
    payment: {
      ...payment,
      primaryCopy: buildPaymentPrimaryCopy(payment),
    },
    ...buildSharedProfileSettings(params),
  };
}

function buildProfileConfig() {
  const params = getSearchParams();
  const appMode = getAppMode(params);

  if (!hasRenderableParams(params)) {
    return buildPreviewConfig(appMode, params);
  }

  if (appMode === APP_MODES.BUSINESS_CARD) {
    return buildBusinessCardConfig(params);
  }

  if (appMode === APP_MODES.PAYMENT_HUB) {
    return buildPaymentHubConfig(params);
  }

  return buildSocialHubConfig(params);
}

function buildPreviewConfig(appMode = APP_MODES.SOCIAL_HUB, params = new URLSearchParams()) {
  if (appMode === APP_MODES.PAYMENT_HUB) {
    const previewParams = new URLSearchParams(
      "bn=Garanti%20BBVA&ib=TR330006100519786457841326&an=458741326&rc=610005&bn1=Akbank&ib1=TR120006200019876543210987&an1=198765432109&rc1=0001987&pp=husofttech&pp1=husofttech.global&pl=https%3A%2F%2Fbuy.stripe.com%2Ftest_4gw7vKgYw4example&pll=Checkout&pl1=https%3A%2F%2Fexample.com%2Finvoice%2F4587&pll1=Invoice&btc=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh&btc1=bc1q8example9secondarywallet0z7k2n3m4p5q6r7s8t&eth=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&eth1=0x1111111254EEB25477B68fb85Ed929f73A960582&usdt=TQn9Y2o5Qh9mP7tLYTexampleTron&usdtn=TRC20&usdt1=0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&usdtn1=ERC20&sol=9xQeWvG816bUx9EPmexampleSolanaWallet&bnb=0x6F46CF5569aefa1Acc1009290c8E043747172d89"
    );
    const bankAccounts = buildPaymentBankAccounts(previewParams);
    const cryptoWallets = buildCryptoWallets(previewParams);
    const payment = {
      bankAccounts,
      cryptoWallets,
    };

    return {
      appMode: APP_MODES.PAYMENT_HUB,
      mode: "preview",
      title: "HusoftTech Payments",
      bio: "Choose bank transfer, hosted checkout, or crypto wallet payment.",
      links: buildPaymentHubLinks(previewParams),
      payment: {
        ...payment,
        primaryCopy: buildPaymentPrimaryCopy(payment),
      },
      ...buildSharedProfileSettings(params),
    };
  }

  if (appMode === APP_MODES.BUSINESS_CARD) {
    const previewParams = new URLSearchParams(
      "c1=https%3A%2F%2Fportfolio.example.com&c1l=Portfolio&c2=https%3A%2F%2Fcal.example.com&c2l=Book%20a%20Call"
    );
    const previewContact = {
      displayName: "Alex Carter",
      firstName: "Alex",
      lastName: "Carter",
      jobTitle: "iOS Product Designer",
      company: "HusoftTech",
      phone: "+905551112233",
      email: "alex@husofttech.com",
      website: "https://husofttech.com",
      linkedin: "https://www.linkedin.com/in/alexcarter",
    };

    return {
      appMode: APP_MODES.BUSINESS_CARD,
      mode: "preview",
      title: previewContact.displayName,
      bio: buildBusinessHeadline(previewContact.jobTitle, previewContact.company),
      links: buildBusinessCardLinks(previewContact, previewParams),
      contact: {
        ...previewContact,
        detailItems: buildBusinessCardDetailItems(previewContact),
        vcard: buildVCardText(previewContact),
      },
      ...buildSharedProfileSettings(params),
    };
  }

  return {
    appMode: APP_MODES.SOCIAL_HUB,
    mode: "preview",
    title: "My Link Tree",
    bio: "Tap any link to open it.",
    links: [
      { id: "instagram", label: "Instagram", caption: "@husofttech", href: "https://www.instagram.com/husofttech", icon: ICONS.instagram, iconHex: "#e4405f", iconInk: "#ffffff", group: "social", isCustom: false },
      { id: "x", label: "X", caption: "@husofttech", href: "https://x.com/husofttech", icon: ICONS.x, iconHex: "#0f172a", iconInk: "#ffffff", group: "social", isCustom: false },
      { id: "youtube", label: "YouTube", caption: "@husofttech", href: "https://www.youtube.com/@husofttech", icon: ICONS.youtube, iconHex: "#ff0033", iconInk: "#ffffff", group: "social", isCustom: false },
      { id: "website", label: "Website", caption: "husofttech.com", href: "https://husofttech.com", icon: ICONS.website, iconHex: "#0f766e", iconInk: "#ffffff", group: "custom", isCustom: true },
      { id: "custom-1", label: "Portfolio", caption: "portfolio.example.com", href: "https://portfolio.example.com", icon: ICONS.website, iconHex: "#0f766e", iconInk: "#ffffff", group: "custom", isCustom: true },
    ],
    ...buildSharedProfileSettings(params),
  };
}

function setPageMetadata(profile) {
  const pageType = profile.appMode === APP_MODES.BUSINESS_CARD
    ? "Business Card"
    : profile.appMode === APP_MODES.PAYMENT_HUB
      ? "Payment Hub"
      : "Social Hub";
  const title = `${profile.title} | Scanely ${pageType}`;
  const description = profile.bio
    || (profile.appMode === APP_MODES.BUSINESS_CARD
      ? "Open this Scanely business card."
      : profile.appMode === APP_MODES.PAYMENT_HUB
        ? "Open this Scanely payment hub."
        : "Open this Scanely social hub.");
  const image = profile.avatar || "https://husofttech.com/assets/apps/scanely/scanely-qr-logo.png";
  const currentUrl = window.location.href;

  document.title = title;

  if (pageDescription) pageDescription.setAttribute("content", description);
  if (pageOgTitle) pageOgTitle.setAttribute("content", title);
  if (pageOgDescription) pageOgDescription.setAttribute("content", description);
  if (pageOgUrl) pageOgUrl.setAttribute("content", currentUrl);
  if (pageOgImage) pageOgImage.setAttribute("content", image);
  if (pageTwitterTitle) pageTwitterTitle.setAttribute("content", title);
  if (pageTwitterDescription) pageTwitterDescription.setAttribute("content", description);
  if (pageTwitterImage) pageTwitterImage.setAttribute("content", image);
  if (pageCanonical) pageCanonical.setAttribute("href", currentUrl);
}

function syncThemeColorMeta(theme = getActiveTheme(), accent = activeAccentColor) {
  if (!pageThemeColor) return;

  const browserColor = theme === "dark"
    ? rgbObjectToHex(blendHexColors(accent, "#08111f", 0.42))
    : rgbObjectToHex(blendHexColors(accent, "#ffffff", 0.76));

  pageThemeColor.setAttribute("content", browserColor);
}

function applyAccentColor(hexColor) {
  const softAccent = blendHexColors(hexColor, "#ffffff", 0.64);
  const mistAccent = blendHexColors(hexColor, "#ffffff", 0.82);
  const deepAccent = blendHexColors(hexColor, "#08111f", 0.26);
  const skyAccent = blendHexColors(hexColor, "#9fdcff", 0.46);
  const bloomAccent = blendHexColors(hexColor, "#ffd1b0", 0.54);

  activeAccentColor = hexColor;
  document.documentElement.style.setProperty("--scanely-accent", hexColor);
  document.documentElement.style.setProperty("--scanely-accent-rgb", hexToRgbTuple(hexColor));
  document.documentElement.style.setProperty("--scanely-accent-soft-rgb", rgbObjectToTuple(softAccent));
  document.documentElement.style.setProperty("--scanely-accent-mist-rgb", rgbObjectToTuple(mistAccent));
  document.documentElement.style.setProperty("--scanely-accent-deep-rgb", rgbObjectToTuple(deepAccent));
  document.documentElement.style.setProperty("--scanely-accent-sky-rgb", rgbObjectToTuple(skyAccent));
  document.documentElement.style.setProperty("--scanely-accent-bloom-rgb", rgbObjectToTuple(bloomAccent));
  syncThemeColorMeta();
}

function getSystemTheme() {
  if (typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getSavedTheme() {
  try {
    const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return theme === "light" || theme === "dark" ? theme : "";
  } catch (error) {
    return "";
  }
}

function getActiveTheme() {
  return rootElement.dataset.theme || getSavedTheme() || getSystemTheme();
}

function applyTheme(theme, persist = true) {
  rootElement.dataset.theme = theme;

  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage failures and keep the current theme in memory.
    }
  }

  syncThemeButtons(theme);
  syncThemeColorMeta(theme);
}

function getInitials(value) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("") || "S";
}

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (typeof textContent === "string") element.textContent = textContent;
  return element;
}

function createIconMarkup(name) {
  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>',
    bank: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 9 12 4l8.5 5"></path><path d="M5 10.5h14"></path><path d="M6.5 10.5V18"></path><path d="M10 10.5V18"></path><path d="M14 10.5V18"></path><path d="M17.5 10.5V18"></path><path d="M4 20h16"></path></svg>',
    card: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"></rect><path d="M3.5 10h17"></path><path d="M7.5 14.5h3"></path></svg>',
    coin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="7.5" ry="8.5"></ellipse><path d="M9.5 9.5c.6-.8 1.5-1.3 2.6-1.3 1.6 0 2.9 1 2.9 2.4 0 1.2-.8 1.9-2.5 2.3l-1.1.3c-1.4.3-2.1.9-2.1 2 0 1.4 1.2 2.4 2.9 2.4 1.2 0 2.2-.5 2.8-1.4"></path></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12 16 8"></path><path d="M8 12 16 16"></path><circle cx="6" cy="12" r="2.5"></circle><circle cx="18" cy="8" r="2.5"></circle><circle cx="18" cy="16" r="2.5"></circle></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="10" height="10" rx="2"></rect><path d="M5 15V7a2 2 0 0 1 2-2h8"></path></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v10"></path><path d="m8 10 4 4 4-4"></path><path d="M4.5 18.5h15"></path></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 13.5 13.5 10.5"></path><path d="M7.8 16.2a3 3 0 0 1 0-4.2l2.5-2.5a3 3 0 0 1 4.2 0"></path><path d="M16.2 7.8a3 3 0 0 1 0 4.2l-2.5 2.5a3 3 0 0 1-4.2 0"></path></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2.75v2.5"></path><path d="M12 18.75v2.5"></path><path d="m4.93 4.93 1.77 1.77"></path><path d="m17.3 17.3 1.77 1.77"></path><path d="M2.75 12h2.5"></path><path d="M18.75 12h2.5"></path><path d="m4.93 19.07 1.77-1.77"></path><path d="m17.3 6.7 1.77-1.77"></path></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.3 15.1A8.8 8.8 0 0 1 8.9 3.7a8.8 8.8 0 1 0 11.4 11.4Z"></path></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"></circle><path d="M3.8 9.2h16.4"></path><path d="M3.8 14.8h16.4"></path><path d="M12 3.5c2.5 2.2 4 5.3 4 8.5s-1.5 6.3-4 8.5c-2.5-2.2-4-5.3-4-8.5s1.5-6.3 4-8.5Z"></path></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.7 4.8c.6-.6 1.6-.6 2.2 0l1.7 1.7c.6.6.6 1.5.2 2.2l-1.2 1.8a14.3 14.3 0 0 0 4.8 4.8l1.8-1.2c.7-.5 1.7-.4 2.2.2l1.7 1.7c.6.6.6 1.6 0 2.2l-1.1 1.1c-.8.8-2 1.1-3.1.8-2.3-.7-4.5-2-6.4-3.9-1.9-1.9-3.2-4.1-3.9-6.4-.3-1.1 0-2.3.8-3.1z"></path></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"></rect><path d="m4.5 7 7.5 6 7.5-6"></path></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="3.5"></rect><circle cx="8.1" cy="8.1" r="0.9" fill="currentColor" stroke="none"></circle><path d="M8.1 10.5v5.4"></path><path d="M11.9 15.9v-3"></path><path d="M11.9 12.9c0-1.3.9-2.4 2.2-2.4s2.1 1 2.1 2.5v2.9"></path><path d="M16.2 12.9v3"></path></svg>',
    paypal: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19.5 9.2 5.5h5.4c2.7 0 4.4 1.4 4.4 3.7 0 2.6-1.9 4.4-4.9 4.4h-3.3"></path><path d="M5 19.5h4.4"></path><path d="M8.8 13.6h3c2.2 0 3.7 1 3.7 3 0 2.1-1.6 3.4-4.1 3.4H8.7"></path></svg>',
    briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="7" width="17" height="11.5" rx="2"></rect><path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7"></path><path d="M3.5 11.5h17"></path></svg>',
    building: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20V6.5A1.5 1.5 0 0 1 6.5 5H13v15"></path><path d="M13 9.5h4.5A1.5 1.5 0 0 1 19 11v9"></path><path d="M9 9h.01"></path><path d="M9 12.5h.01"></path><path d="M9 16h.01"></path><path d="M16 13.5h.01"></path><path d="M16 17h.01"></path><path d="M3.5 20.5h17"></path></svg>',
    grid: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="2"></rect><rect x="13" y="3" width="8" height="8" rx="2"></rect><rect x="3" y="13" width="8" height="8" rx="2"></rect><rect x="13" y="13" width="8" height="8" rx="2"></rect></svg>',
    social: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 7a3 3 0 1 0-2.9-3.8L8.4 6.5a3 3 0 1 0 0 11l5.7 3.3A3 3 0 1 0 17 17a3 3 0 0 0-.4 1.5l-5.7-3.3a3 3 0 0 0 0-6.4l5.7-3.3A3 3 0 0 0 17 7Z"></path></svg>',
    custom: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 13.5 13.5 10.5"></path><path d="M7.8 16.2a3 3 0 0 1 0-4.2l2.5-2.5a3 3 0 0 1 4.2 0"></path><path d="M16.2 7.8a3 3 0 0 1 0 4.2l-2.5 2.5a3 3 0 0 1-4.2 0"></path></svg>',
    wallet: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v1.5"></path><path d="M4 8.5h14a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5z"></path><path d="M15.5 13h4"></path><circle cx="15.5" cy="13" r="0.9" fill="currentColor" stroke="none"></circle></svg>',
  };

  return icons[name] || icons.globe;
}

function createDecorativeIcon(name, className) {
  const wrapper = createElement("span", className);
  wrapper.setAttribute("aria-hidden", "true");
  wrapper.innerHTML = createIconMarkup(name);
  return wrapper;
}

function getInlineIconsMap() {
  const icons = window.SCANELY_INLINE_ICONS;
  return icons && typeof icons === "object" ? icons : {};
}

function getIconKeyFromPath(iconPath) {
  if (!iconPath || typeof iconPath !== "string") return "";

  const match = iconPath.match(/social-([a-z0-9-]+)\.imageset\/social-\1\.svg$/i);
  return match ? match[1].toLowerCase() : "";
}

function normalizeInlineSvgColors(svgElement) {
  if (!svgElement) return;

  const shapeSelectors = "path, circle, rect, line, polyline, polygon, ellipse";
  const shapes = svgElement.querySelectorAll(shapeSelectors);

  shapes.forEach((shape) => {
    const ownFill = shape.getAttribute("fill");
    const ownStroke = shape.getAttribute("stroke");
    const inheritedFill = findInheritedSvgAttribute(shape, "fill");
    const inheritedStroke = findInheritedSvgAttribute(shape, "stroke");

    const effectiveFill = ownFill ?? inheritedFill;
    const effectiveStroke = ownStroke ?? inheritedStroke;

    if (effectiveFill && effectiveFill.toLowerCase() === "none") {
      shape.setAttribute("fill", "none");
    } else if (effectiveFill) {
      shape.setAttribute("fill", "currentColor");
    }

    if (effectiveStroke && effectiveStroke.toLowerCase() === "none") {
      shape.setAttribute("stroke", "none");
    } else if (effectiveStroke) {
      shape.setAttribute("stroke", "currentColor");
    }

    if (!effectiveFill && !effectiveStroke) {
      shape.setAttribute("fill", "currentColor");
    }
  });
}

function findInheritedSvgAttribute(element, attributeName) {
  let current = element;

  while (current && current instanceof Element) {
    if (current.hasAttribute(attributeName)) {
      return current.getAttribute(attributeName);
    }
    current = current.parentElement;
  }

  return "";
}

function createInlinePlatformIcon(iconKey, className) {
  const iconMarkup = getInlineIconsMap()[iconKey];
  if (!iconMarkup) return null;

  const wrapper = createElement("span", className);
  wrapper.setAttribute("aria-hidden", "true");
  wrapper.innerHTML = `<span class="link-card__glyph link-card__glyph--inline">${iconMarkup}</span>`;

  const svgElement = wrapper.querySelector("svg");
  if (svgElement) {
    normalizeInlineSvgColors(svgElement);
    svgElement.setAttribute("aria-hidden", "true");
    svgElement.setAttribute("focusable", "false");
  }

  return wrapper;
}

function createPlatformIcon(iconPath, label, className) {
  const decorativeIconNames = [
    "bank",
    "card",
    "coin",
    "globe",
    "link",
    "mail",
    "paypal",
    "phone",
    "linkedin",
    "briefcase",
    "building",
    "wallet",
  ];

  if (decorativeIconNames.includes(iconPath)) {
    const wrapper = createElement("span", className);
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.innerHTML = `<span class="link-card__glyph link-card__glyph--svg">${createIconMarkup(iconPath)}</span>`;
    return wrapper;
  }

  const inlineIcon = createInlinePlatformIcon(getIconKeyFromPath(iconPath), className);
  if (inlineIcon) {
    return inlineIcon;
  }

  const wrapper = createElement("span", className);
  wrapper.setAttribute("aria-hidden", "true");
  const image = document.createElement("img");
  image.className = "link-card__icon-image";
  image.src = iconPath;
  image.alt = `${label} icon`;
  image.loading = "lazy";
  wrapper.appendChild(image);
  return wrapper;
}

function applyLinkIconPalette(element, link) {
  if (!element) return;

  const iconHex = link.themeHex || link.iconHex || "#0f766e";
  const iconInk = link.themeInk || link.iconInk || getContrastingInk(iconHex);
  const iconFilter = iconInk.toLowerCase() === "#ffffff" ? "brightness(0) invert(1)" : "none";

  element.style.setProperty("--link-icon-rgb", hexToRgbTuple(iconHex));
  element.style.setProperty("--link-icon-color", iconHex);
  element.style.setProperty("--link-icon-ink", iconInk);
  element.style.setProperty("--link-icon-filter", iconFilter);
}

function createBrandBadge(className = "") {
  const badge = document.createElement("a");
  badge.className = className ? `brand-badge ${className}` : "brand-badge";
  badge.href = "../app.html?id=scanely";
  badge.setAttribute("aria-label", "Open the Scanely app page");

  const logo = document.createElement("img");
  logo.className = "brand-badge__logo";
  logo.src = "../assets/apps/scanely/scanely-qr-logo.png";
  logo.alt = "Scanely logo";
  logo.width = 30;
  logo.height = 30;
  logo.decoding = "async";

  const copy = createElement("span", "", "Powered by Scanely");
  badge.append(logo, copy);
  return badge;
}

function createThemeButton(theme, label, iconName, isActive) {
  const button = document.createElement("button");
  button.className = "theme-button";
  button.type = "button";
  button.dataset.themeValue = theme;
  button.setAttribute("aria-pressed", isActive ? "true" : "false");
  button.setAttribute("aria-label", `Switch to ${label.toLowerCase()} mode`);
  button.append(createDecorativeIcon(iconName, "theme-button__icon"), document.createTextNode(label));
  return button;
}

function createInfoPill(iconName, text, isAccent = false) {
  const pill = createElement("div", isAccent ? "soft-pill soft-pill--accent" : "soft-pill");
  pill.append(createDecorativeIcon(iconName, "soft-pill__icon"), document.createTextNode(text));
  return pill;
}

function createCopyActionButton({
  label = "Copy",
  copyValue = "",
  feedbackMessage = "Copied to clipboard.",
  variant = "ghost",
  className = "",
} = {}) {
  const button = document.createElement("button");
  button.className = ["action-button", `action-button--${variant}`, className].filter(Boolean).join(" ");
  button.type = "button";
  button.dataset.copyValue = copyValue;
  button.dataset.feedbackMessage = feedbackMessage;
  button.append(createDecorativeIcon("copy", "action-icon"), document.createTextNode(label));
  return button;
}

function renderTopBar(profile) {
  const currentTheme = getActiveTheme();
  const topBarClassName = profile.isPro
    ? "page-topbar page-topbar--minimal"
    : "page-topbar page-topbar--with-brand";
  const topBar = createElement("header", topBarClassName);

  if (!profile.isPro) {
    topBar.appendChild(createBrandBadge("brand-badge--topbar"));
  }

  const switcher = createElement("div", "theme-switcher");
  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", "Color theme");
  switcher.appendChild(createThemeButton("light", "Light", "sun", currentTheme === "light"));
  switcher.appendChild(createThemeButton("dark", "Dark", "moon", currentTheme === "dark"));

  topBar.appendChild(switcher);
  return topBar;
}

function createProfileAvatar(profile) {
  const avatar = createElement("div", "avatar-shell");

  if (profile.avatar) {
    const image = document.createElement("img");
    image.src = profile.avatar;
    image.alt = `${profile.title} avatar`;
    image.loading = "eager";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    image.addEventListener("error", () => {
      avatar.replaceChildren(createElement("div", "avatar-fallback", getInitials(profile.title)));
    }, { once: true });
    avatar.appendChild(image);
    return avatar;
  }

  avatar.appendChild(createElement("div", "avatar-fallback", getInitials(profile.title)));
  return avatar;
}

function renderSummaryPanel(profile) {
  const summary = createElement("section", "summary-panel");

  const header = createElement("div", "summary-header");
  header.appendChild(createProfileAvatar(profile));

  const summaryMain = createElement("div", "summary-main");
  summaryMain.appendChild(createElement("h1", "profile-title", profile.title));
  if (profile.bio) {
    summaryMain.appendChild(createElement("p", "profile-bio", profile.bio));
  }
  header.appendChild(summaryMain);

  header.appendChild(renderActionRow(profile));
  summary.appendChild(header);

  if (profile.appMode === APP_MODES.BUSINESS_CARD) {
    const badgeRow = renderBusinessBadgeRow(profile);
    if (badgeRow) summary.appendChild(badgeRow);
  } else if (profile.appMode === APP_MODES.PAYMENT_HUB) {
    const badgeRow = renderPaymentBadgeRow(profile);
    if (badgeRow) summary.appendChild(badgeRow);
  }

  return summary;
}

function renderActionRow(profile) {
  const isBusinessCard = profile.appMode === APP_MODES.BUSINESS_CARD;
  const isPaymentHub = profile.appMode === APP_MODES.PAYMENT_HUB;
  const hasPrimaryPaymentCopy = isPaymentHub && Boolean(profile.payment?.primaryCopy?.copyValue);
  const actions = createElement(
    "div",
    isBusinessCard || hasPrimaryPaymentCopy
      ? "action-row"
      : "action-row action-row--utility"
  );

  const shareButton = document.createElement("button");
  shareButton.className = "action-button action-button--ghost";
  shareButton.type = "button";
  shareButton.dataset.action = "share-page";
  shareButton.append(createDecorativeIcon("share", "action-icon"), document.createTextNode("Share"));

  const copyButton = document.createElement("button");
  copyButton.className = "action-button action-button--ghost";
  copyButton.type = "button";
  copyButton.dataset.action = "copy-page";
  copyButton.append(createDecorativeIcon("copy", "action-icon"), document.createTextNode("Copy"));

  if (isBusinessCard) {
    const saveButton = document.createElement("button");
    saveButton.className = "action-button action-button--primary";
    saveButton.type = "button";
    saveButton.dataset.action = "save-contact";
    saveButton.append(
      createDecorativeIcon("download", "action-icon"),
      document.createTextNode("Save Contact")
    );
    actions.appendChild(saveButton);

    const secondary = createElement("div", "action-row__secondary");
    secondary.appendChild(shareButton);
    secondary.appendChild(copyButton);
    actions.appendChild(secondary);
  } else if (hasPrimaryPaymentCopy) {
    actions.appendChild(
      createCopyActionButton({
        label: profile.payment.primaryCopy.label,
        copyValue: profile.payment.primaryCopy.copyValue,
        feedbackMessage: profile.payment.primaryCopy.feedbackMessage,
        variant: "primary",
      })
    );

    const secondary = createElement("div", "action-row__secondary");
    secondary.appendChild(shareButton);
    secondary.appendChild(copyButton);
    actions.appendChild(secondary);
  } else {
    actions.appendChild(shareButton);
    actions.appendChild(copyButton);
  }

  return actions;
}

function renderContentPanel(profile, counts) {
  if (profile.appMode === APP_MODES.PAYMENT_HUB) {
    return renderPaymentHubPanel(profile);
  }

  if (profile.appMode === APP_MODES.BUSINESS_CARD) {
    return renderBusinessCardPanel(profile);
  }

  const content = createElement("section", "content-panel");
  content.appendChild(renderLinkCollections(profile, counts));
  return content;
}

function renderBusinessBadgeRow(profile) {
  const badgeRow = createElement("div", "badge-row");
  badgeRow.appendChild(createInfoPill("download", "Business Card", true));

  if (profile.contact?.jobTitle) {
    badgeRow.appendChild(createInfoPill("briefcase", profile.contact.jobTitle));
  }

  if (profile.contact?.company) {
    badgeRow.appendChild(createInfoPill("building", profile.contact.company));
  }

  return badgeRow.childElementCount ? badgeRow : null;
}

function renderPaymentBadgeRow(profile) {
  const badgeRow = createElement("div", "badge-row");
  badgeRow.appendChild(createInfoPill("wallet", "Payment Hub", true));

  if (profile.payment?.bankAccounts?.length) {
    badgeRow.appendChild(
      createInfoPill("bank", formatCountLabel(profile.payment.bankAccounts.length, "bank account"))
    );
  }

  if (profile.links.length) {
    badgeRow.appendChild(createInfoPill("link", formatCountLabel(profile.links.length, "online option")));
  }

  if (profile.payment?.cryptoWallets?.length) {
    badgeRow.appendChild(
      createInfoPill("coin", formatCountLabel(profile.payment.cryptoWallets.length, "crypto wallet"))
    );
  }

  return badgeRow.childElementCount ? badgeRow : null;
}

function renderSectionHeader(eyebrowText, titleText, copyTextValue) {
  const header = createElement("div", "content-panel__header");
  header.appendChild(createElement("p", "eyebrow", eyebrowText));
  header.appendChild(createElement("h2", "content-title", titleText));

  if (copyTextValue) {
    header.appendChild(createElement("p", "content-copy", copyTextValue));
  }

  return header;
}

function formatCompactUrlDisplay(rawValue) {
  const normalized = normalizeUrl(rawValue);
  if (!normalized) return rawValue.trim();

  try {
    const url = new URL(normalized);
    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname && url.pathname !== "/" ? url.pathname.replace(/\/$/, "") : "";
    return `${host}${path}`;
  } catch (error) {
    return rawValue.trim();
  }
}

function createBusinessCardContactRow({ label, value, href = "", icon = "globe" }) {
  const isLink = Boolean(href);
  const row = isLink ? document.createElement("a") : createElement("div");

  row.className = isLink
    ? "business-card__contact business-card__contact--link"
    : "business-card__contact";

  if (isLink) {
    row.href = href;
    row.setAttribute("aria-label", `${label}: ${value}`);

    if (/^https?:/i.test(href)) {
      row.target = "_blank";
      row.rel = "noopener noreferrer";
    }
  }

  const iconWrap = createElement("span", "business-card__contact-icon");
  iconWrap.appendChild(createDecorativeIcon(icon, "business-card__contact-icon-glyph"));
  row.appendChild(iconWrap);

  const content = createElement("div", "business-card__contact-content");
  content.appendChild(createElement("p", "business-card__contact-label", label));
  content.appendChild(
    createElement(
      "p",
      isLink
        ? "business-card__contact-value business-card__contact-value--link"
        : "business-card__contact-value",
      value
    )
  );
  row.appendChild(content);

  if (isLink) {
    row.appendChild(createDecorativeIcon("arrow", "business-card__contact-arrow"));
  }

  return row;
}

function createBankAccountFieldRow({
  label = "",
  value = "",
  copyValue = "",
  feedbackMessage = "",
} = {}) {
  const isCopyable = Boolean(copyValue);
  const row = isCopyable ? document.createElement("button") : createElement("div", "bank-card__row");
  row.className = isCopyable ? "bank-card__row bank-card__row--copyable" : "bank-card__row";

  if (isCopyable) {
    row.type = "button";
    row.dataset.copyValue = copyValue;
    row.dataset.feedbackMessage = feedbackMessage || `${label} copied.`;
    row.setAttribute("aria-label", `Copy ${label}: ${value}`);
  }

  const layout = createElement("div", "bank-card__row-layout");

  if (isCopyable) {
    const iconWrap = createElement("span", "bank-card__row-copy-icon");
    iconWrap.setAttribute("aria-hidden", "true");
    iconWrap.appendChild(createDecorativeIcon("copy", "bank-card__row-copy-glyph"));
    layout.appendChild(iconWrap);
  }

  const content = createElement("div", "bank-card__row-content");

  content.appendChild(createElement("p", "bank-card__row-label", label));
  content.appendChild(createElement("p", "bank-card__row-value", value));
  layout.appendChild(content);
  row.appendChild(layout);

  return row;
}

function createBankAccountCard(account, index) {
  const card = createElement("article", "bank-card");
  const header = createElement("div", "bank-card__header");
  const headerLead = createElement("div", "bank-card__header-lead");

  headerLead.appendChild(
    createElement("h3", "bank-card__title", account.title || `Bank Account ${index + 1}`)
  );
  header.appendChild(headerLead);

  card.appendChild(header);

  const rows = createElement("div", "bank-card__rows");

  if (account.iban) {
    rows.appendChild(
      createBankAccountFieldRow({
        label: "IBAN",
        value: formatGroupedValue(account.iban),
        copyValue: account.iban,
        feedbackMessage: "IBAN copied.",
      })
    );
  }

  if (account.accountNumber) {
    rows.appendChild(
      createBankAccountFieldRow({
        label: "Account",
        value: account.accountNumber,
        copyValue: account.accountNumber,
        feedbackMessage: "Account number copied.",
      })
    );
  }

  if (account.routingCode) {
    rows.appendChild(
      createBankAccountFieldRow({
        label: "Routing Number/Bank Code",
        value: account.routingCode,
        copyValue: account.routingCode,
        feedbackMessage: "Routing Number/Bank Code copied.",
      })
    );
  }

  if (rows.childElementCount) {
    card.appendChild(rows);
  }

  return card;
}

function renderBankAccountGrid(accounts) {
  const grid = createElement("div", "bank-card-grid");
  accounts.forEach((account, index) => {
    grid.appendChild(createBankAccountCard(account, index));
  });
  return grid;
}

function renderCryptoWalletGrid(wallets) {
  const grid = createElement("div", "crypto-grid");

  wallets.forEach((wallet) => {
    const card = createElement("article", "crypto-card");
    card.style.setProperty("--wallet-rgb", hexToRgbTuple(wallet.iconHex || activeAccentColor));
    card.style.setProperty("--wallet-ink", wallet.iconInk || getContrastingInk(wallet.iconHex || activeAccentColor));

    const top = createElement("div", "crypto-card__top");
    const identity = createElement("div", "crypto-card__identity");
    const tokenRow = createElement("div", "crypto-card__token-row");
    tokenRow.appendChild(createElement("span", "crypto-card__symbol", wallet.symbol));

    if (wallet.network) {
      tokenRow.appendChild(createElement("span", "crypto-card__network", wallet.network));
    }

    identity.appendChild(tokenRow);
    identity.appendChild(createElement("h3", "crypto-card__name", wallet.label));
    top.appendChild(identity);
    top.appendChild(
      createCopyActionButton({
        label: "Copy",
        copyValue: wallet.address,
        feedbackMessage: wallet.feedbackMessage,
        className: "action-button--compact crypto-card__copy",
      })
    );

    card.appendChild(top);
    card.appendChild(createElement("p", "crypto-card__address", wallet.address));
    grid.appendChild(card);
  });

  return grid;
}

function renderBusinessCardCanvas(profile) {
  const scene = createElement("div", "business-card-scene");
  const card = createElement("article", "business-card");
  card.setAttribute("aria-label", `${profile.title} business card`);

  const top = createElement("div", "business-card__top");
  const topCopy = createElement("div", "business-card__top-copy");
  topCopy.appendChild(
    createElement(
      "p",
      "business-card__eyebrow",
      profile.contact?.company || "Digital Business Card"
    )
  );

  const mark = createElement("div", "business-card__mark", getInitials(profile.title));
  mark.setAttribute("aria-hidden", "true");
  top.append(topCopy, mark);

  const body = createElement("div", "business-card__body");
  body.appendChild(createElement("h3", "business-card__name", profile.title));

  const headline = buildBusinessHeadline(profile.contact?.jobTitle || "", profile.contact?.company || "");
  if (headline) {
    body.appendChild(createElement("p", "business-card__headline", headline));
  }

  if (profile.bio && profile.bio !== headline) {
    body.appendChild(createElement("p", "business-card__note", profile.bio));
  }

  const contacts = createElement("div", "business-card__contacts");

  if (profile.contact?.phone) {
    contacts.appendChild(
      createBusinessCardContactRow({
        label: "Phone",
        value: profile.contact.phone,
        href: `tel:${profile.contact.phone}`,
        icon: "phone",
      })
    );
  }

  if (profile.contact?.email) {
    contacts.appendChild(
      createBusinessCardContactRow({
        label: "Email",
        value: profile.contact.email,
        href: `mailto:${profile.contact.email}`,
        icon: "mail",
      })
    );
  }

  if (profile.contact?.website) {
    contacts.appendChild(
      createBusinessCardContactRow({
        label: "Website",
        value: formatCompactUrlDisplay(profile.contact.website),
        href: profile.contact.website,
        icon: "globe",
      })
    );
  }

  if (profile.contact?.linkedin) {
    contacts.appendChild(
      createBusinessCardContactRow({
        label: "LinkedIn",
        value: formatCompactUrlDisplay(profile.contact.linkedin),
        href: profile.contact.linkedin,
        icon: "linkedin",
      })
    );
  }

  profile.links
    .filter((link) => link.isCustom)
    .forEach((link) => {
      contacts.appendChild(
        createBusinessCardContactRow({
          label: link.label,
          value: link.caption || formatCompactUrlDisplay(link.href),
          href: link.href,
          icon: "globe",
        })
      );
    });

  if (!contacts.childElementCount && profile.contact?.detailItems?.length) {
    profile.contact.detailItems.forEach((item) => {
      contacts.appendChild(
        createBusinessCardContactRow({
          label: item.label,
          value: item.value,
        })
      );
    });
  }

  card.append(top, body, contacts);
  scene.appendChild(card);
  return scene;
}

function renderBusinessCardPanel(profile) {
  const content = createElement("section", "content-panel");
  const stack = createElement("div", "business-card-stack");

  stack.appendChild(
    renderSectionHeader(
      "Business Card",
      "Digital contact card",
      "Tap directly on the card to open links, call, or email. You can still save the contact as a vCard."
    )
  );

  stack.appendChild(renderBusinessCardCanvas(profile));

  if (profile.links.length) {
    stack.appendChild(
      renderSectionHeader(
        "Quick Actions",
        "Open contact links",
        "These include the main contact destinations plus any custom URLs you add, but in larger button form."
      )
    );
  }

  stack.appendChild(
    renderLinkGrid(
      profile.links,
      "No contact links yet",
      "Add phone, email, website, LinkedIn, or custom link parameters to show tappable links on the business card."
    )
  );

  content.appendChild(stack);
  return content;
}

function renderPaymentHubPanel(profile) {
  const content = createElement("section", "content-panel");
  const stack = createElement("div", "payment-hub-stack");
  const hasBank = Boolean(profile.payment?.bankAccounts?.length);
  const hasOnline = Boolean(profile.links.length);
  const hasCrypto = Boolean(profile.payment?.cryptoWallets?.length);

  stack.appendChild(
    renderSectionHeader(
      "Payment Hub",
      "Compact payment profile",
      "Bank, links, crypto."
    )
  );

  if (hasBank) {
    const section = createElement("section", "payment-section");
    section.appendChild(
      renderSectionHeader(
        "Bank Transfer",
        "Bank accounts"
      )
    );
    section.appendChild(renderBankAccountGrid(profile.payment.bankAccounts));
    stack.appendChild(section);
  }

  if (hasOnline) {
    const section = createElement("section", "payment-section");
    section.appendChild(
      renderSectionHeader(
        "Online Payments",
        "Payment links"
      )
    );
    section.appendChild(
      renderLinkGrid(
        profile.links,
        "No online payment links yet",
        "Add PayPal or a payment link to show quick open buttons here."
      )
    );
    stack.appendChild(section);
  }

  if (hasCrypto) {
    const section = createElement("section", "payment-section");
    section.appendChild(
      renderSectionHeader(
        "Crypto Wallets",
        "Crypto wallets"
      )
    );
    section.appendChild(renderCryptoWalletGrid(profile.payment.cryptoWallets));
    stack.appendChild(section);
  }

  if (!hasBank && !hasOnline && !hasCrypto) {
    stack.appendChild(
      renderLinkGrid(
        [],
        "No payment methods yet",
        "Add bank transfer details, a PayPal handle, a payment link, or one of the supported crypto wallet parameters to populate the payment hub."
      )
    );
  }

  content.appendChild(stack);
  return content;
}

function renderLinkCollections(profile, counts) {
  if (!counts.social || !counts.custom) {
    return renderLinkGrid(profile.links, counts.all ? "" : "No links yet");
  }

  const tabs = [
    {
      key: "all",
      label: "All",
      icon: "grid",
      count: counts.all,
      panel: renderLinkGrid(profile.links, "No links yet"),
    },
    {
      key: "social",
      label: "Social",
      icon: "social",
      count: counts.social,
      panel: renderLinkGrid(profile.links.filter((link) => link.group === "social"), "No social links"),
    },
    {
      key: "custom",
      label: "Custom",
      icon: "custom",
      count: counts.custom,
      panel: renderLinkGrid(profile.links.filter((link) => link.group === "custom"), "No custom links"),
    },
  ];

  return createTabs({
    label: "Link filters",
    tabs,
  });
}

function renderLinkGrid(links, emptyTitle, emptyCopy = "") {
  if (!links.length) {
    const empty = createElement("div", "empty-state");
    empty.appendChild(createElement("h3", "empty-state__title", emptyTitle));
    if (emptyCopy) {
      empty.appendChild(createElement("p", "empty-state__copy", emptyCopy));
    }
    return empty;
  }

  const grid = createElement("div", "link-grid");

  links.forEach((link) => {
    const card = document.createElement("a");
    card.className = "link-card";
    card.href = link.href;
    card.setAttribute("aria-label", `Open ${link.label}${link.caption ? `, ${link.caption}` : ""}`);

    if (/^https?:/i.test(link.href)) {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    const icon = createPlatformIcon(link.icon, link.label, "link-card__icon");
    applyLinkIconPalette(icon, link);
    card.appendChild(icon);

    const content = createElement("div", "link-card__content");
    content.appendChild(createElement("p", "link-card__title", link.label));
    content.appendChild(createElement("p", "link-card__meta", link.caption || link.href));
    card.appendChild(content);

    card.appendChild(createDecorativeIcon("arrow", "link-card__arrow"));
    grid.appendChild(card);
  });

  return grid;
}

function createTabs({ label, tabs }) {
  tabsInstanceCount += 1;
  const instanceId = `scanely-tabs-${tabsInstanceCount}`;
  const wrapper = createElement("section", "tabs");
  const tabList = createElement("div", "tab-list");
  tabList.setAttribute("role", "tablist");
  tabList.setAttribute("aria-label", label);

  const panels = createElement("div", "tab-panels");
  const buttons = [];

  tabs.forEach((tab, index) => {
    const isSelected = index === 0;
    const button = document.createElement("button");
    const panel = createElement("section", "tab-panel");
    const tabId = `${instanceId}-tab-${tab.key}`;
    const panelId = `${instanceId}-panel-${tab.key}`;

    button.className = "tab-button";
    button.type = "button";
    button.id = tabId;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", isSelected ? "true" : "false");
    button.setAttribute("aria-controls", panelId);
    button.tabIndex = isSelected ? 0 : -1;
    button.appendChild(createDecorativeIcon(tab.icon, "tab-button__icon"));
    button.appendChild(createElement("span", "", tab.label));
    button.appendChild(createElement("span", "tab-button__count", String(tab.count)));

    panel.id = panelId;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabId);
    if (!isSelected) panel.hidden = true;
    panel.appendChild(tab.panel);

    buttons.push(button);
    tabList.appendChild(button);
    panels.appendChild(panel);
  });

  const activateTab = (nextIndex) => {
    buttons.forEach((button, index) => {
      const selected = index === nextIndex;
      button.setAttribute("aria-selected", selected ? "true" : "false");
      button.tabIndex = selected ? 0 : -1;
      panels.children[index].hidden = !selected;
    });
    buttons[nextIndex].focus();
  };

  tabList.addEventListener("click", (event) => {
    const button = event.target.closest('[role="tab"]');
    if (!button) return;
    const nextIndex = buttons.indexOf(button);
    if (nextIndex >= 0) activateTab(nextIndex);
  });

  tabList.addEventListener("keydown", (event) => {
    const currentIndex = buttons.findIndex((button) => button.getAttribute("aria-selected") === "true");
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % buttons.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = buttons.length - 1;

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      activateTab(nextIndex);
    }
  });

  wrapper.append(tabList, panels);
  return wrapper;
}

function syncThemeButtons(theme = getActiveTheme()) {
  if (!scanelyRoot) return;
  scanelyRoot.querySelectorAll("[data-theme-value]").forEach((button) => {
    const isActive = button.dataset.themeValue === theme;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function createCounts(profile) {
  const social = profile.links.filter((link) => link.group === "social").length;
  const custom = profile.links.filter((link) => link.group === "custom").length;

  return {
    all: profile.links.length,
    social,
    custom,
  };
}

function showFeedback(message) {
  if (!feedbackToast) return;
  window.clearTimeout(feedbackTimeoutId);
  feedbackToast.textContent = message;
  feedbackToast.hidden = false;

  feedbackTimeoutId = window.setTimeout(() => {
    feedbackToast.hidden = true;
  }, 2200);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fall back to a selection-based copy path below.
    }
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.setAttribute("aria-hidden", "true");
  helper.style.position = "fixed";
  helper.style.top = "-9999px";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.focus();
  helper.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  helper.remove();
  return copied;
}

async function shareProfile(profile) {
  const sharePayload = {
    title: profile.title,
    text: profile.bio,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(sharePayload);
      showFeedback("Share sheet opened.");
      return;
    } catch (error) {
      if (error && error.name === "AbortError") return;
    }
  }

  const copied = await copyText(window.location.href);
  showFeedback(copied ? "Link copied to clipboard." : "Copy is not available in this browser.");
}

async function copyProfileLink() {
  const copied = await copyText(window.location.href);
  showFeedback(copied ? "Link copied to clipboard." : "Copy is not available in this browser.");
}

function createDownloadName(value) {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "scanely-contact";
}

// The business-card mode stays static, so we generate the .vcf file in the browser and hand it off as a download.
function saveBusinessCard(profile) {
  if (!profile.contact?.vcard) {
    showFeedback("This contact is missing vCard data.");
    return;
  }

  const fileName = `${createDownloadName(profile.contact.displayName || profile.title)}.vcf`;
  const blob = new Blob([profile.contact.vcard], { type: "text/vcard;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 0);

  showFeedback("Contact file downloaded.");
}

function setBusyState(isBusy) {
  if (!scanelyRoot) return;
  scanelyRoot.setAttribute("aria-busy", isBusy ? "true" : "false");
}

function renderRuntimeState(message = "") {
  if (!scanelyRoot) return;

  const wrapper = createElement("section", "runtime-state");
  wrapper.setAttribute("aria-label", "Scanely page error");
  wrapper.appendChild(createElement("p", "runtime-state__eyebrow", "Scanely"));
  wrapper.appendChild(createElement("h1", "runtime-state__title", "This profile could not be loaded"));
  wrapper.appendChild(
    createElement(
      "p",
      "runtime-state__copy",
      message || "Please refresh the page or check the QR link parameters. If the issue continues, regenerate the QR code and try again."
    )
  );

  const action = document.createElement("a");
  action.className = "runtime-state__action";
  action.href = "../app.html?id=scanely";
  action.textContent = "Open Scanely";
  wrapper.appendChild(action);

  scanelyRoot.replaceChildren(wrapper);
}

function attachActionHandlers(profile) {
  const saveButton = scanelyRoot.querySelector('[data-action="save-contact"]');
  const shareButton = scanelyRoot.querySelector('[data-action="share-page"]');
  const copyButton = scanelyRoot.querySelector('[data-action="copy-page"]');
  const copyValueButtons = scanelyRoot.querySelectorAll("[data-copy-value]");
  const themeButtons = scanelyRoot.querySelectorAll("[data-theme-value]");

  if (saveButton) {
    saveButton.addEventListener("click", () => {
      saveBusinessCard(profile);
    });
  }

  if (shareButton) {
    shareButton.addEventListener("click", () => {
      shareProfile(profile);
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", () => {
      copyProfileLink();
    });
  }

  copyValueButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const copied = await copyText(button.dataset.copyValue || "");
      showFeedback(
        copied
          ? button.dataset.feedbackMessage || "Copied to clipboard."
          : "Copy is not available in this browser."
      );
    });
  });

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = button.dataset.themeValue;
      if (!nextTheme) return;
      applyTheme(nextTheme);
      showFeedback(`${nextTheme === "dark" ? "Dark" : "Light"} mode enabled.`);
    });
  });
}

function watchSystemThemeChanges() {
  if (!window.matchMedia || getSavedTheme()) return;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (event) => {
    if (getSavedTheme()) return;
    applyTheme(event.matches ? "dark" : "light", false);
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleChange);
    return;
  }

  if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleChange);
  }
}

function renderProfile(profile) {
  const themedLinks = profile.links.map((link) => ({
    ...link,
    themeHex: profile.accent,
    themeInk: getContrastingInk(profile.accent),
  }));

  const profileWithColors = {
    ...profile,
    links: themedLinks,
  };

  const counts = createCounts(profileWithColors);
  const pageStack = createElement("div", "page-stack");
  const layout = createElement("div", "profile-layout");
  layout.append(renderSummaryPanel(profileWithColors), renderContentPanel(profileWithColors, counts));
  pageStack.append(renderTopBar(profileWithColors), layout);
  scanelyRoot.replaceChildren(pageStack);
  setBusyState(false);
  attachActionHandlers(profileWithColors);
  syncThemeButtons();
}

function initScanelyPage() {
  if (!scanelyRoot) return;

  setBusyState(true);

  try {
    const profile = buildProfileConfig();
    applyTheme(getSavedTheme() || getSystemTheme(), false);
    applyAccentColor(profile.accent);
    setPageMetadata(profile);
    renderProfile(profile);
    watchSystemThemeChanges();
  } catch (error) {
    console.error("Scanely page failed to initialize.", error);
    renderRuntimeState(error instanceof Error ? error.message : "");
    setBusyState(false);
  }
}

initScanelyPage();
