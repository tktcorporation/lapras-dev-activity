# Developer Activity Dashboard

A beautiful and interactive dashboard that visualizes developer activities across various platforms including GitHub, technical articles, presentations, and more.

## Features

- 📊 **Activity Timeline**: Visualize all activities in a chronological timeline
- 📈 **Activity Charts**: Interactive stacked charts showing activity distribution
- 🏢 **Organization Overview**: Group and display GitHub activities by organization
- 📝 **Content Integration**: 
  - GitHub repositories and contributions
  - Technical articles (Qiita, Zenn)
  - Presentations and slides
  - Community contributions (Teratail)
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 🎨 **Modern UI**: Clean and professional design using Tailwind CSS

## Tech Stack

- **React**: Frontend framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Vite**: Build tool and dev server
- **Lucide React**: Beautiful icons

## Project Structure

```
src/
├── components/           # React components
│   ├── organization/    # Organization-related components
│   └── repository/      # Repository-related components
├── types/               # TypeScript type definitions
└── utils/               # Utility functions and helpers
    ├── charts.ts        # Chart data processing
    ├── date.ts         # Date formatting utilities
    ├── grouping.ts     # Data grouping logic
    ├── repository.ts   # Repository-related utilities
    └── types.ts        # Shared type definitions
```

## Components

### Core Components

- `ActivityTimeline`: Main timeline view with activity grouping
- `StackedActivityChart`: Interactive stacked bar chart
- `ProfileHeader`: User profile information display
- `Stats`: Overall statistics dashboard

### Repository Components

- `RepositoryActivityView`: Detailed repository activity view
- `RepositoryOverview`: Compact repository summary
- `ActivityList`: List of repository activities

### Organization Components

- `OrganizationSection`: Organization overview with repositories
- `RepositoryHeader`: Repository title and metadata

## Data Processing

The dashboard processes various types of activities:

- GitHub contributions and pull requests
- Technical articles from multiple platforms
- Community responses and best answers
- Presentations and speaking engagements

Activities are grouped and visualized in multiple ways:
- Chronologically by week or month
- By organization and repository
- By activity type

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project as a template for your own developer portfolio or activity dashboard.