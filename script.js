const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const setDelays = () => {
  revealElements.forEach((el) => {
    const delay = el.getAttribute("data-delay");
    if (delay) {
      el.style.transitionDelay = delay;
    }
  });
};

setDelays();

if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

const hero = document.querySelector(".hero__image");
const orbs = document.querySelectorAll(".orb");

if (hero && orbs.length && !prefersReducedMotion) {
  const handleMove = (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    orbs.forEach((orb, index) => {
      const depth = (index + 1) * 6;
      orb.style.setProperty("--orb-x", `${x * depth}px`);
      orb.style.setProperty("--orb-y", `${y * depth}px`);
    });
  };

  hero.addEventListener("mousemove", handleMove);
  hero.addEventListener("mouseleave", () => {
    orbs.forEach((orb) => {
      orb.style.setProperty("--orb-x", "0px");
      orb.style.setProperty("--orb-y", "0px");
    });
  });
}
