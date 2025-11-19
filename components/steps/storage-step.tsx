"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Package } from "lucide-react"

interface StorageStepProps {
  data: {
    medicineCabinet: boolean
    showerNiches: number
    towelWarmer: boolean
    builtInShelving: boolean
  }
  onChange: (data: any) => void
}

export function StorageStep({ data, onChange }: StorageStepProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Storage & Accessories</h2>
      </div>

      {/* Medicine Cabinet */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="medicineCabinet"
            checked={data.medicineCabinet}
            onCheckedChange={(checked) => handleChange("medicineCabinet", checked)}
            className="mt-1"
          />
          <label htmlFor="medicineCabinet" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Recessed Medicine Cabinet</span>
              <span className="text-primary font-bold">+$200-600</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Built-in medicine cabinet with mirror, LED lighting optional
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Recommended - adds storage without taking up space
            </div>
          </label>
        </div>
      </Card>

      {/* Shower Niches */}
      <Card className="p-6 border-2">
        <Label htmlFor="showerNiches" className="text-lg font-semibold mb-4 block">
          Shower Niches (Built-in Shelves)
        </Label>
        <div className="flex items-center gap-4 mb-4">
          <Input
            id="showerNiches"
            type="number"
            min="0"
            max="4"
            value={data.showerNiches}
            onChange={(e) => handleChange("showerNiches", Number.parseInt(e.target.value) || 0)}
            className="w-24 h-12 text-xl text-center font-semibold"
          />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Number of recessed shower shelves</div>
            <div className="text-sm text-primary font-semibold">
              {data.showerNiches > 0
                ? `+$${(data.showerNiches * 200).toLocaleString()}-${(data.showerNiches * 400).toLocaleString()}`
                : "$0"}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Built-in tile niches for shampoo, soap, etc. Typical: 1-2 niches. $200-400 per niche.
        </p>
      </Card>

      {/* Towel Warmer */}
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-900/10 border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-4">
          <Checkbox
            id="towelWarmer"
            checked={data.towelWarmer}
            onCheckedChange={(checked) => handleChange("towelWarmer", checked)}
            className="mt-1"
          />
          <label htmlFor="towelWarmer" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <span className="font-semibold text-lg">Heated Towel Rack</span>
              <span className="ml-auto text-primary font-bold">+$300-800</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Wall-mounted electric towel warmer for luxury spa experience
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-amber-600 dark:text-amber-400">✓ Luxury comfort</span>
              <span className="text-amber-600 dark:text-amber-400">✓ Dries towels</span>
              <span className="text-amber-600 dark:text-amber-400">✓ Reduces mildew</span>
            </div>
          </label>
        </div>
      </Card>

      {/* Built-in Shelving */}
      <Card className="p-6 border-2">
        <div className="flex items-start gap-4">
          <Checkbox
            id="builtInShelving"
            checked={data.builtInShelving}
            onCheckedChange={(checked) => handleChange("builtInShelving", checked)}
            className="mt-1"
          />
          <label htmlFor="builtInShelving" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Custom Built-in Shelving</span>
              <span className="text-primary font-bold">+$400-1,200</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Recessed wall shelving for towels, toiletries, and decor
            </p>
            <div className="text-xs text-muted-foreground">
              Perfect for: maximizing storage in small bathrooms or creating a spa-like feel
            </div>
          </label>
        </div>
      </Card>
    </div>
  )
}
