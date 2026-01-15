import React, { useState, useEffect } from 'react';
import { ViewState, EventData, MediaItem } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import EventAdmin from './components/EventAdmin';
import PublicUpload from './components/PublicUpload';
import {
  initializeStorage,
  getEvents,
  createEvent,
  updateEvent,
  getMedia,
  addMedia,
  updateMedia,
  getMediaByEventId,
} from './services/storageService';

const App: React.FC = () => {
  // Initialize storage on mount
  useEffect(() => {
    initializeStorage();
  }, []);

  // Simple routing state
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  
  // Data state - now synced with localStorage
  const [events, setEvents] = useState<EventData[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);

  // Load data from localStorage
  const refreshData = () => {
    setEvents(getEvents());
    setMedia(getMedia());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Hash router simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/event/')) {
        const id = hash.split('/event/')[1];
        setActiveEventId(id);
        setCurrentView(ViewState.PUBLIC_UPLOAD);
      } else if (hash === '#/dashboard') {
        refreshData(); // Refresh on dashboard visit
        setCurrentView(ViewState.DASHBOARD);
      } else if (hash.startsWith('#/admin/')) {
        const id = hash.split('/admin/')[1];
        setActiveEventId(id);
        refreshData(); // Refresh on admin visit
        setCurrentView(ViewState.EVENT_ADMIN);
      } else {
        setCurrentView(ViewState.LANDING);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const handleCreateEvent = (newEvent: EventData) => {
    createEvent(newEvent);
    refreshData();
    navigateTo(`/admin/${newEvent.id}`);
  };

  const handleAddMedia = (newMedia: MediaItem) => {
    addMedia(newMedia);
    refreshData();
  };

  const handleUpdateEvent = (updatedEvent: EventData) => {
    updateEvent(updatedEvent);
    refreshData();
  };

  const handleUpdateMedia = (updatedMedia: MediaItem) => {
    updateMedia(updatedMedia);
    refreshData();
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.LANDING:
        return <LandingPage onGetStarted={() => navigateTo('/dashboard')} />;
      
      case ViewState.DASHBOARD:
        return (
          <Dashboard 
            events={events} 
            onCreateEvent={handleCreateEvent} 
            onSelectEvent={(id) => navigateTo(`/admin/${id}`)}
          />
        );
      
      case ViewState.EVENT_ADMIN:
        const adminEvent = events.find(e => e.id === activeEventId);
        if (!adminEvent) {
          return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl text-slate-300 mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Event Not Found</h2>
                <p className="text-slate-500 mb-6">This event may have been deleted or doesn't exist.</p>
                <button 
                  onClick={() => navigateTo('/dashboard')}
                  className="px-6 py-3 bg-fuchsia-600 text-white rounded-lg font-medium hover:bg-fuchsia-500"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          );
        }
        // Use state media filtered by event ID for reactivity
        const eventMedia = media.filter(m => m.eventId === adminEvent.id);
        return (
          <EventAdmin 
            event={adminEvent} 
            media={eventMedia}
            onBack={() => navigateTo('/dashboard')}
            onUpdateEvent={handleUpdateEvent}
            onUpdateMedia={handleUpdateMedia}
            onAddMedia={handleAddMedia}
          />
        );
      
      case ViewState.PUBLIC_UPLOAD:
        const publicEvent = events.find(e => e.id === activeEventId);
        if (!publicEvent) {
          return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-8 text-center max-w-md">
                <div className="text-6xl mb-4">📷</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Event Not Found</h2>
                <p className="text-slate-500 mb-6">
                  This event link may have expired or the event doesn't exist. 
                  Please check with the event host for the correct link.
                </p>
                <button 
                  onClick={() => navigateTo('/')}
                  className="text-fuchsia-600 font-medium hover:underline"
                >
                  Go to Homepage
                </button>
              </div>
            </div>
          );
        }
        return (
          <PublicUpload 
            event={publicEvent} 
            onUpload={handleAddMedia}
          />
        );
        
      default:
        return <LandingPage onGetStarted={() => navigateTo('/dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {renderView()}
    </div>
  );
};

export default App;
