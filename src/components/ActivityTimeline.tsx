import React, { useState } from 'react';
import { TimelineView } from './TimelineView';
import { groupByTimeUnit, groupByRepository } from '../utils/grouping';
import { OrganizationSection } from './organization/OrganizationSection';
import { StackedActivityChart } from './StackedActivityChart';
import { getStackedMonthlyActivity } from '../utils/charts';
import { groupRepositoriesByOrg } from '../utils/repository';
import { getAllTimelineItems } from '../utils/timeline';
import type { LaprasProfile } from '../types/lapras';

interface ActivityTimelineProps {
  profile: LaprasProfile;
}

export function ActivityTimeline({ profile }: ActivityTimelineProps) {
  const [groupingUnit, setGroupingUnit] = useState<'week' | 'month'>('month');
  const allItems = getAllTimelineItems(profile);
  const timeGroups = groupByTimeUnit(allItems, groupingUnit);
  const repoGroups = groupByRepository(allItems);
  const orgGroups = groupRepositoriesByOrg(repoGroups);
  const stackedActivityData = getStackedMonthlyActivity(allItems);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Activity Timeline</h2>
        <select
          value={groupingUnit}
          onChange={(e) => setGroupingUnit(e.target.value as 'week' | 'month')}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Overall Activity</h3>
        <StackedActivityChart data={stackedActivityData} />
      </div>

      <div className="space-y-8">
        {orgGroups.map((org) => (
          <OrganizationSection
            key={org.name}
            organization={org}
          />
        ))}
      </div>

      <TimelineView timeGroups={timeGroups} groupingUnit={groupingUnit} />
    </div>
  );
}