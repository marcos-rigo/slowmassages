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

  // Initialize theme: default to light mode unless dark mode is explicitly chosen
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark'
    if (isDark) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
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
    <main className="relative min-h-screen w-full flex flex-col items-center px-4 pb-8 transition-colors duration-300 overflow-x-hidden">
      {/* Dynamic ambient backgrounds via CSS variable */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: 'var(--ambient-glow)',
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <div className="absolute top-[10%] left-[-15%] w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none animate-breathe-slow" />
      <div className="absolute top-[40%] left-[25%] w-72 h-72 rounded-full bg-accent/12 blur-3xl pointer-events-none animate-breathe-slow animation-delay-4000" />
      <div className="absolute top-[65%] right-[-15%] w-96 h-96 rounded-full bg-accent/18 blur-3xl pointer-events-none animate-breathe-slow animation-delay-2000" />

      {/* Header controls (Theme Switcher) */}
      <div className="w-full max-w-sm flex justify-end pt-6 relative z-20">
        <button
          onClick={toggleDarkMode}
          aria-label="Alternar tema oscuro"
          className="
            flex items-center justify-center w-10 h-10 rounded-2xl
            border border-border bg-card/65 backdrop-blur-md text-foreground
            hover:border-primary/45 hover:bg-card/85 active:scale-95
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
        <div className="w-full rounded-[32px] border border-border/80 bg-card/65 backdrop-blur-2xl p-6 shadow-premium">
          <ProfileHeader />
          
          {/* Bio statement */}
          <div className="text-center mt-2 mb-6 px-2 text-sm leading-relaxed text-muted-foreground/90 font-light tracking-wide">
            <p>
              Un espacio diseñado para desacelerar, liberar las tensiones acumuladas en el cuerpo y reconectar con un estado de calma mental profunda. 
            </p>
            <p className="mt-4 text-[11px] font-semibold text-foreground/70 flex items-center justify-center gap-1.5 uppercase tracking-wider">
              <Sparkles size={12} className="text-primary" />
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
