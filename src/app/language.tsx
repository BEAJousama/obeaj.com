"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown } from "lucide-react"

const languages = [
  { code: "en", name: "English", emoji: "🇺🇸" },
  { code: "fr", name: "Français", emoji: "🇫🇷" },
  { code: "es", name: "Español", emoji: "🇪🇸" },
  { code: "de", name: "Deutsch", emoji: "🇩🇪" },
  { code: "it", name: "Italiano", emoji: "🇮🇹" },
  { code: "pt", name: "Português", emoji: "🇵🇹" },
  { code: "ru", name: "Русский", emoji: "🇷🇺" },
  { code: "ja", name: "日本語", emoji: "🇯🇵" },
  { code: "ko", name: "한국어", emoji: "🇰🇷" },
  { code: "zh", name: "中文", emoji: "🇨🇳" },
  { code: "ar", name: "العربية", emoji: "🇸🇦" },
  { code: "hi", name: "हिन्दी", emoji: "🇮🇳" },
]

export default function LanguageDropdown() {
  const [language, setLanguage] = useState("en")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div >
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm border-[0.5px] border-cyan-400/30 rounded-2xl p-2 hover:bg-black/30 transition-all duration-200 hover:border-cyan-400/50 group"
        >
          <Globe size={18} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <div className="flex items-center space-x-2">
            <span className="text-sm">{currentLanguage.emoji}</span>
            <span className="text-cyan-400 font-medium text-sm">{currentLanguage.code.toUpperCase()}</span>
          </div>
          <ChevronDown
            size={16}
            className={`text-cyan-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-full left-0 mt-2 w-64 bg-black/40 backdrop-blur-md border-[0.5px] border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-400/10 transition-all duration-300 origin-top z-50 ${
            isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full flex items-center space-x-3 p-3 rounded-2xl transition-all duration-200 hover:bg-cyan-400/10 hover:border-cyan-400/20 border-[0.5px] border-transparent group ${
                  language === lang.code ? "bg-cyan-400/20 border-cyan-400/30" : ""
                }`}
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{lang.emoji}</span>
                <div className="flex-1 text-left">
                  <div className="text-cyan-400 font-medium text-sm">{lang.name}</div>
                  <div className="text-cyan-400/60 text-xs">{lang.code.toUpperCase()}</div>
                </div>
                {language === lang.code && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Backdrop overlay for mobile */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </div>
  )
}
