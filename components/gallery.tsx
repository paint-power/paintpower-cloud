"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Modern Minimalist",
    cost: "$18,500",
    image: "/modern-minimalist-bathroom-white-marble.jpg",
    description: "Clean lines with premium marble finishes",
  },
  {
    title: "Luxury Spa",
    cost: "$32,000",
    image: "/luxury-spa-bathroom-with-soaking-tub.jpg",
    description: "Resort-style retreat with soaking tub",
  },
  {
    title: "Classic Elegance",
    cost: "$24,000",
    image: "/classic-elegant-bathroom-with-vintage-fixtures.jpg",
    description: "Timeless design with vintage fixtures",
  },
  {
    title: "Contemporary Chic",
    cost: "$21,500",
    image: "/contemporary-bathroom-with-geometric-tiles.jpg",
    description: "Bold geometric patterns and modern fixtures",
  },
  {
    title: "Rustic Charm",
    cost: "$19,000",
    image: "/rustic-bathroom-with-wood-accents.jpg",
    description: "Warm wood accents with natural stone",
  },
  {
    title: "Industrial Modern",
    cost: "$26,500",
    image: "/industrial-modern-bathroom-concrete-and-metal.jpg",
    description: "Concrete and metal for urban aesthetic",
  },
]

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 text-balance">
            Inspiration Gallery
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
            Explore stunning bathroom renovations and their estimated costs
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto mb-8 md:mb-12">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : index === (currentIndex - 1 + projects.length) % projects.length
                      ? "opacity-0 scale-95 -translate-x-full"
                      : "opacity-0 scale-95 translate-x-full"
                }`}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} - NYC bathroom renovation example`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{project.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 mb-2 sm:mb-3 md:mb-4">{project.description}</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{project.cost}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10"
            onClick={goToPrev}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10"
            onClick={goToNext}
            aria-label="Next project"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>

          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-6 sm:w-8 bg-primary" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`View ${project.title}`}
              className={`relative aspect-square rounded-md md:rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? "ring-2 sm:ring-4 ring-primary scale-105"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={`${project.title} thumbnail`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
