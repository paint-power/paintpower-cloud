"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar with Contact Info - Only visible on desktop */}
      <div className="hidden lg:block bg-primary text-white py-2 text-xs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a 
                href="tel:+18003514820" 
                className="flex items-center gap-2 hover:text-secondary transition-colors"
                aria-label="Call Paint Power"
              >
                <Phone className="h-3 w-3" />
                <span className="font-medium">+1 (800) 351-4820</span>
              </a>
              <a 
                href="mailto:info@paintpower.net" 
                className="flex items-center gap-2 hover:text-secondary transition-colors"
                aria-label="Email Paint Power"
              >
                <Mail className="h-3 w-3" />
                <span>info@paintpower.net</span>
              </a>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-3 w-3" />
                <span>Serving NYC & Hudson Valley Since 2007</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <span className="font-semibold text-white">NYC DCA Licensed</span>
              <span>•</span>
              <span className="font-semibold text-white">BBB A+ Rating</span>
              <span>•</span>
              <a 
                href="https://paintpower.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline"
              >
                Visit Main Website
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-border/60 bg-background/95 backdrop-blur-xl shadow-lg"
            : "border-border/40 bg-background/98 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center group">
              <Image
                src="/paintpower-logo.png"
                alt="Paint Power - NYC Licensed Bathroom Renovation Contractor Since 2007"
                width={180}
                height={60}
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-6" aria-label="Main navigation">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/estimator"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                Cost Calculator
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#features"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                Our Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#gallery"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <a
                href="https://paintpower.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>

            <div className="hidden lg:flex items-center space-x-3">
              <a href="tel:+18003514820">
                <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </a>
              <Button
                asChild
                size="sm"
                className="bg-linear-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
              >
                <Link href="/estimator">Free Estimate</Link>
              </Button>
            </div>

            <button
              className="lg:hidden transition-transform duration-300 hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-slide-down" role="navigation" aria-label="Mobile navigation">
              <nav className="flex flex-col space-y-3">
                {/* Contact Info Mobile */}
                <div className="pb-3 mb-3 border-b border-border space-y-2">
                  <a 
                    href="tel:+18003514820" 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+1 (800) 351-4820</span>
                  </a>
                  <a 
                    href="mailto:info@paintpower.net" 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    <Mail className="h-4 w-4" />
                    <span>info@paintpower.net</span>
                  </a>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
                    <MapPin className="h-4 w-4" />
                    <span>NYC & Hudson Valley • Since 2007</span>
                  </div>
                </div>

                <Link
                  href="/"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/estimator"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cost Calculator
                </Link>
                <Link
                  href="/#features"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Services
                </Link>
                <Link
                  href="/#how-it-works"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/#gallery"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <a
                  href="https://paintpower.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  About Paint Power
                </a>
                <div className="pt-3 space-y-2">
                  <Button asChild className="w-full bg-linear-to-r from-primary to-accent">
                    <Link href="/estimator" onClick={() => setMobileMenuOpen(false)}>
                      Get Free Estimate
                    </Link>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    NYC DCA Licensed • BBB A+ Rating
                  </p>
                </div>
              </nav>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-down {
            animation: slide-down 0.3s ease-out;
          }
        `}</style>
      </header>
    </>
  )
}
