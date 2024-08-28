import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServerStatusCard = () => {
    const [serverStatus, setServerStatus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/servers-health');
                setServerStatus(response.data);
            } catch (error) {
                console.error('Error fetching server health data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Server Health Status</h2>
            {Object.keys(serverStatus).map((serverUrl) => (
                <div key={serverUrl}>
                    <h3>{serverUrl}</h3>
                    <p>Status: {serverStatus[serverUrl]}</p>
                </div>
            ))}
        </div>
    );
};

export default ServerStatusCard;
