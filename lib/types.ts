export interface EstimateData {
  dimensions: {
    length: number
    width: number
    height: number
    bathroomType: string
  }
  fixtures: {
    toilet: string
    sink: string
    shower: string
    bathtub: boolean
    bathtubType: string
    vanity: string
    faucets: string
    showerhead: string
    // Image paths for selected options
    toiletImage?: string
    sinkImage?: string
    showerImage?: string
    vanityImage?: string
  }
  flooring: {
    material: string
    heatedFloor: boolean
    waterproofing: string
    // Image path for selected material
    materialImage?: string
  }
  walls: {
    tile: string
    tilePattern: string
    accentWall: boolean
    waterproofing: string
    paint: string
    // Image paths for selected options
    tileImage?: string
    tilePatternImage?: string
  }
  plumbing: {
    pipingUpdate: boolean
    drainUpdate: boolean
    waterHeater: string
    shutoffValves: boolean
  }
  lighting: {
    vanityLights: string
    ceilingLight: string
    recessedLights: number
    ledMirror: boolean
    dimmer: boolean
    // Image path for selected vanity lights
    vanityLightsImage?: string
  }
  ventilation: {
    exhaustFan: string
    window: string
    dehumidifier: boolean
  }
  storage: {
    medicineCabinet: boolean
    showerNiches: number
    towelWarmer: boolean
    builtInShelving: boolean
  }
  accessibility: {
    grabBars: boolean
    curblessShower: boolean
    comfortHeightToilet: boolean
    wideEntrance: boolean
  }
  labor: {
    region: string
    timeline: string
    complexity: string
    demolition: boolean
    // Image path for region
    regionImage?: string
  }
}

export interface EstimateResult {
  total: number
  breakdown: {
    fixtures: number
    materials: number
    labor: number
    permits: number
    contingency: number
  }
  range: {
    low: number
    high: number
  }
}

export interface RenovationItems {
  dimensions: boolean
  fixtures: boolean
  flooring: boolean
  walls: boolean
  plumbing: boolean
  lighting: boolean
  ventilation: boolean
  storage: boolean
  accessibility: boolean
}
