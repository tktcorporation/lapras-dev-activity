import React from 'react';
import { MonthlyActivity } from '../utils/charts';

interface ActivityChartProps {
  data: MonthlyActivity[];
  maxHeight?: number;
}

export function ActivityChart({ data, maxHeight = 100 }: ActivityChartProps) {
  const maxCount = Math.max(...data.map(d => d.count));
  const chartHeight = maxHeight;
  const barWidth = 24;
  const gap = 4;
  const totalWidth = (barWidth + gap) * data.length;

  return (
    <div className="w-full overflow-x-auto">
      <div style={{ width: totalWidth, height: chartHeight }} className="relative">
        {data.map((item, index) => {
          const height = (item.count / maxCount) * chartHeight;
          return (
            <div
              key={item.date.toISOString()}
              className="absolute bottom-0 bg-blue-500 hover:bg-blue-600 transition-colors"
              style={{
                left: index * (barWidth + gap),
                width: barWidth,
                height: `${height}px`,
              }}
              title={`${item.date.toLocaleDateString('default', { 
                month: 'short', 
                year: 'numeric' 
              })}: ${item.count} activities`}
            />
          );
        })}
      </div>
      <div 
        style={{ width: totalWidth }} 
        className="flex mt-2"
      >
        {data.map((item) => (
          <div
            key={item.date.toISOString()}
            style={{ width: barWidth, marginRight: gap }}
            className="text-xs text-gray-500 text-center"
          >
            {item.date.toLocaleDateString('default', { month: 'short' })}
          </div>
        ))}
      </div>
    </div>
  );
}