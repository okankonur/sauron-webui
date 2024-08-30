import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServerAppStatusCard from './ServerAppStatusCard';
import './ServerAppStatusDashboard.css';


const FETCH_INTERVAL = 30000; 

const ServerAppStatusDashboard = () => {
    const [apps, setApps] = useState([]);  // State to store the list of apps
    const [lastFetchTime, setLastFetchTime] = useState(null);  // State to store the last fetch time
    const [nextFetchTime, setNextFetchTime] = useState(null);

    useEffect(() => {
        // Function to fetch app statuses
        const fetchAppStatuses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/health');
                console.log("response data: ", response.data);
                if (Array.isArray(response.data)) {
                    setApps(response.data);
                    
                    const currentTime = new Date();

                    setLastFetchTime(new Date().toLocaleString());  // Update the last fetch time
                    setNextFetchTime(new Date(currentTime.getTime() + FETCH_INTERVAL).toLocaleString());
                } else {
                    console.error('Expected an array, but got:', typeof response.data);
                }
            } catch (error) {
                console.error('Error fetching app statuses:', error);
            }
        };

        // Initial fetch
        fetchAppStatuses();
        
        const intervalId = setInterval(fetchAppStatuses, FETCH_INTERVAL);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="dashboard">
            <div className="fetch-times">
                <div>
                    <strong>Last Fetch Time:</strong> {lastFetchTime || 'Fetching...'}
                </div>
                <div>
                    <strong>Next Fetch Time:</strong> {nextFetchTime || 'Calculating...'}
                </div>
            </div>
            <div className="grid-container">
                {apps.map((app) => (

                    <div key={app.url}>
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
        </div>
    );
};

export default ServerAppStatusDashboard;
