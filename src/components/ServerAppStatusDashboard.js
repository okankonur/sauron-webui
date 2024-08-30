import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServerAppStatusCard from './ServerAppStatusCard';
import './ServerAppStatusDashboard.css';

const ServerAppStatusDashboard = () => {
    const [apps, setApps] = useState([]);  // State to store the list of apps
    const [lastFetchTime, setLastFetchTime] = useState(null);  // State to store the last fetch time

    useEffect(() => {
        // Function to fetch app statuses
        const fetchAppStatuses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/health');
                console.log("response data: ", response.data);
                if (Array.isArray(response.data)) {
                    setApps(response.data);
                    setLastFetchTime(new Date().toLocaleString());  // Update the last fetch time
                } else {
                    console.error('Expected an array, but got:', typeof response.data);
                }
            } catch (error) {
                console.error('Error fetching app statuses:', error);
            }
        };

        // Initial fetch
        fetchAppStatuses();

        // Set up interval to fetch app statuses every 5 seconds
        const intervalId = setInterval(fetchAppStatuses, 30000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="dashboard">
            <div className="last-fetch-time">
                <strong>Last Fetch Time:</strong> {lastFetchTime || 'Fetching...'}
            </div>
            {apps.map((app) => (
                <div key={app.url} style={{ position: 'relative', marginBottom: '40px' }}>
                    <ServerAppStatusCard 
                        url={app.url} 
                        name={app.name}
                        status={app.status} 
                        ip={app.ip}
                        dependencies={app.dependencies}
                    />
                </div>
            ))}
        </div>
    );
};

export default ServerAppStatusDashboard;
