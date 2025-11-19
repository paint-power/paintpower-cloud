"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"

interface MaterialsStepProps {
  data: {
    flooring: string
    wallTile: string
    paint: string
    lighting: string
  }
  onChange: (data: any) => void
}

const MATERIAL_OPTIONS = {
  flooring: [
    { value: "vinyl", label: "Vinyl", price: "$2-5/sq ft", description: "Water-resistant, budget-friendly" },
    { value: "ceramic", label: "Ceramic Tile", price: "$5-15/sq ft", description: "Durable, classic look" },
    { value: "porcelain", label: "Porcelain Tile", price: "$8-20/sq ft", description: "Premium, highly durable" },
    { value: "natural-stone", label: "Natural Stone", price: "$15-40/sq ft", description: "Luxury marble or granite" },
  ],
  wallTile: [
    { value: "none", label: "Paint Only", price: "$0", description: "No tile installation" },
    { value: "ceramic", label: "Ceramic Tile", price: "$5-15/sq ft", description: "Standard wall tile" },
    { value: "porcelain", label: "Porcelain Tile", price: "$8-20/sq ft", description: "Premium wall tile" },
    { value: "glass", label: "Glass Tile", price: "$15-30/sq ft", description: "Modern, decorative" },
  ],
  paint: [
    { value: "budget", label: "Budget Paint", price: "$25-35/gal", description: "Basic latex paint" },
    { value: "standard", label: "Standard Paint", price: "$35-50/gal", description: "Quality moisture-resistant" },
    { value: "premium", label: "Premium Paint", price: "$50-80/gal", description: "High-end, mold-resistant" },
  ],
  lighting: [
    { value: "budget", label: "Budget Fixtures", price: "$50-150", description: "Basic lighting" },
    { value: "standard", label: "Standard Fixtures", price: "$150-400", description: "Quality LED fixtures" },
    { value: "premium", label: "Premium Fixtures", price: "$400-1,000", description: "Designer lighting" },
  ],
}

export function MaterialsStep({ data, onChange }: MaterialsStepProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-8">
      {/* Flooring */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Flooring</Label>
        <RadioGroup value={data.flooring} onValueChange={(value) => handleChange("flooring", value)}>
          <div className="grid gap-3">
            {MATERIAL_OPTIONS.flooring.map((option) => (
              <Card key={option.value} className="p-4 cursor-pointer hover:border-primary transition-colors">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`flooring-${option.value}`} className="mt-1" />
                  <label htmlFor={`flooring-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-accent font-semibold">{option.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Wall Tile */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Wall Tile</Label>
        <RadioGroup value={data.wallTile} onValueChange={(value) => handleChange("wallTile", value)}>
          <div className="grid gap-3">
            {MATERIAL_OPTIONS.wallTile.map((option) => (
              <Card key={option.value} className="p-4 cursor-pointer hover:border-primary transition-colors">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`wallTile-${option.value}`} className="mt-1" />
                  <label htmlFor={`wallTile-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-accent font-semibold">{option.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Paint */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Paint Quality</Label>
        <RadioGroup value={data.paint} onValueChange={(value) => handleChange("paint", value)}>
          <div className="grid gap-3">
            {MATERIAL_OPTIONS.paint.map((option) => (
              <Card key={option.value} className="p-4 cursor-pointer hover:border-primary transition-colors">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`paint-${option.value}`} className="mt-1" />
                  <label htmlFor={`paint-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-accent font-semibold">{option.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Lighting */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Lighting Fixtures</Label>
        <RadioGroup value={data.lighting} onValueChange={(value) => handleChange("lighting", value)}>
          <div className="grid gap-3">
            {MATERIAL_OPTIONS.lighting.map((option) => (
              <Card key={option.value} className="p-4 cursor-pointer hover:border-primary transition-colors">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`lighting-${option.value}`} className="mt-1" />
                  <label htmlFor={`lighting-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-accent font-semibold">{option.price}</span>
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
