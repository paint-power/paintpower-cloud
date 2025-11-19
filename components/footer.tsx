import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12" itemScope itemType="https://schema.org/WPFooter">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div itemScope itemType="https://schema.org/Organization">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/paintpower-logo.png"
                alt="Paint Power Painting & Remodeling - NYC Licensed Bathroom Renovation Contractor Since 2007"
                width={160}
                height={50}
                className="h-12 w-auto"
                itemProp="logo"
              />
            </Link>
            <p className="text-sm text-muted-foreground" itemProp="description">
              Professional bathroom renovation and remodeling services in NYC & Hudson Valley. Licensed NYC DCA contractor serving Manhattan, Queens, Brooklyn, Bronx, Westchester, Nassau, Suffolk, Orange County since 2007. BBB A+ rated.
            </p>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p itemProp="telephone">
                <strong>Phone:</strong> <a href="tel:+18003514820" className="hover:text-primary">+1 800 351 4820</a>
              </p>
              <p itemProp="email">
                <strong>Email:</strong> <a href="mailto:info@paintpower.net" className="hover:text-primary">info@paintpower.net</a>
              </p>
              <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <strong>Address:</strong> <span itemProp="streetAddress">2 Woodland Way N</span>, <span itemProp="addressLocality">Ellenville</span>, <span itemProp="addressRegion">NY</span> <span itemProp="postalCode">12428</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">NYC Bathroom Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/estimator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Manhattan Bathroom Remodel
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Queens Bathroom Renovation
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Brooklyn Bathroom Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Bronx Bathroom Estimator
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Westchester Bathroom Remodel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  NYC Renovation Process
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  NYC Cost Breakdown Guide
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  NYC Before & After Gallery
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Free NYC Bathroom Quote
                </Link>
              </li>
              <li>
                <a href="https://paintpower.net" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Paint Power Main Website
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Manhattan, NY</li>
              <li>Queens, NY</li>
              <li>Brooklyn, NY</li>
              <li>Bronx, NY</li>
              <li>Westchester County, NY</li>
              <li>Nassau County, NY</li>
              <li>Suffolk County, NY</li>
              <li>Orange County, NY</li>
              <li>Ulster County, NY</li>
              <li>Sullivan County, NY</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              <strong>NYC DCA Licensed</strong><br/>
              <strong>BBB A+ Rating</strong><br/>
              <strong>EPA & OSHA Certified</strong>
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Paint Power Painting & Remodeling. Professional bathroom renovation and
            remodeling services in NYC & Hudson Valley. Licensed NYC DCA contractor since 2007. BBB A+ rated.
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Serving Manhattan, Queens, Brooklyn, Bronx, Westchester, Nassau, Suffolk, Orange, Ulster & Sullivan Counties
          </p>
        </div>
      </div>
    </footer>
  )
}
