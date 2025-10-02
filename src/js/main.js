document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // Theme Toggle
  // ===================================

  const themeToggle = document.getElementById("themeToggle")
  const html = document.documentElement

  const currentTheme = localStorage.getItem("theme") || "light"
  html.setAttribute("data-theme", currentTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const theme = html.getAttribute("data-theme")
      const newTheme = theme === "light" ? "dark" : "light"
      html.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
    })
  }

  // ===================================
  // Mobile Menu Toggle
  // ===================================

  const mobileToggle = document.getElementById("mobileToggle")
  const navMenu = document.getElementById("navMenu")

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // ===================================
  // Smooth Scroll & Active Navigation
  // ===================================

  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")

  function highlightNavigation() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 150
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavigation)

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })

  // ===================================
  // Particles Animation
  // ===================================

  const canvas = document.getElementById("particlesCanvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 60

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        const theme = html.getAttribute("data-theme")
        ctx.fillStyle = theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(59, 130, 246, 0.3)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Connect particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const theme = html.getAttribute("data-theme")
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(255, 255, 255, ${0.15 - distance / 800})`
                : `rgba(59, 130, 246, ${0.2 - distance / 600})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  // ===================================
  // Typing Animation
  // ===================================

  const typingText = document.getElementById("typingText")
  if (typingText) {
    const texts = [
      "Estudante de Ciência da Computação",
      "Desenvolvedor Frontend",
      "Experiência em Atendimento",
      "Transformando ideias em código",
    ]

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false

    function type() {
      const currentText = texts[textIndex]

      if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
      } else {
        typingText.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
      }

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typeSpeed = 500
      }

      setTimeout(type, typeSpeed)
    }

    setTimeout(type, 1000)
  }

  // ===================================
  // Skill Bars Animation
  // ===================================

  const skillBarsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll(".skill-progress")
          progressBars.forEach((bar) => {
            const progress = bar.getAttribute("data-progress")
            bar.style.width = progress + "%"
          })
          skillBarsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 },
  )

  document.querySelectorAll(".skill-category").forEach((category) => {
    skillBarsObserver.observe(category)
  })

  // ===================================
  // Stats Counter Animation
  // ===================================

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.getAttribute("data-target"))
          const duration = 2000
          const increment = target / (duration / 16)
          let current = 0

          const updateCounter = () => {
            current += increment
            if (current < target) {
              entry.target.textContent = Math.floor(current)
              requestAnimationFrame(updateCounter)
            } else {
              entry.target.textContent = target
            }
          }

          updateCounter()
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".stat-number").forEach((stat) => {
    statsObserver.observe(stat)
  })

  // ===================================
  // Scroll Animations
  // ===================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  document
    .querySelectorAll(".project-card, .stat-card, .contact-card, .timeline-item, .skill-category, .feature-item")
    .forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      observer.observe(el)
    })

  // ===================================
  // Navbar Scroll Effect
  // ===================================

  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.boxShadow = "none"
    }

    lastScroll = currentScroll
  })

  // ===================================
  // Console Message
  // ===================================

  console.log("%c👋 Olá, desenvolvedor curioso!", "font-size: 20px; font-weight: bold; color: #3b82f6;")
  console.log("%cGostou do portfólio? Vamos trabalhar juntos!", "font-size: 14px; color: #64748b;")
  console.log("%cContato: pasolinijp@gmail.com", "font-size: 14px; color: #64748b;")

// ===================================
  // Botão Voltar ao Topo
  // ===================================

  const backToTopBtn = document.getElementById("backToTopBtn")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      // Mostra o botão se o usuário rolou mais de 300 pixels
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible")
      } else {
        backToTopBtn.classList.remove("visible")
      }
    })
    
    // A rolagem suave já é tratada pelo seu código existente de nav-links,
    // então não precisamos adicionar um evento de clique aqui. O href="#home" já funciona.
  }

}) // End of DOMContentLoaded wrapper
