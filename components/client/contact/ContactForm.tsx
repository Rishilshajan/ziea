"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [inquiryType, setInquiryType] = useState<'personal' | 'corporate'>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    // Simulate network request
    setTimeout(() => {
      setFormState('sent');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState('idle');
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section className="md:col-span-7 bg-white p-8 rounded-2xl shadow-[0px_2px_16px_rgba(44,56,41,0.06)] border border-primary/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h3 className="cormorant text-3xl text-primary">Send a Message</h3>
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => setInquiryType('personal')}
            className={`px-5 py-2 rounded-full font-label-md text-xs uppercase tracking-widest transition-all ${inquiryType === 'personal' ? 'bg-primary text-white' : 'bg-[#F5F0E8] text-on-surface-variant hover:bg-[#e8e2d8]'}`}
          >
            Personal
          </button>
          <button 
            type="button" 
            onClick={() => setInquiryType('corporate')}
            className={`px-5 py-2 rounded-full font-label-md text-xs uppercase tracking-widest transition-all ${inquiryType === 'corporate' ? 'bg-primary text-white' : 'bg-[#F5F0E8] text-on-surface-variant hover:bg-[#e8e2d8]'}`}
          >
            Corporate
          </button>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest" htmlFor="name">Full Name</label>
            <input 
              className="w-full h-12 px-4 rounded-xl border border-primary/20 bg-[#F5F0E8] focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-jost" 
              id="name" 
              placeholder="Aisha Nair" 
              required 
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest" htmlFor="email">Email Address</label>
            <input 
              className="w-full h-12 px-4 rounded-xl border border-primary/20 bg-[#F5F0E8] focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-jost" 
              id="email" 
              placeholder="aisha@example.com" 
              required 
              type="email"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest" htmlFor="phone">Phone Number</label>
            <input 
              className="w-full h-12 px-4 rounded-xl border border-primary/20 bg-[#F5F0E8] focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-jost" 
              id="phone" 
              placeholder="+91 98765 43210" 
              required 
              type="tel"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest" htmlFor="message">Message</label>
          <textarea 
            className="w-full p-4 rounded-xl border border-primary/20 bg-[#F5F0E8] focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none font-jost" 
            id="message" 
            placeholder={inquiryType === 'corporate' ? "Tell us about your corporate inquiry..." : "How can we help you today?"} 
            required 
            rows={5}
          ></textarea>
        </div>
        <button 
          className={`w-full md:w-auto px-10 py-3 rounded-full text-white font-label-md text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${formState === 'sent' ? 'bg-[#647b53]' : 'bg-primary hover:bg-[#3d4f31]'} ${formState === 'sending' ? 'opacity-80 cursor-wait' : ''}`} 
          type="submit"
          disabled={formState !== 'idle'}
        >
          {formState === 'idle' && (
            <>
              Send Message
              <span className="material-symbols-outlined text-sm">send</span>
            </>
          )}
          {formState === 'sending' && (
            <>
              <span className="material-symbols-outlined animate-spin text-sm">sync</span> Sending...
            </>
          )}
          {formState === 'sent' && (
            <>
              <span className="material-symbols-outlined text-sm">check_circle</span> Sent
            </>
          )}
        </button>
      </form>
    </section>
  );
}
