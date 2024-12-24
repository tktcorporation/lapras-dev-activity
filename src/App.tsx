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
        <ProfileHeader
          name={profile.name}
          description={profile.description}
          e_score={profile.e_score}
          b_score={profile.b_score}
          i_score={profile.i_score}
        />
        
        <Stats profile={profile} />
        
        <ActivityTimeline profile={profile} />
        
        <ArticleSection
          qiitaArticles={profile.qiita_articles}
          zennArticles={profile.zenn_articles}
          blogArticles={profile.blog_articles}
          noteArticles={profile.note_articles}
        />
        
        <SlidesSection slides={profile.speaker_deck_slides} />
        
        <RepositoryList repositories={profile.github_repositories} />
        
        <EventList events={profile.events} />
      </div>
    </div>
  );
}

export default App;