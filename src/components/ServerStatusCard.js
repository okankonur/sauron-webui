import React from 'react';
import './ServerStatusCard.css';

const ServerStatusCard = ({ serverUrl, status }) => {
    return (
        <div className={`server-card ${status.toLowerCase()}`}>
            <h3>{serverUrl}</h3>
            <p>Status: {status}</p>
        </div>
    );
};

export default ServerStatusCard;
