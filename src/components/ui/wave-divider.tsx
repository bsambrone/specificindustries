interface WaveDividerProps {
  variant?: "wave1" | "wave2" | "wave3"
  flip?: boolean
  fromColor?: string
  toColor?: string
}

const waves = {
  wave1: "M0,32 C320,64 640,0 960,32 C1120,48 1280,64 1440,48 L1440,64 L0,64 Z",
  wave2: "M0,48 C240,16 480,56 720,32 C960,8 1200,48 1440,24 L1440,64 L0,64 Z",
  wave3: "M0,40 C180,60 360,20 540,40 C720,60 900,20 1080,40 C1260,60 1440,20 L1440,64 L0,64 Z",
}

export function WaveDivider({
  variant = "wave1",
  flip = false,
  fromColor,
  toColor,
}: WaveDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: fromColor,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 64"
        className="block w-full h-auto"
        preserveAspectRatio="none"
        style={{ fill: toColor || "var(--color-background)" }}
      >
        <path d={waves[variant]} />
      </svg>
    </div>
  )
}
