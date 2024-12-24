import React from 'react';
import { GithubIcon, StarIcon, GitForkIcon } from 'lucide-react';
import type { GithubRepository } from '../types/lapras';

interface RepositoryListProps {
  repositories: GithubRepository[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  const sortedRepos = [...repositories]
    .sort((a, b) => parseInt(b.stargazers_count) - parseInt(a.stargazers_count))
    .slice(0, 6);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Featured Repositories</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {sortedRepos.map((repo) => (
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