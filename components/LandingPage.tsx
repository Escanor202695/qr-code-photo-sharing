import React, { useState } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do my guests need to download an app?",
      a: "No! That's the beauty of Moments. Guests simply scan the QR code with their phone camera and they're instantly ready to upload. No app downloads, no sign-ups required."
    },
    {
      q: "Is there a limit on how many photos guests can upload?",
      a: "In demo mode, storage is based on browser capacity. In production, you can set custom limits per event - from 50 to unlimited photos and videos."
    },
    {
      q: "How do I share the QR code with my guests?",
      a: "We provide a high-resolution QR code you can download. Print it on table cards, display it on screens, include it in invitations, or share the link directly via text/email."
    },
    {
      q: "Can I download all photos at once?",
      a: "Yes! The admin dashboard includes a 'Download All' feature that packages all photos into a convenient zip file."
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. All uploads require consent, and only you (the host) have access to the admin dashboard. Data can be deleted at any time."
    }
  ];

  const testimonials = [
    {
      name: "Jessica M.",
      role: "Bride",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      text: "We got over 500 photos from our wedding guests! So many angles and moments we would have missed. Absolutely love it!",
      rating: 5
    },
    {
      name: "David K.",
      role: "Event Planner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      text: "I use Moments for all my corporate events now. Clients love the professional QR codes and the instant photo sharing.",
      rating: 5
    },
    {
      name: "Sarah L.",
      role: "Party Host",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      text: "Set it up in 2 minutes for my daughter's birthday. Even grandma figured out how to upload photos!",
      rating: 5
    }
  ];

  const useCases = [
    { icon: "fa-ring", title: "Weddings", desc: "Capture every moment from every guest's perspective" },
    { icon: "fa-cake-candles", title: "Birthdays", desc: "Collect memories from the party without the hassle" },
    { icon: "fa-building", title: "Corporate Events", desc: "Professional photo collection for conferences & team events" },
    { icon: "fa-champagne-glasses", title: "Parties", desc: "Let your guests share the fun in real-time" },
    { icon: "fa-graduation-cap", title: "Graduations", desc: "Gather photos from proud family and friends" },
    { icon: "fa-baby", title: "Baby Showers", desc: "Everyone can contribute to the memory book" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
            M
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Moments</span>
        </div>
        <div className="flex gap-4 items-center">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-fuchsia-600 hidden md:block">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-fuchsia-600 hidden md:block">How It Works</a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-fuchsia-600 hidden md:block">Pricing</a>
          <button onClick={onGetStarted} className="text-sm font-semibold text-slate-600 hover:text-fuchsia-600">Login</button>
          <button 
            onClick={onGetStarted}
            className="px-5 py-2.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-16 pb-32 overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-fuchsia-700 bg-fuchsia-50 rounded-full border border-fuchsia-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
              </span>
              Now with AI-Powered Photo Curation
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Collect Event Photos
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500">
                With One QR Scan
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              The simplest way to gather photos and videos from all your guests. 
              No app downloads. No sign-ups. Just scan, snap, and share instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/40 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <i className="fa-solid fa-rocket"></i>
                Create Your Event — Free
              </button>
              <a 
                href="#demo"
                className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-full text-lg font-bold hover:border-fuchsia-300 hover:text-fuchsia-600 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-play"></i>
                Watch Demo
              </a>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900">50K+</div>
                <div className="text-slate-500 text-sm">Events Created</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900">2M+</div>
                <div className="text-slate-500 text-sm">Photos Shared</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900">4.9★</div>
                <div className="text-slate-500 text-sm">User Rating</div>
              </div>
            </div>
          </div>
          
          {/* Floating phone mockup */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-80 opacity-90">
            <div className="relative">
              <div className="w-64 h-[500px] bg-slate-900 rounded-[3rem] p-2 shadow-2xl transform rotate-6 translate-x-20">
                <div className="w-full h-full bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="w-32 h-32 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <i className="fa-solid fa-qrcode text-5xl text-slate-900"></i>
                    </div>
                    <p className="text-sm opacity-90">Scan to upload photos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </section>

        {/* Logo Cloud */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6">
            <p className="text-center text-slate-400 text-sm mb-8 uppercase tracking-wider font-medium">Trusted for events at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
              <div className="text-2xl font-bold text-slate-400">Google</div>
              <div className="text-2xl font-bold text-slate-400">Marriott</div>
              <div className="text-2xl font-bold text-slate-400">TED</div>
              <div className="text-2xl font-bold text-slate-400">Spotify</div>
              <div className="text-2xl font-bold text-slate-400">Airbnb</div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-600 max-w-xl mx-auto">Get started in minutes. No technical skills required.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg shadow-purple-500/30">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Create Your Event</h3>
                  <p className="text-slate-600">Enter your event details and get a unique QR code instantly. Takes less than 60 seconds.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-fuchsia-300 text-3xl">→</div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg shadow-purple-500/30">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Share the QR Code</h3>
                  <p className="text-slate-600">Print it on table cards, display on screens, or share the link digitally. It's that easy!</p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-fuchsia-300 text-3xl">→</div>
              </div>
              
              <div>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg shadow-purple-500/30">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Collect Memories</h3>
                  <p className="text-slate-600">Guests scan, consent, and upload. Watch your gallery fill with amazing moments!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything You Need</h2>
              <p className="text-slate-600 max-w-xl mx-auto">Powerful features that make collecting event photos a breeze.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-fuchsia-200 transition-all">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-qrcode"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Instant QR Codes</h3>
                <p className="text-slate-600">Get a beautiful, branded QR code for your event. Download in high-res for printing.</p>
              </div>
              
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-fuchsia-200 transition-all">
                <div className="w-14 h-14 bg-fuchsia-50 text-fuchsia-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Photo Curation</h3>
                <p className="text-slate-600">Our AI automatically captions and categorizes your photos for easy browsing.</p>
              </div>
              
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-fuchsia-200 transition-all">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">GDPR Compliant</h3>
                <p className="text-slate-600">Built-in consent collection ensures you're compliant with privacy regulations.</p>
              </div>
              
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-fuchsia-200 transition-all">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-download"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Bulk Download</h3>
                <p className="text-slate-600">Download all event photos at once in a neat zip file. One click, done.</p>
              </div>
              
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-fuchsia-200 transition-all">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-images"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Slideshow Mode</h3>
                <p className="text-slate-600">Display photos on a big screen during your event with our beautiful slideshow.</p>
              </div>
              
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-fuchsia-200 transition-all">
                <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-mobile-screen"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">No App Required</h3>
                <p className="text-slate-600">Works instantly on any smartphone browser. Zero friction for your guests.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 bg-gradient-to-br from-fuchsia-600 to-purple-700 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For Any Event</h2>
              <p className="text-fuchsia-100 max-w-xl mx-auto">From intimate gatherings to large corporate events.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {useCases.map((item, i) => (
                <div key={i} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-xs text-fuchsia-100 opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Loved by Event Hosts</h2>
              <p className="text-slate-600 max-w-xl mx-auto">See what our users have to say about Moments.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <i key={j} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-sm text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-slate-600 max-w-xl mx-auto">Start free, upgrade when you need more.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Free</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                  <span className="text-slate-500">/event</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> 1 event
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> Up to 50 photos
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> QR code generator
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> Basic gallery
                  </li>
                </ul>
                <button 
                  onClick={onGetStarted}
                  className="w-full py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:border-slate-400 transition-colors"
                >
                  Get Started
                </button>
              </div>
              
              {/* Pro - Popular */}
              <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 p-8 rounded-2xl text-white relative transform md:scale-105 shadow-2xl shadow-purple-500/30">
                <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                  POPULAR
                </div>
                <div className="text-sm font-semibold text-fuchsia-100 uppercase tracking-wider mb-2">Pro</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-fuchsia-100">/event</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-fuchsia-200"></i> Unlimited events
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-fuchsia-200"></i> Up to 500 photos
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-fuchsia-200"></i> AI photo curation
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-fuchsia-200"></i> Slideshow mode
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-fuchsia-200"></i> Custom branding
                  </li>
                </ul>
                <button 
                  onClick={onGetStarted}
                  className="w-full py-3 bg-white text-fuchsia-600 rounded-xl font-bold hover:bg-fuchsia-50 transition-colors"
                >
                  Start Free Trial
                </button>
              </div>
              
              {/* Enterprise */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Enterprise</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900">$99</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> Everything in Pro
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> Unlimited photos
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> White-label solution
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> Priority support
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <i className="fa-solid fa-check text-green-500"></i> API access
                  </li>
                </ul>
                <button 
                  onClick={onGetStarted}
                  className="w-full py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:border-slate-400 transition-colors"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900">{faq.q}</span>
                    <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-slate-600 border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Capture Every Moment?</h2>
            <p className="text-xl text-fuchsia-100 mb-10 max-w-2xl mx-auto">
              Join thousands of event hosts who trust Moments to collect their precious memories.
            </p>
            <button 
              onClick={onGetStarted}
              className="px-10 py-5 bg-white text-fuchsia-600 rounded-full text-lg font-bold hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-3"
            >
              <i className="fa-solid fa-rocket"></i>
              Create Your First Event — It's Free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                  M
                </div>
                <span className="text-xl font-bold text-white">Moments</span>
              </div>
              <p className="text-sm">The simplest way to collect event photos from your guests.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; 2024 Moments. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-fuchsia-600 transition-colors">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-fuchsia-600 transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-fuchsia-600 transition-colors">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
