import React, { useState } from 'react';
import { TimelineItem } from '../utils/grouping';
import { formatDate } from '../utils/date';
import { getActivityIcon } from '../utils/icons';
import { AwardIcon } from 'lucide-react';

interface TimelineViewProps {
  timeGroups: {
    date: Date;
    items: TimelineItem[];
  }[];
  groupingUnit: 'week' | 'month';
}

export function TimelineView({ timeGroups, groupingUnit }: TimelineViewProps) {
  return (
    <div className="space-y-8">
      {timeGroups.map((group) => (
        <div key={group.date.toISOString()} className="relative">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {group.date.toLocaleDateString('default', {
              month: 'long',
              year: 'numeric',
              ...(groupingUnit === 'week' && { day: 'numeric' })
            })}
            {groupingUnit === 'week' && ' (Week)'}
          </h3>
          <div className="space-y-4">
            {group.items.map((item, index) => (
              <a
                key={`${item.url}-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getActivityIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                      {item.isBestAnswer && (
                        <AwardIcon className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">
                        {formatDate(item.date.toISOString())}
                      </span>
                      {item.source && (
                        <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                          {item.source}
                        </span>
                      )}
                      {item.tags?.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}