"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, CheckCircle2, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-secondary/20 py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slower" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div
              className={`inline-flex items-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-primary font-semibold mr-2">NYC LICENSED CONTRACTOR</span>
              <span className="text-foreground/80">Serving NYC & Hudson Valley Since 2007</span>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              NYC Bathroom Renovation{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Cost Estimator
              </span>
            </h1>

            <p
              className={`text-xl text-muted-foreground leading-relaxed text-pretty max-w-xl transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Calculate accurate bathroom remodeling costs with Paint Power's professional estimator. Get instant pricing
              for fixtures, tiles, vanities, labor, and permits. Licensed NYC DCA contractor serving Manhattan, Queens, Brooklyn, Bronx, Westchester & Hudson Valley with BBB A+ rating.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                asChild
                className="text-lg h-14 px-8 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
              >
                <Link href="/estimator">
                  Calculate Your Cost
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg h-14 px-8 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300"
              >
                <Link href="/#how-it-works">View Process</Link>
              </Button>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-6 pt-4 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-2 group">
                <CheckCircle2 className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground">Free instant estimates</span>
              </div>
              <div className="flex items-center gap-2 group">
                <CheckCircle2 className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground">Regional pricing accuracy</span>
              </div>
              <div className="flex items-center gap-2 group">
                <CheckCircle2 className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground">Professional PDF reports</span>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 hover:shadow-primary/20 transition-shadow duration-500">
              <img
                src="/modern-luxury-bathroom-with-marble-tiles-and-gold-.jpg"
                alt="Modern luxury bathroom renovation with marble tiles, gold fixtures, and contemporary design by PaintPower professional remodeling services"
                className="w-full h-auto hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 animate-float-gentle">
                <div className="bg-card/95 backdrop-blur-md rounded-xl p-6 border border-border/50 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Typical Bathroom Remodel Cost</p>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        $8,000 - $35,000
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get your customized bathroom renovation estimate based on your location, materials, and project
                    scope
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }
        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
