import React from 'react';
import { TimelineItem } from '../../utils/grouping';
import { ActivityChart } from '../ActivityChart';
import { getMonthlyActivityCounts } from '../../utils/charts';

interface RepositoryOverviewProps {
  repository: {
    name: string;
    url: string;
  };
  activities: TimelineItem[];
}

export function RepositoryOverview({ repository, activities }: RepositoryOverviewProps) {
  const monthlyActivity = getMonthlyActivityCounts(activities);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-sm">
          <a 
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            {repository.name}
          </a>
          <span className="text-gray-500 text-xs ml-2">
            ({activities.length})
          </span>
        </h4>
      </div>
      <ActivityChart data={monthlyActivity} maxHeight={80} />
    </div>
  );
}