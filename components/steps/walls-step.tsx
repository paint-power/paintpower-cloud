"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Paintbrush, Sparkles } from "lucide-react"

interface WallsStepProps {
  data: {
    tile: string
    tilePattern: string
    accentWall: boolean
    waterproofing: string
    paint: string
  }
  onChange: (data: any) => void
}

const TILE_OPTIONS = [
  {
    value: "none",
    label: "Paint Only",
    price: "$0",
    description: "No tile, painted walls",
    image: "/painted-bathroom-walls-no-tile-clean-finish.jpg",
  },
  {
    value: "shower-only",
    label: "Shower Area Only",
    price: "$800-2,000",
    description: "Tile in shower/tub area",
    image: "/tiled-shower-area-bathroom-walls-ceramic-tile.jpg",
  },
  {
    value: "half-wall",
    label: "Half Wall Tile",
    price: "$1,500-3,500",
    description: "Tile wainscoting, 4ft high",
    image: "/half-wall-tile-bathroom-wainscoting.jpg",
  },
  {
    value: "full-wall",
    label: "Full Wall Tile",
    price: "$3,000-7,000",
    description: "Floor to ceiling tile",
    image: "/full-wall-tile-bathroom-floor-to-ceiling-ceramic.jpg",
  },
]

const TILE_PATTERNS = [
  {
    value: "standard",
    label: "Standard Grid",
    description: "Classic straight lay",
    image: "/standard-grid-tile-pattern.jpg",
  },
  {
    value: "subway",
    label: "Subway Pattern",
    description: "Offset brick style",
    image: "/subway-tile-pattern-offset-brick-style-bathroom.jpg",
  },
  {
    value: "herringbone",
    label: "Herringbone",
    description: "Diagonal zigzag",
    image: "/herringbone-tile-pattern-diagonal-zigzag-bathroom.jpg",
  },
  {
    value: "chevron",
    label: "Chevron",
    description: "V-shaped pattern",
    image: "/chevron-tile-pattern-v-shaped-bathroom-wall.jpg",
  },
]

const PAINT_OPTIONS = [
  { value: "budget", label: "Budget Paint", price: "$150-250", description: "Basic latex, 2 coats" },
  {
    value: "standard",
    label: "Premium Moisture-Resistant",
    price: "$250-400",
    description: "Mildew-resistant, 2 coats",
  },
  {
    value: "premium",
    label: "Designer Paint",
    price: "$400-700",
    description: "Benjamin Moore Aura, Sherwin-Williams Emerald",
  },
]

export function WallsStep({ data, onChange }: WallsStepProps) {
  const handleChange = (field: string, value: any) => {
    // If changing tile or pattern, include the image
    if (field === 'tile') {
      const option = TILE_OPTIONS.find(opt => opt.value === value)
      onChange({ [field]: value, tileImage: option?.image })
    } else if (field === 'tilePattern') {
      const option = TILE_PATTERNS.find(opt => opt.value === value)
      onChange({ [field]: value, tilePatternImage: option?.image })
    } else {
      onChange({ [field]: value })
    }
  }

  return (
    <div className="space-y-8">
      {/* Tile Coverage */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <span>🎨</span> Wall Tile Coverage
        </Label>
        <RadioGroup value={data.tile} onValueChange={(value) => handleChange("tile", value)}>
          <div className="grid gap-4 md:grid-cols-2">
            {TILE_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  data.tile === option.value ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="p-0">
                  <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
                    <Image src={option.image || "/placeholder.svg"} alt={option.label} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={option.value} id={`tile-${option.value}`} className="mt-1" />
                      <label htmlFor={`tile-${option.value}`} className="flex-1 cursor-pointer">
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

      {/* Tile Pattern */}
      {data.tile !== "none" && (
        <div className="space-y-4">
          <Label className="text-xl font-semibold">Tile Pattern</Label>
          <RadioGroup value={data.tilePattern} onValueChange={(value) => handleChange("tilePattern", value)}>
            <div className="grid gap-3 md:grid-cols-2">
              {TILE_PATTERNS.map((pattern) => (
                <Card
                  key={pattern.value}
                  className={`p-4 cursor-pointer hover:border-primary transition-all ${
                    data.tilePattern === pattern.value ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={pattern.image || "/placeholder.svg"}
                        alt={pattern.label}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-start gap-3 flex-1">
                      <RadioGroupItem value={pattern.value} id={`pattern-${pattern.value}`} className="mt-1" />
                      <label htmlFor={`pattern-${pattern.value}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{pattern.label}</div>
                        <p className="text-sm text-muted-foreground">{pattern.description}</p>
                      </label>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Accent Wall */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-900/10 border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-4">
          <Checkbox
            id="accentWall"
            checked={data.accentWall}
            onCheckedChange={(checked) => handleChange("accentWall", checked)}
            className="mt-1"
          />
          <label htmlFor="accentWall" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-lg">Add Feature/Accent Wall</span>
              <span className="ml-auto text-primary font-bold">+$500-1,500</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Premium tile or stone accent wall behind vanity or in shower
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-purple-600 dark:text-purple-400">✓ Designer look</span>
              <span className="text-purple-600 dark:text-purple-400">✓ Focal point</span>
              <span className="text-purple-600 dark:text-purple-400">✓ Adds value</span>
            </div>
          </label>
        </div>
      </Card>

      {/* Paint Quality */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <Paintbrush className="h-5 w-5 text-primary" />
          Paint Quality
        </Label>
        <RadioGroup value={data.paint} onValueChange={(value) => handleChange("paint", value)}>
          <div className="grid gap-3">
            {PAINT_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.paint === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`paint-${option.value}`} className="mt-1" />
                  <label htmlFor={`paint-${option.value}`} className="flex-1 cursor-pointer">
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
