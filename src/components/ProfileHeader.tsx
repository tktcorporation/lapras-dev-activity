import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon, UserIcon, MailIcon, ExternalLinkIcon } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  description: string;
  e_score: number;
  b_score: number;
  i_score: number;
}

export function ProfileHeader({ name, description, e_score, b_score, i_score }: ProfileHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
      {/* 背景グラデーション */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
      
      <div className="relative pt-16 pb-8 px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-8">
          {/* プロフィール画像 */}
          <div className="relative mb-6 lg:mb-0">
            <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src="https://avatars.githubusercontent.com/tktcorporation"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* プロフィール情報 */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{name}</h1>
            <p className="text-gray-600 mb-4 max-w-3xl">{description}</p>
            
            {/* ソーシャルリンク */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="https://github.com/tktcorporation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              >
                <GithubIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://twitter.com/tktcorporation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              >
                <TwitterIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">Twitter</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              >
                <LinkedinIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              >
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">ポートフォリオサイト</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* スコアカード */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">スキルスコア</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">テクニカル</div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{e_score.toFixed(1)}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(e_score * 10, 100)}%` }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">ビジネス</div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">{b_score.toFixed(1)}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(b_score * 10, 100)}%` }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">インフルエンス</div>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">{i_score.toFixed(1)}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${Math.min(i_score * 10, 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}