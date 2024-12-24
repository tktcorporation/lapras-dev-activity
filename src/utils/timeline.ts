import { 
  Activity, 
  TeratailReply, 
  QiitaArticle, 
  ZennArticle, 
  BlogArticle, 
  NoteArticle,
  SpeakerDeckSlide,
  Event,
  LaprasProfile
} from '../types/lapras';
import { TimelineItem } from './types';

export function getAllTimelineItems(data: LaprasProfile): TimelineItem[] {
  const items: TimelineItem[] = [];

  // GitHub activities
  items.push(...data.activities
    .filter(a => a.type === 'github' || a.type === 'github_pr')
    .map(a => {
      // Extract org and repo from the title (format: "org/repo - action description")
      const titleParts = a.title.split(' - ');
      const repoFullName = titleParts[0]; // This will be "org/repo"
      
      return {
        type: 'github' as const,
        title: titleParts[1] || a.title, // Use the action description or full title if no description
        url: a.url,
        date: new Date(a.date),
        repository: {
          name: repoFullName,
          url: `https://github.com/${repoFullName}`
        }
      };
    }));

  // Articles
  items.push(
    ...data.qiita_articles.map(a => ({
      type: 'article' as const,
      title: a.title,
      url: a.url,
      date: new Date(a.updated_at),
      source: 'Qiita',
      tags: a.tags
    })),
    ...data.zenn_articles.map(a => ({
      type: 'article' as const,
      title: a.title,
      url: a.url,
      date: new Date(a.posted_at),
      source: 'Zenn',
      tags: a.tags
    }))
  );

  // Other items...
  items.push(
    ...data.teratail_replies.map(r => ({
      type: 'reply' as const,
      title: r.title,
      url: r.url,
      date: new Date(r.created_at),
      tags: r.tags,
      isBestAnswer: r.is_best_answer
    }))
  );

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}