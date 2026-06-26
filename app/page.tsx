import { ProfileHeader } from '@/components/profile-header'
import { SocialButton } from '@/components/social-button'
import { AppointmentWidget } from '@/components/appointment-widget'
import { PageFooter } from '@/components/page-footer'

const INSTAGRAM_URL = 'https://instagram.com/slowmassages'
const WHATSAPP_NUMBER = '5491100000000' // replace with real number
const WHATSAPP_DIRECT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me comunico desde la página 🌿')}`

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pb-4">
      {/* Soft ambient glow overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.56 0.06 88 / 0.1) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 90%, oklch(0.52 0.055 42 / 0.07) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-sm flex flex-col">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Links section */}
        <section className="flex flex-col gap-3 mt-2" aria-label="Links y contacto">
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
            label="Contacto directo por WhatsApp"
            sublabel="Escribinos directamente"
            delay="animation-delay-300"
          />

          <AppointmentWidget />
        </section>

        <PageFooter />
      </div>
    </main>
  )
}
