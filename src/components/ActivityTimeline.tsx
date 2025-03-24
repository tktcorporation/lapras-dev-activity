import React, { useState } from 'react';
import { TimelineView } from './TimelineView';
import { groupByTimeUnit, groupByRepository } from '../utils/grouping';
import { OrganizationSection } from './organization/OrganizationSection';
import { StackedActivityChart } from './StackedActivityChart';
import { getStackedMonthlyActivity } from '../utils/charts';
import { groupRepositoriesByOrg } from '../utils/repository';
import { getAllTimelineItems } from '../utils/timeline';
import type { LaprasProfile } from '../types/lapras';
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  BarChart2Icon, 
  CalendarIcon, 
  ClockIcon,
  TrendingUpIcon,
  LayoutIcon,
  FilterIcon,
  ListIcon
} from 'lucide-react';

interface ActivityTimelineProps {
  profile: LaprasProfile;
  summaryMode?: boolean;
}

export function ActivityTimeline({ profile, summaryMode = true }: ActivityTimelineProps) {
  const [groupingUnit, setGroupingUnit] = useState<'week' | 'month'>('month');
  const [showAllOrgs, setShowAllOrgs] = useState(false);
  const [showDetailedTimeline, setShowDetailedTimeline] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'organizations' | 'detailed'>('overview');
  
  const allItems = getAllTimelineItems(profile);
  const timeGroups = groupByTimeUnit(allItems, groupingUnit);
  const repoGroups = groupByRepository(allItems);
  const orgGroups = groupRepositoriesByOrg(repoGroups);
  
  // 表示する組織を決定
  const totalOrgs = orgGroups.length;
  const displayOrgGroups = summaryMode && !showAllOrgs 
    ? orgGroups.slice(0, 4) 
    : orgGroups;
    
  // 活動統計データを取得
  const stackedActivityData = getStackedMonthlyActivity(allItems);
  const totalActivities = allItems.length;
  
  // 活動タイプごとの集計
  const activityTypesCounts = allItems.reduce((counts, item) => {
    counts[item.type] = (counts[item.type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  // 活動のある月ごとの集計（最新順）
  const monthlyActivityCounts = Object.values(timeGroups)
    .map((group) => ({
      date: group.date.toISOString().split('T')[0],
      count: group.items.length
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  // 最新の活動日
  const latestActivityDate = allItems.length > 0 
    ? new Date(allItems[0].date)
    : new Date();
  
  // 活動タイプ名の取得
  function getActivityTypeName(type: string): string {
    switch (type) {
      case 'github': return 'GitHub';
      case 'github_pr': return 'Pull Request';
      case 'speaker_deck': return 'SpeakerDeck';
      case 'qiita': return 'Qiita';
      case 'zenn': return 'Zenn';
      case 'note': return 'Note';
      case 'teratail': return 'Teratail';
      case 'blog': return 'Blog';
      case 'connpass': return 'イベント';
      default: return type;
    }
  }
  
  // 活動タイプに対応する色を取得
  function getActivityTypeColor(type: string): string {
    switch (type) {
      case 'github': return '#6366F1';
      case 'github_pr': return '#8B5CF6';
      case 'speaker_deck': return '#F59E0B';
      case 'qiita': return '#10B981';
      case 'zenn': return '#3B82F6';
      case 'note': return '#EC4899';
      case 'teratail': return '#8B5CF6';
      case 'blog': return '#EC4899';
      case 'connpass': return '#8B5CF6';
      default: return '#6B7280';
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">アクティビティタイムライン</h2>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  activeTab === 'overview' 
                    ? 'bg-white shadow-sm text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <BarChart2Icon className="w-4 h-4 mr-1.5" />
                  <span>概要</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('organizations')}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  activeTab === 'organizations' 
                    ? 'bg-white shadow-sm text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <LayoutIcon className="w-4 h-4 mr-1.5" />
                  <span>組織別</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  activeTab === 'detailed' 
                    ? 'bg-white shadow-sm text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <ListIcon className="w-4 h-4 mr-1.5" />
                  <span>詳細</span>
                </span>
              </button>
            </div>
            
            <select
              value={groupingUnit}
              onChange={(e) => setGroupingUnit(e.target.value as 'week' | 'month')}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
            >
              <option value="week">週単位</option>
              <option value="month">月単位</option>
            </select>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* アクティビティ統計サマリー */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 shadow-sm border border-indigo-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-indigo-700 font-medium text-sm mb-1">合計アクティビティ</div>
                    <div className="text-3xl font-bold text-indigo-900">{totalActivities}</div>
                  </div>
                  <div className="bg-indigo-200 p-2 rounded-lg">
                    <TrendingUpIcon className="w-5 h-5 text-indigo-700" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow-sm border border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-blue-700 font-medium text-sm mb-1">活動組織数</div>
                    <div className="text-3xl font-bold text-blue-900">{totalOrgs}</div>
                  </div>
                  <div className="bg-blue-200 p-2 rounded-lg">
                    <LayoutIcon className="w-5 h-5 text-blue-700" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 shadow-sm border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-green-700 font-medium text-sm mb-1">活動タイプ</div>
                    <div className="text-3xl font-bold text-green-900">{Object.keys(activityTypesCounts).length}</div>
                  </div>
                  <div className="bg-green-200 p-2 rounded-lg">
                    <FilterIcon className="w-5 h-5 text-green-700" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 shadow-sm border border-purple-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-purple-700 font-medium text-sm mb-1">最終アクティビティ</div>
                    <div className="text-xl font-bold text-purple-900">{latestActivityDate.toLocaleDateString('ja-JP')}</div>
                  </div>
                  <div className="bg-purple-200 p-2 rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-purple-700" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* アクティビティグラフ */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">アクティビティ推移</h3>
                <span className="text-sm text-gray-600">合計：{totalActivities}件</span>
              </div>
              <StackedActivityChart data={stackedActivityData} />
            </div>
            
            {/* アクティビティタイプ分布 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">アクティビティタイプ分布</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(activityTypesCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, count]) => {
                    const percentage = Math.round((count / totalActivities) * 100);
                    return (
                      <div key={type} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <span 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: getActivityTypeColor(type) }}
                            ></span>
                            <span className="font-medium text-gray-800">{getActivityTypeName(type)}</span>
                          </div>
                          <span className="text-sm font-medium text-indigo-600">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: getActivityTypeColor(type)
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 text-right">{percentage}%</div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            
            {/* 月別アクティビティ */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">月別アクティビティ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {monthlyActivityCounts.slice(0, 8).map((monthData) => (
                  <div key={monthData.date} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 font-medium">{monthData.date}</span>
                      <span className="text-indigo-600 font-semibold">{monthData.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min((monthData.count / Math.max(...monthlyActivityCounts.map(m => m.count))) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'organizations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">組織別アクティビティ</h3>
              {summaryMode && totalOrgs > 4 && (
                <button
                  onClick={() => setShowAllOrgs(!showAllOrgs)}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
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
            
            {summaryMode && !showAllOrgs && totalOrgs > 4 && (
              <p className="text-sm text-gray-600">
                最もアクティブな {displayOrgGroups.length} 組織を表示中（全 {totalOrgs} 組織）
              </p>
            )}
            
            <div className="grid gap-6">
              {displayOrgGroups.map((org) => (
                <OrganizationSection
                  key={org.name}
                  organization={org}
                  summaryMode={summaryMode}
                />
              ))}
            </div>
            
            {summaryMode && !showAllOrgs && totalOrgs > displayOrgGroups.length && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllOrgs(true)}
                  className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  + さらに {totalOrgs - displayOrgGroups.length} 組織を表示
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">詳細タイムライン</h3>
              <div className="flex items-center text-sm text-gray-600">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{groupingUnit === 'week' ? '週単位' : '月単位'}</span>
              </div>
            </div>
            
            <TimelineView 
              timeGroups={timeGroups} 
              groupingUnit={groupingUnit} 
            />
          </div>
        )}
      </div>
    </div>
  );
}