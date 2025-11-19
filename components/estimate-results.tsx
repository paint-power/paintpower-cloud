"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { calculateEstimate } from "@/lib/calculate-estimate"
import { generatePDF } from "@/lib/pdf-generator"
import type { EstimateData, RenovationItems } from "@/lib/types"
import { Download, RotateCcw, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EstimateResultsProps {
  data: EstimateData
  selectedItems: RenovationItems
  onReset: () => void
}

export function EstimateResults({ data, selectedItems, onReset }: EstimateResultsProps) {
  const { toast } = useToast()
  const estimate = calculateEstimate(data)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    details: ''
  })

  const formatPrice = (price: number) => `$${price.toLocaleString()}`

  const handleDownload = async () => {
    // Show contact dialog first
    setShowContactDialog(true)
  }

  const handleGeneratePDF = async () => {
    try {
      toast({
        title: "Generating PDF...",
        description: "Your professional estimate is being prepared for download",
      })

      // Generate PDF with contact info
      await generatePDF({
        ...data,
        estimate,
        formatPrice,
        contactInfo,
        selectedItems,
        quoteNumber: `EST-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
        date: new Date().toISOString()
      })

      setShowContactDialog(false)
      
      toast({
        title: "PDF downloaded!",
        description: "Your estimate has been saved successfully",
      })

      // Reset contact info
      setContactInfo({
        name: '',
        phone: '',
        email: '',
        address: '',
        details: ''
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: "Error generating PDF",
        description: "There was a problem creating your estimate. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-balance">Your Estimate is Ready!</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Here's a detailed breakdown of your bathroom renovation costs
        </p>
      </div>

      {/* Total Estimate Card */}
      <Card className="mb-6 shadow-lg border-2 border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">Estimated Materials Cost</CardTitle>
          <CardDescription>Based on your selections - Labor quoted upon contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">${estimate.total.toLocaleString()}</div>
            <div className="text-muted-foreground">
              Range: ${estimate.range.low.toLocaleString()} - ${estimate.range.high.toLocaleString()}
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> Labor, installation, permits & fees will be provided when you contact us for a detailed quote.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Cost Breakdown</CardTitle>
          <CardDescription>Materials and fixtures you selected</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="font-medium">Fixtures & Fittings</span>
            <span className="text-lg font-semibold">
              ${estimate.breakdown.fixtures.toLocaleString()}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="font-medium">Materials & Finishes</span>
            <span className="text-lg font-semibold">${estimate.breakdown.materials.toLocaleString()}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary">
            <div className="flex flex-col">
              <span className="font-bold text-lg">Total Materials Cost</span>
              <span className="text-xs text-muted-foreground">Labor & installation quoted separately</span>
            </div>
            <span className="text-2xl font-bold text-primary">
              ${(estimate.breakdown.fixtures + estimate.breakdown.materials).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Room Size</div>
            <div className="font-medium">
              {data.dimensions.length}' × {data.dimensions.width}' (
              {(data.dimensions.length * data.dimensions.width).toFixed(1)} sq ft)
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Location</div>
            <div className="font-medium capitalize">{data.labor.region.replace("-", " ")}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Timeline</div>
            <div className="font-medium capitalize">{data.labor.timeline}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Complexity</div>
            <div className="font-medium capitalize">{data.labor.complexity}</div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleDownload} variant="outline" size="lg" className="flex-1 bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Download Professional PDF
        </Button>
        <Button onClick={onReset} size="lg" className="flex-1">
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Estimate
        </Button>
      </div>

      {/* Disclaimer */}
      <Card className="mt-6 bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Important:</strong> This estimate covers materials and fixtures only. Labor costs, installation fees, 
            permits, and final pricing will be provided when you contact Paint Power for a detailed quote. Actual costs may 
            vary based on specific product availability, site conditions, and project requirements.
          </p>
        </CardContent>
      </Card>

      {/* Contact Information Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Information</DialogTitle>
            <DialogDescription>
              Please provide your contact details to personalize your estimate PDF.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Project Address *</Label>
              <Input
                id="address"
                placeholder="123 Main St, City, State, ZIP"
                value={contactInfo.address}
                onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea
                id="details"
                placeholder="Any specific requirements or notes about your project..."
                value={contactInfo.details}
                onChange={(e) => setContactInfo({ ...contactInfo, details: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowContactDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGeneratePDF}
              className="flex-1"
              disabled={!contactInfo.name || !contactInfo.phone || !contactInfo.email || !contactInfo.address}
            >
              <Download className="mr-2 h-4 w-4" />
              Generate PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
