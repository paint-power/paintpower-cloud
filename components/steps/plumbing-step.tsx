"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Wrench, Droplets } from "lucide-react"

interface PlumbingStepProps {
  data: {
    pipingUpdate: boolean
    drainUpdate: boolean
    waterHeater: string
    shutoffValves: boolean
  }
  onChange: (data: any) => void
}

const WATER_HEATER_OPTIONS = [
  { value: "none", label: "No Changes", price: "$0", description: "Keep existing water heater" },
  {
    value: "tankless",
    label: "Tankless Water Heater",
    price: "$1,200-3,000",
    description: "On-demand hot water, energy efficient",
  },
  { value: "tank", label: "Tank Water Heater", price: "$800-1,500", description: "Traditional 40-50 gallon tank" },
  {
    value: "point-of-use",
    label: "Point-of-Use Heater",
    price: "$300-800",
    description: "Small heater for bathroom only",
  },
]

export function PlumbingStep({ data, onChange }: PlumbingStepProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Plumbing Systems</h2>
      </div>

      {/* Piping Update */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="pipingUpdate"
            checked={data.pipingUpdate}
            onCheckedChange={(checked) => handleChange("pipingUpdate", checked)}
            className="mt-1"
          />
          <label htmlFor="pipingUpdate" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Update Water Supply Lines</span>
              <span className="text-primary font-bold">+$800-1,500</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Replace old galvanized or copper pipes with new PEX piping for better water pressure and reliability
            </p>
            <div className="text-xs text-muted-foreground">
              Recommended if: pipes are 30+ years old, low water pressure, or visible corrosion
            </div>
          </label>
        </div>
      </Card>

      {/* Drain Update */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="drainUpdate"
            checked={data.drainUpdate}
            onCheckedChange={(checked) => handleChange("drainUpdate", checked)}
            className="mt-1"
          />
          <label htmlFor="drainUpdate" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Replace Drain Lines</span>
              <span className="text-primary font-bold">+$600-1,200</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Install new PVC drain pipes and P-traps to prevent future clogs and leaks
            </p>
            <div className="text-xs text-muted-foreground">
              Recommended if: frequent clogs, slow drains, or cast iron pipes
            </div>
          </label>
        </div>
      </Card>

      {/* Water Heater */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          Water Heater
        </Label>
        <RadioGroup value={data.waterHeater} onValueChange={(value) => handleChange("waterHeater", value)}>
          <div className="grid gap-3">
            {WATER_HEATER_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.waterHeater === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`heater-${option.value}`} className="mt-1" />
                  <label htmlFor={`heater-${option.value}`} className="flex-1 cursor-pointer">
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

      {/* Shutoff Valves */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="shutoffValves"
            checked={data.shutoffValves}
            onCheckedChange={(checked) => handleChange("shutoffValves", checked)}
            className="mt-1"
          />
          <label htmlFor="shutoffValves" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Install Individual Shutoff Valves</span>
              <span className="text-primary font-bold">+$200-400</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Add shutoff valves for each fixture (toilet, sink, shower) for easy maintenance
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Highly recommended - allows repairs without shutting off water to entire home
            </div>
          </label>
        </div>
      </Card>
    </div>
  )
}
