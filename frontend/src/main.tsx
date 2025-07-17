import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Globe, Plus, List, Settings, Server } from 'lucide-react';
import SiteList from './components/SiteList';
import './index.css';

type View = 'dashboard' | 'sites' | 'create' | 'settings';

const App = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Globe },
    { id: 'sites', label: 'Sites', icon: List },
    { id: 'create', label: 'Create Site', icon: Plus },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Server className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-900">Netlify MCP Dashboard</h1>
              </div>
              <p className="text-gray-600">
                Manage your Netlify sites through the Model Context Protocol server.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setCurrentView('create')}
                    className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 transition-colors"
                  >
                    <Plus className="inline h-4 w-4 mr-2" />
                    Create New Site
                  </button>
                  <button 
                    onClick={() => setCurrentView('sites')}
                    className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded-md text-green-700 transition-colors"
                  >
                    <List className="inline h-4 w-4 mr-2" />
                    View All Sites
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">MCP Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Connected</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Server running on localhost:3001</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Tools</h3>
                <div className="text-sm text-gray-600">
                  <div>• Create Site from GitHub</div>
                  <div>• List Sites</div>
                  <div>• Delete Site</div>
                  <div>• Create Empty Site</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'sites':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <SiteList />
          </div>
        );
      case 'create':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Create New Site</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="my-awesome-site"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repository</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="username/repository"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="main"
                  defaultValue="main"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Build Command</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="npm run build"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Directory</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="dist"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Create Site
              </button>
            </form>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MCP Server URL</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="http://localhost:3001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Netlify Access Token</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Configure in MCP server"
                  disabled
                />
              </div>
              <p className="text-sm text-gray-500">
                Access token is configured in your MCP server environment variables.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">MCP Dashboard</span>
            </div>
          </div>
          <nav className="mt-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as View)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
