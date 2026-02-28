/*
  Basit JS:
  1) Sayfa yüklenince reveal animasyonu
  2) Blog sayfasında kategori filtreleme
  3) Arama inputu ile başlık içinde arama (basit)
  4) Galeri lightbox
  5) Mobil menü (çok basit)
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1) Reveal animasyonu
  document.querySelectorAll(".reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("on"), 60 + i * 60);
  });

  // 2) Blog filtreleme (blog.html sayfasında çalışır)
  const chips = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  if (chips.length && cards.length) {
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        const filter = chip.dataset.filter; // ör: "ankara" veya "all"
        cards.forEach(card => {
          const cat = card.dataset.category;
          const show = (filter === "all") || (cat === filter);
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  // 3) Arama: header inputu ile kart başlıklarında arama
  const searchInput = document.querySelector("#siteSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();

      // blog.html'de kartlar varsa onları filtrele
      const blogCards = document.querySelectorAll(".card[data-title]");
      if (!blogCards.length) return;

      blogCards.forEach(card => {
        const title = (card.dataset.title || "").toLowerCase();
        card.style.display = title.includes(q) ? "" : "none";
      });
    });
  }

  // 4) Galeri lightbox
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    document.querySelectorAll(".g-item img").forEach(img => {
      img.addEventListener("click", () => {
        lbImg.src = img.src;
        lightbox.classList.add("open");
      });
    });

    const close = lightbox.querySelector(".close");
    close.addEventListener("click", () => lightbox.classList.remove("open"));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
  }

  // 5) Mobil menü: burger -> nav göster/gizle
  const burger = document.querySelector("#burgerBtn");
  const nav = document.querySelector("#mainNav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.style.display === "flex";
      nav.style.display = isOpen ? "none" : "flex";

      // Açılınca küçük bir dropdown gibi dursun
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "62px";
      nav.style.right = "20px";
      nav.style.padding = "10px";
      nav.style.background = "rgba(14,11,8,0.92)";
      nav.style.border = "1px solid rgba(255,238,220,0.14)";
      nav.style.borderRadius = "16px";
      nav.style.backdropFilter = "blur(14px)";
      nav.style.gap = "8px";
      nav.style.minWidth = "180px";
    });
  }
});