import React, { useState } from 'react';
import { CalendarIcon, PresentationIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { Event } from '../types/lapras';
import { formatDate } from '../utils/date';

interface EventListProps {
  events: Event[];
  summaryMode?: boolean;
}

export function EventList({ events, summaryMode = true }: EventListProps) {
  const [showAll, setShowAll] = useState(false);
  const [showPastEvents, setShowPastEvents] = useState(false);
  
  const today = new Date();
  
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
  const pastEvents = events
    .filter(event => new Date(event.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const upcomingCount = upcomingEvents.length;
  const pastCount = pastEvents.length;
  const totalCount = events.length;
  
  const displayUpcomingEvents = summaryMode && !showAll 
    ? upcomingEvents.slice(0, 3) 
    : upcomingEvents;
  
  const displayPastEvents = showPastEvents 
    ? (summaryMode && !showAll ? pastEvents.slice(0, 3) : pastEvents) 
    : [];
  
  if (totalCount === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">イベント ({totalCount})</h2>
        <div className="flex space-x-4">
          {pastCount > 0 && (
            <button
              onClick={() => setShowPastEvents(!showPastEvents)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {showPastEvents ? '過去のイベントを隠す' : '過去のイベントも表示'}
            </button>
          )}
          {summaryMode && totalCount > 6 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {showAll ? (
                <>
                  <span>簡易表示</span>
                  <ChevronUpIcon className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  <span>すべて表示</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {upcomingCount > 0 && (
        <>
          <h3 className="font-medium text-gray-700 mb-3">今後のイベント ({upcomingCount})</h3>
          <div className="space-y-4 mb-6">
            {displayUpcomingEvents.map((event, index) => (
              <a
                key={`upcoming-${index}`}
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
                          登壇者
                        </span>
                      )}
                      {event.is_organizer && (
                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                          主催者
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {showPastEvents && pastCount > 0 && (
        <>
          <h3 className="font-medium text-gray-700 mb-3">過去のイベント ({pastCount})</h3>
          <div className="space-y-4">
            {displayPastEvents.map((event, index) => (
              <a
                key={`past-${index}`}
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
                          登壇者
                        </span>
                      )}
                      {event.is_organizer && (
                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                          主催者
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}