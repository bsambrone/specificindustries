import Image from "next/image"

interface ProcessStep {
  number: string
  title: string
  description: string
  image: string
}

interface ProcessFlowProps {
  steps: ProcessStep[]
}

function StepVariantA({ step }: { step: ProcessStep }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-6 items-center">
      <div className="text-6xl md:text-8xl font-heading font-bold text-accent/20 text-center md:text-left">
        {step.number}
      </div>
      <div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={step.image}
          alt={step.title}
          width={1024}
          height={1536}
          className="max-h-[400px] w-auto h-auto rounded-lg"
        />
      </div>
    </div>
  )
}

function StepVariantB({ step }: { step: ProcessStep }) {
  return (
    <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden rounded-lg">
      <Image src={step.image} alt={step.title} fill className="object-cover brightness-[0.3]" />
      <div className="relative z-10 text-center p-8 max-w-2xl">
        <div className="text-5xl font-heading font-bold text-accent/50 mb-2">{step.number}</div>
        <h3 className="text-2xl font-heading font-bold text-white mb-3">{step.title}</h3>
        <p className="text-white/80 leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}

function StepVariantC({ step }: { step: ProcessStep }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_100px] gap-6 items-center">
      <div className="flex items-center justify-center">
        <Image
          src={step.image}
          alt={step.title}
          width={1024}
          height={1536}
          className="max-h-[400px] w-auto h-auto rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
      </div>
      <div className="text-6xl md:text-8xl font-heading font-bold text-accent/20 text-center md:text-right">
        {step.number}
      </div>
    </div>
  )
}

function StepVariantD({ step }: { step: ProcessStep }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-center">
      <div className="flex items-center justify-center">
        <Image
          src={step.image}
          alt={step.title}
          width={1024}
          height={1536}
          className="max-h-[400px] w-auto h-auto rounded-lg"
        />
      </div>
      <div>
        <div className="text-5xl font-heading font-bold text-accent/20 mb-2">{step.number}</div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}

const variants = [StepVariantA, StepVariantB, StepVariantC, StepVariantD]

export function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {steps.map((step, i) => {
          const Variant = variants[i % variants.length]
          return (
            <div key={step.number}>
              <Variant step={step} />
              {i < steps.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="w-px h-12 bg-accent/30" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
