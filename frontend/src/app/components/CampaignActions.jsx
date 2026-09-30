'use client';
import React, { useState } from 'react';

export default function CampaignActions() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (API call or email service)
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#071b35] text-white py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* JOIN OUR TEAM REGISTRATION FORM */}
        <div id="join-team" className="bg-[#092b66]/60 border border-[#D4AF37]/30 p-8 rounded-xl backdrop-blur-sm shadow-xl">
          <div className="h-1 w-12 bg-[#B31313] rounded-full mb-4" />
          <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">Join Our Team</h3>
          <p className="text-[#D7E2EA] text-sm mb-6">
            Be a part of building a stronger Caledon. Volunteer with Saini Manjit Singh Bhondhi's campaign.
          </p>

          {submitted ? (
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37] p-4 rounded text-center text-[#D4AF37] font-medium">
              Thank you for joining! We will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-[#071b35] border border-[#D4AF37]/40 rounded px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="w-full bg-[#071b35] border border-[#D4AF37]/40 rounded px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full bg-[#071b35] border border-[#D4AF37]/40 rounded px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B31313] hover:bg-[#9a1010] text-white font-semibold uppercase tracking-wider rounded transition-colors shadow-md mt-2"
              >
                Register as Volunteer
              </button>
            </form>
          )}
        </div>

        {/* DONATION SECTION */}
        <div id="donate-section" className="bg-[#092b66]/60 border border-[#D4AF37]/30 p-8 rounded-xl backdrop-blur-sm shadow-xl flex flex-col justify-between">
          <div>
            <div className="h-1 w-12 bg-[#D4AF37] rounded-full mb-4" />
            <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">Support the Campaign</h3>
            <p className="text-[#D7E2EA] text-sm mb-6">
              Your contribution helps us reach more residents, spread our message, and invest in a better future for Caledon.
            </p>

            <div className="bg-[#071b35]/80 border border-[#D4AF37]/20 p-6 rounded-lg mb-6">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] block mb-1">How Donations Are Received</span>
              <h4 className="text-lg font-bold text-white mb-2">By Email Transfer (Interac e-Transfer)</h4>
              <p className="text-sm text-[#D7E2EA] mb-4">
                You can securely send your campaign contributions directly via email transfer to:
              </p>
              <div className="bg-[#092b66] p-3 rounded border border-[#D4AF37]/40 text-center font-mono text-[#D4AF37] tracking-wider select-all">
                Manjit4Caledon@gmail.com
              </div>
            </div>
          </div>

          <a
            href="mailto:Manjit4Caledon@gmail.com?subject=Campaign%20Donation%20Inquiry"
            className="block text-center w-full py-3 bg-[#D4AF37] hover:bg-[#c29e30] text-[#071b35] font-semibold uppercase tracking-wider rounded transition-colors shadow-md"
          >
            Send Donation Inquiry
          </a>
        </div>

      </div>
    </div>
  );
}