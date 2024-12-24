import React from 'react';
import { formatDate } from '../utils/date';
import { BookOpenIcon } from 'lucide-react';

interface Article {
  title: string;
  url: string;
  tags: string[];
  date: string;
  type: 'qiita' | 'zenn' | 'blog' | 'note';
}

interface ArticleListProps {
  articles: Article[];
  title: string;
}

export function ArticleList({ articles, title }: ArticleListProps) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <BookOpenIcon className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{article.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-sm text-gray-500">{formatDate(article.date)}</p>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag) => (
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
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}