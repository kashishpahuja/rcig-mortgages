'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function GlobalActionButtons() {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: 'Door-to-Door Canvassing'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Donation state
  const [donationAmount, setDonationAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [donorData, setDonorData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [donationLoading, setDonationLoading] = useState(false);
  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [donationError, setDonationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDonorChange = (e) => {
    const { name, value } = e.target;
    setDonorData(prev => ({ ...prev, [name]: value }));
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
      sendto: "manjitbhondhi@gmail.com",
      subject: "New Team Registration - Manjit for Caledon"
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
        setTimeout(() => {
          setSubmitted(false);
          setIsJoinOpen(false);
          setFormData({ name: '', email: '', phone: '', query: 'Door-to-Door Canvassing' });
        }, 4000);
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

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    setDonationLoading(true);
    setDonationError('');

    const finalAmount = donationAmount === 'custom' ? customAmount : donationAmount;

    const payload = {
      formdata: {
        name: donorData.name,
        email: donorData.email,
        phone: donorData.phone,
        address: donorData.address,
        amount: `$${finalAmount}`,
        paymentMethod: "Email Transfer (e-Transfer)"
      },
      sendto: "manjitbhondhi@gmail.com",
      subject: `New Campaign Donation Pledge ($${finalAmount}) - Manjit for Caledon`
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
        setDonationSubmitted(true);
      } else {
        setDonationError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending donation info:", error);
      setDonationError("Failed to submit. Check your connection.");
    } finally {
      setDonationLoading(false);
    }
  };

  return (
    <>
      {/* Sticky Bottom-Right Floating Action Bar */}


<div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
  <div
    className="
      flex items-center gap-1.5 sm:gap-2
      rounded-full
      px-2 py-2
      sm:px-3 sm:py-2.5
      bg-linear-to-t from-[#071b35]/75 via-[#0b2345]/75 to-[#071b35]/65
      backdrop-blur-xl
      backdrop-saturate-150
      border border-white/20
      shadow-[0_8px_35px_rgba(0,0,0,0.4)]
    "
  >
    {/* Donate */}
    <button
      onClick={() => {
        setDonationSubmitted(false);
        setIsDonateOpen(true);
      }}
      className="
        rounded-full
        uppercase
        tracking-widest
        text-white
        font-medium
        px-4 py-2.5
        sm:px-5 sm:py-3
        text-[10px] sm:text-xs md:text-sm
        transition-all duration-300
        hover:bg-white/15
        hover:scale-105
        active:scale-95
        cursor-pointer
        inline-flex items-center justify-center
        whitespace-nowrap
      "
    >
      ❤️ <span className="ml-1">Donate</span>
    </button>

    {/* Join Us */}
    <button
      onClick={() => setIsJoinOpen(true)}
      className="
        rounded-full
        uppercase
        tracking-widest
        text-white
        font-medium
        px-4 py-2.5
        sm:px-5 sm:py-3
        text-[10px] sm:text-xs md:text-sm
        transition-all duration-300
        hover:bg-white/15
        hover:scale-105
        active:scale-95
        cursor-pointer
        inline-flex items-center justify-center
        whitespace-nowrap
      "
    >
      Join Our Team
    </button>

    {/* Latest Updates */}
    <Link
      href="/blog"
      className="
        rounded-full
        uppercase
        tracking-widest
        text-white
        font-medium
        px-4 py-2.5
        sm:px-5 sm:py-3
        text-[10px] sm:text-xs md:text-sm
        transition-all duration-300
        hover:bg-white/15
        hover:scale-105
        active:scale-95
        inline-flex items-center justify-center
        whitespace-nowrap
      "
    >
      Latest Updates
    </Link>
  </div>
</div>
      {/* <div className="fixed bottom-6 right-6 z-50 flex flex-col sm:flex-row items-center gap-3">
  
  <button
    onClick={() => {
      setDonationSubmitted(false);
      setIsDonateOpen(true);
    }}
    className="rounded-full uppercase tracking-widest text-white font-medium px-5 py-3 sm:px-6 sm:py-3.5 text-xs md:text-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg inline-flex items-center justify-center border-0"
    style={{
      background:
        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow:
        '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
      outline: '2px solid white',
      outlineOffset: '-3px',
    }}
  >
    <span>❤️ Donate</span>
  </button>

 
  <button
    onClick={() => setIsJoinOpen(true)}
    className="rounded-full uppercase tracking-widest text-white font-medium px-6 py-3 sm:px-7 sm:py-3.5 text-xs md:text-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg inline-flex items-center justify-center border-0"
    style={{
      background:
        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow:
        '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
      outline: '2px solid white',
      outlineOffset: '-3px',
    }}
  >
    <span>Join Our Team</span>
  </button>
</div> */}

      {/* Join Team Modal */}
      {isJoinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="      bg-linear-to-t from-[#071b35]/65 via-[#0b2345]/65 to-[#071b35]/65
      backdrop-blur-xl
      backdrop-saturate-150
      border border-white/20
      shadow-[0_8px_35px_rgba(0,0,0,0.4)] rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsJoinOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Get Involved</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase mt-1 italic font-serif">Join Manjit's Team</h3>
              <p className="text-gray-300 text-xs md:text-sm mt-1">Help us build a stronger, safer, and better Caledon together.</p>
            </div>

            {submitted ? (
              <div className="bg-emerald-900/50 border border-emerald-500/50 p-6 rounded-xl text-center">
                <h4 className="text-lg font-bold text-emerald-300">Thank You for Joining!</h4>
                <p className="text-sm text-gray-200 mt-2">We have received your registration and our team will get in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="bg-red-900/50 border border-red-500/50 p-3 rounded-lg text-xs text-red-200 text-center">
                    {errorMessage}
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name" 
                    className="w-full bg-[#0b3374] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com" 
                      className="w-full bg-[#0b3374] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(647) 000-0000" 
                      className="w-full bg-[#0b3374] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">How would you like to help?</label>
                  <select 
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    className="w-full bg-[#0b3374] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Door-to-Door Canvassing">Door-to-Door Canvassing</option>
                    <option value="Yardsign Placement">Yardsign Placement</option>
                    <option value="Phone Banking & Outreach">Phone Banking & Outreach</option>
                    <option value="Event Volunteering">Event Volunteering</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#D4AF37] hover:bg-[#c29f2f] text-[#071b35] font-semibold uppercase tracking-wider py-3 rounded-lg transition-colors shadow-md mt-2 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-[#071b35] border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Registration</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Donation Modal with Interactive Email Transfer Form */}
      {isDonateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="      bg-linear-to-t from-[#071b35]/65 via-[#0b2345]/65 to-[#071b35]/65
      backdrop-blur-xl
      backdrop-saturate-150
      border border-white/20
      shadow-[0_8px_35px_rgba(0,0,0,0.4)] rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDonateOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Support the Campaign</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase mt-1 italic font-serif">Contribute Today</h3>
              <p className="text-gray-300 text-xs md:text-sm mt-1">
                Initiate your campaign donation via <span className="text-[#D4AF37] font-semibold">Email Transfer (e-Transfer)</span>.
              </p>
            </div>

            {donationSubmitted ? (
              <div className="bg-emerald-900/50 border border-emerald-500/50 p-6 rounded-xl text-center space-y-3">
                <h4 className="text-lg font-bold text-emerald-300">Donation Details Received!</h4>
                <p className="text-sm text-gray-200">
                  Please complete your e-Transfer to <span className="text-[#D4AF37] font-bold">Manjit4Caledon@gmail.com</span>.
                </p>
                <div className="p-3 bg-[#0b3374] border border-[#D4AF37]/30 rounded-lg text-xs text-left">
                  <p className="text-gray-300 mb-1"><strong>Recipient Email:</strong> Manjit4Caledon@gmail.com</p>
                  <p className="text-gray-300"><strong>Alternative:</strong> Manjit4Caledon@gmail.com</p>
                </div>
                <button
                  onClick={() => setIsDonateOpen(false)}
                  className="w-full bg-[#D4AF37] text-[#071b35] font-bold py-2.5 rounded-lg text-xs uppercase cursor-pointer mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-4">
                {donationError && (
                  <div className="bg-red-900/50 border border-red-500/50 p-3 rounded-lg text-xs text-red-200 text-center">
                    {donationError}
                  </div>
                )}

                {/* Amount Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">Select Contribution Amount</label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {['50', '100', '250', '500'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDonationAmount(amt)}
                        className={`py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                          donationAmount === amt 
                            ? 'bg-[#D4AF37] text-[#071b35] border-[#D4AF37]' 
                            : 'bg-[#0b3374] text-white border-white/20 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => setDonationAmount('custom')}
                      className={`px-4 py-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        donationAmount === 'custom' 
                          ? 'bg-[#D4AF37] text-[#071b35] border-[#D4AF37]' 
                          : 'bg-[#0b3374] text-white border-white/20'
                      }`}
                    >
                      Custom Amount
                    </button>
                    {donationAmount === 'custom' && (
                      <input
                        required
                        type="number"
                        min="1"
                        placeholder="Enter amount ($)"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full bg-[#0b3374] border border-[#D4AF37] rounded-lg px-4 py-2 text-sm text-white focus:outline-none"
                      />
                    )}
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">Full Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={donorData.name}
                        onChange={handleDonorChange}
                        placeholder="Your full name"
                        className="w-full bg-[#0b3374] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">Email Address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={donorData.email}
                        onChange={handleDonorChange}
                        placeholder="name@example.com"
                        className="w-full bg-[#0b3374] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={donorData.phone}
                        onChange={handleDonorChange}
                        placeholder="(647) 000-0000"
                        className="w-full bg-[#0b3374] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">Caledon Address</label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={donorData.address}
                        onChange={handleDonorChange}
                        placeholder="Street address in Caledon"
                        className="w-full bg-[#0b3374] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#0b3374]/80 border border-[#D4AF37]/30 rounded-xl text-xs text-gray-300">
                  <p className="font-semibold text-[#D4AF37] mb-0.5">Payment Instructions:</p>
                  <p>Send e-Transfer directly to: <strong className="text-white select-all">Manjit4Caledon@gmail.com</strong></p>
                </div>

                <button
                  type="submit"
                  disabled={donationLoading}
                  className="w-full bg-[#D4AF37] hover:bg-[#c29f2f] text-[#071b35] font-semibold uppercase tracking-wider py-3 rounded-lg transition-colors shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {donationLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-[#071b35] border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Initiate Email Transfer Request</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}