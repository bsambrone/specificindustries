import Image from "next/image"
import { InfomercialBand } from "../components/InfomercialBand"

export const metadata = {
  title: "Contact — Mousetrap Jenga",
  description: "Call now! Operators are standing by!",
}

export default function MousetrapJengaContact() {
  return (
    <>
      <InfomercialBand bgColor="secondary" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <div className="inline-block bg-[#D4281F] text-[#FFF6E8] px-4 py-1 font-bold uppercase text-sm tracking-wider mb-4 border-2 border-[#1A1F4C] shadow-[4px_4px_0_0_#1A1F4C]">
            Operators Are Standing By!
          </div>
          <h1 className="font-heading text-5xl md:text-7xl text-[#D4281F] drop-shadow-[4px_4px_0_#1A1F4C]">CALL NOW!</h1>
          <p className="font-heading text-4xl md:text-6xl text-[#1A1F4C] mt-4 tracking-tight">1-800-JENGA-OW</p>
          <p className="text-[#1A1F4C]/70 mt-4 italic">(Phone number is for display purposes only. Please use the order form below.)</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Phone bank vignette */}
          <div className="relative aspect-square border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] bg-[#F5E8CE]">
            <Image src="/sites/mousetrapjenga/contact-operators.png" alt="Cheerful 1980s phone bank operators" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>

          {/* Fake mail-order form (all inputs disabled, no event handlers) */}
          <div className="bg-[#FFD23F] border-4 border-[#1A1F4C] p-6 shadow-[8px_8px_0_0_#1A1F4C]">
            <h2 className="font-heading text-3xl text-[#D4281F] text-center mb-1">THE MAIL-ORDER FORM</h2>
            <p className="text-xs text-center text-[#1A1F4C]/70 mb-6 italic">Of the Future!</p>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1F4C] mb-1">Name</label>
                <input type="text" className="w-full border-2 border-[#1A1F4C] bg-[#FFF6E8] px-3 py-2 font-mono text-sm" placeholder="Your name here" disabled />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1F4C] mb-1">Mailing Address</label>
                <input type="text" className="w-full border-2 border-[#1A1F4C] bg-[#FFF6E8] px-3 py-2 font-mono text-sm" placeholder="Your street address" disabled />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1F4C] mb-1">Number of Fingers (for fit)</label>
                <input type="text" className="w-full border-2 border-[#1A1F4C] bg-[#FFF6E8] px-3 py-2 font-mono text-sm" placeholder="8-10 recommended" disabled />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1F4C] mb-1">Edition of Choice</label>
                <input type="text" className="w-full border-2 border-[#1A1F4C] bg-[#FFF6E8] px-3 py-2 font-mono text-sm" placeholder="Classic / Rat Trap Pro / Bear Trap / ..." disabled />
              </div>
              <button type="button" disabled className="w-full bg-[#D4281F] text-[#FFF6E8] font-heading text-xl uppercase py-3 border-4 border-[#1A1F4C] shadow-[4px_4px_0_0_#1A1F4C] cursor-not-allowed opacity-80">
                Send Order by Mail!
              </button>
              <p className="text-xs text-center text-[#1A1F4C]/70 italic">
                (Form is decorative. For actual orders, please use the online shop.)
              </p>
            </form>
          </div>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="cream-dark" verticalPadding="md">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl text-[#1A1F4C] mb-3">Mail Us The Old-Fashioned Way!</h2>
          <address className="not-italic font-mono text-[#1A1F4C] mb-8">
            Mousetrap Jenga Inc.<br />
            PO Box 12<br />
            Cedar Rapids, IA 52401
          </address>
          <p className="text-[10px] text-[#1A1F4C]/60 mt-12">
            Press &amp; business inquiries: <a href="mailto:bsambrone@gmail.com" className="underline hover:text-[#D4281F]">bsambrone@gmail.com</a>
          </p>
        </div>
      </InfomercialBand>
    </>
  )
}
