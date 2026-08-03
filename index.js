/* =========================================================
   PET ALEGRES — script.js (Landing Page Pet Sitting)
   Interatividade: menu mobile, scroll suave e pequenas animações
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     1. MENU MOBILE (abrir/fechar)
  --------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const navLinks = nav.querySelectorAll(".nav__link, .nav__cta");

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle("is-open");
    hamburger.classList.toggle("is-active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );
    // Trava o scroll do body enquanto o menu mobile está aberto
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  hamburger.addEventListener("click", toggleMenu);

  // Fecha o menu automaticamente ao clicar em qualquer link (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) {
        toggleMenu();
      }
    });
  });

  // Fecha o menu ao pressionar Esc (acessibilidade)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      toggleMenu();
    }
  });

  /* ---------------------------------------------------------
     2. ROLAGEM SUAVE (smooth scroll) AO CLICAR NOS LINKS
     Compensa a altura do cabeçalho fixo (sticky header).
     Obs: links externos (WhatsApp/Instagram) não são afetados,
     pois não começam com "#".
  --------------------------------------------------------- */
  const header = document.getElementById("header");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (targetId.length <= 1) return; // ignora "#" vazio

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();

      const headerHeight = header.offsetHeight;
      const targetPosition =
        targetEl.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        12;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  /* ---------------------------------------------------------
     3. HEADER COM SOMBRA AO ROLAR A PÁGINA
  --------------------------------------------------------- */
  const toggleHeaderShadow = () => {
    header.style.boxShadow =
      window.scrollY > 10 ? "0 4px 20px rgba(58, 52, 46, 0.06)" : "none";
  };

  window.addEventListener("scroll", toggleHeaderShadow);
  toggleHeaderShadow();

  /* ---------------------------------------------------------
     4. ANIMAÇÃO DE ENTRADA DOS CARDS AO ROLAR (Intersection Observer)
  --------------------------------------------------------- */
  const animatedItems = document.querySelectorAll(
    ".card--founder, .card--service, .card--testimonial"
  );

  animatedItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(24px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const delay = (index % 3) * 100; // efeito de entrada em cascata
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, delay);
          observer.unobserve(item);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedItems.forEach((item) => observer.observe(item));

  /* ---------------------------------------------------------
     5. ANO ATUAL NO RODAPÉ
  --------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
