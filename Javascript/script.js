document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. SMOOTH FADE-IN ON SCROLL (INTERSECTION OBSERVER)
     ========================================================================== */
  const fadeElements = document.querySelectorAll(".fade-in");

  const observerOptions = {
    root: null, // Menggunakan viewport browser
    threshold: 0.15, // Elemen muncul saat 15% bagiannya terlihat di layar
    rootMargin: "0px 0px -50px 0px", // Sedikit offset agar animasi terasa pas saat di-scroll
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Menambahkan class 'show' ketika elemen masuk viewport
        entry.target.classList.add("show");
        // Berhenti mengamati elemen jika kamu ingin animasinya hanya terjadi sekali saja
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => {
    scrollObserver.observe(el);
  });

  /* ==========================================================================
     2. SMOOTH SCROLL FOR INTERNAL LINKS
     ========================================================================== */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Jika hanya '#' (kembali ke atas), scroll ke paling atas
      if (targetId === "#") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Menghitung kompensasi tinggi Navbar yang sticky (~70px) agar konten tidak tertutup
        const navbarHeight =
          document.querySelector(".navbar")?.offsetHeight || 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
