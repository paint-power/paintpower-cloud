"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface AccessibilityStepProps {
  data: {
    grabBars: boolean
    curblessShower: boolean
    comfortHeightToilet: boolean
    wideEntrance: boolean
  }
  onChange: (data: any) => void
}

export function AccessibilityStep({ data, onChange }: AccessibilityStepProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Accessibility & Safety Features</h2>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg mb-6">
        <p className="text-sm text-muted-foreground">
          These features improve safety and accessibility for all ages. They're especially important for aging-in-place
          or multi-generational homes.
        </p>
      </div>

      {/* Grab Bars */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="grabBars"
            checked={data.grabBars}
            onCheckedChange={(checked) => handleChange("grabBars", checked)}
            className="mt-1"
          />
          <label htmlFor="grabBars" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Install Grab Bars</span>
              <span className="text-primary font-bold">+$200-500</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              ADA-compliant grab bars in shower and near toilet for safety and support
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Prevents falls • Increases home value • Required for aging-in-place
            </div>
          </label>
        </div>
      </Card>

      {/* Curbless Shower */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="curblessShower"
            checked={data.curblessShower}
            onCheckedChange={(checked) => handleChange("curblessShower", checked)}
            className="mt-1"
          />
          <label htmlFor="curblessShower" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Curbless/Walk-in Shower</span>
              <span className="text-primary font-bold">+$800-2,000</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Zero-threshold shower entry for wheelchair access and modern aesthetic
            </p>
            <div className="text-xs text-muted-foreground">
              Requires proper floor slope and waterproofing. Modern, spa-like appearance.
            </div>
          </label>
        </div>
      </Card>

      {/* Comfort Height Toilet */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="comfortHeightToilet"
            checked={data.comfortHeightToilet}
            onCheckedChange={(checked) => handleChange("comfortHeightToilet", checked)}
            className="mt-1"
          />
          <label htmlFor="comfortHeightToilet" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Comfort Height Toilet</span>
              <span className="text-primary font-bold">+$100-300</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              ADA-compliant toilet at chair height (17-19") for easier sitting and standing
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Highly recommended - more comfortable for most adults
            </div>
          </label>
        </div>
      </Card>

      {/* Wide Entrance */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="wideEntrance"
            checked={data.wideEntrance}
            onCheckedChange={(checked) => handleChange("wideEntrance", checked)}
            className="mt-1"
          />
          <label htmlFor="wideEntrance" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Widen Doorway (36")</span>
              <span className="text-primary font-bold">+$500-1,500</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Expand doorway to 36" width for wheelchair accessibility
            </p>
            <div className="text-xs text-muted-foreground">Includes framing modification, new door, and trim work</div>
          </label>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">ℹ️</span> Why Consider Accessibility?
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>
              <strong>Universal Design:</strong> Benefits everyone, not just those with mobility challenges
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>
              <strong>Future-Proofing:</strong> Easier to install during renovation than retrofit later
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>
              <strong>Resale Value:</strong> Increasingly important to buyers as population ages
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>
              <strong>Tax Credits:</strong> May qualify for home modification tax deductions
            </span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
