import React from 'react';

export default function AppCard({ app, onOpen }) {
  const statusColor =
    app.currentStatus === 'UP' ? 'green' :
    app.currentStatus === 'DOWN' ? 'red' : 'gray';

  return (
    <div className="card p-3 shadow-sm">
      <div className="d-flex justify-content-between">
        <h5>{app.appName}</h5>
        <span style={{ color: statusColor, fontWeight: 'bold' }}>{app.currentStatus}</span>
      </div>
      <small>{app.appId} • {app.technicalOwner}</small>
      <button className="btn btn-sm btn-outline-primary mt-2" onClick={() => onOpen(app)}>
        Details
      </button>
    </div>
  );
}
