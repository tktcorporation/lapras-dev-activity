import React from 'react';
import { 
  GithubIcon, 
  BookOpenIcon, 
  PresentationIcon, 
  MessageCircleIcon,
  CalendarIcon,
  type LucideIcon
} from 'lucide-react';

export function getActivityIcon(type: string): React.ReactElement {
  const iconProps = { className: 'w-5 h-5' };

  switch (type) {
    case 'github':
    case 'github_pr':
      return <GithubIcon {...iconProps} />;
    case 'qiita':
    case 'zenn':
    case 'note':
    case 'blog':
      return <BookOpenIcon {...iconProps} />;
    case 'speaker_deck':
      return <PresentationIcon {...iconProps} />;
    case 'teratail':
      return <MessageCircleIcon {...iconProps} />;
    case 'connpass':
      return <CalendarIcon {...iconProps} />;
    default:
      return <BookOpenIcon {...iconProps} />;
  }
}