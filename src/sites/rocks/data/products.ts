export interface Product {
  slug: string
  ticker: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  instrumentDetails: Array<{ label: string; value: string }>
  riskFactors: string[]
  change24h: string
  volume: string
}

export const products: Product[] = [
  {
    slug: "one-rock",
    ticker: "RCK",
    name: "One Rock",
    price: 49,
    priceLabel: "$49.00",
    tagline: "The foundational position.",
    description: [
      "RCK represents the entry-level allocation in our hard-asset portfolio. A single unit of terrestrial bedrock exposure, sourced from proprietary extraction sites and delivered in bulk packaging to minimize settlement overhead.",
      "Suitable for retail accumulators establishing their first position in the rock asset class. Zero counterparty risk. Physically delivered. Custody optional. The simplest possible long exposure to aggregate global lithic supply.",
      "No two units are identical. Each instrument carries the unique geological signature of its extraction site, which our compliance team assures us is a feature rather than a quality control issue.",
    ],
    image: "/sites/rocks/product-one-rock.png",
    instrumentDetails: [
      { label: "WEIGHT", value: "0.5 – 1.5 LB" },
      { label: "DIMENSIONS", value: "VARIES (NON-UNIFORM)" },
      { label: "PROVENANCE", value: "TERRESTRIAL" },
      { label: "COMPOSITION", value: "UNSPECIFIED LITHIC" },
      { label: "STORAGE", value: "AMBIENT. DO NOT DROP ON FOOT." },
      { label: "SETTLEMENT", value: "T+14 (GROUND SHIPPING)" },
    ],
    riskFactors: [
      "Rocks may be heavy.",
      "Rocks are not insured by the FDIC, SIPC, or any private insurer.",
      "Past rock performance does not guarantee future rock performance.",
      "The issuer makes no representations as to the igneous, sedimentary, or metamorphic character of any specific unit.",
      "Rocks are not edible.",
      "In the event of rock loss, the issuer will provide a replacement rock of comparable geological merit.",
    ],
    change24h: "+0.00%",
    volume: "1,247,910",
  },
  {
    slug: "two-rocks",
    ticker: "RCK2",
    name: "Two Rocks",
    price: 199,
    priceLabel: "$199.00",
    tagline: "Diversification through duplication.",
    description: [
      "RCK2 delivers dual-unit bedrock exposure, offering accumulators the opportunity to hedge their position within a single instrument. The inclusion of a second rock materially reduces concentration risk and introduces a layer of intra-portfolio diversification unavailable at the RCK tier.",
      "Our research desk has modeled the covariance structure of two-rock allocations under a range of macro scenarios. In ninety-seven percent of simulations, holding two rocks outperformed holding one rock, a result our chief strategist has characterized as 'expected.'",
      "Units ship together in consolidated packaging to minimize handling costs. Matched-pair curation is not guaranteed.",
    ],
    image: "/sites/rocks/product-two-rocks.png",
    instrumentDetails: [
      { label: "WEIGHT", value: "1.0 – 3.5 LB (COMBINED)" },
      { label: "DIMENSIONS", value: "VARIES (TWO DISCRETE UNITS)" },
      { label: "PROVENANCE", value: "TERRESTRIAL" },
      { label: "COMPOSITION", value: "UNSPECIFIED LITHIC × 2" },
      { label: "STORAGE", value: "AMBIENT. KEEP APART TO REDUCE FRICTION." },
      { label: "SETTLEMENT", value: "T+14 (GROUND SHIPPING)" },
    ],
    riskFactors: [
      "Rocks may be heavy. Two rocks are approximately twice as heavy.",
      "Rocks are not insured by the FDIC, SIPC, or any private insurer.",
      "Diversification does not eliminate the risk that both rocks are, in fact, just rocks.",
      "Matched-pair curation is aspirational and not contractual.",
      "Past rock performance does not guarantee future rock performance.",
      "Rocks may collide during transit, producing smaller rocks. These remain the property of the holder.",
    ],
    change24h: "+2.14%",
    volume: "812,447",
  },
  {
    slug: "box-of-rocks",
    ticker: "RCKBX",
    name: "Box of Rocks",
    price: 499,
    priceLabel: "$499.00",
    tagline: "Institutional-grade bedrock exposure.",
    description: [
      "RCKBX is our flagship instrument: a consolidated portfolio of ten to twelve discrete rock units delivered in a single corrugated vessel. Designed for accumulators seeking meaningful exposure to the lithic asset class without the operational overhead of managing multiple individual positions.",
      "Each box is assembled by hand in our Class III bedrock custody facility. The contents are sealed with commercial-grade tape and stamped with a unique serial number that we may or may not record in our internal systems. The packaging is intentionally nondescript to reduce transit risk.",
      "Institutional clients have historically allocated between two and four percent of their alternative-assets sleeve to the RCKBX instrument, though our compliance team has been unable to independently verify this claim.",
    ],
    image: "/sites/rocks/product-box-of-rocks.png",
    instrumentDetails: [
      { label: "WEIGHT", value: "8.0 – 14.0 LB" },
      { label: "UNIT COUNT", value: "10 – 12 ROCKS" },
      { label: "DIMENSIONS", value: "APPROX. 12\" × 10\" × 8\"" },
      { label: "PROVENANCE", value: "TERRESTRIAL" },
      { label: "COMPOSITION", value: "HETEROGENEOUS LITHIC BASKET" },
      { label: "STORAGE", value: "AMBIENT. STRUCTURAL FLOOR RECOMMENDED." },
      { label: "SETTLEMENT", value: "T+21 (FREIGHT COORDINATED)" },
    ],
    riskFactors: [
      "The box is heavy. The rocks inside the box are the reason.",
      "The box is not insured in transit beyond the carrier's standard liability.",
      "Individual rock composition varies and is not itemized.",
      "The seller makes no representations regarding the aesthetic, spiritual, or geological merit of any specific rock within the box.",
      "Dropping the box on any living thing is the sole responsibility of the holder.",
      "The box is non-returnable once opened, once closed, and in most intermediate states.",
    ],
    change24h: "+0.37%",
    volume: "304,216",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
