import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "This estimator was incredibly accurate! We used it to budget our bathroom renovation and the final cost was within 5% of the estimate. Highly recommend!",
    rating: 5,
    image: "/professional-woman-smiling.png",
  },
  {
    name: "Michael Chen",
    role: "Property Developer",
    content:
      "As a developer, I use this tool for all my bathroom renovation projects. It saves me hours of manual calculations and the PDF reports are perfect for client presentations.",
    rating: 5,
    image: "/professional-man-suit.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Designer",
    content:
      "The material quality options are fantastic. I can show clients exactly how different choices affect their budget. It's become an essential tool in my workflow.",
    rating: 5,
    image: "/professional-woman-designer.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 text-balance">
            Trusted by Thousands
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
            See what homeowners and professionals are saying about our estimator
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">"{testimonial.content}"</p>
              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={`${testimonial.name} - ${testimonial.role}`}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-foreground">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
