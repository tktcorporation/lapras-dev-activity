import React, { useState } from 'react';
import { TimelineView } from './TimelineView';
import { groupByTimeUnit, groupByRepository } from '../utils/grouping';
import { OrganizationSection } from './organization/OrganizationSection';
import { StackedActivityChart } from './StackedActivityChart';
import { getStackedMonthlyActivity } from '../utils/charts';
import { groupRepositoriesByOrg } from '../utils/repository';
import { getAllTimelineItems } from '../utils/timeline';
import type { LaprasProfile } from '../types/lapras';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface ActivityTimelineProps {
  profile: LaprasProfile;
  summaryMode?: boolean;
}

export function ActivityTimeline({ profile, summaryMode = true }: ActivityTimelineProps) {
  const [groupingUnit, setGroupingUnit] = useState<'week' | 'month'>('month');
  const [showAllOrgs, setShowAllOrgs] = useState(false);
  const [showDetailedTimeline, setShowDetailedTimeline] = useState(false);
  
  const allItems = getAllTimelineItems(profile);
  const timeGroups = groupByTimeUnit(allItems, groupingUnit);
  const repoGroups = groupByRepository(allItems);
  const orgGroups = groupRepositoriesByOrg(repoGroups);
  
  const totalOrgs = orgGroups.length;
  const displayOrgGroups = summaryMode && !showAllOrgs 
    ? orgGroups.slice(0, 2) 
    : orgGroups;
    
  const stackedActivityData = getStackedMonthlyActivity(allItems);
  const totalActivities = allItems.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">アクティビティタイムライン</h2>
        <div className="flex items-center space-x-4">
          <select
            value={groupingUnit}
            onChange={(e) => setGroupingUnit(e.target.value as 'week' | 'month')}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="week">週単位</option>
            <option value="month">月単位</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">全体のアクティビティ状況</h3>
          <p className="text-sm text-gray-600">合計：{totalActivities}件</p>
        </div>
        <StackedActivityChart data={stackedActivityData} />
      </div>

      {orgGroups.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">組織別アクティビティ</h3>
            {summaryMode && totalOrgs > 2 && (
              <button
                onClick={() => setShowAllOrgs(!showAllOrgs)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                {showAllOrgs ? (
                  <>
                    <span>簡易表示</span>
                    <ChevronUpIcon className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    <span>すべての組織を表示</span>
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
          
          {summaryMode && !showAllOrgs && totalOrgs > 2 && (
            <p className="text-sm text-gray-600 mb-4">
              最もアクティブな {displayOrgGroups.length} 組織を表示中（全 {totalOrgs} 組織）
            </p>
          )}
          
          <div className="space-y-8">
            {displayOrgGroups.map((org) => (
              <OrganizationSection
                key={org.name}
                organization={org}
                summaryMode={summaryMode}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">詳細なタイムライン</h3>
          {summaryMode && (
            <button
              onClick={() => setShowDetailedTimeline(!showDetailedTimeline)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {showDetailedTimeline ? (
                <>
                  <span>非表示</span>
                  <ChevronUpIcon className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  <span>表示</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          )}
        </div>
        
        {(!summaryMode || showDetailedTimeline) && (
          <TimelineView timeGroups={timeGroups} groupingUnit={groupingUnit} />
        )}
      </div>
    </div>
  );
}