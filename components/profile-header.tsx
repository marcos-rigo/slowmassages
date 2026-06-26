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
        <h1
          className="text-3xl tracking-wide text-foreground"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
        >
          Slow Massages
        </h1>
        <p className="text-sm text-muted-foreground tracking-widest uppercase font-light">
          Espacio de bienestar &amp; reconexión
        </p>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 mt-1">
        <div className="w-8 h-px bg-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        <div className="w-8 h-px bg-border" />
      </div>
    </header>
  )
}
