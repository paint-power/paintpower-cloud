"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Kitchen",
      subtitle: "Estimator",
      description: "Get accurate cost estimates for your kitchen remodeling project. Professional pricing for cabinets, countertops, appliances and more.",
      tag: "KITCHEN RENOVATION CALCULATOR"
    },
    {
      title: "Bathroom",
      subtitle: "Estimator",
      description: "Calculate bathroom renovation costs instantly. Detailed pricing for fixtures, tiles, vanities, labor and permits.",
      tag: "BATHROOM REMODEL CALCULATOR"
    },
    {
      title: "Painting",
      subtitle: "Estimator",
      description: "Professional painting cost calculator. Get instant estimates for interior and exterior painting projects.",
      tag: "PAINTING COST CALCULATOR"
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

      {/* Estimators Section - Destacado */}
      <section className="relative py-32 bg-linear-to-b from-zinc-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <span className="px-6 py-3 bg-[#b8e804] text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Free Cost Calculators
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-zinc-900 mb-8 leading-tight">
                Professional Renovation<br />
                <span className="text-[#b8e804]">Estimators</span>
              </h2>
              <p className="text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
                Get accurate, instant cost estimates for your next home improvement project. Our professional calculators provide detailed pricing breakdowns.
              </p>
            </div>

            {/* Estimator Cards Grid - Más grande y destacado */}
            <div className="grid md:grid-cols-3 gap-10 mt-20">
              {/* Kitchen Estimator */}
              <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(184,232,4,0.3)] transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-[#b8e804]">
                <div className="relative h-80 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070')"
                    }}
                  />
                  <div className="absolute inset-0 bg-zinc-900/50 group-hover:bg-zinc-900/40 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <span className="px-6 py-2 bg-[#b8e804] text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
                          Kitchen
                        </span>
                      </div>
                      <h3 className="text-4xl font-black text-white mb-3">Kitchen<br/>Estimator</h3>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-linear-to-b from-white to-zinc-50">
                  <p className="text-zinc-600 mb-8 leading-relaxed text-lg text-center">
                    Calculate costs for cabinets, countertops, appliances, flooring, and complete kitchen renovations.
                  </p>
                  <a
                    href="https://kitchen-estimator.paintpower.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-8 py-4 bg-[#b8e804] text-white font-black text-lg hover:bg-zinc-900 transition-all uppercase tracking-wide rounded-xl shadow-lg hover:shadow-2xl"
                  >
                    Continue
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bathroom Estimator */}
              <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(184,232,4,0.3)] transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-[#b8e804]">
                <div className="relative h-80 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2074')"
                    }}
                  />
                  <div className="absolute inset-0 bg-zinc-900/50 group-hover:bg-zinc-900/40 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <span className="px-6 py-2 bg-[#b8e804] text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
                          Bathroom
                        </span>
                      </div>
                      <h3 className="text-4xl font-black text-white mb-3">Bathroom<br/>Estimator</h3>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-linear-to-b from-white to-zinc-50">
                  <p className="text-zinc-600 mb-8 leading-relaxed text-lg text-center">
                    Get detailed pricing for fixtures, tiles, vanities, showers, labor, permits and complete bathroom remodels.
                  </p>
                  <a
                    href="https://bathroom-estimator.paintpower.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-8 py-4 bg-[#b8e804] text-white font-black text-lg hover:bg-zinc-900 transition-all uppercase tracking-wide rounded-xl shadow-lg hover:shadow-2xl"
                  >
                    Continue
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Painting Estimator */}
              <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(184,232,4,0.3)] transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-[#b8e804]">
                <div className="relative h-80 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2074')"
                    }}
                  />
                  <div className="absolute inset-0 bg-zinc-900/50 group-hover:bg-zinc-900/40 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <span className="px-6 py-2 bg-[#b8e804] text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
                          Painting
                        </span>
                      </div>
                      <h3 className="text-4xl font-black text-white mb-3">Painting<br/>Estimator</h3>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-linear-to-b from-white to-zinc-50">
                  <p className="text-zinc-600 mb-8 leading-relaxed text-lg text-center">
                    Calculate costs for interior and exterior painting, labor, materials, prep work and complete paint jobs.
                  </p>
                  <a
                    href="https://painting-estimator.paintpower.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-8 py-4 bg-[#b8e804] text-white font-black text-lg hover:bg-zinc-900 transition-all uppercase tracking-wide rounded-xl shadow-lg hover:shadow-2xl"
                  >
                    Continue
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
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
                <p className="text-zinc-600">2 Woodland Way N</p>
                <p className="text-zinc-600">Ellenville, NY 12428, New York, USA</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#b8e804] mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Call us now</h3>
                <p className="text-zinc-600">+1 800 351 4920</p>
                <p className="text-zinc-600">+1 718 440 8357</p>
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

      {/* Financing Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              {/* 18-month financing */}
              <div className="text-center">
                <img 
                  src="/license/1-3.png" 
                  alt="18-month, no-interest financing through Synchrony Financial" 
                  className="w-full max-w-sm mx-auto"
                />
              </div>

              {/* 6 months special financing */}
              <div className="text-center">
                <img 
                  src="/license/image-18.png" 
                  alt="6 Months Special Financing with Synchrony Financial Sport credit card" 
                  className="w-full max-w-sm mx-auto"
                />
              </div>

              {/* 0% financing */}
              <div className="text-center">
                <img 
                  src="/license/2-4.png" 
                  alt="0% Financing Available with approved credit through Synchrony Bank" 
                  className="w-full max-w-sm mx-auto"
                />
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
      <footer className="relative bg-zinc-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#b8e804] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-zinc-400">
                      <p>2 Woodland Way N Ellenville, NY 12428, New York, USA</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#b8e804] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="text-zinc-400">
                      <p>+1 800 351 4920</p>
                      <p>+1 718 440 8357</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#b8e804] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@paintpower.net" className="text-zinc-400 hover:text-[#b8e804] transition-colors">
                      info@paintpower.net
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Networks */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Social Networks</h3>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/paintpower/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#b8e804] hover:bg-[#a0d000] flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/PAINTPOWER" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#b8e804] hover:bg-[#a0d000] flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/paint_power/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#b8e804] hover:bg-[#a0d000] flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/PAINTPOWER_NET" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#b8e804] hover:bg-[#a0d000] flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://www.pinterest.com/paintpower/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#b8e804] hover:bg-[#a0d000] flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div className="text-zinc-400 text-sm">
                © 2025 <Link href="https://paintpower.net" className="text-white hover:text-[#b8e804] font-semibold transition-colors">PaintPower</Link>. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-6 justify-center text-sm">
                <Link href="https://paintpower.net" className="text-zinc-400 hover:text-white transition-colors">
                  Official Site
                </Link>
                <Link href="https://kitchen-estimator.paintpower.cloud" className="text-zinc-400 hover:text-white transition-colors">
                  Kitchen Estimator
                </Link>
                <Link href="https://bathroom-estimator.paintpower.cloud" className="text-zinc-400 hover:text-white transition-colors">
                  Bathroom Estimator
                </Link>
                <Link href="https://painting-estimator.paintpower.cloud" className="text-zinc-400 hover:text-white transition-colors">
                  Painting Estimator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
