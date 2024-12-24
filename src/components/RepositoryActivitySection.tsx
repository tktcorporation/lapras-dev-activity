import React from 'react';
import { TimelineItem } from '../utils/grouping';
import { getMonthlyActivityCounts } from '../utils/charts';
import { ActivityChart } from './ActivityChart';
import { TimelineView } from './TimelineView';
import { groupByTimeUnit } from '../utils/grouping';

interface RepositoryActivitySectionProps {
  repository: {
    name: string;
    url: string;
  };
  activities: TimelineItem[];
}

export function RepositoryActivitySection({ repository, activities }: RepositoryActivitySectionProps) {
  const monthlyActivity = getMonthlyActivityCounts(activities);

  return (
    <div className="border-t pt-4 first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            {repository.name}
          </a>
          <span className="text-sm text-gray-500 ml-2">
            ({activities.length} activities)
          </span>
        </h3>
      </div>

      <div className="mb-6">
        <ActivityChart data={monthlyActivity} />
      </div>

      <TimelineView
        timeGroups={groupByTimeUnit(activities, 'month')}
        groupingUnit="month"
      />
    </div>
  );
}