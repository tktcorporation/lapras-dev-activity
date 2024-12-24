import { TimelineItem } from './types';

export interface MonthlyActivity {
  date: Date;
  count: number;
}

export interface StackedActivityData {
  date: Date;
  total: number;
  repositories: {
    name: string;
    count: number;
    color: string;
    activities: TimelineItem[];
  }[];
}

const REPO_COLORS = [
  'rgb(59, 130, 246)',  // blue-500
  'rgb(16, 185, 129)',  // emerald-500
  'rgb(236, 72, 153)',  // pink-500
  'rgb(139, 92, 246)',  // violet-500
  'rgb(245, 158, 11)', // amber-500
  'rgb(239, 68, 68)',   // red-500
  'rgb(14, 165, 233)',  // sky-500
  'rgb(168, 85, 247)',  // purple-500
];

export function getMonthlyActivityCounts(items: TimelineItem[]): MonthlyActivity[] {
  const monthlyData = new Map<string, number>();

  items.forEach(item => {
    const date = new Date(
      item.date.getFullYear(),
      item.date.getMonth()
    );
    const key = date.toISOString();
    monthlyData.set(key, (monthlyData.get(key) || 0) + 1);
  });

  return Array.from(monthlyData.entries())
    .map(([dateStr, count]) => ({
      date: new Date(dateStr),
      count
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getStackedMonthlyActivity(items: TimelineItem[]): StackedActivityData[] {
  const monthlyData = new Map<string, Map<string, { count: number; activities: TimelineItem[] }>>();
  
  // Filter GitHub activities and group by month and repository
  items
    .filter(item => item.type === 'github' && item.repository)
    .forEach(item => {
      const date = new Date(
        item.date.getFullYear(),
        item.date.getMonth()
      );
      const monthKey = date.toISOString();
      const [orgName, repoName] = item.repository!.name.split('/');
      const fullRepoName = `${orgName}/${repoName}`;

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, new Map());
      }
      const repoMap = monthlyData.get(monthKey)!;
      
      if (!repoMap.has(fullRepoName)) {
        repoMap.set(fullRepoName, { count: 0, activities: [] });
      }
      const repoData = repoMap.get(fullRepoName)!;
      repoData.count++;
      repoData.activities.push(item);
    });

  // Get unique repositories
  const allRepos = new Set<string>();
  monthlyData.forEach(repoMap => {
    repoMap.forEach((_, repo) => allRepos.add(repo));
  });

  // Assign colors to repositories
  const repoColors = new Map<string, string>();
  Array.from(allRepos).forEach((repo, index) => {
    repoColors.set(repo, REPO_COLORS[index % REPO_COLORS.length]);
  });

  // Convert to StackedActivityData
  return Array.from(monthlyData.entries())
    .map(([dateStr, repoMap]) => {
      const repositories = Array.from(repoMap.entries())
        .map(([name, data]) => ({
          name,
          count: data.count,
          color: repoColors.get(name)!,
          activities: data.activities
        }))
        .sort((a, b) => b.count - a.count);

      return {
        date: new Date(dateStr),
        total: repositories.reduce((sum, repo) => sum + repo.count, 0),
        repositories
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}