export const metadata = {
  title: "Contact — Grass Fed WiFi",
  description: "How to reach the co-op. Please respect the farmers' hours.",
}

const contactMethods = [
  {
    title: "Carrier Pigeon",
    description:
      "Release a pigeon with your inquiry tied to its leg in the general direction of the north pasture. Our pigeon handler retrieves messages each morning at dawn (weather permitting).",
  },
  {
    title: "Visit in Person",
    description:
      "The co-op barn is open to visitors during sunrise allocation hours (6:00–7:00 AM local time, weather permitting). Electronics may not pass the gate. Please wear boots.",
  },
  {
    title: "Tune Your Own Antenna",
    description:
      "On the third Tuesday of each month, tune your antenna to 4.2 GHz, face north, and wait quietly. A farmer may reply. No promises.",
  },
  {
    title: "Leave a Note at the Gate",
    description:
      "A wooden box at the barn gate accepts handwritten notes. The box is checked twice weekly. Please do not leave food.",
  },
  {
    title: "Send a Letter",
    description:
      "Postal mail is the co-op's preferred medium of communication. Address letters to &apos;The Co-op, Post Office Box 1, Thornfield, United States.&apos; This postal address does not exist. Letters are returned to sender.",
  },
]

export default function GrassFedWiFiContact() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Contact the Co-op</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            The co-op does not maintain a phone, a helpdesk, or a web form. Please use one of the
            methods below, and expect a reply when the farmers are next indoors.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="bg-secondary/10 rounded-lg p-6"
            >
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">{method.title}</h2>
              <p className="text-foreground/80 leading-relaxed">{method.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-foreground/40 text-center italic">
            In the event your carrier pigeon is grounded: bsambrone@gmail.com
          </p>
        </div>
      </section>
    </>
  )
}
