import React, { useState } from 'react';
import { QiitaArticle, ZennArticle, BlogArticle, NoteArticle } from '../types/lapras';
import { formatDate } from '../utils/date';
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface ArticleSectionProps {
  qiitaArticles: QiitaArticle[];
  zennArticles: ZennArticle[];
  blogArticles: BlogArticle[];
  noteArticles: NoteArticle[];
  summaryMode?: boolean;
}

export function ArticleSection({ qiitaArticles, zennArticles, blogArticles, noteArticles, summaryMode = true }: ArticleSectionProps) {
  const [showAll, setShowAll] = useState(false);
  
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

  const totalCount = allArticles.length;
  const displayArticles = summaryMode && !showAll ? allArticles.slice(0, 5) : allArticles;
  const sources = {
    Qiita: qiitaArticles.length,
    Zenn: zennArticles.length,
    Blog: blogArticles.length,
    Note: noteArticles.length
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">記事 ({totalCount})</h2>
        {summaryMode && totalCount > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
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

      {summaryMode && !showAll && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(sources).map(([source, count]) => count > 0 && (
            <span key={source} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
              {source}: {count}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {displayArticles.map((article, index) => (
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