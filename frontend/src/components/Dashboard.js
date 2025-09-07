import React from 'react';
import AppCard from './AppCard';

export default function Dashboard({ apps, onSelect }) {
  if (apps.length === 0) {
    return <p className="text-muted">No applications found.</p>;
  }

  return (
    <div className="row">
      {apps.map(app => (
        <div key={app._id} className="col-md-4 mb-3">
          <AppCard app={app} onOpen={onSelect} />
        </div>
      ))}
    </div>
  );
}
