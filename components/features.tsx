"use client"

import { Calculator, FileText, Sparkles, TrendingUp, Shield, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Calculator,
    title: "Comprehensive Bathroom Cost Breakdown",
    description:
      "Detailed renovation estimates including fixtures, tiles, vanities, plumbing, electrical, labor, permits, and contingency costs. Complete transparency for your bathroom remodeling budget.",
  },
  {
    icon: Sparkles,
    title: "Multiple Material Quality Tiers",
    description:
      "Compare budget, mid-range, and luxury bathroom materials. See real-time cost differences for tiles, countertops, fixtures, and finishes to match your renovation budget.",
  },
  {
    icon: FileText,
    title: "Professional Contractor-Ready Reports",
    description:
      "Download detailed PDF estimates with itemized costs, material specifications, and project scope. Perfect for contractor quotes and renovation planning.",
  },
  {
    icon: TrendingUp,
    title: "US Regional Market Pricing",
    description:
      "Accurate bathroom renovation costs for Midwest, South, Northeast, West Coast, and Major Metro areas. Real contractor rates and material costs for your location.",
  },
  {
    icon: Shield,
    title: "Industry-Verified Pricing Data",
    description:
      "Based on current contractor labor rates, wholesale material costs, and real bathroom renovation projects. Reliable estimates you can trust for budgeting.",
  },
  {
    icon: Clock,
    title: "Project Timeline Calculator",
    description:
      "Realistic bathroom remodel duration estimates based on project scope, demolition needs, and fixture complexity. Plan your renovation schedule with confidence.",
  },
]

export function Features() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        },
        { threshold: 0.2 },
      )

      if (card) observer.observe(card)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section id="features" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Complete Bathroom Renovation Planning Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Professional bathroom remodeling cost calculator with comprehensive pricing data, regional adjustments, and
            detailed material breakdowns for accurate renovation budgeting
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
