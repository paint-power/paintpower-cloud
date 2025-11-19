import jsPDF from 'jspdf'
import type { EstimateData, EstimateResult } from './types'

export interface PDFData extends EstimateData {
  estimate: EstimateResult
  formatPrice: (price: number) => string
  contactInfo: {
    name: string
    phone: string
    email: string
    address: string
    details: string
  }
  quoteNumber?: string
  date?: string
  selectedItems?: {
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
}

// Professional color palette inspired by Paint Power branding
const colors = {
  primary: [139, 195, 74],        // green primary
  secondary: [205, 180, 140],     // beige/gold soft
  accent: [160, 120, 80],         // light brown
  light: [252, 247, 240],         // light beige
  dark: [90, 60, 40],             // dark brown
  white: [255, 255, 255],
  lightGreen: [241, 233, 220]     // darker beige
}

// Helper to resolve image path to absolute URL for fetch
const resolveImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  // If already absolute (http/https/data), return as is
  if (/^(https?:\/\/|data:)/.test(imagePath)) return imagePath;
  // Otherwise, resolve relative to current origin
  return window.location.origin + (imagePath.startsWith('/') ? imagePath : '/' + imagePath);
}

const getImageAsBase64 = async (imagePath: string): Promise<string> => {
  try {
    const url = resolveImageUrl(imagePath);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Image fetch failed: ' + url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error, imagePath);
    return '';
  }
}

// Helper function to add image with fallback to logo
const addImageWithFallback = async (
  pdf: jsPDF,
  imagePath: string,
  logoBase64: string,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  let imageBase64 = ''
  
  if (imagePath) {
    try {
      imageBase64 = await getImageAsBase64(imagePath)
    } catch (error) {
      console.log(`Error loading image: ${imagePath}`)
    }
  }
  
  if (imageBase64) {
    try {
      pdf.addImage(imageBase64, 'JPEG', x, y, width, height)
      return true
    } catch (error) {
      console.log('Error adding image to PDF')
    }
  }
  
  // Fallback to logo or placeholder
  if (logoBase64) {
    try {
      pdf.addImage(logoBase64, 'JPEG', x, y, width, height)
      return true
    } catch (error) {
      console.log('Error adding logo to PDF')
    }
  }
  
  // Last fallback: visual placeholder
  pdf.setFillColor(colors.light[0], colors.light[1], colors.light[2])
  pdf.roundedRect(x, y, width, height, 3, 3, 'F')
  pdf.setDrawColor(colors.accent[0], colors.accent[1], colors.accent[2])
  pdf.setLineWidth(0.5)
  pdf.roundedRect(x, y, width, height, 3, 3, 'S')
  
  // Placeholder text
  pdf.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2])
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Image', x + width/2, y + height/2, { align: 'center' })
  
  return false
}

export const generatePDF = async (data: PDFData) => {
  const {
    formatPrice,
    contactInfo,
    estimate,
    dimensions,
    fixtures,
    flooring,
    walls,
    plumbing,
    lighting,
    ventilation,
    storage,
    accessibility,
    labor,
    selectedItems
  } = data

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const maxContentHeight = pageHeight - 40 // Reserve space for footer

  // Function to check if we need a new page
  const checkNewPage = (currentY: number, requiredHeight: number) => {
    if (currentY + requiredHeight > maxContentHeight) {
      pdf.addPage()
      return 30 // New Y position after header
    }
    return currentY
  }

  // Function to add header on new pages
  const addPageHeader = () => {
    pdf.setFillColor(colors.light[0], colors.light[1], colors.light[2]);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.rect(0, 0, pageWidth, 25, 'F');
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PAINT POWER', margin, 15);
    pdf.setFontSize(8);
    pdf.text('Professional Bathroom Renovation Estimate', pageWidth - margin, 15, { align: 'right' });
  }

  // Use saved quote number or generate one as fallback
  const quoteNumber = data.quoteNumber || `EST-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
  
  // Use saved date or current date as fallback
  const savedDate = data.date ? new Date(data.date) : new Date()
  const currentDate = savedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Load logo
  let logoBase64 = ''
  try {
    logoBase64 = await getImageAsBase64('/paintpower-logo.png')
  } catch (error) {
    console.log('Logo not found, using placeholder')
  }

  // ============ PROFESSIONAL HEADER ============
  pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.rect(0, 0, pageWidth, 65, 'F')
  
  pdf.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2])
  pdf.rect(0, 62, pageWidth, 3, 'F')

  // Logo in header
  if (logoBase64) {
    try {
      pdf.addImage(logoBase64, 'JPEG', margin, 15, 35, 35)
    } catch (error) {
      // Logo placeholder
      pdf.setFillColor(colors.white[0], colors.white[1], colors.white[2])
      pdf.roundedRect(margin, 15, 35, 35, 3, 3, 'F')
      pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
      pdf.roundedRect(margin + 3, 18, 29, 29, 2, 2, 'F')
      
      pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2])
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('PP', margin + 17.5, 37, { align: 'center' })
    }
  } else {
    // Logo placeholder
    pdf.setFillColor(colors.white[0], colors.white[1], colors.white[2])
    pdf.roundedRect(margin, 15, 35, 35, 3, 3, 'F')
    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
    pdf.roundedRect(margin + 3, 18, 29, 29, 2, 2, 'F')
    
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2])
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('PP', margin + 17.5, 37, { align: 'center' })
  }

  // Company information
  pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2])
  pdf.setFontSize(28)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PAINT POWER', margin + 45, 25)
  
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Premium Bathroom Renovation Specialists', margin + 45, 33)
  
  pdf.setFontSize(9)
  pdf.text('Licensed • Insured • BBB A+ Rated', margin + 45, 40)
  pdf.text('Serving Nationwide Since 1995', margin + 45, 47)

  // Document information box
  pdf.setFillColor(colors.white[0], colors.white[1], colors.white[2])
  pdf.roundedRect(pageWidth - 70, 12, 55, 40, 3, 3, 'F')
  pdf.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2])
  pdf.setLineWidth(1)
  pdf.roundedRect(pageWidth - 70, 12, 55, 40, 3, 3, 'S')
  
  pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('ESTIMATE', pageWidth - 42.5, 22, { align: 'center' })
  
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`Quote: ${quoteNumber}`, pageWidth - 67, 30)
  pdf.text(`Date: ${currentDate}`, pageWidth - 67, 36)
  pdf.text('Valid: 10 Business Days', pageWidth - 67, 42)
  pdf.text('Priority: Standard', pageWidth - 67, 48)

  let yPos = 85

  // ============ PROFESSIONAL DISCLAIMER - ENHANCED DESIGN ============
  yPos = checkNewPage(yPos, 50)
  if (yPos === 30) addPageHeader()

  // Create sophisticated disclaimer box with shadow effect
  // Shadow layer
  pdf.setFillColor(200, 200, 200)
  pdf.roundedRect(margin + 2, yPos + 2, pageWidth - (margin * 2), 45, 4, 4, 'F')
  
  // Main background with gradient-like effect
  pdf.setFillColor(249, 250, 251) // Very light gray background
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 45, 4, 4, 'F')
  
  // Border with elegant color
  pdf.setDrawColor(249, 250, 251) // Professional border
  pdf.setLineWidth(1.5)
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 45, 4, 4, 'S')

  // Header section with professional styling
  pdf.setFillColor(139, 195, 74) // Professional header
  pdf.roundedRect(margin + 3, yPos + 3, pageWidth - (margin * 2) - 6, 12, 3, 3, 'F')
  
  // Header text
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PRELIMINARY ESTIMATE NOTICE', margin + 8, yPos + 11)

  // Main content area
  pdf.setTextColor(51, 65, 85) // Professional dark gray
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('IMPORTANT NOTICE:', margin + 8, yPos + 22)
  
  pdf.setFontSize(8.5)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(71, 85, 105) // Slightly lighter gray for body text
  const disclaimerText = 'This is a preliminary estimate based on provided specifications. Final pricing requires professional on-site evaluation, measurement verification, and site condition assessment. Our certified team will provide definitive pricing after comprehensive project validation.'
  const disclaimerLines = pdf.splitTextToSize(disclaimerText, pageWidth - (margin * 2) - 16)
  pdf.text(disclaimerLines, margin + 8, yPos + 28)

  // Add small professional note at bottom
  pdf.setTextColor(100, 116, 139)
  pdf.setFontSize(7)
  pdf.setFont('helvetica', 'italic')
  pdf.text('Professional validation ensures accurate pricing and project specifications.', margin + 8, yPos + 40)

  yPos += 55

  // ============ CLIENT INFORMATION ============
  yPos = checkNewPage(yPos, 60)
  if (yPos === 30) addPageHeader()

  pdf.setFillColor(colors.light[0], colors.light[1], colors.light[2])
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 50, 3, 3, 'F')
  pdf.setDrawColor(colors.accent[0], colors.accent[1], colors.accent[2])
  pdf.setLineWidth(0.5)
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 50, 3, 3, 'S')

  pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.roundedRect(margin + 5, yPos + 5, 50, 8, 2, 2, 'F')
  pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2])
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CLIENT INFORMATION', margin + 8, yPos + 10.5)

  pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  
  pdf.text('Client:', margin + 8, yPos + 22)
  pdf.setFont('helvetica', 'normal')
  pdf.text(contactInfo.name || 'Not provided', margin + 8, yPos + 28)
  
  pdf.setFont('helvetica', 'bold')
  pdf.text('Phone:', margin + 8, yPos + 36)
  pdf.setFont('helvetica', 'normal')
  pdf.text(contactInfo.phone || 'Not provided', margin + 8, yPos + 42)

  pdf.setFont('helvetica', 'bold')
  pdf.text('Email:', pageWidth/2 + 5, yPos + 22)
  pdf.setFont('helvetica', 'normal')
  pdf.text(contactInfo.email || 'Not provided', pageWidth/2 + 5, yPos + 28)
  
  pdf.setFont('helvetica', 'bold')
  pdf.text('Project Address:', pageWidth/2 + 5, yPos + 36)
  pdf.setFont('helvetica', 'normal')
  const addressLines = pdf.splitTextToSize(contactInfo.address || 'Not provided', 70)
  pdf.text(addressLines, pageWidth/2 + 5, yPos + 42)

  yPos += 65

  // ============ BUILD SPECS ARRAY ============
  const squareFeet = (dimensions.length * dimensions.width).toFixed(1)

  // Build specs array based on selected items
  const allSpecs = [
    {
      key: 'dimensions',
      icon: 'SIZE',
      title: 'Bathroom Size',
      value: `${dimensions.length}' × ${dimensions.width}'`,
      subtitle: `${squareFeet} sq ft • ${dimensions.bathroomType.charAt(0).toUpperCase() + dimensions.bathroomType.slice(1)} Bath`,
      image: null
    },
    {
      key: 'fixtures',
      icon: 'TOILET',
      title: 'Toilet',
      value: fixtures.toilet.charAt(0).toUpperCase() + fixtures.toilet.slice(1),
      subtitle: 'Selected Fixture',
      image: fixtures.toiletImage || null
    },
    {
      key: 'fixtures',
      icon: 'SHOWER',
      title: 'Shower',
      value: fixtures.shower.charAt(0).toUpperCase() + fixtures.shower.slice(1),
      subtitle: 'Selected Shower',
      image: fixtures.showerImage || null
    },
    {
      key: 'fixtures',
      icon: 'VANITY',
      title: 'Vanity',
      value: fixtures.vanity.charAt(0).toUpperCase() + fixtures.vanity.slice(1),
      subtitle: 'Selected Vanity',
      image: fixtures.vanityImage || null
    },
    {
      key: 'flooring',
      icon: 'FLOOR',
      title: 'Flooring',
      value: flooring.material.charAt(0).toUpperCase() + flooring.material.slice(1),
      subtitle: flooring.heatedFloor ? 'With Heated Floor' : 'Standard Installation',
      image: flooring.materialImage || null
    },
    {
      key: 'walls',
      icon: 'WALLS',
      title: 'Wall Finish',
      value: walls.tile.charAt(0).toUpperCase() + walls.tile.slice(1),
      subtitle: `${walls.tilePattern.charAt(0).toUpperCase() + walls.tilePattern.slice(1)} Pattern`,
      image: walls.tileImage || null
    },
    {
      key: 'lighting',
      icon: 'LIGHTING',
      title: 'Lighting',
      value: lighting.vanityLights.charAt(0).toUpperCase() + lighting.vanityLights.slice(1),
      subtitle: 'Vanity Lights',
      image: lighting.vanityLightsImage || null
    }
  ]

  // Filter specs based on selectedItems
  const specs = selectedItems 
    ? allSpecs.filter(spec => selectedItems[spec.key as keyof typeof selectedItems])
    : allSpecs

  // ============ PROJECT SPECIFICATIONS ============
  // Only show this section if there are specs to display
  if (specs.length > 0) {
    // Calculate height needed based on number of specs
    const specsRows = Math.ceil(specs.length / 2)
    const specsHeight = specsRows * 50 + 30
    
    yPos = checkNewPage(yPos, specsHeight)
    if (yPos === 30) addPageHeader()

    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
    pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 10, 2, 2, 'F')
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2])
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text('PROJECT SPECIFICATIONS', margin + 8, yPos + 7)

    yPos += 18

  // Grid of specifications - 2 per row
  const specsPerRow = 2
  
  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i]
    const x = margin + (i % specsPerRow) * ((pageWidth - (margin * 2)) / specsPerRow)
    const y = yPos + Math.floor(i / specsPerRow) * 50
    const cardWidth = (pageWidth - (margin * 2)) / specsPerRow - 5

    // Card background
    pdf.setFillColor(colors.white[0], colors.white[1], colors.white[2])
    pdf.roundedRect(x, y, cardWidth, 45, 3, 3, 'F')
    pdf.setDrawColor(colors.accent[0], colors.accent[1], colors.accent[2])
    pdf.setLineWidth(0.3)
    pdf.roundedRect(x, y, cardWidth, 45, 3, 3, 'S')

    // Image or Icon placeholder
    if (spec.image) {
      // Try to load and display the actual image selected by user
      await addImageWithFallback(pdf, spec.image, logoBase64, x + 5, y + 5, 30, 35)
    } else {
      // Fallback to icon placeholder if no image
      pdf.setFillColor(colors.lightGreen[0], colors.lightGreen[1], colors.lightGreen[2])
      pdf.roundedRect(x + 5, y + 5, 30, 20, 2, 2, 'F')
      pdf.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2])
      pdf.setLineWidth(0.5)
      pdf.roundedRect(x + 5, y + 5, 30, 20, 2, 2, 'S')
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2])
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'bold')
      pdf.text(spec.icon, x + 20, y + 17, { align: 'center' })
    }

    // Text content
    pdf.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2])
    pdf.setFontSize(7)
    pdf.setFont('helvetica', 'bold')
    pdf.text(spec.title.toUpperCase(), x + 40, y + 10)

    pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    const valueLines = pdf.splitTextToSize(spec.value, cardWidth - 45)
    pdf.text(valueLines, x + 40, y + 16)

    if (spec.subtitle) {
      pdf.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2])
      pdf.setFontSize(6)
      pdf.setFont('helvetica', 'normal')
      const subtitleLines = pdf.splitTextToSize(spec.subtitle, cardWidth - 45)
      pdf.text(subtitleLines, x + 40, y + 25)
    }
  }

  yPos += (Math.ceil(specs.length / 2) * 50) + 10
  } // Close if (specs.length > 0)

  // ============ INVESTMENT BREAKDOWN ============
  const breakdownItems = [
    { 
      item: 'Fixtures & Materials', 
      description: `${fixtures.toilet.charAt(0).toUpperCase() + fixtures.toilet.slice(1)} quality fixtures and materials`, 
      amount: estimate.breakdown.fixtures + estimate.breakdown.materials
    },
    { 
      item: 'Professional Installation', 
      description: 'Expert installation by certified contractors', 
      amount: estimate.breakdown.labor
    },
    { 
      item: 'Permits & Documentation', 
      description: 'Required permits and city approvals', 
      amount: estimate.breakdown.permits
    },
    { 
      item: 'Contingency Buffer (15%)', 
      description: 'Reserve for unexpected conditions', 
      amount: estimate.breakdown.contingency
    },
  ]

  const rowHeight = 12
  const tableHeight = breakdownItems.length * rowHeight + 35

  yPos = checkNewPage(yPos, tableHeight)
  if (yPos === 30) addPageHeader()

  pdf.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2])
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 10, 2, 2, 'F')
  pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2])
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('INVESTMENT BREAKDOWN', margin + 8, yPos + 7)

  yPos += 18
  const tableStartY = yPos

  // Table background
  pdf.setFillColor(colors.white[0], colors.white[1], colors.white[2])
  pdf.roundedRect(margin, tableStartY, pageWidth - (margin * 2), breakdownItems.length * rowHeight + 20, 3, 3, 'F')
  pdf.setDrawColor(colors.accent[0], colors.accent[1], colors.accent[2])
  pdf.setLineWidth(0.3)
  pdf.roundedRect(margin, tableStartY, pageWidth - (margin * 2), breakdownItems.length * rowHeight + 20, 3, 3, 'S')

  // Headers
  pdf.setFillColor(colors.lightGreen[0], colors.lightGreen[1], colors.lightGreen[2])
  pdf.rect(margin + 1, tableStartY + 1, pageWidth - (margin * 2) - 2, 8, 'F')
  
  pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('DESCRIPTION', margin + 5, tableStartY + 6)
  pdf.text('AMOUNT', pageWidth - margin - 5, tableStartY + 6, { align: 'right' })

  yPos = tableStartY + 12

  // Breakdown rows
  breakdownItems.forEach((item, index) => {
    if (index % 2 === 0) {
      pdf.setFillColor(252, 252, 252)
      pdf.rect(margin + 1, yPos - 1, pageWidth - (margin * 2) - 2, rowHeight, 'F')
    }

    pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(item.item, margin + 5, yPos + 3)

    pdf.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2])
    pdf.setFontSize(7)
    pdf.setFont('helvetica', 'normal')
    const descLines = pdf.splitTextToSize(item.description, 120)
    pdf.text(descLines, margin + 5, yPos + 7)

    pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(formatPrice(item.amount), pageWidth - margin - 5, yPos + 5, { align: 'right' })

    yPos += rowHeight
  })

  // Final total
  yPos += 5
  pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.roundedRect(margin + 1, yPos, pageWidth - (margin * 2) - 2, 15, 3, 3, 'F')

  pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2])
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('TOTAL INVESTMENT', margin + 8, yPos + 10)
  
  pdf.setFontSize(16)
  pdf.text(formatPrice(estimate.total), pageWidth - margin - 8, yPos + 10, { align: 'right' })

  yPos += 20
  
  // Tax message
  pdf.setFillColor(248, 249, 250)
  pdf.roundedRect(margin + 10, yPos, pageWidth - (margin * 2) - 20, 12, 2, 2, 'F')
  pdf.setTextColor(108, 117, 125)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'italic')
  pdf.text('* This estimate is subject to applicable taxes', margin + 15, yPos + 8)

  yPos += 20

  // ============ TERMS & CONDITIONS PAGE ============
  pdf.addPage()
  addPageHeader()

  yPos = 45

  pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('TERMS & CONDITIONS', margin, yPos)

  yPos += 15

  const terms = [
    'ESTIMATE VALIDITY: Valid for 10 business days from issue date. Extension requires 10% deposit to maintain pricing and secure project scheduling.',
    'PAYMENT STRUCTURE: 30% deposit, 40% at milestone, 30% upon completion.',
    'PROFESSIONAL STANDARDS: Licensed, bonded, insured contractors meeting industry standards.',
    'WARRANTY COVERAGE: Materials (5-15 years) and workmanship guarantee (2 years).',
    'PROJECT TIMELINE: 4-6 weeks from contract signing, subject to availability.',
    'QUALITY ASSURANCE: Final inspection required. Client satisfaction guaranteed.',
    'MODIFICATION POLICY: Changes require written approval and may affect pricing.',
    'REGULATORY COMPLIANCE: All permits and inspections included in quote.'
  ]

  pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  pdf.setFontSize(7)
  pdf.setFont('helvetica', 'normal')

  terms.forEach((term, index) => {
    const termLines = pdf.splitTextToSize(term, pageWidth - (margin * 2))
    const termHeight = termLines.length * 3 + 6
    
    yPos = checkNewPage(yPos, termHeight)
    if (yPos === 30) {
      addPageHeader()
      yPos = 45
    }
    
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${index + 1}.`, margin, yPos)
    
    pdf.setFont('helvetica', 'normal')
    pdf.text(termLines, margin + 8, yPos)
    
    yPos += termLines.length * 3 + 2
  })

  // ============ ENHANCED ESTIMATE DISCLAIMER ============
  yPos += 10
  
  // Shadow effect
  pdf.setFillColor(190, 190, 190)
  pdf.roundedRect(margin + 1.5, yPos + 1.5, pageWidth - (margin * 2), 32, 4, 4, 'F')
  
  // Main disclaimer box
  pdf.setFillColor(248, 250, 252)
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 32, 4, 4, 'F')
  
  pdf.setDrawColor(139, 195, 74)
  pdf.setLineWidth(1.5)
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 32, 4, 4, 'S')

  // Header section
  pdf.setFillColor(139, 195, 74)
  pdf.roundedRect(margin + 3, yPos + 3, pageWidth - (margin * 2) - 6, 9, 3, 3, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('ESTIMATE DISCLAIMER', margin + 8, yPos + 9)

  // Main disclaimer content
  pdf.setTextColor(51, 65, 85)
  pdf.setFontSize(7)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(71, 85, 105)
  const disclaimerMainText = 'This estimate is preliminary and subject to final validation. Prices may vary after site inspection and assessment. Final pricing determined after comprehensive project evaluation.'
  const disclaimerMainLines = pdf.splitTextToSize(disclaimerMainText, pageWidth - (margin * 2) - 16)
  pdf.text(disclaimerMainLines, margin + 8, yPos + 16)

  pdf.setTextColor(100, 116, 139)
  pdf.setFontSize(6)
  pdf.setFont('helvetica', 'italic')
  pdf.text('Contact our team for consultation and project assessment.', margin + 8, yPos + 26)

  yPos += 40

  // ============ PROFESSIONAL CONTACT INFORMATION ============
  yPos = checkNewPage(yPos, 70)
  if (yPos === 30) {
    addPageHeader()
    yPos = 45
  }

  pdf.setFillColor(colors.white[0], colors.white[1], colors.white[2])
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 60, 3, 3, 'F')
  pdf.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.setLineWidth(1)
  pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 60, 3, 3, 'S')

  pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.roundedRect(margin + 1, yPos + 1, pageWidth - (margin * 2) - 2, 12, 2, 2, 'F')

  pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2])
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PAINT POWER PROFESSIONAL SERVICES', margin + 8, yPos + 8)

  pdf.setDrawColor(colors.lightGreen[0], colors.lightGreen[1], colors.lightGreen[2])
  pdf.setLineWidth(0.5)
  pdf.line(margin + 8, yPos + 18, pageWidth - margin - 8, yPos + 18)

  // Contact information - Left column
  pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CONTACT INFORMATION', margin + 8, yPos + 26)

  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Phone: +1 800 351 4820', margin + 8, yPos + 34)
  pdf.text('Secondary: +1 716 440 8357', margin + 8, yPos + 40)
  pdf.text('Email: info@paintpower.net', margin + 8, yPos + 46)
  pdf.text('Website: www.paintpower.net', margin + 8, yPos + 52)

  // Business info - Right column
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('BUSINESS INFORMATION', pageWidth/2, yPos + 26)

  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Address: 2 Woodland Way N', pageWidth/2, yPos + 34)
  pdf.text('Ellenville, NY 12428, New York, USA', pageWidth/2, yPos + 40)
  pdf.text('Business Hours: Mon-Fri: 9AM-5PM', pageWidth/2, yPos + 46)
  pdf.text('Licensed Professional Contractors', pageWidth/2, yPos + 52)

  // Professional footer
  const finalY = pageHeight - 25
  pdf.setFillColor(colors.light[0], colors.light[1], colors.light[2])
  pdf.rect(0, finalY, pageWidth, 25, 'F')

  pdf.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.setLineWidth(1)
  pdf.line(0, finalY, pageWidth, finalY)

  pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2])
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Thank you for choosing Paint Power for your bathroom renovation project.', 
    pageWidth / 2, finalY + 8, { align: 'center' })

  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Paint Power | www.paintpower.net | +1 800 351 4820 | 2 Woodland Way N, Ellenville, NY 12428', 
    pageWidth / 2, finalY + 16, { align: 'center' })

  pdf.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2])
  pdf.setFontSize(7)
  pdf.text('This estimate is valid for 10 business days. Extension requires 10% deposit to secure pricing.', 
    pageWidth / 2, finalY + 21, { align: 'center' })

  pdf.save(`PaintPower_Bathroom_Estimate_${quoteNumber}.pdf`)
}
