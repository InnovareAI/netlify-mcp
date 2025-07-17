import React, { useEffect, useState } from 'react';
import { mcpClient, NetlifySite } from '../services/mcpClient';

const SiteList: React.FC = () => {
  const [sites, setSites] = useState<NetlifySite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const siteList = await mcpClient.listSites();
        setSites(siteList);
      } catch (error) {
        console.error('Error fetching sites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Netlify Sites</h2>
      {sites.length === 0 ? (
        <div>No sites found.</div>
      ) : (
        <ul>
          {sites.map(site => (
            <li key={site.id} className="mb-2">
              <span className="font-semibold">{site.name}</span>
              <a href={site.url} target="_blank" className="text-blue-500" rel="noopener noreferrer"> Visit</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SiteList;
