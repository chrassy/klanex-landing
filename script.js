// Code-sample tab switching.
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".code-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document
      .querySelector(`.code-panel[data-panel="${tab.dataset.tab}"]`)
      .classList.add("active");
  });
});

// Gentle reveal-on-scroll for cards and flow steps.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".card, .flow-step").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(14px)";
  el.style.transition = `opacity 0.5s ease ${(i % 3) * 0.08}s, transform 0.5s ease ${(i % 3) * 0.08}s, border-color 0.2s`;
  observer.observe(el);
});
