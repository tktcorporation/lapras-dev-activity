import React from 'react';
import { GithubIcon, TwitterIcon } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  description: string;
  e_score: number;
  b_score: number;
  i_score: number;
}

export function ProfileHeader({ name, description, e_score, b_score, i_score }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
        <img
          src="https://avatars.githubusercontent.com/tktcorporation"
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 md:mb-0"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{e_score.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Technical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{b_score.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Business</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{i_score.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Influence</div>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <a
              href="https://github.com/tktcorporation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/tktcorporation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <TwitterIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}