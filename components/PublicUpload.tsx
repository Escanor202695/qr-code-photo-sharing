import React, { useState, useRef } from 'react';
import { EventData, MediaItem } from '../types';
import { fileToBase64, getMediaByEventId } from '../services/storageService';
import { uploadToCloudinary, isCloudinaryConfigured } from '../services/cloudinaryService';

interface PublicUploadProps {
  event: EventData;
  onUpload: (media: MediaItem) => void;
}

const PublicUpload: React.FC<PublicUploadProps> = ({ event, onUpload }) => {
  const [hasConsented, setHasConsented] = useState(false);
  const [uploaderName, setUploaderName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get existing photos for this event
  const existingPhotos = getMediaByEventId(event.id);
  const useCloudinary = isCloudinaryConfigured();
  
  // Debug log
  console.log('📸 Upload mode:', useCloudinary ? 'CLOUDINARY' : 'LOCAL STORAGE');

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    setTotalFiles(files.length);
    setCurrentFileIndex(0);
    
    let completed = 0;

    for (const file of Array.from(files)) {
      try {
        setCurrentFileIndex(completed + 1);
        
        let fileUrl: string;
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        
        if (useCloudinary) {
          // Upload to Cloudinary (fast, cloud storage)
          console.log('📤 Uploading to Cloudinary...');
          try {
            const result = await uploadToCloudinary(file, (percent) => {
              setUploadProgress(percent);
            });
            fileUrl = result.secure_url;
            console.log('✅ Got Cloudinary URL:', fileUrl);
          } catch (cloudErr) {
            console.error('❌ Cloudinary failed, falling back to localStorage:', cloudErr);
            // Fallback to localStorage if Cloudinary fails
            fileUrl = await fileToBase64(file);
          }
        } else {
          // Fallback to base64 localStorage (for demo without Cloudinary)
          fileUrl = await fileToBase64(file);
          // Simulate progress for base64
          for (let i = 0; i <= 100; i += 20) {
            setUploadProgress(i);
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        }
        
        const newMedia: MediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          eventId: event.id,
          url: fileUrl,
          type,
          timestamp: Date.now(),
          uploaderName: uploaderName || 'Anonymous Guest',
        };
        
        onUpload(newMedia);
        completed++;
        
      } catch (error) {
        console.error('Upload error:', error);
      }
    }

    setUploading(false);
    
    // Clear input
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    // ✅ AUTO-REDIRECT TO GALLERY after short delay
    // Store flag to open gallery tab
    sessionStorage.setItem('openGalleryTab', 'true');
    setTimeout(() => {
      window.location.hash = `/admin/${event.id}`;
    }, 800);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (hasConsented && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 p-8 text-center text-white relative">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}></div>
            <div className="relative">
              <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
              <p className="text-fuchsia-100 text-sm flex items-center justify-center gap-2">
                <i className="fa-solid fa-user"></i>
                Hosted by {event.hostName}
              </p>
            </div>
          </div>

          <div className="p-8">
            {/* Welcome Message */}
            <div className="text-center mb-8 px-4">
              <p className="text-slate-600 italic text-lg leading-relaxed">"{event.welcomeMessage}"</p>
            </div>

            {uploading ? (
              /* Uploading State - Full screen loading */
              <div className="py-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <svg className="animate-spin" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e9d5ff"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="8"
                      strokeDasharray={`${uploadProgress * 2.51} 251`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-fuchsia-600">
                    {uploadProgress}%
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Uploading{totalFiles > 1 ? ` (${currentFileIndex}/${totalFiles})` : '...'}
                </h3>
                <p className="text-slate-500">
                  {useCloudinary ? 'Saving to cloud...' : 'Processing your photo...'}
                </p>
                <p className="text-xs text-slate-400 mt-4">
                  You'll be redirected to the gallery automatically
                </p>
              </div>
            ) : (
              /* Upload Form */
              <div className="space-y-6">
                {/* Show existing photos count */}
                {existingPhotos.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-slate-600 text-sm">
                      <i className="fa-solid fa-images mr-2 text-fuchsia-500"></i>
                      <strong>{existingPhotos.length}</strong> photos already shared for this event
                    </p>
                  </div>
                )}

                {/* Storage indicator */}
                <div className={`text-center text-xs py-2 px-4 rounded-full inline-flex items-center gap-2 mx-auto ${
                  useCloudinary 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  <i className={`fa-solid ${useCloudinary ? 'fa-cloud' : 'fa-database'}`}></i>
                  {useCloudinary ? 'Cloud storage enabled' : 'Demo mode (local storage)'}
                </div>

                {/* Optional Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name <span className="text-slate-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  />
                </div>

                {/* GDPR Consent */}
                <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer border-2 border-transparent hover:border-fuchsia-200 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={hasConsented}
                    onChange={e => setHasConsented(e.target.checked)}
                    className="mt-0.5 w-5 h-5 text-fuchsia-600 rounded focus:ring-fuchsia-500 border-slate-300 cursor-pointer" 
                  />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    I consent to share my photos/videos with the event host. I understand they may be displayed in a gallery or shared. 
                    <span className="text-fuchsia-600 font-medium"> Required *</span>
                  </span>
                </label>

                {/* Upload Area */}
                <div 
                  className={`relative group transition-all ${!hasConsented ? 'opacity-50' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files)}
                    accept="image/*,video/*"
                    multiple
                    disabled={!hasConsented || uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
                  />
                  
                  <div className={`py-10 text-center rounded-2xl border-2 border-dashed transition-all ${
                    dragActive 
                      ? 'border-fuchsia-500 bg-fuchsia-50' 
                      : hasConsented 
                        ? 'border-slate-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50' 
                        : 'border-slate-200 bg-slate-50'
                  }`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                      hasConsented 
                        ? 'bg-fuchsia-100 text-fuchsia-600 group-hover:bg-fuchsia-200' 
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
                    </div>
                    <p className={`font-semibold mb-1 ${hasConsented ? 'text-slate-800' : 'text-slate-400'}`}>
                      {hasConsented ? 'Tap to select or drag files here' : 'Accept terms to upload'}
                    </p>
                    <p className="text-sm text-slate-400">
                      JPG, PNG, MP4 • Multiple files supported
                    </p>
                  </div>
                </div>

                {/* Camera Quick Access */}
                {hasConsented && (
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors text-slate-700 font-medium">
                      <i className="fa-solid fa-camera"></i>
                      Take Photo
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        onChange={(e) => handleFileChange(e.target.files)}
                        className="hidden"
                      />
                    </label>
                    <label className="flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors text-slate-700 font-medium">
                      <i className="fa-solid fa-video"></i>
                      Record Video
                      <input 
                        type="file" 
                        accept="video/*" 
                        capture="environment"
                        onChange={(e) => handleFileChange(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-100">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <div className="w-5 h-5 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
                M
              </div>
              Powered by Moments
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-white/40 text-xs mt-6 px-4">
          <i className="fa-solid fa-shield-halved mr-1"></i>
          Your photos are shared only with the event host. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default PublicUpload;
