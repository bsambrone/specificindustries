import Image from "next/image"
import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"

export default function PigMilkCheckout() {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image src="/sites/pigmilk/checkout-construction.png" alt="Pig in hard hat" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Our Pigs Are Working As Fast As They Can
        </h1>
        <p className="text-foreground/70 mb-8">
          Unfortunately, due to unprecedented demand (someone actually tried to buy pig milk),
          our checkout system is permanently under construction.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated delivery: When pigs fly (estimated Q4 2087)
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to Shopping
        </Link>
      </div>
    </section>
  )
}
