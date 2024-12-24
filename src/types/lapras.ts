export interface LaprasProfile {
  name: string;
  description: string;
  e_score: number;
  b_score: number;
  i_score: number;
  qiita_articles: QiitaArticle[];
  zenn_articles: ZennArticle[];
  blog_articles: BlogArticle[];
  note_articles: NoteArticle[];
  speaker_deck_slides: SpeakerDeckSlide[];
  github_repositories: GithubRepository[];
  teratail_replies: TeratailReply[];
  events: Event[];
  activities: Activity[];
}

export interface QiitaArticle {
  title: string;
  url: string;
  tags: string[];
  headlines: string[];
  stockers_count: number;
  updated_at: string;
}

export interface ZennArticle {
  title: string;
  url: string;
  tags: string[];
  posted_at: string;
}

export interface BlogArticle {
  title: string;
  url: string;
  tags: string[];
  posted_at: string;
}

export interface NoteArticle {
  url: string;
  title: string;
  tags: string[];
  like_count: number;
  published_at: string;
}

export interface SpeakerDeckSlide {
  title: string;
  description: string;
  url: string;
  star_count: number;
  view_count: number;
  presentation_date: string;
}

export interface GithubRepository {
  id: number;
  title: string;
  url: string;
  is_oss: boolean;
  is_fork: boolean;
  is_owner: boolean;
  description: string;
  stargazers_count: string;
  stargazers_url: string;
  forks: number;
  contributors_count: number;
  contributors_url: string;
  contributions: number;
  contributions_url: string;
  language: string;
  languages: {
    name: string;
    bytes: number;
  }[];
}

export interface TeratailReply {
  url: string;
  title: string;
  tags: string[];
  is_best_answer: boolean;
  created_at: string;
}

export interface Event {
  title: string;
  url: string;
  status: number;
  date: string;
  is_presenter: boolean;
  is_organizer: boolean;
}

export interface Activity {
  title: string;
  url: string;
  date: string;
  type: 'github' | 'github_pr' | 'speaker_deck' | 'qiita' | 'zenn' | 'note' | 'teratail' | 'blog' | 'connpass';
}