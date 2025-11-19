"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Lightbulb, Zap } from "lucide-react"
import Image from "next/image"

interface LightingStepProps {
  data: {
    vanityLights: string
    ceilingLight: string
    recessedLights: number
    ledMirror: boolean
    dimmer: boolean
  }
  onChange: (data: any) => void
}

const VANITY_LIGHT_OPTIONS = [
  {
    value: "budget",
    label: "Budget Vanity Lights",
    price: "$50-150",
    description: "Basic LED bar or sconces",
    image: "/budget-vanity-lights-basic-led-bar-bathroom.jpg",
  },
  {
    value: "standard",
    label: "Standard Vanity Lights",
    price: "$150-400",
    description: "Quality LED fixtures, modern design",
    image: "/standard-vanity-lights-quality-led-modern-bathroom.jpg",
  },
  {
    value: "premium",
    label: "Designer Vanity Lights",
    price: "$400-1,000",
    description: "High-end fixtures, perfect lighting",
    image: "/designer-vanity-lights-premium-fixtures-bathroom.jpg",
  },
]

const CEILING_LIGHT_OPTIONS = [
  { value: "budget", label: "Basic Ceiling Light", price: "$40-100", description: "Simple flush mount LED" },
  {
    value: "standard",
    label: "Standard Ceiling Fixture",
    price: "$100-300",
    description: "Quality LED flush or semi-flush",
  },
  {
    value: "premium",
    label: "Designer Ceiling Light",
    price: "$300-800",
    description: "Statement chandelier or pendant",
  },
]

export function LightingStep({ data, onChange }: LightingStepProps) {
  const handleChange = (field: string, value: any) => {
    // If changing vanity lights, include the image
    if (field === 'vanityLights') {
      const option = VANITY_LIGHT_OPTIONS.find(opt => opt.value === value)
      onChange({ [field]: value, vanityLightsImage: option?.image })
    } else {
      onChange({ [field]: value })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Lighting Design</h2>
      </div>

      {/* Vanity Lights */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold">Vanity Lighting</Label>
        <RadioGroup value={data.vanityLights} onValueChange={(value) => handleChange("vanityLights", value)}>
          <div className="grid gap-4 md:grid-cols-3">
            {VANITY_LIGHT_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  data.vanityLights === option.value ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="p-0">
                  <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-muted">
                    <Image src={option.image || "/placeholder.svg"} alt={option.label} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={option.value} id={`vanity-${option.value}`} className="mt-1" />
                      <label htmlFor={`vanity-${option.value}`} className="flex-1 cursor-pointer">
                        <div className="font-semibold mb-1">{option.label}</div>
                        <div className="text-sm text-primary font-bold mb-1">{option.price}</div>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Ceiling Light */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold">Ceiling Light</Label>
        <RadioGroup value={data.ceilingLight} onValueChange={(value) => handleChange("ceilingLight", value)}>
          <div className="grid gap-3">
            {CEILING_LIGHT_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.ceilingLight === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`ceiling-${option.value}`} className="mt-1" />
                  <label htmlFor={`ceiling-${option.value}`} className="flex-1 cursor-pointer">
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

      {/* Recessed Lights */}
      <Card className="p-6 border-2">
        <Label htmlFor="recessedLights" className="text-lg font-semibold mb-4 block">
          Recessed LED Lights (Can Lights)
        </Label>
        <div className="flex items-center gap-4 mb-4">
          <Input
            id="recessedLights"
            type="number"
            min="0"
            max="12"
            value={data.recessedLights}
            onChange={(e) => handleChange("recessedLights", Number.parseInt(e.target.value) || 0)}
            className="w-24 h-12 text-xl text-center font-semibold"
          />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Number of recessed lights to install</div>
            <div className="text-sm text-primary font-semibold">
              {data.recessedLights > 0
                ? `+$${(data.recessedLights * 150).toLocaleString()}-${(data.recessedLights * 300).toLocaleString()}`
                : "$0"}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Typical: 2-4 lights for small bathrooms, 4-8 for larger bathrooms. $150-300 per light installed.
        </p>
      </Card>

      {/* LED Mirror */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-900/10 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <Checkbox
            id="ledMirror"
            checked={data.ledMirror}
            onCheckedChange={(checked) => handleChange("ledMirror", checked)}
            className="mt-1"
          />
          <label htmlFor="ledMirror" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-lg">LED Backlit Mirror</span>
              <span className="ml-auto text-primary font-bold">+$300-800</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Modern mirror with integrated LED lighting, anti-fog feature, and touch controls
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-blue-600 dark:text-blue-400">✓ Perfect lighting</span>
              <span className="text-blue-600 dark:text-blue-400">✓ Modern look</span>
              <span className="text-blue-600 dark:text-blue-400">✓ Energy efficient</span>
            </div>
          </label>
        </div>
      </Card>

      {/* Dimmer Switches */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="dimmer"
            checked={data.dimmer}
            onCheckedChange={(checked) => handleChange("dimmer", checked)}
            className="mt-1"
          />
          <label htmlFor="dimmer" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Install Dimmer Switches</span>
              <span className="text-primary font-bold">+$150-300</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Smart dimmer switches for all lights, control brightness and ambiance
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Recommended - creates spa-like atmosphere and saves energy
            </div>
          </label>
        </div>
      </Card>
    </div>
  )
}
