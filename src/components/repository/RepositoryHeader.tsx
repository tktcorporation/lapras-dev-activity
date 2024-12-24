import React from 'react';
import { GithubIcon } from 'lucide-react';

interface RepositoryHeaderProps {
  name: string;
  url: string;
  activityCount: number;
}

export function RepositoryHeader({ name, url, activityCount }: RepositoryHeaderProps) {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <GithubIcon className="w-6 h-6 text-gray-700" />
      <h3 className="text-xl font-bold">
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors"
        >
          {name}
        </a>
      </h3>
      <span className="text-sm text-gray-500">
        ({activityCount} activities)
      </span>
    </div>
  );
}