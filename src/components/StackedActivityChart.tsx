import React from 'react';
import { StackedActivityData } from '../utils/charts';

interface StackedActivityChartProps {
  data: StackedActivityData[];
  maxHeight?: number;
}

export function StackedActivityChart({ data, maxHeight = 200 }: StackedActivityChartProps) {
  const maxTotal = Math.max(...data.map(d => d.total));
  const barWidth = 40;
  const gap = 8;
  const totalWidth = (barWidth + gap) * data.length;

  // Get unique repositories for legend
  const allRepos = new Set<string>();
  const repoColors = new Map<string, string>();
  data.forEach(month => {
    month.repositories.forEach(repo => {
      allRepos.add(repo.name);
      repoColors.set(repo.name, repo.color);
    });
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        {Array.from(allRepos).map(repo => (
          <div key={`legend-${repo}`} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: repoColors.get(repo) }}
            />
            <span className="text-sm text-gray-600">{repo}</span>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <div style={{ width: totalWidth, height: maxHeight }} className="relative">
          {data.map((month, monthIndex) => {
            let currentHeight = 0;
            return (
              <React.Fragment key={month.date.toISOString()}>
                {month.repositories.map(repo => {
                  const height = (repo.count / maxTotal) * maxHeight;
                  const barElement = (
                    <div
                      key={`${month.date.toISOString()}-${repo.name}`}
                      className="absolute transition-colors hover:opacity-80 group"
                      style={{
                        left: monthIndex * (barWidth + gap),
                        bottom: currentHeight,
                        width: barWidth,
                        height: `${height}px`,
                        backgroundColor: repo.color,
                      }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        <div className="font-medium">{repo.name}</div>
                        <div>{repo.activities.map(a => a.title).join('\n')}</div>
                        <div className="text-gray-300 text-xs mt-1">{repo.count} activities</div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                      </div>
                    </div>
                  );
                  currentHeight += height;
                  return barElement;
                })}
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ width: totalWidth }} className="flex mt-2">
          {data.map(month => (
            <div
              key={`label-${month.date.toISOString()}`}
              style={{ width: barWidth, marginRight: gap }}
              className="text-xs text-gray-500 text-center"
            >
              {month.date.toLocaleDateString('default', { month: 'short' })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}