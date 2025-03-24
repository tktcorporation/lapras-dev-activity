import React, { useState } from 'react';
import { OrganizationGroup } from '../../utils/repository';
import { RepositoryOverview } from '../repository/RepositoryOverview';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface OrganizationSectionProps {
  organization: OrganizationGroup;
  summaryMode?: boolean;
}

export function OrganizationSection({ organization, summaryMode = true }: OrganizationSectionProps) {
  const [showAllRepos, setShowAllRepos] = useState(false);
  
  const totalRepos = organization.repositories.length;
  const displayRepos = summaryMode && !showAllRepos 
    ? organization.repositories.slice(0, 3) 
    : organization.repositories;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {organization.name}
          <span className="text-sm text-gray-500 ml-2">
            ({totalRepos} リポジトリ)
          </span>
        </h3>
        {summaryMode && totalRepos > 3 && (
          <button
            onClick={() => setShowAllRepos(!showAllRepos)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            {showAllRepos ? (
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
      
      {summaryMode && !showAllRepos && totalRepos > 3 && (
        <p className="text-sm text-gray-600 mb-4">
          最もアクティブな {displayRepos.length} リポジトリを表示中（全 {totalRepos} リポジトリ）
        </p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayRepos.map((repo) => (
          <RepositoryOverview
            key={`${organization.name}/${repo.name}`}
            repository={repo}
            activities={repo.activities}
          />
        ))}
      </div>
    </div>
  );
}