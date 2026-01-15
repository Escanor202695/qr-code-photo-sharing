import React, { useState } from 'react';
import { EventData, MediaItem } from '../types';
import { generateWelcomeMessage, analyzeImageVibe } from '../services/geminiService';

interface EventAdminProps {
  event: EventData;
  media: MediaItem[];
  onBack: () => void;
  onUpdateEvent: (event: EventData) => void;
}

const EventAdmin: React.FC<EventAdminProps> = ({ event, media, onBack, onUpdateEvent }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'settings' | 'share'>('share');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [analyzingImage, setAnalyzingImage] = useState(false);

  const eventLink = `${window.location.origin}/#/event/${event.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(eventLink)}&color=701a75`;

  const handleGenerateWelcome = async () => {
    setIsGenerating(true);
    const message = await generateWelcomeMessage(event.name, event.hostName, "Party");
    onUpdateEvent({ ...event, welcomeMessage: message });
    setIsGenerating(false);
  };

  const handleAnalyzeImage = async (mediaItem: MediaItem) => {
    // We can only analyze if we can get base64. For this demo we use createObjectURL which is a blob.
    // In a real app, we'd fetch the blob and convert to base64.
    // Here we will simulate the behavior with the text prompt or fetch if possible.
    
    setAnalyzingImage(true);
    try {
        // Fetch blob from blob url
        const response = await fetch(mediaItem.url);
        const blob = await response.blob();
        
        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
            const base64data = reader.result as string;
            // Strip the data:image/jpeg;base64, part
            const base64Content = base64data.split(',')[1];
            
            const description = await analyzeImageVibe(base64Content);
            
            // Update the local view (in a real app, update global state)
            mediaItem.aiDescription = description;
            setSelectedImage({...mediaItem}); // Force re-render of modal
            setAnalyzingImage(false);
        }
    } catch (e) {
        console.error("Failed to analyze", e);
        setAnalyzingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* Header */}
       <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
            <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1 className="text-lg font-bold text-slate-800 hidden sm:block">{event.name}</h1>
          <div className="flex gap-2">
            <button className="text-slate-400 hover:text-brand-600 px-3 py-1">
                <i className="fa-solid fa-gear"></i>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="container mx-auto px-6 mt-2 flex gap-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('share')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'share' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            QR & Share
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'gallery' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Gallery ({media.length})
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'settings' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Event Settings
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow">
        
        {/* SHARE TAB */}
        {activeTab === 'share' && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Event QR Code</h2>
                <p className="text-slate-500 mb-6 text-sm">Download and print this for your venue tables.</p>
                
                <div className="bg-white p-4 border-2 border-brand-100 rounded-xl mb-6 shadow-inner">
                    <img src={qrCodeUrl} alt="Event QR Code" className="w-48 h-48 mix-blend-multiply" />
                </div>
                
                <a 
                    href={qrCodeUrl} 
                    download={`qr-${event.id}.png`}
                    className="flex items-center gap-2 text-brand-600 font-semibold hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors"
                >
                    <i className="fa-solid fa-download"></i> Download PNG
                </a>
             </div>

             <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4">Invite Link</h3>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            readOnly 
                            value={eventLink}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm"
                        />
                        <button 
                            onClick={() => navigator.clipboard.writeText(eventLink)}
                            className="bg-slate-800 text-white px-4 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            Copy
                        </button>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-brand-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white">
                    <h3 className="font-bold text-lg mb-2"><i className="fa-solid fa-wand-magic-sparkles mr-2"></i>AI Setup Assistant</h3>
                    <p className="text-brand-100 text-sm mb-4">Let our AI write a welcoming message for your guests' upload page.</p>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm mb-4">
                        <p className="text-sm italic opacity-90">"{event.welcomeMessage}"</p>
                    </div>
                    <button 
                        onClick={handleGenerateWelcome}
                        disabled={isGenerating}
                        className="w-full bg-white text-brand-600 font-bold py-2 rounded-lg hover:bg-brand-50 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {isGenerating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-pen-nib"></i>}
                        {isGenerating ? 'Writing...' : 'Regenerate Message'}
                    </button>
                </div>
             </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div>
            {media.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 text-3xl">
                        <i className="fa-regular fa-images"></i>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Gallery is Empty</h3>
                    <p className="text-slate-500">Waiting for guests to upload photos.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {media.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedImage(item)}
                            className="aspect-square relative group overflow-hidden rounded-xl bg-slate-100 cursor-pointer"
                        >
                            {item.type === 'image' ? (
                                <img src={item.url} alt="Guest upload" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            ) : (
                                <video src={item.url} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <span className="text-white bg-white/20 backdrop-blur-md p-2 rounded-full"><i className="fa-solid fa-expand"></i></span>
                            </div>
                            {item.aiDescription && (
                                <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-slate-800 truncate">
                                    <i className="fa-solid fa-robot text-brand-600 mr-1"></i> {item.aiDescription}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-6">Event Details</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Event Name</label>
                        <input type="text" value={event.name} disabled className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Welcome Message</label>
                        <textarea 
                            value={event.welcomeMessage} 
                            onChange={(e) => onUpdateEvent({...event, welcomeMessage: e.target.value})}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none h-24"
                        />
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">Save Changes</button>
                    </div>
                </div>
            </div>
        )}
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <div className="relative w-full flex justify-center bg-black rounded-t-lg overflow-hidden">
                     {selectedImage.type === 'image' ? (
                        <img src={selectedImage.url} alt="Full view" className="max-h-[70vh] object-contain" />
                     ) : (
                        <video src={selectedImage.url} controls className="max-h-[70vh]" />
                     )}
                </div>
                
                <div className="w-full bg-white p-6 rounded-b-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 mb-1">Uploaded {new Date(selectedImage.timestamp).toLocaleTimeString()}</p>
                            {selectedImage.aiDescription ? (
                                <p className="text-slate-800 font-medium"><i className="fa-solid fa-wand-magic-sparkles text-brand-600 mr-2"></i>{selectedImage.aiDescription}</p>
                            ) : (
                                <button 
                                    onClick={() => handleAnalyzeImage(selectedImage)}
                                    disabled={analyzingImage}
                                    className="text-sm text-brand-600 font-semibold hover:underline flex items-center gap-2"
                                >
                                    {analyzingImage ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                                    {analyzingImage ? 'Analyzing...' : 'Analyze Vibe with AI'}
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2">
                             <a 
                                href={selectedImage.url} 
                                download={`moment-${selectedImage.id}.${selectedImage.type === 'image' ? 'jpg' : 'mp4'}`}
                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                                title="Download"
                            >
                                <i className="fa-solid fa-download"></i>
                            </a>
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default EventAdmin;