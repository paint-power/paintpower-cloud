import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Start Your Bathroom Renovation?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 text-pretty max-w-2xl mx-auto">
            Get your free, detailed cost estimate in minutes. No credit card required, no obligations. Just accurate,
            professional estimates to help you plan with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg h-14 px-8">
              <Link href="/estimator">
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-primary-foreground/70">
            Join over 50,000 homeowners who have used our estimator
          </p>
        </div>
      </div>
    </section>
  )
}
