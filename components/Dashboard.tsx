import React, { useState } from 'react';
import { EventData } from '../types';
import { generateEventId, getStorageStats, resetDemo } from '../services/storageService';

interface DashboardProps {
  events: EventData[];
  onCreateEvent: (event: EventData) => void;
  onSelectEvent: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ events, onCreateEvent, onSelectEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [hostName, setHostName] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const stats = getStorageStats();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName || !newEventDate || !hostName) return;

    const newEvent: EventData = {
      id: generateEventId(newEventName),
      name: newEventName,
      date: newEventDate,
      hostName: hostName,
      welcomeMessage: `Welcome to ${newEventName}! Share your photos and videos here. 📸`,
      createdAt: Date.now(),
      isActive: true,
    };

    onCreateEvent(newEvent);
    setShowModal(false);
    setNewEventName('');
    setNewEventDate('');
    setHostName('');
  };

  const handleReset = () => {
    resetDemo();
    window.location.reload();
  };

  const getEventIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('wedding')) return 'fa-ring';
    if (lower.includes('birthday')) return 'fa-cake-candles';
    if (lower.includes('party')) return 'fa-champagne-glasses';
    if (lower.includes('corporate') || lower.includes('conference')) return 'fa-building';
    if (lower.includes('graduation')) return 'fa-graduation-cap';
    return 'fa-camera';
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => window.location.hash = '/'}
              className="w-9 h-9 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer shadow-lg shadow-purple-500/20"
            >
              M
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">My Dashboard</h1>
              <p className="text-xs text-slate-400">Manage your events</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowResetConfirm(true)}
              className="text-sm text-slate-500 hover:text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-100"
              title="Reset demo data"
            >
              <i className="fa-solid fa-rotate-right mr-1"></i> Reset Demo
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-slate-100">
            <div className="text-2xl font-bold text-slate-800">{stats.totalEvents}</div>
            <div className="text-sm text-slate-500">Total Events</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100">
            <div className="text-2xl font-bold text-slate-800">{stats.totalMedia}</div>
            <div className="text-sm text-slate-500">Total Photos</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100">
            <div className="text-2xl font-bold text-fuchsia-600">{stats.storageUsedMB} MB</div>
            <div className="text-sm text-slate-500">Storage Used</div>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Your Events</h2>
            <p className="text-slate-500">Create and manage photo collections for your events.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-5 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> New Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-regular fa-calendar-plus text-3xl text-slate-400"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No events yet</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Create your first event to start collecting photos from your guests.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <i className="fa-solid fa-plus mr-2"></i> Create Your First Event
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div 
                key={event.id}
                onClick={() => onSelectEvent(event.id)}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              >
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-br from-fuchsia-500 to-purple-600 relative overflow-hidden">
                  {event.coverImage ? (
                    <img 
                      src={event.coverImage} 
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className={`fa-solid ${getEventIcon(event.name)} text-4xl text-white/30`}></i>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span className="absolute top-3 right-3 text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-fuchsia-600 transition-colors">
                        {event.name}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        <i className="fa-regular fa-calendar mr-1.5"></i>
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center group-hover:bg-fuchsia-600 group-hover:text-white transition-colors">
                      <i className={`fa-solid ${getEventIcon(event.name)}`}></i>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-sm text-slate-500">
                      <i className="fa-solid fa-user mr-1.5"></i>
                      {event.hostName}
                    </span>
                    <span className="text-fuchsia-600 text-sm font-medium group-hover:underline flex items-center gap-1">
                      Manage <i className="fa-solid fa-arrow-right text-xs"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Card */}
            <div 
              onClick={() => setShowModal(true)}
              className="bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-fuchsia-300 flex items-center justify-center min-h-[240px] cursor-pointer group transition-colors"
            >
              <div className="text-center">
                <div className="w-14 h-14 bg-slate-100 group-hover:bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                  <i className="fa-solid fa-plus text-xl text-slate-400 group-hover:text-fuchsia-600 transition-colors"></i>
                </div>
                <p className="text-slate-500 group-hover:text-fuchsia-600 font-medium transition-colors">Create New Event</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-fuchsia-500 to-purple-600">
              <h3 className="text-lg font-bold text-white">Create New Event</h3>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Event Name *</label>
                <input 
                  type="text" 
                  required
                  value={newEventName}
                  onChange={e => setNewEventName(e.target.value)}
                  placeholder="e.g. Sarah & Tom's Wedding"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
                <input 
                  type="text" 
                  required
                  value={hostName}
                  onChange={e => setHostName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Event Date *</label>
                <input 
                  type="date" 
                  required
                  value={newEventDate}
                  onChange={e => setNewEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-triangle-exclamation text-2xl text-amber-600"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Reset Demo Data?</h3>
            <p className="text-slate-500 mb-6">
              This will restore the default demo events and clear all your changes.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleReset}
                className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
