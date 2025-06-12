"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SectionContextType = {
  currentSection: string
  setCurrentSection: (section: string) => void
}

const SectionContext = createContext<SectionContextType>({
  currentSection: "home",
  setCurrentSection: () => {},
})

export function SectionProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState("home")

  return <SectionContext.Provider value={{ currentSection, setCurrentSection }}>{children}</SectionContext.Provider>
}

export function useSectionContext() {
  return useContext(SectionContext)
}
