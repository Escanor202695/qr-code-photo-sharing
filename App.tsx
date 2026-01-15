import React, { useState, useEffect } from 'react';
import { ViewState, EventData, MediaItem } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import EventAdmin from './components/EventAdmin';
import PublicUpload from './components/PublicUpload';

// Mock initial data
const INITIAL_EVENTS: EventData[] = [
  {
    id: 'demo-wedding',
    name: 'Sarah & Tom\'s Wedding',
    date: '2023-10-24',
    hostName: 'Sarah',
    welcomeMessage: 'Welcome to our special day! Please snap and share every moment.'
  }
];

const App: React.FC = () => {
  // Simple routing state
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  
  // Data state
  const [events, setEvents] = useState<EventData[]>(INITIAL_EVENTS);
  const [media, setMedia] = useState<MediaItem[]>([]);

  // Hash router simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/event/')) {
        const id = hash.split('/event/')[1];
        setActiveEventId(id);
        setCurrentView(ViewState.PUBLIC_UPLOAD);
      } else if (hash === '#/dashboard') {
        setCurrentView(ViewState.DASHBOARD);
      } else if (hash.startsWith('#/admin/')) {
        const id = hash.split('/admin/')[1];
        setActiveEventId(id);
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
    setEvents([...events, newEvent]);
    navigateTo(`/admin/${newEvent.id}`);
  };

  const handleAddMedia = (newMedia: MediaItem) => {
    setMedia((prev) => [newMedia, ...prev]);
  };

  const handleUpdateEvent = (updatedEvent: EventData) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
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
        if (!adminEvent) return <div>Event not found</div>;
        return (
          <EventAdmin 
            event={adminEvent} 
            media={media.filter(m => m.eventId === adminEvent.id)}
            onBack={() => navigateTo('/dashboard')}
            onUpdateEvent={handleUpdateEvent}
          />
        );
      
      case ViewState.PUBLIC_UPLOAD:
        const publicEvent = events.find(e => e.id === activeEventId);
        if (!publicEvent) return <div className="p-8 text-center">Event not found. Please check the link.</div>;
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