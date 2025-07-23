"use client"

import type React from "react"

import { useCallback, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, easeInOut, easeOut, easeIn } from "framer-motion"
import { ExternalLink, Github, Linkedin, Twitter, Menu, X, Globe, ArrowBigLeft, ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react"
import WebGLBackground from "./components/WebGLBackground"
import { useSectionContext } from "./components/SectionContext"
import { useIntersectionObserver } from "./hooks/useIntersectionObserver"
import { useScrollSound } from "./hooks/useScrollSound"
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
import LanguageDropdown from "./language"
import { getPageColor } from "./lib/utils"


gsap.registerPlugin(useGSAP)


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
  const { playSectionChangeSound } = useScrollSound()
  const color = getPageColor(id)

  const handleIntersection = useCallback(() => {
    setCurrentSection(id)
    playSectionChangeSound(id)
  }, [id, setCurrentSection, playSectionChangeSound])

  const sectionRef = useIntersectionObserver(handleIntersection)

  return (
    <motion.section
    ref={sectionRef} id={id} className={`min-h-screen flex items-center justify-center ${className}`}>
      {children}
    </motion.section>
  )
}

export default function Home() {
  // const [showAllProjects, setShowAllProjects] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [isDesktop, setIsDesktop] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const hero = useRef(null)
  const { playScrollSound, playSectionChangeSound, toggleSound, isEnabled } = useScrollSound()


  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  // Add scroll tracking with sound effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      playScrollSound()
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [playScrollSound])

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
    <main ref={hero} className="flex flex-col gap-32 md:gap-6 relative bg-black text-white overflow-x-hidden ">
      <WebGLBackground scrollY={scrollY} />

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-4 left-4 z-50 md:hidden bg-cyan-400/20 backdrop-blur-sm border-[0.5px] border-cyan-400/30 rounded-2xl p-2 text-cyan-400 ${sidebarOpen ? "ml-12" : ""}`}
      >
        {
        sidebarOpen ? <span className="text-cyan-400">
          <ArrowLeft size={20} />
        </span> : <span className="text-cyan-400">
          <ArrowRight size={20} />
        </span>
        }
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
            <div className="w-12 h-12 border-[0.5px]  border-cyan-400 rounded-2xl flex items-center justify-center">
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
      <div className="flex gap-2 fixed top-6 right-6 z-30">
        <button
          onClick={toggleSound}
          className="border-[0.5px] border-cyan-400 text-cyan-400 px-3 py-2 rounded hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm font-light tracking-wider"
          title={isEnabled ? "Disable Sound" : "Enable Sound"}
        >
          {isEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <a
          href="#contact"
          className="border-[0.5px] border-cyan-400 text-cyan-400 px-6 py-2 rounded hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm font-light tracking-wider"
        >
          {t.nav.contact}
        </a>
        <LanguageDropdown />
      </div>


      {/* Home Section */}
      <Section id="home" className={`relative z-10 pl-${sidebarOpen ? 12 : 4} sm:pl-12`}>
        <div className="max-w-7xl w-full flex items-center justify-between px-8">
          <div className="flex-1 max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              {/* Futuristic accent line */}
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-cyan-400 via-blue-400 to-transparent rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-cyan-400 mb-6 text-sm tracking-wider font-light uppercase" 
              >
                {"I'M"} {t.name}
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-7xl font-bold mb-8 leading-tight"
              >
                <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                  {t.roles[0]}
                </span>
                <br />
                <span className="text-gray-400 bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                  {t.roles[1]}
                </span>
                <br />
                <span className="text-gray-500 bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent">
                  {t.roles[2]}
                </span>
              </motion.h1>
            </motion.div>
          </div>

          {/* 3D Visualization Area */}
          {/* <div className="flex-1 flex justify-center items-center">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 border-[0.5px] border-cyan-400/30 rounded-full"></div>
              <div className="absolute inset-4 border-[0.5px] border-cyan-400/20 rounded-full"></div>
              <div className="absolute inset-8 border-[0.5px] border-cyan-400/10 rounded-full"></div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-16 border-[0.5px] border-cyan-400/40 rounded-full"></div>

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
          </div> */}

          {/* Futuristic skill badges */}
          <div className="flex flex-col space-y-6 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-black/30 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-4 text-center shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300">
                <div className="text-cyan-400 text-sm font-mono">JS</div>
                <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-black/30 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-4 text-center shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300">
                <div className="text-cyan-400 text-sm font-mono">TS</div>
                <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-black/30 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-4 text-center shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300">
                <div className="text-cyan-400 text-sm font-mono">+5</div>
                <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className={`relative z-10 pl-${sidebarOpen ? 12 : 4} sm:pl-12`}>
        <div className="max-w-7xl w-full px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-12 py-32">
            {/* Left Column - About */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <h2 className="text-5xl font-bold mb-8 relative">
                  <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent ">
                    {t.about.title}
                  </span>
                  <br />
                  <span className="text-cyan-400 opacity-20 transform translate-x-[5px] translate-y-[-0.9em] block ">
                    {t.about.title}
                  </span>
                </h2>

                <div className="mt-12 space-y-8">
                  {/* Futuristic profile card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative group"
                  >
                    <div className="w-64 h-80 bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-md border border-cyan-400/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-300">
                      {/* Glowing border effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 rounded-2xl"></div>
                      
                      <div className="relative z-10 w-full h-full bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 border border-cyan-400/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                          <span className="text-cyan-400 text-4xl font-bold">B</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Futuristic description card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-black/20 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.05)] hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <p className="text-gray-300 text-md leading-relaxed">{t.about.description}</p>
                      <p className="text-gray-400 text-md leading-relaxed">{t.about.description2}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Education */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-black/20 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.05)] hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all duration-300"
            >
              <h3 className="text-3xl font-bold mb-8">
                <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent uppercase">
                  {t.education.title}
                </span>
                <br />
                <span className="text-cyan-400 opacity-20 transform translate-x-[5px] translate-y-[-0.9em] block uppercase">
                  {t.education.title}
                </span>
              </h3>

              <div className="space-y-6">
                {t.education.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="bg-black/10 backdrop-blur-sm border border-cyan-400/10 rounded-xl p-4 hover:border-cyan-400/30 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-cyan-400 text-sm font-mono bg-cyan-400/10 px-2 py-1 rounded">
                          {item.id}
                        </span>
                        <span className="text-cyan-400 text-xs bg-gradient-to-r from-cyan-400/20 to-blue-400/20 px-2 py-1 rounded">
                          Full Stack
                        </span>
                      </div>
                      <h4 className="text-white font-semibold mb-2 text-lg">{item.school}</h4>
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span className="bg-gray-800/50 px-2 py-1 rounded">{item.period}</span>
                        <span className="bg-gray-800/50 px-2 py-1 rounded">{item.degree}</span>
                      </div>
                      <div className="text-xs text-gray-500 bg-gray-800/30 px-2 py-1 rounded inline-block">
                        {item.location}
                      </div>
                    </div>
                  </motion.div>
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

                <button className="mt-8 border-[0.5px] border-cyan-400 text-cyan-400 px-6 py-2 rounded text-sm hover:bg-cyan-400 hover:text-black transition-all duration-300">
                  {t.projects.viewAll}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className={`relative z-10 pl-${sidebarOpen ? 12 : 4} sm:pl-12`}>
        <div className="max-w-7xl w-full px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 className="text-6xl w-fit font-bold mb-16 relative">
              <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent ">
                {t.projects.title}
              </span>
              <br />
              <span className="text-cyan-400 opacity-20 transform translate-x-[5px] translate-y-[-0.9em] block ">
                {t.projects.title}
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.projects.items.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-300 group-hover:border-cyan-400/50">
                  {/* Futuristic overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 rounded-2xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-cyan-400/5 to-transparent rounded-2xl pointer-events-none"></div>
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 pointer-events-none"></div>
                  <div className="absolute inset-[1px] rounded-2xl border border-cyan-400/10 pointer-events-none"></div>
                  
                  {/* Project header */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-cyan-400 text-sm font-mono bg-cyan-400/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                        {project.id}
                      </span>
                      <div className="flex space-x-2">
                        <Github size={16} className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors hover:shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
                        <ExternalLink size={16} className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors hover:shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    
                    <p className="text-cyan-400 text-xs mb-4 font-mono bg-cyan-400/10 px-2 py-1 rounded inline-block">
                      {project.period}
                    </p>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/30 rounded-full text-xs text-cyan-400 font-mono shadow-[0_0_8px_rgba(0,255,255,0.1)] hover:shadow-[0_0_12px_rgba(0,255,255,0.2)] transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-[0.5px] border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg text-sm hover:bg-cyan-400 hover:text-black transition-all duration-300 backdrop-blur-sm bg-black/20"
            >
              {t.projects.viewAll}
            </motion.button>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className={`relative z-10 pl-${sidebarOpen ? 12 : 4} sm:pl-12`}>
        <div className="max-w-7xl w-full px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 className="text-6xl w-fit font-bold mb-16 relative">
              <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent ">
                {t.experience.title}
              </span>
              <br />
              <span className="text-cyan-400 opacity-20 transform translate-x-[5px] translate-y-[-0.9em] block ">
                {t.experience.title}
              </span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {t.experience.items.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-black/20 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.05)] hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all duration-300">
                  {/* Futuristic accent line */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent rounded-full"></div>
                  
                  <div className="pl-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-cyan-400 text-sm font-mono bg-cyan-400/20 px-3 py-1 rounded-full">
                        {exp.id}
                      </span>
                      <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                        {exp.period}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {exp.position}
                    </h3>
                    <p className="text-cyan-400 text-sm mb-4 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 px-3 py-1 rounded-full inline-block">
                      {exp.company} - {exp.location}
                    </p>
                    <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className={`relative z-10 pl-${sidebarOpen ? 12 : 4} sm:pl-12`}>
        <div className="max-w-7xl w-full px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 className="text-6xl font-bold mb-16 relative">
              <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {t.contact.title}
              </span>
              <br />
              <span className="text-gray-500 bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent">
                {t.contact.title}
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md">{t.contact.description}</p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center space-x-4 bg-black/20 backdrop-blur-md border border-cyan-400/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <span className="text-cyan-400 text-xl">📧</span>
                  <span className="text-gray-300 font-mono">ousama.beaj2@gmail.com</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center space-x-4 bg-black/20 backdrop-blur-md border border-cyan-400/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <span className="text-cyan-400 text-xl">📱</span>
                  <span className="text-gray-300 font-mono">+212 626 432 399</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-center space-x-4 bg-black/20 backdrop-blur-md border border-cyan-400/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <span className="text-cyan-400 text-xl">📍</span>
                  <span className="text-gray-300 font-mono">Morocco</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-black/20 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,255,0.05)] hover:shadow-[0_0_40px_rgba(0,255,255,0.1)] transition-all duration-300"
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-cyan-400 text-xs mb-2 tracking-wider font-mono">{t.contact.form.name}</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 text-xs mb-2 tracking-wider font-mono">{t.contact.form.email}</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 text-xs mb-2 tracking-wider font-mono">{t.contact.form.message}</label>
                  <textarea
                    rows={6}
                    className="w-full bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/40 text-cyan-400 px-8 py-3 rounded-lg text-sm hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)]"
                >
                  {t.contact.form.send}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </Section>
    </main>
  )
}