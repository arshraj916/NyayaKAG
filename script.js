// =====================================================
// Part 1 : Navigation, Scroll Progress & Reveal Effects
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");
  const progressBar = document.getElementById("scroll-progress");

  // ==========================
  // Smooth Scrolling
  // ==========================
  document.querySelectorAll('a[href^="#"]').forEach(link => {

      link.addEventListener("click", function (e) {

          const target = document.querySelector(this.getAttribute("href"));

          if (!target) return;

          e.preventDefault();

          target.scrollIntoView({
              behavior: "smooth",
              block: "start"
          });

      });

  });

  // ==========================
  // Scroll Progress Bar
  // ==========================

  function updateProgressBar() {

      const scrollTop =
          document.documentElement.scrollTop ||
          document.body.scrollTop;

      const scrollHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

      const progress =
          (scrollTop / scrollHeight) * 100;

      if (progressBar) {
          progressBar.style.width = progress + "%";
      }

  }

  // ==========================
  // Navbar Scroll Animation
  // ==========================

  function updateNavbar() {

      if (!navbar) return;

      if (window.scrollY > 80) {

          navbar.style.padding = "10px 22px";

          navbar.style.backdropFilter = "blur(20px)";

          navbar.style.boxShadow =
              "0 18px 40px rgba(15,23,42,.12)";

      } else {

          navbar.style.padding = "14px 26px";

          navbar.style.boxShadow = "none";

      }

  }

  // ==========================
  // Reveal on Scroll
  // ==========================

  const observer = new IntersectionObserver(

      (entries) => {

          entries.forEach(entry => {

              if (entry.isIntersecting) {

                  entry.target.classList.add("active");
                  entry.target.classList.add("show");

                  observer.unobserve(entry.target);

              }

          });

      },

      {
          threshold: 0.15
      }

  );

  document.querySelectorAll(
      ".reveal, .fade-up, .feature-card, .portal, .pricing-card, .contact-card, .tech-grid div"
  ).forEach(el => {

      el.classList.add("fade-up");

      observer.observe(el);

  });

  // ==========================
  // Active Navigation Link
  // ==========================

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  function highlightNav() {

      let current = "";

      sections.forEach(section => {

          const sectionTop = section.offsetTop - 120;

          if (window.scrollY >= sectionTop) {

              current = section.getAttribute("id");

          }

      });

      navLinks.forEach(link => {

          link.classList.remove("active");

          if (link.getAttribute("href") === "#" + current) {

              link.classList.add("active");

          }

      });

  }

  // ==========================
  // Scroll Listener
  // ==========================

  window.addEventListener("scroll", () => {

      updateProgressBar();

      updateNavbar();

      highlightNav();

  });

  // ==========================
  // Initial Load
  // ==========================

  updateProgressBar();

  updateNavbar();

  highlightNav();

});

// =====================================================
// Part 2 : FAQ, Counters, Parallax & Hero Animations
// =====================================================

// ----------------------------
// FAQ Accordion
// ----------------------------
document.querySelectorAll(".faq-item").forEach(item => {

  const question = item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", () => {

      document.querySelectorAll(".faq-item").forEach(other => {

          if (other !== item) {
              other.classList.remove("active");
          }

      });

      item.classList.toggle("active");

  });

});


// ----------------------------
// Animated Counter
// ----------------------------

const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = parseInt(counter.dataset.counter);

      let value = 0;

      const step = Math.max(1, Math.ceil(target / 120));

      function update() {

          value += step;

          if (value > target)
              value = target;

          counter.innerText = value.toLocaleString();

          if (value < target) {

              requestAnimationFrame(update);

          }

      }

      update();

      counterObserver.unobserve(counter);

  });

}, {
  threshold: 0.4
});

counters.forEach(counter => {

  counter.innerText = "0";

  counterObserver.observe(counter);

});


// ----------------------------
// Hero Card Floating Effect
// ----------------------------

const floatingCards = document.querySelectorAll(".floating-card");

floatingCards.forEach((card, index) => {

  card.style.animationDuration = (4 + index) + "s";

});


// ----------------------------
// Mouse Parallax
// ----------------------------

const hero = document.querySelector(".hero");

if (hero) {

  hero.addEventListener("mousemove", e => {

      const x = (e.clientX / window.innerWidth - 0.5) * 30;

      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      floatingCards.forEach((card, index) => {

          const speed = (index + 1) * 0.25;

          card.style.transform =
              `translate(${x * speed}px, ${y * speed}px)`;

      });

  });

  hero.addEventListener("mouseleave", () => {

      floatingCards.forEach(card => {

          card.style.transform = "";

      });

  });

}


// ----------------------------
// Hover Tilt Effect
// ----------------------------

document.querySelectorAll(
  ".feature-card, .portal, .pricing-card"
).forEach(card => {

  card.addEventListener("mousemove", e => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / 20;

      const rotateY = (x - rect.width / 2) / 20;

      card.style.transform =
          `perspective(800px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)`;

  });

  card.addEventListener("mouseleave", () => {

      card.style.transform = "";

  });

});


// ----------------------------
// Floating Background Orbs
// ----------------------------

const orbs = document.querySelectorAll(".bg-orb");

window.addEventListener("scroll", () => {

  const scroll = window.scrollY;

  orbs.forEach((orb, index) => {

      orb.style.transform =
          `translateY(${scroll * (0.04 + index * 0.01)}px)`;

  });

});


// ----------------------------
// Hero Fade In
// ----------------------------

window.addEventListener("load", () => {

  document.querySelectorAll(".hero *").forEach((el, index) => {

      el.style.opacity = "0";

      el.style.transform = "translateY(30px)";

      setTimeout(() => {

          el.style.transition = "all .8s ease";

          el.style.opacity = "1";

          el.style.transform = "translateY(0)";

      }, index * 80);

  });

});

// =====================================================
// Part 3 : Premium Effects & Final Interactions
// =====================================================

// ----------------------------
// Back To Top Button
// ----------------------------

const backBtn = document.createElement("button");

backBtn.innerHTML = "↑";
backBtn.id = "backToTop";

document.body.appendChild(backBtn);

Object.assign(backBtn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "55px",
    height: "55px",
    border: "none",
    borderRadius: "50%",
    background: "#1B3A5C",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
    opacity: "0",
    visibility: "hidden",
    transition: ".35s",
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
    zIndex: "9999"
});

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backBtn.style.opacity = "1";
        backBtn.style.visibility = "visible";

    } else {

        backBtn.style.opacity = "0";
        backBtn.style.visibility = "hidden";

    }

});

backBtn.onclick = () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

};


// ----------------------------
// Ripple Effect
// ----------------------------

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,.45)";
        ripple.style.pointerEvents = "none";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
        ripple.style.transform = "scale(0)";
        ripple.style.transition = ".6s";

        this.appendChild(ripple);

        requestAnimationFrame(() => {

            ripple.style.transform = "scale(3)";
            ripple.style.opacity = "0";

        });

        setTimeout(() => ripple.remove(), 700);

    });

});


// ----------------------------
// Magnetic Buttons
// ----------------------------

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mousemove", e => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * .15}px, ${y * .15}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


// ----------------------------
// Cursor Glow
// ----------------------------

const cursor = document.createElement("div");

cursor.id = "cursorGlow";

document.body.appendChild(cursor);

Object.assign(cursor.style, {

    width: "18px",
    height: "18px",
    borderRadius: "50%",
    position: "fixed",
    pointerEvents: "none",
    background: "rgba(74,127,181,.4)",
    filter: "blur(2px)",
    zIndex: "99999",
    transition: "transform .08s linear"

});

window.addEventListener("mousemove", e => {

    cursor.style.left = e.clientX - 9 + "px";
    cursor.style.top = e.clientY - 9 + "px";

});


// ----------------------------
// Typing Effect
// ----------------------------

const heroTitle = document.querySelector(".hero h1 span");

if (heroTitle) {

    const text = heroTitle.textContent;

    heroTitle.textContent = "";

    let i = 0;

    function type() {

        if (i < text.length) {

            heroTitle.textContent += text.charAt(i);

            i++;

            setTimeout(type, 70);

        }

    }

    setTimeout(type, 800);

}


// ----------------------------
// Lazy Image Animation
// ----------------------------

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

    img.style.opacity = "0";

    img.onload = () => {

        img.style.transition = ".8s";

        img.style.opacity = "1";

    };

});


// ----------------------------
// Console Signature
// ----------------------------

console.log(
"%cNyayaKAG",
"font-size:30px;font-weight:bold;color:#1B3A5C"
);

console.log(
"%cDesigned & Developed with ❤️",
"font-size:14px;color:#4A7FB5"
);