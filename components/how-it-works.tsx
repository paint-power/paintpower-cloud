"use client"

import { Ruler, Wrench, DollarSign, Download } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    icon: Ruler,
    title: "Enter Bathroom Dimensions & Layout",
    description:
      "Input your bathroom square footage, ceiling height, and layout configuration. Specify if it's a full bath, half bath, or master bathroom renovation.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Select Fixtures, Tiles & Materials",
    description:
      "Choose from budget to luxury options for toilets, vanities, showers, tubs, tiles, countertops, and fixtures. Compare costs across different quality tiers.",
  },
  {
    number: "03",
    icon: DollarSign,
    title: "Get Detailed Cost Breakdown",
    description:
      "Receive instant bathroom renovation estimates with itemized costs for materials, labor, permits, demolition, and contingency. Regional pricing included.",
  },
  {
    number: "04",
    icon: Download,
    title: "Download Professional PDF Report",
    description:
      "Export your complete bathroom remodel estimate as a contractor-ready PDF with specifications, timeline, and detailed cost breakdown for easy sharing.",
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
      const newActiveStep = Math.min(steps.length - 1, Math.floor(scrollProgress * steps.length * 1.5))

      setActiveStep(newActiveStep)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-1 bg-border hidden lg:block">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            How Our Bathroom Cost Calculator Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Calculate accurate bathroom renovation costs in four simple steps. Get professional estimates with regional
            pricing and detailed material breakdowns
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                index <= activeStep ? "opacity-100 translate-y-0" : "opacity-30 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-card border-2 border-border rounded-xl p-8 h-full hover:border-primary transition-all duration-300 hover:shadow-xl">
                <div className="relative mb-6">
                  <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">{step.number}</div>
                  <div
                    className={`relative h-16 w-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      index <= activeStep ? "bg-gradient-to-br from-primary to-accent scale-100" : "bg-muted scale-90"
                    }`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
