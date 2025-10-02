// ===================================
// Theme Toggle
// ===================================

const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

const currentTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
  const theme = html.getAttribute("data-theme")
  const newTheme = theme === "light" ? "dark" : "light"
  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
})

// ===================================
// Smooth Scroll & Active Navigation
// ===================================

const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll("section[id]")

function highlightNavigation() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 200
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

const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []
const particleCount = 80

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
    ctx.fillStyle = theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.3)"
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

      if (distance < 100) {
        const theme = html.getAttribute("data-theme")
        ctx.strokeStyle =
          theme === "dark" ? `rgba(255, 255, 255, ${0.2 - distance / 500})` : `rgba(0, 0, 0, ${0.1 - distance / 1000})`
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

// ===================================
// Loading Screen
// ===================================

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
  }, 1000)
})

// ===================================
// Typing Animation
// ===================================

const typingText = document.querySelector(".typing-text")
const texts = [
  "Estudante de Ciência da Computação",
  "Desenvolvedor Frontend",
  "Experiência em Atendimento e Administração",
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

// Start typing animation after loading
setTimeout(type, 1500)

// ===================================
// Skill Bars Animation
// ===================================

const skillBarsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress-bar")
        progressBars.forEach((bar) => {
          const progress = bar.getAttribute("data-progress")
          bar.style.width = progress + "%"
        })
        skillBarsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".skill-category").forEach((category) => {
  skillBarsObserver.observe(category)
})

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document.querySelectorAll(".project-card, .stat-card, .contact-card, .timeline-item, .skill-category").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease-out"
  observer.observe(el)
})

// ===================================
// Console Message
// ===================================

console.log("%c👋 Olá, desenvolvedor curioso!", "font-size: 20px; font-weight: bold; color: #0066ff;")
console.log("%cGostou do portfólio? Vamos trabalhar juntos!", "font-size: 14px; color: #6c757d;")
console.log("%cContato: pasolinijp@gmail.com", "font-size: 14px; color: #6c757d;")
