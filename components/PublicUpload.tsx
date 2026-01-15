import React, { useState, useRef } from 'react';
import { EventData, MediaItem } from '../types';

interface PublicUploadProps {
  event: EventData;
  onUpload: (media: MediaItem) => void;
}

const PublicUpload: React.FC<PublicUploadProps> = ({ event, onUpload }) => {
  const [hasConsented, setHasConsented] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    Array.from(e.target.files).forEach((item) => {
      const file = item as File;
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      
      const newMedia: MediaItem = {
        id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        eventId: event.id,
        url,
        type,
        timestamp: Date.now()
      };
      
      onUpload(newMedia);
    });

    setUploading(false);
    setSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
    
    // Clear input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden relative z-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-purple-700 p-8 text-center text-white relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <h1 className="text-2xl font-bold mb-2 relative z-10">{event.name}</h1>
                <p className="text-brand-100 text-sm relative z-10">Hosted by {event.hostName}</p>
            </div>

            <div className="p-8">
                <div className="text-center mb-8">
                    <p className="text-slate-600 italic">"{event.welcomeMessage}"</p>
                </div>

                {success ? (
                    <div className="bg-green-50 text-green-700 p-6 rounded-2xl text-center border border-green-100 animate-fade-in-up">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Upload Successful!</h3>
                        <p className="text-sm">Thanks for sharing your memories.</p>
                        <button 
                            onClick={() => setSuccess(false)}
                            className="mt-4 text-green-700 font-semibold text-sm hover:underline"
                        >
                            Upload more
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                         {/* GDPR */}
                         <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer border border-transparent hover:border-brand-200 transition-colors">
                            <input 
                                type="checkbox" 
                                checked={hasConsented}
                                onChange={e => setHasConsented(e.target.checked)}
                                className="mt-1 w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-slate-300" 
                            />
                            <span className="text-xs text-slate-500 leading-relaxed">
                                I agree to share these photos/videos with the event host. I understand they may be displayed in a gallery or shared on social media.
                            </span>
                        </label>

                        <div className="relative group">
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*,video/*"
                                multiple
                                disabled={!hasConsented || uploading}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
                            />
                            <button 
                                disabled={!hasConsented || uploading}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform flex items-center justify-center gap-3 z-10 relative
                                    ${!hasConsented 
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                        : 'bg-brand-600 text-white hover:bg-brand-500 hover:scale-[1.02] shadow-brand-500/30'
                                    }
                                    ${uploading ? 'cursor-wait opacity-80' : ''}
                                `}
                            >
                                {uploading ? (
                                    <>
                                        <i className="fa-solid fa-circle-notch fa-spin"></i> Uploading...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-cloud-arrow-up"></i> Select Photos & Videos
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-400 mt-3">
                                Supports JPG, PNG, MP4
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                <p className="text-xs text-slate-400">Powered by Moments</p>
            </div>
        </div>
    </div>
  );
};

export default PublicUpload;