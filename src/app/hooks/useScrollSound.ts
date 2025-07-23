"use client"

import { useEffect, useRef, useState } from 'react'

interface SoundEffect {
  name: string
  url: string
  volume?: number
}

const soundEffects: SoundEffect[] = [
  {
    name: 'scroll',
    url: '/sounds/scroll.mp3',
    volume: 0.3
  },
  {
    name: 'section-change',
    url: '/sounds/section-change.mp3', 
    volume: 0.4
  },
  {
    name: 'hover',
    url: '/sounds/hover.mp3',
    volume: 0.2
  }
]

export function useScrollSound() {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  const [isEnabled, setIsEnabled] = useState(true)
  const lastScrollTime = useRef(0)
  const lastSection = useRef<string>('')

  useEffect(() => {
    // Preload audio files
    soundEffects.forEach(sound => {
      const audio = new Audio(sound.url)
      audio.volume = sound.volume || 0.3
      audio.preload = 'auto'
      audioRefs.current[sound.name] = audio
    })

    return () => {
      // Cleanup audio elements
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause()
        audio.src = ''
      })
    }
  }, [])

  const playSound = (soundName: string) => {
    if (!isEnabled) return
    
    const audio = audioRefs.current[soundName]
    if (audio) {
      // Reset audio to beginning
      audio.currentTime = 0
      audio.play().catch(err => {
        console.log('Audio play failed:', err)
      })
    }
  }

  const playScrollSound = () => {
    const now = Date.now()
    // Throttle scroll sounds to avoid spam
    if (now - lastScrollTime.current > 100) {
      playSound('scroll')
      lastScrollTime.current = now
    }
  }

  const playSectionChangeSound = (section: string) => {
    if (section !== lastSection.current) {
      playSound('section-change')
      lastSection.current = section
    }
  }

  const toggleSound = () => {
    setIsEnabled(!isEnabled)
  }

  return {
    playScrollSound,
    playSectionChangeSound,
    playSound,
    toggleSound,
    isEnabled
  }
} 