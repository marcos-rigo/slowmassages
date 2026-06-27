'use client'

import { useState } from 'react'
import { CalendarDays, Clock, MessageCircle } from 'lucide-react'

const PHONE_NUMBER = '5493816689786'

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
  '16:30', '17:00', '17:30', '18:00', '18:30', '19:00',
]

function formatDateSpanish(dateStr: string): string {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  const daysOfWeek = [
    'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
  ]
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ]
  const dayName = daysOfWeek[dateObj.getDay()]
  return `${dayName} ${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`
}

export function AppointmentWidget() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  // Minimum date = today
  const today = new Date().toISOString().split('T')[0]

  const handleConsult = () => {
    if (!date || !time) return

    const formattedDate = formatDateSpanish(date)
    const message = `Hola! 📅 Te hablo desde la página y quería consultar disponibilidad de turno para el día ${formattedDate} a las ${time} hs. ⏰`
    const encoded = encodeURIComponent(message)
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encoded}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const isReady = date && time

  return (
    <div className="w-full rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-sm p-5 animate-fade-in-up animation-delay-500">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-primary shrink-0">
          <CalendarDays size={18} strokeWidth={1.5} />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">Solicitar Turno</p>
          <p className="text-xs text-muted-foreground">Elegí día y horario</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Date picker */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="apt-date" className="text-xs text-muted-foreground tracking-wide uppercase font-medium">
            Día
          </label>
          <div className="relative">
            <input
              id="apt-date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="
                w-full rounded-xl border border-border bg-secondary/70
                px-3 py-2.5 text-sm text-foreground
                focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary/50
                transition-all duration-200
                placeholder:text-muted-foreground
                appearance-none cursor-pointer
              "
            />
          </div>
        </div>

        {/* Time select */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="apt-time" className="text-xs text-muted-foreground tracking-wide uppercase font-medium">
            Horario
          </label>
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              id="apt-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="
                w-full rounded-xl border border-border bg-secondary/70
                pl-8 pr-3 py-2.5 text-sm text-foreground
                focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary/50
                transition-all duration-200
                appearance-none cursor-pointer
              "
            >
              <option value="">-- hs --</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot} hs</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60 mb-4" />

      {/* CTA Button */}
      <button
        onClick={handleConsult}
        disabled={!isReady}
        aria-label="Consultar disponibilidad por WhatsApp"
        className="
          group w-full flex items-center justify-center gap-2.5
          rounded-2xl px-5 py-3.5
          bg-primary text-primary-foreground
          text-sm font-medium tracking-wide
          shadow-sm
          transition-all duration-300
          hover:opacity-90 hover:shadow-md hover:-translate-y-0.5
          active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-sm
        "
      >
        <MessageCircle size={16} strokeWidth={1.5} />
        <span>Consultar Disponibilidad por WhatsApp</span>
      </button>

      {!isReady && (
        <p className="text-center text-xs text-muted-foreground mt-2.5">
          Seleccioná un día y horario para continuar
        </p>
      )}
    </div>
  )
}
