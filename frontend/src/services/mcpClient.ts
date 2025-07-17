// MCP Client Service
// This will communicate with your MCP server

export interface NetlifySite {
  id: string;
  name: string;
  url: string;
  admin_url: string;
  deploy_url: string;
  state: 'ready' | 'building' | 'error';
  created_at: string;
  updated_at: string;
  repo?: {
    repo: string;
    branch: string;
  };
}

export interface CreateSiteRequest {
  name: string;
  repo: string;
  branch: string;
  buildCommand: string;
  publishDir: string;
  envVars?: Record<string, string>;
}

export interface ListSitesRequest {
  filter?: 'all' | 'owner' | 'guest';
  page?: number;
  perPage?: number;
}

class MCPClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  async callTool(toolName: string, args: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/call-tool`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: toolName,
          arguments: args,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error calling tool ${toolName}:`, error);
      throw error;
    }
  }

  async createSiteFromGitHub(request: CreateSiteRequest): Promise<NetlifySite> {
    return this.callTool('createSiteFromGitHub', request);
  }

  async listSites(request: ListSitesRequest = {}): Promise<NetlifySite[]> {
    return this.callTool('listSites', request);
  }

  async getSite(siteId: string): Promise<NetlifySite> {
    return this.callTool('getSite', { siteId });
  }

  async deleteSite(siteId: string): Promise<void> {
    return this.callTool('deleteSite', { siteId });
  }

  async createEmptySite(name: string): Promise<NetlifySite> {
    return this.callTool('createEmptySite', { name });
  }
}

export const mcpClient = new MCPClient();
