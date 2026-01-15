import React, { useState, useEffect, useCallback } from 'react';
import { EventData, MediaItem } from '../types';

interface EventAdminProps {
  event: EventData;
  media: MediaItem[];
  onBack: () => void;
  onUpdateEvent: (event: EventData) => void;
  onUpdateMedia: (media: MediaItem) => void;
}

const EventAdmin: React.FC<EventAdminProps> = ({ event, media, onBack, onUpdateEvent, onUpdateMedia }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'settings' | 'share'>('share');
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const eventLink = `${window.location.origin}${window.location.pathname}#/event/${event.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(eventLink)}&color=a855f7&bgcolor=ffffff`;

  // Slideshow auto-advance
  useEffect(() => {
    if (slideshowActive && media.length > 0) {
      const timer = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % media.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [slideshowActive, media.length]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(eventLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = async () => {
    // For demo, we'll open each image in a new tab
    // In production, you'd use JSZip to create a downloadable archive
    if (media.length === 0) {
      alert('No photos to download yet!');
      return;
    }
    
    // Simple approach: trigger download for first few images
    media.slice(0, 5).forEach((item, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = item.url;
        link.download = `moment-${index + 1}.jpg`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 500);
    });
    
    if (media.length > 5) {
      alert(`Downloading first 5 of ${media.length} photos. In production, all would be zipped.`);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (slideshowActive) {
      if (e.key === 'Escape') {
        setSlideshowActive(false);
      } else if (e.key === 'ArrowRight') {
        setSlideshowIndex((prev) => (prev + 1) % media.length);
      } else if (e.key === 'ArrowLeft') {
        setSlideshowIndex((prev) => (prev - 1 + media.length) % media.length);
      }
    }
    if (selectedImage && e.key === 'Escape') {
      setSelectedImage(null);
    }
  }, [slideshowActive, selectedImage, media.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
            <i className="fa-solid fa-arrow-left"></i> 
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800 hidden md:block">{event.name}</h1>
          <div className="flex gap-2">
            {media.length > 0 && (
              <>
                <button 
                  onClick={() => { setSlideshowIndex(0); setSlideshowActive(true); }}
                  className="text-slate-500 hover:text-fuchsia-600 px-3 py-2 rounded-lg hover:bg-fuchsia-50 transition-colors"
                  title="Start Slideshow"
                >
                  <i className="fa-solid fa-play"></i>
                  <span className="hidden sm:inline ml-2">Slideshow</span>
                </button>
                <button 
                  onClick={handleDownloadAll}
                  className="text-slate-500 hover:text-fuchsia-600 px-3 py-2 rounded-lg hover:bg-fuchsia-50 transition-colors"
                  title="Download All"
                >
                  <i className="fa-solid fa-download"></i>
                  <span className="hidden sm:inline ml-2">Download All</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="container mx-auto px-6 flex gap-6 overflow-x-auto border-t border-slate-100">
          <button 
            onClick={() => setActiveTab('share')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'share' 
                ? 'border-fuchsia-600 text-fuchsia-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-solid fa-qrcode mr-2"></i>
            QR & Share
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'gallery' 
                ? 'border-fuchsia-600 text-fuchsia-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-solid fa-images mr-2"></i>
            Gallery ({media.length})
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'settings' 
                ? 'border-fuchsia-600 text-fuchsia-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-solid fa-gear mr-2"></i>
            Event Settings
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow">
        
        {/* SHARE TAB */}
        {activeTab === 'share' && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* QR Code Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Event QR Code</h2>
              <p className="text-slate-500 mb-6 text-sm">Print this for your venue tables or invitations.</p>
              
              <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 p-6 rounded-2xl mb-6 border-2 border-fuchsia-100">
                <img src={qrCodeUrl} alt="Event QR Code" className="w-52 h-52" />
              </div>
              
              <div className="flex gap-3">
                <a 
                  href={qrCodeUrl} 
                  download={`qr-${event.id}.png`}
                  className="flex items-center gap-2 text-fuchsia-600 font-semibold hover:bg-fuchsia-50 px-5 py-2.5 rounded-xl transition-colors border border-fuchsia-200"
                >
                  <i className="fa-solid fa-download"></i> Download PNG
                </a>
              </div>
            </div>

            {/* Link & Stats */}
            <div className="space-y-6">
              {/* Invite Link */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-link text-fuchsia-500"></i>
                  Share Link
                </h3>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={eventLink}
                    className="flex-1 bg-slate-50 border border-slate-200 text-slate-600 px-4 py-3 rounded-xl text-sm font-mono"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className={`px-5 rounded-xl font-medium transition-all ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    {copied ? <><i className="fa-solid fa-check"></i></> : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-chart-simple text-fuchsia-500"></i>
                  Event Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-fuchsia-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-fuchsia-600">{media.length}</div>
                    <div className="text-sm text-fuchsia-700">Photos</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {media.filter(m => m.type === 'video').length}
                    </div>
                    <div className="text-sm text-purple-700">Videos</div>
                  </div>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-message"></i>
                  Welcome Message
                </h3>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm mb-4">
                  <p className="text-sm italic opacity-90">"{event.welcomeMessage}"</p>
                </div>
                <p className="text-xs text-fuchsia-100">
                  Edit this in Event Settings tab
                </p>
              </div>
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div>
            {media.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-regular fa-images text-4xl text-slate-300"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Gallery is Empty</h3>
                <p className="text-slate-500 mb-6">Share your QR code or link with guests to start collecting photos!</p>
                <button 
                  onClick={() => setActiveTab('share')}
                  className="px-6 py-3 bg-fuchsia-600 text-white rounded-xl font-medium hover:bg-fuchsia-500"
                >
                  Get Share Link
                </button>
              </div>
            ) : (
              <>
                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {media.map((item, index) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedImage(item)}
                      className="aspect-square relative group overflow-hidden rounded-xl bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all"
                    >
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt="Guest upload" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <video src={item.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <i className="fa-solid fa-play text-slate-700"></i>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-3 left-3 right-3 text-white text-sm">
                          {item.aiDescription && (
                            <p className="truncate">
                              <i className="fa-solid fa-wand-magic-sparkles mr-1"></i>
                              {item.aiDescription}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs px-2 py-1 rounded-full">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Event Details</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Event Name</label>
                  <input 
                    type="text" 
                    value={event.name} 
                    onChange={(e) => onUpdateEvent({...event, name: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-fuchsia-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Host Name</label>
                  <input 
                    type="text" 
                    value={event.hostName} 
                    onChange={(e) => onUpdateEvent({...event, hostName: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-fuchsia-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Welcome Message</label>
                  <textarea 
                    value={event.welcomeMessage} 
                    onChange={(e) => onUpdateEvent({...event, welcomeMessage: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-fuchsia-500 outline-none h-28 resize-none"
                    placeholder="Write a welcoming message for your guests..."
                  />
                  <p className="text-xs text-slate-400 mt-1">This message appears on the upload page.</p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 bg-red-50 p-6 rounded-2xl border border-red-100">
              <h4 className="font-bold text-red-800 mb-2">Danger Zone</h4>
              <p className="text-sm text-red-600 mb-4">
                Deleting this event will remove all photos and cannot be undone.
              </p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                Delete Event
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" 
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white p-2"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center bg-black rounded-t-2xl overflow-hidden">
              {selectedImage.type === 'image' ? (
                <img 
                  src={selectedImage.url} 
                  alt="Full view" 
                  className="max-h-[70vh] max-w-full object-contain" 
                />
              ) : (
                <video src={selectedImage.url} controls className="max-h-[70vh] max-w-full" autoPlay />
              )}
            </div>
            
            {/* Info bar */}
            <div className="bg-white p-5 rounded-b-2xl flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Uploaded {new Date(selectedImage.timestamp).toLocaleString()}
                </p>
                {selectedImage.aiDescription && (
                  <p className="text-slate-800 font-medium mt-1">
                    <i className="fa-solid fa-wand-magic-sparkles text-fuchsia-500 mr-2"></i>
                    {selectedImage.aiDescription}
                  </p>
                )}
              </div>
              <a 
                href={selectedImage.url} 
                download={`moment-${selectedImage.id}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg font-medium hover:bg-fuchsia-500 flex items-center gap-2"
              >
                <i className="fa-solid fa-download"></i>
                Download
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Slideshow */}
      {slideshowActive && media.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setSlideshowActive(false)}
        >
          {/* Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
            <span className="text-white/60 text-sm">
              {slideshowIndex + 1} / {media.length}
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); setSlideshowActive(false); }}
              className="text-white/60 hover:text-white p-2"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          {/* Navigation */}
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              setSlideshowIndex((prev) => (prev - 1 + media.length) % media.length); 
            }}
            className="absolute left-6 text-white/40 hover:text-white p-4"
          >
            <i className="fa-solid fa-chevron-left text-4xl"></i>
          </button>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              setSlideshowIndex((prev) => (prev + 1) % media.length); 
            }}
            className="absolute right-6 text-white/40 hover:text-white p-4"
          >
            <i className="fa-solid fa-chevron-right text-4xl"></i>
          </button>

          {/* Image */}
          <div className="max-w-6xl max-h-[85vh] px-20">
            {media[slideshowIndex].type === 'image' ? (
              <img 
                src={media[slideshowIndex].url} 
                alt="Slideshow" 
                className="max-h-[85vh] max-w-full object-contain mx-auto transition-opacity duration-500"
                key={slideshowIndex}
              />
            ) : (
              <video 
                src={media[slideshowIndex].url} 
                className="max-h-[85vh] max-w-full mx-auto"
                autoPlay
                muted
              />
            )}
          </div>

          {/* Caption */}
          {media[slideshowIndex].aiDescription && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white">
              <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
              {media[slideshowIndex].aiDescription}
            </div>
          )}

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-fuchsia-500 transition-all duration-300"
              style={{ width: `${((slideshowIndex + 1) / media.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAdmin;
