import { TimelineItem, TimeGroup, Repository } from './types';

export function groupByTimeUnit(items: TimelineItem[], unit: 'week' | 'month'): TimeGroup[] {
  const groups = new Map<string, TimeGroup>();

  items.forEach(item => {
    const date = item.date;
    let key: string;

    if (unit === 'week') {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = weekStart.toISOString();
    } else {
      key = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    }

    if (!groups.has(key)) {
      groups.set(key, {
        date: new Date(key),
        items: []
      });
    }
    groups.get(key)!.items.push(item);
  });

  return Array.from(groups.values())
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function groupByRepository(items: TimelineItem[]): Repository[] {
  const repoGroups = new Map<string, TimelineItem[]>();

  items
    .filter(item => item.type === 'github' && item.repository)
    .forEach(item => {
      const repoFullName = item.repository!.name;
      if (!repoGroups.has(repoFullName)) {
        repoGroups.set(repoFullName, []);
      }
      repoGroups.get(repoFullName)!.push(item);
    });

  return Array.from(repoGroups.entries())
    .map(([name, activities]) => ({
      name,
      url: activities[0].repository!.url,
      activities: activities.sort((a, b) => b.date.getTime() - a.date.getTime())
    }))
    .sort((a, b) => b.activities.length - a.activities.length);
}