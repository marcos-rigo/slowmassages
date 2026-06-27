'use client'

import { useState, useEffect } from 'react'
import { ProfileHeader } from '@/components/profile-header'
import { SocialButton } from '@/components/social-button'
import { AppointmentWidget } from '@/components/appointment-widget'
import { PageFooter } from '@/components/page-footer'
import { Sun, Moon, Sparkles, Clock, Compass, Heart } from 'lucide-react'
import Image from 'next/image'

function InstagramIcon({ size = 18, strokeWidth = 1.5, className = '' }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const INSTAGRAM_URL = 'https://instagram.com/slowmassages'
const WHATSAPP_NUMBER = '5493816689786'
const WHATSAPP_DIRECT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me comunico desde la página 👋')}`

const SERVICES_DATA = [
  {
    id: 'calma',
    name: 'Masaje Calma Profunda',
    description: 'Sesión suave y envolvente enfocada en desacelerar el ritmo mental, reducir el estrés y relajar las tensiones más sutiles. Con aceites templados de lavanda.',
    duration: '60/90 min',
    tags: ['Estrés', 'Ansiedad', 'Relajación profunda'],
    recommended: true
  },
  {
    id: 'descontracturante',
    name: 'Masaje Liberación & Alivio',
    description: 'Terapia física enfocada en disolver contracturas crónicas, aliviar dolor muscular y restaurar la movilidad. Incluye aplicación localizada de calor.',
    duration: '60/90 min',
    tags: ['Dolor muscular', 'Tensión física', 'Piedras calientes']
  },
  {
    id: 'signature',
    name: 'Experiencia Slow Signature',
    description: 'Tratamiento exclusivo e integral que combina estiramientos pasivos, reflexología y aromaterapia personalizada. Un viaje completo de bienestar.',
    duration: '75 min',
    tags: ['Holístico', 'Reconexión', 'Té herbal cortesía']
  }
]

const INSTAGRAM_FEED = [
  { id: 1, src: '/images/massage_stones.png', alt: 'Piedras calientes y aceites', likes: 142, comments: 18 },
  { id: 2, src: '/images/massage_session.png', alt: 'Sesión de masajes', likes: 216, comments: 34 },
  { id: 3, src: '/images/massage_salon.png', alt: 'Gabinete de masajes zen', likes: 189, comments: 22 }
]

export default function Home() {
  const [selectedService, setSelectedService] = useState('')
  const [darkMode, setDarkMode] = useState(false)

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

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName)
    const element = document.getElementById('booking-widget')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center px-4 pb-8 transition-colors duration-300">
      {/* Dynamic ambient backgrounds */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.68 0.055 42 / 0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 90%, oklch(0.64 0.05 88 / 0.05) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.52 0.055 42 / 0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 90%, oklch(0.56 0.06 88 / 0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-[60%] right-[10%] w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

      {/* Header controls (Theme Switcher) */}
      <div className="w-full max-w-5xl flex justify-end pt-6 relative z-20">
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
          {darkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Responsive layout container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 mt-2 items-start">
        
        {/* Left Column (Sticky Sidebar on Desktop) */}
        <div className="w-full lg:col-span-5 lg:sticky lg:top-8 flex flex-col gap-4">
          <div className="w-full rounded-3xl border border-border bg-card/45 backdrop-blur-xl p-6 shadow-sm">
            <ProfileHeader />
            
            {/* Bio statement */}
            <div className="text-center lg:text-left mt-2 mb-6 px-2 text-sm leading-relaxed text-muted-foreground font-light">
              <p>
                Un espacio diseñado para desacelerar, liberar las tensiones acumuladas en el cuerpo y reconectar con un estado de calma mental profunda. 
              </p>
              <p className="mt-2.5 font-medium text-foreground/80 flex items-center justify-center lg:justify-start gap-1.5">
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
        </div>

        {/* Right Column (Scrollable Content on Desktop) */}
        <div className="w-full lg:col-span-7 flex flex-col gap-6 mt-6 lg:mt-0">
          
          {/* Section: Massages menu */}
          <section className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-2.5 px-1">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/20 text-accent-foreground">
                <Heart size={14} />
              </span>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Nuestros Masajes</h2>
            </div>
            
            <div className="flex flex-col gap-3">
              {SERVICES_DATA.map((s) => (
                <div
                  key={s.id}
                  className={`
                    group relative rounded-3xl border border-border bg-card/55 backdrop-blur-md p-5
                    shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/25
                    ${s.recommended ? 'ring-1 ring-primary/25' : ''}
                  `}
                >
                  {s.recommended && (
                    <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-full border border-primary/20">
                      Recomendado
                    </span>
                  )}
                  <div className="flex justify-between items-start mb-2 pr-20">
                    <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {s.name}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light mb-4">
                    {s.description}
                  </p>
                  
                  {/* Footer card */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40">
                    <div className="flex flex-wrap gap-1">
                      {s.tags.map((t) => (
                        <span key={t} className="text-[10px] text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-md font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleSelectService(s.name)}
                      className="
                        flex items-center gap-1 text-xs font-semibold text-primary
                        hover:underline active:scale-95 transition-transform duration-200 cursor-pointer
                      "
                    >
                      <Clock size={12} />
                      <span>Reservar {s.duration}</span>
                      <Compass size={11} className="ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Appointment Widget */}
          <section className="w-full">
            <AppointmentWidget
              selectedService={selectedService}
              onSelectService={setSelectedService}
            />
          </section>

          {/* Section: Instagram Simulated Feed */}
          <section className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary">
                  <InstagramIcon size={14} />
                </span>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Espacio Slow</h2>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-medium"
              >
                <span>Ver Instagram</span>
                <Compass size={12} />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {INSTAGRAM_FEED.map((item) => (
                <a
                  key={item.id}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-border/40 shadow-sm cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 33vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Glassmorphic Instagram Overlay */}
                  <div className="
                    absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100
                    flex flex-col items-center justify-center gap-2 text-white
                    transition-opacity duration-300 backdrop-blur-[2px]
                  ">
                    <InstagramIcon size={20} strokeWidth={1.5} />
                    <div className="flex items-center gap-3 text-[10px] font-semibold tracking-wider">
                      <span className="flex items-center gap-1">❤️ {item.likes}</span>
                      <span className="flex items-center gap-1">💬 {item.comments}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <PageFooter />
        </div>
      </div>
    </main>
  )
}
