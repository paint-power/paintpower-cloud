import type { EstimateData, EstimateResult } from "./types"

const FIXTURE_COSTS = {
  toilet: {
    budget: 150,
    standard: 400,
    premium: 1200,
  },
  sink: {
    budget: 120,
    standard: 350,
    premium: 900,
  },
  shower: {
    none: 0,
    standard: 1200,
    tile: 3800,
    premium: 8500,
  },
  bathtub: {
    alcove: 800,
    "drop-in": 1500,
    freestanding: 2800,
    "walk-in": 5500,
  },
  vanity: {
    budget: 300,
    standard: 1100,
    premium: 3200,
  },
  faucets: {
    budget: 80,
    standard: 200,
    premium: 450,
  },
  showerhead: {
    standard: 50,
    rain: 180,
    handheld: 120,
    "dual-system": 350,
  },
}

const FLOORING_COSTS = {
  vinyl: 4,
  ceramic: 12,
  porcelain: 16,
  "natural-stone": 30,
  "heated-floor-addon": 15,
}

const WALL_COSTS = {
  tile: {
    ceramic: 12,
    porcelain: 16,
    glass: 25,
    "natural-stone": 35,
  },
  paint: {
    budget: 35,
    standard: 50,
    premium: 75,
  },
  waterproofing: {
    basic: 200,
    premium: 450,
  },
}

const PLUMBING_COSTS = {
  pipingUpdate: 1200,
  drainUpdate: 800,
  waterHeater: {
    none: 0,
    tankless: 2500,
    "on-demand": 1800,
  },
  shutoffValves: 150,
}

const LIGHTING_COSTS = {
  vanityLights: {
    budget: 80,
    standard: 200,
    premium: 450,
  },
  ceilingLight: {
    budget: 60,
    standard: 150,
    premium: 350,
  },
  recessedLight: 120,
  ledMirror: 300,
  dimmer: 80,
}

const VENTILATION_COSTS = {
  exhaustFan: {
    basic: 150,
    standard: 300,
    premium: 600,
  },
  window: {
    none: 0,
    standard: 450,
    "energy-efficient": 800,
  },
  dehumidifier: 250,
}

const STORAGE_COSTS = {
  medicineCabinet: 200,
  showerNiche: 180,
  towelWarmer: 350,
  builtInShelving: 400,
}

const ACCESSIBILITY_COSTS = {
  grabBars: 200,
  curblessShower: 1200,
  comfortHeightToilet: 150,
  wideEntrance: 800,
}


export function calculateEstimate(data: EstimateData): EstimateResult {
  const squareFootage = data.dimensions.length * data.dimensions.width
  const wallArea = 2 * (data.dimensions.length + data.dimensions.width) * data.dimensions.height

  let fixturesCost = 0
  let materialsCost = 0
  let additionalCosts = 0

  // Calculate fixtures cost (only if fixtures data exists)
  if (data.fixtures) {
    if (data.fixtures.toilet) {
      fixturesCost += FIXTURE_COSTS.toilet[data.fixtures.toilet as keyof typeof FIXTURE_COSTS.toilet] || 0
    }
    if (data.fixtures.sink) {
      fixturesCost += FIXTURE_COSTS.sink[data.fixtures.sink as keyof typeof FIXTURE_COSTS.sink] || 0
    }
    if (data.fixtures.shower) {
      fixturesCost += FIXTURE_COSTS.shower[data.fixtures.shower as keyof typeof FIXTURE_COSTS.shower] || 0
    }
    if (data.fixtures.bathtub && data.fixtures.bathtubType) {
      fixturesCost += FIXTURE_COSTS.bathtub[data.fixtures.bathtubType as keyof typeof FIXTURE_COSTS.bathtub] || 0
    }
    if (data.fixtures.vanity) {
      fixturesCost += FIXTURE_COSTS.vanity[data.fixtures.vanity as keyof typeof FIXTURE_COSTS.vanity] || 0
    }
    if (data.fixtures.faucets) {
      fixturesCost += FIXTURE_COSTS.faucets[data.fixtures.faucets as keyof typeof FIXTURE_COSTS.faucets] || 0
    }
    if (data.fixtures.showerhead) {
      fixturesCost += FIXTURE_COSTS.showerhead[data.fixtures.showerhead as keyof typeof FIXTURE_COSTS.showerhead] || 0
    }
  }

  // Calculate flooring cost (only if flooring data exists)
  if (data.flooring) {
    if (data.flooring.material) {
      const floorCostPerSqFt = FLOORING_COSTS[data.flooring.material as keyof typeof FLOORING_COSTS] || 0
      materialsCost += squareFootage * floorCostPerSqFt
    }
    if (data.flooring.heatedFloor) {
      materialsCost += squareFootage * FLOORING_COSTS["heated-floor-addon"]
    }
    if (data.flooring.waterproofing && data.flooring.waterproofing !== "none") {
      materialsCost +=
        WALL_COSTS.waterproofing[data.flooring.waterproofing as keyof typeof WALL_COSTS.waterproofing] || 0
    }
  }

  // Calculate walls cost (only if walls data exists)
  if (data.walls) {
    if (data.walls.tile && data.walls.tile !== "none") {
      const tileArea = wallArea * 0.5
      const tileCostPerSqFt = WALL_COSTS.tile[data.walls.tile as keyof typeof WALL_COSTS.tile] || 0
      materialsCost += tileArea * tileCostPerSqFt
    }
    if (data.walls.paint) {
      materialsCost += 2 * (WALL_COSTS.paint[data.walls.paint as keyof typeof WALL_COSTS.paint] || 0)
    }
    if (data.walls.accentWall) {
      materialsCost += 300
    }
    if (data.walls.waterproofing && data.walls.waterproofing !== "none") {
      materialsCost += WALL_COSTS.waterproofing[data.walls.waterproofing as keyof typeof WALL_COSTS.waterproofing] || 0
    }
  }

  // Calculate plumbing cost (only if plumbing data exists)
  if (data.plumbing) {
    if (data.plumbing.pipingUpdate) {
      additionalCosts += PLUMBING_COSTS.pipingUpdate
    }
    if (data.plumbing.drainUpdate) {
      additionalCosts += PLUMBING_COSTS.drainUpdate
    }
    if (data.plumbing.waterHeater && data.plumbing.waterHeater !== "none") {
      additionalCosts +=
        PLUMBING_COSTS.waterHeater[data.plumbing.waterHeater as keyof typeof PLUMBING_COSTS.waterHeater] || 0
    }
    if (data.plumbing.shutoffValves) {
      additionalCosts += PLUMBING_COSTS.shutoffValves
    }
  }

  // Calculate lighting cost (only if lighting data exists)
  if (data.lighting) {
    if (data.lighting.vanityLights) {
      additionalCosts +=
        LIGHTING_COSTS.vanityLights[data.lighting.vanityLights as keyof typeof LIGHTING_COSTS.vanityLights] || 0
    }
    if (data.lighting.ceilingLight) {
      additionalCosts +=
        LIGHTING_COSTS.ceilingLight[data.lighting.ceilingLight as keyof typeof LIGHTING_COSTS.ceilingLight] || 0
    }
    if (data.lighting.recessedLights) {
      additionalCosts += data.lighting.recessedLights * LIGHTING_COSTS.recessedLight
    }
    if (data.lighting.ledMirror) {
      additionalCosts += LIGHTING_COSTS.ledMirror
    }
    if (data.lighting.dimmer) {
      additionalCosts += LIGHTING_COSTS.dimmer
    }
  }

  // Calculate ventilation cost (only if ventilation data exists)
  if (data.ventilation) {
    if (data.ventilation.exhaustFan) {
      additionalCosts +=
        VENTILATION_COSTS.exhaustFan[data.ventilation.exhaustFan as keyof typeof VENTILATION_COSTS.exhaustFan] || 0
    }
    if (data.ventilation.window && data.ventilation.window !== "none") {
      additionalCosts += VENTILATION_COSTS.window[data.ventilation.window as keyof typeof VENTILATION_COSTS.window] || 0
    }
    if (data.ventilation.dehumidifier) {
      additionalCosts += VENTILATION_COSTS.dehumidifier
    }
  }

  // Calculate storage cost (only if storage data exists)
  if (data.storage) {
    if (data.storage.medicineCabinet) {
      additionalCosts += STORAGE_COSTS.medicineCabinet
    }
    if (data.storage.showerNiches) {
      additionalCosts += data.storage.showerNiches * STORAGE_COSTS.showerNiche
    }
    if (data.storage.towelWarmer) {
      additionalCosts += STORAGE_COSTS.towelWarmer
    }
    if (data.storage.builtInShelving) {
      additionalCosts += STORAGE_COSTS.builtInShelving
    }
  }

  // Calculate accessibility cost (only if accessibility data exists)
  if (data.accessibility) {
    if (data.accessibility.grabBars) {
      additionalCosts += ACCESSIBILITY_COSTS.grabBars
    }
    if (data.accessibility.curblessShower) {
      additionalCosts += ACCESSIBILITY_COSTS.curblessShower
    }
    if (data.accessibility.comfortHeightToilet) {
      additionalCosts += ACCESSIBILITY_COSTS.comfortHeightToilet
    }
    if (data.accessibility.wideEntrance) {
      additionalCosts += ACCESSIBILITY_COSTS.wideEntrance
    }
  }

  // Calculate demolition cost if needed (only if user explicitly selected it)
  let demolitionCost = 0
  if (data.labor?.demolition) {
    demolitionCost = squareFootage * 15 + 500
  }

  // Total is only the sum of materials, fixtures, and optional demolition
  // NO labor markup, NO permits, NO contingency - only what user selected
  const total = Math.round(fixturesCost + materialsCost + additionalCosts + demolitionCost)

  const rangeLow = Math.round(total * 0.9)
  const rangeHigh = Math.round(total * 1.1)

  return {
    total,
    breakdown: {
      fixtures: Math.round(fixturesCost),
      materials: Math.round(materialsCost + additionalCosts),
      labor: 0, // Labor costs will be discussed when contacting the company
      permits: 0, // Not included in estimate
      contingency: 0, // Not included in estimate
    },
    range: {
      low: rangeLow,
      high: rangeHigh,
    },
  }
}
