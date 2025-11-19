import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { ContactSection } from '@/components/contact-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <ContactSection />
    </main>
  )
}
