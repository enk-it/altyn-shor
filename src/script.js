const header = document.querySelector("[data-header]");
const carousel = document.querySelector("[data-carousel]");
const mobileHeaderQuery = window.matchMedia("(max-width: 760px)");

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  if (mobileHeaderQuery.matches) {
    header.classList.remove("is-compact");
    return;
  }

  header.classList.toggle("is-compact", window.scrollY > 24);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
mobileHeaderQuery.addEventListener("change", updateHeaderState);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

if (carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");
  let activeSlide = 0;

  const dots = slides.map((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Показать слайд ${index + 1}`);
    button.addEventListener("click", () => setActiveSlide(index));
    dotsContainer.append(button);
    return button;
  });

  const renderCarousel = () => {
    track.style.transform = `translateX(-${activeSlide * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeSlide);
      dot.setAttribute("aria-current", index === activeSlide ? "true" : "false");
    });
  };

  const setActiveSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    renderCarousel();
  };

  prevButton.addEventListener("click", () => setActiveSlide(activeSlide - 1));
  nextButton.addEventListener("click", () => setActiveSlide(activeSlide + 1));

  renderCarousel();
}
