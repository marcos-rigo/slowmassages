'use client'

import { useState, useMemo } from 'react'
import { CalendarDays, Clock, MessageCircle, Calendar } from 'lucide-react'

const PHONE_NUMBER = '5493816689786'

const TIME_SLOTS = {
  morning: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'],
  afternoon: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'],
}

export function AppointmentWidget() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customDate, setCustomDate] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Minimum date = today
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], [])

  // Generate next 7 days
  const carouselDays = useMemo(() => {
    const days = []
    const daysOfWeekAbbr = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
    const daysOfWeekFull = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    const monthsAbbr = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    const monthsFull = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]

    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() + i)
      
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const dd = String(d.getDate()).padStart(2, '0')
      const dateStr = `${yyyy}-${mm}-${dd}`

      days.push({
        dateStr,
        dayAbbr: daysOfWeekAbbr[d.getDay()],
        dayNumber: d.getDate(),
        monthAbbr: monthsAbbr[d.getMonth()],
        fullDateSpanish: `${daysOfWeekFull[d.getDay()]} ${d.getDate()} de ${monthsFull[d.getMonth()]} de ${yyyy}`,
      })
    }
    return days
  }, [])

  // Format spanish date from custom input
  const formatCustomDateSpanish = (dateStr: string): string => {
    if (!dateStr) return ''
    const [year, month, day] = dateStr.split('-')
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
    const dayName = daysOfWeek[dateObj.getDay()]
    return `${dayName} ${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`
  }

  // Active date display and formatted version for message
  const activeDateObj = useMemo(() => {
    if (!selectedDate) return null
    const carouselMatch = carouselDays.find(d => d.dateStr === selectedDate)
    if (carouselMatch) {
      return {
        label: `${carouselMatch.dayAbbr.toUpperCase()} ${carouselMatch.dayNumber}`,
        formatted: carouselMatch.fullDateSpanish
      }
    }
    return {
      label: selectedDate.split('-')[2] + '/' + selectedDate.split('-')[1],
      formatted: formatCustomDateSpanish(selectedDate)
    }
  }, [selectedDate, carouselDays])

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr)
    setShowDatePicker(false)
  }

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setCustomDate(val)
    if (val) {
      setSelectedDate(val)
    }
  }

  const handleConsult = () => {
    if (!selectedDate || !selectedTime) return

    const formattedDate = activeDateObj ? activeDateObj.formatted : selectedDate
    const message = `Hola! 📅 Te hablo desde la página y quería consultar disponibilidad de turno para el día ${formattedDate} a las ${selectedTime} hs. ⏰`
    const encoded = encodeURIComponent(message)
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encoded}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const isReady = selectedDate && selectedTime

  return (
    <div id="booking-widget" className="w-full rounded-3xl border border-border bg-card/75 backdrop-blur-xl shadow-lg p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-primary text-primary-foreground shrink-0 shadow-md shadow-primary/20">
          <CalendarDays size={20} strokeWidth={1.5} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">Agenda tu Turno</h3>
          <p className="text-xs text-muted-foreground">Elegí fecha y hora</p>
        </div>
      </div>

      {/* 1. Date Selection (Carousel) */}
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-between">
          <label className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            1. Elige el Día
          </label>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            <Calendar size={13} />
            {showDatePicker ? 'Usar carrusel' : 'Elegir otra fecha'}
          </button>
        </div>

        {showDatePicker ? (
          <div className="relative">
            <input
              type="date"
              min={todayStr}
              value={customDate}
              onChange={handleCustomDateChange}
              className="
                w-full rounded-2xl border border-border bg-secondary/40
                px-4 py-3 text-sm text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary/50
                transition-all duration-200 cursor-pointer
              "
            />
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none snap-x snap-mandatory">
            {carouselDays.map((d) => {
              const isSelected = selectedDate === d.dateStr
              return (
                <button
                  key={d.dateStr}
                  onClick={() => handleDateSelect(d.dateStr)}
                  className={`
                    snap-start flex flex-col items-center justify-center min-w-[62px] h-[76px] rounded-2xl border
                    transition-all duration-300 shrink-0 cursor-pointer active:scale-[0.96]
                    ${isSelected
                      ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                      : 'border-border bg-secondary/40 text-foreground hover:border-primary/40 hover:bg-secondary/80'
                    }
                  `}
                >
                  <span className="text-[10px] tracking-wider uppercase font-semibold opacity-75">{d.dayAbbr}</span>
                  <span className="text-lg font-bold my-0.5">{d.dayNumber}</span>
                  <span className="text-[10px] tracking-wide font-medium opacity-80">{d.monthAbbr}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* 2. Time Selection */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xs text-muted-foreground tracking-widest uppercase font-medium flex items-center gap-1.5">
          <Clock size={12} />
          2. Elige el Horario
        </label>

        <div className="flex flex-col gap-4 bg-secondary/25 border border-border/40 rounded-2xl p-4">
          {/* Morning Slots */}
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1 mb-2.5">
              🌅 Mañana
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {TIME_SLOTS.morning.map((slot) => {
                const isSelected = selectedTime === slot
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`
                      py-2 text-xs font-semibold rounded-xl border transition-all duration-200 active:scale-[0.95]
                      ${isSelected
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/10'
                        : 'border-border bg-card text-foreground hover:border-primary/40 hover:text-foreground'
                      }
                    `}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/40" />

          {/* Afternoon Slots */}
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1 mb-2.5">
              🌇 Tarde
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {TIME_SLOTS.afternoon.map((slot) => {
                const isSelected = selectedTime === slot
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`
                      py-2 text-xs font-semibold rounded-xl border transition-all duration-200 active:scale-[0.95]
                      ${isSelected
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/10'
                        : 'border-border bg-card text-foreground hover:border-primary/40 hover:text-foreground'
                      }
                    `}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary Box */}
      {isReady && (
        <div className="mb-5 rounded-2xl bg-primary/5 border border-primary/20 p-4 animate-fade-in">
          <h4 className="text-xs font-bold text-primary tracking-wide uppercase mb-1">Resumen del Turno</h4>
          <p className="text-xs text-foreground font-medium leading-relaxed">
            📅 {activeDateObj?.formatted} <br />
            ⏰ {selectedTime} hs
          </p>
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={handleConsult}
        disabled={!isReady}
        aria-label="Consultar disponibilidad por WhatsApp"
        className="
          group w-full flex items-center justify-center gap-2.5
          rounded-2xl px-5 py-4
          bg-primary text-primary-foreground
          text-sm font-semibold tracking-wide
          shadow-md shadow-primary/20
          transition-all duration-300
          hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
          active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-sm
        "
      >
        <MessageCircle size={18} strokeWidth={1.5} />
        <span>Consultar Disponibilidad por WhatsApp</span>
      </button>

      {!isReady && (
        <p className="text-center text-[11px] text-muted-foreground mt-3">
          Completa los pasos anteriores para enviar tu consulta
        </p>
      )}
    </div>
  )
}
