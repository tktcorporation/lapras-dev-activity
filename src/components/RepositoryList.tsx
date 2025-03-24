import React, { useState } from 'react';
import { 
  GithubIcon, 
  StarIcon, 
  GitForkIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  CodeIcon,
  ExternalLinkIcon,
  UserPlusIcon,
  CalendarIcon,
  HashIcon
} from 'lucide-react';
import type { GithubRepository } from '../types/lapras';

interface RepositoryListProps {
  repositories: GithubRepository[];
  summaryMode?: boolean;
}

export function RepositoryList({ repositories, summaryMode = true }: RepositoryListProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'popular' | 'recent' | 'contributed'>('popular');
  
  // リポジトリ一覧（人気順）
  const popularRepos = [...repositories]
    .sort((a, b) => parseInt(b.stargazers_count) - parseInt(a.stargazers_count));
    
  // リポジトリ一覧（コントリビューション順）
  const contributedRepos = [...repositories]
    .sort((a, b) => b.contributions - a.contributions);
  
  // 言語の使用状況を集計
  const languageStats = repositories.reduce((stats, repo) => {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + 1;
    }
    return stats;
  }, {} as Record<string, number>);
  
  // 活動している主要な組織を抽出
  const organizations = repositories.reduce((orgs, repo) => {
    const repoPath = repo.url.replace('https://github.com/', '');
    const orgName = repoPath.split('/')[0];
    if (orgName && orgName !== 'tktcorporation') { // ユーザー名を除外
      orgs[orgName] = (orgs[orgName] || 0) + 1;
    }
    return orgs;
  }, {} as Record<string, number>);
  
  // 表示するリポジトリを決定
  let displayRepos = popularRepos;
  if (activeTab === 'contributed') {
    displayRepos = contributedRepos;
  }
  
  // サマリーモードの場合、表示数を制限
  const totalCount = repositories.length;
  if (summaryMode && !showAll) {
    displayRepos = displayRepos.slice(0, 6);
  }

  // 言語に対応する色を取得
  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'Java': '#b07219',
      'Go': '#00ADD8',
      'Ruby': '#CC342D',
      'PHP': '#4F5D95',
      'C#': '#178600',
      'C++': '#f34b7d',
      'Rust': '#dea584',
      'Shell': '#89e051',
      'HTML': '#e34c26',
      'CSS': '#563d7c'
    };
    
    return colors[language] || '#6e7681';
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">リポジトリ ({totalCount})</h2>
          
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('popular')}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  activeTab === 'popular' 
                    ? 'bg-white shadow-sm text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                人気順
              </button>
              <button
                onClick={() => setActiveTab('contributed')}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  activeTab === 'contributed' 
                    ? 'bg-white shadow-sm text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                貢献順
              </button>
            </div>
            
            {summaryMode && totalCount > 6 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
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
        </div>
        
        <div className="mb-6">
          <div className="mb-2 text-sm font-medium text-gray-700">言語</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(languageStats)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 8)
              .map(([lang, count]) => (
                <div key={lang} className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm">
                  <span 
                    className="w-2.5 h-2.5 rounded-full mr-1.5" 
                    style={{ backgroundColor: getLanguageColor(lang) }}
                  ></span>
                  <span>{lang}</span>
                  <span className="ml-1.5 bg-gray-200 text-gray-700 px-1.5 rounded-full text-xs">{count}</span>
                </div>
              ))}
          </div>
        </div>
        
        {Object.keys(organizations).length > 0 && (
          <div className="mb-6">
            <div className="mb-2 text-sm font-medium text-gray-700">主な組織</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(organizations)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([org, count]) => (
                  <a
                    key={org}
                    href={`https://github.com/${org}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm transition"
                  >
                    <span className="mr-1.5">@{org}</span>
                    <span className="bg-gray-200 text-gray-700 px-1.5 rounded-full text-xs">{count}</span>
                  </a>
                ))}
            </div>
          </div>
        )}
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <GithubIcon className="w-5 h-5 text-gray-700 mr-2" />
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{repo.title}</h3>
                </div>
                <ExternalLinkIcon className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                  {repo.description || '説明なし'}
                </p>
                
                <div className="mt-auto grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center text-gray-500">
                    <StarIcon className="w-3.5 h-3.5 mr-1" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <GitForkIcon className="w-3.5 h-3.5 mr-1" />
                    <span>{repo.forks}</span>
                  </div>
                  
                  {repo.language && (
                    <div className="flex items-center text-gray-500">
                      <span 
                        className="w-2 h-2 rounded-full mr-1" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      ></span>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  
                  {repo.contributions > 0 && (
                    <div className="flex items-center text-gray-500">
                      <CodeIcon className="w-3.5 h-3.5 mr-1" />
                      <span>{repo.contributions} 貢献</span>
                    </div>
                  )}
                </div>
              </div>
              
              {activeTab === 'contributed' && repo.contributions > 0 && (
                <div className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-medium">
                  {repo.contributions} コントリビューション
                </div>
              )}
            </a>
          ))}
        </div>
        
        {summaryMode && !showAll && totalCount > displayRepos.length && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              + さらに {totalCount - displayRepos.length} 件のリポジトリを表示
            </button>
          </div>
        )}
      </div>
    </div>
  );
}