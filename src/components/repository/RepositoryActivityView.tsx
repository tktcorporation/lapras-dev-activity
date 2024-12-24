import React from 'react';
import { TimelineItem } from '../../utils/grouping';
import { ActivityChart } from '../ActivityChart';
import { getMonthlyActivityCounts } from '../../utils/charts';
import { RepositoryHeader } from './RepositoryHeader';
import { ActivityList } from './ActivityList';

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
      <RepositoryHeader 
        name={repository.name}
        url={repository.url}
        activityCount={activities.length}
      />

      <div className="mb-6">
        <ActivityChart data={monthlyActivity} maxHeight={120} />
      </div>

      <ActivityList activities={activities} />
    </div>
  );
}