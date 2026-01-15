import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Moments</span>
        </div>
        <div className="flex gap-4">
          <button onClick={onGetStarted} className="text-sm font-semibold text-slate-600 hover:text-brand-600">Login</button>
          <button 
            onClick={onGetStarted}
            className="px-4 py-2 bg-brand-600 text-white rounded-full text-sm font-semibold hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/30"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-brand-900 uppercase bg-brand-100 rounded-full">
              New: AI-Powered Memories
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
              Capture Every Angle <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">
                Without The App
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              The easiest way to collect photos & videos from your guests. 
              Just scan a QR code. No sign-ups, no downloads, instant sharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 bg-brand-600 text-white rounded-full text-lg font-bold hover:bg-brand-500 transition-all transform hover:scale-105 shadow-xl shadow-brand-500/40"
              >
                Create Your Event
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full text-lg font-bold hover:bg-slate-50 transition-colors">
                View Demo Gallery
              </button>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
             <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
             <div className="absolute top-20 right-10 w-72 h-72 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                  <i className="fa-solid fa-qrcode"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">One Scan Access</h3>
                <p className="text-slate-600">Guests simply scan your unique QR code to start uploading. No accounts required.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">AI Curation</h3>
                <p className="text-slate-600">Our smart AI helps caption moments and organize your gallery automatically.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Private & Secure</h3>
                <p className="text-slate-600">You control who sees what. Download everything in one click after the event.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <p>&copy; 2024 Moments. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;