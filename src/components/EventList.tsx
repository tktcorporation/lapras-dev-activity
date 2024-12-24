import React from 'react';
import { CalendarIcon, PresentationIcon } from 'lucide-react';
import type { Event } from '../types/lapras';
import { formatDate } from '../utils/date';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  if (upcomingEvents.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <a
            key={index}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              {event.is_presenter ? (
                <PresentationIcon className="w-5 h-5 text-blue-500" />
              ) : (
                <CalendarIcon className="w-5 h-5 text-gray-500" />
              )}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                  {event.is_presenter && (
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                      Speaker
                    </span>
                  )}
                  {event.is_organizer && (
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                      Organizer
                    </span>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}