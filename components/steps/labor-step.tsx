"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Clock, MapPin, Hammer } from "lucide-react"

interface LaborStepProps {
  data: {
    region: string
    timeline: string
    complexity: string
    demolition: boolean
  }
  onChange: (data: any) => void
}

const LABOR_OPTIONS = {
  region: [
    {
      value: "midwest",
      label: "Midwest",
      description: "OH, IN, IL, MI, WI, MN, IA, MO, ND, SD, NE, KS",
    },
    {
      value: "south",
      label: "South",
      description: "TX, OK, AR, LA, MS, AL, TN, KY, WV, VA, NC, SC, GA, FL",
    },
    {
      value: "northeast",
      label: "Northeast",
      description: "ME, NH, VT, MA, RI, CT, NY, NJ, PA, DE, MD",
    },
    {
      value: "west-coast",
      label: "West Coast",
      description: "CA, OR, WA, AK, HI, NV, AZ, UT, ID, MT, WY, CO, NM",
    },
    {
      value: "major-metro",
      label: "Major Metro Areas",
      description: "NYC, SF Bay Area, LA, Boston, Seattle metro",
    },
  ],
  timeline: [
    { value: "flexible", label: "Flexible (4-6 weeks)", description: "Standard timeline, lower cost" },
    { value: "standard", label: "Standard (2-3 weeks)", description: "Normal project timeline" },
    { value: "rush", label: "Rush (1-2 weeks)", description: "Expedited, higher cost" },
  ],
  complexity: [
    { value: "simple", label: "Simple Refresh", description: "Cosmetic updates only" },
    { value: "standard", label: "Standard Remodel", description: "Full renovation" },
    {
      value: "complex",
      label: "Complex Remodel",
      description: "Structural changes, plumbing relocation",
    },
  ],
}

export function LaborStep({ data, onChange }: LaborStepProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-900/10 border-red-200 dark:border-red-800">
        <div className="flex items-start gap-4">
          <Checkbox
            id="demolition"
            checked={data.demolition}
            onCheckedChange={(checked) => handleChange("demolition", checked)}
            className="mt-1"
          />
          <label htmlFor="demolition" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Hammer className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-lg">Full Demolition Required</span>
              <span className="ml-auto text-primary font-bold">+$1,500-3,500</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Complete removal of existing fixtures, flooring, tile, and disposal of debris
            </p>
            <div className="text-xs text-muted-foreground">
              Includes: fixture removal, tile/flooring demo, drywall removal if needed, debris hauling
            </div>
          </label>
        </div>
      </Card>

      {/* Region */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Location
        </Label>
        <RadioGroup value={data.region} onValueChange={(value) => handleChange("region", value)}>
          <div className="grid gap-3">
            {LABOR_OPTIONS.region.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.region === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`region-${option.value}`} className="mt-1" />
                  <label htmlFor={`region-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="mb-1">
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Project Timeline
        </Label>
        <RadioGroup value={data.timeline} onValueChange={(value) => handleChange("timeline", value)}>
          <div className="grid gap-3">
            {LABOR_OPTIONS.timeline.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.timeline === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`timeline-${option.value}`} className="mt-1" />
                  <label htmlFor={`timeline-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="mb-1">
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Complexity */}
      <div className="space-y-4">
        <Label className="text-xl font-semibold">Project Complexity</Label>
        <RadioGroup value={data.complexity} onValueChange={(value) => handleChange("complexity", value)}>
          <div className="grid gap-3">
            {LABOR_OPTIONS.complexity.map((option) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer hover:border-primary transition-all ${
                  data.complexity === option.value ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={`complexity-${option.value}`} className="mt-1" />
                  <label htmlFor={`complexity-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="mb-1">
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">💡</span> Labor Cost Information
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Labor typically accounts for 40-60% of total renovation costs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Rush timelines require premium rates and may limit contractor availability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Complex projects may require licensed plumbers, electricians, and structural engineers</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
