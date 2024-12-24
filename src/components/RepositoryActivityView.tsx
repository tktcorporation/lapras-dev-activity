import React from 'react';
import { GithubIcon } from 'lucide-react';
import { TimelineItem } from '../utils/grouping';
import { ActivityChart } from './ActivityChart';
import { getMonthlyActivityCounts } from '../utils/charts';

interface RepositoryActivityViewProps {
  repository: {
    name: string;
    url: string;
  };
  activities: TimelineItem[];
}

export function RepositoryActivityView({ repository, activities }: RepositoryActivityViewProps) {
  const monthlyActivity = getMonthlyActivityCounts(activities);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <GithubIcon className="w-6 h-6 text-gray-700" />
        <h3 className="text-xl font-bold">
          <a 
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            {repository.name}
          </a>
        </h3>
        <span className="text-sm text-gray-500">
          ({activities.length} activities)
        </span>
      </div>

      <div className="mb-6">
        <ActivityChart data={monthlyActivity} maxHeight={120} />
      </div>

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
    </div>
  );
}