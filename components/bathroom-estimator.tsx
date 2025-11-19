"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SelectionStep } from "./steps/selection-step"
import { DimensionsStep } from "./steps/dimensions-step"
import { FixturesStep } from "./steps/fixtures-step"
import { FlooringStep } from "./steps/flooring-step"
import { WallsStep } from "./steps/walls-step"
import { PlumbingStep } from "./steps/plumbing-step"
import { LightingStep } from "./steps/lighting-step"
import { VentilationStep } from "./steps/ventilation-step"
import { StorageStep } from "./steps/storage-step"
import { AccessibilityStep } from "./steps/accessibility-step"
import { LaborStep } from "./steps/labor-step"
import { EstimateResults } from "./estimate-results"
import { Calculator, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import type { EstimateData, RenovationItems } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export function BathroomEstimator() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const [selectedItems, setSelectedItems] = useState<RenovationItems>({
    dimensions: false,
    fixtures: false,
    flooring: false,
    walls: false,
    plumbing: false,
    lighting: false,
    ventilation: false,
    storage: false,
    accessibility: false,
  })

  const [estimateData, setEstimateData] = useState<EstimateData>({
    dimensions: {
      length: 8,
      width: 6,
      height: 8,
      bathroomType: "full",
    },
    fixtures: {
      toilet: "standard",
      sink: "standard",
      shower: "standard",
      bathtub: false,
      bathtubType: "standard",
      vanity: "standard",
      faucets: "standard",
      showerhead: "standard",
    },
    flooring: {
      material: "ceramic",
      heatedFloor: false,
      waterproofing: "standard",
    },
    walls: {
      tile: "ceramic",
      tilePattern: "standard",
      accentWall: false,
      waterproofing: "standard",
      paint: "standard",
    },
    plumbing: {
      pipingUpdate: false,
      drainUpdate: false,
      waterHeater: "none",
      shutoffValves: true,
    },
    lighting: {
      vanityLights: "standard",
      ceilingLight: "standard",
      recessedLights: 0,
      ledMirror: false,
      dimmer: false,
    },
    ventilation: {
      exhaustFan: "standard",
      window: "none",
      dehumidifier: false,
    },
    storage: {
      medicineCabinet: true,
      showerNiches: 0,
      towelWarmer: false,
      builtInShelving: false,
    },
    accessibility: {
      grabBars: false,
      curblessShower: false,
      comfortHeightToilet: false,
      wideEntrance: false,
    },
    labor: {
      region: "midwest",
      timeline: "standard",
      complexity: "standard",
      demolition: true,
    },
  })

  const steps = useMemo(() => {
    const allSteps = [
      { id: "selection", name: "Select Items", component: "selection", alwaysShow: true },
      { id: "dimensions", name: "Bathroom Size", component: "dimensions", selected: selectedItems.dimensions },
      { id: "fixtures", name: "Fixtures", component: "fixtures", selected: selectedItems.fixtures },
      { id: "flooring", name: "Flooring", component: "flooring", selected: selectedItems.flooring },
      { id: "walls", name: "Walls", component: "walls", selected: selectedItems.walls },
      { id: "plumbing", name: "Plumbing", component: "plumbing", selected: selectedItems.plumbing },
      { id: "lighting", name: "Lighting", component: "lighting", selected: selectedItems.lighting },
      { id: "ventilation", name: "Ventilation", component: "ventilation", selected: selectedItems.ventilation },
      { id: "storage", name: "Storage", component: "storage", selected: selectedItems.storage },
      { id: "accessibility", name: "Accessibility", component: "accessibility", selected: selectedItems.accessibility },
      { id: "labor", name: "Project Details", component: "labor", alwaysShow: true },
    ]

    return allSteps.filter((step) => step.alwaysShow || step.selected)
  }, [selectedItems])

  const updateEstimateData = (section: keyof EstimateData, data: any) => {
    setEstimateData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const handleNext = () => {
    if (currentStep === 0) {
      const hasSelection = Object.values(selectedItems).some(Boolean)
      if (!hasSelection) {
        toast({
          title: "Please select at least one item",
          description: "Choose what you'd like to renovate to continue",
          variant: "destructive",
        })
        return
      }

      const selectedCount = Object.values(selectedItems).filter(Boolean).length
      toast({
        title: "Great choices!",
        description: `You've selected ${selectedCount} renovation ${selectedCount === 1 ? "item" : "items"}. Let's get started!`,
      })
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })

      // Show progress toast
      if (currentStep > 0) {
        toast({
          title: "Step completed!",
          description: `Moving to ${steps[currentStep + 1].name}`,
        })
      }
    } else {
      // Calculate estimate
      toast({
        title: "Calculating your estimate...",
        description: "Analyzing your selections and generating detailed costs",
      })

      setTimeout(() => {
        setShowResults(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
        toast({
          title: "Estimate ready!",
          description: "Your detailed bathroom renovation estimate is complete",
        })
      }, 800)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setShowResults(false)
    setSelectedItems({
      dimensions: false,
      fixtures: false,
      flooring: false,
      walls: false,
      plumbing: false,
      lighting: false,
      ventilation: false,
      storage: false,
      accessibility: false,
    })
    toast({
      title: "Starting fresh",
      description: "Let's create a new estimate for your bathroom renovation",
    })
  }

  const progress = ((currentStep + 1) / steps.length) * 100
  const currentStepData = steps[currentStep]

  if (showResults) {
    return <EstimateResults data={estimateData} selectedItems={selectedItems} onReset={handleReset} />
  }

  const hasSelection = Object.values(selectedItems).some(Boolean)
  const isSelectionStep = currentStep === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4 md:mb-6 p-3 md:p-4 bg-primary/10 rounded-2xl">
            <Calculator className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Professional Bathroom Estimator
            </h1>
          </div>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty px-4">
            Get a detailed, accurate cost estimate for your bathroom renovation with our comprehensive professional tool
          </p>
        </div>

        {/* Progress Bar - Horizontal on desktop */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center justify-between mb-4 overflow-x-auto pb-2 gap-2">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center min-w-[80px] md:min-w-[100px]">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                        isCompleted
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : isCurrent
                            ? "bg-primary text-primary-foreground shadow-lg scale-110"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
                      ) : (
                        <span className="text-sm md:text-base">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-xs mt-2 text-center max-w-[80px] md:max-w-[100px]">
                      <div
                        className={`font-medium ${isCurrent || isCompleted ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {step.name}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-6 md:w-8 mx-1 rounded transition-all duration-300 flex-shrink-0 ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2 md:h-3 rounded-full" />
          <div className="text-center mt-2 text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Main Card - Wider layout */}
        <Card className="shadow-2xl border-2 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 md:p-6 border-b">
            <h2 className="text-2xl md:text-3xl font-bold">{currentStepData.name}</h2>
          </div>
          <CardContent className="p-4 md:p-8">
            {currentStepData.component === "selection" && (
              <SelectionStep selected={selectedItems} onChange={setSelectedItems} />
            )}
            {currentStepData.component === "dimensions" && (
              <DimensionsStep
                data={estimateData.dimensions}
                onChange={(data) => updateEstimateData("dimensions", data)}
              />
            )}
            {currentStepData.component === "fixtures" && (
              <FixturesStep data={estimateData.fixtures} onChange={(data) => updateEstimateData("fixtures", data)} />
            )}
            {currentStepData.component === "flooring" && (
              <FlooringStep data={estimateData.flooring} onChange={(data) => updateEstimateData("flooring", data)} />
            )}
            {currentStepData.component === "walls" && (
              <WallsStep data={estimateData.walls} onChange={(data) => updateEstimateData("walls", data)} />
            )}
            {currentStepData.component === "plumbing" && (
              <PlumbingStep data={estimateData.plumbing} onChange={(data) => updateEstimateData("plumbing", data)} />
            )}
            {currentStepData.component === "lighting" && (
              <LightingStep data={estimateData.lighting} onChange={(data) => updateEstimateData("lighting", data)} />
            )}
            {currentStepData.component === "ventilation" && (
              <VentilationStep
                data={estimateData.ventilation}
                onChange={(data) => updateEstimateData("ventilation", data)}
              />
            )}
            {currentStepData.component === "storage" && (
              <StorageStep data={estimateData.storage} onChange={(data) => updateEstimateData("storage", data)} />
            )}
            {currentStepData.component === "accessibility" && (
              <AccessibilityStep
                data={estimateData.accessibility}
                onChange={(data) => updateEstimateData("accessibility", data)}
              />
            )}
            {currentStepData.component === "labor" && (
              <LaborStep data={estimateData.labor} onChange={(data) => updateEstimateData("labor", data)} />
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t-2">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                size="lg"
                className="w-full sm:w-auto min-w-32 h-12 bg-transparent"
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isSelectionStep && !hasSelection}
                size="lg"
                className="w-full sm:w-auto min-w-40 h-12 text-lg font-semibold"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Estimate
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Footer */}
        <div className="mt-6 md:mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-muted/50 rounded-full text-xs md:text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            All estimates are based on current US market prices and may vary by location
          </div>
        </div>
      </div>
    </div>
  )
}
