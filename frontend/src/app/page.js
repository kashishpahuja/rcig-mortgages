'use client';
import React, { useState } from 'react';

export default function RCIGComingSoon() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const payload = {
      formdata: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        query: formData.query
      },
      sendto: "Info@rcigmortgages.com",
      subject: "New Inquiry from RCIG Mortgages Coming Soon Page"
    };

    try {
      const response = await fetch("https://sendmail.digitalpaaji.com/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Failed to send message. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans text-white bg-[#071325]">
      {/* Background Image Layer with increased visibility */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/Images/bg.webp')" }}
      />
      
      {/* Lighter linear overlay to ensure background image shows through clearly */}
      <div className="absolute inset-0 bg-linear-to-br from-[#04162ea9] via-[#04162e80] to-[#04162eb9]" />

      {/* Main Container matching the split layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[85vh] py-12">
        
        {/* Left Side: Brand Logo & WE ARE COMING SOON! */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-8">
          {/* RCIG Logo Header */}
          <div className="">
            <img src='/Images/logo.webp' alt='' className='w-[300px] h-auto object-cover mx-auto lg:mx-0'/>
          </div>

          <h1 className="lg:pl-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-wider leading-none uppercase drop-shadow-md">
            We Are <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27]">
              Coming
            </span> <br />
            Soon!
          </h1>
          
          <p className="text-sm tracking-wide text-gray-300 uppercase font-medium lg:pl-6">
            Your Trusted Mortgage & Capital Solutions Partner
          </p>
        </div>

        {/* Vertical Separator Line (Visible on Large Screens) */}
        <div className="hidden lg:block lg:col-span-1 h-80 w-[1px] bg-linear-to-b from-transparent via-[#d4af37]/50 to-transparent mx-auto" />

        {/* Right Side: Contact & Query Form */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5 bg-[#04162e] p-8 sm:p-10 border border-[#d4af37]/30 backdrop-blur-md shadow-2xl">
          <p className="text-sm text-gray-200 leading-relaxed">
            At Royal Capital Investment Group, we believe every financial journey
            deserves a personalized approach. Our goal is to connect individuals and
            businesses with flexible mortgage and capital solutions designed around
            their unique needs.
          </p>

          <p className="text-xs sm:text-sm tracking-wide text-[#d4af37] font-semibold uppercase">
            Get In Touch / Subscribe For Updates
          </p>

          {/* Detailed Contact & Query Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-full">
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-[#d4af37]/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] text-sm rounded-lg bg-transparent"
              />
              <input 
                type="email" 
                name="email"
                placeholder="Info@rcigmortgages.com" 
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-[#d4af37]/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] text-sm rounded-lg bg-transparent"
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number (416 985 3771)" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-[#d4af37]/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] text-sm rounded-lg bg-transparent"
              />
              <textarea 
                name="query"
                placeholder="Your Query / Message" 
                rows="3"
                value={formData.query}
                onChange={handleChange}
                required
                className="w-full border border-[#d4af37]/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] text-sm rounded-lg resize-none bg-transparent"
              />
              
              {errorMessage && (
                <p className="text-red-400 text-xs font-medium">{errorMessage}</p>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-[#d4af37] to-[#aa8225] hover:from-[#c59b27] hover:to-[#8e6b1b] text-black font-bold p-3 text-sm transition-all uppercase tracking-wider rounded-lg shadow-md disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit Query"}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] text-sm rounded-lg text-center font-medium">
              Thank you! Your query has been submitted successfully.
            </div>
          )}

          {/* Contact Details */}
          <div className="pt-1 text-xs sm:text-sm text-gray-300 space-y-1">
            <p><span className="text-[#d4af37] font-semibold">Phone:</span> 416 985 3771 / 647-500-3737</p>
            <p><span className="text-[#d4af37] font-semibold">Email:</span> Info@rcigmortgages.com</p>
          </div>

          {/* Social Icons (Facebook & Instagram Only) */}
          <div className="flex items-center space-x-4 pt-1">
            <a 
              href="https://www.facebook.com/manjitsingh.bhondhi?rdid=l7G1LsKaGUbVFGsN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1MkAqEMgmc%2F#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-lg border border-[#d4af37]/50 flex items-center justify-center hover:bg-[#d4af37]/20 transition-colors text-[#d4af37] font-bold text-sm"
              title="Facebook"
            >
              f
            </a>
            <a 
              href="https://www.instagram.com/royalcapitalinvestmentgroup/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-lg border border-[#d4af37]/50 flex items-center justify-center hover:bg-[#d4af37]/20 transition-colors text-[#d4af37] font-bold text-xs"
              title="Instagram"
            >
              ig
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}