"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Wind } from "lucide-react"

interface VentilationStepProps {
  data: {
    exhaustFan: string
    window: string
    dehumidifier: boolean
  }
  onChange: (data: any) => void
}

const EXHAUST_FAN_OPTIONS = [
  { value: "basic", label: "Basic Exhaust Fan", price: "$100-200", description: "Standard ventilation, 50-80 CFM" },
  {
    value: "standard",
    label: "Quiet Fan with Light",
    price: "$200-400",
    description: "Low noise, LED light, 80-110 CFM",
  },
  {
    value: "premium",
    label: "Premium Fan System",
    price: "$400-800",
    description: "Ultra-quiet, heater, humidity sensor",
  },
]

const WINDOW_OPTIONS = [
  { value: "none", label: "No Window Changes", price: "$0", description: "Keep existing window or no window" },
  {
    value: "new",
    label: "Install New Window",
    price: "$500-1,500",
    description: "Add new window for natural ventilation",
  },
  {
    value: "replace",
    label: "Replace Existing Window",
    price: "$400-1,000",
    description: "Upgrade to energy-efficient window",
  },
]

export function VentilationStep({ data, onChange }: VentilationStepProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Ventilation & Air Quality</h2>
      </div>

      {/* Exhaust Fan */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold">Exhaust Fan</Label>
        <RadioGroup value={data.exhaustFan} onValueChange={(value) => handleChange("exhaustFan", value)}>
          <div className="grid gap-3">
            {EXHAUST_FAN_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.exhaustFan === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`fan-${option.value}`} className="mt-1" />
                  <label htmlFor={`fan-${option.value}`} className="flex-1 cursor-pointer">
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

      {/* Window */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold">Window</Label>
        <RadioGroup value={data.window} onValueChange={(value) => handleChange("window", value)}>
          <div className="grid gap-3">
            {WINDOW_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.window === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`window-${option.value}`} className="mt-1" />
                  <label htmlFor={`window-${option.value}`} className="flex-1 cursor-pointer">
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

      {/* Dehumidifier */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="dehumidifier"
            checked={data.dehumidifier}
            onCheckedChange={(checked) => handleChange("dehumidifier", checked)}
            className="mt-1"
          />
          <label htmlFor="dehumidifier" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Whole-Room Dehumidifier</span>
              <span className="text-primary font-bold">+$300-600</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Integrated dehumidification system to prevent mold and mildew
            </p>
            <div className="text-xs text-muted-foreground">
              Recommended for: bathrooms without windows, high humidity climates, or mold concerns
            </div>
          </label>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">💡</span> Ventilation Tips
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Proper ventilation is required by building code in most areas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Exhaust fans should vent to the outside, not into attic space</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>CFM (cubic feet per minute) should match bathroom size - minimum 50 CFM</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
