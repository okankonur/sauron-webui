import React from 'react';
import ServerStatusDashboard from './components/ServerAppStatusDashboard';
import './App.css'

function App() {
    return (
        <div className="App">
            <h1>Server Health Dashboard</h1>
            <ServerStatusDashboard />
        </div>
    );
}

export default App;
