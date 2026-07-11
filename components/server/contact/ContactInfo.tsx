import React from 'react';
import { MdOutlineLocationOn, MdOutlineContactSupport, MdOutlineMail, MdOutlineCall } from "react-icons/md";

export default function ContactInfo() {
  return (
    <div className="md:col-span-5 flex flex-col gap-6">
      {/* Visit Our Studio */}
      <div className="bg-[#F5F0E8] p-8 rounded-2xl flex-1 flex flex-col justify-between shadow-[0px_2px_16px_rgba(44,56,41,0.06)] border border-primary/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <MdOutlineLocationOn />
          </div>
          <h3 className="cormorant text-2xl text-primary mb-3">Visit Our Studio</h3>
          <p className="font-jost text-on-surface-variant leading-relaxed text-sm">
            No. 4/326, Princess Street,<br/>
            Near St. Francis Church,<br/>
            Fort Kochi, Kerala 682001
          </p>
        </div>
        <div className="mt-8 rounded-xl overflow-hidden h-40">
          <img 
            className="w-full h-full object-cover" 
            alt="Minimalist design studio in Fort Kochi" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVb1GQbYhQgMHk48AU-CTaQmEmAEJ8TEI6wmvD4mJCNYBWMJ5tCr-PNJjTea--THl--mNjwp9Kv6bkka75ori2sxhvXdu3yyPMcmA-gzpJMwuyxSr71fwwOOj-toA_Mph87L67PQItCTSUBlStgvpS6TK79gkF99yJnpMltGxvpJ1nq0dUbun6UNUDbFnD64tdBIGodcD7VE5YjnF6L_HFB82-wUSECdoU4WavjR1uvGs-EIVDyyd1DwRNQxptE1AQCoA-Brm3eO8"
          />
        </div>
      </div>

      {/* Reach Out */}
      <div className="bg-[#f0e3d5] p-8 rounded-2xl shadow-[0px_2px_16px_rgba(44,56,41,0.06)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-[#865139]/10 flex items-center justify-center mb-4 text-[#865139]">
          <MdOutlineContactSupport />
        </div>
        <h3 className="cormorant text-2xl text-primary mb-3">Reach Out</h3>
        <div className="space-y-4">
          <a className="flex items-center gap-4 text-[#211a15] hover:text-primary transition-colors group" href="mailto:hello@ziea.com">
            <MdOutlineMail className="text-on-surface-variant group-hover:text-primary" />
            <span className="font-jost">hello@ziea.com</span>
          </a>
          <a className="flex items-center gap-4 text-[#211a15] hover:text-primary transition-colors group" href="tel:+91484221144">
            <MdOutlineCall className="text-on-surface-variant group-hover:text-primary" />
            <span className="font-jost">+91 484 221 144</span>
          </a>
        </div>
      </div>
    </div>
  );
}
