'use client'

import Image from 'next/image'

export function ProfileHeader() {
  return (
    <header className="flex flex-col items-center gap-4 pt-12 pb-6 animate-fade-in-up animation-delay-100">
      {/* Circular profile image */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-border shadow-lg">
        <Image
          src="/images/perfil.jpg"
          alt="Slow Massages — perfil"
          fill
          className="object-cover"
          priority
          sizes="96px"
        />
      </div>

      {/* Brand name */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-4xl tracking-wide text-foreground font-heading font-light">
          Slow Massages
        </h1>
        <p className="text-[11px] text-muted-foreground/80 tracking-widest uppercase font-medium mt-1">
          Espacio de bienestar &amp; reconexión
        </p>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 mt-2">
        <div className="w-12 h-px bg-border/80" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="w-12 h-px bg-border/80" />
      </div>
    </header>
  )
}
