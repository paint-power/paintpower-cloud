"use client"

import { useEffect, useRef, useState } from "react"

// Verified stats from paintpower.net - optimized for SEO
// Source: About Us page states "serving New York City since 2007"
// Service areas: Manhattan, Queens, Brooklyn, Bronx, Westchester, Nassau, Suffolk, Orange, Sullivan, Ulster
// Awards: "BEST Services Winner on HOUZZ since 2014 (5 stars reviews)", BBB A+ Rating
const stats = [
  { value: 18, suffix: "+", label: "Years Serving NYC & Hudson Valley", seoText: "bathroom remodeling experience since 2007" },
  { text: "A+ BBB Rating", label: "Licensed & Insured Contractor", seoText: "NYC DCA licensed bathroom renovation contractor" },
  { text: "5-Star Reviews", label: "Customer Satisfaction on Houzz", seoText: "top rated bathroom remodeling Houzz reviews" },
  { text: "10+ Counties", label: "Service Areas in New York", seoText: "bathroom renovation Manhattan Queens Brooklyn Bronx Westchester Nassau Suffolk Orange" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function Stats() {
  return (
    <section 
      className="py-20 md:py-32 bg-linear-to-b from-background to-secondary/20 relative overflow-hidden"
      aria-label="Paint Power bathroom remodeling company statistics and credentials"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        {/* SEO-optimized heading for bathroom renovation NYC */}
        <h2 className="sr-only">
          Trusted Bathroom Remodeling Contractor - Serving NYC, Manhattan, Queens, Brooklyn, Bronx Since 2007
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              {stat.value !== undefined ? (
                <>
                  <AnimatedNumber value={stat.value as number} suffix={(stat as any).suffix || ''} />
                  <meta itemProp="description" content={stat.seoText} />
                </>
              ) : (
                <>
                  <div className="text-3xl md:text-4xl font-semibold text-primary" itemProp="name">
                    {stat.text}
                  </div>
                  <meta itemProp="description" content={stat.seoText} />
                </>
              )}

              <p className="text-muted-foreground mt-2 text-sm md:text-base font-medium" itemProp="knowsAbout">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
