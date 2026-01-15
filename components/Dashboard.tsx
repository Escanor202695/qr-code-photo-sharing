import React, { useState } from 'react';
import { EventData } from '../types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName || !newEventDate) return;

    const newEvent: EventData = {
      id: `evt-${Date.now()}`,
      name: newEventName,
      date: newEventDate,
      hostName: hostName || 'Host',
      welcomeMessage: `Welcome to ${newEventName}! Share your photos here.`
    };

    onCreateEvent(newEvent);
    setShowModal(false);
    setNewEventName('');
    setNewEventDate('');
    setHostName('');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <h1 className="text-xl font-bold text-slate-800">My Dashboard</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
             <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Your Events</h2>
            <p className="text-slate-500">Manage and view your photo collections.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-500 transition-colors flex items-center gap-2 shadow-lg shadow-brand-500/20"
          >
            <i className="fa-solid fa-plus"></i> New Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="text-slate-300 text-5xl mb-4"><i className="fa-regular fa-calendar-plus"></i></div>
            <p className="text-lg text-slate-500 font-medium">No events yet.</p>
            <p className="text-slate-400 mb-6">Create your first event to start collecting memories.</p>
            <button 
              onClick={() => setShowModal(true)}
              className="text-brand-600 font-semibold hover:underline"
            >
              Create Event Now
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div 
                key={event.id}
                onClick={() => onSelectEvent(event.id)}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-champagne-glasses"></i>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">Active</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{event.name}</h3>
                <p className="text-slate-500 text-sm mb-4"><i className="fa-regular fa-calendar mr-2"></i>{event.date}</p>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-brand-600 text-sm font-medium group-hover:underline">Manage Event</span>
                  <i className="fa-solid fa-arrow-right text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0"></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Create New Event</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Event Name</label>
                <input 
                  type="text" 
                  required
                  value={newEventName}
                  onChange={e => setNewEventName(e.target.value)}
                  placeholder="e.g. Sarah's 30th Birthday"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Host Name</label>
                <input 
                  type="text" 
                  required
                  value={hostName}
                  onChange={e => setHostName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input 
                  type="date" 
                  required
                  value={newEventDate}
                  onChange={e => setNewEventDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                />
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;