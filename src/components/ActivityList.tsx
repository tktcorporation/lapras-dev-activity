import React from 'react';
import { Activity } from '../types/lapras';
import { formatDate } from '../utils/date';
import { getActivityIcon } from '../utils/icons';

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.slice(0, 5).map((activity, index) => (
          <a
            key={index}
            href={activity.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}