import React from 'react';
import type { LaprasProfile } from '../types/lapras';
import { 
  BookOpenIcon, 
  GithubIcon, 
  MessageCircleIcon, 
  AwardIcon, 
  BarChart2Icon,
  CodeIcon,
  UsersIcon,
  CalendarIcon
} from 'lucide-react';

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
  
  // 新しい統計情報を計算
  const totalEvents = profile.events.length;
  const totalRepos = profile.github_repositories.length;
  const presenterEvents = profile.events.filter(e => e.is_presenter).length;

  // 直近のアクティビティの日付
  const latestActivity = profile.activities.length > 0 
    ? new Date(profile.activities[0].date)
    : new Date();
  
  // アクティビティの種類ごとの件数
  const activityTypes = profile.activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">活動サマリー</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* アーティクル統計 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow-sm border border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-blue-700 font-semibold mb-1">アーティクル</div>
                <div className="text-3xl font-bold text-blue-900">{totalArticles}</div>
                <div className="mt-1 text-xs text-blue-600">
                  <span className="font-medium">Qiita: {profile.qiita_articles.length}</span>
                  <span className="mx-1">|</span>
                  <span className="font-medium">Zenn: {profile.zenn_articles.length}</span>
                </div>
              </div>
              <div className="bg-blue-200 p-3 rounded-lg">
                <BookOpenIcon className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-200">
              <div className="text-xs text-blue-700">
                最近のトピック: {
                  profile.qiita_articles.length > 0 
                    ? profile.qiita_articles[0].tags.slice(0, 2).join(', ')
                    : 'なし'
                }
              </div>
            </div>
          </div>
          
          {/* GitHub統計 */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 shadow-sm border border-indigo-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-indigo-700 font-semibold mb-1">GitHub</div>
                <div className="text-3xl font-bold text-indigo-900">{totalRepos}リポジトリ</div>
                <div className="mt-1 text-xs text-indigo-600">
                  <span className="font-medium">{totalStars}スター</span>
                  <span className="mx-1">|</span>
                  <span className="font-medium">{totalContributions}コントリビューション</span>
                </div>
              </div>
              <div className="bg-indigo-200 p-3 rounded-lg">
                <GithubIcon className="w-6 h-6 text-indigo-700" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-200">
              <div className="text-xs text-indigo-700">
                主要言語: {
                  profile.github_repositories.length > 0 
                    ? profile.github_repositories[0].language
                    : 'なし'
                }
              </div>
            </div>
          </div>
          
          {/* イベント統計 */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 shadow-sm border border-purple-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-purple-700 font-semibold mb-1">イベント</div>
                <div className="text-3xl font-bold text-purple-900">{totalEvents}</div>
                <div className="mt-1 text-xs text-purple-600">
                  <span className="font-medium">登壇: {presenterEvents}</span>
                </div>
              </div>
              <div className="bg-purple-200 p-3 rounded-lg">
                <UsersIcon className="w-6 h-6 text-purple-700" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-200">
              <div className="text-xs text-purple-700">
                最近の参加: {
                  profile.events.length > 0 
                    ? new Date(profile.events[0].date).toLocaleDateString('ja-JP')
                    : 'なし'
                }
              </div>
            </div>
          </div>
          
          {/* 回答・サポート統計 */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 shadow-sm border border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-green-700 font-semibold mb-1">テラテイル回答</div>
                <div className="text-3xl font-bold text-green-900">
                  {profile.teratail_replies.length}
                </div>
                <div className="mt-1 text-xs text-green-600">
                  <span className="font-medium">ベストアンサー: {bestAnswers}</span>
                </div>
              </div>
              <div className="bg-green-200 p-3 rounded-lg">
                <MessageCircleIcon className="w-6 h-6 text-green-700" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-green-200">
              <div className="text-xs text-green-700">
                回答率: {
                  profile.teratail_replies.length > 0 
                    ? `${Math.round((bestAnswers / profile.teratail_replies.length) * 100)}%`
                    : '0%'
                }
              </div>
            </div>
          </div>
        </div>
        
        {/* アクティビティ種類分布 */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">アクティビティ分布</h3>
            <div className="text-xs text-gray-500">
              最終アクティビティ: {latestActivity.toLocaleDateString('ja-JP')}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(activityTypes).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
              <div key={type} className="px-3 py-2 rounded-full bg-gray-100 flex items-center">
                <span className="w-2 h-2 rounded-full mr-2" style={{ 
                  backgroundColor: 
                    type === 'github' ? '#6366F1' : 
                    type === 'qiita' ? '#10B981' : 
                    type === 'zenn' ? '#3B82F6' : 
                    type === 'blog' ? '#EC4899' : 
                    type === 'speaker_deck' ? '#F59E0B' : 
                    type === 'connpass' ? '#8B5CF6' : 
                    '#6B7280'
                }}></span>
                <span className="text-sm font-medium text-gray-700">{getActivityTypeName(type)}</span>
                <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getActivityTypeName(type: string): string {
  switch (type) {
    case 'github': return 'GitHub';
    case 'github_pr': return 'Pull Request';
    case 'speaker_deck': return 'SpeakerDeck';
    case 'qiita': return 'Qiita';
    case 'zenn': return 'Zenn';
    case 'note': return 'Note';
    case 'teratail': return 'Teratail';
    case 'blog': return 'Blog';
    case 'connpass': return 'イベント';
    default: return type;
  }
}