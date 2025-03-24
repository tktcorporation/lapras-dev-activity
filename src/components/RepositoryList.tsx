import React, { useState } from 'react';
import { GithubIcon, StarIcon, GitForkIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { GithubRepository } from '../types/lapras';

interface RepositoryListProps {
  repositories: GithubRepository[];
  summaryMode?: boolean;
}

export function RepositoryList({ repositories, summaryMode = true }: RepositoryListProps) {
  const [showAll, setShowAll] = useState(false);
  
  const sortedRepos = [...repositories]
    .sort((a, b) => parseInt(b.stargazers_count) - parseInt(a.stargazers_count));
    
  const totalCount = repositories.length;
  const displayRepos = summaryMode && !showAll ? sortedRepos.slice(0, 4) : sortedRepos;
  
  // リポジトリの言語使用統計を計算
  const languageStats = repositories.reduce((stats, repo) => {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + 1;
    }
    return stats;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">リポジトリ ({totalCount})</h2>
        {summaryMode && totalCount > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            {showAll ? (
              <>
                <span>簡易表示</span>
                <ChevronUpIcon className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>すべて表示</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>
      
      {summaryMode && !showAll && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(languageStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([lang, count]) => (
              <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                {lang}: {count}
              </span>
            ))}
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2">
        {displayRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <GithubIcon className="w-5 h-5 mt-1 text-gray-700" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{repo.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{repo.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitForkIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{repo.forks}</span>
                  </div>
                  {repo.language && (
                    <span className="text-sm text-gray-600">{repo.language}</span>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}