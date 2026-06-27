'use client'

import { useState, useEffect } from 'react'
import { ProfileHeader } from '@/components/profile-header'
import { SocialButton } from '@/components/social-button'
import { AppointmentWidget } from '@/components/appointment-widget'
import { PageFooter } from '@/components/page-footer'
import { Sun, Moon, Sparkles } from 'lucide-react'

const INSTAGRAM_URL = 'https://instagram.com/slowmassages'
const WHATSAPP_NUMBER = '5493816689786'
const WHATSAPP_DIRECT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me comunico desde la página 👋')}`

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  // Initialize theme from localStorage or system settings
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (isDark) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center px-4 pb-8 transition-colors duration-300">
      {/* Dynamic ambient backgrounds via CSS variable */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: 'var(--ambient-glow)',
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-[60%] right-[10%] w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

      {/* Header controls (Theme Switcher) */}
      <div className="w-full max-w-sm flex justify-end pt-6 relative z-20">
        <button
          onClick={toggleDarkMode}
          aria-label="Alternar tema oscuro"
          className="
            flex items-center justify-center w-10 h-10 rounded-2xl
            border border-border bg-card/65 backdrop-blur-md text-foreground
            hover:border-primary/40 hover:bg-card/85 active:scale-95
            transition-all duration-300 shadow-sm cursor-pointer
          "
        >
          {/* CSS-only theme icons to prevent hydration mismatches */}
          <Sun className="hidden dark:block" size={18} strokeWidth={1.5} />
          <Moon className="block dark:hidden" size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Centered layout container */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-4 mt-2">
        {/* Profile Card */}
        <div className="w-full rounded-3xl border border-border bg-card/45 backdrop-blur-xl p-6 shadow-sm">
          <ProfileHeader />
          
          {/* Bio statement */}
          <div className="text-center mt-2 mb-6 px-2 text-sm leading-relaxed text-muted-foreground font-light">
            <p>
              Un espacio diseñado para desacelerar, liberar las tensiones acumuladas en el cuerpo y reconectar con un estado de calma mental profunda. 
            </p>
            <p className="mt-2.5 font-medium text-foreground/80 flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="text-primary" />
              Gabinete privado · Atención personalizada
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-col gap-3" aria-label="Enlaces directos">
            <SocialButton
              href={INSTAGRAM_URL}
              iconName="instagram"
              label="Instagram"
              sublabel="@slowmassages"
              delay="animation-delay-200"
            />

            <SocialButton
              href={WHATSAPP_DIRECT_URL}
              iconName="whatsapp"
              label="WhatsApp Directo"
              sublabel="Escribinos en un clic"
              delay="animation-delay-300"
            />
          </div>
        </div>

        {/* Appointment Widget Card */}
        <div className="w-full">
          <AppointmentWidget />
        </div>

        <PageFooter />
      </div>
    </main>
  )
}
