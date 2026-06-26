'use client'

import { MessageCircle } from 'lucide-react'

// Custom Instagram SVG since lucide v1 doesn't ship it
function InstagramIcon({ size = 18, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
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
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon({ size = 18, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return <MessageCircle size={size} strokeWidth={strokeWidth} />
}

const ICONS = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
} as const

type IconName = keyof typeof ICONS

interface SocialButtonProps {
  href: string
  iconName: IconName
  label: string
  sublabel?: string
  delay?: string
}

export function SocialButton({
  href,
  iconName,
  label,
  sublabel,
  delay = '',
}: SocialButtonProps) {
  const Icon = ICONS[iconName]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex items-center gap-4 w-full px-5 py-4
        rounded-2xl border border-border
        bg-card/60 backdrop-blur-md
        shadow-sm hover:shadow-md
        transition-all duration-300
        hover:border-primary/40 hover:bg-card/80
        active:scale-[0.98]
        animate-fade-in-up ${delay}
      `}
    >
      {/* Icon wrapper */}
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
        <Icon size={18} strokeWidth={1.5} />
      </span>

      {/* Text */}
      <span className="flex flex-col flex-1 min-w-0">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {sublabel && (
          <span className="text-xs text-muted-foreground mt-0.5">{sublabel}</span>
        )}
      </span>

      {/* Arrow */}
      <span className="text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  )
}
