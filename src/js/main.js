document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const currentTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const theme = html.getAttribute("data-theme");
      const newTheme = theme === "light" ? "dark" : "light";
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function highlightNavigation() {
    const scrollY = window.scrollY;
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    const isAtBottom =
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 5;
    const isAtTop = scrollY < 150;

    if (isAtBottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(".nav-menu li:last-child .nav-link")
        .classList.add("active");
    } else if (isAtTop) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(".nav-menu li:first-child .nav-link")
        .classList.add("active");
    }
  }

  window.addEventListener("scroll", highlightNavigation);

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const canvas = document.getElementById("particlesCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const particleCount = 60;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0)
          this.x = (this.x + canvas.width) % canvas.width;
        if (this.y > canvas.height || this.y < 0)
          this.y = (this.y + canvas.height) % canvas.height;
      }
      draw() {
        const theme = html.getAttribute("data-theme");
        ctx.fillStyle =
          theme === "dark"
            ? "rgba(255, 255, 255, 0.4)"
            : "rgba(59, 130, 246, 0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    init();
    animate();
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  const typingText = document.getElementById("typingText");
  if (typingText) {
    const texts = [
      "Estudante de Ciência da Computação",
      "Desenvolvedor Front-End",
      "Experiência em Atendimento",
      "Transformando ideias em código",
    ];
    let textIndex = 0,
      charIndex = 0,
      isDeleting = false;

    function type() {
      const currentText = texts[textIndex];
      let typeSpeed = isDeleting ? 50 : 100;

      if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }
      setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);
  }

  const observers = [];
  const createObserver = (handler, options) => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handler(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, options);
    return observer;
  };

  const skillObserver = createObserver(
    (target) => {
      target.querySelectorAll(".skill-progress").forEach((bar) => {
        bar.style.width = bar.getAttribute("data-progress") + "%";
      });
    },
    { threshold: 0.3 }
  );
  document
    .querySelectorAll(".skill-category")
    .forEach((el) => skillObserver.observe(el));

  const statsObserver = createObserver(
    (target) => {
      const end = parseInt(target.getAttribute("data-target"));
      let current = 0;
      const increment = end / 100;
      const update = () => {
        if (current < end) {
          current += increment;
          target.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          target.textContent = end;
        }
      };
      update();
    },
    { threshold: 0.5 }
  );
  document
    .querySelectorAll(".stat-number")
    .forEach((el) => statsObserver.observe(el));

  const scrollAnimObserver = createObserver(
    (target) => {
      target.style.opacity = "1";
      target.style.transform = "translateY(0)";
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  document
    .querySelectorAll(
      ".project-card, .stat-card, .contact-card, .timeline-item, .skill-category, .feature-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      scrollAnimObserver.observe(el);
    });

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.boxShadow =
        window.scrollY > 100 ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none";
    });
  }

  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
  }

  console.log(
    "%c👋 Olá, desenvolvedor curioso!",
    "font-size: 20px; font-weight: bold; color: #3b82f6;"
  );
  console.log(
    "%cGostou do portfólio? Vamos trabalhar juntos!",
    "font-size: 14px; color: #64748b;"
  );
  console.log(
    "%cContato: pasolinijp@gmail.com",
    "font-size: 14px; color: #64748b;"
  );
});
