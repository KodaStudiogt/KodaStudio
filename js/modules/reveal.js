import { selectors } from "../config/selectors.js";

export function initReveal() {
  const elements = document.querySelectorAll(selectors.reveal);
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("is-pending");
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => {
    element.classList.add("is-pending");
    observer.observe(element);
  });
}
