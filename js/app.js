const appContent = document.getElementById("app-content");
const appError = document.getElementById("app-error");
const currentYear = document.getElementById("current-year");

const appIcon = document.getElementById("app-icon");
const appName = document.getElementById("app-name");
const appTagline = document.getElementById("app-tagline");
const appShort = document.getElementById("app-short");
const appLong = document.getElementById("app-long");
const appFeatures = document.getElementById("app-features");
const appStore = document.getElementById("app-store");
const appLinks = document.getElementById("app-links");
const appScreenshots = document.getElementById("app-screenshots");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const particlesHost = document.getElementById("particles-js");
const inlineAppsData = document.getElementById("apps-data");

const getAppId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || params.get("slug");
};

const showError = (message) => {
  appError.textContent = message;
  appError.classList.remove("d-none");
  appContent.classList.add("d-none");
};

const normalizeAppsPayload = (payload) => {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload;
  if (payload.apps && typeof payload.apps === "object") {
    return Object.values(payload.apps);
  }
  return null;
};

const getInlineApps = () => {
  if (!inlineAppsData) return null;
  try {
    return JSON.parse(inlineAppsData.textContent || "{}");
  } catch (error) {
    console.error("Failed to parse inline apps data", error);
    return null;
  }
};

const renderApp = (app) => {
  document.title = `HusoftTech | ${app.name}`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", `HusoftTech | ${app.name}`);
  }

  appIcon.src = app.icon;
  appIcon.alt = `${app.name} app icon`;
  appName.textContent = app.name;
  appTagline.textContent = app.tagline;
  appShort.textContent = app.shortDescription;
  appLong.textContent = app.longDescription;
  appStore.href = app.appStoreUrl;

  appFeatures.innerHTML = app.features
    .map((feature) => `<li class="mb-2">${feature}</li>`)
    .join("");

  const links = [];
  if (app.websiteUrl) {
    links.push(`<a class="btn btn-outline-primary" href="${app.websiteUrl}" target="_blank" rel="noopener">Website</a>`);
  }
  if (app.privacyPolicyUrl) {
    links.push(
      `<a class="btn btn-outline-primary" href="${app.privacyPolicyUrl}" target="_blank" rel="noopener">Privacy Policy</a>`
    );
  }
  if (app.supportEmail) {
    links.push(`<a class="btn btn-outline-primary" href="mailto:${app.supportEmail}">Support</a>`);
  }
  if (links.length === 0) {
    links.push('<p class="text-muted mb-0">No additional links provided.</p>');
  }
  appLinks.innerHTML = links.join("");

  appScreenshots.innerHTML = app.screenshots
    .map(
      (shot, index) => `
      <div class="col-12 col-md-6 col-lg-4">
        <img class="img-fluid rounded-4 border" src="${shot}" alt="${app.name} screenshot ${index + 1}" loading="lazy" />
      </div>
    `
    )
    .join("");

  const revealTargets = appContent.querySelectorAll(".row, .mt-5, .card");
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if (prefersReducedMotion.matches) {
    revealTargets.forEach((el) => el.classList.add("reveal--visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  appContent.classList.remove("d-none");
};

const loadApp = async () => {
  const appId = getAppId();
  if (!appId) {
    showError("App not found. Please return to the homepage and select an app.");
    return;
  }

  try {
    const apps = normalizeAppsPayload(getInlineApps());

    if (!Array.isArray(apps)) {
      throw new Error("No app data available");
    }

    const app = apps.find((item) => item.id === appId);
    if (!app) {
      showError("App not found. Please return to the homepage and select an app.");
      return;
    }
    renderApp(app);
  } catch (error) {
    console.error(error);
    showError("We couldn't load this app right now. Please try again later.");
  }
};

loadApp();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const initParticlesBackground = () => {
  if (!particlesHost || typeof particlesJS === "undefined") return;

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 220,
        density: { enable: true, value_area: 800 },
      },
      color: { value: "#ffffff" },
      shape: {
        type: "triangle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 10 },
      },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.35,
        width: 1,
      },
      move: {
        enable: !prefersReducedMotion.matches,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: true,
      },
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: !prefersReducedMotion.matches, mode: "repulse" },
        onclick: { enable: !prefersReducedMotion.matches, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
};

initParticlesBackground();
