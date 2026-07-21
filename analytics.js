// klanex website analytics — Google Analytics 4, loaded ONLY after the visitor
// consents. GA4 sets cookies and collects personal data, so under GDPR/ePrivacy
// it must not run before consent; this script shows a banner and injects gtag.js
// only on "Accept". The choice is remembered (localStorage), so the banner shows
// once per visitor and never on repeat visits.
//
// SETUP: replace GA_MEASUREMENT_ID with your GA4 Measurement ID (Admin → Data
// Streams → your web stream → "G-XXXXXXXXXX"). Until it's a real ID, the banner
// works but no data is sent.
(function () {
  "use strict";

  var GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: set your real GA4 ID
  var STORAGE_KEY = "klanex_analytics_consent"; // "granted" | "denied"

  function loadGA() {
    if (/X{4,}/.test(GA_MEASUREMENT_ID)) {
      console.warn("[analytics] GA_MEASUREMENT_ID is a placeholder — set it in analytics.js to start collecting.");
      return;
    }
    if (window.__klanexGALoaded) return;
    window.__klanexGALoaded = true;

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function store(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* private mode */ }
  }

  function read() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function injectStyles() {
    if (document.getElementById("klanex-consent-styles")) return;
    var css = document.createElement("style");
    css.id = "klanex-consent-styles";
    css.textContent =
      "#klanex-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;" +
      "max-width:560px;margin:0 auto;background:#12121c;color:#eceaf6;" +
      "border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:16px 18px;" +
      "box-shadow:0 12px 40px rgba(0,0,0,0.5);font-family:'Inter',system-ui,sans-serif;" +
      "font-size:13.5px;line-height:1.55;display:flex;flex-wrap:wrap;align-items:center;gap:12px}" +
      "#klanex-consent p{margin:0;flex:1 1 260px;color:#9b98b3}" +
      "#klanex-consent a{color:#00d4ff;text-decoration:none}" +
      "#klanex-consent a:hover{text-decoration:underline}" +
      "#klanex-consent .kc-actions{display:flex;gap:8px;flex:0 0 auto}" +
      "#klanex-consent button{font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;" +
      "border-radius:8px;padding:8px 16px;border:1px solid transparent}" +
      "#klanex-consent .kc-decline{background:transparent;color:#9b98b3;border-color:rgba(255,255,255,0.14)}" +
      "#klanex-consent .kc-decline:hover{color:#eceaf6}" +
      "#klanex-consent .kc-accept{color:#fff;border:none;background:linear-gradient(100deg,#7c5cff,#00d4ff)}";
    document.head.appendChild(css);
  }

  function showBanner() {
    injectStyles();
    var el = document.createElement("div");
    el.id = "klanex-consent";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Analytics consent");
    el.innerHTML =
      '<p>We use Google Analytics to understand how the site is used. No tracking runs until you accept. ' +
      'See our <a href="/privacy.html">privacy note</a>.</p>' +
      '<div class="kc-actions">' +
      '<button type="button" class="kc-decline">Decline</button>' +
      '<button type="button" class="kc-accept">Accept</button>' +
      "</div>";
    document.body.appendChild(el);

    el.querySelector(".kc-accept").addEventListener("click", function () {
      store("granted");
      el.remove();
      loadGA();
    });
    el.querySelector(".kc-decline").addEventListener("click", function () {
      store("denied");
      el.remove();
    });
  }

  function init() {
    var consent = read();
    if (consent === "granted") { loadGA(); return; }
    if (consent === "denied") { return; }
    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
