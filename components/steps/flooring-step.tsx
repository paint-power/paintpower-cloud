"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Flame, Shield } from "lucide-react"

interface FlooringStepProps {
  data: {
    material: string
    heatedFloor: boolean
    waterproofing: string
  }
  onChange: (data: any) => void
}

const FLOORING_MATERIALS = [
  {
    value: "vinyl",
    label: "Luxury Vinyl Plank (LVP)",
    price: "$3-7/sq ft",
    description: "Waterproof, durable, wood-look",
    pros: "Budget-friendly, easy install",
    image: "/luxury-vinyl-plank-flooring-bathroom.jpg",
  },
  {
    value: "ceramic",
    label: "Ceramic Tile",
    price: "$5-15/sq ft",
    description: "Classic, water-resistant",
    pros: "Durable, many styles",
    image: "/ceramic-tile-bathroom-floor.jpg",
  },
  {
    value: "porcelain",
    label: "Porcelain Tile",
    price: "$8-25/sq ft",
    description: "Premium, highly durable",
    pros: "Low maintenance, elegant",
    image: "/porcelain-tile-bathroom-floor.jpg",
  },
  {
    value: "marble",
    label: "Natural Marble",
    price: "$15-50/sq ft",
    description: "Luxury natural stone",
    pros: "Timeless, high-end",
    image: "/marble-bathroom-floor-luxury.jpg",
  },
  {
    value: "heated-tile",
    label: "Heated Tile System",
    price: "$12-30/sq ft",
    description: "Tile with radiant heating",
    pros: "Warm floors, comfort",
    image: "/heated-floor-tile-bathroom.jpg",
  },
]

const WATERPROOFING_OPTIONS = [
  { value: "basic", label: "Basic Waterproofing", price: "$200-400", description: "Standard moisture barrier" },
  { value: "standard", label: "Premium Membrane", price: "$400-800", description: "Schluter or RedGard system" },
  { value: "premium", label: "Full Waterproofing", price: "$800-1,500", description: "Complete system with warranty" },
]

export function FlooringStep({ data, onChange }: FlooringStepProps) {
  const handleChange = (field: string, value: any) => {
    // If changing material, include the image
    if (field === 'material') {
      const material = FLOORING_MATERIALS.find(m => m.value === value)
      onChange({ [field]: value, materialImage: material?.image })
    } else {
      onChange({ [field]: value })
    }
  }

  return (
    <div className="space-y-8">
      {/* Flooring Material */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <span>🔲</span> Flooring Material
        </Label>
        <RadioGroup value={data.material} onValueChange={(value) => handleChange("material", value)}>
          <div className="grid gap-4 md:grid-cols-2">
            {FLOORING_MATERIALS.map((material) => (
              <Card
                key={material.value}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  data.material === material.value ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="p-0">
                  <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={material.image || "/placeholder.svg"}
                      alt={material.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={material.value} id={`floor-${material.value}`} className="mt-1" />
                      <label htmlFor={`floor-${material.value}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{material.label}</span>
                          <span className="text-sm text-primary font-bold">{material.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{material.description}</p>
                        <p className="text-xs text-primary">✓ {material.pros}</p>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Heated Floor Option */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10 border-orange-200 dark:border-orange-800">
        <div className="flex items-start gap-4">
          <Checkbox
            id="heatedFloor"
            checked={data.heatedFloor}
            onCheckedChange={(checked) => handleChange("heatedFloor", checked)}
            className="mt-1"
          />
          <label htmlFor="heatedFloor" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-lg">Add Radiant Floor Heating</span>
              <span className="ml-auto text-primary font-bold">+$1,200-2,500</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Electric radiant heating system installed under your flooring for warm, comfortable floors
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-green-600 dark:text-green-400">✓ Energy efficient</span>
              <span className="text-green-600 dark:text-green-400">✓ Luxury comfort</span>
              <span className="text-green-600 dark:text-green-400">✓ Increases home value</span>
            </div>
          </label>
        </div>
      </Card>

      {/* Waterproofing */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Waterproofing System
        </Label>
        <RadioGroup value={data.waterproofing} onValueChange={(value) => handleChange("waterproofing", value)}>
          <div className="grid gap-3">
            {WATERPROOFING_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.waterproofing === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`waterproof-${option.value}`} className="mt-1" />
                  <label htmlFor={`waterproof-${option.value}`} className="flex-1 cursor-pointer">
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
