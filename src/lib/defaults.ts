import type { Category } from "@/store/queue.store";

/** All available wheel sizes for the size selector */
export const DEFAULT_SIZES: string[] = [
  '16"',
  '17"',
  '18"',
  '19"',
  '20"',
  '21"',
  '22"',
  '23"',
  '24"',
  '25"',
  '26"',
];

export interface SectionTemplate {
  title: string;
  text: string;
}

/** Default content for 5 product sections */
export const DEFAULT_SECTIONS: SectionTemplate[] = [
  {
    title: "DESCRIPTION",
    text: `Exclusive Custom Forged Wheels Tailored to Your Vehicle
Any wheel design presented can be custom-made for your car in any size and color configuration. To ensure a 100% perfect fitment before manufacturing begins, we provide precise 3D wheel renderings based on your vehicle's exact dimensions and specifications.
Available Wheel Configurations:
 - Monoblock wheels
 - 2-piece and 3-piece modular wheels
 - Beadlock wheels for drag racing and off-road applications`,
  },
  {
    title: "PREMIUM MATERIALS & ENGINEERING SPECIFICATIONS",
    text: `At DRAXLER, we engineer and manufacture premium custom forged wheels with an uncompromising attention to detail.
Aerospace-Grade 6061-T6 Forged Aluminum: Our forged billet blanks are produced using high-pressure forging (up to 12,000 tons). This refines the grain structure, minimizes porosity, and delivers an exceptional strength-to-weight ratio.
Forged Magnesium Option: For hardcore motorsport applications, wheels can be manufactured from ultra-lightweight forged magnesium to significantly reduce unsprung mass and improve track performance.
Any Size & Fitment (15" to 30"): Fully customizable diameters, widths, offsets (ET), center bores (DIA), bolt patterns (PCD), and centerlock setups. We calculate perfect geometry for both staggered and square setups-ranging from OEM-spec to flush, mild, or aggressive fitments.
Maximum Compatibility: Engineered for seamless integration with OEM brake systems and Big Brake Kits (BBK), with precise caliper clearances calculated for every application. Fully compatible with factory OE TPMS sensors and factory lug hardware.
Strict Quality Control & Global Standards: Our manufacturing processes and testing align with leading JWL and VIA compliance benchmarks. Every wheel undergoes rigorous checks for radial/lateral runout, roundness, balance, and finish consistency.`,
  },
  {
    title: "CUSTOM DESIGNS & PREMIUM FINISHES (OPTIONS)",
    text: `Every finish undergoes a multi-stage surface preparation process, followed by premium clear-coat or tinted-clear applications for maximum depth and long-term corrosion resistance.
Standard Finishes: Brushed, polished, satin or gloss clear, precision-machined or milled accents, dual-tone, and advanced chrome options (including gold, black, and electroplated chrome).
Exclusive Upgrades (Available at extra cost):
 - Wheel widths above 11.5J
 - Carbon fiber barrels and aerodynamic covers (aero-disc)
 - Titanium lug nuts
 - Weight-saving pocket cut-outs and drilled spokes
 - Floating spinning center caps and custom alloy caps with a milled logo
 - Racing-spec knurled bead seats to prevent tire slippage`,
  },
  {
    title: "WARRANTY & CUSTOMER SERVICE",
    text: `LIFETIME Structural Warranty
Guaranteed perfect fitment for your specific vehicle
Excellent wheel balance and absolute roundness guaranteed
Exceptional, personalized after-sales support`,
  },
  {
    title: "SECURE PAYMENT & WORLDWIDE SHIPPING",
    text: `Secured Payment Methods:
PayPal (+4.4% fee) | Visa / Mastercard / American Express (via PayPal)
Bank Wire Transfer (SWIFT)
Cryptocurrency (USDT, BTC, ETH)
Alipay / WeChat
Global Shipping Options:
 - Express Delivery: Fast shipping via DHL, UPS, TNT, or FedEx.
 - AIR Shipping (10–15 days): Customs clearance included. Available for the USA,  - UK, Australia, EU countries, and select Asian destinations.
- SEA Shipping (25–45 days): Customs clearance included. Contact us to verify availability for your country.
 - Delivery is available directly to your local international airport or seaport.`,
  },
];

/**
 * Base title numbers for each category.
 * Hard-coded discs on the main site end at these values.
 * The first auto-generated title for a category = base + 1.
 */
export const CATEGORY_BASE_NUMBERS: Record<Category, number> = {
  luxury: 116,
  "off-road": 314,
  sport: 213,
};
