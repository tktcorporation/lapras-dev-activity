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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error || 'Failed to load profile'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">表示モード</h2>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!summaryMode}
                onChange={() => setSummaryMode(!summaryMode)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm">すべてのデータを表示</span>
            </label>
          </div>
        </div>
        
        <ProfileHeader
          name={profile.name}
          description={profile.description}
          e_score={profile.e_score}
          b_score={profile.b_score}
          i_score={profile.i_score}
        />
        
        <Stats profile={profile} />
        
        <ActivityTimeline 
          profile={profile} 
          summaryMode={summaryMode} 
        />
        
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
        
        <EventList 
          events={profile.events} 
          summaryMode={summaryMode} 
        />
      </div>
    </div>
  );
}

export default App;