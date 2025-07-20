import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getEvents } from '../api/eventsApi';
import useCurrentLocation from '../hooks/useCurrentLocation';

const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { latitude, longitude, loading: locationLoading } = useCurrentLocation();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleJoinEvent = useCallback((eventId) => {
    setJoinedEvents(prev => {
      const newJoinedEvents = new Set(prev);
      if (newJoinedEvents.has(eventId)) {
        newJoinedEvents.delete(eventId);
      } else {
        newJoinedEvents.add(eventId);
      }
      return newJoinedEvents;
    });
  }, []);

  const getEventsWithJoinStatus = useCallback(() => {
    return events.map(event => ({
      ...event,
      isJoined: joinedEvents.has(event.id)
    }));
  }, [events, joinedEvents]);

  const getEventById = useCallback((eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return undefined;
    
    return {
      ...event,
      isJoined: joinedEvents.has(event.id)
    };
  }, [events, joinedEvents]);

  const refreshEvents = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const value = {
    events: getEventsWithJoinStatus(),
    joinedEvents,
    loading: loading || locationLoading,
    error,
    userLocation: { latitude, longitude },
    toggleJoinEvent,
    refreshEvents,
    getEventById,
    joinedEventsCount: joinedEvents.size,
    hasLocation: Boolean(latitude && longitude)
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}; 