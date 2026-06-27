'use client'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.197 1.455 4.82 1.456 5.493 0 9.965-4.412 9.969-9.829.002-2.624-1.02-5.09-2.879-6.95C16.697 1.97 14.233.946 11.61.946 6.118.946 1.648 5.358 1.645 10.778c-.001 1.678.441 3.315 1.282 4.747l-.994 3.633 3.714-.974zm11.367-5.04c-.312-.156-1.847-.91-2.133-1.014-.286-.104-.494-.156-.701.156-.207.312-.804 1.014-.985 1.22-.18.208-.362.234-.674.078-1.5-.752-2.482-1.32-3.473-3.014-.262-.449.263-.418.75-1.39.083-.166.041-.312-.02-.416-.063-.104-.494-1.192-.677-1.634-.177-.428-.358-.37-.494-.378-.127-.008-.273-.009-.418-.009-.145 0-.382.054-.582.273-.2.218-.764.746-.764 1.82 0 1.073.782 2.106.891 2.253.11.147 1.54 2.349 3.73 3.298 1.764.765 2.53.864 3.424.73.543-.082 1.666-.68 1.9-1.338.232-.656.232-1.22.163-1.338-.07-.117-.286-.195-.598-.351z" />
    </svg>
  )
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

const BRAND_STYLES = {
  instagram: {
    bg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-[0_2px_8px_rgba(221,42,123,0.15)]',
    hoverBg: 'group-hover:shadow-[0_4px_16px_rgba(221,42,123,0.3)] group-hover:scale-105',
    hoverBorder: 'hover:border-[#DD2A7B]/45',
    hoverText: 'group-hover:text-[#DD2A7B]',
  },
  whatsapp: {
    bg: 'bg-[#25D366] text-white shadow-[0_2px_8px_rgba(37,211,102,0.15)]',
    hoverBg: 'group-hover:shadow-[0_4px_16px_rgba(37,211,102,0.3)] group-hover:scale-105',
    hoverBorder: 'hover:border-[#25D366]/45',
    hoverText: 'group-hover:text-[#25D366]',
  },
} as const

export function SocialButton({
  href,
  iconName,
  label,
  sublabel,
  delay = '',
}: SocialButtonProps) {
  const Icon = ICONS[iconName]
  const brand = BRAND_STYLES[iconName]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex items-center gap-4 w-full px-5 py-4
        rounded-3xl border border-border/80
        bg-card/60 backdrop-blur-md
        shadow-premium
        transition-all duration-300
        hover:bg-card/80 hover:-translate-y-0.5
        active:scale-[0.98]
        animate-fade-in-up ${delay}
        ${brand.hoverBorder}
      `}
    >
      {/* Icon wrapper */}
      <span className={`
        flex items-center justify-center w-10 h-10 rounded-xl
        transition-all duration-300
        shrink-0
        ${brand.bg}
        ${brand.hoverBg}
      `}>
        <Icon size={18} />
      </span>

      {/* Text */}
      <span className="flex flex-col flex-1 min-w-0">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {sublabel && (
          <span className="text-xs text-muted-foreground mt-0.5">{sublabel}</span>
        )}
      </span>

      {/* Arrow */}
      <span className={`
        text-muted-foreground/50
        transition-colors duration-300
        shrink-0
        ${brand.hoverText}
      `}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  )
}
