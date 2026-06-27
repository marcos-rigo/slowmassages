'use client'

import { useState, useEffect } from 'react'
import { ProfileHeader } from '@/components/profile-header'
import { SocialButton } from '@/components/social-button'
import { AppointmentWidget } from '@/components/appointment-widget'
import { PageFooter } from '@/components/page-footer'
import { Sun, Moon, Sparkles, Monitor, Smartphone } from 'lucide-react'

const INSTAGRAM_URL = 'https://instagram.com/slowmassages'
const WHATSAPP_NUMBER = '5493816689786'
const WHATSAPP_DIRECT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me comunico desde la página 👋')}`

export default function FrontendDesignPage() {
  const [darkMode, setDarkMode] = useState(false)

  // Initialize theme from localStorage or system settings
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
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
    <main className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300 p-4 md:p-8 flex flex-col items-center">
      {/* Dynamic ambient backgrounds */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: 'var(--ambient-glow)',
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <div className="absolute top-[10%] left-[-10%] w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none animate-breathe-slow" />
      <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 rounded-full bg-accent/18 blur-3xl pointer-events-none animate-breathe-slow animation-delay-2000" />

      {/* Header controls */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 relative z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-light tracking-wide text-foreground">
            Diseño Premium — Slow Massages
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Vista previa responsiva en tiempo real (Mobile &amp; Escritorio)
          </p>
        </div>
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
          <Sun className="hidden dark:block" size={18} strokeWidth={1.5} />
          <Moon className="block dark:hidden" size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Grid container for previews */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* MOBILE PREVIEW */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 text-xs tracking-wider uppercase font-semibold text-muted-foreground">
            <Smartphone size={14} />
            <span>Versión Mobile (375px)</span>
          </div>
          
          {/* Simulated Mobile Device Frame */}
          <div className="
            w-[375px] h-[780px] rounded-[48px] border-[10px] border-foreground/15 bg-background
            overflow-y-auto scrollbar-none shadow-2xl relative
            transition-colors duration-300
          ">
            {/* Top camera notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 rounded-full bg-foreground/10 z-30" />
            
            {/* Mobile screen content */}
            <div className="p-4 pt-8 min-h-full flex flex-col items-center justify-between">
              <div className="w-full flex flex-col gap-4 mt-2">
                {/* Profile Card */}
                <div className="w-full rounded-[32px] border border-border/80 bg-card/65 backdrop-blur-2xl p-5 shadow-premium">
                  <ProfileHeader />
                  
                  {/* Bio statement */}
                  <div className="text-center mt-2 mb-6 px-1 text-xs leading-relaxed text-muted-foreground/90 font-light tracking-wide">
                    <p>
                      Un espacio diseñado para desacelerar, liberar las tensiones acumuladas en el cuerpo y reconectar con un estado de calma mental profunda. 
                    </p>
                    <p className="mt-4 text-[9px] font-semibold text-foreground/70 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                      <Sparkles size={10} className="text-primary" />
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
                      delay="animation-delay-100"
                    />

                    <SocialButton
                      href={WHATSAPP_DIRECT_URL}
                      iconName="whatsapp"
                      label="WhatsApp Directo"
                      sublabel="Escribinos en un clic"
                      delay="animation-delay-200"
                    />
                  </div>
                </div>

                {/* Appointment Widget Card */}
                <div className="w-full">
                  <AppointmentWidget />
                </div>
              </div>
              <PageFooter />
            </div>
          </div>
        </div>

        {/* DESKTOP PREVIEW */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 text-xs tracking-wider uppercase font-semibold text-muted-foreground">
            <Monitor size={14} />
            <span>Versión Escritorio (Escala reducida)</span>
          </div>

          {/* Simulated Desktop Window Frame */}
          <div className="
            w-full h-[780px] rounded-[32px] border border-border/80 bg-background
            overflow-y-auto scrollbar-none shadow-2xl relative
            transition-colors duration-300 flex flex-col
          ">
            {/* Window bar */}
            <div className="w-full h-10 border-b border-border/60 bg-card/45 backdrop-blur-md flex items-center px-4 gap-1.5 shrink-0 z-20">
              <div className="w-3 h-3 rounded-full bg-red-400/85" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/85" />
              <div className="w-3 h-3 rounded-full bg-green-400/85" />
              <div className="text-[11px] text-muted-foreground/60 ml-4 font-medium tracking-wide">
                https://slowmassages.com
              </div>
            </div>

            {/* Desktop screen content */}
            <div className="flex-1 p-8 overflow-y-auto flex flex-col items-center justify-between min-h-full">
              <div className="w-full max-w-sm flex flex-col gap-4 mt-2">
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
              </div>
              <PageFooter />
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
