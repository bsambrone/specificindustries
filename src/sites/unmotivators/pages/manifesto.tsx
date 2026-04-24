export const metadata = {
  title: "The Unmotivators Manifesto — Unmotivators Inc.",
  description: "The worldview of Unmotivators Inc., articulated in four sections, at length.",
}

export default function UnmotivatorsManifesto() {
  return (
    <article className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-4">
            A document, printed on heavy stock
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground mb-3">
            The Unmotivators Manifesto
          </h1>
          <p className="text-foreground/60 italic">
            As ratified, most recently, at the annual values review.
          </p>
        </header>

        <div className="prose-manifesto space-y-12 text-lg leading-relaxed text-foreground/85">
          <section>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-6">
              I. Motivation is a product category.
            </h2>
            <p className="mb-4">
              Motivation was not discovered. It was invented, and then it was sold. The discovery, such as it is, was that people would pay for the feeling of being about to do something — pay for it in dollars, in attention, in time that could have been spent doing the thing itself.
            </p>
            <p className="mb-4">
              The first motivational posters appeared in the 1920s in industrial workplaces. They depicted determined faces, climbing figures, and landscapes that were meant to evoke a commitment to production. They were put up by the companies that employed the workers who were meant to be motivated by them. The workers, on the whole, did not notice.
            </p>
            <p>
              A century later, the category has grown. The posters are glossier. The copy is more specific. The feelings the industry sells are more targeted, more segmented, and more expensive. But the basic transaction is the same. A company pays to make you feel like you are about to do something. Then you continue to do what you were already doing.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-6">
              II. Disappointment is underserved.
            </h2>
            <p className="mb-4">
              Disappointment is a mature market. It is larger, in absolute terms, than the motivation industry, and it has no major brand. The incumbent players — gas station coolers, pharmacy greeting cards, the corner of the gift shop where the ironic mugs are — do not organize their work, do not invest in production values, and do not take their customers seriously.
            </p>
            <p>
              Unmotivators Inc. was founded to serve this market. We print on heavy stock. We frame in real wood. We price our work at a level that reflects what it took to make. We do not apologize for any of this. Our customers know what they are buying, and they know why.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-6">
              III. Honesty is an object.
            </h2>
            <p className="mb-4">
              An object on a wall is not an opinion. It is a statement made every day, by proximity, to anyone who passes it. When that statement is false — when the poster says ACHIEVE and the room in which it hangs contains no achievement, only a deadline and a person trying to meet it — the room becomes a lie.
            </p>
            <p className="mb-4">
              A true object is a corrective. A poster that says MEDIOCRITY, hung in a room in which mediocrity is the accurate word, makes the room coherent. It does not improve the situation. It clarifies it. A clarified situation is not, necessarily, a better situation. But it is one that can be looked at directly.
            </p>
            <p>
              We make objects that can be looked at directly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase tracking-tight text-foreground mb-6">
              IV. What we do not offer.
            </h2>
            <p className="mb-4">
              We do not offer solutions. Our products will not improve your performance review. They will not help you close a deal, meet a quota, or get promoted. They will not prompt a difficult conversation. They will not save your relationship with your manager. They will not, alone, change anything at all.
            </p>
            <p className="mb-4">
              We do not offer irony. Irony is a posture; it requires a wink. Our posters do not wink. Our mugs do not wink. They say what they say, and then they are on your desk, and then they are still on your desk, and that is the arrangement.
            </p>
            <p>
              We do not offer a way out. The offices are what they are. The deadlines are what they are. What we offer is a small set of objects that will accompany you through them. That is the extent of the offer. It is not much, but we stand by it, and we will continue to.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-10 border-t border-foreground/20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/50">
            — The Management
          </p>
        </footer>
      </div>
    </article>
  )
}
