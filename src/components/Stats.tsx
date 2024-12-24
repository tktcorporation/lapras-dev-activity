import React from 'react';
import type { LaprasProfile } from '../types/lapras';
import { AwardIcon, BookOpenIcon, GithubIcon, MessageCircleIcon } from 'lucide-react';

interface StatsProps {
  profile: LaprasProfile;
}

export function Stats({ profile }: StatsProps) {
  const totalArticles = 
    profile.qiita_articles.length + 
    profile.zenn_articles.length + 
    profile.blog_articles.length + 
    profile.note_articles.length;

  const bestAnswers = profile.teratail_replies.filter(r => r.is_best_answer).length;
  const totalContributions = profile.github_repositories.reduce((sum, repo) => sum + repo.contributions, 0);
  const totalStars = profile.github_repositories.reduce((sum, repo) => sum + parseInt(repo.stargazers_count), 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Overall Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpenIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Articles</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{totalArticles}</span>
        </div>

        <div className="p-4 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <MessageCircleIcon className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Best Answers</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{bestAnswers}</span>
        </div>

        <div className="p-4 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <GithubIcon className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Contributions</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{totalContributions}</span>
        </div>

        <div className="p-4 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <AwardIcon className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">Total Stars</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{totalStars}</span>
        </div>
      </div>
    </div>
  );
}