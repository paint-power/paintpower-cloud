"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "interior",
      subtitle: "Painting NYC",
      description: "With creative colors and revolutionary designs, make yours spaces unique, painting is the best choice for many owners in New York.",
      tag: "NEW YORK CITY'S MOST RELIABLE"
    },
    {
      title: "Professional",
      subtitle: "Remodeling",
      description: "Transform your space with expert craftsmanship and attention to detail. Quality renovations for residential and commercial properties.",
      tag: "EXPERT RENOVATION SERVICES"
    },
    {
      title: "Commercial",
      subtitle: "Solutions",
      description: "Specialized painting and renovation services for businesses. Professional results that enhance your commercial space.",
      tag: "TRUSTED BY NYC BUSINESSES"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-white text-zinc-900 overflow-hidden">
      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069')",
              opacity: currentSlide === 0 ? 1 : 0
            }}
          />
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074')",
              opacity: currentSlide === 1 ? 1 : 0
            }}
          />
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069')",
              opacity: currentSlide === 2 ? 1 : 0
            }}
          />
          <div className="absolute inset-0 bg-zinc-900/60"></div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-[#b8e804]/90 hover:bg-[#b8e804] flex items-center justify-center transition-all hover:scale-110"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-[#b8e804]/90 hover:bg-[#b8e804] flex items-center justify-center transition-all hover:scale-110"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <div className="mb-6">
              <p className="text-white/90 text-sm font-semibold tracking-widest uppercase mb-4">
                {slides[currentSlide].tag}
              </p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
                <span className="text-[#b8e804]">{slides[currentSlide].title}</span>{" "}
                <span className="text-white">{slides[currentSlide].subtitle}</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                {slides[currentSlide].description}
              </p>
            </div>
            <Link
              href="https://paintpower.net"
              className="inline-block px-10 py-4 bg-white text-zinc-900 font-bold text-lg hover:bg-[#b8e804] hover:text-white transition-all uppercase tracking-wide"
            >
              FIND OUT MORE
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "w-12 bg-[#b8e804]" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#b8e804] text-sm font-bold uppercase tracking-wider mb-4">NYC Painters</p>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-8">
                Professional Painting & Remodeling in New York
              </h2>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-zinc-600 leading-relaxed">
                <p>
                  <strong className="text-zinc-900">Paint Power</strong> is a <strong className="text-zinc-900">Professional Painting and Interior Remodeling company</strong>. Providing a full range of renovations and improvement services for both residential and commercial properties.
                </p>
                <p>
                  Focusing in creating a hassle-free and enjoyable experience while working on your project. We proudly serve <strong className="text-zinc-900">New York City since 2007</strong>. Over the years, we have developed professional relationships which have help us maintain the highest standards of quality work.
                </p>
              </div>
            </div>

            {/* Contact Info Grid */}
            <div className="grid md:grid-cols-3 gap-12 mt-20">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#b8e804] mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Address</h3>
                <p className="text-zinc-600">Fresh Meadows, NY 11365,</p>
                <p className="text-zinc-600">New York, USA</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#b8e804] mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Call us now</h3>
                <p className="text-zinc-600">+1 800 351 4920</p>
                <p className="text-zinc-600">+1 718 440 5357</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#b8e804] mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Email us</h3>
                <a href="mailto:info@paintpower.net" className="text-zinc-600 hover:text-[#b8e804] transition-colors">
                  info@paintpower.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Image Section */}
      <section className="relative py-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-96 md:h-auto min-h-[400px]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070')"
              }}
            />
          </div>

          {/* Content */}
          <div className="bg-zinc-50 p-12 md:p-20 flex flex-col justify-center">
            <p className="text-[#b8e804] text-sm font-bold uppercase tracking-wider mb-4">
              Sign up for Specials Offers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-8">
              Start your remodeling story today!
            </h2>
            <Link
              href="https://paintpower.net"
              className="inline-block px-10 py-4 bg-zinc-900 text-white font-bold hover:bg-[#b8e804] hover:text-zinc-900 transition-all uppercase tracking-wide w-fit"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership Banner */}
      <section className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053')"
          }}
        >
          <div className="absolute inset-0 bg-zinc-900/40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <div className="inline-block bg-[#b8e804] px-12 py-4 mb-6">
              <p className="text-white font-bold text-lg uppercase tracking-wide">
                WE ARE HAPPY TO ANNOUNCE OUR NEW PARTNERSHIP WITH ANDERSEN
              </p>
            </div>
            <div className="bg-white px-12 py-6">
              <p className="text-2xl font-bold text-zinc-900">
                CERTIFIED <span className="text-[#ff6b35]">ANDERSEN CONTRACTOR</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-zinc-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="text-zinc-400 text-sm">
              © 2025 <Link href="https://paintpower.net" className="text-white hover:text-[#b8e804] font-semibold transition-colors">PaintPower</Link>. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="https://paintpower.net" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="https://paintpower.net" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Services
              </Link>
              <Link href="https://paintpower.net" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Gallery
              </Link>
              <Link href="https://paintpower.net" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
