import React from 'react';
import './ServerAppStatusCard.css';

const ServerAppStatusCard = ({ url, name, status, ip, dependencies }) => {
    return (
        <div className={`server-card ${status.toLowerCase()}`}>
            <h3>{name}</h3>
            <p>Status: {status}</p>
            <p className="url">URL: {url}</p>
            <p>IP: {ip}</p>
            {dependencies.length > 0 && (
                <div className="dependencies">
                    <h4>Dependencies:</h4>
                    <ul>
                        {dependencies.map(dep => (
                            <li key={dep}>{dep}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ServerAppStatusCard;
