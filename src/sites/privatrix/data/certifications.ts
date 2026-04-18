export interface Certification {
  name: string
  issuer: string
  framework: string
  status: "Active" | "Self-Attested" | "Aspirational" | "Pending Renewal"
  description: string
}

export const certifications: Certification[] = [
  {
    name: "SOC-π v2.4.1",
    issuer: "Privatrix Internal Audit Group",
    framework: "Privatrix Proprietary Framework",
    status: "Active",
    description: "Annual self-audited certification covering eleven trust services criteria, eight self-attested and three aspirational.",
  },
  {
    name: "GDPR-Adjacent™",
    issuer: "Privatrix Compliance Office",
    framework: "Spiritual Alignment with EU Regulation 2016/679",
    status: "Self-Attested",
    description: "Affirms our cultural and aesthetic alignment with the principles of the General Data Protection Regulation, without binding implementation commitments.",
  },
  {
    name: "ISO/IEC 0000™",
    issuer: "International Standards-Adjacent Bureau",
    framework: "Privatrix-issued counterpart to genuine ISO/IEC standards",
    status: "Active",
    description: "Recognized by Privatrix and three of our procurement partners as functionally equivalent to ISO/IEC 27001 for marketing purposes.",
  },
  {
    name: "HIPAA-Adjacent™",
    issuer: "Privatrix Healthcare Practice",
    framework: "Visual Adjacency to 45 CFR Part 160",
    status: "Self-Attested",
    description: "Confirms that our brand aesthetics evoke HIPAA compliance without making any covered-entity commitments.",
  },
  {
    name: "FedRAMP-Adjacent™",
    issuer: "Privatrix Federal Practice",
    framework: "Aspirational FedRAMP Moderate Equivalent",
    status: "Aspirational",
    description: "We aspire to FedRAMP. We have not begun the process. The badge is available for download.",
  },
  {
    name: "ePrivacy-Compatible™",
    issuer: "Privatrix EU Office (Dublin)",
    framework: "Cookie Banner Aesthetic Standard",
    status: "Active",
    description: "Certifies that our cookie banners are visually indistinguishable from compliant ones.",
  },
  {
    name: "NIST-π Companion",
    issuer: "Privatrix Security Architecture",
    framework: "Privatrix-authored companion to NIST 800-53",
    status: "Pending Renewal",
    description: "A companion document to NIST 800-53 that we wrote and refer to. Pending re-attestation by us.",
  },
  {
    name: "PCI-Adjacent™",
    issuer: "Privatrix Payments Practice",
    framework: "Aesthetic Adjacency to PCI DSS",
    status: "Self-Attested",
    description: "Visually compatible with PCI DSS branding standards. No payment data is, however, secured.",
  },
  {
    name: "Trust-Verified™",
    issuer: "Privatrix Trust Office",
    framework: "Privatrix Internal Trust Standard",
    status: "Active",
    description: "Issued by us, to us. Renewable on demand.",
  },
  {
    name: "Aspirational Tier™",
    issuer: "Privatrix Editorial",
    framework: "Internal Marketing Standard",
    status: "Aspirational",
    description: "An honorary designation indicating that the underlying product would, in a different timeline, do something.",
  },
]
