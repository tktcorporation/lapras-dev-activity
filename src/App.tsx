import React, { useEffect, useState } from 'react';
import type { LaprasProfile } from './types/lapras';
import { ProfileHeader } from './components/ProfileHeader';
import { Stats } from './components/Stats';
import { ActivityTimeline } from './components/ActivityTimeline';
import { RepositoryList } from './components/RepositoryList';
import { EventList } from './components/EventList';
import { ArticleSection } from './components/ArticleSection';
import { SlidesSection } from './components/SlidesSection';

function App() {
  const [profile, setProfile] = useState<LaprasProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryMode, setSummaryMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'content' | 'events'>('overview');

  useEffect(() => {
    fetch('/api/public/tktcorporation.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data: LaprasProfile) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-xl font-semibold mb-2">エラーが発生しました</div>
          <p className="text-gray-600">{error || 'プロフィールデータの読み込みに失敗しました'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-12">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-xl font-bold text-indigo-600">開発者ポートフォリオ</div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!summaryMode}
                  onChange={() => setSummaryMode(!summaryMode)}
                  className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">詳細モード</span>
              </label>
            </div>
          </div>
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-4 text-sm font-medium border-b-2 mr-8 ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                概要
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`py-4 px-4 text-sm font-medium border-b-2 mr-8 ${
                  activeTab === 'activities'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                アクティビティ
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`py-4 px-4 text-sm font-medium border-b-2 mr-8 ${
                  activeTab === 'content'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                コンテンツ
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'events'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                イベント
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'overview' && (
          <>
            <ProfileHeader
              name={profile.name}
              description={profile.description}
              e_score={profile.e_score}
              b_score={profile.b_score}
              i_score={profile.i_score}
            />
            <Stats profile={profile} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RepositoryList 
                repositories={profile.github_repositories} 
                summaryMode={true} 
              />
              <ArticleSection
                qiitaArticles={profile.qiita_articles}
                zennArticles={profile.zenn_articles}
                blogArticles={profile.blog_articles}
                noteArticles={profile.note_articles}
                summaryMode={true}
              />
            </div>
          </>
        )}

        {activeTab === 'activities' && (
          <>
            <ActivityTimeline 
              profile={profile} 
              summaryMode={summaryMode} 
            />
          </>
        )}

        {activeTab === 'content' && (
          <div className="space-y-8">
            <ArticleSection
              qiitaArticles={profile.qiita_articles}
              zennArticles={profile.zenn_articles}
              blogArticles={profile.blog_articles}
              noteArticles={profile.note_articles}
              summaryMode={summaryMode}
            />
            <SlidesSection 
              slides={profile.speaker_deck_slides} 
              summaryMode={summaryMode} 
            />
            <RepositoryList 
              repositories={profile.github_repositories} 
              summaryMode={summaryMode} 
            />
          </div>
        )}

        {activeTab === 'events' && (
          <EventList 
            events={profile.events} 
            summaryMode={summaryMode} 
          />
        )}
      </div>
    </div>
  );
}

export default App;