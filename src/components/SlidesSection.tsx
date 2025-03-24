import React, { useState } from 'react';
import { SpeakerDeckSlide } from '../types/lapras';
import { formatDate } from '../utils/date';
import { PresentationIcon, StarIcon, EyeIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface SlidesSectionProps {
  slides: SpeakerDeckSlide[];
  summaryMode?: boolean;
}

export function SlidesSection({ slides, summaryMode = true }: SlidesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  
  const sortedSlides = [...slides].sort(
    (a, b) => new Date(b.presentation_date).getTime() - new Date(a.presentation_date).getTime()
  );
  
  const totalCount = slides.length;
  const displaySlides = summaryMode && !showAll ? sortedSlides.slice(0, 3) : sortedSlides;
  
  if (slides.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">プレゼンテーション ({totalCount})</h2>
        {summaryMode && totalCount > 3 && (
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
      
      {summaryMode && !showAll && totalCount > 3 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            最近の {displaySlides.length} 件を表示中（全 {totalCount} 件）
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        {displaySlides.map((slide, index) => (
          <a
            key={`${slide.url}-${index}`}
            href={slide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex items-start space-x-3">
              <PresentationIcon className="w-5 h-5 mt-1 text-purple-500" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{slide.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{slide.description}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="text-sm text-gray-500">
                    {formatDate(slide.presentation_date)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{slide.star_count}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EyeIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{slide.view_count}</span>
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