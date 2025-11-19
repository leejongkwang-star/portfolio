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
});

