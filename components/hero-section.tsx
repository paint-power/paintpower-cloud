'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const slides = [
  {
    title: 'Interior Painting NYC',
    subtitle: "NEW YORK CITY'S MOST RELIABLE",
    description: 'With creative colors and revolutionary designs, make yours spaces unique, painting is the best choice for many owners in New York.',
  },
  {
    title: 'Exterior Painting NYC',
    subtitle: "PROFESSIONAL EXTERIOR SOLUTIONS",
    description: 'Transform your property exterior with high-quality painting services that protect and beautify your investment.',
  },
  {
    title: 'Commercial Painting',
    subtitle: "EXPERT COMMERCIAL SERVICES",
    description: 'Professional painting solutions for businesses and commercial properties across New York City.',
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-slate-800">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-interior-room-with-plants-and-furniture--pr.jpg"
          alt="Interior painting"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-sm text-white/90 mb-4 tracking-wide">{slides[currentSlide].subtitle}</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          <span className="text-lime-400">interior </span>
          <span className="text-white">{slides[currentSlide].title.replace('Interior ', '')}</span>
        </h1>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          {slides[currentSlide].description}
        </p>
        <Button size="lg" className="bg-white text-slate-900 hover:bg-lime-400 hover:text-slate-900 font-semibold px-8">
          FIND OUT MORE
        </Button>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-lime-400 w-8' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-full p-3 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-full p-3 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  )
}
