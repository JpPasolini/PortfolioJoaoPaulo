"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState("dark")
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    const texts = ["Estudante de Ciência da Computação", "Desenvolvedor Frontend", "Apaixonado por Tecnologia"]
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    const typingElement = document.querySelector(".typing-text")

    function type() {
      if (!typingElement) return

      const currentText = texts[textIndex]

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1)
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

    type()
  }, [])

  useEffect(() => {
    const canvas = document.getElementById("particles") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
    }> = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.fillStyle = "rgba(0, 102, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollY = window.pageYOffset

      sections.forEach((section) => {
        const sectionHeight = section.clientHeight
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionId = section.getAttribute("id")

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId || "home")
        }
      })

      // Skill bars animation
      const skillBars = document.querySelectorAll(".skill-progress-bar")
      skillBars.forEach((bar) => {
        const rect = bar.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = bar.getAttribute("data-progress")
          ;(bar as HTMLElement).style.width = `${progress}%`
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <>
      {/* Social Sidebar */}
      <aside className="social-sidebar">
        <a
          href="https://github.com/JpPasolini"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="social-link"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/joão-paulo-pasolini-bbb96836b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="social-link"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a href="mailto:pasolinijp@gmail.com" aria-label="Email" className="social-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
        <div className="social-line"></div>
      </aside>

      {/* Theme Toggle */}
      <button
        className="theme-toggle-btn"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Alternar tema"
      >
        <svg
          className="sun-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg
          className="moon-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      {/* Navigation */}
      <nav className="nav">
        <a href="#home" className={`nav-link ${activeSection === "home" ? "active" : ""}`}>
          Início
        </a>
        <a href="#about" className={`nav-link ${activeSection === "about" ? "active" : ""}`}>
          Sobre
        </a>
        <a href="#experience" className={`nav-link ${activeSection === "experience" ? "active" : ""}`}>
          Experiência
        </a>
        <a href="#skills" className={`nav-link ${activeSection === "skills" ? "active" : ""}`}>
          Skills
        </a>
        <a href="#projects" className={`nav-link ${activeSection === "projects" ? "active" : ""}`}>
          Projetos
        </a>
        <a href="#contact" className={`nav-link ${activeSection === "contact" ? "active" : ""}`}>
          Contato
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <canvas className="particles" id="particles"></canvas>
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-greeting">Olá, eu sou</span>
              <span className="hero-name">João Paulo Pasolini</span>
            </h1>
            <p className="hero-subtitle">
              <span className="typing-text"></span>
              <span className="cursor">|</span>
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                Entre em Contato
              </a>
              <a href="/assets/curriculo.pdf" download className="btn btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download CV
              </a>
            </div>
          </div>
          <div className="scroll-indicator">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section" id="about">
        <div className="container">
          <h2 className="section-title">Sobre Mim</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Sou estudante de <strong>Ciência da Computação</strong> na Atitus Educação (Passo Fundo/RS), atualmente
                no 2º semestre. Trabalhador multifuncional com experiência em atendimento, rotinas administrativas e
                desenvolvimento web, em transição para área de monitoramento e tecnologia.
              </p>
              <p>
                Com experiência em empresas locais como <strong>Ancinelpa</strong> (2021-2023) e{" "}
                <strong>Coopercampos</strong> (2023), desenvolvi habilidades sólidas em atendimento ao cliente, gestão
                de caixa e estoque, controle de documentos e processos administrativos. Aprendi a importância da
                comunicação eficaz, trabalho em equipe e adaptação tecnológica.
              </p>
              <p>
                Hoje, estou focado em aplicar esses conhecimentos no desenvolvimento web, criando interfaces funcionais,
                responsivas e bem organizadas. Busco oportunidades para crescer como desenvolvedor, combinando minha
                experiência administrativa com habilidades técnicas em HTML, CSS, JavaScript e ferramentas modernas de
                desenvolvimento.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Proatividade e resiliência</span>
                </div>
                <div className="highlight-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Aprendizado contínuo</span>
                </div>
                <div className="highlight-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Trabalho em equipe</span>
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">2+</div>
                <div className="stat-label">Anos de Experiência</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">15+</div>
                <div className="stat-label">Projetos Concluídos</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">800+</div>
                <div className="stat-label">Horas de Código</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Dedicação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section experience-section" id="experience">
        <div className="container">
          <h2 className="section-title">Experiência & Formação</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">2025 - Presente</span>
                <h3>Ciência da Computação</h3>
                <h4>Atitus Educação - Passo Fundo/RS</h4>
                <p>
                  Cursando 2º semestre com foco em desenvolvimento web, estruturas de dados, algoritmos e programação
                  orientada a objetos.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">2023 (3 meses)</span>
                <h3>Assistente Administrativo / Caixa</h3>
                <h4>Coopercampos - São Jorge/RS</h4>
                <p>
                  Atendimento ao cliente e operação de caixa, lançamento e conferência de notas fiscais no sistema,
                  apoio no controle de estoque e reposição de mercadorias, rotinas administrativas e fechamento de caixa
                  com precisão.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">2021 - 2023</span>
                <h3>Caixa / Atendente / Auxiliar Administrativo</h3>
                <h4>Anicipelia - São Jorge/RS</h4>
                <p>
                  Atendimento a clientes presencial e por telefone, operação completa de caixa (abertura, fechamento,
                  conferência), cadastro e atualização de clientes/produtos, controle de estoque, emissão de notas
                  fiscais eletrônicas, apoio administrativo e financeiro, e suporte em multitarefas.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">2020 - 2022</span>
                <h3>Ensino Médio Completo</h3>
                <h4>Colégio Estadual José Chiochetta - Guabiju/RS</h4>
                <p>
                  Concluí o ensino médio com foco em exatas e tecnologia, desenvolvendo interesse por programação e
                  desenvolvimento de software.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section skills-section" id="skills">
        <div className="container">
          <h2 className="section-title">Habilidades & Tecnologias</h2>

          <div className="skills-categories">
            <div className="skill-category">
              <h3 className="category-title">Frontend Development</h3>
              <div className="skill-bars">
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>HTML5</span>
                    <span>90%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar" data-progress="90"></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>CSS3</span>
                    <span>85%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar" data-progress="85"></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>JavaScript</span>
                    <span>80%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar" data-progress="80"></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>Responsive Design</span>
                    <span>90%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar" data-progress="90"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3 className="category-title">Ferramentas & Outros</h3>
              <div className="skill-bars">
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>Git & GitHub</span>
                    <span>85%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar" data-progress="85"></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>VS Code</span>
                    <span>90%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar" data-progress="90"></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>Figma</span>
                    <span>70%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar" data-progress="70"></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>Excel</span>
                    <span>85%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar" data-progress="85"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tech-stack">
            <h3 className="tech-stack-title">Tecnologias que utilizo</h3>
            <div className="tech-tags">
              <span className="tech-tag">HTML5</span>
              <span className="tech-tag">CSS3</span>
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">Git</span>
              <span className="tech-tag">GitHub</span>
              <span className="tech-tag">Responsive Design</span>
              <span className="tech-tag">Flexbox</span>
              <span className="tech-tag">Grid</span>
              <span className="tech-tag">VS Code</span>
              <span className="tech-tag">Figma</span>
              <span className="tech-tag">Netlify</span>
              <span className="tech-tag">Vercel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Projetos em Destaque</h2>
          <div className="projects-grid">
            <article className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=300&width=500" alt="Landing Page Responsiva" loading="lazy" />
                <div className="project-overlay">
                  <span className="project-status">Concluído</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Landing Page Responsiva</h3>
                <p className="project-description">
                  Landing page moderna e totalmente responsiva com animações suaves, design clean e otimizada para
                  conversão. Desenvolvida com HTML5, CSS3 e JavaScript vanilla.
                </p>
                <div className="project-tags">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>JavaScript</span>
                  <span>Responsive</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/JpPasolini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Código
                  </a>
                  <a href="#" className="project-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Demo
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=300&width=500" alt="Portfólio Pessoal" loading="lazy" />
                <div className="project-overlay">
                  <span className="project-status">Concluído</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Portfólio Pessoal</h3>
                <p className="project-description">
                  Site de portfólio profissional com tema claro/escuro, animações ao scroll, efeitos de partículas e
                  design minimalista. Totalmente responsivo e otimizado para performance.
                </p>
                <div className="project-tags">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>JavaScript</span>
                  <span>Canvas API</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/JpPasolini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Código
                  </a>
                  <a href="#" className="project-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Demo
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=300&width=500" alt="Calculadora de IMC" loading="lazy" />
                <div className="project-overlay">
                  <span className="project-status">Concluído</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Calculadora de IMC</h3>
                <p className="project-description">
                  Aplicação em Java para calcular o Índice de Massa Corporal (IMC) com interface gráfica intuitiva.
                  Permite ao usuário inserir peso e altura para obter classificação de saúde instantânea.
                </p>
                <div className="project-tags">
                  <span>Java</span>
                  <span>Swing</span>
                  <span>GUI</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/JpPasolini/IMC-em-Java"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Código
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=300&width=500" alt="Projeto Iron Man" loading="lazy" />
                <div className="project-overlay">
                  <span className="project-status">Concluído</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">IronMan JP</h3>
                <p className="project-description">
                  Projeto criativo em Python inspirado no universo Iron Man. Aplicação interativa com recursos de
                  automação e interface temática, demonstrando habilidades em programação orientada a objetos.
                </p>
                <div className="project-tags">
                  <span>Python</span>
                  <span>OOP</span>
                  <span>Automation</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/JpPasolini/IronMan-JP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Código
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=300&width=500" alt="Paper Run Game" loading="lazy" />
                <div className="project-overlay">
                  <span className="project-status">Concluído</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Paper Run - Konan Edition</h3>
                <p className="project-description">
                  Jogo interativo desenvolvido em HTML5, CSS3 e JavaScript puro. Apresenta mecânicas de corrida infinita
                  com design retrô e controles responsivos, demonstrando domínio de Canvas API e game loops.
                </p>
                <div className="project-tags">
                  <span>HTML5</span>
                  <span>JavaScript</span>
                  <span>Canvas API</span>
                  <span>Game Dev</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/JpPasolini/Paper-Run-Konan-Edition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Código
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=300&width=500" alt="Análise Pirataria Jogos" loading="lazy" />
                <div className="project-overlay">
                  <span className="project-status">Concluído</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Análise: Pirataria de Jogos no Brasil</h3>
                <p className="project-description">
                  Projeto de análise de dados utilizando Python e Jupyter Notebook para investigar padrões de pirataria
                  de jogos no Brasil. Inclui visualizações de dados, estatísticas e insights sobre o mercado.
                </p>
                <div className="project-tags">
                  <span>Python</span>
                  <span>Pandas</span>
                  <span>Data Analysis</span>
                  <span>Jupyter</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/JpPasolini/Pirataria-Jogos-Brasil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Código
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=300&width=500" alt="Sistema Biblioteca" loading="lazy" />
                <div className="project-overlay">
                  <span className="project-status">Concluído</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Sistema de Biblioteca</h3>
                <p className="project-description">
                  Sistema completo de gerenciamento de biblioteca desenvolvido em Java. Permite cadastro de livros,
                  usuários, controle de empréstimos e devoluções com interface gráfica amigável.
                </p>
                <div className="project-tags">
                  <span>Java</span>
                  <span>Swing</span>
                  <span>CRUD</span>
                  <span>Database</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/JpPasolini/SistemaBiblioteca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Código
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=300&width=500" alt="Sistema de Cadastro" loading="lazy" />
                <div className="project-overlay">
                  <span className="project-status">Concluído</span>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Sistema de Cadastro</h3>
                <p className="project-description">
                  Sistema de cadastro desenvolvido em Java para a disciplina de Organização e Abstração da Programação.
                  Implementa conceitos de POO, validação de dados e persistência de informações.
                </p>
                <div className="project-tags">
                  <span>Java</span>
                  <span>OOP</span>
                  <span>Validation</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/rlkgutomv/Sistema-de-cadastro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Código
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Vamos Trabalhar Juntos?</h2>
          <p className="contact-subtitle">
            Estou sempre aberto a discutir novos projetos, ideias criativas
            <br />
            ou oportunidades para fazer parte da sua visão.
          </p>
          <div className="contact-info">
            <a href="mailto:pasolinijp@gmail.com" className="contact-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <div>
                <div className="contact-label">Email</div>
                <span>pasolinijp@gmail.com</span>
              </div>
            </a>
            <a href="tel:+5554999268153" className="contact-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <div className="contact-label">Telefone</div>
                <span>(54) 99926-8153</span>
              </div>
            </a>
            <div className="contact-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <div className="contact-label">Localização</div>
                <span>São Jorge - RS, Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 João Paulo Pasolini. Desenvolvido com dedicação e café ☕</p>
          <div className="footer-links">
            <a href="https://github.com/JpPasolini" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/joão-paulo-pasolini-bbb96836b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:pasolinijp@gmail.com">Email</a>
          </div>
        </div>
      </footer>

      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  )
}
