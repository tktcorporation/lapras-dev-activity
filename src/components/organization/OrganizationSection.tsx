import React from 'react';
import { OrganizationGroup } from '../../utils/repository';
import { RepositoryOverview } from '../repository/RepositoryOverview';

interface OrganizationSectionProps {
  organization: OrganizationGroup;
}

export function OrganizationSection({ organization }: OrganizationSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">
        {organization.name}
        <span className="text-sm text-gray-500 ml-2">
          ({organization.repositories.length} repositories)
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {organization.repositories.map((repo) => (
          <RepositoryOverview
            key={`${organization.name}/${repo.name}`}
            repository={repo}
            activities={repo.activities}
          />
        ))}
      </div>
    </div>
  );
}