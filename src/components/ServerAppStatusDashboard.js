import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServerAppStatusCard from './ServerAppStatusCard';
import './ServerAppStatusDashboard.css';


const FETCH_INTERVAL = 30000; 

const ServerAppStatusDashboard = () => {
    const [apps, setApps] = useState([]);  // State to store the list of apps
    const [lastFetchTime, setLastFetchTime] = useState(null);  // State to store the last fetch time
    const [nextFetchTime, setNextFetchTime] = useState(null);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [error, setError] = useState(null);  // Track fetch errors

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

                    // Trigger animation
                    setFetchTrigger(true);
                    setTimeout(() => setFetchTrigger(false), 500); // Remove animation class after animation duration

                    setError(null);

                } else {
                    console.error('Expected an array, but got:', typeof response.data);
                    setError({
                        message: 'Unexpected response format.',
                        details: JSON.stringify(response.data, null, 2)
                    });
                }
            } catch (err) {
                console.error('Error fetching app statuses:', error);
                const errorDetails = {
                    message: err.message,
                    code: err.code,
                    status: err.response ? err.response.status : 'No response',
                    statusText: err.response ? err.response.statusText : 'Unknown error',
                    data: err.response ? JSON.stringify(err.response.data, null, 2) : 'No response data',
                };
                
                setError(errorDetails);
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
                <div className={fetchTrigger ? 'animate-fetch' : ''}>
                    <strong>Last Fetch Time:</strong> {lastFetchTime || 'Fetching...'}
                </div>
                <div>
                    <strong>Next Fetch Time:</strong> {nextFetchTime || 'Calculating...'}
                </div>
            </div>

            {error && (
                <div className="error-message">
                    <strong>Error:</strong> {error.message}
                    {error.code && <div><strong>Error Code:</strong> {error.code}</div>}
                    {error.status && <div><strong>Status:</strong> {error.status} {error.statusText}</div>}
                    {error.data && (
                        <div>
                            <strong>Details:</strong>
                            <pre>{error.data}</pre> {/* Display error details in a readable format */}
                        </div>
                    )}
                </div>
            )}
            
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
