import React from 'react';

interface ScoreCardProps {
  title: string;
  categories: {
    name: string;
    score: number;
  }[];
}

export function ScoreCard({ title, categories }: ScoreCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              <span className="text-sm font-medium text-gray-700">{category.score.toFixed(1)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(category.score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}