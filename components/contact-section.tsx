import { Button } from '@/components/ui/button'

export function ContactSection() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img
              src="/modern-kitchen-with-large-windows-and-natural-ligh.jpg"
              alt="Modern kitchen renovation"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm text-lime-600 font-semibold mb-2 tracking-wide">Sign up for Specials Offers</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Start your remodeling story today!
            </h2>
            <Button size="lg" variant="outline" className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold px-8">
              CONTACT US
            </Button>
          </div>
        </div>

        {/* Partnership Banner */}
        <div className="mt-16 bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-[300px]">
            <img
              src="/modern-home-interior-with-large-windows-overlookin.jpg"
              alt="Partnership with Andersen"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/90 flex items-center justify-end px-12">
              <div className="text-right">
                <div className="bg-lime-400 text-white px-6 py-3 inline-block mb-4 font-bold text-sm">
                  WE ARE HAPPY TO ANNOUNCE OUR NEW PARTNERSHIP WITH ANDERSEN
                </div>
                <div className="bg-white p-4 inline-block rounded shadow-lg">
                  <p className="text-2xl font-bold">
                    <span className="text-orange-500">CERTIFIED</span>
                  </p>
                  <p className="text-xl font-bold text-orange-500">ANDERSEN CONTRACTOR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
