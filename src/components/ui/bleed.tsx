// Zalgo combining character ranges
const COMBINING_ABOVE = [
  '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
  '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
  '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315',
]

const COMBINING_BELOW = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D',
  '\u031E', '\u031F', '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325',
  '\u0326', '\u0327', '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D',
]

const COMBINING_MIDDLE = [
  '\u0334', '\u0335', '\u0336', '\u0337', '\u0338',
]

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function zalgoify(text: string, intensity: 1 | 2 | 3 | 4): string {
  // Use text content as seed for deterministic output (SSR-safe)
  const seed = text.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0)
  const random = seededRandom(seed)

  return text.split('').map((char) => {
    if (char === ' ' || char === '\n') return char

    // Probability of corrupting this character scales with intensity
    const corruptChance = intensity * 0.25
    if (random() > corruptChance) return char

    let result = char
    const aboveCount = Math.floor(random() * intensity * 2)
    const belowCount = Math.floor(random() * intensity * 1.5)
    const middleCount = intensity >= 3 ? Math.floor(random() * 2) : 0

    for (let i = 0; i < aboveCount; i++) {
      result += COMBINING_ABOVE[Math.floor(random() * COMBINING_ABOVE.length)]
    }
    for (let i = 0; i < belowCount; i++) {
      result += COMBINING_BELOW[Math.floor(random() * COMBINING_BELOW.length)]
    }
    for (let i = 0; i < middleCount; i++) {
      result += COMBINING_MIDDLE[Math.floor(random() * COMBINING_MIDDLE.length)]
    }

    return result
  }).join('')
}

interface BleedProps {
  text: string
  intensity?: 1 | 2 | 3 | 4
  as?: 'span' | 'p' | 'div'
  className?: string
}

export function Bleed({ text, intensity = 1, as: Tag = 'span', className }: BleedProps) {
  return <Tag className={className}>{zalgoify(text, intensity)}</Tag>
}
