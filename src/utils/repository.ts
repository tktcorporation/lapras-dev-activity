import { Repository } from './types';

export interface OrganizationGroup {
  name: string;
  repositories: Repository[];
}

export function groupRepositoriesByOrg(repositories: Repository[]): OrganizationGroup[] {
  const orgMap = new Map<string, Repository[]>();

  repositories.forEach(repo => {
    // Skip repositories without a proper name format
    if (!repo.name || !repo.name.includes('/')) {
      return;
    }

    const [orgName, repoName] = repo.name.split('/');
    if (!orgMap.has(orgName)) {
      orgMap.set(orgName, []);
    }
    orgMap.get(orgName)!.push({
      ...repo,
      name: repoName // Only use repository name without org
    });
  });

  return Array.from(orgMap.entries())
    .map(([name, repos]) => ({
      name,
      repositories: repos.sort((a, b) => b.activities.length - a.activities.length)
    }))
    .sort((a, b) => b.repositories.length - a.repositories.length);
}