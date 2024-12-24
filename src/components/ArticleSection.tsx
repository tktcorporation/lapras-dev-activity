import React from 'react';
import { QiitaArticle, ZennArticle, BlogArticle, NoteArticle } from '../types/lapras';
import { formatDate } from '../utils/date';
import { BookOpenIcon } from 'lucide-react';

interface ArticleSectionProps {
  qiitaArticles: QiitaArticle[];
  zennArticles: ZennArticle[];
  blogArticles: BlogArticle[];
  noteArticles: NoteArticle[];
}

export function ArticleSection({ qiitaArticles, zennArticles, blogArticles, noteArticles }: ArticleSectionProps) {
  const allArticles = [
    ...qiitaArticles.map(article => ({
      ...article,
      source: 'Qiita',
      date: article.updated_at,
    })),
    ...zennArticles.map(article => ({
      ...article,
      source: 'Zenn',
      date: article.posted_at,
    })),
    ...blogArticles.map(article => ({
      ...article,
      source: 'Blog',
      date: article.posted_at,
    })),
    ...noteArticles.map(article => ({
      ...article,
      source: 'Note',
      date: article.published_at,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Articles</h2>
      <div className="space-y-4">
        {allArticles.map((article, index) => (
          <a
            key={`${article.url}-${index}`}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex items-start space-x-3">
              <BookOpenIcon className="w-5 h-5 mt-1 text-blue-500" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{article.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                    {article.source}
                  </span>
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}