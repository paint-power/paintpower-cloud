export function ServicesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-2 tracking-wide">NYC Painters</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Professional Painting & Remodeling in New York
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">Paint Power</span> is a{' '}
              <span className="font-semibold text-foreground">Professional Painting and Interior Remodeling company</span>. Providing a full range of renovations and improvement services for both residential and commercial properties.
            </p>
            <p>
              Focusing in creating a hassle-free and enjoyable experience while working on your project. We proudly serve{' '}
              <span className="font-semibold text-foreground">New York City since 2007</span>. Over the years, we have developed professional relationships which have help us maintain the highest standards of quality work.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">Address</h3>
            <p className="text-sm text-muted-foreground">Fresh Meadows, NY 11365,</p>
            <p className="text-sm text-muted-foreground">New York, USA</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">Call us now</h3>
            <p className="text-sm text-muted-foreground">+1 800 351 4920</p>
            <p className="text-sm text-muted-foreground">+1 718 440 8357</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">Email us</h3>
            <p className="text-sm text-muted-foreground break-all">info@paintpower.net</p>
          </div>
        </div>
      </div>
    </section>
  )
}
