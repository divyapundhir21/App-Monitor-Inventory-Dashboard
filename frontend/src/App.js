import React, { useEffect, useState } from 'react';
import API from './api';
import Dashboard from './components/Dashboard';
import AppDetailsModal from './components/AppDetailsModal';
import AdminPanel from './components/AdminPanel';

function App() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [search, setSearch] = useState('');

  const loadApps = async () => {
    const res = await API.get('/apps');
    setApps(res.data);
  };

  const searchApps = async (query) => {
    if (!query) {
      loadApps(); // reset to all
      return;
    }
    const res = await API.get(`/apps/search?query=${query}`);
    setApps(res.data);
  };

  useEffect(() => {
    loadApps();
  }, []);

  // 🔍 call search API on input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    searchApps(value);
  };

  return (
    <div className="container mt-4">
      <h2>Application Monitoring Dashboard</h2>

      {/* 🔍 Search bar */}
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search by App ID or Technical Owner"
        value={search}
        onChange={handleSearch}
      />

      <button className="btn btn-secondary mb-3" onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? 'Hide Admin Panel' : 'Show Admin Panel'}
      </button>

      <Dashboard apps={apps} onSelect={setSelectedApp} />
      {selectedApp && <AppDetailsModal app={selectedApp} onClose={() => setSelectedApp(null)} />}
      {showAdmin && <AdminPanel reload={loadApps} />}
    </div>
  );
}

export default App;
