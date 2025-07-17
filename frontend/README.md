# Netlify MCP Dashboard

A React-based dashboard for managing Netlify sites through the Model Context Protocol (MCP) server.

## Features

- **Dashboard Overview**: Quick stats and actions
- **Sites Management**: List, view, and delete Netlify sites
- **Site Creation**: Create new sites from GitHub repositories
- **Settings**: Configure MCP server connection

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Architecture

This dashboard communicates with the Netlify MCP server through HTTP API calls. The MCP server handles all interactions with the Netlify API.

### Components

- `main.tsx`: Main application with navigation and routing
- `components/SiteList.tsx`: Component for listing Netlify sites
- `services/mcpClient.ts`: Service for communicating with MCP server

### MCP Server Integration

The dashboard expects the MCP server to be running on `http://localhost:3001` and to provide a REST API endpoint at `/call-tool` that accepts:

```json
{
  "tool": "toolName",
  "arguments": { ... }
}
```

Available tools:
- `createSiteFromGitHub`: Create a new site from a GitHub repository
- `listSites`: List all Netlify sites
- `getSite`: Get details of a specific site
- `deleteSite`: Delete a site
- `createEmptySite`: Create an empty site

## Deployment

This dashboard is designed to be deployed on Netlify as a static site, while the MCP server runs elsewhere (e.g., Railway, Heroku).
