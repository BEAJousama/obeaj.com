"use client"

import type React from "react"

import { useCallback, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Linkedin, Twitter, Menu, X, Globe } from "lucide-react"
import WebGLBackground from "./components/WebGLBackground"
import { useSectionContext } from "./components/SectionContext"
import { useIntersectionObserver } from "./hooks/useIntersectionObserver"

// Language content
const content = {
  en: {
    name: "BEAJ OUSAMA",
    title: "Fullstack Web Developer",
    roles: ["Developer", "Designer", "Creator"],
    nav: {
      work: "Work",
      about: "About",
      contact: "Contact",
      resume: "Resume",
    },
    about: {
      title: "About",
      description:
        "I'm Beaj Ousama, a creative Fullstack Web Developer with expertise in Next.js, React.js, and Tailwind CSS. Background in cybersecurity and embedded systems, with a strong understanding of information systems architecture.",
      description2:
        "Passionate about building attractive and functional web applications. Constantly learning and evolving with modern technologies like Docker, Kubernetes, and cloud platforms.",
    },
    education: {
      title: "Education",
      items: [
        {
          id: "01",
          school: "1337 SCHOOL (42 NETWORK)",
          period: "2021 - Present",
          degree: "Information Systems Architecture",
          location: "Khouribga, Morocco",
        },
        {
          id: "02",
          school: "INSA CVL",
          period: "2018 - 2019",
          degree: "Information Security and Technologies",
          location: "Bourges, France",
        },
        {
          id: "03",
          school: "ENSA KENITRA",
          period: "2014 - 2018",
          degree: "Networks and Telecommunications",
          location: "Kenitra, Morocco",
        },
      ],
    },
    skills: {
      title: "Technical Skills",
      categories: [
        {
          name: "Frontend",
          skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
          name: "Backend",
          skills: ["NestJS", "Node.js", "PostgreSQL", "MongoDB"],
        },
        {
          name: "DevOps",
          skills: ["Docker", "Kubernetes", "Ansible", "Linux"],
        },
      ],
    },
    projects: {
      title: "Projects",
      items: [
        {
          id: "01",
          title: "PONGMASTERS",
          period: "May 2023 - Aug 2023",
          technologies: ["NestJS", "PostgreSQL", "Socket.io", "Next.js"],
          description:
            "Developed an online Pong game playable with friends, featuring real-time matches and an integrated chat system for live interaction.",
        },
        {
          id: "02",
          title: "BEIGE PILL",
          period: "Dec 2023 - May 2024",
          technologies: ["Next.js", "Sanity CMS", "GSAP"],
          description:
            "Created a minimalist portfolio website for a Paris-based digital studio with smooth animations and headless CMS integration.",
        },
        {
          id: "03",
          title: "FLEMING WATCHES",
          period: "Mar 2024 - Apr 2024",
          technologies: ["Next.js", "Klaviyo", "SendGrid"],
          description:
            "Developed a fully-featured e-commerce platform for a luxury watch brand with integrated email marketing.",
        },
        {
          id: "04",
          title: "CLOUD-1",
          period: "Oct 2024 - Nov 2024",
          technologies: ["Docker", "Ansible", "DigitalOcean"],
          description: "Containerized and automated the deployment of web applications on DigitalOcean cloud platform.",
        },
      ],
      viewAll: "View All",
    },
    experience: {
      title: "Experience",
      items: [
        {
          id: "01",
          position: "Fullstack Web Developer",
          company: "FUTURECORP",
          period: "Nov 2023 - Mar 2025",
          location: "Paris, France (Remote)",
          description:
            "Built dynamic portfolio websites and client platforms using Next.js, React, and TypeScript. Integrated headless CMS platforms like Sanity and Strapi for flexible content management.",
        },
        {
          id: "02",
          position: "Embedded Linux Intern",
          company: "OCCITALINE",
          period: "Apr 2019 - Sep 2019",
          location: "Toulouse, France",
          description: "Design and configuration of a LoRaWAN gateway for technical building management systems.",
        },
        {
          id: "03",
          position: "Cybersecurity Intern",
          company: "IT6",
          period: "Jun 2017 - Jul 2017",
          location: "Rabat, Morocco",
          description: "Contributed to a SIEM-Elastic Stack project for cybersecurity event management and monitoring.",
        },
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Want to work on your projects? I am looking for opportunities in software engineering, UI/UX, and would love to hear from you. Let's connect!",
      form: {
        name: "NAME",
        email: "EMAIL",
        message: "MESSAGE",
        send: "Send",
      },
    },
  },
  fr: {
    name: "BEAJ OUSAMA",
    title: "Développeur Web Fullstack",
    roles: ["Développeur", "Designer", "Créateur"],
    nav: {
      work: "Travail",
      about: "À propos",
      contact: "Contact",
      resume: "CV",
    },
    about: {
      title: "À propos",
      description:
        "Je suis Beaj Ousama, un développeur Web Fullstack créatif avec une expertise en Next.js, React.js et Tailwind CSS. Formation en cybersécurité et systèmes embarqués, avec une solide compréhension de l'architecture des systèmes d'information.",
      description2:
        "Passionné par la création d'applications web attrayantes et fonctionnelles. En constante évolution avec les technologies modernes comme Docker, Kubernetes et les plateformes cloud.",
    },
    education: {
      title: "Formation",
      items: [
        {
          id: "01",
          school: "1337 SCHOOL (RÉSEAU 42)",
          period: "2021 - Présent",
          degree: "Architecture des systèmes d'information",
          location: "Khouribga, Maroc",
        },
        {
          id: "02",
          school: "INSA CVL",
          period: "2018 - 2019",
          degree: "Sécurité de l'information et technologies",
          location: "Bourges, France",
        },
        {
          id: "03",
          school: "ENSA KÉNITRA",
          period: "2014 - 2018",
          degree: "Réseaux et Télécommunications",
          location: "Kénitra, Maroc",
        },
      ],
    },
    skills: {
      title: "Compétences Techniques",
      categories: [
        {
          name: "Frontend",
          skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
          name: "Backend",
          skills: ["NestJS", "Node.js", "PostgreSQL", "MongoDB"],
        },
        {
          name: "DevOps",
          skills: ["Docker", "Kubernetes", "Ansible", "Linux"],
        },
      ],
    },
    projects: {
      title: "Projets",
      items: [
        {
          id: "01",
          title: "PONGMASTERS",
          period: "Mai 2023 - Août 2023",
          technologies: ["NestJS", "PostgreSQL", "Socket.io", "Next.js"],
          description:
            "Développement d'un jeu Pong en ligne jouable entre amis, avec des matchs en temps réel et un système de messagerie intégré.",
        },
        {
          id: "02",
          title: "BEIGE PILL",
          period: "Déc 2023 - Mai 2024",
          technologies: ["Next.js", "Sanity CMS", "GSAP"],
          description:
            "Création d'un site portfolio minimaliste pour un studio digital basé à Paris avec animations fluides et CMS headless.",
        },
        {
          id: "03",
          title: "FLEMING WATCHES",
          period: "Mars 2024 - Avril 2024",
          technologies: ["Next.js", "Klaviyo", "SendGrid"],
          description:
            "Développement d'une plateforme e-commerce complète pour une marque de montres de luxe avec marketing par email intégré.",
        },
        {
          id: "04",
          title: "CLOUD-1",
          period: "Oct 2024 - Nov 2024",
          technologies: ["Docker", "Ansible", "DigitalOcean"],
          description:
            "Containerisation et automatisation du déploiement d'applications web sur la plateforme cloud DigitalOcean.",
        },
      ],
      viewAll: "Voir Tout",
    },
    experience: {
      title: "Expérience",
      items: [
        {
          id: "01",
          position: "Développeur Web Fullstack",
          company: "FUTURECORP",
          period: "Nov 2023 - Mars 2025",
          location: "Paris, France (À distance)",
          description:
            "Création de sites web dynamiques et plateformes clients avec Next.js, React et TypeScript. Intégration de CMS headless comme Sanity et Strapi.",
        },
        {
          id: "02",
          position: "Stagiaire Linux Embarqué",
          company: "OCCITALINE",
          period: "Avril 2019 - Sep 2019",
          location: "Toulouse, France",
          description: "Conception et configuration d'une passerelle LoRaWAN pour la gestion technique de bâtiments.",
        },
        {
          id: "03",
          position: "Stagiaire Cybersécurité",
          company: "IT6",
          period: "Juin 2017 - Juillet 2017",
          location: "Rabat, Maroc",
          description:
            "Contribution à un projet SIEM basé sur Elastic Stack pour la gestion des événements de sécurité cybernétique.",
        },
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Envie de travailler sur vos projets ? Je recherche des opportunités en ingénierie logicielle, UI/UX, et serais ravi d'avoir de vos nouvelles. Connectons-nous !",
      form: {
        name: "NOM",
        email: "EMAIL",
        message: "MESSAGE",
        send: "Envoyer",
      },
    },
  },
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  const { setCurrentSection } = useSectionContext()

  const handleIntersection = useCallback(() => {
    setCurrentSection(id)
  }, [id, setCurrentSection])

  const sectionRef = useIntersectionObserver(handleIntersection)

  return (
    <section ref={sectionRef} id={id} className={`min-h-screen flex items-center justify-center ${className}`}>
      {children}
    </section>
  )
}

export default function Home() {
  // const [showAllProjects, setShowAllProjects] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  const t = content[language]

  // const scrollProjects = (direction: "left" | "right") => {
  //   if (!projectsRef.current) return
  //   const scrollAmount = 350
  //   const currentScroll = projectsRef.current.scrollLeft
  //   projectsRef.current.scrollTo({
  //     left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
  //     behavior: "smooth",
  //   })
  // }

  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <WebGLBackground />

      {/* Language Selector */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-2">
          <Globe size={16} className="text-cyan-400" />
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              language === "en" ? "bg-cyan-400 text-black" : "text-cyan-400 hover:bg-cyan-400/20"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("fr")}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              language === "fr" ? "bg-cyan-400 text-black" : "text-cyan-400 hover:bg-cyan-400/20"
            }`}
          >
            FR
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-2 text-cyan-400"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Left Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: sidebarOpen || isDesktop ? 0 : -100 }}
          exit={{ x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 h-full w-20 flex justify-between flex-col items-center z-40 bg-black/20 backdrop-blur-sm border-r border-cyan-400/20 py-6"
        >
          {/* Logo */}
          <div className="text-3xl font-bold text-cyan-400 flex justify-center items-center p-4">
            <div className="w-12 h-12 border-2 border-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-lg">B</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="transform -rotate-90 flex space-x-8 text-sm text-gray-400 font-light tracking-wider">
            <a href="#home" className="hover:text-cyan-400 transition-colors duration-300">
              {t.nav.work}
            </a>
            <a href="#about" className="hover:text-cyan-400 transition-colors duration-300">
              {t.nav.about}
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors duration-300">
              {t.nav.contact}
            </a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors duration-300">
              {t.nav.resume}
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex flex-col space-y-4">
            <a
              href="https://linkedin.com/in/beaj-ousama"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/oussamabeaj"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <Github size={16} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              <Twitter size={16} />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right Side Contact Button */}
      <div className="fixed top-6 right-6 z-30">
        <a
          href="#contact"
          className="border border-cyan-400 text-cyan-400 px-6 py-2 rounded hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm font-light tracking-wider"
        >
          {t.nav.contact}
        </a>
      </div>

      {/* Home Section */}
      <Section id="home" className={`relative z-10 pl-${sidebarOpen ? 12 : 4} sm:pl-12`}>
        <div className="max-w-7xl w-full flex items-center justify-between px-8">
          <div className="flex-1 max-w-md">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 mb-6 text-sm tracking-wider font-light"
            >
              {"I'M"} {t.name}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl font-bold mb-8 leading-tight"
            >
              <span className="text-cyan-400">{t.roles[0]}</span>
              <br />
              <span className="text-gray-500">{t.roles[1]}</span>
              <br />
              <span className="text-gray-600">{t.roles[2]}</span>
            </motion.h1>
          </div>

          {/* 3D Visualization Area */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-96 h-96">
              {/* Circular wireframe design */}
              <div className="absolute inset-0 border border-cyan-400/30 rounded-full"></div>
              <div className="absolute inset-4 border border-cyan-400/20 rounded-full"></div>
              <div className="absolute inset-8 border border-cyan-400/10 rounded-full"></div>

              {/* Center shape */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-16 border border-cyan-400/40 rounded-full"></div>

              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="text-cyan-400">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right side badges */}
          <div className="flex flex-col space-y-4 items-center">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-cyan-400 text-xs">JS</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-cyan-400 text-xs">TS</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-cyan-400 text-xs">+5</div>
            </div>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="relative z-10 pl-20">
        <div className="max-w-7xl w-full px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - About */}
            <div>
              <h2 className="text-5xl font-bold mb-2">
                <span className="text-cyan-400">{t.about.title}</span>
                <br />
                <span className="text-gray-500">{t.about.title}</span>
              </h2>

              <div className="mt-12">
                <div className="w-48 h-64 bg-gray-800 rounded-lg mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 text-2xl font-bold">B</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">{t.about.description}</p>

                <p className="text-gray-400 text-sm leading-relaxed">{t.about.description2}</p>
              </div>
            </div>

            {/* Right Column - Education */}
            <div className="bg-black/10 backdrop-blur-md rounded-lg p-4">
              <h3 className="text-2xl font-bold text-white mb-8">{t.education.title}</h3>

              <div className="space-y-8">
                {t.education.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-cyan-400 text-sm">{item.id}</span>
                      <span className="text-cyan-400 text-xs">Full Stack</span>
                    </div>
                    <h4 className="text-white font-semibold mb-1">{item.school}</h4>
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>{item.period}</span>
                      <span>{item.degree}</span>
                    </div>
                    <div className="text-xs text-gray-500">{item.location}</div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-8">{t.skills.title}</h3>

                <div className="space-y-6">
                  {t.skills.categories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-cyan-400 text-sm">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h4 className="text-white text-sm mb-1">{category.name.toUpperCase()}</h4>
                      <div className="text-xs text-gray-400">{category.skills.join(", ")}</div>
                    </div>
                  ))}
                </div>

                <button className="mt-8 border border-cyan-400 text-cyan-400 px-6 py-2 rounded text-sm hover:bg-cyan-400 hover:text-black transition-all duration-300">
                  {t.projects.viewAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="relative z-10 pl-20">
        <div className="max-w-7xl w-full px-8 bg-black/10 backdrop-blur-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold">
              <span className="text-cyan-400">{t.projects.title}</span>
              <br />
              <span className="text-gray-500">{t.projects.title}</span>
            </h2>
          </div>

          <div className="space-y-12 pl-12">
            {t.projects.items.map((project) => (
              <div key={project.id} className="border-b border-gray-800 pb-12">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-cyan-400 text-sm">{project.id}</span>
                  <div className="flex space-x-4 text-xs text-gray-400">
                    {project.technologies.map((tech, index) => (
                      <span key={index}>{tech}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4 text-xs text-gray-400">
                    <span>{project.period}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Github size={16} className="text-gray-400 hover:text-cyan-400 cursor-pointer" />
                    <ExternalLink size={16} className="text-gray-400 hover:text-cyan-400 cursor-pointer" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4 max-w-2xl">• {project.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded text-sm hover:bg-cyan-400 hover:text-black transition-all duration-300">
              {t.projects.viewAll}
            </button>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="relative z-10 pl-20">
        <div className="max-w-7xl w-full px-8 bg-black/10 backdrop-blur-md rounded-lg p-4">
          <h2 className="text-5xl font-bold mb-12">
            <span className="text-cyan-400">{t.experience.title}</span>
            <br />
            <span className="text-gray-500">{t.experience.title}</span>
          </h2>

          <div className="space-y-12 pl-12">
            {t.experience.items.map((exp) => (
              <div key={exp.id} className="border-b border-gray-800 pb-12">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-cyan-400 text-sm">{exp.id}</span>
                  <div className="text-xs text-gray-400">{exp.period}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{exp.position}</h3>
                <p className="text-cyan-400 text-sm mb-4">
                  {exp.company} - {exp.location}
                </p>
                <p className="text-gray-400 text-sm max-w-2xl">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="relative z-10 pl-20">
        <div className="max-w-7xl w-full px-8 bg-black/10 backdrop-blur-md rounded-lg p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              <h2 className="text-5xl font-bold mb-12">
                <span className="text-cyan-400">{t.contact.title}</span>
                <br />
                <span className="text-gray-500">{t.contact.title}</span>
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md">{t.contact.description}</p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400">📧</span>
                  <span className="text-gray-300">ousama.beaj2@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400">📱</span>
                  <span className="text-gray-300">+212 626 432 399</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400">📍</span>
                  <span className="text-gray-300">Morocco</span>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-xs mb-2 tracking-wider">{t.contact.form.name}</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs mb-2 tracking-wider">{t.contact.form.email}</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs mb-2 tracking-wider">{t.contact.form.message}</label>
                  <textarea
                    rows={6}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>
                <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded text-sm hover:bg-cyan-400 hover:text-black transition-all duration-300">
                  {t.contact.form.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
