"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Ruler, Home } from "lucide-react"
import Image from "next/image"

interface DimensionsStepProps {
  data: {
    length: number
    width: number
    height: number
    bathroomType: string
  }
  onChange: (data: any) => void
}

const BATHROOM_TYPES = [
  {
    value: "powder",
    label: "Powder Room",
    description: "Small half bath, toilet & sink only",
    typical: "20-35 sq ft",
    image: "/small-powder-room-bathroom.jpg",
  },
  {
    value: "half",
    label: "Half Bath",
    description: "Compact bathroom with toilet & sink",
    typical: "35-50 sq ft",
    image: "/half-bathroom-with-toilet-and-sink.jpg",
  },
  {
    value: "full",
    label: "Full Bath",
    description: "Complete bathroom with shower/tub",
    typical: "50-80 sq ft",
    image: "/full-bathroom-with-shower-and-bathtub.jpg",
  },
  {
    value: "master",
    label: "Master Bath",
    description: "Large primary bathroom, dual vanities",
    typical: "100-150 sq ft",
    image: "/luxury-master-bathroom-with-dual-vanities.jpg",
  },
  {
    value: "luxury",
    label: "Luxury Suite",
    description: "Premium spa-like bathroom",
    typical: "150+ sq ft",
    image: "/luxury-spa-bathroom-suite.jpg",
  },
]

export function DimensionsStep({ data, onChange }: DimensionsStepProps) {
  const handleChange = (field: string, value: string | number) => {
    if (typeof value === "string" && field !== "bathroomType") {
      const numValue = Number.parseFloat(value) || 0
      onChange({ [field]: numValue })
    } else {
      onChange({ [field]: value })
    }
  }

  const squareFootage = data.length * data.width

  return (
    <div className="space-y-8">
      {/* Bathroom Type Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Home className="h-5 w-5 text-primary" />
          <Label className="text-xl font-semibold">Select Bathroom Type</Label>
        </div>
        <RadioGroup value={data.bathroomType} onValueChange={(value) => handleChange("bathroomType", value)}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BATHROOM_TYPES.map((type) => (
              <Card
                key={type.value}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  data.bathroomType === type.value ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="p-0">
                  <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                    <Image src={type.image || "/placeholder.svg"} alt={type.label} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={type.value} id={`type-${type.value}`} className="mt-1" />
                      <label htmlFor={`type-${type.value}`} className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg mb-1">{type.label}</div>
                        <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                        <div className="text-xs text-primary font-medium">Typical: {type.typical}</div>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Dimensions Input */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="h-5 w-5 text-primary" />
          <Label className="text-xl font-semibold">Enter Exact Dimensions</Label>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <Label htmlFor="length" className="text-base font-medium mb-2 block">
              Length (feet)
            </Label>
            <Input
              id="length"
              type="number"
              min="1"
              step="0.5"
              value={data.length}
              onChange={(e) => handleChange("length", e.target.value)}
              className="text-xl h-14 text-center font-semibold"
            />
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <Label htmlFor="width" className="text-base font-medium mb-2 block">
              Width (feet)
            </Label>
            <Input
              id="width"
              type="number"
              min="1"
              step="0.5"
              value={data.width}
              onChange={(e) => handleChange("width", e.target.value)}
              className="text-xl h-14 text-center font-semibold"
            />
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <Label htmlFor="height" className="text-base font-medium mb-2 block">
              Height (feet)
            </Label>
            <Input
              id="height"
              type="number"
              min="1"
              step="0.5"
              value={data.height}
              onChange={(e) => handleChange("height", e.target.value)}
              className="text-xl h-14 text-center font-semibold"
            />
          </Card>
        </div>
      </div>

      {/* Calculated Area */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Ruler className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-medium">Total Floor Area</div>
              <div className="text-4xl font-bold text-primary">{squareFootage.toFixed(1)} sq ft</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Wall Area (approx)</div>
            <div className="text-2xl font-semibold">
              {((data.length + data.width) * 2 * data.height).toFixed(0)} sq ft
            </div>
          </div>
        </div>
      </Card>

      {/* Measurement Tips */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">💡</span> Measurement Tips
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Measure from wall to wall at the widest points for accurate dimensions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Standard ceiling height is 8 feet, but measure yours to be sure</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Include alcoves, closets, and any irregular spaces in your measurements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>For L-shaped bathrooms, break into rectangles and add the areas together</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
