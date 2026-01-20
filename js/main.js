const appsGrid = document.getElementById("apps-grid");
const appsError = document.getElementById("apps-error");
const currentYear = document.getElementById("current-year");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const particlesHost = document.getElementById("particles-js");
const inlineAppsData = document.getElementById("apps-data");

const getBaseUrl = () => {
  if (window.location.origin && window.location.origin !== "null") {
    return window.location.origin;
  }
  return "https://husofttech.com";
};

const toAbsoluteUrl = (path) => {
  if (!path) return "";
  try {
    return new URL(path, `${getBaseUrl()}/`).toString();
  } catch (error) {
    return path;
  }
};

const createAppCard = (app) => {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4";
  col.setAttribute("role", "listitem");

  col.innerHTML = `
    <div class="app-card p-4 d-flex flex-column gap-3 reveal">
      <img src="${app.icon}" alt="${app.name} app icon" loading="lazy" />
      <div>
        <h3 class="h5">${app.name}</h3>
        <p class="text-muted mb-0">${app.tagline}</p>
      </div>
      <div class="mt-auto">
        <a class="btn btn-outline-primary" href="app.html?id=${encodeURIComponent(app.id)}">View details</a>
      </div>
    </div>
  `;

  return col;
};

const renderApps = (apps) => {
  appsGrid.innerHTML = "";
  apps.forEach((app) => {
    appsGrid.appendChild(createAppCard(app));
  });
  initRevealObserver();
  updateStructuredData(apps);
};

const showError = (message) => {
  appsError.textContent = message;
  appsError.classList.remove("d-none");
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

const loadApps = async () => {
  try {
    const apps = normalizeAppsPayload(getInlineApps());

    if (!Array.isArray(apps) || apps.length === 0) {
      throw new Error("No apps available");
    }
    renderApps(apps);
  } catch (error) {
    console.error(error);
    showError("Unable to load apps right now. Please try again later.");
  }
};

const updateStructuredData = (apps) => {
  if (!Array.isArray(apps)) return;
  const baseUrl = getBaseUrl();
  const itemList = apps.map((app, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: app.name,
    url: toAbsoluteUrl(`app.html?id=${encodeURIComponent(app.id)}`),
    image: toAbsoluteUrl(app.icon),
  }));

  const script = document.getElementById("apps-structured-data") || document.createElement("script");
  script.type = "application/ld+json";
  script.id = "apps-structured-data";
  script.textContent = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: itemList,
      url: baseUrl,
    },
    null,
    2
  );

  if (!script.parentElement) {
    document.head.appendChild(script);
  }
};

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

let revealObserver = null;
const initRevealObserver = () => {
  const sections = [document.getElementById("about"), document.getElementById("contact")].filter(Boolean);
  sections.forEach((section) => section.classList.add("reveal"));

  const revealTargets = document.querySelectorAll(".reveal");
  if (prefersReducedMotion.matches) {
    revealTargets.forEach((el) => el.classList.add("reveal--visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
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
  }

  revealTargets.forEach((el) => {
    if (el.dataset.revealObserved !== "true") {
      el.dataset.revealObserved = "true";
      revealObserver.observe(el);
    }
  });
};

loadApps();
initRevealObserver();

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
