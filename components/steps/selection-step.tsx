"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Bath, Lightbulb, Package, Ruler, Sparkles, Wind, Wrench, Accessibility } from "lucide-react"
import type { RenovationItems } from "@/lib/types"

interface SelectionStepProps {
  selected: RenovationItems
  onChange: (selected: RenovationItems) => void
}

const RENOVATION_OPTIONS = [
  {
    key: "dimensions" as keyof RenovationItems,
    icon: Ruler,
    title: "Bathroom Size & Layout",
    description: "Define dimensions and bathroom type",
    image: "/bathroom-floor-plan-blueprint.jpg",
  },
  {
    key: "fixtures" as keyof RenovationItems,
    icon: Bath,
    title: "Fixtures & Appliances",
    description: "Toilet, sink, shower, bathtub, vanity",
    image: "/modern-bathroom-fixtures-toilet-sink.jpg",
  },
  {
    key: "flooring" as keyof RenovationItems,
    icon: Sparkles,
    title: "Flooring",
    description: "Tiles, heated floors, waterproofing",
    image: "/luxury-bathroom-tile-flooring.jpg",
  },
  {
    key: "walls" as keyof RenovationItems,
    icon: Sparkles,
    title: "Walls & Paint",
    description: "Tiles, paint, accent walls, waterproofing",
    image: "/bathroom-wall-tiles-modern-design.jpg",
  },
  {
    key: "plumbing" as keyof RenovationItems,
    icon: Wrench,
    title: "Plumbing Systems",
    description: "Pipes, drains, water heater, valves",
    image: "/bathroom-plumbing-pipes-installation.jpg",
  },
  {
    key: "lighting" as keyof RenovationItems,
    icon: Lightbulb,
    title: "Lighting",
    description: "LED lights, vanity lights, dimmers",
    image: "/modern-bathroom-led-lighting.jpg",
  },
  {
    key: "ventilation" as keyof RenovationItems,
    icon: Wind,
    title: "Ventilation",
    description: "Exhaust fans, windows, dehumidifiers",
    image: "/bathroom-ventilation-exhaust-fan.jpg",
  },
  {
    key: "storage" as keyof RenovationItems,
    icon: Package,
    title: "Storage Solutions",
    description: "Cabinets, shelving, niches, towel warmers",
    image: "/bathroom-storage-cabinets-shelving.jpg",
  },
  {
    key: "accessibility" as keyof RenovationItems,
    icon: Accessibility,
    title: "Accessibility Features",
    description: "Grab bars, walk-in features, safety",
    image: "/accessible-bathroom-grab-bars.jpg",
  },
]

export function SelectionStep({ selected, onChange }: SelectionStepProps) {
  const toggleItem = (key: keyof RenovationItems) => {
    onChange({
      ...selected,
      [key]: !selected[key],
    })
  }

  const selectedCount = Object.values(selected).filter(Boolean).length

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-balance">What would you like to renovate?</h2>
        <p className="text-muted-foreground text-lg">
          Select all the items you want to include in your bathroom renovation estimate
        </p>
        {selectedCount > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RENOVATION_OPTIONS.map((option) => {
          const Icon = option.icon
          const isSelected = selected[option.key]

          return (
            <Card
              key={option.key}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                isSelected ? "ring-2 ring-primary shadow-lg" : "hover:ring-1 hover:ring-primary/50"
              }`}
              onClick={() => toggleItem(option.key)}
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={option.image || "/placeholder.svg"}
                  alt={option.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-white/90 text-muted-foreground"
                    }`}
                  >
                    <Checkbox checked={isSelected} className="pointer-events-none border-0" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-semibold text-lg text-balance">{option.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{option.description}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {selectedCount === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please select at least one item to continue</p>
        </div>
      )}
    </div>
  )
}
