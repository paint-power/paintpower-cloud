"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Droplet } from "lucide-react"

interface FixturesStepProps {
  data: {
    toilet: string
    sink: string
    shower: string
    bathtub: boolean
    bathtubType: string
    vanity: string
    faucets: string
    showerhead: string
  }
  onChange: (data: any) => void
}

const FIXTURE_OPTIONS = {
  toilet: [
    {
      value: "budget",
      label: "Budget Toilet",
      price: "$150-300",
      description: "Basic two-piece toilet, standard flush",
      image: "/basic-white-two-piece-toilet-bathroom-fixture.jpg",
    },
    {
      value: "standard",
      label: "Standard Toilet",
      price: "$300-600",
      description: "Quality one-piece, water-efficient",
      image: "/modern-white-one-piece-toilet-water-efficient.jpg",
    },
    {
      value: "premium",
      label: "Premium Toilet",
      price: "$600-1,500",
      description: "High-efficiency, soft-close seat",
      image: "/premium-modern-toilet-soft-close-seat-high-efficie.jpg",
    },
    {
      value: "smart",
      label: "Smart Toilet",
      price: "$1,500-4,000",
      description: "Bidet, heated seat, auto-flush",
      image: "/luxury-smart-toilet-with-bidet-heated-seat-modern-.jpg",
    },
  ],
  sink: [
    {
      value: "budget",
      label: "Budget Sink",
      price: "$100-200",
      description: "Basic drop-in or pedestal sink",
      image: "/basic-white-pedestal-sink-bathroom-fixture.jpg",
    },
    {
      value: "standard",
      label: "Standard Sink",
      price: "$200-500",
      description: "Undermount or vessel sink",
      image: "/modern-undermount-bathroom-sink-white-ceramic.jpg",
    },
    {
      value: "premium",
      label: "Premium Sink",
      price: "$500-1,200",
      description: "Designer sink, unique materials",
      image: "/designer-vessel-sink-premium-bathroom-marble-stone.jpg",
    },
    {
      value: "double",
      label: "Double Sink",
      price: "$800-2,000",
      description: "Dual undermount sinks",
      image: "/double-sink-vanity-two-undermount-sinks-modern-bat.jpg",
    },
  ],
  shower: [
    {
      value: "none",
      label: "No Shower",
      price: "$0",
      description: "Skip shower installation",
      image: "/empty-bathroom-corner-no-shower-bathtub-only.jpg",
    },
    {
      value: "standard",
      label: "Standard Shower",
      price: "$800-2,000",
      description: "Fiberglass or acrylic unit",
      image: "/standard-white-fiberglass-shower-stall-bathroom.jpg",
    },
    {
      value: "tile",
      label: "Custom Tile Shower",
      price: "$2,500-5,000",
      description: "Full tile shower with glass door",
      image: "/custom-tile-shower-glass-door-modern-bathroom-subw.jpg",
    },
    {
      value: "premium",
      label: "Luxury Shower",
      price: "$5,000-12,000",
      description: "Frameless glass, rain head, body jets",
      image: "/luxury-frameless-glass-shower-rain-head-body-jets-.jpg",
    },
  ],
  vanity: [
    {
      value: "budget",
      label: "Budget Vanity",
      price: "$200-500",
      description: "Basic cabinet, laminate top",
      image: "/basic-bathroom-vanity-cabinet-laminate-countertop-.jpg",
    },
    {
      value: "standard",
      label: "Standard Vanity",
      price: "$500-1,500",
      description: "Wood cabinet, stone top",
      image: "/modern-bathroom-vanity-wood-cabinet-stone-countert.jpg",
    },
    {
      value: "premium",
      label: "Premium Vanity",
      price: "$1,500-4,000",
      description: "Custom cabinet, quartz/marble top",
      image: "/premium-custom-bathroom-vanity-marble-quartz-count.jpg",
    },
    {
      value: "double",
      label: "Double Vanity",
      price: "$2,500-6,000",
      description: "Dual sink vanity, premium materials",
      image: "/double-vanity-dual-sink-bathroom-cabinet-premium-m.jpg",
    },
  ],
  bathtubType: [
    { value: "standard", label: "Standard Acrylic Tub", price: "$400-800", description: "Basic alcove tub" },
    { value: "soaking", label: "Deep Soaking Tub", price: "$800-2,000", description: "Freestanding or drop-in" },
    { value: "jetted", label: "Jetted/Whirlpool Tub", price: "$1,500-4,000", description: "Air or water jets" },
    { value: "clawfoot", label: "Clawfoot Tub", price: "$1,200-3,500", description: "Vintage style freestanding" },
  ],
  faucets: [
    { value: "budget", label: "Budget Faucets", price: "$50-150", description: "Basic chrome finish" },
    {
      value: "standard",
      label: "Standard Faucets",
      price: "$150-400",
      description: "Quality brand, multiple finishes",
    },
    {
      value: "premium",
      label: "Premium Faucets",
      price: "$400-1,000",
      description: "Designer brands, touchless options",
    },
  ],
  showerhead: [
    { value: "standard", label: "Standard Showerhead", price: "$30-100", description: "Basic fixed showerhead" },
    { value: "handheld", label: "Handheld Combo", price: "$100-300", description: "Fixed + handheld shower" },
    { value: "rain", label: "Rain Showerhead", price: "$200-600", description: "Large overhead rain shower" },
    { value: "luxury", label: "Luxury System", price: "$600-2,000", description: "Rain head + body jets + handheld" },
  ],
}

export function FixturesStep({ data, onChange }: FixturesStepProps) {
  const handleRadioChange = (field: string, value: string) => {
    // Find the selected option and get its image
    let imageUpdate = {}
    
    if (field === 'toilet') {
      const option = FIXTURE_OPTIONS.toilet.find(opt => opt.value === value)
      imageUpdate = { toiletImage: option?.image }
    } else if (field === 'sink') {
      const option = FIXTURE_OPTIONS.sink.find(opt => opt.value === value)
      imageUpdate = { sinkImage: option?.image }
    } else if (field === 'shower') {
      const option = FIXTURE_OPTIONS.shower.find(opt => opt.value === value)
      imageUpdate = { showerImage: option?.image }
    } else if (field === 'vanity') {
      const option = FIXTURE_OPTIONS.vanity.find(opt => opt.value === value)
      imageUpdate = { vanityImage: option?.image }
    }
    
    onChange({ [field]: value, ...imageUpdate })
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    onChange({ [field]: checked })
  }

  return (
    <div className="space-y-8">
      {/* Toilet */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <span>🚽</span> Toilet
        </Label>
        <RadioGroup value={data.toilet} onValueChange={(value) => handleRadioChange("toilet", value)}>
          <div className="grid gap-4 md:grid-cols-2">
            {FIXTURE_OPTIONS.toilet.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  data.toilet === option.value ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="p-0">
                  <div className="relative h-32 w-full overflow-hidden rounded-t-lg bg-muted">
                    <Image src={option.image || "/placeholder.svg"} alt={option.label} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={option.value} id={`toilet-${option.value}`} className="mt-1" />
                      <label htmlFor={`toilet-${option.value}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-sm text-primary font-bold">{option.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Sink */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <Droplet className="h-5 w-5 text-primary" />
          Sink
        </Label>
        <RadioGroup value={data.sink} onValueChange={(value) => handleRadioChange("sink", value)}>
          <div className="grid gap-4 md:grid-cols-2">
            {FIXTURE_OPTIONS.sink.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  data.sink === option.value ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="p-0">
                  <div className="relative h-32 w-full overflow-hidden rounded-t-lg bg-muted">
                    <Image src={option.image || "/placeholder.svg"} alt={option.label} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={option.value} id={`sink-${option.value}`} className="mt-1" />
                      <label htmlFor={`sink-${option.value}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-sm text-primary font-bold">{option.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Shower */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <span>🚿</span> Shower
        </Label>
        <RadioGroup value={data.shower} onValueChange={(value) => handleRadioChange("shower", value)}>
          <div className="grid gap-4 md:grid-cols-2">
            {FIXTURE_OPTIONS.shower.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  data.shower === option.value ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="p-0">
                  <div className="relative h-32 w-full overflow-hidden rounded-t-lg bg-muted">
                    <Image src={option.image || "/placeholder.svg"} alt={option.label} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={option.value} id={`shower-${option.value}`} className="mt-1" />
                      <label htmlFor={`shower-${option.value}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-sm text-primary font-bold">{option.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Bathtub Checkbox */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-900/10 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <Checkbox
            id="bathtub"
            checked={data.bathtub}
            onCheckedChange={(checked) => handleCheckboxChange("bathtub", checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="bathtub" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🛁</span>
              <span className="font-semibold text-lg">Add Bathtub</span>
            </div>
            <p className="text-sm text-muted-foreground">Include a bathtub in your bathroom renovation</p>
          </label>
        </div>
      </Card>

      {/* Bathtub Type (conditional) */}
      {data.bathtub && (
        <div className="space-y-4 pl-4 border-l-4 border-primary/30">
          <Label className="text-lg font-semibold">Bathtub Type</Label>
          <RadioGroup value={data.bathtubType} onValueChange={(value) => handleRadioChange("bathtubType", value)}>
            <div className="grid gap-3">
              {FIXTURE_OPTIONS.bathtubType.map((option) => (
                <Card
                  key={option.value}
                  className={`p-4 cursor-pointer hover:border-primary transition-all ${
                    data.bathtubType === option.value ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value={option.value} id={`bathtub-${option.value}`} className="mt-1" />
                    <label htmlFor={`bathtub-${option.value}`} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-sm text-primary font-semibold">{option.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </label>
                  </div>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Vanity */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <span>🪞</span> Vanity
        </Label>
        <RadioGroup value={data.vanity} onValueChange={(value) => handleRadioChange("vanity", value)}>
          <div className="grid gap-4 md:grid-cols-2">
            {FIXTURE_OPTIONS.vanity.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  data.vanity === option.value ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="p-0">
                  <div className="relative h-32 w-full overflow-hidden rounded-t-lg bg-muted">
                    <Image src={option.image || "/placeholder.svg"} alt={option.label} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={option.value} id={`vanity-${option.value}`} className="mt-1" />
                      <label htmlFor={`vanity-${option.value}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-sm text-primary font-bold">{option.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Faucets */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold">Faucets</Label>
        <RadioGroup value={data.faucets} onValueChange={(value) => handleRadioChange("faucets", value)}>
          <div className="grid gap-3">
            {FIXTURE_OPTIONS.faucets.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.faucets === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`faucet-${option.value}`} className="mt-1" />
                  <label htmlFor={`faucet-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-primary font-semibold">{option.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Showerhead */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold">Showerhead System</Label>
        <RadioGroup value={data.showerhead} onValueChange={(value) => handleRadioChange("showerhead", value)}>
          <div className="grid gap-3">
            {FIXTURE_OPTIONS.showerhead.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.showerhead === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`showerhead-${option.value}`} className="mt-1" />
                  <label htmlFor={`showerhead-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-primary font-semibold">{option.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
