import React from 'react';
import { TimelineItem } from '../../utils/grouping';

interface ActivityListProps {
  activities: TimelineItem[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <a
          key={`${activity.url}-${index}`}
          href={activity.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {activity.date.toLocaleDateString('default', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}