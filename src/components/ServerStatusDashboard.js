import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServerStatusCard from './ServerStatusCard';

const ServerStatusDashboard = () => {
    const [servers, setServers] = useState({});

    useEffect(() => {
        const fetchServerStatuses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/servers-health');
                setServers(response.data);
            } catch (error) {
                console.error('Error fetching server statuses:', error);
            }
        };

        fetchServerStatuses();
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Object.keys(servers).map((serverUrl) => (
                <ServerStatusCard 
                    key={serverUrl} 
                    serverUrl={serverUrl} 
                    status={servers[serverUrl]} 
                />
            ))}
        </div>
    );
};

export default ServerStatusDashboard;
