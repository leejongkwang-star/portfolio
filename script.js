document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");
  const yearField = document.getElementById("current-year");

  if (yearField) {
    yearField.textContent = new Date().getFullYear();
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      navToggle.setAttribute("aria-expanded", expanded);
    });
  }

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name");

      status.textContent = `${name}님, 곧 연락드릴게요!`;
      status.classList.add("visible");
      form.reset();
      setTimeout(() => status.textContent = "", 4000);
    });
  }

  const metricsCard = document.querySelector(".metrics-card");
  if (metricsCard) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const circles = metricsCard.querySelectorAll(".metric-circle");
    const values = metricsCard.querySelectorAll(".metric-value");

    const formatNumber = (value) => {
      if (value >= 1000) {
        return value.toLocaleString("ko-KR");
      }
      return `${value}`;
    };

    const animateNumber = (el) => {
      if (el.dataset.animated === "true") return;
      const target = Number(el.dataset.target || 0);
      const duration = 1500;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(progress * target);
        el.textContent = formatNumber(progress === 1 ? target : current);
        if (progress < 1 && !prefersReducedMotion.matches) {
          requestAnimationFrame(tick);
        } else if (progress < 1) {
          el.textContent = formatNumber(target);
        }
      };

      if (prefersReducedMotion.matches) {
        el.textContent = formatNumber(target);
      } else {
        requestAnimationFrame(tick);
      }
      el.dataset.animated = "true";
    };

    const animateCircles = () => {
      circles.forEach((circle) => {
        if (circle.dataset.progressAnimated === "true") return;
        const progressValue = parseFloat(circle.dataset.progress || "1");
        const degrees = Math.max(0, Math.min(1, progressValue)) * 360;
        if (prefersReducedMotion.matches) {
          circle.style.setProperty("--progress", `${degrees}deg`);
        } else {
          requestAnimationFrame(() => {
            circle.style.setProperty("--progress", `${degrees}deg`);
          });
        }
        circle.dataset.progressAnimated = "true";
      });
    };

    const triggerMetrics = () => {
      metricsCard.classList.add("animated");
      animateCircles();
      values.forEach(animateNumber);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerMetrics();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(metricsCard);
  }
});

